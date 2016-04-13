'use strict';

var extend = require('extend');

module.exports = extend(
    {
        graphics: require('./graphics'),
        rendertexture: require('./rendertexture'),
        renderimage: require('./renderimage')
    },
    require('./renderers')
);
