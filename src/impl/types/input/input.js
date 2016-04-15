'use strict';

var defaultPointerNumber = 2,
    events = ["onDown", "onUp", "onTap", "onHold"],

    initInput = function (nodes, node) {
        var context = nodes.context(node);
        
        if (!context.input) {
            var phaserInput = nodes.gameState(node).obj.input,
                pointerCount = node.props.pointers || defaultPointerNumber,
                input = {
                    mousePointer: phaserInput.mousePointer,
                    activePointer: phaserInput.activePointer,
                    pointers: []
                };

            node.obj = {
                input: input
            };
            context.input = input;
            
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
                        listener(pointer, context);
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
                nodes.gameNode.addUpdateListener(node.props.onInput);
            }
        }
    };

module.exports = {
    init: initInput,
    kill: null,
    update: null
};
