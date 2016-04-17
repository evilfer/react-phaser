'use strict';

var treeUtils = require('../tree-utils'),
    spritePropertes = require('../properties/base/Phaser.Sprite'),

    updateSprite = treeUtils.genPropertyMapUpdate(spritePropertes),
    
    initSprite = function (node, tree) {
        var props = node.props;
        node.obj = new Phaser.Sprite(treeUtils.game(tree), props.x, props.y, props.assetKey);
        treeUtils.addDisplayObject(node, tree);
        updateSprite(node, null, tree);
    },

    killSprite = function (node, tree) {
        node.obj.kill();
    };

module.exports = {
    init: initSprite,
    kill: killSprite,
    update: updateSprite
};
