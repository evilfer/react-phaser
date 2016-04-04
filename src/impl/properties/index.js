'use strict';

module.exports = {
    actor: {
        'enableBody': function (nodes, node, value) {
            node.obj.enableBody = value;
        },
        'scale': function (nodes, node, value) {
            node.obj.scale.setTo(value[0], value[1]);
        },
        'bodyImmovable': function (nodes, node, value) {
            node.obj.body.immovable = value;
        },
        'physics': function (nodes, node, value) {
            if (value) {
                nodes.game().physics.arcade.enable(node.obj);
            } else {
                nodes.game().physics.arcade.disable(node.obj);
                /* ?? */
            }
        },
        'bounceX': function (nodes, node, value) {
            node.obj.body.bounce.x = value;
        },
        'bounceY': function (nodes, node, value) {
            node.obj.body.bounce.y = value;
        },
        'gravityX': function (nodes, node, value) {
            node.obj.body.gravity.x = value;
        },
        'gravityY': function (nodes, node, value) {
            node.obj.body.gravity.y = value;
        },
        'collideWorldBounds': function (nodes, node, value) {
            node.obj.body.collideWorldBounds = value;
        }
    },
    'text': {
        'content': function (nodes, node, value) {
            node.obj.text = value;
        }
    }
};
