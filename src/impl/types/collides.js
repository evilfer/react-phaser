'use strict';

var systemName = require('../physic-system-name'),

    mountCollides = function (nodes, node) {
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

    unmountCollides = function (nodes, node) {
        nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
    };

module.exports = {
    mount: mountCollides,
    unmount: unmountCollides,
    update: null
};
