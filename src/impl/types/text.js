'use strict';

var treeUtils = require('../tree-utils'),
    textPropertes = require('../properties/base/Phaser.Text'),

    updateText = treeUtils.genPropertyMapUpdate(textPropertes),
    
    initText = function (node, tree) {
        var props = node.props;
        node.obj = new Phaser.Text(treeUtils.game(tree), props.x, props.y, props.text, props.style);
        treeUtils.addDisplayObject(node, tree);
    },

    killText = function (nodes, node) {
        node.obj.kill();
    };

module.exports = {
    init: initText,
    kill: killText,
    update: updateText
};
