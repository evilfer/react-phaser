'use strict';

var Nodes = function () {
    this.gameNode = null;
    this.ids = {};
    this.name2id = {};
    this.id2name = {};
    this.notifyTransaction = [];
};

Nodes.prototype.setGameNode = function (node) {
    this.gameNode = node;  
};

Nodes.prototype.requestTransactionNofitication = function (nodeid) {
    if (this.notifyTransaction.indexOf(nodeid) < 0) {
        this.notifyTransaction.push(nodeid);
    }
};

Nodes.prototype.cancelTransactionNofitication = function (nodeid) {
    var index = this.notifyTransaction.indexOf(nodeid);
    if (index >= 0) {
        this.notifyTransaction.splice(index, 1);
    }
};

Nodes.prototype.popTransactionListeners = function () {
    if (this.notifyTransaction.length > 0) {
        var listeners = this.notifyTransaction;
        this.notifyTransaction = [];
        return listeners;
    } else {
        return null;
    }
};

Nodes.prototype.game = function () {
    return this.gameNode.obj;
};


Nodes.prototype.register = function (node) {
    this.ids[node.id] = node;
    if (node.props.name) {
        this.name2id[node.props.name] = node.id;
        this.id2name[node.id] = node.props.name;
    }
};

Nodes.prototype.update = function (node, lastProps) {
    if (lastProps.name !== node.props.name) {
        delete this.name2id[lastProps.name];
        this.name2id[node.props.name] = node.id;
        this.id2name[node.id] = node.props.name;
    }
};

Nodes.prototype.unregister = function (node) {
    delete this.ids[node.id];
    if (node.props.name) {
        delete this.name2id[node.props.name];
        delete this.id2name[node.id];
    }
};

Nodes.prototype.byId = function (id) {
    return this.ids[id];
};

Nodes.prototype.idByName = function (name) {
    return this.name2id[name];
};

Nodes.prototype.byName = function (name) {
    return this.ids[this.name2id[name]];
};

Nodes.prototype.parent = function (node, tag) {
    while(true) {
        var parent = this.ids[node.parent];
        if (parent === null || parent.tag === tag) {
            return parent;
        } else {
            node = parent;
        }
    }
};

module.exports = Nodes;