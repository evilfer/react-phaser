'use strict';

var treeUtils = require('../../tree-utils'),

    drawTextureText = function (node, tree, texture) {
        var props = node.props,
            text = new Phaser.Text(treeUtils.game(tree), 0, 0, props.text, props.style),
            x = (props.x || 0) +
            (props.align ? (props.align.indexOf('right') >= 0 ? -text.width :
                (props.align.indexOf('center') >= 0 ? -0.5 * text.width : 0)) : 0),
            y = (props.y || 0) +
            (props.align ? (props.align.indexOf('bottom') >= 0 ? -text.height:
                (props.align.indexOf('middle') >= 0 ? -0.5 * text.height : 0)) : 0);

        texture.renderXY(text, x, y);
        text.destroy();
    };

module.exports = {
    draw: drawTextureText
};
