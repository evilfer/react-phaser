'use strict';

var treeUtils = require('../../tree-utils'),
    graphicsPropertes = require('../../properties/base/Phaser.Graphics'),

    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),

    itemTypes = require('./renderers'),
    onTextureTypes = {
        'texturetext': require('./texturetext')
    },


    initGraphics = function (node, tree) {
        node.obj = new Phaser.Graphics(treeUtils.game(tree), 0, 0);
        updateGraphics(node, null, tree);
    },

    killGraphics = function (node) {
        node.obj.kill();
    },

    onChildrenInit = function (node, tree) {
        draw(node, tree);

        var game = treeUtils.game(tree),
            texture = new Phaser.RenderTexture(game, node.obj.width, node.obj.height);

        texture.renderXY(node.obj, 0, 0);
        renderOnTexture(node, tree, texture);
        
        var url = texture.getBase64();

        texture.destroy();
        node.obj.destroy();

        if (node.props.frameWidth || node.props.frameHeight) {
            var w = node.props.frameWidth || texture.width,
                h = node.props.frameHeight || texture.height;

            node.obj = game.load.spritesheet(node.props.assetKey, url, w, h);
        } else {
            node.obj = game.load.image(node.props.assetKey, url);
        }
    },

    draw = function (node, tree) {
        for (var i = 0; i < node.children.length; i++) {
            var child = tree.nodes[node.children[i]];
            if (itemTypes[child.tag]) {
                itemTypes[child.tag].draw(child, tree, node.obj, 0, 0);
            }
        }
    },

    renderOnTexture = function (node, tree, texture) {
        for (var i = 0; i < node.children.length; i++) {
            var child = tree.nodes[node.children[i]];
            console.log(child.tag, onTextureTypes[child.tag]);
            if (onTextureTypes[child.tag]) {
                onTextureTypes[child.tag].draw(child, tree, texture);
            }
        }
    };

module.exports = {
    init: initGraphics,
    onChildrenInit: onChildrenInit,
    kill: killGraphics,
    update: updateGraphics
};
