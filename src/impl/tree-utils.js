'use strict';

var propsChanged = function (nextProps, lastProps) {
        if (!lastProps) {
            return true;
        }

        var npl = Object.keys(nextProps),
            lpl = Object.keys(lastProps);

        if (npl.length !== lpl.length) {
            return true;
        }

        for (var i = 0; i < npl.length; i++) {
            var prop = npl[i];
            if (nextProps[prop] !== lastProps[prop]) {
                return true;
            }
        }

        return false;
    },

    genPropertyMapUpdate = function (props) {
        return function (node, prevProps, tree) {
            if (prevProps) {
                Object.keys(prevProps).forEach(function (prop) {
                    if (props[prop] && typeof node.props[prop] === 'undefined') {
                        props[prop](node, node.props[prop], prevProps[prop], false, true, tree);
                    }
                });
            }
            Object.keys(node.props).forEach(function (prop) {
                if (props[prop] && (!prevProps || node.props[prop] !== prevProps[prop])) {
                    props[prop](node, node.props[prop], prevProps && prevProps[prop], !prevProps, false, tree);
                }
            });
        }
    },

    game = function (tree) {
        return tree.root && tree.root.obj;
    },

    parent = function (node, tree, type) {
        while (true) {
            node = tree.nodes[node.parent];
            if (!node || !type || type === node.tag) {
                return node;
            }
        }
    },

    stateNode = function (node, tree) {
        while (true) {
            node = tree.nodes[node.parent];
            if (!node || node.tag === 'game' || node.tag === 'state') {
                return node;
            }
        }
    },

    addDisplayObject = function (node, tree, obj) {
        var parent = tree.nodes[node.parent],
            group = parent.obj.world || parent.obj;

        group.add(obj || node.obj);
    },

    physics = function (node, tree) {
        var physicsNode = stateNode(node, tree);
        return physicsNode && physicsNode.obj.physics;
    };

module.exports = {
    propsChanged: propsChanged,
    genPropertyMapUpdate: genPropertyMapUpdate,
    game: game,
    parent: parent,
    addDisplayObject: addDisplayObject,
    stateNode: stateNode,
    physics: physics
};
