'use strict';

var systemName = require('../physic-system-name'),

    mountOverlaps = function (nodes, node) {
        var a = nodes.byId(node.parent),
            b = nodes.byName(node.props.with),
            name = systemName(node.props.system),
            onOverlap = node.props.onOverlap;

        node.obj = {
            a: a,
            b: b,
            onUpdate: function (context) {
                context.game.physics[name].overlap(a.obj, b.obj, function (overlappingA, overlappingB) {
                    onOverlap(nodes.byId(overlappingA.rnodeid), nodes.byId(overlappingB.rnodeid), context, a, b);
                });
            }
        };

        nodes.gameNode.addUpdateListener(node.obj.onUpdate);
    },

    unmountOverlaps = function (nodes, node) {
        nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
    };

module.exports = {
    mount: mountOverlaps,
    unmount: unmountOverlaps,
    update: null
};
