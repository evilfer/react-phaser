'use strict';

var initAnimation = function (nodes, node) {
        var parentNode = nodes.byId(node.parent);
        node.obj = parentNode.obj.animations.add(node.props.id, node.props.frames, node.props.fps, node.props.loop);
    };

module.exports = {
    init: initAnimation,
    kill: null,
    update: null
};
