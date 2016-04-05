'use strict';

var extend = require('extend'),
    utils = require('../utils');

module.exports = extend(
    {},
    utils.generateBasicPropMap(['x', 'y']),
    require('../custom/body')
);
