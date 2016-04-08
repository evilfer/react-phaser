'use struct';

var nodeTypes = require('./types');

var mount = function (nodes, node) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType) {
        nodeType.mount(nodes, node);
        if (node.obj) {
            node.obj.rnodeid = node.id;
        }
    }
};

var update = function (nodes, node, prevProps) {
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
            nodeType.update(nodes, node, changedProps, prevProps);
        }
    }
};

var unmount = function (nodes, node) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType) {
        nodeType.unmount(nodes, node);
    }
};

var childrenMount = function (nodes, node) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType && nodeType.childrenMount) {
        nodeType.childrenMount(nodes, node);
    }
};

var notifyTransaction = function (nodes, node) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType && nodeType.notifyTransaction) {
        nodeType.notifyTransaction(nodes, node);
    }
};

module.exports = {
    mount: mount,
    childrenMount: childrenMount,
    unmount: unmount,
    update: update,
    notifyTransaction
};
