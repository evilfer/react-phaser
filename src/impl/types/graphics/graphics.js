'use strict';

var treeUtils = require('../../tree-utils'),
    graphicsPropertes = require('../../properties/base/Phaser.Graphics'),

    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),

    itemTypes = require('./renderers'),

    initGraphics = function (node, tree) {
        var props = node.props;
        node.obj = new Phaser.Graphics(treeUtils.game(tree), props.x, props.y);
        treeUtils.addDisplayObject(node, tree);
        updateGraphics(node, tree);
    },

    killGraphics = function (node) {
        node.obj.kill();
    },

    onChildrenInit = function (node, tree, treeMethods) {
        treeMethods.cancelTransactionNofitication(node.id);
        draw(node, tree);
    },

    redraw = function (node, tree) {
        node.obj.clear();
        draw(node, tree);
    },

    draw = function (node, tree) {
        for (var i = 0; i < node.children.length; i++) {
            var child = tree.nodes[node.children[i]];
            if (itemTypes[child.tag]) {
                itemTypes[child.tag].draw(child, tree, node.obj, 0, 0);
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
