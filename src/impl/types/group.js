'use strict';

var treeUtils = require('../tree-utils'),
    groupPropertes = require('../properties/base/Phaser.Group'),

    updateGroup = treeUtils.genPropertyMapUpdate(groupPropertes),

    initGroup = function (node, tree) {
        node.obj = new Phaser.Group(treeUtils.game(tree));
        treeUtils.addDisplayObject(node, tree);
        updateGroup(node, null, tree);
    },

    killGroup = function (node) {
        node.obj.destroy();
    };

module.exports = {
    init: initGroup,
    kill: killGroup,
    update: updateGroup
};
