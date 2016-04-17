
var createReactAnything = require('react-anything/src/native');
var phaserImplementation = require('./phaser-implementation');

var ReactPhaser = createReactAnything(phaserImplementation);
var React = ReactPhaser.React;

React.render = ReactPhaser.render;

module.exports = React;
