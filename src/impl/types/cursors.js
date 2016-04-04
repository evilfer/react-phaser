'use strict';

var mountCursors = function (nodes, node) {
    var onInput = node.props.onInput,
        cursors = nodes.game().input.keyboard.createCursorKeys();

    node.obj = {
        cursors: cursors,
        callback: onInput.bind(null, cursors, function (name) {
            return nodes.byName(name).obj;
        })
    };

    nodes.gameNode.updateMethods.push(node.obj.callback);
};

module.exports = {
    mount: mountCursors,
    unmount: function () {
    },
    update: null
};
