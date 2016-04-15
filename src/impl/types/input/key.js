'use strict';

var utils = require('../utils'),
    keyPropertes = require('../../properties/custom/key'),

    updateKey = utils.genPropertyMapUpdate(keyPropertes),

    events = ["onDown", "onUp", "onHoldCallback"],

    initKey = function (nodes, node) {
        var context = nodes.context(node);
        if (context.input && node.props.keyName && node.props.keyCode) {
            var phaserInput = nodes.gameState(node).obj.input,
                input = context.input,
                key = phaserInput.keyboard.addKey(node.props.keyCode);

            if (!input.keys) {
                input.keys = {};
            }

            node.obj = key;
            input.keys[node.props.keyName] = node.obj;

            events.forEach(function (event) {
                var listener = node.props[event];
                if (listener) {
                    key[event].add(function (key) {
                        listener(key, context);
                    });
                }
            });
        }
    },

    killKey = function (nodes, node) {
        if (node.obj) {
            var game = nodes.game(),
                context = nodes.context(node);

            game.input.keyboard.removeKey(node.obj.keyCode);
            delete context.input[node.props.keyName];
        }
    };

module.exports = {
    init: initKey,
    kill: killKey,
    update: updateKey
};
