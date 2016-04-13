'use strict';

var defaultPointerNumber = 2,
    events = ["onDown", "onUp", "onTap", "onHold"],

    mountInput = function (nodes, node) {
        var context = nodes.context();
        if (!context.input) {
            var game = nodes.game(),
                pointerCount = node.props.pointers || defaultPointerNumber,
                input = {
                    mousePointer: game.input.mousePointer,
                    activePointer: game.input.activePointer,
                    pointers: []
                };

            node.obj = {
                input: input
            };
            context.input = input;


            for (var i = 0; i < pointerCount; i++) {
                if (i >= defaultPointerNumber) {
                    game.input.addPointer();
                }
                input.pointers[i] = game.input['pointer' + (i + 1)];
            }

            events.forEach(function (event) {
                var listener = node.props[event];
                if (listener) {
                    game.input[event].add(function (pointer) {
                        listener(pointer, context);
                    });
                }
            });

            if (node.props.cursors) {
                input.cursors = game.input.keyboard.createCursorKeys();
            }

            if (node.props.keys) {
                input.keys = Object.keys(node.props.keys).reduce(function (acc, key) {
                    acc[key] = game.input.keyboard.addKey(node.props.keys[key]);
                }, {});
            }

            if (node.props.onInput) {
                nodes.gameNode.addUpdateListener(node.props.onInput);
            }
        }
    };

module.exports = {
    mount: mountInput,
    unmount: function () {
    },
    update: null
};
