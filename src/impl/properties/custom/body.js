'use strict';

var extend = require('extend'),
    utils = require('../utils'),
    treeUtils = require('../../tree-utils');

module.exports = extend(
    {},
    utils.generatePrefixedBasicPropMap('body', ['immovable', 'collideWorldBounds']),
    utils.generatePrefixedPointPropMap('body', ['bounce', 'gravity']),
    utils.generateMountOnlyPropMap({
        bodyPhysics: function (node, value, tree) {
            var physics = treeUtils.physics(node, tree),
                system = value !== true ? value : physics.system;

            physics.enable(node.obj, system);
        }
    })
);
