'use strict';

var treeUtils = require('../tree-utils'),
    
    onChildrenInit = function (node, tree, treeMethods) {
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

                    treeMethods.clearChildren(node, tree);
                    treeMethods.initChildren(node, tree);
                },
                update: function () {
                    for (var i = 0; i < node._updateMethods.length; i++) {
                        node._updateMethods[i](context);
                    }
                }
            },
            game = treeUtils.game(tree),
            state = game.state.add(props.name, stateImpl),
            context = {
                game: game,
                state: state,
                nodes: tree.byname
            };

        node.obj = state;
        node.context = context;
    };

module.exports = {
    init: null,
    onChildrenInit: onChildrenInit,
    kill: null,
    deferredInit: true
};
