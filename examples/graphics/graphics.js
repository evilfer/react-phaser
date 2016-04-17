/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    assets = {
	    'sky': { type: 'image', src: '../assets/sky.png' },
	    'ground': { type: 'image', src: '../assets/platform.png' },
	    'star': { type: 'image', src: '../assets/star.png' },
	    'dude': { type: 'spritesheet', src: '../assets/dude.png', width: 32, height: 48 },
	    'button': { type: 'spritesheet', src: '../assets/button_sprite_sheet.png', width: 193, height: 71 }
	},
	    scoreStyle = {
	    fontSize: '32px',
	    fill: '#000'
	},
	    MyGame = React.createClass({
	    displayName: 'MyGame',
	
	    getInitialState: function getInitialState() {
	        return {
	            stars: Array.apply(null, { length: 12 }).map(function (_, i) {
	                return [i, 0.7 + Math.random() * 0.2];
	            }),
	            score: 0
	        };
	    },
	
	    onInput: function onInput(context) {
	        var player = context.nodes.player.obj,
	            cursors = context.input.cursors;
	
	        if (cursors.left.isDown) {
	            player.body.velocity.x = -150;
	            player.animations.play('left');
	        } else if (cursors.right.isDown) {
	            player.body.velocity.x = 150;
	            player.animations.play('right');
	        } else {
	            player.body.velocity.x = 0;
	            player.animations.stop();
	            player.frame = 4;
	        }
	
	        if (cursors.up.isDown && player.body.touching.down) {
	            player.body.velocity.y = -350;
	        }
	    },
	
	    collectStar: function collectStar(playerNode, starNode) {
	        this.setState({
	            stars: this.state.stars.filter(function (_, i) {
	                return i !== starNode.props.i;
	            }),
	            score: this.state.score + 10
	        });
	    },
	
	    render: function render() {
	        var stars = this.state.stars.map(function (star, i) {
	            return React.createElement('sprite', { key: star[0], i: i, x: star[0] * 70, y: 0, assetKey: 'star',
	                bodyGravityY: 18, bodyBounceY: star[1] });
	        });
	
	        return React.createElement(
	            'game',
	            { assets: assets, width: 800, height: 600, physics: Phaser.Physics.ARCADE },
	            React.createElement('sprite', { assetKey: 'sky' }),
	            React.createElement(
	                'group',
	                { name: 'platforms', enableBody: true },
	                React.createElement('sprite', { name: 'ground', assetKey: 'ground', y: 600 - 64, scale: { x: 2, y: 2 }, bodyImmovable: true }),
	                React.createElement('sprite', { name: 'ledge1', assetKey: 'ground', x: 400, y: 400, bodyImmovable: true }),
	                React.createElement('sprite', { name: 'ledge2', assetKey: 'ground', x: -150, y: 250, bodyImmovable: true })
	            ),
	            React.createElement(
	                'group',
	                { name: 'stars', enableBody: true },
	                React.createElement('collides', { 'with': 'platforms' }),
	                stars
	            ),
	            React.createElement(
	                'sprite',
	                { name: 'player', x: 32, y: 450, assetKey: 'dude',
	                    bodyPhysics: true, bodyBounceY: 0.2, bodyGravityY: 300,
	                    bodyCollideWorldBounds: true },
	                React.createElement('animation', { id: 'left', frames: [0, 1, 2, 3], fps: 10, loop: true }),
	                React.createElement('animation', { id: 'right', frames: [5, 6, 7, 8], fps: 10, loop: true }),
	                React.createElement('collides', { 'with': 'platforms' }),
	                React.createElement('overlaps', { 'with': 'stars', onOverlap: this.collectStar })
	            ),
	            React.createElement('text', { text: 'Score: ' + this.state.score, style: scoreStyle,
	                x: 16, y: 16 }),
	            React.createElement(
	                'button',
	                { x: 0, y: 0, assetKey: 'button', frames: [2, 1, 0] },
	                React.createElement('text', { text: 'hi!' })
	            ),
	            React.createElement(
	                'graphics',
	                { x: 20, y: 10 },
	                React.createElement(
	                    'shape',
	                    { fill: 0xFF3300, strokeWidth: 10, stroke: 0xffd900 },
	                    React.createElement('line', { x1: 50, y1: 50, x2: 250, y2: 50 }),
	                    React.createElement('lineto', { x: 100, y: 100 }),
	                    React.createElement('lineto', { x: 250, y: 220 }),
	                    React.createElement('lineto', { x: 50, y: 220 }),
	                    React.createElement('lineto', { x: 50, y: 50 })
	                ),
	                React.createElement('shape', { x: 40, y: 80, fill: 0xFF3300, strokeWidth: 10, stroke: 0xffd900,
	                    s: 'm50,50 l250,50 l100,100 l250,200 l50, 220 l50,50' }),
	                React.createElement(
	                    'shape',
	                    { fill: 0xFF700B, strokeWidth: 10, stroke: 0xFF0000, strokeAlpha: 0.8 },
	                    React.createElement('line', { x1: 210, y1: 300, x2: 450, y2: 320 }),
	                    React.createElement('lineto', { x: 570, y: 350 }),
	                    React.createElement('curveto', { cpx: 600, cpy: 0, x: 480, y: 100 }),
	                    React.createElement('lineto', { x: 330, y: 120 }),
	                    React.createElement('lineto', { x: 410, y: 200 }),
	                    React.createElement('lineto', { x: 210, y: 300 })
	                ),
	                React.createElement('rect', { strokeWidth: 2, stroke: 0x0000FF,
	                    x: 50, y: 250, width: 100, height: 100 }),
	                React.createElement('circle', { fill: 0xFFFF0B, fillAlpha: 0.5,
	                    x: 470, y: 200, diameter: 200 }),
	                React.createElement('line', { strokeWidth: 20, stroke: 0x33FF00,
	                    x1: 30, y1: 30, x2: 600, y2: 600 })
	            ),
	            React.createElement('input', { cursors: true, onInput: this.onInput })
	        );
	    }
	});
	
	React.render(React.createElement(MyGame, null), 'game');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createReactAnything = __webpack_require__(2);
	var phaserImplementation = __webpack_require__(66);
	
	var ReactPhaser = createReactAnything(phaserImplementation);
	var React = ReactPhaser.React;
	
	React.render = ReactPhaser.render;
	
	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var React = __webpack_require__(3);
	
	var createReactAnything = __webpack_require__(33);
	var createNativeReactAnything = function (nativeImplementation) {
	    return createReactAnything(React, nativeImplementation);
	};
	
	module.exports = createNativeReactAnything;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */
	
	'use strict';
	
	var ReactChildren = __webpack_require__(5);
	var ReactComponent = __webpack_require__(16);
	var ReactClass = __webpack_require__(22);
	var ReactDOMFactories = __webpack_require__(27);
	var ReactElement = __webpack_require__(8);
	var ReactElementValidator = __webpack_require__(28);
	var ReactPropTypes = __webpack_require__(30);
	var ReactVersion = __webpack_require__(31);
	
	var onlyChild = __webpack_require__(32);
	
	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;
	
	if (process.env.NODE_ENV !== 'production') {
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}
	
	var React = {
	
	  // Modern
	
	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },
	
	  Component: ReactComponent,
	
	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,
	
	  // Classic
	
	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },
	
	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,
	
	  version: ReactVersion
	};
	
	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */
	
	'use strict';
	
	var PooledClass = __webpack_require__(6);
	var ReactElement = __webpack_require__(8);
	
	var emptyFunction = __webpack_require__(12);
	var traverseAllChildren = __webpack_require__(14);
	
	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;
	
	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}
	
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
	
	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;
	
	  func.call(context, child, bookKeeping.count++);
	}
	
	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}
	
	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);
	
	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;
	
	
	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}
	
	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}
	
	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}
	
	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}
	
	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}
	
	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}
	
	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};
	
	module.exports = ReactChildren;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(7);
	
	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};
	
	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};
	
	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};
	
	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};
	
	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};
	
	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};
	
	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;
	
	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};
	
	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};
	
	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var ReactCurrentOwner = __webpack_require__(10);
	
	var warning = __webpack_require__(11);
	var canDefineProperty = __webpack_require__(13);
	
	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
	
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	
	var specialPropKeyWarningShown, specialPropRefWarningShown;
	
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };
	
	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};
	
	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }
	
	  return element;
	};
	
	ReactElement.createElement = function (type, config, children) {
	  var propName;
	
	  // Reserved names are extracted
	  var props = {};
	
	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;
	
	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      ref = !config.hasOwnProperty('ref') || Object.getOwnPropertyDescriptor(config, 'ref').get ? null : config.ref;
	      key = !config.hasOwnProperty('key') || Object.getOwnPropertyDescriptor(config, 'key').get ? null : '' + config.key;
	    } else {
	      ref = config.ref === undefined ? null : config.ref;
	      key = config.key === undefined ? null : '' + config.key;
	    }
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }
	
	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }
	
	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // Create dummy `key` and `ref` property to `props` to warn users
	    // against its use
	    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	      if (!props.hasOwnProperty('key')) {
	        Object.defineProperty(props, 'key', {
	          get: function () {
	            if (!specialPropKeyWarningShown) {
	              specialPropKeyWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	      if (!props.hasOwnProperty('ref')) {
	        Object.defineProperty(props, 'ref', {
	          get: function () {
	            if (!specialPropRefWarningShown) {
	              specialPropRefWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};
	
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};
	
	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
	
	  return newElement;
	};
	
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;
	
	  // Original props are copied
	  var props = _assign({}, element.props);
	
	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;
	
	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;
	
	  if (config != null) {
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }
	
	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }
	
	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};
	
	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};
	
	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */
	
	'use strict';
	
	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	
	var ReactCurrentOwner = {
	
	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null
	
	};
	
	module.exports = ReactCurrentOwner;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var emptyFunction = __webpack_require__(12);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function (condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }
	
	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}
	
	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};
	
	module.exports = emptyFunction;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule canDefineProperty
	 */
	
	'use strict';
	
	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}
	
	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */
	
	'use strict';
	
	var ReactCurrentOwner = __webpack_require__(10);
	var ReactElement = __webpack_require__(8);
	
	var getIteratorFn = __webpack_require__(15);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(11);
	
	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';
	
	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */
	
	var userProvidedKeyEscaperLookup = {
	  '=': '=0',
	  ':': '=2'
	};
	
	var userProvidedKeyEscapeRegex = /[=:]/g;
	
	var didWarnAboutMaps = false;
	
	function userProvidedKeyEscaper(match) {
	  return userProvidedKeyEscaperLookup[match];
	}
	
	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return wrapUserProvidedKey(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}
	
	/**
	 * Escape a component key so that it is safe to use in a reactid.
	 *
	 * @param {*} text Component key to be escaped.
	 * @return {string} An escaped string.
	 */
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
	}
	
	/**
	 * Wrap a `key` value explicitly provided by the user to distinguish it from
	 * implicitly-generated keys generated by a component's index in its parent.
	 *
	 * @param {string} key Value of a user-provided `key` attribute
	 * @return {string}
	 */
	function wrapUserProvidedKey(key) {
	  return '$' + escapeUserProvidedKey(key);
	}
	
	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;
	
	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }
	
	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }
	
	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
	
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + wrapUserProvidedKey(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : void 0;
	    }
	  }
	
	  return subtreeCount;
	}
	
	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }
	
	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}
	
	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 */
	
	'use strict';
	
	/* global Symbol */
	
	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
	
	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}
	
	module.exports = getIteratorFn;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */
	
	'use strict';
	
	var ReactNoopUpdateQueue = __webpack_require__(17);
	var ReactInstrumentation = __webpack_require__(18);
	
	var canDefineProperty = __webpack_require__(13);
	var emptyObject = __webpack_require__(21);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(11);
	
	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}
	
	ReactComponent.prototype.isReactComponent = {};
	
	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : void 0;
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onSetState();
	    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
	  }
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};
	
	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};
	
	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}
	
	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */
	
	'use strict';
	
	var warning = __webpack_require__(11);
	
	function warnTDZ(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
	  }
	}
	
	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {
	
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },
	
	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnTDZ(publicInstance, 'forceUpdate');
	  },
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnTDZ(publicInstance, 'replaceState');
	  },
	
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnTDZ(publicInstance, 'setState');
	  }
	};
	
	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstrumentation
	 */
	
	'use strict';
	
	var ReactDebugTool = __webpack_require__(19);
	
	module.exports = { debugTool: ReactDebugTool };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDebugTool
	 */
	
	'use strict';
	
	var ReactInvalidSetStateWarningDevTool = __webpack_require__(20);
	var warning = __webpack_require__(11);
	
	var eventHandlers = [];
	var handlerDoesThrowForEvent = {};
	
	function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
	  if (process.env.NODE_ENV !== 'production') {
	    eventHandlers.forEach(function (handler) {
	      try {
	        if (handler[handlerFunctionName]) {
	          handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
	        }
	      } catch (e) {
	        process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
	        handlerDoesThrowForEvent[handlerFunctionName] = true;
	      }
	    });
	  }
	}
	
	var ReactDebugTool = {
	  addDevtool: function (devtool) {
	    eventHandlers.push(devtool);
	  },
	  removeDevtool: function (devtool) {
	    for (var i = 0; i < eventHandlers.length; i++) {
	      if (eventHandlers[i] === devtool) {
	        eventHandlers.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onMountRootComponent: function (internalInstance) {
	    emitEvent('onMountRootComponent', internalInstance);
	  },
	  onMountComponent: function (internalInstance) {
	    emitEvent('onMountComponent', internalInstance);
	  },
	  onUpdateComponent: function (internalInstance) {
	    emitEvent('onUpdateComponent', internalInstance);
	  },
	  onUnmountComponent: function (internalInstance) {
	    emitEvent('onUnmountComponent', internalInstance);
	  }
	};
	
	ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
	
	module.exports = ReactDebugTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInvalidSetStateWarningDevTool
	 */
	
	'use strict';
	
	var warning = __webpack_require__(11);
	
	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;
	
	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}
	
	var ReactInvalidSetStateWarningDevTool = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};
	
	module.exports = ReactInvalidSetStateWarningDevTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var emptyObject = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}
	
	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var ReactComponent = __webpack_require__(16);
	var ReactElement = __webpack_require__(8);
	var ReactPropTypeLocations = __webpack_require__(23);
	var ReactPropTypeLocationNames = __webpack_require__(25);
	var ReactNoopUpdateQueue = __webpack_require__(17);
	
	var emptyObject = __webpack_require__(21);
	var invariant = __webpack_require__(7);
	var keyMirror = __webpack_require__(24);
	var keyOf = __webpack_require__(26);
	var warning = __webpack_require__(11);
	
	var MIXINS_KEY = keyOf({ mixins: null });
	
	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});
	
	var injectedMixins = [];
	
	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {
	
	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,
	
	  // ==== Definition methods ====
	
	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
	
	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
	
	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
	
	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,
	
	  // ==== Delegate methods ====
	
	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
	
	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,
	
	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,
	
	  // ==== Advanced methods ====
	
	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE
	
	};
	
	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };
	
	// noop
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}
	
	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
	
	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : void 0;
	  }
	
	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : void 0;
	  }
	}
	
	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    return;
	  }
	
	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.') : invariant(false) : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : void 0;
	
	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;
	
	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }
	
	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }
	
	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }
	
	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);
	
	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
	
	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];
	
	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : void 0;
	
	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}
	
	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }
	
	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : void 0;
	
	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : void 0;
	    Constructor[name] = property;
	  }
	}
	
	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : void 0;
	
	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}
	
	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}
	
	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}
	
	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}
	
	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}
	
	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {
	
	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },
	
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};
	
	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
	
	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {
	
	  /**
	   * Creates a composite component class given a class specification.
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    var Constructor = function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.
	
	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }
	
	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }
	
	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;
	
	      this.state = null;
	
	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.
	
	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : void 0;
	
	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];
	
	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
	
	    mixSpecIntoComponent(Constructor, spec);
	
	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }
	
	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : void 0;
	
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }
	
	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }
	
	    return Constructor;
	  },
	
	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }
	
	};
	
	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */
	
	'use strict';
	
	var keyMirror = __webpack_require__(24);
	
	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});
	
	module.exports = ReactPropTypeLocations;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(7);
	
	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function (obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};
	
	module.exports = keyMirror;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */
	
	'use strict';
	
	var ReactPropTypeLocationNames = {};
	
	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}
	
	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};
	
	module.exports = keyOf;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */
	
	'use strict';
	
	var ReactElement = __webpack_require__(8);
	var ReactElementValidator = __webpack_require__(28);
	
	var mapObject = __webpack_require__(29);
	
	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if (process.env.NODE_ENV !== 'production') {
	    return ReactElementValidator.createFactory(tag);
	  }
	  return ReactElement.createFactory(tag);
	}
	
	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hgroup: 'hgroup',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',
	
	  // SVG
	  circle: 'circle',
	  clipPath: 'clipPath',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  image: 'image',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'
	
	}, createDOMFactory);
	
	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */
	
	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */
	
	'use strict';
	
	var ReactElement = __webpack_require__(8);
	var ReactPropTypeLocations = __webpack_require__(23);
	var ReactPropTypeLocationNames = __webpack_require__(25);
	var ReactCurrentOwner = __webpack_require__(10);
	
	var canDefineProperty = __webpack_require__(13);
	var getIteratorFn = __webpack_require__(15);
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(11);
	
	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};
	
	var loggedTypeFailures = {};
	
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;
	
	  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
	  if (addenda === null) {
	    // we already showed the warning
	    return;
	  }
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : void 0;
	}
	
	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} messageType A key used for de-duping warnings.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 * @returns {?object} A set of addenda to use in the warning message, or null
	 * if the warning has already been shown before (and shouldn't be shown again).
	 */
	function getAddendaForKeyUse(messageType, element, parentType) {
	  var addendum = getDeclarationErrorAddendum();
	  if (!addendum) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      addendum = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }
	
	  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
	  if (memoizer[addendum]) {
	    return null;
	  }
	  memoizer[addendum] = true;
	
	  var addenda = {
	    parentOrOwner: addendum,
	    url: ' See https://fb.me/react-warning-keys for more information.',
	    childOwner: null
	  };
	
	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }
	
	  return addenda;
	}
	
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}
	
	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	
	        var addendum = getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : void 0;
	      }
	    }
	  }
	}
	
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}
	
	var ReactElementValidator = {
	
	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;
	
	    var element = ReactElement.createElement.apply(this, arguments);
	
	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }
	
	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }
	
	    validatePropTypes(element);
	
	    return element;
	  },
	
	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }
	
	    return validatedFactory;
	  },
	
	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }
	
	};
	
	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}
	
	module.exports = mapObject;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */
	
	'use strict';
	
	var ReactElement = __webpack_require__(8);
	var ReactPropTypeLocationNames = __webpack_require__(25);
	
	var emptyFunction = __webpack_require__(12);
	var getIteratorFn = __webpack_require__(15);
	
	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */
	
	var ANONYMOUS = '<<anonymous>>';
	
	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	
	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};
	
	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/
	
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType;
	}
	
	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);
	
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}
	
	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!ReactElement.isValidElement(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	    });
	  }
	
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }
	
	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	    });
	  }
	
	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName) == null) {
	        return null;
	      }
	    }
	
	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}
	
	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }
	
	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }
	
	      return true;
	    default:
	      return false;
	  }
	}
	
	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}
	
	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}
	
	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}
	
	module.exports = ReactPropTypes;

/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */
	
	'use strict';
	
	module.exports = '15.0.0';

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';
	
	var ReactElement = __webpack_require__(8);
	
	var invariant = __webpack_require__(7);
	
	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection. The current implementation of this
	 * function assumes that a single child gets passed without a wrapper, but the
	 * purpose of this helper function is to abstract away the particular structure
	 * of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactComponent} The first and only `ReactComponent` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : void 0;
	  return children;
	}
	
	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. 
	 *
	 */
	'use strict';
	
	var ReactPerf = __webpack_require__(34);
	var ReactVersion = __webpack_require__(31);
	
	var ReactAnythingMount = __webpack_require__(35);
	var ReactAnythingInjection = __webpack_require__(55);
	
	var warning = __webpack_require__(53);
	
	var render = ReactPerf.measure('React', 'render', ReactAnythingMount.render);
	
	
	var createReactAnything = function (React, nativeImplementation) {
	    ReactAnythingInjection.inject(nativeImplementation);
	
	    var ReactAnything = {
	        React: React,
	        render: render,
	        version: ReactVersion,
	        components: (nativeImplementation.components.types || []).reduce(function (acc, tag) {
	            acc[tag] = tag;
	            return acc;
	        }, {})
	    };
	
	    return ReactAnything;
	};
	
	module.exports = createReactAnything;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPerf
	 */
	
	'use strict';
	
	/**
	 * ReactPerf is a general AOP system designed to measure performance. This
	 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
	 */
	
	var ReactPerf = {
	  /**
	   * Boolean to enable/disable measurement. Set to false by default to prevent
	   * accidental logging and perf loss.
	   */
	  enableMeasure: false,
	
	  /**
	   * Holds onto the measure function in use. By default, don't measure
	   * anything, but we'll override this if we inject a measure function.
	   */
	  storedMeasure: _noMeasure,
	
	  /**
	   * @param {object} object
	   * @param {string} objectName
	   * @param {object<string>} methodNames
	   */
	  measureMethods: function (object, objectName, methodNames) {
	    if (process.env.NODE_ENV !== 'production') {
	      for (var key in methodNames) {
	        if (!methodNames.hasOwnProperty(key)) {
	          continue;
	        }
	        object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
	      }
	    }
	  },
	
	  /**
	   * Use this to wrap methods you want to measure. Zero overhead in production.
	   *
	   * @param {string} objName
	   * @param {string} fnName
	   * @param {function} func
	   * @return {function}
	   */
	  measure: function (objName, fnName, func) {
	    if (process.env.NODE_ENV !== 'production') {
	      var measuredFunc = null;
	      var wrapper = function () {
	        if (ReactPerf.enableMeasure) {
	          if (!measuredFunc) {
	            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
	          }
	          return measuredFunc.apply(this, arguments);
	        }
	        return func.apply(this, arguments);
	      };
	      wrapper.displayName = objName + '_' + fnName;
	      return wrapper;
	    }
	    return func;
	  },
	
	  injection: {
	    /**
	     * @param {function} measure
	     */
	    injectMeasure: function (measure) {
	      ReactPerf.storedMeasure = measure;
	    }
	  }
	};
	
	/**
	 * Simply passes through the measured function, without measuring it.
	 *
	 * @param {string} objName
	 * @param {string} fnName
	 * @param {function} func
	 * @return {function}
	 */
	function _noMeasure(objName, fnName, func) {
	  return func;
	}
	
	module.exports = ReactPerf;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * This file is a modified version of:
	 *  react/lib/ReactMount.js
	 *  Copyright (c) 2013-present, Facebook, Inc.
	 *  All rights reserved.
	 *  
	 */
	'use strict';
	
	var ReactElement = __webpack_require__(8);
	var ReactCurrentOwner = __webpack_require__(10);
	var ReactUpdateQueue = __webpack_require__(36);
	var ReactUpdates = __webpack_require__(38);
	var ReactReconciler = __webpack_require__(41);
	var ReactInstrumentation = __webpack_require__(18);
	
	var instantiateReactComponent = __webpack_require__(45);
	
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(53);
	
	var ReactAnythingContainerInfo = __webpack_require__(54);
	
	var mountedRootComponents = {};
	var mountedImages = {};
	var __DEV__ = true;
	
	
	function batchedMountComponentIntoNode(componentInstance, containerName, context) {
	    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(false);
	    transaction.perform(
	        mountComponentIntoNode,
	        null,
	        componentInstance,
	        containerName,
	        transaction,
	        context
	    );
	    ReactUpdates.ReactReconcileTransaction.release(transaction);
	}
	
	
	function mountComponentIntoNode(componentInstance, containerName, transaction, context) {
	    var markerName;
	    if (false) {
	        var element = componentInstance._currentElement;
	        var type = element.type;
	        markerName = 'React mount: ' + (
	                typeof type === 'string' ? type :
	                type.displayName || type.name
	            );
	        console.time(markerName);
	    }
	
	    var markup = ReactReconciler.mountComponent(
	        componentInstance,
	        transaction,
	        null,
	        ReactAnythingContainerInfo(componentInstance, containerName),
	        context
	    );
	
	    if (markerName) {
	        console.timeEnd(markerName);
	    }
	
	    ReactAnythingMount._mountImageIntoNode(
	        markup,
	        containerName,
	        componentInstance,
	        transaction,
	        context
	    );
	}
	
	
	var ReactAnythingMount = {
	    render: function (nextElement, containerName, callback) {
	        invariant(
	            ReactElement.isValidElement(nextElement),
	            'ReactAnyting.render(): Invalid component element.%s',
	            (
	                typeof nextElement === 'string' ?
	                ' Instead of passing a string like \'div\', pass ' +
	                'React.createElement(\'div\') or <div />.' :
	                    typeof nextElement === 'function' ?
	                    ' Instead of passing a class like Foo, pass ' +
	                    'React.createElement(Foo) or <Foo />.' :
	                        // Check if it quacks like an element
	                        nextElement != null && nextElement.props !== undefined ?
	                        ' This may be caused by unintentionally loading two independent ' +
	                        'copies of React.' :
	                            ''
	            )
	        );
	
	        warning(
	            containerName && typeof containerName === 'string',
	            'render(): containerName must be a string'
	        );
	
	        var prevComponent = mountedRootComponents[containerName];
	
	        if (prevComponent) {
	            var prevElement = prevComponent._currentElement;
	
	            if (shouldUpdateReactComponent(prevElement, nextElement)) {
	                var publicInst = prevComponent._renderedComponent.getPublicInstance();
	                var updatedCallback = callback && function () {
	                        callback.call(publicInst);
	                    };
	                ReactAnythingMount._updateRootComponent(
	                    prevComponent,
	                    nextElement,
	                    containerName,
	                    updatedCallback
	                );
	                return publicInst;
	            } else {
	                ReactAnythingMount._unmountRootComponent(container);
	            }
	        }
	
	        var component = ReactAnythingMount._renderNewRootComponent(nextElement, containerName);
	
	        if (callback) {
	            callback.call(component);
	        }
	        return component;
	    },
	
	    _updateRootComponent: function () {
	    },
	
	    _unmountRootComponent: function (containerName) {
	    },
	    
	    _renderNewRootComponent: function (nextElement, containerName) {
	        // Various parts of our code (such as ReactCompositeComponent's
	        // _renderValidatedComponent) assume that calls to render aren't nested;
	        // verify that that's the case.
	        warning(
	            ReactCurrentOwner.current == null,
	            '_renderNewRootComponent(): Render methods should be a pure function ' +
	            'of props and state; triggering nested component updates from ' +
	            'render is not allowed. If necessary, trigger nested updates in ' +
	            'componentDidUpdate. Check the render method of %s.',
	            ReactCurrentOwner.current && ReactCurrentOwner.current.getName() ||
	            'ReactCompositeComponent'
	        );
	
	        invariant(
	            containerName && typeof containerName === 'string',
	            '_registerComponent(...): Target containerName is not a string.'
	        );
	
	        var componentInstance = instantiateReactComponent(nextElement);
	
	        // The initial render is synchronous but any updates that happen during
	        // rendering, in componentWillMount or componentDidMount, will be batched
	        // according to the current batching strategy.
	
	        ReactUpdates.batchedUpdates(
	            batchedMountComponentIntoNode,
	            componentInstance,
	            containerName,
	            null
	        );
	
	        mountedRootComponents[containerName] = componentInstance;
	
	        if (__DEV__) {
	            ReactInstrumentation.debugTool.onMountRootComponent(componentInstance);
	        }
	
	        return componentInstance;
	    },
	
	
	    _mountImageIntoNode: function (markup, containerName, image, transaction, context) {
	        invariant(
	            typeof containerName === 'string',
	            'mountComponentIntoNode(...): Target container is not valid.'
	        );
	
	        mountedImages[containerName] = image;
	    }
	};
	
	module.exports = ReactAnythingMount;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactUpdateQueue
	 */
	
	'use strict';
	
	var ReactCurrentOwner = __webpack_require__(10);
	var ReactInstanceMap = __webpack_require__(37);
	var ReactUpdates = __webpack_require__(38);
	
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(11);
	
	function enqueueUpdate(internalInstance) {
	  ReactUpdates.enqueueUpdate(internalInstance);
	}
	
	function formatUnexpectedArgument(arg) {
	  var type = typeof arg;
	  if (type !== 'object') {
	    return type;
	  }
	  var displayName = arg.constructor && arg.constructor.name || type;
	  var keys = Object.keys(arg);
	  if (keys.length > 0 && keys.length < 20) {
	    return displayName + ' (keys: ' + keys.join(', ') + ')';
	  }
	  return displayName;
	}
	
	function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
	  var internalInstance = ReactInstanceMap.get(publicInstance);
	  if (!internalInstance) {
	    if (process.env.NODE_ENV !== 'production') {
	      // Only warn when we have a callerName. Otherwise we should be silent.
	      // We're probably calling from enqueueCallback. We don't want to warn
	      // there because we already warned for the corresponding lifecycle method.
	      process.env.NODE_ENV !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor.displayName) : void 0;
	    }
	    return null;
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition (such as ' + 'within `render` or another component\'s constructor). Render methods ' + 'should be a pure function of props and state; constructor ' + 'side-effects are an anti-pattern, but can be moved to ' + '`componentWillMount`.', callerName) : void 0;
	  }
	
	  return internalInstance;
	}
	
	/**
	 * ReactUpdateQueue allows for state updates to be scheduled into a later
	 * reconciliation step.
	 */
	var ReactUpdateQueue = {
	
	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    if (process.env.NODE_ENV !== 'production') {
	      var owner = ReactCurrentOwner.current;
	      if (owner !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
	        owner._warnedAboutRefsInRender = true;
	      }
	    }
	    var internalInstance = ReactInstanceMap.get(publicInstance);
	    if (internalInstance) {
	      // During componentWillMount and render this will still be null but after
	      // that will always render to something. At least for now. So we can use
	      // this hack.
	      return !!internalInstance._renderedComponent;
	    } else {
	      return false;
	    }
	  },
	
	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @param {string} callerName Name of the calling function in the public API.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback, callerName) {
	    ReactUpdateQueue.validateCallback(callback, callerName);
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
	
	    // Previously we would throw an error if we didn't have an internal
	    // instance. Since we want to make it a no-op instead, we mirror the same
	    // behavior we have in other enqueue* methods.
	    // We also need to ignore callbacks in componentWillMount. See
	    // enqueueUpdates.
	    if (!internalInstance) {
	      return null;
	    }
	
	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }
	    // TODO: The callback here is ignored when setState is called from
	    // componentWillMount. Either fix it or disallow doing so completely in
	    // favor of getInitialState. Alternatively, we can disallow
	    // componentWillMount during server-side rendering.
	    enqueueUpdate(internalInstance);
	  },
	
	  enqueueCallbackInternal: function (internalInstance, callback) {
	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }
	    enqueueUpdate(internalInstance);
	  },
	
	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');
	
	    if (!internalInstance) {
	      return;
	    }
	
	    internalInstance._pendingForceUpdate = true;
	
	    enqueueUpdate(internalInstance);
	  },
	
	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');
	
	    if (!internalInstance) {
	      return;
	    }
	
	    internalInstance._pendingStateQueue = [completeState];
	    internalInstance._pendingReplaceState = true;
	
	    enqueueUpdate(internalInstance);
	  },
	
	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
	
	    if (!internalInstance) {
	      return;
	    }
	
	    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
	    queue.push(partialState);
	
	    enqueueUpdate(internalInstance);
	  },
	
	  enqueueElementInternal: function (internalInstance, newElement) {
	    internalInstance._pendingElement = newElement;
	    enqueueUpdate(internalInstance);
	  },
	
	  validateCallback: function (callback, callerName) {
	    !(!callback || typeof callback === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, formatUnexpectedArgument(callback)) : invariant(false) : void 0;
	  }
	
	};
	
	module.exports = ReactUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 37 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstanceMap
	 */
	
	'use strict';
	
	/**
	 * `ReactInstanceMap` maintains a mapping from a public facing stateful
	 * instance (key) and the internal representation (value). This allows public
	 * methods to accept the user facing instance as an argument and map them back
	 * to internal methods.
	 */
	
	// TODO: Replace this with ES6: var ReactInstanceMap = new Map();
	
	var ReactInstanceMap = {
	
	  /**
	   * This API should be called `delete` but we'd have to make sure to always
	   * transform these to strings for IE support. When this transform is fully
	   * supported we can rename it.
	   */
	  remove: function (key) {
	    key._reactInternalInstance = undefined;
	  },
	
	  get: function (key) {
	    return key._reactInternalInstance;
	  },
	
	  has: function (key) {
	    return key._reactInternalInstance !== undefined;
	  },
	
	  set: function (key, value) {
	    key._reactInternalInstance = value;
	  }
	
	};
	
	module.exports = ReactInstanceMap;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactUpdates
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var CallbackQueue = __webpack_require__(39);
	var PooledClass = __webpack_require__(6);
	var ReactFeatureFlags = __webpack_require__(40);
	var ReactPerf = __webpack_require__(34);
	var ReactReconciler = __webpack_require__(41);
	var Transaction = __webpack_require__(44);
	
	var invariant = __webpack_require__(7);
	
	var dirtyComponents = [];
	var asapCallbackQueue = CallbackQueue.getPooled();
	var asapEnqueued = false;
	
	var batchingStrategy = null;
	
	function ensureInjected() {
	  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : void 0;
	}
	
	var NESTED_UPDATES = {
	  initialize: function () {
	    this.dirtyComponentsLength = dirtyComponents.length;
	  },
	  close: function () {
	    if (this.dirtyComponentsLength !== dirtyComponents.length) {
	      // Additional updates were enqueued by componentDidUpdate handlers or
	      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
	      // these new updates so that if A's componentDidUpdate calls setState on
	      // B, B will update before the callback A's updater provided when calling
	      // setState.
	      dirtyComponents.splice(0, this.dirtyComponentsLength);
	      flushBatchedUpdates();
	    } else {
	      dirtyComponents.length = 0;
	    }
	  }
	};
	
	var UPDATE_QUEUEING = {
	  initialize: function () {
	    this.callbackQueue.reset();
	  },
	  close: function () {
	    this.callbackQueue.notifyAll();
	  }
	};
	
	var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
	
	function ReactUpdatesFlushTransaction() {
	  this.reinitializeTransaction();
	  this.dirtyComponentsLength = null;
	  this.callbackQueue = CallbackQueue.getPooled();
	  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(
	  /* useCreateElement */true);
	}
	
	_assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  },
	
	  destructor: function () {
	    this.dirtyComponentsLength = null;
	    CallbackQueue.release(this.callbackQueue);
	    this.callbackQueue = null;
	    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
	    this.reconcileTransaction = null;
	  },
	
	  perform: function (method, scope, a) {
	    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
	    // with this transaction's wrappers around it.
	    return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
	  }
	});
	
	PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
	
	function batchedUpdates(callback, a, b, c, d, e) {
	  ensureInjected();
	  batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
	}
	
	/**
	 * Array comparator for ReactComponents by mount ordering.
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */
	function mountOrderComparator(c1, c2) {
	  return c1._mountOrder - c2._mountOrder;
	}
	
	function runBatchedUpdates(transaction) {
	  var len = transaction.dirtyComponentsLength;
	  !(len === dirtyComponents.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, dirtyComponents.length) : invariant(false) : void 0;
	
	  // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.
	  dirtyComponents.sort(mountOrderComparator);
	
	  for (var i = 0; i < len; i++) {
	    // If a component is unmounted before pending changes apply, it will still
	    // be here, but we assume that it has cleared its _pendingCallbacks and
	    // that performUpdateIfNecessary is a noop.
	    var component = dirtyComponents[i];
	
	    // If performUpdateIfNecessary happens to enqueue any new updates, we
	    // shouldn't execute the callbacks until the next render happens, so
	    // stash the callbacks first
	    var callbacks = component._pendingCallbacks;
	    component._pendingCallbacks = null;
	
	    var markerName;
	    if (ReactFeatureFlags.logTopLevelRenders) {
	      var namedComponent = component;
	      // Duck type TopLevelWrapper. This is probably always true.
	      if (component._currentElement.props === component._renderedComponent._currentElement) {
	        namedComponent = component._renderedComponent;
	      }
	      markerName = 'React update: ' + namedComponent.getName();
	      console.time(markerName);
	    }
	
	    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);
	
	    if (markerName) {
	      console.timeEnd(markerName);
	    }
	
	    if (callbacks) {
	      for (var j = 0; j < callbacks.length; j++) {
	        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
	      }
	    }
	  }
	}
	
	var flushBatchedUpdates = function () {
	  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
	  // array and perform any updates enqueued by mount-ready handlers (i.e.,
	  // componentDidUpdate) but we need to check here too in order to catch
	  // updates enqueued by setState callbacks and asap calls.
	  while (dirtyComponents.length || asapEnqueued) {
	    if (dirtyComponents.length) {
	      var transaction = ReactUpdatesFlushTransaction.getPooled();
	      transaction.perform(runBatchedUpdates, null, transaction);
	      ReactUpdatesFlushTransaction.release(transaction);
	    }
	
	    if (asapEnqueued) {
	      asapEnqueued = false;
	      var queue = asapCallbackQueue;
	      asapCallbackQueue = CallbackQueue.getPooled();
	      queue.notifyAll();
	      CallbackQueue.release(queue);
	    }
	  }
	};
	flushBatchedUpdates = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', flushBatchedUpdates);
	
	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */
	function enqueueUpdate(component) {
	  ensureInjected();
	
	  // Various parts of our code (such as ReactCompositeComponent's
	  // _renderValidatedComponent) assume that calls to render aren't nested;
	  // verify that that's the case. (This is called by each top-level update
	  // function, like setProps, setState, forceUpdate, etc.; creation and
	  // destruction of top-level components is guarded in ReactMount.)
	
	  if (!batchingStrategy.isBatchingUpdates) {
	    batchingStrategy.batchedUpdates(enqueueUpdate, component);
	    return;
	  }
	
	  dirtyComponents.push(component);
	}
	
	/**
	 * Enqueue a callback to be run at the end of the current batching cycle. Throws
	 * if no updates are currently being performed.
	 */
	function asap(callback, context) {
	  !batchingStrategy.isBatchingUpdates ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : void 0;
	  asapCallbackQueue.enqueue(callback, context);
	  asapEnqueued = true;
	}
	
	var ReactUpdatesInjection = {
	  injectReconcileTransaction: function (ReconcileTransaction) {
	    !ReconcileTransaction ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : void 0;
	    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
	  },
	
	  injectBatchingStrategy: function (_batchingStrategy) {
	    !_batchingStrategy ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : void 0;
	    !(typeof _batchingStrategy.batchedUpdates === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : void 0;
	    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : void 0;
	    batchingStrategy = _batchingStrategy;
	  }
	};
	
	var ReactUpdates = {
	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction: null,
	
	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection,
	  asap: asap
	};
	
	module.exports = ReactUpdates;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CallbackQueue
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var PooledClass = __webpack_require__(6);
	
	var invariant = __webpack_require__(7);
	
	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `CallbackQueue.getPooled()`.
	 *
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */
	function CallbackQueue() {
	  this._callbacks = null;
	  this._contexts = null;
	}
	
	_assign(CallbackQueue.prototype, {
	
	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked.
	   *
	   * @param {function} callback Invoked when `notifyAll` is invoked.
	   * @param {?object} context Context to call `callback` with.
	   * @internal
	   */
	  enqueue: function (callback, context) {
	    this._callbacks = this._callbacks || [];
	    this._contexts = this._contexts || [];
	    this._callbacks.push(callback);
	    this._contexts.push(context);
	  },
	
	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */
	  notifyAll: function () {
	    var callbacks = this._callbacks;
	    var contexts = this._contexts;
	    if (callbacks) {
	      !(callbacks.length === contexts.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : invariant(false) : void 0;
	      this._callbacks = null;
	      this._contexts = null;
	      for (var i = 0; i < callbacks.length; i++) {
	        callbacks[i].call(contexts[i]);
	      }
	      callbacks.length = 0;
	      contexts.length = 0;
	    }
	  },
	
	  checkpoint: function () {
	    return this._callbacks ? this._callbacks.length : 0;
	  },
	
	  rollback: function (len) {
	    if (this._callbacks) {
	      this._callbacks.length = len;
	      this._contexts.length = len;
	    }
	  },
	
	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */
	  reset: function () {
	    this._callbacks = null;
	    this._contexts = null;
	  },
	
	  /**
	   * `PooledClass` looks for this.
	   */
	  destructor: function () {
	    this.reset();
	  }
	
	});
	
	PooledClass.addPoolingTo(CallbackQueue);
	
	module.exports = CallbackQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactFeatureFlags
	 */
	
	'use strict';
	
	var ReactFeatureFlags = {
	  // When true, call console.time() before and .timeEnd() after each top-level
	  // render (both initial renders and updates). Useful when looking at prod-mode
	  // timeline profiles in Chrome, for example.
	  logTopLevelRenders: false
	};
	
	module.exports = ReactFeatureFlags;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactReconciler
	 */
	
	'use strict';
	
	var ReactRef = __webpack_require__(42);
	var ReactInstrumentation = __webpack_require__(18);
	
	/**
	 * Helper to call ReactRef.attachRefs with this composite component, split out
	 * to avoid allocations in the transaction mount-ready queue.
	 */
	function attachRefs() {
	  ReactRef.attachRefs(this, this._currentElement);
	}
	
	var ReactReconciler = {
	
	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?object} the containing native component instance
	   * @param {?object} info about the native container
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function (internalInstance, transaction, nativeParent, nativeContainerInfo, context) {
	    var markup = internalInstance.mountComponent(transaction, nativeParent, nativeContainerInfo, context);
	    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onMountComponent(internalInstance);
	    }
	    return markup;
	  },
	
	  /**
	   * Returns a value that can be passed to
	   * ReactComponentEnvironment.replaceNodeWithMarkup.
	   */
	  getNativeNode: function (internalInstance) {
	    return internalInstance.getNativeNode();
	  },
	
	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function (internalInstance, safely) {
	    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
	    internalInstance.unmountComponent(safely);
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onUnmountComponent(internalInstance);
	    }
	  },
	
	  /**
	   * Update a component using a new element.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactElement} nextElement
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @internal
	   */
	  receiveComponent: function (internalInstance, nextElement, transaction, context) {
	    var prevElement = internalInstance._currentElement;
	
	    if (nextElement === prevElement && context === internalInstance._context) {
	      // Since elements are immutable after the owner is rendered,
	      // we can do a cheap identity compare here to determine if this is a
	      // superfluous reconcile. It's possible for state to be mutable but such
	      // change should trigger an update of the owner which would recreate
	      // the element. We explicitly check for the existence of an owner since
	      // it's possible for an element created outside a composite to be
	      // deeply mutated and reused.
	
	      // TODO: Bailing out early is just a perf optimization right?
	      // TODO: Removing the return statement should affect correctness?
	      return;
	    }
	
	    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
	
	    if (refsChanged) {
	      ReactRef.detachRefs(internalInstance, prevElement);
	    }
	
	    internalInstance.receiveComponent(nextElement, transaction, context);
	
	    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onUpdateComponent(internalInstance);
	    }
	  },
	
	  /**
	   * Flush any dirty changes in a component.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function (internalInstance, transaction) {
	    internalInstance.performUpdateIfNecessary(transaction);
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onUpdateComponent(internalInstance);
	    }
	  }
	
	};
	
	module.exports = ReactReconciler;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactRef
	 */
	
	'use strict';
	
	var ReactOwner = __webpack_require__(43);
	
	var ReactRef = {};
	
	function attachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(component.getPublicInstance());
	  } else {
	    // Legacy ref
	    ReactOwner.addComponentAsRefTo(component, ref, owner);
	  }
	}
	
	function detachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(null);
	  } else {
	    // Legacy ref
	    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
	  }
	}
	
	ReactRef.attachRefs = function (instance, element) {
	  if (element === null || element === false) {
	    return;
	  }
	  var ref = element.ref;
	  if (ref != null) {
	    attachRef(ref, instance, element._owner);
	  }
	};
	
	ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
	  // If either the owner or a `ref` has changed, make sure the newest owner
	  // has stored a reference to `this`, and the previous owner (if different)
	  // has forgotten the reference to `this`. We use the element instead
	  // of the public this.props because the post processing cannot determine
	  // a ref. The ref conceptually lives on the element.
	
	  // TODO: Should this even be possible? The owner cannot change because
	  // it's forbidden by shouldUpdateReactComponent. The ref can change
	  // if you swap the keys of but not the refs. Reconsider where this check
	  // is made. It probably belongs where the key checking and
	  // instantiateReactComponent is done.
	
	  var prevEmpty = prevElement === null || prevElement === false;
	  var nextEmpty = nextElement === null || nextElement === false;
	
	  return(
	    // This has a few false positives w/r/t empty components.
	    prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref
	  );
	};
	
	ReactRef.detachRefs = function (instance, element) {
	  if (element === null || element === false) {
	    return;
	  }
	  var ref = element.ref;
	  if (ref != null) {
	    detachRef(ref, instance, element._owner);
	  }
	};
	
	module.exports = ReactRef;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactOwner
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(7);
	
	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */
	var ReactOwner = {
	
	  /**
	   * @param {?object} object
	   * @return {boolean} True if `object` is a valid owner.
	   * @final
	   */
	  isValidOwner: function (object) {
	    return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
	  },
	
	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function (component, ref, owner) {
	    !ReactOwner.isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might ' + 'be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : void 0;
	    owner.attachRef(ref, component);
	  },
	
	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function (component, ref, owner) {
	    !ReactOwner.isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : void 0;
	    var ownerPublicInstance = owner.getPublicInstance();
	    // Check that `component`'s owner is still alive and that `component` is still the current ref
	    // because we do not want to detach the ref if another component stole it.
	    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
	      owner.detachRef(ref);
	    }
	  }
	
	};
	
	module.exports = ReactOwner;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Transaction
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(7);
	
	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be run while it is already being run. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM updates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */
	var Mixin = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function () {
	    this.transactionWrappers = this.getTransactionWrappers();
	    if (this.wrapperInitData) {
	      this.wrapperInitData.length = 0;
	    } else {
	      this.wrapperInitData = [];
	    }
	    this._isInTransaction = false;
	  },
	
	  _isInTransaction: false,
	
	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,
	
	  isInTransaction: function () {
	    return !!this._isInTransaction;
	  },
	
	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked. The optional arguments helps prevent the need
	   * to bind in many cases.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} a Argument to pass to the method.
	   * @param {Object?=} b Argument to pass to the method.
	   * @param {Object?=} c Argument to pass to the method.
	   * @param {Object?=} d Argument to pass to the method.
	   * @param {Object?=} e Argument to pass to the method.
	   * @param {Object?=} f Argument to pass to the method.
	   *
	   * @return {*} Return value from `method`.
	   */
	  perform: function (method, scope, a, b, c, d, e, f) {
	    !!this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(false) : void 0;
	    var errorThrown;
	    var ret;
	    try {
	      this._isInTransaction = true;
	      // Catching errors makes debugging more difficult, so we start with
	      // errorThrown set to true before setting it to false after calling
	      // close -- if it's still set to true in the finally block, it means
	      // one of these calls threw.
	      errorThrown = true;
	      this.initializeAll(0);
	      ret = method.call(scope, a, b, c, d, e, f);
	      errorThrown = false;
	    } finally {
	      try {
	        if (errorThrown) {
	          // If `method` throws, prefer to show that stack trace over any thrown
	          // by invoking `closeAll`.
	          try {
	            this.closeAll(0);
	          } catch (err) {}
	        } else {
	          // Since `method` didn't throw, we don't want to silence the exception
	          // here.
	          this.closeAll(0);
	        }
	      } finally {
	        this._isInTransaction = false;
	      }
	    }
	    return ret;
	  },
	
	  initializeAll: function (startIndex) {
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      try {
	        // Catching errors makes debugging more difficult, so we start with the
	        // OBSERVED_ERROR state before overwriting it with the real return value
	        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
	        // block, it means wrapper.initialize threw.
	        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
	        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
	      } finally {
	        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
	          // The initializer for wrapper i threw an error; initialize the
	          // remaining wrappers but silence any exceptions from them to ensure
	          // that the first error is the one to bubble up.
	          try {
	            this.initializeAll(i + 1);
	          } catch (err) {}
	        }
	      }
	    }
	  },
	
	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function (startIndex) {
	    !this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(false) : void 0;
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var initData = this.wrapperInitData[i];
	      var errorThrown;
	      try {
	        // Catching errors makes debugging more difficult, so we start with
	        // errorThrown set to true before setting it to false after calling
	        // close -- if it's still set to true in the finally block, it means
	        // wrapper.close threw.
	        errorThrown = true;
	        if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
	          wrapper.close.call(this, initData);
	        }
	        errorThrown = false;
	      } finally {
	        if (errorThrown) {
	          // The closer for wrapper i threw an error; close the remaining
	          // wrappers but silence any exceptions from them to ensure that the
	          // first error is the one to bubble up.
	          try {
	            this.closeAll(i + 1);
	          } catch (e) {}
	        }
	      }
	    }
	    this.wrapperInitData.length = 0;
	  }
	};
	
	var Transaction = {
	
	  Mixin: Mixin,
	
	  /**
	   * Token to look for to determine if an error occurred.
	   */
	  OBSERVED_ERROR: {}
	
	};
	
	module.exports = Transaction;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule instantiateReactComponent
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var ReactCompositeComponent = __webpack_require__(46);
	var ReactEmptyComponent = __webpack_require__(51);
	var ReactNativeComponent = __webpack_require__(52);
	
	var invariant = __webpack_require__(7);
	var warning = __webpack_require__(11);
	
	// To avoid a cyclic dependency, we create the final class in this module
	var ReactCompositeComponentWrapper = function (element) {
	  this.construct(element);
	};
	_assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {
	  _instantiateReactComponent: instantiateReactComponent
	});
	
	function getDeclarationErrorAddendum(owner) {
	  if (owner) {
	    var name = owner.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	/**
	 * Check if the type reference is a known internal type. I.e. not a user
	 * provided composite type.
	 *
	 * @param {function} type
	 * @return {boolean} Returns true if this is a valid internal type.
	 */
	function isInternalComponentType(type) {
	  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
	}
	
	/**
	 * Given a ReactNode, create an instance that will actually be mounted.
	 *
	 * @param {ReactNode} node
	 * @return {object} A new instance of the element's constructor.
	 * @protected
	 */
	function instantiateReactComponent(node) {
	  var instance;
	
	  if (node === null || node === false) {
	    instance = ReactEmptyComponent.create(instantiateReactComponent);
	  } else if (typeof node === 'object') {
	    var element = node;
	    !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : invariant(false) : void 0;
	
	    // Special case string values
	    if (typeof element.type === 'string') {
	      instance = ReactNativeComponent.createInternalComponent(element);
	    } else if (isInternalComponentType(element.type)) {
	      // This is temporarily available for custom components that are not string
	      // representations. I.e. ART. Once those are updated to use the string
	      // representation, we can drop this code path.
	      instance = new element.type(element);
	    } else {
	      instance = new ReactCompositeComponentWrapper(element);
	    }
	  } else if (typeof node === 'string' || typeof node === 'number') {
	    instance = ReactNativeComponent.createInstanceForText(node);
	  } else {
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : invariant(false) : void 0;
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getNativeNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
	  }
	
	  // These two fields are used by the DOM and ART diffing algorithms
	  // respectively. Instead of using expandos on components, we should be
	  // storing the state needed by the diffing algorithms elsewhere.
	  instance._mountIndex = 0;
	  instance._mountImage = null;
	
	  if (process.env.NODE_ENV !== 'production') {
	    instance._isOwnerNecessary = false;
	    instance._warnedAboutRefsInRender = false;
	  }
	
	  // Internal instances should fully constructed at this point, so they should
	  // not get any new fields added to them at this point.
	  if (process.env.NODE_ENV !== 'production') {
	    if (Object.preventExtensions) {
	      Object.preventExtensions(instance);
	    }
	  }
	
	  return instance;
	}
	
	module.exports = instantiateReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCompositeComponent
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var ReactComponentEnvironment = __webpack_require__(47);
	var ReactCurrentOwner = __webpack_require__(10);
	var ReactElement = __webpack_require__(8);
	var ReactErrorUtils = __webpack_require__(48);
	var ReactInstanceMap = __webpack_require__(37);
	var ReactInstrumentation = __webpack_require__(18);
	var ReactNodeTypes = __webpack_require__(49);
	var ReactPerf = __webpack_require__(34);
	var ReactPropTypeLocations = __webpack_require__(23);
	var ReactPropTypeLocationNames = __webpack_require__(25);
	var ReactReconciler = __webpack_require__(41);
	var ReactUpdateQueue = __webpack_require__(36);
	
	var emptyObject = __webpack_require__(21);
	var invariant = __webpack_require__(7);
	var shouldUpdateReactComponent = __webpack_require__(50);
	var warning = __webpack_require__(11);
	
	function getDeclarationErrorAddendum(component) {
	  var owner = component._currentElement._owner || null;
	  if (owner) {
	    var name = owner.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}
	
	function StatelessComponent(Component) {}
	StatelessComponent.prototype.render = function () {
	  var Component = ReactInstanceMap.get(this)._currentElement.type;
	  var element = Component(this.props, this.context, this.updater);
	  warnIfInvalidElement(Component, element);
	  return element;
	};
	
	function warnIfInvalidElement(Component, element) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(element === null || element === false || ReactElement.isValidElement(element), '%s(...): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : void 0;
	  }
	}
	
	/**
	 * ------------------ The Life-Cycle of a Composite Component ------------------
	 *
	 * - constructor: Initialization of state. The instance is now retained.
	 *   - componentWillMount
	 *   - render
	 *   - [children's constructors]
	 *     - [children's componentWillMount and render]
	 *     - [children's componentDidMount]
	 *     - componentDidMount
	 *
	 *       Update Phases:
	 *       - componentWillReceiveProps (only called if parent updated)
	 *       - shouldComponentUpdate
	 *         - componentWillUpdate
	 *           - render
	 *           - [children's constructors or receive props phases]
	 *         - componentDidUpdate
	 *
	 *     - componentWillUnmount
	 *     - [children's componentWillUnmount]
	 *   - [children destroyed]
	 * - (destroyed): The instance is now blank, released by React and ready for GC.
	 *
	 * -----------------------------------------------------------------------------
	 */
	
	/**
	 * An incrementing ID assigned to each component when it is mounted. This is
	 * used to enforce the order in which `ReactUpdates` updates dirty components.
	 *
	 * @private
	 */
	var nextMountID = 1;
	
	/**
	 * @lends {ReactCompositeComponent.prototype}
	 */
	var ReactCompositeComponentMixin = {
	
	  /**
	   * Base constructor for all composite component.
	   *
	   * @param {ReactElement} element
	   * @final
	   * @internal
	   */
	  construct: function (element) {
	    this._currentElement = element;
	    this._rootNodeID = null;
	    this._instance = null;
	    this._nativeParent = null;
	    this._nativeContainerInfo = null;
	
	    // See ReactUpdateQueue
	    this._pendingElement = null;
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	
	    this._renderedNodeType = null;
	    this._renderedComponent = null;
	    this._context = null;
	    this._mountOrder = 0;
	    this._topLevelWrapper = null;
	
	    // See ReactUpdates and ReactUpdateQueue.
	    this._pendingCallbacks = null;
	  },
	
	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {?object} nativeParent
	   * @param {?object} nativeContainerInfo
	   * @param {?object} context
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function (transaction, nativeParent, nativeContainerInfo, context) {
	    this._context = context;
	    this._mountOrder = nextMountID++;
	    this._nativeParent = nativeParent;
	    this._nativeContainerInfo = nativeContainerInfo;
	
	    var publicProps = this._processProps(this._currentElement.props);
	    var publicContext = this._processContext(context);
	
	    var Component = this._currentElement.type;
	
	    // Initialize the public class
	    var inst;
	    var renderedElement;
	
	    if (Component.prototype && Component.prototype.isReactComponent) {
	      if (process.env.NODE_ENV !== 'production') {
	        ReactCurrentOwner.current = this;
	        try {
	          inst = new Component(publicProps, publicContext, ReactUpdateQueue);
	        } finally {
	          ReactCurrentOwner.current = null;
	        }
	      } else {
	        inst = new Component(publicProps, publicContext, ReactUpdateQueue);
	      }
	    } else {
	      if (process.env.NODE_ENV !== 'production') {
	        ReactCurrentOwner.current = this;
	        try {
	          inst = Component(publicProps, publicContext, ReactUpdateQueue);
	        } finally {
	          ReactCurrentOwner.current = null;
	        }
	      } else {
	        inst = Component(publicProps, publicContext, ReactUpdateQueue);
	      }
	      if (inst == null || inst.render == null) {
	        renderedElement = inst;
	        warnIfInvalidElement(Component, renderedElement);
	        !(inst === null || inst === false || ReactElement.isValidElement(inst)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : invariant(false) : void 0;
	        inst = new StatelessComponent(Component);
	      }
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      // This will throw later in _renderValidatedComponent, but add an early
	      // warning now to help debugging
	      if (inst.render == null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', Component.displayName || Component.name || 'Component') : void 0;
	      }
	
	      var propsMutated = inst.props !== publicProps;
	      var componentName = Component.displayName || Component.name || 'Component';
	
	      process.env.NODE_ENV !== 'production' ? warning(inst.props === undefined || !propsMutated, '%s(...): When calling super() in `%s`, make sure to pass ' + 'up the same props that your component\'s constructor was passed.', componentName, componentName) : void 0;
	    }
	
	    // These should be set up in the constructor, but as a convenience for
	    // simpler class abstractions, we set them up after the fact.
	    inst.props = publicProps;
	    inst.context = publicContext;
	    inst.refs = emptyObject;
	    inst.updater = ReactUpdateQueue;
	
	    this._instance = inst;
	
	    // Store a reference from the instance back to the internal representation
	    ReactInstanceMap.set(inst, this);
	
	    if (process.env.NODE_ENV !== 'production') {
	      // Since plain JS classes are defined without any special initialization
	      // logic, we can not catch common errors early. Therefore, we have to
	      // catch them here, at initialization time, instead.
	      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : void 0;
	    }
	
	    var initialState = inst.state;
	    if (initialState === undefined) {
	      inst.state = initialState = null;
	    }
	    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : invariant(false) : void 0;
	
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	
	    var markup;
	    if (inst.unstable_handleError) {
	      markup = this.performInitialMountWithErrorHandling(renderedElement, nativeParent, nativeContainerInfo, transaction, context);
	    } else {
	      markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context);
	    }
	
	    if (inst.componentDidMount) {
	      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
	    }
	
	    return markup;
	  },
	
	  performInitialMountWithErrorHandling: function (renderedElement, nativeParent, nativeContainerInfo, transaction, context) {
	    var markup;
	    var checkpoint = transaction.checkpoint();
	    try {
	      markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context);
	    } catch (e) {
	      // Roll back to checkpoint, handle error (which may add items to the transaction), and take a new checkpoint
	      transaction.rollback(checkpoint);
	      this._instance.unstable_handleError(e);
	      if (this._pendingStateQueue) {
	        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
	      }
	      checkpoint = transaction.checkpoint();
	
	      this._renderedComponent.unmountComponent(true);
	      transaction.rollback(checkpoint);
	
	      // Try again - we've informed the component about the error, so they can render an error message this time.
	      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).
	      markup = this.performInitialMount(renderedElement, nativeParent, nativeContainerInfo, transaction, context);
	    }
	    return markup;
	  },
	
	  performInitialMount: function (renderedElement, nativeParent, nativeContainerInfo, transaction, context) {
	    var inst = this._instance;
	    if (inst.componentWillMount) {
	      inst.componentWillMount();
	      // When mounting, calls to `setState` by `componentWillMount` will set
	      // `this._pendingStateQueue` without triggering a re-render.
	      if (this._pendingStateQueue) {
	        inst.state = this._processPendingState(inst.props, inst.context);
	      }
	    }
	
	    // If not a stateless component, we now render
	    if (renderedElement === undefined) {
	      renderedElement = this._renderValidatedComponent();
	    }
	
	    this._renderedNodeType = ReactNodeTypes.getType(renderedElement);
	    this._renderedComponent = this._instantiateReactComponent(renderedElement);
	
	    var markup = ReactReconciler.mountComponent(this._renderedComponent, transaction, nativeParent, nativeContainerInfo, this._processChildContext(context));
	
	    return markup;
	  },
	
	  getNativeNode: function () {
	    return ReactReconciler.getNativeNode(this._renderedComponent);
	  },
	
	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function (safely) {
	    if (!this._renderedComponent) {
	      return;
	    }
	    var inst = this._instance;
	
	    if (inst.componentWillUnmount) {
	      if (safely) {
	        var name = this.getName() + '.componentWillUnmount()';
	        ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
	      } else {
	        inst.componentWillUnmount();
	      }
	    }
	
	    if (this._renderedComponent) {
	      ReactReconciler.unmountComponent(this._renderedComponent, safely);
	      this._renderedNodeType = null;
	      this._renderedComponent = null;
	      this._instance = null;
	    }
	
	    // Reset pending fields
	    // Even if this component is scheduled for another update in ReactUpdates,
	    // it would still be ignored because these fields are reset.
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	    this._pendingCallbacks = null;
	    this._pendingElement = null;
	
	    // These fields do not really need to be reset since this object is no
	    // longer accessible.
	    this._context = null;
	    this._rootNodeID = null;
	    this._topLevelWrapper = null;
	
	    // Delete the reference from the instance to this internal representation
	    // which allow the internals to be properly cleaned up even if the user
	    // leaks a reference to the public instance.
	    ReactInstanceMap.remove(inst);
	
	    // Some existing components rely on inst.props even after they've been
	    // destroyed (in event handlers).
	    // TODO: inst.props = null;
	    // TODO: inst.state = null;
	    // TODO: inst.context = null;
	  },
	
	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _maskContext: function (context) {
	    var Component = this._currentElement.type;
	    var contextTypes = Component.contextTypes;
	    if (!contextTypes) {
	      return emptyObject;
	    }
	    var maskedContext = {};
	    for (var contextName in contextTypes) {
	      maskedContext[contextName] = context[contextName];
	    }
	    return maskedContext;
	  },
	
	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`, and asserts that they are valid.
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _processContext: function (context) {
	    var maskedContext = this._maskContext(context);
	    if (process.env.NODE_ENV !== 'production') {
	      var Component = this._currentElement.type;
	      if (Component.contextTypes) {
	        this._checkPropTypes(Component.contextTypes, maskedContext, ReactPropTypeLocations.context);
	      }
	    }
	    return maskedContext;
	  },
	
	  /**
	   * @param {object} currentContext
	   * @return {object}
	   * @private
	   */
	  _processChildContext: function (currentContext) {
	    var Component = this._currentElement.type;
	    var inst = this._instance;
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onBeginProcessingChildContext();
	    }
	    var childContext = inst.getChildContext && inst.getChildContext();
	    if (process.env.NODE_ENV !== 'production') {
	      ReactInstrumentation.debugTool.onEndProcessingChildContext();
	    }
	    if (childContext) {
	      !(typeof Component.childContextTypes === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', this.getName() || 'ReactCompositeComponent') : invariant(false) : void 0;
	      if (process.env.NODE_ENV !== 'production') {
	        this._checkPropTypes(Component.childContextTypes, childContext, ReactPropTypeLocations.childContext);
	      }
	      for (var name in childContext) {
	        !(name in Component.childContextTypes) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : invariant(false) : void 0;
	      }
	      return _assign({}, currentContext, childContext);
	    }
	    return currentContext;
	  },
	
	  /**
	   * Processes props by setting default values for unspecified props and
	   * asserting that the props are valid. Does not mutate its argument; returns
	   * a new props object with defaults merged in.
	   *
	   * @param {object} newProps
	   * @return {object}
	   * @private
	   */
	  _processProps: function (newProps) {
	    if (process.env.NODE_ENV !== 'production') {
	      var Component = this._currentElement.type;
	      if (Component.propTypes) {
	        this._checkPropTypes(Component.propTypes, newProps, ReactPropTypeLocations.prop);
	      }
	    }
	    return newProps;
	  },
	
	  /**
	   * Assert that the props are valid
	   *
	   * @param {object} propTypes Map of prop name to a ReactPropType
	   * @param {object} props
	   * @param {string} location e.g. "prop", "context", "child context"
	   * @private
	   */
	  _checkPropTypes: function (propTypes, props, location) {
	    // TODO: Stop validating prop types here and only use the element
	    // validation.
	    var componentName = this.getName();
	    for (var propName in propTypes) {
	      if (propTypes.hasOwnProperty(propName)) {
	        var error;
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually ' + 'from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
	          error = propTypes[propName](props, propName, componentName, location);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error instanceof Error) {
	          // We may want to extend this logic for similar errors in
	          // top-level render calls, so I'm abstracting it away into
	          // a function to minimize refactoring in the future
	          var addendum = getDeclarationErrorAddendum(this);
	
	          if (location === ReactPropTypeLocations.prop) {
	            // Preface gives us something to blacklist in warning module
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Failed Composite propType: %s%s', error.message, addendum) : void 0;
	          } else {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Failed Context Types: %s%s', error.message, addendum) : void 0;
	          }
	        }
	      }
	    }
	  },
	
	  receiveComponent: function (nextElement, transaction, nextContext) {
	    var prevElement = this._currentElement;
	    var prevContext = this._context;
	
	    this._pendingElement = null;
	
	    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
	  },
	
	  /**
	   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
	   * is set, update the component.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function (transaction) {
	    if (this._pendingElement != null) {
	      ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
	    }
	
	    if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
	      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
	    }
	  },
	
	  /**
	   * Perform an update to a mounted component. The componentWillReceiveProps and
	   * shouldComponentUpdate methods are called, then (assuming the update isn't
	   * skipped) the remaining update lifecycle methods are called and the DOM
	   * representation is updated.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevParentElement
	   * @param {ReactElement} nextParentElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
	    var inst = this._instance;
	    var willReceive = false;
	    var nextContext;
	    var nextProps;
	
	    // Determine if the context has changed or not
	    if (this._context === nextUnmaskedContext) {
	      nextContext = inst.context;
	    } else {
	      nextContext = this._processContext(nextUnmaskedContext);
	      willReceive = true;
	    }
	
	    // Distinguish between a props update versus a simple state update
	    if (prevParentElement === nextParentElement) {
	      // Skip checking prop types again -- we don't read inst.props to avoid
	      // warning for DOM component props in this upgrade
	      nextProps = nextParentElement.props;
	    } else {
	      nextProps = this._processProps(nextParentElement.props);
	      willReceive = true;
	    }
	
	    // An update here will schedule an update but immediately set
	    // _pendingStateQueue which will ensure that any state updates gets
	    // immediately reconciled instead of waiting for the next batch.
	    if (willReceive && inst.componentWillReceiveProps) {
	      inst.componentWillReceiveProps(nextProps, nextContext);
	    }
	
	    var nextState = this._processPendingState(nextProps, nextContext);
	
	    var shouldUpdate = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);
	
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : void 0;
	    }
	
	    if (shouldUpdate) {
	      this._pendingForceUpdate = false;
	      // Will set `this.props`, `this.state` and `this.context`.
	      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
	    } else {
	      // If it's determined that a component should not update, we still want
	      // to set props and state but we shortcut the rest of the update.
	      this._currentElement = nextParentElement;
	      this._context = nextUnmaskedContext;
	      inst.props = nextProps;
	      inst.state = nextState;
	      inst.context = nextContext;
	    }
	  },
	
	  _processPendingState: function (props, context) {
	    var inst = this._instance;
	    var queue = this._pendingStateQueue;
	    var replace = this._pendingReplaceState;
	    this._pendingReplaceState = false;
	    this._pendingStateQueue = null;
	
	    if (!queue) {
	      return inst.state;
	    }
	
	    if (replace && queue.length === 1) {
	      return queue[0];
	    }
	
	    var nextState = _assign({}, replace ? queue[0] : inst.state);
	    for (var i = replace ? 1 : 0; i < queue.length; i++) {
	      var partial = queue[i];
	      _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
	    }
	
	    return nextState;
	  },
	
	  /**
	   * Merges new props and state, notifies delegate methods of update and
	   * performs update.
	   *
	   * @param {ReactElement} nextElement Next element
	   * @param {object} nextProps Next public object to set as properties.
	   * @param {?object} nextState Next object to set as state.
	   * @param {?object} nextContext Next public object to set as context.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {?object} unmaskedContext
	   * @private
	   */
	  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
	    var inst = this._instance;
	
	    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
	    var prevProps;
	    var prevState;
	    var prevContext;
	    if (hasComponentDidUpdate) {
	      prevProps = inst.props;
	      prevState = inst.state;
	      prevContext = inst.context;
	    }
	
	    if (inst.componentWillUpdate) {
	      inst.componentWillUpdate(nextProps, nextState, nextContext);
	    }
	
	    this._currentElement = nextElement;
	    this._context = unmaskedContext;
	    inst.props = nextProps;
	    inst.state = nextState;
	    inst.context = nextContext;
	
	    this._updateRenderedComponent(transaction, unmaskedContext);
	
	    if (hasComponentDidUpdate) {
	      transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
	    }
	  },
	
	  /**
	   * Call the component's `render` method and update the DOM accordingly.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  _updateRenderedComponent: function (transaction, context) {
	    var prevComponentInstance = this._renderedComponent;
	    var prevRenderedElement = prevComponentInstance._currentElement;
	    var nextRenderedElement = this._renderValidatedComponent();
	    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
	      ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
	    } else {
	      var oldNativeNode = ReactReconciler.getNativeNode(prevComponentInstance);
	      ReactReconciler.unmountComponent(prevComponentInstance, false);
	
	      this._renderedNodeType = ReactNodeTypes.getType(nextRenderedElement);
	      this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
	      var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, transaction, this._nativeParent, this._nativeContainerInfo, this._processChildContext(context));
	      this._replaceNodeWithMarkup(oldNativeNode, nextMarkup);
	    }
	  },
	
	  /**
	   * Overridden in shallow rendering.
	   *
	   * @protected
	   */
	  _replaceNodeWithMarkup: function (oldNativeNode, nextMarkup) {
	    ReactComponentEnvironment.replaceNodeWithMarkup(oldNativeNode, nextMarkup);
	  },
	
	  /**
	   * @protected
	   */
	  _renderValidatedComponentWithoutOwnerOrContext: function () {
	    var inst = this._instance;
	    var renderedComponent = inst.render();
	    if (process.env.NODE_ENV !== 'production') {
	      // We allow auto-mocks to proceed as if they're returning null.
	      if (renderedComponent === undefined && inst.render._isMockFunction) {
	        // This is probably bad practice. Consider warning here and
	        // deprecating this convenience.
	        renderedComponent = null;
	      }
	    }
	
	    return renderedComponent;
	  },
	
	  /**
	   * @private
	   */
	  _renderValidatedComponent: function () {
	    var renderedComponent;
	    ReactCurrentOwner.current = this;
	    try {
	      renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
	    } finally {
	      ReactCurrentOwner.current = null;
	    }
	    !(
	    // TODO: An `isValidNode` function would probably be more appropriate
	    renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.render(): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(false) : void 0;
	    return renderedComponent;
	  },
	
	  /**
	   * Lazily allocates the refs object and stores `component` as `ref`.
	   *
	   * @param {string} ref Reference name.
	   * @param {component} component Component to store as `ref`.
	   * @final
	   * @private
	   */
	  attachRef: function (ref, component) {
	    var inst = this.getPublicInstance();
	    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : invariant(false) : void 0;
	    var publicComponentInstance = component.getPublicInstance();
	    if (process.env.NODE_ENV !== 'production') {
	      var componentName = component && component.getName ? component.getName() : 'a component';
	      process.env.NODE_ENV !== 'production' ? warning(publicComponentInstance != null, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : void 0;
	    }
	    var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
	    refs[ref] = publicComponentInstance;
	  },
	
	  /**
	   * Detaches a reference name.
	   *
	   * @param {string} ref Name to dereference.
	   * @final
	   * @private
	   */
	  detachRef: function (ref) {
	    var refs = this.getPublicInstance().refs;
	    delete refs[ref];
	  },
	
	  /**
	   * Get a text description of the component that can be used to identify it
	   * in error messages.
	   * @return {string} The name or null.
	   * @internal
	   */
	  getName: function () {
	    var type = this._currentElement.type;
	    var constructor = this._instance && this._instance.constructor;
	    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
	  },
	
	  /**
	   * Get the publicly accessible representation of this component - i.e. what
	   * is exposed by refs and returned by render. Can be null for stateless
	   * components.
	   *
	   * @return {ReactComponent} the public component instance.
	   * @internal
	   */
	  getPublicInstance: function () {
	    var inst = this._instance;
	    if (inst instanceof StatelessComponent) {
	      return null;
	    }
	    return inst;
	  },
	
	  // Stub
	  _instantiateReactComponent: null
	
	};
	
	ReactPerf.measureMethods(ReactCompositeComponentMixin, 'ReactCompositeComponent', {
	  mountComponent: 'mountComponent',
	  updateComponent: 'updateComponent',
	  _renderValidatedComponent: '_renderValidatedComponent'
	});
	
	var ReactCompositeComponent = {
	
	  Mixin: ReactCompositeComponentMixin
	
	};
	
	module.exports = ReactCompositeComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentEnvironment
	 */
	
	'use strict';
	
	var invariant = __webpack_require__(7);
	
	var injected = false;
	
	var ReactComponentEnvironment = {
	
	  /**
	   * Optionally injectable environment dependent cleanup hook. (server vs.
	   * browser etc). Example: A browser system caches DOM nodes based on component
	   * ID and must remove that cache entry when this instance is unmounted.
	   */
	  unmountIDFromEnvironment: null,
	
	  /**
	   * Optionally injectable hook for swapping out mount images in the middle of
	   * the tree.
	   */
	  replaceNodeWithMarkup: null,
	
	  /**
	   * Optionally injectable hook for processing a queue of child updates. Will
	   * later move into MultiChildComponents.
	   */
	  processChildrenUpdates: null,
	
	  injection: {
	    injectEnvironment: function (environment) {
	      !!injected ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : void 0;
	      ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
	      ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
	      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
	      injected = true;
	    }
	  }
	
	};
	
	module.exports = ReactComponentEnvironment;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactErrorUtils
	 */
	
	'use strict';
	
	var caughtError = null;
	
	/**
	 * Call a function while guarding against errors that happens within it.
	 *
	 * @param {?String} name of the guard to use for logging or debugging
	 * @param {Function} func The function to invoke
	 * @param {*} a First argument
	 * @param {*} b Second argument
	 */
	function invokeGuardedCallback(name, func, a, b) {
	  try {
	    return func(a, b);
	  } catch (x) {
	    if (caughtError === null) {
	      caughtError = x;
	    }
	    return undefined;
	  }
	}
	
	var ReactErrorUtils = {
	  invokeGuardedCallback: invokeGuardedCallback,
	
	  /**
	   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
	   * handler are sure to be rethrown by rethrowCaughtError.
	   */
	  invokeGuardedCallbackWithCatch: invokeGuardedCallback,
	
	  /**
	   * During execution of guarded functions we will capture the first error which
	   * we will rethrow to be handled by the top level error handler.
	   */
	  rethrowCaughtError: function () {
	    if (caughtError) {
	      var error = caughtError;
	      caughtError = null;
	      throw error;
	    }
	  }
	};
	
	if (process.env.NODE_ENV !== 'production') {
	  /**
	   * To help development we can get better devtools integration by simulating a
	   * real browser event.
	   */
	  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
	    var fakeNode = document.createElement('react');
	    ReactErrorUtils.invokeGuardedCallback = function (name, func, a, b) {
	      var boundFunc = func.bind(null, a, b);
	      var evtType = 'react-' + name;
	      fakeNode.addEventListener(evtType, boundFunc, false);
	      var evt = document.createEvent('Event');
	      evt.initEvent(evtType, false, false);
	      fakeNode.dispatchEvent(evt);
	      fakeNode.removeEventListener(evtType, boundFunc, false);
	    };
	  }
	}
	
	module.exports = ReactErrorUtils;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNodeTypes
	 */
	
	'use strict';
	
	var ReactElement = __webpack_require__(8);
	
	var invariant = __webpack_require__(7);
	
	var ReactNodeTypes = {
	  NATIVE: 0,
	  COMPOSITE: 1,
	  EMPTY: 2,
	
	  getType: function (node) {
	    if (node === null || node === false) {
	      return ReactNodeTypes.EMPTY;
	    } else if (ReactElement.isValidElement(node)) {
	      if (typeof node.type === 'function') {
	        return ReactNodeTypes.COMPOSITE;
	      } else {
	        return ReactNodeTypes.NATIVE;
	      }
	    }
	     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unexpected node: %s', node) : invariant(false) : void 0;
	  }
	};
	
	module.exports = ReactNodeTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shouldUpdateReactComponent
	 */
	
	'use strict';
	
	/**
	 * Given a `prevElement` and `nextElement`, determines if the existing
	 * instance should be updated as opposed to being destroyed or replaced by a new
	 * instance. Both arguments are elements. This ensures that this logic can
	 * operate on stateless trees without any backing instance.
	 *
	 * @param {?object} prevElement
	 * @param {?object} nextElement
	 * @return {boolean} True if the existing instance should be updated.
	 * @protected
	 */
	
	function shouldUpdateReactComponent(prevElement, nextElement) {
	  var prevEmpty = prevElement === null || prevElement === false;
	  var nextEmpty = nextElement === null || nextElement === false;
	  if (prevEmpty || nextEmpty) {
	    return prevEmpty === nextEmpty;
	  }
	
	  var prevType = typeof prevElement;
	  var nextType = typeof nextElement;
	  if (prevType === 'string' || prevType === 'number') {
	    return nextType === 'string' || nextType === 'number';
	  } else {
	    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
	  }
	}
	
	module.exports = shouldUpdateReactComponent;

/***/ },
/* 51 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactEmptyComponent
	 */
	
	'use strict';
	
	var emptyComponentFactory;
	
	var ReactEmptyComponentInjection = {
	  injectEmptyComponentFactory: function (factory) {
	    emptyComponentFactory = factory;
	  }
	};
	
	var ReactEmptyComponent = {
	  create: function (instantiate) {
	    return emptyComponentFactory(instantiate);
	  }
	};
	
	ReactEmptyComponent.injection = ReactEmptyComponentInjection;
	
	module.exports = ReactEmptyComponent;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNativeComponent
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var invariant = __webpack_require__(7);
	
	var autoGenerateWrapperClass = null;
	var genericComponentClass = null;
	// This registry keeps track of wrapper classes around native tags.
	var tagToComponentClass = {};
	var textComponentClass = null;
	
	var ReactNativeComponentInjection = {
	  // This accepts a class that receives the tag string. This is a catch all
	  // that can render any kind of tag.
	  injectGenericComponentClass: function (componentClass) {
	    genericComponentClass = componentClass;
	  },
	  // This accepts a text component class that takes the text string to be
	  // rendered as props.
	  injectTextComponentClass: function (componentClass) {
	    textComponentClass = componentClass;
	  },
	  // This accepts a keyed object with classes as values. Each key represents a
	  // tag. That particular tag will use this class instead of the generic one.
	  injectComponentClasses: function (componentClasses) {
	    _assign(tagToComponentClass, componentClasses);
	  }
	};
	
	/**
	 * Get a composite component wrapper class for a specific tag.
	 *
	 * @param {ReactElement} element The tag for which to get the class.
	 * @return {function} The React class constructor function.
	 */
	function getComponentClassForElement(element) {
	  if (typeof element.type === 'function') {
	    return element.type;
	  }
	  var tag = element.type;
	  var componentClass = tagToComponentClass[tag];
	  if (componentClass == null) {
	    tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
	  }
	  return componentClass;
	}
	
	/**
	 * Get a native internal component class for a specific tag.
	 *
	 * @param {ReactElement} element The element to create.
	 * @return {function} The internal class constructor function.
	 */
	function createInternalComponent(element) {
	  !genericComponentClass ? process.env.NODE_ENV !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : void 0;
	  return new genericComponentClass(element);
	}
	
	/**
	 * @param {ReactText} text
	 * @return {ReactComponent}
	 */
	function createInstanceForText(text) {
	  return new textComponentClass(text);
	}
	
	/**
	 * @param {ReactComponent} component
	 * @return {boolean}
	 */
	function isTextComponent(component) {
	  return component instanceof textComponentClass;
	}
	
	var ReactNativeComponent = {
	  getComponentClassForElement: getComponentClassForElement,
	  createInternalComponent: createInternalComponent,
	  createInstanceForText: createInstanceForText,
	  isTextComponent: isTextComponent,
	  injection: ReactNativeComponentInjection
	};
	
	module.exports = ReactNativeComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 54 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var ReactAnythingContainerInfo = function (rootInstance, containerName) {
	    return {
	        _rootInstance: rootInstance,
	        _containerName: containerName
	    };
	};
	
	module.exports = ReactAnythingContainerInfo;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var ReactUpdates = __webpack_require__(38);
	var ReactNativeComponent = __webpack_require__(52);
	var ReactEmptyComponent = __webpack_require__(51);
	var ReactDefaultBatchingStrategy = __webpack_require__(56);
	var ReactComponentEnvironment = __webpack_require__(47);
	
	var createReactAnythingReconcileTransaction = __webpack_require__(57);
	var createReactAnythingComponent = __webpack_require__(58);
	var ReactAnythingEmptyComponent = __webpack_require__(64);
	var ReactAnythingComponentEnvironment = __webpack_require__(65);
	
	var inject = function (nativeImplementation) {
	    ReactUpdates.injection.injectReconcileTransaction(createReactAnythingReconcileTransaction(nativeImplementation.transaction));
	    ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
	
	    ReactNativeComponent.injection.injectGenericComponentClass(createReactAnythingComponent(nativeImplementation.components));
	
	    ReactEmptyComponent.injection.injectEmptyComponentFactory(function (instantiate) {
	        return new ReactAnythingEmptyComponent(instantiate);
	    });
	
	    if (ReactComponentEnvironment.unmountIDFromEnvironment ||
	        ReactComponentEnvironment.unmountIDFromEnvironment ||
	        ReactComponentEnvironment.processChildrenUpdates) {
	
	        ReactComponentEnvironment.unmountIDFromEnvironment = ReactAnythingComponentEnvironment.unmountIDFromEnvironment;
	        ReactComponentEnvironment.replaceNodeWithMarkup = ReactAnythingComponentEnvironment.replaceNodeWithMarkup;
	        ReactComponentEnvironment.processChildrenUpdates = ReactAnythingComponentEnvironment.processChildrenUpdates;
	    } else {
	        ReactComponentEnvironment.injection.injectEnvironment(ReactAnythingComponentEnvironment);
	    }
	};
	
	var clear = function () {
	    ReactUpdates.ReactReconcileTransaction = null;
	};
	
	module.exports = {
	    inject: inject,
	    clear: clear
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDefaultBatchingStrategy
	 */
	
	'use strict';
	
	var _assign = __webpack_require__(9);
	
	var ReactUpdates = __webpack_require__(38);
	var Transaction = __webpack_require__(44);
	
	var emptyFunction = __webpack_require__(12);
	
	var RESET_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: function () {
	    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
	  }
	};
	
	var FLUSH_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
	};
	
	var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
	
	function ReactDefaultBatchingStrategyTransaction() {
	  this.reinitializeTransaction();
	}
	
	_assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, {
	  getTransactionWrappers: function () {
	    return TRANSACTION_WRAPPERS;
	  }
	});
	
	var transaction = new ReactDefaultBatchingStrategyTransaction();
	
	var ReactDefaultBatchingStrategy = {
	  isBatchingUpdates: false,
	
	  /**
	   * Call the provided function in a context within which calls to `setState`
	   * and friends are batched such that components aren't updated unnecessarily.
	   */
	  batchedUpdates: function (callback, a, b, c, d, e) {
	    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
	
	    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
	
	    // The code is written this way to avoid extra allocations
	    if (alreadyBatchingUpdates) {
	      callback(a, b, c, d, e);
	    } else {
	      transaction.perform(callback, null, a, b, c, d, e);
	    }
	  }
	};
	
	module.exports = ReactDefaultBatchingStrategy;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * This file is a modified version of:
	 *  react/lib/ReactReconcileTransaction.js
	 *  Copyright (c) 2013-present, Facebook, Inc.
	 *  All rights reserved.
	 *  
	 */
	'use strict';
	
	var CallbackQueue = __webpack_require__(39);
	var PooledClass = __webpack_require__(6);
	var Transaction = __webpack_require__(44);
	
	var assign = __webpack_require__(9);
	
	var ON_READY_QUEUEING = {
	    initialize: function () {
	        this.reactMountReady.reset();
	    },
	
	    close: function () {
	        this.reactMountReady.notifyAll();
	    }
	};
	
	var createTransactionType = function (nativeImplementation) {
	    var TRANSACTION_WRAPPERS = [ON_READY_QUEUEING];
	
	    if (nativeImplementation) {
	        TRANSACTION_WRAPPERS.push(nativeImplementation);
	    }
	
	    var ReactAnythingReconcileTransaction = function () {
	        this.reinitializeTransaction();
	        // Only server-side rendering really needs this option (see
	        // `ReactServerRendering`), but server-side uses
	        // `ReactServerRenderingTransaction` instead. This option is here so that it's
	        // accessible and defaults to false when `ReactDOMComponent` and
	        // `ReactTextComponent` checks it in `mountComponent`.`
	        this.reactMountReady = CallbackQueue.getPooled(null);
	    };
	
	    var Mixin = {
	        getTransactionWrappers: function () {
	            return TRANSACTION_WRAPPERS;
	        },
	
	        getReactMountReady: function () {
	            return this.reactMountReady;
	        },
	
	        checkpoint: function () {
	            // reactMountReady is the our only stateful wrapper
	            return this.reactMountReady.checkpoint();
	        },
	
	        rollback: function (checkpoint) {
	            this.reactMountReady.rollback(checkpoint);
	        },
	
	        destructor: function () {
	            CallbackQueue.release(this.reactMountReady);
	            this.reactMountReady = null;
	        }
	    };
	
	
	    assign(ReactAnythingReconcileTransaction.prototype, Transaction.Mixin, Mixin);
	
	    PooledClass.addPoolingTo(ReactAnythingReconcileTransaction);
	
	    return ReactAnythingReconcileTransaction;
	};
	
	module.exports = createTransactionType;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 * 
	 * This file is a modified version of:
	 *  react/lib/ReactDOMComponent.js
	 *  Copyright (c) 2013-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 */
	'use strict';
	
	var ReactMultiChild = __webpack_require__(59);
	var ReactPerf = __webpack_require__(34);
	
	var assign = __webpack_require__(9);
	var invariant = __webpack_require__(63);
	var warning = __webpack_require__(53);
	
	
	var globalIdCounter = 1;
	
	var createImplementation = function (nativeImplementation) {
	
	    var ReactAnythingComponent = function (element) {
	        var tag = element.type;
	        this._currentElement = element;
	        this._tag = tag.toLowerCase();
	        this._rootNodeID = null;
	        this._renderedChildren = null;
	        this._nativeNode = null;
	        this._nativeParent = null;
	        this._nativeContainerInfo = null;
	        this._wrapperState = null;
	        this._topLevelWrapper = null;
	    };
	
	    ReactAnythingComponent.displayName = 'ReactAnythingComponent';
	
	    ReactAnythingComponent.Mixin = {
	        mountComponent: function (transaction,
	                                  nativeParent,
	                                  nativeContainerInfo,
	                                  context) {
	            this._rootNodeID = globalIdCounter++;
	            this._nativeParent = nativeParent;
	            this._nativeContainerInfo = nativeContainerInfo;
	
	            var props = this._currentElement.props;
	
	            this._nativeNode = nativeImplementation.mount(this._rootNodeID, this._tag, props, nativeParent && nativeParent._nativeNode);
	            var childrenImages = this.mountChildren(props.children, transaction, context);
	            if (nativeImplementation.childrenMount && childrenImages.length > 0) {
	                nativeImplementation.childrenMount(this._nativeNode, childrenImages);
	            }
	            return this._nativeNode;
	        },
	
	        receiveComponent: function (nextElement, transaction, context) {
	            var prevElement = this._currentElement;
	            this._currentElement = nextElement;
	            this.updateComponent(transaction, prevElement, nextElement, context);
	        },
	
	        updateComponent: function (transaction, prevElement, nextElement, context) {
	            var lastProps = prevElement.props;
	            var nextProps = this._currentElement.props;
	
	            nativeImplementation.update(this._nativeNode, nextProps, lastProps);
	
	            this.updateChildren(nextProps.children, transaction, context);
	        },
	
	        getNativeNode: function () {
	            return this._nativeNode;
	        },
	
	        unmountComponent: function (safely) {
	            this.unmountChildren(safely);
	            this._rootNodeID = null;
	            nativeImplementation.unmount(this._nativeNode);
	        },
	
	        getPublicInstance: function () {
	            return this._currentElement;
	        }
	    };
	
	    ReactPerf.measureMethods(ReactAnythingComponent.Mixin, 'ReactAnythingComponent', {
	        mountComponent: 'mountComponent',
	        receiveComponent: 'receiveComponent',
	    });
	
	    assign(
	        ReactAnythingComponent.prototype,
	        ReactAnythingComponent.Mixin,
	        ReactMultiChild.Mixin
	    );
	
	    return ReactAnythingComponent;
	}
	
	module.exports = createImplementation;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactMultiChild
	 */
	
	'use strict';
	
	var ReactComponentEnvironment = __webpack_require__(47);
	var ReactMultiChildUpdateTypes = __webpack_require__(60);
	
	var ReactCurrentOwner = __webpack_require__(10);
	var ReactReconciler = __webpack_require__(41);
	var ReactChildReconciler = __webpack_require__(61);
	
	var flattenChildren = __webpack_require__(62);
	var invariant = __webpack_require__(7);
	
	/**
	 * Make an update for markup to be rendered and inserted at a supplied index.
	 *
	 * @param {string} markup Markup that renders into an element.
	 * @param {number} toIndex Destination index.
	 * @private
	 */
	function makeInsertMarkup(markup, afterNode, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
	    content: markup,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: toIndex,
	    afterNode: afterNode
	  };
	}
	
	/**
	 * Make an update for moving an existing element to another index.
	 *
	 * @param {number} fromIndex Source index of the existing element.
	 * @param {number} toIndex Destination index of the element.
	 * @private
	 */
	function makeMove(child, afterNode, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
	    content: null,
	    fromIndex: child._mountIndex,
	    fromNode: ReactReconciler.getNativeNode(child),
	    toIndex: toIndex,
	    afterNode: afterNode
	  };
	}
	
	/**
	 * Make an update for removing an element at an index.
	 *
	 * @param {number} fromIndex Index of the element to remove.
	 * @private
	 */
	function makeRemove(child, node) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
	    content: null,
	    fromIndex: child._mountIndex,
	    fromNode: node,
	    toIndex: null,
	    afterNode: null
	  };
	}
	
	/**
	 * Make an update for setting the markup of a node.
	 *
	 * @param {string} markup Markup that renders into an element.
	 * @private
	 */
	function makeSetMarkup(markup) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: ReactMultiChildUpdateTypes.SET_MARKUP,
	    content: markup,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: null,
	    afterNode: null
	  };
	}
	
	/**
	 * Make an update for setting the text content.
	 *
	 * @param {string} textContent Text content to set.
	 * @private
	 */
	function makeTextContent(textContent) {
	  // NOTE: Null values reduce hidden classes.
	  return {
	    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
	    content: textContent,
	    fromIndex: null,
	    fromNode: null,
	    toIndex: null,
	    afterNode: null
	  };
	}
	
	/**
	 * Push an update, if any, onto the queue. Creates a new queue if none is
	 * passed and always returns the queue. Mutative.
	 */
	function enqueue(queue, update) {
	  if (update) {
	    queue = queue || [];
	    queue.push(update);
	  }
	  return queue;
	}
	
	/**
	 * Processes any enqueued updates.
	 *
	 * @private
	 */
	function processQueue(inst, updateQueue) {
	  ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
	}
	
	/**
	 * ReactMultiChild are capable of reconciling multiple children.
	 *
	 * @class ReactMultiChild
	 * @internal
	 */
	var ReactMultiChild = {
	
	  /**
	   * Provides common functionality for components that must reconcile multiple
	   * children. This is used by `ReactDOMComponent` to mount, update, and
	   * unmount child components.
	   *
	   * @lends {ReactMultiChild.prototype}
	   */
	  Mixin: {
	
	    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (this._currentElement) {
	          try {
	            ReactCurrentOwner.current = this._currentElement._owner;
	            return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
	          } finally {
	            ReactCurrentOwner.current = null;
	          }
	        }
	      }
	      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
	    },
	
	    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, removedNodes, transaction, context) {
	      var nextChildren;
	      if (process.env.NODE_ENV !== 'production') {
	        if (this._currentElement) {
	          try {
	            ReactCurrentOwner.current = this._currentElement._owner;
	            nextChildren = flattenChildren(nextNestedChildrenElements);
	          } finally {
	            ReactCurrentOwner.current = null;
	          }
	          ReactChildReconciler.updateChildren(prevChildren, nextChildren, removedNodes, transaction, context);
	          return nextChildren;
	        }
	      }
	      nextChildren = flattenChildren(nextNestedChildrenElements);
	      ReactChildReconciler.updateChildren(prevChildren, nextChildren, removedNodes, transaction, context);
	      return nextChildren;
	    },
	
	    /**
	     * Generates a "mount image" for each of the supplied children. In the case
	     * of `ReactDOMComponent`, a mount image is a string of markup.
	     *
	     * @param {?object} nestedChildren Nested child maps.
	     * @return {array} An array of mounted representations.
	     * @internal
	     */
	    mountChildren: function (nestedChildren, transaction, context) {
	      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
	      this._renderedChildren = children;
	      var mountImages = [];
	      var index = 0;
	      for (var name in children) {
	        if (children.hasOwnProperty(name)) {
	          var child = children[name];
	          var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._nativeContainerInfo, context);
	          child._mountIndex = index++;
	          mountImages.push(mountImage);
	        }
	      }
	      return mountImages;
	    },
	
	    /**
	     * Replaces any rendered children with a text content string.
	     *
	     * @param {string} nextContent String of content.
	     * @internal
	     */
	    updateTextContent: function (nextContent) {
	      var prevChildren = this._renderedChildren;
	      // Remove any rendered children.
	      ReactChildReconciler.unmountChildren(prevChildren, false);
	      for (var name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name)) {
	           true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : invariant(false) : void 0;
	        }
	      }
	      // Set new text content.
	      var updates = [makeTextContent(nextContent)];
	      processQueue(this, updates);
	    },
	
	    /**
	     * Replaces any rendered children with a markup string.
	     *
	     * @param {string} nextMarkup String of markup.
	     * @internal
	     */
	    updateMarkup: function (nextMarkup) {
	      var prevChildren = this._renderedChildren;
	      // Remove any rendered children.
	      ReactChildReconciler.unmountChildren(prevChildren, false);
	      for (var name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name)) {
	           true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : invariant(false) : void 0;
	        }
	      }
	      var updates = [makeSetMarkup(nextMarkup)];
	      processQueue(this, updates);
	    },
	
	    /**
	     * Updates the rendered children with new children.
	     *
	     * @param {?object} nextNestedChildrenElements Nested child element maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    updateChildren: function (nextNestedChildrenElements, transaction, context) {
	      // Hook used by React ART
	      this._updateChildren(nextNestedChildrenElements, transaction, context);
	    },
	
	    /**
	     * @param {?object} nextNestedChildrenElements Nested child element maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @final
	     * @protected
	     */
	    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
	      var prevChildren = this._renderedChildren;
	      var removedNodes = {};
	      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, removedNodes, transaction, context);
	      if (!nextChildren && !prevChildren) {
	        return;
	      }
	      var updates = null;
	      var name;
	      // `nextIndex` will increment for each child in `nextChildren`, but
	      // `lastIndex` will be the last index visited in `prevChildren`.
	      var lastIndex = 0;
	      var nextIndex = 0;
	      var lastPlacedNode = null;
	      for (name in nextChildren) {
	        if (!nextChildren.hasOwnProperty(name)) {
	          continue;
	        }
	        var prevChild = prevChildren && prevChildren[name];
	        var nextChild = nextChildren[name];
	        if (prevChild === nextChild) {
	          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
	          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	          prevChild._mountIndex = nextIndex;
	        } else {
	          if (prevChild) {
	            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
	            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	            // The `removedNodes` loop below will actually remove the child.
	          }
	          // The child must be instantiated before it's mounted.
	          updates = enqueue(updates, this._mountChildAtIndex(nextChild, lastPlacedNode, nextIndex, transaction, context));
	        }
	        nextIndex++;
	        lastPlacedNode = ReactReconciler.getNativeNode(nextChild);
	      }
	      // Remove children that are no longer present.
	      for (name in removedNodes) {
	        if (removedNodes.hasOwnProperty(name)) {
	          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
	        }
	      }
	      if (updates) {
	        processQueue(this, updates);
	      }
	      this._renderedChildren = nextChildren;
	    },
	
	    /**
	     * Unmounts all rendered children. This should be used to clean up children
	     * when this component is unmounted. It does not actually perform any
	     * backend operations.
	     *
	     * @internal
	     */
	    unmountChildren: function (safely) {
	      var renderedChildren = this._renderedChildren;
	      ReactChildReconciler.unmountChildren(renderedChildren, safely);
	      this._renderedChildren = null;
	    },
	
	    /**
	     * Moves a child component to the supplied index.
	     *
	     * @param {ReactComponent} child Component to move.
	     * @param {number} toIndex Destination index of the element.
	     * @param {number} lastIndex Last index visited of the siblings of `child`.
	     * @protected
	     */
	    moveChild: function (child, afterNode, toIndex, lastIndex) {
	      // If the index of `child` is less than `lastIndex`, then it needs to
	      // be moved. Otherwise, we do not need to move it because a child will be
	      // inserted or moved before `child`.
	      if (child._mountIndex < lastIndex) {
	        return makeMove(child, afterNode, toIndex);
	      }
	    },
	
	    /**
	     * Creates a child component.
	     *
	     * @param {ReactComponent} child Component to create.
	     * @param {string} mountImage Markup to insert.
	     * @protected
	     */
	    createChild: function (child, afterNode, mountImage) {
	      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
	    },
	
	    /**
	     * Removes a child component.
	     *
	     * @param {ReactComponent} child Child to remove.
	     * @protected
	     */
	    removeChild: function (child, node) {
	      return makeRemove(child, node);
	    },
	
	    /**
	     * Mounts a child with the supplied name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to mount.
	     * @param {string} name Name of the child.
	     * @param {number} index Index at which to insert the child.
	     * @param {ReactReconcileTransaction} transaction
	     * @private
	     */
	    _mountChildAtIndex: function (child, afterNode, index, transaction, context) {
	      var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._nativeContainerInfo, context);
	      child._mountIndex = index;
	      return this.createChild(child, afterNode, mountImage);
	    },
	
	    /**
	     * Unmounts a rendered child.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to unmount.
	     * @private
	     */
	    _unmountChild: function (child, node) {
	      var update = this.removeChild(child, node);
	      child._mountIndex = null;
	      return update;
	    }
	
	  }
	
	};
	
	module.exports = ReactMultiChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactMultiChildUpdateTypes
	 */
	
	'use strict';
	
	var keyMirror = __webpack_require__(24);
	
	/**
	 * When a component's children are updated, a series of update configuration
	 * objects are created in order to batch and serialize the required changes.
	 *
	 * Enumerates all the possible types of update configurations.
	 *
	 * @internal
	 */
	var ReactMultiChildUpdateTypes = keyMirror({
	  INSERT_MARKUP: null,
	  MOVE_EXISTING: null,
	  REMOVE_NODE: null,
	  SET_MARKUP: null,
	  TEXT_CONTENT: null
	});
	
	module.exports = ReactMultiChildUpdateTypes;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildReconciler
	 */
	
	'use strict';
	
	var ReactReconciler = __webpack_require__(41);
	
	var instantiateReactComponent = __webpack_require__(45);
	var shouldUpdateReactComponent = __webpack_require__(50);
	var traverseAllChildren = __webpack_require__(14);
	var warning = __webpack_require__(11);
	
	function instantiateChild(childInstances, child, name) {
	  // We found a component instance.
	  var keyUnique = childInstances[name] === undefined;
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : void 0;
	  }
	  if (child != null && keyUnique) {
	    childInstances[name] = instantiateReactComponent(child);
	  }
	}
	
	/**
	 * ReactChildReconciler provides helpers for initializing or updating a set of
	 * children. Its output is suitable for passing it onto ReactMultiChild which
	 * does diffed reordering and insertion.
	 */
	var ReactChildReconciler = {
	  /**
	   * Generates a "mount image" for each of the supplied children. In the case
	   * of `ReactDOMComponent`, a mount image is a string of markup.
	   *
	   * @param {?object} nestedChildNodes Nested child maps.
	   * @return {?object} A set of child instances.
	   * @internal
	   */
	  instantiateChildren: function (nestedChildNodes, transaction, context) {
	    if (nestedChildNodes == null) {
	      return null;
	    }
	    var childInstances = {};
	    traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
	    return childInstances;
	  },
	
	  /**
	   * Updates the rendered children and returns a new set of children.
	   *
	   * @param {?object} prevChildren Previously initialized set of children.
	   * @param {?object} nextChildren Flat child element maps.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @return {?object} A new set of child instances.
	   * @internal
	   */
	  updateChildren: function (prevChildren, nextChildren, removedNodes, transaction, context) {
	    // We currently don't have a way to track moves here but if we use iterators
	    // instead of for..in we can zip the iterators and check if an item has
	    // moved.
	    // TODO: If nothing has changed, return the prevChildren object so that we
	    // can quickly bailout if nothing has changed.
	    if (!nextChildren && !prevChildren) {
	      return;
	    }
	    var name;
	    var prevChild;
	    for (name in nextChildren) {
	      if (!nextChildren.hasOwnProperty(name)) {
	        continue;
	      }
	      prevChild = prevChildren && prevChildren[name];
	      var prevElement = prevChild && prevChild._currentElement;
	      var nextElement = nextChildren[name];
	      if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
	        ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
	        nextChildren[name] = prevChild;
	      } else {
	        if (prevChild) {
	          removedNodes[name] = ReactReconciler.getNativeNode(prevChild);
	          ReactReconciler.unmountComponent(prevChild, false);
	        }
	        // The child must be instantiated before it's mounted.
	        var nextChildInstance = instantiateReactComponent(nextElement);
	        nextChildren[name] = nextChildInstance;
	      }
	    }
	    // Unmount children that are no longer present.
	    for (name in prevChildren) {
	      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
	        prevChild = prevChildren[name];
	        removedNodes[name] = ReactReconciler.getNativeNode(prevChild);
	        ReactReconciler.unmountComponent(prevChild, false);
	      }
	    }
	  },
	
	  /**
	   * Unmounts all rendered children. This should be used to clean up children
	   * when this component is unmounted.
	   *
	   * @param {?object} renderedChildren Previously initialized set of children.
	   * @internal
	   */
	  unmountChildren: function (renderedChildren, safely) {
	    for (var name in renderedChildren) {
	      if (renderedChildren.hasOwnProperty(name)) {
	        var renderedChild = renderedChildren[name];
	        ReactReconciler.unmountComponent(renderedChild, safely);
	      }
	    }
	  }
	
	};
	
	module.exports = ReactChildReconciler;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule flattenChildren
	 */
	
	'use strict';
	
	var traverseAllChildren = __webpack_require__(14);
	var warning = __webpack_require__(11);
	
	/**
	 * @param {function} traverseContext Context passed through traversal.
	 * @param {?ReactComponent} child React child component.
	 * @param {!string} name String name of key path to child.
	 */
	function flattenSingleChildIntoContext(traverseContext, child, name) {
	  // We found a component instance.
	  var result = traverseContext;
	  var keyUnique = result[name] === undefined;
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : void 0;
	  }
	  if (keyUnique && child != null) {
	    result[name] = child;
	  }
	}
	
	/**
	 * Flattens children that are typically specified as `props.children`. Any null
	 * children will not be included in the resulting object.
	 * @return {!object} flattened children keyed by name.
	 */
	function flattenChildren(children) {
	  if (children == null) {
	    return children;
	  }
	  var result = {};
	  traverseAllChildren(children, flattenSingleChildIntoContext, result);
	  return result;
	}
	
	module.exports = flattenChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var ReactPerf = __webpack_require__(34);
	
	var assign = __webpack_require__(9);
	var invariant = __webpack_require__(63);
	var warning = __webpack_require__(53);
	
	
	var ReactAnythingEmptyComponent = function (element) {
	    this._currentElement = element;
	    this._rootNodeID = null;
	    this._nativeNode = null;
	    this._nativeParent = null;
	    this._nativeContainerInfo = null;
	    this._wrapperState = null;
	    this._topLevelWrapper = null;
	};
	
	ReactAnythingEmptyComponent.displayName = 'ReactAnythingEmptyComponent';
	
	ReactAnythingEmptyComponent.Mixin = {
	    mountComponent: function (transaction,
	                              nativeParent,
	                              nativeContainerInfo,
	                              context) {
	        this._nativeParent = nativeParent;
	        this._nativeContainerInfo = nativeContainerInfo;
	
	        this._nativeNode = {empty: true};
	        return '';
	    },
	
	    receiveComponent: function (nextElement, transaction, context) {
	        var prevElement = this._currentElement;
	        this._currentElement = nextElement;
	        this.updateComponent(transaction, prevElement, nextElement, context);
	    },
	
	    updateComponent: function (transaction, prevElement, nextElement, context) {
	    },
	
	    getNativeNode: function () {
	        return this._nativeNode;
	    },
	
	    unmountComponent: function (safely) {
	        this._rootNodeID = null;
	    },
	
	    getPublicInstance: function () {
	        return this._currentElement;
	    }
	};
	
	
	assign(
	    ReactAnythingEmptyComponent.prototype,
	    ReactAnythingEmptyComponent.Mixin
	);
	
	module.exports = ReactAnythingEmptyComponent;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 * 
	 * This file is a modified version of:
	 *  react/lib/ReactComponentEnvironment.js
	 *  Copyright (c) 2013-present, Facebook, Inc.
	 *  All rights reserved.
	 *  
	 */
	'use strict';
	
	var ReactPerf = __webpack_require__(34);
	
	var ReactAnythingComponentEnvironment = {
	    processChildrenUpdates: function (a, b, c) {
	    },
	    replaceNodeWithMarkup: function (a, b, c) {
	    }
	};
	
	ReactPerf.measureMethods(
	    ReactAnythingComponentEnvironment,
	    'ReactAnythingComponentEnvironment',
	    {
	        replaceNodeWithMarkup: 'replaceNodeWithMarkup',
	    }
	);
	
	module.exports = ReactAnythingComponentEnvironment;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var createTreeImpl = __webpack_require__(67),
	    createInitAdapter = __webpack_require__(68),
	    nodeTypes = __webpack_require__(69);
	
	module.exports = createTreeImpl(createInitAdapter(nodeTypes));

/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var create = function create(impl) {
	    var tree = {
	        root: null,
	        nodes: {},
	        byname: {}
	    },
	        treeImpl = {
	        components: {
	            mount: function mount(id, tag, props, parent) {
	                var node = {
	                    id: id,
	                    tag: tag,
	                    props: props,
	                    parent: parent && parent.id,
	                    children: [],
	                    initialized: false
	                };
	
	                if (parent) {
	                    parent.children.push(id);
	                } else {
	                    tree.root = node;
	                }
	                tree.nodes[id] = node;
	
	                if (props.name) {
	                    tree.byname[props.name] = node;
	                }
	
	                impl.components.mount(node, tree);
	                return node;
	            },
	            childrenMount: function childrenMount(node) {
	                impl.components.childrenMount(node, tree);
	            },
	            unmount: function unmount(node) {
	                impl.components.unmount(node, tree);
	                delete tree.nodes[node.id];
	                if (node.parent) {
	                    var parent = tree.nodes[node.parent];
	                    parent.children.splice(parent.children.indexOf(node.id), 1);
	                }
	                delete tree.nodes[node.id];
	                if (node === tree.root) {
	                    tree.root = null;
	                }
	
	                if (node.props.name) {
	                    delete tree.byname[node.props.name];
	                }
	            },
	            update: function update(node, nextProps, prevProps) {
	                node.props = nextProps;
	                impl.components.update(node, prevProps, tree);
	                if (nextProps.name !== prevProps.name) {
	                    if (prevProps.name) {
	                        delete tree.byname[prevProps.name];
	                    }
	                    if (nextProps.name) {
	                        tree.byname[nextProps.name] = node;
	                    }
	                }
	            }
	        },
	        transaction: {
	            initialize: impl.transaction.initialize && function () {
	                impl.transaction.initialize(tree);
	            },
	            close: impl.transaction.close && function () {
	                impl.transaction.close(tree);
	            }
	        }
	    };
	
	    return treeImpl;
	};
	
	module.exports = create;

/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016-present, Eloy Villasclaras
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */
	'use strict';
	
	var create = function create(nodeTypes) {
	
	    var transactionListeners = [],
	        parentInitd = function parentInitd(node, tree) {
	        var parent = tree.nodes[node.parent];
	        return !parent || parent.initialized;
	    },
	        invoke = function invoke(method, node, a, b, c) {
	        var nodeType = nodeTypes[node.tag],
	            f = nodeType && nodeType[method];
	
	        if (f) {
	            f(node, a, b, c);
	        }
	    },
	        initImmediately = function initImmediately(node) {
	        var nodeType = nodeTypes[node.tag];
	        return !nodeType || !nodeTypes[node.tag].deferredInit;
	    },
	        init = function init(method, node, tree) {
	        node.initialized = true;
	        invoke(method, node, tree, methods);
	        if (node.obj) {
	            node.obj.rnodeid = node.id;
	        }
	    },
	        initChildren = function initChildren(parent, tree, options) {
	        var _options = options || {},
	            include = _options.include,
	            exclude = _options.exclude;
	
	        for (var i = 0; i < parent.children.length; i++) {
	            var child = tree.nodes[parent.children[i]],
	                doInit = !child.initialized && (!include || include.indexOf(child.tag) >= 0) && (!exclude || exclude.indexOf(child.tag) < 0);
	
	            if (doInit) {
	                if (initImmediately(child)) {
	                    init('init', child, tree);
	                    methods.initChildren(child, tree);
	                    invoke('onChildrenInit', child, tree, methods);
	                } else {
	                    init('onChildrenInit', child, tree, methods);
	                }
	            }
	        }
	    },
	        clearChildren = function clearChildren(parent, tree, options) {
	        var _options = options || {},
	            include = _options.include,
	            exclude = _options.exclude;
	
	        for (var i = 0; i < parent.children.length; i++) {
	            var child = tree.nodes[parent.children[i]],
	                shouldClear = child.initialized && (!include || include.indexOf(child.tag) >= 0) && (!exclude || exclude.indexOf(child.tag) < 0);
	
	            if (shouldClear) {
	                invoke('clear', tree, methods);
	                child.initialized = false;
	                if (child.children.length > 0) {
	                    clearChildren(child, tree);
	                }
	            }
	        }
	    },
	        requestTransactionNofitication = function requestTransactionNofitication(nodeid) {
	        if (transactionListeners.indexOf(nodeid) < 0) {
	            transactionListeners.push(nodeid);
	        }
	    },
	        cancelTransactionNofitication = function cancelTransactionNofitication(nodeid) {
	        var index = transactionListeners.indexOf(nodeid);
	        if (index >= 0) {
	            transactionListeners.splice(index, 1);
	        }
	    },
	        methods = {
	        initChildren: initChildren,
	        clearChildren: clearChildren,
	        requestTransactionNofitication: requestTransactionNofitication,
	        cancelTransactionNofitication: cancelTransactionNofitication
	    },
	        impl = {
	        components: {
	            mount: function mount(node, tree) {
	                if (initImmediately(node) && parentInitd(node, tree)) {
	                    init('init', node, tree);
	                }
	            },
	            childrenMount: function childrenMount(node, tree) {
	                if (node.initialized) {
	                    invoke('onChildrenInit', node, tree);
	                } else if (parentInitd(node, tree)) {
	                    init('onChildrenInit', node, tree);
	                }
	            },
	            unmount: function unmount(node, tree) {
	                invoke('kill', node, tree);
	            },
	            update: function update(node, prevProps, tree) {
	                invoke('update', node, prevProps, tree, methods);
	            }
	        },
	        transaction: {
	            close: function close(tree) {
	                if (transactionListeners.length > 0) {
	                    for (var i = 0; i < transactionListeners.length; i++) {
	                        var node = tree.nodes[transactionListeners[i]];
	                        if (node) {
	                            invoke('notifyTransaction', node, tree);
	                        }
	                    }
	                    transactionListeners = [];
	                }
	            }
	        }
	    };
	
	    return impl;
	};
	
	module.exports = create;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({
	    game: __webpack_require__(71),
	    state: __webpack_require__(72),
	    sprite: __webpack_require__(73),
	    group: __webpack_require__(102),
	    animation: __webpack_require__(104),
	    collides: __webpack_require__(105),
	    overlaps: __webpack_require__(107),
	    text: __webpack_require__(108),
	    button: __webpack_require__(110)
	}, __webpack_require__(114), __webpack_require__(122));

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';
	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
	
		return toStr.call(arr) === '[object Array]';
	};
	
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
	
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}
	
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	
	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}
	
		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
	
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);
	
						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	


/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';
	
	var updateGame = function updateGame(node, lastProps) {
	    if (lastProps && lastProps.stateName !== node.props.stateName) {
	        node.obj.state.start(node.props.stateName);
	    }
	},
	    onChildrenInit = function onChildrenInit(node, tree, nodeMethods) {
	    node._updateMethods = [];
	    node.addUpdateListener = function (listener) {
	        node._updateMethods.push(listener);
	    };
	    node.removeUpdateListener = function (listener) {
	        var index = node._updateMethods.indexOf(listener);
	        if (index >= 0) {
	            node._updateMethods.splice(index, 1);
	        }
	    };
	
	    var props = node.props,
	        gameImpl = {
	        preload: function preload() {
	            if (props.assets) {
	                Object.keys(props.assets).forEach(function (key) {
	                    var asset = props.assets[key];
	                    switch (asset.type) {
	                        case 'image':
	                            game.load.image(key, asset.src);
	                            break;
	                        case 'spritesheet':
	                            game.load.spritesheet(key, asset.src, asset.width, asset.height);
	                            break;
	                    }
	                });
	            }
	            nodeMethods.initChildren(node, tree, { include: ['assets'] });
	        },
	        create: function create() {
	
	            if (node.props.hasOwnProperty('physics')) {
	                node.obj.physics.startSystem(node.props.physics);
	            }
	
	            nodeMethods.initChildren(node, tree);
	
	            if (node.props.stateName) {
	                game.state.start(node.props.stateName);
	            }
	        },
	        update: function update() {
	            for (var i = 0; i < node._updateMethods.length; i++) {
	                node._updateMethods[i](context);
	            }
	        }
	    },
	        game = new Phaser.Game(props.width, props.height, props.mode || Phaser.AUTO, '', gameImpl),
	        context = {
	        game: game,
	        nodes: tree.byname
	    };
	
	    node.obj = game;
	    node.context = context;
	
	    updateGame(node, null, tree);
	};
	
	module.exports = {
	    init: null,
	    onChildrenInit: onChildrenInit,
	    update: updateGame,
	    kill: null,
	    deferredInit: true
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    onChildrenInit = function onChildrenInit(node, tree, treeMethods) {
	    node._updateMethods = [];
	    node.addUpdateListener = function (listener) {
	        node._updateMethods.push(listener);
	    };
	    node.removeUpdateListener = function (listener) {
	        var index = node._updateMethods.indexOf(listener);
	        if (index >= 0) {
	            node._updateMethods.splice(index, 1);
	        }
	    };
	
	    var props = node.props,
	        stateImpl = {
	        create: function create() {
	            if (node.props.hasOwnProperty('physics')) {
	                node.obj.physics.startSystem(node.props.physics);
	            }
	
	            treeMethods.clearChildren(node, tree);
	            treeMethods.initChildren(node, tree);
	        },
	        update: function update() {
	            for (var i = 0; i < node._updateMethods.length; i++) {
	                node._updateMethods[i](context);
	            }
	        }
	    },
	        game = treeUtils.game(tree),
	        state = game.state.add(props.name, stateImpl),
	        context = {
	        game: game,
	        state: state,
	        nodes: tree.byname
	    };
	
	    node.obj = state;
	    node.context = context;
	};
	
	module.exports = {
	    init: null,
	    onChildrenInit: onChildrenInit,
	    kill: null,
	    deferredInit: true
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    spritePropertes = __webpack_require__(75),
	    updateSprite = treeUtils.genPropertyMapUpdate(spritePropertes),
	    initSprite = function initSprite(node, tree) {
	    var props = node.props;
	    node.obj = new Phaser.Sprite(treeUtils.game(tree), props.x, props.y, props.assetKey);
	    treeUtils.addDisplayObject(node, tree);
	    updateSprite(node, null, tree);
	},
	    killSprite = function killSprite(node, tree) {
	    node.obj.kill();
	};
	
	module.exports = {
	    init: initSprite,
	    kill: killSprite,
	    update: updateSprite
	};

/***/ },
/* 74 */,
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(76), __webpack_require__(80), __webpack_require__(81), __webpack_require__(82), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(87), __webpack_require__(88), __webpack_require__(89), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(93), __webpack_require__(94), __webpack_require__(95), __webpack_require__(96), __webpack_require__(97), __webpack_require__(99), __webpack_require__(100), __webpack_require__(101));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(77));

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(78));

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(79);
	
	module.exports = utils.generatePointPropMap(['scale']);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var invariant = __webpack_require__(63),
	    generateBasicPropMap = function generateBasicPropMap(props) {
	    return props.reduce(function (acc, prop) {
	        acc[prop] = function (node, value) {
	            node.obj[prop] = value;
	        };
	        return acc;
	    }, {});
	},
	    generatePrefixedBasicPropMap = function generatePrefixedBasicPropMap(prefix, props) {
	    return props.reduce(function (acc, prop) {
	        acc[prefix + prop.charAt(0).toUpperCase() + prop.slice(1)] = function (node, value) {
	            node.obj[prefix][prop] = value;
	        };
	        return acc;
	    }, {});
	},
	    generatePointPropMap = function generatePointPropMap(props) {
	    return props.reduce(function (acc, prop) {
	        acc[prop] = function (node, value, prevValue, isNew) {
	            var point = node.obj[prop];
	            if (isNew || value.x !== prevValue.x) {
	                point.x = value.x;
	            }
	            if (isNew || value.y !== prevValue.y) {
	                point.y = value.y;
	            }
	        };
	        acc[prop + 'X'] = function (node, value) {
	            node.obj[prop].x = value;
	        };
	        acc[prop + 'Y'] = function (node, value) {
	            node.obj[prop].y = value;
	        };
	        return acc;
	    }, {});
	},
	    generatePrefixedPointPropMap = function generatePrefixedPointPropMap(prefix, props) {
	    return props.reduce(function (acc, prop) {
	        var prefixedProp = prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
	        acc[prefixedProp] = function (node, value, prevValue, isNew) {
	            var point = node.obj[prefix][prop];
	            if (isNew || value.x !== prevValue.x) {
	                point.x = value.x;
	            }
	            if (isNew || value.y !== prevValue.y) {
	                point.y = value.y;
	            }
	        };
	        acc[prefixedProp + 'X'] = function (node, value) {
	            node.obj[prefix][prop].x = value;
	        };
	        acc[prefixedProp + 'Y'] = function (node, value) {
	            node.obj[prefix][prop].y = value;
	        };
	        return acc;
	    }, {});
	},
	    generateAliasPropMap = function generateAliasPropMap(aliases) {
	    return Object.keys(aliases).reduce(function (acc, alias) {
	        var prop = aliases[alias];
	        acc[alias] = function (node, value) {
	            node.obj[prop] = value;
	        };
	        return acc;
	    }, {});
	},
	    generateMountOnlyPropMap = function generateMountOnlyPropMap(propMap) {
	    return Object.keys(propMap).reduce(function (acc, prop) {
	        var impl = propMap[prop];
	        acc[prop] = function (node, value, prevValue, isNew, deleted, tree) {
	            if (isNew) {
	                impl(node, value, tree);
	            }
	        };
	        return acc;
	    }, {});
	},
	    generateFixedPropMap = function generateFixedPropMap(props) {
	    return props.reduce(function (acc, prop) {
	        acc[prop] = function (node, value, prevValue, isNew) {
	            invariant(isNew, "Property '%s' of '%s' cannot change.", prop, node.tag);
	        };
	        return acc;
	    }, {});
	};
	
	module.exports = {
	    generateBasicPropMap: generateBasicPropMap,
	    generatePrefixedBasicPropMap: generatePrefixedBasicPropMap,
	    generatePointPropMap: generatePointPropMap,
	    generatePrefixedPointPropMap: generatePrefixedPointPropMap,
	    generateAliasPropMap: generateAliasPropMap,
	    generateMountOnlyPropMap: generateMountOnlyPropMap,
	    generateFixedPropMap: generateFixedPropMap
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(79);
	
	module.exports = utils.generateAliasPropMap({
	    assetKey: 'key'
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['angle']);

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['autocull']);
	/**
	 * <readonly>inCamera
	 */

/***/ },
/* 84 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['checkWorldBounds', 'outOfBoundsKill']);
	/**
	 * <readonly>inWorld
	 */

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['alive', 'lifespan']);

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['frame', 'frameName']);

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70),
	    utils = __webpack_require__(79);
	
	module.exports = extend({}, utils.generateBasicPropMap(['x', 'y']), __webpack_require__(98));

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70),
	    utils = __webpack_require__(79),
	    treeUtils = __webpack_require__(111);
	
	module.exports = extend({}, utils.generatePrefixedBasicPropMap('body', ['immovable', 'collideWorldBounds']), utils.generatePrefixedPointPropMap('body', ['bounce', 'gravity']), utils.generateMountOnlyPropMap({
	    bodyPhysics: function bodyPhysics(node, value, tree) {
	        var physics = treeUtils.physics(node, tree),
	            system = value !== true ? value : physics.system;
	
	        physics.enable(node.obj, system);
	    }
	}));

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['smoothed']);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    groupPropertes = __webpack_require__(103),
	    updateGroup = treeUtils.genPropertyMapUpdate(groupPropertes),
	    initGroup = function initGroup(node, tree) {
	    node.obj = new Phaser.Group(treeUtils.game(tree));
	    treeUtils.addDisplayObject(node, tree);
	    updateGroup(node, null, tree);
	},
	    killGroup = function killGroup(node) {
	    node.obj.kill();
	};;
	
	module.exports = {
	    init: initGroup,
	    kill: killGroup,
	    update: updateGroup
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70),
	    generateBasicPropMap = __webpack_require__(79).generateBasicPropMap;
	
	module.exports = extend({}, __webpack_require__(77), generateBasicPropMap(['enableBody']));

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    initAnimation = function initAnimation(node, tree) {
	    var parentNode = treeUtils.parent(node, tree);
	    node.obj = parentNode.obj.animations.add(node.props.id, node.props.frames, node.props.fps, node.props.loop);
	};
	
	module.exports = {
	    init: initAnimation,
	    kill: null,
	    update: null
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    systemName = __webpack_require__(106),
	    initCollides = function initCollides(node, tree) {
	    var a = tree.nodes[node.parent],
	        b = tree.byname[node.props.with],
	        name = systemName(node.props.system),
	        stateNode = treeUtils.stateNode(node, tree);
	
	    node.obj = {
	        a: a,
	        b: b,
	        onUpdate: function onUpdate(context) {
	            context.game.physics[name].collide(a.obj, b.obj);
	        }
	    };
	
	    stateNode.addUpdateListener(node.obj.onUpdate);
	},
	    killCollides = function killCollides(node, tree) {
	    var stateNode = treeUtils.stateNode(node, tree);
	    stateNode.removeUpdateListener(node.obj.onUpdate);
	};
	
	module.exports = {
	    init: initCollides,
	    kill: killCollides,
	    update: null
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';
	
	var names = {};
	
	names[Phaser.Physics.ARCADE] = 'arcade';
	names[Phaser.Physics.BOX2D] = 'box2d';
	names[Phaser.Physics.CHIPMUNK] = 'chipmunk';
	names[Phaser.Physics.MATTERJS] = 'matter';
	names[Phaser.Physics.NINJA] = 'ninja';
	names[Phaser.Physics.P2JS] = 'p2';
	
	module.exports = function (system) {
	    return names[system] || 'arcade';
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    systemName = __webpack_require__(106),
	    initOverlaps = function initOverlaps(node, tree) {
	    var a = tree.nodes[node.parent],
	        b = tree.byname[node.props.with],
	        name = systemName(node.props.system),
	        stateNode = treeUtils.stateNode(node, tree),
	        onOverlap = node.props.onOverlap;
	
	    node.obj = {
	        a: a,
	        b: b,
	        onUpdate: function onUpdate(context) {
	            context.game.physics[name].overlap(a.obj, b.obj, function (overlappingA, overlappingB) {
	                onOverlap(tree.nodes[overlappingA.rnodeid], tree.nodes[overlappingB.rnodeid], context, a, b);
	            });
	        }
	    };
	
	    stateNode.addUpdateListener(node.obj.onUpdate);
	},
	    killOverlaps = function killOverlaps(nodes, node) {
	    nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
	};
	
	module.exports = {
	    init: initOverlaps,
	    kill: killOverlaps,
	    update: null
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    textPropertes = __webpack_require__(109),
	    updateText = treeUtils.genPropertyMapUpdate(textPropertes),
	    initText = function initText(node, tree) {
	    var props = node.props,
	        text = new Phaser.Text(treeUtils.game(tree), 0, 0, props.text, props.style),
	        container = treeUtils.parent(node, tree).obj,
	        x = props.x || props.align && (container.width - text.width) * (props.align.indexOf('right') >= 0 ? 1 : props.align.indexOf('center') >= 0 ? .5 : 0) || 0,
	        y = props.y || props.align && (container.height - text.height) * (props.align.indexOf('bottom') >= 0 ? 1 : props.align.indexOf('middle') >= 0 ? .5 : 0) || 0;
	
	    text.x = x;
	    text.y = y;
	    node.obj = text;
	    treeUtils.addDisplayObject(node, tree);
	},
	    killText = function killText(nodes, node) {
	    node.obj.kill();
	};
	
	module.exports = {
	    init: initText,
	    kill: killText,
	    update: updateText
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70),
	    utils = __webpack_require__(79);
	
	module.exports = extend({}, __webpack_require__(75), utils.generateBasicPropMap(['text']));

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    buttonPropertes = __webpack_require__(112),
	    updateButton = treeUtils.genPropertyMapUpdate(buttonPropertes),
	    initButton = function initButton(node, tree) {
	    var props = node.props,
	        key = props.assetKey,
	        game = treeUtils.game(tree);
	
	    node.button = new Phaser.Button(game, props.x, props.y, key, props.onClick, node, props.frames[0], props.frames[1], props.frames[2], props.frames[3]);
	
	    if (node.props.children) {
	        node.obj = new Phaser.Group(game);
	        node.obj.add(node.button);
	    } else {
	        node.obj = node.button;
	    }
	
	    treeUtils.addDisplayObject(node, tree);
	    updateButton(node, null, tree);
	},
	    killButton = function killButton(nodes, node) {
	    node.obj.kill();
	};
	
	module.exports = {
	    init: initButton,
	    kill: killButton,
	    update: updateButton
	};

/***/ },
/* 111 */
/***/ function(module, exports) {

	'use strict';
	
	var propsChanged = function propsChanged(nextProps, lastProps) {
	    if (!lastProps) {
	        return true;
	    }
	
	    var npl = Object.keys(nextProps),
	        lpl = Object.keys(lastProps);
	
	    if (npl.length !== lpl.length) {
	        return true;
	    }
	
	    for (var i = 0; i < npl.length; i++) {
	        var prop = npl[i];
	        if (nextProps[prop] !== lastProps[prop]) {
	            return true;
	        }
	    }
	
	    return false;
	},
	    genPropertyMapUpdate = function genPropertyMapUpdate(props) {
	    return function (node, prevProps, tree) {
	        if (prevProps) {
	            Object.keys(prevProps).forEach(function (prop) {
	                if (props[prop] && typeof node.props[prop] === 'undefined') {
	                    props[prop](node, node.props[prop], prevProps[prop], false, true, tree);
	                }
	            });
	        }
	        Object.keys(node.props).forEach(function (prop) {
	            if (props[prop] && (!prevProps || node.props[prop] !== prevProps[prop])) {
	                props[prop](node, node.props[prop], prevProps && prevProps[prop], !prevProps, false, tree);
	            }
	        });
	    };
	},
	    game = function game(tree) {
	    return tree.root && tree.root.obj;
	},
	    parent = function parent(node, tree, type) {
	    while (true) {
	        node = tree.nodes[node.parent];
	        if (!node || !type || type === node.tag) {
	            return node;
	        }
	    }
	},
	    stateNode = function stateNode(node, tree) {
	    while (true) {
	        node = tree.nodes[node.parent];
	        if (!node || node.tag === 'game' || node.tag === 'state') {
	            return node;
	        }
	    }
	},
	    addDisplayObject = function addDisplayObject(node, tree, obj) {
	    var parent = tree.nodes[node.parent],
	        group = parent.obj.world || parent.obj;
	
	    group.add(obj || node.obj);
	},
	    physics = function physics(node, tree) {
	    var physicsNode = stateNode(node, tree);
	    return physicsNode && physicsNode.obj.physics;
	};
	
	module.exports = {
	    propsChanged: propsChanged,
	    genPropertyMapUpdate: genPropertyMapUpdate,
	    game: game,
	    parent: parent,
	    addDisplayObject: addDisplayObject,
	    stateNode: stateNode,
	    physics: physics
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(113));

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(76), __webpack_require__(80), __webpack_require__(81), __webpack_require__(82), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(87), __webpack_require__(88), __webpack_require__(89), __webpack_require__(92), __webpack_require__(94), __webpack_require__(95), __webpack_require__(96), __webpack_require__(99), __webpack_require__(101));

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({
	    graphics: __webpack_require__(115),
	    rendertexture: __webpack_require__(120),
	    renderimage: __webpack_require__(121)
	}, __webpack_require__(118));

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    graphicsPropertes = __webpack_require__(116),
	    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(118),
	    initGraphics = function initGraphics(node, tree) {
	    var props = node.props;
	    node.obj = new Phaser.Graphics(treeUtils.game(tree), props.x, props.y);
	    treeUtils.addDisplayObject(node, tree);
	    updateGraphics(node, tree);
	},
	    killGraphics = function killGraphics(node) {
	    node.obj.kill();
	},
	    onChildrenInit = function onChildrenInit(node, tree, treeMethods) {
	    treeMethods.cancelTransactionNofitication(node.id);
	    draw(node, tree);
	},
	    redraw = function redraw(node, tree) {
	    node.obj.clear();
	    draw(node, tree);
	},
	    draw = function draw(node, tree) {
	    for (var i = 0; i < node.children.length; i++) {
	        var child = tree.nodes[node.children[i]];
	        if (itemTypes[child.tag]) {
	            itemTypes[child.tag].draw(child, tree, node.obj, 0, 0);
	        }
	    }
	};
	
	module.exports = {
	    init: initGraphics,
	    onChildrenInit: onChildrenInit,
	    kill: killGraphics,
	    update: updateGraphics,
	    notifyTransaction: redraw
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(117), __webpack_require__(80), __webpack_require__(81), __webpack_require__(83), __webpack_require__(84), __webpack_require__(88), __webpack_require__(89), __webpack_require__(92), __webpack_require__(93), __webpack_require__(94), __webpack_require__(97), __webpack_require__(99));

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(77));

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createGraphicsNode = __webpack_require__(119),
	    renderers = {
	    circle: function circle(node, tree, graphics, x0, y0) {
	        graphics.drawCircle(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.diameter || 0);
	    },
	    rect: function rect(node, tree, graphics, x0, y0) {
	        graphics.drawRect(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.width || 0, node.props.height || 0);
	    },
	    line: function line(node, tree, graphics, x0, y0) {
	        graphics.moveTo(x0 + (node.props.x1 || 0), y0 + (node.props.y1 || 0));
	        graphics.lineTo(x0 + (node.props.x2 || 0), y0 + (node.props.y2 || 0));
	    },
	    lineto: function lineto(node, tree, graphics, x0, y0) {
	        graphics.lineTo(x0 + (node.props.x || 0), y0 + (node.props.y || 0));
	    },
	    curveto: function curveto(node, tree, graphics, x0, y0) {
	        graphics.quadraticCurveTo(node.props.cpx + x0, node.props.cpy + y0, node.props.x + x0, node.props.y + y0);
	    },
	    shape: function shape(node, tree, graphics, x0, y0) {
	        var sx0 = x0 + (node.props.x || 0),
	            sy0 = y0 + (node.props.y || 0);
	
	        if (node.props.s) {
	            var parts = node.props.s.replace(/\s/g, '').match(/([a-z][0-9,]+)/g);
	            for (var i = 0; i < parts.length; i++) {
	                var part = parts[i],
	                    command = part.charAt(0),
	                    v = part.match(/[0-9]+/g).map(function (v) {
	                    return parseFloat(v);
	                });
	
	                switch (command) {
	                    case 'l':
	                        graphics.lineTo(v[0] + sx0, v[1] + sy0);
	                        break;
	                    case 'c':
	                        graphics.drawCircle(v[0] + sx0, v[1] + sy0, v[2]);
	                        break;
	                    case 'r':
	                        graphics.drawRect(v[0] + sx0, v[1] + sy0, v[2], v[3]);
	                        break;
	                    case 'm':
	                        graphics.moveTo(v[0] + sx0, v[1] + sy0);
	                        break;
	                    case 'q':
	                        graphics.quadraticCurveTo(v[0], v[1], v[2] + sx0, v[3] + sy0);
	                        break;
	                }
	            }
	        }
	
	        for (i = 0; i < node.children.length; i++) {
	            var child = tree.nodes[node.children[i]];
	            if (renderers[child.tag]) {
	                renderers[child.tag](child, tree, graphics, sx0, sy0);
	            }
	        }
	    }
	};
	
	module.exports = Object.keys(renderers).reduce(function (acc, type) {
	    acc[type] = createGraphicsNode(renderers[type]);
	    return acc;
	}, {});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    create = function create(draw) {
	
	    var requestNotification = function requestNotification(node, tree, treeMethods) {
	        var graphics = treeUtils.parent(node, tree, 'graphics');
	        if (graphics) {
	            treeMethods.requestTransactionNofitication(graphics.id);
	        }
	    },
	        update = function update(node, prevProps, tree, treeMethods) {
	        if (treeUtils.propsChanged(node.props, prevProps)) {
	            requestNotification(node, tree, treeMethods);
	        }
	    },
	        drawWrapper = function drawWrapper(node, tree, graphics, x0, y0) {
	        var fill = typeof node.props.fill !== 'undefined',
	            line = typeof node.props.stroke !== 'undefined' || typeof node.props.strokeWidth !== 'undefined' || typeof node.props.strokeAlpha !== 'undefined';
	
	        if (fill) {
	            var fillColor = typeof node.props.fill !== 'undefined' ? node.props.fill : 0x000000,
	                fillAlpha = typeof node.props.fillAlpha === 'number' ? node.props.fillAlpha : 1;
	            graphics.beginFill(fillColor, fillAlpha);
	        }
	        if (line) {
	            var lineColor = typeof node.props.stroke !== 'undefined' ? node.props.stroke : 0x000000,
	                lineAlpha = typeof node.props.strokeAlpha === 'number' ? node.props.strokeAlpha : 1,
	                lineWidth = typeof node.props.strokeWidth === 'number' ? node.props.strokeWidth : 1;
	            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
	        } else {
	            graphics.lineStyle(0);
	        }
	
	        draw(node, tree, graphics, x0, y0);
	
	        if (fill) {
	            graphics.endFill();
	        }
	    };
	
	    return {
	        init: requestNotification,
	        kill: requestNotification,
	        update: update,
	        draw: drawWrapper
	    };
	};
	
	module.exports = create;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    graphicsPropertes = __webpack_require__(116),
	    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(118),
	    initGraphics = function initGraphics(node, tree) {
	    node.obj = new Phaser.Graphics(treeUtils.game(tree), 0, 0);
	    updateGraphics(node, null, tree);
	},
	    killGraphics = function killGraphics(node) {
	    node.obj.kill();
	},
	    onChildrenInit = function onChildrenInit(node, tree) {
	    draw(node, tree);
	
	    var game = treeUtils.game(tree),
	        texture = new Phaser.RenderTexture(game, node.obj.width, node.obj.height);
	
	    texture.renderXY(node.obj, 0, 0);
	    texture.destroy();
	    node.obj.destroy();
	
	    game.cache.addRenderTexture(node.props.assetKey, texture);
	},
	    draw = function draw(node, tree) {
	    for (var i = 0; i < node.children.length; i++) {
	        var child = tree.nodes[node.children[i]];
	        if (itemTypes[child.tag]) {
	            itemTypes[child.tag].draw(child, tree, node.obj, 0, 0);
	        }
	    }
	};
	
	module.exports = {
	    init: initGraphics,
	    onChildrenInit: onChildrenInit,
	    kill: killGraphics,
	    update: updateGraphics
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    graphicsPropertes = __webpack_require__(116),
	    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(118),
	    initGraphics = function initGraphics(node, tree) {
	    node.obj = new Phaser.Graphics(treeUtils.game(tree), 0, 0);
	    updateGraphics(node, null, tree);
	},
	    killGraphics = function killGraphics(node) {
	    node.obj.kill();
	},
	    onChildrenInit = function onChildrenInit(node, tree) {
	    draw(node, tree);
	
	    var game = treeUtils.game(tree),
	        texture = new Phaser.RenderTexture(game, node.obj.width, node.obj.height);
	
	    texture.renderXY(node.obj, 0, 0);
	
	    var url = texture.getBase64();
	
	    texture.destroy();
	    node.obj.destroy();
	
	    if (node.props.frameWidth || node.props.frameHeight) {
	        var w = node.props.frameWidth || texture.width,
	            h = node.props.frameHeight || texture.height;
	
	        node.obj = game.load.spritesheet(node.props.assetKey, url, w, h);
	    } else {
	        node.obj = game.load.image(node.props.assetKey, url);
	    }
	},
	    draw = function draw(node, tree) {
	    for (var i = 0; i < node.children.length; i++) {
	        var child = tree.nodes[node.children[i]];
	        if (itemTypes[child.tag]) {
	            itemTypes[child.tag].draw(child, tree, node.obj, 0, 0);
	        }
	    }
	};
	
	module.exports = {
	    init: initGraphics,
	    onChildrenInit: onChildrenInit,
	    kill: killGraphics,
	    update: updateGraphics
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    input: __webpack_require__(123),
	    key: __webpack_require__(124)
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    defaultPointerNumber = 2,
	    events = ["onDown", "onUp", "onTap", "onHold"],
	    clearInput = function clearInput(node, tree) {
	    var context = treeUtils.stateNode(node, tree).context;
	    delete context.input;
	},
	    initInput = function initInput(node, tree) {
	    var stateNode = treeUtils.stateNode(node, tree);
	    if (!stateNode.context.input) {
	        var phaserInput = stateNode.obj.input,
	            pointerCount = node.props.pointers || defaultPointerNumber,
	            input = {
	            mousePointer: phaserInput.mousePointer,
	            activePointer: phaserInput.activePointer,
	            pointers: []
	        };
	
	        node.obj = {
	            input: input
	        };
	
	        stateNode.context.input = input;
	
	        for (var i = 0; i < pointerCount; i++) {
	            if (i >= defaultPointerNumber) {
	                phaserInput.addPointer();
	            }
	            input.pointers[i] = phaserInput['pointer' + (i + 1)];
	        }
	
	        events.forEach(function (event) {
	            var listener = node.props[event];
	            if (listener) {
	                phaserInput[event].add(function (pointer) {
	                    listener(pointer, context);
	                });
	            }
	        });
	
	        if (node.props.cursors) {
	            input.cursors = phaserInput.keyboard.createCursorKeys();
	        }
	
	        if (node.props.keys) {
	            input.keys = Object.keys(node.props.keys).reduce(function (acc, key) {
	                acc[key] = phaserInput.keyboard.addKey(node.props.keys[key]);
	            }, {});
	        }
	
	        if (node.props.onInput) {
	            stateNode.addUpdateListener(node.props.onInput);
	        }
	    }
	};
	
	module.exports = {
	    init: initInput,
	    clear: clearInput,
	    kill: null,
	    update: null
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(111),
	    keyPropertes = __webpack_require__(125),
	    updateKey = treeUtils.genPropertyMapUpdate(keyPropertes),
	    events = ["onDown", "onUp", "onHoldCallback"],
	    initKey = function initKey(node, tree) {
	    var stateNode = treeUtils.stateNode(node, tree);
	    if (stateNode.context.input && node.props.keyName && node.props.keyCode) {
	        var phaserInput = stateNode.obj.input,
	            input = stateNode.context.input,
	            key = phaserInput.keyboard.addKey(node.props.keyCode);
	
	        if (!input.keys) {
	            input.keys = {};
	        }
	
	        node.obj = key;
	        input.keys[node.props.keyName] = node.obj;
	
	        events.forEach(function (event) {
	            var listener = node.props[event];
	            if (listener) {
	                key[event].add(function (key) {
	                    listener(key, stateNode.context);
	                });
	            }
	        });
	    }
	},
	    killKey = function killKey(node, tree) {
	    if (node.obj) {
	        var stateNode = treeUtils.stateNode(node, tree);
	
	        stateNode.obj.keyboard.removeKey(node.obj.keyCode);
	        delete stateNode.context.input[node.props.keyName];
	    }
	};
	
	module.exports = {
	    init: initKey,
	    kill: killKey,
	    update: updateKey
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(79);
	
	module.exports = utils.generateFixedPropMap(['keyName', 'keyCode']);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzljMWUyZGJlMTcwNmU5M2IzOTc/NzZhYyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4YW1wbGVzL2dyYXBoaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy9uYXRpdmUuanM/N2I0NSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvbmF0aXZlLmpzPzQyZTEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0LmpzPzI0ZWYqIiwid2VicGFjazovLy8uL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanM/NDk0YyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qcz80ZjA1KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcz9jMjlhKiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2ludmFyaWFudC5qcz80NTk5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQuanM/YWIyZioiLCJ3ZWJwYWNrOi8vLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzPzI5MjcqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzPzYxZGIqIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvd2FybmluZy5qcz84YTU2KiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanM/MmEzYioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanM/ZTlhMCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qcz81NmRlKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzPzE1MDcqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzPzcwMmEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzP2FkMGIqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uLmpzPzAyNGUqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RGVidWdUb29sLmpzP2FkMmUqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wuanM/YjIxMioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcz80MmU0KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENsYXNzLmpzPzBkNzQqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanM/YmMxNioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlNaXJyb3IuanM/MTg2NCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMuanM/N2RkOSoiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlPZi5qcz8zYWQyKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcz81YTkyKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRWYWxpZGF0b3IuanM/YTU5OSoiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9tYXBPYmplY3QuanM/ZWZiMyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanM/M2M4MyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RWZXJzaW9uLmpzP2MwODMqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL29ubHlDaGlsZC5qcz8yN2UzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nLmpzPzFiYTQqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UGVyZi5qcz9lZjkzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nTW91bnQuanM/OWZiNioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZS5qcz9mZDJjKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEluc3RhbmNlTWFwLmpzP2E4M2UqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlcy5qcz9jZTA5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlLmpzP2JlYTgqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RmVhdHVyZUZsYWdzLmpzPzc5YWIqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UmVjb25jaWxlci5qcz82YmZhKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFJlZi5qcz83MzMzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE93bmVyLmpzPzQwZTAqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1RyYW5zYWN0aW9uLmpzPzZkZmYqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanM/NzVkYSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb3NpdGVDb21wb25lbnQuanM/Y2Q1OSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5qcz8xYTQwKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVycm9yVXRpbHMuanM/NmIzMSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROb2RlVHlwZXMuanM/MjU4MCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuanM/YzBlMSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbXB0eUNvbXBvbmVudC5qcz9iN2I5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE5hdGl2ZUNvbXBvbmVudC5qcz9jZjViKiIsIndlYnBhY2s6Ly8vLi9+L3dhcm5pbmcvYnJvd3Nlci5qcz8yNmQzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mby5qcz9mNzY5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nSW5qZWN0aW9uLmpzP2IwNjEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuanM/ZWY3MCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLmpzP2UyMDkqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnQuanM/NWJlNCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkLmpzP2M4N2QqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLmpzP2Q0YTAqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRSZWNvbmNpbGVyLmpzP2ZmNDYqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ZsYXR0ZW5DaGlsZHJlbi5qcz8wZDA2KiIsIndlYnBhY2s6Ly8vLi9+L2ludmFyaWFudC9icm93c2VyLmpzPzk1MjAqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5qcz9kNDA2KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQuanM/NWQ3NSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BoYXNlci1pbXBsZW1lbnRhdGlvbi5qcz9iZDMxKiIsIndlYnBhY2s6Ly8vLi9zcmMvbm9kZS1tYW5hZ2VtZW50L25vZGUtdHJlZS1hZGFwdGVyLmpzPzE5M2MqIiwid2VicGFjazovLy8uL3NyYy9ub2RlLW1hbmFnZW1lbnQvbm9kZS1pbml0LWFkYXB0ZXIuanM/MDdiZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanM/NzVhZSoiLCJ3ZWJwYWNrOi8vLy4vfi9leHRlbmQvaW5kZXguanM/MzZjOCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ2FtZS5qcz9kNzdiKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9zdGF0ZS5qcz8xY2M3KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9zcHJpdGUuanM/OWQ4MioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5TcHJpdGUuanM/NTJlNyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuU3ByaXRlLmpzPzZlYWQqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIuanM/NDU3MSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdC5qcz8xOWZmKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL3V0aWxzLmpzP2U2ZjkqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkNvcmUuanM/ZTI5YyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5nbGUuanM/MTNkNSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uLmpzPzE1YmEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsLmpzP2NmMGQqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcy5qcz85ZWViKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wLmpzP2NmZmMqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkNyb3AuanM/MmQwNSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVsdGEuanM/ZmJhOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVzdHJveS5qcz81ZDVjKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhLmpzPzRkOTIqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aC5qcz9jNDVlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYS5qcz8wNzFlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQuanM/NWZjNioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZC5qcz83M2RlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5MaWZlU3Bhbi5qcz82MjI1KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZS5qcz81MDgxKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwLmpzP2JhZDYqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5LmpzPzA0MTAqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvY3VzdG9tL2JvZHkuanM/ODFmZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUmVzZXQuanM/ZTllNCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXguanM/Yjg2YioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU21vb3RoZWQuanM/ZTI0ZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JvdXAuanM/MzUzNioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cC5qcz9hMjUzKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9hbmltYXRpb24uanM/NzUyOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvY29sbGlkZXMuanM/ZmE2MioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcGh5c2ljLXN5c3RlbS1uYW1lLmpzPzI1YTIqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL292ZXJsYXBzLmpzP2ZkODEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL3RleHQuanM/ZTdlYSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0LmpzP2M3MDEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qcz9iOGViKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90cmVlLXV0aWxzLmpzPzVjZGUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQnV0dG9uLmpzP2U0ZjYqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuSW1hZ2UuanM/Mjk0ZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvaW5kZXguanM/ZmMxMSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvZ3JhcGhpY3MuanM/MGI1YSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5HcmFwaGljcy5qcz9jYmQ2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5HcmFwaGljcy5qcz8yNjk3KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJlcnMuanM/OTEzOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvY3JlYXRlLWdyYXBoaWNzLWl0ZW0uanM/NGE0NSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVydGV4dHVyZS5qcz81ZGZlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJpbWFnZS5qcz83NDY5KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9pbmRleC5qcz8xZDNkKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9pbnB1dC5qcz9iNDRkKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9rZXkuanM/NTg0OSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9jdXN0b20va2V5LmpzP2VkZmIqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBSSxRQUFRLG9CQUFRLENBQVIsQ0FBUjtLQUVBLFNBQVM7QUFDTCxZQUFPLEVBQUMsTUFBTSxPQUFOLEVBQWUsS0FBSyxtQkFBTCxFQUF2QjtBQUNBLGVBQVUsRUFBQyxNQUFNLE9BQU4sRUFBZSxLQUFLLHdCQUFMLEVBQTFCO0FBQ0EsYUFBUSxFQUFDLE1BQU0sT0FBTixFQUFlLEtBQUssb0JBQUwsRUFBeEI7QUFDQSxhQUFRLEVBQUMsTUFBTSxhQUFOLEVBQXFCLEtBQUssb0JBQUwsRUFBMkIsT0FBTyxFQUFQLEVBQVcsUUFBUSxFQUFSLEVBQXBFO0FBQ0EsZUFBVSxFQUFDLE1BQU0sYUFBTixFQUFxQixLQUFLLG1DQUFMLEVBQTBDLE9BQU8sR0FBUCxFQUFZLFFBQVEsRUFBUixFQUF0RjtFQUxKO0tBUUEsYUFBYTtBQUNULGVBQVUsTUFBVjtBQUNBLFdBQU0sTUFBTjtFQUZKO0tBS0EsU0FBUyxNQUFNLFdBQU4sQ0FBa0I7OztBQUN2QixzQkFBaUIsMkJBQVk7QUFDekIsZ0JBQU87QUFDSCxvQkFBTyxNQUFNLEtBQU4sQ0FBWSxJQUFaLEVBQWtCLEVBQUMsUUFBUSxFQUFSLEVBQW5CLEVBQWdDLEdBQWhDLENBQW9DLFVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0I7QUFDdkQsd0JBQU8sQ0FBQyxDQUFELEVBQUksTUFBTSxLQUFLLE1BQUwsS0FBZ0IsR0FBaEIs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QTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdCOzs7Ozs7O0FDckVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFVBQVU7QUFDckIsWUFBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsR0FBRztBQUNkLFlBQVcsaUJBQWlCO0FBQzVCLFlBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUVBLDhCOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBd0IsZUFBZTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCOzs7Ozs7O0FDbHRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQseUM7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLHNCQUFzQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2QsZUFBYztBQUNkO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Qzs7Ozs7OztBQ3ZCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Qjs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBLG9CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FB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QTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLGVBQWU7QUFDMUIsWUFBVyxlQUFlO0FBQzFCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTBEO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQzs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtB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Q0FBM0IsQ0FBakIsQyIsImZpbGUiOiJncmFwaGljcy9ncmFwaGljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzljMWUyZGJlMTcwNmU5M2IzOTdcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCcuLi9uYXRpdmUnKSxcclxuXHJcbiAgICBhc3NldHMgPSB7XHJcbiAgICAgICAgJ3NreSc6IHt0eXBlOiAnaW1hZ2UnLCBzcmM6ICcuLi9hc3NldHMvc2t5LnBuZyd9LFxyXG4gICAgICAgICdncm91bmQnOiB7dHlwZTogJ2ltYWdlJywgc3JjOiAnLi4vYXNzZXRzL3BsYXRmb3JtLnBuZyd9LFxyXG4gICAgICAgICdzdGFyJzoge3R5cGU6ICdpbWFnZScsIHNyYzogJy4uL2Fzc2V0cy9zdGFyLnBuZyd9LFxyXG4gICAgICAgICdkdWRlJzoge3R5cGU6ICdzcHJpdGVzaGVldCcsIHNyYzogJy4uL2Fzc2V0cy9kdWRlLnBuZycsIHdpZHRoOiAzMiwgaGVpZ2h0OiA0OH0sXHJcbiAgICAgICAgJ2J1dHRvbic6IHt0eXBlOiAnc3ByaXRlc2hlZXQnLCBzcmM6ICcuLi9hc3NldHMvYnV0dG9uX3Nwcml0ZV9zaGVldC5wbmcnLCB3aWR0aDogMTkzLCBoZWlnaHQ6IDcxfVxyXG4gICAgfSxcclxuXHJcbiAgICBzY29yZVN0eWxlID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICB9LFxyXG5cclxuICAgIE15R2FtZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzOiBBcnJheS5hcHBseShudWxsLCB7bGVuZ3RoOiAxMn0pLm1hcChmdW5jdGlvbiAoXywgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbaSwgMC43ICsgTWF0aC5yYW5kb20oKSAqIDAuMl07XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25JbnB1dDogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IGNvbnRleHQubm9kZXMucGxheWVyLm9iaixcclxuICAgICAgICAgICAgICAgIGN1cnNvcnMgPSBjb250ZXh0LmlucHV0LmN1cnNvcnM7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3Vyc29ycy5sZWZ0LmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdsZWZ0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAxNTA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZnJhbWUgPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24gJiYgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC0zNTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsZWN0U3RhcjogZnVuY3Rpb24gKHBsYXllck5vZGUsIHN0YXJOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc3RhcnM6IHRoaXMuc3RhdGUuc3RhcnMuZmlsdGVyKGZ1bmN0aW9uIChfLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgIT09IHN0YXJOb2RlLnByb3BzLmk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLnN0YXRlLnNjb3JlICsgMTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFycyA9IHRoaXMuc3RhdGUuc3RhcnMubWFwKGZ1bmN0aW9uIChzdGFyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHNwcml0ZSBrZXk9e3N0YXJbMF19IGk9e2l9IHg9e3N0YXJbMF0gKiA3MH0geT17MH0gYXNzZXRLZXk9XCJzdGFyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlHcmF2aXR5WT17MTh9IGJvZHlCb3VuY2VZPXtzdGFyWzFdfS8+XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Z2FtZSBhc3NldHM9e2Fzc2V0c30gd2lkdGg9ezgwMH0gaGVpZ2h0PXs2MDB9IHBoeXNpY3M9e1BoYXNlci5QaHlzaWNzLkFSQ0FERX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwcml0ZSBhc3NldEtleT1cInNreVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgbmFtZT1cInBsYXRmb3Jtc1wiIGVuYWJsZUJvZHk9e3RydWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJncm91bmRcIiBhc3NldEtleT1cImdyb3VuZFwiIHk9ezYwMCAtIDY0fSBzY2FsZT17e3g6MiwgeToyfX0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJsZWRnZTFcIiBhc3NldEtleT1cImdyb3VuZFwiIHg9ezQwMH0geT17NDAwfSBib2R5SW1tb3ZhYmxlPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcHJpdGUgbmFtZT1cImxlZGdlMlwiIGFzc2V0S2V5PVwiZ3JvdW5kXCIgeD17LTE1MH0geT17MjUwfSBib2R5SW1tb3ZhYmxlPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgbmFtZT1cInN0YXJzXCIgZW5hYmxlQm9keT17dHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb2xsaWRlcyB3aXRoPVwicGxhdGZvcm1zXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJwbGF5ZXJcIiB4PXszMn0geT17NDUwfSBhc3NldEtleT1cImR1ZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keVBoeXNpY3M9e3RydWV9IGJvZHlCb3VuY2VZPXswLjJ9IGJvZHlHcmF2aXR5WT17MzAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUNvbGxpZGVXb3JsZEJvdW5kcz17dHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhbmltYXRpb24gaWQ9XCJsZWZ0XCIgZnJhbWVzPXtbMCwgMSwgMiwgM119IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGlvbiBpZD1cInJpZ2h0XCIgZnJhbWVzPXtbNSwgNiwgNywgOF19IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGNvbGxpZGVzIHdpdGg9XCJwbGF0Zm9ybXNcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvdmVybGFwcyB3aXRoPVwic3RhcnNcIiBvbk92ZXJsYXA9e3RoaXMuY29sbGVjdFN0YXJ9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L3Nwcml0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dCB0ZXh0PXtgU2NvcmU6ICR7dGhpcy5zdGF0ZS5zY29yZX1gfSBzdHlsZT17c2NvcmVTdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB4PXsxNn0geT17MTZ9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHg9ezB9IHk9ezB9IGFzc2V0S2V5PVwiYnV0dG9uXCIgZnJhbWVzPXtbMiwgMSwgMF19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCB0ZXh0PVwiaGkhXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxncmFwaGljcyB4PXsyMH0geT17MTB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2hhcGUgZmlsbD17MHhGRjMzMDB9IHN0cm9rZVdpZHRoPXsxMH0gc3Ryb2tlPXsweGZmZDkwMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT17NTB9IHkxPXs1MH0geDI9ezI1MH0geTI9ezUwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezEwMH0geT17MTAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezI1MH0geT17MjIwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezUwfSB5PXsyMjB9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5ldG8geD17NTB9IHk9ezUwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2hhcGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzaGFwZSB4PXs0MH0geT17ODB9IGZpbGw9ezB4RkYzMzAwfSBzdHJva2VXaWR0aD17MTB9IHN0cm9rZT17MHhmZmQ5MDB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzPVwibTUwLDUwIGwyNTAsNTAgbDEwMCwxMDAgbDI1MCwyMDAgbDUwLCAyMjAgbDUwLDUwXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2hhcGUgZmlsbD17MHhGRjcwMEJ9IHN0cm9rZVdpZHRoPXsxMH0gc3Ryb2tlPXsweEZGMDAwMH0gc3Ryb2tlQWxwaGE9ezAuOH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT17MjEwfSB5MT17MzAwfSB4Mj17NDUwfSB5Mj17MzIwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezU3MH0geT17MzUwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y3VydmV0byBjcHg9ezYwMH0gY3B5PXswfSB4PXs0ODB9IHk9ezEwMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmV0byB4PXszMzB9IHk9ezEyMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmV0byB4PXs0MTB9IHk9ezIwMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmV0byB4PXsyMTB9IHk9ezMwMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NoYXBlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBzdHJva2VXaWR0aD17Mn0gc3Ryb2tlPXsweDAwMDBGRn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17NTB9IHk9ezI1MH0gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBmaWxsPXsweEZGRkYwQn0gZmlsbEFscGhhPXswLjV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17NDcwfSB5PXsyMDB9IGRpYW1ldGVyPXsyMDB9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lIHN0cm9rZVdpZHRoPXsyMH0gc3Ryb2tlPXsweDMzRkYwMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE9ezMwfSB5MT17MzB9IHgyPXs2MDB9IHkyPXs2MDB9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncmFwaGljcz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY3Vyc29ycz17dHJ1ZX0gb25JbnB1dD17dGhpcy5vbklucHV0fS8+XHJcbiAgICAgICAgICAgICAgICA8L2dhbWU+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuUmVhY3QucmVuZGVyKDxNeUdhbWUvPiwgJ2dhbWUnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leGFtcGxlcy9ncmFwaGljcy5qc1xuICoqLyIsIlxyXG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZyA9IHJlcXVpcmUoJ3JlYWN0LWFueXRoaW5nL3NyYy9uYXRpdmUnKTtcclxudmFyIHBoYXNlckltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9waGFzZXItaW1wbGVtZW50YXRpb24nKTtcclxuXHJcbnZhciBSZWFjdFBoYXNlciA9IGNyZWF0ZVJlYWN0QW55dGhpbmcocGhhc2VySW1wbGVtZW50YXRpb24pO1xyXG52YXIgUmVhY3QgPSBSZWFjdFBoYXNlci5SZWFjdDtcclxuXHJcblJlYWN0LnJlbmRlciA9IFJlYWN0UGhhc2VyLnJlbmRlcjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25hdGl2ZS5qc1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdCcpO1xuXG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZyA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZycpO1xudmFyIGNyZWF0ZU5hdGl2ZVJlYWN0QW55dGhpbmcgPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlUmVhY3RBbnl0aGluZyhSZWFjdCwgbmF0aXZlSW1wbGVtZW50YXRpb24pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVOYXRpdmVSZWFjdEFueXRoaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL25hdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZHJlbicpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0Q2xhc3MgPSByZXF1aXJlKCcuL1JlYWN0Q2xhc3MnKTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHJlcXVpcmUoJy4vUmVhY3RET01GYWN0b3JpZXMnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxudmFyIG9ubHlDaGlsZCA9IHJlcXVpcmUoJy4vb25seUNoaWxkJyk7XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xudmFyIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQ7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgUmVhY3QgPSB7XG5cbiAgLy8gTW9kZXJuXG5cbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IFJlYWN0Q2hpbGRyZW4ubWFwLFxuICAgIGZvckVhY2g6IFJlYWN0Q2hpbGRyZW4uZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbi5jb3VudCxcbiAgICB0b0FycmF5OiBSZWFjdENoaWxkcmVuLnRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdENvbXBvbmVudCxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgaXNWYWxpZEVsZW1lbnQ6IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCxcblxuICAvLyBDbGFzc2ljXG5cbiAgUHJvcFR5cGVzOiBSZWFjdFByb3BUeXBlcyxcbiAgY3JlYXRlQ2xhc3M6IFJlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MsXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnksXG4gIGNyZWF0ZU1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAvLyBDdXJyZW50bHkgYSBub29wLiBXaWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRyYWNlIG1peGlucy5cbiAgICByZXR1cm4gbWl4aW47XG4gIH0sXG5cbiAgLy8gVGhpcyBsb29rcyBET00gc3BlY2lmaWMgYnV0IHRoZXNlIGFyZSBhY3R1YWxseSBpc29tb3JwaGljIGhlbHBlcnNcbiAgLy8gc2luY2UgdGhleSBhcmUganVzdCBnZW5lcmF0aW5nIERPTSBzdHJpbmdzLlxuICBET006IFJlYWN0RE9NRmFjdG9yaWVzLFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IEZvckVhY2hCb29rS2VlcGluZy5nZXRQb29sZWQoZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICBGb3JFYWNoQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogbWFwcGluZy4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBNYXBCb29rS2VlcGluZ1xuICogQHBhcmFtIHshKn0gbWFwUmVzdWx0IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICogQHBhcmFtIHshZnVuY3Rpb259IG1hcEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICogQHBhcmFtIHs/Kn0gbWFwQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICovXG5mdW5jdGlvbiBNYXBCb29rS2VlcGluZyhtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgdGhpcy5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gIHRoaXMua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICB0aGlzLmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5NYXBCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZXN1bHQgPSBudWxsO1xuICB0aGlzLmtleVByZWZpeCA9IG51bGw7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhNYXBCb29rS2VlcGluZywgZm91ckFyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQ7XG4gIHZhciBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXg7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYztcbiAgdmFyIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBNYXBCb29rS2VlcGluZy5nZXRQb29sZWQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICBNYXBCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHtcbiAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICBtYXA6IG1hcENoaWxkcmVuLFxuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsLFxuICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgdG9BcnJheTogdG9BcnJheVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkcmVuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkcmVuLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUG9vbGVkQ2xhc3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMikge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMik7XG4gIH1cbn07XG5cbnZhciB0aHJlZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMyk7XG4gIH1cbn07XG5cbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0KTtcbiAgfVxufTtcblxudmFyIGZpdmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICB9XG59O1xuXG52YXIgc3RhbmRhcmRSZWxlYXNlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICAhKGluc3RhbmNlIGluc3RhbmNlb2YgS2xhc3MpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMgKG9wdGlvbmFsKS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb3B5Q29uc3RydWN0b3IgQ29uc3RydWN0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZXNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBvb2xlciBDdXN0b21pemFibGUgcG9vbGVyLlxuICovXG52YXIgYWRkUG9vbGluZ1RvID0gZnVuY3Rpb24gKENvcHlDb25zdHJ1Y3RvciwgcG9vbGVyKSB7XG4gIHZhciBOZXdLbGFzcyA9IENvcHlDb25zdHJ1Y3RvcjtcbiAgTmV3S2xhc3MuaW5zdGFuY2VQb29sID0gW107XG4gIE5ld0tsYXNzLmdldFBvb2xlZCA9IHBvb2xlciB8fCBERUZBVUxUX1BPT0xFUjtcbiAgaWYgKCFOZXdLbGFzcy5wb29sU2l6ZSkge1xuICAgIE5ld0tsYXNzLnBvb2xTaXplID0gREVGQVVMVF9QT09MX1NJWkU7XG4gIH1cbiAgTmV3S2xhc3MucmVsZWFzZSA9IHN0YW5kYXJkUmVsZWFzZXI7XG4gIHJldHVybiBOZXdLbGFzcztcbn07XG5cbnZhciBQb29sZWRDbGFzcyA9IHtcbiAgYWRkUG9vbGluZ1RvOiBhZGRQb29saW5nVG8sXG4gIG9uZUFyZ3VtZW50UG9vbGVyOiBvbmVBcmd1bWVudFBvb2xlcixcbiAgdHdvQXJndW1lbnRQb29sZXI6IHR3b0FyZ3VtZW50UG9vbGVyLFxuICB0aHJlZUFyZ3VtZW50UG9vbGVyOiB0aHJlZUFyZ3VtZW50UG9vbGVyLFxuICBmb3VyQXJndW1lbnRQb29sZXI6IGZvdXJBcmd1bWVudFBvb2xlcixcbiAgZml2ZUFyZ3VtZW50UG9vbGVyOiBmaXZlQXJndW1lbnRQb29sZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9vbGVkQ2xhc3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1Bvb2xlZENsYXNzLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudCB0eXBlLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cblJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZWYgPSAhY29uZmlnLmhhc093blByb3BlcnR5KCdyZWYnKSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldCA/IG51bGwgOiBjb25maWcucmVmO1xuICAgICAga2V5ID0gIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgna2V5JykgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQgPyBudWxsIDogJycgKyBjb25maWcua2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZWYgPSBjb25maWcucmVmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLnJlZjtcbiAgICAgIGtleSA9IGNvbmZpZy5rZXkgPT09IHVuZGVmaW5lZCA/IG51bGwgOiAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBDcmVhdGUgZHVtbXkgYGtleWAgYW5kIGByZWZgIHByb3BlcnR5IHRvIGBwcm9wc2AgdG8gd2FybiB1c2Vyc1xuICAgIC8vIGFnYWluc3QgaXRzIHVzZVxuICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkoJ2tleScpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmICdkaXNwbGF5TmFtZScgaW4gdHlwZSA/IHR5cGUuZGlzcGxheU5hbWUgOiAnRWxlbWVudCcpIDogdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkoJ3JlZicpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmICdkaXNwbGF5TmFtZScgaW4gdHlwZSA/IHR5cGUuZGlzcGxheU5hbWUgOiAnRWxlbWVudCcpIDogdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChjb25maWcua2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5SZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vb2JqZWN0LWFzc2lnbi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q3VycmVudE93bmVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDdXJyZW50T3duZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi93YXJuaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjYW5EZWZpbmVQcm9wZXJ0eVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdHJhdmVyc2VBbGxDaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVyTG9va3VwID0ge1xuICAnPSc6ICc9MCcsXG4gICc6JzogJz0yJ1xufTtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcblxudmFyIGRpZFdhcm5BYm91dE1hcHMgPSBmYWxzZTtcblxuZnVuY3Rpb24gdXNlclByb3ZpZGVkS2V5RXNjYXBlcihtYXRjaCkge1xuICByZXR1cm4gdXNlclByb3ZpZGVkS2V5RXNjYXBlckxvb2t1cFttYXRjaF07XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIHdyYXBVc2VyUHJvdmlkZWRLZXkoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBFc2NhcGUgYSBjb21wb25lbnQga2V5IHNvIHRoYXQgaXQgaXMgc2FmZSB0byB1c2UgaW4gYSByZWFjdGlkLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGV4dCBDb21wb25lbnQga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEFuIGVzY2FwZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgdXNlclByb3ZpZGVkS2V5RXNjYXBlcik7XG59XG5cbi8qKlxuICogV3JhcCBhIGBrZXlgIHZhbHVlIGV4cGxpY2l0bHkgcHJvdmlkZWQgYnkgdGhlIHVzZXIgdG8gZGlzdGluZ3Vpc2ggaXQgZnJvbVxuICogaW1wbGljaXRseS1nZW5lcmF0ZWQga2V5cyBnZW5lcmF0ZWQgYnkgYSBjb21wb25lbnQncyBpbmRleCBpbiBpdHMgcGFyZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVmFsdWUgb2YgYSB1c2VyLXByb3ZpZGVkIGBrZXlgIGF0dHJpYnV0ZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB3cmFwVXNlclByb3ZpZGVkS2V5KGtleSkge1xuICByZXR1cm4gJyQnICsgZXNjYXBlVXNlclByb3ZpZGVkS2V5KGtleSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCB8fCB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgY2hpbGQgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyB3cmFwVXNlclByb3ZpZGVkS2V5KGVudHJ5WzBdKSArIFNVQlNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZCwgMCk7XG4gICAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZCBvciB3cmFwIHRoZSBvYmplY3QgdXNpbmcgY3JlYXRlRnJhZ21lbnQob2JqZWN0KSBmcm9tIHRoZSAnICsgJ1JlYWN0IGFkZC1vbnMuJztcbiAgICAgICAgaWYgKGNoaWxkcmVuLl9pc1JlYWN0RWxlbWVudCkge1xuICAgICAgICAgIGFkZGVuZHVtID0gJyBJdCBsb29rcyBsaWtlIHlvdVxcJ3JlIHVzaW5nIGFuIGVsZW1lbnQgY3JlYXRlZCBieSBhIGRpZmZlcmVudCAnICsgJ3ZlcnNpb24gb2YgUmVhY3QuIE1ha2Ugc3VyZSB0byB1c2Ugb25seSBvbmUgY29weSBvZiBSZWFjdC4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgYWRkZW5kdW0gKz0gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gU3RyaW5nKGNoaWxkcmVuKTtcbiAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZ2V0SXRlcmF0b3JGblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gKlxuICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gKlxuICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJdGVyYXRvckZuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG52YXIgUmVhY3RJbnN0cnVtZW50YXRpb24gPSByZXF1aXJlKCcuL1JlYWN0SW5zdHJ1bWVudGF0aW9uJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAhKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgJyArICdmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblNldFN0YXRlKCk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcocGFydGlhbFN0YXRlICE9IG51bGwsICdzZXRTdGF0ZSguLi4pOiBZb3UgcGFzc2VkIGFuIHVuZGVmaW5lZCBvciBudWxsIHN0YXRlIG9iamVjdDsgJyArICdpbnN0ZWFkLCB1c2UgZm9yY2VVcGRhdGUoKS4nKSA6IHZvaWQgMDtcbiAgfVxuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE5vb3BVcGRhdGVRdWV1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIHdhcm5URFoocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvciAmJiBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgdGhlIHBlbmRpbmcgdXBkYXRlc1xuICAgKiBoYXZlIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdG8gdXNlIGFzIGB0aGlzYCBjb250ZXh0LlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUNhbGxiYWNrOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrKSB7fSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHdhcm5URFoocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgd2FyblREWihwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5URFoocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEluc3RydW1lbnRhdGlvblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RGVidWdUb29sID0gcmVxdWlyZSgnLi9SZWFjdERlYnVnVG9vbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZGVidWdUb29sOiBSZWFjdERlYnVnVG9vbCB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEluc3RydW1lbnRhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERlYnVnVG9vbFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wgPSByZXF1aXJlKCcuL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgZXZlbnRIYW5kbGVycyA9IFtdO1xudmFyIGhhbmRsZXJEb2VzVGhyb3dGb3JFdmVudCA9IHt9O1xuXG5mdW5jdGlvbiBlbWl0RXZlbnQoaGFuZGxlckZ1bmN0aW9uTmFtZSwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGV2ZW50SGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXJbaGFuZGxlckZ1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICBoYW5kbGVyW2hhbmRsZXJGdW5jdGlvbk5hbWVdKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFoYW5kbGVyRG9lc1Rocm93Rm9yRXZlbnRbaGFuZGxlckZ1bmN0aW9uTmFtZV0sICdleGNlcHRpb24gdGhyb3duIGJ5IGRldnRvb2wgd2hpbGUgaGFuZGxpbmcgJXM6ICVzJywgaGFuZGxlckZ1bmN0aW9uTmFtZSwgZS5tZXNzYWdlKSA6IHZvaWQgMDtcbiAgICAgICAgaGFuZGxlckRvZXNUaHJvd0ZvckV2ZW50W2hhbmRsZXJGdW5jdGlvbk5hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG52YXIgUmVhY3REZWJ1Z1Rvb2wgPSB7XG4gIGFkZERldnRvb2w6IGZ1bmN0aW9uIChkZXZ0b29sKSB7XG4gICAgZXZlbnRIYW5kbGVycy5wdXNoKGRldnRvb2wpO1xuICB9LFxuICByZW1vdmVEZXZ0b29sOiBmdW5jdGlvbiAoZGV2dG9vbCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRIYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGV2ZW50SGFuZGxlcnNbaV0gPT09IGRldnRvb2wpIHtcbiAgICAgICAgZXZlbnRIYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dCcpO1xuICB9LFxuICBvbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBlbWl0RXZlbnQoJ29uRW5kUHJvY2Vzc2luZ0NoaWxkQ29udGV4dCcpO1xuICB9LFxuICBvblNldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvblNldFN0YXRlJyk7XG4gIH0sXG4gIG9uTW91bnRSb290Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25Nb3VudFJvb3RDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25Nb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICBlbWl0RXZlbnQoJ29uTW91bnRDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvblVwZGF0ZUNvbXBvbmVudCcsIGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuICBvblVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvblVubW91bnRDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfVxufTtcblxuUmVhY3REZWJ1Z1Rvb2wuYWRkRGV2dG9vbChSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERlYnVnVG9vbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3REZWJ1Z1Rvb2wuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcm9jZXNzaW5nQ2hpbGRDb250ZXh0ID0gZmFsc2U7XG5cbiAgdmFyIHdhcm5JbnZhbGlkU2V0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIXByb2Nlc3NpbmdDaGlsZENvbnRleHQsICdzZXRTdGF0ZSguLi4pOiBDYW5ub3QgY2FsbCBzZXRTdGF0ZSgpIGluc2lkZSBnZXRDaGlsZENvbnRleHQoKScpIDogdm9pZCAwO1xuICB9O1xufVxuXG52YXIgUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbCA9IHtcbiAgb25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzaW5nQ2hpbGRDb250ZXh0ID0gdHJ1ZTtcbiAgfSxcbiAgb25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCA9IGZhbHNlO1xuICB9LFxuICBvblNldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgd2FybkludmFsaWRTZXRTdGF0ZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2w7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2VtcHR5T2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2xhc3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25zJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBNSVhJTlNfS0VZID0ga2V5T2YoeyBtaXhpbnM6IG51bGwgfSk7XG5cbi8qKlxuICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAqL1xudmFyIFNwZWNQb2xpY3kgPSBrZXlNaXJyb3Ioe1xuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBtYXkgYmUgZGVmaW5lZCBvbmx5IG9uY2UgYnkgdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gb3IgbWl4aW4uXG4gICAqL1xuICBERUZJTkVfT05DRTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgYnkgYm90aCB0aGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBhbmQgbWl4aW5zLlxuICAgKiBTdWJzZXF1ZW50IGRlZmluaXRpb25zIHdpbGwgYmUgY2hhaW5lZC4gVGhlc2UgbWV0aG9kcyBtdXN0IHJldHVybiB2b2lkLlxuICAgKi9cbiAgREVGSU5FX01BTlk6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBvdmVycmlkaW5nIHRoZSBiYXNlIGNsYXNzLlxuICAgKi9cbiAgT1ZFUlJJREVfQkFTRTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgYXJlIHNpbWlsYXIgdG8gREVGSU5FX01BTlksIGV4Y2VwdCB3ZSBhc3N1bWUgdGhleSByZXR1cm5cbiAgICogb2JqZWN0cy4gV2UgdHJ5IHRvIG1lcmdlIHRoZSBrZXlzIG9mIHRoZSByZXR1cm4gdmFsdWVzIG9mIGFsbCB0aGUgbWl4ZWQgaW5cbiAgICogZnVuY3Rpb25zLiBJZiB0aGVyZSBpcyBhIGtleSBjb25mbGljdCB3ZSB0aHJvdy5cbiAgICovXG4gIERFRklORV9NQU5ZX01FUkdFRDogbnVsbFxufSk7XG5cbnZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBjb21wb25lbnRzIGFyZSBoaWdoZXItbGV2ZWwgY29tcG9uZW50cyB0aGF0IGNvbXBvc2Ugb3RoZXIgY29tcG9zaXRlXG4gKiBvciBuYXRpdmUgY29tcG9uZW50cy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gKiB5b3VyIG5ldyBjbGFzcyB0byBgUmVhY3QuY3JlYXRlQ2xhc3NgLiBUaGUgb25seSByZXF1aXJlbWVudCBvZiB5b3VyIGNsYXNzXG4gKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBzdXBwb3J0cyBhIHNwZWNpZmljIHByb3RvY29sIG9mIG1ldGhvZHMgdGhhdCBoYXZlXG4gKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gKiBjbGFzcyBzcGVjaWZpY2F0aW9uIHdpbGwgYmUgYXZhaWxhYmxlIG9uIHRoZSBwcm90b3R5cGUuXG4gKlxuICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7YXJyYXl9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgbWl4aW5zOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICogdGhlIGNvbXBvbmVudCdzIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgaXRzIHByb3RvdHlwZSAoc3RhdGljIG1ldGhvZHMpLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHN0YXRpY3M6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgcHJvcFR5cGVzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbnRleHRUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIHRoaXMgY29tcG9uZW50IHNldHMgZm9yIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjaGlsZENvbnRleHRUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvLyA9PT09IERlZmluaXRpb24gbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgKiBgdGhpcy5wcm9wc2AgaWYgdGhhdCBwcm9wIGlzIG5vdCBzcGVjaWZpZWQgKGkuZS4gdXNpbmcgYW4gYGluYCBjaGVjaykuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICogb24gYHRoaXMuc3RhdGVgIG9yIHVzZSBgdGhpcy5zZXRTdGF0ZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgKlxuICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4ge1xuICAgKiAgICAgICBpc09uOiBmYWxzZSxcbiAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRJbml0aWFsU3RhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0Q2hpbGRDb250ZXh0OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogVXNlcyBwcm9wcyBmcm9tIGB0aGlzLnByb3BzYCBhbmQgc3RhdGUgZnJvbSBgdGhpcy5zdGF0ZWAgdG8gcmVuZGVyIHRoZVxuICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogTm8gZ3VhcmFudGVlcyBhcmUgbWFkZSBhYm91dCB3aGVuIG9yIGhvdyBvZnRlbiB0aGlzIG1ldGhvZCBpcyBpbnZva2VkLCBzb1xuICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKiBAbm9zaWRlZWZmZWN0c1xuICAgKiBAcmVxdWlyZWRcbiAgICovXG4gIHJlbmRlcjogU3BlY1BvbGljeS5ERUZJTkVfT05DRSxcblxuICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsbHkgY3JlYXRlZCBhbmQgYWJvdXQgdG8gYmUgbW91bnRlZC5cbiAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAqIEhvd2V2ZXIsIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBET00gbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gbW91bnRlZCAoaW5pdGlhbGl6ZWQgYW5kIHJlbmRlcmVkKSBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byByZWFjdCB0byBhIHByb3AgdHJhbnNpdGlvbiBieSB1cGRhdGluZyB0aGVcbiAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgKlxuICAgKiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgKiAgICAgfSk7XG4gICAqICAgfVxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBlcXVpdmFsZW50IGBjb21wb25lbnRXaWxsUmVjZWl2ZVN0YXRlYC4gQW4gaW5jb21pbmcgcHJvcFxuICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGlsZSBkZWNpZGluZyBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGFzIGEgcmVzdWx0IG9mXG4gICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBgcmV0dXJuIGZhbHNlYCB3aGVuIHlvdSdyZSBjZXJ0YWluIHRoYXQgdGhlXG4gICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICogdXBkYXRlLlxuICAgKlxuICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSkgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgKiAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfT05DRSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gdXBkYXRlIGR1ZSB0byBhIHRyYW5zaXRpb24gZnJvbVxuICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgKlxuICAgKiBOT1RFOiBZb3UgKipjYW5ub3QqKiB1c2UgYHRoaXMuc2V0U3RhdGUoKWAgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJldlByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAqIGl0cyBET00gcmVwcmVzZW50YXRpb24gZGVzdHJveWVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBjdXJyZW50bHkgbW91bnRlZCBET00gcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IFNwZWNQb2xpY3kuT1ZFUlJJREVfQkFTRVxuXG59O1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBjbGFzcyBzcGVjaWZpY2F0aW9uIGtleXMgdG8gc3BlY2lhbCBwcm9jZXNzaW5nIGZ1bmN0aW9ucy5cbiAqXG4gKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gKiB3aGVuIGRlZmluaW5nIGNsYXNzZXMgdXNpbmcgYFJlYWN0LmNyZWF0ZUNsYXNzYCwgdGhleSBhcmUgYWN0dWFsbHkgc3RhdGljXG4gKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAqIHdoaWNoIGFsbCBvdGhlciBzdGF0aWMgbWV0aG9kcyBhcmUgZGVmaW5lZC5cbiAqL1xudmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgZGlzcGxheU5hbWU6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZGlzcGxheU5hbWUpIHtcbiAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9LFxuICBtaXhpbnM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgbWl4aW5zKSB7XG4gICAgaWYgKG1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIG1peGluc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLmNoaWxkQ29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jb250ZXh0KTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICB9LFxuICAvKipcbiAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAqIGF1dG9tYXRpYyBtZXJnaW5nLlxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gZ2V0RGVmYXVsdFByb3BzO1xuICAgIH1cbiAgfSxcbiAgcHJvcFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICB9LFxuICBzdGF0aWNzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gIH0sXG4gIGF1dG9iaW5kOiBmdW5jdGlvbiAoKSB7fSB9O1xuXG4vLyBub29wXG5mdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICBpZiAodHlwZURlZi5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBpbnZhcmlhbnQgc28gY29tcG9uZW50c1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuT1ZFUlJJREVfQkFTRSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIG92ZXJyaWRlICcgKyAnYCVzYCBmcm9tIHlvdXIgY2xhc3Mgc3BlY2lmaWNhdGlvbi4gRW5zdXJlIHRoYXQgeW91ciBtZXRob2QgbmFtZXMgJyArICdkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gRGlzYWxsb3cgZGVmaW5pbmcgbWV0aG9kcyBtb3JlIHRoYW4gb25jZSB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSB8fCBzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSAnICsgJ2Alc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSAnICsgJ3RvIGEgbWl4aW4uJywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogTWl4aW4gaGVscGVyIHdoaWNoIGhhbmRsZXMgcG9saWN5IHZhbGlkYXRpb24gYW5kIHJlc2VydmVkXG4gKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICovXG5mdW5jdGlvbiBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYykge1xuICBpZiAoIXNwZWMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvICcgKyAndXNlIGEgY29tcG9uZW50IGNsYXNzIG9yIGZ1bmN0aW9uIGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgJyArICdyZWd1bGFyIG9iamVjdC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICEhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHNwZWMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gJyArICd1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgdmFyIHByb3RvID0gQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICB2YXIgYXV0b0JpbmRQYWlycyA9IHByb3RvLl9fcmVhY3RBdXRvQmluZFBhaXJzO1xuXG4gIC8vIEJ5IGhhbmRsaW5nIG1peGlucyBiZWZvcmUgYW55IG90aGVyIHByb3BlcnRpZXMsIHdlIGVuc3VyZSB0aGUgc2FtZVxuICAvLyBjaGFpbmluZyBvcmRlciBpcyBhcHBsaWVkIHRvIG1ldGhvZHMgd2l0aCBERUZJTkVfTUFOWSBwb2xpY3ksIHdoZXRoZXJcbiAgLy8gbWl4aW5zIGFyZSBsaXN0ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZXNlIG1ldGhvZHMgaW4gdGhlIHNwZWMuXG4gIGlmIChzcGVjLmhhc093blByb3BlcnR5KE1JWElOU19LRVkpKSB7XG4gICAgUkVTRVJWRURfU1BFQ19LRVlTLm1peGlucyhDb25zdHJ1Y3Rvciwgc3BlYy5taXhpbnMpO1xuICB9XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBzcGVjKSB7XG4gICAgaWYgKCFzcGVjLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gTUlYSU5TX0tFWSkge1xuICAgICAgLy8gV2UgaGF2ZSBhbHJlYWR5IGhhbmRsZWQgbWl4aW5zIGluIGEgc3BlY2lhbCBjYXNlIGFib3ZlLlxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHByb3BlcnR5ID0gc3BlY1tuYW1lXTtcbiAgICB2YXIgaXNBbHJlYWR5RGVmaW5lZCA9IHByb3RvLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSk7XG5cbiAgICBpZiAoUkVTRVJWRURfU1BFQ19LRVlTLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBSRVNFUlZFRF9TUEVDX0tFWVNbbmFtZV0oQ29uc3RydWN0b3IsIHByb3BlcnR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0dXAgbWV0aG9kcyBvbiBwcm90b3R5cGU6XG4gICAgICAvLyBUaGUgZm9sbG93aW5nIG1lbWJlciBtZXRob2RzIHNob3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBib3VuZDpcbiAgICAgIC8vIDEuIEV4cGVjdGVkIFJlYWN0Q2xhc3MgbWV0aG9kcyAoaW4gdGhlIFwiaW50ZXJmYWNlXCIpLlxuICAgICAgLy8gMi4gT3ZlcnJpZGRlbiBtZXRob2RzICh0aGF0IHdlcmUgbWl4ZWQgaW4pLlxuICAgICAgdmFyIGlzUmVhY3RDbGFzc01ldGhvZCA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIHZhciBzaG91bGRBdXRvQmluZCA9IGlzRnVuY3Rpb24gJiYgIWlzUmVhY3RDbGFzc01ldGhvZCAmJiAhaXNBbHJlYWR5RGVmaW5lZCAmJiBzcGVjLmF1dG9iaW5kICE9PSBmYWxzZTtcblxuICAgICAgaWYgKHNob3VsZEF1dG9CaW5kKSB7XG4gICAgICAgIGF1dG9CaW5kUGFpcnMucHVzaChuYW1lLCBwcm9wZXJ0eSk7XG4gICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICAgICAgIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZVtuYW1lXTtcblxuICAgICAgICAgIC8vIFRoZXNlIGNhc2VzIHNob3VsZCBhbHJlYWR5IGJlIGNhdWdodCBieSB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlLlxuICAgICAgICAgICEoaXNSZWFjdENsYXNzTWV0aG9kICYmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCB8fCBzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogVW5leHBlY3RlZCBzcGVjIHBvbGljeSAlcyBmb3Iga2V5ICVzICcgKyAnd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgICAgICAgIC8vIEZvciBtZXRob2RzIHdoaWNoIGFyZSBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLCBjYWxsIHRoZSBleGlzdGluZ1xuICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmIHNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgaWYgKCFzdGF0aWNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgaWYgKCFzdGF0aWNzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IG5hbWUgaW4gUkVTRVJWRURfU1BFQ19LRVlTO1xuICAgICEhaXNSZXNlcnZlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgJyArICdwcm9wZXJ0eSwgYCVzYCwgdGhhdCBzaG91bGRuXFwndCBiZSBvbiB0aGUgXCJzdGF0aWNzXCIga2V5LiBEZWZpbmUgaXQgJyArICdhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlICcgKyAnY29uc3RydWN0b3IuJywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgdmFyIGlzSW5oZXJpdGVkID0gbmFtZSBpbiBDb25zdHJ1Y3RvcjtcbiAgICAhIWlzSW5oZXJpdGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSAnICsgJ2R1ZSB0byBhIG1peGluLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBDb25zdHJ1Y3RvcltuYW1lXSA9IHByb3BlcnR5O1xuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdHdvIG9iamVjdHMsIGJ1dCB0aHJvdyBpZiBib3RoIGNvbnRhaW4gdGhlIHNhbWUga2V5LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvbmUgVGhlIGZpcnN0IG9iamVjdCwgd2hpY2ggaXMgbXV0YXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSB0d28gVGhlIHNlY29uZCBvYmplY3RcbiAqIEByZXR1cm4ge29iamVjdH0gb25lIGFmdGVyIGl0IGhhcyBiZWVuIG11dGF0ZWQgdG8gY29udGFpbiBldmVyeXRoaW5nIGluIHR3by5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhvbmUsIHR3bykge1xuICAhKG9uZSAmJiB0d28gJiYgdHlwZW9mIG9uZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHR3byA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogQ2Fubm90IG1lcmdlIG5vbi1vYmplY3RzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICBmb3IgKHZhciBrZXkgaW4gdHdvKSB7XG4gICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAhKG9uZVtrZXldID09PSB1bmRlZmluZWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogJyArICdUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCAnICsgJ21heSBiZSBkdWUgdG8gYSBtaXhpbjsgaW4gcGFydGljdWxhciwgdGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHR3byAnICsgJ2dldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgJyArICd3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICBib3VuZE1ldGhvZC5iaW5kID0gZnVuY3Rpb24gKG5ld1RoaXMpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgLy8gbGV0J3Mgd2Fybi5cbiAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxuLyoqXG4gKiBNb2R1bGUgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBjb21wb25lbnRzLlxuICpcbiAqIEBjbGFzcyBSZWFjdENsYXNzXG4gKi9cbnZhciBSZWFjdENsYXNzID0ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29tcG9zaXRlIGNvbXBvbmVudCBjbGFzcyBnaXZlbiBhIGNsYXNzIHNwZWNpZmljYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIENsYXNzIHNwZWNpZmljYXRpb24gKHdoaWNoIG11c3QgZGVmaW5lIGByZW5kZXJgKS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IENvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY3JlYXRlQ2xhc3M6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgdmFyIENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICAvLyBUaGlzIGNvbnN0cnVjdG9yIGdldHMgb3ZlcnJpZGRlbiBieSBtb2Nrcy4gVGhlIGFyZ3VtZW50IGlzIHVzZWRcbiAgICAgIC8vIGJ5IG1vY2tzIHRvIGFzc2VydCBvbiB3aGF0IGdldHMgbW91bnRlZC5cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLCAnU29tZXRoaW5nIGlzIGNhbGxpbmcgYSBSZWFjdCBjb21wb25lbnQgZGlyZWN0bHkuIFVzZSBhIGZhY3Rvcnkgb3IgJyArICdKU1ggaW5zdGVhZC4gU2VlOiBodHRwczovL2ZiLm1lL3JlYWN0LWxlZ2FjeWZhY3RvcnknKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgLy8gV2lyZSB1cCBhdXRvLWJpbmRpbmdcbiAgICAgIGlmICh0aGlzLl9fcmVhY3RBdXRvQmluZFBhaXJzLmxlbmd0aCkge1xuICAgICAgICBiaW5kQXV0b0JpbmRNZXRob2RzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcblxuICAgICAgLy8gUmVhY3RDbGFzc2VzIGRvZXNuJ3QgaGF2ZSBjb25zdHJ1Y3RvcnMuIEluc3RlYWQsIHRoZXkgdXNlIHRoZVxuICAgICAgLy8gZ2V0SW5pdGlhbFN0YXRlIGFuZCBjb21wb25lbnRXaWxsTW91bnQgbWV0aG9kcyBmb3IgaW5pdGlhbGl6YXRpb24uXG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSA/IHRoaXMuZ2V0SW5pdGlhbFN0YXRlKCkgOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmdldEluaXRpYWxTdGF0ZS5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAgIC8vIGRlcHJlY2F0aW5nIHRoaXMgY29udmVuaWVuY2UuXG4gICAgICAgICAgaW5pdGlhbFN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgISh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpbml0aWFsU3RhdGUpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5nZXRJbml0aWFsU3RhdGUoKTogbXVzdCByZXR1cm4gYW4gb2JqZWN0IG9yIG51bGwnLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBuZXcgUmVhY3RDbGFzc0NvbXBvbmVudCgpO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3JlYWN0QXV0b0JpbmRQYWlycyA9IFtdO1xuXG4gICAgaW5qZWN0ZWRNaXhpbnMuZm9yRWFjaChtaXhTcGVjSW50b0NvbXBvbmVudC5iaW5kKG51bGwsIENvbnN0cnVjdG9yKSk7XG5cbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRTaG91bGRVcGRhdGUsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50U2hvdWxkVXBkYXRlKCkuIERpZCB5b3UgbWVhbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKT8gJyArICdUaGUgbmFtZSBpcyBwaHJhc2VkIGFzIGEgcXVlc3Rpb24gYmVjYXVzZSB0aGUgZnVuY3Rpb24gaXMgJyArICdleHBlY3RlZCB0byByZXR1cm4gYSB2YWx1ZS4nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFJlZHVjZSB0aW1lIHNwZW50IGRvaW5nIGxvb2t1cHMgYnkgc2V0dGluZyB0aGVzZSBvbiB0aGUgcHJvdG90eXBlLlxuICAgIGZvciAodmFyIG1ldGhvZE5hbWUgaW4gUmVhY3RDbGFzc0ludGVyZmFjZSkge1xuICAgICAgaWYgKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH0sXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgaW5qZWN0TWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgICAgaW5qZWN0ZWRNaXhpbnMucHVzaChtaXhpbik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDbGFzcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDbGFzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlTG9jYXRpb25zXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0ga2V5TWlycm9yKHtcbiAgcHJvcDogbnVsbCxcbiAgY29udGV4dDogbnVsbCxcbiAgY2hpbGRDb250ZXh0OiBudWxsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25zO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnLi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgIShvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9rZXlNaXJyb3IuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG52YXIga2V5T2YgPSBmdW5jdGlvbiAob25lS2V5T2JqKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIG9uZUtleU9iaikge1xuICAgIGlmICghb25lS2V5T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERPTUZhY3Rvcmllc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcblxudmFyIG1hcE9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL21hcE9iamVjdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhY3RvcnkgdGhhdCBjcmVhdGVzIEhUTUwgdGFnIGVsZW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGFnIG5hbWUgKGUuZy4gYGRpdmApLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRE9NRmFjdG9yeSh0YWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICByZXR1cm4gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3RvcnkodGFnKTtcbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3RvcnkodGFnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwcGluZyBmcm9tIHN1cHBvcnRlZCBIVE1MIHRhZ3MgdG8gYFJlYWN0RE9NQ29tcG9uZW50YCBjbGFzc2VzLlxuICogVGhpcyBpcyBhbHNvIGFjY2Vzc2libGUgdmlhIGBSZWFjdC5ET01gLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gbWFwT2JqZWN0KHtcbiAgYTogJ2EnLFxuICBhYmJyOiAnYWJicicsXG4gIGFkZHJlc3M6ICdhZGRyZXNzJyxcbiAgYXJlYTogJ2FyZWEnLFxuICBhcnRpY2xlOiAnYXJ0aWNsZScsXG4gIGFzaWRlOiAnYXNpZGUnLFxuICBhdWRpbzogJ2F1ZGlvJyxcbiAgYjogJ2InLFxuICBiYXNlOiAnYmFzZScsXG4gIGJkaTogJ2JkaScsXG4gIGJkbzogJ2JkbycsXG4gIGJpZzogJ2JpZycsXG4gIGJsb2NrcXVvdGU6ICdibG9ja3F1b3RlJyxcbiAgYm9keTogJ2JvZHknLFxuICBicjogJ2JyJyxcbiAgYnV0dG9uOiAnYnV0dG9uJyxcbiAgY2FudmFzOiAnY2FudmFzJyxcbiAgY2FwdGlvbjogJ2NhcHRpb24nLFxuICBjaXRlOiAnY2l0ZScsXG4gIGNvZGU6ICdjb2RlJyxcbiAgY29sOiAnY29sJyxcbiAgY29sZ3JvdXA6ICdjb2xncm91cCcsXG4gIGRhdGE6ICdkYXRhJyxcbiAgZGF0YWxpc3Q6ICdkYXRhbGlzdCcsXG4gIGRkOiAnZGQnLFxuICBkZWw6ICdkZWwnLFxuICBkZXRhaWxzOiAnZGV0YWlscycsXG4gIGRmbjogJ2RmbicsXG4gIGRpYWxvZzogJ2RpYWxvZycsXG4gIGRpdjogJ2RpdicsXG4gIGRsOiAnZGwnLFxuICBkdDogJ2R0JyxcbiAgZW06ICdlbScsXG4gIGVtYmVkOiAnZW1iZWQnLFxuICBmaWVsZHNldDogJ2ZpZWxkc2V0JyxcbiAgZmlnY2FwdGlvbjogJ2ZpZ2NhcHRpb24nLFxuICBmaWd1cmU6ICdmaWd1cmUnLFxuICBmb290ZXI6ICdmb290ZXInLFxuICBmb3JtOiAnZm9ybScsXG4gIGgxOiAnaDEnLFxuICBoMjogJ2gyJyxcbiAgaDM6ICdoMycsXG4gIGg0OiAnaDQnLFxuICBoNTogJ2g1JyxcbiAgaDY6ICdoNicsXG4gIGhlYWQ6ICdoZWFkJyxcbiAgaGVhZGVyOiAnaGVhZGVyJyxcbiAgaGdyb3VwOiAnaGdyb3VwJyxcbiAgaHI6ICdocicsXG4gIGh0bWw6ICdodG1sJyxcbiAgaTogJ2knLFxuICBpZnJhbWU6ICdpZnJhbWUnLFxuICBpbWc6ICdpbWcnLFxuICBpbnB1dDogJ2lucHV0JyxcbiAgaW5zOiAnaW5zJyxcbiAga2JkOiAna2JkJyxcbiAga2V5Z2VuOiAna2V5Z2VuJyxcbiAgbGFiZWw6ICdsYWJlbCcsXG4gIGxlZ2VuZDogJ2xlZ2VuZCcsXG4gIGxpOiAnbGknLFxuICBsaW5rOiAnbGluaycsXG4gIG1haW46ICdtYWluJyxcbiAgbWFwOiAnbWFwJyxcbiAgbWFyazogJ21hcmsnLFxuICBtZW51OiAnbWVudScsXG4gIG1lbnVpdGVtOiAnbWVudWl0ZW0nLFxuICBtZXRhOiAnbWV0YScsXG4gIG1ldGVyOiAnbWV0ZXInLFxuICBuYXY6ICduYXYnLFxuICBub3NjcmlwdDogJ25vc2NyaXB0JyxcbiAgb2JqZWN0OiAnb2JqZWN0JyxcbiAgb2w6ICdvbCcsXG4gIG9wdGdyb3VwOiAnb3B0Z3JvdXAnLFxuICBvcHRpb246ICdvcHRpb24nLFxuICBvdXRwdXQ6ICdvdXRwdXQnLFxuICBwOiAncCcsXG4gIHBhcmFtOiAncGFyYW0nLFxuICBwaWN0dXJlOiAncGljdHVyZScsXG4gIHByZTogJ3ByZScsXG4gIHByb2dyZXNzOiAncHJvZ3Jlc3MnLFxuICBxOiAncScsXG4gIHJwOiAncnAnLFxuICBydDogJ3J0JyxcbiAgcnVieTogJ3J1YnknLFxuICBzOiAncycsXG4gIHNhbXA6ICdzYW1wJyxcbiAgc2NyaXB0OiAnc2NyaXB0JyxcbiAgc2VjdGlvbjogJ3NlY3Rpb24nLFxuICBzZWxlY3Q6ICdzZWxlY3QnLFxuICBzbWFsbDogJ3NtYWxsJyxcbiAgc291cmNlOiAnc291cmNlJyxcbiAgc3BhbjogJ3NwYW4nLFxuICBzdHJvbmc6ICdzdHJvbmcnLFxuICBzdHlsZTogJ3N0eWxlJyxcbiAgc3ViOiAnc3ViJyxcbiAgc3VtbWFyeTogJ3N1bW1hcnknLFxuICBzdXA6ICdzdXAnLFxuICB0YWJsZTogJ3RhYmxlJyxcbiAgdGJvZHk6ICd0Ym9keScsXG4gIHRkOiAndGQnLFxuICB0ZXh0YXJlYTogJ3RleHRhcmVhJyxcbiAgdGZvb3Q6ICd0Zm9vdCcsXG4gIHRoOiAndGgnLFxuICB0aGVhZDogJ3RoZWFkJyxcbiAgdGltZTogJ3RpbWUnLFxuICB0aXRsZTogJ3RpdGxlJyxcbiAgdHI6ICd0cicsXG4gIHRyYWNrOiAndHJhY2snLFxuICB1OiAndScsXG4gIHVsOiAndWwnLFxuICAndmFyJzogJ3ZhcicsXG4gIHZpZGVvOiAndmlkZW8nLFxuICB3YnI6ICd3YnInLFxuXG4gIC8vIFNWR1xuICBjaXJjbGU6ICdjaXJjbGUnLFxuICBjbGlwUGF0aDogJ2NsaXBQYXRoJyxcbiAgZGVmczogJ2RlZnMnLFxuICBlbGxpcHNlOiAnZWxsaXBzZScsXG4gIGc6ICdnJyxcbiAgaW1hZ2U6ICdpbWFnZScsXG4gIGxpbmU6ICdsaW5lJyxcbiAgbGluZWFyR3JhZGllbnQ6ICdsaW5lYXJHcmFkaWVudCcsXG4gIG1hc2s6ICdtYXNrJyxcbiAgcGF0aDogJ3BhdGgnLFxuICBwYXR0ZXJuOiAncGF0dGVybicsXG4gIHBvbHlnb246ICdwb2x5Z29uJyxcbiAgcG9seWxpbmU6ICdwb2x5bGluZScsXG4gIHJhZGlhbEdyYWRpZW50OiAncmFkaWFsR3JhZGllbnQnLFxuICByZWN0OiAncmVjdCcsXG4gIHN0b3A6ICdzdG9wJyxcbiAgc3ZnOiAnc3ZnJyxcbiAgdGV4dDogJ3RleHQnLFxuICB0c3BhbjogJ3RzcGFuJ1xuXG59LCBjcmVhdGVET01GYWN0b3J5KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTUZhY3RvcmllcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbGVtZW50VmFsaWRhdG9yXG4gKi9cblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25zJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgYWRkZW5kYSA9IGdldEFkZGVuZGFGb3JLZXlVc2UoJ3VuaXF1ZUtleScsIGVsZW1lbnQsIHBhcmVudFR5cGUpO1xuICBpZiAoYWRkZW5kYSA9PT0gbnVsbCkge1xuICAgIC8vIHdlIGFscmVhZHkgc2hvd2VkIHRoZSB3YXJuaW5nXG4gICAgcmV0dXJuO1xuICB9XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzJXMnLCBhZGRlbmRhLnBhcmVudE9yT3duZXIgfHwgJycsIGFkZGVuZGEuY2hpbGRPd25lciB8fCAnJywgYWRkZW5kYS51cmwgfHwgJycpIDogdm9pZCAwO1xufVxuXG4vKipcbiAqIFNoYXJlZCB3YXJuaW5nIGFuZCBtb25pdG9yaW5nIGNvZGUgZm9yIHRoZSBrZXkgd2FybmluZ3MuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVR5cGUgQSBrZXkgdXNlZCBmb3IgZGUtZHVwaW5nIHdhcm5pbmdzLlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKiBAcmV0dXJucyB7P29iamVjdH0gQSBzZXQgb2YgYWRkZW5kYSB0byB1c2UgaW4gdGhlIHdhcm5pbmcgbWVzc2FnZSwgb3IgbnVsbFxuICogaWYgdGhlIHdhcm5pbmcgaGFzIGFscmVhZHkgYmVlbiBzaG93biBiZWZvcmUgKGFuZCBzaG91bGRuJ3QgYmUgc2hvd24gYWdhaW4pLlxuICovXG5mdW5jdGlvbiBnZXRBZGRlbmRhRm9yS2V5VXNlKG1lc3NhZ2VUeXBlLCBlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICBpZiAoIWFkZGVuZHVtKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGFkZGVuZHVtID0gJyBDaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nW21lc3NhZ2VUeXBlXSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nW21lc3NhZ2VUeXBlXSA9IHt9KTtcbiAgaWYgKG1lbW9pemVyW2FkZGVuZHVtXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIG1lbW9pemVyW2FkZGVuZHVtXSA9IHRydWU7XG5cbiAgdmFyIGFkZGVuZGEgPSB7XG4gICAgcGFyZW50T3JPd25lcjogYWRkZW5kdW0sXG4gICAgdXJsOiAnIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLFxuICAgIGNoaWxkT3duZXI6IG51bGxcbiAgfTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBhZGRlbmRhLmNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBlbGVtZW50Ll9vd25lci5nZXROYW1lKCkgKyAnLic7XG4gIH1cblxuICByZXR1cm4gYWRkZW5kYTtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSBwcm9wcyBhcmUgdmFsaWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtvYmplY3R9IHByb3BUeXBlcyBNYXAgb2YgcHJvcCBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyhjb21wb25lbnROYW1lLCBwcm9wVHlwZXMsIHByb3BzLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvcFR5cGVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICEodHlwZW9mIHByb3BUeXBlc1twcm9wTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGVycm9yID0gZXg7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSwgdHlwZW9mIGVycm9yKSA6IHZvaWQgMDtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCBwcm9wVHlwZTogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCkge1xuICB2YXIgY29tcG9uZW50Q2xhc3MgPSBlbGVtZW50LnR5cGU7XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUgPSBjb21wb25lbnRDbGFzcy5kaXNwbGF5TmFtZSB8fCBjb21wb25lbnRDbGFzcy5uYW1lO1xuICBpZiAoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzKSB7XG4gICAgY2hlY2tQcm9wVHlwZXMobmFtZSwgY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLnByb3ApO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB9XG59XG5cbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSB7XG5cbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHZhbGlkVHlwZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgc2hvdWxkIG5vdCBiZSBudWxsLCB1bmRlZmluZWQsIGJvb2xlYW4sIG9yICcgKyAnbnVtYmVyLiBJdCBzaG91bGQgYmUgYSBzdHJpbmcgKGZvciBET00gZWxlbWVudHMpIG9yIGEgUmVhY3RDbGFzcyAnICsgJyhmb3IgY29tcG9zaXRlIGNvbXBvbmVudHMpLiVzJywgZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkpIDogdm9pZCAwO1xuXG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICBjcmVhdGVGYWN0b3J5OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGBjYWxsYmFja2Agb25jZSBmb3IgZWFjaCBlbnVtZXJhYmxlIG93biBwcm9wZXJ0eSBpbiB0aGVcbiAqIG9iamVjdCBhbmQgY29uc3RydWN0cyBhIG5ldyBvYmplY3QgZnJvbSB0aGUgcmVzdWx0cy4gVGhlIGBjYWxsYmFja2AgaXNcbiAqIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6XG4gKlxuICogIC0gdGhlIHByb3BlcnR5IHZhbHVlXG4gKiAgLSB0aGUgcHJvcGVydHkgbmFtZVxuICogIC0gdGhlIG9iamVjdCBiZWluZyB0cmF2ZXJzZWRcbiAqXG4gKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGFkZGVkIGFmdGVyIHRoZSBjYWxsIHRvIGBtYXBPYmplY3RgIHdpbGwgbm90IGJlIHZpc2l0ZWRcbiAqIGJ5IGBjYWxsYmFja2AuIElmIHRoZSB2YWx1ZXMgb2YgZXhpc3RpbmcgcHJvcGVydGllcyBhcmUgY2hhbmdlZCwgdGhlIHZhbHVlXG4gKiBwYXNzZWQgdG8gYGNhbGxiYWNrYCB3aWxsIGJlIHRoZSB2YWx1ZSBhdCB0aGUgdGltZSBgbWFwT2JqZWN0YCB2aXNpdHMgdGhlbS5cbiAqIFByb3BlcnRpZXMgdGhhdCBhcmUgZGVsZXRlZCBiZWZvcmUgYmVpbmcgdmlzaXRlZCBhcmUgbm90IHZpc2l0ZWQuXG4gKlxuICogQGdyZXAgZnVuY3Rpb24gb2JqZWN0TWFwKClcbiAqIEBncmVwIGZ1bmN0aW9uIG9iak1hcCgpXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IGNvbnRleHRcbiAqIEByZXR1cm4gez9vYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1hcE9iamVjdChvYmplY3QsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGlmICghb2JqZWN0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpIHtcbiAgICAgIHJlc3VsdFtuYW1lXSA9IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgb2JqZWN0W25hbWVdLCBuYW1lLCBvYmplY3QpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcE9iamVjdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9tYXBPYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG5cbi8qKlxuICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHByb3BUeXBlczoge1xuICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAqXG4gKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gKlxuICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gKiAgICAgfSxcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICogICB9KTtcbiAqXG4gKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gKlxuICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAqXG4gKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gKlxuICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAqICAgICAgICAgICk7XG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICB9LFxuICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gKiAgfSk7XG4gKlxuICogQGludGVybmFsXG4gKi9cblxudmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxudmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuXG4gIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXJcbn07XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoeCA9PT0geSkge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1JlcXVpcmVkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agd2FzIG5vdCBzcGVjaWZpZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zKG51bGwpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJyk7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5KTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfVxuICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbi8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG5mdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHJldHVybiBBTk9OWU1PVVM7XG4gIH1cbiAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFZlcnNpb25cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjAuMCc7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBvbmx5Q2hpbGRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXNcbiAqIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZVxuICogcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0byBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZVxuICogb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0Q29tcG9uZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdvbmx5Q2hpbGQgbXVzdCBiZSBwYXNzZWQgYSBjaGlsZHJlbiB3aXRoIGV4YWN0bHkgb25lIGNoaWxkLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvb25seUNoaWxkLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RQZXJmJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgUmVhY3RBbnl0aGluZ01vdW50ID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nTW91bnQnKTtcbnZhciBSZWFjdEFueXRoaW5nSW5qZWN0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nSW5qZWN0aW9uJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgcmVuZGVyID0gUmVhY3RQZXJmLm1lYXN1cmUoJ1JlYWN0JywgJ3JlbmRlcicsIFJlYWN0QW55dGhpbmdNb3VudC5yZW5kZXIpO1xuXG5cbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nID0gZnVuY3Rpb24gKFJlYWN0LCBuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIFJlYWN0QW55dGhpbmdJbmplY3Rpb24uaW5qZWN0KG5hdGl2ZUltcGxlbWVudGF0aW9uKTtcblxuICAgIHZhciBSZWFjdEFueXRoaW5nID0ge1xuICAgICAgICBSZWFjdDogUmVhY3QsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG4gICAgICAgIGNvbXBvbmVudHM6IChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jb21wb25lbnRzLnR5cGVzIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgdGFnKSB7XG4gICAgICAgICAgICBhY2NbdGFnXSA9IHRhZztcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KVxuICAgIH07XG5cbiAgICByZXR1cm4gUmVhY3RBbnl0aGluZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUmVhY3RBbnl0aGluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UGVyZlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZWFjdFBlcmYgaXMgYSBnZW5lcmFsIEFPUCBzeXN0ZW0gZGVzaWduZWQgdG8gbWVhc3VyZSBwZXJmb3JtYW5jZS4gVGhpc1xuICogbW9kdWxlIG9ubHkgaGFzIHRoZSBob29rczogc2VlIFJlYWN0RGVmYXVsdFBlcmYgZm9yIHRoZSBhbmFseXNpcyB0b29sLlxuICovXG5cbnZhciBSZWFjdFBlcmYgPSB7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGVuYWJsZS9kaXNhYmxlIG1lYXN1cmVtZW50LiBTZXQgdG8gZmFsc2UgYnkgZGVmYXVsdCB0byBwcmV2ZW50XG4gICAqIGFjY2lkZW50YWwgbG9nZ2luZyBhbmQgcGVyZiBsb3NzLlxuICAgKi9cbiAgZW5hYmxlTWVhc3VyZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEhvbGRzIG9udG8gdGhlIG1lYXN1cmUgZnVuY3Rpb24gaW4gdXNlLiBCeSBkZWZhdWx0LCBkb24ndCBtZWFzdXJlXG4gICAqIGFueXRoaW5nLCBidXQgd2UnbGwgb3ZlcnJpZGUgdGhpcyBpZiB3ZSBpbmplY3QgYSBtZWFzdXJlIGZ1bmN0aW9uLlxuICAgKi9cbiAgc3RvcmVkTWVhc3VyZTogX25vTWVhc3VyZSxcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqZWN0TmFtZVxuICAgKiBAcGFyYW0ge29iamVjdDxzdHJpbmc+fSBtZXRob2ROYW1lc1xuICAgKi9cbiAgbWVhc3VyZU1ldGhvZHM6IGZ1bmN0aW9uIChvYmplY3QsIG9iamVjdE5hbWUsIG1ldGhvZE5hbWVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBtZXRob2ROYW1lcykge1xuICAgICAgICBpZiAoIW1ldGhvZE5hbWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBvYmplY3Rba2V5XSA9IFJlYWN0UGVyZi5tZWFzdXJlKG9iamVjdE5hbWUsIG1ldGhvZE5hbWVzW2tleV0sIG9iamVjdFtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIHRvIHdyYXAgbWV0aG9kcyB5b3Ugd2FudCB0byBtZWFzdXJlLiBaZXJvIG92ZXJoZWFkIGluIHByb2R1Y3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvYmpOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbk5hbWVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAgICovXG4gIG1lYXN1cmU6IGZ1bmN0aW9uIChvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1lYXN1cmVkRnVuYyA9IG51bGw7XG4gICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKFJlYWN0UGVyZi5lbmFibGVNZWFzdXJlKSB7XG4gICAgICAgICAgaWYgKCFtZWFzdXJlZEZ1bmMpIHtcbiAgICAgICAgICAgIG1lYXN1cmVkRnVuYyA9IFJlYWN0UGVyZi5zdG9yZWRNZWFzdXJlKG9iak5hbWUsIGZuTmFtZSwgZnVuYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtZWFzdXJlZEZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIHdyYXBwZXIuZGlzcGxheU5hbWUgPSBvYmpOYW1lICsgJ18nICsgZm5OYW1lO1xuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1lYXN1cmVcbiAgICAgKi9cbiAgICBpbmplY3RNZWFzdXJlOiBmdW5jdGlvbiAobWVhc3VyZSkge1xuICAgICAgUmVhY3RQZXJmLnN0b3JlZE1lYXN1cmUgPSBtZWFzdXJlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBTaW1wbHkgcGFzc2VzIHRocm91Z2ggdGhlIG1lYXN1cmVkIGZ1bmN0aW9uLCB3aXRob3V0IG1lYXN1cmluZyBpdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb2JqTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZuTmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9ub01lYXN1cmUob2JqTmFtZSwgZm5OYW1lLCBmdW5jKSB7XG4gIHJldHVybiBmdW5jO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UGVyZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RQZXJmLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdE1vdW50LmpzXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFVwZGF0ZVF1ZXVlJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VXBkYXRlcycpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG52YXIgaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdDb250YWluZXJJbmZvJyk7XG5cbnZhciBtb3VudGVkUm9vdENvbXBvbmVudHMgPSB7fTtcbnZhciBtb3VudGVkSW1hZ2VzID0ge307XG52YXIgX19ERVZfXyA9IHRydWU7XG5cblxuZnVuY3Rpb24gYmF0Y2hlZE1vdW50Q29tcG9uZW50SW50b05vZGUoY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUsIGNvbnRleHQpIHtcbiAgICB2YXIgdHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5nZXRQb29sZWQoZmFsc2UpO1xuICAgIHRyYW5zYWN0aW9uLnBlcmZvcm0oXG4gICAgICAgIG1vdW50Q29tcG9uZW50SW50b05vZGUsXG4gICAgICAgIG51bGwsXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgY29udGV4dFxuICAgICk7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24ucmVsZWFzZSh0cmFuc2FjdGlvbik7XG59XG5cblxuZnVuY3Rpb24gbW91bnRDb21wb25lbnRJbnRvTm9kZShjb21wb25lbnRJbnN0YW5jZSwgY29udGFpbmVyTmFtZSwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgbWFya2VyTmFtZTtcbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjb21wb25lbnRJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQ7XG4gICAgICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgICAgICBtYXJrZXJOYW1lID0gJ1JlYWN0IG1vdW50OiAnICsgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUgOlxuICAgICAgICAgICAgICAgIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICBjb25zb2xlLnRpbWUobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudChcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UsXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBudWxsLFxuICAgICAgICBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbyhjb21wb25lbnRJbnN0YW5jZSwgY29udGFpbmVyTmFtZSksXG4gICAgICAgIGNvbnRleHRcbiAgICApO1xuXG4gICAgaWYgKG1hcmtlck5hbWUpIHtcbiAgICAgICAgY29uc29sZS50aW1lRW5kKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIFJlYWN0QW55dGhpbmdNb3VudC5fbW91bnRJbWFnZUludG9Ob2RlKFxuICAgICAgICBtYXJrdXAsXG4gICAgICAgIGNvbnRhaW5lck5hbWUsXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgY29udGV4dFxuICAgICk7XG59XG5cblxudmFyIFJlYWN0QW55dGhpbmdNb3VudCA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChuZXh0RWxlbWVudCwgY29udGFpbmVyTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5leHRFbGVtZW50KSxcbiAgICAgICAgICAgICdSZWFjdEFueXRpbmcucmVuZGVyKCk6IEludmFsaWQgY29tcG9uZW50IGVsZW1lbnQuJXMnLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBuZXh0RWxlbWVudCA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgc3RyaW5nIGxpa2UgXFwnZGl2XFwnLCBwYXNzICcgK1xuICAgICAgICAgICAgICAgICdSZWFjdC5jcmVhdGVFbGVtZW50KFxcJ2RpdlxcJykgb3IgPGRpdiAvPi4nIDpcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5leHRFbGVtZW50ID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgICAgICAgJyBJbnN0ZWFkIG9mIHBhc3NpbmcgYSBjbGFzcyBsaWtlIEZvbywgcGFzcyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQoRm9vKSBvciA8Rm9vIC8+LicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXQgcXVhY2tzIGxpa2UgYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgIT0gbnVsbCAmJiBuZXh0RWxlbWVudC5wcm9wcyAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICcgVGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHVuaW50ZW50aW9uYWxseSBsb2FkaW5nIHR3byBpbmRlcGVuZGVudCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb3BpZXMgb2YgUmVhY3QuJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgY29udGFpbmVyTmFtZSAmJiB0eXBlb2YgY29udGFpbmVyTmFtZSA9PT0gJ3N0cmluZycsXG4gICAgICAgICAgICAncmVuZGVyKCk6IGNvbnRhaW5lck5hbWUgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgcHJldkNvbXBvbmVudCA9IG1vdW50ZWRSb290Q29tcG9uZW50c1tjb250YWluZXJOYW1lXTtcblxuICAgICAgICBpZiAocHJldkNvbXBvbmVudCkge1xuICAgICAgICAgICAgdmFyIHByZXZFbGVtZW50ID0gcHJldkNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB1YmxpY0luc3QgPSBwcmV2Q29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkQ2FsbGJhY2sgPSBjYWxsYmFjayAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHB1YmxpY0luc3QpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFJlYWN0QW55dGhpbmdNb3VudC5fdXBkYXRlUm9vdENvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgICAgcHJldkNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRDYWxsYmFja1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1YmxpY0luc3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFJlYWN0QW55dGhpbmdNb3VudC5fdW5tb3VudFJvb3RDb21wb25lbnQoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21wb25lbnQgPSBSZWFjdEFueXRoaW5nTW91bnQuX3JlbmRlck5ld1Jvb3RDb21wb25lbnQobmV4dEVsZW1lbnQsIGNvbnRhaW5lck5hbWUpO1xuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfSxcblxuICAgIF91cGRhdGVSb290Q29tcG9uZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIF91bm1vdW50Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKGNvbnRhaW5lck5hbWUpIHtcbiAgICB9LFxuICAgIFxuICAgIF9yZW5kZXJOZXdSb290Q29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIGNvbnRhaW5lck5hbWUpIHtcbiAgICAgICAgLy8gVmFyaW91cyBwYXJ0cyBvZiBvdXIgY29kZSAoc3VjaCBhcyBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCdzXG4gICAgICAgIC8vIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQpIGFzc3VtZSB0aGF0IGNhbGxzIHRvIHJlbmRlciBhcmVuJ3QgbmVzdGVkO1xuICAgICAgICAvLyB2ZXJpZnkgdGhhdCB0aGF0J3MgdGhlIGNhc2UuXG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID09IG51bGwsXG4gICAgICAgICAgICAnX3JlbmRlck5ld1Jvb3RDb21wb25lbnQoKTogUmVuZGVyIG1ldGhvZHMgc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiAnICtcbiAgICAgICAgICAgICdvZiBwcm9wcyBhbmQgc3RhdGU7IHRyaWdnZXJpbmcgbmVzdGVkIGNvbXBvbmVudCB1cGRhdGVzIGZyb20gJyArXG4gICAgICAgICAgICAncmVuZGVyIGlzIG5vdCBhbGxvd2VkLiBJZiBuZWNlc3NhcnksIHRyaWdnZXIgbmVzdGVkIHVwZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAnY29tcG9uZW50RGlkVXBkYXRlLiBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiAlcy4nLFxuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKSB8fFxuICAgICAgICAgICAgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50J1xuICAgICAgICApO1xuXG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGNvbnRhaW5lck5hbWUgJiYgdHlwZW9mIGNvbnRhaW5lck5hbWUgPT09ICdzdHJpbmcnLFxuICAgICAgICAgICAgJ19yZWdpc3RlckNvbXBvbmVudCguLi4pOiBUYXJnZXQgY29udGFpbmVyTmFtZSBpcyBub3QgYSBzdHJpbmcuJ1xuICAgICAgICApO1xuXG4gICAgICAgIHZhciBjb21wb25lbnRJbnN0YW5jZSA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobmV4dEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFRoZSBpbml0aWFsIHJlbmRlciBpcyBzeW5jaHJvbm91cyBidXQgYW55IHVwZGF0ZXMgdGhhdCBoYXBwZW4gZHVyaW5nXG4gICAgICAgIC8vIHJlbmRlcmluZywgaW4gY29tcG9uZW50V2lsbE1vdW50IG9yIGNvbXBvbmVudERpZE1vdW50LCB3aWxsIGJlIGJhdGNoZWRcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGJhdGNoaW5nIHN0cmF0ZWd5LlxuXG4gICAgICAgIFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcyhcbiAgICAgICAgICAgIGJhdGNoZWRNb3VudENvbXBvbmVudEludG9Ob2RlLFxuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UsXG4gICAgICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIG1vdW50ZWRSb290Q29tcG9uZW50c1tjb250YWluZXJOYW1lXSA9IGNvbXBvbmVudEluc3RhbmNlO1xuXG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Nb3VudFJvb3RDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEluc3RhbmNlO1xuICAgIH0sXG5cblxuICAgIF9tb3VudEltYWdlSW50b05vZGU6IGZ1bmN0aW9uIChtYXJrdXAsIGNvbnRhaW5lck5hbWUsIGltYWdlLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICB0eXBlb2YgY29udGFpbmVyTmFtZSA9PT0gJ3N0cmluZycsXG4gICAgICAgICAgICAnbW91bnRDb21wb25lbnRJbnRvTm9kZSguLi4pOiBUYXJnZXQgY29udGFpbmVyIGlzIG5vdCB2YWxpZC4nXG4gICAgICAgICk7XG5cbiAgICAgICAgbW91bnRlZEltYWdlc1tjb250YWluZXJOYW1lXSA9IGltYWdlO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ01vdW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdNb3VudC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFVwZGF0ZVF1ZXVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpIHtcbiAgUmVhY3RVcGRhdGVzLmVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVuZXhwZWN0ZWRBcmd1bWVudChhcmcpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgYXJnO1xuICBpZiAodHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICB2YXIgZGlzcGxheU5hbWUgPSBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgfHwgdHlwZTtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcmcpO1xuICBpZiAoa2V5cy5sZW5ndGggPiAwICYmIGtleXMubGVuZ3RoIDwgMjApIHtcbiAgICByZXR1cm4gZGlzcGxheU5hbWUgKyAnIChrZXlzOiAnICsga2V5cy5qb2luKCcsICcpICsgJyknO1xuICB9XG4gIHJldHVybiBkaXNwbGF5TmFtZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIHZhciBpbnRlcm5hbEluc3RhbmNlID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQocHVibGljSW5zdGFuY2UpO1xuICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gT25seSB3YXJuIHdoZW4gd2UgaGF2ZSBhIGNhbGxlck5hbWUuIE90aGVyd2lzZSB3ZSBzaG91bGQgYmUgc2lsZW50LlxuICAgICAgLy8gV2UncmUgcHJvYmFibHkgY2FsbGluZyBmcm9tIGVucXVldWVDYWxsYmFjay4gV2UgZG9uJ3Qgd2FudCB0byB3YXJuXG4gICAgICAvLyB0aGVyZSBiZWNhdXNlIHdlIGFscmVhZHkgd2FybmVkIGZvciB0aGUgY29ycmVzcG9uZGluZyBsaWZlY3ljbGUgbWV0aG9kLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWNhbGxlck5hbWUsICclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuICcgKyAnVGhpcyBpcyBhIG5vLW9wLiBQbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3IuZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9PSBudWxsLCAnJXMoLi4uKTogQ2Fubm90IHVwZGF0ZSBkdXJpbmcgYW4gZXhpc3Rpbmcgc3RhdGUgdHJhbnNpdGlvbiAoc3VjaCBhcyAnICsgJ3dpdGhpbiBgcmVuZGVyYCBvciBhbm90aGVyIGNvbXBvbmVudFxcJ3MgY29uc3RydWN0b3IpLiBSZW5kZXIgbWV0aG9kcyAnICsgJ3Nob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gb2YgcHJvcHMgYW5kIHN0YXRlOyBjb25zdHJ1Y3RvciAnICsgJ3NpZGUtZWZmZWN0cyBhcmUgYW4gYW50aS1wYXR0ZXJuLCBidXQgY2FuIGJlIG1vdmVkIHRvICcgKyAnYGNvbXBvbmVudFdpbGxNb3VudGAuJywgY2FsbGVyTmFtZSkgOiB2b2lkIDA7XG4gIH1cblxuICByZXR1cm4gaW50ZXJuYWxJbnN0YW5jZTtcbn1cblxuLyoqXG4gKiBSZWFjdFVwZGF0ZVF1ZXVlIGFsbG93cyBmb3Igc3RhdGUgdXBkYXRlcyB0byBiZSBzY2hlZHVsZWQgaW50byBhIGxhdGVyXG4gKiByZWNvbmNpbGlhdGlvbiBzdGVwLlxuICovXG52YXIgUmVhY3RVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICAgIGlmIChvd25lciAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhvd25lci5fd2FybmVkQWJvdXRSZWZzSW5SZW5kZXIsICclcyBpcyBhY2Nlc3NpbmcgaXNNb3VudGVkIGluc2lkZSBpdHMgcmVuZGVyKCkgZnVuY3Rpb24uICcgKyAncmVuZGVyKCkgc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiBvZiBwcm9wcyBhbmQgc3RhdGUuIEl0IHNob3VsZCAnICsgJ25ldmVyIGFjY2VzcyBzb21ldGhpbmcgdGhhdCByZXF1aXJlcyBzdGFsZSBkYXRhIGZyb20gdGhlIHByZXZpb3VzICcgKyAncmVuZGVyLCBzdWNoIGFzIHJlZnMuIE1vdmUgdGhpcyBsb2dpYyB0byBjb21wb25lbnREaWRNb3VudCBhbmQgJyArICdjb21wb25lbnREaWRVcGRhdGUgaW5zdGVhZC4nLCBvd25lci5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICAgIG93bmVyLl93YXJuZWRBYm91dFJlZnNJblJlbmRlciA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQocHVibGljSW5zdGFuY2UpO1xuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICAvLyBEdXJpbmcgY29tcG9uZW50V2lsbE1vdW50IGFuZCByZW5kZXIgdGhpcyB3aWxsIHN0aWxsIGJlIG51bGwgYnV0IGFmdGVyXG4gICAgICAvLyB0aGF0IHdpbGwgYWx3YXlzIHJlbmRlciB0byBzb21ldGhpbmcuIEF0IGxlYXN0IGZvciBub3cuIFNvIHdlIGNhbiB1c2VcbiAgICAgIC8vIHRoaXMgaGFjay5cbiAgICAgIHJldHVybiAhIWludGVybmFsSW5zdGFuY2UuX3JlbmRlcmVkQ29tcG9uZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGxlck5hbWUgTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICBSZWFjdFVwZGF0ZVF1ZXVlLnZhbGlkYXRlQ2FsbGJhY2soY2FsbGJhY2ssIGNhbGxlck5hbWUpO1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlKTtcblxuICAgIC8vIFByZXZpb3VzbHkgd2Ugd291bGQgdGhyb3cgYW4gZXJyb3IgaWYgd2UgZGlkbid0IGhhdmUgYW4gaW50ZXJuYWxcbiAgICAvLyBpbnN0YW5jZS4gU2luY2Ugd2Ugd2FudCB0byBtYWtlIGl0IGEgbm8tb3AgaW5zdGVhZCwgd2UgbWlycm9yIHRoZSBzYW1lXG4gICAgLy8gYmVoYXZpb3Igd2UgaGF2ZSBpbiBvdGhlciBlbnF1ZXVlKiBtZXRob2RzLlxuICAgIC8vIFdlIGFsc28gbmVlZCB0byBpZ25vcmUgY2FsbGJhY2tzIGluIGNvbXBvbmVudFdpbGxNb3VudC4gU2VlXG4gICAgLy8gZW5xdWV1ZVVwZGF0ZXMuXG4gICAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcykge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcyA9IFtjYWxsYmFja107XG4gICAgfVxuICAgIC8vIFRPRE86IFRoZSBjYWxsYmFjayBoZXJlIGlzIGlnbm9yZWQgd2hlbiBzZXRTdGF0ZSBpcyBjYWxsZWQgZnJvbVxuICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudC4gRWl0aGVyIGZpeCBpdCBvciBkaXNhbGxvdyBkb2luZyBzbyBjb21wbGV0ZWx5IGluXG4gICAgLy8gZmF2b3Igb2YgZ2V0SW5pdGlhbFN0YXRlLiBBbHRlcm5hdGl2ZWx5LCB3ZSBjYW4gZGlzYWxsb3dcbiAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgZHVyaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIGVucXVldWVDYWxsYmFja0ludGVybmFsOiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcykge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcyA9IFtjYWxsYmFja107XG4gICAgfVxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSB0cnVlO1xuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IFtjb21wbGV0ZVN0YXRlXTtcbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gdHJ1ZTtcblxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlKSB7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuXG4gICAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHF1ZXVlID0gaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ1N0YXRlUXVldWUgfHwgKGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gW10pO1xuICAgIHF1ZXVlLnB1c2gocGFydGlhbFN0YXRlKTtcblxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgZW5xdWV1ZUVsZW1lbnRJbnRlcm5hbDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIG5ld0VsZW1lbnQpIHtcbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nRWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICB2YWxpZGF0ZUNhbGxiYWNrOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICAhKCFjYWxsYmFjayB8fCB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IEV4cGVjdGVkIHRoZSBsYXN0IG9wdGlvbmFsIGBjYWxsYmFja2AgYXJndW1lbnQgdG8gYmUgYSAnICsgJ2Z1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiAlcy4nLCBjYWxsZXJOYW1lLCBmb3JtYXRVbmV4cGVjdGVkQXJndW1lbnQoY2FsbGJhY2spKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFVwZGF0ZVF1ZXVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFVwZGF0ZVF1ZXVlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0SW5zdGFuY2VNYXBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogYFJlYWN0SW5zdGFuY2VNYXBgIG1haW50YWlucyBhIG1hcHBpbmcgZnJvbSBhIHB1YmxpYyBmYWNpbmcgc3RhdGVmdWxcbiAqIGluc3RhbmNlIChrZXkpIGFuZCB0aGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gKHZhbHVlKS4gVGhpcyBhbGxvd3MgcHVibGljXG4gKiBtZXRob2RzIHRvIGFjY2VwdCB0aGUgdXNlciBmYWNpbmcgaW5zdGFuY2UgYXMgYW4gYXJndW1lbnQgYW5kIG1hcCB0aGVtIGJhY2tcbiAqIHRvIGludGVybmFsIG1ldGhvZHMuXG4gKi9cblxuLy8gVE9ETzogUmVwbGFjZSB0aGlzIHdpdGggRVM2OiB2YXIgUmVhY3RJbnN0YW5jZU1hcCA9IG5ldyBNYXAoKTtcblxudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSB7XG5cbiAgLyoqXG4gICAqIFRoaXMgQVBJIHNob3VsZCBiZSBjYWxsZWQgYGRlbGV0ZWAgYnV0IHdlJ2QgaGF2ZSB0byBtYWtlIHN1cmUgdG8gYWx3YXlzXG4gICAqIHRyYW5zZm9ybSB0aGVzZSB0byBzdHJpbmdzIGZvciBJRSBzdXBwb3J0LiBXaGVuIHRoaXMgdHJhbnNmb3JtIGlzIGZ1bGx5XG4gICAqIHN1cHBvcnRlZCB3ZSBjYW4gcmVuYW1lIGl0LlxuICAgKi9cbiAgcmVtb3ZlOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSAhPT0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSA9IHZhbHVlO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RJbnN0YW5jZU1hcDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RJbnN0YW5jZU1hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFVwZGF0ZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgQ2FsbGJhY2tRdWV1ZSA9IHJlcXVpcmUoJy4vQ2FsbGJhY2tRdWV1ZScpO1xudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RmVhdHVyZUZsYWdzID0gcmVxdWlyZSgnLi9SZWFjdEZlYXR1cmVGbGFncycpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJy4vUmVhY3RQZXJmJyk7XG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vVHJhbnNhY3Rpb24nKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgZGlydHlDb21wb25lbnRzID0gW107XG52YXIgYXNhcENhbGxiYWNrUXVldWUgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpO1xudmFyIGFzYXBFbnF1ZXVlZCA9IGZhbHNlO1xuXG52YXIgYmF0Y2hpbmdTdHJhdGVneSA9IG51bGw7XG5cbmZ1bmN0aW9uIGVuc3VyZUluamVjdGVkKCkge1xuICAhKFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uICYmIGJhdGNoaW5nU3RyYXRlZ3kpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBpbmplY3QgYSByZWNvbmNpbGUgdHJhbnNhY3Rpb24gY2xhc3MgYW5kIGJhdGNoaW5nICcgKyAnc3RyYXRlZ3knKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG59XG5cbnZhciBORVNURURfVVBEQVRFUyA9IHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoID0gZGlydHlDb21wb25lbnRzLmxlbmd0aDtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggIT09IGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIEFkZGl0aW9uYWwgdXBkYXRlcyB3ZXJlIGVucXVldWVkIGJ5IGNvbXBvbmVudERpZFVwZGF0ZSBoYW5kbGVycyBvclxuICAgICAgLy8gc2ltaWxhcjsgYmVmb3JlIG91ciBvd24gVVBEQVRFX1FVRVVFSU5HIHdyYXBwZXIgY2xvc2VzLCB3ZSB3YW50IHRvIHJ1blxuICAgICAgLy8gdGhlc2UgbmV3IHVwZGF0ZXMgc28gdGhhdCBpZiBBJ3MgY29tcG9uZW50RGlkVXBkYXRlIGNhbGxzIHNldFN0YXRlIG9uXG4gICAgICAvLyBCLCBCIHdpbGwgdXBkYXRlIGJlZm9yZSB0aGUgY2FsbGJhY2sgQSdzIHVwZGF0ZXIgcHJvdmlkZWQgd2hlbiBjYWxsaW5nXG4gICAgICAvLyBzZXRTdGF0ZS5cbiAgICAgIGRpcnR5Q29tcG9uZW50cy5zcGxpY2UoMCwgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGgpO1xuICAgICAgZmx1c2hCYXRjaGVkVXBkYXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBVUERBVEVfUVVFVUVJTkcgPSB7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUucmVzZXQoKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUubm90aWZ5QWxsKCk7XG4gIH1cbn07XG5cbnZhciBUUkFOU0FDVElPTl9XUkFQUEVSUyA9IFtORVNURURfVVBEQVRFUywgVVBEQVRFX1FVRVVFSU5HXTtcblxuZnVuY3Rpb24gUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbigpIHtcbiAgdGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpO1xuICB0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCA9IG51bGw7XG4gIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKCk7XG4gIHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5nZXRQb29sZWQoXG4gIC8qIHVzZUNyZWF0ZUVsZW1lbnQgKi90cnVlKTtcbn1cblxuX2Fzc2lnbihSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uLnByb3RvdHlwZSwgVHJhbnNhY3Rpb24uTWl4aW4sIHtcbiAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBUUkFOU0FDVElPTl9XUkFQUEVSUztcbiAgfSxcblxuICBkZXN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggPSBudWxsO1xuICAgIENhbGxiYWNrUXVldWUucmVsZWFzZSh0aGlzLmNhbGxiYWNrUXVldWUpO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IG51bGw7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24ucmVsZWFzZSh0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uKTtcbiAgICB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uID0gbnVsbDtcbiAgfSxcblxuICBwZXJmb3JtOiBmdW5jdGlvbiAobWV0aG9kLCBzY29wZSwgYSkge1xuICAgIC8vIEVzc2VudGlhbGx5IGNhbGxzIGB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uLnBlcmZvcm0obWV0aG9kLCBzY29wZSwgYSlgXG4gICAgLy8gd2l0aCB0aGlzIHRyYW5zYWN0aW9uJ3Mgd3JhcHBlcnMgYXJvdW5kIGl0LlxuICAgIHJldHVybiBUcmFuc2FjdGlvbi5NaXhpbi5wZXJmb3JtLmNhbGwodGhpcywgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbi5wZXJmb3JtLCB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uLCBtZXRob2QsIHNjb3BlLCBhKTtcbiAgfVxufSk7XG5cblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uKTtcblxuZnVuY3Rpb24gYmF0Y2hlZFVwZGF0ZXMoY2FsbGJhY2ssIGEsIGIsIGMsIGQsIGUpIHtcbiAgZW5zdXJlSW5qZWN0ZWQoKTtcbiAgYmF0Y2hpbmdTdHJhdGVneS5iYXRjaGVkVXBkYXRlcyhjYWxsYmFjaywgYSwgYiwgYywgZCwgZSk7XG59XG5cbi8qKlxuICogQXJyYXkgY29tcGFyYXRvciBmb3IgUmVhY3RDb21wb25lbnRzIGJ5IG1vdW50IG9yZGVyaW5nLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGMxIGZpcnN0IGNvbXBvbmVudCB5b3UncmUgY29tcGFyaW5nXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjMiBzZWNvbmQgY29tcG9uZW50IHlvdSdyZSBjb21wYXJpbmdcbiAqIEByZXR1cm4ge251bWJlcn0gUmV0dXJuIHZhbHVlIHVzYWJsZSBieSBBcnJheS5wcm90b3R5cGUuc29ydCgpLlxuICovXG5mdW5jdGlvbiBtb3VudE9yZGVyQ29tcGFyYXRvcihjMSwgYzIpIHtcbiAgcmV0dXJuIGMxLl9tb3VudE9yZGVyIC0gYzIuX21vdW50T3JkZXI7XG59XG5cbmZ1bmN0aW9uIHJ1bkJhdGNoZWRVcGRhdGVzKHRyYW5zYWN0aW9uKSB7XG4gIHZhciBsZW4gPSB0cmFuc2FjdGlvbi5kaXJ0eUNvbXBvbmVudHNMZW5ndGg7XG4gICEobGVuID09PSBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBmbHVzaCB0cmFuc2FjdGlvblxcJ3Mgc3RvcmVkIGRpcnR5LWNvbXBvbmVudHMgbGVuZ3RoICglcykgdG8gJyArICdtYXRjaCBkaXJ0eS1jb21wb25lbnRzIGFycmF5IGxlbmd0aCAoJXMpLicsIGxlbiwgZGlydHlDb21wb25lbnRzLmxlbmd0aCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gIC8vIFNpbmNlIHJlY29uY2lsaW5nIGEgY29tcG9uZW50IGhpZ2hlciBpbiB0aGUgb3duZXIgaGllcmFyY2h5IHVzdWFsbHkgKG5vdFxuICAvLyBhbHdheXMgLS0gc2VlIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpKSB3aWxsIHJlY29uY2lsZSBjaGlsZHJlbiwgcmVjb25jaWxlXG4gIC8vIHRoZW0gYmVmb3JlIHRoZWlyIGNoaWxkcmVuIGJ5IHNvcnRpbmcgdGhlIGFycmF5LlxuICBkaXJ0eUNvbXBvbmVudHMuc29ydChtb3VudE9yZGVyQ29tcGFyYXRvcik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIC8vIElmIGEgY29tcG9uZW50IGlzIHVubW91bnRlZCBiZWZvcmUgcGVuZGluZyBjaGFuZ2VzIGFwcGx5LCBpdCB3aWxsIHN0aWxsXG4gICAgLy8gYmUgaGVyZSwgYnV0IHdlIGFzc3VtZSB0aGF0IGl0IGhhcyBjbGVhcmVkIGl0cyBfcGVuZGluZ0NhbGxiYWNrcyBhbmRcbiAgICAvLyB0aGF0IHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeSBpcyBhIG5vb3AuXG4gICAgdmFyIGNvbXBvbmVudCA9IGRpcnR5Q29tcG9uZW50c1tpXTtcblxuICAgIC8vIElmIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeSBoYXBwZW5zIHRvIGVucXVldWUgYW55IG5ldyB1cGRhdGVzLCB3ZVxuICAgIC8vIHNob3VsZG4ndCBleGVjdXRlIHRoZSBjYWxsYmFja3MgdW50aWwgdGhlIG5leHQgcmVuZGVyIGhhcHBlbnMsIHNvXG4gICAgLy8gc3Rhc2ggdGhlIGNhbGxiYWNrcyBmaXJzdFxuICAgIHZhciBjYWxsYmFja3MgPSBjb21wb25lbnQuX3BlbmRpbmdDYWxsYmFja3M7XG4gICAgY29tcG9uZW50Ll9wZW5kaW5nQ2FsbGJhY2tzID0gbnVsbDtcblxuICAgIHZhciBtYXJrZXJOYW1lO1xuICAgIGlmIChSZWFjdEZlYXR1cmVGbGFncy5sb2dUb3BMZXZlbFJlbmRlcnMpIHtcbiAgICAgIHZhciBuYW1lZENvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgIC8vIER1Y2sgdHlwZSBUb3BMZXZlbFdyYXBwZXIuIFRoaXMgaXMgcHJvYmFibHkgYWx3YXlzIHRydWUuXG4gICAgICBpZiAoY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5wcm9wcyA9PT0gY29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudC5fY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgbmFtZWRDb21wb25lbnQgPSBjb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgbWFya2VyTmFtZSA9ICdSZWFjdCB1cGRhdGU6ICcgKyBuYW1lZENvbXBvbmVudC5nZXROYW1lKCk7XG4gICAgICBjb25zb2xlLnRpbWUobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgUmVhY3RSZWNvbmNpbGVyLnBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeShjb21wb25lbnQsIHRyYW5zYWN0aW9uLnJlY29uY2lsZVRyYW5zYWN0aW9uKTtcblxuICAgIGlmIChtYXJrZXJOYW1lKSB7XG4gICAgICBjb25zb2xlLnRpbWVFbmQobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYWxsYmFja3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uY2FsbGJhY2tRdWV1ZS5lbnF1ZXVlKGNhbGxiYWNrc1tqXSwgY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG52YXIgZmx1c2hCYXRjaGVkVXBkYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbidzIHdyYXBwZXJzIHdpbGwgY2xlYXIgdGhlIGRpcnR5Q29tcG9uZW50c1xuICAvLyBhcnJheSBhbmQgcGVyZm9ybSBhbnkgdXBkYXRlcyBlbnF1ZXVlZCBieSBtb3VudC1yZWFkeSBoYW5kbGVycyAoaS5lLixcbiAgLy8gY29tcG9uZW50RGlkVXBkYXRlKSBidXQgd2UgbmVlZCB0byBjaGVjayBoZXJlIHRvbyBpbiBvcmRlciB0byBjYXRjaFxuICAvLyB1cGRhdGVzIGVucXVldWVkIGJ5IHNldFN0YXRlIGNhbGxiYWNrcyBhbmQgYXNhcCBjYWxscy5cbiAgd2hpbGUgKGRpcnR5Q29tcG9uZW50cy5sZW5ndGggfHwgYXNhcEVucXVldWVkKSB7XG4gICAgaWYgKGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciB0cmFuc2FjdGlvbiA9IFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24uZ2V0UG9vbGVkKCk7XG4gICAgICB0cmFuc2FjdGlvbi5wZXJmb3JtKHJ1bkJhdGNoZWRVcGRhdGVzLCBudWxsLCB0cmFuc2FjdGlvbik7XG4gICAgICBSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uLnJlbGVhc2UodHJhbnNhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmIChhc2FwRW5xdWV1ZWQpIHtcbiAgICAgIGFzYXBFbnF1ZXVlZCA9IGZhbHNlO1xuICAgICAgdmFyIHF1ZXVlID0gYXNhcENhbGxiYWNrUXVldWU7XG4gICAgICBhc2FwQ2FsbGJhY2tRdWV1ZSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKCk7XG4gICAgICBxdWV1ZS5ub3RpZnlBbGwoKTtcbiAgICAgIENhbGxiYWNrUXVldWUucmVsZWFzZShxdWV1ZSk7XG4gICAgfVxuICB9XG59O1xuZmx1c2hCYXRjaGVkVXBkYXRlcyA9IFJlYWN0UGVyZi5tZWFzdXJlKCdSZWFjdFVwZGF0ZXMnLCAnZmx1c2hCYXRjaGVkVXBkYXRlcycsIGZsdXNoQmF0Y2hlZFVwZGF0ZXMpO1xuXG4vKipcbiAqIE1hcmsgYSBjb21wb25lbnQgYXMgbmVlZGluZyBhIHJlcmVuZGVyLCBhZGRpbmcgYW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gYVxuICogbGlzdCBvZiBmdW5jdGlvbnMgd2hpY2ggd2lsbCBiZSBleGVjdXRlZCBvbmNlIHRoZSByZXJlbmRlciBvY2N1cnMuXG4gKi9cbmZ1bmN0aW9uIGVucXVldWVVcGRhdGUoY29tcG9uZW50KSB7XG4gIGVuc3VyZUluamVjdGVkKCk7XG5cbiAgLy8gVmFyaW91cyBwYXJ0cyBvZiBvdXIgY29kZSAoc3VjaCBhcyBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCdzXG4gIC8vIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQpIGFzc3VtZSB0aGF0IGNhbGxzIHRvIHJlbmRlciBhcmVuJ3QgbmVzdGVkO1xuICAvLyB2ZXJpZnkgdGhhdCB0aGF0J3MgdGhlIGNhc2UuIChUaGlzIGlzIGNhbGxlZCBieSBlYWNoIHRvcC1sZXZlbCB1cGRhdGVcbiAgLy8gZnVuY3Rpb24sIGxpa2Ugc2V0UHJvcHMsIHNldFN0YXRlLCBmb3JjZVVwZGF0ZSwgZXRjLjsgY3JlYXRpb24gYW5kXG4gIC8vIGRlc3RydWN0aW9uIG9mIHRvcC1sZXZlbCBjb21wb25lbnRzIGlzIGd1YXJkZWQgaW4gUmVhY3RNb3VudC4pXG5cbiAgaWYgKCFiYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzKSB7XG4gICAgYmF0Y2hpbmdTdHJhdGVneS5iYXRjaGVkVXBkYXRlcyhlbnF1ZXVlVXBkYXRlLCBjb21wb25lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRpcnR5Q29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG59XG5cbi8qKlxuICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRvIGJlIHJ1biBhdCB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGJhdGNoaW5nIGN5Y2xlLiBUaHJvd3NcbiAqIGlmIG5vIHVwZGF0ZXMgYXJlIGN1cnJlbnRseSBiZWluZyBwZXJmb3JtZWQuXG4gKi9cbmZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgIWJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzLmFzYXA6IENhblxcJ3QgZW5xdWV1ZSBhbiBhc2FwIGNhbGxiYWNrIGluIGEgY29udGV4dCB3aGVyZScgKyAndXBkYXRlcyBhcmUgbm90IGJlaW5nIGJhdGNoZWQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBhc2FwQ2FsbGJhY2tRdWV1ZS5lbnF1ZXVlKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgYXNhcEVucXVldWVkID0gdHJ1ZTtcbn1cblxudmFyIFJlYWN0VXBkYXRlc0luamVjdGlvbiA9IHtcbiAgaW5qZWN0UmVjb25jaWxlVHJhbnNhY3Rpb246IGZ1bmN0aW9uIChSZWNvbmNpbGVUcmFuc2FjdGlvbikge1xuICAgICFSZWNvbmNpbGVUcmFuc2FjdGlvbiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhIHJlY29uY2lsZSB0cmFuc2FjdGlvbiBjbGFzcycpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IFJlY29uY2lsZVRyYW5zYWN0aW9uO1xuICB9LFxuXG4gIGluamVjdEJhdGNoaW5nU3RyYXRlZ3k6IGZ1bmN0aW9uIChfYmF0Y2hpbmdTdHJhdGVneSkge1xuICAgICFfYmF0Y2hpbmdTdHJhdGVneSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhIGJhdGNoaW5nIHN0cmF0ZWd5JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIF9iYXRjaGluZ1N0cmF0ZWd5LmJhdGNoZWRVcGRhdGVzID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhIGJhdGNoZWRVcGRhdGVzKCkgZnVuY3Rpb24nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgISh0eXBlb2YgX2JhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPT09ICdib29sZWFuJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYW4gaXNCYXRjaGluZ1VwZGF0ZXMgYm9vbGVhbiBhdHRyaWJ1dGUnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgYmF0Y2hpbmdTdHJhdGVneSA9IF9iYXRjaGluZ1N0cmF0ZWd5O1xuICB9XG59O1xuXG52YXIgUmVhY3RVcGRhdGVzID0ge1xuICAvKipcbiAgICogUmVhY3QgcmVmZXJlbmNlcyBgUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbmAgdXNpbmcgdGhpcyBwcm9wZXJ0eSBpbiBvcmRlclxuICAgKiB0byBhbGxvdyBkZXBlbmRlbmN5IGluamVjdGlvbi5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uOiBudWxsLFxuXG4gIGJhdGNoZWRVcGRhdGVzOiBiYXRjaGVkVXBkYXRlcyxcbiAgZW5xdWV1ZVVwZGF0ZTogZW5xdWV1ZVVwZGF0ZSxcbiAgZmx1c2hCYXRjaGVkVXBkYXRlczogZmx1c2hCYXRjaGVkVXBkYXRlcyxcbiAgaW5qZWN0aW9uOiBSZWFjdFVwZGF0ZXNJbmplY3Rpb24sXG4gIGFzYXA6IGFzYXBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RVcGRhdGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFVwZGF0ZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgQ2FsbGJhY2tRdWV1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgcHNldWRvLWV2ZW50IG1vZHVsZSB0byBoZWxwIGtlZXAgdHJhY2sgb2YgY29tcG9uZW50cyB3YWl0aW5nIHRvXG4gKiBiZSBub3RpZmllZCB3aGVuIHRoZWlyIERPTSByZXByZXNlbnRhdGlvbnMgYXJlIGF2YWlsYWJsZSBmb3IgdXNlLlxuICpcbiAqIFRoaXMgaW1wbGVtZW50cyBgUG9vbGVkQ2xhc3NgLCBzbyB5b3Ugc2hvdWxkIG5ldmVyIG5lZWQgdG8gaW5zdGFudGlhdGUgdGhpcy5cbiAqIEluc3RlYWQsIHVzZSBgQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQoKWAuXG4gKlxuICogQGNsYXNzIFJlYWN0TW91bnRSZWFkeVxuICogQGltcGxlbWVudHMgUG9vbGVkQ2xhc3NcbiAqIEBpbnRlcm5hbFxuICovXG5mdW5jdGlvbiBDYWxsYmFja1F1ZXVlKCkge1xuICB0aGlzLl9jYWxsYmFja3MgPSBudWxsO1xuICB0aGlzLl9jb250ZXh0cyA9IG51bGw7XG59XG5cbl9hc3NpZ24oQ2FsbGJhY2tRdWV1ZS5wcm90b3R5cGUsIHtcblxuICAvKipcbiAgICogRW5xdWV1ZXMgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gYG5vdGlmeUFsbGAgaXMgaW52b2tlZC5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgSW52b2tlZCB3aGVuIGBub3RpZnlBbGxgIGlzIGludm9rZWQuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gY29udGV4dCBDb250ZXh0IHRvIGNhbGwgYGNhbGxiYWNrYCB3aXRoLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWU6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCBbXTtcbiAgICB0aGlzLl9jb250ZXh0cyA9IHRoaXMuX2NvbnRleHRzIHx8IFtdO1xuICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB0aGlzLl9jb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbnZva2VzIGFsbCBlbnF1ZXVlZCBjYWxsYmFja3MgYW5kIGNsZWFycyB0aGUgcXVldWUuIFRoaXMgaXMgaW52b2tlZCBhZnRlclxuICAgKiB0aGUgRE9NIHJlcHJlc2VudGF0aW9uIG9mIGEgY29tcG9uZW50IGhhcyBiZWVuIGNyZWF0ZWQgb3IgdXBkYXRlZC5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBub3RpZnlBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzO1xuICAgIHZhciBjb250ZXh0cyA9IHRoaXMuX2NvbnRleHRzO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICEoY2FsbGJhY2tzLmxlbmd0aCA9PT0gY29udGV4dHMubGVuZ3RoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdNaXNtYXRjaGVkIGxpc3Qgb2YgY29udGV4dHMgaW4gY2FsbGJhY2sgcXVldWUnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB0aGlzLl9jYWxsYmFja3MgPSBudWxsO1xuICAgICAgdGhpcy5fY29udGV4dHMgPSBudWxsO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwoY29udGV4dHNbaV0pO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb250ZXh0cy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfSxcblxuICBjaGVja3BvaW50OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrcyA/IHRoaXMuX2NhbGxiYWNrcy5sZW5ndGggOiAwO1xuICB9LFxuXG4gIHJvbGxiYWNrOiBmdW5jdGlvbiAobGVuKSB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLmxlbmd0aCA9IGxlbjtcbiAgICAgIHRoaXMuX2NvbnRleHRzLmxlbmd0aCA9IGxlbjtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgaW50ZXJuYWwgcXVldWUuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRleHRzID0gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogYFBvb2xlZENsYXNzYCBsb29rcyBmb3IgdGhpcy5cbiAgICovXG4gIGRlc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cblxufSk7XG5cblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhDYWxsYmFja1F1ZXVlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYWxsYmFja1F1ZXVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RmVhdHVyZUZsYWdzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RGZWF0dXJlRmxhZ3MgPSB7XG4gIC8vIFdoZW4gdHJ1ZSwgY2FsbCBjb25zb2xlLnRpbWUoKSBiZWZvcmUgYW5kIC50aW1lRW5kKCkgYWZ0ZXIgZWFjaCB0b3AtbGV2ZWxcbiAgLy8gcmVuZGVyIChib3RoIGluaXRpYWwgcmVuZGVycyBhbmQgdXBkYXRlcykuIFVzZWZ1bCB3aGVuIGxvb2tpbmcgYXQgcHJvZC1tb2RlXG4gIC8vIHRpbWVsaW5lIHByb2ZpbGVzIGluIENocm9tZSwgZm9yIGV4YW1wbGUuXG4gIGxvZ1RvcExldmVsUmVuZGVyczogZmFsc2Vcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RGZWF0dXJlRmxhZ3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RmVhdHVyZUZsYWdzLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UmVjb25jaWxlclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UmVmID0gcmVxdWlyZSgnLi9SZWFjdFJlZicpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG4vKipcbiAqIEhlbHBlciB0byBjYWxsIFJlYWN0UmVmLmF0dGFjaFJlZnMgd2l0aCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQsIHNwbGl0IG91dFxuICogdG8gYXZvaWQgYWxsb2NhdGlvbnMgaW4gdGhlIHRyYW5zYWN0aW9uIG1vdW50LXJlYWR5IHF1ZXVlLlxuICovXG5mdW5jdGlvbiBhdHRhY2hSZWZzKCkge1xuICBSZWFjdFJlZi5hdHRhY2hSZWZzKHRoaXMsIHRoaXMuX2N1cnJlbnRFbGVtZW50KTtcbn1cblxudmFyIFJlYWN0UmVjb25jaWxlciA9IHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCwgcmVuZGVycyBtYXJrdXAsIGFuZCByZWdpc3RlcnMgZXZlbnQgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBpbnRlcm5hbEluc3RhbmNlXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9vYmplY3R9IHRoZSBjb250YWluaW5nIG5hdGl2ZSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBpbmZvIGFib3V0IHRoZSBuYXRpdmUgY29udGFpbmVyXG4gICAqIEByZXR1cm4gez9zdHJpbmd9IFJlbmRlcmVkIG1hcmt1cCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBET00uXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgdHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHZhciBtYXJrdXAgPSBpbnRlcm5hbEluc3RhbmNlLm1vdW50Q29tcG9uZW50KHRyYW5zYWN0aW9uLCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIGNvbnRleHQpO1xuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudCAmJiBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC5yZWYgIT0gbnVsbCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShhdHRhY2hSZWZzLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbk1vdW50Q29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmFsdWUgdGhhdCBjYW4gYmUgcGFzc2VkIHRvXG4gICAqIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwLlxuICAgKi9cbiAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxJbnN0YW5jZS5nZXROYXRpdmVOb2RlKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIGFueSByZXNvdXJjZXMgYWxsb2NhdGVkIGJ5IGBtb3VudENvbXBvbmVudGAuXG4gICAqXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBzYWZlbHkpIHtcbiAgICBSZWFjdFJlZi5kZXRhY2hSZWZzKGludGVybmFsSW5zdGFuY2UsIGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50KTtcbiAgICBpbnRlcm5hbEluc3RhbmNlLnVubW91bnRDb21wb25lbnQoc2FmZWx5KTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVW5tb3VudENvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGNvbXBvbmVudCB1c2luZyBhIG5ldyBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBpbnRlcm5hbEluc3RhbmNlXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0RWxlbWVudFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBwcmV2RWxlbWVudCA9IGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuXG4gICAgaWYgKG5leHRFbGVtZW50ID09PSBwcmV2RWxlbWVudCAmJiBjb250ZXh0ID09PSBpbnRlcm5hbEluc3RhbmNlLl9jb250ZXh0KSB7XG4gICAgICAvLyBTaW5jZSBlbGVtZW50cyBhcmUgaW1tdXRhYmxlIGFmdGVyIHRoZSBvd25lciBpcyByZW5kZXJlZCxcbiAgICAgIC8vIHdlIGNhbiBkbyBhIGNoZWFwIGlkZW50aXR5IGNvbXBhcmUgaGVyZSB0byBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhXG4gICAgICAvLyBzdXBlcmZsdW91cyByZWNvbmNpbGUuIEl0J3MgcG9zc2libGUgZm9yIHN0YXRlIHRvIGJlIG11dGFibGUgYnV0IHN1Y2hcbiAgICAgIC8vIGNoYW5nZSBzaG91bGQgdHJpZ2dlciBhbiB1cGRhdGUgb2YgdGhlIG93bmVyIHdoaWNoIHdvdWxkIHJlY3JlYXRlXG4gICAgICAvLyB0aGUgZWxlbWVudC4gV2UgZXhwbGljaXRseSBjaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhbiBvd25lciBzaW5jZVxuICAgICAgLy8gaXQncyBwb3NzaWJsZSBmb3IgYW4gZWxlbWVudCBjcmVhdGVkIG91dHNpZGUgYSBjb21wb3NpdGUgdG8gYmVcbiAgICAgIC8vIGRlZXBseSBtdXRhdGVkIGFuZCByZXVzZWQuXG5cbiAgICAgIC8vIFRPRE86IEJhaWxpbmcgb3V0IGVhcmx5IGlzIGp1c3QgYSBwZXJmIG9wdGltaXphdGlvbiByaWdodD9cbiAgICAgIC8vIFRPRE86IFJlbW92aW5nIHRoZSByZXR1cm4gc3RhdGVtZW50IHNob3VsZCBhZmZlY3QgY29ycmVjdG5lc3M/XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZnNDaGFuZ2VkID0gUmVhY3RSZWYuc2hvdWxkVXBkYXRlUmVmcyhwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpO1xuXG4gICAgaWYgKHJlZnNDaGFuZ2VkKSB7XG4gICAgICBSZWFjdFJlZi5kZXRhY2hSZWZzKGludGVybmFsSW5zdGFuY2UsIHByZXZFbGVtZW50KTtcbiAgICB9XG5cbiAgICBpbnRlcm5hbEluc3RhbmNlLnJlY2VpdmVDb21wb25lbnQobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcblxuICAgIGlmIChyZWZzQ2hhbmdlZCAmJiBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudCAmJiBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC5yZWYgIT0gbnVsbCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShhdHRhY2hSZWZzLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVXBkYXRlQ29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmx1c2ggYW55IGRpcnR5IGNoYW5nZXMgaW4gYSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGludGVybmFsSW5zdGFuY2VcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeTogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIHRyYW5zYWN0aW9uKSB7XG4gICAgaW50ZXJuYWxJbnN0YW5jZS5wZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkodHJhbnNhY3Rpb24pO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25VcGRhdGVDb21wb25lbnQoaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RSZWNvbmNpbGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFJlY29uY2lsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RSZWZcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdE93bmVyJyk7XG5cbnZhciBSZWFjdFJlZiA9IHt9O1xuXG5mdW5jdGlvbiBhdHRhY2hSZWYocmVmLCBjb21wb25lbnQsIG93bmVyKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZWdhY3kgcmVmXG4gICAgUmVhY3RPd25lci5hZGRDb21wb25lbnRBc1JlZlRvKGNvbXBvbmVudCwgcmVmLCBvd25lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGV0YWNoUmVmKHJlZiwgY29tcG9uZW50LCBvd25lcikge1xuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZihudWxsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZWdhY3kgcmVmXG4gICAgUmVhY3RPd25lci5yZW1vdmVDb21wb25lbnRBc1JlZkZyb20oY29tcG9uZW50LCByZWYsIG93bmVyKTtcbiAgfVxufVxuXG5SZWFjdFJlZi5hdHRhY2hSZWZzID0gZnVuY3Rpb24gKGluc3RhbmNlLCBlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgYXR0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxuUmVhY3RSZWYuc2hvdWxkVXBkYXRlUmVmcyA9IGZ1bmN0aW9uIChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpIHtcbiAgLy8gSWYgZWl0aGVyIHRoZSBvd25lciBvciBhIGByZWZgIGhhcyBjaGFuZ2VkLCBtYWtlIHN1cmUgdGhlIG5ld2VzdCBvd25lclxuICAvLyBoYXMgc3RvcmVkIGEgcmVmZXJlbmNlIHRvIGB0aGlzYCwgYW5kIHRoZSBwcmV2aW91cyBvd25lciAoaWYgZGlmZmVyZW50KVxuICAvLyBoYXMgZm9yZ290dGVuIHRoZSByZWZlcmVuY2UgdG8gYHRoaXNgLiBXZSB1c2UgdGhlIGVsZW1lbnQgaW5zdGVhZFxuICAvLyBvZiB0aGUgcHVibGljIHRoaXMucHJvcHMgYmVjYXVzZSB0aGUgcG9zdCBwcm9jZXNzaW5nIGNhbm5vdCBkZXRlcm1pbmVcbiAgLy8gYSByZWYuIFRoZSByZWYgY29uY2VwdHVhbGx5IGxpdmVzIG9uIHRoZSBlbGVtZW50LlxuXG4gIC8vIFRPRE86IFNob3VsZCB0aGlzIGV2ZW4gYmUgcG9zc2libGU/IFRoZSBvd25lciBjYW5ub3QgY2hhbmdlIGJlY2F1c2VcbiAgLy8gaXQncyBmb3JiaWRkZW4gYnkgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuIFRoZSByZWYgY2FuIGNoYW5nZVxuICAvLyBpZiB5b3Ugc3dhcCB0aGUga2V5cyBvZiBidXQgbm90IHRoZSByZWZzLiBSZWNvbnNpZGVyIHdoZXJlIHRoaXMgY2hlY2tcbiAgLy8gaXMgbWFkZS4gSXQgcHJvYmFibHkgYmVsb25ncyB3aGVyZSB0aGUga2V5IGNoZWNraW5nIGFuZFxuICAvLyBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IGlzIGRvbmUuXG5cbiAgdmFyIHByZXZFbXB0eSA9IHByZXZFbGVtZW50ID09PSBudWxsIHx8IHByZXZFbGVtZW50ID09PSBmYWxzZTtcbiAgdmFyIG5leHRFbXB0eSA9IG5leHRFbGVtZW50ID09PSBudWxsIHx8IG5leHRFbGVtZW50ID09PSBmYWxzZTtcblxuICByZXR1cm4oXG4gICAgLy8gVGhpcyBoYXMgYSBmZXcgZmFsc2UgcG9zaXRpdmVzIHcvci90IGVtcHR5IGNvbXBvbmVudHMuXG4gICAgcHJldkVtcHR5IHx8IG5leHRFbXB0eSB8fCBuZXh0RWxlbWVudC5fb3duZXIgIT09IHByZXZFbGVtZW50Ll9vd25lciB8fCBuZXh0RWxlbWVudC5yZWYgIT09IHByZXZFbGVtZW50LnJlZlxuICApO1xufTtcblxuUmVhY3RSZWYuZGV0YWNoUmVmcyA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIGlmIChyZWYgIT0gbnVsbCkge1xuICAgIGRldGFjaFJlZihyZWYsIGluc3RhbmNlLCBlbGVtZW50Ll9vd25lcik7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RSZWY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UmVmLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0T3duZXJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZWFjdE93bmVycyBhcmUgY2FwYWJsZSBvZiBzdG9yaW5nIHJlZmVyZW5jZXMgdG8gb3duZWQgY29tcG9uZW50cy5cbiAqXG4gKiBBbGwgY29tcG9uZW50cyBhcmUgY2FwYWJsZSBvZiAvL2JlaW5nLy8gcmVmZXJlbmNlZCBieSBvd25lciBjb21wb25lbnRzLCBidXRcbiAqIG9ubHkgUmVhY3RPd25lciBjb21wb25lbnRzIGFyZSBjYXBhYmxlIG9mIC8vcmVmZXJlbmNpbmcvLyBvd25lZCBjb21wb25lbnRzLlxuICogVGhlIG5hbWVkIHJlZmVyZW5jZSBpcyBrbm93biBhcyBhIFwicmVmXCIuXG4gKlxuICogUmVmcyBhcmUgYXZhaWxhYmxlIHdoZW4gbW91bnRlZCBhbmQgdXBkYXRlZCBkdXJpbmcgcmVjb25jaWxpYXRpb24uXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiAoXG4gKiAgICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gKiAgICAgICAgICAgPEN1c3RvbUNvbXBvbmVudCByZWY9XCJjdXN0b21cIiAvPlxuICogICAgICAgICA8L2Rpdj5cbiAqICAgICAgICk7XG4gKiAgICAgfSxcbiAqICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24oKSB7XG4gKiAgICAgICB0aGlzLnJlZnMuY3VzdG9tLmhhbmRsZUNsaWNrKCk7XG4gKiAgICAgfSxcbiAqICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gKiAgICAgICB0aGlzLnJlZnMuY3VzdG9tLmluaXRpYWxpemUoKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFJlZnMgc2hvdWxkIHJhcmVseSBiZSB1c2VkLiBXaGVuIHJlZnMgYXJlIHVzZWQsIHRoZXkgc2hvdWxkIG9ubHkgYmUgZG9uZSB0b1xuICogY29udHJvbCBkYXRhIHRoYXQgaXMgbm90IGhhbmRsZWQgYnkgUmVhY3QncyBkYXRhIGZsb3cuXG4gKlxuICogQGNsYXNzIFJlYWN0T3duZXJcbiAqL1xudmFyIFJlYWN0T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBvd25lci5cbiAgICogQGZpbmFsXG4gICAqL1xuICBpc1ZhbGlkT3duZXI6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gISEob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QuYXR0YWNoUmVmID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmplY3QuZGV0YWNoUmVmID09PSAnZnVuY3Rpb24nKTtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIGNvbXBvbmVudCBieSByZWYgdG8gYW4gb3duZXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjb21wb25lbnQgQ29tcG9uZW50IHRvIHJlZmVyZW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBOYW1lIGJ5IHdoaWNoIHRvIHJlZmVyIHRvIHRoZSBjb21wb25lbnQuXG4gICAqIEBwYXJhbSB7UmVhY3RPd25lcn0gb3duZXIgQ29tcG9uZW50IG9uIHdoaWNoIHRvIHJlY29yZCB0aGUgcmVmLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICBhZGRDb21wb25lbnRBc1JlZlRvOiBmdW5jdGlvbiAoY29tcG9uZW50LCByZWYsIG93bmVyKSB7XG4gICAgIVJlYWN0T3duZXIuaXNWYWxpZE93bmVyKG93bmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdhZGRDb21wb25lbnRBc1JlZlRvKC4uLik6IE9ubHkgYSBSZWFjdE93bmVyIGNhbiBoYXZlIHJlZnMuIFlvdSBtaWdodCAnICsgJ2JlIGFkZGluZyBhIHJlZiB0byBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgY3JlYXRlZCBpbnNpZGUgYSBjb21wb25lbnRcXCdzICcgKyAnYHJlbmRlcmAgbWV0aG9kLCBvciB5b3UgaGF2ZSBtdWx0aXBsZSBjb3BpZXMgb2YgUmVhY3QgbG9hZGVkICcgKyAnKGRldGFpbHM6IGh0dHBzOi8vZmIubWUvcmVhY3QtcmVmcy1tdXN0LWhhdmUtb3duZXIpLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBvd25lci5hdHRhY2hSZWYocmVmLCBjb21wb25lbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY29tcG9uZW50IGJ5IHJlZiBmcm9tIGFuIG93bmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byBkZXJlZmVyZW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBOYW1lIG9mIHRoZSByZWYgdG8gcmVtb3ZlLlxuICAgKiBAcGFyYW0ge1JlYWN0T3duZXJ9IG93bmVyIENvbXBvbmVudCBvbiB3aGljaCB0aGUgcmVmIGlzIHJlY29yZGVkLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICByZW1vdmVDb21wb25lbnRBc1JlZkZyb206IGZ1bmN0aW9uIChjb21wb25lbnQsIHJlZiwgb3duZXIpIHtcbiAgICAhUmVhY3RPd25lci5pc1ZhbGlkT3duZXIob3duZXIpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3JlbW92ZUNvbXBvbmVudEFzUmVmRnJvbSguLi4pOiBPbmx5IGEgUmVhY3RPd25lciBjYW4gaGF2ZSByZWZzLiBZb3UgbWlnaHQgJyArICdiZSByZW1vdmluZyBhIHJlZiB0byBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgY3JlYXRlZCBpbnNpZGUgYSBjb21wb25lbnRcXCdzICcgKyAnYHJlbmRlcmAgbWV0aG9kLCBvciB5b3UgaGF2ZSBtdWx0aXBsZSBjb3BpZXMgb2YgUmVhY3QgbG9hZGVkICcgKyAnKGRldGFpbHM6IGh0dHBzOi8vZmIubWUvcmVhY3QtcmVmcy1tdXN0LWhhdmUtb3duZXIpLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgb3duZXJQdWJsaWNJbnN0YW5jZSA9IG93bmVyLmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgLy8gQ2hlY2sgdGhhdCBgY29tcG9uZW50YCdzIG93bmVyIGlzIHN0aWxsIGFsaXZlIGFuZCB0aGF0IGBjb21wb25lbnRgIGlzIHN0aWxsIHRoZSBjdXJyZW50IHJlZlxuICAgIC8vIGJlY2F1c2Ugd2UgZG8gbm90IHdhbnQgdG8gZGV0YWNoIHRoZSByZWYgaWYgYW5vdGhlciBjb21wb25lbnQgc3RvbGUgaXQuXG4gICAgaWYgKG93bmVyUHVibGljSW5zdGFuY2UgJiYgb3duZXJQdWJsaWNJbnN0YW5jZS5yZWZzW3JlZl0gPT09IGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKSB7XG4gICAgICBvd25lci5kZXRhY2hSZWYocmVmKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE93bmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE93bmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFRyYW5zYWN0aW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogYFRyYW5zYWN0aW9uYCBjcmVhdGVzIGEgYmxhY2sgYm94IHRoYXQgaXMgYWJsZSB0byB3cmFwIGFueSBtZXRob2Qgc3VjaCB0aGF0XG4gKiBjZXJ0YWluIGludmFyaWFudHMgYXJlIG1haW50YWluZWQgYmVmb3JlIGFuZCBhZnRlciB0aGUgbWV0aG9kIGlzIGludm9rZWRcbiAqIChFdmVuIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gd2hpbGUgaW52b2tpbmcgdGhlIHdyYXBwZWQgbWV0aG9kKS4gV2hvZXZlclxuICogaW5zdGFudGlhdGVzIGEgdHJhbnNhY3Rpb24gY2FuIHByb3ZpZGUgZW5mb3JjZXJzIG9mIHRoZSBpbnZhcmlhbnRzIGF0XG4gKiBjcmVhdGlvbiB0aW1lLiBUaGUgYFRyYW5zYWN0aW9uYCBjbGFzcyBpdHNlbGYgd2lsbCBzdXBwbHkgb25lIGFkZGl0aW9uYWxcbiAqIGF1dG9tYXRpYyBpbnZhcmlhbnQgZm9yIHlvdSAtIHRoZSBpbnZhcmlhbnQgdGhhdCBhbnkgdHJhbnNhY3Rpb24gaW5zdGFuY2VcbiAqIHNob3VsZCBub3QgYmUgcnVuIHdoaWxlIGl0IGlzIGFscmVhZHkgYmVpbmcgcnVuLiBZb3Ugd291bGQgdHlwaWNhbGx5IGNyZWF0ZSBhXG4gKiBzaW5nbGUgaW5zdGFuY2Ugb2YgYSBgVHJhbnNhY3Rpb25gIGZvciByZXVzZSBtdWx0aXBsZSB0aW1lcywgdGhhdCBwb3RlbnRpYWxseVxuICogaXMgdXNlZCB0byB3cmFwIHNldmVyYWwgZGlmZmVyZW50IG1ldGhvZHMuIFdyYXBwZXJzIGFyZSBleHRyZW1lbHkgc2ltcGxlIC1cbiAqIHRoZXkgb25seSByZXF1aXJlIGltcGxlbWVudGluZyB0d28gbWV0aG9kcy5cbiAqXG4gKiA8cHJlPlxuICogICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXJzIChpbmplY3RlZCBhdCBjcmVhdGlvbiB0aW1lKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgICAgICAgICtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgIHYgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgICAgKy0tLS0tLS0tLS0tLS0tLSsgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgICstLXwgICAgd3JhcHBlcjEgICB8LS0tfC0tLS0rICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICArLS0tLS0tLS0tLS0tLS0tKyAgIHYgICAgfCAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgICAgICArLS0tLS0tLS0tLS0tLSsgIHwgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgICstLS0tfCAgIHdyYXBwZXIyICB8LS0tLS0tLS0rICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICAgICB8ICAgICstLS0tLS0tLS0tLS0tKyAgfCAgICAgfCAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgfCAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHYgICAgIHYgICAgICAgICAgICAgICAgICAgICB2ICAgICB2ICAgfCB3cmFwcGVyXG4gKiAgICAgICAgICAgICAgICAgICAgfCArLS0tKyArLS0tKyAgICstLS0tLS0tLS0rICAgKy0tLSsgKy0tLSsgfCBpbnZhcmlhbnRzXG4gKiBwZXJmb3JtKGFueU1ldGhvZCkgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfCBtYWludGFpbmVkXG4gKiArLS0tLS0tLS0tLS0tLS0tLS0+fC18LS0tfC18LS0tfC0tPnxhbnlNZXRob2R8LS0tfC0tLXwtfC0tLXwtfC0tLS0tLS0tPlxuICogICAgICAgICAgICAgICAgICAgIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHxcbiAqICAgICAgICAgICAgICAgICAgICB8IHwgICB8IHwgICB8ICAgfCAgICAgICAgIHwgICB8ICAgfCB8ICAgfCB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfFxuICogICAgICAgICAgICAgICAgICAgIHwgKy0tLSsgKy0tLSsgICArLS0tLS0tLS0tKyAgICstLS0rICstLS0rIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICBpbml0aWFsaXplICAgICAgICAgICAgICAgICAgICBjbG9zZSAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICogPC9wcmU+XG4gKlxuICogVXNlIGNhc2VzOlxuICogLSBQcmVzZXJ2aW5nIHRoZSBpbnB1dCBzZWxlY3Rpb24gcmFuZ2VzIGJlZm9yZS9hZnRlciByZWNvbmNpbGlhdGlvbi5cbiAqICAgUmVzdG9yaW5nIHNlbGVjdGlvbiBldmVuIGluIHRoZSBldmVudCBvZiBhbiB1bmV4cGVjdGVkIGVycm9yLlxuICogLSBEZWFjdGl2YXRpbmcgZXZlbnRzIHdoaWxlIHJlYXJyYW5naW5nIHRoZSBET00sIHByZXZlbnRpbmcgYmx1cnMvZm9jdXNlcyxcbiAqICAgd2hpbGUgZ3VhcmFudGVlaW5nIHRoYXQgYWZ0ZXJ3YXJkcywgdGhlIGV2ZW50IHN5c3RlbSBpcyByZWFjdGl2YXRlZC5cbiAqIC0gRmx1c2hpbmcgYSBxdWV1ZSBvZiBjb2xsZWN0ZWQgRE9NIG11dGF0aW9ucyB0byB0aGUgbWFpbiBVSSB0aHJlYWQgYWZ0ZXIgYVxuICogICByZWNvbmNpbGlhdGlvbiB0YWtlcyBwbGFjZSBpbiBhIHdvcmtlciB0aHJlYWQuXG4gKiAtIEludm9raW5nIGFueSBjb2xsZWN0ZWQgYGNvbXBvbmVudERpZFVwZGF0ZWAgY2FsbGJhY2tzIGFmdGVyIHJlbmRlcmluZyBuZXdcbiAqICAgY29udGVudC5cbiAqIC0gKEZ1dHVyZSB1c2UgY2FzZSk6IFdyYXBwaW5nIHBhcnRpY3VsYXIgZmx1c2hlcyBvZiB0aGUgYFJlYWN0V29ya2VyYCBxdWV1ZVxuICogICB0byBwcmVzZXJ2ZSB0aGUgYHNjcm9sbFRvcGAgKGFuIGF1dG9tYXRpYyBzY3JvbGwgYXdhcmUgRE9NKS5cbiAqIC0gKEZ1dHVyZSB1c2UgY2FzZSk6IExheW91dCBjYWxjdWxhdGlvbnMgYmVmb3JlIGFuZCBhZnRlciBET00gdXBkYXRlcy5cbiAqXG4gKiBUcmFuc2FjdGlvbmFsIHBsdWdpbiBBUEk6XG4gKiAtIEEgbW9kdWxlIHRoYXQgaGFzIGFuIGBpbml0aWFsaXplYCBtZXRob2QgdGhhdCByZXR1cm5zIGFueSBwcmVjb21wdXRhdGlvbi5cbiAqIC0gYW5kIGEgYGNsb3NlYCBtZXRob2QgdGhhdCBhY2NlcHRzIHRoZSBwcmVjb21wdXRhdGlvbi4gYGNsb3NlYCBpcyBpbnZva2VkXG4gKiAgIHdoZW4gdGhlIHdyYXBwZWQgcHJvY2VzcyBpcyBjb21wbGV0ZWQsIG9yIGhhcyBmYWlsZWQuXG4gKlxuICogQHBhcmFtIHtBcnJheTxUcmFuc2FjdGlvbmFsV3JhcHBlcj59IHRyYW5zYWN0aW9uV3JhcHBlciBXcmFwcGVyIG1vZHVsZXNcbiAqIHRoYXQgaW1wbGVtZW50IGBpbml0aWFsaXplYCBhbmQgYGNsb3NlYC5cbiAqIEByZXR1cm4ge1RyYW5zYWN0aW9ufSBTaW5nbGUgdHJhbnNhY3Rpb24gZm9yIHJldXNlIGluIHRocmVhZC5cbiAqXG4gKiBAY2xhc3MgVHJhbnNhY3Rpb25cbiAqL1xudmFyIE1peGluID0ge1xuICAvKipcbiAgICogU2V0cyB1cCB0aGlzIGluc3RhbmNlIHNvIHRoYXQgaXQgaXMgcHJlcGFyZWQgZm9yIGNvbGxlY3RpbmcgbWV0cmljcy4gRG9lc1xuICAgKiBzbyBzdWNoIHRoYXQgdGhpcyBzZXR1cCBtZXRob2QgbWF5IGJlIHVzZWQgb24gYW4gaW5zdGFuY2UgdGhhdCBpcyBhbHJlYWR5XG4gICAqIGluaXRpYWxpemVkLCBpbiBhIHdheSB0aGF0IGRvZXMgbm90IGNvbnN1bWUgYWRkaXRpb25hbCBtZW1vcnkgdXBvbiByZXVzZS5cbiAgICogVGhhdCBjYW4gYmUgdXNlZnVsIGlmIHlvdSBkZWNpZGUgdG8gbWFrZSB5b3VyIHN1YmNsYXNzIG9mIHRoaXMgbWl4aW4gYVxuICAgKiBcIlBvb2xlZENsYXNzXCIuXG4gICAqL1xuICByZWluaXRpYWxpemVUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycyA9IHRoaXMuZ2V0VHJhbnNhY3Rpb25XcmFwcGVycygpO1xuICAgIGlmICh0aGlzLndyYXBwZXJJbml0RGF0YSkge1xuICAgICAgdGhpcy53cmFwcGVySW5pdERhdGEubGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cmFwcGVySW5pdERhdGEgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5faXNJblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gIH0sXG5cbiAgX2lzSW5UcmFuc2FjdGlvbjogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcmV0dXJuIHtBcnJheTxUcmFuc2FjdGlvbldyYXBwZXI+fSBBcnJheSBvZiB0cmFuc2FjdGlvbiB3cmFwcGVycy5cbiAgICovXG4gIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IG51bGwsXG5cbiAgaXNJblRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5faXNJblRyYW5zYWN0aW9uO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgZnVuY3Rpb24gd2l0aGluIGEgc2FmZXR5IHdpbmRvdy4gVXNlIHRoaXMgZm9yIHRoZSB0b3AgbGV2ZWxcbiAgICogbWV0aG9kcyB0aGF0IHJlc3VsdCBpbiBsYXJnZSBhbW91bnRzIG9mIGNvbXB1dGF0aW9uL211dGF0aW9ucyB0aGF0IHdvdWxkXG4gICAqIG5lZWQgdG8gYmUgc2FmZXR5IGNoZWNrZWQuIFRoZSBvcHRpb25hbCBhcmd1bWVudHMgaGVscHMgcHJldmVudCB0aGUgbmVlZFxuICAgKiB0byBiaW5kIGluIG1hbnkgY2FzZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZCBNZW1iZXIgb2Ygc2NvcGUgdG8gY2FsbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlIFNjb3BlIHRvIGludm9rZSBmcm9tLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBhIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gYiBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGMgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBkIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gZSBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGYgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKlxuICAgKiBAcmV0dXJuIHsqfSBSZXR1cm4gdmFsdWUgZnJvbSBgbWV0aG9kYC5cbiAgICovXG4gIHBlcmZvcm06IGZ1bmN0aW9uIChtZXRob2QsIHNjb3BlLCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gICAgISF0aGlzLmlzSW5UcmFuc2FjdGlvbigpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyYW5zYWN0aW9uLnBlcmZvcm0oLi4uKTogQ2Fubm90IGluaXRpYWxpemUgYSB0cmFuc2FjdGlvbiB3aGVuIHRoZXJlICcgKyAnaXMgYWxyZWFkeSBhbiBvdXRzdGFuZGluZyB0cmFuc2FjdGlvbi4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIGVycm9yVGhyb3duO1xuICAgIHZhciByZXQ7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2lzSW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgICAvLyBDYXRjaGluZyBlcnJvcnMgbWFrZXMgZGVidWdnaW5nIG1vcmUgZGlmZmljdWx0LCBzbyB3ZSBzdGFydCB3aXRoXG4gICAgICAvLyBlcnJvclRocm93biBzZXQgdG8gdHJ1ZSBiZWZvcmUgc2V0dGluZyBpdCB0byBmYWxzZSBhZnRlciBjYWxsaW5nXG4gICAgICAvLyBjbG9zZSAtLSBpZiBpdCdzIHN0aWxsIHNldCB0byB0cnVlIGluIHRoZSBmaW5hbGx5IGJsb2NrLCBpdCBtZWFuc1xuICAgICAgLy8gb25lIG9mIHRoZXNlIGNhbGxzIHRocmV3LlxuICAgICAgZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgdGhpcy5pbml0aWFsaXplQWxsKDApO1xuICAgICAgcmV0ID0gbWV0aG9kLmNhbGwoc2NvcGUsIGEsIGIsIGMsIGQsIGUsIGYpO1xuICAgICAgZXJyb3JUaHJvd24gPSBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgLy8gSWYgYG1ldGhvZGAgdGhyb3dzLCBwcmVmZXIgdG8gc2hvdyB0aGF0IHN0YWNrIHRyYWNlIG92ZXIgYW55IHRocm93blxuICAgICAgICAgIC8vIGJ5IGludm9raW5nIGBjbG9zZUFsbGAuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGwoMCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbmNlIGBtZXRob2RgIGRpZG4ndCB0aHJvdywgd2UgZG9uJ3Qgd2FudCB0byBzaWxlbmNlIHRoZSBleGNlcHRpb25cbiAgICAgICAgICAvLyBoZXJlLlxuICAgICAgICAgIHRoaXMuY2xvc2VBbGwoMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuX2lzSW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIGluaXRpYWxpemVBbGw6IGZ1bmN0aW9uIChzdGFydEluZGV4KSB7XG4gICAgdmFyIHRyYW5zYWN0aW9uV3JhcHBlcnMgPSB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnM7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPCB0cmFuc2FjdGlvbldyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IHRyYW5zYWN0aW9uV3JhcHBlcnNbaV07XG4gICAgICB0cnkge1xuICAgICAgICAvLyBDYXRjaGluZyBlcnJvcnMgbWFrZXMgZGVidWdnaW5nIG1vcmUgZGlmZmljdWx0LCBzbyB3ZSBzdGFydCB3aXRoIHRoZVxuICAgICAgICAvLyBPQlNFUlZFRF9FUlJPUiBzdGF0ZSBiZWZvcmUgb3ZlcndyaXRpbmcgaXQgd2l0aCB0aGUgcmVhbCByZXR1cm4gdmFsdWVcbiAgICAgICAgLy8gb2YgaW5pdGlhbGl6ZSAtLSBpZiBpdCdzIHN0aWxsIHNldCB0byBPQlNFUlZFRF9FUlJPUiBpbiB0aGUgZmluYWxseVxuICAgICAgICAvLyBibG9jaywgaXQgbWVhbnMgd3JhcHBlci5pbml0aWFsaXplIHRocmV3LlxuICAgICAgICB0aGlzLndyYXBwZXJJbml0RGF0YVtpXSA9IFRyYW5zYWN0aW9uLk9CU0VSVkVEX0VSUk9SO1xuICAgICAgICB0aGlzLndyYXBwZXJJbml0RGF0YVtpXSA9IHdyYXBwZXIuaW5pdGlhbGl6ZSA/IHdyYXBwZXIuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpIDogbnVsbDtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZXJJbml0RGF0YVtpXSA9PT0gVHJhbnNhY3Rpb24uT0JTRVJWRURfRVJST1IpIHtcbiAgICAgICAgICAvLyBUaGUgaW5pdGlhbGl6ZXIgZm9yIHdyYXBwZXIgaSB0aHJldyBhbiBlcnJvcjsgaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgICAvLyByZW1haW5pbmcgd3JhcHBlcnMgYnV0IHNpbGVuY2UgYW55IGV4Y2VwdGlvbnMgZnJvbSB0aGVtIHRvIGVuc3VyZVxuICAgICAgICAgIC8vIHRoYXQgdGhlIGZpcnN0IGVycm9yIGlzIHRoZSBvbmUgdG8gYnViYmxlIHVwLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVBbGwoaSArIDEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSW52b2tlcyBlYWNoIG9mIGB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnMuY2xvc2VbaV1gIGZ1bmN0aW9ucywgcGFzc2luZyBpbnRvXG4gICAqIHRoZW0gdGhlIHJlc3BlY3RpdmUgcmV0dXJuIHZhbHVlcyBvZiBgdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzLmluaXRbaV1gXG4gICAqIChgY2xvc2VgcnMgdGhhdCBjb3JyZXNwb25kIHRvIGluaXRpYWxpemVycyB0aGF0IGZhaWxlZCB3aWxsIG5vdCBiZVxuICAgKiBpbnZva2VkKS5cbiAgICovXG4gIGNsb3NlQWxsOiBmdW5jdGlvbiAoc3RhcnRJbmRleCkge1xuICAgICF0aGlzLmlzSW5UcmFuc2FjdGlvbigpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyYW5zYWN0aW9uLmNsb3NlQWxsKCk6IENhbm5vdCBjbG9zZSB0cmFuc2FjdGlvbiB3aGVuIG5vbmUgYXJlIG9wZW4uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciB0cmFuc2FjdGlvbldyYXBwZXJzID0gdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDwgdHJhbnNhY3Rpb25XcmFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0cmFuc2FjdGlvbldyYXBwZXJzW2ldO1xuICAgICAgdmFyIGluaXREYXRhID0gdGhpcy53cmFwcGVySW5pdERhdGFbaV07XG4gICAgICB2YXIgZXJyb3JUaHJvd247XG4gICAgICB0cnkge1xuICAgICAgICAvLyBDYXRjaGluZyBlcnJvcnMgbWFrZXMgZGVidWdnaW5nIG1vcmUgZGlmZmljdWx0LCBzbyB3ZSBzdGFydCB3aXRoXG4gICAgICAgIC8vIGVycm9yVGhyb3duIHNldCB0byB0cnVlIGJlZm9yZSBzZXR0aW5nIGl0IHRvIGZhbHNlIGFmdGVyIGNhbGxpbmdcbiAgICAgICAgLy8gY2xvc2UgLS0gaWYgaXQncyBzdGlsbCBzZXQgdG8gdHJ1ZSBpbiB0aGUgZmluYWxseSBibG9jaywgaXQgbWVhbnNcbiAgICAgICAgLy8gd3JhcHBlci5jbG9zZSB0aHJldy5cbiAgICAgICAgZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICBpZiAoaW5pdERhdGEgIT09IFRyYW5zYWN0aW9uLk9CU0VSVkVEX0VSUk9SICYmIHdyYXBwZXIuY2xvc2UpIHtcbiAgICAgICAgICB3cmFwcGVyLmNsb3NlLmNhbGwodGhpcywgaW5pdERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAvLyBUaGUgY2xvc2VyIGZvciB3cmFwcGVyIGkgdGhyZXcgYW4gZXJyb3I7IGNsb3NlIHRoZSByZW1haW5pbmdcbiAgICAgICAgICAvLyB3cmFwcGVycyBidXQgc2lsZW5jZSBhbnkgZXhjZXB0aW9ucyBmcm9tIHRoZW0gdG8gZW5zdXJlIHRoYXQgdGhlXG4gICAgICAgICAgLy8gZmlyc3QgZXJyb3IgaXMgdGhlIG9uZSB0byBidWJibGUgdXAuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGwoaSArIDEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy53cmFwcGVySW5pdERhdGEubGVuZ3RoID0gMDtcbiAgfVxufTtcblxudmFyIFRyYW5zYWN0aW9uID0ge1xuXG4gIE1peGluOiBNaXhpbixcblxuICAvKipcbiAgICogVG9rZW4gdG8gbG9vayBmb3IgdG8gZGV0ZXJtaW5lIGlmIGFuIGVycm9yIG9jY3VycmVkLlxuICAgKi9cbiAgT0JTRVJWRURfRVJST1I6IHt9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNhY3Rpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1RyYW5zYWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbXB0eUNvbXBvbmVudCcpO1xudmFyIFJlYWN0TmF0aXZlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdE5hdGl2ZUNvbXBvbmVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLy8gVG8gYXZvaWQgYSBjeWNsaWMgZGVwZW5kZW5jeSwgd2UgY3JlYXRlIHRoZSBmaW5hbCBjbGFzcyBpbiB0aGlzIG1vZHVsZVxudmFyIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50V3JhcHBlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHRoaXMuY29uc3RydWN0KGVsZW1lbnQpO1xufTtcbl9hc3NpZ24oUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyLnByb3RvdHlwZSwgUmVhY3RDb21wb3NpdGVDb21wb25lbnQuTWl4aW4sIHtcbiAgX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnRcbn0pO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0ob3duZXIpIHtcbiAgaWYgKG93bmVyKSB7XG4gICAgdmFyIG5hbWUgPSBvd25lci5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdHlwZSByZWZlcmVuY2UgaXMgYSBrbm93biBpbnRlcm5hbCB0eXBlLiBJLmUuIG5vdCBhIHVzZXJcbiAqIHByb3ZpZGVkIGNvbXBvc2l0ZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGlzIGlzIGEgdmFsaWQgaW50ZXJuYWwgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaXNJbnRlcm5hbENvbXBvbmVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUucHJvdG90eXBlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUubW91bnRDb21wb25lbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUucHJvdG90eXBlLnJlY2VpdmVDb21wb25lbnQgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogR2l2ZW4gYSBSZWFjdE5vZGUsIGNyZWF0ZSBhbiBpbnN0YW5jZSB0aGF0IHdpbGwgYWN0dWFsbHkgYmUgbW91bnRlZC5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZVxuICogQHJldHVybiB7b2JqZWN0fSBBIG5ldyBpbnN0YW5jZSBvZiB0aGUgZWxlbWVudCdzIGNvbnN0cnVjdG9yLlxuICogQHByb3RlY3RlZFxuICovXG5mdW5jdGlvbiBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5vZGUpIHtcbiAgdmFyIGluc3RhbmNlO1xuXG4gIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IGZhbHNlKSB7XG4gICAgaW5zdGFuY2UgPSBSZWFjdEVtcHR5Q29tcG9uZW50LmNyZWF0ZShpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGU7XG4gICAgIShlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRWxlbWVudCB0eXBlIGlzIGludmFsaWQ6IGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgYnVpbHQtaW4gY29tcG9uZW50cykgJyArICdvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlIGNvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgZWxlbWVudC50eXBlID09IG51bGwgPyBlbGVtZW50LnR5cGUgOiB0eXBlb2YgZWxlbWVudC50eXBlLCBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oZWxlbWVudC5fb3duZXIpKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2Ugc3RyaW5nIHZhbHVlc1xuICAgIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgaW5zdGFuY2UgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudC5jcmVhdGVJbnRlcm5hbENvbXBvbmVudChlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzSW50ZXJuYWxDb21wb25lbnRUeXBlKGVsZW1lbnQudHlwZSkpIHtcbiAgICAgIC8vIFRoaXMgaXMgdGVtcG9yYXJpbHkgYXZhaWxhYmxlIGZvciBjdXN0b20gY29tcG9uZW50cyB0aGF0IGFyZSBub3Qgc3RyaW5nXG4gICAgICAvLyByZXByZXNlbnRhdGlvbnMuIEkuZS4gQVJULiBPbmNlIHRob3NlIGFyZSB1cGRhdGVkIHRvIHVzZSB0aGUgc3RyaW5nXG4gICAgICAvLyByZXByZXNlbnRhdGlvbiwgd2UgY2FuIGRyb3AgdGhpcyBjb2RlIHBhdGguXG4gICAgICBpbnN0YW5jZSA9IG5ldyBlbGVtZW50LnR5cGUoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlID0gbmV3IFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50V3JhcHBlcihlbGVtZW50KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09PSAnbnVtYmVyJykge1xuICAgIGluc3RhbmNlID0gUmVhY3ROYXRpdmVDb21wb25lbnQuY3JlYXRlSW5zdGFuY2VGb3JUZXh0KG5vZGUpO1xuICB9IGVsc2Uge1xuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFbmNvdW50ZXJlZCBpbnZhbGlkIFJlYWN0IG5vZGUgb2YgdHlwZSAlcycsIHR5cGVvZiBub2RlKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0YW5jZS5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UucmVjZWl2ZUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UuZ2V0TmF0aXZlTm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UudW5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJywgJ09ubHkgUmVhY3QgQ29tcG9uZW50cyBjYW4gYmUgbW91bnRlZC4nKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIFRoZXNlIHR3byBmaWVsZHMgYXJlIHVzZWQgYnkgdGhlIERPTSBhbmQgQVJUIGRpZmZpbmcgYWxnb3JpdGhtc1xuICAvLyByZXNwZWN0aXZlbHkuIEluc3RlYWQgb2YgdXNpbmcgZXhwYW5kb3Mgb24gY29tcG9uZW50cywgd2Ugc2hvdWxkIGJlXG4gIC8vIHN0b3JpbmcgdGhlIHN0YXRlIG5lZWRlZCBieSB0aGUgZGlmZmluZyBhbGdvcml0aG1zIGVsc2V3aGVyZS5cbiAgaW5zdGFuY2UuX21vdW50SW5kZXggPSAwO1xuICBpbnN0YW5jZS5fbW91bnRJbWFnZSA9IG51bGw7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpbnN0YW5jZS5faXNPd25lck5lY2Vzc2FyeSA9IGZhbHNlO1xuICAgIGluc3RhbmNlLl93YXJuZWRBYm91dFJlZnNJblJlbmRlciA9IGZhbHNlO1xuICB9XG5cbiAgLy8gSW50ZXJuYWwgaW5zdGFuY2VzIHNob3VsZCBmdWxseSBjb25zdHJ1Y3RlZCBhdCB0aGlzIHBvaW50LCBzbyB0aGV5IHNob3VsZFxuICAvLyBub3QgZ2V0IGFueSBuZXcgZmllbGRzIGFkZGVkIHRvIHRoZW0gYXQgdGhpcyBwb2ludC5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKSB7XG4gICAgICBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoaW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0RXJyb3JVdGlscyA9IHJlcXVpcmUoJy4vUmVhY3RFcnJvclV0aWxzJyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xudmFyIFJlYWN0Tm9kZVR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdE5vZGVUeXBlcycpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJy4vUmVhY3RQZXJmJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9zaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShjb21wb25lbnQpIHtcbiAgdmFyIG93bmVyID0gY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5fb3duZXIgfHwgbnVsbDtcbiAgaWYgKG93bmVyKSB7XG4gICAgdmFyIG5hbWUgPSBvd25lci5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gU3RhdGVsZXNzQ29tcG9uZW50KENvbXBvbmVudCkge31cblN0YXRlbGVzc0NvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgQ29tcG9uZW50ID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQodGhpcykuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gIHZhciBlbGVtZW50ID0gQ29tcG9uZW50KHRoaXMucHJvcHMsIHRoaXMuY29udGV4dCwgdGhpcy51cGRhdGVyKTtcbiAgd2FybklmSW52YWxpZEVsZW1lbnQoQ29tcG9uZW50LCBlbGVtZW50KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiB3YXJuSWZJbnZhbGlkRWxlbWVudChDb21wb25lbnQsIGVsZW1lbnQpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSwgJyVzKC4uLik6IEEgdmFsaWQgUmVhY3QgZWxlbWVudCAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZC4gWW91IG1heSBoYXZlICcgKyAncmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIC0gY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICAtIGNvbXBvbmVudFdpbGxNb3VudFxuICogICAtIHJlbmRlclxuICogICAtIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgIC0gW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgLSBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICAtIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgLSBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgLSByZW5kZXJcbiAqICAgICAgICAgICAtIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgLSBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgLSBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgIC0gW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIEFuIGluY3JlbWVudGluZyBJRCBhc3NpZ25lZCB0byBlYWNoIGNvbXBvbmVudCB3aGVuIGl0IGlzIG1vdW50ZWQuIFRoaXMgaXNcbiAqIHVzZWQgdG8gZW5mb3JjZSB0aGUgb3JkZXIgaW4gd2hpY2ggYFJlYWN0VXBkYXRlc2AgdXBkYXRlcyBkaXJ0eSBjb21wb25lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBuZXh0TW91bnRJRCA9IDE7XG5cbi8qKlxuICogQGxlbmRzIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5wcm90b3R5cGV9XG4gKi9cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudE1peGluID0ge1xuXG4gIC8qKlxuICAgKiBCYXNlIGNvbnN0cnVjdG9yIGZvciBhbGwgY29tcG9zaXRlIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbnVsbDtcblxuICAgIC8vIFNlZSBSZWFjdFVwZGF0ZVF1ZXVlXG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbnVsbDtcbiAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5fbW91bnRPcmRlciA9IDA7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcblxuICAgIC8vIFNlZSBSZWFjdFVwZGF0ZXMgYW5kIFJlYWN0VXBkYXRlUXVldWUuXG4gICAgdGhpcy5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHJlbmRlcnMgbWFya3VwLCBhbmQgcmVnaXN0ZXJzIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmF0aXZlUGFyZW50XG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmF0aXZlQ29udGFpbmVySW5mb1xuICAgKiBAcGFyYW0gez9vYmplY3R9IGNvbnRleHRcbiAgICogQHJldHVybiB7P3N0cmluZ30gUmVuZGVyZWQgbWFya3VwIHRvIGJlIGluc2VydGVkIGludG8gdGhlIERPTS5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fbW91bnRPcmRlciA9IG5leHRNb3VudElEKys7XG4gICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbmF0aXZlUGFyZW50O1xuICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBuYXRpdmVDb250YWluZXJJbmZvO1xuXG4gICAgdmFyIHB1YmxpY1Byb3BzID0gdGhpcy5fcHJvY2Vzc1Byb3BzKHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzKTtcbiAgICB2YXIgcHVibGljQ29udGV4dCA9IHRoaXMuX3Byb2Nlc3NDb250ZXh0KGNvbnRleHQpO1xuXG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBwdWJsaWMgY2xhc3NcbiAgICB2YXIgaW5zdDtcbiAgICB2YXIgcmVuZGVyZWRFbGVtZW50O1xuXG4gICAgaWYgKENvbXBvbmVudC5wcm90b3R5cGUgJiYgQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QgPSBuZXcgQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCBSZWFjdFVwZGF0ZVF1ZXVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5zdCA9IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QgPSBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgfVxuICAgICAgaWYgKGluc3QgPT0gbnVsbCB8fCBpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIHJlbmRlcmVkRWxlbWVudCA9IGluc3Q7XG4gICAgICAgIHdhcm5JZkludmFsaWRFbGVtZW50KENvbXBvbmVudCwgcmVuZGVyZWRFbGVtZW50KTtcbiAgICAgICAgIShpbnN0ID09PSBudWxsIHx8IGluc3QgPT09IGZhbHNlIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChpbnN0KSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMoLi4uKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgJyArICdyZXR1cm5lZCB1bmRlZmluZWQsIGFuIGFycmF5IG9yIHNvbWUgb3RoZXIgaW52YWxpZCBvYmplY3QuJywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIGluc3QgPSBuZXcgU3RhdGVsZXNzQ29tcG9uZW50KENvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBsYXRlciBpbiBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50LCBidXQgYWRkIGFuIGVhcmx5XG4gICAgICAvLyB3YXJuaW5nIG5vdyB0byBoZWxwIGRlYnVnZ2luZ1xuICAgICAgaWYgKGluc3QucmVuZGVyID09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBObyBgcmVuZGVyYCBtZXRob2QgZm91bmQgb24gdGhlIHJldHVybmVkIGNvbXBvbmVudCAnICsgJ2luc3RhbmNlOiB5b3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIGRlZmluZSBgcmVuZGVyYC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcHNNdXRhdGVkID0gaW5zdC5wcm9wcyAhPT0gcHVibGljUHJvcHM7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaW5zdC5wcm9wcyA9PT0gdW5kZWZpbmVkIHx8ICFwcm9wc011dGF0ZWQsICclcyguLi4pOiBXaGVuIGNhbGxpbmcgc3VwZXIoKSBpbiBgJXNgLCBtYWtlIHN1cmUgdG8gcGFzcyAnICsgJ3VwIHRoZSBzYW1lIHByb3BzIHRoYXQgeW91ciBjb21wb25lbnRcXCdzIGNvbnN0cnVjdG9yIHdhcyBwYXNzZWQuJywgY29tcG9uZW50TmFtZSwgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gVGhlc2Ugc2hvdWxkIGJlIHNldCB1cCBpbiB0aGUgY29uc3RydWN0b3IsIGJ1dCBhcyBhIGNvbnZlbmllbmNlIGZvclxuICAgIC8vIHNpbXBsZXIgY2xhc3MgYWJzdHJhY3Rpb25zLCB3ZSBzZXQgdGhlbSB1cCBhZnRlciB0aGUgZmFjdC5cbiAgICBpbnN0LnByb3BzID0gcHVibGljUHJvcHM7XG4gICAgaW5zdC5jb250ZXh0ID0gcHVibGljQ29udGV4dDtcbiAgICBpbnN0LnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICBpbnN0LnVwZGF0ZXIgPSBSZWFjdFVwZGF0ZVF1ZXVlO1xuXG4gICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0O1xuXG4gICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgZnJvbSB0aGUgaW5zdGFuY2UgYmFjayB0byB0aGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAgICBSZWFjdEluc3RhbmNlTWFwLnNldChpbnN0LCB0aGlzKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBTaW5jZSBwbGFpbiBKUyBjbGFzc2VzIGFyZSBkZWZpbmVkIHdpdGhvdXQgYW55IHNwZWNpYWwgaW5pdGlhbGl6YXRpb25cbiAgICAgIC8vIGxvZ2ljLCB3ZSBjYW4gbm90IGNhdGNoIGNvbW1vbiBlcnJvcnMgZWFybHkuIFRoZXJlZm9yZSwgd2UgaGF2ZSB0b1xuICAgICAgLy8gY2F0Y2ggdGhlbSBoZXJlLCBhdCBpbml0aWFsaXphdGlvbiB0aW1lLCBpbnN0ZWFkLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QuZ2V0SW5pdGlhbFN0YXRlIHx8IGluc3QuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0SW5pdGlhbFN0YXRlIHdhcyBkZWZpbmVkIG9uICVzLCBhIHBsYWluIEphdmFTY3JpcHQgY2xhc3MuICcgKyAnVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgY2xhc3NlcyBjcmVhdGVkIHVzaW5nIFJlYWN0LmNyZWF0ZUNsYXNzLiAnICsgJ0RpZCB5b3UgbWVhbiB0byBkZWZpbmUgYSBzdGF0ZSBwcm9wZXJ0eSBpbnN0ZWFkPycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QuZ2V0RGVmYXVsdFByb3BzIHx8IGluc3QuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIHdhcyBkZWZpbmVkIG9uICVzLCBhIHBsYWluIEphdmFTY3JpcHQgY2xhc3MuICcgKyAnVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgY2xhc3NlcyBjcmVhdGVkIHVzaW5nIFJlYWN0LmNyZWF0ZUNsYXNzLiAnICsgJ1VzZSBhIHN0YXRpYyBwcm9wZXJ0eSB0byBkZWZpbmUgZGVmYXVsdFByb3BzIGluc3RlYWQuJywgdGhpcy5nZXROYW1lKCkgfHwgJ2EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaW5zdC5wcm9wVHlwZXMsICdwcm9wVHlwZXMgd2FzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgb24gJXMuIFVzZSBhIHN0YXRpYyAnICsgJ3Byb3BlcnR5IHRvIGRlZmluZSBwcm9wVHlwZXMgaW5zdGVhZC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmNvbnRleHRUeXBlcywgJ2NvbnRleHRUeXBlcyB3YXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBvbiAlcy4gVXNlIGEgJyArICdzdGF0aWMgcHJvcGVydHkgdG8gZGVmaW5lIGNvbnRleHRUeXBlcyBpbnN0ZWFkLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3QuY29tcG9uZW50U2hvdWxkVXBkYXRlICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgdGhpcy5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdC5jb21wb25lbnREaWRVbm1vdW50ICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudERpZFVubW91bnQoKS4gQnV0IHRoZXJlIGlzIG5vIHN1Y2ggbGlmZWN5Y2xlIG1ldGhvZC4gJyArICdEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFVubW91bnQoKT8nLCB0aGlzLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0LmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMgIT09ICdmdW5jdGlvbicsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsU3RhdGUgPSBpbnN0LnN0YXRlO1xuICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5zdC5zdGF0ZSA9IGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgfVxuICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuc3RhdGU6IG11c3QgYmUgc2V0IHRvIGFuIG9iamVjdCBvciBudWxsJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcblxuICAgIHZhciBtYXJrdXA7XG4gICAgaWYgKGluc3QudW5zdGFibGVfaGFuZGxlRXJyb3IpIHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudFdpdGhFcnJvckhhbmRsaW5nKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudChyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGlmIChpbnN0LmNvbXBvbmVudERpZE1vdW50KSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkTW91bnQsIGluc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgcGVyZm9ybUluaXRpYWxNb3VudFdpdGhFcnJvckhhbmRsaW5nOiBmdW5jdGlvbiAocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIG1hcmt1cDtcbiAgICB2YXIgY2hlY2twb2ludCA9IHRyYW5zYWN0aW9uLmNoZWNrcG9pbnQoKTtcbiAgICB0cnkge1xuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gUm9sbCBiYWNrIHRvIGNoZWNrcG9pbnQsIGhhbmRsZSBlcnJvciAod2hpY2ggbWF5IGFkZCBpdGVtcyB0byB0aGUgdHJhbnNhY3Rpb24pLCBhbmQgdGFrZSBhIG5ldyBjaGVja3BvaW50XG4gICAgICB0cmFuc2FjdGlvbi5yb2xsYmFjayhjaGVja3BvaW50KTtcbiAgICAgIHRoaXMuX2luc3RhbmNlLnVuc3RhYmxlX2hhbmRsZUVycm9yKGUpO1xuICAgICAgaWYgKHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlKSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLnN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZSh0aGlzLl9pbnN0YW5jZS5wcm9wcywgdGhpcy5faW5zdGFuY2UuY29udGV4dCk7XG4gICAgICB9XG4gICAgICBjaGVja3BvaW50ID0gdHJhbnNhY3Rpb24uY2hlY2twb2ludCgpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudC51bm1vdW50Q29tcG9uZW50KHRydWUpO1xuICAgICAgdHJhbnNhY3Rpb24ucm9sbGJhY2soY2hlY2twb2ludCk7XG5cbiAgICAgIC8vIFRyeSBhZ2FpbiAtIHdlJ3ZlIGluZm9ybWVkIHRoZSBjb21wb25lbnQgYWJvdXQgdGhlIGVycm9yLCBzbyB0aGV5IGNhbiByZW5kZXIgYW4gZXJyb3IgbWVzc2FnZSB0aGlzIHRpbWUuXG4gICAgICAvLyBJZiB0aGlzIHRocm93cyBhZ2FpbiwgdGhlIGVycm9yIHdpbGwgYnViYmxlIHVwIChhbmQgY2FuIGJlIGNhdWdodCBieSBhIGhpZ2hlciBlcnJvciBib3VuZGFyeSkuXG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSxcblxuICBwZXJmb3JtSW5pdGlhbE1vdW50OiBmdW5jdGlvbiAocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsTW91bnQpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAvLyBXaGVuIG1vdW50aW5nLCBjYWxscyB0byBgc2V0U3RhdGVgIGJ5IGBjb21wb25lbnRXaWxsTW91bnRgIHdpbGwgc2V0XG4gICAgICAvLyBgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWVgIHdpdGhvdXQgdHJpZ2dlcmluZyBhIHJlLXJlbmRlci5cbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSkge1xuICAgICAgICBpbnN0LnN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShpbnN0LnByb3BzLCBpbnN0LmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG5vdCBhIHN0YXRlbGVzcyBjb21wb25lbnQsIHdlIG5vdyByZW5kZXJcbiAgICBpZiAocmVuZGVyZWRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbmRlcmVkRWxlbWVudCA9IHRoaXMuX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVkTm9kZVR5cGUgPSBSZWFjdE5vZGVUeXBlcy5nZXRUeXBlKHJlbmRlcmVkRWxlbWVudCk7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KHJlbmRlcmVkRWxlbWVudCk7XG5cbiAgICB2YXIgbWFya3VwID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LCB0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KGNvbnRleHQpKTtcblxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZSh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIGFueSByZXNvdXJjZXMgYWxsb2NhdGVkIGJ5IGBtb3VudENvbXBvbmVudGAuXG4gICAqXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChzYWZlbHkpIHtcbiAgICBpZiAoIXRoaXMuX3JlbmRlcmVkQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudCkge1xuICAgICAgaWYgKHNhZmVseSkge1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpICsgJy5jb21wb25lbnRXaWxsVW5tb3VudCgpJztcbiAgICAgICAgUmVhY3RFcnJvclV0aWxzLmludm9rZUd1YXJkZWRDYWxsYmFjayhuYW1lLCBpbnN0LmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQoaW5zdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsIHNhZmVseSk7XG4gICAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBwZW5kaW5nIGZpZWxkc1xuICAgIC8vIEV2ZW4gaWYgdGhpcyBjb21wb25lbnQgaXMgc2NoZWR1bGVkIGZvciBhbm90aGVyIHVwZGF0ZSBpbiBSZWFjdFVwZGF0ZXMsXG4gICAgLy8gaXQgd291bGQgc3RpbGwgYmUgaWdub3JlZCBiZWNhdXNlIHRoZXNlIGZpZWxkcyBhcmUgcmVzZXQuXG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICAvLyBUaGVzZSBmaWVsZHMgZG8gbm90IHJlYWxseSBuZWVkIHRvIGJlIHJlc2V0IHNpbmNlIHRoaXMgb2JqZWN0IGlzIG5vXG4gICAgLy8gbG9uZ2VyIGFjY2Vzc2libGUuXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcblxuICAgIC8vIERlbGV0ZSB0aGUgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIHRvIHRoaXMgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAgICAvLyB3aGljaCBhbGxvdyB0aGUgaW50ZXJuYWxzIHRvIGJlIHByb3Blcmx5IGNsZWFuZWQgdXAgZXZlbiBpZiB0aGUgdXNlclxuICAgIC8vIGxlYWtzIGEgcmVmZXJlbmNlIHRvIHRoZSBwdWJsaWMgaW5zdGFuY2UuXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5yZW1vdmUoaW5zdCk7XG5cbiAgICAvLyBTb21lIGV4aXN0aW5nIGNvbXBvbmVudHMgcmVseSBvbiBpbnN0LnByb3BzIGV2ZW4gYWZ0ZXIgdGhleSd2ZSBiZWVuXG4gICAgLy8gZGVzdHJveWVkIChpbiBldmVudCBoYW5kbGVycykuXG4gICAgLy8gVE9ETzogaW5zdC5wcm9wcyA9IG51bGw7XG4gICAgLy8gVE9ETzogaW5zdC5zdGF0ZSA9IG51bGw7XG4gICAgLy8gVE9ETzogaW5zdC5jb250ZXh0ID0gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY29udGV4dCBvYmplY3QgdG8gb25seSBjb250YWluIGtleXMgc3BlY2lmaWVkIGluXG4gICAqIGBjb250ZXh0VHlwZXNgXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9vYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbWFza0NvbnRleHQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgdmFyIGNvbnRleHRUeXBlcyA9IENvbXBvbmVudC5jb250ZXh0VHlwZXM7XG4gICAgaWYgKCFjb250ZXh0VHlwZXMpIHtcbiAgICAgIHJldHVybiBlbXB0eU9iamVjdDtcbiAgICB9XG4gICAgdmFyIG1hc2tlZENvbnRleHQgPSB7fTtcbiAgICBmb3IgKHZhciBjb250ZXh0TmFtZSBpbiBjb250ZXh0VHlwZXMpIHtcbiAgICAgIG1hc2tlZENvbnRleHRbY29udGV4dE5hbWVdID0gY29udGV4dFtjb250ZXh0TmFtZV07XG4gICAgfVxuICAgIHJldHVybiBtYXNrZWRDb250ZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIHRoZSBjb250ZXh0IG9iamVjdCB0byBvbmx5IGNvbnRhaW4ga2V5cyBzcGVjaWZpZWQgaW5cbiAgICogYGNvbnRleHRUeXBlc2AsIGFuZCBhc3NlcnRzIHRoYXQgdGhleSBhcmUgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9vYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc0NvbnRleHQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIG1hc2tlZENvbnRleHQgPSB0aGlzLl9tYXNrQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgICBpZiAoQ29tcG9uZW50LmNvbnRleHRUeXBlcykge1xuICAgICAgICB0aGlzLl9jaGVja1Byb3BUeXBlcyhDb21wb25lbnQuY29udGV4dFR5cGVzLCBtYXNrZWRDb250ZXh0LCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnRDb250ZXh0XG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wcm9jZXNzQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoY3VycmVudENvbnRleHQpIHtcbiAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQoKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkQ29udGV4dCA9IGluc3QuZ2V0Q2hpbGRDb250ZXh0ICYmIGluc3QuZ2V0Q2hpbGRDb250ZXh0KCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQoKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkQ29udGV4dCkge1xuICAgICAgISh0eXBlb2YgQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0Q2hpbGRDb250ZXh0KCk6IGNoaWxkQ29udGV4dFR5cGVzIG11c3QgYmUgZGVmaW5lZCBpbiBvcmRlciB0byAnICsgJ3VzZSBnZXRDaGlsZENvbnRleHQoKS4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB0aGlzLl9jaGVja1Byb3BUeXBlcyhDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dCwgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jaGlsZENvbnRleHQpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgbmFtZSBpbiBjaGlsZENvbnRleHQpIHtcbiAgICAgICAgIShuYW1lIGluIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0Q2hpbGRDb250ZXh0KCk6IGtleSBcIiVzXCIgaXMgbm90IGRlZmluZWQgaW4gY2hpbGRDb250ZXh0VHlwZXMuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9hc3NpZ24oe30sIGN1cnJlbnRDb250ZXh0LCBjaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudENvbnRleHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBwcm9wcyBieSBzZXR0aW5nIGRlZmF1bHQgdmFsdWVzIGZvciB1bnNwZWNpZmllZCBwcm9wcyBhbmRcbiAgICogYXNzZXJ0aW5nIHRoYXQgdGhlIHByb3BzIGFyZSB2YWxpZC4gRG9lcyBub3QgbXV0YXRlIGl0cyBhcmd1bWVudDsgcmV0dXJuc1xuICAgKiBhIG5ldyBwcm9wcyBvYmplY3Qgd2l0aCBkZWZhdWx0cyBtZXJnZWQgaW4uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQcm9wc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc1Byb3BzOiBmdW5jdGlvbiAobmV3UHJvcHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgICBpZiAoQ29tcG9uZW50LnByb3BUeXBlcykge1xuICAgICAgICB0aGlzLl9jaGVja1Byb3BUeXBlcyhDb21wb25lbnQucHJvcFR5cGVzLCBuZXdQcm9wcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1Byb3BzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCB0aGUgcHJvcHMgYXJlIHZhbGlkXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wVHlwZXMgTWFwIG9mIHByb3AgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja1Byb3BUeXBlczogZnVuY3Rpb24gKHByb3BUeXBlcywgcHJvcHMsIGxvY2F0aW9uKSB7XG4gICAgLy8gVE9ETzogU3RvcCB2YWxpZGF0aW5nIHByb3AgdHlwZXMgaGVyZSBhbmQgb25seSB1c2UgdGhlIGVsZW1lbnRcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHZhciBjb21wb25lbnROYW1lID0gdGhpcy5nZXROYW1lKCk7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgICBpZiAocHJvcFR5cGVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgICEodHlwZW9mIHByb3BUeXBlc1twcm9wTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5ICcgKyAnZnJvbSBSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgICAgZXJyb3IgPSBwcm9wVHlwZXNbcHJvcE5hbWVdKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24pO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAvLyBXZSBtYXkgd2FudCB0byBleHRlbmQgdGhpcyBsb2dpYyBmb3Igc2ltaWxhciBlcnJvcnMgaW5cbiAgICAgICAgICAvLyB0b3AtbGV2ZWwgcmVuZGVyIGNhbGxzLCBzbyBJJ20gYWJzdHJhY3RpbmcgaXQgYXdheSBpbnRvXG4gICAgICAgICAgLy8gYSBmdW5jdGlvbiB0byBtaW5pbWl6ZSByZWZhY3RvcmluZyBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgdmFyIGFkZGVuZHVtID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKGxvY2F0aW9uID09PSBSZWFjdFByb3BUeXBlTG9jYXRpb25zLnByb3ApIHtcbiAgICAgICAgICAgIC8vIFByZWZhY2UgZ2l2ZXMgdXMgc29tZXRoaW5nIHRvIGJsYWNrbGlzdCBpbiB3YXJuaW5nIG1vZHVsZVxuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAlcyVzJywgZXJyb3IubWVzc2FnZSwgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCBDb250ZXh0IFR5cGVzOiAlcyVzJywgZXJyb3IubWVzc2FnZSwgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBuZXh0Q29udGV4dCkge1xuICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgIHZhciBwcmV2Q29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG5cbiAgICB0aGlzLl9wZW5kaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBwcmV2Q29udGV4dCwgbmV4dENvbnRleHQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJZiBhbnkgb2YgYF9wZW5kaW5nRWxlbWVudGAsIGBfcGVuZGluZ1N0YXRlUXVldWVgLCBvciBgX3BlbmRpbmdGb3JjZVVwZGF0ZWBcbiAgICogaXMgc2V0LCB1cGRhdGUgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeTogZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XG4gICAgaWYgKHRoaXMuX3BlbmRpbmdFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci5yZWNlaXZlQ29tcG9uZW50KHRoaXMsIHRoaXMuX3BlbmRpbmdFbGVtZW50LCB0cmFuc2FjdGlvbiwgdGhpcy5fY29udGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlICE9PSBudWxsIHx8IHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHRoaXMuX2N1cnJlbnRFbGVtZW50LCB0aGlzLl9jdXJyZW50RWxlbWVudCwgdGhpcy5fY29udGV4dCwgdGhpcy5fY29udGV4dCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGFuIHVwZGF0ZSB0byBhIG1vdW50ZWQgY29tcG9uZW50LiBUaGUgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyBhbmRcbiAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlIG1ldGhvZHMgYXJlIGNhbGxlZCwgdGhlbiAoYXNzdW1pbmcgdGhlIHVwZGF0ZSBpc24ndFxuICAgKiBza2lwcGVkKSB0aGUgcmVtYWluaW5nIHVwZGF0ZSBsaWZlY3ljbGUgbWV0aG9kcyBhcmUgY2FsbGVkIGFuZCB0aGUgRE9NXG4gICAqIHJlcHJlc2VudGF0aW9uIGlzIHVwZGF0ZWQuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gcHJldlBhcmVudEVsZW1lbnRcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRQYXJlbnRFbGVtZW50XG4gICAqIEBpbnRlcm5hbFxuICAgKiBAb3ZlcnJpZGFibGVcbiAgICovXG4gIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2UGFyZW50RWxlbWVudCwgbmV4dFBhcmVudEVsZW1lbnQsIHByZXZVbm1hc2tlZENvbnRleHQsIG5leHRVbm1hc2tlZENvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIHZhciB3aWxsUmVjZWl2ZSA9IGZhbHNlO1xuICAgIHZhciBuZXh0Q29udGV4dDtcbiAgICB2YXIgbmV4dFByb3BzO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBjb250ZXh0IGhhcyBjaGFuZ2VkIG9yIG5vdFxuICAgIGlmICh0aGlzLl9jb250ZXh0ID09PSBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgICBuZXh0Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dENvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChuZXh0VW5tYXNrZWRDb250ZXh0KTtcbiAgICAgIHdpbGxSZWNlaXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBEaXN0aW5ndWlzaCBiZXR3ZWVuIGEgcHJvcHMgdXBkYXRlIHZlcnN1cyBhIHNpbXBsZSBzdGF0ZSB1cGRhdGVcbiAgICBpZiAocHJldlBhcmVudEVsZW1lbnQgPT09IG5leHRQYXJlbnRFbGVtZW50KSB7XG4gICAgICAvLyBTa2lwIGNoZWNraW5nIHByb3AgdHlwZXMgYWdhaW4gLS0gd2UgZG9uJ3QgcmVhZCBpbnN0LnByb3BzIHRvIGF2b2lkXG4gICAgICAvLyB3YXJuaW5nIGZvciBET00gY29tcG9uZW50IHByb3BzIGluIHRoaXMgdXBncmFkZVxuICAgICAgbmV4dFByb3BzID0gbmV4dFBhcmVudEVsZW1lbnQucHJvcHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRQcm9wcyA9IHRoaXMuX3Byb2Nlc3NQcm9wcyhuZXh0UGFyZW50RWxlbWVudC5wcm9wcyk7XG4gICAgICB3aWxsUmVjZWl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQW4gdXBkYXRlIGhlcmUgd2lsbCBzY2hlZHVsZSBhbiB1cGRhdGUgYnV0IGltbWVkaWF0ZWx5IHNldFxuICAgIC8vIF9wZW5kaW5nU3RhdGVRdWV1ZSB3aGljaCB3aWxsIGVuc3VyZSB0aGF0IGFueSBzdGF0ZSB1cGRhdGVzIGdldHNcbiAgICAvLyBpbW1lZGlhdGVseSByZWNvbmNpbGVkIGluc3RlYWQgb2Ygd2FpdGluZyBmb3IgdGhlIG5leHQgYmF0Y2guXG4gICAgaWYgKHdpbGxSZWNlaXZlICYmIGluc3QuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykge1xuICAgICAgaW5zdC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpO1xuICAgIH1cblxuICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLl9wcm9jZXNzUGVuZGluZ1N0YXRlKG5leHRQcm9wcywgbmV4dENvbnRleHQpO1xuXG4gICAgdmFyIHNob3VsZFVwZGF0ZSA9IHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSB8fCAhaW5zdC5zaG91bGRDb21wb25lbnRVcGRhdGUgfHwgaW5zdC5zaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhzaG91bGRVcGRhdGUgIT09IHVuZGVmaW5lZCwgJyVzLnNob3VsZENvbXBvbmVudFVwZGF0ZSgpOiBSZXR1cm5lZCB1bmRlZmluZWQgaW5zdGVhZCBvZiBhICcgKyAnYm9vbGVhbiB2YWx1ZS4gTWFrZSBzdXJlIHRvIHJldHVybiB0cnVlIG9yIGZhbHNlLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuICAgICAgLy8gV2lsbCBzZXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgLlxuICAgICAgdGhpcy5fcGVyZm9ybUNvbXBvbmVudFVwZGF0ZShuZXh0UGFyZW50RWxlbWVudCwgbmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0LCB0cmFuc2FjdGlvbiwgbmV4dFVubWFza2VkQ29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGl0J3MgZGV0ZXJtaW5lZCB0aGF0IGEgY29tcG9uZW50IHNob3VsZCBub3QgdXBkYXRlLCB3ZSBzdGlsbCB3YW50XG4gICAgICAvLyB0byBzZXQgcHJvcHMgYW5kIHN0YXRlIGJ1dCB3ZSBzaG9ydGN1dCB0aGUgcmVzdCBvZiB0aGUgdXBkYXRlLlxuICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0UGFyZW50RWxlbWVudDtcbiAgICAgIHRoaXMuX2NvbnRleHQgPSBuZXh0VW5tYXNrZWRDb250ZXh0O1xuICAgICAgaW5zdC5wcm9wcyA9IG5leHRQcm9wcztcbiAgICAgIGluc3Quc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgICBpbnN0LmNvbnRleHQgPSBuZXh0Q29udGV4dDtcbiAgICB9XG4gIH0sXG5cbiAgX3Byb2Nlc3NQZW5kaW5nU3RhdGU6IGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgdmFyIHF1ZXVlID0gdGhpcy5fcGVuZGluZ1N0YXRlUXVldWU7XG4gICAgdmFyIHJlcGxhY2UgPSB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICByZXR1cm4gaW5zdC5zdGF0ZTtcbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZSAmJiBxdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBxdWV1ZVswXTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFN0YXRlID0gX2Fzc2lnbih7fSwgcmVwbGFjZSA/IHF1ZXVlWzBdIDogaW5zdC5zdGF0ZSk7XG4gICAgZm9yICh2YXIgaSA9IHJlcGxhY2UgPyAxIDogMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFydGlhbCA9IHF1ZXVlW2ldO1xuICAgICAgX2Fzc2lnbihuZXh0U3RhdGUsIHR5cGVvZiBwYXJ0aWFsID09PSAnZnVuY3Rpb24nID8gcGFydGlhbC5jYWxsKGluc3QsIG5leHRTdGF0ZSwgcHJvcHMsIGNvbnRleHQpIDogcGFydGlhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWVyZ2VzIG5ldyBwcm9wcyBhbmQgc3RhdGUsIG5vdGlmaWVzIGRlbGVnYXRlIG1ldGhvZHMgb2YgdXBkYXRlIGFuZFxuICAgKiBwZXJmb3JtcyB1cGRhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0RWxlbWVudCBOZXh0IGVsZW1lbnRcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wcyBOZXh0IHB1YmxpYyBvYmplY3QgdG8gc2V0IGFzIHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlIE5leHQgb2JqZWN0IHRvIHNldCBhcyBzdGF0ZS5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dCBOZXh0IHB1YmxpYyBvYmplY3QgdG8gc2V0IGFzIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHs/b2JqZWN0fSB1bm1hc2tlZENvbnRleHRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wZXJmb3JtQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgdHJhbnNhY3Rpb24sIHVubWFza2VkQ29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG5cbiAgICB2YXIgaGFzQ29tcG9uZW50RGlkVXBkYXRlID0gQm9vbGVhbihpbnN0LmNvbXBvbmVudERpZFVwZGF0ZSk7XG4gICAgdmFyIHByZXZQcm9wcztcbiAgICB2YXIgcHJldlN0YXRlO1xuICAgIHZhciBwcmV2Q29udGV4dDtcbiAgICBpZiAoaGFzQ29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICBwcmV2UHJvcHMgPSBpbnN0LnByb3BzO1xuICAgICAgcHJldlN0YXRlID0gaW5zdC5zdGF0ZTtcbiAgICAgIHByZXZDb250ZXh0ID0gaW5zdC5jb250ZXh0O1xuICAgIH1cblxuICAgIGlmIChpbnN0LmNvbXBvbmVudFdpbGxVcGRhdGUpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpO1xuICAgIH1cblxuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgdGhpcy5fY29udGV4dCA9IHVubWFza2VkQ29udGV4dDtcbiAgICBpbnN0LnByb3BzID0gbmV4dFByb3BzO1xuICAgIGluc3Quc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgaW5zdC5jb250ZXh0ID0gbmV4dENvbnRleHQ7XG5cbiAgICB0aGlzLl91cGRhdGVSZW5kZXJlZENvbXBvbmVudCh0cmFuc2FjdGlvbiwgdW5tYXNrZWRDb250ZXh0KTtcblxuICAgIGlmIChoYXNDb21wb25lbnREaWRVcGRhdGUpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoaW5zdC5jb21wb25lbnREaWRVcGRhdGUuYmluZChpbnN0LCBwcmV2UHJvcHMsIHByZXZTdGF0ZSwgcHJldkNvbnRleHQpLCBpbnN0KTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENhbGwgdGhlIGNvbXBvbmVudCdzIGByZW5kZXJgIG1ldGhvZCBhbmQgdXBkYXRlIHRoZSBET00gYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBfdXBkYXRlUmVuZGVyZWRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBwcmV2Q29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLl9yZW5kZXJlZENvbXBvbmVudDtcbiAgICB2YXIgcHJldlJlbmRlcmVkRWxlbWVudCA9IHByZXZDb21wb25lbnRJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQ7XG4gICAgdmFyIG5leHRSZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldlJlbmRlcmVkRWxlbWVudCwgbmV4dFJlbmRlcmVkRWxlbWVudCkpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci5yZWNlaXZlQ29tcG9uZW50KHByZXZDb21wb25lbnRJbnN0YW5jZSwgbmV4dFJlbmRlcmVkRWxlbWVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQoY29udGV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2xkTmF0aXZlTm9kZSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKHByZXZDb21wb25lbnRJbnN0YW5jZSk7XG4gICAgICBSZWFjdFJlY29uY2lsZXIudW5tb3VudENvbXBvbmVudChwcmV2Q29tcG9uZW50SW5zdGFuY2UsIGZhbHNlKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IFJlYWN0Tm9kZVR5cGVzLmdldFR5cGUobmV4dFJlbmRlcmVkRWxlbWVudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IHRoaXMuX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobmV4dFJlbmRlcmVkRWxlbWVudCk7XG4gICAgICB2YXIgbmV4dE1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudCh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX25hdGl2ZVBhcmVudCwgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbywgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSk7XG4gICAgICB0aGlzLl9yZXBsYWNlTm9kZVdpdGhNYXJrdXAob2xkTmF0aXZlTm9kZSwgbmV4dE1hcmt1cCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBPdmVycmlkZGVuIGluIHNoYWxsb3cgcmVuZGVyaW5nLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfcmVwbGFjZU5vZGVXaXRoTWFya3VwOiBmdW5jdGlvbiAob2xkTmF0aXZlTm9kZSwgbmV4dE1hcmt1cCkge1xuICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50V2l0aG91dE93bmVyT3JDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICB2YXIgcmVuZGVyZWRDb21wb25lbnQgPSBpbnN0LnJlbmRlcigpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgIGlmIChyZW5kZXJlZENvbXBvbmVudCA9PT0gdW5kZWZpbmVkICYmIGluc3QucmVuZGVyLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICByZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVkQ29tcG9uZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIHZhciByZW5kZXJlZENvbXBvbmVudDtcbiAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcztcbiAgICB0cnkge1xuICAgICAgcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgICEoXG4gICAgLy8gVE9ETzogQW4gYGlzVmFsaWROb2RlYCBmdW5jdGlvbiB3b3VsZCBwcm9iYWJseSBiZSBtb3JlIGFwcHJvcHJpYXRlXG4gICAgcmVuZGVyZWRDb21wb25lbnQgPT09IG51bGwgfHwgcmVuZGVyZWRDb21wb25lbnQgPT09IGZhbHNlIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChyZW5kZXJlZENvbXBvbmVudCkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLnJlbmRlcigpOiBBIHZhbGlkIFJlYWN0IGVsZW1lbnQgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQuIFlvdSBtYXkgaGF2ZSAnICsgJ3JldHVybmVkIHVuZGVmaW5lZCwgYW4gYXJyYXkgb3Igc29tZSBvdGhlciBpbnZhbGlkIG9iamVjdC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgcmV0dXJuIHJlbmRlcmVkQ29tcG9uZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXppbHkgYWxsb2NhdGVzIHRoZSByZWZzIG9iamVjdCBhbmQgc3RvcmVzIGBjb21wb25lbnRgIGFzIGByZWZgLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIFJlZmVyZW5jZSBuYW1lLlxuICAgKiBAcGFyYW0ge2NvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byBzdG9yZSBhcyBgcmVmYC5cbiAgICogQGZpbmFsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhdHRhY2hSZWY6IGZ1bmN0aW9uIChyZWYsIGNvbXBvbmVudCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgICEoaW5zdCAhPSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdTdGF0ZWxlc3MgZnVuY3Rpb24gY29tcG9uZW50cyBjYW5ub3QgaGF2ZSByZWZzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgcHVibGljQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQgJiYgY29tcG9uZW50LmdldE5hbWUgPyBjb21wb25lbnQuZ2V0TmFtZSgpIDogJ2EgY29tcG9uZW50JztcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHB1YmxpY0NvbXBvbmVudEluc3RhbmNlICE9IG51bGwsICdTdGF0ZWxlc3MgZnVuY3Rpb24gY29tcG9uZW50cyBjYW5ub3QgYmUgZ2l2ZW4gcmVmcyAnICsgJyhTZWUgcmVmIFwiJXNcIiBpbiAlcyBjcmVhdGVkIGJ5ICVzKS4gJyArICdBdHRlbXB0cyB0byBhY2Nlc3MgdGhpcyByZWYgd2lsbCBmYWlsLicsIHJlZiwgY29tcG9uZW50TmFtZSwgdGhpcy5nZXROYW1lKCkpIDogdm9pZCAwO1xuICAgIH1cbiAgICB2YXIgcmVmcyA9IGluc3QucmVmcyA9PT0gZW1wdHlPYmplY3QgPyBpbnN0LnJlZnMgPSB7fSA6IGluc3QucmVmcztcbiAgICByZWZzW3JlZl0gPSBwdWJsaWNDb21wb25lbnRJbnN0YW5jZTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0YWNoZXMgYSByZWZlcmVuY2UgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBOYW1lIHRvIGRlcmVmZXJlbmNlLlxuICAgKiBAZmluYWxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRldGFjaFJlZjogZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciByZWZzID0gdGhpcy5nZXRQdWJsaWNJbnN0YW5jZSgpLnJlZnM7XG4gICAgZGVsZXRlIHJlZnNbcmVmXTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IGEgdGV4dCBkZXNjcmlwdGlvbiBvZiB0aGUgY29tcG9uZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gaWRlbnRpZnkgaXRcbiAgICogaW4gZXJyb3IgbWVzc2FnZXMuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG5hbWUgb3IgbnVsbC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBnZXROYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuX2luc3RhbmNlICYmIHRoaXMuX2luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IGNvbnN0cnVjdG9yICYmIGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3Rvci5uYW1lIHx8IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHVibGljbHkgYWNjZXNzaWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbXBvbmVudCAtIGkuZS4gd2hhdFxuICAgKiBpcyBleHBvc2VkIGJ5IHJlZnMgYW5kIHJldHVybmVkIGJ5IHJlbmRlci4gQ2FuIGJlIG51bGwgZm9yIHN0YXRlbGVzc1xuICAgKiBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH0gdGhlIHB1YmxpYyBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0UHVibGljSW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIGlmIChpbnN0IGluc3RhbmNlb2YgU3RhdGVsZXNzQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGluc3Q7XG4gIH0sXG5cbiAgLy8gU3R1YlxuICBfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDogbnVsbFxuXG59O1xuXG5SZWFjdFBlcmYubWVhc3VyZU1ldGhvZHMoUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpbiwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50Jywge1xuICBtb3VudENvbXBvbmVudDogJ21vdW50Q29tcG9uZW50JyxcbiAgdXBkYXRlQ29tcG9uZW50OiAndXBkYXRlQ29tcG9uZW50JyxcbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudDogJ19yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQnXG59KTtcblxudmFyIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50ID0ge1xuXG4gIE1peGluOiBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudE1peGluXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb3NpdGVDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIGluamVjdGVkID0gZmFsc2U7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0ge1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IGluamVjdGFibGUgZW52aXJvbm1lbnQgZGVwZW5kZW50IGNsZWFudXAgaG9vay4gKHNlcnZlciB2cy5cbiAgICogYnJvd3NlciBldGMpLiBFeGFtcGxlOiBBIGJyb3dzZXIgc3lzdGVtIGNhY2hlcyBET00gbm9kZXMgYmFzZWQgb24gY29tcG9uZW50XG4gICAqIElEIGFuZCBtdXN0IHJlbW92ZSB0aGF0IGNhY2hlIGVudHJ5IHdoZW4gdGhpcyBpbnN0YW5jZSBpcyB1bm1vdW50ZWQuXG4gICAqL1xuICB1bm1vdW50SURGcm9tRW52aXJvbm1lbnQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgaW5qZWN0YWJsZSBob29rIGZvciBzd2FwcGluZyBvdXQgbW91bnQgaW1hZ2VzIGluIHRoZSBtaWRkbGUgb2ZcbiAgICogdGhlIHRyZWUuXG4gICAqL1xuICByZXBsYWNlTm9kZVdpdGhNYXJrdXA6IG51bGwsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgaW5qZWN0YWJsZSBob29rIGZvciBwcm9jZXNzaW5nIGEgcXVldWUgb2YgY2hpbGQgdXBkYXRlcy4gV2lsbFxuICAgKiBsYXRlciBtb3ZlIGludG8gTXVsdGlDaGlsZENvbXBvbmVudHMuXG4gICAqL1xuICBwcm9jZXNzQ2hpbGRyZW5VcGRhdGVzOiBudWxsLFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdEVudmlyb25tZW50OiBmdW5jdGlvbiAoZW52aXJvbm1lbnQpIHtcbiAgICAgICEhaW5qZWN0ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQ6IGluamVjdEVudmlyb25tZW50KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQ7XG4gICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cCA9IGVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cDtcbiAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcyA9IGVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXM7XG4gICAgICBpbmplY3RlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVycm9yVXRpbHNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIHdoaWxlIGd1YXJkaW5nIGFnYWluc3QgZXJyb3JzIHRoYXQgaGFwcGVucyB3aXRoaW4gaXQuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBuYW1lIG9mIHRoZSBndWFyZCB0byB1c2UgZm9yIGxvZ2dpbmcgb3IgZGVidWdnaW5nXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2VcbiAqIEBwYXJhbSB7Kn0gYSBGaXJzdCBhcmd1bWVudFxuICogQHBhcmFtIHsqfSBiIFNlY29uZCBhcmd1bWVudFxuICovXG5mdW5jdGlvbiBpbnZva2VHdWFyZGVkQ2FsbGJhY2sobmFtZSwgZnVuYywgYSwgYikge1xuICB0cnkge1xuICAgIHJldHVybiBmdW5jKGEsIGIpO1xuICB9IGNhdGNoICh4KSB7XG4gICAgaWYgKGNhdWdodEVycm9yID09PSBudWxsKSB7XG4gICAgICBjYXVnaHRFcnJvciA9IHg7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxudmFyIFJlYWN0RXJyb3JVdGlscyA9IHtcbiAgaW52b2tlR3VhcmRlZENhbGxiYWNrOiBpbnZva2VHdWFyZGVkQ2FsbGJhY2ssXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYnkgUmVhY3RUZXN0VXRpbHMuU2ltdWxhdGUgc28gdGhhdCBhbnkgZXJyb3JzIHRocm93biBieSB0aGUgZXZlbnRcbiAgICogaGFuZGxlciBhcmUgc3VyZSB0byBiZSByZXRocm93biBieSByZXRocm93Q2F1Z2h0RXJyb3IuXG4gICAqL1xuICBpbnZva2VHdWFyZGVkQ2FsbGJhY2tXaXRoQ2F0Y2g6IGludm9rZUd1YXJkZWRDYWxsYmFjayxcblxuICAvKipcbiAgICogRHVyaW5nIGV4ZWN1dGlvbiBvZiBndWFyZGVkIGZ1bmN0aW9ucyB3ZSB3aWxsIGNhcHR1cmUgdGhlIGZpcnN0IGVycm9yIHdoaWNoXG4gICAqIHdlIHdpbGwgcmV0aHJvdyB0byBiZSBoYW5kbGVkIGJ5IHRoZSB0b3AgbGV2ZWwgZXJyb3IgaGFuZGxlci5cbiAgICovXG4gIHJldGhyb3dDYXVnaHRFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgIGlmIChjYXVnaHRFcnJvcikge1xuICAgICAgdmFyIGVycm9yID0gY2F1Z2h0RXJyb3I7XG4gICAgICBjYXVnaHRFcnJvciA9IG51bGw7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8qKlxuICAgKiBUbyBoZWxwIGRldmVsb3BtZW50IHdlIGNhbiBnZXQgYmV0dGVyIGRldnRvb2xzIGludGVncmF0aW9uIGJ5IHNpbXVsYXRpbmcgYVxuICAgKiByZWFsIGJyb3dzZXIgZXZlbnQuXG4gICAqL1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kaXNwYXRjaEV2ZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIGZha2VOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncmVhY3QnKTtcbiAgICBSZWFjdEVycm9yVXRpbHMuaW52b2tlR3VhcmRlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMsIGEsIGIpIHtcbiAgICAgIHZhciBib3VuZEZ1bmMgPSBmdW5jLmJpbmQobnVsbCwgYSwgYik7XG4gICAgICB2YXIgZXZ0VHlwZSA9ICdyZWFjdC0nICsgbmFtZTtcbiAgICAgIGZha2VOb2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgYm91bmRGdW5jLCBmYWxzZSk7XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBldnQuaW5pdEV2ZW50KGV2dFR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gICAgICBmYWtlTm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICBmYWtlTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGJvdW5kRnVuYywgZmFsc2UpO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVycm9yVXRpbHM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RXJyb3JVdGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE5vZGVUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Tm9kZVR5cGVzID0ge1xuICBOQVRJVkU6IDAsXG4gIENPTVBPU0lURTogMSxcbiAgRU1QVFk6IDIsXG5cbiAgZ2V0VHlwZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLkVNUFRZO1xuICAgIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgICBpZiAodHlwZW9mIG5vZGUudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gUmVhY3ROb2RlVHlwZXMuQ09NUE9TSVRFO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLk5BVElWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1VuZXhwZWN0ZWQgbm9kZTogJXMnLCBub2RlKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb2RlVHlwZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Tm9kZVR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEdpdmVuIGEgYHByZXZFbGVtZW50YCBhbmQgYG5leHRFbGVtZW50YCwgZGV0ZXJtaW5lcyBpZiB0aGUgZXhpc3RpbmdcbiAqIGluc3RhbmNlIHNob3VsZCBiZSB1cGRhdGVkIGFzIG9wcG9zZWQgdG8gYmVpbmcgZGVzdHJveWVkIG9yIHJlcGxhY2VkIGJ5IGEgbmV3XG4gKiBpbnN0YW5jZS4gQm90aCBhcmd1bWVudHMgYXJlIGVsZW1lbnRzLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGlzIGxvZ2ljIGNhblxuICogb3BlcmF0ZSBvbiBzdGF0ZWxlc3MgdHJlZXMgd2l0aG91dCBhbnkgYmFja2luZyBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IHByZXZFbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG5leHRFbGVtZW50XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBleGlzdGluZyBpbnN0YW5jZSBzaG91bGQgYmUgdXBkYXRlZC5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuXG5mdW5jdGlvbiBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpIHtcbiAgdmFyIHByZXZFbXB0eSA9IHByZXZFbGVtZW50ID09PSBudWxsIHx8IHByZXZFbGVtZW50ID09PSBmYWxzZTtcbiAgdmFyIG5leHRFbXB0eSA9IG5leHRFbGVtZW50ID09PSBudWxsIHx8IG5leHRFbGVtZW50ID09PSBmYWxzZTtcbiAgaWYgKHByZXZFbXB0eSB8fCBuZXh0RW1wdHkpIHtcbiAgICByZXR1cm4gcHJldkVtcHR5ID09PSBuZXh0RW1wdHk7XG4gIH1cblxuICB2YXIgcHJldlR5cGUgPSB0eXBlb2YgcHJldkVsZW1lbnQ7XG4gIHZhciBuZXh0VHlwZSA9IHR5cGVvZiBuZXh0RWxlbWVudDtcbiAgaWYgKHByZXZUeXBlID09PSAnc3RyaW5nJyB8fCBwcmV2VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbmV4dFR5cGUgPT09ICdzdHJpbmcnIHx8IG5leHRUeXBlID09PSAnbnVtYmVyJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV4dFR5cGUgPT09ICdvYmplY3QnICYmIHByZXZFbGVtZW50LnR5cGUgPT09IG5leHRFbGVtZW50LnR5cGUgJiYgcHJldkVsZW1lbnQua2V5ID09PSBuZXh0RWxlbWVudC5rZXk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbXB0eUNvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5Q29tcG9uZW50RmFjdG9yeTtcblxudmFyIFJlYWN0RW1wdHlDb21wb25lbnRJbmplY3Rpb24gPSB7XG4gIGluamVjdEVtcHR5Q29tcG9uZW50RmFjdG9yeTogZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBlbXB0eUNvbXBvbmVudEZhY3RvcnkgPSBmYWN0b3J5O1xuICB9XG59O1xuXG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbiAoaW5zdGFudGlhdGUpIHtcbiAgICByZXR1cm4gZW1wdHlDb21wb25lbnRGYWN0b3J5KGluc3RhbnRpYXRlKTtcbiAgfVxufTtcblxuUmVhY3RFbXB0eUNvbXBvbmVudC5pbmplY3Rpb24gPSBSZWFjdEVtcHR5Q29tcG9uZW50SW5qZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RW1wdHlDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RW1wdHlDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROYXRpdmVDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBhdXRvR2VuZXJhdGVXcmFwcGVyQ2xhc3MgPSBudWxsO1xudmFyIGdlbmVyaWNDb21wb25lbnRDbGFzcyA9IG51bGw7XG4vLyBUaGlzIHJlZ2lzdHJ5IGtlZXBzIHRyYWNrIG9mIHdyYXBwZXIgY2xhc3NlcyBhcm91bmQgbmF0aXZlIHRhZ3MuXG52YXIgdGFnVG9Db21wb25lbnRDbGFzcyA9IHt9O1xudmFyIHRleHRDb21wb25lbnRDbGFzcyA9IG51bGw7XG5cbnZhciBSZWFjdE5hdGl2ZUNvbXBvbmVudEluamVjdGlvbiA9IHtcbiAgLy8gVGhpcyBhY2NlcHRzIGEgY2xhc3MgdGhhdCByZWNlaXZlcyB0aGUgdGFnIHN0cmluZy4gVGhpcyBpcyBhIGNhdGNoIGFsbFxuICAvLyB0aGF0IGNhbiByZW5kZXIgYW55IGtpbmQgb2YgdGFnLlxuICBpbmplY3RHZW5lcmljQ29tcG9uZW50Q2xhc3M6IGZ1bmN0aW9uIChjb21wb25lbnRDbGFzcykge1xuICAgIGdlbmVyaWNDb21wb25lbnRDbGFzcyA9IGNvbXBvbmVudENsYXNzO1xuICB9LFxuICAvLyBUaGlzIGFjY2VwdHMgYSB0ZXh0IGNvbXBvbmVudCBjbGFzcyB0aGF0IHRha2VzIHRoZSB0ZXh0IHN0cmluZyB0byBiZVxuICAvLyByZW5kZXJlZCBhcyBwcm9wcy5cbiAgaW5qZWN0VGV4dENvbXBvbmVudENsYXNzOiBmdW5jdGlvbiAoY29tcG9uZW50Q2xhc3MpIHtcbiAgICB0ZXh0Q29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcbiAgfSxcbiAgLy8gVGhpcyBhY2NlcHRzIGEga2V5ZWQgb2JqZWN0IHdpdGggY2xhc3NlcyBhcyB2YWx1ZXMuIEVhY2gga2V5IHJlcHJlc2VudHMgYVxuICAvLyB0YWcuIFRoYXQgcGFydGljdWxhciB0YWcgd2lsbCB1c2UgdGhpcyBjbGFzcyBpbnN0ZWFkIG9mIHRoZSBnZW5lcmljIG9uZS5cbiAgaW5qZWN0Q29tcG9uZW50Q2xhc3NlczogZnVuY3Rpb24gKGNvbXBvbmVudENsYXNzZXMpIHtcbiAgICBfYXNzaWduKHRhZ1RvQ29tcG9uZW50Q2xhc3MsIGNvbXBvbmVudENsYXNzZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIEdldCBhIGNvbXBvc2l0ZSBjb21wb25lbnQgd3JhcHBlciBjbGFzcyBmb3IgYSBzcGVjaWZpYyB0YWcuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgVGhlIHRhZyBmb3Igd2hpY2ggdG8gZ2V0IHRoZSBjbGFzcy5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgUmVhY3QgY2xhc3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudENsYXNzRm9yRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZTtcbiAgfVxuICB2YXIgdGFnID0gZWxlbWVudC50eXBlO1xuICB2YXIgY29tcG9uZW50Q2xhc3MgPSB0YWdUb0NvbXBvbmVudENsYXNzW3RhZ107XG4gIGlmIChjb21wb25lbnRDbGFzcyA9PSBudWxsKSB7XG4gICAgdGFnVG9Db21wb25lbnRDbGFzc1t0YWddID0gY29tcG9uZW50Q2xhc3MgPSBhdXRvR2VuZXJhdGVXcmFwcGVyQ2xhc3ModGFnKTtcbiAgfVxuICByZXR1cm4gY29tcG9uZW50Q2xhc3M7XG59XG5cbi8qKlxuICogR2V0IGEgbmF0aXZlIGludGVybmFsIGNvbXBvbmVudCBjbGFzcyBmb3IgYSBzcGVjaWZpYyB0YWcuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gY3JlYXRlLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBpbnRlcm5hbCBjbGFzcyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW50ZXJuYWxDb21wb25lbnQoZWxlbWVudCkge1xuICAhZ2VuZXJpY0NvbXBvbmVudENsYXNzID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RoZXJlIGlzIG5vIHJlZ2lzdGVyZWQgY29tcG9uZW50IGZvciB0aGUgdGFnICVzJywgZWxlbWVudC50eXBlKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHJldHVybiBuZXcgZ2VuZXJpY0NvbXBvbmVudENsYXNzKGVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3RUZXh0fSB0ZXh0XG4gKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VGb3JUZXh0KHRleHQpIHtcbiAgcmV0dXJuIG5ldyB0ZXh0Q29tcG9uZW50Q2xhc3ModGV4dCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1RleHRDb21wb25lbnQoY29tcG9uZW50KSB7XG4gIHJldHVybiBjb21wb25lbnQgaW5zdGFuY2VvZiB0ZXh0Q29tcG9uZW50Q2xhc3M7XG59XG5cbnZhciBSZWFjdE5hdGl2ZUNvbXBvbmVudCA9IHtcbiAgZ2V0Q29tcG9uZW50Q2xhc3NGb3JFbGVtZW50OiBnZXRDb21wb25lbnRDbGFzc0ZvckVsZW1lbnQsXG4gIGNyZWF0ZUludGVybmFsQ29tcG9uZW50OiBjcmVhdGVJbnRlcm5hbENvbXBvbmVudCxcbiAgY3JlYXRlSW5zdGFuY2VGb3JUZXh0OiBjcmVhdGVJbnN0YW5jZUZvclRleHQsXG4gIGlzVGV4dENvbXBvbmVudDogaXNUZXh0Q29tcG9uZW50LFxuICBpbmplY3Rpb246IFJlYWN0TmF0aXZlQ29tcG9uZW50SW5qZWN0aW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TmF0aXZlQ29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5hdGl2ZUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5sZW5ndGggPCAxMCB8fCAoL15bc1xcV10qJC8pLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHdhcm5pbmcgZm9ybWF0IHNob3VsZCBiZSBhYmxlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgJyArXG4gICAgICAgICd3YXJuaW5nLiBQbGVhc2UsIHVzZSBhIG1vcmUgZGVzY3JpcHRpdmUgZm9ybWF0IHRoYW46ICcgKyBmb3JtYXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCh4KSB7fVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd2FybmluZy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXHJcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8gPSBmdW5jdGlvbiAocm9vdEluc3RhbmNlLCBjb250YWluZXJOYW1lKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIF9yb290SW5zdGFuY2U6IHJvb3RJbnN0YW5jZSxcclxuICAgICAgICBfY29udGFpbmVyTmFtZTogY29udGFpbmVyTmFtZVxyXG4gICAgfTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm87XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RVcGRhdGVzJyk7XG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQnKTtcbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RW1wdHlDb21wb25lbnQnKTtcbnZhciBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3knKTtcbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcblxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uJyk7XG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZ0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0NvbXBvbmVudCcpO1xudmFyIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQnKTtcblxudmFyIGluamVjdCA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0UmVjb25jaWxlVHJhbnNhY3Rpb24oY3JlYXRlUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uKG5hdGl2ZUltcGxlbWVudGF0aW9uLnRyYW5zYWN0aW9uKSk7XG4gICAgUmVhY3RVcGRhdGVzLmluamVjdGlvbi5pbmplY3RCYXRjaGluZ1N0cmF0ZWd5KFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kpO1xuXG4gICAgUmVhY3ROYXRpdmVDb21wb25lbnQuaW5qZWN0aW9uLmluamVjdEdlbmVyaWNDb21wb25lbnRDbGFzcyhjcmVhdGVSZWFjdEFueXRoaW5nQ29tcG9uZW50KG5hdGl2ZUltcGxlbWVudGF0aW9uLmNvbXBvbmVudHMpKTtcblxuICAgIFJlYWN0RW1wdHlDb21wb25lbnQuaW5qZWN0aW9uLmluamVjdEVtcHR5Q29tcG9uZW50RmFjdG9yeShmdW5jdGlvbiAoaW5zdGFudGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQoaW5zdGFudGlhdGUpO1xuICAgIH0pO1xuXG4gICAgaWYgKFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50IHx8XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50IHx8XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcykge1xuXG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50ID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudDtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXAgPSBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwO1xuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMgPSBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcztcbiAgICB9IGVsc2Uge1xuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LmluamVjdGlvbi5pbmplY3RFbnZpcm9ubWVudChSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQpO1xuICAgIH1cbn07XG5cbnZhciBjbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbmplY3Q6IGluamVjdCxcbiAgICBjbGVhcjogY2xlYXJcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0luamVjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1RyYW5zYWN0aW9uJyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xuXG52YXIgUkVTRVRfQkFUQ0hFRF9VUERBVEVTID0ge1xuICBpbml0aWFsaXplOiBlbXB0eUZ1bmN0aW9uLFxuICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPSBmYWxzZTtcbiAgfVxufTtcblxudmFyIEZMVVNIX0JBVENIRURfVVBEQVRFUyA9IHtcbiAgaW5pdGlhbGl6ZTogZW1wdHlGdW5jdGlvbixcbiAgY2xvc2U6IFJlYWN0VXBkYXRlcy5mbHVzaEJhdGNoZWRVcGRhdGVzLmJpbmQoUmVhY3RVcGRhdGVzKVxufTtcblxudmFyIFRSQU5TQUNUSU9OX1dSQVBQRVJTID0gW0ZMVVNIX0JBVENIRURfVVBEQVRFUywgUkVTRVRfQkFUQ0hFRF9VUERBVEVTXTtcblxuZnVuY3Rpb24gUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVRyYW5zYWN0aW9uKCkge1xuICB0aGlzLnJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uKCk7XG59XG5cbl9hc3NpZ24oUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVRyYW5zYWN0aW9uLnByb3RvdHlwZSwgVHJhbnNhY3Rpb24uTWl4aW4sIHtcbiAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBUUkFOU0FDVElPTl9XUkFQUEVSUztcbiAgfVxufSk7XG5cbnZhciB0cmFuc2FjdGlvbiA9IG5ldyBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5VHJhbnNhY3Rpb24oKTtcblxudmFyIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kgPSB7XG4gIGlzQmF0Y2hpbmdVcGRhdGVzOiBmYWxzZSxcblxuICAvKipcbiAgICogQ2FsbCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaW4gYSBjb250ZXh0IHdpdGhpbiB3aGljaCBjYWxscyB0byBgc2V0U3RhdGVgXG4gICAqIGFuZCBmcmllbmRzIGFyZSBiYXRjaGVkIHN1Y2ggdGhhdCBjb21wb25lbnRzIGFyZW4ndCB1cGRhdGVkIHVubmVjZXNzYXJpbHkuXG4gICAqL1xuICBiYXRjaGVkVXBkYXRlczogZnVuY3Rpb24gKGNhbGxiYWNrLCBhLCBiLCBjLCBkLCBlKSB7XG4gICAgdmFyIGFscmVhZHlCYXRjaGluZ1VwZGF0ZXMgPSBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzO1xuXG4gICAgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcyA9IHRydWU7XG5cbiAgICAvLyBUaGUgY29kZSBpcyB3cml0dGVuIHRoaXMgd2F5IHRvIGF2b2lkIGV4dHJhIGFsbG9jYXRpb25zXG4gICAgaWYgKGFscmVhZHlCYXRjaGluZ1VwZGF0ZXMpIHtcbiAgICAgIGNhbGxiYWNrKGEsIGIsIGMsIGQsIGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2FjdGlvbi5wZXJmb3JtKGNhbGxiYWNrLCBudWxsLCBhLCBiLCBjLCBkLCBlKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIENhbGxiYWNrUXVldWUgPSByZXF1aXJlKCdyZWFjdC9saWIvQ2FsbGJhY2tRdWV1ZScpO1xudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgncmVhY3QvbGliL1Bvb2xlZENsYXNzJyk7XG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCdyZWFjdC9saWIvVHJhbnNhY3Rpb24nKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIE9OX1JFQURZX1FVRVVFSU5HID0ge1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkucmVzZXQoKTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkubm90aWZ5QWxsKCk7XG4gICAgfVxufTtcblxudmFyIGNyZWF0ZVRyYW5zYWN0aW9uVHlwZSA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIHZhciBUUkFOU0FDVElPTl9XUkFQUEVSUyA9IFtPTl9SRUFEWV9RVUVVRUlOR107XG5cbiAgICBpZiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICAgICAgVFJBTlNBQ1RJT05fV1JBUFBFUlMucHVzaChuYXRpdmVJbXBsZW1lbnRhdGlvbik7XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpO1xuICAgICAgICAvLyBPbmx5IHNlcnZlci1zaWRlIHJlbmRlcmluZyByZWFsbHkgbmVlZHMgdGhpcyBvcHRpb24gKHNlZVxuICAgICAgICAvLyBgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdgKSwgYnV0IHNlcnZlci1zaWRlIHVzZXNcbiAgICAgICAgLy8gYFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb25gIGluc3RlYWQuIFRoaXMgb3B0aW9uIGlzIGhlcmUgc28gdGhhdCBpdCdzXG4gICAgICAgIC8vIGFjY2Vzc2libGUgYW5kIGRlZmF1bHRzIHRvIGZhbHNlIHdoZW4gYFJlYWN0RE9NQ29tcG9uZW50YCBhbmRcbiAgICAgICAgLy8gYFJlYWN0VGV4dENvbXBvbmVudGAgY2hlY2tzIGl0IGluIGBtb3VudENvbXBvbmVudGAuYFxuICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKG51bGwpO1xuICAgIH07XG5cbiAgICB2YXIgTWl4aW4gPSB7XG4gICAgICAgIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBUUkFOU0FDVElPTl9XUkFQUEVSUztcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRSZWFjdE1vdW50UmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWN0TW91bnRSZWFkeTtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja3BvaW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyByZWFjdE1vdW50UmVhZHkgaXMgdGhlIG91ciBvbmx5IHN0YXRlZnVsIHdyYXBwZXJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWN0TW91bnRSZWFkeS5jaGVja3BvaW50KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm9sbGJhY2s6IGZ1bmN0aW9uIChjaGVja3BvaW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeS5yb2xsYmFjayhjaGVja3BvaW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBDYWxsYmFja1F1ZXVlLnJlbGVhc2UodGhpcy5yZWFjdE1vdW50UmVhZHkpO1xuICAgICAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgYXNzaWduKFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbi5wcm90b3R5cGUsIFRyYW5zYWN0aW9uLk1peGluLCBNaXhpbik7XG5cbiAgICBQb29sZWRDbGFzcy5hZGRQb29saW5nVG8oUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uKTtcblxuICAgIHJldHVybiBSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRyYW5zYWN0aW9uVHlwZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdERPTUNvbXBvbmVudC5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdE11bHRpQ2hpbGQgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkJyk7XG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cblxudmFyIGdsb2JhbElkQ291bnRlciA9IDE7XG5cbnZhciBjcmVhdGVJbXBsZW1lbnRhdGlvbiA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuXG4gICAgdmFyIFJlYWN0QW55dGhpbmdDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgdGFnID0gZWxlbWVudC50eXBlO1xuICAgICAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3RhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX25hdGl2ZU5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVQYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fd3JhcHBlclN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcbiAgICB9O1xuXG4gICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdSZWFjdEFueXRoaW5nQ29tcG9uZW50JztcblxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4gPSB7XG4gICAgICAgIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlUGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUNvbnRhaW5lckluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IGdsb2JhbElkQ291bnRlcisrO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbmF0aXZlUGFyZW50O1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG5hdGl2ZUNvbnRhaW5lckluZm87XG5cbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzO1xuXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0gbmF0aXZlSW1wbGVtZW50YXRpb24ubW91bnQodGhpcy5fcm9vdE5vZGVJRCwgdGhpcy5fdGFnLCBwcm9wcywgbmF0aXZlUGFyZW50ICYmIG5hdGl2ZVBhcmVudC5fbmF0aXZlTm9kZSk7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5JbWFnZXMgPSB0aGlzLm1vdW50Q2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jaGlsZHJlbk1vdW50ICYmIGNoaWxkcmVuSW1hZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVJbXBsZW1lbnRhdGlvbi5jaGlsZHJlbk1vdW50KHRoaXMuX25hdGl2ZU5vZGUsIGNoaWxkcmVuSW1hZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVOb2RlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlY2VpdmVDb21wb25lbnQ6IGZ1bmN0aW9uIChuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBsYXN0UHJvcHMgPSBwcmV2RWxlbWVudC5wcm9wcztcbiAgICAgICAgICAgIHZhciBuZXh0UHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24udXBkYXRlKHRoaXMuX25hdGl2ZU5vZGUsIG5leHRQcm9wcywgbGFzdFByb3BzKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGlsZHJlbihuZXh0UHJvcHMuY2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXROYXRpdmVOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgICAgICAgICB0aGlzLnVubW91bnRDaGlsZHJlbihzYWZlbHkpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgICAgICAgICBuYXRpdmVJbXBsZW1lbnRhdGlvbi51bm1vdW50KHRoaXMuX25hdGl2ZU5vZGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4sICdSZWFjdEFueXRoaW5nQ29tcG9uZW50Jywge1xuICAgICAgICBtb3VudENvbXBvbmVudDogJ21vdW50Q29tcG9uZW50JyxcbiAgICAgICAgcmVjZWl2ZUNvbXBvbmVudDogJ3JlY2VpdmVDb21wb25lbnQnLFxuICAgIH0pO1xuXG4gICAgYXNzaWduKFxuICAgICAgICBSZWFjdEFueXRoaW5nQ29tcG9uZW50LnByb3RvdHlwZSxcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5NaXhpbixcbiAgICAgICAgUmVhY3RNdWx0aUNoaWxkLk1peGluXG4gICAgKTtcblxuICAgIHJldHVybiBSZWFjdEFueXRoaW5nQ29tcG9uZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUltcGxlbWVudGF0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RNdWx0aUNoaWxkXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCcpO1xudmFyIFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcycpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBSZWFjdENoaWxkUmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZFJlY29uY2lsZXInKTtcblxudmFyIGZsYXR0ZW5DaGlsZHJlbiA9IHJlcXVpcmUoJy4vZmxhdHRlbkNoaWxkcmVuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIG1hcmt1cCB0byBiZSByZW5kZXJlZCBhbmQgaW5zZXJ0ZWQgYXQgYSBzdXBwbGllZCBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFya3VwIE1hcmt1cCB0aGF0IHJlbmRlcnMgaW50byBhbiBlbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXguXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlSW5zZXJ0TWFya3VwKG1hcmt1cCwgYWZ0ZXJOb2RlLCB0b0luZGV4KSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5JTlNFUlRfTUFSS1VQLFxuICAgIGNvbnRlbnQ6IG1hcmt1cCxcbiAgICBmcm9tSW5kZXg6IG51bGwsXG4gICAgZnJvbU5vZGU6IG51bGwsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICBhZnRlck5vZGU6IGFmdGVyTm9kZVxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBtb3ZpbmcgYW4gZXhpc3RpbmcgZWxlbWVudCB0byBhbm90aGVyIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggU291cmNlIGluZGV4IG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXggb2YgdGhlIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlTW92ZShjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4KSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5NT1ZFX0VYSVNUSU5HLFxuICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgZnJvbUluZGV4OiBjaGlsZC5fbW91bnRJbmRleCxcbiAgICBmcm9tTm9kZTogUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUoY2hpbGQpLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgYWZ0ZXJOb2RlOiBhZnRlck5vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3IgcmVtb3ZpbmcgYW4gZWxlbWVudCBhdCBhbiBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IEluZGV4IG9mIHRoZSBlbGVtZW50IHRvIHJlbW92ZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VSZW1vdmUoY2hpbGQsIG5vZGUpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLlJFTU9WRV9OT0RFLFxuICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgZnJvbUluZGV4OiBjaGlsZC5fbW91bnRJbmRleCxcbiAgICBmcm9tTm9kZTogbm9kZSxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBzZXR0aW5nIHRoZSBtYXJrdXAgb2YgYSBub2RlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrdXAgTWFya3VwIHRoYXQgcmVuZGVycyBpbnRvIGFuIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlU2V0TWFya3VwKG1hcmt1cCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuU0VUX01BUktVUCxcbiAgICBjb250ZW50OiBtYXJrdXAsXG4gICAgZnJvbUluZGV4OiBudWxsLFxuICAgIGZyb21Ob2RlOiBudWxsLFxuICAgIHRvSW5kZXg6IG51bGwsXG4gICAgYWZ0ZXJOb2RlOiBudWxsXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIHNldHRpbmcgdGhlIHRleHQgY29udGVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dENvbnRlbnQgVGV4dCBjb250ZW50IHRvIHNldC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VUZXh0Q29udGVudCh0ZXh0Q29udGVudCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuVEVYVF9DT05URU5ULFxuICAgIGNvbnRlbnQ6IHRleHRDb250ZW50LFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIFB1c2ggYW4gdXBkYXRlLCBpZiBhbnksIG9udG8gdGhlIHF1ZXVlLiBDcmVhdGVzIGEgbmV3IHF1ZXVlIGlmIG5vbmUgaXNcbiAqIHBhc3NlZCBhbmQgYWx3YXlzIHJldHVybnMgdGhlIHF1ZXVlLiBNdXRhdGl2ZS5cbiAqL1xuZnVuY3Rpb24gZW5xdWV1ZShxdWV1ZSwgdXBkYXRlKSB7XG4gIGlmICh1cGRhdGUpIHtcbiAgICBxdWV1ZSA9IHF1ZXVlIHx8IFtdO1xuICAgIHF1ZXVlLnB1c2godXBkYXRlKTtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIGFueSBlbnF1ZXVlZCB1cGRhdGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NRdWV1ZShpbnN0LCB1cGRhdGVRdWV1ZSkge1xuICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMoaW5zdCwgdXBkYXRlUXVldWUpO1xufVxuXG4vKipcbiAqIFJlYWN0TXVsdGlDaGlsZCBhcmUgY2FwYWJsZSBvZiByZWNvbmNpbGluZyBtdWx0aXBsZSBjaGlsZHJlbi5cbiAqXG4gKiBAY2xhc3MgUmVhY3RNdWx0aUNoaWxkXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0TXVsdGlDaGlsZCA9IHtcblxuICAvKipcbiAgICogUHJvdmlkZXMgY29tbW9uIGZ1bmN0aW9uYWxpdHkgZm9yIGNvbXBvbmVudHMgdGhhdCBtdXN0IHJlY29uY2lsZSBtdWx0aXBsZVxuICAgKiBjaGlsZHJlbi4gVGhpcyBpcyB1c2VkIGJ5IGBSZWFjdERPTUNvbXBvbmVudGAgdG8gbW91bnQsIHVwZGF0ZSwgYW5kXG4gICAqIHVubW91bnQgY2hpbGQgY29tcG9uZW50cy5cbiAgICpcbiAgICogQGxlbmRzIHtSZWFjdE11bHRpQ2hpbGQucHJvdG90eXBlfVxuICAgKi9cbiAgTWl4aW46IHtcblxuICAgIF9yZWNvbmNpbGVySW5zdGFudGlhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RDaGlsZFJlY29uY2lsZXIuaW5zdGFudGlhdGVDaGlsZHJlbihuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdENoaWxkUmVjb25jaWxlci5pbnN0YW50aWF0ZUNoaWxkcmVuKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIF9yZWNvbmNpbGVyVXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChwcmV2Q2hpbGRyZW4sIG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbmV4dENoaWxkcmVuO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgICAgICAgICBuZXh0Q2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudXBkYXRlQ2hpbGRyZW4ocHJldkNoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICAgIHJldHVybiBuZXh0Q2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5leHRDaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cyk7XG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51cGRhdGVDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICByZXR1cm4gbmV4dENoaWxkcmVuO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBcIm1vdW50IGltYWdlXCIgZm9yIGVhY2ggb2YgdGhlIHN1cHBsaWVkIGNoaWxkcmVuLiBJbiB0aGUgY2FzZVxuICAgICAqIG9mIGBSZWFjdERPTUNvbXBvbmVudGAsIGEgbW91bnQgaW1hZ2UgaXMgYSBzdHJpbmcgb2YgbWFya3VwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXN0ZWRDaGlsZHJlbiBOZXN0ZWQgY2hpbGQgbWFwcy5cbiAgICAgKiBAcmV0dXJuIHthcnJheX0gQW4gYXJyYXkgb2YgbW91bnRlZCByZXByZXNlbnRhdGlvbnMuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgbW91bnRDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgIHZhciBtb3VudEltYWdlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5bbmFtZV07XG4gICAgICAgICAgdmFyIG1vdW50SW1hZ2UgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoY2hpbGQsIHRyYW5zYWN0aW9uLCB0aGlzLCB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KTtcbiAgICAgICAgICBjaGlsZC5fbW91bnRJbmRleCA9IGluZGV4Kys7XG4gICAgICAgICAgbW91bnRJbWFnZXMucHVzaChtb3VudEltYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1vdW50SW1hZ2VzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbnkgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBhIHRleHQgY29udGVudCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dENvbnRlbnQgU3RyaW5nIG9mIGNvbnRlbnQuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlVGV4dENvbnRlbnQ6IGZ1bmN0aW9uIChuZXh0Q29udGVudCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICAvLyBSZW1vdmUgYW55IHJlbmRlcmVkIGNoaWxkcmVuLlxuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudW5tb3VudENoaWxkcmVuKHByZXZDaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHByZXZDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGVUZXh0Q29udGVudCBjYWxsZWQgb24gbm9uLWVtcHR5IGNvbXBvbmVudC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBuZXcgdGV4dCBjb250ZW50LlxuICAgICAgdmFyIHVwZGF0ZXMgPSBbbWFrZVRleHRDb250ZW50KG5leHRDb250ZW50KV07XG4gICAgICBwcm9jZXNzUXVldWUodGhpcywgdXBkYXRlcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFueSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIGEgbWFya3VwIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0TWFya3VwIFN0cmluZyBvZiBtYXJrdXAuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlTWFya3VwOiBmdW5jdGlvbiAobmV4dE1hcmt1cCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICAvLyBSZW1vdmUgYW55IHJlbmRlcmVkIGNoaWxkcmVuLlxuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudW5tb3VudENoaWxkcmVuKHByZXZDaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHByZXZDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGVUZXh0Q29udGVudCBjYWxsZWQgb24gbm9uLWVtcHR5IGNvbXBvbmVudC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciB1cGRhdGVzID0gW21ha2VTZXRNYXJrdXAobmV4dE1hcmt1cCldO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIG5ldyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMgTmVzdGVkIGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIC8vIEhvb2sgdXNlZCBieSBSZWFjdCBBUlRcbiAgICAgIHRoaXMuX3VwZGF0ZUNoaWxkcmVuKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMgTmVzdGVkIGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGZpbmFsXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF91cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICB2YXIgcmVtb3ZlZE5vZGVzID0ge307XG4gICAgICB2YXIgbmV4dENoaWxkcmVuID0gdGhpcy5fcmVjb25jaWxlclVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4gJiYgIXByZXZDaGlsZHJlbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdXBkYXRlcyA9IG51bGw7XG4gICAgICB2YXIgbmFtZTtcbiAgICAgIC8vIGBuZXh0SW5kZXhgIHdpbGwgaW5jcmVtZW50IGZvciBlYWNoIGNoaWxkIGluIGBuZXh0Q2hpbGRyZW5gLCBidXRcbiAgICAgIC8vIGBsYXN0SW5kZXhgIHdpbGwgYmUgdGhlIGxhc3QgaW5kZXggdmlzaXRlZCBpbiBgcHJldkNoaWxkcmVuYC5cbiAgICAgIHZhciBsYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICB2YXIgbGFzdFBsYWNlZE5vZGUgPSBudWxsO1xuICAgICAgZm9yIChuYW1lIGluIG5leHRDaGlsZHJlbikge1xuICAgICAgICBpZiAoIW5leHRDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW4gJiYgcHJldkNoaWxkcmVuW25hbWVdO1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gbmV4dENoaWxkcmVuW25hbWVdO1xuICAgICAgICBpZiAocHJldkNoaWxkID09PSBuZXh0Q2hpbGQpIHtcbiAgICAgICAgICB1cGRhdGVzID0gZW5xdWV1ZSh1cGRhdGVzLCB0aGlzLm1vdmVDaGlsZChwcmV2Q2hpbGQsIGxhc3RQbGFjZWROb2RlLCBuZXh0SW5kZXgsIGxhc3RJbmRleCkpO1xuICAgICAgICAgIGxhc3RJbmRleCA9IE1hdGgubWF4KHByZXZDaGlsZC5fbW91bnRJbmRleCwgbGFzdEluZGV4KTtcbiAgICAgICAgICBwcmV2Q2hpbGQuX21vdW50SW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByZXZDaGlsZCkge1xuICAgICAgICAgICAgLy8gVXBkYXRlIGBsYXN0SW5kZXhgIGJlZm9yZSBgX21vdW50SW5kZXhgIGdldHMgdW5zZXQgYnkgdW5tb3VudGluZy5cbiAgICAgICAgICAgIGxhc3RJbmRleCA9IE1hdGgubWF4KHByZXZDaGlsZC5fbW91bnRJbmRleCwgbGFzdEluZGV4KTtcbiAgICAgICAgICAgIC8vIFRoZSBgcmVtb3ZlZE5vZGVzYCBsb29wIGJlbG93IHdpbGwgYWN0dWFsbHkgcmVtb3ZlIHRoZSBjaGlsZC5cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVGhlIGNoaWxkIG11c3QgYmUgaW5zdGFudGlhdGVkIGJlZm9yZSBpdCdzIG1vdW50ZWQuXG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5fbW91bnRDaGlsZEF0SW5kZXgobmV4dENoaWxkLCBsYXN0UGxhY2VkTm9kZSwgbmV4dEluZGV4LCB0cmFuc2FjdGlvbiwgY29udGV4dCkpO1xuICAgICAgICB9XG4gICAgICAgIG5leHRJbmRleCsrO1xuICAgICAgICBsYXN0UGxhY2VkTm9kZSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKG5leHRDaGlsZCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgY2hpbGRyZW4gdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQuXG4gICAgICBmb3IgKG5hbWUgaW4gcmVtb3ZlZE5vZGVzKSB7XG4gICAgICAgIGlmIChyZW1vdmVkTm9kZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICB1cGRhdGVzID0gZW5xdWV1ZSh1cGRhdGVzLCB0aGlzLl91bm1vdW50Q2hpbGQocHJldkNoaWxkcmVuW25hbWVdLCByZW1vdmVkTm9kZXNbbmFtZV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVwZGF0ZXMpIHtcbiAgICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG5leHRDaGlsZHJlbjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tb3VudHMgYWxsIHJlbmRlcmVkIGNoaWxkcmVuLiBUaGlzIHNob3VsZCBiZSB1c2VkIHRvIGNsZWFuIHVwIGNoaWxkcmVuXG4gICAgICogd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQuIEl0IGRvZXMgbm90IGFjdHVhbGx5IHBlcmZvcm0gYW55XG4gICAgICogYmFja2VuZCBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdW5tb3VudENoaWxkcmVuOiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgICB2YXIgcmVuZGVyZWRDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51bm1vdW50Q2hpbGRyZW4ocmVuZGVyZWRDaGlsZHJlbiwgc2FmZWx5KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhIGNoaWxkIGNvbXBvbmVudCB0byB0aGUgc3VwcGxpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gbW92ZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG9JbmRleCBEZXN0aW5hdGlvbiBpbmRleCBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGFzdEluZGV4IExhc3QgaW5kZXggdmlzaXRlZCBvZiB0aGUgc2libGluZ3Mgb2YgYGNoaWxkYC5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgbW92ZUNoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIGFmdGVyTm9kZSwgdG9JbmRleCwgbGFzdEluZGV4KSB7XG4gICAgICAvLyBJZiB0aGUgaW5kZXggb2YgYGNoaWxkYCBpcyBsZXNzIHRoYW4gYGxhc3RJbmRleGAsIHRoZW4gaXQgbmVlZHMgdG9cbiAgICAgIC8vIGJlIG1vdmVkLiBPdGhlcndpc2UsIHdlIGRvIG5vdCBuZWVkIHRvIG1vdmUgaXQgYmVjYXVzZSBhIGNoaWxkIHdpbGwgYmVcbiAgICAgIC8vIGluc2VydGVkIG9yIG1vdmVkIGJlZm9yZSBgY2hpbGRgLlxuICAgICAgaWYgKGNoaWxkLl9tb3VudEluZGV4IDwgbGFzdEluZGV4KSB7XG4gICAgICAgIHJldHVybiBtYWtlTW92ZShjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNoaWxkIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byBjcmVhdGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vdW50SW1hZ2UgTWFya3VwIHRvIGluc2VydC5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY3JlYXRlQ2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgYWZ0ZXJOb2RlLCBtb3VudEltYWdlKSB7XG4gICAgICByZXR1cm4gbWFrZUluc2VydE1hcmt1cChtb3VudEltYWdlLCBhZnRlck5vZGUsIGNoaWxkLl9tb3VudEluZGV4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGNoaWxkIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENoaWxkIHRvIHJlbW92ZS5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVtb3ZlQ2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgbm9kZSkge1xuICAgICAgcmV0dXJuIG1ha2VSZW1vdmUoY2hpbGQsIG5vZGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNb3VudHMgYSBjaGlsZCB3aXRoIHRoZSBzdXBwbGllZCBuYW1lLlxuICAgICAqXG4gICAgICogTk9URTogVGhpcyBpcyBwYXJ0IG9mIGB1cGRhdGVDaGlsZHJlbmAgYW5kIGlzIGhlcmUgZm9yIHJlYWRhYmlsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIG1vdW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGNoaWxkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIGNoaWxkLlxuICAgICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9tb3VudENoaWxkQXRJbmRleDogZnVuY3Rpb24gKGNoaWxkLCBhZnRlck5vZGUsIGluZGV4LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIG1vdW50SW1hZ2UgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoY2hpbGQsIHRyYW5zYWN0aW9uLCB0aGlzLCB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KTtcbiAgICAgIGNoaWxkLl9tb3VudEluZGV4ID0gaW5kZXg7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVDaGlsZChjaGlsZCwgYWZ0ZXJOb2RlLCBtb3VudEltYWdlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tb3VudHMgYSByZW5kZXJlZCBjaGlsZC5cbiAgICAgKlxuICAgICAqIE5PVEU6IFRoaXMgaXMgcGFydCBvZiBgdXBkYXRlQ2hpbGRyZW5gIGFuZCBpcyBoZXJlIGZvciByZWFkYWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byB1bm1vdW50LlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VubW91bnRDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBub2RlKSB7XG4gICAgICB2YXIgdXBkYXRlID0gdGhpcy5yZW1vdmVDaGlsZChjaGlsZCwgbm9kZSk7XG4gICAgICBjaGlsZC5fbW91bnRJbmRleCA9IG51bGw7XG4gICAgICByZXR1cm4gdXBkYXRlO1xuICAgIH1cblxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RNdWx0aUNoaWxkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE11bHRpQ2hpbGQuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlNaXJyb3InKTtcblxuLyoqXG4gKiBXaGVuIGEgY29tcG9uZW50J3MgY2hpbGRyZW4gYXJlIHVwZGF0ZWQsIGEgc2VyaWVzIG9mIHVwZGF0ZSBjb25maWd1cmF0aW9uXG4gKiBvYmplY3RzIGFyZSBjcmVhdGVkIGluIG9yZGVyIHRvIGJhdGNoIGFuZCBzZXJpYWxpemUgdGhlIHJlcXVpcmVkIGNoYW5nZXMuXG4gKlxuICogRW51bWVyYXRlcyBhbGwgdGhlIHBvc3NpYmxlIHR5cGVzIG9mIHVwZGF0ZSBjb25maWd1cmF0aW9ucy5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzID0ga2V5TWlycm9yKHtcbiAgSU5TRVJUX01BUktVUDogbnVsbCxcbiAgTU9WRV9FWElTVElORzogbnVsbCxcbiAgUkVNT1ZFX05PREU6IG51bGwsXG4gIFNFVF9NQVJLVVA6IG51bGwsXG4gIFRFWFRfQ09OVEVOVDogbnVsbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2hpbGRSZWNvbmNpbGVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcblxudmFyIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gaW5zdGFudGlhdGVDaGlsZChjaGlsZEluc3RhbmNlcywgY2hpbGQsIG5hbWUpIHtcbiAgLy8gV2UgZm91bmQgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gIHZhciBrZXlVbmlxdWUgPSBjaGlsZEluc3RhbmNlc1tuYW1lXSA9PT0gdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGtleVVuaXF1ZSwgJ2ZsYXR0ZW5DaGlsZHJlbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXksICcgKyAnYCVzYC4gQ2hpbGQga2V5cyBtdXN0IGJlIHVuaXF1ZTsgd2hlbiB0d28gY2hpbGRyZW4gc2hhcmUgYSBrZXksIG9ubHkgJyArICd0aGUgZmlyc3QgY2hpbGQgd2lsbCBiZSB1c2VkLicsIG5hbWUpIDogdm9pZCAwO1xuICB9XG4gIGlmIChjaGlsZCAhPSBudWxsICYmIGtleVVuaXF1ZSkge1xuICAgIGNoaWxkSW5zdGFuY2VzW25hbWVdID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChjaGlsZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWFjdENoaWxkUmVjb25jaWxlciBwcm92aWRlcyBoZWxwZXJzIGZvciBpbml0aWFsaXppbmcgb3IgdXBkYXRpbmcgYSBzZXQgb2ZcbiAqIGNoaWxkcmVuLiBJdHMgb3V0cHV0IGlzIHN1aXRhYmxlIGZvciBwYXNzaW5nIGl0IG9udG8gUmVhY3RNdWx0aUNoaWxkIHdoaWNoXG4gKiBkb2VzIGRpZmZlZCByZW9yZGVyaW5nIGFuZCBpbnNlcnRpb24uXG4gKi9cbnZhciBSZWFjdENoaWxkUmVjb25jaWxlciA9IHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIFwibW91bnQgaW1hZ2VcIiBmb3IgZWFjaCBvZiB0aGUgc3VwcGxpZWQgY2hpbGRyZW4uIEluIHRoZSBjYXNlXG4gICAqIG9mIGBSZWFjdERPTUNvbXBvbmVudGAsIGEgbW91bnQgaW1hZ2UgaXMgYSBzdHJpbmcgb2YgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5lc3RlZENoaWxkTm9kZXMgTmVzdGVkIGNoaWxkIG1hcHMuXG4gICAqIEByZXR1cm4gez9vYmplY3R9IEEgc2V0IG9mIGNoaWxkIGluc3RhbmNlcy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBpbnN0YW50aWF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAobmVzdGVkQ2hpbGROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICBpZiAobmVzdGVkQ2hpbGROb2RlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGNoaWxkSW5zdGFuY2VzID0ge307XG4gICAgdHJhdmVyc2VBbGxDaGlsZHJlbihuZXN0ZWRDaGlsZE5vZGVzLCBpbnN0YW50aWF0ZUNoaWxkLCBjaGlsZEluc3RhbmNlcyk7XG4gICAgcmV0dXJuIGNoaWxkSW5zdGFuY2VzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSByZW5kZXJlZCBjaGlsZHJlbiBhbmQgcmV0dXJucyBhIG5ldyBzZXQgb2YgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNoaWxkcmVuIFByZXZpb3VzbHkgaW5pdGlhbGl6ZWQgc2V0IG9mIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDaGlsZHJlbiBGbGF0IGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fSBBIG5ldyBzZXQgb2YgY2hpbGQgaW5zdGFuY2VzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAocHJldkNoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAvLyBXZSBjdXJyZW50bHkgZG9uJ3QgaGF2ZSBhIHdheSB0byB0cmFjayBtb3ZlcyBoZXJlIGJ1dCBpZiB3ZSB1c2UgaXRlcmF0b3JzXG4gICAgLy8gaW5zdGVhZCBvZiBmb3IuLmluIHdlIGNhbiB6aXAgdGhlIGl0ZXJhdG9ycyBhbmQgY2hlY2sgaWYgYW4gaXRlbSBoYXNcbiAgICAvLyBtb3ZlZC5cbiAgICAvLyBUT0RPOiBJZiBub3RoaW5nIGhhcyBjaGFuZ2VkLCByZXR1cm4gdGhlIHByZXZDaGlsZHJlbiBvYmplY3Qgc28gdGhhdCB3ZVxuICAgIC8vIGNhbiBxdWlja2x5IGJhaWxvdXQgaWYgbm90aGluZyBoYXMgY2hhbmdlZC5cbiAgICBpZiAoIW5leHRDaGlsZHJlbiAmJiAhcHJldkNoaWxkcmVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBuYW1lO1xuICAgIHZhciBwcmV2Q2hpbGQ7XG4gICAgZm9yIChuYW1lIGluIG5leHRDaGlsZHJlbikge1xuICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW4gJiYgcHJldkNoaWxkcmVuW25hbWVdO1xuICAgICAgdmFyIHByZXZFbGVtZW50ID0gcHJldkNoaWxkICYmIHByZXZDaGlsZC5fY3VycmVudEVsZW1lbnQ7XG4gICAgICB2YXIgbmV4dEVsZW1lbnQgPSBuZXh0Q2hpbGRyZW5bbmFtZV07XG4gICAgICBpZiAocHJldkNoaWxkICE9IG51bGwgJiYgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSkge1xuICAgICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudChwcmV2Q2hpbGQsIG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgIG5leHRDaGlsZHJlbltuYW1lXSA9IHByZXZDaGlsZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGQpIHtcbiAgICAgICAgICByZW1vdmVkTm9kZXNbbmFtZV0gPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShwcmV2Q2hpbGQpO1xuICAgICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHByZXZDaGlsZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBjaGlsZCBtdXN0IGJlIGluc3RhbnRpYXRlZCBiZWZvcmUgaXQncyBtb3VudGVkLlxuICAgICAgICB2YXIgbmV4dENoaWxkSW5zdGFuY2UgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRFbGVtZW50KTtcbiAgICAgICAgbmV4dENoaWxkcmVuW25hbWVdID0gbmV4dENoaWxkSW5zdGFuY2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFVubW91bnQgY2hpbGRyZW4gdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQuXG4gICAgZm9yIChuYW1lIGluIHByZXZDaGlsZHJlbikge1xuICAgICAgaWYgKHByZXZDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiAhKG5leHRDaGlsZHJlbiAmJiBuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpKSB7XG4gICAgICAgIHByZXZDaGlsZCA9IHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgcmVtb3ZlZE5vZGVzW25hbWVdID0gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUocHJldkNoaWxkKTtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocHJldkNoaWxkLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVbm1vdW50cyBhbGwgcmVuZGVyZWQgY2hpbGRyZW4uIFRoaXMgc2hvdWxkIGJlIHVzZWQgdG8gY2xlYW4gdXAgY2hpbGRyZW5cbiAgICogd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcmVuZGVyZWRDaGlsZHJlbiBQcmV2aW91c2x5IGluaXRpYWxpemVkIHNldCBvZiBjaGlsZHJlbi5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q2hpbGRyZW46IGZ1bmN0aW9uIChyZW5kZXJlZENoaWxkcmVuLCBzYWZlbHkpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHJlbmRlcmVkQ2hpbGRyZW4pIHtcbiAgICAgIGlmIChyZW5kZXJlZENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHZhciByZW5kZXJlZENoaWxkID0gcmVuZGVyZWRDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocmVuZGVyZWRDaGlsZCwgc2FmZWx5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkUmVjb25jaWxlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZFJlY29uY2lsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZmxhdHRlbkNoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgcGFzc2VkIHRocm91Z2ggdHJhdmVyc2FsLlxuICogQHBhcmFtIHs/UmVhY3RDb21wb25lbnR9IGNoaWxkIFJlYWN0IGNoaWxkIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZSBTdHJpbmcgbmFtZSBvZiBrZXkgcGF0aCB0byBjaGlsZC5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICAvLyBXZSBmb3VuZCBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgdmFyIHJlc3VsdCA9IHRyYXZlcnNlQ29udGV4dDtcbiAgdmFyIGtleVVuaXF1ZSA9IHJlc3VsdFtuYW1lXSA9PT0gdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGtleVVuaXF1ZSwgJ2ZsYXR0ZW5DaGlsZHJlbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXksICcgKyAnYCVzYC4gQ2hpbGQga2V5cyBtdXN0IGJlIHVuaXF1ZTsgd2hlbiB0d28gY2hpbGRyZW4gc2hhcmUgYSBrZXksIG9ubHkgJyArICd0aGUgZmlyc3QgY2hpbGQgd2lsbCBiZSB1c2VkLicsIG5hbWUpIDogdm9pZCAwO1xuICB9XG4gIGlmIChrZXlVbmlxdWUgJiYgY2hpbGQgIT0gbnVsbCkge1xuICAgIHJlc3VsdFtuYW1lXSA9IGNoaWxkO1xuICB9XG59XG5cbi8qKlxuICogRmxhdHRlbnMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLiBBbnkgbnVsbFxuICogY2hpbGRyZW4gd2lsbCBub3QgYmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdGluZyBvYmplY3QuXG4gKiBAcmV0dXJuIHshb2JqZWN0fSBmbGF0dGVuZWQgY2hpbGRyZW4ga2V5ZWQgYnkgbmFtZS5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlbkNoaWxkcmVuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9mbGF0dGVuQ2hpbGRyZW4uanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW52YXJpYW50L2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cblxudmFyIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZU5vZGUgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG4gICAgdGhpcy5fd3JhcHBlclN0YXRlID0gbnVsbDtcbiAgICB0aGlzLl90b3BMZXZlbFdyYXBwZXIgPSBudWxsO1xufTtcblxuUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50LmRpc3BsYXlOYW1lID0gJ1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCc7XG5cblJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5NaXhpbiA9IHtcbiAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlUGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlQ29udGFpbmVySW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbmF0aXZlUGFyZW50O1xuICAgICAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbmF0aXZlQ29udGFpbmVySW5mbztcblxuICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0ge2VtcHR5OiB0cnVlfTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRFbGVtZW50O1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCkge1xuICAgIH0sXG5cbiAgICBnZXROYXRpdmVOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVOb2RlO1xuICAgIH0sXG5cbiAgICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIH0sXG5cbiAgICBnZXRQdWJsaWNJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEVsZW1lbnQ7XG4gICAgfVxufTtcblxuXG5hc3NpZ24oXG4gICAgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50LnByb3RvdHlwZSxcbiAgICBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuTWl4aW5cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBcbiAqIFRoaXMgZmlsZSBpcyBhIG1vZGlmaWVkIHZlcnNpb24gb2Y6XG4gKiAgcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQuanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RQZXJmJyk7XG5cbnZhciBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQgPSB7XG4gICAgcHJvY2Vzc0NoaWxkcmVuVXBkYXRlczogZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICB9LFxuICAgIHJlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICB9XG59O1xuXG5SZWFjdFBlcmYubWVhc3VyZU1ldGhvZHMoXG4gICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LFxuICAgICdSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQnLFxuICAgIHtcbiAgICAgICAgcmVwbGFjZU5vZGVXaXRoTWFya3VwOiAncmVwbGFjZU5vZGVXaXRoTWFya3VwJyxcbiAgICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjcmVhdGVUcmVlSW1wbCA9IHJlcXVpcmUoJy4vbm9kZS1tYW5hZ2VtZW50L25vZGUtdHJlZS1hZGFwdGVyJyksXHJcbiAgICBjcmVhdGVJbml0QWRhcHRlciA9IHJlcXVpcmUoJy4vbm9kZS1tYW5hZ2VtZW50L25vZGUtaW5pdC1hZGFwdGVyJyksXHJcbiAgICBub2RlVHlwZXMgPSByZXF1aXJlKCcuL2ltcGwvdHlwZXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVHJlZUltcGwoY3JlYXRlSW5pdEFkYXB0ZXIobm9kZVR5cGVzKSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BoYXNlci1pbXBsZW1lbnRhdGlvbi5qc1xuICoqLyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChpbXBsKSB7XHJcbiAgICB2YXIgdHJlZSA9IHtcclxuICAgICAgICAgICAgcm9vdDogbnVsbCxcclxuICAgICAgICAgICAgbm9kZXM6IHt9LFxyXG4gICAgICAgICAgICBieW5hbWU6IHt9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cmVlSW1wbCA9IHtcclxuICAgICAgICAgICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICAgICAgICAgbW91bnQ6IGZ1bmN0aW9uIChpZCwgdGFnLCBwcm9wcywgcGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiB0YWcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiBwcm9wcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnQgJiYgcGFyZW50LmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWUucm9vdCA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWUubm9kZXNbaWRdID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BzLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS5ieW5hbWVbcHJvcHMubmFtZV0gPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW1wbC5jb21wb25lbnRzLm1vdW50KG5vZGUsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTW91bnQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wbC5jb21wb25lbnRzLmNoaWxkcmVuTW91bnQobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdW5tb3VudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbXBsLmNvbXBvbmVudHMudW5tb3VudChub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdHJlZS5ub2Rlc1tub2RlLmlkXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUubm9kZXNbbm9kZS5wYXJlbnRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUuaWQpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRyZWUubm9kZXNbbm9kZS5pZF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUgPT09IHRyZWUucm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlLnJvb3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdHJlZS5ieW5hbWVbbm9kZS5wcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobm9kZSwgbmV4dFByb3BzLCBwcmV2UHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnByb3BzID0gbmV4dFByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwuY29tcG9uZW50cy51cGRhdGUobm9kZSwgcHJldlByb3BzLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFByb3BzLm5hbWUgIT09IHByZXZQcm9wcy5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2UHJvcHMubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRyZWUuYnluYW1lW3ByZXZQcm9wcy5uYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFByb3BzLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWUuYnluYW1lW25leHRQcm9wcy5uYW1lXSA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplOiBpbXBsLnRyYW5zYWN0aW9uLmluaXRpYWxpemUgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwudHJhbnNhY3Rpb24uaW5pdGlhbGl6ZSh0cmVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjbG9zZTogaW1wbC50cmFuc2FjdGlvbi5jbG9zZSAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wbC50cmFuc2FjdGlvbi5jbG9zZSh0cmVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRyZWVJbXBsO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25vZGUtbWFuYWdlbWVudC9ub2RlLXRyZWUtYWRhcHRlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGNyZWF0ZSA9IGZ1bmN0aW9uIChub2RlVHlwZXMpIHtcclxuXHJcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uTGlzdGVuZXJzID0gW10sXHJcblxyXG4gICAgICAgICAgICBwYXJlbnRJbml0ZCA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gdHJlZS5ub2Rlc1tub2RlLnBhcmVudF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXBhcmVudCB8fCBwYXJlbnQuaW5pdGlhbGl6ZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbnZva2UgPSBmdW5jdGlvbiAobWV0aG9kLCBub2RlLCBhLCBiLCBjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddLFxyXG4gICAgICAgICAgICAgICAgICAgIGYgPSBub2RlVHlwZSAmJiBub2RlVHlwZVttZXRob2RdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZihub2RlLCBhLCBiLCBjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluaXRJbW1lZGlhdGVseSA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFub2RlVHlwZSB8fCAhbm9kZVR5cGVzW25vZGUudGFnXS5kZWZlcnJlZEluaXQ7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbml0ID0gZnVuY3Rpb24gKG1ldGhvZCwgbm9kZSwgdHJlZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpbnZva2UobWV0aG9kLCBub2RlLCB0cmVlLCBtZXRob2RzKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUub2JqLnJub2RlaWQgPSBub2RlLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaW5pdENoaWxkcmVuID0gZnVuY3Rpb24gKHBhcmVudCwgdHJlZSwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyB8fCB7fSxcclxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlID0gX29wdGlvbnMuaW5jbHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBleGNsdWRlID0gX29wdGlvbnMuZXhjbHVkZTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHRyZWUubm9kZXNbcGFyZW50LmNoaWxkcmVuW2ldXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9Jbml0ID0gIWNoaWxkLmluaXRpYWxpemVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIWluY2x1ZGUgfHwgaW5jbHVkZS5pbmRleE9mKGNoaWxkLnRhZykgPj0gMCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghZXhjbHVkZSB8fCBleGNsdWRlLmluZGV4T2YoY2hpbGQudGFnKSA8IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9Jbml0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0SW1tZWRpYXRlbHkoY2hpbGQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0KCdpbml0JywgY2hpbGQsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kcy5pbml0Q2hpbGRyZW4oY2hpbGQsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCdvbkNoaWxkcmVuSW5pdCcsIGNoaWxkLCB0cmVlLCBtZXRob2RzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQoJ29uQ2hpbGRyZW5Jbml0JywgY2hpbGQsIHRyZWUsIG1ldGhvZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2xlYXJDaGlsZHJlbiA9IGZ1bmN0aW9uIChwYXJlbnQsIHRyZWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMgfHwge30sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZSA9IF9vcHRpb25zLmluY2x1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZSA9IF9vcHRpb25zLmV4Y2x1ZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB0cmVlLm5vZGVzW3BhcmVudC5jaGlsZHJlbltpXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3VsZENsZWFyID0gY2hpbGQuaW5pdGlhbGl6ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghaW5jbHVkZSB8fCBpbmNsdWRlLmluZGV4T2YoY2hpbGQudGFnKSA+PSAwKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFleGNsdWRlIHx8IGV4Y2x1ZGUuaW5kZXhPZihjaGlsZC50YWcpIDwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRDbGVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2UoJ2NsZWFyJywgdHJlZSwgbWV0aG9kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNoaWxkcmVuKGNoaWxkLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3RUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbkxpc3RlbmVycy5pbmRleE9mKG5vZGVpZCkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25MaXN0ZW5lcnMucHVzaChub2RlaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY2FuY2VsVHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24gPSBmdW5jdGlvbiAobm9kZWlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0cmFuc2FjdGlvbkxpc3RlbmVycy5pbmRleE9mKG5vZGVpZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uTGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICAgICAgaW5pdENoaWxkcmVuOiBpbml0Q2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICBjbGVhckNoaWxkcmVuOiBjbGVhckNoaWxkcmVuLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uOiByZXF1ZXN0VHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24sXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxUcmFuc2FjdGlvbk5vZml0aWNhdGlvbjogY2FuY2VsVHJhbnNhY3Rpb25Ob2ZpdGljYXRpb25cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGltcGwgPSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91bnQ6IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0SW1tZWRpYXRlbHkobm9kZSkgJiYgcGFyZW50SW5pdGQobm9kZSwgdHJlZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQoJ2luaXQnLCBub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW5Nb3VudDogZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZSgnb25DaGlsZHJlbkluaXQnLCBub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJlbnRJbml0ZChub2RlLCB0cmVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCgnb25DaGlsZHJlbkluaXQnLCBub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdW5tb3VudDogZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCdraWxsJywgbm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChub2RlLCBwcmV2UHJvcHMsIHRyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCd1cGRhdGUnLCBub2RlLCBwcmV2UHJvcHMsIHRyZWUsIG1ldGhvZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlOiBmdW5jdGlvbiAodHJlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNhY3Rpb25MaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc2FjdGlvbkxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gdHJlZS5ub2Rlc1t0cmFuc2FjdGlvbkxpc3RlbmVyc1tpXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCdub3RpZnlUcmFuc2FjdGlvbicsIG5vZGUsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uTGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBpbXBsO1xyXG4gICAgfVxyXG4gICAgO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25vZGUtbWFuYWdlbWVudC9ub2RlLWluaXQtYWRhcHRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge1xyXG4gICAgICAgIGdhbWU6IHJlcXVpcmUoJy4vZ2FtZScpLFxyXG4gICAgICAgIHN0YXRlOiByZXF1aXJlKCcuL3N0YXRlJyksXHJcbiAgICAgICAgc3ByaXRlOiByZXF1aXJlKCcuL3Nwcml0ZScpLFxyXG4gICAgICAgIGdyb3VwOiByZXF1aXJlKCcuL2dyb3VwJyksXHJcbiAgICAgICAgYW5pbWF0aW9uOiByZXF1aXJlKCcuL2FuaW1hdGlvbicpLFxyXG4gICAgICAgIGNvbGxpZGVzOiByZXF1aXJlKCcuL2NvbGxpZGVzJyksXHJcbiAgICAgICAgb3ZlcmxhcHM6IHJlcXVpcmUoJy4vb3ZlcmxhcHMnKSxcclxuICAgICAgICB0ZXh0OiByZXF1aXJlKCcuL3RleHQnKSxcclxuICAgICAgICBidXR0b246IHJlcXVpcmUoJy4vYnV0dG9uJylcclxuICAgIH0sXHJcbiAgICByZXF1aXJlKCcuL2dyYXBoaWNzJyksXHJcbiAgICByZXF1aXJlKCcuL2lucHV0JylcclxuKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4dGVuZC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1cGRhdGVHYW1lID0gZnVuY3Rpb24gKG5vZGUsIGxhc3RQcm9wcykge1xyXG4gICAgICAgIGlmIChsYXN0UHJvcHMgJiYgbGFzdFByb3BzLnN0YXRlTmFtZSAhPT0gbm9kZS5wcm9wcy5zdGF0ZU5hbWUpIHtcclxuICAgICAgICAgICAgbm9kZS5vYmouc3RhdGUuc3RhcnQobm9kZS5wcm9wcy5zdGF0ZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25DaGlsZHJlbkluaXQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSwgbm9kZU1ldGhvZHMpIHtcclxuICAgICAgICBub2RlLl91cGRhdGVNZXRob2RzID0gW107XHJcbiAgICAgICAgbm9kZS5hZGRVcGRhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBub2RlLl91cGRhdGVNZXRob2RzLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbm9kZS5yZW1vdmVVcGRhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBub2RlLl91cGRhdGVNZXRob2RzLmluZGV4T2YobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcyxcclxuICAgICAgICAgICAgZ2FtZUltcGwgPSB7XHJcbiAgICAgICAgICAgICAgICBwcmVsb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BzLmFzc2V0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhwcm9wcy5hc3NldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2V0ID0gcHJvcHMuYXNzZXRzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGFzc2V0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShrZXksIGFzc2V0LnNyYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Nwcml0ZXNoZWV0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KGtleSwgYXNzZXQuc3JjLCBhc3NldC53aWR0aCwgYXNzZXQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBub2RlTWV0aG9kcy5pbml0Q2hpbGRyZW4obm9kZSwgdHJlZSwge2luY2x1ZGU6IFsnYXNzZXRzJ119KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMuaGFzT3duUHJvcGVydHkoJ3BoeXNpY3MnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm9iai5waHlzaWNzLnN0YXJ0U3lzdGVtKG5vZGUucHJvcHMucGh5c2ljcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBub2RlTWV0aG9kcy5pbml0Q2hpbGRyZW4obm9kZSwgdHJlZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnByb3BzLnN0YXRlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KG5vZGUucHJvcHMuc3RhdGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLl91cGRhdGVNZXRob2RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuX3VwZGF0ZU1ldGhvZHNbaV0oY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShwcm9wcy53aWR0aCwgcHJvcHMuaGVpZ2h0LCBwcm9wcy5tb2RlIHx8IFBoYXNlci5BVVRPLCAnJywgZ2FtZUltcGwpLFxyXG4gICAgICAgICAgICBjb250ZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgZ2FtZTogZ2FtZSxcclxuICAgICAgICAgICAgICAgIG5vZGVzOiB0cmVlLmJ5bmFtZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBub2RlLm9iaiA9IGdhbWU7XHJcbiAgICAgICAgbm9kZS5jb250ZXh0ID0gY29udGV4dDtcclxuXHJcbiAgICAgICAgdXBkYXRlR2FtZShub2RlLCBudWxsLCB0cmVlKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IG51bGwsXHJcbiAgICBvbkNoaWxkcmVuSW5pdDogb25DaGlsZHJlbkluaXQsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUdhbWUsXHJcbiAgICBraWxsOiBudWxsLFxyXG4gICAgZGVmZXJyZWRJbml0OiB0cnVlXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ2FtZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICBcclxuICAgIG9uQ2hpbGRyZW5Jbml0ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUsIHRyZWVNZXRob2RzKSB7XHJcbiAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kcyA9IFtdO1xyXG4gICAgICAgIG5vZGUuYWRkVXBkYXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kcy5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG5vZGUucmVtb3ZlVXBkYXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gbm9kZS5fdXBkYXRlTWV0aG9kcy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuX3VwZGF0ZU1ldGhvZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHMsXHJcbiAgICAgICAgICAgIHN0YXRlSW1wbCA9IHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnByb3BzLmhhc093blByb3BlcnR5KCdwaHlzaWNzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5vYmoucGh5c2ljcy5zdGFydFN5c3RlbShub2RlLnByb3BzLnBoeXNpY3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZU1ldGhvZHMuY2xlYXJDaGlsZHJlbihub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmVlTWV0aG9kcy5pbml0Q2hpbGRyZW4obm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLl91cGRhdGVNZXRob2RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuX3VwZGF0ZU1ldGhvZHNbaV0oY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnYW1lID0gdHJlZVV0aWxzLmdhbWUodHJlZSksXHJcbiAgICAgICAgICAgIHN0YXRlID0gZ2FtZS5zdGF0ZS5hZGQocHJvcHMubmFtZSwgc3RhdGVJbXBsKSxcclxuICAgICAgICAgICAgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgICAgIGdhbWU6IGdhbWUsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBub2RlczogdHJlZS5ieW5hbWVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbm9kZS5vYmogPSBzdGF0ZTtcclxuICAgICAgICBub2RlLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogbnVsbCxcclxuICAgIG9uQ2hpbGRyZW5Jbml0OiBvbkNoaWxkcmVuSW5pdCxcclxuICAgIGtpbGw6IG51bGwsXHJcbiAgICBkZWZlcnJlZEluaXQ6IHRydWVcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9zdGF0ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICBzcHJpdGVQcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlNwcml0ZScpLFxyXG5cclxuICAgIHVwZGF0ZVNwcml0ZSA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShzcHJpdGVQcm9wZXJ0ZXMpLFxyXG4gICAgXHJcbiAgICBpbml0U3ByaXRlID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzO1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5TcHJpdGUodHJlZVV0aWxzLmdhbWUodHJlZSksIHByb3BzLngsIHByb3BzLnksIHByb3BzLmFzc2V0S2V5KTtcclxuICAgICAgICB0cmVlVXRpbHMuYWRkRGlzcGxheU9iamVjdChub2RlLCB0cmVlKTtcclxuICAgICAgICB1cGRhdGVTcHJpdGUobm9kZSwgbnVsbCwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxTcHJpdGUgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRTcHJpdGUsXHJcbiAgICBraWxsOiBraWxsU3ByaXRlLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVTcHJpdGVcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9zcHJpdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5TcHJpdGUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Db3JlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5nbGUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BbmltYXRpb24nKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJyaW5nVG9Ub3AnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Dcm9wJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVsdGEnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkluQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuTG9hZFRleHR1cmUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHknKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5SZXNldCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNjYWxlTWluTWF4JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuU21vb3RoZWQnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlNwcml0ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lcicpXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuU3ByaXRlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0JylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuZ2VuZXJhdGVQb2ludFByb3BNYXAoWydzY2FsZSddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpLFxyXG5cclxuICAgIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXAgPSBmdW5jdGlvbiAocHJlZml4LCBwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ICsgcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSldID0gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcmVmaXhdW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZ2VuZXJhdGVQb2ludFByb3BNYXAgPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgYWNjW3Byb3BdID0gZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBwcmV2VmFsdWUsIGlzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBub2RlLm9ialtwcm9wXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc05ldyB8fCB2YWx1ZS54ICE9PSBwcmV2VmFsdWUueCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnggPSB2YWx1ZS54O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnkgIT09IHByZXZWYWx1ZS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueSA9IHZhbHVlLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFjY1twcm9wICsgJ1gnXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJvcF0ueCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhY2NbcHJvcCArICdZJ10gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdLnkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXAgPSBmdW5jdGlvbiAocHJlZml4LCBwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICB2YXIgcHJlZml4ZWRQcm9wID0gcHJlZml4ICsgcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSk7XHJcbiAgICAgICAgICAgIGFjY1twcmVmaXhlZFByb3BdID0gZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCBwcmV2VmFsdWUsIGlzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBub2RlLm9ialtwcmVmaXhdW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnggIT09IHByZXZWYWx1ZS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueCA9IHZhbHVlLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueSAhPT0gcHJldlZhbHVlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC55ID0gdmFsdWUueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeGVkUHJvcCArICdYJ10gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0ueCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ZWRQcm9wICsgJ1knXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJlZml4XVtwcm9wXS55ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZUFsaWFzUHJvcE1hcCA9IGZ1bmN0aW9uIChhbGlhc2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGFsaWFzZXMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBhbGlhcykge1xyXG4gICAgICAgICAgICB2YXIgcHJvcCA9IGFsaWFzZXNbYWxpYXNdO1xyXG4gICAgICAgICAgICBhY2NbYWxpYXNdID0gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcbiAgICBnZW5lcmF0ZU1vdW50T25seVByb3BNYXAgPSBmdW5jdGlvbiAocHJvcE1hcCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wTWFwKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICB2YXIgaW1wbCA9IHByb3BNYXBbcHJvcF07XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgcHJldlZhbHVlLCBpc05ldywgZGVsZXRlZCwgdHJlZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wbChub2RlLCB2YWx1ZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlRml4ZWRQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgcHJldlZhbHVlLCBpc05ldykge1xyXG4gICAgICAgICAgICAgICAgaW52YXJpYW50KGlzTmV3LCBcIlByb3BlcnR5ICclcycgb2YgJyVzJyBjYW5ub3QgY2hhbmdlLlwiLCBwcm9wLCBub2RlLnRhZyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZ2VuZXJhdGVCYXNpY1Byb3BNYXA6IGdlbmVyYXRlQmFzaWNQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVQcmVmaXhlZEJhc2ljUHJvcE1hcDogZ2VuZXJhdGVQcmVmaXhlZEJhc2ljUHJvcE1hcCxcclxuICAgIGdlbmVyYXRlUG9pbnRQcm9wTWFwOiBnZW5lcmF0ZVBvaW50UHJvcE1hcCxcclxuICAgIGdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXA6IGdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXAsXHJcbiAgICBnZW5lcmF0ZUFsaWFzUHJvcE1hcDogZ2VuZXJhdGVBbGlhc1Byb3BNYXAsXHJcbiAgICBnZW5lcmF0ZU1vdW50T25seVByb3BNYXA6IGdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcCxcclxuICAgIGdlbmVyYXRlRml4ZWRQcm9wTWFwOiBnZW5lcmF0ZUZpeGVkUHJvcE1hcFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvdXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5nZW5lcmF0ZUFsaWFzUHJvcE1hcCh7XHJcbiAgICBhc3NldEtleTogJ2tleSdcclxufSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ29yZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5cclxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydhbmdsZSddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmdsZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2F1dG9jdWxsJ10pO1xyXG4vKipcclxuICogPHJlYWRvbmx5PmluQ2FtZXJhXHJcbiAqL1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Cb3VuZHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJyaW5nVG9Ub3AuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ3JvcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVsdGEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3kuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5DYW1lcmEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5cclxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydjaGVja1dvcmxkQm91bmRzJywgJ291dE9mQm91bmRzS2lsbCddKTtcclxuLyoqXHJcbiAqIDxyZWFkb25seT5pbldvcmxkXHJcbiAqL1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkluV29ybGQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2FsaXZlJywgJ2xpZmVzcGFuJ10pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydmcmFtZScsICdmcmFtZU5hbWUnXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuTG9hZFRleHR1cmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyksXHJcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgdXRpbHMuZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWyd4JywgJ3knXSksXHJcbiAgICByZXF1aXJlKCcuLi9jdXN0b20vYm9keScpXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyksXHJcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyksXHJcbiAgICB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi8uLi90cmVlLXV0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgdXRpbHMuZ2VuZXJhdGVQcmVmaXhlZEJhc2ljUHJvcE1hcCgnYm9keScsIFsnaW1tb3ZhYmxlJywgJ2NvbGxpZGVXb3JsZEJvdW5kcyddKSxcclxuICAgIHV0aWxzLmdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXAoJ2JvZHknLCBbJ2JvdW5jZScsICdncmF2aXR5J10pLFxyXG4gICAgdXRpbHMuZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwKHtcclxuICAgICAgICBib2R5UGh5c2ljczogZnVuY3Rpb24gKG5vZGUsIHZhbHVlLCB0cmVlKSB7XHJcbiAgICAgICAgICAgIHZhciBwaHlzaWNzID0gdHJlZVV0aWxzLnBoeXNpY3Mobm9kZSwgdHJlZSksXHJcbiAgICAgICAgICAgICAgICBzeXN0ZW0gPSB2YWx1ZSAhPT0gdHJ1ZSA/IHZhbHVlIDogcGh5c2ljcy5zeXN0ZW07XHJcblxyXG4gICAgICAgICAgICBwaHlzaWNzLmVuYWJsZShub2RlLm9iaiwgc3lzdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvY3VzdG9tL2JvZHkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlJlc2V0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TY2FsZU1pbk1heC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnc21vb3RoZWQnXSlcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscyA9IHJlcXVpcmUoJy4uL3RyZWUtdXRpbHMnKSxcclxuICAgIGdyb3VwUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cCcpLFxyXG5cclxuICAgIHVwZGF0ZUdyb3VwID0gdHJlZVV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyb3VwUHJvcGVydGVzKSxcclxuXHJcbiAgICBpbml0R3JvdXAgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5Hcm91cCh0cmVlVXRpbHMuZ2FtZSh0cmVlKSk7XHJcbiAgICAgICAgdHJlZVV0aWxzLmFkZERpc3BsYXlPYmplY3Qobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgdXBkYXRlR3JvdXAobm9kZSwgbnVsbCwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxHcm91cCA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfTs7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRHcm91cCxcclxuICAgIGtpbGw6IGtpbGxHcm91cCxcclxuICAgIHVwZGF0ZTogdXBkYXRlR3JvdXBcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncm91cC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyksXHJcbiAgICBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXInKSxcclxuICAgIGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnZW5hYmxlQm9keSddKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JvdXAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vdHJlZS11dGlscycpLFxyXG5cclxuICAgIGluaXRBbmltYXRpb24gPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gdHJlZVV0aWxzLnBhcmVudChub2RlLCB0cmVlKTtcclxuICAgICAgICBub2RlLm9iaiA9IHBhcmVudE5vZGUub2JqLmFuaW1hdGlvbnMuYWRkKG5vZGUucHJvcHMuaWQsIG5vZGUucHJvcHMuZnJhbWVzLCBub2RlLnByb3BzLmZwcywgbm9kZS5wcm9wcy5sb29wKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRBbmltYXRpb24sXHJcbiAgICBraWxsOiBudWxsLFxyXG4gICAgdXBkYXRlOiBudWxsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvYW5pbWF0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscyA9IHJlcXVpcmUoJy4uL3RyZWUtdXRpbHMnKSxcclxuICAgIHN5c3RlbU5hbWUgPSByZXF1aXJlKCcuLi9waHlzaWMtc3lzdGVtLW5hbWUnKSxcclxuXHJcbiAgICBpbml0Q29sbGlkZXMgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBhID0gdHJlZS5ub2Rlc1tub2RlLnBhcmVudF0sXHJcbiAgICAgICAgICAgIGIgPSB0cmVlLmJ5bmFtZVtub2RlLnByb3BzLndpdGhdLFxyXG4gICAgICAgICAgICBuYW1lID0gc3lzdGVtTmFtZShub2RlLnByb3BzLnN5c3RlbSksXHJcbiAgICAgICAgICAgIHN0YXRlTm9kZSA9IHRyZWVVdGlscy5zdGF0ZU5vZGUobm9kZSwgdHJlZSk7XHJcblxyXG4gICAgICAgIG5vZGUub2JqID0ge1xyXG4gICAgICAgICAgICBhOiBhLFxyXG4gICAgICAgICAgICBiOiBiLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2FtZS5waHlzaWNzW25hbWVdLmNvbGxpZGUoYS5vYmosIGIub2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN0YXRlTm9kZS5hZGRVcGRhdGVMaXN0ZW5lcihub2RlLm9iai5vblVwZGF0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxDb2xsaWRlcyA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlTm9kZSA9IHRyZWVVdGlscy5zdGF0ZU5vZGUobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgc3RhdGVOb2RlLnJlbW92ZVVwZGF0ZUxpc3RlbmVyKG5vZGUub2JqLm9uVXBkYXRlKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRDb2xsaWRlcyxcclxuICAgIGtpbGw6IGtpbGxDb2xsaWRlcyxcclxuICAgIHVwZGF0ZTogbnVsbFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2NvbGxpZGVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIG5hbWVzID0ge307XHJcblxyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5BUkNBREVdID0gJ2FyY2FkZSc7XHJcbm5hbWVzW1BoYXNlci5QaHlzaWNzLkJPWDJEXSA9ICdib3gyZCc7XHJcbm5hbWVzW1BoYXNlci5QaHlzaWNzLkNISVBNVU5LXSA9ICdjaGlwbXVuayc7XHJcbm5hbWVzW1BoYXNlci5QaHlzaWNzLk1BVFRFUkpTXSA9ICdtYXR0ZXInO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5OSU5KQV0gPSAnbmluamEnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5QMkpTXSA9ICdwMic7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzeXN0ZW0pIHtcclxuICAgIHJldHVybiBuYW1lc1tzeXN0ZW1dIHx8ICdhcmNhZGUnO1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3BoeXNpYy1zeXN0ZW0tbmFtZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICBzeXN0ZW1OYW1lID0gcmVxdWlyZSgnLi4vcGh5c2ljLXN5c3RlbS1uYW1lJyksXHJcblxyXG4gICAgaW5pdE92ZXJsYXBzID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgYSA9IHRyZWUubm9kZXNbbm9kZS5wYXJlbnRdLFxyXG4gICAgICAgICAgICBiID0gdHJlZS5ieW5hbWVbbm9kZS5wcm9wcy53aXRoXSxcclxuICAgICAgICAgICAgbmFtZSA9IHN5c3RlbU5hbWUobm9kZS5wcm9wcy5zeXN0ZW0pLFxyXG4gICAgICAgICAgICBzdGF0ZU5vZGUgPSB0cmVlVXRpbHMuc3RhdGVOb2RlKG5vZGUsIHRyZWUpLFxyXG4gICAgICAgICAgICBvbk92ZXJsYXAgPSBub2RlLnByb3BzLm9uT3ZlcmxhcDtcclxuXHJcbiAgICAgICAgbm9kZS5vYmogPSB7XHJcbiAgICAgICAgICAgIGE6IGEsXHJcbiAgICAgICAgICAgIGI6IGIsXHJcbiAgICAgICAgICAgIG9uVXBkYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5nYW1lLnBoeXNpY3NbbmFtZV0ub3ZlcmxhcChhLm9iaiwgYi5vYmosIGZ1bmN0aW9uIChvdmVybGFwcGluZ0EsIG92ZXJsYXBwaW5nQikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uT3ZlcmxhcCh0cmVlLm5vZGVzW292ZXJsYXBwaW5nQS5ybm9kZWlkXSwgdHJlZS5ub2Rlc1tvdmVybGFwcGluZ0Iucm5vZGVpZF0sIGNvbnRleHQsIGEsIGIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdGF0ZU5vZGUuYWRkVXBkYXRlTGlzdGVuZXIobm9kZS5vYmoub25VcGRhdGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsT3ZlcmxhcHMgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2Rlcy5nYW1lTm9kZS5yZW1vdmVVcGRhdGVMaXN0ZW5lcihub2RlLm9iai5vblVwZGF0ZSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0T3ZlcmxhcHMsXHJcbiAgICBraWxsOiBraWxsT3ZlcmxhcHMsXHJcbiAgICB1cGRhdGU6IG51bGxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9vdmVybGFwcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICB0ZXh0UHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0JyksXHJcblxyXG4gICAgdXBkYXRlVGV4dCA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZSh0ZXh0UHJvcGVydGVzKSxcclxuXHJcbiAgICBpbml0VGV4dCA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcyxcclxuICAgICAgICAgICAgdGV4dCA9IG5ldyBQaGFzZXIuVGV4dCh0cmVlVXRpbHMuZ2FtZSh0cmVlKSwgMCwgMCwgcHJvcHMudGV4dCwgcHJvcHMuc3R5bGUpLFxyXG4gICAgICAgICAgICBjb250YWluZXIgPSB0cmVlVXRpbHMucGFyZW50KG5vZGUsIHRyZWUpLm9iaixcclxuICAgICAgICAgICAgeCA9IHByb3BzLnggfHwgKHByb3BzLmFsaWduICYmIChjb250YWluZXIud2lkdGggLSB0ZXh0LndpZHRoKSAqIChwcm9wcy5hbGlnbi5pbmRleE9mKCdyaWdodCcpID49IDAgPyAxIDpcclxuICAgICAgICAgICAgICAgICAgICAocHJvcHMuYWxpZ24uaW5kZXhPZignY2VudGVyJykgPj0gMCA/IC41IDogMCkpKSB8fCAwLFxyXG4gICAgICAgICAgICB5ID0gcHJvcHMueSB8fCAocHJvcHMuYWxpZ24gJiYgKGNvbnRhaW5lci5oZWlnaHQgLSB0ZXh0LmhlaWdodCkgKiAocHJvcHMuYWxpZ24uaW5kZXhPZignYm90dG9tJykgPj0gMCA/IDEgOlxyXG4gICAgICAgICAgICAgICAgICAgIChwcm9wcy5hbGlnbi5pbmRleE9mKCdtaWRkbGUnKSA+PSAwID8gLjUgOiAwKSkpIHx8IDA7XHJcblxyXG4gICAgICAgIHRleHQueCA9IHg7XHJcbiAgICAgICAgdGV4dC55ID0geTtcclxuICAgICAgICBub2RlLm9iaiA9IHRleHQ7XHJcbiAgICAgICAgdHJlZVV0aWxzLmFkZERpc3BsYXlPYmplY3Qobm9kZSwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxUZXh0ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdFRleHQsXHJcbiAgICBraWxsOiBraWxsVGV4dCxcclxuICAgIHVwZGF0ZTogdXBkYXRlVGV4dFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL3RleHQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpLFxyXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLlNwcml0ZScpLFxyXG4gICAgdXRpbHMuZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWyd0ZXh0J10pXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuVGV4dC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICBidXR0b25Qcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbicpLFxyXG5cclxuICAgIHVwZGF0ZUJ1dHRvbiA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShidXR0b25Qcm9wZXJ0ZXMpLFxyXG5cclxuICAgIGluaXRCdXR0b24gPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHMsXHJcbiAgICAgICAgICAgIGtleSA9IHByb3BzLmFzc2V0S2V5LFxyXG4gICAgICAgICAgICBnYW1lID0gdHJlZVV0aWxzLmdhbWUodHJlZSk7XHJcblxyXG4gICAgICAgIG5vZGUuYnV0dG9uID0gbmV3IFBoYXNlci5CdXR0b24oXHJcbiAgICAgICAgICAgIGdhbWUsXHJcbiAgICAgICAgICAgIHByb3BzLngsXHJcbiAgICAgICAgICAgIHByb3BzLnksXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgcHJvcHMub25DbGljayxcclxuICAgICAgICAgICAgbm9kZSxcclxuICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzBdLFxyXG4gICAgICAgICAgICBwcm9wcy5mcmFtZXNbMV0sXHJcbiAgICAgICAgICAgIHByb3BzLmZyYW1lc1syXSxcclxuICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzNdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUucHJvcHMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyb3VwKGdhbWUpO1xyXG4gICAgICAgICAgICBub2RlLm9iai5hZGQobm9kZS5idXR0b24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gbm9kZS5idXR0b247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmVlVXRpbHMuYWRkRGlzcGxheU9iamVjdChub2RlLCB0cmVlKTtcclxuICAgICAgICB1cGRhdGVCdXR0b24obm9kZSwgbnVsbCwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxCdXR0b24gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iai5raWxsKCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0QnV0dG9uLFxyXG4gICAga2lsbDoga2lsbEJ1dHRvbixcclxuICAgIHVwZGF0ZTogdXBkYXRlQnV0dG9uXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvYnV0dG9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJvcHNDaGFuZ2VkID0gZnVuY3Rpb24gKG5leHRQcm9wcywgbGFzdFByb3BzKSB7XG4gICAgICAgIGlmICghbGFzdFByb3BzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBucGwgPSBPYmplY3Qua2V5cyhuZXh0UHJvcHMpLFxuICAgICAgICAgICAgbHBsID0gT2JqZWN0LmtleXMobGFzdFByb3BzKTtcblxuICAgICAgICBpZiAobnBsLmxlbmd0aCAhPT0gbHBsLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5wbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3AgPSBucGxbaV07XG4gICAgICAgICAgICBpZiAobmV4dFByb3BzW3Byb3BdICE9PSBsYXN0UHJvcHNbcHJvcF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgZ2VuUHJvcGVydHlNYXBVcGRhdGUgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2RlLCBwcmV2UHJvcHMsIHRyZWUpIHtcbiAgICAgICAgICAgIGlmIChwcmV2UHJvcHMpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhwcmV2UHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BzW3Byb3BdICYmIHR5cGVvZiBub2RlLnByb3BzW3Byb3BdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbcHJvcF0obm9kZSwgbm9kZS5wcm9wc1twcm9wXSwgcHJldlByb3BzW3Byb3BdLCBmYWxzZSwgdHJ1ZSwgdHJlZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG5vZGUucHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNbcHJvcF0gJiYgKCFwcmV2UHJvcHMgfHwgbm9kZS5wcm9wc1twcm9wXSAhPT0gcHJldlByb3BzW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wc1twcm9wXShub2RlLCBub2RlLnByb3BzW3Byb3BdLCBwcmV2UHJvcHMgJiYgcHJldlByb3BzW3Byb3BdLCAhcHJldlByb3BzLCBmYWxzZSwgdHJlZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2FtZSA9IGZ1bmN0aW9uICh0cmVlKSB7XG4gICAgICAgIHJldHVybiB0cmVlLnJvb3QgJiYgdHJlZS5yb290Lm9iajtcbiAgICB9LFxuXG4gICAgcGFyZW50ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUsIHR5cGUpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIG5vZGUgPSB0cmVlLm5vZGVzW25vZGUucGFyZW50XTtcbiAgICAgICAgICAgIGlmICghbm9kZSB8fCAhdHlwZSB8fCB0eXBlID09PSBub2RlLnRhZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRlTm9kZSA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBub2RlID0gdHJlZS5ub2Rlc1tub2RlLnBhcmVudF07XG4gICAgICAgICAgICBpZiAoIW5vZGUgfHwgbm9kZS50YWcgPT09ICdnYW1lJyB8fCBub2RlLnRhZyA9PT0gJ3N0YXRlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGFkZERpc3BsYXlPYmplY3QgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSwgb2JqKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLm5vZGVzW25vZGUucGFyZW50XSxcbiAgICAgICAgICAgIGdyb3VwID0gcGFyZW50Lm9iai53b3JsZCB8fCBwYXJlbnQub2JqO1xuXG4gICAgICAgIGdyb3VwLmFkZChvYmogfHwgbm9kZS5vYmopO1xuICAgIH0sXG5cbiAgICBwaHlzaWNzID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcbiAgICAgICAgdmFyIHBoeXNpY3NOb2RlID0gc3RhdGVOb2RlKG5vZGUsIHRyZWUpO1xuICAgICAgICByZXR1cm4gcGh5c2ljc05vZGUgJiYgcGh5c2ljc05vZGUub2JqLnBoeXNpY3M7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJvcHNDaGFuZ2VkOiBwcm9wc0NoYW5nZWQsXG4gICAgZ2VuUHJvcGVydHlNYXBVcGRhdGU6IGdlblByb3BlcnR5TWFwVXBkYXRlLFxuICAgIGdhbWU6IGdhbWUsXG4gICAgcGFyZW50OiBwYXJlbnQsXG4gICAgYWRkRGlzcGxheU9iamVjdDogYWRkRGlzcGxheU9iamVjdCxcbiAgICBzdGF0ZU5vZGU6IHN0YXRlTm9kZSxcbiAgICBwaHlzaWNzOiBwaHlzaWNzXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90cmVlLXV0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5JbWFnZScpXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQnV0dG9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuU3ByaXRlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ29yZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Cb3VuZHMnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ3JvcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlbHRhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVzdHJveScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxvYWRUZXh0dXJlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuT3ZlcmxhcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlJlc2V0JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuU21vb3RoZWQnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkltYWdlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7XHJcbiAgICAgICAgZ3JhcGhpY3M6IHJlcXVpcmUoJy4vZ3JhcGhpY3MnKSxcclxuICAgICAgICByZW5kZXJ0ZXh0dXJlOiByZXF1aXJlKCcuL3JlbmRlcnRleHR1cmUnKSxcclxuICAgICAgICByZW5kZXJpbWFnZTogcmVxdWlyZSgnLi9yZW5kZXJpbWFnZScpXHJcbiAgICB9LFxyXG4gICAgcmVxdWlyZSgnLi9yZW5kZXJlcnMnKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3RyZWUtdXRpbHMnKSxcclxuICAgIGdyYXBoaWNzUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5HcmFwaGljcycpLFxyXG5cclxuICAgIHVwZGF0ZUdyYXBoaWNzID0gdHJlZVV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyYXBoaWNzUHJvcGVydGVzKSxcclxuXHJcbiAgICBpdGVtVHlwZXMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpLFxyXG5cclxuICAgIGluaXRHcmFwaGljcyA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcztcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JhcGhpY3ModHJlZVV0aWxzLmdhbWUodHJlZSksIHByb3BzLngsIHByb3BzLnkpO1xyXG4gICAgICAgIHRyZWVVdGlscy5hZGREaXNwbGF5T2JqZWN0KG5vZGUsIHRyZWUpO1xyXG4gICAgICAgIHVwZGF0ZUdyYXBoaWNzKG5vZGUsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsR3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DaGlsZHJlbkluaXQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSwgdHJlZU1ldGhvZHMpIHtcclxuICAgICAgICB0cmVlTWV0aG9kcy5jYW5jZWxUcmFuc2FjdGlvbk5vZml0aWNhdGlvbihub2RlLmlkKTtcclxuICAgICAgICBkcmF3KG5vZGUsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWRyYXcgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmNsZWFyKCk7XHJcbiAgICAgICAgZHJhdyhub2RlLCB0cmVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZHJhdyA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHRyZWUubm9kZXNbbm9kZS5jaGlsZHJlbltpXV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZXNbY2hpbGQudGFnXSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGVzW2NoaWxkLnRhZ10uZHJhdyhjaGlsZCwgdHJlZSwgbm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdEdyYXBoaWNzLFxyXG4gICAgb25DaGlsZHJlbkluaXQ6IG9uQ2hpbGRyZW5Jbml0LFxyXG4gICAga2lsbDoga2lsbEdyYXBoaWNzLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcmFwaGljcyxcclxuICAgIG5vdGlmeVRyYW5zYWN0aW9uOiByZWRyYXdcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9ncmFwaGljcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuR3JhcGhpY3MnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Db3JlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5nbGUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3knKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHknKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5SZXNldCcpXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXInKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkdyYXBoaWNzLmpzXG4gKiovIiwidmFyIGNyZWF0ZUdyYXBoaWNzTm9kZSA9IHJlcXVpcmUoJy4vY3JlYXRlLWdyYXBoaWNzLWl0ZW0nKSxcclxuXHJcbiAgICByZW5kZXJlcnMgPSB7XHJcbiAgICAgICAgY2lyY2xlOiBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5kcmF3Q2lyY2xlKFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5kaWFtZXRlciB8fCAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWN0OiBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueCB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMud2lkdGggfHwgMCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuaGVpZ2h0IHx8IDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmU6IGZ1bmN0aW9uIChub2RlLCB0cmVlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbyhcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueDEgfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkxIHx8IDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueDIgfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkyIHx8IDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5ldG86IGZ1bmN0aW9uIChub2RlLCB0cmVlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueCB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3VydmV0bzogZnVuY3Rpb24gKG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MucXVhZHJhdGljQ3VydmVUbyhcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuY3B4ICsgeDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmNweSArIHkwLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy54ICsgeDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLnkgKyB5MFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hhcGU6IGZ1bmN0aW9uIChub2RlLCB0cmVlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIHZhciBzeDAgPSB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICBzeTAgPSB5MCArIChub2RlLnByb3BzLnkgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLnByb3BzLnMucmVwbGFjZSgvXFxzL2csICcnKS5tYXRjaCgvKFthLXpdWzAtOSxdKykvZyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IHBhcnQuY2hhckF0KDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gcGFydC5tYXRjaCgvWzAtOV0rL2cpLm1hcChmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8odlswXSArIHN4MCwgdlsxXSArIHN5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5kcmF3Q2lyY2xlKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTAsIHZbMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3InOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QodlswXSArIHN4MCwgdlsxXSArIHN5MCwgdlsyXSwgdlszXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8odlswXSArIHN4MCwgdlsxXSArIHN5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5xdWFkcmF0aWNDdXJ2ZVRvKHZbMF0sIHZbMV0sIHZbMl0gKyBzeDAsIHZbM10gKyBzeTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdHJlZS5ub2Rlc1tub2RlLmNoaWxkcmVuW2ldXTtcclxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlcnNbY2hpbGQudGFnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyc1tjaGlsZC50YWddKGNoaWxkLCB0cmVlLCBncmFwaGljcywgc3gwLCBzeTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMocmVuZGVyZXJzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgdHlwZSkge1xyXG4gICAgYWNjW3R5cGVdID0gY3JlYXRlR3JhcGhpY3NOb2RlKHJlbmRlcmVyc1t0eXBlXSk7XHJcbiAgICByZXR1cm4gYWNjO1xyXG59LCB7fSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyZXJzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3RyZWUtdXRpbHMnKSxcclxuICAgIGNyZWF0ZSA9IGZ1bmN0aW9uIChkcmF3KSB7XHJcblxyXG4gICAgdmFyIHJlcXVlc3ROb3RpZmljYXRpb24gPSBmdW5jdGlvbiAobm9kZSwgdHJlZSwgdHJlZU1ldGhvZHMpIHtcclxuICAgICAgICAgICAgdmFyIGdyYXBoaWNzID0gdHJlZVV0aWxzLnBhcmVudChub2RlLCB0cmVlLCAnZ3JhcGhpY3MnKTtcclxuICAgICAgICAgICAgaWYgKGdyYXBoaWNzKSB7XHJcbiAgICAgICAgICAgICAgICB0cmVlTWV0aG9kcy5yZXF1ZXN0VHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24oZ3JhcGhpY3MuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlID0gZnVuY3Rpb24gKG5vZGUsIHByZXZQcm9wcywgdHJlZSwgdHJlZU1ldGhvZHMpIHtcclxuICAgICAgICAgICAgaWYgKHRyZWVVdGlscy5wcm9wc0NoYW5nZWQobm9kZS5wcm9wcywgcHJldlByb3BzKSkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdE5vdGlmaWNhdGlvbihub2RlLCB0cmVlLCB0cmVlTWV0aG9kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgZHJhd1dyYXBwZXIgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICB2YXIgZmlsbCA9IHR5cGVvZiBub2RlLnByb3BzLmZpbGwgIT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgICAgICAgICAgbGluZSA9IHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZSE9PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZVdpZHRoICE9PSAndW5kZWZpbmVkJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZUFscGhhICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsbENvbG9yID0gdHlwZW9mIG5vZGUucHJvcHMuZmlsbCAhPT0gJ3VuZGVmaW5lZCcgPyBub2RlLnByb3BzLmZpbGwgOiAweDAwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICBmaWxsQWxwaGEgPSB0eXBlb2Ygbm9kZS5wcm9wcy5maWxsQWxwaGEgPT09ICdudW1iZXInID8gbm9kZS5wcm9wcy5maWxsQWxwaGEgOiAxO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKGZpbGxDb2xvciwgZmlsbEFscGhhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGluZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpbmVDb2xvciA9IHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZSAhPT0gJ3VuZGVmaW5lZCcgPyBub2RlLnByb3BzLnN0cm9rZSA6IDB4MDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVBbHBoYSA9IHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZUFscGhhID09PSAnbnVtYmVyJyA/IG5vZGUucHJvcHMuc3Ryb2tlQWxwaGEgOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9IHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZVdpZHRoID09PSAnbnVtYmVyJyA/IG5vZGUucHJvcHMuc3Ryb2tlV2lkdGggOiAxO1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVN0eWxlKGxpbmVXaWR0aCwgbGluZUNvbG9yLCBsaW5lQWxwaGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVN0eWxlKDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkcmF3KG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGwpIHtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiByZXF1ZXN0Tm90aWZpY2F0aW9uLFxyXG4gICAgICAgIGtpbGw6IHJlcXVlc3ROb3RpZmljYXRpb24sXHJcbiAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbiAgICAgICAgZHJhdzogZHJhd1dyYXBwZXJcclxuICAgIH07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9jcmVhdGUtZ3JhcGhpY3MtaXRlbS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi8uLi90cmVlLXV0aWxzJyksXHJcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcclxuXHJcbiAgICB1cGRhdGVHcmFwaGljcyA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShncmFwaGljc1Byb3BlcnRlcyksXHJcblxyXG4gICAgaXRlbVR5cGVzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKSxcclxuXHJcbiAgICBpbml0R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5HcmFwaGljcyh0cmVlVXRpbHMuZ2FtZSh0cmVlKSwgMCwgMCk7XHJcbiAgICAgICAgdXBkYXRlR3JhcGhpY3Mobm9kZSwgbnVsbCwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxHcmFwaGljcyA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoaWxkcmVuSW5pdCA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgZHJhdyhub2RlLCB0cmVlKTtcclxuXHJcbiAgICAgICAgdmFyIGdhbWUgPSB0cmVlVXRpbHMuZ2FtZSh0cmVlKSxcclxuICAgICAgICAgICAgdGV4dHVyZSA9IG5ldyBQaGFzZXIuUmVuZGVyVGV4dHVyZShnYW1lLCBub2RlLm9iai53aWR0aCwgbm9kZS5vYmouaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGV4dHVyZS5yZW5kZXJYWShub2RlLm9iaiwgMCwgMCk7XHJcbiAgICAgICAgdGV4dHVyZS5kZXN0cm95KCk7XHJcbiAgICAgICAgbm9kZS5vYmouZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBnYW1lLmNhY2hlLmFkZFJlbmRlclRleHR1cmUobm9kZS5wcm9wcy5hc3NldEtleSwgdGV4dHVyZSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gdHJlZS5ub2Rlc1tub2RlLmNoaWxkcmVuW2ldXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlc1tjaGlsZC50YWddKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZXNbY2hpbGQudGFnXS5kcmF3KGNoaWxkLCB0cmVlLCBub2RlLm9iaiwgMCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0R3JhcGhpY3MsXHJcbiAgICBvbkNoaWxkcmVuSW5pdDogb25DaGlsZHJlbkluaXQsXHJcbiAgICBraWxsOiBraWxsR3JhcGhpY3MsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUdyYXBoaWNzXHJcbn07XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcnRleHR1cmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdHJlZS11dGlscycpLFxyXG4gICAgZ3JhcGhpY3NQcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi8uLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyYXBoaWNzJyksXHJcblxyXG4gICAgdXBkYXRlR3JhcGhpY3MgPSB0cmVlVXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoZ3JhcGhpY3NQcm9wZXJ0ZXMpLFxyXG5cclxuICAgIGl0ZW1UeXBlcyA9IHJlcXVpcmUoJy4vcmVuZGVyZXJzJyksXHJcblxyXG4gICAgaW5pdEdyYXBoaWNzID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JhcGhpY3ModHJlZVV0aWxzLmdhbWUodHJlZSksIDAsIDApO1xyXG4gICAgICAgIHVwZGF0ZUdyYXBoaWNzKG5vZGUsIG51bGwsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsR3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25DaGlsZHJlbkluaXQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIGRyYXcobm9kZSwgdHJlZSk7XHJcblxyXG4gICAgICAgIHZhciBnYW1lID0gdHJlZVV0aWxzLmdhbWUodHJlZSksXHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBuZXcgUGhhc2VyLlJlbmRlclRleHR1cmUoZ2FtZSwgbm9kZS5vYmoud2lkdGgsIG5vZGUub2JqLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHRleHR1cmUucmVuZGVyWFkobm9kZS5vYmosIDAsIDApO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gdGV4dHVyZS5nZXRCYXNlNjQoKTtcclxuXHJcbiAgICAgICAgdGV4dHVyZS5kZXN0cm95KCk7XHJcbiAgICAgICAgbm9kZS5vYmouZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5wcm9wcy5mcmFtZVdpZHRoIHx8IG5vZGUucHJvcHMuZnJhbWVIZWlnaHQpIHtcclxuICAgICAgICAgICAgdmFyIHcgPSBub2RlLnByb3BzLmZyYW1lV2lkdGggfHwgdGV4dHVyZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGggPSBub2RlLnByb3BzLmZyYW1lSGVpZ2h0IHx8IHRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgbm9kZS5vYmogPSBnYW1lLmxvYWQuc3ByaXRlc2hlZXQobm9kZS5wcm9wcy5hc3NldEtleSwgdXJsLCB3LCBoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLm9iaiA9IGdhbWUubG9hZC5pbWFnZShub2RlLnByb3BzLmFzc2V0S2V5LCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZHJhdyA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IHRyZWUubm9kZXNbbm9kZS5jaGlsZHJlbltpXV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZXNbY2hpbGQudGFnXSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGVzW2NoaWxkLnRhZ10uZHJhdyhjaGlsZCwgdHJlZSwgbm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdEdyYXBoaWNzLFxyXG4gICAgb25DaGlsZHJlbkluaXQ6IG9uQ2hpbGRyZW5Jbml0LFxyXG4gICAga2lsbDoga2lsbEdyYXBoaWNzLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcmFwaGljc1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcmltYWdlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbnB1dDogcmVxdWlyZSgnLi9pbnB1dCcpLFxyXG4gICAga2V5OiByZXF1aXJlKCcuL2tleScpXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvaW5wdXQvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdHJlZS11dGlscycpLFxyXG5cclxuICAgIGRlZmF1bHRQb2ludGVyTnVtYmVyID0gMixcclxuICAgIGV2ZW50cyA9IFtcIm9uRG93blwiLCBcIm9uVXBcIiwgXCJvblRhcFwiLCBcIm9uSG9sZFwiXSxcclxuXHJcbiAgICBjbGVhcklucHV0ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHRyZWVVdGlscy5zdGF0ZU5vZGUobm9kZSwgdHJlZSkuY29udGV4dDtcclxuICAgICAgICBkZWxldGUgY29udGV4dC5pbnB1dDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdElucHV0ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgc3RhdGVOb2RlID0gdHJlZVV0aWxzLnN0YXRlTm9kZShub2RlLCB0cmVlKTtcclxuICAgICAgICBpZiAoIXN0YXRlTm9kZS5jb250ZXh0LmlucHV0KSB7XHJcbiAgICAgICAgICAgIHZhciBwaGFzZXJJbnB1dCA9IHN0YXRlTm9kZS5vYmouaW5wdXQsXHJcbiAgICAgICAgICAgICAgICBwb2ludGVyQ291bnQgPSBub2RlLnByb3BzLnBvaW50ZXJzIHx8IGRlZmF1bHRQb2ludGVyTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VQb2ludGVyOiBwaGFzZXJJbnB1dC5tb3VzZVBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlUG9pbnRlcjogcGhhc2VySW5wdXQuYWN0aXZlUG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyczogW11cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBub2RlLm9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc3RhdGVOb2RlLmNvbnRleHQuaW5wdXQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRlckNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IGRlZmF1bHRQb2ludGVyTnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGhhc2VySW5wdXQuYWRkUG9pbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5wdXQucG9pbnRlcnNbaV0gPSBwaGFzZXJJbnB1dFsncG9pbnRlcicgKyAoaSArIDEpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBub2RlLnByb3BzW2V2ZW50XTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBoYXNlcklucHV0W2V2ZW50XS5hZGQoZnVuY3Rpb24gKHBvaW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIocG9pbnRlciwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMuY3Vyc29ycykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuY3Vyc29ycyA9IHBoYXNlcklucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMua2V5cykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQua2V5cyA9IE9iamVjdC5rZXlzKG5vZGUucHJvcHMua2V5cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gcGhhc2VySW5wdXQua2V5Ym9hcmQuYWRkS2V5KG5vZGUucHJvcHMua2V5c1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMub25JbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGVOb2RlLmFkZFVwZGF0ZUxpc3RlbmVyKG5vZGUucHJvcHMub25JbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0SW5wdXQsXHJcbiAgICBjbGVhcjogY2xlYXJJbnB1dCxcclxuICAgIGtpbGw6IG51bGwsXHJcbiAgICB1cGRhdGU6IG51bGxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9pbnB1dC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHM9IHJlcXVpcmUoJy4uLy4uL3RyZWUtdXRpbHMnKSxcclxuICAgIGtleVByb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvY3VzdG9tL2tleScpLFxyXG5cclxuICAgIHVwZGF0ZUtleSA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShrZXlQcm9wZXJ0ZXMpLFxyXG5cclxuICAgIGV2ZW50cyA9IFtcIm9uRG93blwiLCBcIm9uVXBcIiwgXCJvbkhvbGRDYWxsYmFja1wiXSxcclxuXHJcbiAgICBpbml0S2V5ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgc3RhdGVOb2RlID0gdHJlZVV0aWxzLnN0YXRlTm9kZShub2RlLCB0cmVlKTtcclxuICAgICAgICBpZiAoc3RhdGVOb2RlLmNvbnRleHQuaW5wdXQgJiYgbm9kZS5wcm9wcy5rZXlOYW1lICYmIG5vZGUucHJvcHMua2V5Q29kZSkge1xyXG4gICAgICAgICAgICB2YXIgcGhhc2VySW5wdXQgPSBzdGF0ZU5vZGUub2JqLmlucHV0LFxyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBzdGF0ZU5vZGUuY29udGV4dC5pbnB1dCxcclxuICAgICAgICAgICAgICAgIGtleSA9IHBoYXNlcklucHV0LmtleWJvYXJkLmFkZEtleShub2RlLnByb3BzLmtleUNvZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbnB1dC5rZXlzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5rZXlzID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vZGUub2JqID0ga2V5O1xyXG4gICAgICAgICAgICBpbnB1dC5rZXlzW25vZGUucHJvcHMua2V5TmFtZV0gPSBub2RlLm9iajtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gbm9kZS5wcm9wc1tldmVudF07XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlbZXZlbnRdLmFkZChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKGtleSwgc3RhdGVOb2RlLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxLZXkgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIGlmIChub2RlLm9iaikge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGVOb2RlID0gdHJlZVV0aWxzLnN0YXRlTm9kZShub2RlLCB0cmVlKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRlTm9kZS5vYmoua2V5Ym9hcmQucmVtb3ZlS2V5KG5vZGUub2JqLmtleUNvZGUpO1xyXG4gICAgICAgICAgICBkZWxldGUgc3RhdGVOb2RlLmNvbnRleHQuaW5wdXRbbm9kZS5wcm9wcy5rZXlOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0S2V5LFxyXG4gICAga2lsbDoga2lsbEtleSxcclxuICAgIHVwZGF0ZTogdXBkYXRlS2V5XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvaW5wdXQva2V5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuZ2VuZXJhdGVGaXhlZFByb3BNYXAoWydrZXlOYW1lJywgJ2tleUNvZGUnXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9jdXN0b20va2V5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==