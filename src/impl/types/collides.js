'use strict';

var systemName = require('../physic-system-name'),

    initCollides = function (nodes, node) {
        var a = nodes.byId(node.parent),
            b = nodes.byName(node.props.with),
            name = systemName(node.props.system);

        node.obj = {
            a: a,
            b: b,
            onUpdate: function (context) {
                context.game.physics[name].collide(a.obj, b.obj);
            }
        };

        nodes.gameNode.addUpdateListener(node.obj.onUpdate);
    },

    killCollides = function (nodes, node) {
        nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
    };

module.exports = {
    init: initCollides,
    kill: killCollides,
    update: null
};
