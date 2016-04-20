'use strict';

var treeUtils = require('../../tree-utils'),

    defaultPointerNumber = 2,
    events = ["onDown", "onUp", "onTap", "onHold"],

    clearInput = function (node, tree) {
        var context = treeUtils.stateNode(node, tree).context;
        delete context.input;
    },

    initInput = function (node, tree) {
        var stateNode = treeUtils.stateNode(node, tree);
        if (!stateNode.context.input) {
            var phaserInput = stateNode.obj.input,
                pointerCount = node.props.pointers || defaultPointerNumber,
                input = {
                    mousePointer: phaserInput.mousePointer,
                    activePointer: phaserInput.activePointer,
                    pointers: []
                };

            node.obj = {
                input: input
            };

            stateNode.context.input = input;

            for (var i = 0; i < pointerCount; i++) {
                if (i >= defaultPointerNumber) {
                    phaserInput.addPointer();
                }
                input.pointers[i] = phaserInput['pointer' + (i + 1)];
            }

            events.forEach(function (event) {
                var listener = node.props[event];
                if (listener) {
                    phaserInput[event].add(function (pointer) {
                        listener(pointer, stateNode.context);
                    });
                }
            });

            if (node.props.cursors) {
                input.cursors = phaserInput.keyboard.createCursorKeys();
            }

            if (node.props.keys) {
                input.keys = Object.keys(node.props.keys).reduce(function (acc, key) {
                    acc[key] = phaserInput.keyboard.addKey(node.props.keys[key]);
                }, {});
            }

            if (node.props.onInput) {
                stateNode.addUpdateListener(node.props.onInput);
            }
        }
    };

module.exports = {
    init: initInput,
    clear: clearInput,
    kill: null,
    update: null
};
