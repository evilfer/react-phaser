'use strict';

var treeUtils = require('../tree-utils'),
    gamePropertes = require('../properties/base/Phaser.Game'),

    updateGame = treeUtils.genPropertyMapUpdate(gamePropertes),

    onChildrenInit = function (node, tree, nodeMethods) {
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
            gameImpl = {
                preload: function () {
                    updateGame(node, null, tree);
                    if (props.assets) {
                        Object.keys(props.assets).forEach(function (key) {
                            var asset = props.assets[key];
                            switch (asset.type) {
                                case 'image':
                                    game.load.image(key, asset.src);
                                    break;
                                case 'spritesheet':
                                    game.load.spritesheet(key, asset.src, asset.width, asset.height);
                                    break;
                            }
                        });
                    }
                    nodeMethods.initChildren(node, tree, {include: ['assets']});
                },
                create: function () {

                    if (node.props.hasOwnProperty('physics')) {
                        node.obj.physics.startSystem(node.props.physics);
                    }

                    nodeMethods.initChildren(node, tree);

                    if (node.props.stateName) {
                        game.state.start(node.props.stateName);
                    }
                },
                update: function () {
                    for (var i = 0; i < node._updateMethods.length; i++) {
                        node._updateMethods[i](context);
                    }
                }
            },

            game = new Phaser.Game(props.width, props.height, props.mode || Phaser.AUTO, '', gameImpl),
            context = {
                game: game,
                nodes: tree.byname
            };

        node.obj = game;
        node.context = context;
    };

module.exports = {
    init: null,
    onChildrenInit: onChildrenInit,
    update: updateGame,
    kill: null,
    deferredInit: true
};
