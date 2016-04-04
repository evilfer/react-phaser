'use strict';

var mountCollides = function (nodes, node) {
    var overlapsWithId = nodes.idByName(node.props.with);
    node.obj = {
        pair: [node.parent, overlapsWithId],
        callback: function (a, b) {
            node.props.onOverlap(nodes.byId(a.rnodeid), nodes.byId(b.rnodeid))
        }
    };

    nodes.gameNode.overlaps.push(node.obj);
};

module.exports = {
    mount: mountCollides,
    unmount: function () {
    },
    update: null
};
