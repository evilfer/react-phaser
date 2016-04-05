'use strict';


var extend = require('extend'),
    utils = require('../utils');

module.exports = extend(
    {},
    require('./Phaser.Sprite'),
    utils.generateBasicPropMap(['text'])
);

