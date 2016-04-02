
var createReactAnything = require('react-anything/src/native');
var NativeImplementation = require('./NativeImplementation');

var ReactPhaser = createReactAnything(NativeImplementation);
var React = ReactPhaser.React;

React.render = ReactPhaser.render;

module.exports = React;
