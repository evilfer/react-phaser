'use strict';

var treeUtils = require('../tree-utils'),
    buttonPropertes = require('../properties/base/Phaser.Button'),

    updateButton = treeUtils.genPropertyMapUpdate(buttonPropertes),

    initButton = function (node, tree) {
        var props = node.props,
            key = props.assetKey,
            game = treeUtils.game(tree);

        node.button = new Phaser.Button(
            game,
            props.x,
            props.y,
            key,
            props.onClick,
            node,
            props.frames[0],
            props.frames[1],
            props.frames[2],
            props.frames[3]
        );

        if (node.props.children) {
            node.obj = new Phaser.Group(game);
            node.obj.add(node.button);
        } else {
            node.obj = node.button;
        }

        treeUtils.addDisplayObject(node, tree);
        updateButton(node, null, tree);
    },

    killButton = function (node, tree) {
        if (node.obj !== node.button) {
            node.obj.destroy();
        } else {
            node.obj.kill();
        }
    };

module.exports = {
    init: initButton,
    kill: killButton,
    update: updateButton
};
