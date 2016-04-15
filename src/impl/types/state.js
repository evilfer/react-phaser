'use strict';

var onChildrenInit = function (nodes, node) {
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

    var props = node.props,
        stateImpl = {
            create: function () {
                if (node.props.hasOwnProperty('physics')) {
                    node.obj.physics.startSystem(node.props.physics);
                }

                nodes.initChildren(node.children);
            },
            update: function () {
                for (var i = 0; i < node._updateMethods.length; i++) {
                    node._updateMethods[i](context);
                }
            }
        },
        game = nodes.game(),
        state = game.state.add(props.name, stateImpl),
        context = {
            game: nodes.game(),
            state: state,
            nodes: nodes.name2node
        };

    node.obj = state;
    node.context = context;
};

module.exports = {
    init: null,
    onChildrenInit: onChildrenInit,
    kill: null,
    initOnChildrenMount: true
};
