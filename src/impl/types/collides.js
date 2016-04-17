'use strict';

var treeUtils = require('../tree-utils'),
    systemName = require('../physic-system-name'),

    initCollides = function (node, tree) {
        var a = tree.nodes[node.parent],
            b = tree.byname[node.props.with],
            name = systemName(node.props.system),
            stateNode = treeUtils.stateNode(node, tree);

        node.obj = {
            a: a,
            b: b,
            onUpdate: function (context) {
                context.game.physics[name].collide(a.obj, b.obj);
            }
        };

        stateNode.addUpdateListener(node.obj.onUpdate);
    },

    killCollides = function (node, tree) {
        var stateNode = treeUtils.stateNode(node, tree);
        stateNode.removeUpdateListener(node.obj.onUpdate);
    };

module.exports = {
    init: initCollides,
    kill: killCollides,
    update: null
};
