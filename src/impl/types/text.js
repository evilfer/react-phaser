'use strict';

var utils = require('./utils'),
    textPropertes = require('../properties/base/Phaser.Text'),

    updateText = utils.genPropertyMapUpdate(textPropertes),
    
    initText = function (nodes, node) {
        var props = node.props;
        node.obj = new Phaser.Text(nodes.game(), props.x, props.y, props.text, props.style);
        utils.addNodeDisplayObject(nodes, node);
    },

    killText = function (nodes, node) {
        node.obj.kill();
    };

module.exports = {
    init: initText,
    kill: killText,
    update: updateText
};
