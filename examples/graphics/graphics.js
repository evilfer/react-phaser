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
	
	    onCursorInput: function onCursorInput(cursors, getActor) {
	        var player = getActor('player');
	
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
	            React.createElement('cursors', { onInput: this.onCursorInput })
	        );
	    }
	});
	
	React.render(React.createElement(MyGame, null), 'game');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createReactAnything = __webpack_require__(2);
	var NativeImplementation = __webpack_require__(66);
	
	var ReactPhaser = createReactAnything(NativeImplementation);
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
	
	var invariant = __webpack_require__(63);
	
	var nodeManager = __webpack_require__(67);
	var init = __webpack_require__(118);
	var Nodes = __webpack_require__(120);
	
	var nodes = new Nodes();
	var running = false;
	
	module.exports = {
	    components: {
	        mount: function mount(id, tag, props, parent) {
	            invariant(!(tag === 'game' && nodes.gameNode), 'Only one game node can be mounted.');
	            invariant(!(tag !== 'game' && !parent), 'Only \'game\' can be root node.');
	            invariant(!(props.name && nodes.idByName(props.name)), 'Cannot repeat names.');
	
	            var node = {
	                id: id,
	                tag: tag,
	                props: props,
	                parent: parent && parent.id,
	                children: []
	            };
	            if (parent) {
	                parent.children.push(id);
	            }
	
	            nodes.register(node);
	
	            if (tag === 'game') {
	                nodes.setGameNode(node);
	            } else if (running) {
	                nodeManager.mount(nodes, node);
	            }
	
	            return node;
	        },
	        childrenMount: function childrenMount(node) {
	            if (running) {
	                nodeManager.childrenMount(nodes, node);
	            }
	        },
	        unmount: function unmount(node) {
	            if (node.parent) {
	                var parent = nodes.byId(node.parent);
	                parent.children.splice(parent.children.indexOf(node.id), 1);
	            }
	
	            nodes.unregister(node);
	
	            if (node.tag === 'game') {
	                nodes.setGameNode(null);
	            } else {
	                nodeManager.unmount(nodes, node);
	            }
	        },
	        update: function update(node, nextProps, lastProps) {
	            node.props = nextProps;
	            nodes.update(node, lastProps);
	            nodeManager.update(nodes, node, lastProps);
	        }
	    },
	    transaction: {
	        initialize: function initialize() {},
	        close: function close() {
	            if (nodes.gameNode && !running) {
	                running = true;
	                init(nodes);
	            } else if (running && !nodes.gameNode) {
	                running = false;
	                console.log('destroy');
	            }
	            if (running) {
	                var transactionListeners = nodes.popTransactionListeners();
	                if (transactionListeners) {
	                    for (var i = 0; i < transactionListeners.length; i++) {
	                        var node = nodes.byId(transactionListeners[i]);
	                        if (node) {
	                            nodeManager.notifyTransaction(nodes, node);
	                        }
	                    }
	                }
	            }
	        }
	    }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	'use struct';
	
	var nodeTypes = __webpack_require__(68),
	    mount = function mount(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType) {
	        nodeType.mount(nodes, node);
	        if (node.obj) {
	            node.obj.rnodeid = node.id;
	        }
	    }
	},
	    update = function update(nodes, node, prevProps) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType && nodeType.update) {
	        var changedProps = Object.keys(node.props);
	        changedProps = changedProps.filter(function (key) {
	            return key !== 'children' && node.props[key] !== prevProps[key];
	        });
	
	        Object.keys(prevProps).forEach(function (key) {
	            if (key !== 'children' && !(key in node.props)) {
	                changedProps.push(key);
	            }
	        });
	
	        if (changedProps.length > 0) {
	            nodeType.update(nodes, node, changedProps, prevProps);
	        }
	    }
	},
	    unmount = function unmount(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType) {
	        nodeType.unmount(nodes, node);
	    }
	},
	    childrenMount = function childrenMount(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType && nodeType.childrenMount) {
	        nodeType.childrenMount(nodes, node);
	    }
	},
	    notifyTransaction = function notifyTransaction(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType && nodeType.notifyTransaction) {
	        nodeType.notifyTransaction(nodes, node);
	    }
	},
	    initChildren = function initChildren(nodes, children) {
	    children.forEach(function (childId) {
	        var child = nodes.ids[childId];
	        mount(nodes, child);
	        if (child.children.length > 0) {
	            initChildren(nodes, child.children);
	            childrenMount(nodes, child);
	        }
	    });
	};
	
	module.exports = {
	    mount: mount,
	    childrenMount: childrenMount,
	    unmount: unmount,
	    update: update,
	    notifyTransaction: notifyTransaction,
	    initChildren: initChildren
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({
	        game: __webpack_require__(70),
	        sprite: __webpack_require__(71),
	        group: __webpack_require__(100),
	        animation: __webpack_require__(102),
	        cursors: __webpack_require__(103),
	        collides: __webpack_require__(104),
	        overlaps: __webpack_require__(105),
	        text: __webpack_require__(106),
	        button: __webpack_require__(108),
	        graphics: __webpack_require__(111),
	        rendertexture: __webpack_require__(116),
	        renderimage: __webpack_require__(117)
	}, __webpack_require__(114));

/***/ },
/* 69 */
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
/* 70 */
/***/ function(module, exports) {

	'use strict';
	
	var mountGame = function mountGame(nodes, node) {
	
	    node.collisions = [];
	    node.overlaps = [];
	    node.updateMethods = [];
	
	    if (node.props.hasOwnProperty('physics')) {
	        node.obj.physics.startSystem(node.props.physics);
	        node.physics = 'arcade';
	    }
	};
	
	module.exports = {
	    mount: mountGame,
	    unmount: function unmount() {}
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    spritePropertes = __webpack_require__(73),
	    updateSprite = utils.genPropertyMapUpdate(spritePropertes),
	    mountSprite = function mountSprite(nodes, node) {
	    var props = node.props;
	    node.obj = new Phaser.Sprite(nodes.game(), props.x, props.y, props.assetKey);
	    utils.addNodeDisplayObject(nodes, node);
	    updateSprite(nodes, node);
	},
	    unmountSprite = function unmountSprite(nodes, node) {
	    node.obj.kill();
	};
	
	module.exports = {
	    mount: mountSprite,
	    unmount: unmountSprite,
	    update: updateSprite
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69),
	    addNodeDisplayObject = function addNodeDisplayObject(nodes, wrapper, obj) {
	    var parent = nodes.byId(wrapper.parent),
	        group = parent.tag === 'game' ? parent.obj.world : parent.obj;
	
	    group.add(obj || wrapper.obj);
	},
	    genPropertyMapUpdate = function genPropertyMapUpdate(props) {
	    return function (nodes, node) {
	        var changeProps = arguments.length <= 2 || arguments[2] === undefined ? Object.keys(node.props) : arguments[2];
	        var prevProps = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	        for (var i = 0; i < changeProps.length; i++) {
	            var prop = changeProps[i];
	            var propertyUpdate = props[prop];
	            if (propertyUpdate) {
	                propertyUpdate(nodes, node, node.props[prop], !prevProps, prevProps && prevProps[prop]);
	            }
	        }
	    };
	};
	
	module.exports = {
	    addNodeDisplayObject: addNodeDisplayObject,
	    genPropertyMapUpdate: genPropertyMapUpdate
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(74), __webpack_require__(78), __webpack_require__(79), __webpack_require__(80), __webpack_require__(81), __webpack_require__(82), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(87), __webpack_require__(88), __webpack_require__(89), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(93), __webpack_require__(94), __webpack_require__(95), __webpack_require__(97), __webpack_require__(98), __webpack_require__(99));

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(75));

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(76));

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(77);
	
	module.exports = utils.generatePointPropMap(['scale']);

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';
	
	var generateBasicPropMap = function generateBasicPropMap(props) {
	    return props.reduce(function (acc, prop) {
	        acc[prop] = function (nodes, node, value) {
	            node.obj[prop] = value;
	        };
	        return acc;
	    }, {});
	},
	    generatePrefixedBasicPropMap = function generatePrefixedBasicPropMap(prefix, props) {
	    return props.reduce(function (acc, prop) {
	        acc[prefix + prop.charAt(0).toUpperCase() + prop.slice(1)] = function (nodes, node, value) {
	            node.obj[prefix][prop] = value;
	        };
	        return acc;
	    }, {});
	},
	    generatePointPropMap = function generatePointPropMap(props) {
	    return props.reduce(function (acc, prop) {
	        acc[prop] = function (nodes, node, value, isNew, prevValue) {
	            var point = node.obj[prop];
	            if (isNew || value.x !== prevValue.x) {
	                point.x = value.x;
	            }
	            if (isNew || value.y !== prevValue.y) {
	                point.y = value.y;
	            }
	        };
	        acc[prop + 'X'] = function (nodes, node, value) {
	            node.obj[prop].x = value;
	        };
	        acc[prop + 'Y'] = function (nodes, node, value) {
	            node.obj[prop].y = value;
	        };
	        return acc;
	    }, {});
	},
	    generatePrefixedPointPropMap = function generatePrefixedPointPropMap(prefix, props) {
	    return props.reduce(function (acc, prop) {
	        var prefixedProp = prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
	        acc[prefixedProp] = function (nodes, node, value, isNew, prevValue) {
	            var point = node.obj[prefix][prop];
	            if (isNew || value.x !== prevValue.x) {
	                point.x = value.x;
	            }
	            if (isNew || value.y !== prevValue.y) {
	                point.y = value.y;
	            }
	        };
	        acc[prefixedProp + 'X'] = function (nodes, node, value) {
	            node.obj[prefix][prop].x = value;
	        };
	        acc[prefixedProp + 'Y'] = function (nodes, node, value) {
	            node.obj[prefix][prop].y = value;
	        };
	        return acc;
	    }, {});
	},
	    generateAliasPropMap = function generateAliasPropMap(aliases) {
	    return Object.keys(aliases).reduce(function (acc, alias) {
	        var prop = aliases[alias];
	        acc[alias] = function (nodes, node, value) {
	            node.obj[prop] = value;
	        };
	        return acc;
	    }, {});
	},
	    generateMountOnlyPropMap = function generateMountOnlyPropMap(propMap) {
	    return Object.keys(propMap).reduce(function (acc, prop) {
	        var impl = propMap[prop];
	        acc[prop] = function (nodes, node, value, isNew) {
	            if (isNew) {
	                impl(nodes, node, value);
	            }
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
	    generateMountOnlyPropMap: generateMountOnlyPropMap
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(77);
	
	module.exports = utils.generateAliasPropMap({
	    assetKey: 'key'
	});

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['angle']);

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['autocull']);
	/**
	 * <readonly>inCamera
	 */

/***/ },
/* 82 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 83 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['checkWorldBounds', 'outOfBoundsKill']);
	/**
	 * <readonly>inWorld
	 */

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['alive', 'lifespan']);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['frame', 'frameName']);

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69),
	    utils = __webpack_require__(77);
	
	module.exports = extend({}, utils.generateBasicPropMap(['x', 'y']), __webpack_require__(96));

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69),
	    utils = __webpack_require__(77);
	
	module.exports = extend({}, utils.generatePrefixedBasicPropMap('body', ['immovable', 'collideWorldBounds']), utils.generatePrefixedPointPropMap('body', ['bounce', 'gravity']), utils.generateMountOnlyPropMap({
	    bodyPhysics: function bodyPhysics(nodes, node, value) {
	        var physics = nodes.game().physics,
	            system = value !== true ? value : physics.system;
	
	        nodes.game().physics.enable(node.obj, system);
	    }
	}));

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = generateBasicPropMap(['smoothed']);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    groupPropertes = __webpack_require__(101),
	    updateGroup = utils.genPropertyMapUpdate(groupPropertes),
	    mountGroup = function mountGroup(nodes, node) {
	    node.obj = new Phaser.Group(nodes.game());
	    utils.addNodeDisplayObject(nodes, node);
	    updateGroup(nodes, node);
	};
	
	module.exports = {
	    mount: mountGroup,
	    unmount: function unmount() {},
	    update: updateGroup
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69),
	    generateBasicPropMap = __webpack_require__(77).generateBasicPropMap;
	
	module.exports = extend({}, __webpack_require__(75), generateBasicPropMap(['enableBody']));

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';
	
	var mountAnimation = function mountAnimation(nodes, node) {
	    var parentNode = nodes.byId(node.parent);
	    node.obj = parentNode.obj.animations.add(node.props.id, node.props.frames, node.props.fps, node.props.loop);
	};
	
	module.exports = {
	    mount: mountAnimation,
	    unmount: function unmount() {},
	    update: null
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';
	
	var mountCursors = function mountCursors(nodes, node) {
	    var onInput = node.props.onInput,
	        cursors = nodes.game().input.keyboard.createCursorKeys();
	
	    node.obj = {
	        cursors: cursors,
	        callback: onInput.bind(null, cursors, function (name) {
	            return nodes.byName(name).obj;
	        })
	    };
	
	    nodes.gameNode.updateMethods.push(node.obj.callback);
	};
	
	module.exports = {
	    mount: mountCursors,
	    unmount: function unmount() {},
	    update: null
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';
	
	var mountCollides = function mountCollides(nodes, node) {
	    var collidesWithId = nodes.idByName(node.props.with);
	    node.obj = [node.parent, collidesWithId];
	    nodes.gameNode.collisions.push(node.obj);
	};
	
	module.exports = {
	    mount: mountCollides,
	    unmount: function unmount() {},
	    update: null
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	'use strict';
	
	var mountCollides = function mountCollides(nodes, node) {
	    var overlapsWithId = nodes.idByName(node.props.with);
	    node.obj = {
	        pair: [node.parent, overlapsWithId],
	        callback: function callback(a, b) {
	            node.props.onOverlap(nodes.byId(a.rnodeid), nodes.byId(b.rnodeid));
	        }
	    };
	
	    nodes.gameNode.overlaps.push(node.obj);
	};
	
	module.exports = {
	    mount: mountCollides,
	    unmount: function unmount() {},
	    update: null
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    textPropertes = __webpack_require__(107),
	    updateText = utils.genPropertyMapUpdate(textPropertes),
	    mountText = function mountText(nodes, node) {
	    var props = node.props;
	    node.obj = new Phaser.Text(nodes.game(), props.x, props.y, props.text, props.style);
	    utils.addNodeDisplayObject(nodes, node);
	},
	    unmountText = function unmountText(nodes, node) {
	    node.obj.kill();
	};
	
	module.exports = {
	    mount: mountText,
	    unmount: unmountText,
	    update: updateText
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69),
	    utils = __webpack_require__(77);
	
	module.exports = extend({}, __webpack_require__(73), utils.generateBasicPropMap(['text']));

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    buttonPropertes = __webpack_require__(109),
	    updateButton = utils.genPropertyMapUpdate(buttonPropertes),
	    mountButton = function mountButton(nodes, node) {
	    var props = node.props,
	        key = props.assetKey;
	
	    node.button = new Phaser.Button(nodes.game(), props.x, props.y, key, props.onClick, node, props.frames[0], props.frames[1], props.frames[2], props.frames[3]);
	
	    if (node.props.children) {
	        node.obj = new Phaser.Group(nodes.game());
	        node.obj.add(node.button);
	    } else {
	        node.obj = node.button;
	    }
	
	    utils.addNodeDisplayObject(nodes, node);
	    updateButton(nodes, node);
	},
	    unmountButton = function unmountButton(nodes, node) {
	    node.obj.kill();
	};
	
	module.exports = {
	    mount: mountButton,
	    unmount: unmountButton,
	    update: updateButton
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(110));

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(74), __webpack_require__(78), __webpack_require__(79), __webpack_require__(80), __webpack_require__(81), __webpack_require__(82), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(87), __webpack_require__(90), __webpack_require__(92), __webpack_require__(93), __webpack_require__(94), __webpack_require__(97), __webpack_require__(99));

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    graphicsPropertes = __webpack_require__(112),
	    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(114),
	    mountGraphics = function mountGraphics(nodes, node) {
	    var props = node.props;
	    node.obj = new Phaser.Graphics(nodes.game(), props.x, props.y);
	    utils.addNodeDisplayObject(nodes, node);
	    updateGraphics(nodes, node);
	},
	    unmountGraphics = function unmountGraphics(nodes, node) {
	    node.obj.kill();
	},
	    childrenMount = function childrenMount(nodes, node) {
	    nodes.cancelTransactionNofitication(node.id);
	    draw(nodes, node);
	},
	    redraw = function redraw(nodes, node) {
	    node.obj.clear();
	    draw(nodes, node);
	},
	    draw = function draw(nodes, node) {
	    for (var i = 0; i < node.children.length; i++) {
	        var child = nodes.byId(node.children[i]);
	        if (itemTypes[child.tag]) {
	            itemTypes[child.tag].draw(nodes, child, node.obj, 0, 0);
	        }
	    }
	};
	
	module.exports = {
	    mount: mountGraphics,
	    childrenMount: childrenMount,
	    unmount: unmountGraphics,
	    update: updateGraphics,
	    notifyTransaction: redraw
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(113), __webpack_require__(78), __webpack_require__(79), __webpack_require__(81), __webpack_require__(82), __webpack_require__(86), __webpack_require__(87), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(95), __webpack_require__(97));

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(75));

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createGraphicsNode = __webpack_require__(115),
	    renderers = {
	    circle: function circle(nodes, node, graphics, x0, y0) {
	        graphics.drawCircle(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.diameter || 0);
	    },
	    rect: function rect(nodes, node, graphics, x0, y0) {
	        graphics.drawRect(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.width || 0, node.props.height || 0);
	    },
	    line: function line(nodes, node, graphics, x0, y0) {
	        graphics.moveTo(x0 + (node.props.x1 || 0), y0 + (node.props.y1 || 0));
	        graphics.lineTo(x0 + (node.props.x2 || 0), y0 + (node.props.y2 || 0));
	    },
	    lineto: function lineto(nodes, node, graphics, x0, y0) {
	        graphics.lineTo(x0 + (node.props.x || 0), y0 + (node.props.y || 0));
	    },
	    curveto: function curveto(nodes, node, graphics, x0, y0) {
	        graphics.quadraticCurveTo(node.props.cpx + x0, node.props.cpy + y0, node.props.x + x0, node.props.y + y0);
	    },
	    shape: function shape(nodes, node, graphics, x0, y0) {
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
	            var child = nodes.byId(node.children[i]);
	            if (renderers[child.tag]) {
	                renderers[child.tag](nodes, child, graphics, sx0, sy0);
	            }
	        }
	    }
	};
	
	module.exports = Object.keys(renderers).reduce(function (acc, type) {
	    acc[type] = createGraphicsNode(renderers[type]);
	    return acc;
	}, {});

/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';
	
	var create = function create(draw) {
	
	    var requestNotification = function requestNotification(nodes, node) {
	        var graphics = nodes.parent(node, 'graphics');
	        if (graphics) {
	            nodes.requestTransactionNofitication(graphics.id);
	        }
	    },
	        requestNotificationOnUpdate = function requestNotificationOnUpdate(nodes, node, changeProps) {
	        if (changeProps.length > 0) {
	            requestNotification(nodes, node);
	        }
	    },
	        drawWrapper = function drawWrapper(nodes, node, graphics, x0, y0) {
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
	
	        draw(nodes, node, graphics, x0, y0);
	
	        if (fill) {
	            graphics.endFill();
	        }
	    };
	
	    return {
	        mount: requestNotification,
	        unmount: requestNotification,
	        update: requestNotificationOnUpdate,
	        draw: drawWrapper
	    };
	};
	
	module.exports = create;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    graphicsPropertes = __webpack_require__(112),
	    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(114),
	    mountGraphics = function mountGraphics(nodes, node) {
	    node.obj = new Phaser.Graphics(nodes.game(), 0, 0);
	    updateGraphics(nodes, node);
	},
	    unmountGraphics = function unmountGraphics(nodes, node) {},
	    childrenMount = function childrenMount(nodes, node) {
	    draw(nodes, node);
	
	    var texture = new Phaser.RenderTexture(nodes.game(), node.obj.width, node.obj.height);
	    texture.renderXY(node.obj, 0, 0);
	    node.obj.destroy();
	    node.obj = texture;
	    nodes.game().cache.addRenderTexture(node.props.assetKey, texture);
	},
	    draw = function draw(nodes, node) {
	    for (var i = 0; i < node.children.length; i++) {
	        var child = nodes.byId(node.children[i]);
	        if (itemTypes[child.tag]) {
	            itemTypes[child.tag].draw(nodes, child, node.obj, 0, 0);
	        }
	    }
	};
	
	module.exports = {
	    mount: mountGraphics,
	    childrenMount: childrenMount,
	    unmount: unmountGraphics,
	    update: updateGraphics
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    graphicsPropertes = __webpack_require__(112),
	    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(114),
	    mountGraphics = function mountGraphics(nodes, node) {
	    node.obj = new Phaser.Graphics(nodes.game(), 0, 0);
	    updateGraphics(nodes, node);
	},
	    unmountGraphics = function unmountGraphics(nodes, node) {},
	    childrenMount = function childrenMount(nodes, node) {
	    draw(nodes, node);
	
	    var texture = new Phaser.RenderTexture(nodes.game(), node.obj.width, node.obj.height);
	    texture.renderXY(node.obj, 0, 0);
	    var url = texture.getBase64();
	    texture.destroy();
	    node.obj.destroy();
	
	    if (node.props.frameWidth || node.props.frameHeight) {
	        var w = node.props.frameWidth || texture.width,
	            h = node.props.frameHeight || texture.height;
	
	        node.obj = nodes.game().load.spritesheet(node.props.assetKey, url, w, h);
	    } else {
	        node.obj = nodes.game().load.image(node.props.assetKey, url);
	    }
	},
	    draw = function draw(nodes, node) {
	    for (var i = 0; i < node.children.length; i++) {
	        var child = nodes.byId(node.children[i]);
	        if (itemTypes[child.tag]) {
	            itemTypes[child.tag].draw(nodes, child, node.obj, 0, 0);
	        }
	    }
	};
	
	module.exports = {
	    mount: mountGraphics,
	    childrenMount: childrenMount,
	    unmount: unmountGraphics,
	    update: updateGraphics
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var nodeManager = __webpack_require__(67),
	    loadAssets = __webpack_require__(119),
	    preloadTags = ['assets'],
	    init = function init(nodes) {
	    var props = nodes.gameNode.props;
	
	    var gameImpl = {
	        preload: function preload() {
	            loadAssets(nodeManager, nodes);
	        },
	        create: function create() {
	            nodeManager.mount(nodes, nodes.gameNode);
	            nodeManager.initChildren(nodes, nodes.gameNode.children.filter(function (nodeId) {
	                return preloadTags.indexOf(nodes.byId(nodeId).tag) < 0;
	            }));
	        },
	        update: function update() {
	            for (var i = 0; i < nodes.gameNode.collisions.length; i++) {
	                var c = nodes.gameNode.collisions[i];
	                nodes.gameNode.obj.physics.arcade.collide(nodes.ids[c[0]].obj, nodes.ids[c[1]].obj);
	            }
	            for (i = 0; i < nodes.gameNode.overlaps.length; i++) {
	                var overlap = nodes.gameNode.overlaps[i];
	                nodes.gameNode.obj.physics.arcade.overlap(nodes.ids[overlap.pair[0]].obj, nodes.ids[overlap.pair[1]].obj, overlap.callback, null, this);
	            }
	            for (i = 0; i < nodes.gameNode.updateMethods.length; i++) {
	                nodes.gameNode.updateMethods[i]();
	            }
	        }
	    };
	    nodes.gameNode.obj = new Phaser.Game(props.width, props.height, props.mode || Phaser.AUTO, '', gameImpl);
	};
	
	module.exports = init;

/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';
	
	var loadAssets = function loadAssets(nodeManager, nodes) {
	    var gameNode = nodes.gameNode,
	        assets = gameNode.props.assets;
	
	    if (assets) {
	        Object.keys(assets).forEach(function (key) {
	            var asset = assets[key];
	            switch (asset.type) {
	                case 'image':
	                    gameNode.obj.load.image(key, asset.src);
	                    break;
	                case 'spritesheet':
	                    gameNode.obj.load.spritesheet(key, asset.src, asset.width, asset.height);
	                    break;
	            }
	        });
	    }
	
	    var assetsIds = gameNode.children.filter(function (nodeId) {
	        return nodes.byId(nodeId).tag === 'assets';
	    });
	
	    nodeManager.initChildren(nodes, assetsIds);
	};
	
	module.exports = loadAssets;

/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';
	
	var Nodes = function Nodes() {
	    this.gameNode = null;
	    this.ids = {};
	    this.name2id = {};
	    this.id2name = {};
	    this.notifyTransaction = [];
	};
	
	Nodes.prototype.setGameNode = function (node) {
	    this.gameNode = node;
	};
	
	Nodes.prototype.requestTransactionNofitication = function (nodeid) {
	    if (this.notifyTransaction.indexOf(nodeid) < 0) {
	        this.notifyTransaction.push(nodeid);
	    }
	};
	
	Nodes.prototype.cancelTransactionNofitication = function (nodeid) {
	    var index = this.notifyTransaction.indexOf(nodeid);
	    if (index >= 0) {
	        this.notifyTransaction.splice(index, 1);
	    }
	};
	
	Nodes.prototype.popTransactionListeners = function () {
	    if (this.notifyTransaction.length > 0) {
	        var listeners = this.notifyTransaction;
	        this.notifyTransaction = [];
	        return listeners;
	    } else {
	        return null;
	    }
	};
	
	Nodes.prototype.game = function () {
	    return this.gameNode.obj;
	};
	
	Nodes.prototype.register = function (node) {
	    this.ids[node.id] = node;
	    if (node.props.name) {
	        this.name2id[node.props.name] = node.id;
	        this.id2name[node.id] = node.props.name;
	    }
	};
	
	Nodes.prototype.update = function (node, lastProps) {
	    if (lastProps.name !== node.props.name) {
	        delete this.name2id[lastProps.name];
	        this.name2id[node.props.name] = node.id;
	        this.id2name[node.id] = node.props.name;
	    }
	};
	
	Nodes.prototype.unregister = function (node) {
	    delete this.ids[node.id];
	    if (node.props.name) {
	        delete this.name2id[node.props.name];
	        delete this.id2name[node.id];
	    }
	};
	
	Nodes.prototype.byId = function (id) {
	    return this.ids[id];
	};
	
	Nodes.prototype.idByName = function (name) {
	    return this.name2id[name];
	};
	
	Nodes.prototype.byName = function (name) {
	    return this.ids[this.name2id[name]];
	};
	
	Nodes.prototype.parent = function (node, tag) {
	    while (true) {
	        var parent = this.ids[node.parent];
	        if (!parent || parent.tag === tag) {
	            return parent;
	        } else {
	            node = parent;
	        }
	    }
	};
	
	module.exports = Nodes;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGM5YTE4NTcwZDgwNDNiOTEwNDE/OWEyYyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4YW1wbGVzL2dyYXBoaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy9uYXRpdmUuanM/N2I0NSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvbmF0aXZlLmpzPzQyZTEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0LmpzPzI0ZWYqIiwid2VicGFjazovLy8uL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanM/NDk0YyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qcz80ZjA1KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcz9jMjlhKiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2ludmFyaWFudC5qcz80NTk5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQuanM/YWIyZioiLCJ3ZWJwYWNrOi8vLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzPzI5MjcqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzPzYxZGIqIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvd2FybmluZy5qcz84YTU2KiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanM/MmEzYioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanM/ZTlhMCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qcz81NmRlKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzPzE1MDcqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzPzcwMmEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzP2FkMGIqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uLmpzPzAyNGUqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RGVidWdUb29sLmpzP2FkMmUqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wuanM/YjIxMioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcz80MmU0KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENsYXNzLmpzPzBkNzQqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanM/YmMxNioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlNaXJyb3IuanM/MTg2NCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMuanM/N2RkOSoiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlPZi5qcz8zYWQyKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcz81YTkyKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRWYWxpZGF0b3IuanM/YTU5OSoiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9tYXBPYmplY3QuanM/ZWZiMyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanM/M2M4MyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RWZXJzaW9uLmpzP2MwODMqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL29ubHlDaGlsZC5qcz8yN2UzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nLmpzPzFiYTQqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UGVyZi5qcz9lZjkzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nTW91bnQuanM/OWZiNioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZS5qcz9mZDJjKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEluc3RhbmNlTWFwLmpzP2E4M2UqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlcy5qcz9jZTA5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlLmpzP2JlYTgqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RmVhdHVyZUZsYWdzLmpzPzc5YWIqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UmVjb25jaWxlci5qcz82YmZhKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFJlZi5qcz83MzMzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE93bmVyLmpzPzQwZTAqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1RyYW5zYWN0aW9uLmpzPzZkZmYqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanM/NzVkYSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb3NpdGVDb21wb25lbnQuanM/Y2Q1OSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5qcz8xYTQwKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVycm9yVXRpbHMuanM/NmIzMSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROb2RlVHlwZXMuanM/MjU4MCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuanM/YzBlMSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbXB0eUNvbXBvbmVudC5qcz9iN2I5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE5hdGl2ZUNvbXBvbmVudC5qcz9jZjViKiIsIndlYnBhY2s6Ly8vLi9+L3dhcm5pbmcvYnJvd3Nlci5qcz8yNmQzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mby5qcz9mNzY5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nSW5qZWN0aW9uLmpzP2IwNjEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuanM/ZWY3MCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLmpzP2UyMDkqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnQuanM/NWJlNCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkLmpzP2M4N2QqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLmpzP2Q0YTAqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRSZWNvbmNpbGVyLmpzP2ZmNDYqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ZsYXR0ZW5DaGlsZHJlbi5qcz8wZDA2KiIsIndlYnBhY2s6Ly8vLi9+L2ludmFyaWFudC9icm93c2VyLmpzPzk1MjAqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5qcz9kNDA2KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQuanM/NWQ3NSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL05hdGl2ZUltcGxlbWVudGF0aW9uLmpzPzZhNjYqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL25vZGUtbWFuYWdlci5qcz8wNjZlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9pbmRleC5qcz83NWFlKiIsIndlYnBhY2s6Ly8vLi9+L2V4dGVuZC9pbmRleC5qcz8zNmM4KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9nYW1lLmpzP2Q3N2IqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL3Nwcml0ZS5qcz85ZDgyKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy91dGlscy5qcz85ZWNiKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlNwcml0ZS5qcz81MmU3KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5TcHJpdGUuanM/NmVhZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lci5qcz80NTcxKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0LmpzPzE5ZmYqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvdXRpbHMuanM/ZTZmOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ29yZS5qcz9lMjljKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmdsZS5qcz8xM2Q1KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmltYXRpb24uanM/MTViYSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwuanM/Y2YwZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQm91bmRzLmpzPzllZWIqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJyaW5nVG9Ub3AuanM/Y2ZmYyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ3JvcC5qcz8yZDA1KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZWx0YS5qcz9mYmE5KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95LmpzPzVkNWMqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEuanM/NGQ5MioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSGVhbHRoLmpzP2M0NWUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkluQ2FtZXJhLmpzPzA3MWUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZC5qcz81ZmM2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbldvcmxkLmpzPzczZGUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuLmpzPzYyMjUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxvYWRUZXh0dXJlLmpzPzUwODEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAuanM/YmFkNioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHkuanM/MDQxMCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9jdXN0b20vYm9keS5qcz84MWZkKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5SZXNldC5qcz9lOWU0KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TY2FsZU1pbk1heC5qcz9iODZiKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TbW9vdGhlZC5qcz9lMjRlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncm91cC5qcz8zNTM2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyb3VwLmpzP2EyNTMqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2FuaW1hdGlvbi5qcz83NTI5KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9jdXJzb3JzLmpzPzgwYzcqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2NvbGxpZGVzLmpzP2ZhNjIqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL292ZXJsYXBzLmpzP2ZkODEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL3RleHQuanM/ZTdlYSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0LmpzP2M3MDEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qcz9iOGViKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbi5qcz9lNGY2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkltYWdlLmpzPzI5NGQqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2dyYXBoaWNzLmpzPzBiNWEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MuanM/Y2JkNioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuR3JhcGhpY3MuanM/MjY5NyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyZXJzLmpzPzkxMzkqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2NyZWF0ZS1ncmFwaGljcy1pdGVtLmpzPzRhNDUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcnRleHR1cmUuanM/NWRmZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyaW1hZ2UuanM/NzQ2OSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvaW5pdC5qcz8wOWVjKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9hc3NldHMuanM/Yzg5ZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvbm9kZXMuanM/ZTJlYioiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVOzs7Ozs7O0FDMUZ0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxVQUFVO0FBQ3JCLFlBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEdBQUc7QUFDZCxZQUFXLGlCQUFpQjtBQUM1QixZQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsR0FBRztBQUNkLFlBQVcsVUFBVTtBQUNyQixZQUFXLEdBQUc7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEdBQUc7QUFDZCxZQUFXLGlCQUFpQjtBQUM1QixZQUFXLEVBQUU7QUFDYixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsR0FBRztBQUNkLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCLFlBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQ7QUFDckQsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsWUFBVyxFQUFFO0FBQ2IsWUFBVyxjQUFjO0FBQ3pCLFlBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2I7QUFDQSxZQUFXLEVBQUU7QUFDYixZQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixLQUFLO0FBQ2xDO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFh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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQsb0M7Ozs7Ozs7QUMvS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FB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QTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCwyQkFBMEI7QUFDMUIsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSxvQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQzs7Ozs7O0FDM1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDJCOzs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxRQUFRO0FBQ25CLGFBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsSUFBSTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsZUFBZTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLFNBQVM7QUFDdEIsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsU0FBUztBQUNwQixhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEI7Ozs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLE1BQUs7O0FBRUw7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ25NQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Qzs7Ozs7OztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0M7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7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QUFNLElBQU4sRUFBWTtBQUNSLGFBQUksU0FBUyxLQUFLLEdBQUwsQ0FBUyxLQUFLLE1BQUwsQ0FBbEIsQ0FESTtBQUVSLGFBQUksQ0FBQyxNQUFELElBQVcsT0FBTyxHQUFQLEtBQWUsR0FBZixFQUFvQjtBQUMvQixvQkFBTyxNQUFQLENBRCtCO1VBQW5DLE1BRU87QUFDSCxvQkFBTyxNQUFQLENBREc7VUFGUDtNQUZKO0VBRHFCOztBQVd6QixRQUFPLE9BQVAsR0FBaUIsS0FBakIsQyIsImZpbGUiOiJncmFwaGljcy9ncmFwaGljcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZGM5YTE4NTcwZDgwNDNiOTEwNDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCcuLi9uYXRpdmUnKSxcclxuXHJcbiAgICBhc3NldHMgPSB7XHJcbiAgICAgICAgJ3NreSc6IHt0eXBlOiAnaW1hZ2UnLCBzcmM6ICcuLi9hc3NldHMvc2t5LnBuZyd9LFxyXG4gICAgICAgICdncm91bmQnOiB7dHlwZTogJ2ltYWdlJywgc3JjOiAnLi4vYXNzZXRzL3BsYXRmb3JtLnBuZyd9LFxyXG4gICAgICAgICdzdGFyJzoge3R5cGU6ICdpbWFnZScsIHNyYzogJy4uL2Fzc2V0cy9zdGFyLnBuZyd9LFxyXG4gICAgICAgICdkdWRlJzoge3R5cGU6ICdzcHJpdGVzaGVldCcsIHNyYzogJy4uL2Fzc2V0cy9kdWRlLnBuZycsIHdpZHRoOiAzMiwgaGVpZ2h0OiA0OH0sXHJcbiAgICAgICAgJ2J1dHRvbic6IHt0eXBlOiAnc3ByaXRlc2hlZXQnLCBzcmM6ICcuLi9hc3NldHMvYnV0dG9uX3Nwcml0ZV9zaGVldC5wbmcnLCB3aWR0aDogMTkzLCBoZWlnaHQ6IDcxfVxyXG4gICAgfSxcclxuXHJcbiAgICBzY29yZVN0eWxlID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICB9LFxyXG5cclxuICAgIE15R2FtZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzOiBBcnJheS5hcHBseShudWxsLCB7bGVuZ3RoOiAxMn0pLm1hcChmdW5jdGlvbiAoXywgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbaSwgMC43ICsgTWF0aC5yYW5kb20oKSAqIDAuMl07XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25DdXJzb3JJbnB1dDogZnVuY3Rpb24gKGN1cnNvcnMsIGdldEFjdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBnZXRBY3RvcigncGxheWVyJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3Vyc29ycy5sZWZ0LmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdsZWZ0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAxNTA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZnJhbWUgPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24gJiYgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC0zNTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsZWN0U3RhcjogZnVuY3Rpb24gKHBsYXllck5vZGUsIHN0YXJOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc3RhcnM6IHRoaXMuc3RhdGUuc3RhcnMuZmlsdGVyKGZ1bmN0aW9uIChfLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgIT09IHN0YXJOb2RlLnByb3BzLmk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLnN0YXRlLnNjb3JlICsgMTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFycyA9IHRoaXMuc3RhdGUuc3RhcnMubWFwKGZ1bmN0aW9uIChzdGFyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHNwcml0ZSBrZXk9e3N0YXJbMF19IGk9e2l9IHg9e3N0YXJbMF0gKiA3MH0geT17MH0gYXNzZXRLZXk9XCJzdGFyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlHcmF2aXR5WT17MTh9IGJvZHlCb3VuY2VZPXtzdGFyWzFdfS8+XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Z2FtZSBhc3NldHM9e2Fzc2V0c30gd2lkdGg9ezgwMH0gaGVpZ2h0PXs2MDB9IHBoeXNpY3M9e1BoYXNlci5QaHlzaWNzLkFSQ0FERX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwcml0ZSBhc3NldEtleT1cInNreVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgbmFtZT1cInBsYXRmb3Jtc1wiIGVuYWJsZUJvZHk9e3RydWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJncm91bmRcIiBhc3NldEtleT1cImdyb3VuZFwiIHk9ezYwMCAtIDY0fSBzY2FsZT17e3g6MiwgeToyfX0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJsZWRnZTFcIiBhc3NldEtleT1cImdyb3VuZFwiIHg9ezQwMH0geT17NDAwfSBib2R5SW1tb3ZhYmxlPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcHJpdGUgbmFtZT1cImxlZGdlMlwiIGFzc2V0S2V5PVwiZ3JvdW5kXCIgeD17LTE1MH0geT17MjUwfSBib2R5SW1tb3ZhYmxlPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgbmFtZT1cInN0YXJzXCIgZW5hYmxlQm9keT17dHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb2xsaWRlcyB3aXRoPVwicGxhdGZvcm1zXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJwbGF5ZXJcIiB4PXszMn0geT17NDUwfSBhc3NldEtleT1cImR1ZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keVBoeXNpY3M9e3RydWV9IGJvZHlCb3VuY2VZPXswLjJ9IGJvZHlHcmF2aXR5WT17MzAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUNvbGxpZGVXb3JsZEJvdW5kcz17dHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhbmltYXRpb24gaWQ9XCJsZWZ0XCIgZnJhbWVzPXtbMCwgMSwgMiwgM119IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGlvbiBpZD1cInJpZ2h0XCIgZnJhbWVzPXtbNSwgNiwgNywgOF19IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGNvbGxpZGVzIHdpdGg9XCJwbGF0Zm9ybXNcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvdmVybGFwcyB3aXRoPVwic3RhcnNcIiBvbk92ZXJsYXA9e3RoaXMuY29sbGVjdFN0YXJ9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L3Nwcml0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dCB0ZXh0PXtgU2NvcmU6ICR7dGhpcy5zdGF0ZS5zY29yZX1gfSBzdHlsZT17c2NvcmVTdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB4PXsxNn0geT17MTZ9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHg9ezB9IHk9ezB9IGFzc2V0S2V5PVwiYnV0dG9uXCIgZnJhbWVzPXtbMiwgMSwgMF19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCB0ZXh0PVwiaGkhXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxncmFwaGljcyB4PXsyMH0geT17MTB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2hhcGUgZmlsbD17MHhGRjMzMDB9IHN0cm9rZVdpZHRoPXsxMH0gc3Ryb2tlPXsweGZmZDkwMH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT17NTB9IHkxPXs1MH0geDI9ezI1MH0geTI9ezUwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezEwMH0geT17MTAwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezI1MH0geT17MjIwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezUwfSB5PXsyMjB9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5ldG8geD17NTB9IHk9ezUwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2hhcGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzaGFwZSB4PXs0MH0geT17ODB9IGZpbGw9ezB4RkYzMzAwfSBzdHJva2VXaWR0aD17MTB9IHN0cm9rZT17MHhmZmQ5MDB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzPVwibTUwLDUwIGwyNTAsNTAgbDEwMCwxMDAgbDI1MCwyMDAgbDUwLCAyMjAgbDUwLDUwXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2hhcGUgZmlsbD17MHhGRjcwMEJ9IHN0cm9rZVdpZHRoPXsxMH0gc3Ryb2tlPXsweEZGMDAwMH0gc3Ryb2tlQWxwaGE9ezAuOH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZSB4MT17MjEwfSB5MT17MzAwfSB4Mj17NDUwfSB5Mj17MzIwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGluZXRvIHg9ezU3MH0geT17MzUwfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y3VydmV0byBjcHg9ezYwMH0gY3B5PXswfSB4PXs0ODB9IHk9ezEwMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmV0byB4PXszMzB9IHk9ezEyMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmV0byB4PXs0MTB9IHk9ezIwMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmV0byB4PXsyMTB9IHk9ezMwMH0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NoYXBlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBzdHJva2VXaWR0aD17Mn0gc3Ryb2tlPXsweDAwMDBGRn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17NTB9IHk9ezI1MH0gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBmaWxsPXsweEZGRkYwQn0gZmlsbEFscGhhPXswLjV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeD17NDcwfSB5PXsyMDB9IGRpYW1ldGVyPXsyMDB9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5lIHN0cm9rZVdpZHRoPXsyMH0gc3Ryb2tlPXsweDMzRkYwMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDE9ezMwfSB5MT17MzB9IHgyPXs2MDB9IHkyPXs2MDB9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncmFwaGljcz5cclxuICAgICAgICAgICAgICAgICAgICA8Y3Vyc29ycyBvbklucHV0PXt0aGlzLm9uQ3Vyc29ySW5wdXR9Lz5cclxuICAgICAgICAgICAgICAgIDwvZ2FtZT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5SZWFjdC5yZW5kZXIoPE15R2FtZS8+LCAnZ2FtZScpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4YW1wbGVzL2dyYXBoaWNzLmpzXG4gKiovIiwiXHJcbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nID0gcmVxdWlyZSgncmVhY3QtYW55dGhpbmcvc3JjL25hdGl2ZScpO1xyXG52YXIgTmF0aXZlSW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL05hdGl2ZUltcGxlbWVudGF0aW9uJyk7XHJcblxyXG52YXIgUmVhY3RQaGFzZXIgPSBjcmVhdGVSZWFjdEFueXRoaW5nKE5hdGl2ZUltcGxlbWVudGF0aW9uKTtcclxudmFyIFJlYWN0ID0gUmVhY3RQaGFzZXIuUmVhY3Q7XHJcblxyXG5SZWFjdC5yZW5kZXIgPSBSZWFjdFBoYXNlci5yZW5kZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uYXRpdmUuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3QnKTtcblxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmcgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmcnKTtcbnZhciBjcmVhdGVOYXRpdmVSZWFjdEFueXRoaW5nID0gZnVuY3Rpb24gKG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlYWN0QW55dGhpbmcoUmVhY3QsIG5hdGl2ZUltcGxlbWVudGF0aW9uKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmF0aXZlUmVhY3RBbnl0aGluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9uYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdENoaWxkcmVuID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkcmVuJyk7XG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RDbGFzcyA9IHJlcXVpcmUoJy4vUmVhY3RDbGFzcycpO1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZhY3RvcmllcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXMnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCcuL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgb25seUNoaWxkID0gcmVxdWlyZSgnLi9vbmx5Q2hpbGQnKTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50O1xuICBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG4gIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jbG9uZUVsZW1lbnQ7XG59XG5cbnZhciBSZWFjdCA9IHtcblxuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbi5tYXAsXG4gICAgZm9yRWFjaDogUmVhY3RDaGlsZHJlbi5mb3JFYWNoLFxuICAgIGNvdW50OiBSZWFjdENoaWxkcmVuLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW4udG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IFJlYWN0Q29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50LFxuXG4gIC8vIENsYXNzaWNcblxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjcmVhdGVDbGFzczogUmVhY3RDbGFzcy5jcmVhdGVDbGFzcyxcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIC8vIEN1cnJlbnRseSBhIG5vb3AuIFdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBhbmQgdHJhY2UgbWl4aW5zLlxuICAgIHJldHVybiBtaXhpbjtcbiAgfSxcblxuICAvLyBUaGlzIGxvb2tzIERPTSBzcGVjaWZpYyBidXQgdGhlc2UgYXJlIGFjdHVhbGx5IGlzb21vcnBoaWMgaGVscGVyc1xuICAvLyBzaW5jZSB0aGV5IGFyZSBqdXN0IGdlbmVyYXRpbmcgRE9NIHN0cmluZ3MuXG4gIERPTTogUmVhY3RET01GYWN0b3JpZXMsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MudHdvQXJndW1lbnRQb29sZXI7XG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MuZm91ckFyZ3VtZW50UG9vbGVyO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIHRyYXZlcnNhbC4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBGb3JFYWNoQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBmb3JFYWNoRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSB0cmF2ZXJzYWwgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBjb250ZXh0IHdpdGguXG4gKi9cbmZ1bmN0aW9uIEZvckVhY2hCb29rS2VlcGluZyhmb3JFYWNoRnVuY3Rpb24sIGZvckVhY2hDb250ZXh0KSB7XG4gIHRoaXMuZnVuYyA9IGZvckVhY2hGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gZm9yRWFjaENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuRm9yRWFjaEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oRm9yRWFjaEJvb2tLZWVwaW5nLCB0d29Bcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jO1xuICB2YXIgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBGb3JFYWNoQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgRm9yRWFjaEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIG1hcHBpbmcuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgTWFwQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7ISp9IG1hcFJlc3VsdCBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBtYXBGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IG1hcENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqL1xuZnVuY3Rpb24gTWFwQm9va0tlZXBpbmcobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIHRoaXMucmVzdWx0ID0gbWFwUmVzdWx0O1xuICB0aGlzLmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgdGhpcy5mdW5jID0gbWFwRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuTWFwQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDtcbiAgdGhpcy5rZXlQcmVmaXggPSBudWxsO1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oTWFwQm9va0tlZXBpbmcsIGZvdXJBcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0O1xuICB2YXIga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4O1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICBtYXBwZWRDaGlsZCA9IFJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gTWFwQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgTWFwQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXkodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZER1bW15LCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIFJlYWN0Q2hpbGRyZW4gPSB7XG4gIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgbWFwOiBtYXBDaGlsZHJlbixcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbDogbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCxcbiAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gIHRvQXJyYXk6IHRvQXJyYXlcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZHJlbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBQb29sZWRDbGFzc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFN0YXRpYyBwb29sZXJzLiBTZXZlcmFsIGN1c3RvbSB2ZXJzaW9ucyBmb3IgZWFjaCBwb3RlbnRpYWwgbnVtYmVyIG9mXG4gKiBhcmd1bWVudHMuIEEgY29tcGxldGVseSBnZW5lcmljIHBvb2xlciBpcyBlYXN5IHRvIGltcGxlbWVudCwgYnV0IHdvdWxkXG4gKiByZXF1aXJlIGFjY2Vzc2luZyB0aGUgYGFyZ3VtZW50c2Agb2JqZWN0LiBJbiBlYWNoIG9mIHRoZXNlLCBgdGhpc2AgcmVmZXJzIHRvXG4gKiB0aGUgQ2xhc3MgaXRzZWxmLCBub3QgYW4gaW5zdGFuY2UuIElmIGFueSBvdGhlcnMgYXJlIG5lZWRlZCwgc2ltcGx5IGFkZCB0aGVtXG4gKiBoZXJlLCBvciBpbiB0aGVpciBvd24gZmlsZXMuXG4gKi9cbnZhciBvbmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChjb3B5RmllbGRzRnJvbSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBjb3B5RmllbGRzRnJvbSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoY29weUZpZWxkc0Zyb20pO1xuICB9XG59O1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMik7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyKTtcbiAgfVxufTtcblxudmFyIHRocmVlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMykge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzKTtcbiAgfVxufTtcblxudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQpO1xuICB9XG59O1xuXG52YXIgZml2ZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIGluc3RhbmNlLmRlc3RydWN0b3IoKTtcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGggPCBLbGFzcy5wb29sU2l6ZSkge1xuICAgIEtsYXNzLmluc3RhbmNlUG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgfVxufTtcblxudmFyIERFRkFVTFRfUE9PTF9TSVpFID0gMTA7XG52YXIgREVGQVVMVF9QT09MRVIgPSBvbmVBcmd1bWVudFBvb2xlcjtcblxuLyoqXG4gKiBBdWdtZW50cyBgQ29weUNvbnN0cnVjdG9yYCB0byBiZSBhIHBvb2xhYmxlIGNsYXNzLCBhdWdtZW50aW5nIG9ubHkgdGhlIGNsYXNzXG4gKiBpdHNlbGYgKHN0YXRpY2FsbHkpIG5vdCBhZGRpbmcgYW55IHByb3RvdHlwaWNhbCBmaWVsZHMuIEFueSBDb3B5Q29uc3RydWN0b3JcbiAqIHlvdSBnaXZlIHRoaXMgbWF5IGhhdmUgYSBgcG9vbFNpemVgIHByb3BlcnR5LCBhbmQgd2lsbCBsb29rIGZvciBhXG4gKiBwcm90b3R5cGljYWwgYGRlc3RydWN0b3JgIG9uIGluc3RhbmNlcyAob3B0aW9uYWwpLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbiAoQ29weUNvbnN0cnVjdG9yLCBwb29sZXIpIHtcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyLFxuICBmaXZlQXJndW1lbnRQb29sZXI6IGZpdmVBcmd1bWVudFBvb2xlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb29sZWRDbGFzcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUG9vbGVkQ2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2ludmFyaWFudC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVsZW1lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQgdHlwZS4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgfHwgMHhlYWM3O1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICAvLyBzZWxmIGFuZCBzb3VyY2UgYXJlIERFViBvbmx5IHByb3BlcnRpZXMuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc2VsZlxuICAgICAgfSk7XG4gICAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIGVsZW1lbnQuX3NlbGYgPSBzZWxmO1xuICAgICAgZWxlbWVudC5fc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmVmID0gIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgncmVmJykgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQgPyBudWxsIDogY29uZmlnLnJlZjtcbiAgICAgIGtleSA9ICFjb25maWcuaGFzT3duUHJvcGVydHkoJ2tleScpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0ID8gbnVsbCA6ICcnICsgY29uZmlnLmtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmID0gY29uZmlnLnJlZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5yZWY7XG4gICAgICBrZXkgPSBjb25maWcua2V5ID09PSB1bmRlZmluZWQgPyBudWxsIDogJycgKyBjb25maWcua2V5O1xuICAgIH1cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gQ3JlYXRlIGR1bW15IGBrZXlgIGFuZCBgcmVmYCBwcm9wZXJ0eSB0byBgcHJvcHNgIHRvIHdhcm4gdXNlcnNcbiAgICAvLyBhZ2FpbnN0IGl0cyB1c2VcbiAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICBpZiAoIXByb3BzLmhhc093blByb3BlcnR5KCdrZXknKSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICAgICAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiAnZGlzcGxheU5hbWUnIGluIHR5cGUgPyB0eXBlLmRpc3BsYXlOYW1lIDogJ0VsZW1lbnQnKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXByb3BzLmhhc093blByb3BlcnR5KCdyZWYnKSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICAgICAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiAnZGlzcGxheU5hbWUnIGluIHR5cGUgPyB0eXBlLmRpc3BsYXlOYW1lIDogJ0VsZW1lbnQnKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xufTtcblxuUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICB2YXIgZmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gIC8vIEV4cG9zZSB0aGUgdHlwZSBvbiB0aGUgZmFjdG9yeSBhbmQgdGhlIHByb3RvdHlwZSBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyBlYXNpbHkgYWNjZXNzZWQgb24gZWxlbWVudHMuIEUuZy4gYDxGb28gLz4udHlwZSA9PT0gRm9vYC5cbiAgLy8gVGhpcyBzaG91bGQgbm90IGJlIG5hbWVkIGBjb25zdHJ1Y3RvcmAgc2luY2UgdGhpcyBtYXkgbm90IGJlIHRoZSBmdW5jdGlvblxuICAvLyB0aGF0IGNyZWF0ZWQgdGhlIGVsZW1lbnQsIGFuZCBpdCBtYXkgbm90IGV2ZW4gYmUgYSBjb25zdHJ1Y3Rvci5cbiAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gIGZhY3RvcnkudHlwZSA9IHR5cGU7XG4gIHJldHVybiBmYWN0b3J5O1xufTtcblxuUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleSA9IGZ1bmN0aW9uIChvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcblxuICByZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q3VycmVudE93bmVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDdXJyZW50T3duZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvd2FybmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjYW5EZWZpbmVQcm9wZXJ0eVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHRyYXZlcnNlQWxsQ2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBTRVBBUkFUT1IgPSAnLic7XG52YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlckxvb2t1cCA9IHtcbiAgJz0nOiAnPTAnLFxuICAnOic6ICc9Midcbn07XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9bPTpdL2c7XG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHVzZXJQcm92aWRlZEtleUVzY2FwZXIobWF0Y2gpIHtcbiAgcmV0dXJuIHVzZXJQcm92aWRlZEtleUVzY2FwZXJMb29rdXBbbWF0Y2hdO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiB3cmFwVXNlclByb3ZpZGVkS2V5KGNvbXBvbmVudC5rZXkpO1xuICB9XG4gIC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG4gIHJldHVybiBpbmRleC50b1N0cmluZygzNik7XG59XG5cbi8qKlxuICogRXNjYXBlIGEgY29tcG9uZW50IGtleSBzbyB0aGF0IGl0IGlzIHNhZmUgdG8gdXNlIGluIGEgcmVhY3RpZC5cbiAqXG4gKiBAcGFyYW0geyp9IHRleHQgQ29tcG9uZW50IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSBBbiBlc2NhcGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsIHVzZXJQcm92aWRlZEtleUVzY2FwZXIpO1xufVxuXG4vKipcbiAqIFdyYXAgYSBga2V5YCB2YWx1ZSBleHBsaWNpdGx5IHByb3ZpZGVkIGJ5IHRoZSB1c2VyIHRvIGRpc3Rpbmd1aXNoIGl0IGZyb21cbiAqIGltcGxpY2l0bHktZ2VuZXJhdGVkIGtleXMgZ2VuZXJhdGVkIGJ5IGEgY29tcG9uZW50J3MgaW5kZXggaW4gaXRzIHBhcmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFZhbHVlIG9mIGEgdXNlci1wcm92aWRlZCBga2V5YCBhdHRyaWJ1dGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gd3JhcFVzZXJQcm92aWRlZEtleShrZXkpIHtcbiAgcmV0dXJuICckJyArIGVzY2FwZVVzZXJQcm92aWRlZEtleShrZXkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IGNoaWxkcmVuLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGlpID0gMDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGNoaWxkID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhkaWRXYXJuQWJvdXRNYXBzLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3QgeWV0IGZ1bGx5IHN1cHBvcnRlZC4gSXQgaXMgYW4gJyArICdleHBlcmltZW50YWwgZmVhdHVyZSB0aGF0IG1pZ2h0IGJlIHJlbW92ZWQuIENvbnZlcnQgaXQgdG8gYSAnICsgJ3NlcXVlbmNlIC8gaXRlcmFibGUgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIGNoaWxkID0gZW50cnlbMV07XG4gICAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgd3JhcFVzZXJQcm92aWRlZEtleShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmF2ZXJzZUFsbENoaWxkcmVuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBnZXRJdGVyYXRvckZuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgU3ltYm9sICovXG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAqXG4gKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAqXG4gKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yRm47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG52YXIgUmVhY3RJbnN0cnVtZW50YXRpb24gPSByZXF1aXJlKCcuL1JlYWN0SW5zdHJ1bWVudGF0aW9uJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAhKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3NldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgJyArICdmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblNldFN0YXRlKCk7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcocGFydGlhbFN0YXRlICE9IG51bGwsICdzZXRTdGF0ZSguLi4pOiBZb3UgcGFzc2VkIGFuIHVuZGVmaW5lZCBvciBudWxsIHN0YXRlIG9iamVjdDsgJyArICdpbnN0ZWFkLCB1c2UgZm9yY2VVcGRhdGUoKS4nKSA6IHZvaWQgMDtcbiAgfVxuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROb29wVXBkYXRlUXVldWVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuICcgKyAnVGhpcyBpcyBhIG5vLW9wLiBQbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3IgJiYgcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgIHdhcm5URFoocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3ROb29wVXBkYXRlUXVldWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0SW5zdHJ1bWVudGF0aW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3REZWJ1Z1Rvb2wgPSByZXF1aXJlKCcuL1JlYWN0RGVidWdUb29sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0geyBkZWJ1Z1Rvb2w6IFJlYWN0RGVidWdUb29sIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERlYnVnVG9vbFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wgPSByZXF1aXJlKCcuL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgZXZlbnRIYW5kbGVycyA9IFtdO1xudmFyIGhhbmRsZXJEb2VzVGhyb3dGb3JFdmVudCA9IHt9O1xuXG5mdW5jdGlvbiBlbWl0RXZlbnQoaGFuZGxlckZ1bmN0aW9uTmFtZSwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGV2ZW50SGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXJbaGFuZGxlckZ1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICBoYW5kbGVyW2hhbmRsZXJGdW5jdGlvbk5hbWVdKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFoYW5kbGVyRG9lc1Rocm93Rm9yRXZlbnRbaGFuZGxlckZ1bmN0aW9uTmFtZV0sICdleGNlcHRpb24gdGhyb3duIGJ5IGRldnRvb2wgd2hpbGUgaGFuZGxpbmcgJXM6ICVzJywgaGFuZGxlckZ1bmN0aW9uTmFtZSwgZS5tZXNzYWdlKSA6IHZvaWQgMDtcbiAgICAgICAgaGFuZGxlckRvZXNUaHJvd0ZvckV2ZW50W2hhbmRsZXJGdW5jdGlvbk5hbWVdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG52YXIgUmVhY3REZWJ1Z1Rvb2wgPSB7XG4gIGFkZERldnRvb2w6IGZ1bmN0aW9uIChkZXZ0b29sKSB7XG4gICAgZXZlbnRIYW5kbGVycy5wdXNoKGRldnRvb2wpO1xuICB9LFxuICByZW1vdmVEZXZ0b29sOiBmdW5jdGlvbiAoZGV2dG9vbCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRIYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGV2ZW50SGFuZGxlcnNbaV0gPT09IGRldnRvb2wpIHtcbiAgICAgICAgZXZlbnRIYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dCcpO1xuICB9LFxuICBvbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBlbWl0RXZlbnQoJ29uRW5kUHJvY2Vzc2luZ0NoaWxkQ29udGV4dCcpO1xuICB9LFxuICBvblNldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvblNldFN0YXRlJyk7XG4gIH0sXG4gIG9uTW91bnRSb290Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25Nb3VudFJvb3RDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25Nb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICBlbWl0RXZlbnQoJ29uTW91bnRDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvblVwZGF0ZUNvbXBvbmVudCcsIGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuICBvblVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvblVubW91bnRDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfVxufTtcblxuUmVhY3REZWJ1Z1Rvb2wuYWRkRGV2dG9vbChSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERlYnVnVG9vbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3REZWJ1Z1Rvb2wuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2xcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCA9IGZhbHNlO1xuXG4gIHZhciB3YXJuSW52YWxpZFNldFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFwcm9jZXNzaW5nQ2hpbGRDb250ZXh0LCAnc2V0U3RhdGUoLi4uKTogQ2Fubm90IGNhbGwgc2V0U3RhdGUoKSBpbnNpZGUgZ2V0Q2hpbGRDb250ZXh0KCknKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxudmFyIFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wgPSB7XG4gIG9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCA9IHRydWU7XG4gIH0sXG4gIG9uRW5kUHJvY2Vzc2luZ0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3NpbmdDaGlsZENvbnRleHQgPSBmYWxzZTtcbiAgfSxcbiAgb25TZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHdhcm5JbnZhbGlkU2V0U3RhdGUoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvZW1wdHlPYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2xhc3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25zJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG52YXIga2V5T2YgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlPZicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBNSVhJTlNfS0VZID0ga2V5T2YoeyBtaXhpbnM6IG51bGwgfSk7XG5cbi8qKlxuICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAqL1xudmFyIFNwZWNQb2xpY3kgPSBrZXlNaXJyb3Ioe1xuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBtYXkgYmUgZGVmaW5lZCBvbmx5IG9uY2UgYnkgdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gb3IgbWl4aW4uXG4gICAqL1xuICBERUZJTkVfT05DRTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgYnkgYm90aCB0aGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBhbmQgbWl4aW5zLlxuICAgKiBTdWJzZXF1ZW50IGRlZmluaXRpb25zIHdpbGwgYmUgY2hhaW5lZC4gVGhlc2UgbWV0aG9kcyBtdXN0IHJldHVybiB2b2lkLlxuICAgKi9cbiAgREVGSU5FX01BTlk6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBvdmVycmlkaW5nIHRoZSBiYXNlIGNsYXNzLlxuICAgKi9cbiAgT1ZFUlJJREVfQkFTRTogbnVsbCxcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgYXJlIHNpbWlsYXIgdG8gREVGSU5FX01BTlksIGV4Y2VwdCB3ZSBhc3N1bWUgdGhleSByZXR1cm5cbiAgICogb2JqZWN0cy4gV2UgdHJ5IHRvIG1lcmdlIHRoZSBrZXlzIG9mIHRoZSByZXR1cm4gdmFsdWVzIG9mIGFsbCB0aGUgbWl4ZWQgaW5cbiAgICogZnVuY3Rpb25zLiBJZiB0aGVyZSBpcyBhIGtleSBjb25mbGljdCB3ZSB0aHJvdy5cbiAgICovXG4gIERFRklORV9NQU5ZX01FUkdFRDogbnVsbFxufSk7XG5cbnZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBjb21wb25lbnRzIGFyZSBoaWdoZXItbGV2ZWwgY29tcG9uZW50cyB0aGF0IGNvbXBvc2Ugb3RoZXIgY29tcG9zaXRlXG4gKiBvciBuYXRpdmUgY29tcG9uZW50cy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgdHlwZSBvZiBgUmVhY3RDbGFzc2AsIHBhc3MgYSBzcGVjaWZpY2F0aW9uIG9mXG4gKiB5b3VyIG5ldyBjbGFzcyB0byBgUmVhY3QuY3JlYXRlQ2xhc3NgLiBUaGUgb25seSByZXF1aXJlbWVudCBvZiB5b3VyIGNsYXNzXG4gKiBzcGVjaWZpY2F0aW9uIGlzIHRoYXQgeW91IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC5cbiAqXG4gKiAgIHZhciBNeUNvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXY+SGVsbG8gV29ybGQ8L2Rpdj47XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBUaGUgY2xhc3Mgc3BlY2lmaWNhdGlvbiBzdXBwb3J0cyBhIHNwZWNpZmljIHByb3RvY29sIG9mIG1ldGhvZHMgdGhhdCBoYXZlXG4gKiBzcGVjaWFsIG1lYW5pbmcgKGUuZy4gYHJlbmRlcmApLiBTZWUgYFJlYWN0Q2xhc3NJbnRlcmZhY2VgIGZvclxuICogbW9yZSB0aGUgY29tcHJlaGVuc2l2ZSBwcm90b2NvbC4gQW55IG90aGVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgaW4gdGhlXG4gKiBjbGFzcyBzcGVjaWZpY2F0aW9uIHdpbGwgYmUgYXZhaWxhYmxlIG9uIHRoZSBwcm90b3R5cGUuXG4gKlxuICogQGludGVyZmFjZSBSZWFjdENsYXNzSW50ZXJmYWNlXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0Q2xhc3NJbnRlcmZhY2UgPSB7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIE1peGluIG9iamVjdHMgdG8gaW5jbHVkZSB3aGVuIGRlZmluaW5nIHlvdXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7YXJyYXl9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgbWl4aW5zOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgc2hvdWxkIGJlIGRlZmluZWQgb25cbiAgICogdGhlIGNvbXBvbmVudCdzIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgaXRzIHByb3RvdHlwZSAoc3RhdGljIG1ldGhvZHMpLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHN0YXRpY3M6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgcHJvcCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgcHJvcFR5cGVzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbnRleHRUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIHRoaXMgY29tcG9uZW50IHNldHMgZm9yIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjaGlsZENvbnRleHRUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvLyA9PT09IERlZmluaXRpb24gbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFZhbHVlcyBpbiB0aGUgbWFwcGluZyB3aWxsIGJlIHNldCBvblxuICAgKiBgdGhpcy5wcm9wc2AgaWYgdGhhdCBwcm9wIGlzIG5vdCBzcGVjaWZpZWQgKGkuZS4gdXNpbmcgYW4gYGluYCBjaGVjaykuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGludm9rZWQgYmVmb3JlIGBnZXRJbml0aWFsU3RhdGVgIGFuZCB0aGVyZWZvcmUgY2Fubm90IHJlbHlcbiAgICogb24gYHRoaXMuc3RhdGVgIG9yIHVzZSBgdGhpcy5zZXRTdGF0ZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXREZWZhdWx0UHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIG9uY2UgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHVzZWRcbiAgICogYXMgdGhlIGluaXRpYWwgdmFsdWUgb2YgYHRoaXMuc3RhdGVgLlxuICAgKlxuICAgKiAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4ge1xuICAgKiAgICAgICBpc09uOiBmYWxzZSxcbiAgICogICAgICAgZm9vQmF6OiBuZXcgQmF6Rm9vKClcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRJbml0aWFsU3RhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VELFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0Q2hpbGRDb250ZXh0OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogVXNlcyBwcm9wcyBmcm9tIGB0aGlzLnByb3BzYCBhbmQgc3RhdGUgZnJvbSBgdGhpcy5zdGF0ZWAgdG8gcmVuZGVyIHRoZVxuICAgKiBzdHJ1Y3R1cmUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogTm8gZ3VhcmFudGVlcyBhcmUgbWFkZSBhYm91dCB3aGVuIG9yIGhvdyBvZnRlbiB0aGlzIG1ldGhvZCBpcyBpbnZva2VkLCBzb1xuICAgKiBpdCBtdXN0IG5vdCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgdmFyIG5hbWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAqICAgICByZXR1cm4gPGRpdj5IZWxsbywge25hbWV9ITwvZGl2PjtcbiAgICogICB9XG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKiBAbm9zaWRlZWZmZWN0c1xuICAgKiBAcmVxdWlyZWRcbiAgICovXG4gIHJlbmRlcjogU3BlY1BvbGljeS5ERUZJTkVfT05DRSxcblxuICAvLyA9PT09IERlbGVnYXRlIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsbHkgY3JlYXRlZCBhbmQgYWJvdXQgdG8gYmUgbW91bnRlZC5cbiAgICogVGhpcyBtYXkgaGF2ZSBzaWRlIGVmZmVjdHMsIGJ1dCBhbnkgZXh0ZXJuYWwgc3Vic2NyaXB0aW9ucyBvciBkYXRhIGNyZWF0ZWRcbiAgICogYnkgdGhpcyBtZXRob2QgbXVzdCBiZSBjbGVhbmVkIHVwIGluIGBjb21wb25lbnRXaWxsVW5tb3VudGAuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBtb3VudGVkIGFuZCBoYXMgYSBET00gcmVwcmVzZW50YXRpb24uXG4gICAqIEhvd2V2ZXIsIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBET00gbm9kZSBpcyBpbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gbW91bnRlZCAoaW5pdGlhbGl6ZWQgYW5kIHJlbmRlcmVkKSBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYmVmb3JlIHRoZSBjb21wb25lbnQgcmVjZWl2ZXMgbmV3IHByb3BzLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byByZWFjdCB0byBhIHByb3AgdHJhbnNpdGlvbiBieSB1cGRhdGluZyB0aGVcbiAgICogc3RhdGUgdXNpbmcgYHRoaXMuc2V0U3RhdGVgLiBDdXJyZW50IHByb3BzIGFyZSBhY2Nlc3NlZCB2aWEgYHRoaXMucHJvcHNgLlxuICAgKlxuICAgKiAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgKiAgICAgICBsaWtlc0luY3JlYXNpbmc6IG5leHRQcm9wcy5saWtlQ291bnQgPiB0aGlzLnByb3BzLmxpa2VDb3VudFxuICAgKiAgICAgfSk7XG4gICAqICAgfVxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBlcXVpdmFsZW50IGBjb21wb25lbnRXaWxsUmVjZWl2ZVN0YXRlYC4gQW4gaW5jb21pbmcgcHJvcFxuICAgKiB0cmFuc2l0aW9uIG1heSBjYXVzZSBhIHN0YXRlIGNoYW5nZSwgYnV0IHRoZSBvcHBvc2l0ZSBpcyBub3QgdHJ1ZS4gSWYgeW91XG4gICAqIG5lZWQgaXQsIHlvdSBhcmUgcHJvYmFibHkgbG9va2luZyBmb3IgYGNvbXBvbmVudFdpbGxVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGlsZSBkZWNpZGluZyBpZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSB1cGRhdGVkIGFzIGEgcmVzdWx0IG9mXG4gICAqIHJlY2VpdmluZyBuZXcgcHJvcHMsIHN0YXRlIGFuZC9vciBjb250ZXh0LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBgcmV0dXJuIGZhbHNlYCB3aGVuIHlvdSdyZSBjZXJ0YWluIHRoYXQgdGhlXG4gICAqIHRyYW5zaXRpb24gdG8gdGhlIG5ldyBwcm9wcy9zdGF0ZS9jb250ZXh0IHdpbGwgbm90IHJlcXVpcmUgYSBjb21wb25lbnRcbiAgICogdXBkYXRlLlxuICAgKlxuICAgKiAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICByZXR1cm4gIWVxdWFsKG5leHRQcm9wcywgdGhpcy5wcm9wcykgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSkgfHxcbiAgICogICAgICAgIWVxdWFsKG5leHRDb250ZXh0LCB0aGlzLmNvbnRleHQpO1xuICAgKiAgIH1cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgdXBkYXRlLlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfT05DRSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gdXBkYXRlIGR1ZSB0byBhIHRyYW5zaXRpb24gZnJvbVxuICAgKiBgdGhpcy5wcm9wc2AsIGB0aGlzLnN0YXRlYCBhbmQgYHRoaXMuY29udGV4dGAgdG8gYG5leHRQcm9wc2AsIGBuZXh0U3RhdGVgXG4gICAqIGFuZCBgbmV4dENvbnRleHRgLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBwZXJmb3JtIHByZXBhcmF0aW9uIGJlZm9yZSBhbiB1cGRhdGUgb2NjdXJzLlxuICAgKlxuICAgKiBOT1RFOiBZb3UgKipjYW5ub3QqKiB1c2UgYHRoaXMuc2V0U3RhdGUoKWAgaW4gdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQncyBET00gcmVwcmVzZW50YXRpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJldlByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldlN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNvbnRleHRcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIGJlIHJlbW92ZWQgZnJvbSBpdHMgcGFyZW50IGFuZCBoYXZlXG4gICAqIGl0cyBET00gcmVwcmVzZW50YXRpb24gZGVzdHJveWVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBkZWFsbG9jYXRlIGFueSBleHRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGBjb21wb25lbnREaWRVbm1vdW50YCBzaW5jZSB5b3VyIGNvbXBvbmVudCB3aWxsIGhhdmUgYmVlblxuICAgKiBkZXN0cm95ZWQgYnkgdGhhdCBwb2ludC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvLyA9PT09IEFkdmFuY2VkIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBjdXJyZW50bHkgbW91bnRlZCBET00gcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IFNwZWNQb2xpY3kuT1ZFUlJJREVfQkFTRVxuXG59O1xuXG4vKipcbiAqIE1hcHBpbmcgZnJvbSBjbGFzcyBzcGVjaWZpY2F0aW9uIGtleXMgdG8gc3BlY2lhbCBwcm9jZXNzaW5nIGZ1bmN0aW9ucy5cbiAqXG4gKiBBbHRob3VnaCB0aGVzZSBhcmUgZGVjbGFyZWQgbGlrZSBpbnN0YW5jZSBwcm9wZXJ0aWVzIGluIHRoZSBzcGVjaWZpY2F0aW9uXG4gKiB3aGVuIGRlZmluaW5nIGNsYXNzZXMgdXNpbmcgYFJlYWN0LmNyZWF0ZUNsYXNzYCwgdGhleSBhcmUgYWN0dWFsbHkgc3RhdGljXG4gKiBhbmQgYXJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yIGluc3RlYWQgb2YgdGhlIHByb3RvdHlwZS4gRGVzcGl0ZVxuICogYmVpbmcgc3RhdGljLCB0aGV5IG11c3QgYmUgZGVmaW5lZCBvdXRzaWRlIG9mIHRoZSBcInN0YXRpY3NcIiBrZXkgdW5kZXJcbiAqIHdoaWNoIGFsbCBvdGhlciBzdGF0aWMgbWV0aG9kcyBhcmUgZGVmaW5lZC5cbiAqL1xudmFyIFJFU0VSVkVEX1NQRUNfS0VZUyA9IHtcbiAgZGlzcGxheU5hbWU6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgZGlzcGxheU5hbWUpIHtcbiAgICBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICB9LFxuICBtaXhpbnM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgbWl4aW5zKSB7XG4gICAgaWYgKG1peGlucykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaXhpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIG1peGluc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjaGlsZENvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLmNoaWxkQ29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jb250ZXh0KTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICB9LFxuICAvKipcbiAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAqIGF1dG9tYXRpYyBtZXJnaW5nLlxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gZ2V0RGVmYXVsdFByb3BzO1xuICAgIH1cbiAgfSxcbiAgcHJvcFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3BUeXBlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHByb3BUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IucHJvcFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IucHJvcFR5cGVzLCBwcm9wVHlwZXMpO1xuICB9LFxuICBzdGF0aWNzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgICBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcyk7XG4gIH0sXG4gIGF1dG9iaW5kOiBmdW5jdGlvbiAoKSB7fSB9O1xuXG4vLyBub29wXG5mdW5jdGlvbiB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIHR5cGVEZWYsIGxvY2F0aW9uKSB7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIHR5cGVEZWYpIHtcbiAgICBpZiAodHlwZURlZi5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIC8vIHVzZSBhIHdhcm5pbmcgaW5zdGVhZCBvZiBhbiBpbnZhcmlhbnQgc28gY29tcG9uZW50c1xuICAgICAgLy8gZG9uJ3Qgc2hvdyB1cCBpbiBwcm9kIGJ1dCBvbmx5IGluIF9fREVWX19cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuT1ZFUlJJREVfQkFTRSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIG92ZXJyaWRlICcgKyAnYCVzYCBmcm9tIHlvdXIgY2xhc3Mgc3BlY2lmaWNhdGlvbi4gRW5zdXJlIHRoYXQgeW91ciBtZXRob2QgbmFtZXMgJyArICdkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gRGlzYWxsb3cgZGVmaW5pbmcgbWV0aG9kcyBtb3JlIHRoYW4gb25jZSB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSB8fCBzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSAnICsgJ2Alc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSAnICsgJ3RvIGEgbWl4aW4uJywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogTWl4aW4gaGVscGVyIHdoaWNoIGhhbmRsZXMgcG9saWN5IHZhbGlkYXRpb24gYW5kIHJlc2VydmVkXG4gKiBzcGVjaWZpY2F0aW9uIGtleXMgd2hlbiBidWlsZGluZyBSZWFjdCBjbGFzc2VzLlxuICovXG5mdW5jdGlvbiBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYykge1xuICBpZiAoIXNwZWMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvICcgKyAndXNlIGEgY29tcG9uZW50IGNsYXNzIG9yIGZ1bmN0aW9uIGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgJyArICdyZWd1bGFyIG9iamVjdC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICEhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHNwZWMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gJyArICd1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgdmFyIHByb3RvID0gQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICB2YXIgYXV0b0JpbmRQYWlycyA9IHByb3RvLl9fcmVhY3RBdXRvQmluZFBhaXJzO1xuXG4gIC8vIEJ5IGhhbmRsaW5nIG1peGlucyBiZWZvcmUgYW55IG90aGVyIHByb3BlcnRpZXMsIHdlIGVuc3VyZSB0aGUgc2FtZVxuICAvLyBjaGFpbmluZyBvcmRlciBpcyBhcHBsaWVkIHRvIG1ldGhvZHMgd2l0aCBERUZJTkVfTUFOWSBwb2xpY3ksIHdoZXRoZXJcbiAgLy8gbWl4aW5zIGFyZSBsaXN0ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZXNlIG1ldGhvZHMgaW4gdGhlIHNwZWMuXG4gIGlmIChzcGVjLmhhc093blByb3BlcnR5KE1JWElOU19LRVkpKSB7XG4gICAgUkVTRVJWRURfU1BFQ19LRVlTLm1peGlucyhDb25zdHJ1Y3Rvciwgc3BlYy5taXhpbnMpO1xuICB9XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBzcGVjKSB7XG4gICAgaWYgKCFzcGVjLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gTUlYSU5TX0tFWSkge1xuICAgICAgLy8gV2UgaGF2ZSBhbHJlYWR5IGhhbmRsZWQgbWl4aW5zIGluIGEgc3BlY2lhbCBjYXNlIGFib3ZlLlxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHByb3BlcnR5ID0gc3BlY1tuYW1lXTtcbiAgICB2YXIgaXNBbHJlYWR5RGVmaW5lZCA9IHByb3RvLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSk7XG5cbiAgICBpZiAoUkVTRVJWRURfU1BFQ19LRVlTLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBSRVNFUlZFRF9TUEVDX0tFWVNbbmFtZV0oQ29uc3RydWN0b3IsIHByb3BlcnR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0dXAgbWV0aG9kcyBvbiBwcm90b3R5cGU6XG4gICAgICAvLyBUaGUgZm9sbG93aW5nIG1lbWJlciBtZXRob2RzIHNob3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBib3VuZDpcbiAgICAgIC8vIDEuIEV4cGVjdGVkIFJlYWN0Q2xhc3MgbWV0aG9kcyAoaW4gdGhlIFwiaW50ZXJmYWNlXCIpLlxuICAgICAgLy8gMi4gT3ZlcnJpZGRlbiBtZXRob2RzICh0aGF0IHdlcmUgbWl4ZWQgaW4pLlxuICAgICAgdmFyIGlzUmVhY3RDbGFzc01ldGhvZCA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIHZhciBzaG91bGRBdXRvQmluZCA9IGlzRnVuY3Rpb24gJiYgIWlzUmVhY3RDbGFzc01ldGhvZCAmJiAhaXNBbHJlYWR5RGVmaW5lZCAmJiBzcGVjLmF1dG9iaW5kICE9PSBmYWxzZTtcblxuICAgICAgaWYgKHNob3VsZEF1dG9CaW5kKSB7XG4gICAgICAgIGF1dG9CaW5kUGFpcnMucHVzaChuYW1lLCBwcm9wZXJ0eSk7XG4gICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICAgICAgIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZVtuYW1lXTtcblxuICAgICAgICAgIC8vIFRoZXNlIGNhc2VzIHNob3VsZCBhbHJlYWR5IGJlIGNhdWdodCBieSB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlLlxuICAgICAgICAgICEoaXNSZWFjdENsYXNzTWV0aG9kICYmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCB8fCBzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogVW5leHBlY3RlZCBzcGVjIHBvbGljeSAlcyBmb3Iga2V5ICVzICcgKyAnd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgICAgICAgIC8vIEZvciBtZXRob2RzIHdoaWNoIGFyZSBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLCBjYWxsIHRoZSBleGlzdGluZ1xuICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFkZCB2ZXJib3NlIGRpc3BsYXlOYW1lIHRvIHRoZSBmdW5jdGlvbiwgd2hpY2ggaGVscHMgd2hlbiBsb29raW5nXG4gICAgICAgICAgICAvLyBhdCBwcm9maWxpbmcgdG9vbHMuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmIHNwZWMuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICAgICAgcHJvdG9bbmFtZV0uZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lICsgJ18nICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpIHtcbiAgaWYgKCFzdGF0aWNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIG5hbWUgaW4gc3RhdGljcykge1xuICAgIHZhciBwcm9wZXJ0eSA9IHN0YXRpY3NbbmFtZV07XG4gICAgaWYgKCFzdGF0aWNzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXNlcnZlZCA9IG5hbWUgaW4gUkVTRVJWRURfU1BFQ19LRVlTO1xuICAgICEhaXNSZXNlcnZlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgJyArICdwcm9wZXJ0eSwgYCVzYCwgdGhhdCBzaG91bGRuXFwndCBiZSBvbiB0aGUgXCJzdGF0aWNzXCIga2V5LiBEZWZpbmUgaXQgJyArICdhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlICcgKyAnY29uc3RydWN0b3IuJywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgdmFyIGlzSW5oZXJpdGVkID0gbmFtZSBpbiBDb25zdHJ1Y3RvcjtcbiAgICAhIWlzSW5oZXJpdGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSAnICsgJ2R1ZSB0byBhIG1peGluLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBDb25zdHJ1Y3RvcltuYW1lXSA9IHByb3BlcnR5O1xuICB9XG59XG5cbi8qKlxuICogTWVyZ2UgdHdvIG9iamVjdHMsIGJ1dCB0aHJvdyBpZiBib3RoIGNvbnRhaW4gdGhlIHNhbWUga2V5LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvbmUgVGhlIGZpcnN0IG9iamVjdCwgd2hpY2ggaXMgbXV0YXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSB0d28gVGhlIHNlY29uZCBvYmplY3RcbiAqIEByZXR1cm4ge29iamVjdH0gb25lIGFmdGVyIGl0IGhhcyBiZWVuIG11dGF0ZWQgdG8gY29udGFpbiBldmVyeXRoaW5nIGluIHR3by5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhvbmUsIHR3bykge1xuICAhKG9uZSAmJiB0d28gJiYgdHlwZW9mIG9uZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHR3byA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogQ2Fubm90IG1lcmdlIG5vbi1vYmplY3RzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICBmb3IgKHZhciBrZXkgaW4gdHdvKSB7XG4gICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAhKG9uZVtrZXldID09PSB1bmRlZmluZWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogJyArICdUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCAnICsgJ21heSBiZSBkdWUgdG8gYSBtaXhpbjsgaW4gcGFydGljdWxhciwgdGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHR3byAnICsgJ2dldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgJyArICd3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICBib3VuZE1ldGhvZC5iaW5kID0gZnVuY3Rpb24gKG5ld1RoaXMpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgLy8gbGV0J3Mgd2Fybi5cbiAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogUmVhY3QgY29tcG9uZW50IG1ldGhvZHMgbWF5IG9ubHkgYmUgYm91bmQgdG8gdGhlICcgKyAnY29tcG9uZW50IGluc3RhbmNlLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxuLyoqXG4gKiBNb2R1bGUgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBjb21wb25lbnRzLlxuICpcbiAqIEBjbGFzcyBSZWFjdENsYXNzXG4gKi9cbnZhciBSZWFjdENsYXNzID0ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29tcG9zaXRlIGNvbXBvbmVudCBjbGFzcyBnaXZlbiBhIGNsYXNzIHNwZWNpZmljYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIENsYXNzIHNwZWNpZmljYXRpb24gKHdoaWNoIG11c3QgZGVmaW5lIGByZW5kZXJgKS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IENvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY3JlYXRlQ2xhc3M6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgdmFyIENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICAvLyBUaGlzIGNvbnN0cnVjdG9yIGdldHMgb3ZlcnJpZGRlbiBieSBtb2Nrcy4gVGhlIGFyZ3VtZW50IGlzIHVzZWRcbiAgICAgIC8vIGJ5IG1vY2tzIHRvIGFzc2VydCBvbiB3aGF0IGdldHMgbW91bnRlZC5cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLCAnU29tZXRoaW5nIGlzIGNhbGxpbmcgYSBSZWFjdCBjb21wb25lbnQgZGlyZWN0bHkuIFVzZSBhIGZhY3Rvcnkgb3IgJyArICdKU1ggaW5zdGVhZC4gU2VlOiBodHRwczovL2ZiLm1lL3JlYWN0LWxlZ2FjeWZhY3RvcnknKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgLy8gV2lyZSB1cCBhdXRvLWJpbmRpbmdcbiAgICAgIGlmICh0aGlzLl9fcmVhY3RBdXRvQmluZFBhaXJzLmxlbmd0aCkge1xuICAgICAgICBiaW5kQXV0b0JpbmRNZXRob2RzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcblxuICAgICAgLy8gUmVhY3RDbGFzc2VzIGRvZXNuJ3QgaGF2ZSBjb25zdHJ1Y3RvcnMuIEluc3RlYWQsIHRoZXkgdXNlIHRoZVxuICAgICAgLy8gZ2V0SW5pdGlhbFN0YXRlIGFuZCBjb21wb25lbnRXaWxsTW91bnQgbWV0aG9kcyBmb3IgaW5pdGlhbGl6YXRpb24uXG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSA/IHRoaXMuZ2V0SW5pdGlhbFN0YXRlKCkgOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmdldEluaXRpYWxTdGF0ZS5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAgIC8vIGRlcHJlY2F0aW5nIHRoaXMgY29udmVuaWVuY2UuXG4gICAgICAgICAgaW5pdGlhbFN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgISh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpbml0aWFsU3RhdGUpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5nZXRJbml0aWFsU3RhdGUoKTogbXVzdCByZXR1cm4gYW4gb2JqZWN0IG9yIG51bGwnLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBuZXcgUmVhY3RDbGFzc0NvbXBvbmVudCgpO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3JlYWN0QXV0b0JpbmRQYWlycyA9IFtdO1xuXG4gICAgaW5qZWN0ZWRNaXhpbnMuZm9yRWFjaChtaXhTcGVjSW50b0NvbXBvbmVudC5iaW5kKG51bGwsIENvbnN0cnVjdG9yKSk7XG5cbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgdGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIHVzZSBvZiB0aGVzZSBtZXRob2QgbmFtZXMgaXMgb2ssXG4gICAgICAvLyBzaW5jZSBpdCdzIHVzZWQgd2l0aCBjcmVhdGVDbGFzcy4gSWYgaXQncyBub3QsIHRoZW4gaXQncyBsaWtlbHkgYVxuICAgICAgLy8gbWlzdGFrZSBzbyB3ZSdsbCB3YXJuIHlvdSB0byB1c2UgdGhlIHN0YXRpYyBwcm9wZXJ0eSwgcHJvcGVydHlcbiAgICAgIC8vIGluaXRpYWxpemVyIG9yIGNvbnN0cnVjdG9yIHJlc3BlY3RpdmVseS5cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgICBpZiAoQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkID0ge307XG4gICAgICB9XG4gICAgfVxuXG4gICAgIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRTaG91bGRVcGRhdGUsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50U2hvdWxkVXBkYXRlKCkuIERpZCB5b3UgbWVhbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKT8gJyArICdUaGUgbmFtZSBpcyBwaHJhc2VkIGFzIGEgcXVlc3Rpb24gYmVjYXVzZSB0aGUgZnVuY3Rpb24gaXMgJyArICdleHBlY3RlZCB0byByZXR1cm4gYSB2YWx1ZS4nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFJlZHVjZSB0aW1lIHNwZW50IGRvaW5nIGxvb2t1cHMgYnkgc2V0dGluZyB0aGVzZSBvbiB0aGUgcHJvdG90eXBlLlxuICAgIGZvciAodmFyIG1ldGhvZE5hbWUgaW4gUmVhY3RDbGFzc0ludGVyZmFjZSkge1xuICAgICAgaWYgKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH0sXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgaW5qZWN0TWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgICAgaW5qZWN0ZWRNaXhpbnMucHVzaChtaXhpbik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDbGFzcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDbGFzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZUxvY2F0aW9uc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IGtleU1pcnJvcih7XG4gIHByb3A6IG51bGwsXG4gIGNvbnRleHQ6IG51bGwsXG4gIGNoaWxkQ29udGV4dDogbnVsbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9ucztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCcuL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAhKG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2tleU1pcnJvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xudmFyIGtleU9mID0gZnVuY3Rpb24gKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIva2V5T2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RE9NRmFjdG9yaWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuXG52YXIgbWFwT2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvbWFwT2JqZWN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgSFRNTCB0YWcgZWxlbWVudHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUYWcgbmFtZSAoZS5nLiBgZGl2YCkuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVET01GYWN0b3J5KHRhZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHJldHVybiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeSh0YWcpO1xuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSh0YWcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIGZyb20gc3VwcG9ydGVkIEhUTUwgdGFncyB0byBgUmVhY3RET01Db21wb25lbnRgIGNsYXNzZXMuXG4gKiBUaGlzIGlzIGFsc28gYWNjZXNzaWJsZSB2aWEgYFJlYWN0LkRPTWAuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSBtYXBPYmplY3Qoe1xuICBhOiAnYScsXG4gIGFiYnI6ICdhYmJyJyxcbiAgYWRkcmVzczogJ2FkZHJlc3MnLFxuICBhcmVhOiAnYXJlYScsXG4gIGFydGljbGU6ICdhcnRpY2xlJyxcbiAgYXNpZGU6ICdhc2lkZScsXG4gIGF1ZGlvOiAnYXVkaW8nLFxuICBiOiAnYicsXG4gIGJhc2U6ICdiYXNlJyxcbiAgYmRpOiAnYmRpJyxcbiAgYmRvOiAnYmRvJyxcbiAgYmlnOiAnYmlnJyxcbiAgYmxvY2txdW90ZTogJ2Jsb2NrcXVvdGUnLFxuICBib2R5OiAnYm9keScsXG4gIGJyOiAnYnInLFxuICBidXR0b246ICdidXR0b24nLFxuICBjYW52YXM6ICdjYW52YXMnLFxuICBjYXB0aW9uOiAnY2FwdGlvbicsXG4gIGNpdGU6ICdjaXRlJyxcbiAgY29kZTogJ2NvZGUnLFxuICBjb2w6ICdjb2wnLFxuICBjb2xncm91cDogJ2NvbGdyb3VwJyxcbiAgZGF0YTogJ2RhdGEnLFxuICBkYXRhbGlzdDogJ2RhdGFsaXN0JyxcbiAgZGQ6ICdkZCcsXG4gIGRlbDogJ2RlbCcsXG4gIGRldGFpbHM6ICdkZXRhaWxzJyxcbiAgZGZuOiAnZGZuJyxcbiAgZGlhbG9nOiAnZGlhbG9nJyxcbiAgZGl2OiAnZGl2JyxcbiAgZGw6ICdkbCcsXG4gIGR0OiAnZHQnLFxuICBlbTogJ2VtJyxcbiAgZW1iZWQ6ICdlbWJlZCcsXG4gIGZpZWxkc2V0OiAnZmllbGRzZXQnLFxuICBmaWdjYXB0aW9uOiAnZmlnY2FwdGlvbicsXG4gIGZpZ3VyZTogJ2ZpZ3VyZScsXG4gIGZvb3RlcjogJ2Zvb3RlcicsXG4gIGZvcm06ICdmb3JtJyxcbiAgaDE6ICdoMScsXG4gIGgyOiAnaDInLFxuICBoMzogJ2gzJyxcbiAgaDQ6ICdoNCcsXG4gIGg1OiAnaDUnLFxuICBoNjogJ2g2JyxcbiAgaGVhZDogJ2hlYWQnLFxuICBoZWFkZXI6ICdoZWFkZXInLFxuICBoZ3JvdXA6ICdoZ3JvdXAnLFxuICBocjogJ2hyJyxcbiAgaHRtbDogJ2h0bWwnLFxuICBpOiAnaScsXG4gIGlmcmFtZTogJ2lmcmFtZScsXG4gIGltZzogJ2ltZycsXG4gIGlucHV0OiAnaW5wdXQnLFxuICBpbnM6ICdpbnMnLFxuICBrYmQ6ICdrYmQnLFxuICBrZXlnZW46ICdrZXlnZW4nLFxuICBsYWJlbDogJ2xhYmVsJyxcbiAgbGVnZW5kOiAnbGVnZW5kJyxcbiAgbGk6ICdsaScsXG4gIGxpbms6ICdsaW5rJyxcbiAgbWFpbjogJ21haW4nLFxuICBtYXA6ICdtYXAnLFxuICBtYXJrOiAnbWFyaycsXG4gIG1lbnU6ICdtZW51JyxcbiAgbWVudWl0ZW06ICdtZW51aXRlbScsXG4gIG1ldGE6ICdtZXRhJyxcbiAgbWV0ZXI6ICdtZXRlcicsXG4gIG5hdjogJ25hdicsXG4gIG5vc2NyaXB0OiAnbm9zY3JpcHQnLFxuICBvYmplY3Q6ICdvYmplY3QnLFxuICBvbDogJ29sJyxcbiAgb3B0Z3JvdXA6ICdvcHRncm91cCcsXG4gIG9wdGlvbjogJ29wdGlvbicsXG4gIG91dHB1dDogJ291dHB1dCcsXG4gIHA6ICdwJyxcbiAgcGFyYW06ICdwYXJhbScsXG4gIHBpY3R1cmU6ICdwaWN0dXJlJyxcbiAgcHJlOiAncHJlJyxcbiAgcHJvZ3Jlc3M6ICdwcm9ncmVzcycsXG4gIHE6ICdxJyxcbiAgcnA6ICdycCcsXG4gIHJ0OiAncnQnLFxuICBydWJ5OiAncnVieScsXG4gIHM6ICdzJyxcbiAgc2FtcDogJ3NhbXAnLFxuICBzY3JpcHQ6ICdzY3JpcHQnLFxuICBzZWN0aW9uOiAnc2VjdGlvbicsXG4gIHNlbGVjdDogJ3NlbGVjdCcsXG4gIHNtYWxsOiAnc21hbGwnLFxuICBzb3VyY2U6ICdzb3VyY2UnLFxuICBzcGFuOiAnc3BhbicsXG4gIHN0cm9uZzogJ3N0cm9uZycsXG4gIHN0eWxlOiAnc3R5bGUnLFxuICBzdWI6ICdzdWInLFxuICBzdW1tYXJ5OiAnc3VtbWFyeScsXG4gIHN1cDogJ3N1cCcsXG4gIHRhYmxlOiAndGFibGUnLFxuICB0Ym9keTogJ3Rib2R5JyxcbiAgdGQ6ICd0ZCcsXG4gIHRleHRhcmVhOiAndGV4dGFyZWEnLFxuICB0Zm9vdDogJ3Rmb290JyxcbiAgdGg6ICd0aCcsXG4gIHRoZWFkOiAndGhlYWQnLFxuICB0aW1lOiAndGltZScsXG4gIHRpdGxlOiAndGl0bGUnLFxuICB0cjogJ3RyJyxcbiAgdHJhY2s6ICd0cmFjaycsXG4gIHU6ICd1JyxcbiAgdWw6ICd1bCcsXG4gICd2YXInOiAndmFyJyxcbiAgdmlkZW86ICd2aWRlbycsXG4gIHdicjogJ3dicicsXG5cbiAgLy8gU1ZHXG4gIGNpcmNsZTogJ2NpcmNsZScsXG4gIGNsaXBQYXRoOiAnY2xpcFBhdGgnLFxuICBkZWZzOiAnZGVmcycsXG4gIGVsbGlwc2U6ICdlbGxpcHNlJyxcbiAgZzogJ2cnLFxuICBpbWFnZTogJ2ltYWdlJyxcbiAgbGluZTogJ2xpbmUnLFxuICBsaW5lYXJHcmFkaWVudDogJ2xpbmVhckdyYWRpZW50JyxcbiAgbWFzazogJ21hc2snLFxuICBwYXRoOiAncGF0aCcsXG4gIHBhdHRlcm46ICdwYXR0ZXJuJyxcbiAgcG9seWdvbjogJ3BvbHlnb24nLFxuICBwb2x5bGluZTogJ3BvbHlsaW5lJyxcbiAgcmFkaWFsR3JhZGllbnQ6ICdyYWRpYWxHcmFkaWVudCcsXG4gIHJlY3Q6ICdyZWN0JyxcbiAgc3RvcDogJ3N0b3AnLFxuICBzdmc6ICdzdmcnLFxuICB0ZXh0OiAndGV4dCcsXG4gIHRzcGFuOiAndHNwYW4nXG5cbn0sIGNyZWF0ZURPTUZhY3RvcnkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NRmFjdG9yaWVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbGVtZW50VmFsaWRhdG9yXG4gKi9cblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25zJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgYWRkZW5kYSA9IGdldEFkZGVuZGFGb3JLZXlVc2UoJ3VuaXF1ZUtleScsIGVsZW1lbnQsIHBhcmVudFR5cGUpO1xuICBpZiAoYWRkZW5kYSA9PT0gbnVsbCkge1xuICAgIC8vIHdlIGFscmVhZHkgc2hvd2VkIHRoZSB3YXJuaW5nXG4gICAgcmV0dXJuO1xuICB9XG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzJXMnLCBhZGRlbmRhLnBhcmVudE9yT3duZXIgfHwgJycsIGFkZGVuZGEuY2hpbGRPd25lciB8fCAnJywgYWRkZW5kYS51cmwgfHwgJycpIDogdm9pZCAwO1xufVxuXG4vKipcbiAqIFNoYXJlZCB3YXJuaW5nIGFuZCBtb25pdG9yaW5nIGNvZGUgZm9yIHRoZSBrZXkgd2FybmluZ3MuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVR5cGUgQSBrZXkgdXNlZCBmb3IgZGUtZHVwaW5nIHdhcm5pbmdzLlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgQ29tcG9uZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKiBAcmV0dXJucyB7P29iamVjdH0gQSBzZXQgb2YgYWRkZW5kYSB0byB1c2UgaW4gdGhlIHdhcm5pbmcgbWVzc2FnZSwgb3IgbnVsbFxuICogaWYgdGhlIHdhcm5pbmcgaGFzIGFscmVhZHkgYmVlbiBzaG93biBiZWZvcmUgKGFuZCBzaG91bGRuJ3QgYmUgc2hvd24gYWdhaW4pLlxuICovXG5mdW5jdGlvbiBnZXRBZGRlbmRhRm9yS2V5VXNlKG1lc3NhZ2VUeXBlLCBlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICBpZiAoIWFkZGVuZHVtKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGFkZGVuZHVtID0gJyBDaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nW21lc3NhZ2VUeXBlXSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nW21lc3NhZ2VUeXBlXSA9IHt9KTtcbiAgaWYgKG1lbW9pemVyW2FkZGVuZHVtXSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIG1lbW9pemVyW2FkZGVuZHVtXSA9IHRydWU7XG5cbiAgdmFyIGFkZGVuZGEgPSB7XG4gICAgcGFyZW50T3JPd25lcjogYWRkZW5kdW0sXG4gICAgdXJsOiAnIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLFxuICAgIGNoaWxkT3duZXI6IG51bGxcbiAgfTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBhZGRlbmRhLmNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBlbGVtZW50Ll9vd25lci5nZXROYW1lKCkgKyAnLic7XG4gIH1cblxuICByZXR1cm4gYWRkZW5kYTtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSBwcm9wcyBhcmUgdmFsaWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHtvYmplY3R9IHByb3BUeXBlcyBNYXAgb2YgcHJvcCBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyhjb21wb25lbnROYW1lLCBwcm9wVHlwZXMsIHByb3BzLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvcFR5cGVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICEodHlwZW9mIHByb3BUeXBlc1twcm9wTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGVycm9yID0gZXg7XG4gICAgICB9XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSwgdHlwZW9mIGVycm9yKSA6IHZvaWQgMDtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCBwcm9wVHlwZTogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCkge1xuICB2YXIgY29tcG9uZW50Q2xhc3MgPSBlbGVtZW50LnR5cGU7XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUgPSBjb21wb25lbnRDbGFzcy5kaXNwbGF5TmFtZSB8fCBjb21wb25lbnRDbGFzcy5uYW1lO1xuICBpZiAoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzKSB7XG4gICAgY2hlY2tQcm9wVHlwZXMobmFtZSwgY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLnByb3ApO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB9XG59XG5cbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSB7XG5cbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHZhbGlkVHlwZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgc2hvdWxkIG5vdCBiZSBudWxsLCB1bmRlZmluZWQsIGJvb2xlYW4sIG9yICcgKyAnbnVtYmVyLiBJdCBzaG91bGQgYmUgYSBzdHJpbmcgKGZvciBET00gZWxlbWVudHMpIG9yIGEgUmVhY3RDbGFzcyAnICsgJyhmb3IgY29tcG9zaXRlIGNvbXBvbmVudHMpLiVzJywgZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkpIDogdm9pZCAwO1xuXG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICBjcmVhdGVGYWN0b3J5OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBgY2FsbGJhY2tgIG9uY2UgZm9yIGVhY2ggZW51bWVyYWJsZSBvd24gcHJvcGVydHkgaW4gdGhlXG4gKiBvYmplY3QgYW5kIGNvbnN0cnVjdHMgYSBuZXcgb2JqZWN0IGZyb20gdGhlIHJlc3VsdHMuIFRoZSBgY2FsbGJhY2tgIGlzXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuICpcbiAqICAtIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICogIC0gdGhlIHByb3BlcnR5IG5hbWVcbiAqICAtIHRoZSBvYmplY3QgYmVpbmcgdHJhdmVyc2VkXG4gKlxuICogUHJvcGVydGllcyB0aGF0IGFyZSBhZGRlZCBhZnRlciB0aGUgY2FsbCB0byBgbWFwT2JqZWN0YCB3aWxsIG5vdCBiZSB2aXNpdGVkXG4gKiBieSBgY2FsbGJhY2tgLiBJZiB0aGUgdmFsdWVzIG9mIGV4aXN0aW5nIHByb3BlcnRpZXMgYXJlIGNoYW5nZWQsIHRoZSB2YWx1ZVxuICogcGFzc2VkIHRvIGBjYWxsYmFja2Agd2lsbCBiZSB0aGUgdmFsdWUgYXQgdGhlIHRpbWUgYG1hcE9iamVjdGAgdmlzaXRzIHRoZW0uXG4gKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGRlbGV0ZWQgYmVmb3JlIGJlaW5nIHZpc2l0ZWQgYXJlIG5vdCB2aXNpdGVkLlxuICpcbiAqIEBncmVwIGZ1bmN0aW9uIG9iamVjdE1hcCgpXG4gKiBAZ3JlcCBmdW5jdGlvbiBvYmpNYXAoKVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHsqfSBjb250ZXh0XG4gKiBAcmV0dXJuIHs/b2JqZWN0fVxuICovXG5mdW5jdGlvbiBtYXBPYmplY3Qob2JqZWN0LCBjYWxsYmFjaywgY29udGV4dCkge1xuICBpZiAoIW9iamVjdCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKSB7XG4gICAgICByZXN1bHRbbmFtZV0gPSBjYWxsYmFjay5jYWxsKGNvbnRleHQsIG9iamVjdFtuYW1lXSwgbmFtZSwgb2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBPYmplY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvbWFwT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcblxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICpcbiAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAqXG4gKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAqICAgICB9LFxuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gKiAgIH0pO1xuICpcbiAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAqXG4gKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICpcbiAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgIHByb3BUeXBlczoge1xuICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICogICAgICAgICAgKTtcbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgIH0sXG4gKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAqICB9KTtcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG52YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG52YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG5cbiAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxufTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG4vKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignUmVxdWlyZWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCB3YXMgbm90IHNwZWNpZmllZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMobnVsbCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nKTtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXkpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG5mdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG4gIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG5mdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gJ2RhdGUnO1xuICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbmZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgfVxuICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFZlcnNpb25cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjAuMCc7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgb25seUNoaWxkXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzXG4gKiBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0cyBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGVcbiAqIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG8gYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmVcbiAqIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdENvbXBvbmVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnb25seUNoaWxkIG11c3QgYmUgcGFzc2VkIGEgY2hpbGRyZW4gd2l0aCBleGFjdGx5IG9uZSBjaGlsZC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmx5Q2hpbGQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL29ubHlDaGlsZC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RWZXJzaW9uJyk7XG5cbnZhciBSZWFjdEFueXRoaW5nTW91bnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdNb3VudCcpO1xudmFyIFJlYWN0QW55dGhpbmdJbmplY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdJbmplY3Rpb24nKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciByZW5kZXIgPSBSZWFjdFBlcmYubWVhc3VyZSgnUmVhY3QnLCAncmVuZGVyJywgUmVhY3RBbnl0aGluZ01vdW50LnJlbmRlcik7XG5cblxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmcgPSBmdW5jdGlvbiAoUmVhY3QsIG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgUmVhY3RBbnl0aGluZ0luamVjdGlvbi5pbmplY3QobmF0aXZlSW1wbGVtZW50YXRpb24pO1xuXG4gICAgdmFyIFJlYWN0QW55dGhpbmcgPSB7XG4gICAgICAgIFJlYWN0OiBSZWFjdCxcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHZlcnNpb246IFJlYWN0VmVyc2lvbixcbiAgICAgICAgY29tcG9uZW50czogKG5hdGl2ZUltcGxlbWVudGF0aW9uLmNvbXBvbmVudHMudHlwZXMgfHwgW10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB0YWcpIHtcbiAgICAgICAgICAgIGFjY1t0YWddID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pXG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdEFueXRoaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSZWFjdEFueXRoaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UGVyZlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZWFjdFBlcmYgaXMgYSBnZW5lcmFsIEFPUCBzeXN0ZW0gZGVzaWduZWQgdG8gbWVhc3VyZSBwZXJmb3JtYW5jZS4gVGhpc1xuICogbW9kdWxlIG9ubHkgaGFzIHRoZSBob29rczogc2VlIFJlYWN0RGVmYXVsdFBlcmYgZm9yIHRoZSBhbmFseXNpcyB0b29sLlxuICovXG5cbnZhciBSZWFjdFBlcmYgPSB7XG4gIC8qKlxuICAgKiBCb29sZWFuIHRvIGVuYWJsZS9kaXNhYmxlIG1lYXN1cmVtZW50LiBTZXQgdG8gZmFsc2UgYnkgZGVmYXVsdCB0byBwcmV2ZW50XG4gICAqIGFjY2lkZW50YWwgbG9nZ2luZyBhbmQgcGVyZiBsb3NzLlxuICAgKi9cbiAgZW5hYmxlTWVhc3VyZTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEhvbGRzIG9udG8gdGhlIG1lYXN1cmUgZnVuY3Rpb24gaW4gdXNlLiBCeSBkZWZhdWx0LCBkb24ndCBtZWFzdXJlXG4gICAqIGFueXRoaW5nLCBidXQgd2UnbGwgb3ZlcnJpZGUgdGhpcyBpZiB3ZSBpbmplY3QgYSBtZWFzdXJlIGZ1bmN0aW9uLlxuICAgKi9cbiAgc3RvcmVkTWVhc3VyZTogX25vTWVhc3VyZSxcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqZWN0TmFtZVxuICAgKiBAcGFyYW0ge29iamVjdDxzdHJpbmc+fSBtZXRob2ROYW1lc1xuICAgKi9cbiAgbWVhc3VyZU1ldGhvZHM6IGZ1bmN0aW9uIChvYmplY3QsIG9iamVjdE5hbWUsIG1ldGhvZE5hbWVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBtZXRob2ROYW1lcykge1xuICAgICAgICBpZiAoIW1ldGhvZE5hbWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBvYmplY3Rba2V5XSA9IFJlYWN0UGVyZi5tZWFzdXJlKG9iamVjdE5hbWUsIG1ldGhvZE5hbWVzW2tleV0sIG9iamVjdFtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIHRvIHdyYXAgbWV0aG9kcyB5b3Ugd2FudCB0byBtZWFzdXJlLiBaZXJvIG92ZXJoZWFkIGluIHByb2R1Y3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvYmpOYW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmbk5hbWVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAgICovXG4gIG1lYXN1cmU6IGZ1bmN0aW9uIChvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1lYXN1cmVkRnVuYyA9IG51bGw7XG4gICAgICB2YXIgd3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKFJlYWN0UGVyZi5lbmFibGVNZWFzdXJlKSB7XG4gICAgICAgICAgaWYgKCFtZWFzdXJlZEZ1bmMpIHtcbiAgICAgICAgICAgIG1lYXN1cmVkRnVuYyA9IFJlYWN0UGVyZi5zdG9yZWRNZWFzdXJlKG9iak5hbWUsIGZuTmFtZSwgZnVuYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtZWFzdXJlZEZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIHdyYXBwZXIuZGlzcGxheU5hbWUgPSBvYmpOYW1lICsgJ18nICsgZm5OYW1lO1xuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuICAgIHJldHVybiBmdW5jO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1lYXN1cmVcbiAgICAgKi9cbiAgICBpbmplY3RNZWFzdXJlOiBmdW5jdGlvbiAobWVhc3VyZSkge1xuICAgICAgUmVhY3RQZXJmLnN0b3JlZE1lYXN1cmUgPSBtZWFzdXJlO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBTaW1wbHkgcGFzc2VzIHRocm91Z2ggdGhlIG1lYXN1cmVkIGZ1bmN0aW9uLCB3aXRob3V0IG1lYXN1cmluZyBpdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gb2JqTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGZuTmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICogQHJldHVybiB7ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIF9ub01lYXN1cmUob2JqTmFtZSwgZm5OYW1lLCBmdW5jKSB7XG4gIHJldHVybiBmdW5jO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UGVyZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RQZXJmLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RNb3VudC5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0VXBkYXRlUXVldWUgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZScpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFVwZGF0ZXMnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RJbnN0cnVtZW50YXRpb24gPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcblxudmFyIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIFJlYWN0QW55dGhpbmdDb250YWluZXJJbmZvID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbycpO1xuXG52YXIgbW91bnRlZFJvb3RDb21wb25lbnRzID0ge307XG52YXIgbW91bnRlZEltYWdlcyA9IHt9O1xudmFyIF9fREVWX18gPSB0cnVlO1xuXG5cbmZ1bmN0aW9uIGJhdGNoZWRNb3VudENvbXBvbmVudEludG9Ob2RlKGNvbXBvbmVudEluc3RhbmNlLCBjb250YWluZXJOYW1lLCBjb250ZXh0KSB7XG4gICAgdmFyIHRyYW5zYWN0aW9uID0gUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24uZ2V0UG9vbGVkKGZhbHNlKTtcbiAgICB0cmFuc2FjdGlvbi5wZXJmb3JtKFxuICAgICAgICBtb3VudENvbXBvbmVudEludG9Ob2RlLFxuICAgICAgICBudWxsLFxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgY29udGFpbmVyTmFtZSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbnRleHRcbiAgICApO1xuICAgIFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLnJlbGVhc2UodHJhbnNhY3Rpb24pO1xufVxuXG5cbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50SW50b05vZGUoY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIG1hcmtlck5hbWU7XG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY29tcG9uZW50SW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcbiAgICAgICAgbWFya2VyTmFtZSA9ICdSZWFjdCBtb3VudDogJyArIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlIDpcbiAgICAgICAgICAgICAgICB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS50aW1lKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIHZhciBtYXJrdXAgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8oY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUpLFxuICAgICAgICBjb250ZXh0XG4gICAgKTtcblxuICAgIGlmIChtYXJrZXJOYW1lKSB7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZChtYXJrZXJOYW1lKTtcbiAgICB9XG5cbiAgICBSZWFjdEFueXRoaW5nTW91bnQuX21vdW50SW1hZ2VJbnRvTm9kZShcbiAgICAgICAgbWFya3VwLFxuICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbnRleHRcbiAgICApO1xufVxuXG5cbnZhciBSZWFjdEFueXRoaW5nTW91bnQgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIGNvbnRhaW5lck5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChuZXh0RWxlbWVudCksXG4gICAgICAgICAgICAnUmVhY3RBbnl0aW5nLnJlbmRlcigpOiBJbnZhbGlkIGNvbXBvbmVudCBlbGVtZW50LiVzJyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAnIEluc3RlYWQgb2YgcGFzc2luZyBhIHN0cmluZyBsaWtlIFxcJ2RpdlxcJywgcGFzcyAnICtcbiAgICAgICAgICAgICAgICAnUmVhY3QuY3JlYXRlRWxlbWVudChcXCdkaXZcXCcpIG9yIDxkaXYgLz4uJyA6XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBuZXh0RWxlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgICAgICAgICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgY2xhc3MgbGlrZSBGb28sIHBhc3MgJyArXG4gICAgICAgICAgICAgICAgICAgICdSZWFjdC5jcmVhdGVFbGVtZW50KEZvbykgb3IgPEZvbyAvPi4nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGl0IHF1YWNrcyBsaWtlIGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ICE9IG51bGwgJiYgbmV4dEVsZW1lbnQucHJvcHMgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAnIFRoaXMgbWF5IGJlIGNhdXNlZCBieSB1bmludGVudGlvbmFsbHkgbG9hZGluZyB0d28gaW5kZXBlbmRlbnQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29waWVzIG9mIFJlYWN0LicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgIGNvbnRhaW5lck5hbWUgJiYgdHlwZW9mIGNvbnRhaW5lck5hbWUgPT09ICdzdHJpbmcnLFxuICAgICAgICAgICAgJ3JlbmRlcigpOiBjb250YWluZXJOYW1lIG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHByZXZDb21wb25lbnQgPSBtb3VudGVkUm9vdENvbXBvbmVudHNbY29udGFpbmVyTmFtZV07XG5cbiAgICAgICAgaWYgKHByZXZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHZhciBwcmV2RWxlbWVudCA9IHByZXZDb21wb25lbnQuX2N1cnJlbnRFbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHZhciBwdWJsaWNJbnN0ID0gcHJldkNvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZENhbGxiYWNrID0gY2FsbGJhY2sgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChwdWJsaWNJbnN0KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZWFjdEFueXRoaW5nTW91bnQuX3VwZGF0ZVJvb3RDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgICAgIHByZXZDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQ2FsbGJhY2tcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwdWJsaWNJbnN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBSZWFjdEFueXRoaW5nTW91bnQuX3VubW91bnRSb290Q29tcG9uZW50KGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29tcG9uZW50ID0gUmVhY3RBbnl0aGluZ01vdW50Ll9yZW5kZXJOZXdSb290Q29tcG9uZW50KG5leHRFbGVtZW50LCBjb250YWluZXJOYW1lKTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUm9vdENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICBfdW5tb3VudFJvb3RDb21wb25lbnQ6IGZ1bmN0aW9uIChjb250YWluZXJOYW1lKSB7XG4gICAgfSxcbiAgICBcbiAgICBfcmVuZGVyTmV3Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCBjb250YWluZXJOYW1lKSB7XG4gICAgICAgIC8vIFZhcmlvdXMgcGFydHMgb2Ygb3VyIGNvZGUgKHN1Y2ggYXMgUmVhY3RDb21wb3NpdGVDb21wb25lbnQnc1xuICAgICAgICAvLyBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KSBhc3N1bWUgdGhhdCBjYWxscyB0byByZW5kZXIgYXJlbid0IG5lc3RlZDtcbiAgICAgICAgLy8gdmVyaWZ5IHRoYXQgdGhhdCdzIHRoZSBjYXNlLlxuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9PSBudWxsLFxuICAgICAgICAgICAgJ19yZW5kZXJOZXdSb290Q29tcG9uZW50KCk6IFJlbmRlciBtZXRob2RzIHNob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gJyArXG4gICAgICAgICAgICAnb2YgcHJvcHMgYW5kIHN0YXRlOyB0cmlnZ2VyaW5nIG5lc3RlZCBjb21wb25lbnQgdXBkYXRlcyBmcm9tICcgK1xuICAgICAgICAgICAgJ3JlbmRlciBpcyBub3QgYWxsb3dlZC4gSWYgbmVjZXNzYXJ5LCB0cmlnZ2VyIG5lc3RlZCB1cGRhdGVzIGluICcgK1xuICAgICAgICAgICAgJ2NvbXBvbmVudERpZFVwZGF0ZS4gQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgJXMuJyxcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCkgfHxcbiAgICAgICAgICAgICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCdcbiAgICAgICAgKTtcblxuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBjb250YWluZXJOYW1lICYmIHR5cGVvZiBjb250YWluZXJOYW1lID09PSAnc3RyaW5nJyxcbiAgICAgICAgICAgICdfcmVnaXN0ZXJDb21wb25lbnQoLi4uKTogVGFyZ2V0IGNvbnRhaW5lck5hbWUgaXMgbm90IGEgc3RyaW5nLidcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRFbGVtZW50KTtcblxuICAgICAgICAvLyBUaGUgaW5pdGlhbCByZW5kZXIgaXMgc3luY2hyb25vdXMgYnV0IGFueSB1cGRhdGVzIHRoYXQgaGFwcGVuIGR1cmluZ1xuICAgICAgICAvLyByZW5kZXJpbmcsIGluIGNvbXBvbmVudFdpbGxNb3VudCBvciBjb21wb25lbnREaWRNb3VudCwgd2lsbCBiZSBiYXRjaGVkXG4gICAgICAgIC8vIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBiYXRjaGluZyBzdHJhdGVneS5cblxuICAgICAgICBSZWFjdFVwZGF0ZXMuYmF0Y2hlZFVwZGF0ZXMoXG4gICAgICAgICAgICBiYXRjaGVkTW91bnRDb21wb25lbnRJbnRvTm9kZSxcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICAgICAgY29udGFpbmVyTmFtZSxcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBtb3VudGVkUm9vdENvbXBvbmVudHNbY29udGFpbmVyTmFtZV0gPSBjb21wb25lbnRJbnN0YW5jZTtcblxuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uTW91bnRSb290Q29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJbnN0YW5jZTtcbiAgICB9LFxuXG5cbiAgICBfbW91bnRJbWFnZUludG9Ob2RlOiBmdW5jdGlvbiAobWFya3VwLCBjb250YWluZXJOYW1lLCBpbWFnZSwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgdHlwZW9mIGNvbnRhaW5lck5hbWUgPT09ICdzdHJpbmcnLFxuICAgICAgICAgICAgJ21vdW50Q29tcG9uZW50SW50b05vZGUoLi4uKTogVGFyZ2V0IGNvbnRhaW5lciBpcyBub3QgdmFsaWQuJ1xuICAgICAgICApO1xuXG4gICAgICAgIG1vdW50ZWRJbWFnZXNbY29udGFpbmVyTmFtZV0gPSBpbWFnZTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdNb3VudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nTW91bnQuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VXBkYXRlUXVldWVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEluc3RhbmNlTWFwID0gcmVxdWlyZSgnLi9SZWFjdEluc3RhbmNlTWFwJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSkge1xuICBSZWFjdFVwZGF0ZXMuZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VW5leHBlY3RlZEFyZ3VtZW50KGFyZykge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBhcmc7XG4gIGlmICh0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG4gIHZhciBkaXNwbGF5TmFtZSA9IGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZSB8fCB0eXBlO1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFyZyk7XG4gIGlmIChrZXlzLmxlbmd0aCA+IDAgJiYga2V5cy5sZW5ndGggPCAyMCkge1xuICAgIHJldHVybiBkaXNwbGF5TmFtZSArICcgKGtleXM6ICcgKyBrZXlzLmpvaW4oJywgJykgKyAnKSc7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXlOYW1lO1xufVxuXG5mdW5jdGlvbiBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBSZWFjdEluc3RhbmNlTWFwLmdldChwdWJsaWNJbnN0YW5jZSk7XG4gIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBPbmx5IHdhcm4gd2hlbiB3ZSBoYXZlIGEgY2FsbGVyTmFtZS4gT3RoZXJ3aXNlIHdlIHNob3VsZCBiZSBzaWxlbnQuXG4gICAgICAvLyBXZSdyZSBwcm9iYWJseSBjYWxsaW5nIGZyb20gZW5xdWV1ZUNhbGxiYWNrLiBXZSBkb24ndCB3YW50IHRvIHdhcm5cbiAgICAgIC8vIHRoZXJlIGJlY2F1c2Ugd2UgYWxyZWFkeSB3YXJuZWQgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGxpZmVjeWNsZSBtZXRob2QuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghY2FsbGVyTmFtZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID09IG51bGwsICclcyguLi4pOiBDYW5ub3QgdXBkYXRlIGR1cmluZyBhbiBleGlzdGluZyBzdGF0ZSB0cmFuc2l0aW9uIChzdWNoIGFzICcgKyAnd2l0aGluIGByZW5kZXJgIG9yIGFub3RoZXIgY29tcG9uZW50XFwncyBjb25zdHJ1Y3RvcikuIFJlbmRlciBtZXRob2RzICcgKyAnc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiBvZiBwcm9wcyBhbmQgc3RhdGU7IGNvbnN0cnVjdG9yICcgKyAnc2lkZS1lZmZlY3RzIGFyZSBhbiBhbnRpLXBhdHRlcm4sIGJ1dCBjYW4gYmUgbW92ZWQgdG8gJyArICdgY29tcG9uZW50V2lsbE1vdW50YC4nLCBjYWxsZXJOYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIHJldHVybiBpbnRlcm5hbEluc3RhbmNlO1xufVxuXG4vKipcbiAqIFJlYWN0VXBkYXRlUXVldWUgYWxsb3dzIGZvciBzdGF0ZSB1cGRhdGVzIHRvIGJlIHNjaGVkdWxlZCBpbnRvIGEgbGF0ZXJcbiAqIHJlY29uY2lsaWF0aW9uIHN0ZXAuXG4gKi9cbnZhciBSZWFjdFVwZGF0ZVF1ZXVlID0ge1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgICAgaWYgKG93bmVyICE9PSBudWxsKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKG93bmVyLl93YXJuZWRBYm91dFJlZnNJblJlbmRlciwgJyVzIGlzIGFjY2Vzc2luZyBpc01vdW50ZWQgaW5zaWRlIGl0cyByZW5kZXIoKSBmdW5jdGlvbi4gJyArICdyZW5kZXIoKSBzaG91bGQgYmUgYSBwdXJlIGZ1bmN0aW9uIG9mIHByb3BzIGFuZCBzdGF0ZS4gSXQgc2hvdWxkICcgKyAnbmV2ZXIgYWNjZXNzIHNvbWV0aGluZyB0aGF0IHJlcXVpcmVzIHN0YWxlIGRhdGEgZnJvbSB0aGUgcHJldmlvdXMgJyArICdyZW5kZXIsIHN1Y2ggYXMgcmVmcy4gTW92ZSB0aGlzIGxvZ2ljIHRvIGNvbXBvbmVudERpZE1vdW50IGFuZCAnICsgJ2NvbXBvbmVudERpZFVwZGF0ZSBpbnN0ZWFkLicsIG93bmVyLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgICAgb3duZXIuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBSZWFjdEluc3RhbmNlTWFwLmdldChwdWJsaWNJbnN0YW5jZSk7XG4gICAgaWYgKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIC8vIER1cmluZyBjb21wb25lbnRXaWxsTW91bnQgYW5kIHJlbmRlciB0aGlzIHdpbGwgc3RpbGwgYmUgbnVsbCBidXQgYWZ0ZXJcbiAgICAgIC8vIHRoYXQgd2lsbCBhbHdheXMgcmVuZGVyIHRvIHNvbWV0aGluZy4gQXQgbGVhc3QgZm9yIG5vdy4gU28gd2UgY2FuIHVzZVxuICAgICAgLy8gdGhpcyBoYWNrLlxuICAgICAgcmV0dXJuICEhaW50ZXJuYWxJbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2FsbGVyTmFtZSBOYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIFJlYWN0VXBkYXRlUXVldWUudmFsaWRhdGVDYWxsYmFjayhjYWxsYmFjaywgY2FsbGVyTmFtZSk7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UpO1xuXG4gICAgLy8gUHJldmlvdXNseSB3ZSB3b3VsZCB0aHJvdyBhbiBlcnJvciBpZiB3ZSBkaWRuJ3QgaGF2ZSBhbiBpbnRlcm5hbFxuICAgIC8vIGluc3RhbmNlLiBTaW5jZSB3ZSB3YW50IHRvIG1ha2UgaXQgYSBuby1vcCBpbnN0ZWFkLCB3ZSBtaXJyb3IgdGhlIHNhbWVcbiAgICAvLyBiZWhhdmlvciB3ZSBoYXZlIGluIG90aGVyIGVucXVldWUqIG1ldGhvZHMuXG4gICAgLy8gV2UgYWxzbyBuZWVkIHRvIGlnbm9yZSBjYWxsYmFja3MgaW4gY29tcG9uZW50V2lsbE1vdW50LiBTZWVcbiAgICAvLyBlbnF1ZXVlVXBkYXRlcy5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzKSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzID0gW2NhbGxiYWNrXTtcbiAgICB9XG4gICAgLy8gVE9ETzogVGhlIGNhbGxiYWNrIGhlcmUgaXMgaWdub3JlZCB3aGVuIHNldFN0YXRlIGlzIGNhbGxlZCBmcm9tXG4gICAgLy8gY29tcG9uZW50V2lsbE1vdW50LiBFaXRoZXIgZml4IGl0IG9yIGRpc2FsbG93IGRvaW5nIHNvIGNvbXBsZXRlbHkgaW5cbiAgICAvLyBmYXZvciBvZiBnZXRJbml0aWFsU3RhdGUuIEFsdGVybmF0aXZlbHksIHdlIGNhbiBkaXNhbGxvd1xuICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgZW5xdWV1ZUNhbGxiYWNrSW50ZXJuYWw6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBjYWxsYmFjaykge1xuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzKSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzID0gW2NhbGxiYWNrXTtcbiAgICB9XG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcblxuICAgIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IHRydWU7XG5cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcblxuICAgIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gW2NvbXBsZXRlU3RhdGVdO1xuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSB0cnVlO1xuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nU3RhdGVRdWV1ZSB8fCAoaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ1N0YXRlUXVldWUgPSBbXSk7XG4gICAgcXVldWUucHVzaChwYXJ0aWFsU3RhdGUpO1xuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICBlbnF1ZXVlRWxlbWVudEludGVybmFsOiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgbmV3RWxlbWVudCkge1xuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdFbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIHZhbGlkYXRlQ2FsbGJhY2s6IGZ1bmN0aW9uIChjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgICEoIWNhbGxiYWNrIHx8IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMoLi4uKTogRXhwZWN0ZWQgdGhlIGxhc3Qgb3B0aW9uYWwgYGNhbGxiYWNrYCBhcmd1bWVudCB0byBiZSBhICcgKyAnZnVuY3Rpb24uIEluc3RlYWQgcmVjZWl2ZWQ6ICVzLicsIGNhbGxlck5hbWUsIGZvcm1hdFVuZXhwZWN0ZWRBcmd1bWVudChjYWxsYmFjaykpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VXBkYXRlUXVldWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlUXVldWUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0SW5zdGFuY2VNYXBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogYFJlYWN0SW5zdGFuY2VNYXBgIG1haW50YWlucyBhIG1hcHBpbmcgZnJvbSBhIHB1YmxpYyBmYWNpbmcgc3RhdGVmdWxcbiAqIGluc3RhbmNlIChrZXkpIGFuZCB0aGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gKHZhbHVlKS4gVGhpcyBhbGxvd3MgcHVibGljXG4gKiBtZXRob2RzIHRvIGFjY2VwdCB0aGUgdXNlciBmYWNpbmcgaW5zdGFuY2UgYXMgYW4gYXJndW1lbnQgYW5kIG1hcCB0aGVtIGJhY2tcbiAqIHRvIGludGVybmFsIG1ldGhvZHMuXG4gKi9cblxuLy8gVE9ETzogUmVwbGFjZSB0aGlzIHdpdGggRVM2OiB2YXIgUmVhY3RJbnN0YW5jZU1hcCA9IG5ldyBNYXAoKTtcblxudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSB7XG5cbiAgLyoqXG4gICAqIFRoaXMgQVBJIHNob3VsZCBiZSBjYWxsZWQgYGRlbGV0ZWAgYnV0IHdlJ2QgaGF2ZSB0byBtYWtlIHN1cmUgdG8gYWx3YXlzXG4gICAqIHRyYW5zZm9ybSB0aGVzZSB0byBzdHJpbmdzIGZvciBJRSBzdXBwb3J0LiBXaGVuIHRoaXMgdHJhbnNmb3JtIGlzIGZ1bGx5XG4gICAqIHN1cHBvcnRlZCB3ZSBjYW4gcmVuYW1lIGl0LlxuICAgKi9cbiAgcmVtb3ZlOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlO1xuICB9LFxuXG4gIGhhczogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSAhPT0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSA9IHZhbHVlO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RJbnN0YW5jZU1hcDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RJbnN0YW5jZU1hcC5qc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RVcGRhdGVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIENhbGxiYWNrUXVldWUgPSByZXF1aXJlKCcuL0NhbGxiYWNrUXVldWUnKTtcbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcbnZhciBSZWFjdEZlYXR1cmVGbGFncyA9IHJlcXVpcmUoJy4vUmVhY3RGZWF0dXJlRmxhZ3MnKTtcbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCcuL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1RyYW5zYWN0aW9uJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIGRpcnR5Q29tcG9uZW50cyA9IFtdO1xudmFyIGFzYXBDYWxsYmFja1F1ZXVlID0gQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQoKTtcbnZhciBhc2FwRW5xdWV1ZWQgPSBmYWxzZTtcblxudmFyIGJhdGNoaW5nU3RyYXRlZ3kgPSBudWxsO1xuXG5mdW5jdGlvbiBlbnN1cmVJbmplY3RlZCgpIHtcbiAgIShSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiAmJiBiYXRjaGluZ1N0cmF0ZWd5KSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgaW5qZWN0IGEgcmVjb25jaWxlIHRyYW5zYWN0aW9uIGNsYXNzIGFuZCBiYXRjaGluZyAnICsgJ3N0cmF0ZWd5JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xufVxuXG52YXIgTkVTVEVEX1VQREFURVMgPSB7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCA9IGRpcnR5Q29tcG9uZW50cy5sZW5ndGg7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoICE9PSBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBBZGRpdGlvbmFsIHVwZGF0ZXMgd2VyZSBlbnF1ZXVlZCBieSBjb21wb25lbnREaWRVcGRhdGUgaGFuZGxlcnMgb3JcbiAgICAgIC8vIHNpbWlsYXI7IGJlZm9yZSBvdXIgb3duIFVQREFURV9RVUVVRUlORyB3cmFwcGVyIGNsb3Nlcywgd2Ugd2FudCB0byBydW5cbiAgICAgIC8vIHRoZXNlIG5ldyB1cGRhdGVzIHNvIHRoYXQgaWYgQSdzIGNvbXBvbmVudERpZFVwZGF0ZSBjYWxscyBzZXRTdGF0ZSBvblxuICAgICAgLy8gQiwgQiB3aWxsIHVwZGF0ZSBiZWZvcmUgdGhlIGNhbGxiYWNrIEEncyB1cGRhdGVyIHByb3ZpZGVkIHdoZW4gY2FsbGluZ1xuICAgICAgLy8gc2V0U3RhdGUuXG4gICAgICBkaXJ0eUNvbXBvbmVudHMuc3BsaWNlKDAsIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoKTtcbiAgICAgIGZsdXNoQmF0Y2hlZFVwZGF0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlydHlDb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG59O1xuXG52YXIgVVBEQVRFX1FVRVVFSU5HID0ge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLnJlc2V0KCk7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLm5vdGlmeUFsbCgpO1xuICB9XG59O1xuXG52YXIgVFJBTlNBQ1RJT05fV1JBUFBFUlMgPSBbTkVTVEVEX1VQREFURVMsIFVQREFURV9RVUVVRUlOR107XG5cbmZ1bmN0aW9uIFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24oKSB7XG4gIHRoaXMucmVpbml0aWFsaXplVHJhbnNhY3Rpb24oKTtcbiAgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggPSBudWxsO1xuICB0aGlzLmNhbGxiYWNrUXVldWUgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpO1xuICB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uID0gUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24uZ2V0UG9vbGVkKFxuICAvKiB1c2VDcmVhdGVFbGVtZW50ICovdHJ1ZSk7XG59XG5cbl9hc3NpZ24oUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbi5wcm90b3R5cGUsIFRyYW5zYWN0aW9uLk1peGluLCB7XG4gIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVFJBTlNBQ1RJT05fV1JBUFBFUlM7XG4gIH0sXG5cbiAgZGVzdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoID0gbnVsbDtcbiAgICBDYWxsYmFja1F1ZXVlLnJlbGVhc2UodGhpcy5jYWxsYmFja1F1ZXVlKTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBudWxsO1xuICAgIFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLnJlbGVhc2UodGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbik7XG4gICAgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbiA9IG51bGw7XG4gIH0sXG5cbiAgcGVyZm9ybTogZnVuY3Rpb24gKG1ldGhvZCwgc2NvcGUsIGEpIHtcbiAgICAvLyBFc3NlbnRpYWxseSBjYWxscyBgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbi5wZXJmb3JtKG1ldGhvZCwgc2NvcGUsIGEpYFxuICAgIC8vIHdpdGggdGhpcyB0cmFuc2FjdGlvbidzIHdyYXBwZXJzIGFyb3VuZCBpdC5cbiAgICByZXR1cm4gVHJhbnNhY3Rpb24uTWl4aW4ucGVyZm9ybS5jYWxsKHRoaXMsIHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24ucGVyZm9ybSwgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbiwgbWV0aG9kLCBzY29wZSwgYSk7XG4gIH1cbn0pO1xuXG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbik7XG5cbmZ1bmN0aW9uIGJhdGNoZWRVcGRhdGVzKGNhbGxiYWNrLCBhLCBiLCBjLCBkLCBlKSB7XG4gIGVuc3VyZUluamVjdGVkKCk7XG4gIGJhdGNoaW5nU3RyYXRlZ3kuYmF0Y2hlZFVwZGF0ZXMoY2FsbGJhY2ssIGEsIGIsIGMsIGQsIGUpO1xufVxuXG4vKipcbiAqIEFycmF5IGNvbXBhcmF0b3IgZm9yIFJlYWN0Q29tcG9uZW50cyBieSBtb3VudCBvcmRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjMSBmaXJzdCBjb21wb25lbnQgeW91J3JlIGNvbXBhcmluZ1xuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYzIgc2Vjb25kIGNvbXBvbmVudCB5b3UncmUgY29tcGFyaW5nXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFJldHVybiB2YWx1ZSB1c2FibGUgYnkgQXJyYXkucHJvdG90eXBlLnNvcnQoKS5cbiAqL1xuZnVuY3Rpb24gbW91bnRPcmRlckNvbXBhcmF0b3IoYzEsIGMyKSB7XG4gIHJldHVybiBjMS5fbW91bnRPcmRlciAtIGMyLl9tb3VudE9yZGVyO1xufVxuXG5mdW5jdGlvbiBydW5CYXRjaGVkVXBkYXRlcyh0cmFuc2FjdGlvbikge1xuICB2YXIgbGVuID0gdHJhbnNhY3Rpb24uZGlydHlDb21wb25lbnRzTGVuZ3RoO1xuICAhKGxlbiA9PT0gZGlydHlDb21wb25lbnRzLmxlbmd0aCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgZmx1c2ggdHJhbnNhY3Rpb25cXCdzIHN0b3JlZCBkaXJ0eS1jb21wb25lbnRzIGxlbmd0aCAoJXMpIHRvICcgKyAnbWF0Y2ggZGlydHktY29tcG9uZW50cyBhcnJheSBsZW5ndGggKCVzKS4nLCBsZW4sIGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAvLyBTaW5jZSByZWNvbmNpbGluZyBhIGNvbXBvbmVudCBoaWdoZXIgaW4gdGhlIG93bmVyIGhpZXJhcmNoeSB1c3VhbGx5IChub3RcbiAgLy8gYWx3YXlzIC0tIHNlZSBzaG91bGRDb21wb25lbnRVcGRhdGUoKSkgd2lsbCByZWNvbmNpbGUgY2hpbGRyZW4sIHJlY29uY2lsZVxuICAvLyB0aGVtIGJlZm9yZSB0aGVpciBjaGlsZHJlbiBieSBzb3J0aW5nIHRoZSBhcnJheS5cbiAgZGlydHlDb21wb25lbnRzLnNvcnQobW91bnRPcmRlckNvbXBhcmF0b3IpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAvLyBJZiBhIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQgYmVmb3JlIHBlbmRpbmcgY2hhbmdlcyBhcHBseSwgaXQgd2lsbCBzdGlsbFxuICAgIC8vIGJlIGhlcmUsIGJ1dCB3ZSBhc3N1bWUgdGhhdCBpdCBoYXMgY2xlYXJlZCBpdHMgX3BlbmRpbmdDYWxsYmFja3MgYW5kXG4gICAgLy8gdGhhdCBwZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkgaXMgYSBub29wLlxuICAgIHZhciBjb21wb25lbnQgPSBkaXJ0eUNvbXBvbmVudHNbaV07XG5cbiAgICAvLyBJZiBwZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkgaGFwcGVucyB0byBlbnF1ZXVlIGFueSBuZXcgdXBkYXRlcywgd2VcbiAgICAvLyBzaG91bGRuJ3QgZXhlY3V0ZSB0aGUgY2FsbGJhY2tzIHVudGlsIHRoZSBuZXh0IHJlbmRlciBoYXBwZW5zLCBzb1xuICAgIC8vIHN0YXNoIHRoZSBjYWxsYmFja3MgZmlyc3RcbiAgICB2YXIgY2FsbGJhY2tzID0gY29tcG9uZW50Ll9wZW5kaW5nQ2FsbGJhY2tzO1xuICAgIGNvbXBvbmVudC5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG5cbiAgICB2YXIgbWFya2VyTmFtZTtcbiAgICBpZiAoUmVhY3RGZWF0dXJlRmxhZ3MubG9nVG9wTGV2ZWxSZW5kZXJzKSB7XG4gICAgICB2YXIgbmFtZWRDb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAvLyBEdWNrIHR5cGUgVG9wTGV2ZWxXcmFwcGVyLiBUaGlzIGlzIHByb2JhYmx5IGFsd2F5cyB0cnVlLlxuICAgICAgaWYgKGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQucHJvcHMgPT09IGNvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgIG5hbWVkQ29tcG9uZW50ID0gY29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIG1hcmtlck5hbWUgPSAnUmVhY3QgdXBkYXRlOiAnICsgbmFtZWRDb21wb25lbnQuZ2V0TmFtZSgpO1xuICAgICAgY29uc29sZS50aW1lKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIFJlYWN0UmVjb25jaWxlci5wZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkoY29tcG9uZW50LCB0cmFuc2FjdGlvbi5yZWNvbmNpbGVUcmFuc2FjdGlvbik7XG5cbiAgICBpZiAobWFya2VyTmFtZSkge1xuICAgICAgY29uc29sZS50aW1lRW5kKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FsbGJhY2tzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmNhbGxiYWNrUXVldWUuZW5xdWV1ZShjYWxsYmFja3Nbal0sIGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGZsdXNoQmF0Y2hlZFVwZGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24ncyB3cmFwcGVycyB3aWxsIGNsZWFyIHRoZSBkaXJ0eUNvbXBvbmVudHNcbiAgLy8gYXJyYXkgYW5kIHBlcmZvcm0gYW55IHVwZGF0ZXMgZW5xdWV1ZWQgYnkgbW91bnQtcmVhZHkgaGFuZGxlcnMgKGkuZS4sXG4gIC8vIGNvbXBvbmVudERpZFVwZGF0ZSkgYnV0IHdlIG5lZWQgdG8gY2hlY2sgaGVyZSB0b28gaW4gb3JkZXIgdG8gY2F0Y2hcbiAgLy8gdXBkYXRlcyBlbnF1ZXVlZCBieSBzZXRTdGF0ZSBjYWxsYmFja3MgYW5kIGFzYXAgY2FsbHMuXG4gIHdoaWxlIChkaXJ0eUNvbXBvbmVudHMubGVuZ3RoIHx8IGFzYXBFbnF1ZXVlZCkge1xuICAgIGlmIChkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgdHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uLmdldFBvb2xlZCgpO1xuICAgICAgdHJhbnNhY3Rpb24ucGVyZm9ybShydW5CYXRjaGVkVXBkYXRlcywgbnVsbCwgdHJhbnNhY3Rpb24pO1xuICAgICAgUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbi5yZWxlYXNlKHRyYW5zYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoYXNhcEVucXVldWVkKSB7XG4gICAgICBhc2FwRW5xdWV1ZWQgPSBmYWxzZTtcbiAgICAgIHZhciBxdWV1ZSA9IGFzYXBDYWxsYmFja1F1ZXVlO1xuICAgICAgYXNhcENhbGxiYWNrUXVldWUgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpO1xuICAgICAgcXVldWUubm90aWZ5QWxsKCk7XG4gICAgICBDYWxsYmFja1F1ZXVlLnJlbGVhc2UocXVldWUpO1xuICAgIH1cbiAgfVxufTtcbmZsdXNoQmF0Y2hlZFVwZGF0ZXMgPSBSZWFjdFBlcmYubWVhc3VyZSgnUmVhY3RVcGRhdGVzJywgJ2ZsdXNoQmF0Y2hlZFVwZGF0ZXMnLCBmbHVzaEJhdGNoZWRVcGRhdGVzKTtcblxuLyoqXG4gKiBNYXJrIGEgY29tcG9uZW50IGFzIG5lZWRpbmcgYSByZXJlbmRlciwgYWRkaW5nIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGFcbiAqIGxpc3Qgb2YgZnVuY3Rpb25zIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb25jZSB0aGUgcmVyZW5kZXIgb2NjdXJzLlxuICovXG5mdW5jdGlvbiBlbnF1ZXVlVXBkYXRlKGNvbXBvbmVudCkge1xuICBlbnN1cmVJbmplY3RlZCgpO1xuXG4gIC8vIFZhcmlvdXMgcGFydHMgb2Ygb3VyIGNvZGUgKHN1Y2ggYXMgUmVhY3RDb21wb3NpdGVDb21wb25lbnQnc1xuICAvLyBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KSBhc3N1bWUgdGhhdCBjYWxscyB0byByZW5kZXIgYXJlbid0IG5lc3RlZDtcbiAgLy8gdmVyaWZ5IHRoYXQgdGhhdCdzIHRoZSBjYXNlLiAoVGhpcyBpcyBjYWxsZWQgYnkgZWFjaCB0b3AtbGV2ZWwgdXBkYXRlXG4gIC8vIGZ1bmN0aW9uLCBsaWtlIHNldFByb3BzLCBzZXRTdGF0ZSwgZm9yY2VVcGRhdGUsIGV0Yy47IGNyZWF0aW9uIGFuZFxuICAvLyBkZXN0cnVjdGlvbiBvZiB0b3AtbGV2ZWwgY29tcG9uZW50cyBpcyBndWFyZGVkIGluIFJlYWN0TW91bnQuKVxuXG4gIGlmICghYmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcykge1xuICAgIGJhdGNoaW5nU3RyYXRlZ3kuYmF0Y2hlZFVwZGF0ZXMoZW5xdWV1ZVVwZGF0ZSwgY29tcG9uZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBkaXJ0eUNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xufVxuXG4vKipcbiAqIEVucXVldWUgYSBjYWxsYmFjayB0byBiZSBydW4gYXQgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBiYXRjaGluZyBjeWNsZS4gVGhyb3dzXG4gKiBpZiBubyB1cGRhdGVzIGFyZSBjdXJyZW50bHkgYmVpbmcgcGVyZm9ybWVkLlxuICovXG5mdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICFiYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlcy5hc2FwOiBDYW5cXCd0IGVucXVldWUgYW4gYXNhcCBjYWxsYmFjayBpbiBhIGNvbnRleHQgd2hlcmUnICsgJ3VwZGF0ZXMgYXJlIG5vdCBiZWluZyBiYXRjaGVkLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgYXNhcENhbGxiYWNrUXVldWUuZW5xdWV1ZShjYWxsYmFjaywgY29udGV4dCk7XG4gIGFzYXBFbnF1ZXVlZCA9IHRydWU7XG59XG5cbnZhciBSZWFjdFVwZGF0ZXNJbmplY3Rpb24gPSB7XG4gIGluamVjdFJlY29uY2lsZVRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoUmVjb25jaWxlVHJhbnNhY3Rpb24pIHtcbiAgICAhUmVjb25jaWxlVHJhbnNhY3Rpb24gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYSByZWNvbmNpbGUgdHJhbnNhY3Rpb24gY2xhc3MnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24gPSBSZWNvbmNpbGVUcmFuc2FjdGlvbjtcbiAgfSxcblxuICBpbmplY3RCYXRjaGluZ1N0cmF0ZWd5OiBmdW5jdGlvbiAoX2JhdGNoaW5nU3RyYXRlZ3kpIHtcbiAgICAhX2JhdGNoaW5nU3RyYXRlZ3kgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYSBiYXRjaGluZyBzdHJhdGVneScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAhKHR5cGVvZiBfYmF0Y2hpbmdTdHJhdGVneS5iYXRjaGVkVXBkYXRlcyA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYSBiYXRjaGVkVXBkYXRlcygpIGZ1bmN0aW9uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIF9iYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID09PSAnYm9vbGVhbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBwcm92aWRlIGFuIGlzQmF0Y2hpbmdVcGRhdGVzIGJvb2xlYW4gYXR0cmlidXRlJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGJhdGNoaW5nU3RyYXRlZ3kgPSBfYmF0Y2hpbmdTdHJhdGVneTtcbiAgfVxufTtcblxudmFyIFJlYWN0VXBkYXRlcyA9IHtcbiAgLyoqXG4gICAqIFJlYWN0IHJlZmVyZW5jZXMgYFJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb25gIHVzaW5nIHRoaXMgcHJvcGVydHkgaW4gb3JkZXJcbiAgICogdG8gYWxsb3cgZGVwZW5kZW5jeSBpbmplY3Rpb24uXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbjogbnVsbCxcblxuICBiYXRjaGVkVXBkYXRlczogYmF0Y2hlZFVwZGF0ZXMsXG4gIGVucXVldWVVcGRhdGU6IGVucXVldWVVcGRhdGUsXG4gIGZsdXNoQmF0Y2hlZFVwZGF0ZXM6IGZsdXNoQmF0Y2hlZFVwZGF0ZXMsXG4gIGluamVjdGlvbjogUmVhY3RVcGRhdGVzSW5qZWN0aW9uLFxuICBhc2FwOiBhc2FwXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VXBkYXRlcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDYWxsYmFja1F1ZXVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCBwc2V1ZG8tZXZlbnQgbW9kdWxlIHRvIGhlbHAga2VlcCB0cmFjayBvZiBjb21wb25lbnRzIHdhaXRpbmcgdG9cbiAqIGJlIG5vdGlmaWVkIHdoZW4gdGhlaXIgRE9NIHJlcHJlc2VudGF0aW9ucyBhcmUgYXZhaWxhYmxlIGZvciB1c2UuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRzIGBQb29sZWRDbGFzc2AsIHNvIHlvdSBzaG91bGQgbmV2ZXIgbmVlZCB0byBpbnN0YW50aWF0ZSB0aGlzLlxuICogSW5zdGVhZCwgdXNlIGBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpYC5cbiAqXG4gKiBAY2xhc3MgUmVhY3RNb3VudFJlYWR5XG4gKiBAaW1wbGVtZW50cyBQb29sZWRDbGFzc1xuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIENhbGxiYWNrUXVldWUoKSB7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IG51bGw7XG4gIHRoaXMuX2NvbnRleHRzID0gbnVsbDtcbn1cblxuX2Fzc2lnbihDYWxsYmFja1F1ZXVlLnByb3RvdHlwZSwge1xuXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBgbm90aWZ5QWxsYCBpcyBpbnZva2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBJbnZva2VkIHdoZW4gYG5vdGlmeUFsbGAgaXMgaW52b2tlZC5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBjb250ZXh0IENvbnRleHQgdG8gY2FsbCBgY2FsbGJhY2tgIHdpdGguXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IFtdO1xuICAgIHRoaXMuX2NvbnRleHRzID0gdGhpcy5fY29udGV4dHMgfHwgW107XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXMuX2NvbnRleHRzLnB1c2goY29udGV4dCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEludm9rZXMgYWxsIGVucXVldWVkIGNhbGxiYWNrcyBhbmQgY2xlYXJzIHRoZSBxdWV1ZS4gVGhpcyBpcyBpbnZva2VkIGFmdGVyXG4gICAqIHRoZSBET00gcmVwcmVzZW50YXRpb24gb2YgYSBjb21wb25lbnQgaGFzIGJlZW4gY3JlYXRlZCBvciB1cGRhdGVkLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5vdGlmeUFsbDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3M7XG4gICAgdmFyIGNvbnRleHRzID0gdGhpcy5fY29udGV4dHM7XG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgIShjYWxsYmFja3MubGVuZ3RoID09PSBjb250ZXh0cy5sZW5ndGgpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ01pc21hdGNoZWQgbGlzdCBvZiBjb250ZXh0cyBpbiBjYWxsYmFjayBxdWV1ZScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IG51bGw7XG4gICAgICB0aGlzLl9jb250ZXh0cyA9IG51bGw7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxsYmFja3NbaV0uY2FsbChjb250ZXh0c1tpXSk7XG4gICAgICB9XG4gICAgICBjYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICAgIGNvbnRleHRzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9LFxuXG4gIGNoZWNrcG9pbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzID8gdGhpcy5fY2FsbGJhY2tzLmxlbmd0aCA6IDA7XG4gIH0sXG5cbiAgcm9sbGJhY2s6IGZ1bmN0aW9uIChsZW4pIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9jYWxsYmFja3MubGVuZ3RoID0gbGVuO1xuICAgICAgdGhpcy5fY29udGV4dHMubGVuZ3RoID0gbGVuO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBpbnRlcm5hbCBxdWV1ZS5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IG51bGw7XG4gICAgdGhpcy5fY29udGV4dHMgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBgUG9vbGVkQ2xhc3NgIGxvb2tzIGZvciB0aGlzLlxuICAgKi9cbiAgZGVzdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG59KTtcblxuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKENhbGxiYWNrUXVldWUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrUXVldWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL0NhbGxiYWNrUXVldWUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RmVhdHVyZUZsYWdzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RGZWF0dXJlRmxhZ3MgPSB7XG4gIC8vIFdoZW4gdHJ1ZSwgY2FsbCBjb25zb2xlLnRpbWUoKSBiZWZvcmUgYW5kIC50aW1lRW5kKCkgYWZ0ZXIgZWFjaCB0b3AtbGV2ZWxcbiAgLy8gcmVuZGVyIChib3RoIGluaXRpYWwgcmVuZGVycyBhbmQgdXBkYXRlcykuIFVzZWZ1bCB3aGVuIGxvb2tpbmcgYXQgcHJvZC1tb2RlXG4gIC8vIHRpbWVsaW5lIHByb2ZpbGVzIGluIENocm9tZSwgZm9yIGV4YW1wbGUuXG4gIGxvZ1RvcExldmVsUmVuZGVyczogZmFsc2Vcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RGZWF0dXJlRmxhZ3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RmVhdHVyZUZsYWdzLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFJlY29uY2lsZXJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFJlZiA9IHJlcXVpcmUoJy4vUmVhY3RSZWYnKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcblxuLyoqXG4gKiBIZWxwZXIgdG8gY2FsbCBSZWFjdFJlZi5hdHRhY2hSZWZzIHdpdGggdGhpcyBjb21wb3NpdGUgY29tcG9uZW50LCBzcGxpdCBvdXRcbiAqIHRvIGF2b2lkIGFsbG9jYXRpb25zIGluIHRoZSB0cmFuc2FjdGlvbiBtb3VudC1yZWFkeSBxdWV1ZS5cbiAqL1xuZnVuY3Rpb24gYXR0YWNoUmVmcygpIHtcbiAgUmVhY3RSZWYuYXR0YWNoUmVmcyh0aGlzLCB0aGlzLl9jdXJyZW50RWxlbWVudCk7XG59XG5cbnZhciBSZWFjdFJlY29uY2lsZXIgPSB7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHJlbmRlcnMgbWFya3VwLCBhbmQgcmVnaXN0ZXJzIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gaW50ZXJuYWxJbnN0YW5jZVxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb258UmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHs/b2JqZWN0fSB0aGUgY29udGFpbmluZyBuYXRpdmUgY29tcG9uZW50IGluc3RhbmNlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gaW5mbyBhYm91dCB0aGUgbmF0aXZlIGNvbnRhaW5lclxuICAgKiBAcmV0dXJuIHs/c3RyaW5nfSBSZW5kZXJlZCBtYXJrdXAgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgRE9NLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIHRyYW5zYWN0aW9uLCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIGNvbnRleHQpIHtcbiAgICB2YXIgbWFya3VwID0gaW50ZXJuYWxJbnN0YW5jZS5tb3VudENvbXBvbmVudCh0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KTtcbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQgJiYgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQucmVmICE9IG51bGwpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYXR0YWNoUmVmcywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Nb3VudENvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZhbHVlIHRoYXQgY2FuIGJlIHBhc3NlZCB0b1xuICAgKiBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cC5cbiAgICovXG4gIGdldE5hdGl2ZU5vZGU6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGludGVybmFsSW5zdGFuY2UuZ2V0TmF0aXZlTm9kZSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbnkgcmVzb3VyY2VzIGFsbG9jYXRlZCBieSBgbW91bnRDb21wb25lbnRgLlxuICAgKlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgc2FmZWx5KSB7XG4gICAgUmVhY3RSZWYuZGV0YWNoUmVmcyhpbnRlcm5hbEluc3RhbmNlLCBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudCk7XG4gICAgaW50ZXJuYWxJbnN0YW5jZS51bm1vdW50Q29tcG9uZW50KHNhZmVseSk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblVubW91bnRDb21wb25lbnQoaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb21wb25lbnQgdXNpbmcgYSBuZXcgZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gaW50ZXJuYWxJbnN0YW5jZVxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlY2VpdmVDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgcHJldkVsZW1lbnQgPSBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudDtcblxuICAgIGlmIChuZXh0RWxlbWVudCA9PT0gcHJldkVsZW1lbnQgJiYgY29udGV4dCA9PT0gaW50ZXJuYWxJbnN0YW5jZS5fY29udGV4dCkge1xuICAgICAgLy8gU2luY2UgZWxlbWVudHMgYXJlIGltbXV0YWJsZSBhZnRlciB0aGUgb3duZXIgaXMgcmVuZGVyZWQsXG4gICAgICAvLyB3ZSBjYW4gZG8gYSBjaGVhcCBpZGVudGl0eSBjb21wYXJlIGhlcmUgdG8gZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYVxuICAgICAgLy8gc3VwZXJmbHVvdXMgcmVjb25jaWxlLiBJdCdzIHBvc3NpYmxlIGZvciBzdGF0ZSB0byBiZSBtdXRhYmxlIGJ1dCBzdWNoXG4gICAgICAvLyBjaGFuZ2Ugc2hvdWxkIHRyaWdnZXIgYW4gdXBkYXRlIG9mIHRoZSBvd25lciB3aGljaCB3b3VsZCByZWNyZWF0ZVxuICAgICAgLy8gdGhlIGVsZW1lbnQuIFdlIGV4cGxpY2l0bHkgY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYW4gb3duZXIgc2luY2VcbiAgICAgIC8vIGl0J3MgcG9zc2libGUgZm9yIGFuIGVsZW1lbnQgY3JlYXRlZCBvdXRzaWRlIGEgY29tcG9zaXRlIHRvIGJlXG4gICAgICAvLyBkZWVwbHkgbXV0YXRlZCBhbmQgcmV1c2VkLlxuXG4gICAgICAvLyBUT0RPOiBCYWlsaW5nIG91dCBlYXJseSBpcyBqdXN0IGEgcGVyZiBvcHRpbWl6YXRpb24gcmlnaHQ/XG4gICAgICAvLyBUT0RPOiBSZW1vdmluZyB0aGUgcmV0dXJuIHN0YXRlbWVudCBzaG91bGQgYWZmZWN0IGNvcnJlY3RuZXNzP1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWZzQ2hhbmdlZCA9IFJlYWN0UmVmLnNob3VsZFVwZGF0ZVJlZnMocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KTtcblxuICAgIGlmIChyZWZzQ2hhbmdlZCkge1xuICAgICAgUmVhY3RSZWYuZGV0YWNoUmVmcyhpbnRlcm5hbEluc3RhbmNlLCBwcmV2RWxlbWVudCk7XG4gICAgfVxuXG4gICAgaW50ZXJuYWxJbnN0YW5jZS5yZWNlaXZlQ29tcG9uZW50KG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG5cbiAgICBpZiAocmVmc0NoYW5nZWQgJiYgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQgJiYgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQucmVmICE9IG51bGwpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYXR0YWNoUmVmcywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblVwZGF0ZUNvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZsdXNoIGFueSBkaXJ0eSBjaGFuZ2VzIGluIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBpbnRlcm5hbEluc3RhbmNlXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwZXJmb3JtVXBkYXRlSWZOZWNlc3Nhcnk6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCB0cmFuc2FjdGlvbikge1xuICAgIGludGVybmFsSW5zdGFuY2UucGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5KHRyYW5zYWN0aW9uKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVXBkYXRlQ29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UmVjb25jaWxlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFJlZlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0T3duZXInKTtcblxudmFyIFJlYWN0UmVmID0ge307XG5cbmZ1bmN0aW9uIGF0dGFjaFJlZihyZWYsIGNvbXBvbmVudCwgb3duZXIpIHtcbiAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZWYoY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCkpO1xuICB9IGVsc2Uge1xuICAgIC8vIExlZ2FjeSByZWZcbiAgICBSZWFjdE93bmVyLmFkZENvbXBvbmVudEFzUmVmVG8oY29tcG9uZW50LCByZWYsIG93bmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXRhY2hSZWYocmVmLCBjb21wb25lbnQsIG93bmVyKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKG51bGwpO1xuICB9IGVsc2Uge1xuICAgIC8vIExlZ2FjeSByZWZcbiAgICBSZWFjdE93bmVyLnJlbW92ZUNvbXBvbmVudEFzUmVmRnJvbShjb21wb25lbnQsIHJlZiwgb3duZXIpO1xuICB9XG59XG5cblJlYWN0UmVmLmF0dGFjaFJlZnMgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICBpZiAocmVmICE9IG51bGwpIHtcbiAgICBhdHRhY2hSZWYocmVmLCBpbnN0YW5jZSwgZWxlbWVudC5fb3duZXIpO1xuICB9XG59O1xuXG5SZWFjdFJlZi5zaG91bGRVcGRhdGVSZWZzID0gZnVuY3Rpb24gKHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkge1xuICAvLyBJZiBlaXRoZXIgdGhlIG93bmVyIG9yIGEgYHJlZmAgaGFzIGNoYW5nZWQsIG1ha2Ugc3VyZSB0aGUgbmV3ZXN0IG93bmVyXG4gIC8vIGhhcyBzdG9yZWQgYSByZWZlcmVuY2UgdG8gYHRoaXNgLCBhbmQgdGhlIHByZXZpb3VzIG93bmVyIChpZiBkaWZmZXJlbnQpXG4gIC8vIGhhcyBmb3Jnb3R0ZW4gdGhlIHJlZmVyZW5jZSB0byBgdGhpc2AuIFdlIHVzZSB0aGUgZWxlbWVudCBpbnN0ZWFkXG4gIC8vIG9mIHRoZSBwdWJsaWMgdGhpcy5wcm9wcyBiZWNhdXNlIHRoZSBwb3N0IHByb2Nlc3NpbmcgY2Fubm90IGRldGVybWluZVxuICAvLyBhIHJlZi4gVGhlIHJlZiBjb25jZXB0dWFsbHkgbGl2ZXMgb24gdGhlIGVsZW1lbnQuXG5cbiAgLy8gVE9ETzogU2hvdWxkIHRoaXMgZXZlbiBiZSBwb3NzaWJsZT8gVGhlIG93bmVyIGNhbm5vdCBjaGFuZ2UgYmVjYXVzZVxuICAvLyBpdCdzIGZvcmJpZGRlbiBieSBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudC4gVGhlIHJlZiBjYW4gY2hhbmdlXG4gIC8vIGlmIHlvdSBzd2FwIHRoZSBrZXlzIG9mIGJ1dCBub3QgdGhlIHJlZnMuIFJlY29uc2lkZXIgd2hlcmUgdGhpcyBjaGVja1xuICAvLyBpcyBtYWRlLiBJdCBwcm9iYWJseSBiZWxvbmdzIHdoZXJlIHRoZSBrZXkgY2hlY2tpbmcgYW5kXG4gIC8vIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQgaXMgZG9uZS5cblxuICB2YXIgcHJldkVtcHR5ID0gcHJldkVsZW1lbnQgPT09IG51bGwgfHwgcHJldkVsZW1lbnQgPT09IGZhbHNlO1xuICB2YXIgbmV4dEVtcHR5ID0gbmV4dEVsZW1lbnQgPT09IG51bGwgfHwgbmV4dEVsZW1lbnQgPT09IGZhbHNlO1xuXG4gIHJldHVybihcbiAgICAvLyBUaGlzIGhhcyBhIGZldyBmYWxzZSBwb3NpdGl2ZXMgdy9yL3QgZW1wdHkgY29tcG9uZW50cy5cbiAgICBwcmV2RW1wdHkgfHwgbmV4dEVtcHR5IHx8IG5leHRFbGVtZW50Ll9vd25lciAhPT0gcHJldkVsZW1lbnQuX293bmVyIHx8IG5leHRFbGVtZW50LnJlZiAhPT0gcHJldkVsZW1lbnQucmVmXG4gICk7XG59O1xuXG5SZWFjdFJlZi5kZXRhY2hSZWZzID0gZnVuY3Rpb24gKGluc3RhbmNlLCBlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgZGV0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFJlZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RSZWYuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0T3duZXJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZWFjdE93bmVycyBhcmUgY2FwYWJsZSBvZiBzdG9yaW5nIHJlZmVyZW5jZXMgdG8gb3duZWQgY29tcG9uZW50cy5cbiAqXG4gKiBBbGwgY29tcG9uZW50cyBhcmUgY2FwYWJsZSBvZiAvL2JlaW5nLy8gcmVmZXJlbmNlZCBieSBvd25lciBjb21wb25lbnRzLCBidXRcbiAqIG9ubHkgUmVhY3RPd25lciBjb21wb25lbnRzIGFyZSBjYXBhYmxlIG9mIC8vcmVmZXJlbmNpbmcvLyBvd25lZCBjb21wb25lbnRzLlxuICogVGhlIG5hbWVkIHJlZmVyZW5jZSBpcyBrbm93biBhcyBhIFwicmVmXCIuXG4gKlxuICogUmVmcyBhcmUgYXZhaWxhYmxlIHdoZW4gbW91bnRlZCBhbmQgdXBkYXRlZCBkdXJpbmcgcmVjb25jaWxpYXRpb24uXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiAoXG4gKiAgICAgICAgIDxkaXYgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XG4gKiAgICAgICAgICAgPEN1c3RvbUNvbXBvbmVudCByZWY9XCJjdXN0b21cIiAvPlxuICogICAgICAgICA8L2Rpdj5cbiAqICAgICAgICk7XG4gKiAgICAgfSxcbiAqICAgICBoYW5kbGVDbGljazogZnVuY3Rpb24oKSB7XG4gKiAgICAgICB0aGlzLnJlZnMuY3VzdG9tLmhhbmRsZUNsaWNrKCk7XG4gKiAgICAgfSxcbiAqICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gKiAgICAgICB0aGlzLnJlZnMuY3VzdG9tLmluaXRpYWxpemUoKTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFJlZnMgc2hvdWxkIHJhcmVseSBiZSB1c2VkLiBXaGVuIHJlZnMgYXJlIHVzZWQsIHRoZXkgc2hvdWxkIG9ubHkgYmUgZG9uZSB0b1xuICogY29udHJvbCBkYXRhIHRoYXQgaXMgbm90IGhhbmRsZWQgYnkgUmVhY3QncyBkYXRhIGZsb3cuXG4gKlxuICogQGNsYXNzIFJlYWN0T3duZXJcbiAqL1xudmFyIFJlYWN0T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBvd25lci5cbiAgICogQGZpbmFsXG4gICAqL1xuICBpc1ZhbGlkT3duZXI6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gISEob2JqZWN0ICYmIHR5cGVvZiBvYmplY3QuYXR0YWNoUmVmID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmplY3QuZGV0YWNoUmVmID09PSAnZnVuY3Rpb24nKTtcbiAgfSxcblxuICAvKipcbiAgICogQWRkcyBhIGNvbXBvbmVudCBieSByZWYgdG8gYW4gb3duZXIgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjb21wb25lbnQgQ29tcG9uZW50IHRvIHJlZmVyZW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBOYW1lIGJ5IHdoaWNoIHRvIHJlZmVyIHRvIHRoZSBjb21wb25lbnQuXG4gICAqIEBwYXJhbSB7UmVhY3RPd25lcn0gb3duZXIgQ29tcG9uZW50IG9uIHdoaWNoIHRvIHJlY29yZCB0aGUgcmVmLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICBhZGRDb21wb25lbnRBc1JlZlRvOiBmdW5jdGlvbiAoY29tcG9uZW50LCByZWYsIG93bmVyKSB7XG4gICAgIVJlYWN0T3duZXIuaXNWYWxpZE93bmVyKG93bmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdhZGRDb21wb25lbnRBc1JlZlRvKC4uLik6IE9ubHkgYSBSZWFjdE93bmVyIGNhbiBoYXZlIHJlZnMuIFlvdSBtaWdodCAnICsgJ2JlIGFkZGluZyBhIHJlZiB0byBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgY3JlYXRlZCBpbnNpZGUgYSBjb21wb25lbnRcXCdzICcgKyAnYHJlbmRlcmAgbWV0aG9kLCBvciB5b3UgaGF2ZSBtdWx0aXBsZSBjb3BpZXMgb2YgUmVhY3QgbG9hZGVkICcgKyAnKGRldGFpbHM6IGh0dHBzOi8vZmIubWUvcmVhY3QtcmVmcy1tdXN0LWhhdmUtb3duZXIpLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBvd25lci5hdHRhY2hSZWYocmVmLCBjb21wb25lbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY29tcG9uZW50IGJ5IHJlZiBmcm9tIGFuIG93bmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byBkZXJlZmVyZW5jZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBOYW1lIG9mIHRoZSByZWYgdG8gcmVtb3ZlLlxuICAgKiBAcGFyYW0ge1JlYWN0T3duZXJ9IG93bmVyIENvbXBvbmVudCBvbiB3aGljaCB0aGUgcmVmIGlzIHJlY29yZGVkLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICByZW1vdmVDb21wb25lbnRBc1JlZkZyb206IGZ1bmN0aW9uIChjb21wb25lbnQsIHJlZiwgb3duZXIpIHtcbiAgICAhUmVhY3RPd25lci5pc1ZhbGlkT3duZXIob3duZXIpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3JlbW92ZUNvbXBvbmVudEFzUmVmRnJvbSguLi4pOiBPbmx5IGEgUmVhY3RPd25lciBjYW4gaGF2ZSByZWZzLiBZb3UgbWlnaHQgJyArICdiZSByZW1vdmluZyBhIHJlZiB0byBhIGNvbXBvbmVudCB0aGF0IHdhcyBub3QgY3JlYXRlZCBpbnNpZGUgYSBjb21wb25lbnRcXCdzICcgKyAnYHJlbmRlcmAgbWV0aG9kLCBvciB5b3UgaGF2ZSBtdWx0aXBsZSBjb3BpZXMgb2YgUmVhY3QgbG9hZGVkICcgKyAnKGRldGFpbHM6IGh0dHBzOi8vZmIubWUvcmVhY3QtcmVmcy1tdXN0LWhhdmUtb3duZXIpLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgb3duZXJQdWJsaWNJbnN0YW5jZSA9IG93bmVyLmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgLy8gQ2hlY2sgdGhhdCBgY29tcG9uZW50YCdzIG93bmVyIGlzIHN0aWxsIGFsaXZlIGFuZCB0aGF0IGBjb21wb25lbnRgIGlzIHN0aWxsIHRoZSBjdXJyZW50IHJlZlxuICAgIC8vIGJlY2F1c2Ugd2UgZG8gbm90IHdhbnQgdG8gZGV0YWNoIHRoZSByZWYgaWYgYW5vdGhlciBjb21wb25lbnQgc3RvbGUgaXQuXG4gICAgaWYgKG93bmVyUHVibGljSW5zdGFuY2UgJiYgb3duZXJQdWJsaWNJbnN0YW5jZS5yZWZzW3JlZl0gPT09IGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKSB7XG4gICAgICBvd25lci5kZXRhY2hSZWYocmVmKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE93bmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE93bmVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBUcmFuc2FjdGlvblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIGBUcmFuc2FjdGlvbmAgY3JlYXRlcyBhIGJsYWNrIGJveCB0aGF0IGlzIGFibGUgdG8gd3JhcCBhbnkgbWV0aG9kIHN1Y2ggdGhhdFxuICogY2VydGFpbiBpbnZhcmlhbnRzIGFyZSBtYWludGFpbmVkIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIG1ldGhvZCBpcyBpbnZva2VkXG4gKiAoRXZlbiBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIHdoaWxlIGludm9raW5nIHRoZSB3cmFwcGVkIG1ldGhvZCkuIFdob2V2ZXJcbiAqIGluc3RhbnRpYXRlcyBhIHRyYW5zYWN0aW9uIGNhbiBwcm92aWRlIGVuZm9yY2VycyBvZiB0aGUgaW52YXJpYW50cyBhdFxuICogY3JlYXRpb24gdGltZS4gVGhlIGBUcmFuc2FjdGlvbmAgY2xhc3MgaXRzZWxmIHdpbGwgc3VwcGx5IG9uZSBhZGRpdGlvbmFsXG4gKiBhdXRvbWF0aWMgaW52YXJpYW50IGZvciB5b3UgLSB0aGUgaW52YXJpYW50IHRoYXQgYW55IHRyYW5zYWN0aW9uIGluc3RhbmNlXG4gKiBzaG91bGQgbm90IGJlIHJ1biB3aGlsZSBpdCBpcyBhbHJlYWR5IGJlaW5nIHJ1bi4gWW91IHdvdWxkIHR5cGljYWxseSBjcmVhdGUgYVxuICogc2luZ2xlIGluc3RhbmNlIG9mIGEgYFRyYW5zYWN0aW9uYCBmb3IgcmV1c2UgbXVsdGlwbGUgdGltZXMsIHRoYXQgcG90ZW50aWFsbHlcbiAqIGlzIHVzZWQgdG8gd3JhcCBzZXZlcmFsIGRpZmZlcmVudCBtZXRob2RzLiBXcmFwcGVycyBhcmUgZXh0cmVtZWx5IHNpbXBsZSAtXG4gKiB0aGV5IG9ubHkgcmVxdWlyZSBpbXBsZW1lbnRpbmcgdHdvIG1ldGhvZHMuXG4gKlxuICogPHByZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVycyAoaW5qZWN0ZWQgYXQgY3JlYXRpb24gdGltZSlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICAgICAgICArXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLXwtLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICB2ICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgICAgICstLS0tLS0tLS0tLS0tLS0rICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICArLS18ICAgIHdyYXBwZXIxICAgfC0tLXwtLS0tKyAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgKy0tLS0tLS0tLS0tLS0tLSsgICB2ICAgIHwgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgICAgICAgKy0tLS0tLS0tLS0tLS0rICB8ICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICAgICArLS0tLXwgICB3cmFwcGVyMiAgfC0tLS0tLS0tKyAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgfCAgICArLS0tLS0tLS0tLS0tLSsgIHwgICAgIHwgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgIHwgICAgICAgICAgICAgICAgICAgICB8ICAgICB8ICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB2ICAgICB2ICAgICAgICAgICAgICAgICAgICAgdiAgICAgdiAgIHwgd3JhcHBlclxuICogICAgICAgICAgICAgICAgICAgIHwgKy0tLSsgKy0tLSsgICArLS0tLS0tLS0tKyAgICstLS0rICstLS0rIHwgaW52YXJpYW50c1xuICogcGVyZm9ybShhbnlNZXRob2QpIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHwgbWFpbnRhaW5lZFxuICogKy0tLS0tLS0tLS0tLS0tLS0tPnwtfC0tLXwtfC0tLXwtLT58YW55TWV0aG9kfC0tLXwtLS18LXwtLS18LXwtLS0tLS0tLT5cbiAqICAgICAgICAgICAgICAgICAgICB8IHwgICB8IHwgICB8ICAgfCAgICAgICAgIHwgICB8ICAgfCB8ICAgfCB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfFxuICogICAgICAgICAgICAgICAgICAgIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICstLS0rICstLS0rICAgKy0tLS0tLS0tLSsgICArLS0tKyArLS0tKyB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgaW5pdGlhbGl6ZSAgICAgICAgICAgICAgICAgICAgY2xvc2UgICAgfFxuICogICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAqIDwvcHJlPlxuICpcbiAqIFVzZSBjYXNlczpcbiAqIC0gUHJlc2VydmluZyB0aGUgaW5wdXQgc2VsZWN0aW9uIHJhbmdlcyBiZWZvcmUvYWZ0ZXIgcmVjb25jaWxpYXRpb24uXG4gKiAgIFJlc3RvcmluZyBzZWxlY3Rpb24gZXZlbiBpbiB0aGUgZXZlbnQgb2YgYW4gdW5leHBlY3RlZCBlcnJvci5cbiAqIC0gRGVhY3RpdmF0aW5nIGV2ZW50cyB3aGlsZSByZWFycmFuZ2luZyB0aGUgRE9NLCBwcmV2ZW50aW5nIGJsdXJzL2ZvY3VzZXMsXG4gKiAgIHdoaWxlIGd1YXJhbnRlZWluZyB0aGF0IGFmdGVyd2FyZHMsIHRoZSBldmVudCBzeXN0ZW0gaXMgcmVhY3RpdmF0ZWQuXG4gKiAtIEZsdXNoaW5nIGEgcXVldWUgb2YgY29sbGVjdGVkIERPTSBtdXRhdGlvbnMgdG8gdGhlIG1haW4gVUkgdGhyZWFkIGFmdGVyIGFcbiAqICAgcmVjb25jaWxpYXRpb24gdGFrZXMgcGxhY2UgaW4gYSB3b3JrZXIgdGhyZWFkLlxuICogLSBJbnZva2luZyBhbnkgY29sbGVjdGVkIGBjb21wb25lbnREaWRVcGRhdGVgIGNhbGxiYWNrcyBhZnRlciByZW5kZXJpbmcgbmV3XG4gKiAgIGNvbnRlbnQuXG4gKiAtIChGdXR1cmUgdXNlIGNhc2UpOiBXcmFwcGluZyBwYXJ0aWN1bGFyIGZsdXNoZXMgb2YgdGhlIGBSZWFjdFdvcmtlcmAgcXVldWVcbiAqICAgdG8gcHJlc2VydmUgdGhlIGBzY3JvbGxUb3BgIChhbiBhdXRvbWF0aWMgc2Nyb2xsIGF3YXJlIERPTSkuXG4gKiAtIChGdXR1cmUgdXNlIGNhc2UpOiBMYXlvdXQgY2FsY3VsYXRpb25zIGJlZm9yZSBhbmQgYWZ0ZXIgRE9NIHVwZGF0ZXMuXG4gKlxuICogVHJhbnNhY3Rpb25hbCBwbHVnaW4gQVBJOlxuICogLSBBIG1vZHVsZSB0aGF0IGhhcyBhbiBgaW5pdGlhbGl6ZWAgbWV0aG9kIHRoYXQgcmV0dXJucyBhbnkgcHJlY29tcHV0YXRpb24uXG4gKiAtIGFuZCBhIGBjbG9zZWAgbWV0aG9kIHRoYXQgYWNjZXB0cyB0aGUgcHJlY29tcHV0YXRpb24uIGBjbG9zZWAgaXMgaW52b2tlZFxuICogICB3aGVuIHRoZSB3cmFwcGVkIHByb2Nlc3MgaXMgY29tcGxldGVkLCBvciBoYXMgZmFpbGVkLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8VHJhbnNhY3Rpb25hbFdyYXBwZXI+fSB0cmFuc2FjdGlvbldyYXBwZXIgV3JhcHBlciBtb2R1bGVzXG4gKiB0aGF0IGltcGxlbWVudCBgaW5pdGlhbGl6ZWAgYW5kIGBjbG9zZWAuXG4gKiBAcmV0dXJuIHtUcmFuc2FjdGlvbn0gU2luZ2xlIHRyYW5zYWN0aW9uIGZvciByZXVzZSBpbiB0aHJlYWQuXG4gKlxuICogQGNsYXNzIFRyYW5zYWN0aW9uXG4gKi9cbnZhciBNaXhpbiA9IHtcbiAgLyoqXG4gICAqIFNldHMgdXAgdGhpcyBpbnN0YW5jZSBzbyB0aGF0IGl0IGlzIHByZXBhcmVkIGZvciBjb2xsZWN0aW5nIG1ldHJpY3MuIERvZXNcbiAgICogc28gc3VjaCB0aGF0IHRoaXMgc2V0dXAgbWV0aG9kIG1heSBiZSB1c2VkIG9uIGFuIGluc3RhbmNlIHRoYXQgaXMgYWxyZWFkeVxuICAgKiBpbml0aWFsaXplZCwgaW4gYSB3YXkgdGhhdCBkb2VzIG5vdCBjb25zdW1lIGFkZGl0aW9uYWwgbWVtb3J5IHVwb24gcmV1c2UuXG4gICAqIFRoYXQgY2FuIGJlIHVzZWZ1bCBpZiB5b3UgZGVjaWRlIHRvIG1ha2UgeW91ciBzdWJjbGFzcyBvZiB0aGlzIG1peGluIGFcbiAgICogXCJQb29sZWRDbGFzc1wiLlxuICAgKi9cbiAgcmVpbml0aWFsaXplVHJhbnNhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnMgPSB0aGlzLmdldFRyYW5zYWN0aW9uV3JhcHBlcnMoKTtcbiAgICBpZiAodGhpcy53cmFwcGVySW5pdERhdGEpIHtcbiAgICAgIHRoaXMud3JhcHBlckluaXREYXRhLmxlbmd0aCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud3JhcHBlckluaXREYXRhID0gW107XG4gICAgfVxuICAgIHRoaXMuX2lzSW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICB9LFxuXG4gIF9pc0luVHJhbnNhY3Rpb246IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHJldHVybiB7QXJyYXk8VHJhbnNhY3Rpb25XcmFwcGVyPn0gQXJyYXkgb2YgdHJhbnNhY3Rpb24gd3JhcHBlcnMuXG4gICAqL1xuICBnZXRUcmFuc2FjdGlvbldyYXBwZXJzOiBudWxsLFxuXG4gIGlzSW5UcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXRoaXMuX2lzSW5UcmFuc2FjdGlvbjtcbiAgfSxcblxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGZ1bmN0aW9uIHdpdGhpbiBhIHNhZmV0eSB3aW5kb3cuIFVzZSB0aGlzIGZvciB0aGUgdG9wIGxldmVsXG4gICAqIG1ldGhvZHMgdGhhdCByZXN1bHQgaW4gbGFyZ2UgYW1vdW50cyBvZiBjb21wdXRhdGlvbi9tdXRhdGlvbnMgdGhhdCB3b3VsZFxuICAgKiBuZWVkIHRvIGJlIHNhZmV0eSBjaGVja2VkLiBUaGUgb3B0aW9uYWwgYXJndW1lbnRzIGhlbHBzIHByZXZlbnQgdGhlIG5lZWRcbiAgICogdG8gYmluZCBpbiBtYW55IGNhc2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWVtYmVyIG9mIHNjb3BlIHRvIGNhbGwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZSBTY29wZSB0byBpbnZva2UgZnJvbS5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gYSBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGIgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBjIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gZCBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGUgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBmIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICpcbiAgICogQHJldHVybiB7Kn0gUmV0dXJuIHZhbHVlIGZyb20gYG1ldGhvZGAuXG4gICAqL1xuICBwZXJmb3JtOiBmdW5jdGlvbiAobWV0aG9kLCBzY29wZSwgYSwgYiwgYywgZCwgZSwgZikge1xuICAgICEhdGhpcy5pc0luVHJhbnNhY3Rpb24oKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcmFuc2FjdGlvbi5wZXJmb3JtKC4uLik6IENhbm5vdCBpbml0aWFsaXplIGEgdHJhbnNhY3Rpb24gd2hlbiB0aGVyZSAnICsgJ2lzIGFscmVhZHkgYW4gb3V0c3RhbmRpbmcgdHJhbnNhY3Rpb24uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBlcnJvclRocm93bjtcbiAgICB2YXIgcmV0O1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9pc0luVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgLy8gQ2F0Y2hpbmcgZXJyb3JzIG1ha2VzIGRlYnVnZ2luZyBtb3JlIGRpZmZpY3VsdCwgc28gd2Ugc3RhcnQgd2l0aFxuICAgICAgLy8gZXJyb3JUaHJvd24gc2V0IHRvIHRydWUgYmVmb3JlIHNldHRpbmcgaXQgdG8gZmFsc2UgYWZ0ZXIgY2FsbGluZ1xuICAgICAgLy8gY2xvc2UgLS0gaWYgaXQncyBzdGlsbCBzZXQgdG8gdHJ1ZSBpbiB0aGUgZmluYWxseSBibG9jaywgaXQgbWVhbnNcbiAgICAgIC8vIG9uZSBvZiB0aGVzZSBjYWxscyB0aHJldy5cbiAgICAgIGVycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUFsbCgwKTtcbiAgICAgIHJldCA9IG1ldGhvZC5jYWxsKHNjb3BlLCBhLCBiLCBjLCBkLCBlLCBmKTtcbiAgICAgIGVycm9yVGhyb3duID0gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgIC8vIElmIGBtZXRob2RgIHRocm93cywgcHJlZmVyIHRvIHNob3cgdGhhdCBzdGFjayB0cmFjZSBvdmVyIGFueSB0aHJvd25cbiAgICAgICAgICAvLyBieSBpbnZva2luZyBgY2xvc2VBbGxgLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWxsKDApO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTaW5jZSBgbWV0aG9kYCBkaWRuJ3QgdGhyb3csIHdlIGRvbid0IHdhbnQgdG8gc2lsZW5jZSB0aGUgZXhjZXB0aW9uXG4gICAgICAgICAgLy8gaGVyZS5cbiAgICAgICAgICB0aGlzLmNsb3NlQWxsKDApO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLl9pc0luVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBpbml0aWFsaXplQWxsOiBmdW5jdGlvbiAoc3RhcnRJbmRleCkge1xuICAgIHZhciB0cmFuc2FjdGlvbldyYXBwZXJzID0gdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDwgdHJhbnNhY3Rpb25XcmFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0cmFuc2FjdGlvbldyYXBwZXJzW2ldO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2F0Y2hpbmcgZXJyb3JzIG1ha2VzIGRlYnVnZ2luZyBtb3JlIGRpZmZpY3VsdCwgc28gd2Ugc3RhcnQgd2l0aCB0aGVcbiAgICAgICAgLy8gT0JTRVJWRURfRVJST1Igc3RhdGUgYmVmb3JlIG92ZXJ3cml0aW5nIGl0IHdpdGggdGhlIHJlYWwgcmV0dXJuIHZhbHVlXG4gICAgICAgIC8vIG9mIGluaXRpYWxpemUgLS0gaWYgaXQncyBzdGlsbCBzZXQgdG8gT0JTRVJWRURfRVJST1IgaW4gdGhlIGZpbmFsbHlcbiAgICAgICAgLy8gYmxvY2ssIGl0IG1lYW5zIHdyYXBwZXIuaW5pdGlhbGl6ZSB0aHJldy5cbiAgICAgICAgdGhpcy53cmFwcGVySW5pdERhdGFbaV0gPSBUcmFuc2FjdGlvbi5PQlNFUlZFRF9FUlJPUjtcbiAgICAgICAgdGhpcy53cmFwcGVySW5pdERhdGFbaV0gPSB3cmFwcGVyLmluaXRpYWxpemUgPyB3cmFwcGVyLmluaXRpYWxpemUuY2FsbCh0aGlzKSA6IG51bGw7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAodGhpcy53cmFwcGVySW5pdERhdGFbaV0gPT09IFRyYW5zYWN0aW9uLk9CU0VSVkVEX0VSUk9SKSB7XG4gICAgICAgICAgLy8gVGhlIGluaXRpYWxpemVyIGZvciB3cmFwcGVyIGkgdGhyZXcgYW4gZXJyb3I7IGluaXRpYWxpemUgdGhlXG4gICAgICAgICAgLy8gcmVtYWluaW5nIHdyYXBwZXJzIGJ1dCBzaWxlbmNlIGFueSBleGNlcHRpb25zIGZyb20gdGhlbSB0byBlbnN1cmVcbiAgICAgICAgICAvLyB0aGF0IHRoZSBmaXJzdCBlcnJvciBpcyB0aGUgb25lIHRvIGJ1YmJsZSB1cC5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplQWxsKGkgKyAxKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEludm9rZXMgZWFjaCBvZiBgdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzLmNsb3NlW2ldYCBmdW5jdGlvbnMsIHBhc3NpbmcgaW50b1xuICAgKiB0aGVtIHRoZSByZXNwZWN0aXZlIHJldHVybiB2YWx1ZXMgb2YgYHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycy5pbml0W2ldYFxuICAgKiAoYGNsb3NlYHJzIHRoYXQgY29ycmVzcG9uZCB0byBpbml0aWFsaXplcnMgdGhhdCBmYWlsZWQgd2lsbCBub3QgYmVcbiAgICogaW52b2tlZCkuXG4gICAqL1xuICBjbG9zZUFsbDogZnVuY3Rpb24gKHN0YXJ0SW5kZXgpIHtcbiAgICAhdGhpcy5pc0luVHJhbnNhY3Rpb24oKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcmFuc2FjdGlvbi5jbG9zZUFsbCgpOiBDYW5ub3QgY2xvc2UgdHJhbnNhY3Rpb24gd2hlbiBub25lIGFyZSBvcGVuLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgdHJhbnNhY3Rpb25XcmFwcGVycyA9IHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycztcbiAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8IHRyYW5zYWN0aW9uV3JhcHBlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB3cmFwcGVyID0gdHJhbnNhY3Rpb25XcmFwcGVyc1tpXTtcbiAgICAgIHZhciBpbml0RGF0YSA9IHRoaXMud3JhcHBlckluaXREYXRhW2ldO1xuICAgICAgdmFyIGVycm9yVGhyb3duO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2F0Y2hpbmcgZXJyb3JzIG1ha2VzIGRlYnVnZ2luZyBtb3JlIGRpZmZpY3VsdCwgc28gd2Ugc3RhcnQgd2l0aFxuICAgICAgICAvLyBlcnJvclRocm93biBzZXQgdG8gdHJ1ZSBiZWZvcmUgc2V0dGluZyBpdCB0byBmYWxzZSBhZnRlciBjYWxsaW5nXG4gICAgICAgIC8vIGNsb3NlIC0tIGlmIGl0J3Mgc3RpbGwgc2V0IHRvIHRydWUgaW4gdGhlIGZpbmFsbHkgYmxvY2ssIGl0IG1lYW5zXG4gICAgICAgIC8vIHdyYXBwZXIuY2xvc2UgdGhyZXcuXG4gICAgICAgIGVycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluaXREYXRhICE9PSBUcmFuc2FjdGlvbi5PQlNFUlZFRF9FUlJPUiAmJiB3cmFwcGVyLmNsb3NlKSB7XG4gICAgICAgICAgd3JhcHBlci5jbG9zZS5jYWxsKHRoaXMsIGluaXREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvclRocm93biA9IGZhbHNlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgLy8gVGhlIGNsb3NlciBmb3Igd3JhcHBlciBpIHRocmV3IGFuIGVycm9yOyBjbG9zZSB0aGUgcmVtYWluaW5nXG4gICAgICAgICAgLy8gd3JhcHBlcnMgYnV0IHNpbGVuY2UgYW55IGV4Y2VwdGlvbnMgZnJvbSB0aGVtIHRvIGVuc3VyZSB0aGF0IHRoZVxuICAgICAgICAgIC8vIGZpcnN0IGVycm9yIGlzIHRoZSBvbmUgdG8gYnViYmxlIHVwLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWxsKGkgKyAxKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMud3JhcHBlckluaXREYXRhLmxlbmd0aCA9IDA7XG4gIH1cbn07XG5cbnZhciBUcmFuc2FjdGlvbiA9IHtcblxuICBNaXhpbjogTWl4aW4sXG5cbiAgLyoqXG4gICAqIFRva2VuIHRvIGxvb2sgZm9yIHRvIGRldGVybWluZSBpZiBhbiBlcnJvciBvY2N1cnJlZC5cbiAgICovXG4gIE9CU0VSVkVEX0VSUk9SOiB7fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zYWN0aW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9UcmFuc2FjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKTtcbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0TmF0aXZlQ29tcG9uZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vLyBUbyBhdm9pZCBhIGN5Y2xpYyBkZXBlbmRlbmN5LCB3ZSBjcmVhdGUgdGhlIGZpbmFsIGNsYXNzIGluIHRoaXMgbW9kdWxlXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdGhpcy5jb25zdHJ1Y3QoZWxlbWVudCk7XG59O1xuX2Fzc2lnbihSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFdyYXBwZXIucHJvdG90eXBlLCBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5NaXhpbiwge1xuICBfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDogaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudFxufSk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShvd25lcikge1xuICBpZiAob3duZXIpIHtcbiAgICB2YXIgbmFtZSA9IG93bmVyLmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSB0eXBlIHJlZmVyZW5jZSBpcyBhIGtub3duIGludGVybmFsIHR5cGUuIEkuZS4gbm90IGEgdXNlclxuICogcHJvdmlkZWQgY29tcG9zaXRlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoaXMgaXMgYSB2YWxpZCBpbnRlcm5hbCB0eXBlLlxuICovXG5mdW5jdGlvbiBpc0ludGVybmFsQ29tcG9uZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0eXBlLnByb3RvdHlwZS5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUucmVjZWl2ZUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBHaXZlbiBhIFJlYWN0Tm9kZSwgY3JlYXRlIGFuIGluc3RhbmNlIHRoYXQgd2lsbCBhY3R1YWxseSBiZSBtb3VudGVkLlxuICpcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtvYmplY3R9IEEgbmV3IGluc3RhbmNlIG9mIHRoZSBlbGVtZW50J3MgY29uc3RydWN0b3IuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmZ1bmN0aW9uIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobm9kZSkge1xuICB2YXIgaW5zdGFuY2U7XG5cbiAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHtcbiAgICBpbnN0YW5jZSA9IFJlYWN0RW1wdHlDb21wb25lbnQuY3JlYXRlKGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZTtcbiAgICAhKGVsZW1lbnQgJiYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFbGVtZW50IHR5cGUgaXMgaW52YWxpZDogZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciBidWlsdC1pbiBjb21wb25lbnRzKSAnICsgJ29yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCBlbGVtZW50LnR5cGUgPT0gbnVsbCA/IGVsZW1lbnQudHlwZSA6IHR5cGVvZiBlbGVtZW50LnR5cGUsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShlbGVtZW50Ll9vd25lcikpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBzdHJpbmcgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbnN0YW5jZSA9IFJlYWN0TmF0aXZlQ29tcG9uZW50LmNyZWF0ZUludGVybmFsQ29tcG9uZW50KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNJbnRlcm5hbENvbXBvbmVudFR5cGUoZWxlbWVudC50eXBlKSkge1xuICAgICAgLy8gVGhpcyBpcyB0ZW1wb3JhcmlseSBhdmFpbGFibGUgZm9yIGN1c3RvbSBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCBzdHJpbmdcbiAgICAgIC8vIHJlcHJlc2VudGF0aW9ucy4gSS5lLiBBUlQuIE9uY2UgdGhvc2UgYXJlIHVwZGF0ZWQgdG8gdXNlIHRoZSBzdHJpbmdcbiAgICAgIC8vIHJlcHJlc2VudGF0aW9uLCB3ZSBjYW4gZHJvcCB0aGlzIGNvZGUgcGF0aC5cbiAgICAgIGluc3RhbmNlID0gbmV3IGVsZW1lbnQudHlwZShlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UgPSBuZXcgUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyKGVsZW1lbnQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG5vZGUgPT09ICdudW1iZXInKSB7XG4gICAgaW5zdGFuY2UgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZUZvclRleHQobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0VuY291bnRlcmVkIGludmFsaWQgUmVhY3Qgbm9kZSBvZiB0eXBlICVzJywgdHlwZW9mIG5vZGUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3RhbmNlLm1vdW50Q29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS5yZWNlaXZlQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS5nZXROYXRpdmVOb2RlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS51bm1vdW50Q29tcG9uZW50ID09PSAnZnVuY3Rpb24nLCAnT25seSBSZWFjdCBDb21wb25lbnRzIGNhbiBiZSBtb3VudGVkLicpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gVGhlc2UgdHdvIGZpZWxkcyBhcmUgdXNlZCBieSB0aGUgRE9NIGFuZCBBUlQgZGlmZmluZyBhbGdvcml0aG1zXG4gIC8vIHJlc3BlY3RpdmVseS4gSW5zdGVhZCBvZiB1c2luZyBleHBhbmRvcyBvbiBjb21wb25lbnRzLCB3ZSBzaG91bGQgYmVcbiAgLy8gc3RvcmluZyB0aGUgc3RhdGUgbmVlZGVkIGJ5IHRoZSBkaWZmaW5nIGFsZ29yaXRobXMgZWxzZXdoZXJlLlxuICBpbnN0YW5jZS5fbW91bnRJbmRleCA9IDA7XG4gIGluc3RhbmNlLl9tb3VudEltYWdlID0gbnVsbDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGluc3RhbmNlLl9pc093bmVyTmVjZXNzYXJ5ID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyID0gZmFsc2U7XG4gIH1cblxuICAvLyBJbnRlcm5hbCBpbnN0YW5jZXMgc2hvdWxkIGZ1bGx5IGNvbnN0cnVjdGVkIGF0IHRoaXMgcG9pbnQsIHNvIHRoZXkgc2hvdWxkXG4gIC8vIG5vdCBnZXQgYW55IG5ldyBmaWVsZHMgYWRkZWQgdG8gdGhlbSBhdCB0aGlzIHBvaW50LlxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChPYmplY3QucHJldmVudEV4dGVuc2lvbnMpIHtcbiAgICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhpbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0RXJyb3JVdGlscyA9IHJlcXVpcmUoJy4vUmVhY3RFcnJvclV0aWxzJyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xudmFyIFJlYWN0Tm9kZVR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdE5vZGVUeXBlcycpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJy4vUmVhY3RQZXJmJyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9zaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShjb21wb25lbnQpIHtcbiAgdmFyIG93bmVyID0gY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5fb3duZXIgfHwgbnVsbDtcbiAgaWYgKG93bmVyKSB7XG4gICAgdmFyIG5hbWUgPSBvd25lci5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gU3RhdGVsZXNzQ29tcG9uZW50KENvbXBvbmVudCkge31cblN0YXRlbGVzc0NvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICB2YXIgQ29tcG9uZW50ID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQodGhpcykuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gIHZhciBlbGVtZW50ID0gQ29tcG9uZW50KHRoaXMucHJvcHMsIHRoaXMuY29udGV4dCwgdGhpcy51cGRhdGVyKTtcbiAgd2FybklmSW52YWxpZEVsZW1lbnQoQ29tcG9uZW50LCBlbGVtZW50KTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5mdW5jdGlvbiB3YXJuSWZJbnZhbGlkRWxlbWVudChDb21wb25lbnQsIGVsZW1lbnQpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSwgJyVzKC4uLik6IEEgdmFsaWQgUmVhY3QgZWxlbWVudCAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZC4gWW91IG1heSBoYXZlICcgKyAncmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0gVGhlIExpZmUtQ3ljbGUgb2YgYSBDb21wb3NpdGUgQ29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIC0gY29uc3RydWN0b3I6IEluaXRpYWxpemF0aW9uIG9mIHN0YXRlLiBUaGUgaW5zdGFuY2UgaXMgbm93IHJldGFpbmVkLlxuICogICAtIGNvbXBvbmVudFdpbGxNb3VudFxuICogICAtIHJlbmRlclxuICogICAtIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9yc11cbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyXVxuICogICAgIC0gW2NoaWxkcmVuJ3MgY29tcG9uZW50RGlkTW91bnRdXG4gKiAgICAgLSBjb21wb25lbnREaWRNb3VudFxuICpcbiAqICAgICAgIFVwZGF0ZSBQaGFzZXM6XG4gKiAgICAgICAtIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG9ubHkgY2FsbGVkIGlmIHBhcmVudCB1cGRhdGVkKVxuICogICAgICAgLSBzaG91bGRDb21wb25lbnRVcGRhdGVcbiAqICAgICAgICAgLSBjb21wb25lbnRXaWxsVXBkYXRlXG4gKiAgICAgICAgICAgLSByZW5kZXJcbiAqICAgICAgICAgICAtIFtjaGlsZHJlbidzIGNvbnN0cnVjdG9ycyBvciByZWNlaXZlIHByb3BzIHBoYXNlc11cbiAqICAgICAgICAgLSBjb21wb25lbnREaWRVcGRhdGVcbiAqXG4gKiAgICAgLSBjb21wb25lbnRXaWxsVW5tb3VudFxuICogICAgIC0gW2NoaWxkcmVuJ3MgY29tcG9uZW50V2lsbFVubW91bnRdXG4gKiAgIC0gW2NoaWxkcmVuIGRlc3Ryb3llZF1cbiAqIC0gKGRlc3Ryb3llZCk6IFRoZSBpbnN0YW5jZSBpcyBub3cgYmxhbmssIHJlbGVhc2VkIGJ5IFJlYWN0IGFuZCByZWFkeSBmb3IgR0MuXG4gKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIEFuIGluY3JlbWVudGluZyBJRCBhc3NpZ25lZCB0byBlYWNoIGNvbXBvbmVudCB3aGVuIGl0IGlzIG1vdW50ZWQuIFRoaXMgaXNcbiAqIHVzZWQgdG8gZW5mb3JjZSB0aGUgb3JkZXIgaW4gd2hpY2ggYFJlYWN0VXBkYXRlc2AgdXBkYXRlcyBkaXJ0eSBjb21wb25lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBuZXh0TW91bnRJRCA9IDE7XG5cbi8qKlxuICogQGxlbmRzIHtSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5wcm90b3R5cGV9XG4gKi9cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudE1peGluID0ge1xuXG4gIC8qKlxuICAgKiBCYXNlIGNvbnN0cnVjdG9yIGZvciBhbGwgY29tcG9zaXRlIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbnVsbDtcblxuICAgIC8vIFNlZSBSZWFjdFVwZGF0ZVF1ZXVlXG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG5cbiAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbnVsbDtcbiAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5fbW91bnRPcmRlciA9IDA7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcblxuICAgIC8vIFNlZSBSZWFjdFVwZGF0ZXMgYW5kIFJlYWN0VXBkYXRlUXVldWUuXG4gICAgdGhpcy5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHJlbmRlcnMgbWFya3VwLCBhbmQgcmVnaXN0ZXJzIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmF0aXZlUGFyZW50XG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmF0aXZlQ29udGFpbmVySW5mb1xuICAgKiBAcGFyYW0gez9vYmplY3R9IGNvbnRleHRcbiAgICogQHJldHVybiB7P3N0cmluZ30gUmVuZGVyZWQgbWFya3VwIHRvIGJlIGluc2VydGVkIGludG8gdGhlIERPTS5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5fbW91bnRPcmRlciA9IG5leHRNb3VudElEKys7XG4gICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbmF0aXZlUGFyZW50O1xuICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBuYXRpdmVDb250YWluZXJJbmZvO1xuXG4gICAgdmFyIHB1YmxpY1Byb3BzID0gdGhpcy5fcHJvY2Vzc1Byb3BzKHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzKTtcbiAgICB2YXIgcHVibGljQ29udGV4dCA9IHRoaXMuX3Byb2Nlc3NDb250ZXh0KGNvbnRleHQpO1xuXG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBwdWJsaWMgY2xhc3NcbiAgICB2YXIgaW5zdDtcbiAgICB2YXIgcmVuZGVyZWRFbGVtZW50O1xuXG4gICAgaWYgKENvbXBvbmVudC5wcm90b3R5cGUgJiYgQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QgPSBuZXcgQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCBSZWFjdFVwZGF0ZVF1ZXVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5zdCA9IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QgPSBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgfVxuICAgICAgaWYgKGluc3QgPT0gbnVsbCB8fCBpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIHJlbmRlcmVkRWxlbWVudCA9IGluc3Q7XG4gICAgICAgIHdhcm5JZkludmFsaWRFbGVtZW50KENvbXBvbmVudCwgcmVuZGVyZWRFbGVtZW50KTtcbiAgICAgICAgIShpbnN0ID09PSBudWxsIHx8IGluc3QgPT09IGZhbHNlIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChpbnN0KSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMoLi4uKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgJyArICdyZXR1cm5lZCB1bmRlZmluZWQsIGFuIGFycmF5IG9yIHNvbWUgb3RoZXIgaW52YWxpZCBvYmplY3QuJywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIGluc3QgPSBuZXcgU3RhdGVsZXNzQ29tcG9uZW50KENvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBsYXRlciBpbiBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50LCBidXQgYWRkIGFuIGVhcmx5XG4gICAgICAvLyB3YXJuaW5nIG5vdyB0byBoZWxwIGRlYnVnZ2luZ1xuICAgICAgaWYgKGluc3QucmVuZGVyID09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBObyBgcmVuZGVyYCBtZXRob2QgZm91bmQgb24gdGhlIHJldHVybmVkIGNvbXBvbmVudCAnICsgJ2luc3RhbmNlOiB5b3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIGRlZmluZSBgcmVuZGVyYC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgcHJvcHNNdXRhdGVkID0gaW5zdC5wcm9wcyAhPT0gcHVibGljUHJvcHM7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaW5zdC5wcm9wcyA9PT0gdW5kZWZpbmVkIHx8ICFwcm9wc011dGF0ZWQsICclcyguLi4pOiBXaGVuIGNhbGxpbmcgc3VwZXIoKSBpbiBgJXNgLCBtYWtlIHN1cmUgdG8gcGFzcyAnICsgJ3VwIHRoZSBzYW1lIHByb3BzIHRoYXQgeW91ciBjb21wb25lbnRcXCdzIGNvbnN0cnVjdG9yIHdhcyBwYXNzZWQuJywgY29tcG9uZW50TmFtZSwgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gVGhlc2Ugc2hvdWxkIGJlIHNldCB1cCBpbiB0aGUgY29uc3RydWN0b3IsIGJ1dCBhcyBhIGNvbnZlbmllbmNlIGZvclxuICAgIC8vIHNpbXBsZXIgY2xhc3MgYWJzdHJhY3Rpb25zLCB3ZSBzZXQgdGhlbSB1cCBhZnRlciB0aGUgZmFjdC5cbiAgICBpbnN0LnByb3BzID0gcHVibGljUHJvcHM7XG4gICAgaW5zdC5jb250ZXh0ID0gcHVibGljQ29udGV4dDtcbiAgICBpbnN0LnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICBpbnN0LnVwZGF0ZXIgPSBSZWFjdFVwZGF0ZVF1ZXVlO1xuXG4gICAgdGhpcy5faW5zdGFuY2UgPSBpbnN0O1xuXG4gICAgLy8gU3RvcmUgYSByZWZlcmVuY2UgZnJvbSB0aGUgaW5zdGFuY2UgYmFjayB0byB0aGUgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAgICBSZWFjdEluc3RhbmNlTWFwLnNldChpbnN0LCB0aGlzKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBTaW5jZSBwbGFpbiBKUyBjbGFzc2VzIGFyZSBkZWZpbmVkIHdpdGhvdXQgYW55IHNwZWNpYWwgaW5pdGlhbGl6YXRpb25cbiAgICAgIC8vIGxvZ2ljLCB3ZSBjYW4gbm90IGNhdGNoIGNvbW1vbiBlcnJvcnMgZWFybHkuIFRoZXJlZm9yZSwgd2UgaGF2ZSB0b1xuICAgICAgLy8gY2F0Y2ggdGhlbSBoZXJlLCBhdCBpbml0aWFsaXphdGlvbiB0aW1lLCBpbnN0ZWFkLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QuZ2V0SW5pdGlhbFN0YXRlIHx8IGluc3QuZ2V0SW5pdGlhbFN0YXRlLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0SW5pdGlhbFN0YXRlIHdhcyBkZWZpbmVkIG9uICVzLCBhIHBsYWluIEphdmFTY3JpcHQgY2xhc3MuICcgKyAnVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgY2xhc3NlcyBjcmVhdGVkIHVzaW5nIFJlYWN0LmNyZWF0ZUNsYXNzLiAnICsgJ0RpZCB5b3UgbWVhbiB0byBkZWZpbmUgYSBzdGF0ZSBwcm9wZXJ0eSBpbnN0ZWFkPycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QuZ2V0RGVmYXVsdFByb3BzIHx8IGluc3QuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIHdhcyBkZWZpbmVkIG9uICVzLCBhIHBsYWluIEphdmFTY3JpcHQgY2xhc3MuICcgKyAnVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBmb3IgY2xhc3NlcyBjcmVhdGVkIHVzaW5nIFJlYWN0LmNyZWF0ZUNsYXNzLiAnICsgJ1VzZSBhIHN0YXRpYyBwcm9wZXJ0eSB0byBkZWZpbmUgZGVmYXVsdFByb3BzIGluc3RlYWQuJywgdGhpcy5nZXROYW1lKCkgfHwgJ2EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaW5zdC5wcm9wVHlwZXMsICdwcm9wVHlwZXMgd2FzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgb24gJXMuIFVzZSBhIHN0YXRpYyAnICsgJ3Byb3BlcnR5IHRvIGRlZmluZSBwcm9wVHlwZXMgaW5zdGVhZC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmNvbnRleHRUeXBlcywgJ2NvbnRleHRUeXBlcyB3YXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBvbiAlcy4gVXNlIGEgJyArICdzdGF0aWMgcHJvcGVydHkgdG8gZGVmaW5lIGNvbnRleHRUeXBlcyBpbnN0ZWFkLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3QuY29tcG9uZW50U2hvdWxkVXBkYXRlICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgdGhpcy5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdC5jb21wb25lbnREaWRVbm1vdW50ICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudERpZFVubW91bnQoKS4gQnV0IHRoZXJlIGlzIG5vIHN1Y2ggbGlmZWN5Y2xlIG1ldGhvZC4gJyArICdEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFVubW91bnQoKT8nLCB0aGlzLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0LmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMgIT09ICdmdW5jdGlvbicsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHRoaXMuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsU3RhdGUgPSBpbnN0LnN0YXRlO1xuICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5zdC5zdGF0ZSA9IGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgfVxuICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuc3RhdGU6IG11c3QgYmUgc2V0IHRvIGFuIG9iamVjdCBvciBudWxsJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcblxuICAgIHZhciBtYXJrdXA7XG4gICAgaWYgKGluc3QudW5zdGFibGVfaGFuZGxlRXJyb3IpIHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudFdpdGhFcnJvckhhbmRsaW5nKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudChyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGlmIChpbnN0LmNvbXBvbmVudERpZE1vdW50KSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkTW91bnQsIGluc3QpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgcGVyZm9ybUluaXRpYWxNb3VudFdpdGhFcnJvckhhbmRsaW5nOiBmdW5jdGlvbiAocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIG1hcmt1cDtcbiAgICB2YXIgY2hlY2twb2ludCA9IHRyYW5zYWN0aW9uLmNoZWNrcG9pbnQoKTtcbiAgICB0cnkge1xuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gUm9sbCBiYWNrIHRvIGNoZWNrcG9pbnQsIGhhbmRsZSBlcnJvciAod2hpY2ggbWF5IGFkZCBpdGVtcyB0byB0aGUgdHJhbnNhY3Rpb24pLCBhbmQgdGFrZSBhIG5ldyBjaGVja3BvaW50XG4gICAgICB0cmFuc2FjdGlvbi5yb2xsYmFjayhjaGVja3BvaW50KTtcbiAgICAgIHRoaXMuX2luc3RhbmNlLnVuc3RhYmxlX2hhbmRsZUVycm9yKGUpO1xuICAgICAgaWYgKHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlKSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlLnN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZSh0aGlzLl9pbnN0YW5jZS5wcm9wcywgdGhpcy5faW5zdGFuY2UuY29udGV4dCk7XG4gICAgICB9XG4gICAgICBjaGVja3BvaW50ID0gdHJhbnNhY3Rpb24uY2hlY2twb2ludCgpO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudC51bm1vdW50Q29tcG9uZW50KHRydWUpO1xuICAgICAgdHJhbnNhY3Rpb24ucm9sbGJhY2soY2hlY2twb2ludCk7XG5cbiAgICAgIC8vIFRyeSBhZ2FpbiAtIHdlJ3ZlIGluZm9ybWVkIHRoZSBjb21wb25lbnQgYWJvdXQgdGhlIGVycm9yLCBzbyB0aGV5IGNhbiByZW5kZXIgYW4gZXJyb3IgbWVzc2FnZSB0aGlzIHRpbWUuXG4gICAgICAvLyBJZiB0aGlzIHRocm93cyBhZ2FpbiwgdGhlIGVycm9yIHdpbGwgYnViYmxlIHVwIChhbmQgY2FuIGJlIGNhdWdodCBieSBhIGhpZ2hlciBlcnJvciBib3VuZGFyeSkuXG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSxcblxuICBwZXJmb3JtSW5pdGlhbE1vdW50OiBmdW5jdGlvbiAocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsTW91bnQpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAvLyBXaGVuIG1vdW50aW5nLCBjYWxscyB0byBgc2V0U3RhdGVgIGJ5IGBjb21wb25lbnRXaWxsTW91bnRgIHdpbGwgc2V0XG4gICAgICAvLyBgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWVgIHdpdGhvdXQgdHJpZ2dlcmluZyBhIHJlLXJlbmRlci5cbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSkge1xuICAgICAgICBpbnN0LnN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShpbnN0LnByb3BzLCBpbnN0LmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIG5vdCBhIHN0YXRlbGVzcyBjb21wb25lbnQsIHdlIG5vdyByZW5kZXJcbiAgICBpZiAocmVuZGVyZWRFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbmRlcmVkRWxlbWVudCA9IHRoaXMuX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlcmVkTm9kZVR5cGUgPSBSZWFjdE5vZGVUeXBlcy5nZXRUeXBlKHJlbmRlcmVkRWxlbWVudCk7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KHJlbmRlcmVkRWxlbWVudCk7XG5cbiAgICB2YXIgbWFya3VwID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LCB0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KGNvbnRleHQpKTtcblxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZSh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIGFueSByZXNvdXJjZXMgYWxsb2NhdGVkIGJ5IGBtb3VudENvbXBvbmVudGAuXG4gICAqXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChzYWZlbHkpIHtcbiAgICBpZiAoIXRoaXMuX3JlbmRlcmVkQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudCkge1xuICAgICAgaWYgKHNhZmVseSkge1xuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpICsgJy5jb21wb25lbnRXaWxsVW5tb3VudCgpJztcbiAgICAgICAgUmVhY3RFcnJvclV0aWxzLmludm9rZUd1YXJkZWRDYWxsYmFjayhuYW1lLCBpbnN0LmNvbXBvbmVudFdpbGxVbm1vdW50LmJpbmQoaW5zdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsIHNhZmVseSk7XG4gICAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gbnVsbDtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBwZW5kaW5nIGZpZWxkc1xuICAgIC8vIEV2ZW4gaWYgdGhpcyBjb21wb25lbnQgaXMgc2NoZWR1bGVkIGZvciBhbm90aGVyIHVwZGF0ZSBpbiBSZWFjdFVwZGF0ZXMsXG4gICAgLy8gaXQgd291bGQgc3RpbGwgYmUgaWdub3JlZCBiZWNhdXNlIHRoZXNlIGZpZWxkcyBhcmUgcmVzZXQuXG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICAvLyBUaGVzZSBmaWVsZHMgZG8gbm90IHJlYWxseSBuZWVkIHRvIGJlIHJlc2V0IHNpbmNlIHRoaXMgb2JqZWN0IGlzIG5vXG4gICAgLy8gbG9uZ2VyIGFjY2Vzc2libGUuXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGw7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcblxuICAgIC8vIERlbGV0ZSB0aGUgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIHRvIHRoaXMgaW50ZXJuYWwgcmVwcmVzZW50YXRpb25cbiAgICAvLyB3aGljaCBhbGxvdyB0aGUgaW50ZXJuYWxzIHRvIGJlIHByb3Blcmx5IGNsZWFuZWQgdXAgZXZlbiBpZiB0aGUgdXNlclxuICAgIC8vIGxlYWtzIGEgcmVmZXJlbmNlIHRvIHRoZSBwdWJsaWMgaW5zdGFuY2UuXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5yZW1vdmUoaW5zdCk7XG5cbiAgICAvLyBTb21lIGV4aXN0aW5nIGNvbXBvbmVudHMgcmVseSBvbiBpbnN0LnByb3BzIGV2ZW4gYWZ0ZXIgdGhleSd2ZSBiZWVuXG4gICAgLy8gZGVzdHJveWVkIChpbiBldmVudCBoYW5kbGVycykuXG4gICAgLy8gVE9ETzogaW5zdC5wcm9wcyA9IG51bGw7XG4gICAgLy8gVE9ETzogaW5zdC5zdGF0ZSA9IG51bGw7XG4gICAgLy8gVE9ETzogaW5zdC5jb250ZXh0ID0gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY29udGV4dCBvYmplY3QgdG8gb25seSBjb250YWluIGtleXMgc3BlY2lmaWVkIGluXG4gICAqIGBjb250ZXh0VHlwZXNgXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9vYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbWFza0NvbnRleHQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgdmFyIGNvbnRleHRUeXBlcyA9IENvbXBvbmVudC5jb250ZXh0VHlwZXM7XG4gICAgaWYgKCFjb250ZXh0VHlwZXMpIHtcbiAgICAgIHJldHVybiBlbXB0eU9iamVjdDtcbiAgICB9XG4gICAgdmFyIG1hc2tlZENvbnRleHQgPSB7fTtcbiAgICBmb3IgKHZhciBjb250ZXh0TmFtZSBpbiBjb250ZXh0VHlwZXMpIHtcbiAgICAgIG1hc2tlZENvbnRleHRbY29udGV4dE5hbWVdID0gY29udGV4dFtjb250ZXh0TmFtZV07XG4gICAgfVxuICAgIHJldHVybiBtYXNrZWRDb250ZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIHRoZSBjb250ZXh0IG9iamVjdCB0byBvbmx5IGNvbnRhaW4ga2V5cyBzcGVjaWZpZWQgaW5cbiAgICogYGNvbnRleHRUeXBlc2AsIGFuZCBhc3NlcnRzIHRoYXQgdGhleSBhcmUgdmFsaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9vYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc0NvbnRleHQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgdmFyIG1hc2tlZENvbnRleHQgPSB0aGlzLl9tYXNrQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgICBpZiAoQ29tcG9uZW50LmNvbnRleHRUeXBlcykge1xuICAgICAgICB0aGlzLl9jaGVja1Byb3BUeXBlcyhDb21wb25lbnQuY29udGV4dFR5cGVzLCBtYXNrZWRDb250ZXh0LCBSZWFjdFByb3BUeXBlTG9jYXRpb25zLmNvbnRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IGN1cnJlbnRDb250ZXh0XG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wcm9jZXNzQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoY3VycmVudENvbnRleHQpIHtcbiAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQoKTtcbiAgICB9XG4gICAgdmFyIGNoaWxkQ29udGV4dCA9IGluc3QuZ2V0Q2hpbGRDb250ZXh0ICYmIGluc3QuZ2V0Q2hpbGRDb250ZXh0KCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQoKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkQ29udGV4dCkge1xuICAgICAgISh0eXBlb2YgQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0Q2hpbGRDb250ZXh0KCk6IGNoaWxkQ29udGV4dFR5cGVzIG11c3QgYmUgZGVmaW5lZCBpbiBvcmRlciB0byAnICsgJ3VzZSBnZXRDaGlsZENvbnRleHQoKS4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB0aGlzLl9jaGVja1Byb3BUeXBlcyhDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dCwgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jaGlsZENvbnRleHQpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgbmFtZSBpbiBjaGlsZENvbnRleHQpIHtcbiAgICAgICAgIShuYW1lIGluIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0Q2hpbGRDb250ZXh0KCk6IGtleSBcIiVzXCIgaXMgbm90IGRlZmluZWQgaW4gY2hpbGRDb250ZXh0VHlwZXMuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JywgbmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9hc3NpZ24oe30sIGN1cnJlbnRDb250ZXh0LCBjaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudENvbnRleHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBwcm9wcyBieSBzZXR0aW5nIGRlZmF1bHQgdmFsdWVzIGZvciB1bnNwZWNpZmllZCBwcm9wcyBhbmRcbiAgICogYXNzZXJ0aW5nIHRoYXQgdGhlIHByb3BzIGFyZSB2YWxpZC4gRG9lcyBub3QgbXV0YXRlIGl0cyBhcmd1bWVudDsgcmV0dXJuc1xuICAgKiBhIG5ldyBwcm9wcyBvYmplY3Qgd2l0aCBkZWZhdWx0cyBtZXJnZWQgaW4uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQcm9wc1xuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc1Byb3BzOiBmdW5jdGlvbiAobmV3UHJvcHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgICBpZiAoQ29tcG9uZW50LnByb3BUeXBlcykge1xuICAgICAgICB0aGlzLl9jaGVja1Byb3BUeXBlcyhDb21wb25lbnQucHJvcFR5cGVzLCBuZXdQcm9wcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1Byb3BzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCB0aGUgcHJvcHMgYXJlIHZhbGlkXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wVHlwZXMgTWFwIG9mIHByb3AgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja1Byb3BUeXBlczogZnVuY3Rpb24gKHByb3BUeXBlcywgcHJvcHMsIGxvY2F0aW9uKSB7XG4gICAgLy8gVE9ETzogU3RvcCB2YWxpZGF0aW5nIHByb3AgdHlwZXMgaGVyZSBhbmQgb25seSB1c2UgdGhlIGVsZW1lbnRcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHZhciBjb21wb25lbnROYW1lID0gdGhpcy5nZXROYW1lKCk7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgICBpZiAocHJvcFR5cGVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgICEodHlwZW9mIHByb3BUeXBlc1twcm9wTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5ICcgKyAnZnJvbSBSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgICAgZXJyb3IgPSBwcm9wVHlwZXNbcHJvcE5hbWVdKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24pO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAvLyBXZSBtYXkgd2FudCB0byBleHRlbmQgdGhpcyBsb2dpYyBmb3Igc2ltaWxhciBlcnJvcnMgaW5cbiAgICAgICAgICAvLyB0b3AtbGV2ZWwgcmVuZGVyIGNhbGxzLCBzbyBJJ20gYWJzdHJhY3RpbmcgaXQgYXdheSBpbnRvXG4gICAgICAgICAgLy8gYSBmdW5jdGlvbiB0byBtaW5pbWl6ZSByZWZhY3RvcmluZyBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgdmFyIGFkZGVuZHVtID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKGxvY2F0aW9uID09PSBSZWFjdFByb3BUeXBlTG9jYXRpb25zLnByb3ApIHtcbiAgICAgICAgICAgIC8vIFByZWZhY2UgZ2l2ZXMgdXMgc29tZXRoaW5nIHRvIGJsYWNrbGlzdCBpbiB3YXJuaW5nIG1vZHVsZVxuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAlcyVzJywgZXJyb3IubWVzc2FnZSwgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCBDb250ZXh0IFR5cGVzOiAlcyVzJywgZXJyb3IubWVzc2FnZSwgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBuZXh0Q29udGV4dCkge1xuICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgIHZhciBwcmV2Q29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG5cbiAgICB0aGlzLl9wZW5kaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBwcmV2Q29udGV4dCwgbmV4dENvbnRleHQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJZiBhbnkgb2YgYF9wZW5kaW5nRWxlbWVudGAsIGBfcGVuZGluZ1N0YXRlUXVldWVgLCBvciBgX3BlbmRpbmdGb3JjZVVwZGF0ZWBcbiAgICogaXMgc2V0LCB1cGRhdGUgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeTogZnVuY3Rpb24gKHRyYW5zYWN0aW9uKSB7XG4gICAgaWYgKHRoaXMuX3BlbmRpbmdFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci5yZWNlaXZlQ29tcG9uZW50KHRoaXMsIHRoaXMuX3BlbmRpbmdFbGVtZW50LCB0cmFuc2FjdGlvbiwgdGhpcy5fY29udGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlICE9PSBudWxsIHx8IHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHRoaXMuX2N1cnJlbnRFbGVtZW50LCB0aGlzLl9jdXJyZW50RWxlbWVudCwgdGhpcy5fY29udGV4dCwgdGhpcy5fY29udGV4dCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBQZXJmb3JtIGFuIHVwZGF0ZSB0byBhIG1vdW50ZWQgY29tcG9uZW50LiBUaGUgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyBhbmRcbiAgICogc2hvdWxkQ29tcG9uZW50VXBkYXRlIG1ldGhvZHMgYXJlIGNhbGxlZCwgdGhlbiAoYXNzdW1pbmcgdGhlIHVwZGF0ZSBpc24ndFxuICAgKiBza2lwcGVkKSB0aGUgcmVtYWluaW5nIHVwZGF0ZSBsaWZlY3ljbGUgbWV0aG9kcyBhcmUgY2FsbGVkIGFuZCB0aGUgRE9NXG4gICAqIHJlcHJlc2VudGF0aW9uIGlzIHVwZGF0ZWQuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoaXMgaW1wbGVtZW50cyBSZWFjdCdzIHJlbmRlcmluZyBhbmQgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtLlxuICAgKiBTb3BoaXN0aWNhdGVkIGNsaWVudHMgbWF5IHdpc2ggdG8gb3ZlcnJpZGUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gcHJldlBhcmVudEVsZW1lbnRcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRQYXJlbnRFbGVtZW50XG4gICAqIEBpbnRlcm5hbFxuICAgKiBAb3ZlcnJpZGFibGVcbiAgICovXG4gIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2UGFyZW50RWxlbWVudCwgbmV4dFBhcmVudEVsZW1lbnQsIHByZXZVbm1hc2tlZENvbnRleHQsIG5leHRVbm1hc2tlZENvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIHZhciB3aWxsUmVjZWl2ZSA9IGZhbHNlO1xuICAgIHZhciBuZXh0Q29udGV4dDtcbiAgICB2YXIgbmV4dFByb3BzO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBjb250ZXh0IGhhcyBjaGFuZ2VkIG9yIG5vdFxuICAgIGlmICh0aGlzLl9jb250ZXh0ID09PSBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgICBuZXh0Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dENvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChuZXh0VW5tYXNrZWRDb250ZXh0KTtcbiAgICAgIHdpbGxSZWNlaXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBEaXN0aW5ndWlzaCBiZXR3ZWVuIGEgcHJvcHMgdXBkYXRlIHZlcnN1cyBhIHNpbXBsZSBzdGF0ZSB1cGRhdGVcbiAgICBpZiAocHJldlBhcmVudEVsZW1lbnQgPT09IG5leHRQYXJlbnRFbGVtZW50KSB7XG4gICAgICAvLyBTa2lwIGNoZWNraW5nIHByb3AgdHlwZXMgYWdhaW4gLS0gd2UgZG9uJ3QgcmVhZCBpbnN0LnByb3BzIHRvIGF2b2lkXG4gICAgICAvLyB3YXJuaW5nIGZvciBET00gY29tcG9uZW50IHByb3BzIGluIHRoaXMgdXBncmFkZVxuICAgICAgbmV4dFByb3BzID0gbmV4dFBhcmVudEVsZW1lbnQucHJvcHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRQcm9wcyA9IHRoaXMuX3Byb2Nlc3NQcm9wcyhuZXh0UGFyZW50RWxlbWVudC5wcm9wcyk7XG4gICAgICB3aWxsUmVjZWl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQW4gdXBkYXRlIGhlcmUgd2lsbCBzY2hlZHVsZSBhbiB1cGRhdGUgYnV0IGltbWVkaWF0ZWx5IHNldFxuICAgIC8vIF9wZW5kaW5nU3RhdGVRdWV1ZSB3aGljaCB3aWxsIGVuc3VyZSB0aGF0IGFueSBzdGF0ZSB1cGRhdGVzIGdldHNcbiAgICAvLyBpbW1lZGlhdGVseSByZWNvbmNpbGVkIGluc3RlYWQgb2Ygd2FpdGluZyBmb3IgdGhlIG5leHQgYmF0Y2guXG4gICAgaWYgKHdpbGxSZWNlaXZlICYmIGluc3QuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcykge1xuICAgICAgaW5zdC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpO1xuICAgIH1cblxuICAgIHZhciBuZXh0U3RhdGUgPSB0aGlzLl9wcm9jZXNzUGVuZGluZ1N0YXRlKG5leHRQcm9wcywgbmV4dENvbnRleHQpO1xuXG4gICAgdmFyIHNob3VsZFVwZGF0ZSA9IHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSB8fCAhaW5zdC5zaG91bGRDb21wb25lbnRVcGRhdGUgfHwgaW5zdC5zaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhzaG91bGRVcGRhdGUgIT09IHVuZGVmaW5lZCwgJyVzLnNob3VsZENvbXBvbmVudFVwZGF0ZSgpOiBSZXR1cm5lZCB1bmRlZmluZWQgaW5zdGVhZCBvZiBhICcgKyAnYm9vbGVhbiB2YWx1ZS4gTWFrZSBzdXJlIHRvIHJldHVybiB0cnVlIG9yIGZhbHNlLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuICAgICAgLy8gV2lsbCBzZXQgYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgLlxuICAgICAgdGhpcy5fcGVyZm9ybUNvbXBvbmVudFVwZGF0ZShuZXh0UGFyZW50RWxlbWVudCwgbmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0LCB0cmFuc2FjdGlvbiwgbmV4dFVubWFza2VkQ29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIGl0J3MgZGV0ZXJtaW5lZCB0aGF0IGEgY29tcG9uZW50IHNob3VsZCBub3QgdXBkYXRlLCB3ZSBzdGlsbCB3YW50XG4gICAgICAvLyB0byBzZXQgcHJvcHMgYW5kIHN0YXRlIGJ1dCB3ZSBzaG9ydGN1dCB0aGUgcmVzdCBvZiB0aGUgdXBkYXRlLlxuICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0UGFyZW50RWxlbWVudDtcbiAgICAgIHRoaXMuX2NvbnRleHQgPSBuZXh0VW5tYXNrZWRDb250ZXh0O1xuICAgICAgaW5zdC5wcm9wcyA9IG5leHRQcm9wcztcbiAgICAgIGluc3Quc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgICBpbnN0LmNvbnRleHQgPSBuZXh0Q29udGV4dDtcbiAgICB9XG4gIH0sXG5cbiAgX3Byb2Nlc3NQZW5kaW5nU3RhdGU6IGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgdmFyIHF1ZXVlID0gdGhpcy5fcGVuZGluZ1N0YXRlUXVldWU7XG4gICAgdmFyIHJlcGxhY2UgPSB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlO1xuICAgIHRoaXMuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSBmYWxzZTtcbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICByZXR1cm4gaW5zdC5zdGF0ZTtcbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZSAmJiBxdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBxdWV1ZVswXTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFN0YXRlID0gX2Fzc2lnbih7fSwgcmVwbGFjZSA/IHF1ZXVlWzBdIDogaW5zdC5zdGF0ZSk7XG4gICAgZm9yICh2YXIgaSA9IHJlcGxhY2UgPyAxIDogMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGFydGlhbCA9IHF1ZXVlW2ldO1xuICAgICAgX2Fzc2lnbihuZXh0U3RhdGUsIHR5cGVvZiBwYXJ0aWFsID09PSAnZnVuY3Rpb24nID8gcGFydGlhbC5jYWxsKGluc3QsIG5leHRTdGF0ZSwgcHJvcHMsIGNvbnRleHQpIDogcGFydGlhbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWVyZ2VzIG5ldyBwcm9wcyBhbmQgc3RhdGUsIG5vdGlmaWVzIGRlbGVnYXRlIG1ldGhvZHMgb2YgdXBkYXRlIGFuZFxuICAgKiBwZXJmb3JtcyB1cGRhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0RWxlbWVudCBOZXh0IGVsZW1lbnRcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wcyBOZXh0IHB1YmxpYyBvYmplY3QgdG8gc2V0IGFzIHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlIE5leHQgb2JqZWN0IHRvIHNldCBhcyBzdGF0ZS5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dCBOZXh0IHB1YmxpYyBvYmplY3QgdG8gc2V0IGFzIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHs/b2JqZWN0fSB1bm1hc2tlZENvbnRleHRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wZXJmb3JtQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgdHJhbnNhY3Rpb24sIHVubWFza2VkQ29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG5cbiAgICB2YXIgaGFzQ29tcG9uZW50RGlkVXBkYXRlID0gQm9vbGVhbihpbnN0LmNvbXBvbmVudERpZFVwZGF0ZSk7XG4gICAgdmFyIHByZXZQcm9wcztcbiAgICB2YXIgcHJldlN0YXRlO1xuICAgIHZhciBwcmV2Q29udGV4dDtcbiAgICBpZiAoaGFzQ29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICBwcmV2UHJvcHMgPSBpbnN0LnByb3BzO1xuICAgICAgcHJldlN0YXRlID0gaW5zdC5zdGF0ZTtcbiAgICAgIHByZXZDb250ZXh0ID0gaW5zdC5jb250ZXh0O1xuICAgIH1cblxuICAgIGlmIChpbnN0LmNvbXBvbmVudFdpbGxVcGRhdGUpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpO1xuICAgIH1cblxuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgdGhpcy5fY29udGV4dCA9IHVubWFza2VkQ29udGV4dDtcbiAgICBpbnN0LnByb3BzID0gbmV4dFByb3BzO1xuICAgIGluc3Quc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgaW5zdC5jb250ZXh0ID0gbmV4dENvbnRleHQ7XG5cbiAgICB0aGlzLl91cGRhdGVSZW5kZXJlZENvbXBvbmVudCh0cmFuc2FjdGlvbiwgdW5tYXNrZWRDb250ZXh0KTtcblxuICAgIGlmIChoYXNDb21wb25lbnREaWRVcGRhdGUpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoaW5zdC5jb21wb25lbnREaWRVcGRhdGUuYmluZChpbnN0LCBwcmV2UHJvcHMsIHByZXZTdGF0ZSwgcHJldkNvbnRleHQpLCBpbnN0KTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENhbGwgdGhlIGNvbXBvbmVudCdzIGByZW5kZXJgIG1ldGhvZCBhbmQgdXBkYXRlIHRoZSBET00gYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBfdXBkYXRlUmVuZGVyZWRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBwcmV2Q29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLl9yZW5kZXJlZENvbXBvbmVudDtcbiAgICB2YXIgcHJldlJlbmRlcmVkRWxlbWVudCA9IHByZXZDb21wb25lbnRJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQ7XG4gICAgdmFyIG5leHRSZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldlJlbmRlcmVkRWxlbWVudCwgbmV4dFJlbmRlcmVkRWxlbWVudCkpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci5yZWNlaXZlQ29tcG9uZW50KHByZXZDb21wb25lbnRJbnN0YW5jZSwgbmV4dFJlbmRlcmVkRWxlbWVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQoY29udGV4dCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2xkTmF0aXZlTm9kZSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKHByZXZDb21wb25lbnRJbnN0YW5jZSk7XG4gICAgICBSZWFjdFJlY29uY2lsZXIudW5tb3VudENvbXBvbmVudChwcmV2Q29tcG9uZW50SW5zdGFuY2UsIGZhbHNlKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IFJlYWN0Tm9kZVR5cGVzLmdldFR5cGUobmV4dFJlbmRlcmVkRWxlbWVudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IHRoaXMuX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobmV4dFJlbmRlcmVkRWxlbWVudCk7XG4gICAgICB2YXIgbmV4dE1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudCh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX25hdGl2ZVBhcmVudCwgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbywgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSk7XG4gICAgICB0aGlzLl9yZXBsYWNlTm9kZVdpdGhNYXJrdXAob2xkTmF0aXZlTm9kZSwgbmV4dE1hcmt1cCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBPdmVycmlkZGVuIGluIHNoYWxsb3cgcmVuZGVyaW5nLlxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfcmVwbGFjZU5vZGVXaXRoTWFya3VwOiBmdW5jdGlvbiAob2xkTmF0aXZlTm9kZSwgbmV4dE1hcmt1cCkge1xuICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50V2l0aG91dE93bmVyT3JDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICB2YXIgcmVuZGVyZWRDb21wb25lbnQgPSBpbnN0LnJlbmRlcigpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgIGlmIChyZW5kZXJlZENvbXBvbmVudCA9PT0gdW5kZWZpbmVkICYmIGluc3QucmVuZGVyLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICByZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVkQ29tcG9uZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIHZhciByZW5kZXJlZENvbXBvbmVudDtcbiAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcztcbiAgICB0cnkge1xuICAgICAgcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnRXaXRob3V0T3duZXJPckNvbnRleHQoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgICEoXG4gICAgLy8gVE9ETzogQW4gYGlzVmFsaWROb2RlYCBmdW5jdGlvbiB3b3VsZCBwcm9iYWJseSBiZSBtb3JlIGFwcHJvcHJpYXRlXG4gICAgcmVuZGVyZWRDb21wb25lbnQgPT09IG51bGwgfHwgcmVuZGVyZWRDb21wb25lbnQgPT09IGZhbHNlIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChyZW5kZXJlZENvbXBvbmVudCkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLnJlbmRlcigpOiBBIHZhbGlkIFJlYWN0IGVsZW1lbnQgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQuIFlvdSBtYXkgaGF2ZSAnICsgJ3JldHVybmVkIHVuZGVmaW5lZCwgYW4gYXJyYXkgb3Igc29tZSBvdGhlciBpbnZhbGlkIG9iamVjdC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgcmV0dXJuIHJlbmRlcmVkQ29tcG9uZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXppbHkgYWxsb2NhdGVzIHRoZSByZWZzIG9iamVjdCBhbmQgc3RvcmVzIGBjb21wb25lbnRgIGFzIGByZWZgLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVmIFJlZmVyZW5jZSBuYW1lLlxuICAgKiBAcGFyYW0ge2NvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byBzdG9yZSBhcyBgcmVmYC5cbiAgICogQGZpbmFsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhdHRhY2hSZWY6IGZ1bmN0aW9uIChyZWYsIGNvbXBvbmVudCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgICEoaW5zdCAhPSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdTdGF0ZWxlc3MgZnVuY3Rpb24gY29tcG9uZW50cyBjYW5ub3QgaGF2ZSByZWZzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgcHVibGljQ29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQgJiYgY29tcG9uZW50LmdldE5hbWUgPyBjb21wb25lbnQuZ2V0TmFtZSgpIDogJ2EgY29tcG9uZW50JztcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHB1YmxpY0NvbXBvbmVudEluc3RhbmNlICE9IG51bGwsICdTdGF0ZWxlc3MgZnVuY3Rpb24gY29tcG9uZW50cyBjYW5ub3QgYmUgZ2l2ZW4gcmVmcyAnICsgJyhTZWUgcmVmIFwiJXNcIiBpbiAlcyBjcmVhdGVkIGJ5ICVzKS4gJyArICdBdHRlbXB0cyB0byBhY2Nlc3MgdGhpcyByZWYgd2lsbCBmYWlsLicsIHJlZiwgY29tcG9uZW50TmFtZSwgdGhpcy5nZXROYW1lKCkpIDogdm9pZCAwO1xuICAgIH1cbiAgICB2YXIgcmVmcyA9IGluc3QucmVmcyA9PT0gZW1wdHlPYmplY3QgPyBpbnN0LnJlZnMgPSB7fSA6IGluc3QucmVmcztcbiAgICByZWZzW3JlZl0gPSBwdWJsaWNDb21wb25lbnRJbnN0YW5jZTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0YWNoZXMgYSByZWZlcmVuY2UgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBOYW1lIHRvIGRlcmVmZXJlbmNlLlxuICAgKiBAZmluYWxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRldGFjaFJlZjogZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciByZWZzID0gdGhpcy5nZXRQdWJsaWNJbnN0YW5jZSgpLnJlZnM7XG4gICAgZGVsZXRlIHJlZnNbcmVmXTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IGEgdGV4dCBkZXNjcmlwdGlvbiBvZiB0aGUgY29tcG9uZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gaWRlbnRpZnkgaXRcbiAgICogaW4gZXJyb3IgbWVzc2FnZXMuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG5hbWUgb3IgbnVsbC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBnZXROYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR5cGUgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHRoaXMuX2luc3RhbmNlICYmIHRoaXMuX2luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IGNvbnN0cnVjdG9yICYmIGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3Rvci5uYW1lIHx8IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHVibGljbHkgYWNjZXNzaWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGNvbXBvbmVudCAtIGkuZS4gd2hhdFxuICAgKiBpcyBleHBvc2VkIGJ5IHJlZnMgYW5kIHJldHVybmVkIGJ5IHJlbmRlci4gQ2FuIGJlIG51bGwgZm9yIHN0YXRlbGVzc1xuICAgKiBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH0gdGhlIHB1YmxpYyBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0UHVibGljSW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIGlmIChpbnN0IGluc3RhbmNlb2YgU3RhdGVsZXNzQ29tcG9uZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGluc3Q7XG4gIH0sXG5cbiAgLy8gU3R1YlxuICBfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDogbnVsbFxuXG59O1xuXG5SZWFjdFBlcmYubWVhc3VyZU1ldGhvZHMoUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpbiwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50Jywge1xuICBtb3VudENvbXBvbmVudDogJ21vdW50Q29tcG9uZW50JyxcbiAgdXBkYXRlQ29tcG9uZW50OiAndXBkYXRlQ29tcG9uZW50JyxcbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudDogJ19yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQnXG59KTtcblxudmFyIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50ID0ge1xuXG4gIE1peGluOiBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudE1peGluXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb3NpdGVDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudEVudmlyb25tZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBpbmplY3RlZCA9IGZhbHNlO1xuXG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHtcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBpbmplY3RhYmxlIGVudmlyb25tZW50IGRlcGVuZGVudCBjbGVhbnVwIGhvb2suIChzZXJ2ZXIgdnMuXG4gICAqIGJyb3dzZXIgZXRjKS4gRXhhbXBsZTogQSBicm93c2VyIHN5c3RlbSBjYWNoZXMgRE9NIG5vZGVzIGJhc2VkIG9uIGNvbXBvbmVudFxuICAgKiBJRCBhbmQgbXVzdCByZW1vdmUgdGhhdCBjYWNoZSBlbnRyeSB3aGVuIHRoaXMgaW5zdGFuY2UgaXMgdW5tb3VudGVkLlxuICAgKi9cbiAgdW5tb3VudElERnJvbUVudmlyb25tZW50OiBudWxsLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IGluamVjdGFibGUgaG9vayBmb3Igc3dhcHBpbmcgb3V0IG1vdW50IGltYWdlcyBpbiB0aGUgbWlkZGxlIG9mXG4gICAqIHRoZSB0cmVlLlxuICAgKi9cbiAgcmVwbGFjZU5vZGVXaXRoTWFya3VwOiBudWxsLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IGluamVjdGFibGUgaG9vayBmb3IgcHJvY2Vzc2luZyBhIHF1ZXVlIG9mIGNoaWxkIHVwZGF0ZXMuIFdpbGxcbiAgICogbGF0ZXIgbW92ZSBpbnRvIE11bHRpQ2hpbGRDb21wb25lbnRzLlxuICAgKi9cbiAgcHJvY2Vzc0NoaWxkcmVuVXBkYXRlczogbnVsbCxcblxuICBpbmplY3Rpb246IHtcbiAgICBpbmplY3RFbnZpcm9ubWVudDogZnVuY3Rpb24gKGVudmlyb25tZW50KSB7XG4gICAgICAhIWluamVjdGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50OiBpbmplY3RFbnZpcm9ubWVudCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50ID0gZW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50O1xuICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXAgPSBlbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXA7XG4gICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMgPSBlbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzO1xuICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RXJyb3JVdGlsc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gd2hpbGUgZ3VhcmRpbmcgYWdhaW5zdCBlcnJvcnMgdGhhdCBoYXBwZW5zIHdpdGhpbiBpdC5cbiAqXG4gKiBAcGFyYW0gez9TdHJpbmd9IG5hbWUgb2YgdGhlIGd1YXJkIHRvIHVzZSBmb3IgbG9nZ2luZyBvciBkZWJ1Z2dpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZVxuICogQHBhcmFtIHsqfSBhIEZpcnN0IGFyZ3VtZW50XG4gKiBAcGFyYW0geyp9IGIgU2Vjb25kIGFyZ3VtZW50XG4gKi9cbmZ1bmN0aW9uIGludm9rZUd1YXJkZWRDYWxsYmFjayhuYW1lLCBmdW5jLCBhLCBiKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZ1bmMoYSwgYik7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICBpZiAoY2F1Z2h0RXJyb3IgPT09IG51bGwpIHtcbiAgICAgIGNhdWdodEVycm9yID0geDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG52YXIgUmVhY3RFcnJvclV0aWxzID0ge1xuICBpbnZva2VHdWFyZGVkQ2FsbGJhY2s6IGludm9rZUd1YXJkZWRDYWxsYmFjayxcblxuICAvKipcbiAgICogSW52b2tlZCBieSBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZSBzbyB0aGF0IGFueSBlcnJvcnMgdGhyb3duIGJ5IHRoZSBldmVudFxuICAgKiBoYW5kbGVyIGFyZSBzdXJlIHRvIGJlIHJldGhyb3duIGJ5IHJldGhyb3dDYXVnaHRFcnJvci5cbiAgICovXG4gIGludm9rZUd1YXJkZWRDYWxsYmFja1dpdGhDYXRjaDogaW52b2tlR3VhcmRlZENhbGxiYWNrLFxuXG4gIC8qKlxuICAgKiBEdXJpbmcgZXhlY3V0aW9uIG9mIGd1YXJkZWQgZnVuY3Rpb25zIHdlIHdpbGwgY2FwdHVyZSB0aGUgZmlyc3QgZXJyb3Igd2hpY2hcbiAgICogd2Ugd2lsbCByZXRocm93IHRvIGJlIGhhbmRsZWQgYnkgdGhlIHRvcCBsZXZlbCBlcnJvciBoYW5kbGVyLlxuICAgKi9cbiAgcmV0aHJvd0NhdWdodEVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhdWdodEVycm9yKSB7XG4gICAgICB2YXIgZXJyb3IgPSBjYXVnaHRFcnJvcjtcbiAgICAgIGNhdWdodEVycm9yID0gbnVsbDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgLyoqXG4gICAqIFRvIGhlbHAgZGV2ZWxvcG1lbnQgd2UgY2FuIGdldCBiZXR0ZXIgZGV2dG9vbHMgaW50ZWdyYXRpb24gYnkgc2ltdWxhdGluZyBhXG4gICAqIHJlYWwgYnJvd3NlciBldmVudC5cbiAgICovXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgZmFrZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdyZWFjdCcpO1xuICAgIFJlYWN0RXJyb3JVdGlscy5pbnZva2VHdWFyZGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgZnVuYywgYSwgYikge1xuICAgICAgdmFyIGJvdW5kRnVuYyA9IGZ1bmMuYmluZChudWxsLCBhLCBiKTtcbiAgICAgIHZhciBldnRUeXBlID0gJ3JlYWN0LScgKyBuYW1lO1xuICAgICAgZmFrZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBib3VuZEZ1bmMsIGZhbHNlKTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoZXZ0VHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgIGZha2VOb2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIGZha2VOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgYm91bmRGdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RXJyb3JVdGlscztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFcnJvclV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE5vZGVUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Tm9kZVR5cGVzID0ge1xuICBOQVRJVkU6IDAsXG4gIENPTVBPU0lURTogMSxcbiAgRU1QVFk6IDIsXG5cbiAgZ2V0VHlwZTogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLkVNUFRZO1xuICAgIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgICBpZiAodHlwZW9mIG5vZGUudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gUmVhY3ROb2RlVHlwZXMuQ09NUE9TSVRFO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLk5BVElWRTtcbiAgICAgIH1cbiAgICB9XG4gICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1VuZXhwZWN0ZWQgbm9kZTogJXMnLCBub2RlKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb2RlVHlwZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Tm9kZVR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHaXZlbiBhIGBwcmV2RWxlbWVudGAgYW5kIGBuZXh0RWxlbWVudGAsIGRldGVybWluZXMgaWYgdGhlIGV4aXN0aW5nXG4gKiBpbnN0YW5jZSBzaG91bGQgYmUgdXBkYXRlZCBhcyBvcHBvc2VkIHRvIGJlaW5nIGRlc3Ryb3llZCBvciByZXBsYWNlZCBieSBhIG5ld1xuICogaW5zdGFuY2UuIEJvdGggYXJndW1lbnRzIGFyZSBlbGVtZW50cy4gVGhpcyBlbnN1cmVzIHRoYXQgdGhpcyBsb2dpYyBjYW5cbiAqIG9wZXJhdGUgb24gc3RhdGVsZXNzIHRyZWVzIHdpdGhvdXQgYW55IGJhY2tpbmcgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2RWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0RWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZXhpc3RpbmcgaW5zdGFuY2Ugc2hvdWxkIGJlIHVwZGF0ZWQuXG4gKiBAcHJvdGVjdGVkXG4gKi9cblxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSB7XG4gIHZhciBwcmV2RW1wdHkgPSBwcmV2RWxlbWVudCA9PT0gbnVsbCB8fCBwcmV2RWxlbWVudCA9PT0gZmFsc2U7XG4gIHZhciBuZXh0RW1wdHkgPSBuZXh0RWxlbWVudCA9PT0gbnVsbCB8fCBuZXh0RWxlbWVudCA9PT0gZmFsc2U7XG4gIGlmIChwcmV2RW1wdHkgfHwgbmV4dEVtcHR5KSB7XG4gICAgcmV0dXJuIHByZXZFbXB0eSA9PT0gbmV4dEVtcHR5O1xuICB9XG5cbiAgdmFyIHByZXZUeXBlID0gdHlwZW9mIHByZXZFbGVtZW50O1xuICB2YXIgbmV4dFR5cGUgPSB0eXBlb2YgbmV4dEVsZW1lbnQ7XG4gIGlmIChwcmV2VHlwZSA9PT0gJ3N0cmluZycgfHwgcHJldlR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIG5leHRUeXBlID09PSAnc3RyaW5nJyB8fCBuZXh0VHlwZSA9PT0gJ251bWJlcic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5leHRUeXBlID09PSAnb2JqZWN0JyAmJiBwcmV2RWxlbWVudC50eXBlID09PSBuZXh0RWxlbWVudC50eXBlICYmIHByZXZFbGVtZW50LmtleSA9PT0gbmV4dEVsZW1lbnQua2V5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL3Nob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVtcHR5Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlDb21wb25lbnRGYWN0b3J5O1xuXG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudEluamVjdGlvbiA9IHtcbiAgaW5qZWN0RW1wdHlDb21wb25lbnRGYWN0b3J5OiBmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGVtcHR5Q29tcG9uZW50RmFjdG9yeSA9IGZhY3Rvcnk7XG4gIH1cbn07XG5cbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50ID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uIChpbnN0YW50aWF0ZSkge1xuICAgIHJldHVybiBlbXB0eUNvbXBvbmVudEZhY3RvcnkoaW5zdGFudGlhdGUpO1xuICB9XG59O1xuXG5SZWFjdEVtcHR5Q29tcG9uZW50LmluamVjdGlvbiA9IFJlYWN0RW1wdHlDb21wb25lbnRJbmplY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbXB0eUNvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFbXB0eUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROYXRpdmVDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBhdXRvR2VuZXJhdGVXcmFwcGVyQ2xhc3MgPSBudWxsO1xudmFyIGdlbmVyaWNDb21wb25lbnRDbGFzcyA9IG51bGw7XG4vLyBUaGlzIHJlZ2lzdHJ5IGtlZXBzIHRyYWNrIG9mIHdyYXBwZXIgY2xhc3NlcyBhcm91bmQgbmF0aXZlIHRhZ3MuXG52YXIgdGFnVG9Db21wb25lbnRDbGFzcyA9IHt9O1xudmFyIHRleHRDb21wb25lbnRDbGFzcyA9IG51bGw7XG5cbnZhciBSZWFjdE5hdGl2ZUNvbXBvbmVudEluamVjdGlvbiA9IHtcbiAgLy8gVGhpcyBhY2NlcHRzIGEgY2xhc3MgdGhhdCByZWNlaXZlcyB0aGUgdGFnIHN0cmluZy4gVGhpcyBpcyBhIGNhdGNoIGFsbFxuICAvLyB0aGF0IGNhbiByZW5kZXIgYW55IGtpbmQgb2YgdGFnLlxuICBpbmplY3RHZW5lcmljQ29tcG9uZW50Q2xhc3M6IGZ1bmN0aW9uIChjb21wb25lbnRDbGFzcykge1xuICAgIGdlbmVyaWNDb21wb25lbnRDbGFzcyA9IGNvbXBvbmVudENsYXNzO1xuICB9LFxuICAvLyBUaGlzIGFjY2VwdHMgYSB0ZXh0IGNvbXBvbmVudCBjbGFzcyB0aGF0IHRha2VzIHRoZSB0ZXh0IHN0cmluZyB0byBiZVxuICAvLyByZW5kZXJlZCBhcyBwcm9wcy5cbiAgaW5qZWN0VGV4dENvbXBvbmVudENsYXNzOiBmdW5jdGlvbiAoY29tcG9uZW50Q2xhc3MpIHtcbiAgICB0ZXh0Q29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcbiAgfSxcbiAgLy8gVGhpcyBhY2NlcHRzIGEga2V5ZWQgb2JqZWN0IHdpdGggY2xhc3NlcyBhcyB2YWx1ZXMuIEVhY2gga2V5IHJlcHJlc2VudHMgYVxuICAvLyB0YWcuIFRoYXQgcGFydGljdWxhciB0YWcgd2lsbCB1c2UgdGhpcyBjbGFzcyBpbnN0ZWFkIG9mIHRoZSBnZW5lcmljIG9uZS5cbiAgaW5qZWN0Q29tcG9uZW50Q2xhc3NlczogZnVuY3Rpb24gKGNvbXBvbmVudENsYXNzZXMpIHtcbiAgICBfYXNzaWduKHRhZ1RvQ29tcG9uZW50Q2xhc3MsIGNvbXBvbmVudENsYXNzZXMpO1xuICB9XG59O1xuXG4vKipcbiAqIEdldCBhIGNvbXBvc2l0ZSBjb21wb25lbnQgd3JhcHBlciBjbGFzcyBmb3IgYSBzcGVjaWZpYyB0YWcuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgVGhlIHRhZyBmb3Igd2hpY2ggdG8gZ2V0IHRoZSBjbGFzcy5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgUmVhY3QgY2xhc3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudENsYXNzRm9yRWxlbWVudChlbGVtZW50KSB7XG4gIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZTtcbiAgfVxuICB2YXIgdGFnID0gZWxlbWVudC50eXBlO1xuICB2YXIgY29tcG9uZW50Q2xhc3MgPSB0YWdUb0NvbXBvbmVudENsYXNzW3RhZ107XG4gIGlmIChjb21wb25lbnRDbGFzcyA9PSBudWxsKSB7XG4gICAgdGFnVG9Db21wb25lbnRDbGFzc1t0YWddID0gY29tcG9uZW50Q2xhc3MgPSBhdXRvR2VuZXJhdGVXcmFwcGVyQ2xhc3ModGFnKTtcbiAgfVxuICByZXR1cm4gY29tcG9uZW50Q2xhc3M7XG59XG5cbi8qKlxuICogR2V0IGEgbmF0aXZlIGludGVybmFsIGNvbXBvbmVudCBjbGFzcyBmb3IgYSBzcGVjaWZpYyB0YWcuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gY3JlYXRlLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBpbnRlcm5hbCBjbGFzcyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW50ZXJuYWxDb21wb25lbnQoZWxlbWVudCkge1xuICAhZ2VuZXJpY0NvbXBvbmVudENsYXNzID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RoZXJlIGlzIG5vIHJlZ2lzdGVyZWQgY29tcG9uZW50IGZvciB0aGUgdGFnICVzJywgZWxlbWVudC50eXBlKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHJldHVybiBuZXcgZ2VuZXJpY0NvbXBvbmVudENsYXNzKGVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3RUZXh0fSB0ZXh0XG4gKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VGb3JUZXh0KHRleHQpIHtcbiAgcmV0dXJuIG5ldyB0ZXh0Q29tcG9uZW50Q2xhc3ModGV4dCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1RleHRDb21wb25lbnQoY29tcG9uZW50KSB7XG4gIHJldHVybiBjb21wb25lbnQgaW5zdGFuY2VvZiB0ZXh0Q29tcG9uZW50Q2xhc3M7XG59XG5cbnZhciBSZWFjdE5hdGl2ZUNvbXBvbmVudCA9IHtcbiAgZ2V0Q29tcG9uZW50Q2xhc3NGb3JFbGVtZW50OiBnZXRDb21wb25lbnRDbGFzc0ZvckVsZW1lbnQsXG4gIGNyZWF0ZUludGVybmFsQ29tcG9uZW50OiBjcmVhdGVJbnRlcm5hbENvbXBvbmVudCxcbiAgY3JlYXRlSW5zdGFuY2VGb3JUZXh0OiBjcmVhdGVJbnN0YW5jZUZvclRleHQsXG4gIGlzVGV4dENvbXBvbmVudDogaXNUZXh0Q29tcG9uZW50LFxuICBpbmplY3Rpb246IFJlYWN0TmF0aXZlQ29tcG9uZW50SW5qZWN0aW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TmF0aXZlQ29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5hdGl2ZUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dhcm5pbmcvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbyA9IGZ1bmN0aW9uIChyb290SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgX3Jvb3RJbnN0YW5jZTogcm9vdEluc3RhbmNlLFxyXG4gICAgICAgIF9jb250YWluZXJOYW1lOiBjb250YWluZXJOYW1lXHJcbiAgICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbztcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb250YWluZXJJbmZvLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RVcGRhdGVzJyk7XG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQnKTtcbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RW1wdHlDb21wb25lbnQnKTtcbnZhciBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3knKTtcbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcblxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uJyk7XG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZ0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0NvbXBvbmVudCcpO1xudmFyIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQnKTtcblxudmFyIGluamVjdCA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0UmVjb25jaWxlVHJhbnNhY3Rpb24oY3JlYXRlUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uKG5hdGl2ZUltcGxlbWVudGF0aW9uLnRyYW5zYWN0aW9uKSk7XG4gICAgUmVhY3RVcGRhdGVzLmluamVjdGlvbi5pbmplY3RCYXRjaGluZ1N0cmF0ZWd5KFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kpO1xuXG4gICAgUmVhY3ROYXRpdmVDb21wb25lbnQuaW5qZWN0aW9uLmluamVjdEdlbmVyaWNDb21wb25lbnRDbGFzcyhjcmVhdGVSZWFjdEFueXRoaW5nQ29tcG9uZW50KG5hdGl2ZUltcGxlbWVudGF0aW9uLmNvbXBvbmVudHMpKTtcblxuICAgIFJlYWN0RW1wdHlDb21wb25lbnQuaW5qZWN0aW9uLmluamVjdEVtcHR5Q29tcG9uZW50RmFjdG9yeShmdW5jdGlvbiAoaW5zdGFudGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQoaW5zdGFudGlhdGUpO1xuICAgIH0pO1xuXG4gICAgaWYgKFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50IHx8XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50IHx8XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcykge1xuXG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50ID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudDtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXAgPSBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwO1xuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMgPSBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcztcbiAgICB9IGVsc2Uge1xuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LmluamVjdGlvbi5pbmplY3RFbnZpcm9ubWVudChSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQpO1xuICAgIH1cbn07XG5cbnZhciBjbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbmplY3Q6IGluamVjdCxcbiAgICBjbGVhcjogY2xlYXJcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0luamVjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlcycpO1xudmFyIFRyYW5zYWN0aW9uID0gcmVxdWlyZSgnLi9UcmFuc2FjdGlvbicpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcblxudmFyIFJFU0VUX0JBVENIRURfVVBEQVRFUyA9IHtcbiAgaW5pdGlhbGl6ZTogZW1wdHlGdW5jdGlvbixcbiAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID0gZmFsc2U7XG4gIH1cbn07XG5cbnZhciBGTFVTSF9CQVRDSEVEX1VQREFURVMgPSB7XG4gIGluaXRpYWxpemU6IGVtcHR5RnVuY3Rpb24sXG4gIGNsb3NlOiBSZWFjdFVwZGF0ZXMuZmx1c2hCYXRjaGVkVXBkYXRlcy5iaW5kKFJlYWN0VXBkYXRlcylcbn07XG5cbnZhciBUUkFOU0FDVElPTl9XUkFQUEVSUyA9IFtGTFVTSF9CQVRDSEVEX1VQREFURVMsIFJFU0VUX0JBVENIRURfVVBEQVRFU107XG5cbmZ1bmN0aW9uIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3lUcmFuc2FjdGlvbigpIHtcbiAgdGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpO1xufVxuXG5fYXNzaWduKFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3lUcmFuc2FjdGlvbi5wcm90b3R5cGUsIFRyYW5zYWN0aW9uLk1peGluLCB7XG4gIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVFJBTlNBQ1RJT05fV1JBUFBFUlM7XG4gIH1cbn0pO1xuXG52YXIgdHJhbnNhY3Rpb24gPSBuZXcgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVRyYW5zYWN0aW9uKCk7XG5cbnZhciBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5ID0ge1xuICBpc0JhdGNoaW5nVXBkYXRlczogZmFsc2UsXG5cbiAgLyoqXG4gICAqIENhbGwgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGluIGEgY29udGV4dCB3aXRoaW4gd2hpY2ggY2FsbHMgdG8gYHNldFN0YXRlYFxuICAgKiBhbmQgZnJpZW5kcyBhcmUgYmF0Y2hlZCBzdWNoIHRoYXQgY29tcG9uZW50cyBhcmVuJ3QgdXBkYXRlZCB1bm5lY2Vzc2FyaWx5LlxuICAgKi9cbiAgYmF0Y2hlZFVwZGF0ZXM6IGZ1bmN0aW9uIChjYWxsYmFjaywgYSwgYiwgYywgZCwgZSkge1xuICAgIHZhciBhbHJlYWR5QmF0Y2hpbmdVcGRhdGVzID0gUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcztcblxuICAgIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPSB0cnVlO1xuXG4gICAgLy8gVGhlIGNvZGUgaXMgd3JpdHRlbiB0aGlzIHdheSB0byBhdm9pZCBleHRyYSBhbGxvY2F0aW9uc1xuICAgIGlmIChhbHJlYWR5QmF0Y2hpbmdVcGRhdGVzKSB7XG4gICAgICBjYWxsYmFjayhhLCBiLCBjLCBkLCBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNhY3Rpb24ucGVyZm9ybShjYWxsYmFjaywgbnVsbCwgYSwgYiwgYywgZCwgZSk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3k7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLmpzXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FsbGJhY2tRdWV1ZSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlJyk7XG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCdyZWFjdC9saWIvUG9vbGVkQ2xhc3MnKTtcbnZhciBUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9UcmFuc2FjdGlvbicpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgT05fUkVBRFlfUVVFVUVJTkcgPSB7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeS5yZXNldCgpO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeS5ub3RpZnlBbGwoKTtcbiAgICB9XG59O1xuXG52YXIgY3JlYXRlVHJhbnNhY3Rpb25UeXBlID0gZnVuY3Rpb24gKG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgdmFyIFRSQU5TQUNUSU9OX1dSQVBQRVJTID0gW09OX1JFQURZX1FVRVVFSU5HXTtcblxuICAgIGlmIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgICAgICBUUkFOU0FDVElPTl9XUkFQUEVSUy5wdXNoKG5hdGl2ZUltcGxlbWVudGF0aW9uKTtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uKCk7XG4gICAgICAgIC8vIE9ubHkgc2VydmVyLXNpZGUgcmVuZGVyaW5nIHJlYWxseSBuZWVkcyB0aGlzIG9wdGlvbiAoc2VlXG4gICAgICAgIC8vIGBSZWFjdFNlcnZlclJlbmRlcmluZ2ApLCBidXQgc2VydmVyLXNpZGUgdXNlc1xuICAgICAgICAvLyBgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbmAgaW5zdGVhZC4gVGhpcyBvcHRpb24gaXMgaGVyZSBzbyB0aGF0IGl0J3NcbiAgICAgICAgLy8gYWNjZXNzaWJsZSBhbmQgZGVmYXVsdHMgdG8gZmFsc2Ugd2hlbiBgUmVhY3RET01Db21wb25lbnRgIGFuZFxuICAgICAgICAvLyBgUmVhY3RUZXh0Q29tcG9uZW50YCBjaGVja3MgaXQgaW4gYG1vdW50Q29tcG9uZW50YC5gXG4gICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5ID0gQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBNaXhpbiA9IHtcbiAgICAgICAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFRSQU5TQUNUSU9OX1dSQVBQRVJTO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJlYWN0TW91bnRSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhY3RNb3VudFJlYWR5O1xuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrcG9pbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHJlYWN0TW91bnRSZWFkeSBpcyB0aGUgb3VyIG9ubHkgc3RhdGVmdWwgd3JhcHBlclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhY3RNb3VudFJlYWR5LmNoZWNrcG9pbnQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICByb2xsYmFjazogZnVuY3Rpb24gKGNoZWNrcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5LnJvbGxiYWNrKGNoZWNrcG9pbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIENhbGxiYWNrUXVldWUucmVsZWFzZSh0aGlzLnJlYWN0TW91bnRSZWFkeSk7XG4gICAgICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBhc3NpZ24oUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLnByb3RvdHlwZSwgVHJhbnNhY3Rpb24uTWl4aW4sIE1peGluKTtcblxuICAgIFBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24pO1xuXG4gICAgcmV0dXJuIFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVHJhbnNhY3Rpb25UeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdERPTUNvbXBvbmVudC5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdE11bHRpQ2hpbGQgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkJyk7XG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cblxudmFyIGdsb2JhbElkQ291bnRlciA9IDE7XG5cbnZhciBjcmVhdGVJbXBsZW1lbnRhdGlvbiA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuXG4gICAgdmFyIFJlYWN0QW55dGhpbmdDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgdGFnID0gZWxlbWVudC50eXBlO1xuICAgICAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3RhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX25hdGl2ZU5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVQYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5fd3JhcHBlclN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcbiAgICB9O1xuXG4gICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdSZWFjdEFueXRoaW5nQ29tcG9uZW50JztcblxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4gPSB7XG4gICAgICAgIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlUGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUNvbnRhaW5lckluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IGdsb2JhbElkQ291bnRlcisrO1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbmF0aXZlUGFyZW50O1xuICAgICAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG5hdGl2ZUNvbnRhaW5lckluZm87XG5cbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnByb3BzO1xuXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0gbmF0aXZlSW1wbGVtZW50YXRpb24ubW91bnQodGhpcy5fcm9vdE5vZGVJRCwgdGhpcy5fdGFnLCBwcm9wcywgbmF0aXZlUGFyZW50ICYmIG5hdGl2ZVBhcmVudC5fbmF0aXZlTm9kZSk7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW5JbWFnZXMgPSB0aGlzLm1vdW50Q2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jaGlsZHJlbk1vdW50ICYmIGNoaWxkcmVuSW1hZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVJbXBsZW1lbnRhdGlvbi5jaGlsZHJlbk1vdW50KHRoaXMuX25hdGl2ZU5vZGUsIGNoaWxkcmVuSW1hZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVOb2RlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlY2VpdmVDb21wb25lbnQ6IGZ1bmN0aW9uIChuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBsYXN0UHJvcHMgPSBwcmV2RWxlbWVudC5wcm9wcztcbiAgICAgICAgICAgIHZhciBuZXh0UHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24udXBkYXRlKHRoaXMuX25hdGl2ZU5vZGUsIG5leHRQcm9wcywgbGFzdFByb3BzKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGlsZHJlbihuZXh0UHJvcHMuY2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXROYXRpdmVOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgICAgICAgICB0aGlzLnVubW91bnRDaGlsZHJlbihzYWZlbHkpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgICAgICAgICBuYXRpdmVJbXBsZW1lbnRhdGlvbi51bm1vdW50KHRoaXMuX25hdGl2ZU5vZGUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4sICdSZWFjdEFueXRoaW5nQ29tcG9uZW50Jywge1xuICAgICAgICBtb3VudENvbXBvbmVudDogJ21vdW50Q29tcG9uZW50JyxcbiAgICAgICAgcmVjZWl2ZUNvbXBvbmVudDogJ3JlY2VpdmVDb21wb25lbnQnLFxuICAgIH0pO1xuXG4gICAgYXNzaWduKFxuICAgICAgICBSZWFjdEFueXRoaW5nQ29tcG9uZW50LnByb3RvdHlwZSxcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5NaXhpbixcbiAgICAgICAgUmVhY3RNdWx0aUNoaWxkLk1peGluXG4gICAgKTtcblxuICAgIHJldHVybiBSZWFjdEFueXRoaW5nQ29tcG9uZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUltcGxlbWVudGF0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0TXVsdGlDaGlsZFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcbnZhciBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RDaGlsZFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRSZWNvbmNpbGVyJyk7XG5cbnZhciBmbGF0dGVuQ2hpbGRyZW4gPSByZXF1aXJlKCcuL2ZsYXR0ZW5DaGlsZHJlbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBtYXJrdXAgdG8gYmUgcmVuZGVyZWQgYW5kIGluc2VydGVkIGF0IGEgc3VwcGxpZWQgaW5kZXguXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1hcmt1cCBNYXJrdXAgdGhhdCByZW5kZXJzIGludG8gYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZUluc2VydE1hcmt1cChtYXJrdXAsIGFmdGVyTm9kZSwgdG9JbmRleCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuSU5TRVJUX01BUktVUCxcbiAgICBjb250ZW50OiBtYXJrdXAsXG4gICAgZnJvbUluZGV4OiBudWxsLFxuICAgIGZyb21Ob2RlOiBudWxsLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgYWZ0ZXJOb2RlOiBhZnRlck5vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3IgbW92aW5nIGFuIGV4aXN0aW5nIGVsZW1lbnQgdG8gYW5vdGhlciBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFNvdXJjZSBpbmRleCBvZiB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4IG9mIHRoZSBlbGVtZW50LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZU1vdmUoY2hpbGQsIGFmdGVyTm9kZSwgdG9JbmRleCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuTU9WRV9FWElTVElORyxcbiAgICBjb250ZW50OiBudWxsLFxuICAgIGZyb21JbmRleDogY2hpbGQuX21vdW50SW5kZXgsXG4gICAgZnJvbU5vZGU6IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKGNoaWxkKSxcbiAgICB0b0luZGV4OiB0b0luZGV4LFxuICAgIGFmdGVyTm9kZTogYWZ0ZXJOb2RlXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIHJlbW92aW5nIGFuIGVsZW1lbnQgYXQgYW4gaW5kZXguXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBJbmRleCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlUmVtb3ZlKGNoaWxkLCBub2RlKSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5SRU1PVkVfTk9ERSxcbiAgICBjb250ZW50OiBudWxsLFxuICAgIGZyb21JbmRleDogY2hpbGQuX21vdW50SW5kZXgsXG4gICAgZnJvbU5vZGU6IG5vZGUsXG4gICAgdG9JbmRleDogbnVsbCxcbiAgICBhZnRlck5vZGU6IG51bGxcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3Igc2V0dGluZyB0aGUgbWFya3VwIG9mIGEgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFya3VwIE1hcmt1cCB0aGF0IHJlbmRlcnMgaW50byBhbiBlbGVtZW50LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZVNldE1hcmt1cChtYXJrdXApIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLlNFVF9NQVJLVVAsXG4gICAgY29udGVudDogbWFya3VwLFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBzZXR0aW5nIHRoZSB0ZXh0IGNvbnRlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRDb250ZW50IFRleHQgY29udGVudCB0byBzZXQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlVGV4dENvbnRlbnQodGV4dENvbnRlbnQpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLlRFWFRfQ09OVEVOVCxcbiAgICBjb250ZW50OiB0ZXh0Q29udGVudCxcbiAgICBmcm9tSW5kZXg6IG51bGwsXG4gICAgZnJvbU5vZGU6IG51bGwsXG4gICAgdG9JbmRleDogbnVsbCxcbiAgICBhZnRlck5vZGU6IG51bGxcbiAgfTtcbn1cblxuLyoqXG4gKiBQdXNoIGFuIHVwZGF0ZSwgaWYgYW55LCBvbnRvIHRoZSBxdWV1ZS4gQ3JlYXRlcyBhIG5ldyBxdWV1ZSBpZiBub25lIGlzXG4gKiBwYXNzZWQgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBxdWV1ZS4gTXV0YXRpdmUuXG4gKi9cbmZ1bmN0aW9uIGVucXVldWUocXVldWUsIHVwZGF0ZSkge1xuICBpZiAodXBkYXRlKSB7XG4gICAgcXVldWUgPSBxdWV1ZSB8fCBbXTtcbiAgICBxdWV1ZS5wdXNoKHVwZGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufVxuXG4vKipcbiAqIFByb2Nlc3NlcyBhbnkgZW5xdWV1ZWQgdXBkYXRlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwcm9jZXNzUXVldWUoaW5zdCwgdXBkYXRlUXVldWUpIHtcbiAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzKGluc3QsIHVwZGF0ZVF1ZXVlKTtcbn1cblxuLyoqXG4gKiBSZWFjdE11bHRpQ2hpbGQgYXJlIGNhcGFibGUgb2YgcmVjb25jaWxpbmcgbXVsdGlwbGUgY2hpbGRyZW4uXG4gKlxuICogQGNsYXNzIFJlYWN0TXVsdGlDaGlsZFxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdE11bHRpQ2hpbGQgPSB7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGNvbW1vbiBmdW5jdGlvbmFsaXR5IGZvciBjb21wb25lbnRzIHRoYXQgbXVzdCByZWNvbmNpbGUgbXVsdGlwbGVcbiAgICogY2hpbGRyZW4uIFRoaXMgaXMgdXNlZCBieSBgUmVhY3RET01Db21wb25lbnRgIHRvIG1vdW50LCB1cGRhdGUsIGFuZFxuICAgKiB1bm1vdW50IGNoaWxkIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBsZW5kcyB7UmVhY3RNdWx0aUNoaWxkLnByb3RvdHlwZX1cbiAgICovXG4gIE1peGluOiB7XG5cbiAgICBfcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLmluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3RDaGlsZFJlY29uY2lsZXIuaW5zdGFudGlhdGVDaGlsZHJlbihuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICBfcmVjb25jaWxlclVwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAocHJldkNoaWxkcmVuLCBuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIG5leHRDaGlsZHJlbjtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgICAgICAgICAgbmV4dENoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgICByZXR1cm4gbmV4dENoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXh0Q2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMpO1xuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudXBkYXRlQ2hpbGRyZW4ocHJldkNoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgcmV0dXJuIG5leHRDaGlsZHJlbjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgXCJtb3VudCBpbWFnZVwiIGZvciBlYWNoIG9mIHRoZSBzdXBwbGllZCBjaGlsZHJlbi4gSW4gdGhlIGNhc2VcbiAgICAgKiBvZiBgUmVhY3RET01Db21wb25lbnRgLCBhIG1vdW50IGltYWdlIGlzIGEgc3RyaW5nIG9mIG1hcmt1cC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmVzdGVkQ2hpbGRyZW4gTmVzdGVkIGNoaWxkIG1hcHMuXG4gICAgICogQHJldHVybiB7YXJyYXl9IEFuIGFycmF5IG9mIG1vdW50ZWQgcmVwcmVzZW50YXRpb25zLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIG1vdW50Q2hpbGRyZW46IGZ1bmN0aW9uIChuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX3JlY29uY2lsZXJJbnN0YW50aWF0ZUNoaWxkcmVuKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICB0aGlzLl9yZW5kZXJlZENoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICB2YXIgbW91bnRJbWFnZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW25hbWVdO1xuICAgICAgICAgIHZhciBtb3VudEltYWdlID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KGNoaWxkLCB0cmFuc2FjdGlvbiwgdGhpcywgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCk7XG4gICAgICAgICAgY2hpbGQuX21vdW50SW5kZXggPSBpbmRleCsrO1xuICAgICAgICAgIG1vdW50SW1hZ2VzLnB1c2gobW91bnRJbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtb3VudEltYWdlcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgYW55IHJlbmRlcmVkIGNoaWxkcmVuIHdpdGggYSB0ZXh0IGNvbnRlbnQgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRDb250ZW50IFN0cmluZyBvZiBjb250ZW50LlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZVRleHRDb250ZW50OiBmdW5jdGlvbiAobmV4dENvbnRlbnQpIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgLy8gUmVtb3ZlIGFueSByZW5kZXJlZCBjaGlsZHJlbi5cbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJldkNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlVGV4dENvbnRlbnQgY2FsbGVkIG9uIG5vbi1lbXB0eSBjb21wb25lbnQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgbmV3IHRleHQgY29udGVudC5cbiAgICAgIHZhciB1cGRhdGVzID0gW21ha2VUZXh0Q29udGVudChuZXh0Q29udGVudCldO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbnkgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBhIG1hcmt1cCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dE1hcmt1cCBTdHJpbmcgb2YgbWFya3VwLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZU1hcmt1cDogZnVuY3Rpb24gKG5leHRNYXJrdXApIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgLy8gUmVtb3ZlIGFueSByZW5kZXJlZCBjaGlsZHJlbi5cbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJldkNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlVGV4dENvbnRlbnQgY2FsbGVkIG9uIG5vbi1lbXB0eSBjb21wb25lbnQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgdXBkYXRlcyA9IFttYWtlU2V0TWFya3VwKG5leHRNYXJrdXApXTtcbiAgICAgIHByb2Nlc3NRdWV1ZSh0aGlzLCB1cGRhdGVzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBuZXcgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzIE5lc3RlZCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAobmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAvLyBIb29rIHVzZWQgYnkgUmVhY3QgQVJUXG4gICAgICB0aGlzLl91cGRhdGVDaGlsZHJlbihuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzIE5lc3RlZCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBmaW5hbFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgdmFyIHJlbW92ZWROb2RlcyA9IHt9O1xuICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IHRoaXMuX3JlY29uY2lsZXJVcGRhdGVDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgIGlmICghbmV4dENoaWxkcmVuICYmICFwcmV2Q2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHVwZGF0ZXMgPSBudWxsO1xuICAgICAgdmFyIG5hbWU7XG4gICAgICAvLyBgbmV4dEluZGV4YCB3aWxsIGluY3JlbWVudCBmb3IgZWFjaCBjaGlsZCBpbiBgbmV4dENoaWxkcmVuYCwgYnV0XG4gICAgICAvLyBgbGFzdEluZGV4YCB3aWxsIGJlIHRoZSBsYXN0IGluZGV4IHZpc2l0ZWQgaW4gYHByZXZDaGlsZHJlbmAuXG4gICAgICB2YXIgbGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgICAgdmFyIGxhc3RQbGFjZWROb2RlID0gbnVsbDtcbiAgICAgIGZvciAobmFtZSBpbiBuZXh0Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldkNoaWxkID0gcHJldkNoaWxkcmVuICYmIHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IG5leHRDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgaWYgKHByZXZDaGlsZCA9PT0gbmV4dENoaWxkKSB7XG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5tb3ZlQ2hpbGQocHJldkNoaWxkLCBsYXN0UGxhY2VkTm9kZSwgbmV4dEluZGV4LCBsYXN0SW5kZXgpKTtcbiAgICAgICAgICBsYXN0SW5kZXggPSBNYXRoLm1heChwcmV2Q2hpbGQuX21vdW50SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgICAgcHJldkNoaWxkLl9tb3VudEluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcmV2Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBgbGFzdEluZGV4YCBiZWZvcmUgYF9tb3VudEluZGV4YCBnZXRzIHVuc2V0IGJ5IHVubW91bnRpbmcuXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBNYXRoLm1heChwcmV2Q2hpbGQuX21vdW50SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgICAgICAvLyBUaGUgYHJlbW92ZWROb2Rlc2AgbG9vcCBiZWxvdyB3aWxsIGFjdHVhbGx5IHJlbW92ZSB0aGUgY2hpbGQuXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRoZSBjaGlsZCBtdXN0IGJlIGluc3RhbnRpYXRlZCBiZWZvcmUgaXQncyBtb3VudGVkLlxuICAgICAgICAgIHVwZGF0ZXMgPSBlbnF1ZXVlKHVwZGF0ZXMsIHRoaXMuX21vdW50Q2hpbGRBdEluZGV4KG5leHRDaGlsZCwgbGFzdFBsYWNlZE5vZGUsIG5leHRJbmRleCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0SW5kZXgrKztcbiAgICAgICAgbGFzdFBsYWNlZE5vZGUgPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShuZXh0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGNoaWxkcmVuIHRoYXQgYXJlIG5vIGxvbmdlciBwcmVzZW50LlxuICAgICAgZm9yIChuYW1lIGluIHJlbW92ZWROb2Rlcykge1xuICAgICAgICBpZiAocmVtb3ZlZE5vZGVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5fdW5tb3VudENoaWxkKHByZXZDaGlsZHJlbltuYW1lXSwgcmVtb3ZlZE5vZGVzW25hbWVdKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh1cGRhdGVzKSB7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSh0aGlzLCB1cGRhdGVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBuZXh0Q2hpbGRyZW47XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubW91bnRzIGFsbCByZW5kZXJlZCBjaGlsZHJlbi4gVGhpcyBzaG91bGQgYmUgdXNlZCB0byBjbGVhbiB1cCBjaGlsZHJlblxuICAgICAqIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdW5tb3VudGVkLiBJdCBkb2VzIG5vdCBhY3R1YWxseSBwZXJmb3JtIGFueVxuICAgICAqIGJhY2tlbmQgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVubW91bnRDaGlsZHJlbjogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgdmFyIHJlbmRlcmVkQ2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudW5tb3VudENoaWxkcmVuKHJlbmRlcmVkQ2hpbGRyZW4sIHNhZmVseSk7XG4gICAgICB0aGlzLl9yZW5kZXJlZENoaWxkcmVuID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgYSBjaGlsZCBjb21wb25lbnQgdG8gdGhlIHN1cHBsaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIG1vdmUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXggb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhc3RJbmRleCBMYXN0IGluZGV4IHZpc2l0ZWQgb2YgdGhlIHNpYmxpbmdzIG9mIGBjaGlsZGAuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG1vdmVDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBhZnRlck5vZGUsIHRvSW5kZXgsIGxhc3RJbmRleCkge1xuICAgICAgLy8gSWYgdGhlIGluZGV4IG9mIGBjaGlsZGAgaXMgbGVzcyB0aGFuIGBsYXN0SW5kZXhgLCB0aGVuIGl0IG5lZWRzIHRvXG4gICAgICAvLyBiZSBtb3ZlZC4gT3RoZXJ3aXNlLCB3ZSBkbyBub3QgbmVlZCB0byBtb3ZlIGl0IGJlY2F1c2UgYSBjaGlsZCB3aWxsIGJlXG4gICAgICAvLyBpbnNlcnRlZCBvciBtb3ZlZCBiZWZvcmUgYGNoaWxkYC5cbiAgICAgIGlmIChjaGlsZC5fbW91bnRJbmRleCA8IGxhc3RJbmRleCkge1xuICAgICAgICByZXR1cm4gbWFrZU1vdmUoY2hpbGQsIGFmdGVyTm9kZSwgdG9JbmRleCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjaGlsZCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gY3JlYXRlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb3VudEltYWdlIE1hcmt1cCB0byBpbnNlcnQuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNyZWF0ZUNoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIGFmdGVyTm9kZSwgbW91bnRJbWFnZSkge1xuICAgICAgcmV0dXJuIG1ha2VJbnNlcnRNYXJrdXAobW91bnRJbWFnZSwgYWZ0ZXJOb2RlLCBjaGlsZC5fbW91bnRJbmRleCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBjaGlsZCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDaGlsZCB0byByZW1vdmUuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlbW92ZUNoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBtYWtlUmVtb3ZlKGNoaWxkLCBub2RlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTW91bnRzIGEgY2hpbGQgd2l0aCB0aGUgc3VwcGxpZWQgbmFtZS5cbiAgICAgKlxuICAgICAqIE5PVEU6IFRoaXMgaXMgcGFydCBvZiBgdXBkYXRlQ2hpbGRyZW5gIGFuZCBpcyBoZXJlIGZvciByZWFkYWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byBtb3VudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBjaGlsZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBjaGlsZC5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbW91bnRDaGlsZEF0SW5kZXg6IGZ1bmN0aW9uIChjaGlsZCwgYWZ0ZXJOb2RlLCBpbmRleCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBtb3VudEltYWdlID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KGNoaWxkLCB0cmFuc2FjdGlvbiwgdGhpcywgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCk7XG4gICAgICBjaGlsZC5fbW91bnRJbmRleCA9IGluZGV4O1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGQoY2hpbGQsIGFmdGVyTm9kZSwgbW91bnRJbWFnZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubW91bnRzIGEgcmVuZGVyZWQgY2hpbGQuXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGlzIGlzIHBhcnQgb2YgYHVwZGF0ZUNoaWxkcmVuYCBhbmQgaXMgaGVyZSBmb3IgcmVhZGFiaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gdW5tb3VudC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91bm1vdW50Q2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgbm9kZSkge1xuICAgICAgdmFyIHVwZGF0ZSA9IHRoaXMucmVtb3ZlQ2hpbGQoY2hpbGQsIG5vZGUpO1xuICAgICAgY2hpbGQuX21vdW50SW5kZXggPSBudWxsO1xuICAgICAgcmV0dXJuIHVwZGF0ZTtcbiAgICB9XG5cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TXVsdGlDaGlsZDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xuXG4vKipcbiAqIFdoZW4gYSBjb21wb25lbnQncyBjaGlsZHJlbiBhcmUgdXBkYXRlZCwgYSBzZXJpZXMgb2YgdXBkYXRlIGNvbmZpZ3VyYXRpb25cbiAqIG9iamVjdHMgYXJlIGNyZWF0ZWQgaW4gb3JkZXIgdG8gYmF0Y2ggYW5kIHNlcmlhbGl6ZSB0aGUgcmVxdWlyZWQgY2hhbmdlcy5cbiAqXG4gKiBFbnVtZXJhdGVzIGFsbCB0aGUgcG9zc2libGUgdHlwZXMgb2YgdXBkYXRlIGNvbmZpZ3VyYXRpb25zLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMgPSBrZXlNaXJyb3Ioe1xuICBJTlNFUlRfTUFSS1VQOiBudWxsLFxuICBNT1ZFX0VYSVNUSU5HOiBudWxsLFxuICBSRU1PVkVfTk9ERTogbnVsbCxcbiAgU0VUX01BUktVUDogbnVsbCxcbiAgVEVYVF9DT05URU5UOiBudWxsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2hpbGRSZWNvbmNpbGVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcblxudmFyIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gaW5zdGFudGlhdGVDaGlsZChjaGlsZEluc3RhbmNlcywgY2hpbGQsIG5hbWUpIHtcbiAgLy8gV2UgZm91bmQgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gIHZhciBrZXlVbmlxdWUgPSBjaGlsZEluc3RhbmNlc1tuYW1lXSA9PT0gdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGtleVVuaXF1ZSwgJ2ZsYXR0ZW5DaGlsZHJlbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXksICcgKyAnYCVzYC4gQ2hpbGQga2V5cyBtdXN0IGJlIHVuaXF1ZTsgd2hlbiB0d28gY2hpbGRyZW4gc2hhcmUgYSBrZXksIG9ubHkgJyArICd0aGUgZmlyc3QgY2hpbGQgd2lsbCBiZSB1c2VkLicsIG5hbWUpIDogdm9pZCAwO1xuICB9XG4gIGlmIChjaGlsZCAhPSBudWxsICYmIGtleVVuaXF1ZSkge1xuICAgIGNoaWxkSW5zdGFuY2VzW25hbWVdID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChjaGlsZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWFjdENoaWxkUmVjb25jaWxlciBwcm92aWRlcyBoZWxwZXJzIGZvciBpbml0aWFsaXppbmcgb3IgdXBkYXRpbmcgYSBzZXQgb2ZcbiAqIGNoaWxkcmVuLiBJdHMgb3V0cHV0IGlzIHN1aXRhYmxlIGZvciBwYXNzaW5nIGl0IG9udG8gUmVhY3RNdWx0aUNoaWxkIHdoaWNoXG4gKiBkb2VzIGRpZmZlZCByZW9yZGVyaW5nIGFuZCBpbnNlcnRpb24uXG4gKi9cbnZhciBSZWFjdENoaWxkUmVjb25jaWxlciA9IHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIFwibW91bnQgaW1hZ2VcIiBmb3IgZWFjaCBvZiB0aGUgc3VwcGxpZWQgY2hpbGRyZW4uIEluIHRoZSBjYXNlXG4gICAqIG9mIGBSZWFjdERPTUNvbXBvbmVudGAsIGEgbW91bnQgaW1hZ2UgaXMgYSBzdHJpbmcgb2YgbWFya3VwLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5lc3RlZENoaWxkTm9kZXMgTmVzdGVkIGNoaWxkIG1hcHMuXG4gICAqIEByZXR1cm4gez9vYmplY3R9IEEgc2V0IG9mIGNoaWxkIGluc3RhbmNlcy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBpbnN0YW50aWF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAobmVzdGVkQ2hpbGROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICBpZiAobmVzdGVkQ2hpbGROb2RlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGNoaWxkSW5zdGFuY2VzID0ge307XG4gICAgdHJhdmVyc2VBbGxDaGlsZHJlbihuZXN0ZWRDaGlsZE5vZGVzLCBpbnN0YW50aWF0ZUNoaWxkLCBjaGlsZEluc3RhbmNlcyk7XG4gICAgcmV0dXJuIGNoaWxkSW5zdGFuY2VzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSByZW5kZXJlZCBjaGlsZHJlbiBhbmQgcmV0dXJucyBhIG5ldyBzZXQgb2YgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcHJldkNoaWxkcmVuIFByZXZpb3VzbHkgaW5pdGlhbGl6ZWQgc2V0IG9mIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDaGlsZHJlbiBGbGF0IGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fSBBIG5ldyBzZXQgb2YgY2hpbGQgaW5zdGFuY2VzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAocHJldkNoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAvLyBXZSBjdXJyZW50bHkgZG9uJ3QgaGF2ZSBhIHdheSB0byB0cmFjayBtb3ZlcyBoZXJlIGJ1dCBpZiB3ZSB1c2UgaXRlcmF0b3JzXG4gICAgLy8gaW5zdGVhZCBvZiBmb3IuLmluIHdlIGNhbiB6aXAgdGhlIGl0ZXJhdG9ycyBhbmQgY2hlY2sgaWYgYW4gaXRlbSBoYXNcbiAgICAvLyBtb3ZlZC5cbiAgICAvLyBUT0RPOiBJZiBub3RoaW5nIGhhcyBjaGFuZ2VkLCByZXR1cm4gdGhlIHByZXZDaGlsZHJlbiBvYmplY3Qgc28gdGhhdCB3ZVxuICAgIC8vIGNhbiBxdWlja2x5IGJhaWxvdXQgaWYgbm90aGluZyBoYXMgY2hhbmdlZC5cbiAgICBpZiAoIW5leHRDaGlsZHJlbiAmJiAhcHJldkNoaWxkcmVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBuYW1lO1xuICAgIHZhciBwcmV2Q2hpbGQ7XG4gICAgZm9yIChuYW1lIGluIG5leHRDaGlsZHJlbikge1xuICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW4gJiYgcHJldkNoaWxkcmVuW25hbWVdO1xuICAgICAgdmFyIHByZXZFbGVtZW50ID0gcHJldkNoaWxkICYmIHByZXZDaGlsZC5fY3VycmVudEVsZW1lbnQ7XG4gICAgICB2YXIgbmV4dEVsZW1lbnQgPSBuZXh0Q2hpbGRyZW5bbmFtZV07XG4gICAgICBpZiAocHJldkNoaWxkICE9IG51bGwgJiYgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSkge1xuICAgICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudChwcmV2Q2hpbGQsIG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgIG5leHRDaGlsZHJlbltuYW1lXSA9IHByZXZDaGlsZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGQpIHtcbiAgICAgICAgICByZW1vdmVkTm9kZXNbbmFtZV0gPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShwcmV2Q2hpbGQpO1xuICAgICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHByZXZDaGlsZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBjaGlsZCBtdXN0IGJlIGluc3RhbnRpYXRlZCBiZWZvcmUgaXQncyBtb3VudGVkLlxuICAgICAgICB2YXIgbmV4dENoaWxkSW5zdGFuY2UgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRFbGVtZW50KTtcbiAgICAgICAgbmV4dENoaWxkcmVuW25hbWVdID0gbmV4dENoaWxkSW5zdGFuY2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFVubW91bnQgY2hpbGRyZW4gdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQuXG4gICAgZm9yIChuYW1lIGluIHByZXZDaGlsZHJlbikge1xuICAgICAgaWYgKHByZXZDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiAhKG5leHRDaGlsZHJlbiAmJiBuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpKSB7XG4gICAgICAgIHByZXZDaGlsZCA9IHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgcmVtb3ZlZE5vZGVzW25hbWVdID0gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUocHJldkNoaWxkKTtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocHJldkNoaWxkLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVbm1vdW50cyBhbGwgcmVuZGVyZWQgY2hpbGRyZW4uIFRoaXMgc2hvdWxkIGJlIHVzZWQgdG8gY2xlYW4gdXAgY2hpbGRyZW5cbiAgICogd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gcmVuZGVyZWRDaGlsZHJlbiBQcmV2aW91c2x5IGluaXRpYWxpemVkIHNldCBvZiBjaGlsZHJlbi5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q2hpbGRyZW46IGZ1bmN0aW9uIChyZW5kZXJlZENoaWxkcmVuLCBzYWZlbHkpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHJlbmRlcmVkQ2hpbGRyZW4pIHtcbiAgICAgIGlmIChyZW5kZXJlZENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHZhciByZW5kZXJlZENoaWxkID0gcmVuZGVyZWRDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocmVuZGVyZWRDaGlsZCwgc2FmZWx5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkUmVjb25jaWxlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZFJlY29uY2lsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGZsYXR0ZW5DaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IHBhc3NlZCB0aHJvdWdoIHRyYXZlcnNhbC5cbiAqIEBwYXJhbSB7P1JlYWN0Q29tcG9uZW50fSBjaGlsZCBSZWFjdCBjaGlsZCBjb21wb25lbnQuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWUgU3RyaW5nIG5hbWUgb2Yga2V5IHBhdGggdG8gY2hpbGQuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgLy8gV2UgZm91bmQgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gIHZhciByZXN1bHQgPSB0cmF2ZXJzZUNvbnRleHQ7XG4gIHZhciBrZXlVbmlxdWUgPSByZXN1bHRbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhrZXlVbmlxdWUsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4nLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuICBpZiAoa2V5VW5pcXVlICYmIGNoaWxkICE9IG51bGwpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBjaGlsZDtcbiAgfVxufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC4gQW55IG51bGxcbiAqIGNoaWxkcmVuIHdpbGwgbm90IGJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHRpbmcgb2JqZWN0LlxuICogQHJldHVybiB7IW9iamVjdH0gZmxhdHRlbmVkIGNoaWxkcmVuIGtleWVkIGJ5IG5hbWUuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge307XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0LCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5DaGlsZHJlbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvZmxhdHRlbkNoaWxkcmVuLmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cblxudmFyIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZU5vZGUgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG4gICAgdGhpcy5fd3JhcHBlclN0YXRlID0gbnVsbDtcbiAgICB0aGlzLl90b3BMZXZlbFdyYXBwZXIgPSBudWxsO1xufTtcblxuUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50LmRpc3BsYXlOYW1lID0gJ1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCc7XG5cblJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5NaXhpbiA9IHtcbiAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlUGFyZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlQ29udGFpbmVySW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbmF0aXZlUGFyZW50O1xuICAgICAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbmF0aXZlQ29udGFpbmVySW5mbztcblxuICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0ge2VtcHR5OiB0cnVlfTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH0sXG5cbiAgICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBwcmV2RWxlbWVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRFbGVtZW50O1xuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCkge1xuICAgIH0sXG5cbiAgICBnZXROYXRpdmVOb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVOb2RlO1xuICAgIH0sXG5cbiAgICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIH0sXG5cbiAgICBnZXRQdWJsaWNJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEVsZW1lbnQ7XG4gICAgfVxufTtcblxuXG5hc3NpZ24oXG4gICAgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50LnByb3RvdHlwZSxcbiAgICBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuTWl4aW5cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDY0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50LmpzXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xuXG52YXIgUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50ID0ge1xuICAgIHByb2Nlc3NDaGlsZHJlblVwZGF0ZXM6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgfSxcbiAgICByZXBsYWNlTm9kZVdpdGhNYXJrdXA6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgfVxufTtcblxuUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCxcbiAgICAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50JyxcbiAgICB7XG4gICAgICAgIHJlcGxhY2VOb2RlV2l0aE1hcmt1cDogJ3JlcGxhY2VOb2RlV2l0aE1hcmt1cCcsXG4gICAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xyXG5cclxuXHJcbnZhciBub2RlTWFuYWdlciA9IHJlcXVpcmUoJy4vaW1wbC9ub2RlLW1hbmFnZXIuanMnKTtcclxudmFyIGluaXQgPSByZXF1aXJlKCcuL2ltcGwvaW5pdCcpO1xyXG52YXIgTm9kZXMgPSByZXF1aXJlKCcuL2ltcGwvbm9kZXMnKTtcclxuXHJcbnZhciBub2RlcyA9IG5ldyBOb2RlcygpO1xyXG52YXIgcnVubmluZyA9IGZhbHNlO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICAgIG1vdW50OiBmdW5jdGlvbiAoaWQsIHRhZywgcHJvcHMsIHBhcmVudCkge1xyXG4gICAgICAgICAgICBpbnZhcmlhbnQoISh0YWcgPT09ICdnYW1lJyAmJiBub2Rlcy5nYW1lTm9kZSksICdPbmx5IG9uZSBnYW1lIG5vZGUgY2FuIGJlIG1vdW50ZWQuJyk7XHJcbiAgICAgICAgICAgIGludmFyaWFudCghKHRhZyAhPT0gJ2dhbWUnICYmICFwYXJlbnQpLCAnT25seSBcXCdnYW1lXFwnIGNhbiBiZSByb290IG5vZGUuJyk7XHJcbiAgICAgICAgICAgIGludmFyaWFudCghKHByb3BzLm5hbWUgJiYgbm9kZXMuaWRCeU5hbWUocHJvcHMubmFtZSkpLCAnQ2Fubm90IHJlcGVhdCBuYW1lcy4nKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBub2RlID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgdGFnOiB0YWcsXHJcbiAgICAgICAgICAgICAgICBwcm9wczogcHJvcHMsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCAmJiBwYXJlbnQuaWQsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2Rlcy5yZWdpc3Rlcihub2RlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0YWcgPT09ICdnYW1lJykge1xyXG4gICAgICAgICAgICAgICAgbm9kZXMuc2V0R2FtZU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIubW91bnQobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoaWxkcmVuTW91bnQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5jaGlsZHJlbk1vdW50KG5vZGVzLCBub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdW5tb3VudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50ID0gbm9kZXMuYnlJZChub2RlLnBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUuaWQpLCAxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZXMudW5yZWdpc3Rlcihub2RlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlLnRhZyA9PT0gJ2dhbWUnKSB7XHJcbiAgICAgICAgICAgICAgICBub2Rlcy5zZXRHYW1lTm9kZShudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGVNYW5hZ2VyLnVubW91bnQobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChub2RlLCBuZXh0UHJvcHMsIGxhc3RQcm9wcykge1xyXG4gICAgICAgICAgICBub2RlLnByb3BzID0gbmV4dFByb3BzO1xyXG4gICAgICAgICAgICBub2Rlcy51cGRhdGUobm9kZSwgbGFzdFByb3BzKTtcclxuICAgICAgICAgICAgbm9kZU1hbmFnZXIudXBkYXRlKG5vZGVzLCBub2RlLCBsYXN0UHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0cmFuc2FjdGlvbjoge1xyXG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChub2Rlcy5nYW1lTm9kZSAmJiAhcnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpbml0KG5vZGVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChydW5uaW5nICYmICFub2Rlcy5nYW1lTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rlc3Ryb3knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zYWN0aW9uTGlzdGVuZXJzID0gbm9kZXMucG9wVHJhbnNhY3Rpb25MaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbkxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNhY3Rpb25MaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBub2Rlcy5ieUlkKHRyYW5zYWN0aW9uTGlzdGVuZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVNYW5hZ2VyLm5vdGlmeVRyYW5zYWN0aW9uKG5vZGVzLCBub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvTmF0aXZlSW1wbGVtZW50YXRpb24uanNcbiAqKi8iLCIndXNlIHN0cnVjdCc7XHJcblxyXG52YXIgbm9kZVR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpLFxyXG5cclxuICAgIG1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcclxuICAgICAgICBpZiAobm9kZVR5cGUpIHtcclxuICAgICAgICAgICAgbm9kZVR5cGUubW91bnQobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5vYmopIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqLnJub2RlaWQgPSBub2RlLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHByZXZQcm9wcykge1xyXG4gICAgICAgIHZhciBub2RlVHlwZSA9IG5vZGVUeXBlc1tub2RlLnRhZ107XHJcbiAgICAgICAgaWYgKG5vZGVUeXBlICYmIG5vZGVUeXBlLnVwZGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlZFByb3BzID0gT2JqZWN0LmtleXMobm9kZS5wcm9wcyk7XHJcbiAgICAgICAgICAgIGNoYW5nZWRQcm9wcyA9IGNoYW5nZWRQcm9wcy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBub2RlLnByb3BzW2tleV0gIT09IHByZXZQcm9wc1trZXldO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHByZXZQcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnY2hpbGRyZW4nICYmICEoa2V5IGluIG5vZGUucHJvcHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFByb3BzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlZFByb3BzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGVUeXBlLnVwZGF0ZShub2Rlcywgbm9kZSwgY2hhbmdlZFByb3BzLCBwcmV2UHJvcHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcclxuICAgICAgICBpZiAobm9kZVR5cGUpIHtcclxuICAgICAgICAgICAgbm9kZVR5cGUudW5tb3VudChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjaGlsZHJlbk1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcclxuICAgICAgICBpZiAobm9kZVR5cGUgJiYgbm9kZVR5cGUuY2hpbGRyZW5Nb3VudCkge1xyXG4gICAgICAgICAgICBub2RlVHlwZS5jaGlsZHJlbk1vdW50KG5vZGVzLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG5vdGlmeVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcclxuICAgICAgICBpZiAobm9kZVR5cGUgJiYgbm9kZVR5cGUubm90aWZ5VHJhbnNhY3Rpb24pIHtcclxuICAgICAgICAgICAgbm9kZVR5cGUubm90aWZ5VHJhbnNhY3Rpb24obm9kZXMsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdENoaWxkcmVuID0gZnVuY3Rpb24gKG5vZGVzLCBjaGlsZHJlbikge1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkSWQpIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuaWRzW2NoaWxkSWRdO1xyXG4gICAgICAgICAgICBtb3VudChub2RlcywgY2hpbGQpO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdENoaWxkcmVuKG5vZGVzLCBjaGlsZC5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk1vdW50KG5vZGVzLCBjaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudCxcclxuICAgIGNoaWxkcmVuTW91bnQ6IGNoaWxkcmVuTW91bnQsXHJcbiAgICB1bm1vdW50OiB1bm1vdW50LFxyXG4gICAgdXBkYXRlOiB1cGRhdGUsXHJcbiAgICBub3RpZnlUcmFuc2FjdGlvbjogbm90aWZ5VHJhbnNhY3Rpb24sXHJcbiAgICBpbml0Q2hpbGRyZW46IGluaXRDaGlsZHJlblxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL25vZGUtbWFuYWdlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKHtcclxuICAgICAgICBnYW1lOiByZXF1aXJlKCcuL2dhbWUnKSxcclxuICAgICAgICBzcHJpdGU6IHJlcXVpcmUoJy4vc3ByaXRlJyksXHJcbiAgICAgICAgZ3JvdXA6IHJlcXVpcmUoJy4vZ3JvdXAnKSxcclxuICAgICAgICBhbmltYXRpb246IHJlcXVpcmUoJy4vYW5pbWF0aW9uJyksXHJcbiAgICAgICAgY3Vyc29yczogcmVxdWlyZSgnLi9jdXJzb3JzJyksXHJcbiAgICAgICAgY29sbGlkZXM6IHJlcXVpcmUoJy4vY29sbGlkZXMnKSxcclxuICAgICAgICBvdmVybGFwczogcmVxdWlyZSgnLi9vdmVybGFwcycpLFxyXG4gICAgICAgIHRleHQ6IHJlcXVpcmUoJy4vdGV4dCcpLFxyXG4gICAgICAgIGJ1dHRvbjogcmVxdWlyZSgnLi9idXR0b24nKSxcclxuICAgICAgICBncmFwaGljczogcmVxdWlyZSgnLi9ncmFwaGljcy9ncmFwaGljcycpLFxyXG4gICAgICAgIHJlbmRlcnRleHR1cmU6IHJlcXVpcmUoJy4vZ3JhcGhpY3MvcmVuZGVydGV4dHVyZScpLFxyXG4gICAgICAgIHJlbmRlcmltYWdlOiByZXF1aXJlKCcuL2dyYXBoaWNzL3JlbmRlcmltYWdlJylcclxuICAgIH0sXHJcbiAgICByZXF1aXJlKCcuL2dyYXBoaWNzL3JlbmRlcmVycycpXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4dGVuZC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgbW91bnRHYW1lID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcblxyXG4gICAgbm9kZS5jb2xsaXNpb25zID0gW107XHJcbiAgICBub2RlLm92ZXJsYXBzID0gW107XHJcbiAgICBub2RlLnVwZGF0ZU1ldGhvZHMgPSBbXTtcclxuXHJcbiAgICBpZiAobm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eSgncGh5c2ljcycpKSB7XHJcbiAgICAgICAgbm9kZS5vYmoucGh5c2ljcy5zdGFydFN5c3RlbShub2RlLnByb3BzLnBoeXNpY3MpO1xyXG4gICAgICAgIG5vZGUucGh5c2ljcyA9ICdhcmNhZGUnO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRHYW1lLFxyXG4gICAgdW5tb3VudDogZnVuY3Rpb24gKCkge31cclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9nYW1lLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpLFxyXG4gICAgc3ByaXRlUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5TcHJpdGUnKSxcclxuXHJcbiAgICB1cGRhdGVTcHJpdGUgPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShzcHJpdGVQcm9wZXJ0ZXMpLFxyXG4gICAgXHJcbiAgICBtb3VudFNwcml0ZSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHM7XHJcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLlNwcml0ZShub2Rlcy5nYW1lKCksIHByb3BzLngsIHByb3BzLnksIHByb3BzLmFzc2V0S2V5KTtcclxuICAgICAgICB1dGlscy5hZGROb2RlRGlzcGxheU9iamVjdChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgdXBkYXRlU3ByaXRlKG5vZGVzLCBub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgdW5tb3VudFNwcml0ZSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudFNwcml0ZSxcclxuICAgIHVubW91bnQ6IHVubW91bnRTcHJpdGUsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZVNwcml0ZVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL3Nwcml0ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuXHJcbiAgICBhZGROb2RlRGlzcGxheU9iamVjdCA9IGZ1bmN0aW9uIChub2Rlcywgd3JhcHBlciwgb2JqKSB7XHJcbiAgICAgICAgdmFyIHBhcmVudCA9IG5vZGVzLmJ5SWQod3JhcHBlci5wYXJlbnQpLFxyXG4gICAgICAgICAgICBncm91cCA9IHBhcmVudC50YWcgPT09ICdnYW1lJyA/IHBhcmVudC5vYmoud29ybGQgOiBwYXJlbnQub2JqO1xyXG5cclxuICAgICAgICBncm91cC5hZGQob2JqIHx8IHdyYXBwZXIub2JqKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdlblByb3BlcnR5TWFwVXBkYXRlID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgY2hhbmdlUHJvcHMgPSBPYmplY3Qua2V5cyhub2RlLnByb3BzKSwgcHJldlByb3BzID0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZVByb3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGNoYW5nZVByb3BzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5VXBkYXRlID0gcHJvcHNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVVwZGF0ZShub2Rlcywgbm9kZSwgbm9kZS5wcm9wc1twcm9wXSwgIXByZXZQcm9wcywgcHJldlByb3BzICYmIHByZXZQcm9wc1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBhZGROb2RlRGlzcGxheU9iamVjdDogYWRkTm9kZURpc3BsYXlPYmplY3QsXHJcbiAgICBnZW5Qcm9wZXJ0eU1hcFVwZGF0ZTogZ2VuUHJvcGVydHlNYXBVcGRhdGVcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy91dGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLlNwcml0ZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNvcmUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BbmdsZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuaW1hdGlvbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQm91bmRzJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQnJpbmdUb1RvcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNyb3AnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZWx0YScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3knKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSGVhbHRoJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5DYW1lcmEnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbldvcmxkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuTGlmZVNwYW4nKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5QaHlzaWNzQm9keScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlJlc2V0JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXgnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5TbW9vdGhlZCcpXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuU3ByaXRlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyJylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5TcHJpdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkRpc3BsYXlPYmplY3QnKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5nZW5lcmF0ZVBvaW50UHJvcE1hcChbJ3NjYWxlJ10pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkRpc3BsYXlPYmplY3QuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgYWNjW3Byb3BdID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXAgPSBmdW5jdGlvbiAocHJlZml4LCBwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ICsgcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSldID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJlZml4XVtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdlbmVyYXRlUG9pbnRQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUsIGlzTmV3LCBwcmV2VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG5vZGUub2JqW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnggIT09IHByZXZWYWx1ZS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueCA9IHZhbHVlLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueSAhPT0gcHJldlZhbHVlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC55ID0gdmFsdWUueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3Byb3AgKyAnWCddID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJvcF0ueCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhY2NbcHJvcCArICdZJ10gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcm9wXS55ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkUG9pbnRQcm9wTWFwID0gZnVuY3Rpb24gKHByZWZpeCwgcHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgdmFyIHByZWZpeGVkUHJvcCA9IHByZWZpeCArIHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ZWRQcm9wXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUsIGlzTmV3LCBwcmV2VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG5vZGUub2JqW3ByZWZpeF1bcHJvcF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueCAhPT0gcHJldlZhbHVlLngpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC54ID0gdmFsdWUueDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc05ldyB8fCB2YWx1ZS55ICE9PSBwcmV2VmFsdWUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnkgPSB2YWx1ZS55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ZWRQcm9wICsgJ1gnXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0ueCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ZWRQcm9wICsgJ1knXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0ueSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2VuZXJhdGVBbGlhc1Byb3BNYXAgPSBmdW5jdGlvbiAoYWxpYXNlcykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhbGlhc2VzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYWxpYXMpIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSBhbGlhc2VzW2FsaWFzXTtcclxuICAgICAgICAgICAgYWNjW2FsaWFzXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcCA9IGZ1bmN0aW9uIChwcm9wTWFwKSB7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHByb3BNYXApLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHZhciBpbXBsID0gcHJvcE1hcFtwcm9wXTtcclxuICAgICAgICAgICAgYWNjW3Byb3BdID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSwgaXNOZXcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc05ldykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwobm9kZXMsIG5vZGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBnZW5lcmF0ZUJhc2ljUHJvcE1hcDogZ2VuZXJhdGVCYXNpY1Byb3BNYXAsXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwOiBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVQb2ludFByb3BNYXA6IGdlbmVyYXRlUG9pbnRQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcDogZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcCxcclxuICAgIGdlbmVyYXRlQWxpYXNQcm9wTWFwOiBnZW5lcmF0ZUFsaWFzUHJvcE1hcCxcclxuICAgIGdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcDogZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy91dGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmdlbmVyYXRlQWxpYXNQcm9wTWFwKHtcclxuICAgIGFzc2V0S2V5OiAna2V5J1xyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Db3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2FuZ2xlJ10pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmltYXRpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnYXV0b2N1bGwnXSk7XHJcbi8qKlxyXG4gKiA8cmVhZG9ubHk+aW5DYW1lcmFcclxuICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQnJpbmdUb1RvcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Dcm9wLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZWx0YS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVzdHJveS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSGVhbHRoLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2NoZWNrV29ybGRCb3VuZHMnLCAnb3V0T2ZCb3VuZHNLaWxsJ10pO1xyXG4vKipcclxuICogPHJlYWRvbmx5PmluV29ybGRcclxuICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnYWxpdmUnLCAnbGlmZXNwYW4nXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuTGlmZVNwYW4uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2ZyYW1lJywgJ2ZyYW1lTmFtZSddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuT3ZlcmxhcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICB1dGlscy5nZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ3gnLCAneSddKSxcclxuICAgIHJlcXVpcmUoJy4uL2N1c3RvbS9ib2R5JylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5QaHlzaWNzQm9keS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICB1dGlscy5nZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwKCdib2R5JywgWydpbW1vdmFibGUnLCAnY29sbGlkZVdvcmxkQm91bmRzJ10pLFxyXG4gICAgdXRpbHMuZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcCgnYm9keScsIFsnYm91bmNlJywgJ2dyYXZpdHknXSksXHJcbiAgICB1dGlscy5nZW5lcmF0ZU1vdW50T25seVByb3BNYXAoe1xyXG4gICAgICAgIGJvZHlQaHlzaWNzOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBwaHlzaWNzID0gbm9kZXMuZ2FtZSgpLnBoeXNpY3MsXHJcbiAgICAgICAgICAgICAgICBzeXN0ZW0gPSB2YWx1ZSAhPT0gdHJ1ZSA/IHZhbHVlIDogcGh5c2ljcy5zeXN0ZW07XHJcblxyXG4gICAgICAgICAgICBub2Rlcy5nYW1lKCkucGh5c2ljcy5lbmFibGUobm9kZS5vYmosIHN5c3RlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2N1c3RvbS9ib2R5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5SZXNldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ3Ntb290aGVkJ10pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TbW9vdGhlZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcclxuICAgIGdyb3VwUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cCcpLFxyXG5cclxuICAgIHVwZGF0ZUdyb3VwID0gdXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoZ3JvdXBQcm9wZXJ0ZXMpLFxyXG5cclxuICAgIG1vdW50R3JvdXAgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JvdXAobm9kZXMuZ2FtZSgpKTtcclxuICAgICAgICB1dGlscy5hZGROb2RlRGlzcGxheU9iamVjdChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgdXBkYXRlR3JvdXAobm9kZXMsIG5vZGUpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50R3JvdXAsXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcm91cFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyb3VwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lcicpLFxyXG4gICAgZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydlbmFibGVCb2R5J10pXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBtb3VudEFuaW1hdGlvbiA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gbm9kZXMuYnlJZChub2RlLnBhcmVudCk7XHJcbiAgICAgICAgbm9kZS5vYmogPSBwYXJlbnROb2RlLm9iai5hbmltYXRpb25zLmFkZChub2RlLnByb3BzLmlkLCBub2RlLnByb3BzLmZyYW1lcywgbm9kZS5wcm9wcy5mcHMsIG5vZGUucHJvcHMubG9vcCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRBbmltYXRpb24sXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBudWxsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvYW5pbWF0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIG1vdW50Q3Vyc29ycyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgdmFyIG9uSW5wdXQgPSBub2RlLnByb3BzLm9uSW5wdXQsXHJcbiAgICAgICAgY3Vyc29ycyA9IG5vZGVzLmdhbWUoKS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcblxyXG4gICAgbm9kZS5vYmogPSB7XHJcbiAgICAgICAgY3Vyc29yczogY3Vyc29ycyxcclxuICAgICAgICBjYWxsYmFjazogb25JbnB1dC5iaW5kKG51bGwsIGN1cnNvcnMsIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5ieU5hbWUobmFtZSkub2JqO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIG5vZGVzLmdhbWVOb2RlLnVwZGF0ZU1ldGhvZHMucHVzaChub2RlLm9iai5jYWxsYmFjayk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudEN1cnNvcnMsXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBudWxsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvY3Vyc29ycy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBtb3VudENvbGxpZGVzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICB2YXIgY29sbGlkZXNXaXRoSWQgPSBub2Rlcy5pZEJ5TmFtZShub2RlLnByb3BzLndpdGgpO1xyXG4gICAgbm9kZS5vYmogPSBbbm9kZS5wYXJlbnQsIGNvbGxpZGVzV2l0aElkXTtcclxuICAgIG5vZGVzLmdhbWVOb2RlLmNvbGxpc2lvbnMucHVzaChub2RlLm9iaik7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudENvbGxpZGVzLFxyXG4gICAgdW5tb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogbnVsbFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2NvbGxpZGVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIG1vdW50Q29sbGlkZXMgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgIHZhciBvdmVybGFwc1dpdGhJZCA9IG5vZGVzLmlkQnlOYW1lKG5vZGUucHJvcHMud2l0aCk7XHJcbiAgICBub2RlLm9iaiA9IHtcclxuICAgICAgICBwYWlyOiBbbm9kZS5wYXJlbnQsIG92ZXJsYXBzV2l0aElkXSxcclxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgbm9kZS5wcm9wcy5vbk92ZXJsYXAobm9kZXMuYnlJZChhLnJub2RlaWQpLCBub2Rlcy5ieUlkKGIucm5vZGVpZCkpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBub2Rlcy5nYW1lTm9kZS5vdmVybGFwcy5wdXNoKG5vZGUub2JqKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50Q29sbGlkZXMsXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBudWxsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvb3ZlcmxhcHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyksXHJcbiAgICB0ZXh0UHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0JyksXHJcblxyXG4gICAgdXBkYXRlVGV4dCA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKHRleHRQcm9wZXJ0ZXMpLFxyXG4gICAgXHJcbiAgICBtb3VudFRleHQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzO1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5UZXh0KG5vZGVzLmdhbWUoKSwgcHJvcHMueCwgcHJvcHMueSwgcHJvcHMudGV4dCwgcHJvcHMuc3R5bGUpO1xyXG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgdW5tb3VudFRleHQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iai5raWxsKCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRUZXh0LFxyXG4gICAgdW5tb3VudDogdW5tb3VudFRleHQsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZVRleHRcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy90ZXh0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5TcHJpdGUnKSxcclxuICAgIHV0aWxzLmdlbmVyYXRlQmFzaWNQcm9wTWFwKFsndGV4dCddKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlRleHQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyksXHJcbiAgICBidXR0b25Qcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbicpLFxyXG5cclxuICAgIHVwZGF0ZUJ1dHRvbiA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGJ1dHRvblByb3BlcnRlcyksXHJcblxyXG4gICAgbW91bnRCdXR0b24gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzLFxyXG4gICAgICAgICAgICBrZXkgPSBwcm9wcy5hc3NldEtleTtcclxuXHJcbiAgICAgICAgbm9kZS5idXR0b24gPSBuZXcgUGhhc2VyLkJ1dHRvbihcclxuICAgICAgICAgICAgICAgIG5vZGVzLmdhbWUoKSxcclxuICAgICAgICAgICAgICAgIHByb3BzLngsXHJcbiAgICAgICAgICAgICAgICBwcm9wcy55LFxyXG4gICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgcHJvcHMub25DbGljayxcclxuICAgICAgICAgICAgICAgIG5vZGUsXHJcbiAgICAgICAgICAgICAgICBwcm9wcy5mcmFtZXNbMF0sXHJcbiAgICAgICAgICAgICAgICBwcm9wcy5mcmFtZXNbMV0sXHJcbiAgICAgICAgICAgICAgICBwcm9wcy5mcmFtZXNbMl0sXHJcbiAgICAgICAgICAgICAgICBwcm9wcy5mcmFtZXNbM11cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUucHJvcHMuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyb3VwKG5vZGVzLmdhbWUoKSk7XHJcbiAgICAgICAgICAgIG5vZGUub2JqLmFkZChub2RlLmJ1dHRvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZS5vYmogPSBub2RlLmJ1dHRvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcclxuICAgICAgICB1cGRhdGVCdXR0b24obm9kZXMsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50QnV0dG9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50QnV0dG9uLFxyXG4gICAgdW5tb3VudDogdW5tb3VudEJ1dHRvbixcclxuICAgIHVwZGF0ZTogdXBkYXRlQnV0dG9uXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvYnV0dG9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5JbWFnZScpXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQnV0dG9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuU3ByaXRlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ29yZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Cb3VuZHMnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ3JvcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlbHRhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVzdHJveScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxvYWRUZXh0dXJlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuT3ZlcmxhcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlJlc2V0JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuU21vb3RoZWQnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkltYWdlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKSxcclxuICAgIGdyYXBoaWNzUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5HcmFwaGljcycpLFxyXG5cclxuICAgIHVwZGF0ZUdyYXBoaWNzID0gdXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoZ3JhcGhpY3NQcm9wZXJ0ZXMpLFxyXG5cclxuICAgIGl0ZW1UeXBlcyA9IHJlcXVpcmUoJy4vcmVuZGVyZXJzJyksXHJcblxyXG4gICAgbW91bnRHcmFwaGljcyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHM7XHJcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyYXBoaWNzKG5vZGVzLmdhbWUoKSwgcHJvcHMueCwgcHJvcHMueSk7XHJcbiAgICAgICAgdXRpbHMuYWRkTm9kZURpc3BsYXlPYmplY3Qobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgIHVwZGF0ZUdyYXBoaWNzKG5vZGVzLCBub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgdW5tb3VudEdyYXBoaWNzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGlsZHJlbk1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZXMuY2FuY2VsVHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24obm9kZS5pZCk7XHJcbiAgICAgICAgZHJhdyhub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZHJhdyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmNsZWFyKCk7XHJcbiAgICAgICAgZHJhdyhub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRyYXcgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuYnlJZChub2RlLmNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlc1tjaGlsZC50YWddKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZXNbY2hpbGQudGFnXS5kcmF3KG5vZGVzLCBjaGlsZCwgbm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50R3JhcGhpY3MsXHJcbiAgICBjaGlsZHJlbk1vdW50OiBjaGlsZHJlbk1vdW50LFxyXG4gICAgdW5tb3VudDogdW5tb3VudEdyYXBoaWNzLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcmFwaGljcyxcclxuICAgIG5vdGlmeVRyYW5zYWN0aW9uOiByZWRyYXdcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9ncmFwaGljcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuR3JhcGhpY3MnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Db3JlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5nbGUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3knKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHknKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5SZXNldCcpXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXInKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkdyYXBoaWNzLmpzXG4gKiovIiwidmFyIGNyZWF0ZUdyYXBoaWNzTm9kZSA9IHJlcXVpcmUoJy4vY3JlYXRlLWdyYXBoaWNzLWl0ZW0nKSxcclxuXHJcbiAgICByZW5kZXJlcnMgPSB7XHJcbiAgICAgICAgY2lyY2xlOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd0NpcmNsZShcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueCB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuZGlhbWV0ZXIgfHwgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjdDogZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdSZWN0KFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy53aWR0aCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5oZWlnaHQgfHwgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZTogZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbyhcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueDEgfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkxIHx8IDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueDIgfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkyIHx8IDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5ldG86IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oXHJcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkgfHwgMClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGN1cnZldG86IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5xdWFkcmF0aWNDdXJ2ZVRvKFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5jcHggKyB4MCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuY3B5ICsgeTAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLnggKyB4MCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMueSArIHkwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFwZTogZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIHZhciBzeDAgPSB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICBzeTAgPSB5MCArIChub2RlLnByb3BzLnkgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLnByb3BzLnMucmVwbGFjZSgvXFxzL2csICcnKS5tYXRjaCgvKFthLXpdWzAtOSxdKykvZyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IHBhcnQuY2hhckF0KDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gcGFydC5tYXRjaCgvWzAtOV0rL2cpLm1hcChmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8odlswXSArIHN4MCwgdlsxXSArIHN5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5kcmF3Q2lyY2xlKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTAsIHZbMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3InOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QodlswXSArIHN4MCwgdlsxXSArIHN5MCwgdlsyXSwgdlszXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8odlswXSArIHN4MCwgdlsxXSArIHN5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5xdWFkcmF0aWNDdXJ2ZVRvKHZbMF0sIHZbMV0sIHZbMl0gKyBzeDAsIHZbM10gKyBzeTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuYnlJZChub2RlLmNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlcnNbY2hpbGQudGFnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyc1tjaGlsZC50YWddKG5vZGVzLCBjaGlsZCwgZ3JhcGhpY3MsIHN4MCwgc3kwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzKHJlbmRlcmVycykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHR5cGUpIHtcclxuICAgIGFjY1t0eXBlXSA9IGNyZWF0ZUdyYXBoaWNzTm9kZShyZW5kZXJlcnNbdHlwZV0pO1xyXG4gICAgcmV0dXJuIGFjYztcclxufSwge30pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcmVycy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjcmVhdGUgPSBmdW5jdGlvbiAoZHJhdykge1xyXG5cclxuICAgIHZhciByZXF1ZXN0Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgICAgIHZhciBncmFwaGljcyA9IG5vZGVzLnBhcmVudChub2RlLCAnZ3JhcGhpY3MnKTtcclxuICAgICAgICAgICAgaWYgKGdyYXBoaWNzKSB7XHJcbiAgICAgICAgICAgICAgICBub2Rlcy5yZXF1ZXN0VHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24oZ3JhcGhpY3MuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVxdWVzdE5vdGlmaWNhdGlvbk9uVXBkYXRlID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBjaGFuZ2VQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlUHJvcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdE5vdGlmaWNhdGlvbihub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgZHJhd1dyYXBwZXIgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgdmFyIGZpbGwgPSB0eXBlb2Ygbm9kZS5wcm9wcy5maWxsICE9PSAndW5kZWZpbmVkJyxcclxuICAgICAgICAgICAgICAgIGxpbmUgPSB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2UhPT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2VXaWR0aCAhPT0gJ3VuZGVmaW5lZCcgfHxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2VBbHBoYSAhPT0gJ3VuZGVmaW5lZCc7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHR5cGVvZiBub2RlLnByb3BzLmZpbGwgIT09ICd1bmRlZmluZWQnID8gbm9kZS5wcm9wcy5maWxsIDogMHgwMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbEFscGhhID0gdHlwZW9mIG5vZGUucHJvcHMuZmlsbEFscGhhID09PSAnbnVtYmVyJyA/IG5vZGUucHJvcHMuZmlsbEFscGhhIDogMTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmJlZ2luRmlsbChmaWxsQ29sb3IsIGZpbGxBbHBoYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxpbmUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lQ29sb3IgPSB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2UgIT09ICd1bmRlZmluZWQnID8gbm9kZS5wcm9wcy5zdHJva2UgOiAweDAwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQWxwaGEgPSB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2VBbHBoYSA9PT0gJ251bWJlcicgPyBub2RlLnByb3BzLnN0cm9rZUFscGhhIDogMSxcclxuICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGggPSB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2VXaWR0aCA9PT0gJ251bWJlcicgPyBub2RlLnByb3BzLnN0cm9rZVdpZHRoIDogMTtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVTdHlsZShsaW5lV2lkdGgsIGxpbmVDb2xvciwgbGluZUFscGhhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVTdHlsZSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhdyhub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdW50OiByZXF1ZXN0Tm90aWZpY2F0aW9uLFxyXG4gICAgICAgIHVubW91bnQ6IHJlcXVlc3ROb3RpZmljYXRpb24sXHJcbiAgICAgICAgdXBkYXRlOiByZXF1ZXN0Tm90aWZpY2F0aW9uT25VcGRhdGUsXHJcbiAgICAgICAgZHJhdzogZHJhd1dyYXBwZXJcclxuICAgIH07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9jcmVhdGUtZ3JhcGhpY3MtaXRlbS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyksXHJcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcclxuXHJcbiAgICB1cGRhdGVHcmFwaGljcyA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyYXBoaWNzUHJvcGVydGVzKSxcclxuXHJcbiAgICBpdGVtVHlwZXMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpLFxyXG5cclxuICAgIG1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JhcGhpY3Mobm9kZXMuZ2FtZSgpLCAwLCAwKTtcclxuICAgICAgICB1cGRhdGVHcmFwaGljcyhub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVubW91bnRHcmFwaGljcyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGlsZHJlbk1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgZHJhdyhub2Rlcywgbm9kZSk7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IFBoYXNlci5SZW5kZXJUZXh0dXJlKG5vZGVzLmdhbWUoKSwgbm9kZS5vYmoud2lkdGgsIG5vZGUub2JqLmhlaWdodCk7XHJcbiAgICAgICAgdGV4dHVyZS5yZW5kZXJYWShub2RlLm9iaiwgMCwgMCk7XHJcbiAgICAgICAgbm9kZS5vYmouZGVzdHJveSgpO1xyXG4gICAgICAgIG5vZGUub2JqID0gdGV4dHVyZTtcclxuICAgICAgICBub2Rlcy5nYW1lKCkuY2FjaGUuYWRkUmVuZGVyVGV4dHVyZShub2RlLnByb3BzLmFzc2V0S2V5LCB0ZXh0dXJlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZHJhdyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBub2Rlcy5ieUlkKG5vZGUuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGVzW2NoaWxkLnRhZ10pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlc1tjaGlsZC50YWddLmRyYXcobm9kZXMsIGNoaWxkLCBub2RlLm9iaiwgMCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRHcmFwaGljcyxcclxuICAgIGNoaWxkcmVuTW91bnQ6IGNoaWxkcmVuTW91bnQsXHJcbiAgICB1bm1vdW50OiB1bm1vdW50R3JhcGhpY3MsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUdyYXBoaWNzXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVydGV4dHVyZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyksXHJcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcclxuXHJcbiAgICB1cGRhdGVHcmFwaGljcyA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyYXBoaWNzUHJvcGVydGVzKSxcclxuXHJcbiAgICBpdGVtVHlwZXMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpLFxyXG5cclxuICAgIG1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JhcGhpY3Mobm9kZXMuZ2FtZSgpLCAwLCAwKTtcclxuICAgICAgICB1cGRhdGVHcmFwaGljcyhub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVubW91bnRHcmFwaGljcyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGlsZHJlbk1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgZHJhdyhub2Rlcywgbm9kZSk7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IFBoYXNlci5SZW5kZXJUZXh0dXJlKG5vZGVzLmdhbWUoKSwgbm9kZS5vYmoud2lkdGgsIG5vZGUub2JqLmhlaWdodCk7XHJcbiAgICAgICAgdGV4dHVyZS5yZW5kZXJYWShub2RlLm9iaiwgMCwgMCk7XHJcbiAgICAgICAgdmFyIHVybCA9IHRleHR1cmUuZ2V0QmFzZTY0KCk7XHJcbiAgICAgICAgdGV4dHVyZS5kZXN0cm95KCk7XHJcbiAgICAgICAgbm9kZS5vYmouZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBpZiAobm9kZS5wcm9wcy5mcmFtZVdpZHRoIHx8IG5vZGUucHJvcHMuZnJhbWVIZWlnaHQpIHtcclxuICAgICAgICAgICAgdmFyIHcgPSBub2RlLnByb3BzLmZyYW1lV2lkdGggfHwgdGV4dHVyZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGggPSBub2RlLnByb3BzLmZyYW1lSGVpZ2h0IHx8IHRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgbm9kZS5vYmogPSBub2Rlcy5nYW1lKCkubG9hZC5zcHJpdGVzaGVldChub2RlLnByb3BzLmFzc2V0S2V5LCB1cmwsIHcsIGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gbm9kZXMuZ2FtZSgpLmxvYWQuaW1hZ2Uobm9kZS5wcm9wcy5hc3NldEtleSwgdXJsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRyYXcgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuYnlJZChub2RlLmNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlc1tjaGlsZC50YWddKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZXNbY2hpbGQudGFnXS5kcmF3KG5vZGVzLCBjaGlsZCwgbm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50R3JhcGhpY3MsXHJcbiAgICBjaGlsZHJlbk1vdW50OiBjaGlsZHJlbk1vdW50LFxyXG4gICAgdW5tb3VudDogdW5tb3VudEdyYXBoaWNzLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcmFwaGljc1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcmltYWdlLmpzXG4gKiovIiwidmFyIG5vZGVNYW5hZ2VyID0gcmVxdWlyZSgnLi9ub2RlLW1hbmFnZXInKSxcclxuICAgIGxvYWRBc3NldHMgPSByZXF1aXJlKCcuL2Fzc2V0cycpLFxyXG5cclxuICAgIHByZWxvYWRUYWdzID0gWydhc3NldHMnXSxcclxuXHJcbiAgICBpbml0ID0gZnVuY3Rpb24gKG5vZGVzKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZXMuZ2FtZU5vZGUucHJvcHM7XHJcblxyXG4gICAgICAgIHZhciBnYW1lSW1wbCA9IHtcclxuICAgICAgICAgICAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZEFzc2V0cyhub2RlTWFuYWdlciwgbm9kZXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVNYW5hZ2VyLm1vdW50KG5vZGVzLCBub2Rlcy5nYW1lTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5pbml0Q2hpbGRyZW4obm9kZXMsIG5vZGVzLmdhbWVOb2RlLmNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAobm9kZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZWxvYWRUYWdzLmluZGV4T2Yobm9kZXMuYnlJZChub2RlSWQpLnRhZykgPCAwO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMuZ2FtZU5vZGUuY29sbGlzaW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gbm9kZXMuZ2FtZU5vZGUuY29sbGlzaW9uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5nYW1lTm9kZS5vYmoucGh5c2ljcy5hcmNhZGUuY29sbGlkZShub2Rlcy5pZHNbY1swXV0ub2JqLCBub2Rlcy5pZHNbY1sxXV0ub2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBub2Rlcy5nYW1lTm9kZS5vdmVybGFwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdmVybGFwID0gbm9kZXMuZ2FtZU5vZGUub3ZlcmxhcHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZ2FtZU5vZGUub2JqLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzLmlkc1tvdmVybGFwLnBhaXJbMF1dLm9iaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMuaWRzW292ZXJsYXAucGFpclsxXV0ub2JqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGFwLmNhbGxiYWNrLCBudWxsLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBub2Rlcy5nYW1lTm9kZS51cGRhdGVNZXRob2RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZ2FtZU5vZGUudXBkYXRlTWV0aG9kc1tpXSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBub2Rlcy5nYW1lTm9kZS5vYmogPSBuZXcgUGhhc2VyLkdhbWUocHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCwgcHJvcHMubW9kZSB8fCBQaGFzZXIuQVVUTywgJycsIGdhbWVJbXBsKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGluaXQ7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvaW5pdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBsb2FkQXNzZXRzID0gZnVuY3Rpb24gKG5vZGVNYW5hZ2VyLCBub2Rlcykge1xyXG4gICAgdmFyIGdhbWVOb2RlID0gbm9kZXMuZ2FtZU5vZGUsXHJcbiAgICAgICAgYXNzZXRzID0gZ2FtZU5vZGUucHJvcHMuYXNzZXRzO1xyXG5cclxuICAgIGlmIChhc3NldHMpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhhc3NldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgYXNzZXQgPSBhc3NldHNba2V5XTtcclxuICAgICAgICAgICAgc3dpdGNoIChhc3NldC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZU5vZGUub2JqLmxvYWQuaW1hZ2Uoa2V5LCBhc3NldC5zcmMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3ByaXRlc2hlZXQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOb2RlLm9iai5sb2FkLnNwcml0ZXNoZWV0KGtleSwgYXNzZXQuc3JjLCBhc3NldC53aWR0aCwgYXNzZXQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhc3NldHNJZHMgPSBnYW1lTm9kZS5jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKG5vZGVJZCkge1xyXG4gICAgICAgIHJldHVybiBub2Rlcy5ieUlkKG5vZGVJZCkudGFnID09PSAnYXNzZXRzJztcclxuICAgIH0pO1xyXG5cclxuICAgIG5vZGVNYW5hZ2VyLmluaXRDaGlsZHJlbihub2RlcywgYXNzZXRzSWRzKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWRBc3NldHM7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvYXNzZXRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIE5vZGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nYW1lTm9kZSA9IG51bGw7XHJcbiAgICB0aGlzLmlkcyA9IHt9O1xyXG4gICAgdGhpcy5uYW1lMmlkID0ge307XHJcbiAgICB0aGlzLmlkMm5hbWUgPSB7fTtcclxuICAgIHRoaXMubm90aWZ5VHJhbnNhY3Rpb24gPSBbXTtcclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS5zZXRHYW1lTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICB0aGlzLmdhbWVOb2RlID0gbm9kZTsgIFxyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLnJlcXVlc3RUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcclxuICAgIGlmICh0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLmluZGV4T2Yobm9kZWlkKSA8IDApIHtcclxuICAgICAgICB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLnB1c2gobm9kZWlkKTtcclxuICAgIH1cclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS5jYW5jZWxUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMubm90aWZ5VHJhbnNhY3Rpb24uaW5kZXhPZihub2RlaWQpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUucG9wVHJhbnNhY3Rpb25MaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5ub3RpZnlUcmFuc2FjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubm90aWZ5VHJhbnNhY3Rpb247XHJcbiAgICAgICAgdGhpcy5ub3RpZnlUcmFuc2FjdGlvbiA9IFtdO1xyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLmdhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nYW1lTm9kZS5vYmo7XHJcbn07XHJcblxyXG5cclxuTm9kZXMucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIHRoaXMuaWRzW25vZGUuaWRdID0gbm9kZTtcclxuICAgIGlmIChub2RlLnByb3BzLm5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUyaWRbbm9kZS5wcm9wcy5uYW1lXSA9IG5vZGUuaWQ7XHJcbiAgICAgICAgdGhpcy5pZDJuYW1lW25vZGUuaWRdID0gbm9kZS5wcm9wcy5uYW1lO1xyXG4gICAgfVxyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChub2RlLCBsYXN0UHJvcHMpIHtcclxuICAgIGlmIChsYXN0UHJvcHMubmFtZSAhPT0gbm9kZS5wcm9wcy5uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubmFtZTJpZFtsYXN0UHJvcHMubmFtZV07XHJcbiAgICAgICAgdGhpcy5uYW1lMmlkW25vZGUucHJvcHMubmFtZV0gPSBub2RlLmlkO1xyXG4gICAgICAgIHRoaXMuaWQybmFtZVtub2RlLmlkXSA9IG5vZGUucHJvcHMubmFtZTtcclxuICAgIH1cclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS51bnJlZ2lzdGVyID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIGRlbGV0ZSB0aGlzLmlkc1tub2RlLmlkXTtcclxuICAgIGlmIChub2RlLnByb3BzLm5hbWUpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5uYW1lMmlkW25vZGUucHJvcHMubmFtZV07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaWQybmFtZVtub2RlLmlkXTtcclxuICAgIH1cclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS5ieUlkID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pZHNbaWRdO1xyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLmlkQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWUyaWRbbmFtZV07XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUuYnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmlkc1t0aGlzLm5hbWUyaWRbbmFtZV1dO1xyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uIChub2RlLCB0YWcpIHtcclxuICAgIHdoaWxlKHRydWUpIHtcclxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5pZHNbbm9kZS5wYXJlbnRdO1xyXG4gICAgICAgIGlmICghcGFyZW50IHx8IHBhcmVudC50YWcgPT09IHRhZykge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBwYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOb2RlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL25vZGVzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==