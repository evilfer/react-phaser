'use struct';

var nodeTypes = require('./types'),

    mount = function (nodes, node) {
        var nodeType = nodeTypes[node.tag];
        if (nodeType) {
            nodeType.mount(nodes, node);
            if (node.obj) {
                node.obj.rnodeid = node.id;
            }
        }
    },

    update = function (nodes, node, prevProps) {
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
    },

    unmount = function (nodes, node) {
        var nodeType = nodeTypes[node.tag];
        if (nodeType) {
            nodeType.unmount(nodes, node);
        }
    },

    childrenMount = function (nodes, node) {
        var nodeType = nodeTypes[node.tag];
        if (nodeType && nodeType.childrenMount) {
            nodeType.childrenMount(nodes, node);
        }
    },

    notifyTransaction = function (nodes, node) {
        var nodeType = nodeTypes[node.tag];
        if (nodeType && nodeType.notifyTransaction) {
            nodeType.notifyTransaction(nodes, node);
        }
    },

    initChildren = function (nodes, children) {
        children.forEach(function (childId) {
            var child = nodes.ids[childId];
            mount(nodes, child);
            if (child.children.length > 0) {
                initChildren(nodes, child.children);
                childrenMount(nodes, child);
            }
        });
    };

module.exports = {
    mount: mount,
    childrenMount: childrenMount,
    unmount: unmount,
    update: update,
    notifyTransaction: notifyTransaction,
    initChildren: initChildren
};
