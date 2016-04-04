'use strict';

var mountGame = function (nodes, node) {

    node.collisions = [];
    node.updateMethods = [];

    if (node.props.hasOwnProperty('physics')) {
        node.obj.physics.startSystem(node.props.physics);
        node.physics = 'arcade';
    }
};

module.exports = {
    mount: mountGame,
    unmount: function () {}
};
