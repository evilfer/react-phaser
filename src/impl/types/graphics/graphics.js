'use strict';

var utils = require('../utils'),
    graphicsPropertes = require('../../properties/base/Phaser.Graphics'),

    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),

    itemTypes = require('./renderers'),

    initGraphics = function (nodes, node) {
        var props = node.props;
        node.obj = new Phaser.Graphics(nodes.game(), props.x, props.y);
        utils.addNodeDisplayObject(nodes, node);
        updateGraphics(nodes, node);
    },

    killGraphics = function (nodes, node) {
        node.obj.kill();
    },

    onChildrenInit = function (nodes, node) {
        nodes.cancelTransactionNofitication(node.id);
        draw(nodes, node);
    },

    redraw = function (nodes, node) {
        node.obj.clear();
        draw(nodes, node);
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
    update: updateGraphics,
    notifyTransaction: redraw
};
