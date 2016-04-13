'use strict';

var mountGame = function (nodes, node) {
    node._updateMethods = [];
    node.addUpdateListener = function (listener) {
        node._updateMethods.push(listener);
    };
    node.removeUpdateListener = function (listener) {
        var index = node._updateMethods.indexOf(listener);
        if (index >= 0) {
            node._updateMethods.splice(index, 1);
        }
    };
    node.update = function () {
        var context = nodes.context();

        for (var i = 0; i < node._updateMethods.length; i++) {
            node._updateMethods[i](context);
        }
    };

    if (node.props.hasOwnProperty('physics')) {
        node.obj.physics.startSystem(node.props.physics);
    }
};

module.exports = {
    mount: mountGame,
    unmount: function () {
    }
};
