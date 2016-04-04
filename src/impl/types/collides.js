'use strict';

var mountCollides = function (nodes, node) {
    var collidesWithId = nodes.idByName(node.props.with);
    node.obj = [node.parent, collidesWithId];
    nodes.gameNode.collisions.push(node.obj);
};

module.exports = {
    mount: mountCollides,
    unmount: function () {
    },
    update: null
};
