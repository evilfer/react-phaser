'use strict';

var utils = require('../utils'),
    graphicsPropertes = require('../../properties/base/Phaser.Graphics'),

    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),

    itemTypes = require('./renderers'),

    mountGraphics = function (nodes, node) {
        node.obj = new Phaser.Graphics(nodes.game(), 0, 0);
        updateGraphics(nodes, node);
    },

    unmountGraphics = function (nodes, node) {
    },

    childrenMount = function (nodes, node) {
        draw(nodes, node);

        var texture = new Phaser.RenderTexture(nodes.game(), node.obj.width, node.obj.height);
        texture.renderXY(node.obj, 0, 0);
        var url = texture.getBase64();
        texture.destroy();
        node.obj.destroy();

        if (node.props.frameWidth || node.props.frameHeight) {
            var w = node.props.frameWidth || texture.width,
                h = node.props.frameHeight || texture.height;

            node.obj = nodes.game().load.spritesheet(node.props.assetKey, url, w, h);
        } else {
            node.obj = nodes.game().load.image(node.props.assetKey, url);
        }
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
    mount: mountGraphics,
    childrenMount: childrenMount,
    unmount: unmountGraphics,
    update: updateGraphics
};
