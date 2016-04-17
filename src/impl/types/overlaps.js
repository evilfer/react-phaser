'use strict';

var treeUtils = require('../tree-utils'),
    systemName = require('../physic-system-name'),

    initOverlaps = function (node, tree) {
        var a = tree.nodes[node.parent],
            b = tree.byname[node.props.with],
            name = systemName(node.props.system),
            stateNode = treeUtils.stateNode(node, tree),
            onOverlap = node.props.onOverlap;

        node.obj = {
            a: a,
            b: b,
            onUpdate: function (context) {
                context.game.physics[name].overlap(a.obj, b.obj, function (overlappingA, overlappingB) {
                    onOverlap(tree.nodes[overlappingA.rnodeid], tree.nodes[overlappingB.rnodeid], context, a, b);
                });
            }
        };

        stateNode.addUpdateListener(node.obj.onUpdate);
    },

    killOverlaps = function (nodes, node) {
        nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
    };

module.exports = {
    init: initOverlaps,
    kill: killOverlaps,
    update: null
};
