'use strict';

var utils = require('./utils'),

    updateText = utils.genPropertyUpdate('text'),
    
    mountText = function (nodes, node) {
        var {x = 0, y = 0, content, style} = node.props;
        node.obj = new Phaser.Text(nodes.game(), x, y, content, style);
        utils.addNodeDisplayObject(nodes, node);
    },

    unmountText = function (nodes, node) {
        node.obj.kill();
    };

module.exports = {
    mount: mountText,
    unmount: unmountText,
    update: updateText
};
