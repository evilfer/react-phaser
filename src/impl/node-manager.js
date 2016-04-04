'use struct';

var nodeTypes = require('./types');

var mount = function (nodes, node) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType) {
        nodeType.mount(nodes, node);
    }
};

var update = function (nodes, node, prevProps) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType && nodeType.update) {
        var changedProps = Object.keys(node.props);
        changedProps = changedProps.filter(function (key) {
            return node.props[key] !== prevProps[key];
        });

        Object.keys(prevProps).forEach(function (key) {
            if (!(key in node.props)) {
                changedProps.push(key);
            }
        });

        if (changedProps.length > 0) {
            nodeType.update(nodes, node, changedProps, lastProps);
        }
    }
};

var unmount = function (nodes, node) {
    var nodeType = nodeTypes[node.tag];
    if (nodeType) {
        nodeType.unmount(nodes, node);
    }
}

module.exports = {
    mount: mount,
    unmount: unmount,
    udpate: update
};
