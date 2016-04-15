'use strict';

var extend = require('extend');

module.exports = extend(
    {
        game: require('./game'),
        state: require('./state'),
        sprite: require('./sprite'),
        group: require('./group'),
        animation: require('./animation'),
        collides: require('./collides'),
        overlaps: require('./overlaps'),
        text: require('./text'),
        button: require('./button')
    },
    require('./graphics'),
    require('./input')
);

