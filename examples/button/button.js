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
	var init = __webpack_require__(123);
	var Nodes = __webpack_require__(125);
	
	var nodes = new Nodes();
	var running = false;
	
	module.exports = {
	    components: {
	        mount: function mount(id, tag, props, parent) {
	            invariant(!(tag === 'game' && nodes.gameNode), 'Only one game node can be mounted.');
	            invariant(!(tag !== 'game' && !parent), 'Only \'game\' can be root node.');
	            invariant(!(props.name && nodes.byName(props.name)), 'Cannot repeat names.');
	
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
	    collides: __webpack_require__(103),
	    overlaps: __webpack_require__(105),
	    text: __webpack_require__(106),
	    button: __webpack_require__(108)
	}, __webpack_require__(111), __webpack_require__(119));

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
	    node.update = function () {
	        var context = nodes.context();
	
	        for (var i = 0; i < node._updateMethods.length; i++) {
	            node._updateMethods[i](context);
	        }
	    };
	
	    if (node.props.hasOwnProperty('physics')) {
	        node.obj.physics.startSystem(node.props.physics);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var invariant = __webpack_require__(63),
	    generateBasicPropMap = function generateBasicPropMap(props) {
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
	},
	    generateFixedPropMap = function generateFixedPropMap(props) {
	    return props.reduce(function (acc, prop) {
	        acc[prop] = function (nodes, node, value, isNew) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var systemName = __webpack_require__(104),
	    mountCollides = function mountCollides(nodes, node) {
	    var a = nodes.byId(node.parent),
	        b = nodes.byName(node.props.with),
	        name = systemName(node.props.system);
	
	    node.obj = {
	        a: a,
	        b: b,
	        onUpdate: function onUpdate(context) {
	            context.game.physics[name].collide(a.obj, b.obj);
	        }
	    };
	
	    nodes.gameNode.addUpdateListener(node.obj.onUpdate);
	},
	    unmountCollides = function unmountCollides(nodes, node) {
	    nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
	};
	
	module.exports = {
	    mount: mountCollides,
	    unmount: unmountCollides,
	    update: null
	};

/***/ },
/* 104 */
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var systemName = __webpack_require__(104),
	    mountOverlaps = function mountOverlaps(nodes, node) {
	    var a = nodes.byId(node.parent),
	        b = nodes.byName(node.props.with),
	        name = systemName(node.props.system),
	        onOverlap = node.props.onOverlap;
	
	    node.obj = {
	        a: a,
	        b: b,
	        onUpdate: function onUpdate(context) {
	            context.game.physics[name].overlap(a.obj, b.obj, function (overlappingA, overlappingB) {
	                onOverlap(nodes.byId(overlappingA.rnodeid), nodes.byId(overlappingB.rnodeid), context, a, b);
	            });
	        }
	    };
	
	    nodes.gameNode.addUpdateListener(node.obj.onUpdate);
	},
	    unmountOverlaps = function unmountOverlaps(nodes, node) {
	    nodes.gameNode.removeUpdateListener(node.obj.onUpdate);
	};
	
	module.exports = {
	    mount: mountOverlaps,
	    unmount: unmountOverlaps,
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
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({
	    graphics: __webpack_require__(112),
	    rendertexture: __webpack_require__(117),
	    renderimage: __webpack_require__(118)
	}, __webpack_require__(115));

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    graphicsPropertes = __webpack_require__(113),
	    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(115),
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(114), __webpack_require__(78), __webpack_require__(79), __webpack_require__(81), __webpack_require__(82), __webpack_require__(86), __webpack_require__(87), __webpack_require__(90), __webpack_require__(91), __webpack_require__(92), __webpack_require__(95), __webpack_require__(97));

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(69);
	
	module.exports = extend({}, __webpack_require__(75));

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createGraphicsNode = __webpack_require__(116),
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
/* 116 */
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    graphicsPropertes = __webpack_require__(113),
	    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(115),
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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    graphicsPropertes = __webpack_require__(113),
	    updateGraphics = utils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(115),
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    input: __webpack_require__(120),
	    key: __webpack_require__(121)
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    defaultPointerNumber = 2,
	    events = ["onDown", "onUp", "onTap", "onHold"],
	    mountInput = function mountInput(nodes, node) {
	    var context = nodes.context();
	    if (!context.input) {
	        var game = nodes.game(),
	            pointerCount = node.props.pointers || defaultPointerNumber,
	            input = {
	            mousePointer: game.input.mousePointer,
	            activePointer: game.input.activePointer,
	            pointers: []
	        };
	
	        node.obj = {
	            input: input
	        };
	        context.input = input;
	
	        for (var i = 0; i < pointerCount; i++) {
	            if (i >= defaultPointerNumber) {
	                game.input.addPointer();
	            }
	            input.pointers[i] = game.input['pointer' + (i + 1)];
	        }
	
	        events.forEach(function (event) {
	            var listener = node.props[event];
	            if (listener) {
	                game.input[event].add(function (pointer) {
	                    listener(pointer, context);
	                });
	            }
	        });
	
	        if (node.props.cursors) {
	            input.cursors = game.input.keyboard.createCursorKeys();
	        }
	
	        if (node.props.keys) {
	            input.keys = Object.keys(node.props.keys).reduce(function (acc, key) {
	                acc[key] = game.input.keyboard.addKey(node.props.keys[key]);
	            }, {});
	        }
	
	        if (node.props.onInput) {
	            nodes.gameNode.addUpdateListener(node.props.onInput);
	        }
	    }
	};
	
	module.exports = {
	    mount: mountInput,
	    unmount: function unmount() {},
	    update: null
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(72),
	    keyPropertes = __webpack_require__(122),
	    updateKey = utils.genPropertyMapUpdate(keyPropertes),
	    events = ["onDown", "onUp", "onTap", "onHold"],
	    mountKey = function mountKey(nodes, node) {
	    var context = nodes.context();
	    if (context.input && node.props.keyName && node.props.keyCode) {
	        var game = nodes.game(),
	            input = context.input,
	            key = game.input.keyboard.addKey(node.props.keyCode);
	
	        if (!input.keys) {
	            input.keys = {};
	        }
	
	        node.obj = key;
	        input.keys[node.props.keyName] = node.obj;
	
	        events.forEach(function (event) {
	            var listener = node.props[event];
	            if (listener) {
	                key[event].add(function (key) {
	                    listener(key, context);
	                });
	            }
	        });
	    }
	},
	    unmountKey = function unmountKey(nodes, node) {
	    if (node.obj) {
	        var game = nodes.game(),
	            context = nodes.context();
	
	        game.input.keyboard.removeKey(node.obj.keyCode);
	        delete context.input[node.props.keyName];
	    }
	};
	
	module.exports = {
	    mount: mountKey,
	    unmount: unmountKey,
	    update: updateKey
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(77);
	
	module.exports = utils.generateFixedPropMap(['keyName', 'keyCode']);

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var nodeManager = __webpack_require__(67),
	    loadAssets = __webpack_require__(124),
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
	            nodes.gameNode.update();
	        }
	    };
	    nodes.setGame(new Phaser.Game(props.width, props.height, props.mode || Phaser.AUTO, '', gameImpl));
	};
	
	module.exports = init;

/***/ },
/* 124 */
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
/* 125 */
/***/ function(module, exports) {

	'use strict';
	
	var Nodes = function Nodes() {
	    this.gameNode = null;
	    this.ids = {};
	    this.name2node = {};
	    this.notifyTransaction = [];
	};
	
	Nodes.prototype.setGameNode = function (node) {
	    this.gameNode = node;
	};
	
	Nodes.prototype.setGame = function (game) {
	    this.gameNode.obj = game;
	    this._context = {
	        game: game,
	        nodes: this.name2node
	    };
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
	        this.name2node[node.props.name] = node;
	    }
	};
	
	Nodes.prototype.update = function (node, lastProps) {
	    if (lastProps.name !== node.props.name) {
	        delete this.name2node[lastProps.name];
	        this.name2node[node.props.name] = node;
	    }
	};
	
	Nodes.prototype.unregister = function (node) {
	    delete this.ids[node.id];
	    if (node.props.name) {
	        delete this.name2node[node.props.name];
	    }
	};
	
	Nodes.prototype.byId = function (id) {
	    return this.ids[id];
	};
	
	Nodes.prototype.byName = function (name) {
	    return this.name2node[name];
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
	
	Nodes.prototype.context = function () {
	    return this._context;
	};
	
	module.exports = Nodes;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzI5N2M4YWU4M2ZlNDgyNzY0ODgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4YW1wbGVzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmF0aXZlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUG9vbGVkQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8uL34vb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvZ2V0SXRlcmF0b3JGbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEluc3RydW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERlYnVnVG9vbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvZW1wdHlPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25zLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIva2V5TWlycm9yLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIva2V5T2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvbWFwT2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9vbmx5Q2hpbGQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFBlcmYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ01vdW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RJbnN0YW5jZU1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFVwZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvQ2FsbGJhY2tRdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEZlYXR1cmVGbGFncy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFJlY29uY2lsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RSZWYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RPd25lci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9UcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFcnJvclV0aWxzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Tm9kZVR5cGVzLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL3Nob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RW1wdHlDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0luamVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkUmVjb25jaWxlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9mbGF0dGVuQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9OYXRpdmVJbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9ub2RlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9leHRlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5TcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuU3ByaXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL3V0aWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkNyb3AuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVsdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVzdHJveS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5MaWZlU3Bhbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvY3VzdG9tL2JvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUmVzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU21vb3RoZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9hbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvY29sbGlkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcGh5c2ljLXN5c3RlbS1uYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL292ZXJsYXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL3RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkltYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2dyYXBoaWNzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuR3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2NyZWF0ZS1ncmFwaGljcy1pdGVtLmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcnRleHR1cmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5wdXQvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5wdXQva2V5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvY3VzdG9tL2tleS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbXBsL2Fzc2V0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9ub2Rlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQUksUUFBUSxvQkFBUSxDQUFSLENBQVI7S0FFQSxTQUFTO0FBQ0wsWUFBTyxFQUFDLE1BQU0sT0FBTixFQUFlLEtBQUssbUJBQUwsRUFBdkI7QUFDQSxlQUFVLEVBQUMsTUFBTSxPQUFOLEVBQWUsS0FBSyx3QkFBTCxFQUExQjtBQUNBLGFBQVEsRUFBQyxNQUFNLE9BQU4sRUFBZSxLQUFLLG9CQUFMLEVBQXhCO0FBQ0EsYUFBUSxFQUFDLE1BQU0sYUFBTixFQUFxQixLQUFLLG9CQUFMLEVBQTJCLE9BQU8sRUFBUCxFQUFXLFFBQVEsRUFBUixFQUFwRTtBQUNBLGVBQVUsRUFBQyxNQUFNLGFBQU4sRUFBcUIsS0FBSyxtQ0FBTCxFQUEwQyxPQUFPLEdBQVAsRUFBWSxRQUFRLEVBQVIsRUFBdEY7RUFMSjtLQVFBLGFBQWE7QUFDVCxlQUFVLE1BQVY7QUFDQSxXQUFNLE1BQU47RUFGSjtLQUtBLFNBQVMsTUFBTSxXQUFOLENBQWtCOzs7QUFDdkIsc0JBQWlCLDJCQUFZO0FBQ3pCLGdCQUFPO0FBQ0gsb0JBQU8sTUFBTSxLQUFO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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUMxRnRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFVBQVU7QUFDckIsWUFBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsR0FBRztBQUNkLFlBQVcsaUJBQWlCO0FBQzVCLFlBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxHQUFHO0FBQ2QsWUFBVyxVQUFVO0FBQ3JCLFlBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLElB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsUUFBUTtBQUNyQixjQUFhLFFBQVE7QUFDckIsZUFBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsUUFBUTtBQUNyQixjQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsUUFBUTtBQUNyQixjQUFhLFFBQVE7QUFDckIsY0FBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxzQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QztBQUM5QyxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUM7QUFDekMsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEMsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsMkJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SEFBNEg7QUFDNUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtPQUE4Tzs7QUFFOU87QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtOQUE4TjtBQUM5TjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsU0FBUztBQUNwQixZQUFXLFNBQVM7QUFDcEIsYUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFNBQVM7QUFDcEIsWUFBVyxTQUFTO0FBQ3BCLGFBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLFNBQVM7QUFDcEIsYUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUZBQXdGLGFBQWE7QUFDckc7QUFDQTs7QUFFQSx1REFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxlQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCOzs7Ozs7O0FDbHRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQseUM7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLHNCQUFzQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2QsZUFBYztBQUNkO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Qzs7Ozs7OztBQ3ZCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLGdCQUFnQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Qjs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRCxvQzs7Ozs7OztBQy9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSLDRCQUEyQjtBQUMzQixPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsS0FBSztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLDJCQUEwQjtBQUMxQixNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBLG9CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDOzs7Ozs7QUMzWEE7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QUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDbk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlSQUF3UjtBQUN4Ujs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QixlQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QixjQUFhLFVBQVU7QUFDdkIsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsV0FBVztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxXQUFXO0FBQ3hCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxXQUFXO0FBQ3hCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUM7Ozs7Ozs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUM7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLGVBQWU7QUFDMUIsWUFBVyxlQUFlO0FBQzFCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTBEO0FBQzFEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQjs7Ozs7OztBQ2hQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOztBQUVEOztBQUVBLGdDOzs7Ozs7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxlQUFlO0FBQzVCLGNBQWEsMERBQTBEO0FBQ3ZFLGNBQWEsUUFBUTtBQUNyQixjQUFhLFFBQVE7QUFDckIsZUFBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsZUFBZTtBQUM1QixjQUFhLGFBQWE7QUFDMUIsY0FBYSwwQkFBMEI7QUFDdkMsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsZUFBZTtBQUM1QixjQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtDOzs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkI7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUIsaUJBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixlQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsZUFBZTtBQUM1QixjQUFhLE9BQU87QUFDcEIsY0FBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsY0FBYSxlQUFlO0FBQzVCLGNBQWEsT0FBTztBQUNwQixjQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZCOzs7Ozs7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyw0QkFBNEI7QUFDdkM7QUFDQSxhQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLGVBQWMsMEJBQTBCO0FBQ3hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsT0FBTztBQUNwQixjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBLGVBQWMsRUFBRTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLDZCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLDJEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixnQ0FBZ0M7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxzREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDhCOzs7Ozs7O0FDdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCLGFBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFVBQVU7QUFDckIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNEM7Ozs7Ozs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsMERBQTBEO0FBQ3ZFLGNBQWEsUUFBUTtBQUNyQixjQUFhLFFBQVE7QUFDckIsY0FBYSxRQUFRO0FBQ3JCLGVBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUI7QUFDdkI7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLHVFQUFzRTtBQUN0RTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0pBQStJO0FBQy9JO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSwwQkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSwwQkFBMEI7QUFDdkMsY0FBYSxhQUFhO0FBQzFCLGNBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBOEI7QUFDOUIsa0NBQWlDLGtCQUFrQjtBQUNuRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxhQUFhO0FBQzFCLGNBQWEsT0FBTztBQUNwQixjQUFhLFFBQVE7QUFDckIsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsMEJBQTBCO0FBQ3ZDLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxjQUFhLDBCQUEwQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBeUQ7QUFDekQ7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGVBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLGVBQWU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUEsMEM7Ozs7Ozs7QUNqeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDRDOzs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsUUFBUTtBQUNuQixZQUFXLFNBQVM7QUFDcEIsWUFBVyxFQUFFO0FBQ2IsWUFBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDOzs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQzs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDekdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FB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QUFDVCxhQUFJLFNBQVMsS0FBSyxHQUFMLENBQVMsS0FBSyxNQUFMLENBQWxCLENBREs7QUFFVCxhQUFJLENBQUMsTUFBRCxJQUFXLE9BQU8sR0FBUCxLQUFlLEdBQWYsRUFBb0I7QUFDL0Isb0JBQU8sTUFBUCxDQUQrQjtVQUFuQyxNQUVPO0FBQ0gsb0JBQU8sTUFBUCxDQURHO1VBRlA7TUFGSjtFQURxQjs7QUFXekIsT0FBTSxTQUFOLENBQWdCLE9BQWhCLEdBQTBCLFlBQVk7QUFDbEMsWUFBTyxLQUFLLFFBQUwsQ0FEMkI7RUFBWjs7QUFJMUIsUUFBTyxPQUFQLEdBQWlCLEtBQWpCLEMiLCJmaWxlIjoiYnV0dG9uL2J1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzI5N2M4YWU4M2ZlNDgyNzY0ODhcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCcuLi9uYXRpdmUnKSxcclxuXHJcbiAgICBhc3NldHMgPSB7XHJcbiAgICAgICAgJ3NreSc6IHt0eXBlOiAnaW1hZ2UnLCBzcmM6ICcuLi9hc3NldHMvc2t5LnBuZyd9LFxyXG4gICAgICAgICdncm91bmQnOiB7dHlwZTogJ2ltYWdlJywgc3JjOiAnLi4vYXNzZXRzL3BsYXRmb3JtLnBuZyd9LFxyXG4gICAgICAgICdzdGFyJzoge3R5cGU6ICdpbWFnZScsIHNyYzogJy4uL2Fzc2V0cy9zdGFyLnBuZyd9LFxyXG4gICAgICAgICdkdWRlJzoge3R5cGU6ICdzcHJpdGVzaGVldCcsIHNyYzogJy4uL2Fzc2V0cy9kdWRlLnBuZycsIHdpZHRoOiAzMiwgaGVpZ2h0OiA0OH0sXHJcbiAgICAgICAgJ2J1dHRvbic6IHt0eXBlOiAnc3ByaXRlc2hlZXQnLCBzcmM6ICcuLi9hc3NldHMvYnV0dG9uX3Nwcml0ZV9zaGVldC5wbmcnLCB3aWR0aDogMTkzLCBoZWlnaHQ6IDcxfVxyXG4gICAgfSxcclxuXHJcbiAgICBzY29yZVN0eWxlID0ge1xyXG4gICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgZmlsbDogJyMwMDAnXHJcbiAgICB9LFxyXG5cclxuICAgIE15R2FtZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzOiBBcnJheS5hcHBseShudWxsLCB7bGVuZ3RoOiAxMn0pLm1hcChmdW5jdGlvbiAoXywgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbaSwgMC43ICsgTWF0aC5yYW5kb20oKSAqIDAuMl07XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgb25JbnB1dDogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IGNvbnRleHQubm9kZXMucGxheWVyLm9iaixcclxuICAgICAgICAgICAgICAgIGN1cnNvcnMgPSBjb250ZXh0LmlucHV0LmN1cnNvcnM7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3Vyc29ycy5sZWZ0LmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IC0xNTA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdsZWZ0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3Vyc29ycy5yaWdodC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAxNTA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5wbGF5KCdyaWdodCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYW5pbWF0aW9ucy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZnJhbWUgPSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY3Vyc29ycy51cC5pc0Rvd24gJiYgcGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvZHkudmVsb2NpdHkueSA9IC0zNTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsZWN0U3RhcjogZnVuY3Rpb24gKHBsYXllck5vZGUsIHN0YXJOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc3RhcnM6IHRoaXMuc3RhdGUuc3RhcnMuZmlsdGVyKGZ1bmN0aW9uIChfLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgIT09IHN0YXJOb2RlLnByb3BzLmk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLnN0YXRlLnNjb3JlICsgMTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFycyA9IHRoaXMuc3RhdGUuc3RhcnMubWFwKGZ1bmN0aW9uIChzdGFyLCBpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHNwcml0ZSBrZXk9e3N0YXJbMF19IGk9e2l9IHg9e3N0YXJbMF0gKiA3MH0geT17MH0gYXNzZXRLZXk9XCJzdGFyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlHcmF2aXR5WT17MTh9IGJvZHlCb3VuY2VZPXtzdGFyWzFdfS8+XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Z2FtZSBhc3NldHM9e2Fzc2V0c30gd2lkdGg9ezgwMH0gaGVpZ2h0PXs2MDB9IHBoeXNpY3M9e1BoYXNlci5QaHlzaWNzLkFSQ0FERX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwcml0ZSBhc3NldEtleT1cInNreVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgbmFtZT1cInBsYXRmb3Jtc1wiIGVuYWJsZUJvZHk9e3RydWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJncm91bmRcIiBhc3NldEtleT1cImdyb3VuZFwiIHk9ezYwMCAtIDY0fSBzY2FsZT17e3g6MiwgeToyfX0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJsZWRnZTFcIiBhc3NldEtleT1cImdyb3VuZFwiIHg9ezQwMH0geT17NDAwfSBib2R5SW1tb3ZhYmxlPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcHJpdGUgbmFtZT1cImxlZGdlMlwiIGFzc2V0S2V5PVwiZ3JvdW5kXCIgeD17LTE1MH0geT17MjUwfSBib2R5SW1tb3ZhYmxlPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8Z3JvdXAgbmFtZT1cInN0YXJzXCIgZW5hYmxlQm9keT17dHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb2xsaWRlcyB3aXRoPVwicGxhdGZvcm1zXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhcnN9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9ncm91cD5cclxuICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJwbGF5ZXJcIiB4PXszMn0geT17NDUwfSBhc3NldEtleT1cImR1ZGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keVBoeXNpY3M9e3RydWV9IGJvZHlCb3VuY2VZPXswLjJ9IGJvZHlHcmF2aXR5WT17MzAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUNvbGxpZGVXb3JsZEJvdW5kcz17dHJ1ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhbmltYXRpb24gaWQ9XCJsZWZ0XCIgZnJhbWVzPXtbMCwgMSwgMiwgM119IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGFuaW1hdGlvbiBpZD1cInJpZ2h0XCIgZnJhbWVzPXtbNSwgNiwgNywgOF19IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGNvbGxpZGVzIHdpdGg9XCJwbGF0Zm9ybXNcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvdmVybGFwcyB3aXRoPVwic3RhcnNcIiBvbk92ZXJsYXA9e3RoaXMuY29sbGVjdFN0YXJ9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L3Nwcml0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dCB0ZXh0PXtgU2NvcmU6ICR7dGhpcy5zdGF0ZS5zY29yZX1gfSBzdHlsZT17c2NvcmVTdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB4PXsxNn0geT17MTZ9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHg9ezB9IHk9ezB9IGFzc2V0S2V5PVwiYnV0dG9uXCIgZnJhbWVzPXtbMiwgMSwgMF19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dCB0ZXh0PVwiaGkhXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjdXJzb3JzPXt0cnVlfSBvbklucHV0PXt0aGlzLm9uSW5wdXR9Lz5cclxuICAgICAgICAgICAgICAgIDwvZ2FtZT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5SZWFjdC5yZW5kZXIoPE15R2FtZS8+LCAnZ2FtZScpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4YW1wbGVzL2J1dHRvbi5qc1xuICoqLyIsIlxyXG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZyA9IHJlcXVpcmUoJ3JlYWN0LWFueXRoaW5nL3NyYy9uYXRpdmUnKTtcclxudmFyIE5hdGl2ZUltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9OYXRpdmVJbXBsZW1lbnRhdGlvbicpO1xyXG5cclxudmFyIFJlYWN0UGhhc2VyID0gY3JlYXRlUmVhY3RBbnl0aGluZyhOYXRpdmVJbXBsZW1lbnRhdGlvbik7XHJcbnZhciBSZWFjdCA9IFJlYWN0UGhhc2VyLlJlYWN0O1xyXG5cclxuUmVhY3QucmVuZGVyID0gUmVhY3RQaGFzZXIucmVuZGVyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmF0aXZlLmpzXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Jyk7XG5cbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nJyk7XG52YXIgY3JlYXRlTmF0aXZlUmVhY3RBbnl0aGluZyA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIHJldHVybiBjcmVhdGVSZWFjdEFueXRoaW5nKFJlYWN0LCBuYXRpdmVJbXBsZW1lbnRhdGlvbik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5hdGl2ZVJlYWN0QW55dGhpbmc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvbmF0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZHJlbicpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0Q2xhc3MgPSByZXF1aXJlKCcuL1JlYWN0Q2xhc3MnKTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHJlcXVpcmUoJy4vUmVhY3RET01GYWN0b3JpZXMnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxudmFyIG9ubHlDaGlsZCA9IHJlcXVpcmUoJy4vb25seUNoaWxkJyk7XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xudmFyIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQ7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgUmVhY3QgPSB7XG5cbiAgLy8gTW9kZXJuXG5cbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IFJlYWN0Q2hpbGRyZW4ubWFwLFxuICAgIGZvckVhY2g6IFJlYWN0Q2hpbGRyZW4uZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbi5jb3VudCxcbiAgICB0b0FycmF5OiBSZWFjdENoaWxkcmVuLnRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdENvbXBvbmVudCxcblxuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgaXNWYWxpZEVsZW1lbnQ6IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCxcblxuICAvLyBDbGFzc2ljXG5cbiAgUHJvcFR5cGVzOiBSZWFjdFByb3BUeXBlcyxcbiAgY3JlYXRlQ2xhc3M6IFJlYWN0Q2xhc3MuY3JlYXRlQ2xhc3MsXG4gIGNyZWF0ZUZhY3Rvcnk6IGNyZWF0ZUZhY3RvcnksXG4gIGNyZWF0ZU1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAvLyBDdXJyZW50bHkgYSBub29wLiBXaWxsIGJlIHVzZWQgdG8gdmFsaWRhdGUgYW5kIHRyYWNlIG1peGlucy5cbiAgICByZXR1cm4gbWl4aW47XG4gIH0sXG5cbiAgLy8gVGhpcyBsb29rcyBET00gc3BlY2lmaWMgYnV0IHRoZXNlIGFyZSBhY3R1YWxseSBpc29tb3JwaGljIGhlbHBlcnNcbiAgLy8gc2luY2UgdGhleSBhcmUganVzdCBnZW5lcmF0aW5nIERPTSBzdHJpbmdzLlxuICBET006IFJlYWN0RE9NRmFjdG9yaWVzLFxuXG4gIHZlcnNpb246IFJlYWN0VmVyc2lvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLnR3b0FyZ3VtZW50UG9vbGVyO1xudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IFBvb2xlZENsYXNzLmZvdXJBcmd1bWVudFBvb2xlcjtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnJCYvJyk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiB0cmF2ZXJzYWwuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgRm9yRWFjaEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gZm9yRWFjaEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gdHJhdmVyc2FsIHdpdGguXG4gKiBAcGFyYW0gez8qfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gY29udGV4dCB3aXRoLlxuICovXG5mdW5jdGlvbiBGb3JFYWNoQm9va0tlZXBpbmcoZm9yRWFjaEZ1bmN0aW9uLCBmb3JFYWNoQ29udGV4dCkge1xuICB0aGlzLmZ1bmMgPSBmb3JFYWNoRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IGZvckVhY2hDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbkZvckVhY2hCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKEZvckVhY2hCb29rS2VlcGluZywgdHdvQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGQoYm9va0tlZXBpbmcsIGNoaWxkLCBuYW1lKSB7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYztcbiAgdmFyIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG4gIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdDtcbiAgdmFyIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeDtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jO1xuICB2YXIgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgbWFwRnVuY3Rpb24oY2hpbGQsIGtleSwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuYywgY29udGV4dCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZER1bW15KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuLCBjb250ZXh0KSB7XG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUG9vbGVkQ2xhc3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMikge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMik7XG4gIH1cbn07XG5cbnZhciB0aHJlZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMyk7XG4gIH1cbn07XG5cbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0KTtcbiAgfVxufTtcblxudmFyIGZpdmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICB9XG59O1xuXG52YXIgc3RhbmRhcmRSZWxlYXNlciA9IGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICAhKGluc3RhbmNlIGluc3RhbmNlb2YgS2xhc3MpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMgKG9wdGlvbmFsKS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb3B5Q29uc3RydWN0b3IgQ29uc3RydWN0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZXNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHBvb2xlciBDdXN0b21pemFibGUgcG9vbGVyLlxuICovXG52YXIgYWRkUG9vbGluZ1RvID0gZnVuY3Rpb24gKENvcHlDb25zdHJ1Y3RvciwgcG9vbGVyKSB7XG4gIHZhciBOZXdLbGFzcyA9IENvcHlDb25zdHJ1Y3RvcjtcbiAgTmV3S2xhc3MuaW5zdGFuY2VQb29sID0gW107XG4gIE5ld0tsYXNzLmdldFBvb2xlZCA9IHBvb2xlciB8fCBERUZBVUxUX1BPT0xFUjtcbiAgaWYgKCFOZXdLbGFzcy5wb29sU2l6ZSkge1xuICAgIE5ld0tsYXNzLnBvb2xTaXplID0gREVGQVVMVF9QT09MX1NJWkU7XG4gIH1cbiAgTmV3S2xhc3MucmVsZWFzZSA9IHN0YW5kYXJkUmVsZWFzZXI7XG4gIHJldHVybiBOZXdLbGFzcztcbn07XG5cbnZhciBQb29sZWRDbGFzcyA9IHtcbiAgYWRkUG9vbGluZ1RvOiBhZGRQb29saW5nVG8sXG4gIG9uZUFyZ3VtZW50UG9vbGVyOiBvbmVBcmd1bWVudFBvb2xlcixcbiAgdHdvQXJndW1lbnRQb29sZXI6IHR3b0FyZ3VtZW50UG9vbGVyLFxuICB0aHJlZUFyZ3VtZW50UG9vbGVyOiB0aHJlZUFyZ3VtZW50UG9vbGVyLFxuICBmb3VyQXJndW1lbnRQb29sZXI6IGZvdXJBcmd1bWVudFBvb2xlcixcbiAgZml2ZUFyZ3VtZW50UG9vbGVyOiBmaXZlQXJndW1lbnRQb29sZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9vbGVkQ2xhc3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1Bvb2xlZENsYXNzLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbGVtZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50IHR5cGUuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ10gJiYgU3ltYm9sWydmb3InXSgncmVhY3QuZWxlbWVudCcpIHx8IDB4ZWFjNztcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pO1xuICAgICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50Ll9zZWxmID0gc2VsZjtcbiAgICAgIGVsZW1lbnQuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHJlZiA9ICFjb25maWcuaGFzT3duUHJvcGVydHkoJ3JlZicpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0ID8gbnVsbCA6IGNvbmZpZy5yZWY7XG4gICAgICBrZXkgPSAhY29uZmlnLmhhc093blByb3BlcnR5KCdrZXknKSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldCA/IG51bGwgOiAnJyArIGNvbmZpZy5rZXk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcucmVmO1xuICAgICAga2V5ID0gY29uZmlnLmtleSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIENyZWF0ZSBkdW1teSBga2V5YCBhbmQgYHJlZmAgcHJvcGVydHkgdG8gYHByb3BzYCB0byB3YXJuIHVzZXJzXG4gICAgLy8gYWdhaW5zdCBpdHMgdXNlXG4gICAgaWYgKHR5cGVvZiBwcm9wcy4kJHR5cGVvZiA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcHMuJCR0eXBlb2YgIT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgaWYgKCFwcm9wcy5oYXNPd25Qcm9wZXJ0eSgna2V5JykpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgJiYgJ2Rpc3BsYXlOYW1lJyBpbiB0eXBlID8gdHlwZS5kaXNwbGF5TmFtZSA6ICdFbGVtZW50JykgOiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFwcm9wcy5oYXNPd25Qcm9wZXJ0eSgncmVmJykpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgJiYgJ2Rpc3BsYXlOYW1lJyBpbiB0eXBlID8gdHlwZS5kaXNwbGF5TmFtZSA6ICdFbGVtZW50JykgOiB2b2lkIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn07XG5cblJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAvLyBFeHBvc2UgdGhlIHR5cGUgb24gdGhlIGZhY3RvcnkgYW5kIHRoZSBwcm90b3R5cGUgc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gZWFzaWx5IGFjY2Vzc2VkIG9uIGVsZW1lbnRzLiBFLmcuIGA8Rm9vIC8+LnR5cGUgPT09IEZvb2AuXG4gIC8vIFRoaXMgc2hvdWxkIG5vdCBiZSBuYW1lZCBgY29uc3RydWN0b3JgIHNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZnVuY3Rpb25cbiAgLy8gdGhhdCBjcmVhdGVkIHRoZSBlbGVtZW50LCBhbmQgaXQgbWF5IG5vdCBldmVuIGJlIGEgY29uc3RydWN0b3IuXG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICBmYWN0b3J5LnR5cGUgPSB0eXBlO1xuICByZXR1cm4gZmFjdG9yeTtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkgPSBmdW5jdGlvbiAob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChjb25maWcucmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHM7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgY29tcG9uZW50LlxuICogQGZpbmFsXG4gKi9cblJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vb2JqZWN0LWFzc2lnbi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEN1cnJlbnRPd25lclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoICh4KSB7fVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL3dhcm5pbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY2FuRGVmaW5lUHJvcGVydHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4JywgeyBnZXQ6IGZ1bmN0aW9uICgpIHt9IH0pO1xuICAgIGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuRGVmaW5lUHJvcGVydHk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSB0cmF2ZXJzZUFsbENoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAqIHBhdHRlcm4uXG4gKi9cblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZXJMb29rdXAgPSB7XG4gICc9JzogJz0wJyxcbiAgJzonOiAnPTInXG59O1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvWz06XS9nO1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG5mdW5jdGlvbiB1c2VyUHJvdmlkZWRLZXlFc2NhcGVyKG1hdGNoKSB7XG4gIHJldHVybiB1c2VyUHJvdmlkZWRLZXlFc2NhcGVyTG9va3VwW21hdGNoXTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGtleSBzdHJpbmcgdGhhdCBpZGVudGlmaWVzIGEgY29tcG9uZW50IHdpdGhpbiBhIHNldC5cbiAqXG4gKiBAcGFyYW0geyp9IGNvbXBvbmVudCBBIGNvbXBvbmVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYSBtYW51YWwga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IHRoYXQgaXMgdXNlZCBpZiBhIG1hbnVhbCBrZXkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnRLZXkoY29tcG9uZW50LCBpbmRleCkge1xuICAvLyBEbyBzb21lIHR5cGVjaGVja2luZyBoZXJlIHNpbmNlIHdlIGNhbGwgdGhpcyBibGluZGx5LiBXZSB3YW50IHRvIGVuc3VyZVxuICAvLyB0aGF0IHdlIGRvbid0IGJsb2NrIHBvdGVudGlhbCBmdXR1cmUgRVMgQVBJcy5cbiAgaWYgKGNvbXBvbmVudCAmJiB0eXBlb2YgY29tcG9uZW50ID09PSAnb2JqZWN0JyAmJiBjb21wb25lbnQua2V5ICE9IG51bGwpIHtcbiAgICAvLyBFeHBsaWNpdCBrZXlcbiAgICByZXR1cm4gd3JhcFVzZXJQcm92aWRlZEtleShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG4vKipcbiAqIEVzY2FwZSBhIGNvbXBvbmVudCBrZXkgc28gdGhhdCBpdCBpcyBzYWZlIHRvIHVzZSBpbiBhIHJlYWN0aWQuXG4gKlxuICogQHBhcmFtIHsqfSB0ZXh0IENvbXBvbmVudCBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gQW4gZXNjYXBlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCB1c2VyUHJvdmlkZWRLZXlFc2NhcGVyKTtcbn1cblxuLyoqXG4gKiBXcmFwIGEgYGtleWAgdmFsdWUgZXhwbGljaXRseSBwcm92aWRlZCBieSB0aGUgdXNlciB0byBkaXN0aW5ndWlzaCBpdCBmcm9tXG4gKiBpbXBsaWNpdGx5LWdlbmVyYXRlZCBrZXlzIGdlbmVyYXRlZCBieSBhIGNvbXBvbmVudCdzIGluZGV4IGluIGl0cyBwYXJlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBWYWx1ZSBvZiBhIHVzZXItcHJvdmlkZWQgYGtleWAgYXR0cmlidXRlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHdyYXBVc2VyUHJvdmlkZWRLZXkoa2V5KSB7XG4gIHJldHVybiAnJCcgKyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkoa2V5KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikpIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpaSA9IDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgbm90IHlldCBmdWxseSBzdXBwb3J0ZWQuIEl0IGlzIGFuICcgKyAnZXhwZXJpbWVudGFsIGZlYXR1cmUgdGhhdCBtaWdodCBiZSByZW1vdmVkLiBDb252ZXJ0IGl0IHRvIGEgJyArICdzZXF1ZW5jZSAvIGl0ZXJhYmxlIG9mIGtleWVkIFJlYWN0RWxlbWVudHMgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBjaGlsZCA9IGVudHJ5WzFdO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIHdyYXBVc2VyUHJvdmlkZWRLZXkoZW50cnlbMF0pICsgU1VCU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCAwKTtcbiAgICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkIG9yIHdyYXAgdGhlIG9iamVjdCB1c2luZyBjcmVhdGVGcmFnbWVudChvYmplY3QpIGZyb20gdGhlICcgKyAnUmVhY3QgYWRkLW9ucy4nO1xuICAgICAgICBpZiAoY2hpbGRyZW4uX2lzUmVhY3RFbGVtZW50KSB7XG4gICAgICAgICAgYWRkZW5kdW0gPSAnIEl0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYW4gZWxlbWVudCBjcmVhdGVkIGJ5IGEgZGlmZmVyZW50ICcgKyAndmVyc2lvbiBvZiBSZWFjdC4gTWFrZSBzdXJlIHRvIHVzZSBvbmx5IG9uZSBjb3B5IG9mIFJlYWN0Lic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSArPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCAnJywgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhdmVyc2VBbGxDaGlsZHJlbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZ2V0SXRlcmF0b3JGblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gKlxuICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gKlxuICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJdGVyYXRvckZuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhICcgKyAnZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25TZXRTdGF0ZSgpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHBhcnRpYWxTdGF0ZSAhPSBudWxsLCAnc2V0U3RhdGUoLi4uKTogWW91IHBhc3NlZCBhbiB1bmRlZmluZWQgb3IgbnVsbCBzdGF0ZSBvYmplY3Q7ICcgKyAnaW5zdGVhZCwgdXNlIGZvcmNlVXBkYXRlKCkuJykgOiB2b2lkIDA7XG4gIH1cbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gd2FyblREWihwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yICYmIHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICcnKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGFic3RyYWN0IEFQSSBmb3IgYW4gdXBkYXRlIHF1ZXVlLlxuICovXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2spIHt9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgd2FyblREWihwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlKSB7XG4gICAgd2FyblREWihwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEluc3RydW1lbnRhdGlvblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RGVidWdUb29sID0gcmVxdWlyZSgnLi9SZWFjdERlYnVnVG9vbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZGVidWdUb29sOiBSZWFjdERlYnVnVG9vbCB9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEluc3RydW1lbnRhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3REZWJ1Z1Rvb2xcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sID0gcmVxdWlyZSgnLi9SZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGV2ZW50SGFuZGxlcnMgPSBbXTtcbnZhciBoYW5kbGVyRG9lc1Rocm93Rm9yRXZlbnQgPSB7fTtcblxuZnVuY3Rpb24gZW1pdEV2ZW50KGhhbmRsZXJGdW5jdGlvbk5hbWUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBldmVudEhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyW2hhbmRsZXJGdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgaGFuZGxlcltoYW5kbGVyRnVuY3Rpb25OYW1lXShhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaGFuZGxlckRvZXNUaHJvd0ZvckV2ZW50W2hhbmRsZXJGdW5jdGlvbk5hbWVdLCAnZXhjZXB0aW9uIHRocm93biBieSBkZXZ0b29sIHdoaWxlIGhhbmRsaW5nICVzOiAlcycsIGhhbmRsZXJGdW5jdGlvbk5hbWUsIGUubWVzc2FnZSkgOiB2b2lkIDA7XG4gICAgICAgIGhhbmRsZXJEb2VzVGhyb3dGb3JFdmVudFtoYW5kbGVyRnVuY3Rpb25OYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIFJlYWN0RGVidWdUb29sID0ge1xuICBhZGREZXZ0b29sOiBmdW5jdGlvbiAoZGV2dG9vbCkge1xuICAgIGV2ZW50SGFuZGxlcnMucHVzaChkZXZ0b29sKTtcbiAgfSxcbiAgcmVtb3ZlRGV2dG9vbDogZnVuY3Rpb24gKGRldnRvb2wpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50SGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudEhhbmRsZXJzW2ldID09PSBkZXZ0b29sKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBvbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIGVtaXRFdmVudCgnb25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQnKTtcbiAgfSxcbiAgb25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQnKTtcbiAgfSxcbiAgb25TZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGVtaXRFdmVudCgnb25TZXRTdGF0ZScpO1xuICB9LFxuICBvbk1vdW50Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICBlbWl0RXZlbnQoJ29uTW91bnRSb290Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvbk1vdW50Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG4gIG9uVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25VcGRhdGVDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25Vbm1vdW50Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH1cbn07XG5cblJlYWN0RGVidWdUb29sLmFkZERldnRvb2woUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3REZWJ1Z1Rvb2w7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RGVidWdUb29sLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHByb2Nlc3NpbmdDaGlsZENvbnRleHQgPSBmYWxzZTtcblxuICB2YXIgd2FybkludmFsaWRTZXRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCwgJ3NldFN0YXRlKC4uLik6IENhbm5vdCBjYWxsIHNldFN0YXRlKCkgaW5zaWRlIGdldENoaWxkQ29udGV4dCgpJykgOiB2b2lkIDA7XG4gIH07XG59XG5cbnZhciBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sID0ge1xuICBvbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3NpbmdDaGlsZENvbnRleHQgPSB0cnVlO1xuICB9LFxuICBvbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzaW5nQ2hpbGRDb250ZXh0ID0gZmFsc2U7XG4gIH0sXG4gIG9uU2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB3YXJuSW52YWxpZFNldFN0YXRlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2VtcHR5T2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENsYXNzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9IGtleU9mKHsgbWl4aW5zOiBudWxsIH0pO1xuXG4vKipcbiAqIFBvbGljaWVzIHRoYXQgZGVzY3JpYmUgbWV0aG9kcyBpbiBgUmVhY3RDbGFzc0ludGVyZmFjZWAuXG4gKi9cbnZhciBTcGVjUG9saWN5ID0ga2V5TWlycm9yKHtcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgb25seSBvbmNlIGJ5IHRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIG9yIG1peGluLlxuICAgKi9cbiAgREVGSU5FX09OQ0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIG1heSBiZSBkZWZpbmVkIGJ5IGJvdGggdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gYW5kIG1peGlucy5cbiAgICogU3Vic2VxdWVudCBkZWZpbml0aW9ucyB3aWxsIGJlIGNoYWluZWQuIFRoZXNlIG1ldGhvZHMgbXVzdCByZXR1cm4gdm9pZC5cbiAgICovXG4gIERFRklORV9NQU5ZOiBudWxsLFxuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgb3ZlcnJpZGluZyB0aGUgYmFzZSBjbGFzcy5cbiAgICovXG4gIE9WRVJSSURFX0JBU0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBzaW1pbGFyIHRvIERFRklORV9NQU5ZLCBleGNlcHQgd2UgYXNzdW1lIHRoZXkgcmV0dXJuXG4gICAqIG9iamVjdHMuIFdlIHRyeSB0byBtZXJnZSB0aGUga2V5cyBvZiB0aGUgcmV0dXJuIHZhbHVlcyBvZiBhbGwgdGhlIG1peGVkIGluXG4gICAqIGZ1bmN0aW9ucy4gSWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3Qgd2UgdGhyb3cuXG4gICAqL1xuICBERUZJTkVfTUFOWV9NRVJHRUQ6IG51bGxcbn0pO1xuXG52YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuLyoqXG4gKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICogb3IgbmF0aXZlIGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQG5vc2lkZWVmZmVjdHNcbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0VcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuLy8gbm9vcFxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0UpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSAnICsgJ2Alc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzICcgKyAnZG8gbm90IG92ZXJsYXAgd2l0aCBSZWFjdCBtZXRob2RzLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgJyArICd0byBhIG1peGluLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgISh0eXBlb2Ygc3BlYyAhPT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byAnICsgJ3VzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhICcgKyAncmVndWxhciBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAhIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzcGVjKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvICcgKyAndXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyAnICsgJ3doZW4gbWl4aW5nIGluIGNvbXBvbmVudCBzcGVjcy4nLCBzcGVjUG9saWN5LCBuYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VEKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkICcgKyAncHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0ICcgKyAnYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgaW5zdGVhZDsgaXQgd2lsbCBzdGlsbCBiZSBhY2Nlc3NpYmxlIG9uIHRoZSAnICsgJ2NvbnN0cnVjdG9yLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lICcgKyAnYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgJyArICdkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgIShvbmVba2V5XSA9PT0gdW5kZWZpbmVkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6ICcgKyAnVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgJyArICdtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gJyArICdnZXRJbml0aWFsU3RhdGUoKSBvciBnZXREZWZhdWx0UHJvcHMoKSBtZXRob2RzIHJldHVybmluZyBvYmplY3RzICcgKyAnd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3BlYyBDbGFzcyBzcGVjaWZpY2F0aW9uICh3aGljaCBtdXN0IGRlZmluZSBgcmVuZGVyYCkuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBDb21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNyZWF0ZUNsYXNzOiBmdW5jdGlvbiAoc3BlYykge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIH07XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlNaXJyb3InKTtcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSBrZXlNaXJyb3Ioe1xuICBwcm9wOiBudWxsLFxuICBjb250ZXh0OiBudWxsLFxuICBjaGlsZENvbnRleHQ6IG51bGxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbnM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnLi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgIShvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAna2V5TWlycm9yKC4uLik6IEFyZ3VtZW50IG11c3QgYmUgYW4gb2JqZWN0LicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9rZXlNaXJyb3IuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4vKipcbiAqIEFsbG93cyBleHRyYWN0aW9uIG9mIGEgbWluaWZpZWQga2V5LiBMZXQncyB0aGUgYnVpbGQgc3lzdGVtIG1pbmlmeSBrZXlzXG4gKiB3aXRob3V0IGxvc2luZyB0aGUgYWJpbGl0eSB0byBkeW5hbWljYWxseSB1c2Uga2V5IHN0cmluZ3MgYXMgdmFsdWVzXG4gKiB0aGVtc2VsdmVzLiBQYXNzIGluIGFuIG9iamVjdCB3aXRoIGEgc2luZ2xlIGtleS92YWwgcGFpciBhbmQgaXQgd2lsbCByZXR1cm5cbiAqIHlvdSB0aGUgc3RyaW5nIGtleSBvZiB0aGF0IHNpbmdsZSByZWNvcmQuIFN1cHBvc2UgeW91IHdhbnQgdG8gZ3JhYiB0aGVcbiAqIHZhbHVlIGZvciBhIGtleSAnY2xhc3NOYW1lJyBpbnNpZGUgb2YgYW4gb2JqZWN0LiBLZXkvdmFsIG1pbmlmaWNhdGlvbiBtYXlcbiAqIGhhdmUgYWxpYXNlZCB0aGF0IGtleSB0byBiZSAneGExMicuIGtleU9mKHtjbGFzc05hbWU6IG51bGx9KSB3aWxsIHJldHVyblxuICogJ3hhMTInIGluIHRoYXQgY2FzZS4gUmVzb2x2ZSBrZXlzIHlvdSB3YW50IHRvIHVzZSBvbmNlIGF0IHN0YXJ0dXAgdGltZSwgdGhlblxuICogcmV1c2UgdGhvc2UgcmVzb2x1dGlvbnMuXG4gKi9cbnZhciBrZXlPZiA9IGZ1bmN0aW9uIChvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU9mO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2tleU9mLmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERPTUZhY3Rvcmllc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcblxudmFyIG1hcE9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL21hcE9iamVjdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhY3RvcnkgdGhhdCBjcmVhdGVzIEhUTUwgdGFnIGVsZW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGFnIG5hbWUgKGUuZy4gYGRpdmApLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRE9NRmFjdG9yeSh0YWcpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICByZXR1cm4gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3RvcnkodGFnKTtcbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3RvcnkodGFnKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwcGluZyBmcm9tIHN1cHBvcnRlZCBIVE1MIHRhZ3MgdG8gYFJlYWN0RE9NQ29tcG9uZW50YCBjbGFzc2VzLlxuICogVGhpcyBpcyBhbHNvIGFjY2Vzc2libGUgdmlhIGBSZWFjdC5ET01gLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gbWFwT2JqZWN0KHtcbiAgYTogJ2EnLFxuICBhYmJyOiAnYWJicicsXG4gIGFkZHJlc3M6ICdhZGRyZXNzJyxcbiAgYXJlYTogJ2FyZWEnLFxuICBhcnRpY2xlOiAnYXJ0aWNsZScsXG4gIGFzaWRlOiAnYXNpZGUnLFxuICBhdWRpbzogJ2F1ZGlvJyxcbiAgYjogJ2InLFxuICBiYXNlOiAnYmFzZScsXG4gIGJkaTogJ2JkaScsXG4gIGJkbzogJ2JkbycsXG4gIGJpZzogJ2JpZycsXG4gIGJsb2NrcXVvdGU6ICdibG9ja3F1b3RlJyxcbiAgYm9keTogJ2JvZHknLFxuICBicjogJ2JyJyxcbiAgYnV0dG9uOiAnYnV0dG9uJyxcbiAgY2FudmFzOiAnY2FudmFzJyxcbiAgY2FwdGlvbjogJ2NhcHRpb24nLFxuICBjaXRlOiAnY2l0ZScsXG4gIGNvZGU6ICdjb2RlJyxcbiAgY29sOiAnY29sJyxcbiAgY29sZ3JvdXA6ICdjb2xncm91cCcsXG4gIGRhdGE6ICdkYXRhJyxcbiAgZGF0YWxpc3Q6ICdkYXRhbGlzdCcsXG4gIGRkOiAnZGQnLFxuICBkZWw6ICdkZWwnLFxuICBkZXRhaWxzOiAnZGV0YWlscycsXG4gIGRmbjogJ2RmbicsXG4gIGRpYWxvZzogJ2RpYWxvZycsXG4gIGRpdjogJ2RpdicsXG4gIGRsOiAnZGwnLFxuICBkdDogJ2R0JyxcbiAgZW06ICdlbScsXG4gIGVtYmVkOiAnZW1iZWQnLFxuICBmaWVsZHNldDogJ2ZpZWxkc2V0JyxcbiAgZmlnY2FwdGlvbjogJ2ZpZ2NhcHRpb24nLFxuICBmaWd1cmU6ICdmaWd1cmUnLFxuICBmb290ZXI6ICdmb290ZXInLFxuICBmb3JtOiAnZm9ybScsXG4gIGgxOiAnaDEnLFxuICBoMjogJ2gyJyxcbiAgaDM6ICdoMycsXG4gIGg0OiAnaDQnLFxuICBoNTogJ2g1JyxcbiAgaDY6ICdoNicsXG4gIGhlYWQ6ICdoZWFkJyxcbiAgaGVhZGVyOiAnaGVhZGVyJyxcbiAgaGdyb3VwOiAnaGdyb3VwJyxcbiAgaHI6ICdocicsXG4gIGh0bWw6ICdodG1sJyxcbiAgaTogJ2knLFxuICBpZnJhbWU6ICdpZnJhbWUnLFxuICBpbWc6ICdpbWcnLFxuICBpbnB1dDogJ2lucHV0JyxcbiAgaW5zOiAnaW5zJyxcbiAga2JkOiAna2JkJyxcbiAga2V5Z2VuOiAna2V5Z2VuJyxcbiAgbGFiZWw6ICdsYWJlbCcsXG4gIGxlZ2VuZDogJ2xlZ2VuZCcsXG4gIGxpOiAnbGknLFxuICBsaW5rOiAnbGluaycsXG4gIG1haW46ICdtYWluJyxcbiAgbWFwOiAnbWFwJyxcbiAgbWFyazogJ21hcmsnLFxuICBtZW51OiAnbWVudScsXG4gIG1lbnVpdGVtOiAnbWVudWl0ZW0nLFxuICBtZXRhOiAnbWV0YScsXG4gIG1ldGVyOiAnbWV0ZXInLFxuICBuYXY6ICduYXYnLFxuICBub3NjcmlwdDogJ25vc2NyaXB0JyxcbiAgb2JqZWN0OiAnb2JqZWN0JyxcbiAgb2w6ICdvbCcsXG4gIG9wdGdyb3VwOiAnb3B0Z3JvdXAnLFxuICBvcHRpb246ICdvcHRpb24nLFxuICBvdXRwdXQ6ICdvdXRwdXQnLFxuICBwOiAncCcsXG4gIHBhcmFtOiAncGFyYW0nLFxuICBwaWN0dXJlOiAncGljdHVyZScsXG4gIHByZTogJ3ByZScsXG4gIHByb2dyZXNzOiAncHJvZ3Jlc3MnLFxuICBxOiAncScsXG4gIHJwOiAncnAnLFxuICBydDogJ3J0JyxcbiAgcnVieTogJ3J1YnknLFxuICBzOiAncycsXG4gIHNhbXA6ICdzYW1wJyxcbiAgc2NyaXB0OiAnc2NyaXB0JyxcbiAgc2VjdGlvbjogJ3NlY3Rpb24nLFxuICBzZWxlY3Q6ICdzZWxlY3QnLFxuICBzbWFsbDogJ3NtYWxsJyxcbiAgc291cmNlOiAnc291cmNlJyxcbiAgc3BhbjogJ3NwYW4nLFxuICBzdHJvbmc6ICdzdHJvbmcnLFxuICBzdHlsZTogJ3N0eWxlJyxcbiAgc3ViOiAnc3ViJyxcbiAgc3VtbWFyeTogJ3N1bW1hcnknLFxuICBzdXA6ICdzdXAnLFxuICB0YWJsZTogJ3RhYmxlJyxcbiAgdGJvZHk6ICd0Ym9keScsXG4gIHRkOiAndGQnLFxuICB0ZXh0YXJlYTogJ3RleHRhcmVhJyxcbiAgdGZvb3Q6ICd0Zm9vdCcsXG4gIHRoOiAndGgnLFxuICB0aGVhZDogJ3RoZWFkJyxcbiAgdGltZTogJ3RpbWUnLFxuICB0aXRsZTogJ3RpdGxlJyxcbiAgdHI6ICd0cicsXG4gIHRyYWNrOiAndHJhY2snLFxuICB1OiAndScsXG4gIHVsOiAndWwnLFxuICAndmFyJzogJ3ZhcicsXG4gIHZpZGVvOiAndmlkZW8nLFxuICB3YnI6ICd3YnInLFxuXG4gIC8vIFNWR1xuICBjaXJjbGU6ICdjaXJjbGUnLFxuICBjbGlwUGF0aDogJ2NsaXBQYXRoJyxcbiAgZGVmczogJ2RlZnMnLFxuICBlbGxpcHNlOiAnZWxsaXBzZScsXG4gIGc6ICdnJyxcbiAgaW1hZ2U6ICdpbWFnZScsXG4gIGxpbmU6ICdsaW5lJyxcbiAgbGluZWFyR3JhZGllbnQ6ICdsaW5lYXJHcmFkaWVudCcsXG4gIG1hc2s6ICdtYXNrJyxcbiAgcGF0aDogJ3BhdGgnLFxuICBwYXR0ZXJuOiAncGF0dGVybicsXG4gIHBvbHlnb246ICdwb2x5Z29uJyxcbiAgcG9seWxpbmU6ICdwb2x5bGluZScsXG4gIHJhZGlhbEdyYWRpZW50OiAncmFkaWFsR3JhZGllbnQnLFxuICByZWN0OiAncmVjdCcsXG4gIHN0b3A6ICdzdG9wJyxcbiAgc3ZnOiAnc3ZnJyxcbiAgdGV4dDogJ3RleHQnLFxuICB0c3BhbjogJ3RzcGFuJ1xuXG59LCBjcmVhdGVET01GYWN0b3J5KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERPTUZhY3RvcmllcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFZhbGlkYXRvclxuICovXG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIGFkZGVuZGEgPSBnZXRBZGRlbmRhRm9yS2V5VXNlKCd1bmlxdWVLZXknLCBlbGVtZW50LCBwYXJlbnRUeXBlKTtcbiAgaWYgKGFkZGVuZGEgPT09IG51bGwpIHtcbiAgICAvLyB3ZSBhbHJlYWR5IHNob3dlZCB0aGUgd2FybmluZ1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyVzJywgYWRkZW5kYS5wYXJlbnRPck93bmVyIHx8ICcnLCBhZGRlbmRhLmNoaWxkT3duZXIgfHwgJycsIGFkZGVuZGEudXJsIHx8ICcnKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBTaGFyZWQgd2FybmluZyBhbmQgbW9uaXRvcmluZyBjb2RlIGZvciB0aGUga2V5IHdhcm5pbmdzLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VUeXBlIEEga2V5IHVzZWQgZm9yIGRlLWR1cGluZyB3YXJuaW5ncy5cbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICogQHJldHVybnMgez9vYmplY3R9IEEgc2V0IG9mIGFkZGVuZGEgdG8gdXNlIGluIHRoZSB3YXJuaW5nIG1lc3NhZ2UsIG9yIG51bGxcbiAqIGlmIHRoZSB3YXJuaW5nIGhhcyBhbHJlYWR5IGJlZW4gc2hvd24gYmVmb3JlIChhbmQgc2hvdWxkbid0IGJlIHNob3duIGFnYWluKS5cbiAqL1xuZnVuY3Rpb24gZ2V0QWRkZW5kYUZvcktleVVzZShtZXNzYWdlVHlwZSwgZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICB2YXIgYWRkZW5kdW0gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgaWYgKCFhZGRlbmR1bSkge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBhZGRlbmR1bSA9ICcgQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtZW1vaXplciA9IG93bmVySGFzS2V5VXNlV2FybmluZ1ttZXNzYWdlVHlwZV0gfHwgKG93bmVySGFzS2V5VXNlV2FybmluZ1ttZXNzYWdlVHlwZV0gPSB7fSk7XG4gIGlmIChtZW1vaXplclthZGRlbmR1bV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBtZW1vaXplclthZGRlbmR1bV0gPSB0cnVlO1xuXG4gIHZhciBhZGRlbmRhID0ge1xuICAgIHBhcmVudE9yT3duZXI6IGFkZGVuZHVtLFxuICAgIHVybDogJyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJyxcbiAgICBjaGlsZE93bmVyOiBudWxsXG4gIH07XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgYWRkZW5kYS5jaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nO1xuICB9XG5cbiAgcmV0dXJuIGFkZGVuZGE7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG4gICAgLy8gRW50cnkgaXRlcmF0b3JzIHByb3ZpZGUgaW1wbGljaXQga2V5cy5cbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgcHJvcHMgYXJlIHZhbGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wVHlwZXMgTWFwIG9mIHByb3AgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXMoY29tcG9uZW50TmFtZSwgcHJvcFR5cGVzLCBwcm9wcywgbG9jYXRpb24pIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAhKHR5cGVvZiBwcm9wVHlwZXNbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICBlcnJvciA9IHByb3BUeXBlc1twcm9wTmFtZV0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbik7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgcHJvcE5hbWUsIHR5cGVvZiBlcnJvcikgOiB2b2lkIDA7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB2YXIgYWRkZW5kdW0gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgcHJvcFR5cGU6ICVzJXMnLCBlcnJvci5tZXNzYWdlLCBhZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgaWYgKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcykge1xuICAgIGNoZWNrUHJvcFR5cGVzKG5hbWUsIGNvbXBvbmVudENsYXNzLnByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh2YWxpZFR5cGUsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIHNob3VsZCBub3QgYmUgbnVsbCwgdW5kZWZpbmVkLCBib29sZWFuLCBvciAnICsgJ251bWJlci4gSXQgc2hvdWxkIGJlIGEgc3RyaW5nIChmb3IgRE9NIGVsZW1lbnRzKSBvciBhIFJlYWN0Q2xhc3MgJyArICcoZm9yIGNvbXBvc2l0ZSBjb21wb25lbnRzKS4lcycsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpKSA6IHZvaWQgMDtcblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJykgOiB2b2lkIDA7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG4gIH0sXG5cbiAgY2xvbmVFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgICB9XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3I7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudFZhbGlkYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgYGNhbGxiYWNrYCBvbmNlIGZvciBlYWNoIGVudW1lcmFibGUgb3duIHByb3BlcnR5IGluIHRoZVxuICogb2JqZWN0IGFuZCBjb25zdHJ1Y3RzIGEgbmV3IG9iamVjdCBmcm9tIHRoZSByZXN1bHRzLiBUaGUgYGNhbGxiYWNrYCBpc1xuICogaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czpcbiAqXG4gKiAgLSB0aGUgcHJvcGVydHkgdmFsdWVcbiAqICAtIHRoZSBwcm9wZXJ0eSBuYW1lXG4gKiAgLSB0aGUgb2JqZWN0IGJlaW5nIHRyYXZlcnNlZFxuICpcbiAqIFByb3BlcnRpZXMgdGhhdCBhcmUgYWRkZWQgYWZ0ZXIgdGhlIGNhbGwgdG8gYG1hcE9iamVjdGAgd2lsbCBub3QgYmUgdmlzaXRlZFxuICogYnkgYGNhbGxiYWNrYC4gSWYgdGhlIHZhbHVlcyBvZiBleGlzdGluZyBwcm9wZXJ0aWVzIGFyZSBjaGFuZ2VkLCB0aGUgdmFsdWVcbiAqIHBhc3NlZCB0byBgY2FsbGJhY2tgIHdpbGwgYmUgdGhlIHZhbHVlIGF0IHRoZSB0aW1lIGBtYXBPYmplY3RgIHZpc2l0cyB0aGVtLlxuICogUHJvcGVydGllcyB0aGF0IGFyZSBkZWxldGVkIGJlZm9yZSBiZWluZyB2aXNpdGVkIGFyZSBub3QgdmlzaXRlZC5cbiAqXG4gKiBAZ3JlcCBmdW5jdGlvbiBvYmplY3RNYXAoKVxuICogQGdyZXAgZnVuY3Rpb24gb2JqTWFwKClcbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7Kn0gY29udGV4dFxuICogQHJldHVybiB7P29iamVjdH1cbiAqL1xuZnVuY3Rpb24gbWFwT2JqZWN0KG9iamVjdCwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgaWYgKCFvYmplY3QpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge307XG4gIGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSkge1xuICAgICAgcmVzdWx0W25hbWVdID0gY2FsbGJhY2suY2FsbChjb250ZXh0LCBvYmplY3RbbmFtZV0sIG5hbWUsIG9iamVjdCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwT2JqZWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL21hcE9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG5cbi8qKlxuICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHByb3BUeXBlczoge1xuICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAqXG4gKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gKlxuICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gKiAgICAgfSxcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICogICB9KTtcbiAqXG4gKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gKlxuICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAqXG4gKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gKlxuICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAqICAgICAgICAgICk7XG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICB9LFxuICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gKiAgfSk7XG4gKlxuICogQGludGVybmFsXG4gKi9cblxudmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxudmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuXG4gIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXJcbn07XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoeCA9PT0geSkge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1JlcXVpcmVkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agd2FzIG5vdCBzcGVjaWZpZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zKG51bGwpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJyk7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5KTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICByZXR1cm4gJ2FycmF5JztcbiAgfVxuICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbi8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG5mdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHJldHVybiBBTk9OWU1PVVM7XG4gIH1cbiAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RWZXJzaW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICcxNS4wLjAnO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIG9ubHlDaGlsZFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi4gVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgdGhpc1xuICogZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHMgcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlXG4gKiBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvIGFic3RyYWN0IGF3YXkgdGhlIHBhcnRpY3VsYXIgc3RydWN0dXJlXG4gKiBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9IFRoZSBmaXJzdCBhbmQgb25seSBgUmVhY3RDb21wb25lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ29ubHlDaGlsZCBtdXN0IGJlIHBhc3NlZCBhIGNoaWxkcmVuIHdpdGggZXhhY3RseSBvbmUgY2hpbGQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25seUNoaWxkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9vbmx5Q2hpbGQuanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RQZXJmJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgUmVhY3RBbnl0aGluZ01vdW50ID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nTW91bnQnKTtcbnZhciBSZWFjdEFueXRoaW5nSW5qZWN0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nSW5qZWN0aW9uJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgcmVuZGVyID0gUmVhY3RQZXJmLm1lYXN1cmUoJ1JlYWN0JywgJ3JlbmRlcicsIFJlYWN0QW55dGhpbmdNb3VudC5yZW5kZXIpO1xuXG5cbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nID0gZnVuY3Rpb24gKFJlYWN0LCBuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIFJlYWN0QW55dGhpbmdJbmplY3Rpb24uaW5qZWN0KG5hdGl2ZUltcGxlbWVudGF0aW9uKTtcblxuICAgIHZhciBSZWFjdEFueXRoaW5nID0ge1xuICAgICAgICBSZWFjdDogUmVhY3QsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG4gICAgICAgIGNvbXBvbmVudHM6IChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jb21wb25lbnRzLnR5cGVzIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgdGFnKSB7XG4gICAgICAgICAgICBhY2NbdGFnXSA9IHRhZztcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KVxuICAgIH07XG5cbiAgICByZXR1cm4gUmVhY3RBbnl0aGluZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUmVhY3RBbnl0aGluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFBlcmZcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVhY3RQZXJmIGlzIGEgZ2VuZXJhbCBBT1Agc3lzdGVtIGRlc2lnbmVkIHRvIG1lYXN1cmUgcGVyZm9ybWFuY2UuIFRoaXNcbiAqIG1vZHVsZSBvbmx5IGhhcyB0aGUgaG9va3M6IHNlZSBSZWFjdERlZmF1bHRQZXJmIGZvciB0aGUgYW5hbHlzaXMgdG9vbC5cbiAqL1xuXG52YXIgUmVhY3RQZXJmID0ge1xuICAvKipcbiAgICogQm9vbGVhbiB0byBlbmFibGUvZGlzYWJsZSBtZWFzdXJlbWVudC4gU2V0IHRvIGZhbHNlIGJ5IGRlZmF1bHQgdG8gcHJldmVudFxuICAgKiBhY2NpZGVudGFsIGxvZ2dpbmcgYW5kIHBlcmYgbG9zcy5cbiAgICovXG4gIGVuYWJsZU1lYXN1cmU6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBIb2xkcyBvbnRvIHRoZSBtZWFzdXJlIGZ1bmN0aW9uIGluIHVzZS4gQnkgZGVmYXVsdCwgZG9uJ3QgbWVhc3VyZVxuICAgKiBhbnl0aGluZywgYnV0IHdlJ2xsIG92ZXJyaWRlIHRoaXMgaWYgd2UgaW5qZWN0IGEgbWVhc3VyZSBmdW5jdGlvbi5cbiAgICovXG4gIHN0b3JlZE1lYXN1cmU6IF9ub01lYXN1cmUsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVjdE5hbWVcbiAgICogQHBhcmFtIHtvYmplY3Q8c3RyaW5nPn0gbWV0aG9kTmFtZXNcbiAgICovXG4gIG1lYXN1cmVNZXRob2RzOiBmdW5jdGlvbiAob2JqZWN0LCBvYmplY3ROYW1lLCBtZXRob2ROYW1lcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgaWYgKCFtZXRob2ROYW1lcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgb2JqZWN0W2tleV0gPSBSZWFjdFBlcmYubWVhc3VyZShvYmplY3ROYW1lLCBtZXRob2ROYW1lc1trZXldLCBvYmplY3Rba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyB0byB3cmFwIG1ldGhvZHMgeW91IHdhbnQgdG8gbWVhc3VyZS4gWmVybyBvdmVyaGVhZCBpbiBwcm9kdWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqTmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm5OYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICogQHJldHVybiB7ZnVuY3Rpb259XG4gICAqL1xuICBtZWFzdXJlOiBmdW5jdGlvbiAob2JqTmFtZSwgZm5OYW1lLCBmdW5jKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtZWFzdXJlZEZ1bmMgPSBudWxsO1xuICAgICAgdmFyIHdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChSZWFjdFBlcmYuZW5hYmxlTWVhc3VyZSkge1xuICAgICAgICAgIGlmICghbWVhc3VyZWRGdW5jKSB7XG4gICAgICAgICAgICBtZWFzdXJlZEZ1bmMgPSBSZWFjdFBlcmYuc3RvcmVkTWVhc3VyZShvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWVhc3VyZWRGdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICB3cmFwcGVyLmRpc3BsYXlOYW1lID0gb2JqTmFtZSArICdfJyArIGZuTmFtZTtcbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYztcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZWFzdXJlXG4gICAgICovXG4gICAgaW5qZWN0TWVhc3VyZTogZnVuY3Rpb24gKG1lYXN1cmUpIHtcbiAgICAgIFJlYWN0UGVyZi5zdG9yZWRNZWFzdXJlID0gbWVhc3VyZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogU2ltcGx5IHBhc3NlcyB0aHJvdWdoIHRoZSBtZWFzdXJlZCBmdW5jdGlvbiwgd2l0aG91dCBtZWFzdXJpbmcgaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9iak5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmbk5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfbm9NZWFzdXJlKG9iak5hbWUsIGZuTmFtZSwgZnVuYykge1xuICByZXR1cm4gZnVuYztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFBlcmY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UGVyZi5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBhIG1vZGlmaWVkIHZlcnNpb24gb2Y6XG4gKiAgcmVhY3QvbGliL1JlYWN0TW91bnQuanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VXBkYXRlUXVldWUnKTtcbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RVcGRhdGVzJyk7XG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uJyk7XG5cbnZhciBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbyA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8nKTtcblxudmFyIG1vdW50ZWRSb290Q29tcG9uZW50cyA9IHt9O1xudmFyIG1vdW50ZWRJbWFnZXMgPSB7fTtcbnZhciBfX0RFVl9fID0gdHJ1ZTtcblxuXG5mdW5jdGlvbiBiYXRjaGVkTW91bnRDb21wb25lbnRJbnRvTm9kZShjb21wb25lbnRJbnN0YW5jZSwgY29udGFpbmVyTmFtZSwgY29udGV4dCkge1xuICAgIHZhciB0cmFuc2FjdGlvbiA9IFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLmdldFBvb2xlZChmYWxzZSk7XG4gICAgdHJhbnNhY3Rpb24ucGVyZm9ybShcbiAgICAgICAgbW91bnRDb21wb25lbnRJbnRvTm9kZSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UsXG4gICAgICAgIGNvbnRhaW5lck5hbWUsXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBjb250ZXh0XG4gICAgKTtcbiAgICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5yZWxlYXNlKHRyYW5zYWN0aW9uKTtcbn1cblxuXG5mdW5jdGlvbiBtb3VudENvbXBvbmVudEludG9Ob2RlKGNvbXBvbmVudEluc3RhbmNlLCBjb250YWluZXJOYW1lLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBtYXJrZXJOYW1lO1xuICAgIGlmIChmYWxzZSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGNvbXBvbmVudEluc3RhbmNlLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gICAgICAgIG1hcmtlck5hbWUgPSAnUmVhY3QgbW91bnQ6ICcgKyAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZSA6XG4gICAgICAgICAgICAgICAgdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUudGltZShtYXJrZXJOYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgbWFya3VwID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KFxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIG51bGwsXG4gICAgICAgIFJlYWN0QW55dGhpbmdDb250YWluZXJJbmZvKGNvbXBvbmVudEluc3RhbmNlLCBjb250YWluZXJOYW1lKSxcbiAgICAgICAgY29udGV4dFxuICAgICk7XG5cbiAgICBpZiAobWFya2VyTmFtZSkge1xuICAgICAgICBjb25zb2xlLnRpbWVFbmQobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgUmVhY3RBbnl0aGluZ01vdW50Ll9tb3VudEltYWdlSW50b05vZGUoXG4gICAgICAgIG1hcmt1cCxcbiAgICAgICAgY29udGFpbmVyTmFtZSxcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UsXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBjb250ZXh0XG4gICAgKTtcbn1cblxuXG52YXIgUmVhY3RBbnl0aGluZ01vdW50ID0ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKG5leHRFbGVtZW50LCBjb250YWluZXJOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobmV4dEVsZW1lbnQpLFxuICAgICAgICAgICAgJ1JlYWN0QW55dGluZy5yZW5kZXIoKTogSW52YWxpZCBjb21wb25lbnQgZWxlbWVudC4lcycsXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIG5leHRFbGVtZW50ID09PSAnc3RyaW5nJyA/XG4gICAgICAgICAgICAgICAgJyBJbnN0ZWFkIG9mIHBhc3NpbmcgYSBzdHJpbmcgbGlrZSBcXCdkaXZcXCcsIHBhc3MgJyArXG4gICAgICAgICAgICAgICAgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQoXFwnZGl2XFwnKSBvciA8ZGl2IC8+LicgOlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICAgICAgICAnIEluc3RlYWQgb2YgcGFzc2luZyBhIGNsYXNzIGxpa2UgRm9vLCBwYXNzICcgK1xuICAgICAgICAgICAgICAgICAgICAnUmVhY3QuY3JlYXRlRWxlbWVudChGb28pIG9yIDxGb28gLz4uJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdCBxdWFja3MgbGlrZSBhbiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCAhPSBudWxsICYmIG5leHRFbGVtZW50LnByb3BzICE9PSB1bmRlZmluZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBUaGlzIG1heSBiZSBjYXVzZWQgYnkgdW5pbnRlbnRpb25hbGx5IGxvYWRpbmcgdHdvIGluZGVwZW5kZW50ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvcGllcyBvZiBSZWFjdC4nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJ1xuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICBjb250YWluZXJOYW1lICYmIHR5cGVvZiBjb250YWluZXJOYW1lID09PSAnc3RyaW5nJyxcbiAgICAgICAgICAgICdyZW5kZXIoKTogY29udGFpbmVyTmFtZSBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgICApO1xuXG4gICAgICAgIHZhciBwcmV2Q29tcG9uZW50ID0gbW91bnRlZFJvb3RDb21wb25lbnRzW2NvbnRhaW5lck5hbWVdO1xuXG4gICAgICAgIGlmIChwcmV2Q29tcG9uZW50KSB7XG4gICAgICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSBwcmV2Q29tcG9uZW50Ll9jdXJyZW50RWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHVibGljSW5zdCA9IHByZXZDb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWRDYWxsYmFjayA9IGNhbGxiYWNrICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwocHVibGljSW5zdCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgUmVhY3RBbnl0aGluZ01vdW50Ll91cGRhdGVSb290Q29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgICBwcmV2Q29tcG9uZW50LFxuICAgICAgICAgICAgICAgICAgICBuZXh0RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVibGljSW5zdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgUmVhY3RBbnl0aGluZ01vdW50Ll91bm1vdW50Um9vdENvbXBvbmVudChjb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IFJlYWN0QW55dGhpbmdNb3VudC5fcmVuZGVyTmV3Um9vdENvbXBvbmVudChuZXh0RWxlbWVudCwgY29udGFpbmVyTmFtZSk7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKGNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVJvb3RDb21wb25lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuXG4gICAgX3VubW91bnRSb290Q29tcG9uZW50OiBmdW5jdGlvbiAoY29udGFpbmVyTmFtZSkge1xuICAgIH0sXG4gICAgXG4gICAgX3JlbmRlck5ld1Jvb3RDb21wb25lbnQ6IGZ1bmN0aW9uIChuZXh0RWxlbWVudCwgY29udGFpbmVyTmFtZSkge1xuICAgICAgICAvLyBWYXJpb3VzIHBhcnRzIG9mIG91ciBjb2RlIChzdWNoIGFzIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50J3NcbiAgICAgICAgLy8gX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCkgYXNzdW1lIHRoYXQgY2FsbHMgdG8gcmVuZGVyIGFyZW4ndCBuZXN0ZWQ7XG4gICAgICAgIC8vIHZlcmlmeSB0aGF0IHRoYXQncyB0aGUgY2FzZS5cbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPT0gbnVsbCxcbiAgICAgICAgICAgICdfcmVuZGVyTmV3Um9vdENvbXBvbmVudCgpOiBSZW5kZXIgbWV0aG9kcyBzaG91bGQgYmUgYSBwdXJlIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICAgJ29mIHByb3BzIGFuZCBzdGF0ZTsgdHJpZ2dlcmluZyBuZXN0ZWQgY29tcG9uZW50IHVwZGF0ZXMgZnJvbSAnICtcbiAgICAgICAgICAgICdyZW5kZXIgaXMgbm90IGFsbG93ZWQuIElmIG5lY2Vzc2FyeSwgdHJpZ2dlciBuZXN0ZWQgdXBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICdjb21wb25lbnREaWRVcGRhdGUuIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mICVzLicsXG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpIHx8XG4gICAgICAgICAgICAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnXG4gICAgICAgICk7XG5cbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgY29udGFpbmVyTmFtZSAmJiB0eXBlb2YgY29udGFpbmVyTmFtZSA9PT0gJ3N0cmluZycsXG4gICAgICAgICAgICAnX3JlZ2lzdGVyQ29tcG9uZW50KC4uLik6IFRhcmdldCBjb250YWluZXJOYW1lIGlzIG5vdCBhIHN0cmluZy4nXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudEluc3RhbmNlID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChuZXh0RWxlbWVudCk7XG5cbiAgICAgICAgLy8gVGhlIGluaXRpYWwgcmVuZGVyIGlzIHN5bmNocm9ub3VzIGJ1dCBhbnkgdXBkYXRlcyB0aGF0IGhhcHBlbiBkdXJpbmdcbiAgICAgICAgLy8gcmVuZGVyaW5nLCBpbiBjb21wb25lbnRXaWxsTW91bnQgb3IgY29tcG9uZW50RGlkTW91bnQsIHdpbGwgYmUgYmF0Y2hlZFxuICAgICAgICAvLyBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgYmF0Y2hpbmcgc3RyYXRlZ3kuXG5cbiAgICAgICAgUmVhY3RVcGRhdGVzLmJhdGNoZWRVcGRhdGVzKFxuICAgICAgICAgICAgYmF0Y2hlZE1vdW50Q29tcG9uZW50SW50b05vZGUsXG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgICAgIGNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgbW91bnRlZFJvb3RDb21wb25lbnRzW2NvbnRhaW5lck5hbWVdID0gY29tcG9uZW50SW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbk1vdW50Um9vdENvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9uZW50SW5zdGFuY2U7XG4gICAgfSxcblxuXG4gICAgX21vdW50SW1hZ2VJbnRvTm9kZTogZnVuY3Rpb24gKG1hcmt1cCwgY29udGFpbmVyTmFtZSwgaW1hZ2UsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIHR5cGVvZiBjb250YWluZXJOYW1lID09PSAnc3RyaW5nJyxcbiAgICAgICAgICAgICdtb3VudENvbXBvbmVudEludG9Ob2RlKC4uLik6IFRhcmdldCBjb250YWluZXIgaXMgbm90IHZhbGlkLidcbiAgICAgICAgKTtcblxuICAgICAgICBtb3VudGVkSW1hZ2VzW2NvbnRhaW5lck5hbWVdID0gaW1hZ2U7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEFueXRoaW5nTW91bnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ01vdW50LmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFVwZGF0ZVF1ZXVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RJbnN0YW5jZU1hcCA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0YW5jZU1hcCcpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpIHtcbiAgUmVhY3RVcGRhdGVzLmVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFVuZXhwZWN0ZWRBcmd1bWVudChhcmcpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgYXJnO1xuICBpZiAodHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICB2YXIgZGlzcGxheU5hbWUgPSBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWUgfHwgdHlwZTtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcmcpO1xuICBpZiAoa2V5cy5sZW5ndGggPiAwICYmIGtleXMubGVuZ3RoIDwgMjApIHtcbiAgICByZXR1cm4gZGlzcGxheU5hbWUgKyAnIChrZXlzOiAnICsga2V5cy5qb2luKCcsICcpICsgJyknO1xuICB9XG4gIHJldHVybiBkaXNwbGF5TmFtZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIHZhciBpbnRlcm5hbEluc3RhbmNlID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQocHVibGljSW5zdGFuY2UpO1xuICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gT25seSB3YXJuIHdoZW4gd2UgaGF2ZSBhIGNhbGxlck5hbWUuIE90aGVyd2lzZSB3ZSBzaG91bGQgYmUgc2lsZW50LlxuICAgICAgLy8gV2UncmUgcHJvYmFibHkgY2FsbGluZyBmcm9tIGVucXVldWVDYWxsYmFjay4gV2UgZG9uJ3Qgd2FudCB0byB3YXJuXG4gICAgICAvLyB0aGVyZSBiZWNhdXNlIHdlIGFscmVhZHkgd2FybmVkIGZvciB0aGUgY29ycmVzcG9uZGluZyBsaWZlY3ljbGUgbWV0aG9kLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWNhbGxlck5hbWUsICclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuICcgKyAnVGhpcyBpcyBhIG5vLW9wLiBQbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3IuZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9PSBudWxsLCAnJXMoLi4uKTogQ2Fubm90IHVwZGF0ZSBkdXJpbmcgYW4gZXhpc3Rpbmcgc3RhdGUgdHJhbnNpdGlvbiAoc3VjaCBhcyAnICsgJ3dpdGhpbiBgcmVuZGVyYCBvciBhbm90aGVyIGNvbXBvbmVudFxcJ3MgY29uc3RydWN0b3IpLiBSZW5kZXIgbWV0aG9kcyAnICsgJ3Nob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gb2YgcHJvcHMgYW5kIHN0YXRlOyBjb25zdHJ1Y3RvciAnICsgJ3NpZGUtZWZmZWN0cyBhcmUgYW4gYW50aS1wYXR0ZXJuLCBidXQgY2FuIGJlIG1vdmVkIHRvICcgKyAnYGNvbXBvbmVudFdpbGxNb3VudGAuJywgY2FsbGVyTmFtZSkgOiB2b2lkIDA7XG4gIH1cblxuICByZXR1cm4gaW50ZXJuYWxJbnN0YW5jZTtcbn1cblxuLyoqXG4gKiBSZWFjdFVwZGF0ZVF1ZXVlIGFsbG93cyBmb3Igc3RhdGUgdXBkYXRlcyB0byBiZSBzY2hlZHVsZWQgaW50byBhIGxhdGVyXG4gKiByZWNvbmNpbGlhdGlvbiBzdGVwLlxuICovXG52YXIgUmVhY3RVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICAgIGlmIChvd25lciAhPT0gbnVsbCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhvd25lci5fd2FybmVkQWJvdXRSZWZzSW5SZW5kZXIsICclcyBpcyBhY2Nlc3NpbmcgaXNNb3VudGVkIGluc2lkZSBpdHMgcmVuZGVyKCkgZnVuY3Rpb24uICcgKyAncmVuZGVyKCkgc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiBvZiBwcm9wcyBhbmQgc3RhdGUuIEl0IHNob3VsZCAnICsgJ25ldmVyIGFjY2VzcyBzb21ldGhpbmcgdGhhdCByZXF1aXJlcyBzdGFsZSBkYXRhIGZyb20gdGhlIHByZXZpb3VzICcgKyAncmVuZGVyLCBzdWNoIGFzIHJlZnMuIE1vdmUgdGhpcyBsb2dpYyB0byBjb21wb25lbnREaWRNb3VudCBhbmQgJyArICdjb21wb25lbnREaWRVcGRhdGUgaW5zdGVhZC4nLCBvd25lci5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICAgIG93bmVyLl93YXJuZWRBYm91dFJlZnNJblJlbmRlciA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gUmVhY3RJbnN0YW5jZU1hcC5nZXQocHVibGljSW5zdGFuY2UpO1xuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICAvLyBEdXJpbmcgY29tcG9uZW50V2lsbE1vdW50IGFuZCByZW5kZXIgdGhpcyB3aWxsIHN0aWxsIGJlIG51bGwgYnV0IGFmdGVyXG4gICAgICAvLyB0aGF0IHdpbGwgYWx3YXlzIHJlbmRlciB0byBzb21ldGhpbmcuIEF0IGxlYXN0IGZvciBub3cuIFNvIHdlIGNhbiB1c2VcbiAgICAgIC8vIHRoaXMgaGFjay5cbiAgICAgIHJldHVybiAhIWludGVybmFsSW5zdGFuY2UuX3JlbmRlcmVkQ29tcG9uZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGFmdGVyIGFsbCB0aGUgcGVuZGluZyB1cGRhdGVzXG4gICAqIGhhdmUgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0byB1c2UgYXMgYHRoaXNgIGNvbnRleHQuXG4gICAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhbGxlck5hbWUgTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlQ2FsbGJhY2s6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICBSZWFjdFVwZGF0ZVF1ZXVlLnZhbGlkYXRlQ2FsbGJhY2soY2FsbGJhY2ssIGNhbGxlck5hbWUpO1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlKTtcblxuICAgIC8vIFByZXZpb3VzbHkgd2Ugd291bGQgdGhyb3cgYW4gZXJyb3IgaWYgd2UgZGlkbid0IGhhdmUgYW4gaW50ZXJuYWxcbiAgICAvLyBpbnN0YW5jZS4gU2luY2Ugd2Ugd2FudCB0byBtYWtlIGl0IGEgbm8tb3AgaW5zdGVhZCwgd2UgbWlycm9yIHRoZSBzYW1lXG4gICAgLy8gYmVoYXZpb3Igd2UgaGF2ZSBpbiBvdGhlciBlbnF1ZXVlKiBtZXRob2RzLlxuICAgIC8vIFdlIGFsc28gbmVlZCB0byBpZ25vcmUgY2FsbGJhY2tzIGluIGNvbXBvbmVudFdpbGxNb3VudC4gU2VlXG4gICAgLy8gZW5xdWV1ZVVwZGF0ZXMuXG4gICAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcykge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcyA9IFtjYWxsYmFja107XG4gICAgfVxuICAgIC8vIFRPRE86IFRoZSBjYWxsYmFjayBoZXJlIGlzIGlnbm9yZWQgd2hlbiBzZXRTdGF0ZSBpcyBjYWxsZWQgZnJvbVxuICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudC4gRWl0aGVyIGZpeCBpdCBvciBkaXNhbGxvdyBkb2luZyBzbyBjb21wbGV0ZWx5IGluXG4gICAgLy8gZmF2b3Igb2YgZ2V0SW5pdGlhbFN0YXRlLiBBbHRlcm5hdGl2ZWx5LCB3ZSBjYW4gZGlzYWxsb3dcbiAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgZHVyaW5nIHNlcnZlci1zaWRlIHJlbmRlcmluZy5cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIGVucXVldWVDYWxsYmFja0ludGVybmFsOiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcykge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0NhbGxiYWNrcyA9IFtjYWxsYmFja107XG4gICAgfVxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSB0cnVlO1xuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IFtjb21wbGV0ZVN0YXRlXTtcbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gdHJ1ZTtcblxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlKSB7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuXG4gICAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHF1ZXVlID0gaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ1N0YXRlUXVldWUgfHwgKGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gW10pO1xuICAgIHF1ZXVlLnB1c2gocGFydGlhbFN0YXRlKTtcblxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgZW5xdWV1ZUVsZW1lbnRJbnRlcm5hbDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIG5ld0VsZW1lbnQpIHtcbiAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nRWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICB2YWxpZGF0ZUNhbGxiYWNrOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICAhKCFjYWxsYmFjayB8fCB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IEV4cGVjdGVkIHRoZSBsYXN0IG9wdGlvbmFsIGBjYWxsYmFja2AgYXJndW1lbnQgdG8gYmUgYSAnICsgJ2Z1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiAlcy4nLCBjYWxsZXJOYW1lLCBmb3JtYXRVbmV4cGVjdGVkQXJndW1lbnQoY2FsbGJhY2spKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFVwZGF0ZVF1ZXVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFVwZGF0ZVF1ZXVlLmpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEluc3RhbmNlTWFwXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGBSZWFjdEluc3RhbmNlTWFwYCBtYWludGFpbnMgYSBtYXBwaW5nIGZyb20gYSBwdWJsaWMgZmFjaW5nIHN0YXRlZnVsXG4gKiBpbnN0YW5jZSAoa2V5KSBhbmQgdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uICh2YWx1ZSkuIFRoaXMgYWxsb3dzIHB1YmxpY1xuICogbWV0aG9kcyB0byBhY2NlcHQgdGhlIHVzZXIgZmFjaW5nIGluc3RhbmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBtYXAgdGhlbSBiYWNrXG4gKiB0byBpbnRlcm5hbCBtZXRob2RzLlxuICovXG5cbi8vIFRPRE86IFJlcGxhY2UgdGhpcyB3aXRoIEVTNjogdmFyIFJlYWN0SW5zdGFuY2VNYXAgPSBuZXcgTWFwKCk7XG5cbnZhciBSZWFjdEluc3RhbmNlTWFwID0ge1xuXG4gIC8qKlxuICAgKiBUaGlzIEFQSSBzaG91bGQgYmUgY2FsbGVkIGBkZWxldGVgIGJ1dCB3ZSdkIGhhdmUgdG8gbWFrZSBzdXJlIHRvIGFsd2F5c1xuICAgKiB0cmFuc2Zvcm0gdGhlc2UgdG8gc3RyaW5ncyBmb3IgSUUgc3VwcG9ydC4gV2hlbiB0aGlzIHRyYW5zZm9ybSBpcyBmdWxseVxuICAgKiBzdXBwb3J0ZWQgd2UgY2FuIHJlbmFtZSBpdC5cbiAgICovXG4gIHJlbW92ZTogZnVuY3Rpb24gKGtleSkge1xuICAgIGtleS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZTtcbiAgfSxcblxuICBoYXM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgIT09IHVuZGVmaW5lZDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgPSB2YWx1ZTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0SW5zdGFuY2VNYXA7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW5zdGFuY2VNYXAuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VXBkYXRlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBDYWxsYmFja1F1ZXVlID0gcmVxdWlyZSgnLi9DYWxsYmFja1F1ZXVlJyk7XG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RGZWF0dXJlRmxhZ3MgPSByZXF1aXJlKCcuL1JlYWN0RmVhdHVyZUZsYWdzJyk7XG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgnLi9SZWFjdFBlcmYnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFRyYW5zYWN0aW9uID0gcmVxdWlyZSgnLi9UcmFuc2FjdGlvbicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBkaXJ0eUNvbXBvbmVudHMgPSBbXTtcbnZhciBhc2FwQ2FsbGJhY2tRdWV1ZSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKCk7XG52YXIgYXNhcEVucXVldWVkID0gZmFsc2U7XG5cbnZhciBiYXRjaGluZ1N0cmF0ZWd5ID0gbnVsbDtcblxuZnVuY3Rpb24gZW5zdXJlSW5qZWN0ZWQoKSB7XG4gICEoUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24gJiYgYmF0Y2hpbmdTdHJhdGVneSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IGluamVjdCBhIHJlY29uY2lsZSB0cmFuc2FjdGlvbiBjbGFzcyBhbmQgYmF0Y2hpbmcgJyArICdzdHJhdGVneScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbn1cblxudmFyIE5FU1RFRF9VUERBVEVTID0ge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggPSBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCAhPT0gZGlydHlDb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gQWRkaXRpb25hbCB1cGRhdGVzIHdlcmUgZW5xdWV1ZWQgYnkgY29tcG9uZW50RGlkVXBkYXRlIGhhbmRsZXJzIG9yXG4gICAgICAvLyBzaW1pbGFyOyBiZWZvcmUgb3VyIG93biBVUERBVEVfUVVFVUVJTkcgd3JhcHBlciBjbG9zZXMsIHdlIHdhbnQgdG8gcnVuXG4gICAgICAvLyB0aGVzZSBuZXcgdXBkYXRlcyBzbyB0aGF0IGlmIEEncyBjb21wb25lbnREaWRVcGRhdGUgY2FsbHMgc2V0U3RhdGUgb25cbiAgICAgIC8vIEIsIEIgd2lsbCB1cGRhdGUgYmVmb3JlIHRoZSBjYWxsYmFjayBBJ3MgdXBkYXRlciBwcm92aWRlZCB3aGVuIGNhbGxpbmdcbiAgICAgIC8vIHNldFN0YXRlLlxuICAgICAgZGlydHlDb21wb25lbnRzLnNwbGljZSgwLCB0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCk7XG4gICAgICBmbHVzaEJhdGNoZWRVcGRhdGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcnR5Q29tcG9uZW50cy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfVxufTtcblxudmFyIFVQREFURV9RVUVVRUlORyA9IHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZS5yZXNldCgpO1xuICB9LFxuICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZS5ub3RpZnlBbGwoKTtcbiAgfVxufTtcblxudmFyIFRSQU5TQUNUSU9OX1dSQVBQRVJTID0gW05FU1RFRF9VUERBVEVTLCBVUERBVEVfUVVFVUVJTkddO1xuXG5mdW5jdGlvbiBSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uKCkge1xuICB0aGlzLnJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uKCk7XG4gIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoID0gbnVsbDtcbiAgdGhpcy5jYWxsYmFja1F1ZXVlID0gQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQoKTtcbiAgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbiA9IFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLmdldFBvb2xlZChcbiAgLyogdXNlQ3JlYXRlRWxlbWVudCAqL3RydWUpO1xufVxuXG5fYXNzaWduKFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24ucHJvdG90eXBlLCBUcmFuc2FjdGlvbi5NaXhpbiwge1xuICBnZXRUcmFuc2FjdGlvbldyYXBwZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFRSQU5TQUNUSU9OX1dSQVBQRVJTO1xuICB9LFxuXG4gIGRlc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCA9IG51bGw7XG4gICAgQ2FsbGJhY2tRdWV1ZS5yZWxlYXNlKHRoaXMuY2FsbGJhY2tRdWV1ZSk7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gbnVsbDtcbiAgICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5yZWxlYXNlKHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24pO1xuICAgIHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24gPSBudWxsO1xuICB9LFxuXG4gIHBlcmZvcm06IGZ1bmN0aW9uIChtZXRob2QsIHNjb3BlLCBhKSB7XG4gICAgLy8gRXNzZW50aWFsbHkgY2FsbHMgYHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24ucGVyZm9ybShtZXRob2QsIHNjb3BlLCBhKWBcbiAgICAvLyB3aXRoIHRoaXMgdHJhbnNhY3Rpb24ncyB3cmFwcGVycyBhcm91bmQgaXQuXG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uLk1peGluLnBlcmZvcm0uY2FsbCh0aGlzLCB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uLnBlcmZvcm0sIHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24sIG1ldGhvZCwgc2NvcGUsIGEpO1xuICB9XG59KTtcblxuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24pO1xuXG5mdW5jdGlvbiBiYXRjaGVkVXBkYXRlcyhjYWxsYmFjaywgYSwgYiwgYywgZCwgZSkge1xuICBlbnN1cmVJbmplY3RlZCgpO1xuICBiYXRjaGluZ1N0cmF0ZWd5LmJhdGNoZWRVcGRhdGVzKGNhbGxiYWNrLCBhLCBiLCBjLCBkLCBlKTtcbn1cblxuLyoqXG4gKiBBcnJheSBjb21wYXJhdG9yIGZvciBSZWFjdENvbXBvbmVudHMgYnkgbW91bnQgb3JkZXJpbmcuXG4gKlxuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYzEgZmlyc3QgY29tcG9uZW50IHlvdSdyZSBjb21wYXJpbmdcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGMyIHNlY29uZCBjb21wb25lbnQgeW91J3JlIGNvbXBhcmluZ1xuICogQHJldHVybiB7bnVtYmVyfSBSZXR1cm4gdmFsdWUgdXNhYmxlIGJ5IEFycmF5LnByb3RvdHlwZS5zb3J0KCkuXG4gKi9cbmZ1bmN0aW9uIG1vdW50T3JkZXJDb21wYXJhdG9yKGMxLCBjMikge1xuICByZXR1cm4gYzEuX21vdW50T3JkZXIgLSBjMi5fbW91bnRPcmRlcjtcbn1cblxuZnVuY3Rpb24gcnVuQmF0Y2hlZFVwZGF0ZXModHJhbnNhY3Rpb24pIHtcbiAgdmFyIGxlbiA9IHRyYW5zYWN0aW9uLmRpcnR5Q29tcG9uZW50c0xlbmd0aDtcbiAgIShsZW4gPT09IGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIGZsdXNoIHRyYW5zYWN0aW9uXFwncyBzdG9yZWQgZGlydHktY29tcG9uZW50cyBsZW5ndGggKCVzKSB0byAnICsgJ21hdGNoIGRpcnR5LWNvbXBvbmVudHMgYXJyYXkgbGVuZ3RoICglcykuJywgbGVuLCBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgLy8gU2luY2UgcmVjb25jaWxpbmcgYSBjb21wb25lbnQgaGlnaGVyIGluIHRoZSBvd25lciBoaWVyYXJjaHkgdXN1YWxseSAobm90XG4gIC8vIGFsd2F5cyAtLSBzZWUgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkpIHdpbGwgcmVjb25jaWxlIGNoaWxkcmVuLCByZWNvbmNpbGVcbiAgLy8gdGhlbSBiZWZvcmUgdGhlaXIgY2hpbGRyZW4gYnkgc29ydGluZyB0aGUgYXJyYXkuXG4gIGRpcnR5Q29tcG9uZW50cy5zb3J0KG1vdW50T3JkZXJDb21wYXJhdG9yKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgLy8gSWYgYSBjb21wb25lbnQgaXMgdW5tb3VudGVkIGJlZm9yZSBwZW5kaW5nIGNoYW5nZXMgYXBwbHksIGl0IHdpbGwgc3RpbGxcbiAgICAvLyBiZSBoZXJlLCBidXQgd2UgYXNzdW1lIHRoYXQgaXQgaGFzIGNsZWFyZWQgaXRzIF9wZW5kaW5nQ2FsbGJhY2tzIGFuZFxuICAgIC8vIHRoYXQgcGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5IGlzIGEgbm9vcC5cbiAgICB2YXIgY29tcG9uZW50ID0gZGlydHlDb21wb25lbnRzW2ldO1xuXG4gICAgLy8gSWYgcGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5IGhhcHBlbnMgdG8gZW5xdWV1ZSBhbnkgbmV3IHVwZGF0ZXMsIHdlXG4gICAgLy8gc2hvdWxkbid0IGV4ZWN1dGUgdGhlIGNhbGxiYWNrcyB1bnRpbCB0aGUgbmV4dCByZW5kZXIgaGFwcGVucywgc29cbiAgICAvLyBzdGFzaCB0aGUgY2FsbGJhY2tzIGZpcnN0XG4gICAgdmFyIGNhbGxiYWNrcyA9IGNvbXBvbmVudC5fcGVuZGluZ0NhbGxiYWNrcztcbiAgICBjb21wb25lbnQuX3BlbmRpbmdDYWxsYmFja3MgPSBudWxsO1xuXG4gICAgdmFyIG1hcmtlck5hbWU7XG4gICAgaWYgKFJlYWN0RmVhdHVyZUZsYWdzLmxvZ1RvcExldmVsUmVuZGVycykge1xuICAgICAgdmFyIG5hbWVkQ29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgLy8gRHVjayB0eXBlIFRvcExldmVsV3JhcHBlci4gVGhpcyBpcyBwcm9iYWJseSBhbHdheXMgdHJ1ZS5cbiAgICAgIGlmIChjb21wb25lbnQuX2N1cnJlbnRFbGVtZW50LnByb3BzID09PSBjb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50Ll9jdXJyZW50RWxlbWVudCkge1xuICAgICAgICBuYW1lZENvbXBvbmVudCA9IGNvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgICB9XG4gICAgICBtYXJrZXJOYW1lID0gJ1JlYWN0IHVwZGF0ZTogJyArIG5hbWVkQ29tcG9uZW50LmdldE5hbWUoKTtcbiAgICAgIGNvbnNvbGUudGltZShtYXJrZXJOYW1lKTtcbiAgICB9XG5cbiAgICBSZWFjdFJlY29uY2lsZXIucGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5KGNvbXBvbmVudCwgdHJhbnNhY3Rpb24ucmVjb25jaWxlVHJhbnNhY3Rpb24pO1xuXG4gICAgaWYgKG1hcmtlck5hbWUpIHtcbiAgICAgIGNvbnNvbGUudGltZUVuZChtYXJrZXJOYW1lKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNhbGxiYWNrcy5sZW5ndGg7IGorKykge1xuICAgICAgICB0cmFuc2FjdGlvbi5jYWxsYmFja1F1ZXVlLmVucXVldWUoY2FsbGJhY2tzW2pdLCBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBmbHVzaEJhdGNoZWRVcGRhdGVzID0gZnVuY3Rpb24gKCkge1xuICAvLyBSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uJ3Mgd3JhcHBlcnMgd2lsbCBjbGVhciB0aGUgZGlydHlDb21wb25lbnRzXG4gIC8vIGFycmF5IGFuZCBwZXJmb3JtIGFueSB1cGRhdGVzIGVucXVldWVkIGJ5IG1vdW50LXJlYWR5IGhhbmRsZXJzIChpLmUuLFxuICAvLyBjb21wb25lbnREaWRVcGRhdGUpIGJ1dCB3ZSBuZWVkIHRvIGNoZWNrIGhlcmUgdG9vIGluIG9yZGVyIHRvIGNhdGNoXG4gIC8vIHVwZGF0ZXMgZW5xdWV1ZWQgYnkgc2V0U3RhdGUgY2FsbGJhY2tzIGFuZCBhc2FwIGNhbGxzLlxuICB3aGlsZSAoZGlydHlDb21wb25lbnRzLmxlbmd0aCB8fCBhc2FwRW5xdWV1ZWQpIHtcbiAgICBpZiAoZGlydHlDb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHRyYW5zYWN0aW9uID0gUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbi5nZXRQb29sZWQoKTtcbiAgICAgIHRyYW5zYWN0aW9uLnBlcmZvcm0ocnVuQmF0Y2hlZFVwZGF0ZXMsIG51bGwsIHRyYW5zYWN0aW9uKTtcbiAgICAgIFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24ucmVsZWFzZSh0cmFuc2FjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGFzYXBFbnF1ZXVlZCkge1xuICAgICAgYXNhcEVucXVldWVkID0gZmFsc2U7XG4gICAgICB2YXIgcXVldWUgPSBhc2FwQ2FsbGJhY2tRdWV1ZTtcbiAgICAgIGFzYXBDYWxsYmFja1F1ZXVlID0gQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQoKTtcbiAgICAgIHF1ZXVlLm5vdGlmeUFsbCgpO1xuICAgICAgQ2FsbGJhY2tRdWV1ZS5yZWxlYXNlKHF1ZXVlKTtcbiAgICB9XG4gIH1cbn07XG5mbHVzaEJhdGNoZWRVcGRhdGVzID0gUmVhY3RQZXJmLm1lYXN1cmUoJ1JlYWN0VXBkYXRlcycsICdmbHVzaEJhdGNoZWRVcGRhdGVzJywgZmx1c2hCYXRjaGVkVXBkYXRlcyk7XG5cbi8qKlxuICogTWFyayBhIGNvbXBvbmVudCBhcyBuZWVkaW5nIGEgcmVyZW5kZXIsIGFkZGluZyBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBhXG4gKiBsaXN0IG9mIGZ1bmN0aW9ucyB3aGljaCB3aWxsIGJlIGV4ZWN1dGVkIG9uY2UgdGhlIHJlcmVuZGVyIG9jY3Vycy5cbiAqL1xuZnVuY3Rpb24gZW5xdWV1ZVVwZGF0ZShjb21wb25lbnQpIHtcbiAgZW5zdXJlSW5qZWN0ZWQoKTtcblxuICAvLyBWYXJpb3VzIHBhcnRzIG9mIG91ciBjb2RlIChzdWNoIGFzIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50J3NcbiAgLy8gX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCkgYXNzdW1lIHRoYXQgY2FsbHMgdG8gcmVuZGVyIGFyZW4ndCBuZXN0ZWQ7XG4gIC8vIHZlcmlmeSB0aGF0IHRoYXQncyB0aGUgY2FzZS4gKFRoaXMgaXMgY2FsbGVkIGJ5IGVhY2ggdG9wLWxldmVsIHVwZGF0ZVxuICAvLyBmdW5jdGlvbiwgbGlrZSBzZXRQcm9wcywgc2V0U3RhdGUsIGZvcmNlVXBkYXRlLCBldGMuOyBjcmVhdGlvbiBhbmRcbiAgLy8gZGVzdHJ1Y3Rpb24gb2YgdG9wLWxldmVsIGNvbXBvbmVudHMgaXMgZ3VhcmRlZCBpbiBSZWFjdE1vdW50LilcblxuICBpZiAoIWJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMpIHtcbiAgICBiYXRjaGluZ1N0cmF0ZWd5LmJhdGNoZWRVcGRhdGVzKGVucXVldWVVcGRhdGUsIGNvbXBvbmVudCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGlydHlDb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbn1cblxuLyoqXG4gKiBFbnF1ZXVlIGEgY2FsbGJhY2sgdG8gYmUgcnVuIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgYmF0Y2hpbmcgY3ljbGUuIFRocm93c1xuICogaWYgbm8gdXBkYXRlcyBhcmUgY3VycmVudGx5IGJlaW5nIHBlcmZvcm1lZC5cbiAqL1xuZnVuY3Rpb24gYXNhcChjYWxsYmFjaywgY29udGV4dCkge1xuICAhYmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXMuYXNhcDogQ2FuXFwndCBlbnF1ZXVlIGFuIGFzYXAgY2FsbGJhY2sgaW4gYSBjb250ZXh0IHdoZXJlJyArICd1cGRhdGVzIGFyZSBub3QgYmVpbmcgYmF0Y2hlZC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIGFzYXBDYWxsYmFja1F1ZXVlLmVucXVldWUoY2FsbGJhY2ssIGNvbnRleHQpO1xuICBhc2FwRW5xdWV1ZWQgPSB0cnVlO1xufVxuXG52YXIgUmVhY3RVcGRhdGVzSW5qZWN0aW9uID0ge1xuICBpbmplY3RSZWNvbmNpbGVUcmFuc2FjdGlvbjogZnVuY3Rpb24gKFJlY29uY2lsZVRyYW5zYWN0aW9uKSB7XG4gICAgIVJlY29uY2lsZVRyYW5zYWN0aW9uID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBwcm92aWRlIGEgcmVjb25jaWxlIHRyYW5zYWN0aW9uIGNsYXNzJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uID0gUmVjb25jaWxlVHJhbnNhY3Rpb247XG4gIH0sXG5cbiAgaW5qZWN0QmF0Y2hpbmdTdHJhdGVneTogZnVuY3Rpb24gKF9iYXRjaGluZ1N0cmF0ZWd5KSB7XG4gICAgIV9iYXRjaGluZ1N0cmF0ZWd5ID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBwcm92aWRlIGEgYmF0Y2hpbmcgc3RyYXRlZ3knKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgISh0eXBlb2YgX2JhdGNoaW5nU3RyYXRlZ3kuYmF0Y2hlZFVwZGF0ZXMgPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBwcm92aWRlIGEgYmF0Y2hlZFVwZGF0ZXMoKSBmdW5jdGlvbicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAhKHR5cGVvZiBfYmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcyA9PT0gJ2Jvb2xlYW4nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhbiBpc0JhdGNoaW5nVXBkYXRlcyBib29sZWFuIGF0dHJpYnV0ZScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBiYXRjaGluZ1N0cmF0ZWd5ID0gX2JhdGNoaW5nU3RyYXRlZ3k7XG4gIH1cbn07XG5cbnZhciBSZWFjdFVwZGF0ZXMgPSB7XG4gIC8qKlxuICAgKiBSZWFjdCByZWZlcmVuY2VzIGBSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uYCB1c2luZyB0aGlzIHByb3BlcnR5IGluIG9yZGVyXG4gICAqIHRvIGFsbG93IGRlcGVuZGVuY3kgaW5qZWN0aW9uLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIFJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb246IG51bGwsXG5cbiAgYmF0Y2hlZFVwZGF0ZXM6IGJhdGNoZWRVcGRhdGVzLFxuICBlbnF1ZXVlVXBkYXRlOiBlbnF1ZXVlVXBkYXRlLFxuICBmbHVzaEJhdGNoZWRVcGRhdGVzOiBmbHVzaEJhdGNoZWRVcGRhdGVzLFxuICBpbmplY3Rpb246IFJlYWN0VXBkYXRlc0luamVjdGlvbixcbiAgYXNhcDogYXNhcFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFVwZGF0ZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgQ2FsbGJhY2tRdWV1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgcHNldWRvLWV2ZW50IG1vZHVsZSB0byBoZWxwIGtlZXAgdHJhY2sgb2YgY29tcG9uZW50cyB3YWl0aW5nIHRvXG4gKiBiZSBub3RpZmllZCB3aGVuIHRoZWlyIERPTSByZXByZXNlbnRhdGlvbnMgYXJlIGF2YWlsYWJsZSBmb3IgdXNlLlxuICpcbiAqIFRoaXMgaW1wbGVtZW50cyBgUG9vbGVkQ2xhc3NgLCBzbyB5b3Ugc2hvdWxkIG5ldmVyIG5lZWQgdG8gaW5zdGFudGlhdGUgdGhpcy5cbiAqIEluc3RlYWQsIHVzZSBgQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQoKWAuXG4gKlxuICogQGNsYXNzIFJlYWN0TW91bnRSZWFkeVxuICogQGltcGxlbWVudHMgUG9vbGVkQ2xhc3NcbiAqIEBpbnRlcm5hbFxuICovXG5mdW5jdGlvbiBDYWxsYmFja1F1ZXVlKCkge1xuICB0aGlzLl9jYWxsYmFja3MgPSBudWxsO1xuICB0aGlzLl9jb250ZXh0cyA9IG51bGw7XG59XG5cbl9hc3NpZ24oQ2FsbGJhY2tRdWV1ZS5wcm90b3R5cGUsIHtcblxuICAvKipcbiAgICogRW5xdWV1ZXMgYSBjYWxsYmFjayB0byBiZSBpbnZva2VkIHdoZW4gYG5vdGlmeUFsbGAgaXMgaW52b2tlZC5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgSW52b2tlZCB3aGVuIGBub3RpZnlBbGxgIGlzIGludm9rZWQuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gY29udGV4dCBDb250ZXh0IHRvIGNhbGwgYGNhbGxiYWNrYCB3aXRoLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWU6IGZ1bmN0aW9uIChjYWxsYmFjaywgY29udGV4dCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCBbXTtcbiAgICB0aGlzLl9jb250ZXh0cyA9IHRoaXMuX2NvbnRleHRzIHx8IFtdO1xuICAgIHRoaXMuX2NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB0aGlzLl9jb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbnZva2VzIGFsbCBlbnF1ZXVlZCBjYWxsYmFja3MgYW5kIGNsZWFycyB0aGUgcXVldWUuIFRoaXMgaXMgaW52b2tlZCBhZnRlclxuICAgKiB0aGUgRE9NIHJlcHJlc2VudGF0aW9uIG9mIGEgY29tcG9uZW50IGhhcyBiZWVuIGNyZWF0ZWQgb3IgdXBkYXRlZC5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBub3RpZnlBbGw6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzO1xuICAgIHZhciBjb250ZXh0cyA9IHRoaXMuX2NvbnRleHRzO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICEoY2FsbGJhY2tzLmxlbmd0aCA9PT0gY29udGV4dHMubGVuZ3RoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdNaXNtYXRjaGVkIGxpc3Qgb2YgY29udGV4dHMgaW4gY2FsbGJhY2sgcXVldWUnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICB0aGlzLl9jYWxsYmFja3MgPSBudWxsO1xuICAgICAgdGhpcy5fY29udGV4dHMgPSBudWxsO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwoY29udGV4dHNbaV0pO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2tzLmxlbmd0aCA9IDA7XG4gICAgICBjb250ZXh0cy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfSxcblxuICBjaGVja3BvaW50OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrcyA/IHRoaXMuX2NhbGxiYWNrcy5sZW5ndGggOiAwO1xuICB9LFxuXG4gIHJvbGxiYWNrOiBmdW5jdGlvbiAobGVuKSB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLmxlbmd0aCA9IGxlbjtcbiAgICAgIHRoaXMuX2NvbnRleHRzLmxlbmd0aCA9IGxlbjtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgaW50ZXJuYWwgcXVldWUuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRleHRzID0gbnVsbDtcbiAgfSxcblxuICAvKipcbiAgICogYFBvb2xlZENsYXNzYCBsb29rcyBmb3IgdGhpcy5cbiAgICovXG4gIGRlc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cblxufSk7XG5cblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhDYWxsYmFja1F1ZXVlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYWxsYmFja1F1ZXVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEZlYXR1cmVGbGFnc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RmVhdHVyZUZsYWdzID0ge1xuICAvLyBXaGVuIHRydWUsIGNhbGwgY29uc29sZS50aW1lKCkgYmVmb3JlIGFuZCAudGltZUVuZCgpIGFmdGVyIGVhY2ggdG9wLWxldmVsXG4gIC8vIHJlbmRlciAoYm90aCBpbml0aWFsIHJlbmRlcnMgYW5kIHVwZGF0ZXMpLiBVc2VmdWwgd2hlbiBsb29raW5nIGF0IHByb2QtbW9kZVxuICAvLyB0aW1lbGluZSBwcm9maWxlcyBpbiBDaHJvbWUsIGZvciBleGFtcGxlLlxuICBsb2dUb3BMZXZlbFJlbmRlcnM6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RmVhdHVyZUZsYWdzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEZlYXR1cmVGbGFncy5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RSZWNvbmNpbGVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RSZWYgPSByZXF1aXJlKCcuL1JlYWN0UmVmJyk7XG52YXIgUmVhY3RJbnN0cnVtZW50YXRpb24gPSByZXF1aXJlKCcuL1JlYWN0SW5zdHJ1bWVudGF0aW9uJyk7XG5cbi8qKlxuICogSGVscGVyIHRvIGNhbGwgUmVhY3RSZWYuYXR0YWNoUmVmcyB3aXRoIHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCwgc3BsaXQgb3V0XG4gKiB0byBhdm9pZCBhbGxvY2F0aW9ucyBpbiB0aGUgdHJhbnNhY3Rpb24gbW91bnQtcmVhZHkgcXVldWUuXG4gKi9cbmZ1bmN0aW9uIGF0dGFjaFJlZnMoKSB7XG4gIFJlYWN0UmVmLmF0dGFjaFJlZnModGhpcywgdGhpcy5fY3VycmVudEVsZW1lbnQpO1xufVxuXG52YXIgUmVhY3RSZWNvbmNpbGVyID0ge1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50LCByZW5kZXJzIG1hcmt1cCwgYW5kIHJlZ2lzdGVycyBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGludGVybmFsSW5zdGFuY2VcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gdGhlIGNvbnRhaW5pbmcgbmF0aXZlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IGluZm8gYWJvdXQgdGhlIG5hdGl2ZSBjb250YWluZXJcbiAgICogQHJldHVybiB7P3N0cmluZ30gUmVuZGVyZWQgbWFya3VwIHRvIGJlIGluc2VydGVkIGludG8gdGhlIERPTS5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCB0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KSB7XG4gICAgdmFyIG1hcmt1cCA9IGludGVybmFsSW5zdGFuY2UubW91bnRDb21wb25lbnQodHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCk7XG4gICAgaWYgKGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50ICYmIGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50LnJlZiAhPSBudWxsKSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGF0dGFjaFJlZnMsIGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uTW91bnRDb21wb25lbnQoaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB2YWx1ZSB0aGF0IGNhbiBiZSBwYXNzZWQgdG9cbiAgICogUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXAuXG4gICAqL1xuICBnZXROYXRpdmVOb2RlOiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIHJldHVybiBpbnRlcm5hbEluc3RhbmNlLmdldE5hdGl2ZU5vZGUoKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVsZWFzZXMgYW55IHJlc291cmNlcyBhbGxvY2F0ZWQgYnkgYG1vdW50Q29tcG9uZW50YC5cbiAgICpcbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIHNhZmVseSkge1xuICAgIFJlYWN0UmVmLmRldGFjaFJlZnMoaW50ZXJuYWxJbnN0YW5jZSwgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQpO1xuICAgIGludGVybmFsSW5zdGFuY2UudW5tb3VudENvbXBvbmVudChzYWZlbHkpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Vbm1vdW50Q29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVXBkYXRlIGEgY29tcG9uZW50IHVzaW5nIGEgbmV3IGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGludGVybmFsSW5zdGFuY2VcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5leHRFbGVtZW50XG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICogQGludGVybmFsXG4gICAqL1xuICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgbmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIHByZXZFbGVtZW50ID0gaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQ7XG5cbiAgICBpZiAobmV4dEVsZW1lbnQgPT09IHByZXZFbGVtZW50ICYmIGNvbnRleHQgPT09IGludGVybmFsSW5zdGFuY2UuX2NvbnRleHQpIHtcbiAgICAgIC8vIFNpbmNlIGVsZW1lbnRzIGFyZSBpbW11dGFibGUgYWZ0ZXIgdGhlIG93bmVyIGlzIHJlbmRlcmVkLFxuICAgICAgLy8gd2UgY2FuIGRvIGEgY2hlYXAgaWRlbnRpdHkgY29tcGFyZSBoZXJlIHRvIGRldGVybWluZSBpZiB0aGlzIGlzIGFcbiAgICAgIC8vIHN1cGVyZmx1b3VzIHJlY29uY2lsZS4gSXQncyBwb3NzaWJsZSBmb3Igc3RhdGUgdG8gYmUgbXV0YWJsZSBidXQgc3VjaFxuICAgICAgLy8gY2hhbmdlIHNob3VsZCB0cmlnZ2VyIGFuIHVwZGF0ZSBvZiB0aGUgb3duZXIgd2hpY2ggd291bGQgcmVjcmVhdGVcbiAgICAgIC8vIHRoZSBlbGVtZW50LiBXZSBleHBsaWNpdGx5IGNoZWNrIGZvciB0aGUgZXhpc3RlbmNlIG9mIGFuIG93bmVyIHNpbmNlXG4gICAgICAvLyBpdCdzIHBvc3NpYmxlIGZvciBhbiBlbGVtZW50IGNyZWF0ZWQgb3V0c2lkZSBhIGNvbXBvc2l0ZSB0byBiZVxuICAgICAgLy8gZGVlcGx5IG11dGF0ZWQgYW5kIHJldXNlZC5cblxuICAgICAgLy8gVE9ETzogQmFpbGluZyBvdXQgZWFybHkgaXMganVzdCBhIHBlcmYgb3B0aW1pemF0aW9uIHJpZ2h0P1xuICAgICAgLy8gVE9ETzogUmVtb3ZpbmcgdGhlIHJldHVybiBzdGF0ZW1lbnQgc2hvdWxkIGFmZmVjdCBjb3JyZWN0bmVzcz9cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcmVmc0NoYW5nZWQgPSBSZWFjdFJlZi5zaG91bGRVcGRhdGVSZWZzKHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCk7XG5cbiAgICBpZiAocmVmc0NoYW5nZWQpIHtcbiAgICAgIFJlYWN0UmVmLmRldGFjaFJlZnMoaW50ZXJuYWxJbnN0YW5jZSwgcHJldkVsZW1lbnQpO1xuICAgIH1cblxuICAgIGludGVybmFsSW5zdGFuY2UucmVjZWl2ZUNvbXBvbmVudChuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuXG4gICAgaWYgKHJlZnNDaGFuZ2VkICYmIGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50ICYmIGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50LnJlZiAhPSBudWxsKSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGF0dGFjaFJlZnMsIGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25VcGRhdGVDb21wb25lbnQoaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBGbHVzaCBhbnkgZGlydHkgY2hhbmdlcyBpbiBhIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gaW50ZXJuYWxJbnN0YW5jZVxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgdHJhbnNhY3Rpb24pIHtcbiAgICBpbnRlcm5hbEluc3RhbmNlLnBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeSh0cmFuc2FjdGlvbik7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblVwZGF0ZUNvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFJlY29uY2lsZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UmVjb25jaWxlci5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RSZWZcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdE93bmVyJyk7XG5cbnZhciBSZWFjdFJlZiA9IHt9O1xuXG5mdW5jdGlvbiBhdHRhY2hSZWYocmVmLCBjb21wb25lbnQsIG93bmVyKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZWdhY3kgcmVmXG4gICAgUmVhY3RPd25lci5hZGRDb21wb25lbnRBc1JlZlRvKGNvbXBvbmVudCwgcmVmLCBvd25lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGV0YWNoUmVmKHJlZiwgY29tcG9uZW50LCBvd25lcikge1xuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZihudWxsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMZWdhY3kgcmVmXG4gICAgUmVhY3RPd25lci5yZW1vdmVDb21wb25lbnRBc1JlZkZyb20oY29tcG9uZW50LCByZWYsIG93bmVyKTtcbiAgfVxufVxuXG5SZWFjdFJlZi5hdHRhY2hSZWZzID0gZnVuY3Rpb24gKGluc3RhbmNlLCBlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgYXR0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxuUmVhY3RSZWYuc2hvdWxkVXBkYXRlUmVmcyA9IGZ1bmN0aW9uIChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpIHtcbiAgLy8gSWYgZWl0aGVyIHRoZSBvd25lciBvciBhIGByZWZgIGhhcyBjaGFuZ2VkLCBtYWtlIHN1cmUgdGhlIG5ld2VzdCBvd25lclxuICAvLyBoYXMgc3RvcmVkIGEgcmVmZXJlbmNlIHRvIGB0aGlzYCwgYW5kIHRoZSBwcmV2aW91cyBvd25lciAoaWYgZGlmZmVyZW50KVxuICAvLyBoYXMgZm9yZ290dGVuIHRoZSByZWZlcmVuY2UgdG8gYHRoaXNgLiBXZSB1c2UgdGhlIGVsZW1lbnQgaW5zdGVhZFxuICAvLyBvZiB0aGUgcHVibGljIHRoaXMucHJvcHMgYmVjYXVzZSB0aGUgcG9zdCBwcm9jZXNzaW5nIGNhbm5vdCBkZXRlcm1pbmVcbiAgLy8gYSByZWYuIFRoZSByZWYgY29uY2VwdHVhbGx5IGxpdmVzIG9uIHRoZSBlbGVtZW50LlxuXG4gIC8vIFRPRE86IFNob3VsZCB0aGlzIGV2ZW4gYmUgcG9zc2libGU/IFRoZSBvd25lciBjYW5ub3QgY2hhbmdlIGJlY2F1c2VcbiAgLy8gaXQncyBmb3JiaWRkZW4gYnkgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuIFRoZSByZWYgY2FuIGNoYW5nZVxuICAvLyBpZiB5b3Ugc3dhcCB0aGUga2V5cyBvZiBidXQgbm90IHRoZSByZWZzLiBSZWNvbnNpZGVyIHdoZXJlIHRoaXMgY2hlY2tcbiAgLy8gaXMgbWFkZS4gSXQgcHJvYmFibHkgYmVsb25ncyB3aGVyZSB0aGUga2V5IGNoZWNraW5nIGFuZFxuICAvLyBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50IGlzIGRvbmUuXG5cbiAgdmFyIHByZXZFbXB0eSA9IHByZXZFbGVtZW50ID09PSBudWxsIHx8IHByZXZFbGVtZW50ID09PSBmYWxzZTtcbiAgdmFyIG5leHRFbXB0eSA9IG5leHRFbGVtZW50ID09PSBudWxsIHx8IG5leHRFbGVtZW50ID09PSBmYWxzZTtcblxuICByZXR1cm4oXG4gICAgLy8gVGhpcyBoYXMgYSBmZXcgZmFsc2UgcG9zaXRpdmVzIHcvci90IGVtcHR5IGNvbXBvbmVudHMuXG4gICAgcHJldkVtcHR5IHx8IG5leHRFbXB0eSB8fCBuZXh0RWxlbWVudC5fb3duZXIgIT09IHByZXZFbGVtZW50Ll9vd25lciB8fCBuZXh0RWxlbWVudC5yZWYgIT09IHByZXZFbGVtZW50LnJlZlxuICApO1xufTtcblxuUmVhY3RSZWYuZGV0YWNoUmVmcyA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIGlmIChyZWYgIT0gbnVsbCkge1xuICAgIGRldGFjaFJlZihyZWYsIGluc3RhbmNlLCBlbGVtZW50Ll9vd25lcik7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RSZWY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UmVmLmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE93bmVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogUmVhY3RPd25lcnMgYXJlIGNhcGFibGUgb2Ygc3RvcmluZyByZWZlcmVuY2VzIHRvIG93bmVkIGNvbXBvbmVudHMuXG4gKlxuICogQWxsIGNvbXBvbmVudHMgYXJlIGNhcGFibGUgb2YgLy9iZWluZy8vIHJlZmVyZW5jZWQgYnkgb3duZXIgY29tcG9uZW50cywgYnV0XG4gKiBvbmx5IFJlYWN0T3duZXIgY29tcG9uZW50cyBhcmUgY2FwYWJsZSBvZiAvL3JlZmVyZW5jaW5nLy8gb3duZWQgY29tcG9uZW50cy5cbiAqIFRoZSBuYW1lZCByZWZlcmVuY2UgaXMga25vd24gYXMgYSBcInJlZlwiLlxuICpcbiAqIFJlZnMgYXJlIGF2YWlsYWJsZSB3aGVuIG1vdW50ZWQgYW5kIHVwZGF0ZWQgZHVyaW5nIHJlY29uY2lsaWF0aW9uLlxuICpcbiAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gKFxuICogICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICogICAgICAgICAgIDxDdXN0b21Db21wb25lbnQgcmVmPVwiY3VzdG9tXCIgLz5cbiAqICAgICAgICAgPC9kaXY+XG4gKiAgICAgICApO1xuICogICAgIH0sXG4gKiAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICogICAgICAgdGhpcy5yZWZzLmN1c3RvbS5oYW5kbGVDbGljaygpO1xuICogICAgIH0sXG4gKiAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICogICAgICAgdGhpcy5yZWZzLmN1c3RvbS5pbml0aWFsaXplKCk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBSZWZzIHNob3VsZCByYXJlbHkgYmUgdXNlZC4gV2hlbiByZWZzIGFyZSB1c2VkLCB0aGV5IHNob3VsZCBvbmx5IGJlIGRvbmUgdG9cbiAqIGNvbnRyb2wgZGF0YSB0aGF0IGlzIG5vdCBoYW5kbGVkIGJ5IFJlYWN0J3MgZGF0YSBmbG93LlxuICpcbiAqIEBjbGFzcyBSZWFjdE93bmVyXG4gKi9cbnZhciBSZWFjdE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgb3duZXIuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNWYWxpZE93bmVyOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuICEhKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0LmF0dGFjaFJlZiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqZWN0LmRldGFjaFJlZiA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb21wb25lbnQgYnkgcmVmIHRvIGFuIG93bmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byByZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBieSB3aGljaCB0byByZWZlciB0byB0aGUgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge1JlYWN0T3duZXJ9IG93bmVyIENvbXBvbmVudCBvbiB3aGljaCB0byByZWNvcmQgdGhlIHJlZi5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgYWRkQ29tcG9uZW50QXNSZWZUbzogZnVuY3Rpb24gKGNvbXBvbmVudCwgcmVmLCBvd25lcikge1xuICAgICFSZWFjdE93bmVyLmlzVmFsaWRPd25lcihvd25lcikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnYWRkQ29tcG9uZW50QXNSZWZUbyguLi4pOiBPbmx5IGEgUmVhY3RPd25lciBjYW4gaGF2ZSByZWZzLiBZb3UgbWlnaHQgJyArICdiZSBhZGRpbmcgYSByZWYgdG8gYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IGNyZWF0ZWQgaW5zaWRlIGEgY29tcG9uZW50XFwncyAnICsgJ2ByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAnICsgJyhkZXRhaWxzOiBodHRwczovL2ZiLm1lL3JlYWN0LXJlZnMtbXVzdC1oYXZlLW93bmVyKS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgb3duZXIuYXR0YWNoUmVmKHJlZiwgY29tcG9uZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNvbXBvbmVudCBieSByZWYgZnJvbSBhbiBvd25lciBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gZGVyZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBvZiB0aGUgcmVmIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIHtSZWFjdE93bmVyfSBvd25lciBDb21wb25lbnQgb24gd2hpY2ggdGhlIHJlZiBpcyByZWNvcmRlZC5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tOiBmdW5jdGlvbiAoY29tcG9uZW50LCByZWYsIG93bmVyKSB7XG4gICAgIVJlYWN0T3duZXIuaXNWYWxpZE93bmVyKG93bmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdyZW1vdmVDb21wb25lbnRBc1JlZkZyb20oLi4uKTogT25seSBhIFJlYWN0T3duZXIgY2FuIGhhdmUgcmVmcy4gWW91IG1pZ2h0ICcgKyAnYmUgcmVtb3ZpbmcgYSByZWYgdG8gYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IGNyZWF0ZWQgaW5zaWRlIGEgY29tcG9uZW50XFwncyAnICsgJ2ByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAnICsgJyhkZXRhaWxzOiBodHRwczovL2ZiLm1lL3JlYWN0LXJlZnMtbXVzdC1oYXZlLW93bmVyKS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIG93bmVyUHVibGljSW5zdGFuY2UgPSBvd25lci5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgIC8vIENoZWNrIHRoYXQgYGNvbXBvbmVudGAncyBvd25lciBpcyBzdGlsbCBhbGl2ZSBhbmQgdGhhdCBgY29tcG9uZW50YCBpcyBzdGlsbCB0aGUgY3VycmVudCByZWZcbiAgICAvLyBiZWNhdXNlIHdlIGRvIG5vdCB3YW50IHRvIGRldGFjaCB0aGUgcmVmIGlmIGFub3RoZXIgY29tcG9uZW50IHN0b2xlIGl0LlxuICAgIGlmIChvd25lclB1YmxpY0luc3RhbmNlICYmIG93bmVyUHVibGljSW5zdGFuY2UucmVmc1tyZWZdID09PSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKSkge1xuICAgICAgb3duZXIuZGV0YWNoUmVmKHJlZik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RPd25lcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RPd25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgVHJhbnNhY3Rpb25cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBgVHJhbnNhY3Rpb25gIGNyZWF0ZXMgYSBibGFjayBib3ggdGhhdCBpcyBhYmxlIHRvIHdyYXAgYW55IG1ldGhvZCBzdWNoIHRoYXRcbiAqIGNlcnRhaW4gaW52YXJpYW50cyBhcmUgbWFpbnRhaW5lZCBiZWZvcmUgYW5kIGFmdGVyIHRoZSBtZXRob2QgaXMgaW52b2tlZFxuICogKEV2ZW4gaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biB3aGlsZSBpbnZva2luZyB0aGUgd3JhcHBlZCBtZXRob2QpLiBXaG9ldmVyXG4gKiBpbnN0YW50aWF0ZXMgYSB0cmFuc2FjdGlvbiBjYW4gcHJvdmlkZSBlbmZvcmNlcnMgb2YgdGhlIGludmFyaWFudHMgYXRcbiAqIGNyZWF0aW9uIHRpbWUuIFRoZSBgVHJhbnNhY3Rpb25gIGNsYXNzIGl0c2VsZiB3aWxsIHN1cHBseSBvbmUgYWRkaXRpb25hbFxuICogYXV0b21hdGljIGludmFyaWFudCBmb3IgeW91IC0gdGhlIGludmFyaWFudCB0aGF0IGFueSB0cmFuc2FjdGlvbiBpbnN0YW5jZVxuICogc2hvdWxkIG5vdCBiZSBydW4gd2hpbGUgaXQgaXMgYWxyZWFkeSBiZWluZyBydW4uIFlvdSB3b3VsZCB0eXBpY2FsbHkgY3JlYXRlIGFcbiAqIHNpbmdsZSBpbnN0YW5jZSBvZiBhIGBUcmFuc2FjdGlvbmAgZm9yIHJldXNlIG11bHRpcGxlIHRpbWVzLCB0aGF0IHBvdGVudGlhbGx5XG4gKiBpcyB1c2VkIHRvIHdyYXAgc2V2ZXJhbCBkaWZmZXJlbnQgbWV0aG9kcy4gV3JhcHBlcnMgYXJlIGV4dHJlbWVseSBzaW1wbGUgLVxuICogdGhleSBvbmx5IHJlcXVpcmUgaW1wbGVtZW50aW5nIHR3byBtZXRob2RzLlxuICpcbiAqIDxwcmU+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlcnMgKGluamVjdGVkIGF0IGNyZWF0aW9uIHRpbWUpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAgICAgICAgK1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS18LS0tLS0tLS0tLS0tLS0rXG4gKiAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgdiAgICAgICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICAgICArLS0tLS0tLS0tLS0tLS0tKyAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgKy0tfCAgICB3cmFwcGVyMSAgIHwtLS18LS0tLSsgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICstLS0tLS0tLS0tLS0tLS0rICAgdiAgICB8ICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICAgICAgICAgICstLS0tLS0tLS0tLS0tKyAgfCAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgKy0tLS18ICAgd3JhcHBlcjIgIHwtLS0tLS0tLSsgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgIHwgICAgKy0tLS0tLS0tLS0tLS0rICB8ICAgICB8ICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICAgICB8ICAgICAgICAgICAgICAgICAgICAgfCAgICAgfCAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgdiAgICAgdiAgICAgICAgICAgICAgICAgICAgIHYgICAgIHYgICB8IHdyYXBwZXJcbiAqICAgICAgICAgICAgICAgICAgICB8ICstLS0rICstLS0rICAgKy0tLS0tLS0tLSsgICArLS0tKyArLS0tKyB8IGludmFyaWFudHNcbiAqIHBlcmZvcm0oYW55TWV0aG9kKSB8IHwgICB8IHwgICB8ICAgfCAgICAgICAgIHwgICB8ICAgfCB8ICAgfCB8IG1haW50YWluZWRcbiAqICstLS0tLS0tLS0tLS0tLS0tLT58LXwtLS18LXwtLS18LS0+fGFueU1ldGhvZHwtLS18LS0tfC18LS0tfC18LS0tLS0tLS0+XG4gKiAgICAgICAgICAgICAgICAgICAgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfFxuICogICAgICAgICAgICAgICAgICAgIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHxcbiAqICAgICAgICAgICAgICAgICAgICB8IHwgICB8IHwgICB8ICAgfCAgICAgICAgIHwgICB8ICAgfCB8ICAgfCB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCArLS0tKyArLS0tKyAgICstLS0tLS0tLS0rICAgKy0tLSsgKy0tLSsgfFxuICogICAgICAgICAgICAgICAgICAgIHwgIGluaXRpYWxpemUgICAgICAgICAgICAgICAgICAgIGNsb3NlICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gKiA8L3ByZT5cbiAqXG4gKiBVc2UgY2FzZXM6XG4gKiAtIFByZXNlcnZpbmcgdGhlIGlucHV0IHNlbGVjdGlvbiByYW5nZXMgYmVmb3JlL2FmdGVyIHJlY29uY2lsaWF0aW9uLlxuICogICBSZXN0b3Jpbmcgc2VsZWN0aW9uIGV2ZW4gaW4gdGhlIGV2ZW50IG9mIGFuIHVuZXhwZWN0ZWQgZXJyb3IuXG4gKiAtIERlYWN0aXZhdGluZyBldmVudHMgd2hpbGUgcmVhcnJhbmdpbmcgdGhlIERPTSwgcHJldmVudGluZyBibHVycy9mb2N1c2VzLFxuICogICB3aGlsZSBndWFyYW50ZWVpbmcgdGhhdCBhZnRlcndhcmRzLCB0aGUgZXZlbnQgc3lzdGVtIGlzIHJlYWN0aXZhdGVkLlxuICogLSBGbHVzaGluZyBhIHF1ZXVlIG9mIGNvbGxlY3RlZCBET00gbXV0YXRpb25zIHRvIHRoZSBtYWluIFVJIHRocmVhZCBhZnRlciBhXG4gKiAgIHJlY29uY2lsaWF0aW9uIHRha2VzIHBsYWNlIGluIGEgd29ya2VyIHRocmVhZC5cbiAqIC0gSW52b2tpbmcgYW55IGNvbGxlY3RlZCBgY29tcG9uZW50RGlkVXBkYXRlYCBjYWxsYmFja3MgYWZ0ZXIgcmVuZGVyaW5nIG5ld1xuICogICBjb250ZW50LlxuICogLSAoRnV0dXJlIHVzZSBjYXNlKTogV3JhcHBpbmcgcGFydGljdWxhciBmbHVzaGVzIG9mIHRoZSBgUmVhY3RXb3JrZXJgIHF1ZXVlXG4gKiAgIHRvIHByZXNlcnZlIHRoZSBgc2Nyb2xsVG9wYCAoYW4gYXV0b21hdGljIHNjcm9sbCBhd2FyZSBET00pLlxuICogLSAoRnV0dXJlIHVzZSBjYXNlKTogTGF5b3V0IGNhbGN1bGF0aW9ucyBiZWZvcmUgYW5kIGFmdGVyIERPTSB1cGRhdGVzLlxuICpcbiAqIFRyYW5zYWN0aW9uYWwgcGx1Z2luIEFQSTpcbiAqIC0gQSBtb2R1bGUgdGhhdCBoYXMgYW4gYGluaXRpYWxpemVgIG1ldGhvZCB0aGF0IHJldHVybnMgYW55IHByZWNvbXB1dGF0aW9uLlxuICogLSBhbmQgYSBgY2xvc2VgIG1ldGhvZCB0aGF0IGFjY2VwdHMgdGhlIHByZWNvbXB1dGF0aW9uLiBgY2xvc2VgIGlzIGludm9rZWRcbiAqICAgd2hlbiB0aGUgd3JhcHBlZCBwcm9jZXNzIGlzIGNvbXBsZXRlZCwgb3IgaGFzIGZhaWxlZC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5PFRyYW5zYWN0aW9uYWxXcmFwcGVyPn0gdHJhbnNhY3Rpb25XcmFwcGVyIFdyYXBwZXIgbW9kdWxlc1xuICogdGhhdCBpbXBsZW1lbnQgYGluaXRpYWxpemVgIGFuZCBgY2xvc2VgLlxuICogQHJldHVybiB7VHJhbnNhY3Rpb259IFNpbmdsZSB0cmFuc2FjdGlvbiBmb3IgcmV1c2UgaW4gdGhyZWFkLlxuICpcbiAqIEBjbGFzcyBUcmFuc2FjdGlvblxuICovXG52YXIgTWl4aW4gPSB7XG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoaXMgaW5zdGFuY2Ugc28gdGhhdCBpdCBpcyBwcmVwYXJlZCBmb3IgY29sbGVjdGluZyBtZXRyaWNzLiBEb2VzXG4gICAqIHNvIHN1Y2ggdGhhdCB0aGlzIHNldHVwIG1ldGhvZCBtYXkgYmUgdXNlZCBvbiBhbiBpbnN0YW5jZSB0aGF0IGlzIGFscmVhZHlcbiAgICogaW5pdGlhbGl6ZWQsIGluIGEgd2F5IHRoYXQgZG9lcyBub3QgY29uc3VtZSBhZGRpdGlvbmFsIG1lbW9yeSB1cG9uIHJldXNlLlxuICAgKiBUaGF0IGNhbiBiZSB1c2VmdWwgaWYgeW91IGRlY2lkZSB0byBtYWtlIHlvdXIgc3ViY2xhc3Mgb2YgdGhpcyBtaXhpbiBhXG4gICAqIFwiUG9vbGVkQ2xhc3NcIi5cbiAgICovXG4gIHJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzID0gdGhpcy5nZXRUcmFuc2FjdGlvbldyYXBwZXJzKCk7XG4gICAgaWYgKHRoaXMud3JhcHBlckluaXREYXRhKSB7XG4gICAgICB0aGlzLndyYXBwZXJJbml0RGF0YS5sZW5ndGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyYXBwZXJJbml0RGF0YSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9pc0luVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgfSxcblxuICBfaXNJblRyYW5zYWN0aW9uOiBmYWxzZSxcblxuICAvKipcbiAgICogQGFic3RyYWN0XG4gICAqIEByZXR1cm4ge0FycmF5PFRyYW5zYWN0aW9uV3JhcHBlcj59IEFycmF5IG9mIHRyYW5zYWN0aW9uIHdyYXBwZXJzLlxuICAgKi9cbiAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogbnVsbCxcblxuICBpc0luVHJhbnNhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gISF0aGlzLl9pc0luVHJhbnNhY3Rpb247XG4gIH0sXG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBmdW5jdGlvbiB3aXRoaW4gYSBzYWZldHkgd2luZG93LiBVc2UgdGhpcyBmb3IgdGhlIHRvcCBsZXZlbFxuICAgKiBtZXRob2RzIHRoYXQgcmVzdWx0IGluIGxhcmdlIGFtb3VudHMgb2YgY29tcHV0YXRpb24vbXV0YXRpb25zIHRoYXQgd291bGRcbiAgICogbmVlZCB0byBiZSBzYWZldHkgY2hlY2tlZC4gVGhlIG9wdGlvbmFsIGFyZ3VtZW50cyBoZWxwcyBwcmV2ZW50IHRoZSBuZWVkXG4gICAqIHRvIGJpbmQgaW4gbWFueSBjYXNlcy5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1lbWJlciBvZiBzY29wZSB0byBjYWxsLlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGUgU2NvcGUgdG8gaW52b2tlIGZyb20uXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGEgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBiIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gYyBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGQgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBlIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gZiBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqXG4gICAqIEByZXR1cm4geyp9IFJldHVybiB2YWx1ZSBmcm9tIGBtZXRob2RgLlxuICAgKi9cbiAgcGVyZm9ybTogZnVuY3Rpb24gKG1ldGhvZCwgc2NvcGUsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgICAhIXRoaXMuaXNJblRyYW5zYWN0aW9uKCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJhbnNhY3Rpb24ucGVyZm9ybSguLi4pOiBDYW5ub3QgaW5pdGlhbGl6ZSBhIHRyYW5zYWN0aW9uIHdoZW4gdGhlcmUgJyArICdpcyBhbHJlYWR5IGFuIG91dHN0YW5kaW5nIHRyYW5zYWN0aW9uLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgZXJyb3JUaHJvd247XG4gICAgdmFyIHJldDtcbiAgICB0cnkge1xuICAgICAgdGhpcy5faXNJblRyYW5zYWN0aW9uID0gdHJ1ZTtcbiAgICAgIC8vIENhdGNoaW5nIGVycm9ycyBtYWtlcyBkZWJ1Z2dpbmcgbW9yZSBkaWZmaWN1bHQsIHNvIHdlIHN0YXJ0IHdpdGhcbiAgICAgIC8vIGVycm9yVGhyb3duIHNldCB0byB0cnVlIGJlZm9yZSBzZXR0aW5nIGl0IHRvIGZhbHNlIGFmdGVyIGNhbGxpbmdcbiAgICAgIC8vIGNsb3NlIC0tIGlmIGl0J3Mgc3RpbGwgc2V0IHRvIHRydWUgaW4gdGhlIGZpbmFsbHkgYmxvY2ssIGl0IG1lYW5zXG4gICAgICAvLyBvbmUgb2YgdGhlc2UgY2FsbHMgdGhyZXcuXG4gICAgICBlcnJvclRocm93biA9IHRydWU7XG4gICAgICB0aGlzLmluaXRpYWxpemVBbGwoMCk7XG4gICAgICByZXQgPSBtZXRob2QuY2FsbChzY29wZSwgYSwgYiwgYywgZCwgZSwgZik7XG4gICAgICBlcnJvclRocm93biA9IGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAvLyBJZiBgbWV0aG9kYCB0aHJvd3MsIHByZWZlciB0byBzaG93IHRoYXQgc3RhY2sgdHJhY2Ugb3ZlciBhbnkgdGhyb3duXG4gICAgICAgICAgLy8gYnkgaW52b2tpbmcgYGNsb3NlQWxsYC5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFsbCgwKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2luY2UgYG1ldGhvZGAgZGlkbid0IHRocm93LCB3ZSBkb24ndCB3YW50IHRvIHNpbGVuY2UgdGhlIGV4Y2VwdGlvblxuICAgICAgICAgIC8vIGhlcmUuXG4gICAgICAgICAgdGhpcy5jbG9zZUFsbCgwKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5faXNJblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZUFsbDogZnVuY3Rpb24gKHN0YXJ0SW5kZXgpIHtcbiAgICB2YXIgdHJhbnNhY3Rpb25XcmFwcGVycyA9IHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycztcbiAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8IHRyYW5zYWN0aW9uV3JhcHBlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB3cmFwcGVyID0gdHJhbnNhY3Rpb25XcmFwcGVyc1tpXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENhdGNoaW5nIGVycm9ycyBtYWtlcyBkZWJ1Z2dpbmcgbW9yZSBkaWZmaWN1bHQsIHNvIHdlIHN0YXJ0IHdpdGggdGhlXG4gICAgICAgIC8vIE9CU0VSVkVEX0VSUk9SIHN0YXRlIGJlZm9yZSBvdmVyd3JpdGluZyBpdCB3aXRoIHRoZSByZWFsIHJldHVybiB2YWx1ZVxuICAgICAgICAvLyBvZiBpbml0aWFsaXplIC0tIGlmIGl0J3Mgc3RpbGwgc2V0IHRvIE9CU0VSVkVEX0VSUk9SIGluIHRoZSBmaW5hbGx5XG4gICAgICAgIC8vIGJsb2NrLCBpdCBtZWFucyB3cmFwcGVyLmluaXRpYWxpemUgdGhyZXcuXG4gICAgICAgIHRoaXMud3JhcHBlckluaXREYXRhW2ldID0gVHJhbnNhY3Rpb24uT0JTRVJWRURfRVJST1I7XG4gICAgICAgIHRoaXMud3JhcHBlckluaXREYXRhW2ldID0gd3JhcHBlci5pbml0aWFsaXplID8gd3JhcHBlci5pbml0aWFsaXplLmNhbGwodGhpcykgOiBudWxsO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlckluaXREYXRhW2ldID09PSBUcmFuc2FjdGlvbi5PQlNFUlZFRF9FUlJPUikge1xuICAgICAgICAgIC8vIFRoZSBpbml0aWFsaXplciBmb3Igd3JhcHBlciBpIHRocmV3IGFuIGVycm9yOyBpbml0aWFsaXplIHRoZVxuICAgICAgICAgIC8vIHJlbWFpbmluZyB3cmFwcGVycyBidXQgc2lsZW5jZSBhbnkgZXhjZXB0aW9ucyBmcm9tIHRoZW0gdG8gZW5zdXJlXG4gICAgICAgICAgLy8gdGhhdCB0aGUgZmlyc3QgZXJyb3IgaXMgdGhlIG9uZSB0byBidWJibGUgdXAuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUFsbChpICsgMSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBJbnZva2VzIGVhY2ggb2YgYHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycy5jbG9zZVtpXWAgZnVuY3Rpb25zLCBwYXNzaW5nIGludG9cbiAgICogdGhlbSB0aGUgcmVzcGVjdGl2ZSByZXR1cm4gdmFsdWVzIG9mIGB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnMuaW5pdFtpXWBcbiAgICogKGBjbG9zZWBycyB0aGF0IGNvcnJlc3BvbmQgdG8gaW5pdGlhbGl6ZXJzIHRoYXQgZmFpbGVkIHdpbGwgbm90IGJlXG4gICAqIGludm9rZWQpLlxuICAgKi9cbiAgY2xvc2VBbGw6IGZ1bmN0aW9uIChzdGFydEluZGV4KSB7XG4gICAgIXRoaXMuaXNJblRyYW5zYWN0aW9uKCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJhbnNhY3Rpb24uY2xvc2VBbGwoKTogQ2Fubm90IGNsb3NlIHRyYW5zYWN0aW9uIHdoZW4gbm9uZSBhcmUgb3Blbi4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHRyYW5zYWN0aW9uV3JhcHBlcnMgPSB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnM7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPCB0cmFuc2FjdGlvbldyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IHRyYW5zYWN0aW9uV3JhcHBlcnNbaV07XG4gICAgICB2YXIgaW5pdERhdGEgPSB0aGlzLndyYXBwZXJJbml0RGF0YVtpXTtcbiAgICAgIHZhciBlcnJvclRocm93bjtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENhdGNoaW5nIGVycm9ycyBtYWtlcyBkZWJ1Z2dpbmcgbW9yZSBkaWZmaWN1bHQsIHNvIHdlIHN0YXJ0IHdpdGhcbiAgICAgICAgLy8gZXJyb3JUaHJvd24gc2V0IHRvIHRydWUgYmVmb3JlIHNldHRpbmcgaXQgdG8gZmFsc2UgYWZ0ZXIgY2FsbGluZ1xuICAgICAgICAvLyBjbG9zZSAtLSBpZiBpdCdzIHN0aWxsIHNldCB0byB0cnVlIGluIHRoZSBmaW5hbGx5IGJsb2NrLCBpdCBtZWFuc1xuICAgICAgICAvLyB3cmFwcGVyLmNsb3NlIHRocmV3LlxuICAgICAgICBlcnJvclRocm93biA9IHRydWU7XG4gICAgICAgIGlmIChpbml0RGF0YSAhPT0gVHJhbnNhY3Rpb24uT0JTRVJWRURfRVJST1IgJiYgd3JhcHBlci5jbG9zZSkge1xuICAgICAgICAgIHdyYXBwZXIuY2xvc2UuY2FsbCh0aGlzLCBpbml0RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JUaHJvd24gPSBmYWxzZTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgIC8vIFRoZSBjbG9zZXIgZm9yIHdyYXBwZXIgaSB0aHJldyBhbiBlcnJvcjsgY2xvc2UgdGhlIHJlbWFpbmluZ1xuICAgICAgICAgIC8vIHdyYXBwZXJzIGJ1dCBzaWxlbmNlIGFueSBleGNlcHRpb25zIGZyb20gdGhlbSB0byBlbnN1cmUgdGhhdCB0aGVcbiAgICAgICAgICAvLyBmaXJzdCBlcnJvciBpcyB0aGUgb25lIHRvIGJ1YmJsZSB1cC5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZUFsbChpICsgMSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLndyYXBwZXJJbml0RGF0YS5sZW5ndGggPSAwO1xuICB9XG59O1xuXG52YXIgVHJhbnNhY3Rpb24gPSB7XG5cbiAgTWl4aW46IE1peGluLFxuXG4gIC8qKlxuICAgKiBUb2tlbiB0byBsb29rIGZvciB0byBkZXRlcm1pbmUgaWYgYW4gZXJyb3Igb2NjdXJyZWQuXG4gICAqL1xuICBPQlNFUlZFRF9FUlJPUjoge31cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2FjdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvVHJhbnNhY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbXB0eUNvbXBvbmVudCcpO1xudmFyIFJlYWN0TmF0aXZlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdE5hdGl2ZUNvbXBvbmVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLy8gVG8gYXZvaWQgYSBjeWNsaWMgZGVwZW5kZW5jeSwgd2UgY3JlYXRlIHRoZSBmaW5hbCBjbGFzcyBpbiB0aGlzIG1vZHVsZVxudmFyIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50V3JhcHBlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHRoaXMuY29uc3RydWN0KGVsZW1lbnQpO1xufTtcbl9hc3NpZ24oUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyLnByb3RvdHlwZSwgUmVhY3RDb21wb3NpdGVDb21wb25lbnQuTWl4aW4sIHtcbiAgX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnRcbn0pO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0ob3duZXIpIHtcbiAgaWYgKG93bmVyKSB7XG4gICAgdmFyIG5hbWUgPSBvd25lci5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdHlwZSByZWZlcmVuY2UgaXMgYSBrbm93biBpbnRlcm5hbCB0eXBlLiBJLmUuIG5vdCBhIHVzZXJcbiAqIHByb3ZpZGVkIGNvbXBvc2l0ZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGlzIGlzIGEgdmFsaWQgaW50ZXJuYWwgdHlwZS5cbiAqL1xuZnVuY3Rpb24gaXNJbnRlcm5hbENvbXBvbmVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUucHJvdG90eXBlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUubW91bnRDb21wb25lbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUucHJvdG90eXBlLnJlY2VpdmVDb21wb25lbnQgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogR2l2ZW4gYSBSZWFjdE5vZGUsIGNyZWF0ZSBhbiBpbnN0YW5jZSB0aGF0IHdpbGwgYWN0dWFsbHkgYmUgbW91bnRlZC5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZVxuICogQHJldHVybiB7b2JqZWN0fSBBIG5ldyBpbnN0YW5jZSBvZiB0aGUgZWxlbWVudCdzIGNvbnN0cnVjdG9yLlxuICogQHByb3RlY3RlZFxuICovXG5mdW5jdGlvbiBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5vZGUpIHtcbiAgdmFyIGluc3RhbmNlO1xuXG4gIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IGZhbHNlKSB7XG4gICAgaW5zdGFuY2UgPSBSZWFjdEVtcHR5Q29tcG9uZW50LmNyZWF0ZShpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGU7XG4gICAgIShlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRWxlbWVudCB0eXBlIGlzIGludmFsaWQ6IGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgYnVpbHQtaW4gY29tcG9uZW50cykgJyArICdvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlIGNvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgZWxlbWVudC50eXBlID09IG51bGwgPyBlbGVtZW50LnR5cGUgOiB0eXBlb2YgZWxlbWVudC50eXBlLCBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oZWxlbWVudC5fb3duZXIpKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2Ugc3RyaW5nIHZhbHVlc1xuICAgIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgaW5zdGFuY2UgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudC5jcmVhdGVJbnRlcm5hbENvbXBvbmVudChlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzSW50ZXJuYWxDb21wb25lbnRUeXBlKGVsZW1lbnQudHlwZSkpIHtcbiAgICAgIC8vIFRoaXMgaXMgdGVtcG9yYXJpbHkgYXZhaWxhYmxlIGZvciBjdXN0b20gY29tcG9uZW50cyB0aGF0IGFyZSBub3Qgc3RyaW5nXG4gICAgICAvLyByZXByZXNlbnRhdGlvbnMuIEkuZS4gQVJULiBPbmNlIHRob3NlIGFyZSB1cGRhdGVkIHRvIHVzZSB0aGUgc3RyaW5nXG4gICAgICAvLyByZXByZXNlbnRhdGlvbiwgd2UgY2FuIGRyb3AgdGhpcyBjb2RlIHBhdGguXG4gICAgICBpbnN0YW5jZSA9IG5ldyBlbGVtZW50LnR5cGUoZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlID0gbmV3IFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50V3JhcHBlcihlbGVtZW50KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09PSAnbnVtYmVyJykge1xuICAgIGluc3RhbmNlID0gUmVhY3ROYXRpdmVDb21wb25lbnQuY3JlYXRlSW5zdGFuY2VGb3JUZXh0KG5vZGUpO1xuICB9IGVsc2Uge1xuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFbmNvdW50ZXJlZCBpbnZhbGlkIFJlYWN0IG5vZGUgb2YgdHlwZSAlcycsIHR5cGVvZiBub2RlKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0YW5jZS5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UucmVjZWl2ZUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UuZ2V0TmF0aXZlTm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgaW5zdGFuY2UudW5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJywgJ09ubHkgUmVhY3QgQ29tcG9uZW50cyBjYW4gYmUgbW91bnRlZC4nKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIFRoZXNlIHR3byBmaWVsZHMgYXJlIHVzZWQgYnkgdGhlIERPTSBhbmQgQVJUIGRpZmZpbmcgYWxnb3JpdGhtc1xuICAvLyByZXNwZWN0aXZlbHkuIEluc3RlYWQgb2YgdXNpbmcgZXhwYW5kb3Mgb24gY29tcG9uZW50cywgd2Ugc2hvdWxkIGJlXG4gIC8vIHN0b3JpbmcgdGhlIHN0YXRlIG5lZWRlZCBieSB0aGUgZGlmZmluZyBhbGdvcml0aG1zIGVsc2V3aGVyZS5cbiAgaW5zdGFuY2UuX21vdW50SW5kZXggPSAwO1xuICBpbnN0YW5jZS5fbW91bnRJbWFnZSA9IG51bGw7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpbnN0YW5jZS5faXNPd25lck5lY2Vzc2FyeSA9IGZhbHNlO1xuICAgIGluc3RhbmNlLl93YXJuZWRBYm91dFJlZnNJblJlbmRlciA9IGZhbHNlO1xuICB9XG5cbiAgLy8gSW50ZXJuYWwgaW5zdGFuY2VzIHNob3VsZCBmdWxseSBjb25zdHJ1Y3RlZCBhdCB0aGlzIHBvaW50LCBzbyB0aGV5IHNob3VsZFxuICAvLyBub3QgZ2V0IGFueSBuZXcgZmllbGRzIGFkZGVkIHRvIHRoZW0gYXQgdGhpcyBwb2ludC5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKSB7XG4gICAgICBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoaW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEVycm9yVXRpbHMgPSByZXF1aXJlKCcuL1JlYWN0RXJyb3JVdGlscycpO1xudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSByZXF1aXJlKCcuL1JlYWN0SW5zdGFuY2VNYXAnKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcbnZhciBSZWFjdE5vZGVUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3ROb2RlVHlwZXMnKTtcbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCcuL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0VXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oY29tcG9uZW50KSB7XG4gIHZhciBvd25lciA9IGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyIHx8IG51bGw7XG4gIGlmIChvd25lcikge1xuICAgIHZhciBuYW1lID0gb3duZXIuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIFN0YXRlbGVzc0NvbXBvbmVudChDb21wb25lbnQpIHt9XG5TdGF0ZWxlc3NDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENvbXBvbmVudCA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICB2YXIgZWxlbWVudCA9IENvbXBvbmVudCh0aGlzLnByb3BzLCB0aGlzLmNvbnRleHQsIHRoaXMudXBkYXRlcik7XG4gIHdhcm5JZkludmFsaWRFbGVtZW50KENvbXBvbmVudCwgZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuZnVuY3Rpb24gd2FybklmSW52YWxpZEVsZW1lbnQoQ29tcG9uZW50LCBlbGVtZW50KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCksICclcyguLi4pOiBBIHZhbGlkIFJlYWN0IGVsZW1lbnQgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQuIFlvdSBtYXkgaGF2ZSAnICsgJ3JldHVybmVkIHVuZGVmaW5lZCwgYW4gYXJyYXkgb3Igc29tZSBvdGhlciBpbnZhbGlkIG9iamVjdC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tIFRoZSBMaWZlLUN5Y2xlIG9mIGEgQ29tcG9zaXRlIENvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiAtIGNvbnN0cnVjdG9yOiBJbml0aWFsaXphdGlvbiBvZiBzdGF0ZS4gVGhlIGluc3RhbmNlIGlzIG5vdyByZXRhaW5lZC5cbiAqICAgLSBjb21wb25lbnRXaWxsTW91bnRcbiAqICAgLSByZW5kZXJcbiAqICAgLSBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnNdXG4gKiAgICAgLSBbY2hpbGRyZW4ncyBjb21wb25lbnRXaWxsTW91bnQgYW5kIHJlbmRlcl1cbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudERpZE1vdW50XVxuICogICAgIC0gY29tcG9uZW50RGlkTW91bnRcbiAqXG4gKiAgICAgICBVcGRhdGUgUGhhc2VzOlxuICogICAgICAgLSBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChvbmx5IGNhbGxlZCBpZiBwYXJlbnQgdXBkYXRlZClcbiAqICAgICAgIC0gc2hvdWxkQ29tcG9uZW50VXBkYXRlXG4gKiAgICAgICAgIC0gY29tcG9uZW50V2lsbFVwZGF0ZVxuICogICAgICAgICAgIC0gcmVuZGVyXG4gKiAgICAgICAgICAgLSBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnMgb3IgcmVjZWl2ZSBwcm9wcyBwaGFzZXNdXG4gKiAgICAgICAgIC0gY29tcG9uZW50RGlkVXBkYXRlXG4gKlxuICogICAgIC0gY29tcG9uZW50V2lsbFVubW91bnRcbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxVbm1vdW50XVxuICogICAtIFtjaGlsZHJlbiBkZXN0cm95ZWRdXG4gKiAtIChkZXN0cm95ZWQpOiBUaGUgaW5zdGFuY2UgaXMgbm93IGJsYW5rLCByZWxlYXNlZCBieSBSZWFjdCBhbmQgcmVhZHkgZm9yIEdDLlxuICpcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBBbiBpbmNyZW1lbnRpbmcgSUQgYXNzaWduZWQgdG8gZWFjaCBjb21wb25lbnQgd2hlbiBpdCBpcyBtb3VudGVkLiBUaGlzIGlzXG4gKiB1c2VkIHRvIGVuZm9yY2UgdGhlIG9yZGVyIGluIHdoaWNoIGBSZWFjdFVwZGF0ZXNgIHVwZGF0ZXMgZGlydHkgY29tcG9uZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgbmV4dE1vdW50SUQgPSAxO1xuXG4vKipcbiAqIEBsZW5kcyB7UmVhY3RDb21wb3NpdGVDb21wb25lbnQucHJvdG90eXBlfVxuICovXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpbiA9IHtcblxuICAvKipcbiAgICogQmFzZSBjb25zdHJ1Y3RvciBmb3IgYWxsIGNvbXBvc2l0ZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVRdWV1ZVxuICAgIHRoaXMuX3BlbmRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSAwO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVzIGFuZCBSZWFjdFVwZGF0ZVF1ZXVlLlxuICAgIHRoaXMuX3BlbmRpbmdDYWxsYmFja3MgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50LCByZW5kZXJzIG1hcmt1cCwgYW5kIHJlZ2lzdGVycyBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5hdGl2ZVBhcmVudFxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5hdGl2ZUNvbnRhaW5lckluZm9cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9zdHJpbmd9IFJlbmRlcmVkIG1hcmt1cCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBET00uXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSBuZXh0TW91bnRJRCsrO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbmF0aXZlQ29udGFpbmVySW5mbztcblxuICAgIHZhciBwdWJsaWNQcm9wcyA9IHRoaXMuX3Byb2Nlc3NQcm9wcyh0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcyk7XG4gICAgdmFyIHB1YmxpY0NvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChjb250ZXh0KTtcblxuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgcHVibGljIGNsYXNzXG4gICAgdmFyIGluc3Q7XG4gICAgdmFyIHJlbmRlcmVkRWxlbWVudDtcblxuICAgIGlmIChDb21wb25lbnQucHJvdG90eXBlICYmIENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGluc3QgPSBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0ID0gQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCBSZWFjdFVwZGF0ZVF1ZXVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0ID09IG51bGwgfHwgaW5zdC5yZW5kZXIgPT0gbnVsbCkge1xuICAgICAgICByZW5kZXJlZEVsZW1lbnQgPSBpbnN0O1xuICAgICAgICB3YXJuSWZJbnZhbGlkRWxlbWVudChDb21wb25lbnQsIHJlbmRlcmVkRWxlbWVudCk7XG4gICAgICAgICEoaW5zdCA9PT0gbnVsbCB8fCBpbnN0ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoaW5zdCkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IEEgdmFsaWQgUmVhY3QgZWxlbWVudCAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZC4gWW91IG1heSBoYXZlICcgKyAncmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICBpbnN0ID0gbmV3IFN0YXRlbGVzc0NvbXBvbmVudChDb21wb25lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgbGF0ZXIgaW4gX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCwgYnV0IGFkZCBhbiBlYXJseVxuICAgICAgLy8gd2FybmluZyBub3cgdG8gaGVscCBkZWJ1Z2dpbmdcbiAgICAgIGlmIChpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogTm8gYHJlbmRlcmAgbWV0aG9kIGZvdW5kIG9uIHRoZSByZXR1cm5lZCBjb21wb25lbnQgJyArICdpbnN0YW5jZTogeW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBkZWZpbmUgYHJlbmRlcmAuJywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb3BzTXV0YXRlZCA9IGluc3QucHJvcHMgIT09IHB1YmxpY1Byb3BzO1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGluc3QucHJvcHMgPT09IHVuZGVmaW5lZCB8fCAhcHJvcHNNdXRhdGVkLCAnJXMoLi4uKTogV2hlbiBjYWxsaW5nIHN1cGVyKCkgaW4gYCVzYCwgbWFrZSBzdXJlIHRvIHBhc3MgJyArICd1cCB0aGUgc2FtZSBwcm9wcyB0aGF0IHlvdXIgY29tcG9uZW50XFwncyBjb25zdHJ1Y3RvciB3YXMgcGFzc2VkLicsIGNvbXBvbmVudE5hbWUsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFRoZXNlIHNob3VsZCBiZSBzZXQgdXAgaW4gdGhlIGNvbnN0cnVjdG9yLCBidXQgYXMgYSBjb252ZW5pZW5jZSBmb3JcbiAgICAvLyBzaW1wbGVyIGNsYXNzIGFic3RyYWN0aW9ucywgd2Ugc2V0IHRoZW0gdXAgYWZ0ZXIgdGhlIGZhY3QuXG4gICAgaW5zdC5wcm9wcyA9IHB1YmxpY1Byb3BzO1xuICAgIGluc3QuY29udGV4dCA9IHB1YmxpY0NvbnRleHQ7XG4gICAgaW5zdC5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgaW5zdC51cGRhdGVyID0gUmVhY3RVcGRhdGVRdWV1ZTtcblxuICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdDtcblxuICAgIC8vIFN0b3JlIGEgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIGJhY2sgdG8gdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5zZXQoaW5zdCwgdGhpcyk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gU2luY2UgcGxhaW4gSlMgY2xhc3NlcyBhcmUgZGVmaW5lZCB3aXRob3V0IGFueSBzcGVjaWFsIGluaXRpYWxpemF0aW9uXG4gICAgICAvLyBsb2dpYywgd2UgY2FuIG5vdCBjYXRjaCBjb21tb24gZXJyb3JzIGVhcmx5LiBUaGVyZWZvcmUsIHdlIGhhdmUgdG9cbiAgICAgIC8vIGNhdGNoIHRoZW0gaGVyZSwgYXQgaW5pdGlhbGl6YXRpb24gdGltZSwgaW5zdGVhZC5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldEluaXRpYWxTdGF0ZSB8fCBpbnN0LmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldEluaXRpYWxTdGF0ZSB3YXMgZGVmaW5lZCBvbiAlcywgYSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzLiAnICsgJ1RoaXMgaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNsYXNzZXMgY3JlYXRlZCB1c2luZyBSZWFjdC5jcmVhdGVDbGFzcy4gJyArICdEaWQgeW91IG1lYW4gdG8gZGVmaW5lIGEgc3RhdGUgcHJvcGVydHkgaW5zdGVhZD8nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldERlZmF1bHRQcm9wcyB8fCBpbnN0LmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyB3YXMgZGVmaW5lZCBvbiAlcywgYSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzLiAnICsgJ1RoaXMgaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNsYXNzZXMgY3JlYXRlZCB1c2luZyBSZWFjdC5jcmVhdGVDbGFzcy4gJyArICdVc2UgYSBzdGF0aWMgcHJvcGVydHkgdG8gZGVmaW5lIGRlZmF1bHRQcm9wcyBpbnN0ZWFkLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QucHJvcFR5cGVzLCAncHJvcFR5cGVzIHdhcyBkZWZpbmVkIGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IG9uICVzLiBVc2UgYSBzdGF0aWMgJyArICdwcm9wZXJ0eSB0byBkZWZpbmUgcHJvcFR5cGVzIGluc3RlYWQuJywgdGhpcy5nZXROYW1lKCkgfHwgJ2EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaW5zdC5jb250ZXh0VHlwZXMsICdjb250ZXh0VHlwZXMgd2FzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgb24gJXMuIFVzZSBhICcgKyAnc3RhdGljIHByb3BlcnR5IHRvIGRlZmluZSBjb250ZXh0VHlwZXMgaW5zdGVhZC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0LmNvbXBvbmVudFNob3VsZFVwZGF0ZSAhPT0gJ2Z1bmN0aW9uJywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3QuY29tcG9uZW50RGlkVW5tb3VudCAhPT0gJ2Z1bmN0aW9uJywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnREaWRVbm1vdW50KCkuIEJ1dCB0aGVyZSBpcyBubyBzdWNoIGxpZmVjeWNsZSBtZXRob2QuICcgKyAnRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxVbm1vdW50KCk/JywgdGhpcy5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdC5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCB0aGlzLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gaW5zdC5zdGF0ZTtcbiAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGluc3Quc3RhdGUgPSBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgIH1cbiAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLnN0YXRlOiBtdXN0IGJlIHNldCB0byBhbiBvYmplY3Qgb3IgbnVsbCcsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG5cbiAgICB2YXIgbWFya3VwO1xuICAgIGlmIChpbnN0LnVuc3RhYmxlX2hhbmRsZUVycm9yKSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZyhyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnREaWRNb3VudCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShpbnN0LmNvbXBvbmVudERpZE1vdW50LCBpbnN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIHBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZzogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBtYXJrdXA7XG4gICAgdmFyIGNoZWNrcG9pbnQgPSB0cmFuc2FjdGlvbi5jaGVja3BvaW50KCk7XG4gICAgdHJ5IHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudChyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFJvbGwgYmFjayB0byBjaGVja3BvaW50LCBoYW5kbGUgZXJyb3IgKHdoaWNoIG1heSBhZGQgaXRlbXMgdG8gdGhlIHRyYW5zYWN0aW9uKSwgYW5kIHRha2UgYSBuZXcgY2hlY2twb2ludFxuICAgICAgdHJhbnNhY3Rpb24ucm9sbGJhY2soY2hlY2twb2ludCk7XG4gICAgICB0aGlzLl9pbnN0YW5jZS51bnN0YWJsZV9oYW5kbGVFcnJvcihlKTtcbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSkge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5zdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUodGhpcy5faW5zdGFuY2UucHJvcHMsIHRoaXMuX2luc3RhbmNlLmNvbnRleHQpO1xuICAgICAgfVxuICAgICAgY2hlY2twb2ludCA9IHRyYW5zYWN0aW9uLmNoZWNrcG9pbnQoKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQudW5tb3VudENvbXBvbmVudCh0cnVlKTtcbiAgICAgIHRyYW5zYWN0aW9uLnJvbGxiYWNrKGNoZWNrcG9pbnQpO1xuXG4gICAgICAvLyBUcnkgYWdhaW4gLSB3ZSd2ZSBpbmZvcm1lZCB0aGUgY29tcG9uZW50IGFib3V0IHRoZSBlcnJvciwgc28gdGhleSBjYW4gcmVuZGVyIGFuIGVycm9yIG1lc3NhZ2UgdGhpcyB0aW1lLlxuICAgICAgLy8gSWYgdGhpcyB0aHJvd3MgYWdhaW4sIHRoZSBlcnJvciB3aWxsIGJ1YmJsZSB1cCAoYW5kIGNhbiBiZSBjYXVnaHQgYnkgYSBoaWdoZXIgZXJyb3IgYm91bmRhcnkpLlxuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgcGVyZm9ybUluaXRpYWxNb3VudDogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbE1vdW50KSB7XG4gICAgICBpbnN0LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgLy8gV2hlbiBtb3VudGluZywgY2FsbHMgdG8gYHNldFN0YXRlYCBieSBgY29tcG9uZW50V2lsbE1vdW50YCB3aWxsIHNldFxuICAgICAgLy8gYHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlYCB3aXRob3V0IHRyaWdnZXJpbmcgYSByZS1yZW5kZXIuXG4gICAgICBpZiAodGhpcy5fcGVuZGluZ1N0YXRlUXVldWUpIHtcbiAgICAgICAgaW5zdC5zdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUoaW5zdC5wcm9wcywgaW5zdC5jb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBub3QgYSBzdGF0ZWxlc3MgY29tcG9uZW50LCB3ZSBub3cgcmVuZGVyXG4gICAgaWYgKHJlbmRlcmVkRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gUmVhY3ROb2RlVHlwZXMuZ2V0VHlwZShyZW5kZXJlZEVsZW1lbnQpO1xuICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gdGhpcy5faW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChyZW5kZXJlZEVsZW1lbnQpO1xuXG4gICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudCh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCwgdHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSk7XG5cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIGdldE5hdGl2ZU5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbnkgcmVzb3VyY2VzIGFsbG9jYXRlZCBieSBgbW91bnRDb21wb25lbnRgLlxuICAgKlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgaWYgKCF0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbFVubW91bnQpIHtcbiAgICAgIGlmIChzYWZlbHkpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSArICcuY29tcG9uZW50V2lsbFVubW91bnQoKSc7XG4gICAgICAgIFJlYWN0RXJyb3JVdGlscy5pbnZva2VHdWFyZGVkQ2FsbGJhY2sobmFtZSwgaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudC5iaW5kKGluc3QpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LCBzYWZlbHkpO1xuICAgICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgcGVuZGluZyBmaWVsZHNcbiAgICAvLyBFdmVuIGlmIHRoaXMgY29tcG9uZW50IGlzIHNjaGVkdWxlZCBmb3IgYW5vdGhlciB1cGRhdGUgaW4gUmVhY3RVcGRhdGVzLFxuICAgIC8vIGl0IHdvdWxkIHN0aWxsIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGVzZSBmaWVsZHMgYXJlIHJlc2V0LlxuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgLy8gVGhlc2UgZmllbGRzIGRvIG5vdCByZWFsbHkgbmVlZCB0byBiZSByZXNldCBzaW5jZSB0aGlzIG9iamVjdCBpcyBub1xuICAgIC8vIGxvbmdlciBhY2Nlc3NpYmxlLlxuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBEZWxldGUgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZSBpbnN0YW5jZSB0byB0aGlzIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgLy8gd2hpY2ggYWxsb3cgdGhlIGludGVybmFscyB0byBiZSBwcm9wZXJseSBjbGVhbmVkIHVwIGV2ZW4gaWYgdGhlIHVzZXJcbiAgICAvLyBsZWFrcyBhIHJlZmVyZW5jZSB0byB0aGUgcHVibGljIGluc3RhbmNlLlxuICAgIFJlYWN0SW5zdGFuY2VNYXAucmVtb3ZlKGluc3QpO1xuXG4gICAgLy8gU29tZSBleGlzdGluZyBjb21wb25lbnRzIHJlbHkgb24gaW5zdC5wcm9wcyBldmVuIGFmdGVyIHRoZXkndmUgYmVlblxuICAgIC8vIGRlc3Ryb3llZCAoaW4gZXZlbnQgaGFuZGxlcnMpLlxuICAgIC8vIFRPRE86IGluc3QucHJvcHMgPSBudWxsO1xuICAgIC8vIFRPRE86IGluc3Quc3RhdGUgPSBudWxsO1xuICAgIC8vIFRPRE86IGluc3QuY29udGV4dCA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgdGhlIGNvbnRleHQgb2JqZWN0IHRvIG9ubHkgY29udGFpbiBrZXlzIHNwZWNpZmllZCBpblxuICAgKiBgY29udGV4dFR5cGVzYFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21hc2tDb250ZXh0OiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgIHZhciBjb250ZXh0VHlwZXMgPSBDb21wb25lbnQuY29udGV4dFR5cGVzO1xuICAgIGlmICghY29udGV4dFR5cGVzKSB7XG4gICAgICByZXR1cm4gZW1wdHlPYmplY3Q7XG4gICAgfVxuICAgIHZhciBtYXNrZWRDb250ZXh0ID0ge307XG4gICAgZm9yICh2YXIgY29udGV4dE5hbWUgaW4gY29udGV4dFR5cGVzKSB7XG4gICAgICBtYXNrZWRDb250ZXh0W2NvbnRleHROYW1lXSA9IGNvbnRleHRbY29udGV4dE5hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgfSxcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY29udGV4dCBvYmplY3QgdG8gb25seSBjb250YWluIGtleXMgc3BlY2lmaWVkIGluXG4gICAqIGBjb250ZXh0VHlwZXNgLCBhbmQgYXNzZXJ0cyB0aGF0IHRoZXkgYXJlIHZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3Byb2Nlc3NDb250ZXh0OiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBtYXNrZWRDb250ZXh0ID0gdGhpcy5fbWFza0NvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgICAgaWYgKENvbXBvbmVudC5jb250ZXh0VHlwZXMpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LmNvbnRleHRUeXBlcywgbWFza2VkQ29udGV4dCwgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50Q29udGV4dFxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKGN1cnJlbnRDb250ZXh0KSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0KCk7XG4gICAgfVxuICAgIHZhciBjaGlsZENvbnRleHQgPSBpbnN0LmdldENoaWxkQ29udGV4dCAmJiBpbnN0LmdldENoaWxkQ29udGV4dCgpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0KCk7XG4gICAgfVxuICAgIGlmIChjaGlsZENvbnRleHQpIHtcbiAgICAgICEodHlwZW9mIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gJyArICd1c2UgZ2V0Q2hpbGRDb250ZXh0KCkuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHQsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY2hpbGRDb250ZXh0KTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY2hpbGRDb250ZXh0KSB7XG4gICAgICAgICEobmFtZSBpbiBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBrZXkgXCIlc1wiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYXNzaWduKHt9LCBjdXJyZW50Q29udGV4dCwgY2hpbGRDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRDb250ZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgcHJvcHMgYnkgc2V0dGluZyBkZWZhdWx0IHZhbHVlcyBmb3IgdW5zcGVjaWZpZWQgcHJvcHMgYW5kXG4gICAqIGFzc2VydGluZyB0aGF0IHRoZSBwcm9wcyBhcmUgdmFsaWQuIERvZXMgbm90IG11dGF0ZSBpdHMgYXJndW1lbnQ7IHJldHVybnNcbiAgICogYSBuZXcgcHJvcHMgb2JqZWN0IHdpdGggZGVmYXVsdHMgbWVyZ2VkIGluLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV3UHJvcHNcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3Byb2Nlc3NQcm9wczogZnVuY3Rpb24gKG5ld1Byb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgICAgaWYgKENvbXBvbmVudC5wcm9wVHlwZXMpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LnByb3BUeXBlcywgbmV3UHJvcHMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9wcztcbiAgfSxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgdGhlIHByb3BzIGFyZSB2YWxpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcFR5cGVzIE1hcCBvZiBwcm9wIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tQcm9wVHlwZXM6IGZ1bmN0aW9uIChwcm9wVHlwZXMsIHByb3BzLCBsb2NhdGlvbikge1xuICAgIC8vIFRPRE86IFN0b3AgdmFsaWRhdGluZyBwcm9wIHR5cGVzIGhlcmUgYW5kIG9ubHkgdXNlIHRoZSBlbGVtZW50XG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BUeXBlcykge1xuICAgICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICAhKHR5cGVvZiBwcm9wVHlwZXNbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSAnICsgJ2Zyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICAgIGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgLy8gV2UgbWF5IHdhbnQgdG8gZXh0ZW5kIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgZXJyb3JzIGluXG4gICAgICAgICAgLy8gdG9wLWxldmVsIHJlbmRlciBjYWxscywgc28gSSdtIGFic3RyYWN0aW5nIGl0IGF3YXkgaW50b1xuICAgICAgICAgIC8vIGEgZnVuY3Rpb24gdG8gbWluaW1pemUgcmVmYWN0b3JpbmcgaW4gdGhlIGZ1dHVyZVxuICAgICAgICAgIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSh0aGlzKTtcblxuICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKSB7XG4gICAgICAgICAgICAvLyBQcmVmYWNlIGdpdmVzIHVzIHNvbWV0aGluZyB0byBibGFja2xpc3QgaW4gd2FybmluZyBtb2R1bGVcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgQ29udGV4dCBUeXBlczogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgbmV4dENvbnRleHQpIHtcbiAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICB2YXIgcHJldkNvbnRleHQgPSB0aGlzLl9jb250ZXh0O1xuXG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgcHJldkNvbnRleHQsIG5leHRDb250ZXh0KTtcbiAgfSxcblxuICAvKipcbiAgICogSWYgYW55IG9mIGBfcGVuZGluZ0VsZW1lbnRgLCBgX3BlbmRpbmdTdGF0ZVF1ZXVlYCwgb3IgYF9wZW5kaW5nRm9yY2VVcGRhdGVgXG4gICAqIGlzIHNldCwgdXBkYXRlIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwZXJmb3JtVXBkYXRlSWZOZWNlc3Nhcnk6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgIGlmICh0aGlzLl9wZW5kaW5nRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudCh0aGlzLCB0aGlzLl9wZW5kaW5nRWxlbWVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSAhPT0gbnVsbCB8fCB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KHRyYW5zYWN0aW9uLCB0aGlzLl9jdXJyZW50RWxlbWVudCwgdGhpcy5fY3VycmVudEVsZW1lbnQsIHRoaXMuX2NvbnRleHQsIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUGVyZm9ybSBhbiB1cGRhdGUgdG8gYSBtb3VudGVkIGNvbXBvbmVudC4gVGhlIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgYW5kXG4gICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSBtZXRob2RzIGFyZSBjYWxsZWQsIHRoZW4gKGFzc3VtaW5nIHRoZSB1cGRhdGUgaXNuJ3RcbiAgICogc2tpcHBlZCkgdGhlIHJlbWFpbmluZyB1cGRhdGUgbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGNhbGxlZCBhbmQgdGhlIERPTVxuICAgKiByZXByZXNlbnRhdGlvbiBpcyB1cGRhdGVkLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IHByZXZQYXJlbnRFbGVtZW50XG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0UGFyZW50RWxlbWVudFxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldlBhcmVudEVsZW1lbnQsIG5leHRQYXJlbnRFbGVtZW50LCBwcmV2VW5tYXNrZWRDb250ZXh0LCBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICB2YXIgd2lsbFJlY2VpdmUgPSBmYWxzZTtcbiAgICB2YXIgbmV4dENvbnRleHQ7XG4gICAgdmFyIG5leHRQcm9wcztcblxuICAgIC8vIERldGVybWluZSBpZiB0aGUgY29udGV4dCBoYXMgY2hhbmdlZCBvciBub3RcbiAgICBpZiAodGhpcy5fY29udGV4dCA9PT0gbmV4dFVubWFza2VkQ29udGV4dCkge1xuICAgICAgbmV4dENvbnRleHQgPSBpbnN0LmNvbnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRDb250ZXh0ID0gdGhpcy5fcHJvY2Vzc0NvbnRleHQobmV4dFVubWFza2VkQ29udGV4dCk7XG4gICAgICB3aWxsUmVjZWl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gRGlzdGluZ3Vpc2ggYmV0d2VlbiBhIHByb3BzIHVwZGF0ZSB2ZXJzdXMgYSBzaW1wbGUgc3RhdGUgdXBkYXRlXG4gICAgaWYgKHByZXZQYXJlbnRFbGVtZW50ID09PSBuZXh0UGFyZW50RWxlbWVudCkge1xuICAgICAgLy8gU2tpcCBjaGVja2luZyBwcm9wIHR5cGVzIGFnYWluIC0tIHdlIGRvbid0IHJlYWQgaW5zdC5wcm9wcyB0byBhdm9pZFxuICAgICAgLy8gd2FybmluZyBmb3IgRE9NIGNvbXBvbmVudCBwcm9wcyBpbiB0aGlzIHVwZ3JhZGVcbiAgICAgIG5leHRQcm9wcyA9IG5leHRQYXJlbnRFbGVtZW50LnByb3BzO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0UHJvcHMgPSB0aGlzLl9wcm9jZXNzUHJvcHMobmV4dFBhcmVudEVsZW1lbnQucHJvcHMpO1xuICAgICAgd2lsbFJlY2VpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFuIHVwZGF0ZSBoZXJlIHdpbGwgc2NoZWR1bGUgYW4gdXBkYXRlIGJ1dCBpbW1lZGlhdGVseSBzZXRcbiAgICAvLyBfcGVuZGluZ1N0YXRlUXVldWUgd2hpY2ggd2lsbCBlbnN1cmUgdGhhdCBhbnkgc3RhdGUgdXBkYXRlcyBnZXRzXG4gICAgLy8gaW1tZWRpYXRlbHkgcmVjb25jaWxlZCBpbnN0ZWFkIG9mIHdhaXRpbmcgZm9yIHRoZSBuZXh0IGJhdGNoLlxuICAgIGlmICh3aWxsUmVjZWl2ZSAmJiBpbnN0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcblxuICAgIHZhciBzaG91bGRVcGRhdGUgPSB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgfHwgIWluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlIHx8IGluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoc2hvdWxkVXBkYXRlICE9PSB1bmRlZmluZWQsICclcy5zaG91bGRDb21wb25lbnRVcGRhdGUoKTogUmV0dXJuZWQgdW5kZWZpbmVkIGluc3RlYWQgb2YgYSAnICsgJ2Jvb2xlYW4gdmFsdWUuIE1ha2Ugc3VyZSB0byByZXR1cm4gdHJ1ZSBvciBmYWxzZS4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcbiAgICAgIC8vIFdpbGwgc2V0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgIGFuZCBgdGhpcy5jb250ZXh0YC5cbiAgICAgIHRoaXMuX3BlcmZvcm1Db21wb25lbnRVcGRhdGUobmV4dFBhcmVudEVsZW1lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgdHJhbnNhY3Rpb24sIG5leHRVbm1hc2tlZENvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBpdCdzIGRldGVybWluZWQgdGhhdCBhIGNvbXBvbmVudCBzaG91bGQgbm90IHVwZGF0ZSwgd2Ugc3RpbGwgd2FudFxuICAgICAgLy8gdG8gc2V0IHByb3BzIGFuZCBzdGF0ZSBidXQgd2Ugc2hvcnRjdXQgdGhlIHJlc3Qgb2YgdGhlIHVwZGF0ZS5cbiAgICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dFBhcmVudEVsZW1lbnQ7XG4gICAgICB0aGlzLl9jb250ZXh0ID0gbmV4dFVubWFza2VkQ29udGV4dDtcbiAgICAgIGluc3QucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgaW5zdC5jb250ZXh0ID0gbmV4dENvbnRleHQ7XG4gICAgfVxuICB9LFxuXG4gIF9wcm9jZXNzUGVuZGluZ1N0YXRlOiBmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIHZhciBxdWV1ZSA9IHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlO1xuICAgIHZhciByZXBsYWNlID0gdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZTtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcmV0dXJuIGluc3Quc3RhdGU7XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2UgJiYgcXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcXVldWVbMF07XG4gICAgfVxuXG4gICAgdmFyIG5leHRTdGF0ZSA9IF9hc3NpZ24oe30sIHJlcGxhY2UgPyBxdWV1ZVswXSA6IGluc3Quc3RhdGUpO1xuICAgIGZvciAodmFyIGkgPSByZXBsYWNlID8gMSA6IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcnRpYWwgPSBxdWV1ZVtpXTtcbiAgICAgIF9hc3NpZ24obmV4dFN0YXRlLCB0eXBlb2YgcGFydGlhbCA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnRpYWwuY2FsbChpbnN0LCBuZXh0U3RhdGUsIHByb3BzLCBjb250ZXh0KSA6IHBhcnRpYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1lcmdlcyBuZXcgcHJvcHMgYW5kIHN0YXRlLCBub3RpZmllcyBkZWxlZ2F0ZSBtZXRob2RzIG9mIHVwZGF0ZSBhbmRcbiAgICogcGVyZm9ybXMgdXBkYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnQgTmV4dCBlbGVtZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHMgTmV4dCBwdWJsaWMgb2JqZWN0IHRvIHNldCBhcyBwcm9wZXJ0aWVzLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZSBOZXh0IG9iamVjdCB0byBzZXQgYXMgc3RhdGUuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHQgTmV4dCBwdWJsaWMgb2JqZWN0IHRvIHNldCBhcyBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gdW5tYXNrZWRDb250ZXh0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGVyZm9ybUNvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKG5leHRFbGVtZW50LCBuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQsIHRyYW5zYWN0aW9uLCB1bm1hc2tlZENvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgdmFyIGhhc0NvbXBvbmVudERpZFVwZGF0ZSA9IEJvb2xlYW4oaW5zdC5jb21wb25lbnREaWRVcGRhdGUpO1xuICAgIHZhciBwcmV2UHJvcHM7XG4gICAgdmFyIHByZXZTdGF0ZTtcbiAgICB2YXIgcHJldkNvbnRleHQ7XG4gICAgaWYgKGhhc0NvbXBvbmVudERpZFVwZGF0ZSkge1xuICAgICAgcHJldlByb3BzID0gaW5zdC5wcm9wcztcbiAgICAgIHByZXZTdGF0ZSA9IGluc3Quc3RhdGU7XG4gICAgICBwcmV2Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVXBkYXRlKSB7XG4gICAgICBpbnN0LmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRFbGVtZW50O1xuICAgIHRoaXMuX2NvbnRleHQgPSB1bm1hc2tlZENvbnRleHQ7XG4gICAgaW5zdC5wcm9wcyA9IG5leHRQcm9wcztcbiAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgIGluc3QuY29udGV4dCA9IG5leHRDb250ZXh0O1xuXG4gICAgdGhpcy5fdXBkYXRlUmVuZGVyZWRDb21wb25lbnQodHJhbnNhY3Rpb24sIHVubWFza2VkQ29udGV4dCk7XG5cbiAgICBpZiAoaGFzQ29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQoaW5zdCwgcHJldlByb3BzLCBwcmV2U3RhdGUsIHByZXZDb250ZXh0KSwgaW5zdCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBjb21wb25lbnQncyBgcmVuZGVyYCBtZXRob2QgYW5kIHVwZGF0ZSB0aGUgRE9NIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgcHJldkNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgdmFyIHByZXZSZW5kZXJlZEVsZW1lbnQgPSBwcmV2Q29tcG9uZW50SW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuICAgIHZhciBuZXh0UmVuZGVyZWRFbGVtZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZSZW5kZXJlZEVsZW1lbnQsIG5leHRSZW5kZXJlZEVsZW1lbnQpKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudChwcmV2Q29tcG9uZW50SW5zdGFuY2UsIG5leHRSZW5kZXJlZEVsZW1lbnQsIHRyYW5zYWN0aW9uLCB0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KGNvbnRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9sZE5hdGl2ZU5vZGUgPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShwcmV2Q29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocHJldkNvbXBvbmVudEluc3RhbmNlLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVkTm9kZVR5cGUgPSBSZWFjdE5vZGVUeXBlcy5nZXRUeXBlKG5leHRSZW5kZXJlZEVsZW1lbnQpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRSZW5kZXJlZEVsZW1lbnQpO1xuICAgICAgdmFyIG5leHRNYXJrdXAgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsIHRyYW5zYWN0aW9uLCB0aGlzLl9uYXRpdmVQYXJlbnQsIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8sIHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQoY29udGV4dCkpO1xuICAgICAgdGhpcy5fcmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT3ZlcnJpZGRlbiBpbiBzaGFsbG93IHJlbmRlcmluZy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApIHtcbiAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cChvbGROYXRpdmVOb2RlLCBuZXh0TWFya3VwKTtcbiAgfSxcblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudFdpdGhvdXRPd25lck9yQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgdmFyIHJlbmRlcmVkQ29tcG9uZW50ID0gaW5zdC5yZW5kZXIoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICBpZiAocmVuZGVyZWRDb21wb25lbnQgPT09IHVuZGVmaW5lZCAmJiBpbnN0LnJlbmRlci5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZENvbXBvbmVudDtcbiAgfSxcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlcmVkQ29tcG9uZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50V2l0aG91dE93bmVyT3JDb250ZXh0KCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICAhKFxuICAgIC8vIFRPRE86IEFuIGBpc1ZhbGlkTm9kZWAgZnVuY3Rpb24gd291bGQgcHJvYmFibHkgYmUgbW9yZSBhcHByb3ByaWF0ZVxuICAgIHJlbmRlcmVkQ29tcG9uZW50ID09PSBudWxsIHx8IHJlbmRlcmVkQ29tcG9uZW50ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocmVuZGVyZWRDb21wb25lbnQpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5yZW5kZXIoKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgJyArICdyZXR1cm5lZCB1bmRlZmluZWQsIGFuIGFycmF5IG9yIHNvbWUgb3RoZXIgaW52YWxpZCBvYmplY3QuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHJldHVybiByZW5kZXJlZENvbXBvbmVudDtcbiAgfSxcblxuICAvKipcbiAgICogTGF6aWx5IGFsbG9jYXRlcyB0aGUgcmVmcyBvYmplY3QgYW5kIHN0b3JlcyBgY29tcG9uZW50YCBhcyBgcmVmYC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBSZWZlcmVuY2UgbmFtZS5cbiAgICogQHBhcmFtIHtjb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gc3RvcmUgYXMgYHJlZmAuXG4gICAqIEBmaW5hbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXR0YWNoUmVmOiBmdW5jdGlvbiAocmVmLCBjb21wb25lbnQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAhKGluc3QgIT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGhhdmUgcmVmcy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHB1YmxpY0NvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50ICYmIGNvbXBvbmVudC5nZXROYW1lID8gY29tcG9uZW50LmdldE5hbWUoKSA6ICdhIGNvbXBvbmVudCc7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhwdWJsaWNDb21wb25lbnRJbnN0YW5jZSAhPSBudWxsLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGJlIGdpdmVuIHJlZnMgJyArICcoU2VlIHJlZiBcIiVzXCIgaW4gJXMgY3JlYXRlZCBieSAlcykuICcgKyAnQXR0ZW1wdHMgdG8gYWNjZXNzIHRoaXMgcmVmIHdpbGwgZmFpbC4nLCByZWYsIGNvbXBvbmVudE5hbWUsIHRoaXMuZ2V0TmFtZSgpKSA6IHZvaWQgMDtcbiAgICB9XG4gICAgdmFyIHJlZnMgPSBpbnN0LnJlZnMgPT09IGVtcHR5T2JqZWN0ID8gaW5zdC5yZWZzID0ge30gOiBpbnN0LnJlZnM7XG4gICAgcmVmc1tyZWZdID0gcHVibGljQ29tcG9uZW50SW5zdGFuY2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGFjaGVzIGEgcmVmZXJlbmNlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSB0byBkZXJlZmVyZW5jZS5cbiAgICogQGZpbmFsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXRhY2hSZWY6IGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIgcmVmcyA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKS5yZWZzO1xuICAgIGRlbGV0ZSByZWZzW3JlZl07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhIHRleHQgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5IGl0XG4gICAqIGluIGVycm9yIG1lc3NhZ2VzLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9yIG51bGwuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLl9pbnN0YW5jZSAmJiB0aGlzLl9pbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgY29uc3RydWN0b3IgJiYgY29uc3RydWN0b3IubmFtZSB8fCBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHB1YmxpY2x5IGFjY2Vzc2libGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb21wb25lbnQgLSBpLmUuIHdoYXRcbiAgICogaXMgZXhwb3NlZCBieSByZWZzIGFuZCByZXR1cm5lZCBieSByZW5kZXIuIENhbiBiZSBudWxsIGZvciBzdGF0ZWxlc3NcbiAgICogY29tcG9uZW50cy5cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9IHRoZSBwdWJsaWMgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAoaW5zdCBpbnN0YW5jZW9mIFN0YXRlbGVzc0NvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpbnN0O1xuICB9LFxuXG4gIC8vIFN0dWJcbiAgX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6IG51bGxcblxufTtcblxuUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50TWl4aW4sICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIHtcbiAgbW91bnRDb21wb25lbnQ6ICdtb3VudENvbXBvbmVudCcsXG4gIHVwZGF0ZUNvbXBvbmVudDogJ3VwZGF0ZUNvbXBvbmVudCcsXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6ICdfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50J1xufSk7XG5cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHtcblxuICBNaXhpbjogUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpblxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgaW5qZWN0ZWQgPSBmYWxzZTtcblxudmFyIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQgPSB7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgaW5qZWN0YWJsZSBlbnZpcm9ubWVudCBkZXBlbmRlbnQgY2xlYW51cCBob29rLiAoc2VydmVyIHZzLlxuICAgKiBicm93c2VyIGV0YykuIEV4YW1wbGU6IEEgYnJvd3NlciBzeXN0ZW0gY2FjaGVzIERPTSBub2RlcyBiYXNlZCBvbiBjb21wb25lbnRcbiAgICogSUQgYW5kIG11c3QgcmVtb3ZlIHRoYXQgY2FjaGUgZW50cnkgd2hlbiB0aGlzIGluc3RhbmNlIGlzIHVubW91bnRlZC5cbiAgICovXG4gIHVubW91bnRJREZyb21FbnZpcm9ubWVudDogbnVsbCxcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBpbmplY3RhYmxlIGhvb2sgZm9yIHN3YXBwaW5nIG91dCBtb3VudCBpbWFnZXMgaW4gdGhlIG1pZGRsZSBvZlxuICAgKiB0aGUgdHJlZS5cbiAgICovXG4gIHJlcGxhY2VOb2RlV2l0aE1hcmt1cDogbnVsbCxcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBpbmplY3RhYmxlIGhvb2sgZm9yIHByb2Nlc3NpbmcgYSBxdWV1ZSBvZiBjaGlsZCB1cGRhdGVzLiBXaWxsXG4gICAqIGxhdGVyIG1vdmUgaW50byBNdWx0aUNoaWxkQ29tcG9uZW50cy5cbiAgICovXG4gIHByb2Nlc3NDaGlsZHJlblVwZGF0ZXM6IG51bGwsXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgaW5qZWN0RW52aXJvbm1lbnQ6IGZ1bmN0aW9uIChlbnZpcm9ubWVudCkge1xuICAgICAgISFpbmplY3RlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudDogaW5qZWN0RW52aXJvbm1lbnQoKSBjYW4gb25seSBiZSBjYWxsZWQgb25jZS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCA9IGVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudDtcbiAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwID0gZW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwO1xuICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzID0gZW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcztcbiAgICAgIGluamVjdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudEVudmlyb25tZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVycm9yVXRpbHNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYXVnaHRFcnJvciA9IG51bGw7XG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIHdoaWxlIGd1YXJkaW5nIGFnYWluc3QgZXJyb3JzIHRoYXQgaGFwcGVucyB3aXRoaW4gaXQuXG4gKlxuICogQHBhcmFtIHs/U3RyaW5nfSBuYW1lIG9mIHRoZSBndWFyZCB0byB1c2UgZm9yIGxvZ2dpbmcgb3IgZGVidWdnaW5nXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2VcbiAqIEBwYXJhbSB7Kn0gYSBGaXJzdCBhcmd1bWVudFxuICogQHBhcmFtIHsqfSBiIFNlY29uZCBhcmd1bWVudFxuICovXG5mdW5jdGlvbiBpbnZva2VHdWFyZGVkQ2FsbGJhY2sobmFtZSwgZnVuYywgYSwgYikge1xuICB0cnkge1xuICAgIHJldHVybiBmdW5jKGEsIGIpO1xuICB9IGNhdGNoICh4KSB7XG4gICAgaWYgKGNhdWdodEVycm9yID09PSBudWxsKSB7XG4gICAgICBjYXVnaHRFcnJvciA9IHg7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxudmFyIFJlYWN0RXJyb3JVdGlscyA9IHtcbiAgaW52b2tlR3VhcmRlZENhbGxiYWNrOiBpbnZva2VHdWFyZGVkQ2FsbGJhY2ssXG5cbiAgLyoqXG4gICAqIEludm9rZWQgYnkgUmVhY3RUZXN0VXRpbHMuU2ltdWxhdGUgc28gdGhhdCBhbnkgZXJyb3JzIHRocm93biBieSB0aGUgZXZlbnRcbiAgICogaGFuZGxlciBhcmUgc3VyZSB0byBiZSByZXRocm93biBieSByZXRocm93Q2F1Z2h0RXJyb3IuXG4gICAqL1xuICBpbnZva2VHdWFyZGVkQ2FsbGJhY2tXaXRoQ2F0Y2g6IGludm9rZUd1YXJkZWRDYWxsYmFjayxcblxuICAvKipcbiAgICogRHVyaW5nIGV4ZWN1dGlvbiBvZiBndWFyZGVkIGZ1bmN0aW9ucyB3ZSB3aWxsIGNhcHR1cmUgdGhlIGZpcnN0IGVycm9yIHdoaWNoXG4gICAqIHdlIHdpbGwgcmV0aHJvdyB0byBiZSBoYW5kbGVkIGJ5IHRoZSB0b3AgbGV2ZWwgZXJyb3IgaGFuZGxlci5cbiAgICovXG4gIHJldGhyb3dDYXVnaHRFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgIGlmIChjYXVnaHRFcnJvcikge1xuICAgICAgdmFyIGVycm9yID0gY2F1Z2h0RXJyb3I7XG4gICAgICBjYXVnaHRFcnJvciA9IG51bGw7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIC8qKlxuICAgKiBUbyBoZWxwIGRldmVsb3BtZW50IHdlIGNhbiBnZXQgYmV0dGVyIGRldnRvb2xzIGludGVncmF0aW9uIGJ5IHNpbXVsYXRpbmcgYVxuICAgKiByZWFsIGJyb3dzZXIgZXZlbnQuXG4gICAqL1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kaXNwYXRjaEV2ZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIGZha2VOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncmVhY3QnKTtcbiAgICBSZWFjdEVycm9yVXRpbHMuaW52b2tlR3VhcmRlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMsIGEsIGIpIHtcbiAgICAgIHZhciBib3VuZEZ1bmMgPSBmdW5jLmJpbmQobnVsbCwgYSwgYik7XG4gICAgICB2YXIgZXZ0VHlwZSA9ICdyZWFjdC0nICsgbmFtZTtcbiAgICAgIGZha2VOb2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgYm91bmRGdW5jLCBmYWxzZSk7XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICBldnQuaW5pdEV2ZW50KGV2dFR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gICAgICBmYWtlTm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICBmYWtlTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGJvdW5kRnVuYywgZmFsc2UpO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVycm9yVXRpbHM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RXJyb3JVdGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROb2RlVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdE5vZGVUeXBlcyA9IHtcbiAgTkFUSVZFOiAwLFxuICBDT01QT1NJVEU6IDEsXG4gIEVNUFRZOiAyLFxuXG4gIGdldFR5cGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBSZWFjdE5vZGVUeXBlcy5FTVBUWTtcbiAgICB9IGVsc2UgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgICAgaWYgKHR5cGVvZiBub2RlLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLkNPTVBPU0lURTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZWFjdE5vZGVUeXBlcy5OQVRJVkU7XG4gICAgICB9XG4gICAgfVxuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdVbmV4cGVjdGVkIG5vZGU6ICVzJywgbm9kZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9kZVR5cGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5vZGVUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogR2l2ZW4gYSBgcHJldkVsZW1lbnRgIGFuZCBgbmV4dEVsZW1lbnRgLCBkZXRlcm1pbmVzIGlmIHRoZSBleGlzdGluZ1xuICogaW5zdGFuY2Ugc2hvdWxkIGJlIHVwZGF0ZWQgYXMgb3Bwb3NlZCB0byBiZWluZyBkZXN0cm95ZWQgb3IgcmVwbGFjZWQgYnkgYSBuZXdcbiAqIGluc3RhbmNlLiBCb3RoIGFyZ3VtZW50cyBhcmUgZWxlbWVudHMuIFRoaXMgZW5zdXJlcyB0aGF0IHRoaXMgbG9naWMgY2FuXG4gKiBvcGVyYXRlIG9uIHN0YXRlbGVzcyB0cmVlcyB3aXRob3V0IGFueSBiYWNraW5nIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gcHJldkVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gbmV4dEVsZW1lbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGV4aXN0aW5nIGluc3RhbmNlIHNob3VsZCBiZSB1cGRhdGVkLlxuICogQHByb3RlY3RlZFxuICovXG5cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkge1xuICB2YXIgcHJldkVtcHR5ID0gcHJldkVsZW1lbnQgPT09IG51bGwgfHwgcHJldkVsZW1lbnQgPT09IGZhbHNlO1xuICB2YXIgbmV4dEVtcHR5ID0gbmV4dEVsZW1lbnQgPT09IG51bGwgfHwgbmV4dEVsZW1lbnQgPT09IGZhbHNlO1xuICBpZiAocHJldkVtcHR5IHx8IG5leHRFbXB0eSkge1xuICAgIHJldHVybiBwcmV2RW1wdHkgPT09IG5leHRFbXB0eTtcbiAgfVxuXG4gIHZhciBwcmV2VHlwZSA9IHR5cGVvZiBwcmV2RWxlbWVudDtcbiAgdmFyIG5leHRUeXBlID0gdHlwZW9mIG5leHRFbGVtZW50O1xuICBpZiAocHJldlR5cGUgPT09ICdzdHJpbmcnIHx8IHByZXZUeXBlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBuZXh0VHlwZSA9PT0gJ3N0cmluZycgfHwgbmV4dFR5cGUgPT09ICdudW1iZXInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXh0VHlwZSA9PT0gJ29iamVjdCcgJiYgcHJldkVsZW1lbnQudHlwZSA9PT0gbmV4dEVsZW1lbnQudHlwZSAmJiBwcmV2RWxlbWVudC5rZXkgPT09IG5leHRFbGVtZW50LmtleTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9zaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFbXB0eUNvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5Q29tcG9uZW50RmFjdG9yeTtcblxudmFyIFJlYWN0RW1wdHlDb21wb25lbnRJbmplY3Rpb24gPSB7XG4gIGluamVjdEVtcHR5Q29tcG9uZW50RmFjdG9yeTogZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBlbXB0eUNvbXBvbmVudEZhY3RvcnkgPSBmYWN0b3J5O1xuICB9XG59O1xuXG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbiAoaW5zdGFudGlhdGUpIHtcbiAgICByZXR1cm4gZW1wdHlDb21wb25lbnRGYWN0b3J5KGluc3RhbnRpYXRlKTtcbiAgfVxufTtcblxuUmVhY3RFbXB0eUNvbXBvbmVudC5pbmplY3Rpb24gPSBSZWFjdEVtcHR5Q29tcG9uZW50SW5qZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RW1wdHlDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RW1wdHlDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0TmF0aXZlQ29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgYXV0b0dlbmVyYXRlV3JhcHBlckNsYXNzID0gbnVsbDtcbnZhciBnZW5lcmljQ29tcG9uZW50Q2xhc3MgPSBudWxsO1xuLy8gVGhpcyByZWdpc3RyeSBrZWVwcyB0cmFjayBvZiB3cmFwcGVyIGNsYXNzZXMgYXJvdW5kIG5hdGl2ZSB0YWdzLlxudmFyIHRhZ1RvQ29tcG9uZW50Q2xhc3MgPSB7fTtcbnZhciB0ZXh0Q29tcG9uZW50Q2xhc3MgPSBudWxsO1xuXG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnRJbmplY3Rpb24gPSB7XG4gIC8vIFRoaXMgYWNjZXB0cyBhIGNsYXNzIHRoYXQgcmVjZWl2ZXMgdGhlIHRhZyBzdHJpbmcuIFRoaXMgaXMgYSBjYXRjaCBhbGxcbiAgLy8gdGhhdCBjYW4gcmVuZGVyIGFueSBraW5kIG9mIHRhZy5cbiAgaW5qZWN0R2VuZXJpY0NvbXBvbmVudENsYXNzOiBmdW5jdGlvbiAoY29tcG9uZW50Q2xhc3MpIHtcbiAgICBnZW5lcmljQ29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcbiAgfSxcbiAgLy8gVGhpcyBhY2NlcHRzIGEgdGV4dCBjb21wb25lbnQgY2xhc3MgdGhhdCB0YWtlcyB0aGUgdGV4dCBzdHJpbmcgdG8gYmVcbiAgLy8gcmVuZGVyZWQgYXMgcHJvcHMuXG4gIGluamVjdFRleHRDb21wb25lbnRDbGFzczogZnVuY3Rpb24gKGNvbXBvbmVudENsYXNzKSB7XG4gICAgdGV4dENvbXBvbmVudENsYXNzID0gY29tcG9uZW50Q2xhc3M7XG4gIH0sXG4gIC8vIFRoaXMgYWNjZXB0cyBhIGtleWVkIG9iamVjdCB3aXRoIGNsYXNzZXMgYXMgdmFsdWVzLiBFYWNoIGtleSByZXByZXNlbnRzIGFcbiAgLy8gdGFnLiBUaGF0IHBhcnRpY3VsYXIgdGFnIHdpbGwgdXNlIHRoaXMgY2xhc3MgaW5zdGVhZCBvZiB0aGUgZ2VuZXJpYyBvbmUuXG4gIGluamVjdENvbXBvbmVudENsYXNzZXM6IGZ1bmN0aW9uIChjb21wb25lbnRDbGFzc2VzKSB7XG4gICAgX2Fzc2lnbih0YWdUb0NvbXBvbmVudENsYXNzLCBjb21wb25lbnRDbGFzc2VzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgYSBjb21wb3NpdGUgY29tcG9uZW50IHdyYXBwZXIgY2xhc3MgZm9yIGEgc3BlY2lmaWMgdGFnLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IFRoZSB0YWcgZm9yIHdoaWNoIHRvIGdldCB0aGUgY2xhc3MuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIFJlYWN0IGNsYXNzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnRDbGFzc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gIH1cbiAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gdGFnVG9Db21wb25lbnRDbGFzc1t0YWddO1xuICBpZiAoY29tcG9uZW50Q2xhc3MgPT0gbnVsbCkge1xuICAgIHRhZ1RvQ29tcG9uZW50Q2xhc3NbdGFnXSA9IGNvbXBvbmVudENsYXNzID0gYXV0b0dlbmVyYXRlV3JhcHBlckNsYXNzKHRhZyk7XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudENsYXNzO1xufVxuXG4vKipcbiAqIEdldCBhIG5hdGl2ZSBpbnRlcm5hbCBjb21wb25lbnQgY2xhc3MgZm9yIGEgc3BlY2lmaWMgdGFnLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGNyZWF0ZS5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgaW50ZXJuYWwgY2xhc3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUludGVybmFsQ29tcG9uZW50KGVsZW1lbnQpIHtcbiAgIWdlbmVyaWNDb21wb25lbnRDbGFzcyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUaGVyZSBpcyBubyByZWdpc3RlcmVkIGNvbXBvbmVudCBmb3IgdGhlIHRhZyAlcycsIGVsZW1lbnQudHlwZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICByZXR1cm4gbmV3IGdlbmVyaWNDb21wb25lbnRDbGFzcyhlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlYWN0VGV4dH0gdGV4dFxuICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlRm9yVGV4dCh0ZXh0KSB7XG4gIHJldHVybiBuZXcgdGV4dENvbXBvbmVudENsYXNzKHRleHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNUZXh0Q29tcG9uZW50KGNvbXBvbmVudCkge1xuICByZXR1cm4gY29tcG9uZW50IGluc3RhbmNlb2YgdGV4dENvbXBvbmVudENsYXNzO1xufVxuXG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSB7XG4gIGdldENvbXBvbmVudENsYXNzRm9yRWxlbWVudDogZ2V0Q29tcG9uZW50Q2xhc3NGb3JFbGVtZW50LFxuICBjcmVhdGVJbnRlcm5hbENvbXBvbmVudDogY3JlYXRlSW50ZXJuYWxDb21wb25lbnQsXG4gIGNyZWF0ZUluc3RhbmNlRm9yVGV4dDogY3JlYXRlSW5zdGFuY2VGb3JUZXh0LFxuICBpc1RleHRDb21wb25lbnQ6IGlzVGV4dENvbXBvbmVudCxcbiAgaW5qZWN0aW9uOiBSZWFjdE5hdGl2ZUNvbXBvbmVudEluamVjdGlvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA8IDEwIHx8ICgvXltzXFxXXSokLykudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgd2FybmluZyBmb3JtYXQgc2hvdWxkIGJlIGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyAnICtcbiAgICAgICAgJ3dhcm5pbmcuIFBsZWFzZSwgdXNlIGEgbW9yZSBkZXNjcmlwdGl2ZSBmb3JtYXQgdGhhbjogJyArIGZvcm1hdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi93YXJuaW5nL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXHJcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8gPSBmdW5jdGlvbiAocm9vdEluc3RhbmNlLCBjb250YWluZXJOYW1lKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIF9yb290SW5zdGFuY2U6IHJvb3RJbnN0YW5jZSxcclxuICAgICAgICBfY29udGFpbmVyTmFtZTogY29udGFpbmVyTmFtZVxyXG4gICAgfTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm87XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VXBkYXRlcycpO1xudmFyIFJlYWN0TmF0aXZlQ29tcG9uZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0TmF0aXZlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEVtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5Jyk7XG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG5cbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbicpO1xudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmdDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdDb21wb25lbnQnKTtcbnZhciBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCcpO1xudmFyIFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50Jyk7XG5cbnZhciBpbmplY3QgPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICBSZWFjdFVwZGF0ZXMuaW5qZWN0aW9uLmluamVjdFJlY29uY2lsZVRyYW5zYWN0aW9uKGNyZWF0ZVJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbihuYXRpdmVJbXBsZW1lbnRhdGlvbi50cmFuc2FjdGlvbikpO1xuICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0QmF0Y2hpbmdTdHJhdGVneShSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5KTtcblxuICAgIFJlYWN0TmF0aXZlQ29tcG9uZW50LmluamVjdGlvbi5pbmplY3RHZW5lcmljQ29tcG9uZW50Q2xhc3MoY3JlYXRlUmVhY3RBbnl0aGluZ0NvbXBvbmVudChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jb21wb25lbnRzKSk7XG5cbiAgICBSZWFjdEVtcHR5Q29tcG9uZW50LmluamVjdGlvbi5pbmplY3RFbXB0eUNvbXBvbmVudEZhY3RvcnkoZnVuY3Rpb24gKGluc3RhbnRpYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50KGluc3RhbnRpYXRlKTtcbiAgICB9KTtcblxuICAgIGlmIChSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCB8fFxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCB8fFxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMpIHtcblxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCA9IFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQ7XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cDtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5pbmplY3Rpb24uaW5qZWN0RW52aXJvbm1lbnQoUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50KTtcbiAgICB9XG59O1xuXG52YXIgY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24gPSBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5qZWN0OiBpbmplY3QsXG4gICAgY2xlYXI6IGNsZWFyXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdJbmplY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3lcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcbnZhciBUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vVHJhbnNhY3Rpb24nKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG5cbnZhciBSRVNFVF9CQVRDSEVEX1VQREFURVMgPSB7XG4gIGluaXRpYWxpemU6IGVtcHR5RnVuY3Rpb24sXG4gIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcyA9IGZhbHNlO1xuICB9XG59O1xuXG52YXIgRkxVU0hfQkFUQ0hFRF9VUERBVEVTID0ge1xuICBpbml0aWFsaXplOiBlbXB0eUZ1bmN0aW9uLFxuICBjbG9zZTogUmVhY3RVcGRhdGVzLmZsdXNoQmF0Y2hlZFVwZGF0ZXMuYmluZChSZWFjdFVwZGF0ZXMpXG59O1xuXG52YXIgVFJBTlNBQ1RJT05fV1JBUFBFUlMgPSBbRkxVU0hfQkFUQ0hFRF9VUERBVEVTLCBSRVNFVF9CQVRDSEVEX1VQREFURVNdO1xuXG5mdW5jdGlvbiBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5VHJhbnNhY3Rpb24oKSB7XG4gIHRoaXMucmVpbml0aWFsaXplVHJhbnNhY3Rpb24oKTtcbn1cblxuX2Fzc2lnbihSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5VHJhbnNhY3Rpb24ucHJvdG90eXBlLCBUcmFuc2FjdGlvbi5NaXhpbiwge1xuICBnZXRUcmFuc2FjdGlvbldyYXBwZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFRSQU5TQUNUSU9OX1dSQVBQRVJTO1xuICB9XG59KTtcblxudmFyIHRyYW5zYWN0aW9uID0gbmV3IFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3lUcmFuc2FjdGlvbigpO1xuXG52YXIgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneSA9IHtcbiAgaXNCYXRjaGluZ1VwZGF0ZXM6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpbiBhIGNvbnRleHQgd2l0aGluIHdoaWNoIGNhbGxzIHRvIGBzZXRTdGF0ZWBcbiAgICogYW5kIGZyaWVuZHMgYXJlIGJhdGNoZWQgc3VjaCB0aGF0IGNvbXBvbmVudHMgYXJlbid0IHVwZGF0ZWQgdW5uZWNlc3NhcmlseS5cbiAgICovXG4gIGJhdGNoZWRVcGRhdGVzOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGEsIGIsIGMsIGQsIGUpIHtcbiAgICB2YXIgYWxyZWFkeUJhdGNoaW5nVXBkYXRlcyA9IFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXM7XG5cbiAgICBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID0gdHJ1ZTtcblxuICAgIC8vIFRoZSBjb2RlIGlzIHdyaXR0ZW4gdGhpcyB3YXkgdG8gYXZvaWQgZXh0cmEgYWxsb2NhdGlvbnNcbiAgICBpZiAoYWxyZWFkeUJhdGNoaW5nVXBkYXRlcykge1xuICAgICAgY2FsbGJhY2soYSwgYiwgYywgZCwgZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zYWN0aW9uLnBlcmZvcm0oY2FsbGJhY2ssIG51bGwsIGEsIGIsIGMsIGQsIGUpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmpzXG4gKiogbW9kdWxlIGlkID0gNTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIENhbGxiYWNrUXVldWUgPSByZXF1aXJlKCdyZWFjdC9saWIvQ2FsbGJhY2tRdWV1ZScpO1xudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgncmVhY3QvbGliL1Bvb2xlZENsYXNzJyk7XG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCdyZWFjdC9saWIvVHJhbnNhY3Rpb24nKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIE9OX1JFQURZX1FVRVVFSU5HID0ge1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkucmVzZXQoKTtcbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkubm90aWZ5QWxsKCk7XG4gICAgfVxufTtcblxudmFyIGNyZWF0ZVRyYW5zYWN0aW9uVHlwZSA9IGZ1bmN0aW9uIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgIHZhciBUUkFOU0FDVElPTl9XUkFQUEVSUyA9IFtPTl9SRUFEWV9RVUVVRUlOR107XG5cbiAgICBpZiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICAgICAgVFJBTlNBQ1RJT05fV1JBUFBFUlMucHVzaChuYXRpdmVJbXBsZW1lbnRhdGlvbik7XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpO1xuICAgICAgICAvLyBPbmx5IHNlcnZlci1zaWRlIHJlbmRlcmluZyByZWFsbHkgbmVlZHMgdGhpcyBvcHRpb24gKHNlZVxuICAgICAgICAvLyBgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdgKSwgYnV0IHNlcnZlci1zaWRlIHVzZXNcbiAgICAgICAgLy8gYFJlYWN0U2VydmVyUmVuZGVyaW5nVHJhbnNhY3Rpb25gIGluc3RlYWQuIFRoaXMgb3B0aW9uIGlzIGhlcmUgc28gdGhhdCBpdCdzXG4gICAgICAgIC8vIGFjY2Vzc2libGUgYW5kIGRlZmF1bHRzIHRvIGZhbHNlIHdoZW4gYFJlYWN0RE9NQ29tcG9uZW50YCBhbmRcbiAgICAgICAgLy8gYFJlYWN0VGV4dENvbXBvbmVudGAgY2hlY2tzIGl0IGluIGBtb3VudENvbXBvbmVudGAuYFxuICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKG51bGwpO1xuICAgIH07XG5cbiAgICB2YXIgTWl4aW4gPSB7XG4gICAgICAgIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBUUkFOU0FDVElPTl9XUkFQUEVSUztcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRSZWFjdE1vdW50UmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWN0TW91bnRSZWFkeTtcbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja3BvaW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyByZWFjdE1vdW50UmVhZHkgaXMgdGhlIG91ciBvbmx5IHN0YXRlZnVsIHdyYXBwZXJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWN0TW91bnRSZWFkeS5jaGVja3BvaW50KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcm9sbGJhY2s6IGZ1bmN0aW9uIChjaGVja3BvaW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeS5yb2xsYmFjayhjaGVja3BvaW50KTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZXN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBDYWxsYmFja1F1ZXVlLnJlbGVhc2UodGhpcy5yZWFjdE1vdW50UmVhZHkpO1xuICAgICAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgYXNzaWduKFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbi5wcm90b3R5cGUsIFRyYW5zYWN0aW9uLk1peGluLCBNaXhpbik7XG5cbiAgICBQb29sZWRDbGFzcy5hZGRQb29saW5nVG8oUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uKTtcblxuICAgIHJldHVybiBSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb247XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRyYW5zYWN0aW9uVHlwZTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIFxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RET01Db21wb25lbnQuanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RNdWx0aUNoaWxkID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZCcpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAxO1xuXG52YXIgY3JlYXRlSW1wbGVtZW50YXRpb24gPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcblxuICAgIHZhciBSZWFjdEFueXRoaW5nQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZTtcbiAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl90YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG4gICAgfTtcblxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuZGlzcGxheU5hbWUgPSAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudCc7XG5cbiAgICBSZWFjdEFueXRoaW5nQ29tcG9uZW50Lk1peGluID0ge1xuICAgICAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVDb250YWluZXJJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBnbG9iYWxJZENvdW50ZXIrKztcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBuYXRpdmVDb250YWluZXJJbmZvO1xuXG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlTm9kZSA9IG5hdGl2ZUltcGxlbWVudGF0aW9uLm1vdW50KHRoaXMuX3Jvb3ROb2RlSUQsIHRoaXMuX3RhZywgcHJvcHMsIG5hdGl2ZVBhcmVudCAmJiBuYXRpdmVQYXJlbnQuX25hdGl2ZU5vZGUpO1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuSW1hZ2VzID0gdGhpcy5tb3VudENoaWxkcmVuKHByb3BzLmNoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAobmF0aXZlSW1wbGVtZW50YXRpb24uY2hpbGRyZW5Nb3VudCAmJiBjaGlsZHJlbkltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24uY2hpbGRyZW5Nb3VudCh0aGlzLl9uYXRpdmVOb2RlLCBjaGlsZHJlbkltYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgbGFzdFByb3BzID0gcHJldkVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB2YXIgbmV4dFByb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG5cbiAgICAgICAgICAgIG5hdGl2ZUltcGxlbWVudGF0aW9uLnVwZGF0ZSh0aGlzLl9uYXRpdmVOb2RlLCBuZXh0UHJvcHMsIGxhc3RQcm9wcyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4obmV4dFByb3BzLmNoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZU5vZGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgICAgICAgdGhpcy51bm1vdW50Q2hpbGRyZW4oc2FmZWx5KTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24udW5tb3VudCh0aGlzLl9uYXRpdmVOb2RlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQdWJsaWNJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFJlYWN0UGVyZi5tZWFzdXJlTWV0aG9kcyhSZWFjdEFueXRoaW5nQ29tcG9uZW50Lk1peGluLCAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudCcsIHtcbiAgICAgICAgbW91bnRDb21wb25lbnQ6ICdtb3VudENvbXBvbmVudCcsXG4gICAgICAgIHJlY2VpdmVDb21wb25lbnQ6ICdyZWNlaXZlQ29tcG9uZW50JyxcbiAgICB9KTtcblxuICAgIGFzc2lnbihcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5wcm90b3R5cGUsXG4gICAgICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4sXG4gICAgICAgIFJlYWN0TXVsdGlDaGlsZC5NaXhpblxuICAgICk7XG5cbiAgICByZXR1cm4gUmVhY3RBbnl0aGluZ0NvbXBvbmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbXBsZW1lbnRhdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE11bHRpQ2hpbGRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzJyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0Q2hpbGRSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkUmVjb25jaWxlcicpO1xuXG52YXIgZmxhdHRlbkNoaWxkcmVuID0gcmVxdWlyZSgnLi9mbGF0dGVuQ2hpbGRyZW4nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3IgbWFya3VwIHRvIGJlIHJlbmRlcmVkIGFuZCBpbnNlcnRlZCBhdCBhIHN1cHBsaWVkIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrdXAgTWFya3VwIHRoYXQgcmVuZGVycyBpbnRvIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gdG9JbmRleCBEZXN0aW5hdGlvbiBpbmRleC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VJbnNlcnRNYXJrdXAobWFya3VwLCBhZnRlck5vZGUsIHRvSW5kZXgpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLklOU0VSVF9NQVJLVVAsXG4gICAgY29udGVudDogbWFya3VwLFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiB0b0luZGV4LFxuICAgIGFmdGVyTm9kZTogYWZ0ZXJOb2RlXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIG1vdmluZyBhbiBleGlzdGluZyBlbGVtZW50IHRvIGFub3RoZXIgaW5kZXguXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBTb3VyY2UgaW5kZXggb2YgdGhlIGV4aXN0aW5nIGVsZW1lbnQuXG4gKiBAcGFyYW0ge251bWJlcn0gdG9JbmRleCBEZXN0aW5hdGlvbiBpbmRleCBvZiB0aGUgZWxlbWVudC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VNb3ZlKGNoaWxkLCBhZnRlck5vZGUsIHRvSW5kZXgpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLk1PVkVfRVhJU1RJTkcsXG4gICAgY29udGVudDogbnVsbCxcbiAgICBmcm9tSW5kZXg6IGNoaWxkLl9tb3VudEluZGV4LFxuICAgIGZyb21Ob2RlOiBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShjaGlsZCksXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICBhZnRlck5vZGU6IGFmdGVyTm9kZVxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciByZW1vdmluZyBhbiBlbGVtZW50IGF0IGFuIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggSW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gcmVtb3ZlLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZVJlbW92ZShjaGlsZCwgbm9kZSkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuUkVNT1ZFX05PREUsXG4gICAgY29udGVudDogbnVsbCxcbiAgICBmcm9tSW5kZXg6IGNoaWxkLl9tb3VudEluZGV4LFxuICAgIGZyb21Ob2RlOiBub2RlLFxuICAgIHRvSW5kZXg6IG51bGwsXG4gICAgYWZ0ZXJOb2RlOiBudWxsXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIHNldHRpbmcgdGhlIG1hcmt1cCBvZiBhIG5vZGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1hcmt1cCBNYXJrdXAgdGhhdCByZW5kZXJzIGludG8gYW4gZWxlbWVudC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VTZXRNYXJrdXAobWFya3VwKSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5TRVRfTUFSS1VQLFxuICAgIGNvbnRlbnQ6IG1hcmt1cCxcbiAgICBmcm9tSW5kZXg6IG51bGwsXG4gICAgZnJvbU5vZGU6IG51bGwsXG4gICAgdG9JbmRleDogbnVsbCxcbiAgICBhZnRlck5vZGU6IG51bGxcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3Igc2V0dGluZyB0aGUgdGV4dCBjb250ZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0Q29udGVudCBUZXh0IGNvbnRlbnQgdG8gc2V0LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZVRleHRDb250ZW50KHRleHRDb250ZW50KSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5URVhUX0NPTlRFTlQsXG4gICAgY29udGVudDogdGV4dENvbnRlbnQsXG4gICAgZnJvbUluZGV4OiBudWxsLFxuICAgIGZyb21Ob2RlOiBudWxsLFxuICAgIHRvSW5kZXg6IG51bGwsXG4gICAgYWZ0ZXJOb2RlOiBudWxsXG4gIH07XG59XG5cbi8qKlxuICogUHVzaCBhbiB1cGRhdGUsIGlmIGFueSwgb250byB0aGUgcXVldWUuIENyZWF0ZXMgYSBuZXcgcXVldWUgaWYgbm9uZSBpc1xuICogcGFzc2VkIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgcXVldWUuIE11dGF0aXZlLlxuICovXG5mdW5jdGlvbiBlbnF1ZXVlKHF1ZXVlLCB1cGRhdGUpIHtcbiAgaWYgKHVwZGF0ZSkge1xuICAgIHF1ZXVlID0gcXVldWUgfHwgW107XG4gICAgcXVldWUucHVzaCh1cGRhdGUpO1xuICB9XG4gIHJldHVybiBxdWV1ZTtcbn1cblxuLyoqXG4gKiBQcm9jZXNzZXMgYW55IGVucXVldWVkIHVwZGF0ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc1F1ZXVlKGluc3QsIHVwZGF0ZVF1ZXVlKSB7XG4gIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcyhpbnN0LCB1cGRhdGVRdWV1ZSk7XG59XG5cbi8qKlxuICogUmVhY3RNdWx0aUNoaWxkIGFyZSBjYXBhYmxlIG9mIHJlY29uY2lsaW5nIG11bHRpcGxlIGNoaWxkcmVuLlxuICpcbiAqIEBjbGFzcyBSZWFjdE11bHRpQ2hpbGRcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RNdWx0aUNoaWxkID0ge1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBjb21tb24gZnVuY3Rpb25hbGl0eSBmb3IgY29tcG9uZW50cyB0aGF0IG11c3QgcmVjb25jaWxlIG11bHRpcGxlXG4gICAqIGNoaWxkcmVuLiBUaGlzIGlzIHVzZWQgYnkgYFJlYWN0RE9NQ29tcG9uZW50YCB0byBtb3VudCwgdXBkYXRlLCBhbmRcbiAgICogdW5tb3VudCBjaGlsZCBjb21wb25lbnRzLlxuICAgKlxuICAgKiBAbGVuZHMge1JlYWN0TXVsdGlDaGlsZC5wcm90b3R5cGV9XG4gICAqL1xuICBNaXhpbjoge1xuXG4gICAgX3JlY29uY2lsZXJJbnN0YW50aWF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAobmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50Ll9vd25lcjtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdENoaWxkUmVjb25jaWxlci5pbnN0YW50aWF0ZUNoaWxkcmVuKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLmluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgX3JlY29uY2lsZXJVcGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKHByZXZDaGlsZHJlbiwgbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBuZXh0Q2hpbGRyZW47XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50Ll9vd25lcjtcbiAgICAgICAgICAgIG5leHRDaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cyk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51cGRhdGVDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgICAgcmV0dXJuIG5leHRDaGlsZHJlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbmV4dENoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzKTtcbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgIHJldHVybiBuZXh0Q2hpbGRyZW47XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIFwibW91bnQgaW1hZ2VcIiBmb3IgZWFjaCBvZiB0aGUgc3VwcGxpZWQgY2hpbGRyZW4uIEluIHRoZSBjYXNlXG4gICAgICogb2YgYFJlYWN0RE9NQ29tcG9uZW50YCwgYSBtb3VudCBpbWFnZSBpcyBhIHN0cmluZyBvZiBtYXJrdXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5lc3RlZENoaWxkcmVuIE5lc3RlZCBjaGlsZCBtYXBzLlxuICAgICAqIEByZXR1cm4ge2FycmF5fSBBbiBhcnJheSBvZiBtb3VudGVkIHJlcHJlc2VudGF0aW9ucy5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBtb3VudENoaWxkcmVuOiBmdW5jdGlvbiAobmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9yZWNvbmNpbGVySW5zdGFudGlhdGVDaGlsZHJlbihuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgdmFyIG1vdW50SW1hZ2VzID0gW107XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBjaGlsZHJlbikge1xuICAgICAgICBpZiAoY2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltuYW1lXTtcbiAgICAgICAgICB2YXIgbW91bnRJbWFnZSA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudChjaGlsZCwgdHJhbnNhY3Rpb24sIHRoaXMsIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8sIGNvbnRleHQpO1xuICAgICAgICAgIGNoaWxkLl9tb3VudEluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgICBtb3VudEltYWdlcy5wdXNoKG1vdW50SW1hZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbW91bnRJbWFnZXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFueSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIGEgdGV4dCBjb250ZW50IHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0Q29udGVudCBTdHJpbmcgb2YgY29udGVudC5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB1cGRhdGVUZXh0Q29udGVudDogZnVuY3Rpb24gKG5leHRDb250ZW50KSB7XG4gICAgICB2YXIgcHJldkNoaWxkcmVuID0gdGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtcbiAgICAgIC8vIFJlbW92ZSBhbnkgcmVuZGVyZWQgY2hpbGRyZW4uXG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51bm1vdW50Q2hpbGRyZW4ocHJldkNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHByZXZDaGlsZHJlbikge1xuICAgICAgICBpZiAocHJldkNoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZVRleHRDb250ZW50IGNhbGxlZCBvbiBub24tZW1wdHkgY29tcG9uZW50LicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IG5ldyB0ZXh0IGNvbnRlbnQuXG4gICAgICB2YXIgdXBkYXRlcyA9IFttYWtlVGV4dENvbnRlbnQobmV4dENvbnRlbnQpXTtcbiAgICAgIHByb2Nlc3NRdWV1ZSh0aGlzLCB1cGRhdGVzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgYW55IHJlbmRlcmVkIGNoaWxkcmVuIHdpdGggYSBtYXJrdXAgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRNYXJrdXAgU3RyaW5nIG9mIG1hcmt1cC5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB1cGRhdGVNYXJrdXA6IGZ1bmN0aW9uIChuZXh0TWFya3VwKSB7XG4gICAgICB2YXIgcHJldkNoaWxkcmVuID0gdGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtcbiAgICAgIC8vIFJlbW92ZSBhbnkgcmVuZGVyZWQgY2hpbGRyZW4uXG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51bm1vdW50Q2hpbGRyZW4ocHJldkNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHByZXZDaGlsZHJlbikge1xuICAgICAgICBpZiAocHJldkNoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ3VwZGF0ZVRleHRDb250ZW50IGNhbGxlZCBvbiBub24tZW1wdHkgY29tcG9uZW50LicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHVwZGF0ZXMgPSBbbWFrZVNldE1hcmt1cChuZXh0TWFya3VwKV07XG4gICAgICBwcm9jZXNzUXVldWUodGhpcywgdXBkYXRlcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHJlbmRlcmVkIGNoaWxkcmVuIHdpdGggbmV3IGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cyBOZXN0ZWQgY2hpbGQgZWxlbWVudCBtYXBzLlxuICAgICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB1cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgLy8gSG9vayB1c2VkIGJ5IFJlYWN0IEFSVFxuICAgICAgdGhpcy5fdXBkYXRlQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cyBOZXN0ZWQgY2hpbGQgZWxlbWVudCBtYXBzLlxuICAgICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICAgKiBAZmluYWxcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgX3VwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAobmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcHJldkNoaWxkcmVuID0gdGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtcbiAgICAgIHZhciByZW1vdmVkTm9kZXMgPSB7fTtcbiAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSB0aGlzLl9yZWNvbmNpbGVyVXBkYXRlQ2hpbGRyZW4ocHJldkNoaWxkcmVuLCBuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICBpZiAoIW5leHRDaGlsZHJlbiAmJiAhcHJldkNoaWxkcmVuKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciB1cGRhdGVzID0gbnVsbDtcbiAgICAgIHZhciBuYW1lO1xuICAgICAgLy8gYG5leHRJbmRleGAgd2lsbCBpbmNyZW1lbnQgZm9yIGVhY2ggY2hpbGQgaW4gYG5leHRDaGlsZHJlbmAsIGJ1dFxuICAgICAgLy8gYGxhc3RJbmRleGAgd2lsbCBiZSB0aGUgbGFzdCBpbmRleCB2aXNpdGVkIGluIGBwcmV2Q2hpbGRyZW5gLlxuICAgICAgdmFyIGxhc3RJbmRleCA9IDA7XG4gICAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICAgIHZhciBsYXN0UGxhY2VkTm9kZSA9IG51bGw7XG4gICAgICBmb3IgKG5hbWUgaW4gbmV4dENoaWxkcmVuKSB7XG4gICAgICAgIGlmICghbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZDaGlsZCA9IHByZXZDaGlsZHJlbiAmJiBwcmV2Q2hpbGRyZW5bbmFtZV07XG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBuZXh0Q2hpbGRyZW5bbmFtZV07XG4gICAgICAgIGlmIChwcmV2Q2hpbGQgPT09IG5leHRDaGlsZCkge1xuICAgICAgICAgIHVwZGF0ZXMgPSBlbnF1ZXVlKHVwZGF0ZXMsIHRoaXMubW92ZUNoaWxkKHByZXZDaGlsZCwgbGFzdFBsYWNlZE5vZGUsIG5leHRJbmRleCwgbGFzdEluZGV4KSk7XG4gICAgICAgICAgbGFzdEluZGV4ID0gTWF0aC5tYXgocHJldkNoaWxkLl9tb3VudEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICAgIHByZXZDaGlsZC5fbW91bnRJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocHJldkNoaWxkKSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgYGxhc3RJbmRleGAgYmVmb3JlIGBfbW91bnRJbmRleGAgZ2V0cyB1bnNldCBieSB1bm1vdW50aW5nLlxuICAgICAgICAgICAgbGFzdEluZGV4ID0gTWF0aC5tYXgocHJldkNoaWxkLl9tb3VudEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICAgICAgLy8gVGhlIGByZW1vdmVkTm9kZXNgIGxvb3AgYmVsb3cgd2lsbCBhY3R1YWxseSByZW1vdmUgdGhlIGNoaWxkLlxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBUaGUgY2hpbGQgbXVzdCBiZSBpbnN0YW50aWF0ZWQgYmVmb3JlIGl0J3MgbW91bnRlZC5cbiAgICAgICAgICB1cGRhdGVzID0gZW5xdWV1ZSh1cGRhdGVzLCB0aGlzLl9tb3VudENoaWxkQXRJbmRleChuZXh0Q2hpbGQsIGxhc3RQbGFjZWROb2RlLCBuZXh0SW5kZXgsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dEluZGV4Kys7XG4gICAgICAgIGxhc3RQbGFjZWROb2RlID0gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUobmV4dENoaWxkKTtcbiAgICAgIH1cbiAgICAgIC8vIFJlbW92ZSBjaGlsZHJlbiB0aGF0IGFyZSBubyBsb25nZXIgcHJlc2VudC5cbiAgICAgIGZvciAobmFtZSBpbiByZW1vdmVkTm9kZXMpIHtcbiAgICAgICAgaWYgKHJlbW92ZWROb2Rlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHVwZGF0ZXMgPSBlbnF1ZXVlKHVwZGF0ZXMsIHRoaXMuX3VubW91bnRDaGlsZChwcmV2Q2hpbGRyZW5bbmFtZV0sIHJlbW92ZWROb2Rlc1tuYW1lXSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodXBkYXRlcykge1xuICAgICAgICBwcm9jZXNzUXVldWUodGhpcywgdXBkYXRlcyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZW5kZXJlZENoaWxkcmVuID0gbmV4dENoaWxkcmVuO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm1vdW50cyBhbGwgcmVuZGVyZWQgY2hpbGRyZW4uIFRoaXMgc2hvdWxkIGJlIHVzZWQgdG8gY2xlYW4gdXAgY2hpbGRyZW5cbiAgICAgKiB3aGVuIHRoaXMgY29tcG9uZW50IGlzIHVubW91bnRlZC4gSXQgZG9lcyBub3QgYWN0dWFsbHkgcGVyZm9ybSBhbnlcbiAgICAgKiBiYWNrZW5kIG9wZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICB1bm1vdW50Q2hpbGRyZW46IGZ1bmN0aW9uIChzYWZlbHkpIHtcbiAgICAgIHZhciByZW5kZXJlZENoaWxkcmVuID0gdGhpcy5fcmVuZGVyZWRDaGlsZHJlbjtcbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihyZW5kZXJlZENoaWxkcmVuLCBzYWZlbHkpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGEgY2hpbGQgY29tcG9uZW50IHRvIHRoZSBzdXBwbGllZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byBtb3ZlLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4IG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsYXN0SW5kZXggTGFzdCBpbmRleCB2aXNpdGVkIG9mIHRoZSBzaWJsaW5ncyBvZiBgY2hpbGRgLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBtb3ZlQ2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4LCBsYXN0SW5kZXgpIHtcbiAgICAgIC8vIElmIHRoZSBpbmRleCBvZiBgY2hpbGRgIGlzIGxlc3MgdGhhbiBgbGFzdEluZGV4YCwgdGhlbiBpdCBuZWVkcyB0b1xuICAgICAgLy8gYmUgbW92ZWQuIE90aGVyd2lzZSwgd2UgZG8gbm90IG5lZWQgdG8gbW92ZSBpdCBiZWNhdXNlIGEgY2hpbGQgd2lsbCBiZVxuICAgICAgLy8gaW5zZXJ0ZWQgb3IgbW92ZWQgYmVmb3JlIGBjaGlsZGAuXG4gICAgICBpZiAoY2hpbGQuX21vdW50SW5kZXggPCBsYXN0SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VNb3ZlKGNoaWxkLCBhZnRlck5vZGUsIHRvSW5kZXgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgY2hpbGQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIGNyZWF0ZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbW91bnRJbWFnZSBNYXJrdXAgdG8gaW5zZXJ0LlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjcmVhdGVDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBhZnRlck5vZGUsIG1vdW50SW1hZ2UpIHtcbiAgICAgIHJldHVybiBtYWtlSW5zZXJ0TWFya3VwKG1vdW50SW1hZ2UsIGFmdGVyTm9kZSwgY2hpbGQuX21vdW50SW5kZXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgY2hpbGQgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ2hpbGQgdG8gcmVtb3ZlLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICByZW1vdmVDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBub2RlKSB7XG4gICAgICByZXR1cm4gbWFrZVJlbW92ZShjaGlsZCwgbm9kZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1vdW50cyBhIGNoaWxkIHdpdGggdGhlIHN1cHBsaWVkIG5hbWUuXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGlzIGlzIHBhcnQgb2YgYHVwZGF0ZUNoaWxkcmVuYCBhbmQgaXMgaGVyZSBmb3IgcmVhZGFiaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gbW91bnQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTmFtZSBvZiB0aGUgY2hpbGQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgY2hpbGQuXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX21vdW50Q2hpbGRBdEluZGV4OiBmdW5jdGlvbiAoY2hpbGQsIGFmdGVyTm9kZSwgaW5kZXgsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbW91bnRJbWFnZSA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudChjaGlsZCwgdHJhbnNhY3Rpb24sIHRoaXMsIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8sIGNvbnRleHQpO1xuICAgICAgY2hpbGQuX21vdW50SW5kZXggPSBpbmRleDtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUNoaWxkKGNoaWxkLCBhZnRlck5vZGUsIG1vdW50SW1hZ2UpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm1vdW50cyBhIHJlbmRlcmVkIGNoaWxkLlxuICAgICAqXG4gICAgICogTk9URTogVGhpcyBpcyBwYXJ0IG9mIGB1cGRhdGVDaGlsZHJlbmAgYW5kIGlzIGhlcmUgZm9yIHJlYWRhYmlsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIHVubW91bnQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdW5tb3VudENoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIG5vZGUpIHtcbiAgICAgIHZhciB1cGRhdGUgPSB0aGlzLnJlbW92ZUNoaWxkKGNoaWxkLCBub2RlKTtcbiAgICAgIGNoaWxkLl9tb3VudEluZGV4ID0gbnVsbDtcbiAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgfVxuXG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE11bHRpQ2hpbGQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZC5qc1xuICoqIG1vZHVsZSBpZCA9IDU5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKCdmYmpzL2xpYi9rZXlNaXJyb3InKTtcblxuLyoqXG4gKiBXaGVuIGEgY29tcG9uZW50J3MgY2hpbGRyZW4gYXJlIHVwZGF0ZWQsIGEgc2VyaWVzIG9mIHVwZGF0ZSBjb25maWd1cmF0aW9uXG4gKiBvYmplY3RzIGFyZSBjcmVhdGVkIGluIG9yZGVyIHRvIGJhdGNoIGFuZCBzZXJpYWxpemUgdGhlIHJlcXVpcmVkIGNoYW5nZXMuXG4gKlxuICogRW51bWVyYXRlcyBhbGwgdGhlIHBvc3NpYmxlIHR5cGVzIG9mIHVwZGF0ZSBjb25maWd1cmF0aW9ucy5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzID0ga2V5TWlycm9yKHtcbiAgSU5TRVJUX01BUktVUDogbnVsbCxcbiAgTU9WRV9FWElTVElORzogbnVsbCxcbiAgUkVNT1ZFX05PREU6IG51bGwsXG4gIFNFVF9NQVJLVVA6IG51bGwsXG4gIFRFWFRfQ09OVEVOVDogbnVsbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENoaWxkUmVjb25jaWxlclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG5cbnZhciBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL3Nob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlQ2hpbGQoY2hpbGRJbnN0YW5jZXMsIGNoaWxkLCBuYW1lKSB7XG4gIC8vIFdlIGZvdW5kIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICB2YXIga2V5VW5pcXVlID0gY2hpbGRJbnN0YW5jZXNbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhrZXlVbmlxdWUsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4nLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuICBpZiAoY2hpbGQgIT0gbnVsbCAmJiBrZXlVbmlxdWUpIHtcbiAgICBjaGlsZEluc3RhbmNlc1tuYW1lXSA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQoY2hpbGQpO1xuICB9XG59XG5cbi8qKlxuICogUmVhY3RDaGlsZFJlY29uY2lsZXIgcHJvdmlkZXMgaGVscGVycyBmb3IgaW5pdGlhbGl6aW5nIG9yIHVwZGF0aW5nIGEgc2V0IG9mXG4gKiBjaGlsZHJlbi4gSXRzIG91dHB1dCBpcyBzdWl0YWJsZSBmb3IgcGFzc2luZyBpdCBvbnRvIFJlYWN0TXVsdGlDaGlsZCB3aGljaFxuICogZG9lcyBkaWZmZWQgcmVvcmRlcmluZyBhbmQgaW5zZXJ0aW9uLlxuICovXG52YXIgUmVhY3RDaGlsZFJlY29uY2lsZXIgPSB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBcIm1vdW50IGltYWdlXCIgZm9yIGVhY2ggb2YgdGhlIHN1cHBsaWVkIGNoaWxkcmVuLiBJbiB0aGUgY2FzZVxuICAgKiBvZiBgUmVhY3RET01Db21wb25lbnRgLCBhIG1vdW50IGltYWdlIGlzIGEgc3RyaW5nIG9mIG1hcmt1cC5cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXN0ZWRDaGlsZE5vZGVzIE5lc3RlZCBjaGlsZCBtYXBzLlxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fSBBIHNldCBvZiBjaGlsZCBpbnN0YW5jZXMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaW5zdGFudGlhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKG5lc3RlZENoaWxkTm9kZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBjaGlsZEluc3RhbmNlcyA9IHt9O1xuICAgIHRyYXZlcnNlQWxsQ2hpbGRyZW4obmVzdGVkQ2hpbGROb2RlcywgaW5zdGFudGlhdGVDaGlsZCwgY2hpbGRJbnN0YW5jZXMpO1xuICAgIHJldHVybiBjaGlsZEluc3RhbmNlcztcbiAgfSxcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcmVuZGVyZWQgY2hpbGRyZW4gYW5kIHJldHVybnMgYSBuZXcgc2V0IG9mIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDaGlsZHJlbiBQcmV2aW91c2x5IGluaXRpYWxpemVkIHNldCBvZiBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q2hpbGRyZW4gRmxhdCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICogQHJldHVybiB7P29iamVjdH0gQSBuZXcgc2V0IG9mIGNoaWxkIGluc3RhbmNlcy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB1cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgLy8gV2UgY3VycmVudGx5IGRvbid0IGhhdmUgYSB3YXkgdG8gdHJhY2sgbW92ZXMgaGVyZSBidXQgaWYgd2UgdXNlIGl0ZXJhdG9yc1xuICAgIC8vIGluc3RlYWQgb2YgZm9yLi5pbiB3ZSBjYW4gemlwIHRoZSBpdGVyYXRvcnMgYW5kIGNoZWNrIGlmIGFuIGl0ZW0gaGFzXG4gICAgLy8gbW92ZWQuXG4gICAgLy8gVE9ETzogSWYgbm90aGluZyBoYXMgY2hhbmdlZCwgcmV0dXJuIHRoZSBwcmV2Q2hpbGRyZW4gb2JqZWN0IHNvIHRoYXQgd2VcbiAgICAvLyBjYW4gcXVpY2tseSBiYWlsb3V0IGlmIG5vdGhpbmcgaGFzIGNoYW5nZWQuXG4gICAgaWYgKCFuZXh0Q2hpbGRyZW4gJiYgIXByZXZDaGlsZHJlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmFtZTtcbiAgICB2YXIgcHJldkNoaWxkO1xuICAgIGZvciAobmFtZSBpbiBuZXh0Q2hpbGRyZW4pIHtcbiAgICAgIGlmICghbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcHJldkNoaWxkID0gcHJldkNoaWxkcmVuICYmIHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgIHZhciBwcmV2RWxlbWVudCA9IHByZXZDaGlsZCAmJiBwcmV2Q2hpbGQuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgdmFyIG5leHRFbGVtZW50ID0gbmV4dENoaWxkcmVuW25hbWVdO1xuICAgICAgaWYgKHByZXZDaGlsZCAhPSBudWxsICYmIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkpIHtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnJlY2VpdmVDb21wb25lbnQocHJldkNoaWxkLCBuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICBuZXh0Q2hpbGRyZW5bbmFtZV0gPSBwcmV2Q2hpbGQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJldkNoaWxkKSB7XG4gICAgICAgICAgcmVtb3ZlZE5vZGVzW25hbWVdID0gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUocHJldkNoaWxkKTtcbiAgICAgICAgICBSZWFjdFJlY29uY2lsZXIudW5tb3VudENvbXBvbmVudChwcmV2Q2hpbGQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgY2hpbGQgbXVzdCBiZSBpbnN0YW50aWF0ZWQgYmVmb3JlIGl0J3MgbW91bnRlZC5cbiAgICAgICAgdmFyIG5leHRDaGlsZEluc3RhbmNlID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChuZXh0RWxlbWVudCk7XG4gICAgICAgIG5leHRDaGlsZHJlbltuYW1lXSA9IG5leHRDaGlsZEluc3RhbmNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBVbm1vdW50IGNoaWxkcmVuIHRoYXQgYXJlIG5vIGxvbmdlciBwcmVzZW50LlxuICAgIGZvciAobmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkgJiYgIShuZXh0Q2hpbGRyZW4gJiYgbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSkge1xuICAgICAgICBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW5bbmFtZV07XG4gICAgICAgIHJlbW92ZWROb2Rlc1tuYW1lXSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKHByZXZDaGlsZCk7XG4gICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHByZXZDaGlsZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVW5tb3VudHMgYWxsIHJlbmRlcmVkIGNoaWxkcmVuLiBUaGlzIHNob3VsZCBiZSB1c2VkIHRvIGNsZWFuIHVwIGNoaWxkcmVuXG4gICAqIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IHJlbmRlcmVkQ2hpbGRyZW4gUHJldmlvdXNseSBpbml0aWFsaXplZCBzZXQgb2YgY2hpbGRyZW4uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdW5tb3VudENoaWxkcmVuOiBmdW5jdGlvbiAocmVuZGVyZWRDaGlsZHJlbiwgc2FmZWx5KSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiByZW5kZXJlZENoaWxkcmVuKSB7XG4gICAgICBpZiAocmVuZGVyZWRDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB2YXIgcmVuZGVyZWRDaGlsZCA9IHJlbmRlcmVkQ2hpbGRyZW5bbmFtZV07XG4gICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHJlbmRlcmVkQ2hpbGQsIHNhZmVseSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZFJlY29uY2lsZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRSZWNvbmNpbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNlxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBmbGF0dGVuQ2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB0cmF2ZXJzZUFsbENoaWxkcmVuID0gcmVxdWlyZSgnLi90cmF2ZXJzZUFsbENoaWxkcmVuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBwYXNzZWQgdGhyb3VnaCB0cmF2ZXJzYWwuXG4gKiBAcGFyYW0gez9SZWFjdENvbXBvbmVudH0gY2hpbGQgUmVhY3QgY2hpbGQgY29tcG9uZW50LlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lIFN0cmluZyBuYW1lIG9mIGtleSBwYXRoIHRvIGNoaWxkLlxuICovXG5mdW5jdGlvbiBmbGF0dGVuU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIC8vIFdlIGZvdW5kIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICB2YXIgcmVzdWx0ID0gdHJhdmVyc2VDb250ZXh0O1xuICB2YXIga2V5VW5pcXVlID0gcmVzdWx0W25hbWVdID09PSB1bmRlZmluZWQ7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoa2V5VW5pcXVlLCAnZmxhdHRlbkNoaWxkcmVuKC4uLik6IEVuY291bnRlcmVkIHR3byBjaGlsZHJlbiB3aXRoIHRoZSBzYW1lIGtleSwgJyArICdgJXNgLiBDaGlsZCBrZXlzIG11c3QgYmUgdW5pcXVlOyB3aGVuIHR3byBjaGlsZHJlbiBzaGFyZSBhIGtleSwgb25seSAnICsgJ3RoZSBmaXJzdCBjaGlsZCB3aWxsIGJlIHVzZWQuJywgbmFtZSkgOiB2b2lkIDA7XG4gIH1cbiAgaWYgKGtleVVuaXF1ZSAmJiBjaGlsZCAhPSBudWxsKSB7XG4gICAgcmVzdWx0W25hbWVdID0gY2hpbGQ7XG4gIH1cbn1cblxuLyoqXG4gKiBGbGF0dGVucyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuIEFueSBudWxsXG4gKiBjaGlsZHJlbiB3aWxsIG5vdCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0aW5nIG9iamVjdC5cbiAqIEByZXR1cm4geyFvYmplY3R9IGZsYXR0ZW5lZCBjaGlsZHJlbiBrZXllZCBieSBuYW1lLlxuICovXG5mdW5jdGlvbiBmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmbGF0dGVuU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuQ2hpbGRyZW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2ZsYXR0ZW5DaGlsZHJlbi5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICtcbiAgICAgICAgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJ1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW52YXJpYW50L2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG5cbnZhciBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVOb2RlID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVQYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBudWxsO1xuICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcbn07XG5cblJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQnO1xuXG5SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuTWl4aW4gPSB7XG4gICAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUNvbnRhaW5lckluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG5hdGl2ZUNvbnRhaW5lckluZm87XG5cbiAgICAgICAgdGhpcy5fbmF0aXZlTm9kZSA9IHtlbXB0eTogdHJ1ZX07XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICB9LFxuXG4gICAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICB9LFxuXG4gICAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB9LFxuXG4gICAgZ2V0UHVibGljSW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgIH1cbn07XG5cblxuYXNzaWduKFxuICAgIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5wcm90b3R5cGUsXG4gICAgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50Lk1peGluXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIFxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCA9IHtcbiAgICBwcm9jZXNzQ2hpbGRyZW5VcGRhdGVzOiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgIH0sXG4gICAgcmVwbGFjZU5vZGVXaXRoTWFya3VwOiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgIH1cbn07XG5cblJlYWN0UGVyZi5tZWFzdXJlTWV0aG9kcyhcbiAgICBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQsXG4gICAgJ1JlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCcsXG4gICAge1xuICAgICAgICByZXBsYWNlTm9kZVdpdGhNYXJrdXA6ICdyZXBsYWNlTm9kZVdpdGhNYXJrdXAnLFxuICAgIH1cbik7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDY1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcclxuXHJcblxyXG52YXIgbm9kZU1hbmFnZXIgPSByZXF1aXJlKCcuL2ltcGwvbm9kZS1tYW5hZ2VyLmpzJyk7XHJcbnZhciBpbml0ID0gcmVxdWlyZSgnLi9pbXBsL2luaXQnKTtcclxudmFyIE5vZGVzID0gcmVxdWlyZSgnLi9pbXBsL25vZGVzJyk7XHJcblxyXG52YXIgbm9kZXMgPSBuZXcgTm9kZXMoKTtcclxudmFyIHJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICBtb3VudDogZnVuY3Rpb24gKGlkLCB0YWcsIHByb3BzLCBwYXJlbnQpIHtcclxuICAgICAgICAgICAgaW52YXJpYW50KCEodGFnID09PSAnZ2FtZScgJiYgbm9kZXMuZ2FtZU5vZGUpLCAnT25seSBvbmUgZ2FtZSBub2RlIGNhbiBiZSBtb3VudGVkLicpO1xyXG4gICAgICAgICAgICBpbnZhcmlhbnQoISh0YWcgIT09ICdnYW1lJyAmJiAhcGFyZW50KSwgJ09ubHkgXFwnZ2FtZVxcJyBjYW4gYmUgcm9vdCBub2RlLicpO1xyXG4gICAgICAgICAgICBpbnZhcmlhbnQoIShwcm9wcy5uYW1lICYmIG5vZGVzLmJ5TmFtZShwcm9wcy5uYW1lKSksICdDYW5ub3QgcmVwZWF0IG5hbWVzLicpO1xyXG5cclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICB0YWc6IHRhZyxcclxuICAgICAgICAgICAgICAgIHByb3BzOiBwcm9wcyxcclxuICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50ICYmIHBhcmVudC5pZCxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vZGVzLnJlZ2lzdGVyKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhZyA9PT0gJ2dhbWUnKSB7XHJcbiAgICAgICAgICAgICAgICBub2Rlcy5zZXRHYW1lTm9kZShub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5tb3VudChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2hpbGRyZW5Nb3VudDogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVNYW5hZ2VyLmNoaWxkcmVuTW91bnQobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bm1vdW50OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBub2Rlcy5ieUlkKG5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UocGFyZW50LmNoaWxkcmVuLmluZGV4T2Yobm9kZS5pZCksIDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBub2Rlcy51bnJlZ2lzdGVyKG5vZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUudGFnID09PSAnZ2FtZScpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnNldEdhbWVOb2RlKG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIudW5tb3VudChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG5vZGUsIG5leHRQcm9wcywgbGFzdFByb3BzKSB7XHJcbiAgICAgICAgICAgIG5vZGUucHJvcHMgPSBuZXh0UHJvcHM7XHJcbiAgICAgICAgICAgIG5vZGVzLnVwZGF0ZShub2RlLCBsYXN0UHJvcHMpO1xyXG4gICAgICAgICAgICBub2RlTWFuYWdlci51cGRhdGUobm9kZXMsIG5vZGUsIGxhc3RQcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRyYW5zYWN0aW9uOiB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGVzLmdhbWVOb2RlICYmICFydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluaXQobm9kZXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJ1bm5pbmcgJiYgIW5vZGVzLmdhbWVOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVzdHJveScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNhY3Rpb25MaXN0ZW5lcnMgPSBub2Rlcy5wb3BUcmFuc2FjdGlvbkxpc3RlbmVycygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFuc2FjdGlvbkxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzLmJ5SWQodHJhbnNhY3Rpb25MaXN0ZW5lcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIubm90aWZ5VHJhbnNhY3Rpb24obm9kZXMsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9OYXRpdmVJbXBsZW1lbnRhdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RydWN0JztcclxuXHJcbnZhciBub2RlVHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyksXHJcblxyXG4gICAgbW91bnQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddO1xyXG4gICAgICAgIGlmIChub2RlVHlwZSkge1xyXG4gICAgICAgICAgICBub2RlVHlwZS5tb3VudChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlLm9iaikge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmoucm5vZGVpZCA9IG5vZGUuaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgcHJldlByb3BzKSB7XHJcbiAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcclxuICAgICAgICBpZiAobm9kZVR5cGUgJiYgbm9kZVR5cGUudXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkUHJvcHMgPSBPYmplY3Qua2V5cyhub2RlLnByb3BzKTtcclxuICAgICAgICAgICAgY2hhbmdlZFByb3BzID0gY2hhbmdlZFByb3BzLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICE9PSAnY2hpbGRyZW4nICYmIG5vZGUucHJvcHNba2V5XSAhPT0gcHJldlByb3BzW2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMocHJldlByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYgIShrZXkgaW4gbm9kZS5wcm9wcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUHJvcHMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkUHJvcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVR5cGUudXBkYXRlKG5vZGVzLCBub2RlLCBjaGFuZ2VkUHJvcHMsIHByZXZQcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVubW91bnQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddO1xyXG4gICAgICAgIGlmIChub2RlVHlwZSkge1xyXG4gICAgICAgICAgICBub2RlVHlwZS51bm1vdW50KG5vZGVzLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNoaWxkcmVuTW91bnQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddO1xyXG4gICAgICAgIGlmIChub2RlVHlwZSAmJiBub2RlVHlwZS5jaGlsZHJlbk1vdW50KSB7XHJcbiAgICAgICAgICAgIG5vZGVUeXBlLmNoaWxkcmVuTW91bnQobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbm90aWZ5VHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddO1xyXG4gICAgICAgIGlmIChub2RlVHlwZSAmJiBub2RlVHlwZS5ub3RpZnlUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICBub2RlVHlwZS5ub3RpZnlUcmFuc2FjdGlvbihub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0Q2hpbGRyZW4gPSBmdW5jdGlvbiAobm9kZXMsIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRJZCkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBub2Rlcy5pZHNbY2hpbGRJZF07XHJcbiAgICAgICAgICAgIG1vdW50KG5vZGVzLCBjaGlsZCk7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbml0Q2hpbGRyZW4obm9kZXMsIGNoaWxkLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuTW91bnQobm9kZXMsIGNoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50LFxyXG4gICAgY2hpbGRyZW5Nb3VudDogY2hpbGRyZW5Nb3VudCxcclxuICAgIHVubW91bnQ6IHVubW91bnQsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZSxcclxuICAgIG5vdGlmeVRyYW5zYWN0aW9uOiBub3RpZnlUcmFuc2FjdGlvbixcclxuICAgIGluaXRDaGlsZHJlbjogaW5pdENoaWxkcmVuXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvbm9kZS1tYW5hZ2VyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7XHJcbiAgICAgICAgZ2FtZTogcmVxdWlyZSgnLi9nYW1lJyksXHJcbiAgICAgICAgc3ByaXRlOiByZXF1aXJlKCcuL3Nwcml0ZScpLFxyXG4gICAgICAgIGdyb3VwOiByZXF1aXJlKCcuL2dyb3VwJyksXHJcbiAgICAgICAgYW5pbWF0aW9uOiByZXF1aXJlKCcuL2FuaW1hdGlvbicpLFxyXG4gICAgICAgIGNvbGxpZGVzOiByZXF1aXJlKCcuL2NvbGxpZGVzJyksXHJcbiAgICAgICAgb3ZlcmxhcHM6IHJlcXVpcmUoJy4vb3ZlcmxhcHMnKSxcclxuICAgICAgICB0ZXh0OiByZXF1aXJlKCcuL3RleHQnKSxcclxuICAgICAgICBidXR0b246IHJlcXVpcmUoJy4vYnV0dG9uJylcclxuICAgIH0sXHJcbiAgICByZXF1aXJlKCcuL2dyYXBoaWNzJyksXHJcbiAgICByZXF1aXJlKCcuL2lucHV0JylcclxuKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4dGVuZC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDZcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgbW91bnRHYW1lID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICBub2RlLl91cGRhdGVNZXRob2RzID0gW107XHJcbiAgICBub2RlLmFkZFVwZGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kcy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH07XHJcbiAgICBub2RlLnJlbW92ZVVwZGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gbm9kZS5fdXBkYXRlTWV0aG9kcy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBub2RlLl91cGRhdGVNZXRob2RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIG5vZGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gbm9kZXMuY29udGV4dCgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuX3VwZGF0ZU1ldGhvZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kc1tpXShjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChub2RlLnByb3BzLmhhc093blByb3BlcnR5KCdwaHlzaWNzJykpIHtcclxuICAgICAgICBub2RlLm9iai5waHlzaWNzLnN0YXJ0U3lzdGVtKG5vZGUucHJvcHMucGh5c2ljcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudEdhbWUsXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ2FtZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcclxuICAgIHNwcml0ZVByb3BlcnRlcyA9IHJlcXVpcmUoJy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuU3ByaXRlJyksXHJcblxyXG4gICAgdXBkYXRlU3ByaXRlID0gdXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoc3ByaXRlUHJvcGVydGVzKSxcclxuICAgIFxyXG4gICAgbW91bnRTcHJpdGUgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzO1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5TcHJpdGUobm9kZXMuZ2FtZSgpLCBwcm9wcy54LCBwcm9wcy55LCBwcm9wcy5hc3NldEtleSk7XHJcbiAgICAgICAgdXRpbHMuYWRkTm9kZURpc3BsYXlPYmplY3Qobm9kZXMsIG5vZGUpO1xyXG4gICAgICAgIHVwZGF0ZVNwcml0ZShub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVubW91bnRTcHJpdGUgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iai5raWxsKCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRTcHJpdGUsXHJcbiAgICB1bm1vdW50OiB1bm1vdW50U3ByaXRlLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVTcHJpdGVcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9zcHJpdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyksXHJcblxyXG4gICAgYWRkTm9kZURpc3BsYXlPYmplY3QgPSBmdW5jdGlvbiAobm9kZXMsIHdyYXBwZXIsIG9iaikge1xyXG4gICAgICAgIHZhciBwYXJlbnQgPSBub2Rlcy5ieUlkKHdyYXBwZXIucGFyZW50KSxcclxuICAgICAgICAgICAgZ3JvdXAgPSBwYXJlbnQudGFnID09PSAnZ2FtZScgPyBwYXJlbnQub2JqLndvcmxkIDogcGFyZW50Lm9iajtcclxuXHJcbiAgICAgICAgZ3JvdXAuYWRkKG9iaiB8fCB3cmFwcGVyLm9iaik7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBnZW5Qcm9wZXJ0eU1hcFVwZGF0ZSA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGNoYW5nZVByb3BzID0gT2JqZWN0LmtleXMobm9kZS5wcm9wcyksIHByZXZQcm9wcyA9IG51bGwpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFuZ2VQcm9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBjaGFuZ2VQcm9wc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eVVwZGF0ZSA9IHByb3BzW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5VXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlVcGRhdGUobm9kZXMsIG5vZGUsIG5vZGUucHJvcHNbcHJvcF0sICFwcmV2UHJvcHMsIHByZXZQcm9wcyAmJiBwcmV2UHJvcHNbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgYWRkTm9kZURpc3BsYXlPYmplY3Q6IGFkZE5vZGVEaXNwbGF5T2JqZWN0LFxyXG4gICAgZ2VuUHJvcGVydHlNYXBVcGRhdGU6IGdlblByb3BlcnR5TWFwVXBkYXRlXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvdXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5TcHJpdGUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Db3JlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5nbGUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BbmltYXRpb24nKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJyaW5nVG9Ub3AnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Dcm9wJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVsdGEnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkluQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuTG9hZFRleHR1cmUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHknKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5SZXNldCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNjYWxlTWluTWF4JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuU21vb3RoZWQnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlNwcml0ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lcicpXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuU3ByaXRlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0JylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuZ2VuZXJhdGVQb2ludFByb3BNYXAoWydzY2FsZSddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpLFxyXG5cclxuICAgIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwID0gZnVuY3Rpb24gKHByZWZpeCwgcHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeCArIHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBnZW5lcmF0ZVBvaW50UHJvcE1hcCA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICBhY2NbcHJvcF0gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlLCBpc05ldywgcHJldlZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBub2RlLm9ialtwcm9wXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc05ldyB8fCB2YWx1ZS54ICE9PSBwcmV2VmFsdWUueCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnggPSB2YWx1ZS54O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnkgIT09IHByZXZWYWx1ZS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueSA9IHZhbHVlLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFjY1twcm9wICsgJ1gnXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdLnggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3Byb3AgKyAnWSddID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJvcF0ueSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcCA9IGZ1bmN0aW9uIChwcmVmaXgsIHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmVmaXhlZFByb3AgPSBwcmVmaXggKyBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKTtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeGVkUHJvcF0gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlLCBpc05ldywgcHJldlZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnQgPSBub2RlLm9ialtwcmVmaXhdW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnggIT09IHByZXZWYWx1ZS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueCA9IHZhbHVlLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueSAhPT0gcHJldlZhbHVlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC55ID0gdmFsdWUueTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeGVkUHJvcCArICdYJ10gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcmVmaXhdW3Byb3BdLnggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeGVkUHJvcCArICdZJ10gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcmVmaXhdW3Byb3BdLnkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlQWxpYXNQcm9wTWFwID0gZnVuY3Rpb24gKGFsaWFzZXMpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWxpYXNlcykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGFsaWFzKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gYWxpYXNlc1thbGlhc107XHJcbiAgICAgICAgICAgIGFjY1thbGlhc10gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcbiAgICBnZW5lcmF0ZU1vdW50T25seVByb3BNYXAgPSBmdW5jdGlvbiAocHJvcE1hcCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wTWFwKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICB2YXIgaW1wbCA9IHByb3BNYXBbcHJvcF07XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUsIGlzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbXBsKG5vZGVzLCBub2RlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuICAgIGdlbmVyYXRlRml4ZWRQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUsIGlzTmV3KSB7XHJcbiAgICAgICAgICAgICAgICBpbnZhcmlhbnQoaXNOZXcsIFwiUHJvcGVydHkgJyVzJyBvZiAnJXMnIGNhbm5vdCBjaGFuZ2UuXCIsIHByb3AsIG5vZGUudGFnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBnZW5lcmF0ZUJhc2ljUHJvcE1hcDogZ2VuZXJhdGVCYXNpY1Byb3BNYXAsXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwOiBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVQb2ludFByb3BNYXA6IGdlbmVyYXRlUG9pbnRQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcDogZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcCxcclxuICAgIGdlbmVyYXRlQWxpYXNQcm9wTWFwOiBnZW5lcmF0ZUFsaWFzUHJvcE1hcCxcclxuICAgIGdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcDogZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVGaXhlZFByb3BNYXA6IGdlbmVyYXRlRml4ZWRQcm9wTWFwXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy91dGlscy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmdlbmVyYXRlQWxpYXNQcm9wTWFwKHtcclxuICAgIGFzc2V0S2V5OiAna2V5J1xyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Db3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2FuZ2xlJ10pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmltYXRpb24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnYXV0b2N1bGwnXSk7XHJcbi8qKlxyXG4gKiA8cmVhZG9ubHk+aW5DYW1lcmFcclxuICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQnJpbmdUb1RvcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Dcm9wLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZWx0YS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVzdHJveS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSGVhbHRoLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2NoZWNrV29ybGRCb3VuZHMnLCAnb3V0T2ZCb3VuZHNLaWxsJ10pO1xyXG4vKipcclxuICogPHJlYWRvbmx5PmluV29ybGRcclxuICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnYWxpdmUnLCAnbGlmZXNwYW4nXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuTGlmZVNwYW4uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2ZyYW1lJywgJ2ZyYW1lTmFtZSddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuT3ZlcmxhcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICB1dGlscy5nZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ3gnLCAneSddKSxcclxuICAgIHJlcXVpcmUoJy4uL2N1c3RvbS9ib2R5JylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5QaHlzaWNzQm9keS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICB1dGlscy5nZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwKCdib2R5JywgWydpbW1vdmFibGUnLCAnY29sbGlkZVdvcmxkQm91bmRzJ10pLFxyXG4gICAgdXRpbHMuZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcCgnYm9keScsIFsnYm91bmNlJywgJ2dyYXZpdHknXSksXHJcbiAgICB1dGlscy5nZW5lcmF0ZU1vdW50T25seVByb3BNYXAoe1xyXG4gICAgICAgIGJvZHlQaHlzaWNzOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBwaHlzaWNzID0gbm9kZXMuZ2FtZSgpLnBoeXNpY3MsXHJcbiAgICAgICAgICAgICAgICBzeXN0ZW0gPSB2YWx1ZSAhPT0gdHJ1ZSA/IHZhbHVlIDogcGh5c2ljcy5zeXN0ZW07XHJcblxyXG4gICAgICAgICAgICBub2Rlcy5nYW1lKCkucGh5c2ljcy5lbmFibGUobm9kZS5vYmosIHN5c3RlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2N1c3RvbS9ib2R5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5SZXNldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ3Ntb290aGVkJ10pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TbW9vdGhlZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcclxuICAgIGdyb3VwUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cCcpLFxyXG5cclxuICAgIHVwZGF0ZUdyb3VwID0gdXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoZ3JvdXBQcm9wZXJ0ZXMpLFxyXG5cclxuICAgIG1vdW50R3JvdXAgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JvdXAobm9kZXMuZ2FtZSgpKTtcclxuICAgICAgICB1dGlscy5hZGROb2RlRGlzcGxheU9iamVjdChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgdXBkYXRlR3JvdXAobm9kZXMsIG5vZGUpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50R3JvdXAsXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcm91cFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyb3VwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lcicpLFxyXG4gICAgZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydlbmFibGVCb2R5J10pXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBtb3VudEFuaW1hdGlvbiA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gbm9kZXMuYnlJZChub2RlLnBhcmVudCk7XHJcbiAgICAgICAgbm9kZS5vYmogPSBwYXJlbnROb2RlLm9iai5hbmltYXRpb25zLmFkZChub2RlLnByb3BzLmlkLCBub2RlLnByb3BzLmZyYW1lcywgbm9kZS5wcm9wcy5mcHMsIG5vZGUucHJvcHMubG9vcCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRBbmltYXRpb24sXHJcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBudWxsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvYW5pbWF0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHN5c3RlbU5hbWUgPSByZXF1aXJlKCcuLi9waHlzaWMtc3lzdGVtLW5hbWUnKSxcclxuXHJcbiAgICBtb3VudENvbGxpZGVzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIGEgPSBub2Rlcy5ieUlkKG5vZGUucGFyZW50KSxcclxuICAgICAgICAgICAgYiA9IG5vZGVzLmJ5TmFtZShub2RlLnByb3BzLndpdGgpLFxyXG4gICAgICAgICAgICBuYW1lID0gc3lzdGVtTmFtZShub2RlLnByb3BzLnN5c3RlbSk7XHJcblxyXG4gICAgICAgIG5vZGUub2JqID0ge1xyXG4gICAgICAgICAgICBhOiBhLFxyXG4gICAgICAgICAgICBiOiBiLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2FtZS5waHlzaWNzW25hbWVdLmNvbGxpZGUoYS5vYmosIGIub2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG5vZGVzLmdhbWVOb2RlLmFkZFVwZGF0ZUxpc3RlbmVyKG5vZGUub2JqLm9uVXBkYXRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgdW5tb3VudENvbGxpZGVzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZXMuZ2FtZU5vZGUucmVtb3ZlVXBkYXRlTGlzdGVuZXIobm9kZS5vYmoub25VcGRhdGUpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50Q29sbGlkZXMsXHJcbiAgICB1bm1vdW50OiB1bm1vdW50Q29sbGlkZXMsXHJcbiAgICB1cGRhdGU6IG51bGxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9jb2xsaWRlcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBuYW1lcyA9IHt9O1xyXG5cclxubmFtZXNbUGhhc2VyLlBoeXNpY3MuQVJDQURFXSA9ICdhcmNhZGUnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5CT1gyRF0gPSAnYm94MmQnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5DSElQTVVOS10gPSAnY2hpcG11bmsnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5NQVRURVJKU10gPSAnbWF0dGVyJztcclxubmFtZXNbUGhhc2VyLlBoeXNpY3MuTklOSkFdID0gJ25pbmphJztcclxubmFtZXNbUGhhc2VyLlBoeXNpY3MuUDJKU10gPSAncDInO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3lzdGVtKSB7XHJcbiAgICByZXR1cm4gbmFtZXNbc3lzdGVtXSB8fCAnYXJjYWRlJztcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9waHlzaWMtc3lzdGVtLW5hbWUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgc3lzdGVtTmFtZSA9IHJlcXVpcmUoJy4uL3BoeXNpYy1zeXN0ZW0tbmFtZScpLFxyXG5cclxuICAgIG1vdW50T3ZlcmxhcHMgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgYSA9IG5vZGVzLmJ5SWQobm9kZS5wYXJlbnQpLFxyXG4gICAgICAgICAgICBiID0gbm9kZXMuYnlOYW1lKG5vZGUucHJvcHMud2l0aCksXHJcbiAgICAgICAgICAgIG5hbWUgPSBzeXN0ZW1OYW1lKG5vZGUucHJvcHMuc3lzdGVtKSxcclxuICAgICAgICAgICAgb25PdmVybGFwID0gbm9kZS5wcm9wcy5vbk92ZXJsYXA7XHJcblxyXG4gICAgICAgIG5vZGUub2JqID0ge1xyXG4gICAgICAgICAgICBhOiBhLFxyXG4gICAgICAgICAgICBiOiBiLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2FtZS5waHlzaWNzW25hbWVdLm92ZXJsYXAoYS5vYmosIGIub2JqLCBmdW5jdGlvbiAob3ZlcmxhcHBpbmdBLCBvdmVybGFwcGluZ0IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk92ZXJsYXAobm9kZXMuYnlJZChvdmVybGFwcGluZ0Eucm5vZGVpZCksIG5vZGVzLmJ5SWQob3ZlcmxhcHBpbmdCLnJub2RlaWQpLCBjb250ZXh0LCBhLCBiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbm9kZXMuZ2FtZU5vZGUuYWRkVXBkYXRlTGlzdGVuZXIobm9kZS5vYmoub25VcGRhdGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50T3ZlcmxhcHMgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2Rlcy5nYW1lTm9kZS5yZW1vdmVVcGRhdGVMaXN0ZW5lcihub2RlLm9iai5vblVwZGF0ZSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRPdmVybGFwcyxcclxuICAgIHVubW91bnQ6IHVubW91bnRPdmVybGFwcyxcclxuICAgIHVwZGF0ZTogbnVsbFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL292ZXJsYXBzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpLFxyXG4gICAgdGV4dFByb3BlcnRlcyA9IHJlcXVpcmUoJy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuVGV4dCcpLFxyXG5cclxuICAgIHVwZGF0ZVRleHQgPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZSh0ZXh0UHJvcGVydGVzKSxcclxuICAgIFxyXG4gICAgbW91bnRUZXh0ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcztcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuVGV4dChub2Rlcy5nYW1lKCksIHByb3BzLngsIHByb3BzLnksIHByb3BzLnRleHQsIHByb3BzLnN0eWxlKTtcclxuICAgICAgICB1dGlscy5hZGROb2RlRGlzcGxheU9iamVjdChub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVubW91bnRUZXh0ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50VGV4dCxcclxuICAgIHVubW91bnQ6IHVubW91bnRUZXh0LFxyXG4gICAgdXBkYXRlOiB1cGRhdGVUZXh0XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvdGV4dC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyksXHJcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuU3ByaXRlJyksXHJcbiAgICB1dGlscy5nZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ3RleHQnXSlcclxuKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpLFxyXG4gICAgYnV0dG9uUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5CdXR0b24nKSxcclxuXHJcbiAgICB1cGRhdGVCdXR0b24gPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShidXR0b25Qcm9wZXJ0ZXMpLFxyXG5cclxuICAgIG1vdW50QnV0dG9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcyxcclxuICAgICAgICAgICAga2V5ID0gcHJvcHMuYXNzZXRLZXk7XHJcblxyXG4gICAgICAgIG5vZGUuYnV0dG9uID0gbmV3IFBoYXNlci5CdXR0b24oXHJcbiAgICAgICAgICAgICAgICBub2Rlcy5nYW1lKCksXHJcbiAgICAgICAgICAgICAgICBwcm9wcy54LFxyXG4gICAgICAgICAgICAgICAgcHJvcHMueSxcclxuICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgIHByb3BzLm9uQ2xpY2ssXHJcbiAgICAgICAgICAgICAgICBub2RlLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzBdLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzFdLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzJdLFxyXG4gICAgICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzNdXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChub2RlLnByb3BzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5Hcm91cChub2Rlcy5nYW1lKCkpO1xyXG4gICAgICAgICAgICBub2RlLm9iai5hZGQobm9kZS5idXR0b24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gbm9kZS5idXR0b247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5hZGROb2RlRGlzcGxheU9iamVjdChub2Rlcywgbm9kZSk7XHJcbiAgICAgICAgdXBkYXRlQnV0dG9uKG5vZGVzLCBub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgdW5tb3VudEJ1dHRvbiA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudEJ1dHRvbixcclxuICAgIHVubW91bnQ6IHVubW91bnRCdXR0b24sXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUJ1dHRvblxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuSW1hZ2UnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLlNwcml0ZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNvcmUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BbmdsZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuaW1hdGlvbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQm91bmRzJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQnJpbmdUb1RvcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNyb3AnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZWx0YScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3knKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuTGlmZVNwYW4nKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5SZXNldCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkJylcclxuKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5JbWFnZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge1xyXG4gICAgICAgIGdyYXBoaWNzOiByZXF1aXJlKCcuL2dyYXBoaWNzJyksXHJcbiAgICAgICAgcmVuZGVydGV4dHVyZTogcmVxdWlyZSgnLi9yZW5kZXJ0ZXh0dXJlJyksXHJcbiAgICAgICAgcmVuZGVyaW1hZ2U6IHJlcXVpcmUoJy4vcmVuZGVyaW1hZ2UnKVxyXG4gICAgfSxcclxuICAgIHJlcXVpcmUoJy4vcmVuZGVyZXJzJylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyksXHJcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcclxuXHJcbiAgICB1cGRhdGVHcmFwaGljcyA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyYXBoaWNzUHJvcGVydGVzKSxcclxuXHJcbiAgICBpdGVtVHlwZXMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpLFxyXG5cclxuICAgIG1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzO1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5HcmFwaGljcyhub2Rlcy5nYW1lKCksIHByb3BzLngsIHByb3BzLnkpO1xyXG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcclxuICAgICAgICB1cGRhdGVHcmFwaGljcyhub2Rlcywgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVubW91bnRHcmFwaGljcyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hpbGRyZW5Nb3VudCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIG5vZGVzLmNhbmNlbFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uKG5vZGUuaWQpO1xyXG4gICAgICAgIGRyYXcobm9kZXMsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWRyYXcgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iai5jbGVhcigpO1xyXG4gICAgICAgIGRyYXcobm9kZXMsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGVzLmJ5SWQobm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZXNbY2hpbGQudGFnXSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGVzW2NoaWxkLnRhZ10uZHJhdyhub2RlcywgY2hpbGQsIG5vZGUub2JqLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudEdyYXBoaWNzLFxyXG4gICAgY2hpbGRyZW5Nb3VudDogY2hpbGRyZW5Nb3VudCxcclxuICAgIHVubW91bnQ6IHVubW91bnRHcmFwaGljcyxcclxuICAgIHVwZGF0ZTogdXBkYXRlR3JhcGhpY3MsXHJcbiAgICBub3RpZnlUcmFuc2FjdGlvbjogcmVkcmF3XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvZ3JhcGhpY3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkdyYXBoaWNzJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ29yZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Cb3VuZHMnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkluV29ybGQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUmVzZXQnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyYXBoaWNzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyJylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5HcmFwaGljcy5qc1xuICoqLyIsInZhciBjcmVhdGVHcmFwaGljc05vZGUgPSByZXF1aXJlKCcuL2NyZWF0ZS1ncmFwaGljcy1pdGVtJyksXHJcblxyXG4gICAgcmVuZGVyZXJzID0ge1xyXG4gICAgICAgIGNpcmNsZTogZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUoXHJcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkgfHwgMCksXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmRpYW1ldGVyIHx8IDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY3Q6IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueCB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMud2lkdGggfHwgMCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuaGVpZ2h0IHx8IDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmU6IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oXHJcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLngxIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55MSB8fCAwKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBncmFwaGljcy5saW5lVG8oXHJcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLngyIHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55MiB8fCAwKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZXRvOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55IHx8IDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjdXJ2ZXRvOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MucXVhZHJhdGljQ3VydmVUbyhcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuY3B4ICsgeDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmNweSArIHkwLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy54ICsgeDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLnkgKyB5MFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hhcGU6IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICB2YXIgc3gwID0geDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgc3kwID0geTAgKyAobm9kZS5wcm9wcy55IHx8IDApO1xyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gbm9kZS5wcm9wcy5zLnJlcGxhY2UoL1xccy9nLCAnJykubWF0Y2goLyhbYS16XVswLTksXSspL2cpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBwYXJ0LmNoYXJBdCgwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHBhcnQubWF0Y2goL1swLTldKy9nKS5tYXAoZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSh2WzBdICsgc3gwLCB2WzFdICsgc3kwLCB2WzJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdSZWN0KHZbMF0gKyBzeDAsIHZbMV0gKyBzeTAsIHZbMl0sIHZbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3EnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MucXVhZHJhdGljQ3VydmVUbyh2WzBdLCB2WzFdLCB2WzJdICsgc3gwLCB2WzNdICsgc3kwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGVzLmJ5SWQobm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZXJzW2NoaWxkLnRhZ10pIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnNbY2hpbGQudGFnXShub2RlcywgY2hpbGQsIGdyYXBoaWNzLCBzeDAsIHN5MCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyhyZW5kZXJlcnMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB0eXBlKSB7XHJcbiAgICBhY2NbdHlwZV0gPSBjcmVhdGVHcmFwaGljc05vZGUocmVuZGVyZXJzW3R5cGVdKTtcclxuICAgIHJldHVybiBhY2M7XHJcbn0sIHt9KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJlcnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gKGRyYXcpIHtcclxuXHJcbiAgICB2YXIgcmVxdWVzdE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgICAgICB2YXIgZ3JhcGhpY3MgPSBub2Rlcy5wYXJlbnQobm9kZSwgJ2dyYXBoaWNzJyk7XHJcbiAgICAgICAgICAgIGlmIChncmFwaGljcykge1xyXG4gICAgICAgICAgICAgICAgbm9kZXMucmVxdWVzdFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uKGdyYXBoaWNzLmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlcXVlc3ROb3RpZmljYXRpb25PblVwZGF0ZSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgY2hhbmdlUHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZVByb3BzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3ROb3RpZmljYXRpb24obm9kZXMsIG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIGRyYXdXcmFwcGVyID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWxsID0gdHlwZW9mIG5vZGUucHJvcHMuZmlsbCAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgICAgICAgICBsaW5lID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlIT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlV2lkdGggIT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlQWxwaGEgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxsQ29sb3IgPSB0eXBlb2Ygbm9kZS5wcm9wcy5maWxsICE9PSAndW5kZWZpbmVkJyA/IG5vZGUucHJvcHMuZmlsbCA6IDB4MDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxBbHBoYSA9IHR5cGVvZiBub2RlLnByb3BzLmZpbGxBbHBoYSA9PT0gJ251bWJlcicgPyBub2RlLnByb3BzLmZpbGxBbHBoYSA6IDE7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwoZmlsbENvbG9yLCBmaWxsQWxwaGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZUNvbG9yID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlICE9PSAndW5kZWZpbmVkJyA/IG5vZGUucHJvcHMuc3Ryb2tlIDogMHgwMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUFscGhhID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlQWxwaGEgPT09ICdudW1iZXInID8gbm9kZS5wcm9wcy5zdHJva2VBbHBoYSA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlV2lkdGggPT09ICdudW1iZXInID8gbm9kZS5wcm9wcy5zdHJva2VXaWR0aCA6IDE7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lU3R5bGUobGluZVdpZHRoLCBsaW5lQ29sb3IsIGxpbmVBbHBoYSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXcobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGwpIHtcclxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb3VudDogcmVxdWVzdE5vdGlmaWNhdGlvbixcclxuICAgICAgICB1bm1vdW50OiByZXF1ZXN0Tm90aWZpY2F0aW9uLFxyXG4gICAgICAgIHVwZGF0ZTogcmVxdWVzdE5vdGlmaWNhdGlvbk9uVXBkYXRlLFxyXG4gICAgICAgIGRyYXc6IGRyYXdXcmFwcGVyXHJcbiAgICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvY3JlYXRlLWdyYXBoaWNzLWl0ZW0uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpLFxyXG4gICAgZ3JhcGhpY3NQcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi8uLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyYXBoaWNzJyksXHJcblxyXG4gICAgdXBkYXRlR3JhcGhpY3MgPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShncmFwaGljc1Byb3BlcnRlcyksXHJcblxyXG4gICAgaXRlbVR5cGVzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKSxcclxuXHJcbiAgICBtb3VudEdyYXBoaWNzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyYXBoaWNzKG5vZGVzLmdhbWUoKSwgMCwgMCk7XHJcbiAgICAgICAgdXBkYXRlR3JhcGhpY3Mobm9kZXMsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgIH0sXHJcblxyXG4gICAgY2hpbGRyZW5Nb3VudCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIGRyYXcobm9kZXMsIG5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBQaGFzZXIuUmVuZGVyVGV4dHVyZShub2Rlcy5nYW1lKCksIG5vZGUub2JqLndpZHRoLCBub2RlLm9iai5oZWlnaHQpO1xyXG4gICAgICAgIHRleHR1cmUucmVuZGVyWFkobm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgIG5vZGUub2JqLmRlc3Ryb3koKTtcclxuICAgICAgICBub2RlLm9iaiA9IHRleHR1cmU7XHJcbiAgICAgICAgbm9kZXMuZ2FtZSgpLmNhY2hlLmFkZFJlbmRlclRleHR1cmUobm9kZS5wcm9wcy5hc3NldEtleSwgdGV4dHVyZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRyYXcgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuYnlJZChub2RlLmNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlc1tjaGlsZC50YWddKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZXNbY2hpbGQudGFnXS5kcmF3KG5vZGVzLCBjaGlsZCwgbm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgbW91bnQ6IG1vdW50R3JhcGhpY3MsXHJcbiAgICBjaGlsZHJlbk1vdW50OiBjaGlsZHJlbk1vdW50LFxyXG4gICAgdW5tb3VudDogdW5tb3VudEdyYXBoaWNzLFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHcmFwaGljc1xyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL3JlbmRlcnRleHR1cmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpLFxyXG4gICAgZ3JhcGhpY3NQcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi8uLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyYXBoaWNzJyksXHJcblxyXG4gICAgdXBkYXRlR3JhcGhpY3MgPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShncmFwaGljc1Byb3BlcnRlcyksXHJcblxyXG4gICAgaXRlbVR5cGVzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKSxcclxuXHJcbiAgICBtb3VudEdyYXBoaWNzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyYXBoaWNzKG5vZGVzLmdhbWUoKSwgMCwgMCk7XHJcbiAgICAgICAgdXBkYXRlR3JhcGhpY3Mobm9kZXMsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1bm1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcclxuICAgIH0sXHJcblxyXG4gICAgY2hpbGRyZW5Nb3VudCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIGRyYXcobm9kZXMsIG5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBQaGFzZXIuUmVuZGVyVGV4dHVyZShub2Rlcy5nYW1lKCksIG5vZGUub2JqLndpZHRoLCBub2RlLm9iai5oZWlnaHQpO1xyXG4gICAgICAgIHRleHR1cmUucmVuZGVyWFkobm9kZS5vYmosIDAsIDApO1xyXG4gICAgICAgIHZhciB1cmwgPSB0ZXh0dXJlLmdldEJhc2U2NCgpO1xyXG4gICAgICAgIHRleHR1cmUuZGVzdHJveSgpO1xyXG4gICAgICAgIG5vZGUub2JqLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgaWYgKG5vZGUucHJvcHMuZnJhbWVXaWR0aCB8fCBub2RlLnByb3BzLmZyYW1lSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHZhciB3ID0gbm9kZS5wcm9wcy5mcmFtZVdpZHRoIHx8IHRleHR1cmUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoID0gbm9kZS5wcm9wcy5mcmFtZUhlaWdodCB8fCB0ZXh0dXJlLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gbm9kZXMuZ2FtZSgpLmxvYWQuc3ByaXRlc2hlZXQobm9kZS5wcm9wcy5hc3NldEtleSwgdXJsLCB3LCBoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLm9iaiA9IG5vZGVzLmdhbWUoKS5sb2FkLmltYWdlKG5vZGUucHJvcHMuYXNzZXRLZXksIHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGVzLmJ5SWQobm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZXNbY2hpbGQudGFnXSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGVzW2NoaWxkLnRhZ10uZHJhdyhub2RlcywgY2hpbGQsIG5vZGUub2JqLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudEdyYXBoaWNzLFxyXG4gICAgY2hpbGRyZW5Nb3VudDogY2hpbGRyZW5Nb3VudCxcclxuICAgIHVubW91bnQ6IHVubW91bnRHcmFwaGljcyxcclxuICAgIHVwZGF0ZTogdXBkYXRlR3JhcGhpY3NcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJpbWFnZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5wdXQ6IHJlcXVpcmUoJy4vaW5wdXQnKSxcclxuICAgIGtleTogcmVxdWlyZSgnLi9rZXknKVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2lucHV0L2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKSxcclxuXHJcbiAgICBkZWZhdWx0UG9pbnRlck51bWJlciA9IDIsXHJcbiAgICBldmVudHMgPSBbXCJvbkRvd25cIiwgXCJvblVwXCIsIFwib25UYXBcIiwgXCJvbkhvbGRcIl0sXHJcblxyXG4gICAgbW91bnRJbnB1dCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gbm9kZXMuY29udGV4dCgpO1xyXG4gICAgICAgIGlmICghY29udGV4dC5pbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgZ2FtZSA9IG5vZGVzLmdhbWUoKSxcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJDb3VudCA9IG5vZGUucHJvcHMucG9pbnRlcnMgfHwgZGVmYXVsdFBvaW50ZXJOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZVBvaW50ZXI6IGdhbWUuaW5wdXQubW91c2VQb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBvaW50ZXI6IGdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyczogW11cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBub2RlLm9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGlucHV0OiBpbnB1dFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb250ZXh0LmlucHV0ID0gaW5wdXQ7XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludGVyQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gZGVmYXVsdFBvaW50ZXJOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLmlucHV0LmFkZFBvaW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlucHV0LnBvaW50ZXJzW2ldID0gZ2FtZS5pbnB1dFsncG9pbnRlcicgKyAoaSArIDEpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBub2RlLnByb3BzW2V2ZW50XTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuaW5wdXRbZXZlbnRdLmFkZChmdW5jdGlvbiAocG9pbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihwb2ludGVyLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5jdXJzb3JzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jdXJzb3JzID0gZ2FtZS5pbnB1dC5rZXlib2FyZC5jcmVhdGVDdXJzb3JLZXlzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChub2RlLnByb3BzLmtleXMpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmtleXMgPSBPYmplY3Qua2V5cyhub2RlLnByb3BzLmtleXMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGdhbWUuaW5wdXQua2V5Ym9hcmQuYWRkS2V5KG5vZGUucHJvcHMua2V5c1trZXldKTtcclxuICAgICAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMub25JbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZXMuZ2FtZU5vZGUuYWRkVXBkYXRlTGlzdGVuZXIobm9kZS5wcm9wcy5vbklucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG1vdW50OiBtb3VudElucHV0LFxyXG4gICAgdW5tb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZTogbnVsbFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2lucHV0L2lucHV0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKSxcclxuICAgIGtleVByb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvY3VzdG9tL2tleScpLFxyXG5cclxuICAgIHVwZGF0ZUtleSA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGtleVByb3BlcnRlcyksXHJcblxyXG4gICAgZXZlbnRzID0gW1wib25Eb3duXCIsIFwib25VcFwiLCBcIm9uVGFwXCIsIFwib25Ib2xkXCJdLFxyXG4gICAgXHJcbiAgICBtb3VudEtleSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gbm9kZXMuY29udGV4dCgpO1xyXG4gICAgICAgIGlmIChjb250ZXh0LmlucHV0ICYmIG5vZGUucHJvcHMua2V5TmFtZSAmJiBub2RlLnByb3BzLmtleUNvZGUpIHtcclxuICAgICAgICAgICAgdmFyIGdhbWUgPSBub2Rlcy5nYW1lKCksXHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGNvbnRleHQuaW5wdXQsXHJcbiAgICAgICAgICAgICAgICBrZXkgPSBnYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShub2RlLnByb3BzLmtleUNvZGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbnB1dC5rZXlzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5rZXlzID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5vZGUub2JqID0ga2V5O1xyXG4gICAgICAgICAgICBpbnB1dC5rZXlzW25vZGUucHJvcHMua2V5TmFtZV0gPSBub2RlLm9iajtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gbm9kZS5wcm9wc1tldmVudF07XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlbZXZlbnRdLmFkZChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKGtleSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdW5tb3VudEtleSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIGlmIChub2RlLm9iaikge1xyXG4gICAgICAgICAgICB2YXIgZ2FtZSA9IG5vZGVzLmdhbWUoKSxcclxuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBub2Rlcy5jb250ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBnYW1lLmlucHV0LmtleWJvYXJkLnJlbW92ZUtleShub2RlLm9iai5rZXlDb2RlKTtcclxuICAgICAgICAgICAgZGVsZXRlIGNvbnRleHQuaW5wdXRbbm9kZS5wcm9wcy5rZXlOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtb3VudDogbW91bnRLZXksXHJcbiAgICB1bm1vdW50OiB1bm1vdW50S2V5LFxyXG4gICAgdXBkYXRlOiB1cGRhdGVLZXlcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9rZXkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuZ2VuZXJhdGVGaXhlZFByb3BNYXAoWydrZXlOYW1lJywgJ2tleUNvZGUnXSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvY3VzdG9tL2tleS5qc1xuICoqLyIsInZhciBub2RlTWFuYWdlciA9IHJlcXVpcmUoJy4vbm9kZS1tYW5hZ2VyJyksXHJcbiAgICBsb2FkQXNzZXRzID0gcmVxdWlyZSgnLi9hc3NldHMnKSxcclxuXHJcbiAgICBwcmVsb2FkVGFncyA9IFsnYXNzZXRzJ10sXHJcblxyXG4gICAgaW5pdCA9IGZ1bmN0aW9uIChub2Rlcykge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGVzLmdhbWVOb2RlLnByb3BzO1xyXG5cclxuICAgICAgICB2YXIgZ2FtZUltcGwgPSB7XHJcbiAgICAgICAgICAgIHByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRBc3NldHMobm9kZU1hbmFnZXIsIG5vZGVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5tb3VudChub2Rlcywgbm9kZXMuZ2FtZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIuaW5pdENoaWxkcmVuKG5vZGVzLCBub2Rlcy5nYW1lTm9kZS5jaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKG5vZGVJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmVsb2FkVGFncy5pbmRleE9mKG5vZGVzLmJ5SWQobm9kZUlkKS50YWcpIDwgMDtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBub2Rlcy5nYW1lTm9kZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbm9kZXMuc2V0R2FtZShuZXcgUGhhc2VyLkdhbWUocHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCwgcHJvcHMubW9kZSB8fCBQaGFzZXIuQVVUTywgJycsIGdhbWVJbXBsKSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBpbml0O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL2luaXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgbG9hZEFzc2V0cyA9IGZ1bmN0aW9uIChub2RlTWFuYWdlciwgbm9kZXMpIHtcclxuICAgIHZhciBnYW1lTm9kZSA9IG5vZGVzLmdhbWVOb2RlLFxyXG4gICAgICAgIGFzc2V0cyA9IGdhbWVOb2RlLnByb3BzLmFzc2V0cztcclxuXHJcbiAgICBpZiAoYXNzZXRzKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoYXNzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2V0ID0gYXNzZXRzW2tleV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYXNzZXQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgIGdhbWVOb2RlLm9iai5sb2FkLmltYWdlKGtleSwgYXNzZXQuc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Nwcml0ZXNoZWV0JzpcclxuICAgICAgICAgICAgICAgICAgICBnYW1lTm9kZS5vYmoubG9hZC5zcHJpdGVzaGVldChrZXksIGFzc2V0LnNyYywgYXNzZXQud2lkdGgsIGFzc2V0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXNzZXRzSWRzID0gZ2FtZU5vZGUuY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChub2RlSWQpIHtcclxuICAgICAgICByZXR1cm4gbm9kZXMuYnlJZChub2RlSWQpLnRhZyA9PT0gJ2Fzc2V0cyc7XHJcbiAgICB9KTtcclxuXHJcbiAgICBub2RlTWFuYWdlci5pbml0Q2hpbGRyZW4obm9kZXMsIGFzc2V0c0lkcyk7XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBsb2FkQXNzZXRzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL2Fzc2V0cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBOb2RlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2FtZU5vZGUgPSBudWxsO1xyXG4gICAgdGhpcy5pZHMgPSB7fTtcclxuICAgIHRoaXMubmFtZTJub2RlID0ge307XHJcbiAgICB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uID0gW107XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUuc2V0R2FtZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgdGhpcy5nYW1lTm9kZSA9IG5vZGU7XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUuc2V0R2FtZSA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWVOb2RlLm9iaiA9IGdhbWU7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0ge1xyXG4gICAgICAgIGdhbWU6IGdhbWUsXHJcbiAgICAgICAgbm9kZXM6IHRoaXMubmFtZTJub2RlXHJcbiAgICB9O1xyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLnJlcXVlc3RUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcclxuICAgIGlmICh0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLmluZGV4T2Yobm9kZWlkKSA8IDApIHtcclxuICAgICAgICB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLnB1c2gobm9kZWlkKTtcclxuICAgIH1cclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS5jYW5jZWxUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMubm90aWZ5VHJhbnNhY3Rpb24uaW5kZXhPZihub2RlaWQpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUucG9wVHJhbnNhY3Rpb25MaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5ub3RpZnlUcmFuc2FjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubm90aWZ5VHJhbnNhY3Rpb247XHJcbiAgICAgICAgdGhpcy5ub3RpZnlUcmFuc2FjdGlvbiA9IFtdO1xyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuTm9kZXMucHJvdG90eXBlLmdhbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nYW1lTm9kZS5vYmo7XHJcbn07XHJcblxyXG5cclxuTm9kZXMucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIHRoaXMuaWRzW25vZGUuaWRdID0gbm9kZTtcclxuICAgIGlmIChub2RlLnByb3BzLm5hbWUpIHtcclxuICAgICAgICB0aGlzLm5hbWUybm9kZVtub2RlLnByb3BzLm5hbWVdID0gbm9kZTtcclxuICAgIH1cclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAobm9kZSwgbGFzdFByb3BzKSB7XHJcbiAgICBpZiAobGFzdFByb3BzLm5hbWUgIT09IG5vZGUucHJvcHMubmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm5hbWUybm9kZVtsYXN0UHJvcHMubmFtZV07XHJcbiAgICAgICAgdGhpcy5uYW1lMm5vZGVbbm9kZS5wcm9wcy5uYW1lXSA9IG5vZGU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICBkZWxldGUgdGhpcy5pZHNbbm9kZS5pZF07XHJcbiAgICBpZiAobm9kZS5wcm9wcy5uYW1lKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubmFtZTJub2RlW25vZGUucHJvcHMubmFtZV07XHJcbiAgICB9XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUuYnlJZCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWRzW2lkXTtcclxufTtcclxuXHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUuYnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWUybm9kZVtuYW1lXTtcclxufTtcclxuXHJcbk5vZGVzLnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAobm9kZSwgdGFnKSB7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmlkc1tub2RlLnBhcmVudF07XHJcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgcGFyZW50LnRhZyA9PT0gdGFnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZSA9IHBhcmVudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5Ob2Rlcy5wcm90b3R5cGUuY29udGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOb2RlcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL25vZGVzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==