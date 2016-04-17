'use strict';

var treeUtils= require('../../tree-utils'),
    keyPropertes = require('../../properties/custom/key'),

    updateKey = treeUtils.genPropertyMapUpdate(keyPropertes),

    events = ["onDown", "onUp", "onHoldCallback"],

    initKey = function (node, tree) {
        var stateNode = treeUtils.stateNode(node, tree);
        if (stateNode.context.input && node.props.keyName && node.props.keyCode) {
            var phaserInput = stateNode.obj.input,
                input = stateNode.context.input,
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
                        listener(key, stateNode.context);
                    });
                }
            });
        }
    },

    killKey = function (node, tree) {
        if (node.obj) {
            var stateNode = treeUtils.stateNode(node, tree);

            stateNode.obj.keyboard.removeKey(node.obj.keyCode);
            delete stateNode.context.input[node.props.keyName];
        }
    };

module.exports = {
    init: initKey,
    kill: killKey,
    update: updateKey
};
