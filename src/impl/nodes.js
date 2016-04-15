'use strict';

var nodeTypes = require('./types'),

    Nodes = function () {
        this.gameNode = null;
        this.ids = {};
        this.name2node = {};
        this.transactionListeners = [];
    };

Nodes.prototype.setGameNode = function (node) {
    this.gameNode = node;
};


Nodes.prototype.requestTransactionNofitication = function (nodeid) {
    if (this.transactionListeners.indexOf(nodeid) < 0) {
        this.transactionListeners.push(nodeid);
    }
};

Nodes.prototype.cancelTransactionNofitication = function (nodeid) {
    var index = this.transactionListeners.indexOf(nodeid);
    if (index >= 0) {
        this.transactionListeners.splice(index, 1);
    }
};

Nodes.prototype.game = function () {
    return this.gameNode.obj;
};


Nodes.prototype._registerName = function (node) {
    this.ids[node.id] = node;
    if (node.props.name) {
        this.name2node[node.props.name] = node;
    }
};

Nodes.prototype._updateName = function (node, lastProps) {
    if (lastProps.name !== node.props.name) {
        delete this.name2node[lastProps.name];
        this.name2node[node.props.name] = node;
    }
};

Nodes.prototype._unregisterName = function (node) {
    delete this.ids[node.id];
    if (node.props.name) {
        delete this.name2node[node.props.name];
    }
};

Nodes.prototype.byId = function (id) {
    return this.ids[id];
};


Nodes.prototype.byName = function (name) {
    return this.name2node[name];
};

Nodes.prototype.parent = function (node, tag) {
    while (true) {
        var parent = this.ids[node.parent] || null;
        if (!parent || parent.tag === tag) {
            return parent;
        } else {
            node = parent;
        }
    }
};


Nodes.prototype.gameState = function (node) {
    while (true) {
        var parent = this.ids[node.parent] || null;
        if (!parent || parent.tag === 'game' || parent.tag === 'state') {
            return parent;
        } else {
            node = parent;
        }
    }
};

Nodes.prototype.context = function (node) {
    return this.gameState(node).context;
};


Nodes.prototype.parentInitd = function (node) {
    var parent = this.ids[node.parent];

    return !parent || parent.initialized;
};


Nodes.prototype.shouldInitialize = function (node) {
    return !node.initialized && this.parentInitd(node);
};

Nodes.prototype._invoke = function (node, method) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType && nodeType[method]) {
        nodeType[method](this, node);
    }
};

Nodes.prototype.mountNode = function (node) {
    this.ids[node.id] = node;
    if (node.tag === 'game') {
        this.setGameNode(node);
    }

    if (this.shouldInitialize(node) && this.initImmediately(node)) {
        this._initNode(node, 'init');
    }
};

Nodes.prototype._initNode = function (node, method) {
    node.initialized = true;
    this._registerName(node);
    this._invoke(node, method);
    if (node.obj) {
        node.obj.rnodeid = node.id;
    }
};

Nodes.prototype.updateNode = function (node, prevProps) {
    this._updateName(node, prevProps);

    var nodeType = nodeTypes[node.tag];
    if (nodeType && nodeType.update) {
        var changedProps = Object.keys(node.props);
        changedProps = changedProps.filter(function (key) {
            return key !== 'children' && node.props[key] !== prevProps[key];
        });

        Object.keys(prevProps).forEach(function (key) {
            if (key !== 'children' && !(key in node.props)) {
                changedProps.push(key);
            }
        });

        if (changedProps.length > 0) {
            nodeType.update(this, node, changedProps, prevProps);
        }
    }
};

Nodes.prototype.unmountNode = function (node) {
    this._unregisterName(node);
    this._invoke(node, 'kill');
};

Nodes.prototype.onChildrenMount = function (node) {
    if (this.parentInitd(node)) {
        if (node.initialized) {
            this._invoke(node, 'onChildrenInit')
        } else {
            this._initNode(node, 'onChildrenInit');
        }
    }
};

Nodes.prototype.notifyTransaction = function () {
    if (this.transactionListeners.length > 0) {
        for (var i = 0; i < this.transactionListeners.length; i++) {
            var node = this.ids[this.transactionListeners[i]];
            if (node) {
                this._invoke(node, 'notifyTransaction');
            }
        }
    }
};

Nodes.prototype.initChildren = function (children, filterTags) {
    for (var i = 0; i < children.length; i++) {
        var child = this.ids[children[i]];
        if (this.shouldInitialize(child) && (!filterTags || filterTags.indexOf(child.tag) >= 0)) {
            if (this.initImmediately(child)) {
                this._initNode(child, 'init');
                if (child.children.length > 0) {
                    this.initChildren(child.children);
                    this._invoke(child, 'onChildrenInit');
                }
            } else {
                this._initNode(child, 'onChildrenInit');
            }
        }
    }
};

Nodes.prototype.initImmediately = function (node) {
    var nodeType = nodeTypes[node.tag];
    return nodeType && !nodeType.initOnChildrenMount;
};

module.exports = Nodes;
