'use strict';


var extend = require('extend'),
    generateBasicPropMap = require('../utils').generateBasicPropMap;

module.exports = extend(
    {},
    require('./PIXI.DisplayObjectContainer'),
    generateBasicPropMap(['enableBody'])
);
