'use strict';

var utils = require('./utils'),
    textPropertes = require('../properties/base/Phaser.Text'),

    updateText = utils.genPropertyMapUpdate(textPropertes),
    
    mountText = function (nodes, node) {
        var props = node.props;
        node.obj = new Phaser.Text(nodes.game(), props.x, props.y, props.text, props.style);
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
