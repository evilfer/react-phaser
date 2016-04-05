'use strict';

var utils = require('./utils'),
    groupPropertes = require('../properties/base/Phaser.Group'),

    updateGroup = utils.genPropertyMapUpdate(groupPropertes),

    mountGroup = function (nodes, node) {
        node.obj = new Phaser.Group(nodes.game());
        utils.addNodeDisplayObject(nodes, node);
        updateGroup(nodes, node);
    };

module.exports = {
    mount: mountGroup,
    unmount: function () {
    },
    update: updateGroup
};
