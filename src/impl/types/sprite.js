'use strict';

var utils = require('./utils'),
    spritePropertes = require('../properties/base/Phaser.Sprite'),

    updateSprite = utils.genPropertyMapUpdate(spritePropertes),
    
    initSprite = function (nodes, node) {
        var props = node.props;
        node.obj = new Phaser.Sprite(nodes.game(), props.x, props.y, props.assetKey);
        utils.addNodeDisplayObject(nodes, node);
        updateSprite(nodes, node);
    },

    killSprite = function (nodes, node) {
        node.obj.kill();
    };

module.exports = {
    init: initSprite,
    kill: killSprite,
    update: updateSprite
};
