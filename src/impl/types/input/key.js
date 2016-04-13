'use strict';

var utils = require('../utils'),
    keyPropertes = require('../../properties/custom/key'),

    updateKey = utils.genPropertyMapUpdate(keyPropertes),

    events = ["onDown", "onUp", "onHoldCallback"],

    mountKey = function (nodes, node) {
        var context = nodes.context();
        if (context.input && node.props.keyName && node.props.keyCode) {
            var game = nodes.game(),
                input = context.input,
                key = game.input.keyboard.addKey(node.props.keyCode);

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

    unmountKey = function (nodes, node) {
        if (node.obj) {
            var game = nodes.game(),
                context = nodes.context();

            game.input.keyboard.removeKey(node.obj.keyCode);
            delete context.input[node.props.keyName];
        }
    };

module.exports = {
    mount: mountKey,
    unmount: unmountKey,
    update: updateKey
};
