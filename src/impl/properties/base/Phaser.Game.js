'use strict';

var extend = require('extend'),
    utils = require('../utils'),

    generateCustomPropMap = utils.generateCustomPropMap,
    generatePrefixedBasicPropMap = utils.generatePrefixedBasicPropMap;


module.exports = extend(
    generateCustomPropMap({
        'stateName': function (node, value) {
            if (value) {
                node.obj.state.start(value);
            }
        }
    }),
    generatePrefixedBasicPropMap('stage', ['backgroundColor'])
);
