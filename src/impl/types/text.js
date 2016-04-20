'use strict';

var treeUtils = require('../tree-utils'),
    textPropertes = require('../properties/base/Phaser.Text'),

    updateText = treeUtils.genPropertyMapUpdate(textPropertes),

    initText = function (node, tree) {
        var props = node.props,
            text = new Phaser.Text(treeUtils.game(tree), 0, 0, props.text, props.style),
            container = treeUtils.parent(node, tree).obj,
            x = props.x || (props.align && (container.width - text.width) * (props.align.indexOf('right') >= 0 ? 1 :
                    (props.align.indexOf('center') >= 0 ? .5 : 0))) || 0,
            y = props.y || (props.align && (container.height - text.height) * (props.align.indexOf('bottom') >= 0 ? 1 :
                    (props.align.indexOf('middle') >= 0 ? .5 : 0))) || 0;

        text.x = x;
        text.y = y;
        node.obj = text;
        treeUtils.addDisplayObject(node, tree);
    },

    killText = function (node, tree) {
        node.obj.kill();
    };

module.exports = {
    init: initText,
    kill: killText,
    update: updateText
};
