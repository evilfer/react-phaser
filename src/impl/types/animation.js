'use strict';

var treeUtils = require('../tree-utils'),

    initAnimation = function (node, tree) {
        var parentNode = treeUtils.parent(node, tree);
        node.obj = parentNode.obj.animations.add(node.props.id, node.props.frames, node.props.fps, node.props.loop);
    };

module.exports = {
    init: initAnimation,
    kill: null,
    update: null
};
