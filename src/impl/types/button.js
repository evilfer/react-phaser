'use strict';

var utils = require('./utils'),
    buttonPropertes = require('../properties/base/Phaser.Button'),

    updateButton = utils.genPropertyMapUpdate(buttonPropertes),

    mountButton = function (nodes, node) {
        var props = node.props,
            key = props.assetKey;

        node.button = new Phaser.Button(
                nodes.game(),
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
            node.obj = new Phaser.Group(nodes.game());
            node.obj.add(node.button);
        } else {
            node.obj = node.button;
        }

        utils.addNodeDisplayObject(nodes, node);
        updateButton(nodes, node);
    },

    unmountButton = function (nodes, node) {
        node.obj.kill();
    };

module.exports = {
    mount: mountButton,
    unmount: unmountButton,
    update: updateButton
};
