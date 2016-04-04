'use strict';

var utils = require('./utils'),

    updateSprite = utils.genPropertyUpdate('actor'),
    
    mountSprite = function (nodes, node) {
        var {x = 0, y = 0, sprite} = node.props;
        node.obj = new Phaser.Sprite(nodes.game(), x, y, sprite);
        utils.addNodeDisplayObject(nodes, node);
        updateSprite(nodes, node);
    };

module.exports = {
    mount: mountSprite,
    unmount: function () {
    },
    update: updateSprite
};
