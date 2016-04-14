'use strict';

var utils = require('../utils'),
    graphicsPropertes = require('../../properties/base/Phaser.Graphics'),

    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),

    itemTypes = require('./renderers'),

    initGraphics = function (nodes, node) {
        node.obj = new Phaser.Graphics(nodes.game(), 0, 0);
        updateGraphics(nodes, node);
    },

    killGraphics = function (nodes, node) {
    },

    onChildrenInit = function (nodes, node) {
        draw(nodes, node);

        var texture = new Phaser.RenderTexture(nodes.game(), node.obj.width, node.obj.height);
        texture.renderXY(node.obj, 0, 0);
        node.obj.destroy();
        node.obj = texture;
        nodes.game().cache.addRenderTexture(node.props.assetKey, texture);
    },

    draw = function (nodes, node) {
        for (var i = 0; i < node.children.length; i++) {
            var child = nodes.byId(node.children[i]);
            if (itemTypes[child.tag]) {
                itemTypes[child.tag].draw(nodes, child, node.obj, 0, 0);
            }
        }
    };

module.exports = {
    init: initGraphics,
    onChildrenInit: onChildrenInit,
    kill: killGraphics,
    update: updateGraphics
};
