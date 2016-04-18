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
	    'dude': { type: 'spritesheet', src: '../assets/dude.png', width: 32, height: 48 }
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
	    sprite: __webpack_require__(74),
	    group: __webpack_require__(102),
	    animation: __webpack_require__(104),
	    collides: __webpack_require__(105),
	    overlaps: __webpack_require__(107),
	    text: __webpack_require__(108),
	    button: __webpack_require__(110)
	}, __webpack_require__(113), __webpack_require__(121));

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
	
	var treeUtils = __webpack_require__(73),
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
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
	    treeUtils = __webpack_require__(73);
	
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
	
	var treeUtils = __webpack_require__(73),
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
	
	var treeUtils = __webpack_require__(73),
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
	
	var treeUtils = __webpack_require__(73),
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
	
	var treeUtils = __webpack_require__(73),
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
	
	var treeUtils = __webpack_require__(73),
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
	
	var treeUtils = __webpack_require__(73),
	    buttonPropertes = __webpack_require__(111),
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(112));

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(76), __webpack_require__(80), __webpack_require__(81), __webpack_require__(82), __webpack_require__(83), __webpack_require__(84), __webpack_require__(85), __webpack_require__(86), __webpack_require__(87), __webpack_require__(88), __webpack_require__(89), __webpack_require__(92), __webpack_require__(94), __webpack_require__(95), __webpack_require__(96), __webpack_require__(99), __webpack_require__(101));

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({
	    graphics: __webpack_require__(114),
	    rendertexture: __webpack_require__(119),
	    renderimage: __webpack_require__(120)
	}, __webpack_require__(117));

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
	    graphicsPropertes = __webpack_require__(115),
	    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(117),
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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(116), __webpack_require__(80), __webpack_require__(81), __webpack_require__(83), __webpack_require__(84), __webpack_require__(88), __webpack_require__(89), __webpack_require__(92), __webpack_require__(93), __webpack_require__(94), __webpack_require__(97), __webpack_require__(99));

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(70);
	
	module.exports = extend({}, __webpack_require__(77));

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createGraphicsNode = __webpack_require__(118),
	    renderers = {
	    arc: function arc(node, tree, graphics, x0, y0) {
	        graphics.arc(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.radius || 0, node.props.startAngle || 0, node.props.endAngle || 2 * Math.PI, node.props.anticlockwise || false, node.props.segments);
	    },
	    circle: function circle(node, tree, graphics, x0, y0) {
	        graphics.drawCircle(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.diameter || 0);
	    },
	    ellipse: function ellipse(node, tree, graphics, x0, y0) {
	        graphics.drawEllipse(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.width || 0, node.props.height || 0);
	    },
	    rect: function rect(node, tree, graphics, x0, y0) {
	        graphics.drawRect(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.width || 0, node.props.height || 0);
	    },
	    roundedrect: function roundedrect(node, tree, graphics, x0, y0) {
	        graphics.drawRoundedRect(x0 + (node.props.x || 0), y0 + (node.props.y || 0), node.props.width || 0, node.props.height || 0, node.props.radius || 0);
	    },
	    line: function line(node, tree, graphics, x0, y0) {
	        graphics.moveTo(x0 + (node.props.x1 || 0), y0 + (node.props.y1 || 0));
	        graphics.lineTo(x0 + (node.props.x2 || 0), y0 + (node.props.y2 || 0));
	    },
	    lineto: function lineto(node, tree, graphics, x0, y0) {
	        graphics.lineTo(x0 + (node.props.x || 0), y0 + (node.props.y || 0));
	    },
	    quadraticcurveto: function quadraticcurveto(node, tree, graphics, x0, y0) {
	        graphics.quadraticCurveTo(node.props.cpx + x0, node.props.cpy + y0, node.props.x + x0, node.props.y + y0);
	    },
	    beziercurveto: function beziercurveto(node, tree, graphics, x0, y0) {
	        graphics.quadraticCurveTo(node.props.cpx + x0, node.props.cpy + y0, node.props.cpx2 + x0, node.props.cpy2 + y0, node.props.x + x0, node.props.y + y0);
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
	                    case 'a':
	                        graphics.arc(v[0] + sx0, v[1] + sy0, v[2], v[3], v[4], !!v[5], v[6]);
	                        break;
	                    case 'l':
	                        graphics.lineTo(v[0] + sx0, v[1] + sy0);
	                        break;
	                    case 'c':
	                        graphics.drawCircle(v[0] + sx0, v[1] + sy0, v[2]);
	                        break;
	                    case 'e':
	                        graphics.drawEllipse(v[0] + sx0, v[1] + sy0, v[2], v[3]);
	                        break;
	                    case 'r':
	                        graphics.drawRect(v[0] + sx0, v[1] + sy0, v[2], v[3]);
	                        break;
	                    case 'd':
	                        graphics.drawRoundedRect(v[0] + sx0, v[1] + sy0, v[2], v[3], v[4]);
	                        break;
	                    case 'm':
	                        graphics.moveTo(v[0] + sx0, v[1] + sy0);
	                        break;
	                    case 'b':
	                        graphics.bezierCurveTo(v[0] + sx0, v[1] + sy0, v[2] + sx0, v[3] + sy0, v[4] + sx0, v[5] + sy0);
	                        break;
	                    case 'q':
	                        graphics.quadraticCurveTo(v[0] + sx0, v[1] + sy0, v[2] + sx0, v[3] + sy0);
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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
	    graphicsPropertes = __webpack_require__(115),
	    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(117),
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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
	    graphicsPropertes = __webpack_require__(115),
	    updateGraphics = treeUtils.genPropertyMapUpdate(graphicsPropertes),
	    itemTypes = __webpack_require__(117),
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	    input: __webpack_require__(122),
	    key: __webpack_require__(123)
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var treeUtils = __webpack_require__(73),
	    keyPropertes = __webpack_require__(124),
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(79);
	
	module.exports = utils.generateFixedPropMap(['keyName', 'keyCode']);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjQyMmRjZjViM2JiZjkwNmI2YmM/ZmRmMSoqKioqIiwid2VicGFjazovLy8uL3NyYy9leGFtcGxlcy9wYXJ0OC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmF0aXZlLmpzPzdiNDUqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9uYXRpdmUuanM/NDJlMSoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0LmpzPzI0ZWYqKioqKiIsIndlYnBhY2s6Ly8vLi9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzPzQ5NGMqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkcmVuLmpzPzRmMDUqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcz9jMjlhKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanM/NDU5OSoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcz9hYjJmKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzPzI5MjcqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcz82MWRiKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi93YXJuaW5nLmpzPzhhNTYqKioqKiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanM/MmEzYioqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzP2U5YTAqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzPzU2ZGUqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzPzE1MDcqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudC5qcz83MDJhKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROb29wVXBkYXRlUXVldWUuanM/YWQwYioqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uLmpzPzAyNGUqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERlYnVnVG9vbC5qcz9hZDJlKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbC5qcz9iMjEyKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcz80MmU0KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDbGFzcy5qcz8wZDc0KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5qcz9iYzE2KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlNaXJyb3IuanM/MTg2NCoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzPzdkZDkqKioqKiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2tleU9mLmpzPzNhZDIqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcz81YTkyKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50VmFsaWRhdG9yLmpzP2E1OTkqKioqKiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL21hcE9iamVjdC5qcz9lZmIzKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanM/M2M4MyoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qcz9jMDgzKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvb25seUNoaWxkLmpzPzI3ZTMqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nLmpzPzFiYTQqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFBlcmYuanM/ZWY5MyoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdNb3VudC5qcz85ZmI2KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZS5qcz9mZDJjKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RJbnN0YW5jZU1hcC5qcz9hODNlKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVzLmpzP2NlMDkqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlLmpzP2JlYTgqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEZlYXR1cmVGbGFncy5qcz83OWFiKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVyLmpzPzZiZmEqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFJlZi5qcz83MzMzKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RPd25lci5qcz80MGUwKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvVHJhbnNhY3Rpb24uanM/NmRmZioqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanM/NzVkYSoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50LmpzP2NkNTkqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50LmpzPzFhNDAqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVycm9yVXRpbHMuanM/NmIzMSoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Tm9kZVR5cGVzLmpzPzI1ODAqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9zaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudC5qcz9jMGUxKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbXB0eUNvbXBvbmVudC5qcz9iN2I5KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQuanM/Y2Y1YioqKioqIiwid2VicGFjazovLy8uL34vd2FybmluZy9icm93c2VyLmpzPzI2ZDMqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mby5qcz9mNzY5KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0luamVjdGlvbi5qcz9iMDYxKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5qcz9lZjcwKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLmpzP2UyMDkqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50LmpzPzViZTQqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE11bHRpQ2hpbGQuanM/Yzg3ZCoqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLmpzP2Q0YTAqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkUmVjb25jaWxlci5qcz9mZjQ2KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvZmxhdHRlbkNoaWxkcmVuLmpzPzBkMDYqKioqKiIsIndlYnBhY2s6Ly8vLi9+L2ludmFyaWFudC9icm93c2VyLmpzPzk1MjAqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuanM/ZDQwNioqKioqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudC5qcz81ZDc1KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BoYXNlci1pbXBsZW1lbnRhdGlvbi5qcz9iZDMxKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUtbWFuYWdlbWVudC9ub2RlLXRyZWUtYWRhcHRlci5qcz8xOTNjKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vZGUtbWFuYWdlbWVudC9ub2RlLWluaXQtYWRhcHRlci5qcz8wN2JkKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanM/NzVhZSoqKioqIiwid2VicGFjazovLy8uL34vZXh0ZW5kL2luZGV4LmpzPzM2YzgqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9nYW1lLmpzP2Q3N2IqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9zdGF0ZS5qcz8xY2M3KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHJlZS11dGlscy5qcz81Y2RlKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvc3ByaXRlLmpzPzlkODIqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlNwcml0ZS5qcz81MmU3KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuU3ByaXRlLmpzPzZlYWQqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzPzQ1NzEqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0LmpzPzE5ZmYqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL3V0aWxzLmpzP2U2ZjkqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Db3JlLmpzP2UyOWMqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmdsZS5qcz8xM2Q1KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uLmpzPzE1YmEqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbC5qcz9jZjBkKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQm91bmRzLmpzPzllZWIqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wLmpzP2NmZmMqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Dcm9wLmpzPzJkMDUqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZWx0YS5qcz9mYmE5KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVzdHJveS5qcz81ZDVjKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYS5qcz80ZDkyKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSGVhbHRoLmpzP2M0NWUqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYS5qcz8wNzFlKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkLmpzPzVmYzYqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbldvcmxkLmpzPzczZGUqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5MaWZlU3Bhbi5qcz82MjI1KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuTG9hZFRleHR1cmUuanM/NTA4MSoqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAuanM/YmFkNioqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5LmpzPzA0MTAqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2N1c3RvbS9ib2R5LmpzPzgxZmQqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5SZXNldC5qcz9lOWU0KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXguanM/Yjg2YioqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkLmpzP2UyNGUqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncm91cC5qcz8zNTM2KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Hcm91cC5qcz9hMjUzKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvYW5pbWF0aW9uLmpzPzc1MjkqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9jb2xsaWRlcy5qcz9mYTYyKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcGh5c2ljLXN5c3RlbS1uYW1lLmpzPzI1YTIqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9vdmVybGFwcy5qcz9mZDgxKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvdGV4dC5qcz9lN2VhKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0LmpzP2M3MDEqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9idXR0b24uanM/YjhlYioqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQnV0dG9uLmpzP2U0ZjYqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkltYWdlLmpzPzI5NGQqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9pbmRleC5qcz9mYzExKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvZ3JhcGhpY3MuanM/MGI1YSoqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MuanM/Y2JkNioqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkdyYXBoaWNzLmpzPzI2OTcqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJlcnMuanM/OTEzOSoqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2NyZWF0ZS1ncmFwaGljcy1pdGVtLmpzPzRhNDUqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJ0ZXh0dXJlLmpzPzVkZmUqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJpbWFnZS5qcz83NDY5KioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvaW5wdXQvaW5kZXguanM/MWQzZCoqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2lucHV0L2lucHV0LmpzP2I0NGQqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9rZXkuanM/NTg0OSoqKioqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvY3VzdG9tL2tleS5qcz9lZGZiKioqKioiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJLFFBQVEsb0JBQVEsQ0FBUixDQUFSO0tBRUEsU0FBUztBQUNMLFlBQU8sRUFBQyxNQUFNLE9BQU4sRUFBZSxLQUFLLG1CQUFMLEVBQXZCO0FBQ0EsZUFBVSxFQUFDLE1BQU0s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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVOzs7Ozs7O0FDMUZ0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxVQUFVO0FBQ3JCLFlBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEdBQUc7QUFDZCxZQUFXLGlCQUFpQjtBQUM1QixZQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsR0FBRztBQUNkLFlBQVcsVUFBVTtBQUNyQixZQUFXLEdBQUc7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEdBQUc7QUFDZCxZQUFXLGlCQUFpQjtBQUM1QixZQUFXLEVBQUU7QUFDYixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsR0FBRztBQUNkLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7OztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxTQUFTO0FBQ3BCLFlBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQ7QUFDckQsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2IsWUFBVyxFQUFFO0FBQ2IsWUFBVyxjQUFjO0FBQ3pCLFlBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxFQUFFO0FBQ2I7QUFDQSxZQUFXLEVBQUU7QUFDYixZQUFXLEVBQUU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXdCLGVBQWU7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixLQUFLO0FBQ2xDO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7Ozs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FB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Q0E7QUFDQTtBQUNBOztBQUVBLDRCOzs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUiw0QkFBMkI7QUFDM0IsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLEtBQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCwyQkFBMEI7QUFDMUIsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQSxvQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtB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Q0E7Ozs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0M7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsUUFBUTtBQUN2QixpQkFBZ0IsTUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxRQUFRO0FBQ3ZCLGdCQUFlLDBCQUEwQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLGdCQUFlLFFBQVE7QUFDdkIsZ0JBQWUsMEJBQTBCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGVBQWU7QUFDOUIsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsZUFBZTtBQUM5QixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxlQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsZUFBZTtBQUM5QixnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLE9BQU87QUFDdEIsZ0JBQWUsMEJBQTBCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGVBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsa0M7Ozs7Ozs7QUNqWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQsNkM7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdLQUF1SztBQUN2SztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCLGVBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQixjQUFhLFFBQVE7QUFDckIsY0FBYSwwQkFBMEI7QUFDdkMsY0FBYSxPQUFPO0FBQ3BCLGVBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHVDOzs7Ozs7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxZQUFXLFNBQVM7QUFDcEIsWUFBVyxnQkFBZ0I7QUFDM0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdLQUF1SztBQUN2SztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0M7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUM7QUFDckM7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMseUJBQXlCLEVBQUU7QUFDckU7QUFDQTtBQUNBOztBQUVBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNEI7QUFDNUI7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTs7QUFFQSxLQUFJLGlCQUFpQixvQkFBUSxFQUFSLENBQWpCO0tBQ0Esb0JBQW9CLG9CQUFRLEVBQVIsQ0FBcEI7S0FDQSxZQUFZLG9CQUFRLEVBQVIsQ0FBWjs7QUFFSixRQUFPLE9BQVAsR0FBaUIsZUFBZSxrQkFBa0IsU0FBbEIsQ0FBZixDQUFqQixDOzs7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBLEtBQUksU0FBUyxTQUFULE1BQVMsQ0FBVSxJQUFWLEVBQWdCO0FBQ3pCLFNBQUksT0FBTztBQUNILGVBQU0sSUFBTjtBQUNBLGdCQUFPLEVBQVA7QUFDQSxpQkFBUSxFQUFSO01BSEo7U0FLQSxXQUFXO0FBQ1AscUJBQVk7QUFDUixvQkFBTyxlQUFVLEVBQVYsRUFBYyxHQUFkLEVBQW1CLEtBQW5CLEVBQTBCLE1BQTFCLEVBQWtDO0FBQ3JDLHFCQUFJLE9BQU87QUFDUCx5QkFBSSxFQUFKO0FBQ0EsMEJBQUssR0FBTDtBQUNBLDRCQUFPLEtBQVA7QUFDQSw2QkFBUSxVQUFVLE9BQU8sRUFBUDtBQUNsQiwrQkFBVSxFQUFWO0FBQ0Esa0NBQWEsS0FBYjtrQkFOQSxDQURpQzs7QUFVckMscUJBQUksTUFBSixFQUFZO0FBQ1IsNEJBQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixFQUFyQixFQURRO2tCQUFaLE1BRU87QUFDSCwwQkFBSyxJQUFMLEdBQVksSUFBWixDQURHO2tCQUZQO0FBS0Esc0JBQUssS0FBTCxDQUFXLEVBQVgsSUFBaUIsSUFBakIsQ0FmcUM7O0FBaUJyQyxxQkFBSSxNQUFNLElBQU4sRUFBWTtBQUNaLDBCQUFLLE1BQUwsQ0FBWSxNQUFNLElBQU4sQ0FBWixHQUEwQixJQUExQixDQURZO2tCQUFoQjs7QUFJQSxzQkFBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLEVBckJxQztBQXNCckMsd0JBQU8sSUFBUCxDQXRCcUM7Y0FBbEM7QUF3QlAsNEJBQWUsdUJBQVUsSUFBVixFQUFnQjtBQUMzQixzQkFBSyxVQUFMLENBQWdCLGFBQWhCLENBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBRDJCO2NBQWhCO0FBR2Ysc0JBQVMsaUJBQVUsSUFBVixFQUFnQjtBQUNyQixzQkFBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBRHFCO0FBRXJCLHdCQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssRUFBTCxDQUFsQixDQUZxQjtBQUdyQixxQkFBSSxLQUFLLE1BQUwsRUFBYTtBQUNiLHlCQUFJLFNBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLENBQXBCLENBRFM7QUFFYiw0QkFBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLE9BQU8sUUFBUCxDQUFnQixPQUFoQixDQUF3QixLQUFLLEVBQUwsQ0FBL0MsRUFBeUQsQ0FBekQsRUFGYTtrQkFBakI7QUFJQSx3QkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEVBQUwsQ0FBbEIsQ0FQcUI7QUFRckIscUJBQUksU0FBUyxLQUFLLElBQUwsRUFBVztBQUNwQiwwQkFBSyxJQUFMLEdBQVksSUFBWixDQURvQjtrQkFBeEI7O0FBSUEscUJBQUksS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQjtBQUNqQiw0QkFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQW5CLENBRGlCO2tCQUFyQjtjQVpLO0FBZ0JULHFCQUFRLGdCQUFVLElBQVYsRUFBZ0IsU0FBaEIsRUFBMkIsU0FBM0IsRUFBc0M7QUFDMUMsc0JBQUssS0FBTCxHQUFhLFNBQWIsQ0FEMEM7QUFFMUMsc0JBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixJQUF2QixFQUE2QixTQUE3QixFQUF3QyxJQUF4QyxFQUYwQztBQUcxQyxxQkFBSSxVQUFVLElBQVYsS0FBbUIsVUFBVSxJQUFWLEVBQWdCO0FBQ25DLHlCQUFJLFVBQVUsSUFBVixFQUFnQjtBQUNoQixnQ0FBTyxLQUFLLE1BQUwsQ0FBWSxVQUFVLElBQVYsQ0FBbkIsQ0FEZ0I7c0JBQXBCO0FBR0EseUJBQUksVUFBVSxJQUFWLEVBQWdCO0FBQ2hCLDhCQUFLLE1BQUwsQ0FBWSxVQUFVLElBQVYsQ0FBWixHQUE4QixJQUE5QixDQURnQjtzQkFBcEI7a0JBSko7Y0FISTtVQTVDWjtBQXlEQSxzQkFBYTtBQUNULHlCQUFZLEtBQUssV0FBTCxDQUFpQixVQUFqQixJQUErQixZQUFZO0FBQ25ELHNCQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsSUFBNUIsRUFEbUQ7Y0FBWjtBQUczQyxvQkFBTyxLQUFLLFdBQUwsQ0FBaUIsS0FBakIsSUFBMEIsWUFBWTtBQUN6QyxzQkFBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLElBQXZCLEVBRHlDO2NBQVo7VUFKckM7TUExREosQ0FOcUI7O0FBMEV6QixZQUFPLFFBQVAsQ0ExRXlCO0VBQWhCOztBQTZFYixRQUFPLE9BQVAsR0FBaUIsTUFBakIsQzs7Ozs7Ozs7Ozs7Ozs7QUMvRUE7O0FBRUEsS0FBSSxTQUFTLFNBQVQsTUFBUyxDQUFVLFNBQVYsRUFBcUI7O0FBRTFCLFNBQUksdUJBQXVCLEVBQXZCO1NBRUEsY0FBYyxTQUFkLFdBQWMsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQ2hDLGFBQUksU0FBUyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsQ0FBcEIsQ0FENEI7QUFFaEMsZ0JBQU8sQ0FBQyxNQUFELElBQVcsT0FBTyxXQUFQLENBRmM7TUFBdEI7U0FLZCxTQUFTLFNBQVQsTUFBUyxDQUFVLE1BQVYsRUFBa0IsSUFBbEIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUM7QUFDdEMsYUFBSSxXQUFXLFVBQVUsS0FBSyxHQUFMLENBQXJCO2FBQ0EsSUFBSSxZQUFZLFNBQVMsTUFBVCxDQUFaLENBRjhCOztBQUl0QyxhQUFJLENBQUosRUFBTztBQUNILGVBQUUsSUFBRixFQUFRLENBQVIsRUFBVyxDQUFYLEVBQWMsQ0FBZCxFQURHO1VBQVA7TUFKSztTQVNULGtCQUFrQixTQUFsQixlQUFrQixDQUFVLElBQVYsRUFBZ0I7QUFDOUIsYUFBSSxXQUFXLFVBQVUsS0FBSyxHQUFMLENBQXJCLENBRDBCO0FBRTlCLGdCQUFPLENBQUMsUUFBRCxJQUFhLENBQUMsVUFBVSxLQUFLLEdBQUwsQ0FBVixDQUFvQixZQUFwQixDQUZTO01BQWhCO1NBS2xCLE9BQU8sU0FBUCxJQUFPLENBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUNqQyxjQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FEaUM7QUFFakMsZ0JBQU8sTUFBUCxFQUFlLElBQWYsRUFBcUIsSUFBckIsRUFBMkIsT0FBM0IsRUFGaUM7QUFHakMsYUFBSSxLQUFLLEdBQUwsRUFBVTtBQUNWLGtCQUFLLEdBQUwsQ0FBUyxPQUFULEdBQW1CLEtBQUssRUFBTCxDQURUO1VBQWQ7TUFIRztTQVFQLGVBQWUsU0FBZixZQUFlLENBQVUsTUFBVixFQUFrQixJQUFsQixFQUF3QixPQUF4QixFQUFpQztBQUM1QyxhQUFJLFdBQVcsV0FBVyxFQUFYO2FBQ1gsVUFBVSxTQUFTLE9BQVQ7YUFDVixVQUFVLFNBQVMsT0FBVCxDQUg4Qjs7QUFLNUMsY0FBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksT0FBTyxRQUFQLENBQWdCLE1BQWhCLEVBQXdCLEdBQTVDLEVBQWlEO0FBQzdDLGlCQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsT0FBTyxRQUFQLENBQWdCLENBQWhCLENBQVgsQ0FBUjtpQkFDQSxTQUFTLENBQUMsTUFBTSxXQUFOLEtBQ0wsQ0FBQyxPQUFELElBQVksUUFBUSxPQUFSLENBQWdCLE1BQU0sR0FBTixDQUFoQixJQUE4QixDQUE5QixDQURSLEtBRUosQ0FBQyxPQUFELElBQVksUUFBUSxPQUFSLENBQWdCLE1BQU0sR0FBTixDQUFoQixHQUE2QixDQUE3QixDQUZSLENBRmdDOztBQU03QyxpQkFBSSxNQUFKLEVBQVk7QUFDUixxQkFBSSxnQkFBZ0IsS0FBaEIsQ0FBSixFQUE0QjtBQUN4QiwwQkFBSyxNQUFMLEVBQWEsS0FBYixFQUFvQixJQUFwQixFQUR3QjtBQUV4Qiw2QkFBUSxZQUFSLENBQXFCLEtBQXJCLEVBQTRCLElBQTVCLEVBRndCO0FBR3hCLDRCQUFPLGdCQUFQLEVBQXlCLEtBQXpCLEVBQWdDLElBQWhDLEVBQXNDLE9BQXRDLEVBSHdCO2tCQUE1QixNQUlPO0FBQ0gsMEJBQUssZ0JBQUwsRUFBdUIsS0FBdkIsRUFBOEIsSUFBOUIsRUFBb0MsT0FBcEMsRUFERztrQkFKUDtjQURKO1VBTko7TUFMVztTQXVCZixnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBVSxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLE9BQXhCLEVBQWlDO0FBQzdDLGFBQUksV0FBVyxXQUFXLEVBQVg7YUFDWCxVQUFVLFNBQVMsT0FBVDthQUNWLFVBQVUsU0FBUyxPQUFULENBSCtCOztBQUs3QyxjQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxPQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsRUFBd0IsR0FBNUMsRUFBaUQ7QUFDN0MsaUJBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUFPLFFBQVAsQ0FBZ0IsQ0FBaEIsQ0FBWCxDQUFSO2lCQUNBLGNBQWMsTUFBTSxXQUFOLEtBQ1QsQ0FBQyxPQUFELElBQVksUUFBUSxPQUFSLENBQWdCLE1BQU0sR0FBTixDQUFoQixJQUE4QixDQUE5QixDQURILEtBRVQsQ0FBQyxPQUFELElBQVksUUFBUSxPQUFSLENBQWdCLE1BQU0sR0FBTixDQUFoQixHQUE2QixDQUE3QixDQUZILENBRjJCOztBQU03QyxpQkFBSSxXQUFKLEVBQWlCO0FBQ2Isd0JBQU8sT0FBUCxFQUFnQixJQUFoQixFQUFzQixPQUF0QixFQURhO0FBRWIsdUJBQU0sV0FBTixHQUFvQixLQUFwQixDQUZhO0FBR2IscUJBQUksTUFBTSxRQUFOLENBQWUsTUFBZixHQUF3QixDQUF4QixFQUEyQjtBQUMzQixtQ0FBYyxLQUFkLEVBQXFCLElBQXJCLEVBRDJCO2tCQUEvQjtjQUhKO1VBTko7TUFMWTtTQXFCaEIsaUNBQWlDLFNBQWpDLDhCQUFpQyxDQUFVLE1BQVYsRUFBa0I7QUFDL0MsYUFBSSxxQkFBcUIsT0FBckIsQ0FBNkIsTUFBN0IsSUFBdUMsQ0FBdkMsRUFBMEM7QUFDMUMsa0NBQXFCLElBQXJCLENBQTBCLE1BQTFCLEVBRDBDO1VBQTlDO01BRDZCO1NBTWpDLGdDQUFnQyxTQUFoQyw2QkFBZ0MsQ0FBVSxNQUFWLEVBQWtCO0FBQzlDLGFBQUksUUFBUSxxQkFBcUIsT0FBckIsQ0FBNkIsTUFBN0IsQ0FBUixDQUQwQztBQUU5QyxhQUFJLFNBQVMsQ0FBVCxFQUFZO0FBQ1osa0NBQXFCLE1BQXJCLENBQTRCLEtBQTVCLEVBQW1DLENBQW5DLEVBRFk7VUFBaEI7TUFGNEI7U0FPaEMsVUFBVTtBQUNOLHVCQUFjLFlBQWQ7QUFDQSx3QkFBZSxhQUFmO0FBQ0EseUNBQWdDLDhCQUFoQztBQUNBLHdDQUErQiw2QkFBL0I7TUFKSjtTQU9BLE9BQU87QUFDSCxxQkFBWTtBQUNSLG9CQUFPLGVBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUN6QixxQkFBSSxnQkFBZ0IsSUFBaEIsS0FBeUIsWUFBWSxJQUFaLEVBQWtCLElBQWxCLENBQXpCLEVBQWtEO0FBQ2xELDBCQUFLLE1BQUwsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBRGtEO2tCQUF0RDtjQURHO0FBS1AsNEJBQWUsdUJBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUNqQyxxQkFBSSxLQUFLLFdBQUwsRUFBa0I7QUFDbEIsNEJBQU8sZ0JBQVAsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFEa0I7a0JBQXRCLE1BRU8sSUFBSSxZQUFZLElBQVosRUFBa0IsSUFBbEIsQ0FBSixFQUE2QjtBQUNoQywwQkFBSyxnQkFBTCxFQUF1QixJQUF2QixFQUE2QixJQUE3QixFQURnQztrQkFBN0I7Y0FISTtBQU9mLHNCQUFTLGlCQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDM0Isd0JBQU8sTUFBUCxFQUFlLElBQWYsRUFBcUIsSUFBckIsRUFEMkI7Y0FBdEI7QUFHVCxxQkFBUSxnQkFBVSxJQUFWLEVBQWdCLFNBQWhCLEVBQTJCLElBQTNCLEVBQWlDO0FBQ3JDLHdCQUFPLFFBQVAsRUFBaUIsSUFBakIsRUFBdUIsU0FBdkIsRUFBa0MsSUFBbEMsRUFBd0MsT0FBeEMsRUFEcUM7Y0FBakM7VUFoQlo7QUFvQkEsc0JBQWE7QUFDVCxvQkFBTyxlQUFVLElBQVYsRUFBZ0I7QUFDbkIscUJBQUkscUJBQXFCLE1BQXJCLEdBQThCLENBQTlCLEVBQWlDO0FBQ2pDLDBCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxxQkFBcUIsTUFBckIsRUFBNkIsR0FBakQsRUFBc0Q7QUFDbEQsNkJBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxxQkFBcUIsQ0FBckIsQ0FBWCxDQUFQLENBRDhDO0FBRWxELDZCQUFJLElBQUosRUFBVTtBQUNOLG9DQUFPLG1CQUFQLEVBQTRCLElBQTVCLEVBQWtDLElBQWxDLEVBRE07MEJBQVY7c0JBRko7QUFNQSw0Q0FBdUIsRUFBdkIsQ0FQaUM7a0JBQXJDO2NBREc7VUFEWDtNQXJCSixDQS9Gc0I7O0FBbUkxQixZQUFPLElBQVAsQ0FuSTBCO0VBQXJCOztBQXVJYixRQUFPLE9BQVAsR0FBaUIsTUFBakIsQzs7Ozs7O0FDakpBOztBQUVBLEtBQUksU0FBUyxvQkFBUSxFQUFSLENBQVQ7O0FBRUosUUFBTyxPQUFQLEdBQWlCLE9BQ2I7QUFDSSxXQUFNLG9CQUFRLEVBQVIsQ0FBTjtBQUNBLFlBQU8sb0JBQVEsRUFBUixDQUFQO0FBQ0EsYUFBUSxvQkFBUSxFQUFSLENBQVI7QUFDQSxZQUFPLG9CQUFRLEdBQVIsQ0FBUDtBQUNBLGdCQUFXLG9CQUFRLEdBQVIsQ0FBWDtBQUNBLGVBQVUsb0JBQVEsR0FBUixDQUFWO0FBQ0EsZUFBVSxvQkFBUSxHQUFSLENBQVY7QUFDQSxXQUFNLG9CQUFRLEdBQVIsQ0FBTjtBQUNBLGFBQVEsb0JBQVEsR0FBUixDQUFSO0VBVlMsRUFZYixvQkFBUSxHQUFSLENBWmEsRUFhYixvQkFBUSxHQUFSLENBYmEsQ0FBakIsQzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUI7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBLFFBQU8sWUFBWTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwRkE7O0FBRUEsS0FBSSxhQUFhLFNBQWIsVUFBYSxDQUFVLElBQVYsRUFBZ0IsU0FBaEIsRUFBMkI7QUFDcEMsU0FBSSxhQUFhLFVBQVUsU0FBVixLQUF3QixLQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCO0FBQzNELGNBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBckIsQ0FEMkQ7TUFBL0Q7RUFEUztLQU1iLGlCQUFpQixTQUFqQixjQUFpQixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsV0FBdEIsRUFBbUM7QUFDaEQsVUFBSyxjQUFMLEdBQXNCLEVBQXRCLENBRGdEO0FBRWhELFVBQUssaUJBQUwsR0FBeUIsVUFBVSxRQUFWLEVBQW9CO0FBQ3pDLGNBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixRQUF6QixFQUR5QztNQUFwQixDQUZ1QjtBQUtoRCxVQUFLLG9CQUFMLEdBQTRCLFVBQVUsUUFBVixFQUFvQjtBQUM1QyxhQUFJLFFBQVEsS0FBSyxjQUFMLENBQW9CLE9BQXBCLENBQTRCLFFBQTVCLENBQVIsQ0FEd0M7QUFFNUMsYUFBSSxTQUFTLENBQVQsRUFBWTtBQUNaLGtCQUFLLGNBQUwsQ0FBb0IsTUFBcEIsQ0FBMkIsS0FBM0IsRUFBa0MsQ0FBbEMsRUFEWTtVQUFoQjtNQUZ3QixDQUxvQjs7QUFZaEQsU0FBSSxRQUFRLEtBQUssS0FBTDtTQUNSLFdBQVc7QUFDUCxrQkFBUyxtQkFBWTtBQUNqQixpQkFBSSxNQUFNLE1BQU4sRUFBYztBQUNkLHdCQUFPLElBQVAsQ0FBWSxNQUFNLE1BQU4sQ0FBWixDQUEwQixPQUExQixDQUFrQyxVQUFVLEdBQVYsRUFBZTtBQUM3Qyx5QkFBSSxRQUFRLE1BQU0sTUFBTixDQUFhLEdBQWIsQ0FBUixDQUR5QztBQUU3Qyw2QkFBUSxNQUFNLElBQU47QUFDSiw4QkFBSyxPQUFMO0FBQ0ksa0NBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUIsTUFBTSxHQUFOLENBQXJCLENBREo7QUFFSSxtQ0FGSjtBQURKLDhCQUlTLGFBQUw7QUFDSSxrQ0FBSyxJQUFMLENBQVUsV0FBVixDQUFzQixHQUF0QixFQUEyQixNQUFNLEdBQU4sRUFBVyxNQUFNLEtBQU4sRUFBYSxNQUFNLE1BQU4sQ0FBbkQsQ0FESjtBQUVJLG1DQUZKO0FBSkosc0JBRjZDO2tCQUFmLENBQWxDLENBRGM7Y0FBbEI7QUFhQSx5QkFBWSxZQUFaLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBQXFDLEVBQUMsU0FBUyxDQUFDLFFBQUQsQ0FBVCxFQUF0QyxFQWRpQjtVQUFaO0FBZ0JULGlCQUFRLGtCQUFZOztBQUVoQixpQkFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQUosRUFBMEM7QUFDdEMsc0JBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUE3QixDQURzQztjQUExQzs7QUFJQSx5QkFBWSxZQUFaLENBQXlCLElBQXpCLEVBQStCLElBQS9CLEVBTmdCOztBQVFoQixpQkFBSSxLQUFLLEtBQUwsQ0FBVyxTQUFYLEVBQXNCO0FBQ3RCLHNCQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FBakIsQ0FEc0I7Y0FBMUI7VUFSSTtBQVlSLGlCQUFRLGtCQUFZO0FBQ2hCLGtCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsR0FBaEQsRUFBcUQ7QUFDakQsc0JBQUssY0FBTCxDQUFvQixDQUFwQixFQUF1QixPQUF2QixFQURpRDtjQUFyRDtVQURJO01BN0JaO1NBb0NBLE9BQU8sSUFBSSxPQUFPLElBQVAsQ0FBWSxNQUFNLEtBQU4sRUFBYSxNQUFNLE1BQU4sRUFBYyxNQUFNLElBQU4sSUFBYyxPQUFPLElBQVAsRUFBYSxFQUF0RSxFQUEwRSxRQUExRSxDQUFQO1NBQ0EsVUFBVTtBQUNOLGVBQU0sSUFBTjtBQUNBLGdCQUFPLEtBQUssTUFBTDtNQUZYLENBbEQ0Qzs7QUF1RGhELFVBQUssR0FBTCxHQUFXLElBQVgsQ0F2RGdEO0FBd0RoRCxVQUFLLE9BQUwsR0FBZSxPQUFmLENBeERnRDs7QUEwRGhELGdCQUFXLElBQVgsRUFBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUExRGdEO0VBQW5DOztBQTZEckIsUUFBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTSxJQUFOO0FBQ0EscUJBQWdCLGNBQWhCO0FBQ0EsYUFBUSxVQUFSO0FBQ0EsV0FBTSxJQUFOO0FBQ0EsbUJBQWMsSUFBZDtFQUxKLEM7Ozs7OztBQ3JFQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBRUEsaUJBQWlCLFNBQWpCLGNBQWlCLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixXQUF0QixFQUFtQztBQUNoRCxVQUFLLGNBQUwsR0FBc0IsRUFBdEIsQ0FEZ0Q7QUFFaEQsVUFBSyxpQkFBTCxHQUF5QixVQUFVLFFBQVYsRUFBb0I7QUFDekMsY0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLFFBQXpCLEVBRHlDO01BQXBCLENBRnVCO0FBS2hELFVBQUssb0JBQUwsR0FBNEIsVUFBVSxRQUFWLEVBQW9CO0FBQzVDLGFBQUksUUFBUSxLQUFLLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBNEIsUUFBNUIsQ0FBUixDQUR3QztBQUU1QyxhQUFJLFNBQVMsQ0FBVCxFQUFZO0FBQ1osa0JBQUssY0FBTCxDQUFvQixNQUFwQixDQUEyQixLQUEzQixFQUFrQyxDQUFsQyxFQURZO1VBQWhCO01BRndCLENBTG9COztBQVloRCxTQUFJLFFBQVEsS0FBSyxLQUFMO1NBQ1IsWUFBWTtBQUNSLGlCQUFRLGtCQUFZO0FBQ2hCLGlCQUFJLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBSixFQUEwQztBQUN0QyxzQkFBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixXQUFqQixDQUE2QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQTdCLENBRHNDO2NBQTFDOztBQUlBLHlCQUFZLGFBQVosQ0FBMEIsSUFBMUIsRUFBZ0MsSUFBaEMsRUFMZ0I7QUFNaEIseUJBQVksWUFBWixDQUF5QixJQUF6QixFQUErQixJQUEvQixFQU5nQjtVQUFaO0FBUVIsaUJBQVEsa0JBQVk7QUFDaEIsa0JBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssY0FBTCxDQUFvQixNQUFwQixFQUE0QixHQUFoRCxFQUFxRDtBQUNqRCxzQkFBSyxjQUFMLENBQW9CLENBQXBCLEVBQXVCLE9BQXZCLEVBRGlEO2NBQXJEO1VBREk7TUFUWjtTQWVBLE9BQU8sVUFBVSxJQUFWLENBQWUsSUFBZixDQUFQO1NBQ0EsUUFBUSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsTUFBTSxJQUFOLEVBQVksU0FBM0IsQ0FBUjtTQUNBLFVBQVU7QUFDTixlQUFNLElBQU47QUFDQSxnQkFBTyxLQUFQO0FBQ0EsZ0JBQU8sS0FBSyxNQUFMO01BSFgsQ0E5QjRDOztBQW9DaEQsVUFBSyxHQUFMLEdBQVcsS0FBWCxDQXBDZ0Q7QUFxQ2hELFVBQUssT0FBTCxHQUFlLE9BQWYsQ0FyQ2dEO0VBQW5DOztBQXdDckIsUUFBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTSxJQUFOO0FBQ0EscUJBQWdCLGNBQWhCO0FBQ0EsV0FBTSxJQUFOO0FBQ0EsbUJBQWMsSUFBZDtFQUpKLEM7Ozs7OztBQzVDQTs7QUFFQSxLQUFJLGVBQWUsU0FBZixZQUFlLENBQVUsU0FBVixFQUFxQixTQUFyQixFQUFnQztBQUMzQyxTQUFJLENBQUMsU0FBRCxFQUFZO0FBQ1osZ0JBQU8sSUFBUCxDQURZO01BQWhCOztBQUlBLFNBQUksTUFBTSxPQUFPLElBQVAsQ0FBWSxTQUFaLENBQU47U0FDQSxNQUFNLE9BQU8sSUFBUCxDQUFZLFNBQVosQ0FBTixDQU51Qzs7QUFRM0MsU0FBSSxJQUFJLE1BQUosS0FBZSxJQUFJLE1BQUosRUFBWTtBQUMzQixnQkFBTyxJQUFQLENBRDJCO01BQS9COztBQUlBLFVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLElBQUksTUFBSixFQUFZLEdBQWhDLEVBQXFDO0FBQ2pDLGFBQUksT0FBTyxJQUFJLENBQUosQ0FBUCxDQUQ2QjtBQUVqQyxhQUFJLFVBQVUsSUFBVixNQUFvQixVQUFVLElBQVYsQ0FBcEIsRUFBcUM7QUFDckMsb0JBQU8sSUFBUCxDQURxQztVQUF6QztNQUZKOztBQU9BLFlBQU8sS0FBUCxDQW5CMkM7RUFBaEM7S0FzQmYsdUJBQXVCLFNBQXZCLG9CQUF1QixDQUFVLEtBQVYsRUFBaUI7QUFDcEMsWUFBTyxVQUFVLElBQVYsRUFBZ0IsU0FBaEIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDcEMsYUFBSSxTQUFKLEVBQWU7QUFDWCxvQkFBTyxJQUFQLENBQVksU0FBWixFQUF1QixPQUF2QixDQUErQixVQUFVLElBQVYsRUFBZ0I7QUFDM0MscUJBQUksTUFBTSxJQUFOLEtBQWUsT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVAsS0FBNEIsV0FBNUIsRUFBeUM7QUFDeEQsMkJBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFsQixFQUFvQyxVQUFVLElBQVYsQ0FBcEMsRUFBcUQsS0FBckQsRUFBNEQsSUFBNUQsRUFBa0UsSUFBbEUsRUFEd0Q7a0JBQTVEO2NBRDJCLENBQS9CLENBRFc7VUFBZjtBQU9BLGdCQUFPLElBQVAsQ0FBWSxLQUFLLEtBQUwsQ0FBWixDQUF3QixPQUF4QixDQUFnQyxVQUFVLElBQVYsRUFBZ0I7QUFDNUMsaUJBQUksTUFBTSxJQUFOLE1BQWdCLENBQUMsU0FBRCxJQUFjLEtBQUssS0FBTCxDQUFXLElBQVgsTUFBcUIsVUFBVSxJQUFWLENBQXJCLENBQTlCLEVBQXFFO0FBQ3JFLHVCQUFNLElBQU4sRUFBWSxJQUFaLEVBQWtCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBbEIsRUFBb0MsYUFBYSxVQUFVLElBQVYsQ0FBYixFQUE4QixDQUFDLFNBQUQsRUFBWSxLQUE5RSxFQUFxRixJQUFyRixFQURxRTtjQUF6RTtVQUQ0QixDQUFoQyxDQVJvQztNQUFqQyxDQUQ2QjtFQUFqQjtLQWlCdkIsT0FBTyxTQUFQLElBQU8sQ0FBVSxJQUFWLEVBQWdCO0FBQ25CLFlBQU8sS0FBSyxJQUFMLElBQWEsS0FBSyxJQUFMLENBQVUsR0FBVixDQUREO0VBQWhCO0tBSVAsU0FBUyxTQUFULE1BQVMsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLElBQXRCLEVBQTRCO0FBQ2pDLFlBQU8sSUFBUCxFQUFhO0FBQ1QsZ0JBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLENBQWxCLENBRFM7QUFFVCxhQUFJLENBQUMsSUFBRCxJQUFTLENBQUMsSUFBRCxJQUFTLFNBQVMsS0FBSyxHQUFMLEVBQVU7QUFDckMsb0JBQU8sSUFBUCxDQURxQztVQUF6QztNQUZKO0VBREs7S0FTVCxZQUFZLFNBQVosU0FBWSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDOUIsWUFBTyxJQUFQLEVBQWE7QUFDVCxnQkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsQ0FBbEIsQ0FEUztBQUVULGFBQUksQ0FBQyxJQUFELElBQVMsS0FBSyxHQUFMLEtBQWEsTUFBYixJQUF1QixLQUFLLEdBQUwsS0FBYSxPQUFiLEVBQXNCO0FBQ3RELG9CQUFPLElBQVAsQ0FEc0Q7VUFBMUQ7TUFGSjtFQURRO0tBU1osbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsR0FBdEIsRUFBMkI7QUFDMUMsU0FBSSxTQUFTLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxDQUFwQjtTQUNBLFFBQVEsT0FBTyxHQUFQLENBQVcsS0FBWCxJQUFvQixPQUFPLEdBQVAsQ0FGVTs7QUFJMUMsV0FBTSxHQUFOLENBQVUsT0FBTyxLQUFLLEdBQUwsQ0FBakIsQ0FKMEM7RUFBM0I7S0FPbkIsVUFBVSxTQUFWLE9BQVUsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQzVCLFNBQUksY0FBYyxVQUFVLElBQVYsRUFBZ0IsSUFBaEIsQ0FBZCxDQUR3QjtBQUU1QixZQUFPLGVBQWUsWUFBWSxHQUFaLENBQWdCLE9BQWhCLENBRk07RUFBdEI7O0FBS2QsUUFBTyxPQUFQLEdBQWlCO0FBQ2IsbUJBQWMsWUFBZDtBQUNBLDJCQUFzQixvQkFBdEI7QUFDQSxXQUFNLElBQU47QUFDQSxhQUFRLE1BQVI7QUFDQSx1QkFBa0IsZ0JBQWxCO0FBQ0EsZ0JBQVcsU0FBWDtBQUNBLGNBQVMsT0FBVDtFQVBKLEM7Ozs7OztBQzNFQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0Esa0JBQWtCLG9CQUFRLEVBQVIsQ0FBbEI7S0FFQSxlQUFlLFVBQVUsb0JBQVYsQ0FBK0IsZUFBL0IsQ0FBZjtLQUVBLGFBQWEsU0FBYixVQUFhLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUMvQixTQUFJLFFBQVEsS0FBSyxLQUFMLENBRG1CO0FBRS9CLFVBQUssR0FBTCxHQUFXLElBQUksT0FBTyxNQUFQLENBQWMsVUFBVSxJQUFWLENBQWUsSUFBZixDQUFsQixFQUF3QyxNQUFNLENBQU4sRUFBUyxNQUFNLENBQU4sRUFBUyxNQUFNLFFBQU4sQ0FBckUsQ0FGK0I7QUFHL0IsZUFBVSxnQkFBVixDQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQUgrQjtBQUkvQixrQkFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBSitCO0VBQXRCO0tBT2IsYUFBYSxTQUFiLFVBQWEsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQy9CLFVBQUssR0FBTCxDQUFTLElBQVQsR0FEK0I7RUFBdEI7O0FBSWpCLFFBQU8sT0FBUCxHQUFpQjtBQUNiLFdBQU0sVUFBTjtBQUNBLFdBQU0sVUFBTjtBQUNBLGFBQVEsWUFBUjtFQUhKLEM7Ozs7OztBQ2xCQTs7QUFHQSxLQUFJLFNBQVMsb0JBQVEsRUFBUixDQUFUOztBQUVKLFFBQU8sT0FBUCxHQUFpQixPQUNiLEVBRGEsRUFFYixvQkFBUSxFQUFSLENBRmEsRUFHYixvQkFBUSxFQUFSLENBSGEsRUFJYixvQkFBUSxFQUFSLENBSmEsRUFLYixvQkFBUSxFQUFSLENBTGEsRUFNYixvQkFBUSxFQUFSLENBTmEsRUFPYixvQkFBUSxFQUFSLENBUGEsRUFRYixvQkFBUSxFQUFSLENBUmEsRUFTYixvQkFBUSxFQUFSLENBVGEsRUFVYixvQkFBUSxFQUFSLENBVmEsRUFXYixvQkFBUSxFQUFSLENBWGEsRUFZYixvQkFBUSxFQUFSLENBWmEsRUFhYixvQkFBUSxFQUFSLENBYmEsRUFjYixvQkFBUSxFQUFSLENBZGEsRUFlYixvQkFBUSxFQUFSLENBZmEsRUFnQmIsb0JBQVEsRUFBUixDQWhCYSxFQWlCYixvQkFBUSxFQUFSLENBakJhLEVBa0JiLG9CQUFRLEVBQVIsQ0FsQmEsRUFtQmIsb0JBQVEsRUFBUixDQW5CYSxFQW9CYixvQkFBUSxFQUFSLENBcEJhLEVBcUJiLG9CQUFRLEVBQVIsQ0FyQmEsRUFzQmIsb0JBQVEsR0FBUixDQXRCYSxFQXVCYixvQkFBUSxHQUFSLENBdkJhLENBQWpCLEM7Ozs7OztBQ0xBOztBQUVBLEtBQUksU0FBUyxvQkFBUSxFQUFSLENBQVQ7O0FBRUosUUFBTyxPQUFQLEdBQWlCLE9BQ2IsRUFEYSxFQUViLG9CQUFRLEVBQVIsQ0FGYSxDQUFqQixDOzs7Ozs7QUNKQTs7QUFFQSxLQUFJLFNBQVMsb0JBQVEsRUFBUixDQUFUOztBQUVKLFFBQU8sT0FBUCxHQUFpQixPQUNiLEVBRGEsRUFFYixvQkFBUSxFQUFSLENBRmEsQ0FBakIsQzs7Ozs7O0FDSkE7O0FBRUEsS0FBSSxRQUFRLG9CQUFRLEVBQVIsQ0FBUjs7QUFFSixRQUFPLE9BQVAsR0FBaUIsTUFBTSxvQkFBTixDQUEyQixDQUFDLE9BQUQsQ0FBM0IsQ0FBakIsQzs7Ozs7O0FDSkE7O0FBRUEsS0FBSSxZQUFZLG9CQUFRLEVBQVIsQ0FBWjtLQUVBLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBVSxLQUFWLEVBQWlCO0FBQ3BDLFlBQU8sTUFBTSxNQUFOLENBQWEsVUFBVSxHQUFWLEVBQWUsSUFBZixFQUFxQjtBQUNyQyxhQUFJLElBQUosSUFBWSxVQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDL0Isa0JBQUssR0FBTCxDQUFTLElBQVQsSUFBaUIsS0FBakIsQ0FEK0I7VUFBdkIsQ0FEeUI7QUFJckMsZ0JBQU8sR0FBUCxDQUpxQztNQUFyQixFQUtqQixFQUxJLENBQVAsQ0FEb0M7RUFBakI7S0FTdkIsK0JBQStCLFNBQS9CLDRCQUErQixDQUFVLE1BQVYsRUFBa0IsS0FBbEIsRUFBeUI7QUFDcEQsWUFBTyxNQUFNLE1BQU4sQ0FBYSxVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLGFBQUksU0FBUyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsV0FBZixFQUFULEdBQXdDLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBeEMsQ0FBSixHQUE2RCxVQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDaEYsa0JBQUssR0FBTCxDQUFTLE1BQVQsRUFBaUIsSUFBakIsSUFBeUIsS0FBekIsQ0FEZ0Y7VUFBdkIsQ0FEeEI7QUFJckMsZ0JBQU8sR0FBUCxDQUpxQztNQUFyQixFQUtqQixFQUxJLENBQVAsQ0FEb0Q7RUFBekI7S0FVL0IsdUJBQXVCLFNBQXZCLG9CQUF1QixDQUFVLEtBQVYsRUFBaUI7QUFDcEMsWUFBTyxNQUFNLE1BQU4sQ0FBYSxVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLGFBQUksSUFBSixJQUFZLFVBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixTQUF2QixFQUFrQyxLQUFsQyxFQUF5QztBQUNqRCxpQkFBSSxRQUFRLEtBQUssR0FBTCxDQUFTLElBQVQsQ0FBUixDQUQ2QztBQUVqRCxpQkFBSSxTQUFTLE1BQU0sQ0FBTixLQUFZLFVBQVUsQ0FBVixFQUFhO0FBQ2xDLHVCQUFNLENBQU4sR0FBVSxNQUFNLENBQU4sQ0FEd0I7Y0FBdEM7QUFHQSxpQkFBSSxTQUFTLE1BQU0sQ0FBTixLQUFZLFVBQVUsQ0FBVixFQUFhO0FBQ2xDLHVCQUFNLENBQU4sR0FBVSxNQUFNLENBQU4sQ0FEd0I7Y0FBdEM7VUFMUSxDQUR5QjtBQVVyQyxhQUFJLE9BQU8sR0FBUCxDQUFKLEdBQWtCLFVBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QjtBQUNyQyxrQkFBSyxHQUFMLENBQVMsSUFBVCxFQUFlLENBQWYsR0FBbUIsS0FBbkIsQ0FEcUM7VUFBdkIsQ0FWbUI7QUFhckMsYUFBSSxPQUFPLEdBQVAsQ0FBSixHQUFrQixVQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDckMsa0JBQUssR0FBTCxDQUFTLElBQVQsRUFBZSxDQUFmLEdBQW1CLEtBQW5CLENBRHFDO1VBQXZCLENBYm1CO0FBZ0JyQyxnQkFBTyxHQUFQLENBaEJxQztNQUFyQixFQWlCakIsRUFqQkksQ0FBUCxDQURvQztFQUFqQjtLQXFCdkIsK0JBQStCLFNBQS9CLDRCQUErQixDQUFVLE1BQVYsRUFBa0IsS0FBbEIsRUFBeUI7QUFDcEQsWUFBTyxNQUFNLE1BQU4sQ0FBYSxVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLGFBQUksZUFBZSxTQUFTLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxXQUFmLEVBQVQsR0FBd0MsS0FBSyxLQUFMLENBQVcsQ0FBWCxDQUF4QyxDQURrQjtBQUVyQyxhQUFJLFlBQUosSUFBb0IsVUFBVSxJQUFWLEVBQWdCLEtBQWhCLEVBQXVCLFNBQXZCLEVBQWtDLEtBQWxDLEVBQXlDO0FBQ3pELGlCQUFJLFFBQVEsS0FBSyxHQUFMLENBQVMsTUFBVCxFQUFpQixJQUFqQixDQUFSLENBRHFEO0FBRXpELGlCQUFJLFNBQVMsTUFBTSxDQUFOLEtBQVksVUFBVSxDQUFWLEVBQWE7QUFDbEMsdUJBQU0sQ0FBTixHQUFVLE1BQU0sQ0FBTixDQUR3QjtjQUF0QztBQUdBLGlCQUFJLFNBQVMsTUFBTSxDQUFOLEtBQVksVUFBVSxDQUFWLEVBQWE7QUFDbEMsdUJBQU0sQ0FBTixHQUFVLE1BQU0sQ0FBTixDQUR3QjtjQUF0QztVQUxnQixDQUZpQjtBQVdyQyxhQUFJLGVBQWUsR0FBZixDQUFKLEdBQTBCLFVBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QjtBQUM3QyxrQkFBSyxHQUFMLENBQVMsTUFBVCxFQUFpQixJQUFqQixFQUF1QixDQUF2QixHQUEyQixLQUEzQixDQUQ2QztVQUF2QixDQVhXO0FBY3JDLGFBQUksZUFBZSxHQUFmLENBQUosR0FBMEIsVUFBVSxJQUFWLEVBQWdCLEtBQWhCLEVBQXVCO0FBQzdDLGtCQUFLLEdBQUwsQ0FBUyxNQUFULEVBQWlCLElBQWpCLEVBQXVCLENBQXZCLEdBQTJCLEtBQTNCLENBRDZDO1VBQXZCLENBZFc7QUFpQnJDLGdCQUFPLEdBQVAsQ0FqQnFDO01BQXJCLEVBa0JqQixFQWxCSSxDQUFQLENBRG9EO0VBQXpCO0tBc0IvQix1QkFBdUIsU0FBdkIsb0JBQXVCLENBQVUsT0FBVixFQUFtQjtBQUN0QyxZQUFPLE9BQU8sSUFBUCxDQUFZLE9BQVosRUFBcUIsTUFBckIsQ0FBNEIsVUFBVSxHQUFWLEVBQWUsS0FBZixFQUFzQjtBQUNyRCxhQUFJLE9BQU8sUUFBUSxLQUFSLENBQVAsQ0FEaUQ7QUFFckQsYUFBSSxLQUFKLElBQWEsVUFBVSxJQUFWLEVBQWdCLEtBQWhCLEVBQXVCO0FBQ2hDLGtCQUFLLEdBQUwsQ0FBUyxJQUFULElBQWlCLEtBQWpCLENBRGdDO1VBQXZCLENBRndDO0FBS3JELGdCQUFPLEdBQVAsQ0FMcUQ7TUFBdEIsRUFNaEMsRUFOSSxDQUFQLENBRHNDO0VBQW5CO0tBU3ZCLDJCQUEyQixTQUEzQix3QkFBMkIsQ0FBVSxPQUFWLEVBQW1CO0FBQzFDLFlBQU8sT0FBTyxJQUFQLENBQVksT0FBWixFQUFxQixNQUFyQixDQUE0QixVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3BELGFBQUksT0FBTyxRQUFRLElBQVIsQ0FBUCxDQURnRDtBQUVwRCxhQUFJLElBQUosSUFBWSxVQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUIsU0FBdkIsRUFBa0MsS0FBbEMsRUFBeUMsT0FBekMsRUFBa0QsSUFBbEQsRUFBd0Q7QUFDaEUsaUJBQUksS0FBSixFQUFXO0FBQ1Asc0JBQUssSUFBTCxFQUFXLEtBQVgsRUFBa0IsSUFBbEIsRUFETztjQUFYO1VBRFEsQ0FGd0M7QUFPcEQsZ0JBQU8sR0FBUCxDQVBvRDtNQUFyQixFQVFoQyxFQVJJLENBQVAsQ0FEMEM7RUFBbkI7S0FXM0IsdUJBQXVCLFNBQXZCLG9CQUF1QixDQUFVLEtBQVYsRUFBaUI7QUFDcEMsWUFBTyxNQUFNLE1BQU4sQ0FBYSxVQUFVLEdBQVYsRUFBZSxJQUFmLEVBQXFCO0FBQ3JDLGFBQUksSUFBSixJQUFZLFVBQVUsSUFBVixFQUFnQixLQUFoQixFQUF1QixTQUF2QixFQUFrQyxLQUFsQyxFQUF5QztBQUNqRCx1QkFBVSxLQUFWLEVBQWlCLHNDQUFqQixFQUF5RCxJQUF6RCxFQUErRCxLQUFLLEdBQUwsQ0FBL0QsQ0FEaUQ7VUFBekMsQ0FEeUI7QUFJckMsZ0JBQU8sR0FBUCxDQUpxQztNQUFyQixFQUtqQixFQUxJLENBQVAsQ0FEb0M7RUFBakI7O0FBUzNCLFFBQU8sT0FBUCxHQUFpQjtBQUNiLDJCQUFzQixvQkFBdEI7QUFDQSxtQ0FBOEIsNEJBQTlCO0FBQ0EsMkJBQXNCLG9CQUF0QjtBQUNBLG1DQUE4Qiw0QkFBOUI7QUFDQSwyQkFBc0Isb0JBQXRCO0FBQ0EsK0JBQTBCLHdCQUExQjtBQUNBLDJCQUFzQixvQkFBdEI7RUFQSixDOzs7Ozs7QUMvRkE7O0FBRUEsS0FBSSxRQUFRLG9CQUFRLEVBQVIsQ0FBUjs7QUFFSixRQUFPLE9BQVAsR0FBaUIsTUFBTSxvQkFBTixDQUEyQjtBQUN4QyxlQUFVLEtBQVY7RUFEYSxDQUFqQixDOzs7Ozs7QUNKQTs7QUFJQSxLQUFJLHVCQUF1QixvQkFBUSxFQUFSLEVBQW9CLG9CQUFwQjs7QUFFM0IsUUFBTyxPQUFQLEdBQWlCLHFCQUFxQixDQUFDLE9BQUQsQ0FBckIsQ0FBakIsQzs7Ozs7O0FDTkE7O0FBRUEsUUFBTyxPQUFQLEdBQWlCLEVBQWpCLEM7Ozs7OztBQ0ZBOztBQUlBLEtBQUksdUJBQXVCLG9CQUFRLEVBQVIsRUFBb0Isb0JBQXBCOztBQUUzQixRQUFPLE9BQVAsR0FBaUIscUJBQXFCLENBQUMsVUFBRCxDQUFyQixDQUFqQjs7Ozs7Ozs7O0FDTkE7O0FBRUEsUUFBTyxPQUFQLEdBQWlCLEVBQWpCLEM7Ozs7OztBQ0ZBOztBQUVBLFFBQU8sT0FBUCxHQUFpQixFQUFqQixDOzs7Ozs7QUNGQTs7QUFDQSxRQUFPLE9BQVAsR0FBaUIsRUFBakIsQzs7Ozs7O0FDREE7O0FBRUEsUUFBTyxPQUFQLEdBQWlCLEVBQWpCLEM7Ozs7OztBQ0ZBOztBQUVBLFFBQU8sT0FBUCxHQUFpQixFQUFqQixDOzs7Ozs7QUNGQTs7QUFFQSxRQUFPLE9BQVAsR0FBaUIsRUFBakIsQzs7Ozs7O0FDRkE7O0FBRUEsUUFBTyxPQUFQLEdBQWlCLEVBQWpCLEM7Ozs7OztBQ0ZBOztBQUVBLFFBQU8sT0FBUCxHQUFpQixFQUFqQixDOzs7Ozs7QUNGQTs7QUFFQSxRQUFPLE9BQVAsR0FBaUIsRUFBakIsQzs7Ozs7O0FDRkE7O0FBSUEsS0FBSSx1QkFBdUIsb0JBQVEsRUFBUixFQUFvQixvQkFBcEI7O0FBRTNCLFFBQU8sT0FBUCxHQUFpQixxQkFBcUIsQ0FBQyxrQkFBRCxFQUFxQixpQkFBckIsQ0FBckIsQ0FBakI7Ozs7Ozs7OztBQ05BOztBQUVBLEtBQUksdUJBQXVCLG9CQUFRLEVBQVIsRUFBb0Isb0JBQXBCOztBQUUzQixRQUFPLE9BQVAsR0FBaUIscUJBQXFCLENBQUMsT0FBRCxFQUFVLFVBQVYsQ0FBckIsQ0FBakIsQzs7Ozs7O0FDSkE7O0FBRUEsS0FBSSx1QkFBdUIsb0JBQVEsRUFBUixFQUFvQixvQkFBcEI7O0FBRTNCLFFBQU8sT0FBUCxHQUFpQixxQkFBcUIsQ0FBQyxPQUFELEVBQVUsV0FBVixDQUFyQixDQUFqQixDOzs7Ozs7QUNKQTs7QUFFQSxRQUFPLE9BQVAsR0FBaUIsRUFBakIsQzs7Ozs7O0FDRkE7O0FBRUEsS0FBSSxTQUFTLG9CQUFRLEVBQVIsQ0FBVDtLQUNBLFFBQVEsb0JBQVEsRUFBUixDQUFSOztBQUVKLFFBQU8sT0FBUCxHQUFpQixPQUNiLEVBRGEsRUFFYixNQUFNLG9CQUFOLENBQTJCLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBM0IsQ0FGYSxFQUdiLG9CQUFRLEVBQVIsQ0FIYSxDQUFqQixDOzs7Ozs7QUNMQTs7QUFFQSxLQUFJLFNBQVMsb0JBQVEsRUFBUixDQUFUO0tBQ0EsUUFBUSxvQkFBUSxFQUFSLENBQVI7S0FDQSxZQUFZLG9CQUFRLEVBQVIsQ0FBWjs7QUFFSixRQUFPLE9BQVAsR0FBaUIsT0FDYixFQURhLEVBRWIsTUFBTSw0QkFBTixDQUFtQyxNQUFuQyxFQUEyQyxDQUFDLFdBQUQsRUFBYyxvQkFBZCxDQUEzQyxDQUZhLEVBR2IsTUFBTSw0QkFBTixDQUFtQyxNQUFuQyxFQUEyQyxDQUFDLFFBQUQsRUFBVyxTQUFYLENBQTNDLENBSGEsRUFJYixNQUFNLHdCQUFOLENBQStCO0FBQzNCLGtCQUFhLHFCQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUIsSUFBdkIsRUFBNkI7QUFDdEMsYUFBSSxVQUFVLFVBQVUsT0FBVixDQUFrQixJQUFsQixFQUF3QixJQUF4QixDQUFWO2FBQ0EsU0FBUyxVQUFVLElBQVYsR0FBaUIsS0FBakIsR0FBeUIsUUFBUSxNQUFSLENBRkE7O0FBSXRDLGlCQUFRLE1BQVIsQ0FBZSxLQUFLLEdBQUwsRUFBVSxNQUF6QixFQUpzQztNQUE3QjtFQURqQixDQUphLENBQWpCLEM7Ozs7OztBQ05BOztBQUVBLFFBQU8sT0FBUCxHQUFpQixFQUFqQixDOzs7Ozs7QUNGQTs7QUFFQSxRQUFPLE9BQVAsR0FBaUIsRUFBakIsQzs7Ozs7O0FDRkE7O0FBRUEsS0FBSSx1QkFBdUIsb0JBQVEsRUFBUixFQUFvQixvQkFBcEI7O0FBRTNCLFFBQU8sT0FBUCxHQUFpQixxQkFBcUIsQ0FBQyxVQUFELENBQXJCLENBQWpCLEM7Ozs7OztBQ0pBOztBQUVBLEtBQUksWUFBWSxvQkFBUSxFQUFSLENBQVo7S0FDQSxpQkFBaUIsb0JBQVEsR0FBUixDQUFqQjtLQUVBLGNBQWMsVUFBVSxvQkFBVixDQUErQixjQUEvQixDQUFkO0tBRUEsWUFBWSxTQUFaLFNBQVksQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQzlCLFVBQUssR0FBTCxHQUFXLElBQUksT0FBTyxLQUFQLENBQWEsVUFBVSxJQUFWLENBQWUsSUFBZixDQUFqQixDQUFYLENBRDhCO0FBRTlCLGVBQVUsZ0JBQVYsQ0FBMkIsSUFBM0IsRUFBaUMsSUFBakMsRUFGOEI7QUFHOUIsaUJBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUg4QjtFQUF0QjtLQU1aLFlBQVksU0FBWixTQUFZLENBQVUsSUFBVixFQUFnQjtBQUN4QixVQUFLLEdBQUwsQ0FBUyxJQUFULEdBRHdCO0VBQWhCLENBRVY7O0FBRU4sUUFBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTSxTQUFOO0FBQ0EsV0FBTSxTQUFOO0FBQ0EsYUFBUSxXQUFSO0VBSEosQzs7Ozs7O0FDakJBOztBQUdBLEtBQUksU0FBUyxvQkFBUSxFQUFSLENBQVQ7S0FDQSx1QkFBdUIsb0JBQVEsRUFBUixFQUFvQixvQkFBcEI7O0FBRTNCLFFBQU8sT0FBUCxHQUFpQixPQUNiLEVBRGEsRUFFYixvQkFBUSxFQUFSLENBRmEsRUFHYixxQkFBcUIsQ0FBQyxZQUFELENBQXJCLENBSGEsQ0FBakIsQzs7Ozs7O0FDTkE7O0FBRUEsS0FBSSxZQUFZLG9CQUFRLEVBQVIsQ0FBWjtLQUVBLGdCQUFnQixTQUFoQixhQUFnQixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDbEMsU0FBSSxhQUFhLFVBQVUsTUFBVixDQUFpQixJQUFqQixFQUF1QixJQUF2QixDQUFiLENBRDhCO0FBRWxDLFVBQUssR0FBTCxHQUFXLFdBQVcsR0FBWCxDQUFlLFVBQWYsQ0FBMEIsR0FBMUIsQ0FBOEIsS0FBSyxLQUFMLENBQVcsRUFBWCxFQUFlLEtBQUssS0FBTCxDQUFXLE1BQVgsRUFBbUIsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQTNGLENBRmtDO0VBQXRCOztBQUtwQixRQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFNLGFBQU47QUFDQSxXQUFNLElBQU47QUFDQSxhQUFRLElBQVI7RUFISixDOzs7Ozs7QUNUQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0EsYUFBYSxvQkFBUSxHQUFSLENBQWI7S0FFQSxlQUFlLFNBQWYsWUFBZSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDakMsU0FBSSxJQUFJLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxDQUFmO1NBQ0EsSUFBSSxLQUFLLE1BQUwsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWhCO1NBQ0EsT0FBTyxXQUFXLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBbEI7U0FDQSxZQUFZLFVBQVUsU0FBVixDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFaLENBSjZCOztBQU1qQyxVQUFLLEdBQUwsR0FBVztBQUNQLFlBQUcsQ0FBSDtBQUNBLFlBQUcsQ0FBSDtBQUNBLG1CQUFVLGtCQUFVLE9BQVYsRUFBbUI7QUFDekIscUJBQVEsSUFBUixDQUFhLE9BQWIsQ0FBcUIsSUFBckIsRUFBMkIsT0FBM0IsQ0FBbUMsRUFBRSxHQUFGLEVBQU8sRUFBRSxHQUFGLENBQTFDLENBRHlCO1VBQW5CO01BSGQsQ0FOaUM7O0FBY2pDLGVBQVUsaUJBQVYsQ0FBNEIsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUE1QixDQWRpQztFQUF0QjtLQWlCZixlQUFlLFNBQWYsWUFBZSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDakMsU0FBSSxZQUFZLFVBQVUsU0FBVixDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFaLENBRDZCO0FBRWpDLGVBQVUsb0JBQVYsQ0FBK0IsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUEvQixDQUZpQztFQUF0Qjs7QUFLbkIsUUFBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTSxZQUFOO0FBQ0EsV0FBTSxZQUFOO0FBQ0EsYUFBUSxJQUFSO0VBSEosQzs7Ozs7O0FDM0JBOztBQUVBLEtBQUksUUFBUSxFQUFSOztBQUVKLE9BQU0sT0FBTyxPQUFQLENBQWUsTUFBZixDQUFOLEdBQStCLFFBQS9CO0FBQ0EsT0FBTSxPQUFPLE9BQVAsQ0FBZSxLQUFmLENBQU4sR0FBOEIsT0FBOUI7QUFDQSxPQUFNLE9BQU8sT0FBUCxDQUFlLFFBQWYsQ0FBTixHQUFpQyxVQUFqQztBQUNBLE9BQU0sT0FBTyxPQUFQLENBQWUsUUFBZixDQUFOLEdBQWlDLFFBQWpDO0FBQ0EsT0FBTSxPQUFPLE9BQVAsQ0FBZSxLQUFmLENBQU4sR0FBOEIsT0FBOUI7QUFDQSxPQUFNLE9BQU8sT0FBUCxDQUFlLElBQWYsQ0FBTixHQUE2QixJQUE3Qjs7QUFFQSxRQUFPLE9BQVAsR0FBaUIsVUFBVSxNQUFWLEVBQWtCO0FBQy9CLFlBQU8sTUFBTSxNQUFOLEtBQWlCLFFBQWpCLENBRHdCO0VBQWxCLEM7Ozs7OztBQ1hqQjs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0EsYUFBYSxvQkFBUSxHQUFSLENBQWI7S0FFQSxlQUFlLFNBQWYsWUFBZSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDakMsU0FBSSxJQUFJLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxDQUFmO1NBQ0EsSUFBSSxLQUFLLE1BQUwsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWhCO1NBQ0EsT0FBTyxXQUFXLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBbEI7U0FDQSxZQUFZLFVBQVUsU0FBVixDQUFvQixJQUFwQixFQUEwQixJQUExQixDQUFaO1NBQ0EsWUFBWSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBTGlCOztBQU9qQyxVQUFLLEdBQUwsR0FBVztBQUNQLFlBQUcsQ0FBSDtBQUNBLFlBQUcsQ0FBSDtBQUNBLG1CQUFVLGtCQUFVLE9BQVYsRUFBbUI7QUFDekIscUJBQVEsSUFBUixDQUFhLE9BQWIsQ0FBcUIsSUFBckIsRUFBMkIsT0FBM0IsQ0FBbUMsRUFBRSxHQUFGLEVBQU8sRUFBRSxHQUFGLEVBQU8sVUFBVSxZQUFWLEVBQXdCLFlBQXhCLEVBQXNDO0FBQ25GLDJCQUFVLEtBQUssS0FBTCxDQUFXLGFBQWEsT0FBYixDQUFyQixFQUE0QyxLQUFLLEtBQUwsQ0FBVyxhQUFhLE9BQWIsQ0FBdkQsRUFBOEUsT0FBOUUsRUFBdUYsQ0FBdkYsRUFBMEYsQ0FBMUYsRUFEbUY7Y0FBdEMsQ0FBakQsQ0FEeUI7VUFBbkI7TUFIZCxDQVBpQzs7QUFpQmpDLGVBQVUsaUJBQVYsQ0FBNEIsS0FBSyxHQUFMLENBQVMsUUFBVCxDQUE1QixDQWpCaUM7RUFBdEI7S0FvQmYsZUFBZSxTQUFmLFlBQWUsQ0FBVSxLQUFWLEVBQWlCLElBQWpCLEVBQXVCO0FBQ2xDLFdBQU0sUUFBTixDQUFlLG9CQUFmLENBQW9DLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBcEMsQ0FEa0M7RUFBdkI7O0FBSW5CLFFBQU8sT0FBUCxHQUFpQjtBQUNiLFdBQU0sWUFBTjtBQUNBLFdBQU0sWUFBTjtBQUNBLGFBQVEsSUFBUjtFQUhKLEM7Ozs7OztBQzdCQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0EsZ0JBQWdCLG9CQUFRLEdBQVIsQ0FBaEI7S0FFQSxhQUFhLFVBQVUsb0JBQVYsQ0FBK0IsYUFBL0IsQ0FBYjtLQUVBLFdBQVcsU0FBWCxRQUFXLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUM3QixTQUFJLFFBQVEsS0FBSyxLQUFMO1NBQ1IsT0FBTyxJQUFJLE9BQU8sSUFBUCxDQUFZLFVBQVUsSUFBVixDQUFlLElBQWYsQ0FBaEIsRUFBc0MsQ0FBdEMsRUFBeUMsQ0FBekMsRUFBNEMsTUFBTSxJQUFOLEVBQVksTUFBTSxLQUFOLENBQS9EO1NBQ0EsWUFBWSxVQUFVLE1BQVYsQ0FBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsR0FBN0I7U0FDWixJQUFJLE1BQU0sQ0FBTixJQUFZLE1BQU0sS0FBTixJQUFlLENBQUMsVUFBVSxLQUFWLEdBQWtCLEtBQUssS0FBTCxDQUFuQixJQUFrQyxNQUFNLEtBQU4sQ0FBWSxPQUFaLENBQW9CLE9BQXBCLEtBQWdDLENBQWhDLEdBQW9DLENBQXBDLEdBQ3hELE1BQU0sS0FBTixDQUFZLE9BQVosQ0FBb0IsUUFBcEIsS0FBaUMsQ0FBakMsR0FBcUMsRUFBckMsR0FBMEMsQ0FBMUMsQ0FEc0IsSUFDNEIsQ0FEdkQ7U0FFSixJQUFJLE1BQU0sQ0FBTixJQUFZLE1BQU0sS0FBTixJQUFlLENBQUMsVUFBVSxNQUFWLEdBQW1CLEtBQUssTUFBTCxDQUFwQixJQUFvQyxNQUFNLEtBQU4sQ0FBWSxPQUFaLENBQW9CLFFBQXBCLEtBQWlDLENBQWpDLEdBQXFDLENBQXJDLEdBQzFELE1BQU0sS0FBTixDQUFZLE9BQVosQ0FBb0IsUUFBcEIsS0FBaUMsQ0FBakMsR0FBcUMsRUFBckMsR0FBMEMsQ0FBMUMsQ0FEc0IsSUFDNEIsQ0FEdkQsQ0FOcUI7O0FBUzdCLFVBQUssQ0FBTCxHQUFTLENBQVQsQ0FUNkI7QUFVN0IsVUFBSyxDQUFMLEdBQVMsQ0FBVCxDQVY2QjtBQVc3QixVQUFLLEdBQUwsR0FBVyxJQUFYLENBWDZCO0FBWTdCLGVBQVUsZ0JBQVYsQ0FBMkIsSUFBM0IsRUFBaUMsSUFBakMsRUFaNkI7RUFBdEI7S0FlWCxXQUFXLFNBQVgsUUFBVyxDQUFVLEtBQVYsRUFBaUIsSUFBakIsRUFBdUI7QUFDOUIsVUFBSyxHQUFMLENBQVMsSUFBVCxHQUQ4QjtFQUF2Qjs7QUFJZixRQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFNLFFBQU47QUFDQSxXQUFNLFFBQU47QUFDQSxhQUFRLFVBQVI7RUFISixDOzs7Ozs7QUMxQkE7O0FBR0EsS0FBSSxTQUFTLG9CQUFRLEVBQVIsQ0FBVDtLQUNBLFFBQVEsb0JBQVEsRUFBUixDQUFSOztBQUVKLFFBQU8sT0FBUCxHQUFpQixPQUNiLEVBRGEsRUFFYixvQkFBUSxFQUFSLENBRmEsRUFHYixNQUFNLG9CQUFOLENBQTJCLENBQUMsTUFBRCxDQUEzQixDQUhhLENBQWpCLEM7Ozs7OztBQ05BOztBQUVBLEtBQUksWUFBWSxvQkFBUSxFQUFSLENBQVo7S0FDQSxrQkFBa0Isb0JBQVEsR0FBUixDQUFsQjtLQUVBLGVBQWUsVUFBVSxvQkFBVixDQUErQixlQUEvQixDQUFmO0tBRUEsYUFBYSxTQUFiLFVBQWEsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQy9CLFNBQUksUUFBUSxLQUFLLEtBQUw7U0FDUixNQUFNLE1BQU0sUUFBTjtTQUNOLE9BQU8sVUFBVSxJQUFWLENBQWUsSUFBZixDQUFQLENBSDJCOztBQUsvQixVQUFLLE1BQUwsR0FBYyxJQUFJLE9BQU8sTUFBUCxDQUNkLElBRFUsRUFFVixNQUFNLENBQU4sRUFDQSxNQUFNLENBQU4sRUFDQSxHQUpVLEVBS1YsTUFBTSxPQUFOLEVBQ0EsSUFOVSxFQU9WLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FQVSxFQVFWLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FSVSxFQVNWLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FUVSxFQVVWLE1BQU0sTUFBTixDQUFhLENBQWIsQ0FWVSxDQUFkLENBTCtCOztBQWtCL0IsU0FBSSxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ3JCLGNBQUssR0FBTCxHQUFXLElBQUksT0FBTyxLQUFQLENBQWEsSUFBakIsQ0FBWCxDQURxQjtBQUVyQixjQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsS0FBSyxNQUFMLENBQWIsQ0FGcUI7TUFBekIsTUFHTztBQUNILGNBQUssR0FBTCxHQUFXLEtBQUssTUFBTCxDQURSO01BSFA7O0FBT0EsZUFBVSxnQkFBVixDQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQXpCK0I7QUEwQi9CLGtCQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUExQitCO0VBQXRCO0tBNkJiLGFBQWEsU0FBYixVQUFhLENBQVUsS0FBVixFQUFpQixJQUFqQixFQUF1QjtBQUNoQyxVQUFLLEdBQUwsQ0FBUyxJQUFULEdBRGdDO0VBQXZCOztBQUlqQixRQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFNLFVBQU47QUFDQSxXQUFNLFVBQU47QUFDQSxhQUFRLFlBQVI7RUFISixDOzs7Ozs7QUN4Q0E7O0FBR0EsS0FBSSxTQUFTLG9CQUFRLEVBQVIsQ0FBVDs7QUFFSixRQUFPLE9BQVAsR0FBaUIsT0FDYixFQURhLEVBRWIsb0JBQVEsR0FBUixDQUZhLENBQWpCLEM7Ozs7OztBQ0xBOztBQUdBLEtBQUksU0FBUyxvQkFBUSxFQUFSLENBQVQ7O0FBRUosUUFBTyxPQUFQLEdBQWlCLE9BQ2IsRUFEYSxFQUViLG9CQUFRLEVBQVIsQ0FGYSxFQUdiLG9CQUFRLEVBQVIsQ0FIYSxFQUliLG9CQUFRLEVBQVIsQ0FKYSxFQUtiLG9CQUFRLEVBQVIsQ0FMYSxFQU1iLG9CQUFRLEVBQVIsQ0FOYSxFQU9iLG9CQUFRLEVBQVIsQ0FQYSxFQVFiLG9CQUFRLEVBQVIsQ0FSYSxFQVNiLG9CQUFRLEVBQVIsQ0FUYSxFQVViLG9CQUFRLEVBQVIsQ0FWYSxFQVdiLG9CQUFRLEVBQVIsQ0FYYSxFQVliLG9CQUFRLEVBQVIsQ0FaYSxFQWFiLG9CQUFRLEVBQVIsQ0FiYSxFQWNiLG9CQUFRLEVBQVIsQ0FkYSxFQWViLG9CQUFRLEVBQVIsQ0FmYSxFQWdCYixvQkFBUSxFQUFSLENBaEJhLEVBaUJiLG9CQUFRLEVBQVIsQ0FqQmEsRUFrQmIsb0JBQVEsR0FBUixDQWxCYSxDQUFqQixDOzs7Ozs7QUNMQTs7QUFFQSxLQUFJLFNBQVMsb0JBQVEsRUFBUixDQUFUOztBQUVKLFFBQU8sT0FBUCxHQUFpQixPQUNiO0FBQ0ksZUFBVSxvQkFBUSxHQUFSLENBQVY7QUFDQSxvQkFBZSxvQkFBUSxHQUFSLENBQWY7QUFDQSxrQkFBYSxvQkFBUSxHQUFSLENBQWI7RUFKUyxFQU1iLG9CQUFRLEdBQVIsQ0FOYSxDQUFqQixDOzs7Ozs7QUNKQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0Esb0JBQW9CLG9CQUFRLEdBQVIsQ0FBcEI7S0FFQSxpQkFBaUIsVUFBVSxvQkFBVixDQUErQixpQkFBL0IsQ0FBakI7S0FFQSxZQUFZLG9CQUFRLEdBQVIsQ0FBWjtLQUVBLGVBQWUsU0FBZixZQUFlLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUNqQyxTQUFJLFFBQVEsS0FBSyxLQUFMLENBRHFCO0FBRWpDLFVBQUssR0FBTCxHQUFXLElBQUksT0FBTyxRQUFQLENBQWdCLFVBQVUsSUFBVixDQUFlLElBQWYsQ0FBcEIsRUFBMEMsTUFBTSxDQUFOLEVBQVMsTUFBTSxDQUFOLENBQTlELENBRmlDO0FBR2pDLGVBQVUsZ0JBQVYsQ0FBMkIsSUFBM0IsRUFBaUMsSUFBakMsRUFIaUM7QUFJakMsb0JBQWUsSUFBZixFQUFxQixJQUFyQixFQUppQztFQUF0QjtLQU9mLGVBQWUsU0FBZixZQUFlLENBQVUsSUFBVixFQUFnQjtBQUMzQixVQUFLLEdBQUwsQ0FBUyxJQUFULEdBRDJCO0VBQWhCO0tBSWYsaUJBQWlCLFNBQWpCLGNBQWlCLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixXQUF0QixFQUFtQztBQUNoRCxpQkFBWSw2QkFBWixDQUEwQyxLQUFLLEVBQUwsQ0FBMUMsQ0FEZ0Q7QUFFaEQsVUFBSyxJQUFMLEVBQVcsSUFBWCxFQUZnRDtFQUFuQztLQUtqQixTQUFTLFNBQVQsTUFBUyxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDM0IsVUFBSyxHQUFMLENBQVMsS0FBVCxHQUQyQjtBQUUzQixVQUFLLElBQUwsRUFBVyxJQUFYLEVBRjJCO0VBQXRCO0tBS1QsT0FBTyxTQUFQLElBQU8sQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQ3pCLFVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBc0IsR0FBMUMsRUFBK0M7QUFDM0MsYUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBWCxDQUFSLENBRHVDO0FBRTNDLGFBQUksVUFBVSxNQUFNLEdBQU4sQ0FBZCxFQUEwQjtBQUN0Qix1QkFBVSxNQUFNLEdBQU4sQ0FBVixDQUFxQixJQUFyQixDQUEwQixLQUExQixFQUFpQyxJQUFqQyxFQUF1QyxLQUFLLEdBQUwsRUFBVSxDQUFqRCxFQUFvRCxDQUFwRCxFQURzQjtVQUExQjtNQUZKO0VBREc7O0FBU1gsUUFBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTSxZQUFOO0FBQ0EscUJBQWdCLGNBQWhCO0FBQ0EsV0FBTSxZQUFOO0FBQ0EsYUFBUSxjQUFSO0FBQ0Esd0JBQW1CLE1BQW5CO0VBTEosQzs7Ozs7O0FDdkNBOztBQUVBLEtBQUksU0FBUyxvQkFBUSxFQUFSLENBQVQ7O0FBRUosUUFBTyxPQUFQLEdBQWlCLE9BQ2IsRUFEYSxFQUViLG9CQUFRLEdBQVIsQ0FGYSxFQUdiLG9CQUFRLEVBQVIsQ0FIYSxFQUliLG9CQUFRLEVBQVIsQ0FKYSxFQUtiLG9CQUFRLEVBQVIsQ0FMYSxFQU1iLG9CQUFRLEVBQVIsQ0FOYSxFQU9iLG9CQUFRLEVBQVIsQ0FQYSxFQVFiLG9CQUFRLEVBQVIsQ0FSYSxFQVNiLG9CQUFRLEVBQVIsQ0FUYSxFQVViLG9CQUFRLEVBQVIsQ0FWYSxFQVdiLG9CQUFRLEVBQVIsQ0FYYSxFQVliLG9CQUFRLEVBQVIsQ0FaYSxFQWFiLG9CQUFRLEVBQVIsQ0FiYSxDQUFqQixDOzs7Ozs7QUNKQTs7QUFFQSxLQUFJLFNBQVMsb0JBQVEsRUFBUixDQUFUOztBQUVKLFFBQU8sT0FBUCxHQUFpQixPQUNiLEVBRGEsRUFFYixvQkFBUSxFQUFSLENBRmEsQ0FBakIsQzs7Ozs7Ozs7QUNKQSxLQUFJLHFCQUFxQixvQkFBUSxHQUFSLENBQXJCO0tBRUEsWUFBWTtBQUNSLFVBQUssYUFBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDO0FBQ3pDLGtCQUFTLEdBQVQsQ0FDSSxNQUFNLEtBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEIsQ0FBTixFQUNBLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQixDQUFOLEVBQ0EsS0FBSyxLQUFMLENBQVcsTUFBWCxJQUFxQixDQUFyQixFQUNBLEtBQUssS0FBTCxDQUFXLFVBQVgsSUFBeUIsQ0FBekIsRUFDQSxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLElBQUksS0FBSyxFQUFMLEVBQzNCLEtBQUssS0FBTCxDQUFXLGFBQVgsSUFBNEIsS0FBNUIsRUFDQSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBUEosQ0FEeUM7TUFBeEM7QUFXTCxhQUFRLGdCQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDNUMsa0JBQVMsVUFBVCxDQUNJLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQixDQUFOLEVBQ0EsTUFBTSxLQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLENBQWhCLENBQU4sRUFDQSxLQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLENBQXZCLENBSEosQ0FENEM7TUFBeEM7QUFPUixjQUFTLGlCQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDN0Msa0JBQVMsV0FBVCxDQUNJLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQixDQUFOLEVBQ0EsTUFBTSxLQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLENBQWhCLENBQU4sRUFDQSxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLENBQXBCLEVBQ0EsS0FBSyxLQUFMLENBQVcsTUFBWCxJQUFxQixDQUFyQixDQUpKLENBRDZDO01BQXhDO0FBUVQsV0FBTSxjQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDMUMsa0JBQVMsUUFBVCxDQUNJLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQixDQUFOLEVBQ0EsTUFBTSxLQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLENBQWhCLENBQU4sRUFDQSxLQUFLLEtBQUwsQ0FBVyxLQUFYLElBQW9CLENBQXBCLEVBQ0EsS0FBSyxLQUFMLENBQVcsTUFBWCxJQUFxQixDQUFyQixDQUpKLENBRDBDO01BQXhDO0FBUU4sa0JBQWEscUJBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixRQUF0QixFQUFnQyxFQUFoQyxFQUFvQyxFQUFwQyxFQUF3QztBQUNqRCxrQkFBUyxlQUFULENBQ0ksTUFBTSxLQUFLLEtBQUwsQ0FBVyxDQUFYLElBQWdCLENBQWhCLENBQU4sRUFDQSxNQUFNLEtBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEIsQ0FBTixFQUNBLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsQ0FBcEIsRUFDQSxLQUFLLEtBQUwsQ0FBVyxNQUFYLElBQXFCLENBQXJCLEVBQ0EsS0FBSyxLQUFMLENBQVcsTUFBWCxJQUFxQixDQUFyQixDQUxKLENBRGlEO01BQXhDO0FBU2IsV0FBTSxjQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDMUMsa0JBQVMsTUFBVCxDQUNJLE1BQU0sS0FBSyxLQUFMLENBQVcsRUFBWCxJQUFpQixDQUFqQixDQUFOLEVBQ0EsTUFBTSxLQUFLLEtBQUwsQ0FBVyxFQUFYLElBQWlCLENBQWpCLENBQU4sQ0FGSixDQUQwQztBQUsxQyxrQkFBUyxNQUFULENBQ0ksTUFBTSxLQUFLLEtBQUwsQ0FBVyxFQUFYLElBQWlCLENBQWpCLENBQU4sRUFDQSxNQUFNLEtBQUssS0FBTCxDQUFXLEVBQVgsSUFBaUIsQ0FBakIsQ0FBTixDQUZKLENBTDBDO01BQXhDO0FBVU4sYUFBUSxnQkFBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDLEVBQWhDLEVBQW9DLEVBQXBDLEVBQXdDO0FBQzVDLGtCQUFTLE1BQVQsQ0FDSSxNQUFNLEtBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEIsQ0FBTixFQUNBLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQixDQUFOLENBRkosQ0FENEM7TUFBeEM7QUFNUix1QkFBa0IsMEJBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQixRQUF0QixFQUFnQyxFQUFoQyxFQUFvQyxFQUFwQyxFQUF3QztBQUN0RCxrQkFBUyxnQkFBVCxDQUNJLEtBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIsRUFBakIsRUFDQSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEVBQWpCLEVBQ0EsS0FBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLEVBQWYsRUFDQSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsRUFBZixDQUpKLENBRHNEO01BQXhDO0FBUWxCLG9CQUFlLHVCQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDbkQsa0JBQVMsZ0JBQVQsQ0FDSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEVBQWpCLEVBQ0EsS0FBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixFQUFqQixFQUNBLEtBQUssS0FBTCxDQUFXLElBQVgsR0FBa0IsRUFBbEIsRUFDQSxLQUFLLEtBQUwsQ0FBVyxJQUFYLEdBQWtCLEVBQWxCLEVBQ0EsS0FBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLEVBQWYsRUFDQSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsRUFBZixDQU5KLENBRG1EO01BQXhDO0FBVWYsWUFBTyxlQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDM0MsYUFBSSxNQUFNLE1BQU0sS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixDQUFoQixDQUFOO2FBQ04sTUFBTSxNQUFNLEtBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEIsQ0FBTixDQUZpQzs7QUFJM0MsYUFBSSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWM7QUFDZCxpQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBYSxPQUFiLENBQXFCLEtBQXJCLEVBQTRCLEVBQTVCLEVBQWdDLEtBQWhDLENBQXNDLGlCQUF0QyxDQUFSLENBRFU7QUFFZCxrQkFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksTUFBTSxNQUFOLEVBQWMsR0FBbEMsRUFBdUM7QUFDbkMscUJBQUksT0FBTyxNQUFNLENBQU4sQ0FBUDtxQkFDQSxVQUFVLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBVjtxQkFDQSxJQUFJLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBc0IsR0FBdEIsQ0FBMEIsVUFBVSxDQUFWLEVBQWE7QUFDdkMsNEJBQU8sV0FBVyxDQUFYLENBQVAsQ0FEdUM7a0JBQWIsQ0FBOUIsQ0FIK0I7O0FBT25DLHlCQUFRLE9BQVI7QUFDSSwwQkFBSyxHQUFMO0FBQ0ksa0NBQVMsR0FBVCxDQUFhLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLENBQXJDLEVBQTJDLEVBQUUsQ0FBRixDQUEzQyxFQUFpRCxFQUFFLENBQUYsQ0FBakQsRUFBdUQsQ0FBQyxDQUFDLEVBQUUsQ0FBRixDQUFELEVBQU8sRUFBRSxDQUFGLENBQS9ELEVBREo7QUFFSSwrQkFGSjtBQURKLDBCQUlTLEdBQUw7QUFDSSxrQ0FBUyxNQUFULENBQWdCLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLENBQTVCLENBREo7QUFFSSwrQkFGSjtBQUpKLDBCQU9TLEdBQUw7QUFDSSxrQ0FBUyxVQUFULENBQW9CLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLENBQTVDLEVBREo7QUFFSSwrQkFGSjtBQVBKLDBCQVVTLEdBQUw7QUFDSSxrQ0FBUyxXQUFULENBQXFCLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLENBQTdDLEVBQW1ELEVBQUUsQ0FBRixDQUFuRCxFQURKO0FBRUksK0JBRko7QUFWSiwwQkFhUyxHQUFMO0FBQ0ksa0NBQVMsUUFBVCxDQUFrQixFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLElBQU8sR0FBUCxFQUFZLEVBQUUsQ0FBRixDQUExQyxFQUFnRCxFQUFFLENBQUYsQ0FBaEQsRUFESjtBQUVJLCtCQUZKO0FBYkosMEJBZ0JTLEdBQUw7QUFDSSxrQ0FBUyxlQUFULENBQXlCLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLENBQWpELEVBQXVELEVBQUUsQ0FBRixDQUF2RCxFQUE2RCxFQUFFLENBQUYsQ0FBN0QsRUFESjtBQUVJLCtCQUZKO0FBaEJKLDBCQW1CUyxHQUFMO0FBQ0ksa0NBQVMsTUFBVCxDQUFnQixFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLElBQU8sR0FBUCxDQUE1QixDQURKO0FBRUksK0JBRko7QUFuQkosMEJBc0JTLEdBQUw7QUFDSSxrQ0FBUyxhQUFULENBQXVCLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLElBQU8sR0FBUCxFQUFZLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLElBQU8sR0FBUCxDQUFuRixDQURKO0FBRUksK0JBRko7QUF0QkosMEJBeUJTLEdBQUw7QUFDSSxrQ0FBUyxnQkFBVCxDQUEwQixFQUFFLENBQUYsSUFBTyxHQUFQLEVBQVksRUFBRSxDQUFGLElBQU8sR0FBUCxFQUFZLEVBQUUsQ0FBRixJQUFPLEdBQVAsRUFBWSxFQUFFLENBQUYsSUFBTyxHQUFQLENBQTlELENBREo7QUFFSSwrQkFGSjtBQXpCSixrQkFQbUM7Y0FBdkM7VUFGSjs7QUF5Q0EsY0FBSyxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBc0IsR0FBdEMsRUFBMkM7QUFDdkMsaUJBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVgsQ0FBUixDQURtQztBQUV2QyxpQkFBSSxVQUFVLE1BQU0sR0FBTixDQUFkLEVBQTBCO0FBQ3RCLDJCQUFVLE1BQU0sR0FBTixDQUFWLENBQXFCLEtBQXJCLEVBQTRCLElBQTVCLEVBQWtDLFFBQWxDLEVBQTRDLEdBQTVDLEVBQWlELEdBQWpELEVBRHNCO2NBQTFCO1VBRko7TUE3Q0c7RUE5RVg7O0FBb0lKLFFBQU8sT0FBUCxHQUFpQixPQUFPLElBQVAsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLENBQThCLFVBQVUsR0FBVixFQUFlLElBQWYsRUFBcUI7QUFDaEUsU0FBSSxJQUFKLElBQVksbUJBQW1CLFVBQVUsSUFBVixDQUFuQixDQUFaLENBRGdFO0FBRWhFLFlBQU8sR0FBUCxDQUZnRTtFQUFyQixFQUc1QyxFQUhjLENBQWpCLEM7Ozs7OztBQ3RJQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0EsU0FBUyxTQUFULE1BQVMsQ0FBVSxJQUFWLEVBQWdCOztBQUV6QixTQUFJLHNCQUFzQixTQUF0QixtQkFBc0IsQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCLFdBQXRCLEVBQW1DO0FBQ3JELGFBQUksV0FBVyxVQUFVLE1BQVYsQ0FBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsVUFBN0IsQ0FBWCxDQURpRDtBQUVyRCxhQUFJLFFBQUosRUFBYztBQUNWLHlCQUFZLDhCQUFaLENBQTJDLFNBQVMsRUFBVCxDQUEzQyxDQURVO1VBQWQ7TUFGa0I7U0FPdEIsU0FBUyxTQUFULE1BQVMsQ0FBVSxJQUFWLEVBQWdCLFNBQWhCLEVBQTJCLElBQTNCLEVBQWlDLFdBQWpDLEVBQThDO0FBQ25ELGFBQUksVUFBVSxZQUFWLENBQXVCLEtBQUssS0FBTCxFQUFZLFNBQW5DLENBQUosRUFBbUQ7QUFDL0MsaUNBQW9CLElBQXBCLEVBQTBCLElBQTFCLEVBQWdDLFdBQWhDLEVBRCtDO1VBQW5EO01BREs7U0FPVCxjQUFjLFNBQWQsV0FBYyxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBaEMsRUFBb0MsRUFBcEMsRUFBd0M7QUFDbEQsYUFBSSxPQUFPLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFvQixXQUEzQjthQUNQLE9BQU8sT0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEtBQXFCLFdBQTVCLElBQ0gsT0FBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEtBQTJCLFdBQWxDLElBQ0EsT0FBTyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEtBQTJCLFdBQWxDLENBSjBDOztBQU1sRCxhQUFJLElBQUosRUFBVTtBQUNOLGlCQUFJLFlBQVksT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEtBQW9CLFdBQTNCLEdBQXlDLEtBQUssS0FBTCxDQUFXLElBQVgsR0FBa0IsUUFBM0Q7aUJBQ1osWUFBWSxPQUFPLEtBQUssS0FBTCxDQUFXLFNBQVgsS0FBeUIsUUFBaEMsR0FBMkMsS0FBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixDQUFsRSxDQUZWO0FBR04sc0JBQVMsU0FBVCxDQUFtQixTQUFuQixFQUE4QixTQUE5QixFQUhNO1VBQVY7QUFLQSxhQUFJLElBQUosRUFBVTtBQUNOLGlCQUFJLFlBQVksT0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEtBQXNCLFdBQTdCLEdBQTJDLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsUUFBL0Q7aUJBQ1osWUFBWSxPQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsS0FBMkIsUUFBbEMsR0FBNkMsS0FBSyxLQUFMLENBQVcsV0FBWCxHQUF5QixDQUF0RTtpQkFDWixZQUFZLE9BQU8sS0FBSyxLQUFMLENBQVcsV0FBWCxLQUEyQixRQUFsQyxHQUE2QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXlCLENBQXRFLENBSFY7QUFJTixzQkFBUyxTQUFULENBQW1CLFNBQW5CLEVBQThCLFNBQTlCLEVBQXlDLFNBQXpDLEVBSk07VUFBVixNQUtPO0FBQ0gsc0JBQVMsU0FBVCxDQUFtQixDQUFuQixFQURHO1VBTFA7O0FBU0EsY0FBSyxJQUFMLEVBQVcsSUFBWCxFQUFpQixRQUFqQixFQUEyQixFQUEzQixFQUErQixFQUEvQixFQXBCa0Q7O0FBc0JsRCxhQUFJLElBQUosRUFBVTtBQUNOLHNCQUFTLE9BQVQsR0FETTtVQUFWO01BdEJVLENBaEJPOztBQTJDekIsWUFBTztBQUNILGVBQU0sbUJBQU47QUFDQSxlQUFNLG1CQUFOO0FBQ0EsaUJBQVEsTUFBUjtBQUNBLGVBQU0sV0FBTjtNQUpKLENBM0N5QjtFQUFoQjs7QUFtRGIsUUFBTyxPQUFQLEdBQWlCLE1BQWpCLEM7Ozs7OztBQ3REQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBQ0Esb0JBQW9CLG9CQUFRLEdBQVIsQ0FBcEI7S0FFQSxpQkFBaUIsVUFBVSxvQkFBVixDQUErQixpQkFBL0IsQ0FBakI7S0FFQSxZQUFZLG9CQUFRLEdBQVIsQ0FBWjtLQUVBLGVBQWUsU0FBZixZQUFlLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUNqQyxVQUFLLEdBQUwsR0FBVyxJQUFJLE9BQU8sUUFBUCxDQUFnQixVQUFVLElBQVYsQ0FBZSxJQUFmLENBQXBCLEVBQTBDLENBQTFDLEVBQTZDLENBQTdDLENBQVgsQ0FEaUM7QUFFakMsb0JBQWUsSUFBZixFQUFxQixJQUFyQixFQUEyQixJQUEzQixFQUZpQztFQUF0QjtLQUtmLGVBQWUsU0FBZixZQUFlLENBQVUsSUFBVixFQUFnQjtBQUMzQixVQUFLLEdBQUwsQ0FBUyxJQUFULEdBRDJCO0VBQWhCO0tBSWYsaUJBQWlCLFNBQWpCLGNBQWlCLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUNuQyxVQUFLLElBQUwsRUFBVyxJQUFYLEVBRG1DOztBQUduQyxTQUFJLE9BQU8sVUFBVSxJQUFWLENBQWUsSUFBZixDQUFQO1NBQ0EsVUFBVSxJQUFJLE9BQU8sYUFBUCxDQUFxQixJQUF6QixFQUErQixLQUFLLEdBQUwsQ0FBUyxLQUFULEVBQWdCLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBekQsQ0FKK0I7O0FBTW5DLGFBQVEsUUFBUixDQUFpQixLQUFLLEdBQUwsRUFBVSxDQUEzQixFQUE4QixDQUE5QixFQU5tQztBQU9uQyxhQUFRLE9BQVIsR0FQbUM7QUFRbkMsVUFBSyxHQUFMLENBQVMsT0FBVCxHQVJtQzs7QUFVbkMsVUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsS0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQixPQUFqRCxFQVZtQztFQUF0QjtLQWNqQixPQUFPLFNBQVAsSUFBTyxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDekIsVUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFzQixHQUExQyxFQUErQztBQUMzQyxhQUFJLFFBQVEsS0FBSyxLQUFMLENBQVcsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFYLENBQVIsQ0FEdUM7QUFFM0MsYUFBSSxVQUFVLE1BQU0sR0FBTixDQUFkLEVBQTBCO0FBQ3RCLHVCQUFVLE1BQU0sR0FBTixDQUFWLENBQXFCLElBQXJCLENBQTBCLEtBQTFCLEVBQWlDLElBQWpDLEVBQXVDLEtBQUssR0FBTCxFQUFVLENBQWpELEVBQW9ELENBQXBELEVBRHNCO1VBQTFCO01BRko7RUFERzs7QUFTWCxRQUFPLE9BQVAsR0FBaUI7QUFDYixXQUFNLFlBQU47QUFDQSxxQkFBZ0IsY0FBaEI7QUFDQSxXQUFNLFlBQU47QUFDQSxhQUFRLGNBQVI7RUFKSixDOzs7Ozs7QUN6Q0E7O0FBRUEsS0FBSSxZQUFZLG9CQUFRLEVBQVIsQ0FBWjtLQUNBLG9CQUFvQixvQkFBUSxHQUFSLENBQXBCO0tBRUEsaUJBQWlCLFVBQVUsb0JBQVYsQ0FBK0IsaUJBQS9CLENBQWpCO0tBRUEsWUFBWSxvQkFBUSxHQUFSLENBQVo7S0FFQSxlQUFlLFNBQWYsWUFBZSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDakMsVUFBSyxHQUFMLEdBQVcsSUFBSSxPQUFPLFFBQVAsQ0FBZ0IsVUFBVSxJQUFWLENBQWUsSUFBZixDQUFwQixFQUEwQyxDQUExQyxFQUE2QyxDQUE3QyxDQUFYLENBRGlDO0FBRWpDLG9CQUFlLElBQWYsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsRUFGaUM7RUFBdEI7S0FLZixlQUFlLFNBQWYsWUFBZSxDQUFVLElBQVYsRUFBZ0I7QUFDM0IsVUFBSyxHQUFMLENBQVMsSUFBVCxHQUQyQjtFQUFoQjtLQUlmLGlCQUFpQixTQUFqQixjQUFpQixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDbkMsVUFBSyxJQUFMLEVBQVcsSUFBWCxFQURtQzs7QUFHbkMsU0FBSSxPQUFPLFVBQVUsSUFBVixDQUFlLElBQWYsQ0FBUDtTQUNBLFVBQVUsSUFBSSxPQUFPLGFBQVAsQ0FBcUIsSUFBekIsRUFBK0IsS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFnQixLQUFLLEdBQUwsQ0FBUyxNQUFULENBQXpELENBSitCOztBQU1uQyxhQUFRLFFBQVIsQ0FBaUIsS0FBSyxHQUFMLEVBQVUsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFObUM7O0FBUW5DLFNBQUksTUFBTSxRQUFRLFNBQVIsRUFBTixDQVIrQjs7QUFVbkMsYUFBUSxPQUFSLEdBVm1DO0FBV25DLFVBQUssR0FBTCxDQUFTLE9BQVQsR0FYbUM7O0FBYW5DLFNBQUksS0FBSyxLQUFMLENBQVcsVUFBWCxJQUF5QixLQUFLLEtBQUwsQ0FBVyxXQUFYLEVBQXdCO0FBQ2pELGFBQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxVQUFYLElBQXlCLFFBQVEsS0FBUjthQUM3QixJQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsSUFBMEIsUUFBUSxNQUFSLENBRmU7O0FBSWpELGNBQUssR0FBTCxHQUFXLEtBQUssSUFBTCxDQUFVLFdBQVYsQ0FBc0IsS0FBSyxLQUFMLENBQVcsUUFBWCxFQUFxQixHQUEzQyxFQUFnRCxDQUFoRCxFQUFtRCxDQUFuRCxDQUFYLENBSmlEO01BQXJELE1BS087QUFDSCxjQUFLLEdBQUwsR0FBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUIsR0FBckMsQ0FBWCxDQURHO01BTFA7RUFiYTtLQXVCakIsT0FBTyxTQUFQLElBQU8sQ0FBVSxJQUFWLEVBQWdCLElBQWhCLEVBQXNCO0FBQ3pCLFVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssUUFBTCxDQUFjLE1BQWQsRUFBc0IsR0FBMUMsRUFBK0M7QUFDM0MsYUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBWCxDQUFSLENBRHVDO0FBRTNDLGFBQUksVUFBVSxNQUFNLEdBQU4sQ0FBZCxFQUEwQjtBQUN0Qix1QkFBVSxNQUFNLEdBQU4sQ0FBVixDQUFxQixJQUFyQixDQUEwQixLQUExQixFQUFpQyxJQUFqQyxFQUF1QyxLQUFLLEdBQUwsRUFBVSxDQUFqRCxFQUFvRCxDQUFwRCxFQURzQjtVQUExQjtNQUZKO0VBREc7O0FBU1gsUUFBTyxPQUFQLEdBQWlCO0FBQ2IsV0FBTSxZQUFOO0FBQ0EscUJBQWdCLGNBQWhCO0FBQ0EsV0FBTSxZQUFOO0FBQ0EsYUFBUSxjQUFSO0VBSkosQzs7Ozs7O0FDbERBOztBQUVBLFFBQU8sT0FBUCxHQUFpQjtBQUNiLFlBQU8sb0JBQVEsR0FBUixDQUFQO0FBQ0EsVUFBSyxvQkFBUSxHQUFSLENBQUw7RUFGSixDOzs7Ozs7QUNGQTs7QUFFQSxLQUFJLFlBQVksb0JBQVEsRUFBUixDQUFaO0tBRUEsdUJBQXVCLENBQXZCO0tBQ0EsU0FBUyxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLE9BQW5CLEVBQTRCLFFBQTVCLENBQVQ7S0FFQSxhQUFhLFNBQWIsVUFBYSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDL0IsU0FBSSxVQUFVLFVBQVUsU0FBVixDQUFvQixJQUFwQixFQUEwQixJQUExQixFQUFnQyxPQUFoQyxDQURpQjtBQUUvQixZQUFPLFFBQVEsS0FBUixDQUZ3QjtFQUF0QjtLQUtiLFlBQVksU0FBWixTQUFZLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUM5QixTQUFJLFlBQVksVUFBVSxTQUFWLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQVosQ0FEMEI7QUFFOUIsU0FBSSxDQUFDLFVBQVUsT0FBVixDQUFrQixLQUFsQixFQUF5QjtBQUMxQixhQUFJLGNBQWMsVUFBVSxHQUFWLENBQWMsS0FBZDthQUNkLGVBQWUsS0FBSyxLQUFMLENBQVcsUUFBWCxJQUF1QixvQkFBdkI7YUFDZixRQUFRO0FBQ0osMkJBQWMsWUFBWSxZQUFaO0FBQ2QsNEJBQWUsWUFBWSxhQUFaO0FBQ2YsdUJBQVUsRUFBVjtVQUhKLENBSHNCOztBQVMxQixjQUFLLEdBQUwsR0FBVztBQUNQLG9CQUFPLEtBQVA7VUFESixDQVQwQjs7QUFhMUIsbUJBQVUsT0FBVixDQUFrQixLQUFsQixHQUEwQixLQUExQixDQWIwQjs7QUFlMUIsY0FBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksWUFBSixFQUFrQixHQUFsQyxFQUF1QztBQUNuQyxpQkFBSSxLQUFLLG9CQUFMLEVBQTJCO0FBQzNCLDZCQUFZLFVBQVosR0FEMkI7Y0FBL0I7QUFHQSxtQkFBTSxRQUFOLENBQWUsQ0FBZixJQUFvQixZQUFZLGFBQWEsSUFBSSxDQUFKLENBQWIsQ0FBaEMsQ0FKbUM7VUFBdkM7O0FBT0EsZ0JBQU8sT0FBUCxDQUFlLFVBQVUsS0FBVixFQUFpQjtBQUM1QixpQkFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBWCxDQUR3QjtBQUU1QixpQkFBSSxRQUFKLEVBQWM7QUFDViw2QkFBWSxLQUFaLEVBQW1CLEdBQW5CLENBQXVCLFVBQVUsT0FBVixFQUFtQjtBQUN0Qyw4QkFBUyxPQUFULEVBQWtCLE9BQWxCLEVBRHNDO2tCQUFuQixDQUF2QixDQURVO2NBQWQ7VUFGVyxDQUFmLENBdEIwQjs7QUErQjFCLGFBQUksS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQjtBQUNwQixtQkFBTSxPQUFOLEdBQWdCLFlBQVksUUFBWixDQUFxQixnQkFBckIsRUFBaEIsQ0FEb0I7VUFBeEI7O0FBSUEsYUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCO0FBQ2pCLG1CQUFNLElBQU4sR0FBYSxPQUFPLElBQVAsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQVosQ0FBNkIsTUFBN0IsQ0FBb0MsVUFBVSxHQUFWLEVBQWUsR0FBZixFQUFvQjtBQUNqRSxxQkFBSSxHQUFKLElBQVcsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsR0FBaEIsQ0FBNUIsQ0FBWCxDQURpRTtjQUFwQixFQUU5QyxFQUZVLENBQWIsQ0FEaUI7VUFBckI7O0FBTUEsYUFBSSxLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CO0FBQ3BCLHVCQUFVLGlCQUFWLENBQTRCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBNUIsQ0FEb0I7VUFBeEI7TUF6Q0o7RUFGUTs7QUFpRGhCLFFBQU8sT0FBUCxHQUFpQjtBQUNiLFdBQU0sU0FBTjtBQUNBLFlBQU8sVUFBUDtBQUNBLFdBQU0sSUFBTjtBQUNBLGFBQVEsSUFBUjtFQUpKLEM7Ozs7OztBQzdEQTs7QUFFQSxLQUFJLFlBQVcsb0JBQVEsRUFBUixDQUFYO0tBQ0EsZUFBZSxvQkFBUSxHQUFSLENBQWY7S0FFQSxZQUFZLFVBQVUsb0JBQVYsQ0FBK0IsWUFBL0IsQ0FBWjtLQUVBLFNBQVMsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixnQkFBbkIsQ0FBVDtLQUVBLFVBQVUsU0FBVixPQUFVLENBQVUsSUFBVixFQUFnQixJQUFoQixFQUFzQjtBQUM1QixTQUFJLFlBQVksVUFBVSxTQUFWLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLENBQVosQ0FEd0I7QUFFNUIsU0FBSSxVQUFVLE9BQVYsQ0FBa0IsS0FBbEIsSUFBMkIsS0FBSyxLQUFMLENBQVcsT0FBWCxJQUFzQixLQUFLLEtBQUwsQ0FBVyxPQUFYLEVBQW9CO0FBQ3JFLGFBQUksY0FBYyxVQUFVLEdBQVYsQ0FBYyxLQUFkO2FBQ2QsUUFBUSxVQUFVLE9BQVYsQ0FBa0IsS0FBbEI7YUFDUixNQUFNLFlBQVksUUFBWixDQUFxQixNQUFyQixDQUE0QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQWxDLENBSGlFOztBQUtyRSxhQUFJLENBQUMsTUFBTSxJQUFOLEVBQVk7QUFDYixtQkFBTSxJQUFOLEdBQWEsRUFBYixDQURhO1VBQWpCOztBQUlBLGNBQUssR0FBTCxHQUFXLEdBQVgsQ0FUcUU7QUFVckUsZUFBTSxJQUFOLENBQVcsS0FBSyxLQUFMLENBQVcsT0FBWCxDQUFYLEdBQWlDLEtBQUssR0FBTCxDQVZvQzs7QUFZckUsZ0JBQU8sT0FBUCxDQUFlLFVBQVUsS0FBVixFQUFpQjtBQUM1QixpQkFBSSxXQUFXLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBWCxDQUR3QjtBQUU1QixpQkFBSSxRQUFKLEVBQWM7QUFDVixxQkFBSSxLQUFKLEVBQVcsR0FBWCxDQUFlLFVBQVUsR0FBVixFQUFlO0FBQzFCLDhCQUFTLEdBQVQsRUFBYyxVQUFVLE9BQVYsQ0FBZCxDQUQwQjtrQkFBZixDQUFmLENBRFU7Y0FBZDtVQUZXLENBQWYsQ0FacUU7TUFBekU7RUFGTTtLQXlCVixVQUFVLFNBQVYsT0FBVSxDQUFVLElBQVYsRUFBZ0IsSUFBaEIsRUFBc0I7QUFDNUIsU0FBSSxLQUFLLEdBQUwsRUFBVTtBQUNWLGFBQUksWUFBWSxVQUFVLFNBQVYsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsQ0FBWixDQURNOztBQUdWLG1CQUFVLEdBQVYsQ0FBYyxRQUFkLENBQXVCLFNBQXZCLENBQWlDLEtBQUssR0FBTCxDQUFTLE9BQVQsQ0FBakMsQ0FIVTtBQUlWLGdCQUFPLFVBQVUsT0FBVixDQUFrQixLQUFsQixDQUF3QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQS9CLENBSlU7TUFBZDtFQURNOztBQVNkLFFBQU8sT0FBUCxHQUFpQjtBQUNiLFdBQU0sT0FBTjtBQUNBLFdBQU0sT0FBTjtBQUNBLGFBQVEsU0FBUjtFQUhKLEM7Ozs7OztBQzNDQTs7QUFFQSxLQUFJLFFBQVEsb0JBQVEsRUFBUixDQUFSOztBQUVKLFFBQU8sT0FBUCxHQUFpQixNQUFNLG9CQUFOLENBQTJCLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBM0IsQ0FBakIsQyIsImZpbGUiOiJwYXJ0OC9wYXJ0OC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjQyMmRjZjViM2JiZjkwNmI2YmNcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCcuLi9uYXRpdmUnKSxcclxuXHJcbiAgICBhc3NldHMgPSB7XHJcbiAgICAgICAgJ3NreSc6IHt0eXBlOiAnaW1hZ2UnLCBzcmM6ICcuLi9hc3NldHMvc2t5LnBuZyd9LFxyXG4gICAgICAgICdncm91bmQnOiB7dHlwZTogJ2ltYWdlJywgc3JjOiAnLi4vYXNzZXRzL3BsYXRmb3JtLnBuZyd9LFxyXG4gICAgICAgICdzdGFyJzoge3R5cGU6ICdpbWFnZScsIHNyYzogJy4uL2Fzc2V0cy9zdGFyLnBuZyd9LFxyXG4gICAgICAgICdkdWRlJzoge3R5cGU6ICdzcHJpdGVzaGVldCcsIHNyYzogJy4uL2Fzc2V0cy9kdWRlLnBuZycsIHdpZHRoOiAzMiwgaGVpZ2h0OiA0OH1cclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVTdHlsZSA9IHtcclxuICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgIGZpbGw6ICcjMDAwJ1xyXG4gICAgfSxcclxuXHJcbiAgICBNeUdhbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGFyczogQXJyYXkuYXBwbHkobnVsbCwge2xlbmd0aDogMTJ9KS5tYXAoZnVuY3Rpb24gKF8sIGkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2ksIDAuNyArIE1hdGgucmFuZG9tKCkgKiAwLjJdO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBzY29yZTogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG9uSW5wdXQ6IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBjb250ZXh0Lm5vZGVzLnBsYXllci5vYmosXHJcbiAgICAgICAgICAgICAgICBjdXJzb3JzID0gY29udGV4dC5pbnB1dC5jdXJzb3JzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnNvcnMubGVmdC5pc0Rvd24pIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAtMTUwO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmFuaW1hdGlvbnMucGxheSgnbGVmdCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnNvcnMucmlnaHQuaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuYm9keS52ZWxvY2l0eS54ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmFuaW1hdGlvbnMucGxheSgncmlnaHQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmFuaW1hdGlvbnMuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmZyYW1lID0gNDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnNvcnMudXAuaXNEb3duICYmIHBsYXllci5ib2R5LnRvdWNoaW5nLmRvd24pIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2R5LnZlbG9jaXR5LnkgPSAtMzUwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sbGVjdFN0YXI6IGZ1bmN0aW9uIChwbGF5ZXJOb2RlLCBzdGFyTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHN0YXJzOiB0aGlzLnN0YXRlLnN0YXJzLmZpbHRlcihmdW5jdGlvbiAoXywgaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpICE9PSBzdGFyTm9kZS5wcm9wcy5pO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBzY29yZTogdGhpcy5zdGF0ZS5zY29yZSArIDEwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnMgPSB0aGlzLnN0YXRlLnN0YXJzLm1hcChmdW5jdGlvbiAoc3RhciwgaSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxzcHJpdGUga2V5PXtzdGFyWzBdfSBpPXtpfSB4PXtzdGFyWzBdICogNzB9IHk9ezB9IGFzc2V0S2V5PVwic3RhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5R3Jhdml0eVk9ezE4fSBib2R5Qm91bmNlWT17c3RhclsxXX0vPlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGdhbWUgYXNzZXRzPXthc3NldHN9IHdpZHRoPXs4MDB9IGhlaWdodD17NjAwfSBwaHlzaWNzPXtQaGFzZXIuUGh5c2ljcy5BUkNBREV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcHJpdGUgYXNzZXRLZXk9XCJza3lcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGdyb3VwIG5hbWU9XCJwbGF0Zm9ybXNcIiBlbmFibGVCb2R5PXt0cnVlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwcml0ZSBuYW1lPVwiZ3JvdW5kXCIgYXNzZXRLZXk9XCJncm91bmRcIiB5PXs2MDAgLSA2NH0gc2NhbGU9e3t4OjIsIHk6Mn19IGJvZHlJbW1vdmFibGU9e3RydWV9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwcml0ZSBuYW1lPVwibGVkZ2UxXCIgYXNzZXRLZXk9XCJncm91bmRcIiB4PXs0MDB9IHk9ezQwMH0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3ByaXRlIG5hbWU9XCJsZWRnZTJcIiBhc3NldEtleT1cImdyb3VuZFwiIHg9ey0xNTB9IHk9ezI1MH0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZ3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGdyb3VwIG5hbWU9XCJzdGFyc1wiIGVuYWJsZUJvZHk9e3RydWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Y29sbGlkZXMgd2l0aD1cInBsYXRmb3Jtc1wiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3N0YXJzfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZ3JvdXA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwcml0ZSBuYW1lPVwicGxheWVyXCIgeD17MzJ9IHk9ezQ1MH0gYXNzZXRLZXk9XCJkdWRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlQaHlzaWNzPXt0cnVlfSBib2R5Qm91bmNlWT17MC4yfSBib2R5R3Jhdml0eVk9ezMwMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlDb2xsaWRlV29ybGRCb3VuZHM9e3RydWV9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YW5pbWF0aW9uIGlkPVwibGVmdFwiIGZyYW1lcz17WzAsIDEsIDIsIDNdfSBmcHM9ezEwfSBsb29wPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhbmltYXRpb24gaWQ9XCJyaWdodFwiIGZyYW1lcz17WzUsIDYsIDcsIDhdfSBmcHM9ezEwfSBsb29wPXt0cnVlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxjb2xsaWRlcyB3aXRoPVwicGxhdGZvcm1zXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3ZlcmxhcHMgd2l0aD1cInN0YXJzXCIgb25PdmVybGFwPXt0aGlzLmNvbGxlY3RTdGFyfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcHJpdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHQgdGV4dD17YFNjb3JlOiAke3RoaXMuc3RhdGUuc2NvcmV9YH0gc3R5bGU9e3Njb3JlU3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeD17MTZ9IHk9ezE2fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGN1cnNvcnM9e3RydWV9IG9uSW5wdXQ9e3RoaXMub25JbnB1dH0vPlxyXG4gICAgICAgICAgICAgICAgPC9nYW1lPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcblJlYWN0LnJlbmRlcig8TXlHYW1lLz4sICdnYW1lJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXhhbXBsZXMvcGFydDguanNcbiAqKi8iLCJcclxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmcgPSByZXF1aXJlKCdyZWFjdC1hbnl0aGluZy9zcmMvbmF0aXZlJyk7XHJcbnZhciBwaGFzZXJJbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vcGhhc2VyLWltcGxlbWVudGF0aW9uJyk7XHJcblxyXG52YXIgUmVhY3RQaGFzZXIgPSBjcmVhdGVSZWFjdEFueXRoaW5nKHBoYXNlckltcGxlbWVudGF0aW9uKTtcclxudmFyIFJlYWN0ID0gUmVhY3RQaGFzZXIuUmVhY3Q7XHJcblxyXG5SZWFjdC5yZW5kZXIgPSBSZWFjdFBoYXNlci5yZW5kZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uYXRpdmUuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3QnKTtcblxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmcgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmcnKTtcbnZhciBjcmVhdGVOYXRpdmVSZWFjdEFueXRoaW5nID0gZnVuY3Rpb24gKG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlYWN0QW55dGhpbmcoUmVhY3QsIG5hdGl2ZUltcGxlbWVudGF0aW9uKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTmF0aXZlUmVhY3RBbnl0aGluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9uYXRpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRyZW4nKTtcbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdENsYXNzID0gcmVxdWlyZSgnLi9SZWFjdENsYXNzJyk7XG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSByZXF1aXJlKCcuL1JlYWN0RE9NRmFjdG9yaWVzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlcycpO1xudmFyIFJlYWN0VmVyc2lvbiA9IHJlcXVpcmUoJy4vUmVhY3RWZXJzaW9uJyk7XG5cbnZhciBvbmx5Q2hpbGQgPSByZXF1aXJlKCcuL29ubHlDaGlsZCcpO1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50O1xudmFyIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbnZhciBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQ7XG4gIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbiAgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNsb25lRWxlbWVudDtcbn1cblxudmFyIFJlYWN0ID0ge1xuXG4gIC8vIE1vZGVyblxuXG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBSZWFjdENoaWxkcmVuLm1hcCxcbiAgICBmb3JFYWNoOiBSZWFjdENoaWxkcmVuLmZvckVhY2gsXG4gICAgY291bnQ6IFJlYWN0Q2hpbGRyZW4uY291bnQsXG4gICAgdG9BcnJheTogUmVhY3RDaGlsZHJlbi50b0FycmF5LFxuICAgIG9ubHk6IG9ubHlDaGlsZFxuICB9LFxuXG4gIENvbXBvbmVudDogUmVhY3RDb21wb25lbnQsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gIGlzVmFsaWRFbGVtZW50OiBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQsXG5cbiAgLy8gQ2xhc3NpY1xuXG4gIFByb3BUeXBlczogUmVhY3RQcm9wVHlwZXMsXG4gIGNyZWF0ZUNsYXNzOiBSZWFjdENsYXNzLmNyZWF0ZUNsYXNzLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICBjcmVhdGVNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgLy8gQ3VycmVudGx5IGEgbm9vcC4gV2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIGFuZCB0cmFjZSBtaXhpbnMuXG4gICAgcmV0dXJuIG1peGluO1xuICB9LFxuXG4gIC8vIFRoaXMgbG9va3MgRE9NIHNwZWNpZmljIGJ1dCB0aGVzZSBhcmUgYWN0dWFsbHkgaXNvbW9ycGhpYyBoZWxwZXJzXG4gIC8vIHNpbmNlIHRoZXkgYXJlIGp1c3QgZ2VuZXJhdGluZyBET00gc3RyaW5ncy5cbiAgRE9NOiBSZWFjdERPTUZhY3RvcmllcyxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MudHdvQXJndW1lbnRQb29sZXI7XG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MuZm91ckFyZ3VtZW50UG9vbGVyO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIHRyYXZlcnNhbC4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBGb3JFYWNoQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBmb3JFYWNoRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSB0cmF2ZXJzYWwgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBjb250ZXh0IHdpdGguXG4gKi9cbmZ1bmN0aW9uIEZvckVhY2hCb29rS2VlcGluZyhmb3JFYWNoRnVuY3Rpb24sIGZvckVhY2hDb250ZXh0KSB7XG4gIHRoaXMuZnVuYyA9IGZvckVhY2hGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gZm9yRWFjaENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuRm9yRWFjaEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oRm9yRWFjaEJvb2tLZWVwaW5nLCB0d29Bcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jO1xuICB2YXIgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBGb3JFYWNoQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgRm9yRWFjaEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIG1hcHBpbmcuIEFsbG93cyBhdm9pZGluZyBiaW5kaW5nIGNhbGxiYWNrcy5cbiAqXG4gKiBAY29uc3RydWN0b3IgTWFwQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7ISp9IG1hcFJlc3VsdCBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBtYXBGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IG1hcENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIG1hcHBpbmcgd2l0aC5cbiAqL1xuZnVuY3Rpb24gTWFwQm9va0tlZXBpbmcobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIHRoaXMucmVzdWx0ID0gbWFwUmVzdWx0O1xuICB0aGlzLmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgdGhpcy5mdW5jID0gbWFwRnVuY3Rpb247XG4gIHRoaXMuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuTWFwQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVzdWx0ID0gbnVsbDtcbiAgdGhpcy5rZXlQcmVmaXggPSBudWxsO1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oTWFwQm9va0tlZXBpbmcsIGZvdXJBcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQoYm9va0tlZXBpbmcsIGNoaWxkLCBjaGlsZEtleSkge1xuICB2YXIgcmVzdWx0ID0gYm9va0tlZXBpbmcucmVzdWx0O1xuICB2YXIga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4O1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuXG4gIHZhciBtYXBwZWRDaGlsZCA9IGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwobWFwcGVkQ2hpbGQsIHJlc3VsdCwgY2hpbGRLZXksIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICBtYXBwZWRDaGlsZCA9IFJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsXG4gICAgICAvLyBLZWVwIGJvdGggdGhlIChtYXBwZWQpIGFuZCBvbGQga2V5cyBpZiB0aGV5IGRpZmZlciwganVzdCBhc1xuICAgICAgLy8gdHJhdmVyc2VBbGxDaGlsZHJlbiB1c2VkIHRvIGRvIGZvciBvYmplY3RzIGFzIGNoaWxkcmVuXG4gICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gIHZhciBlc2NhcGVkUHJlZml4ID0gJyc7XG4gIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgIGVzY2FwZWRQcmVmaXggPSBlc2NhcGVVc2VyUHJvdmlkZWRLZXkocHJlZml4KSArICcvJztcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gTWFwQm9va0tlZXBpbmcuZ2V0UG9vbGVkKGFycmF5LCBlc2NhcGVkUHJlZml4LCBmdW5jLCBjb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgTWFwQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIE1hcHMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXkodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZER1bW15LCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIFJlYWN0Q2hpbGRyZW4gPSB7XG4gIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgbWFwOiBtYXBDaGlsZHJlbixcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbDogbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbCxcbiAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gIHRvQXJyYXk6IHRvQXJyYXlcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZHJlbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFBvb2xlZENsYXNzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGNvcHlGaWVsZHNGcm9tKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGNvcHlGaWVsZHNGcm9tKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhjb3B5RmllbGRzRnJvbSk7XG4gIH1cbn07XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIpO1xuICB9XG59O1xuXG52YXIgdGhyZWVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBmaXZlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgfVxufTtcblxudmFyIHN0YW5kYXJkUmVsZWFzZXIgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgIShpbnN0YW5jZSBpbnN0YW5jZW9mIEtsYXNzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcnlpbmcgdG8gcmVsZWFzZSBhbiBpbnN0YW5jZSBpbnRvIGEgcG9vbCBvZiBhIGRpZmZlcmVudCB0eXBlLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgaW5zdGFuY2UuZGVzdHJ1Y3RvcigpO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCA8IEtsYXNzLnBvb2xTaXplKSB7XG4gICAgS2xhc3MuaW5zdGFuY2VQb29sLnB1c2goaW5zdGFuY2UpO1xuICB9XG59O1xuXG52YXIgREVGQVVMVF9QT09MX1NJWkUgPSAxMDtcbnZhciBERUZBVUxUX1BPT0xFUiA9IG9uZUFyZ3VtZW50UG9vbGVyO1xuXG4vKipcbiAqIEF1Z21lbnRzIGBDb3B5Q29uc3RydWN0b3JgIHRvIGJlIGEgcG9vbGFibGUgY2xhc3MsIGF1Z21lbnRpbmcgb25seSB0aGUgY2xhc3NcbiAqIGl0c2VsZiAoc3RhdGljYWxseSkgbm90IGFkZGluZyBhbnkgcHJvdG90eXBpY2FsIGZpZWxkcy4gQW55IENvcHlDb25zdHJ1Y3RvclxuICogeW91IGdpdmUgdGhpcyBtYXkgaGF2ZSBhIGBwb29sU2l6ZWAgcHJvcGVydHksIGFuZCB3aWxsIGxvb2sgZm9yIGFcbiAqIHByb3RvdHlwaWNhbCBgZGVzdHJ1Y3RvcmAgb24gaW5zdGFuY2VzIChvcHRpb25hbCkuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICB2YXIgTmV3S2xhc3MgPSBDb3B5Q29uc3RydWN0b3I7XG4gIE5ld0tsYXNzLmluc3RhbmNlUG9vbCA9IFtdO1xuICBOZXdLbGFzcy5nZXRQb29sZWQgPSBwb29sZXIgfHwgREVGQVVMVF9QT09MRVI7XG4gIGlmICghTmV3S2xhc3MucG9vbFNpemUpIHtcbiAgICBOZXdLbGFzcy5wb29sU2l6ZSA9IERFRkFVTFRfUE9PTF9TSVpFO1xuICB9XG4gIE5ld0tsYXNzLnJlbGVhc2UgPSBzdGFuZGFyZFJlbGVhc2VyO1xuICByZXR1cm4gTmV3S2xhc3M7XG59O1xuXG52YXIgUG9vbGVkQ2xhc3MgPSB7XG4gIGFkZFBvb2xpbmdUbzogYWRkUG9vbGluZ1RvLFxuICBvbmVBcmd1bWVudFBvb2xlcjogb25lQXJndW1lbnRQb29sZXIsXG4gIHR3b0FyZ3VtZW50UG9vbGVyOiB0d29Bcmd1bWVudFBvb2xlcixcbiAgdGhyZWVBcmd1bWVudFBvb2xlcjogdGhyZWVBcmd1bWVudFBvb2xlcixcbiAgZm91ckFyZ3VtZW50UG9vbGVyOiBmb3VyQXJndW1lbnRQb29sZXIsXG4gIGZpdmVBcmd1bWVudFBvb2xlcjogZml2ZUFyZ3VtZW50UG9vbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xlZENsYXNzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVsZW1lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQgdHlwZS4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgfHwgMHhlYWM3O1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xuXG52YXIgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24sIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duO1xuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAvLyBhbiBleHRlcm5hbCBiYWNraW5nIHN0b3JlIHNvIHRoYXQgd2UgY2FuIGZyZWV6ZSB0aGUgd2hvbGUgb2JqZWN0LlxuICAgIC8vIFRoaXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggYSBXZWFrTWFwIG9uY2UgdGhleSBhcmUgaW1wbGVtZW50ZWQgaW5cbiAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICBlbGVtZW50Ll9zdG9yZSA9IHt9O1xuXG4gICAgLy8gVG8gbWFrZSBjb21wYXJpbmcgUmVhY3RFbGVtZW50cyBlYXNpZXIgZm9yIHRlc3RpbmcgcHVycG9zZXMsIHdlIG1ha2VcbiAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgLy8gaW5jbHVkZSBldmVyeSBlbnZpcm9ubWVudCB3ZSBydW4gdGVzdHMgaW4pLCBzbyB0aGUgdGVzdCBmcmFtZXdvcmtcbiAgICAvLyBpZ25vcmVzIGl0LlxuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICAvLyBzZWxmIGFuZCBzb3VyY2UgYXJlIERFViBvbmx5IHByb3BlcnRpZXMuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc2VsZlxuICAgICAgfSk7XG4gICAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgIGVsZW1lbnQuX3NlbGYgPSBzZWxmO1xuICAgICAgZWxlbWVudC5fc291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcmVmID0gIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgncmVmJykgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQgPyBudWxsIDogY29uZmlnLnJlZjtcbiAgICAgIGtleSA9ICFjb25maWcuaGFzT3duUHJvcGVydHkoJ2tleScpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0ID8gbnVsbCA6ICcnICsgY29uZmlnLmtleTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmID0gY29uZmlnLnJlZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5yZWY7XG4gICAgICBrZXkgPSBjb25maWcua2V5ID09PSB1bmRlZmluZWQgPyBudWxsIDogJycgKyBjb25maWcua2V5O1xuICAgIH1cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gQ3JlYXRlIGR1bW15IGBrZXlgIGFuZCBgcmVmYCBwcm9wZXJ0eSB0byBgcHJvcHNgIHRvIHdhcm4gdXNlcnNcbiAgICAvLyBhZ2FpbnN0IGl0cyB1c2VcbiAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICBpZiAoIXByb3BzLmhhc093blByb3BlcnR5KCdrZXknKSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICAgICAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiAnZGlzcGxheU5hbWUnIGluIHR5cGUgPyB0eXBlLmRpc3BsYXlOYW1lIDogJ0VsZW1lbnQnKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXByb3BzLmhhc093blByb3BlcnR5KCdyZWYnKSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICAgICAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiAnZGlzcGxheU5hbWUnIGluIHR5cGUgPyB0eXBlLmRpc3BsYXlOYW1lIDogJ0VsZW1lbnQnKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xufTtcblxuUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICB2YXIgZmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gIC8vIEV4cG9zZSB0aGUgdHlwZSBvbiB0aGUgZmFjdG9yeSBhbmQgdGhlIHByb3RvdHlwZSBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyBlYXNpbHkgYWNjZXNzZWQgb24gZWxlbWVudHMuIEUuZy4gYDxGb28gLz4udHlwZSA9PT0gRm9vYC5cbiAgLy8gVGhpcyBzaG91bGQgbm90IGJlIG5hbWVkIGBjb25zdHJ1Y3RvcmAgc2luY2UgdGhpcyBtYXkgbm90IGJlIHRoZSBmdW5jdGlvblxuICAvLyB0aGF0IGNyZWF0ZWQgdGhlIGVsZW1lbnQsIGFuZCBpdCBtYXkgbm90IGV2ZW4gYmUgYSBjb25zdHJ1Y3Rvci5cbiAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gIGZhY3RvcnkudHlwZSA9IHR5cGU7XG4gIHJldHVybiBmYWN0b3J5O1xufTtcblxuUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleSA9IGZ1bmN0aW9uIChvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcblxuICByZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbid1c2Ugc3RyaWN0JztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L29iamVjdC1hc3NpZ24vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEN1cnJlbnRPd25lclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvd2FybmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge31cblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY2FuRGVmaW5lUHJvcGVydHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4JywgeyBnZXQ6IGZ1bmN0aW9uICgpIHt9IH0pO1xuICAgIGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuRGVmaW5lUHJvcGVydHk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHRyYXZlcnNlQWxsQ2hpbGRyZW5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBTRVBBUkFUT1IgPSAnLic7XG52YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlckxvb2t1cCA9IHtcbiAgJz0nOiAnPTAnLFxuICAnOic6ICc9Midcbn07XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9bPTpdL2c7XG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHVzZXJQcm92aWRlZEtleUVzY2FwZXIobWF0Y2gpIHtcbiAgcmV0dXJuIHVzZXJQcm92aWRlZEtleUVzY2FwZXJMb29rdXBbbWF0Y2hdO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiB3cmFwVXNlclByb3ZpZGVkS2V5KGNvbXBvbmVudC5rZXkpO1xuICB9XG4gIC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG4gIHJldHVybiBpbmRleC50b1N0cmluZygzNik7XG59XG5cbi8qKlxuICogRXNjYXBlIGEgY29tcG9uZW50IGtleSBzbyB0aGF0IGl0IGlzIHNhZmUgdG8gdXNlIGluIGEgcmVhY3RpZC5cbiAqXG4gKiBAcGFyYW0geyp9IHRleHQgQ29tcG9uZW50IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSBBbiBlc2NhcGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsIHVzZXJQcm92aWRlZEtleUVzY2FwZXIpO1xufVxuXG4vKipcbiAqIFdyYXAgYSBga2V5YCB2YWx1ZSBleHBsaWNpdGx5IHByb3ZpZGVkIGJ5IHRoZSB1c2VyIHRvIGRpc3Rpbmd1aXNoIGl0IGZyb21cbiAqIGltcGxpY2l0bHktZ2VuZXJhdGVkIGtleXMgZ2VuZXJhdGVkIGJ5IGEgY29tcG9uZW50J3MgaW5kZXggaW4gaXRzIHBhcmVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFZhbHVlIG9mIGEgdXNlci1wcm92aWRlZCBga2V5YCBhdHRyaWJ1dGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gd3JhcFVzZXJQcm92aWRlZEtleShrZXkpIHtcbiAgcmV0dXJuICckJyArIGVzY2FwZVVzZXJQcm92aWRlZEtleShrZXkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGNoaWxkcmVuKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IGNoaWxkcmVuLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGlpID0gMDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGNoaWxkID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpaSsrKTtcbiAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhkaWRXYXJuQWJvdXRNYXBzLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3QgeWV0IGZ1bGx5IHN1cHBvcnRlZC4gSXQgaXMgYW4gJyArICdleHBlcmltZW50YWwgZmVhdHVyZSB0aGF0IG1pZ2h0IGJlIHJlbW92ZWQuIENvbnZlcnQgaXQgdG8gYSAnICsgJ3NlcXVlbmNlIC8gaXRlcmFibGUgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIGNoaWxkID0gZW50cnlbMV07XG4gICAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgd3JhcFVzZXJQcm92aWRlZEtleShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmF2ZXJzZUFsbENoaWxkcmVuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi90cmF2ZXJzZUFsbENoaWxkcmVuLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGdldEl0ZXJhdG9yRm5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBTeW1ib2wgKi9cblxudmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICpcbiAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICpcbiAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAqICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpdGVyYXRvckZuO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SXRlcmF0b3JGbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvZ2V0SXRlcmF0b3JGbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhICcgKyAnZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25TZXRTdGF0ZSgpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHBhcnRpYWxTdGF0ZSAhPSBudWxsLCAnc2V0U3RhdGUoLi4uKTogWW91IHBhc3NlZCBhbiB1bmRlZmluZWQgb3IgbnVsbCBzdGF0ZSBvYmplY3Q7ICcgKyAnaW5zdGVhZCwgdXNlIGZvcmNlVXBkYXRlKCkuJykgOiB2b2lkIDA7XG4gIH1cbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROb29wVXBkYXRlUXVldWVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuICcgKyAnVGhpcyBpcyBhIG5vLW9wLiBQbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3IgJiYgcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgIHdhcm5URFoocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB3YXJuVERaKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3ROb29wVXBkYXRlUXVldWUuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RJbnN0cnVtZW50YXRpb25cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdERlYnVnVG9vbCA9IHJlcXVpcmUoJy4vUmVhY3REZWJ1Z1Rvb2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGRlYnVnVG9vbDogUmVhY3REZWJ1Z1Rvb2wgfTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RJbnN0cnVtZW50YXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3REZWJ1Z1Rvb2xcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sID0gcmVxdWlyZSgnLi9SZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGV2ZW50SGFuZGxlcnMgPSBbXTtcbnZhciBoYW5kbGVyRG9lc1Rocm93Rm9yRXZlbnQgPSB7fTtcblxuZnVuY3Rpb24gZW1pdEV2ZW50KGhhbmRsZXJGdW5jdGlvbk5hbWUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBldmVudEhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyW2hhbmRsZXJGdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgaGFuZGxlcltoYW5kbGVyRnVuY3Rpb25OYW1lXShhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaGFuZGxlckRvZXNUaHJvd0ZvckV2ZW50W2hhbmRsZXJGdW5jdGlvbk5hbWVdLCAnZXhjZXB0aW9uIHRocm93biBieSBkZXZ0b29sIHdoaWxlIGhhbmRsaW5nICVzOiAlcycsIGhhbmRsZXJGdW5jdGlvbk5hbWUsIGUubWVzc2FnZSkgOiB2b2lkIDA7XG4gICAgICAgIGhhbmRsZXJEb2VzVGhyb3dGb3JFdmVudFtoYW5kbGVyRnVuY3Rpb25OYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIFJlYWN0RGVidWdUb29sID0ge1xuICBhZGREZXZ0b29sOiBmdW5jdGlvbiAoZGV2dG9vbCkge1xuICAgIGV2ZW50SGFuZGxlcnMucHVzaChkZXZ0b29sKTtcbiAgfSxcbiAgcmVtb3ZlRGV2dG9vbDogZnVuY3Rpb24gKGRldnRvb2wpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50SGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudEhhbmRsZXJzW2ldID09PSBkZXZ0b29sKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBvbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIGVtaXRFdmVudCgnb25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQnKTtcbiAgfSxcbiAgb25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQnKTtcbiAgfSxcbiAgb25TZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGVtaXRFdmVudCgnb25TZXRTdGF0ZScpO1xuICB9LFxuICBvbk1vdW50Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICBlbWl0RXZlbnQoJ29uTW91bnRSb290Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvbk1vdW50Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG4gIG9uVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25VcGRhdGVDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25Vbm1vdW50Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH1cbn07XG5cblJlYWN0RGVidWdUb29sLmFkZERldnRvb2woUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3REZWJ1Z1Rvb2w7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RGVidWdUb29sLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2xcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCA9IGZhbHNlO1xuXG4gIHZhciB3YXJuSW52YWxpZFNldFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFwcm9jZXNzaW5nQ2hpbGRDb250ZXh0LCAnc2V0U3RhdGUoLi4uKTogQ2Fubm90IGNhbGwgc2V0U3RhdGUoKSBpbnNpZGUgZ2V0Q2hpbGRDb250ZXh0KCknKSA6IHZvaWQgMDtcbiAgfTtcbn1cblxudmFyIFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wgPSB7XG4gIG9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCA9IHRydWU7XG4gIH0sXG4gIG9uRW5kUHJvY2Vzc2luZ0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3NpbmdDaGlsZENvbnRleHQgPSBmYWxzZTtcbiAgfSxcbiAgb25TZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHdhcm5JbnZhbGlkU2V0U3RhdGUoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9lbXB0eU9iamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENsYXNzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9IGtleU9mKHsgbWl4aW5zOiBudWxsIH0pO1xuXG4vKipcbiAqIFBvbGljaWVzIHRoYXQgZGVzY3JpYmUgbWV0aG9kcyBpbiBgUmVhY3RDbGFzc0ludGVyZmFjZWAuXG4gKi9cbnZhciBTcGVjUG9saWN5ID0ga2V5TWlycm9yKHtcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgb25seSBvbmNlIGJ5IHRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIG9yIG1peGluLlxuICAgKi9cbiAgREVGSU5FX09OQ0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIG1heSBiZSBkZWZpbmVkIGJ5IGJvdGggdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gYW5kIG1peGlucy5cbiAgICogU3Vic2VxdWVudCBkZWZpbml0aW9ucyB3aWxsIGJlIGNoYWluZWQuIFRoZXNlIG1ldGhvZHMgbXVzdCByZXR1cm4gdm9pZC5cbiAgICovXG4gIERFRklORV9NQU5ZOiBudWxsLFxuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgb3ZlcnJpZGluZyB0aGUgYmFzZSBjbGFzcy5cbiAgICovXG4gIE9WRVJSSURFX0JBU0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBzaW1pbGFyIHRvIERFRklORV9NQU5ZLCBleGNlcHQgd2UgYXNzdW1lIHRoZXkgcmV0dXJuXG4gICAqIG9iamVjdHMuIFdlIHRyeSB0byBtZXJnZSB0aGUga2V5cyBvZiB0aGUgcmV0dXJuIHZhbHVlcyBvZiBhbGwgdGhlIG1peGVkIGluXG4gICAqIGZ1bmN0aW9ucy4gSWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3Qgd2UgdGhyb3cuXG4gICAqL1xuICBERUZJTkVfTUFOWV9NRVJHRUQ6IG51bGxcbn0pO1xuXG52YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuLyoqXG4gKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICogb3IgbmF0aXZlIGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQG5vc2lkZWVmZmVjdHNcbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0VcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuLy8gbm9vcFxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0UpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSAnICsgJ2Alc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzICcgKyAnZG8gbm90IG92ZXJsYXAgd2l0aCBSZWFjdCBtZXRob2RzLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgJyArICd0byBhIG1peGluLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgISh0eXBlb2Ygc3BlYyAhPT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byAnICsgJ3VzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhICcgKyAncmVndWxhciBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAhIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzcGVjKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvICcgKyAndXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyAnICsgJ3doZW4gbWl4aW5nIGluIGNvbXBvbmVudCBzcGVjcy4nLCBzcGVjUG9saWN5LCBuYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VEKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkICcgKyAncHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0ICcgKyAnYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgaW5zdGVhZDsgaXQgd2lsbCBzdGlsbCBiZSBhY2Nlc3NpYmxlIG9uIHRoZSAnICsgJ2NvbnN0cnVjdG9yLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lICcgKyAnYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgJyArICdkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgIShvbmVba2V5XSA9PT0gdW5kZWZpbmVkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6ICcgKyAnVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgJyArICdtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gJyArICdnZXRJbml0aWFsU3RhdGUoKSBvciBnZXREZWZhdWx0UHJvcHMoKSBtZXRob2RzIHJldHVybmluZyBvYmplY3RzICcgKyAnd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3BlYyBDbGFzcyBzcGVjaWZpY2F0aW9uICh3aGljaCBtdXN0IGRlZmluZSBgcmVuZGVyYCkuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBDb21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNyZWF0ZUNsYXNzOiBmdW5jdGlvbiAoc3BlYykge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIH07XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RQcm9wVHlwZUxvY2F0aW9uc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IGtleU1pcnJvcih7XG4gIHByb3A6IG51bGwsXG4gIGNvbnRleHQ6IG51bGwsXG4gIGNoaWxkQ29udGV4dDogbnVsbFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9ucztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJy4vaW52YXJpYW50Jyk7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmV0ID0ge307XG4gIHZhciBrZXk7XG4gICEob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIva2V5TWlycm9yLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbi8qKlxuICogQWxsb3dzIGV4dHJhY3Rpb24gb2YgYSBtaW5pZmllZCBrZXkuIExldCdzIHRoZSBidWlsZCBzeXN0ZW0gbWluaWZ5IGtleXNcbiAqIHdpdGhvdXQgbG9zaW5nIHRoZSBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IHVzZSBrZXkgc3RyaW5ncyBhcyB2YWx1ZXNcbiAqIHRoZW1zZWx2ZXMuIFBhc3MgaW4gYW4gb2JqZWN0IHdpdGggYSBzaW5nbGUga2V5L3ZhbCBwYWlyIGFuZCBpdCB3aWxsIHJldHVyblxuICogeW91IHRoZSBzdHJpbmcga2V5IG9mIHRoYXQgc2luZ2xlIHJlY29yZC4gU3VwcG9zZSB5b3Ugd2FudCB0byBncmFiIHRoZVxuICogdmFsdWUgZm9yIGEga2V5ICdjbGFzc05hbWUnIGluc2lkZSBvZiBhbiBvYmplY3QuIEtleS92YWwgbWluaWZpY2F0aW9uIG1heVxuICogaGF2ZSBhbGlhc2VkIHRoYXQga2V5IHRvIGJlICd4YTEyJy4ga2V5T2Yoe2NsYXNzTmFtZTogbnVsbH0pIHdpbGwgcmV0dXJuXG4gKiAneGExMicgaW4gdGhhdCBjYXNlLiBSZXNvbHZlIGtleXMgeW91IHdhbnQgdG8gdXNlIG9uY2UgYXQgc3RhcnR1cCB0aW1lLCB0aGVuXG4gKiByZXVzZSB0aG9zZSByZXNvbHV0aW9ucy5cbiAqL1xudmFyIGtleU9mID0gZnVuY3Rpb24gKG9uZUtleU9iaikge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBvbmVLZXlPYmopIHtcbiAgICBpZiAoIW9uZUtleU9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIva2V5T2YuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RET01GYWN0b3JpZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG5cbnZhciBtYXBPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9tYXBPYmplY3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBmYWN0b3J5IHRoYXQgY3JlYXRlcyBIVE1MIHRhZyBlbGVtZW50cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRhZyBuYW1lIChlLmcuIGBkaXZgKS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTUZhY3RvcnkodGFnKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcmV0dXJuIFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5KHRhZyk7XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5KHRhZyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcHBpbmcgZnJvbSBzdXBwb3J0ZWQgSFRNTCB0YWdzIHRvIGBSZWFjdERPTUNvbXBvbmVudGAgY2xhc3Nlcy5cbiAqIFRoaXMgaXMgYWxzbyBhY2Nlc3NpYmxlIHZpYSBgUmVhY3QuRE9NYC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IG1hcE9iamVjdCh7XG4gIGE6ICdhJyxcbiAgYWJicjogJ2FiYnInLFxuICBhZGRyZXNzOiAnYWRkcmVzcycsXG4gIGFyZWE6ICdhcmVhJyxcbiAgYXJ0aWNsZTogJ2FydGljbGUnLFxuICBhc2lkZTogJ2FzaWRlJyxcbiAgYXVkaW86ICdhdWRpbycsXG4gIGI6ICdiJyxcbiAgYmFzZTogJ2Jhc2UnLFxuICBiZGk6ICdiZGknLFxuICBiZG86ICdiZG8nLFxuICBiaWc6ICdiaWcnLFxuICBibG9ja3F1b3RlOiAnYmxvY2txdW90ZScsXG4gIGJvZHk6ICdib2R5JyxcbiAgYnI6ICdicicsXG4gIGJ1dHRvbjogJ2J1dHRvbicsXG4gIGNhbnZhczogJ2NhbnZhcycsXG4gIGNhcHRpb246ICdjYXB0aW9uJyxcbiAgY2l0ZTogJ2NpdGUnLFxuICBjb2RlOiAnY29kZScsXG4gIGNvbDogJ2NvbCcsXG4gIGNvbGdyb3VwOiAnY29sZ3JvdXAnLFxuICBkYXRhOiAnZGF0YScsXG4gIGRhdGFsaXN0OiAnZGF0YWxpc3QnLFxuICBkZDogJ2RkJyxcbiAgZGVsOiAnZGVsJyxcbiAgZGV0YWlsczogJ2RldGFpbHMnLFxuICBkZm46ICdkZm4nLFxuICBkaWFsb2c6ICdkaWFsb2cnLFxuICBkaXY6ICdkaXYnLFxuICBkbDogJ2RsJyxcbiAgZHQ6ICdkdCcsXG4gIGVtOiAnZW0nLFxuICBlbWJlZDogJ2VtYmVkJyxcbiAgZmllbGRzZXQ6ICdmaWVsZHNldCcsXG4gIGZpZ2NhcHRpb246ICdmaWdjYXB0aW9uJyxcbiAgZmlndXJlOiAnZmlndXJlJyxcbiAgZm9vdGVyOiAnZm9vdGVyJyxcbiAgZm9ybTogJ2Zvcm0nLFxuICBoMTogJ2gxJyxcbiAgaDI6ICdoMicsXG4gIGgzOiAnaDMnLFxuICBoNDogJ2g0JyxcbiAgaDU6ICdoNScsXG4gIGg2OiAnaDYnLFxuICBoZWFkOiAnaGVhZCcsXG4gIGhlYWRlcjogJ2hlYWRlcicsXG4gIGhncm91cDogJ2hncm91cCcsXG4gIGhyOiAnaHInLFxuICBodG1sOiAnaHRtbCcsXG4gIGk6ICdpJyxcbiAgaWZyYW1lOiAnaWZyYW1lJyxcbiAgaW1nOiAnaW1nJyxcbiAgaW5wdXQ6ICdpbnB1dCcsXG4gIGluczogJ2lucycsXG4gIGtiZDogJ2tiZCcsXG4gIGtleWdlbjogJ2tleWdlbicsXG4gIGxhYmVsOiAnbGFiZWwnLFxuICBsZWdlbmQ6ICdsZWdlbmQnLFxuICBsaTogJ2xpJyxcbiAgbGluazogJ2xpbmsnLFxuICBtYWluOiAnbWFpbicsXG4gIG1hcDogJ21hcCcsXG4gIG1hcms6ICdtYXJrJyxcbiAgbWVudTogJ21lbnUnLFxuICBtZW51aXRlbTogJ21lbnVpdGVtJyxcbiAgbWV0YTogJ21ldGEnLFxuICBtZXRlcjogJ21ldGVyJyxcbiAgbmF2OiAnbmF2JyxcbiAgbm9zY3JpcHQ6ICdub3NjcmlwdCcsXG4gIG9iamVjdDogJ29iamVjdCcsXG4gIG9sOiAnb2wnLFxuICBvcHRncm91cDogJ29wdGdyb3VwJyxcbiAgb3B0aW9uOiAnb3B0aW9uJyxcbiAgb3V0cHV0OiAnb3V0cHV0JyxcbiAgcDogJ3AnLFxuICBwYXJhbTogJ3BhcmFtJyxcbiAgcGljdHVyZTogJ3BpY3R1cmUnLFxuICBwcmU6ICdwcmUnLFxuICBwcm9ncmVzczogJ3Byb2dyZXNzJyxcbiAgcTogJ3EnLFxuICBycDogJ3JwJyxcbiAgcnQ6ICdydCcsXG4gIHJ1Ynk6ICdydWJ5JyxcbiAgczogJ3MnLFxuICBzYW1wOiAnc2FtcCcsXG4gIHNjcmlwdDogJ3NjcmlwdCcsXG4gIHNlY3Rpb246ICdzZWN0aW9uJyxcbiAgc2VsZWN0OiAnc2VsZWN0JyxcbiAgc21hbGw6ICdzbWFsbCcsXG4gIHNvdXJjZTogJ3NvdXJjZScsXG4gIHNwYW46ICdzcGFuJyxcbiAgc3Ryb25nOiAnc3Ryb25nJyxcbiAgc3R5bGU6ICdzdHlsZScsXG4gIHN1YjogJ3N1YicsXG4gIHN1bW1hcnk6ICdzdW1tYXJ5JyxcbiAgc3VwOiAnc3VwJyxcbiAgdGFibGU6ICd0YWJsZScsXG4gIHRib2R5OiAndGJvZHknLFxuICB0ZDogJ3RkJyxcbiAgdGV4dGFyZWE6ICd0ZXh0YXJlYScsXG4gIHRmb290OiAndGZvb3QnLFxuICB0aDogJ3RoJyxcbiAgdGhlYWQ6ICd0aGVhZCcsXG4gIHRpbWU6ICd0aW1lJyxcbiAgdGl0bGU6ICd0aXRsZScsXG4gIHRyOiAndHInLFxuICB0cmFjazogJ3RyYWNrJyxcbiAgdTogJ3UnLFxuICB1bDogJ3VsJyxcbiAgJ3Zhcic6ICd2YXInLFxuICB2aWRlbzogJ3ZpZGVvJyxcbiAgd2JyOiAnd2JyJyxcblxuICAvLyBTVkdcbiAgY2lyY2xlOiAnY2lyY2xlJyxcbiAgY2xpcFBhdGg6ICdjbGlwUGF0aCcsXG4gIGRlZnM6ICdkZWZzJyxcbiAgZWxsaXBzZTogJ2VsbGlwc2UnLFxuICBnOiAnZycsXG4gIGltYWdlOiAnaW1hZ2UnLFxuICBsaW5lOiAnbGluZScsXG4gIGxpbmVhckdyYWRpZW50OiAnbGluZWFyR3JhZGllbnQnLFxuICBtYXNrOiAnbWFzaycsXG4gIHBhdGg6ICdwYXRoJyxcbiAgcGF0dGVybjogJ3BhdHRlcm4nLFxuICBwb2x5Z29uOiAncG9seWdvbicsXG4gIHBvbHlsaW5lOiAncG9seWxpbmUnLFxuICByYWRpYWxHcmFkaWVudDogJ3JhZGlhbEdyYWRpZW50JyxcbiAgcmVjdDogJ3JlY3QnLFxuICBzdG9wOiAnc3RvcCcsXG4gIHN2ZzogJ3N2ZycsXG4gIHRleHQ6ICd0ZXh0JyxcbiAgdHNwYW46ICd0c3BhbidcblxufSwgY3JlYXRlRE9NRmFjdG9yeSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01GYWN0b3JpZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RE9NRmFjdG9yaWVzLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFZhbGlkYXRvclxuICovXG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIGFkZGVuZGEgPSBnZXRBZGRlbmRhRm9yS2V5VXNlKCd1bmlxdWVLZXknLCBlbGVtZW50LCBwYXJlbnRUeXBlKTtcbiAgaWYgKGFkZGVuZGEgPT09IG51bGwpIHtcbiAgICAvLyB3ZSBhbHJlYWR5IHNob3dlZCB0aGUgd2FybmluZ1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyVzJywgYWRkZW5kYS5wYXJlbnRPck93bmVyIHx8ICcnLCBhZGRlbmRhLmNoaWxkT3duZXIgfHwgJycsIGFkZGVuZGEudXJsIHx8ICcnKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBTaGFyZWQgd2FybmluZyBhbmQgbW9uaXRvcmluZyBjb2RlIGZvciB0aGUga2V5IHdhcm5pbmdzLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VUeXBlIEEga2V5IHVzZWQgZm9yIGRlLWR1cGluZyB3YXJuaW5ncy5cbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICogQHJldHVybnMgez9vYmplY3R9IEEgc2V0IG9mIGFkZGVuZGEgdG8gdXNlIGluIHRoZSB3YXJuaW5nIG1lc3NhZ2UsIG9yIG51bGxcbiAqIGlmIHRoZSB3YXJuaW5nIGhhcyBhbHJlYWR5IGJlZW4gc2hvd24gYmVmb3JlIChhbmQgc2hvdWxkbid0IGJlIHNob3duIGFnYWluKS5cbiAqL1xuZnVuY3Rpb24gZ2V0QWRkZW5kYUZvcktleVVzZShtZXNzYWdlVHlwZSwgZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICB2YXIgYWRkZW5kdW0gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgaWYgKCFhZGRlbmR1bSkge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBhZGRlbmR1bSA9ICcgQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtZW1vaXplciA9IG93bmVySGFzS2V5VXNlV2FybmluZ1ttZXNzYWdlVHlwZV0gfHwgKG93bmVySGFzS2V5VXNlV2FybmluZ1ttZXNzYWdlVHlwZV0gPSB7fSk7XG4gIGlmIChtZW1vaXplclthZGRlbmR1bV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBtZW1vaXplclthZGRlbmR1bV0gPSB0cnVlO1xuXG4gIHZhciBhZGRlbmRhID0ge1xuICAgIHBhcmVudE9yT3duZXI6IGFkZGVuZHVtLFxuICAgIHVybDogJyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJyxcbiAgICBjaGlsZE93bmVyOiBudWxsXG4gIH07XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgYWRkZW5kYS5jaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nO1xuICB9XG5cbiAgcmV0dXJuIGFkZGVuZGE7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG4gICAgLy8gRW50cnkgaXRlcmF0b3JzIHByb3ZpZGUgaW1wbGljaXQga2V5cy5cbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgcHJvcHMgYXJlIHZhbGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wVHlwZXMgTWFwIG9mIHByb3AgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXMoY29tcG9uZW50TmFtZSwgcHJvcFR5cGVzLCBwcm9wcywgbG9jYXRpb24pIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAhKHR5cGVvZiBwcm9wVHlwZXNbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICBlcnJvciA9IHByb3BUeXBlc1twcm9wTmFtZV0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbik7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgcHJvcE5hbWUsIHR5cGVvZiBlcnJvcikgOiB2b2lkIDA7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB2YXIgYWRkZW5kdW0gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgcHJvcFR5cGU6ICVzJXMnLCBlcnJvci5tZXNzYWdlLCBhZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgaWYgKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcykge1xuICAgIGNoZWNrUHJvcFR5cGVzKG5hbWUsIGNvbXBvbmVudENsYXNzLnByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh2YWxpZFR5cGUsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIHNob3VsZCBub3QgYmUgbnVsbCwgdW5kZWZpbmVkLCBib29sZWFuLCBvciAnICsgJ251bWJlci4gSXQgc2hvdWxkIGJlIGEgc3RyaW5nIChmb3IgRE9NIGVsZW1lbnRzKSBvciBhIFJlYWN0Q2xhc3MgJyArICcoZm9yIGNvbXBvc2l0ZSBjb21wb25lbnRzKS4lcycsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpKSA6IHZvaWQgMDtcblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJykgOiB2b2lkIDA7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG4gIH0sXG5cbiAgY2xvbmVFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgICB9XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3I7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudFZhbGlkYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBgY2FsbGJhY2tgIG9uY2UgZm9yIGVhY2ggZW51bWVyYWJsZSBvd24gcHJvcGVydHkgaW4gdGhlXG4gKiBvYmplY3QgYW5kIGNvbnN0cnVjdHMgYSBuZXcgb2JqZWN0IGZyb20gdGhlIHJlc3VsdHMuIFRoZSBgY2FsbGJhY2tgIGlzXG4gKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuICpcbiAqICAtIHRoZSBwcm9wZXJ0eSB2YWx1ZVxuICogIC0gdGhlIHByb3BlcnR5IG5hbWVcbiAqICAtIHRoZSBvYmplY3QgYmVpbmcgdHJhdmVyc2VkXG4gKlxuICogUHJvcGVydGllcyB0aGF0IGFyZSBhZGRlZCBhZnRlciB0aGUgY2FsbCB0byBgbWFwT2JqZWN0YCB3aWxsIG5vdCBiZSB2aXNpdGVkXG4gKiBieSBgY2FsbGJhY2tgLiBJZiB0aGUgdmFsdWVzIG9mIGV4aXN0aW5nIHByb3BlcnRpZXMgYXJlIGNoYW5nZWQsIHRoZSB2YWx1ZVxuICogcGFzc2VkIHRvIGBjYWxsYmFja2Agd2lsbCBiZSB0aGUgdmFsdWUgYXQgdGhlIHRpbWUgYG1hcE9iamVjdGAgdmlzaXRzIHRoZW0uXG4gKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGRlbGV0ZWQgYmVmb3JlIGJlaW5nIHZpc2l0ZWQgYXJlIG5vdCB2aXNpdGVkLlxuICpcbiAqIEBncmVwIGZ1bmN0aW9uIG9iamVjdE1hcCgpXG4gKiBAZ3JlcCBmdW5jdGlvbiBvYmpNYXAoKVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHsqfSBjb250ZXh0XG4gKiBAcmV0dXJuIHs/b2JqZWN0fVxuICovXG5mdW5jdGlvbiBtYXBPYmplY3Qob2JqZWN0LCBjYWxsYmFjaywgY29udGV4dCkge1xuICBpZiAoIW9iamVjdCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKSB7XG4gICAgICByZXN1bHRbbmFtZV0gPSBjYWxsYmFjay5jYWxsKGNvbnRleHQsIG9iamVjdFtuYW1lXSwgbmFtZSwgb2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBPYmplY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvbWFwT2JqZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gKlxuICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICpcbiAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICogICAgIH0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAqICAgfSk7XG4gKlxuICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICpcbiAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gKlxuICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICpcbiAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gKiAgICAgICAgICApO1xuICogICAgICAgIH1cbiAqICAgICAgfVxuICogICAgfSxcbiAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICogIH0pO1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5cbnZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbnZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcblxuICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyXG59O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG4vKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cbi8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG5mdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcbiAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdSZXF1aXJlZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHdhcyBub3Qgc3BlY2lmaWVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyhudWxsKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScpO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXkpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbmZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cbiAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH1cbiAgcmV0dXJuIHByb3BUeXBlO1xufVxuXG4vLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4vLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbmZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByb3BUeXBlO1xufVxuXG4vLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICByZXR1cm4gQU5PTllNT1VTO1xuICB9XG4gIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RWZXJzaW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICcxNS4wLjAnO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgb25seUNoaWxkXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzXG4gKiBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgYSBzaW5nbGUgY2hpbGQgZ2V0cyBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGVcbiAqIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG8gYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmVcbiAqIG9mIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdENvbXBvbmVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnb25seUNoaWxkIG11c3QgYmUgcGFzc2VkIGEgY2hpbGRyZW4gd2l0aCBleGFjdGx5IG9uZSBjaGlsZC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIHJldHVybiBjaGlsZHJlbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvbmx5Q2hpbGQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL29ubHlDaGlsZC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIFxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0VmVyc2lvbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFZlcnNpb24nKTtcblxudmFyIFJlYWN0QW55dGhpbmdNb3VudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ01vdW50Jyk7XG52YXIgUmVhY3RBbnl0aGluZ0luamVjdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0luamVjdGlvbicpO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIHJlbmRlciA9IFJlYWN0UGVyZi5tZWFzdXJlKCdSZWFjdCcsICdyZW5kZXInLCBSZWFjdEFueXRoaW5nTW91bnQucmVuZGVyKTtcblxuXG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZyA9IGZ1bmN0aW9uIChSZWFjdCwgbmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICBSZWFjdEFueXRoaW5nSW5qZWN0aW9uLmluamVjdChuYXRpdmVJbXBsZW1lbnRhdGlvbik7XG5cbiAgICB2YXIgUmVhY3RBbnl0aGluZyA9IHtcbiAgICAgICAgUmVhY3Q6IFJlYWN0LFxuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuICAgICAgICBjb21wb25lbnRzOiAobmF0aXZlSW1wbGVtZW50YXRpb24uY29tcG9uZW50cy50eXBlcyB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHRhZykge1xuICAgICAgICAgICAgYWNjW3RhZ10gPSB0YWc7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlYWN0QW55dGhpbmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVJlYWN0QW55dGhpbmc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFBlcmZcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVhY3RQZXJmIGlzIGEgZ2VuZXJhbCBBT1Agc3lzdGVtIGRlc2lnbmVkIHRvIG1lYXN1cmUgcGVyZm9ybWFuY2UuIFRoaXNcbiAqIG1vZHVsZSBvbmx5IGhhcyB0aGUgaG9va3M6IHNlZSBSZWFjdERlZmF1bHRQZXJmIGZvciB0aGUgYW5hbHlzaXMgdG9vbC5cbiAqL1xuXG52YXIgUmVhY3RQZXJmID0ge1xuICAvKipcbiAgICogQm9vbGVhbiB0byBlbmFibGUvZGlzYWJsZSBtZWFzdXJlbWVudC4gU2V0IHRvIGZhbHNlIGJ5IGRlZmF1bHQgdG8gcHJldmVudFxuICAgKiBhY2NpZGVudGFsIGxvZ2dpbmcgYW5kIHBlcmYgbG9zcy5cbiAgICovXG4gIGVuYWJsZU1lYXN1cmU6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBIb2xkcyBvbnRvIHRoZSBtZWFzdXJlIGZ1bmN0aW9uIGluIHVzZS4gQnkgZGVmYXVsdCwgZG9uJ3QgbWVhc3VyZVxuICAgKiBhbnl0aGluZywgYnV0IHdlJ2xsIG92ZXJyaWRlIHRoaXMgaWYgd2UgaW5qZWN0IGEgbWVhc3VyZSBmdW5jdGlvbi5cbiAgICovXG4gIHN0b3JlZE1lYXN1cmU6IF9ub01lYXN1cmUsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVjdE5hbWVcbiAgICogQHBhcmFtIHtvYmplY3Q8c3RyaW5nPn0gbWV0aG9kTmFtZXNcbiAgICovXG4gIG1lYXN1cmVNZXRob2RzOiBmdW5jdGlvbiAob2JqZWN0LCBvYmplY3ROYW1lLCBtZXRob2ROYW1lcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgaWYgKCFtZXRob2ROYW1lcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgb2JqZWN0W2tleV0gPSBSZWFjdFBlcmYubWVhc3VyZShvYmplY3ROYW1lLCBtZXRob2ROYW1lc1trZXldLCBvYmplY3Rba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyB0byB3cmFwIG1ldGhvZHMgeW91IHdhbnQgdG8gbWVhc3VyZS4gWmVybyBvdmVyaGVhZCBpbiBwcm9kdWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqTmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm5OYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICogQHJldHVybiB7ZnVuY3Rpb259XG4gICAqL1xuICBtZWFzdXJlOiBmdW5jdGlvbiAob2JqTmFtZSwgZm5OYW1lLCBmdW5jKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtZWFzdXJlZEZ1bmMgPSBudWxsO1xuICAgICAgdmFyIHdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChSZWFjdFBlcmYuZW5hYmxlTWVhc3VyZSkge1xuICAgICAgICAgIGlmICghbWVhc3VyZWRGdW5jKSB7XG4gICAgICAgICAgICBtZWFzdXJlZEZ1bmMgPSBSZWFjdFBlcmYuc3RvcmVkTWVhc3VyZShvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWVhc3VyZWRGdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICB3cmFwcGVyLmRpc3BsYXlOYW1lID0gb2JqTmFtZSArICdfJyArIGZuTmFtZTtcbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYztcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZWFzdXJlXG4gICAgICovXG4gICAgaW5qZWN0TWVhc3VyZTogZnVuY3Rpb24gKG1lYXN1cmUpIHtcbiAgICAgIFJlYWN0UGVyZi5zdG9yZWRNZWFzdXJlID0gbWVhc3VyZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogU2ltcGx5IHBhc3NlcyB0aHJvdWdoIHRoZSBtZWFzdXJlZCBmdW5jdGlvbiwgd2l0aG91dCBtZWFzdXJpbmcgaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9iak5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmbk5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfbm9NZWFzdXJlKG9iak5hbWUsIGZuTmFtZSwgZnVuYykge1xuICByZXR1cm4gZnVuYztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFBlcmY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UGVyZi5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RNb3VudC5qc1xuICogIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiAgXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0VXBkYXRlUXVldWUgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZScpO1xudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFVwZGF0ZXMnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RJbnN0cnVtZW50YXRpb24gPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcblxudmFyIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIFJlYWN0QW55dGhpbmdDb250YWluZXJJbmZvID0gcmVxdWlyZSgnLi9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbycpO1xuXG52YXIgbW91bnRlZFJvb3RDb21wb25lbnRzID0ge307XG52YXIgbW91bnRlZEltYWdlcyA9IHt9O1xudmFyIF9fREVWX18gPSB0cnVlO1xuXG5cbmZ1bmN0aW9uIGJhdGNoZWRNb3VudENvbXBvbmVudEludG9Ob2RlKGNvbXBvbmVudEluc3RhbmNlLCBjb250YWluZXJOYW1lLCBjb250ZXh0KSB7XG4gICAgdmFyIHRyYW5zYWN0aW9uID0gUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24uZ2V0UG9vbGVkKGZhbHNlKTtcbiAgICB0cmFuc2FjdGlvbi5wZXJmb3JtKFxuICAgICAgICBtb3VudENvbXBvbmVudEludG9Ob2RlLFxuICAgICAgICBudWxsLFxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgY29udGFpbmVyTmFtZSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbnRleHRcbiAgICApO1xuICAgIFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLnJlbGVhc2UodHJhbnNhY3Rpb24pO1xufVxuXG5cbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50SW50b05vZGUoY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgdmFyIG1hcmtlck5hbWU7XG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gY29tcG9uZW50SW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcbiAgICAgICAgbWFya2VyTmFtZSA9ICdSZWFjdCBtb3VudDogJyArIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlIDpcbiAgICAgICAgICAgICAgICB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS50aW1lKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIHZhciBtYXJrdXAgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgbnVsbCxcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8oY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUpLFxuICAgICAgICBjb250ZXh0XG4gICAgKTtcblxuICAgIGlmIChtYXJrZXJOYW1lKSB7XG4gICAgICAgIGNvbnNvbGUudGltZUVuZChtYXJrZXJOYW1lKTtcbiAgICB9XG5cbiAgICBSZWFjdEFueXRoaW5nTW91bnQuX21vdW50SW1hZ2VJbnRvTm9kZShcbiAgICAgICAgbWFya3VwLFxuICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICBjb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGNvbnRleHRcbiAgICApO1xufVxuXG5cbnZhciBSZWFjdEFueXRoaW5nTW91bnQgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIGNvbnRhaW5lck5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChuZXh0RWxlbWVudCksXG4gICAgICAgICAgICAnUmVhY3RBbnl0aW5nLnJlbmRlcigpOiBJbnZhbGlkIGNvbXBvbmVudCBlbGVtZW50LiVzJyxcbiAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICB0eXBlb2YgbmV4dEVsZW1lbnQgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgICAgICAnIEluc3RlYWQgb2YgcGFzc2luZyBhIHN0cmluZyBsaWtlIFxcJ2RpdlxcJywgcGFzcyAnICtcbiAgICAgICAgICAgICAgICAnUmVhY3QuY3JlYXRlRWxlbWVudChcXCdkaXZcXCcpIG9yIDxkaXYgLz4uJyA6XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBuZXh0RWxlbWVudCA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgICAgICAgICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgY2xhc3MgbGlrZSBGb28sIHBhc3MgJyArXG4gICAgICAgICAgICAgICAgICAgICdSZWFjdC5jcmVhdGVFbGVtZW50KEZvbykgb3IgPEZvbyAvPi4nIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGl0IHF1YWNrcyBsaWtlIGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50ICE9IG51bGwgJiYgbmV4dEVsZW1lbnQucHJvcHMgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAnIFRoaXMgbWF5IGJlIGNhdXNlZCBieSB1bmludGVudGlvbmFsbHkgbG9hZGluZyB0d28gaW5kZXBlbmRlbnQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29waWVzIG9mIFJlYWN0LicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgIGNvbnRhaW5lck5hbWUgJiYgdHlwZW9mIGNvbnRhaW5lck5hbWUgPT09ICdzdHJpbmcnLFxuICAgICAgICAgICAgJ3JlbmRlcigpOiBjb250YWluZXJOYW1lIG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHByZXZDb21wb25lbnQgPSBtb3VudGVkUm9vdENvbXBvbmVudHNbY29udGFpbmVyTmFtZV07XG5cbiAgICAgICAgaWYgKHByZXZDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHZhciBwcmV2RWxlbWVudCA9IHByZXZDb21wb25lbnQuX2N1cnJlbnRFbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgIHZhciBwdWJsaWNJbnN0ID0gcHJldkNvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZENhbGxiYWNrID0gY2FsbGJhY2sgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbChwdWJsaWNJbnN0KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBSZWFjdEFueXRoaW5nTW91bnQuX3VwZGF0ZVJvb3RDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgICAgIHByZXZDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIG5leHRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQ2FsbGJhY2tcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwdWJsaWNJbnN0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBSZWFjdEFueXRoaW5nTW91bnQuX3VubW91bnRSb290Q29tcG9uZW50KGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29tcG9uZW50ID0gUmVhY3RBbnl0aGluZ01vdW50Ll9yZW5kZXJOZXdSb290Q29tcG9uZW50KG5leHRFbGVtZW50LCBjb250YWluZXJOYW1lKTtcblxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUm9vdENvbXBvbmVudDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG5cbiAgICBfdW5tb3VudFJvb3RDb21wb25lbnQ6IGZ1bmN0aW9uIChjb250YWluZXJOYW1lKSB7XG4gICAgfSxcbiAgICBcbiAgICBfcmVuZGVyTmV3Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCBjb250YWluZXJOYW1lKSB7XG4gICAgICAgIC8vIFZhcmlvdXMgcGFydHMgb2Ygb3VyIGNvZGUgKHN1Y2ggYXMgUmVhY3RDb21wb3NpdGVDb21wb25lbnQnc1xuICAgICAgICAvLyBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KSBhc3N1bWUgdGhhdCBjYWxscyB0byByZW5kZXIgYXJlbid0IG5lc3RlZDtcbiAgICAgICAgLy8gdmVyaWZ5IHRoYXQgdGhhdCdzIHRoZSBjYXNlLlxuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9PSBudWxsLFxuICAgICAgICAgICAgJ19yZW5kZXJOZXdSb290Q29tcG9uZW50KCk6IFJlbmRlciBtZXRob2RzIHNob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gJyArXG4gICAgICAgICAgICAnb2YgcHJvcHMgYW5kIHN0YXRlOyB0cmlnZ2VyaW5nIG5lc3RlZCBjb21wb25lbnQgdXBkYXRlcyBmcm9tICcgK1xuICAgICAgICAgICAgJ3JlbmRlciBpcyBub3QgYWxsb3dlZC4gSWYgbmVjZXNzYXJ5LCB0cmlnZ2VyIG5lc3RlZCB1cGRhdGVzIGluICcgK1xuICAgICAgICAgICAgJ2NvbXBvbmVudERpZFVwZGF0ZS4gQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgJXMuJyxcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgJiYgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCkgfHxcbiAgICAgICAgICAgICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCdcbiAgICAgICAgKTtcblxuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBjb250YWluZXJOYW1lICYmIHR5cGVvZiBjb250YWluZXJOYW1lID09PSAnc3RyaW5nJyxcbiAgICAgICAgICAgICdfcmVnaXN0ZXJDb21wb25lbnQoLi4uKTogVGFyZ2V0IGNvbnRhaW5lck5hbWUgaXMgbm90IGEgc3RyaW5nLidcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgY29tcG9uZW50SW5zdGFuY2UgPSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRFbGVtZW50KTtcblxuICAgICAgICAvLyBUaGUgaW5pdGlhbCByZW5kZXIgaXMgc3luY2hyb25vdXMgYnV0IGFueSB1cGRhdGVzIHRoYXQgaGFwcGVuIGR1cmluZ1xuICAgICAgICAvLyByZW5kZXJpbmcsIGluIGNvbXBvbmVudFdpbGxNb3VudCBvciBjb21wb25lbnREaWRNb3VudCwgd2lsbCBiZSBiYXRjaGVkXG4gICAgICAgIC8vIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBiYXRjaGluZyBzdHJhdGVneS5cblxuICAgICAgICBSZWFjdFVwZGF0ZXMuYmF0Y2hlZFVwZGF0ZXMoXG4gICAgICAgICAgICBiYXRjaGVkTW91bnRDb21wb25lbnRJbnRvTm9kZSxcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICAgICAgY29udGFpbmVyTmFtZSxcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBtb3VudGVkUm9vdENvbXBvbmVudHNbY29udGFpbmVyTmFtZV0gPSBjb21wb25lbnRJbnN0YW5jZTtcblxuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uTW91bnRSb290Q29tcG9uZW50KGNvbXBvbmVudEluc3RhbmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJbnN0YW5jZTtcbiAgICB9LFxuXG5cbiAgICBfbW91bnRJbWFnZUludG9Ob2RlOiBmdW5jdGlvbiAobWFya3VwLCBjb250YWluZXJOYW1lLCBpbWFnZSwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgdHlwZW9mIGNvbnRhaW5lck5hbWUgPT09ICdzdHJpbmcnLFxuICAgICAgICAgICAgJ21vdW50Q29tcG9uZW50SW50b05vZGUoLi4uKTogVGFyZ2V0IGNvbnRhaW5lciBpcyBub3QgdmFsaWQuJ1xuICAgICAgICApO1xuXG4gICAgICAgIG1vdW50ZWRJbWFnZXNbY29udGFpbmVyTmFtZV0gPSBpbWFnZTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdNb3VudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nTW91bnQuanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RVcGRhdGVRdWV1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSByZXF1aXJlKCcuL1JlYWN0SW5zdGFuY2VNYXAnKTtcbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlcycpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKSB7XG4gIFJlYWN0VXBkYXRlcy5lbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRVbmV4cGVjdGVkQXJndW1lbnQoYXJnKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGFyZztcbiAgaWYgKHR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbiAgdmFyIGRpc3BsYXlOYW1lID0gYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lIHx8IHR5cGU7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYXJnKTtcbiAgaWYgKGtleXMubGVuZ3RoID4gMCAmJiBrZXlzLmxlbmd0aCA8IDIwKSB7XG4gICAgcmV0dXJuIGRpc3BsYXlOYW1lICsgJyAoa2V5czogJyArIGtleXMuam9pbignLCAnKSArICcpJztcbiAgfVxuICByZXR1cm4gZGlzcGxheU5hbWU7XG59XG5cbmZ1bmN0aW9uIGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KHB1YmxpY0luc3RhbmNlKTtcbiAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIE9ubHkgd2FybiB3aGVuIHdlIGhhdmUgYSBjYWxsZXJOYW1lLiBPdGhlcndpc2Ugd2Ugc2hvdWxkIGJlIHNpbGVudC5cbiAgICAgIC8vIFdlJ3JlIHByb2JhYmx5IGNhbGxpbmcgZnJvbSBlbnF1ZXVlQ2FsbGJhY2suIFdlIGRvbid0IHdhbnQgdG8gd2FyblxuICAgICAgLy8gdGhlcmUgYmVjYXVzZSB3ZSBhbHJlYWR5IHdhcm5lZCBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgbGlmZWN5Y2xlIG1ldGhvZC5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFjYWxsZXJOYW1lLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPT0gbnVsbCwgJyVzKC4uLik6IENhbm5vdCB1cGRhdGUgZHVyaW5nIGFuIGV4aXN0aW5nIHN0YXRlIHRyYW5zaXRpb24gKHN1Y2ggYXMgJyArICd3aXRoaW4gYHJlbmRlcmAgb3IgYW5vdGhlciBjb21wb25lbnRcXCdzIGNvbnN0cnVjdG9yKS4gUmVuZGVyIG1ldGhvZHMgJyArICdzaG91bGQgYmUgYSBwdXJlIGZ1bmN0aW9uIG9mIHByb3BzIGFuZCBzdGF0ZTsgY29uc3RydWN0b3IgJyArICdzaWRlLWVmZmVjdHMgYXJlIGFuIGFudGktcGF0dGVybiwgYnV0IGNhbiBiZSBtb3ZlZCB0byAnICsgJ2Bjb21wb25lbnRXaWxsTW91bnRgLicsIGNhbGxlck5hbWUpIDogdm9pZCAwO1xuICB9XG5cbiAgcmV0dXJuIGludGVybmFsSW5zdGFuY2U7XG59XG5cbi8qKlxuICogUmVhY3RVcGRhdGVRdWV1ZSBhbGxvd3MgZm9yIHN0YXRlIHVwZGF0ZXMgdG8gYmUgc2NoZWR1bGVkIGludG8gYSBsYXRlclxuICogcmVjb25jaWxpYXRpb24gc3RlcC5cbiAqL1xudmFyIFJlYWN0VXBkYXRlUXVldWUgPSB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgICBpZiAob3duZXIgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcob3duZXIuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyLCAnJXMgaXMgYWNjZXNzaW5nIGlzTW91bnRlZCBpbnNpZGUgaXRzIHJlbmRlcigpIGZ1bmN0aW9uLiAnICsgJ3JlbmRlcigpIHNob3VsZCBiZSBhIHB1cmUgZnVuY3Rpb24gb2YgcHJvcHMgYW5kIHN0YXRlLiBJdCBzaG91bGQgJyArICduZXZlciBhY2Nlc3Mgc29tZXRoaW5nIHRoYXQgcmVxdWlyZXMgc3RhbGUgZGF0YSBmcm9tIHRoZSBwcmV2aW91cyAnICsgJ3JlbmRlciwgc3VjaCBhcyByZWZzLiBNb3ZlIHRoaXMgbG9naWMgdG8gY29tcG9uZW50RGlkTW91bnQgYW5kICcgKyAnY29tcG9uZW50RGlkVXBkYXRlIGluc3RlYWQuJywgb3duZXIuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgICBvd25lci5fd2FybmVkQWJvdXRSZWZzSW5SZW5kZXIgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KHB1YmxpY0luc3RhbmNlKTtcbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgLy8gRHVyaW5nIGNvbXBvbmVudFdpbGxNb3VudCBhbmQgcmVuZGVyIHRoaXMgd2lsbCBzdGlsbCBiZSBudWxsIGJ1dCBhZnRlclxuICAgICAgLy8gdGhhdCB3aWxsIGFsd2F5cyByZW5kZXIgdG8gc29tZXRoaW5nLiBBdCBsZWFzdCBmb3Igbm93LiBTbyB3ZSBjYW4gdXNlXG4gICAgICAvLyB0aGlzIGhhY2suXG4gICAgICByZXR1cm4gISFpbnRlcm5hbEluc3RhbmNlLl9yZW5kZXJlZENvbXBvbmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgdGhlIHBlbmRpbmcgdXBkYXRlc1xuICAgKiBoYXZlIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdG8gdXNlIGFzIGB0aGlzYCBjb250ZXh0LlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjYWxsZXJOYW1lIE5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUNhbGxiYWNrOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgUmVhY3RVcGRhdGVRdWV1ZS52YWxpZGF0ZUNhbGxiYWNrKGNhbGxiYWNrLCBjYWxsZXJOYW1lKTtcbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSk7XG5cbiAgICAvLyBQcmV2aW91c2x5IHdlIHdvdWxkIHRocm93IGFuIGVycm9yIGlmIHdlIGRpZG4ndCBoYXZlIGFuIGludGVybmFsXG4gICAgLy8gaW5zdGFuY2UuIFNpbmNlIHdlIHdhbnQgdG8gbWFrZSBpdCBhIG5vLW9wIGluc3RlYWQsIHdlIG1pcnJvciB0aGUgc2FtZVxuICAgIC8vIGJlaGF2aW9yIHdlIGhhdmUgaW4gb3RoZXIgZW5xdWV1ZSogbWV0aG9kcy5cbiAgICAvLyBXZSBhbHNvIG5lZWQgdG8gaWdub3JlIGNhbGxiYWNrcyBpbiBjb21wb25lbnRXaWxsTW91bnQuIFNlZVxuICAgIC8vIGVucXVldWVVcGRhdGVzLlxuICAgIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdDYWxsYmFja3MpIHtcbiAgICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdDYWxsYmFja3MgPSBbY2FsbGJhY2tdO1xuICAgIH1cbiAgICAvLyBUT0RPOiBUaGUgY2FsbGJhY2sgaGVyZSBpcyBpZ25vcmVkIHdoZW4gc2V0U3RhdGUgaXMgY2FsbGVkIGZyb21cbiAgICAvLyBjb21wb25lbnRXaWxsTW91bnQuIEVpdGhlciBmaXggaXQgb3IgZGlzYWxsb3cgZG9pbmcgc28gY29tcGxldGVseSBpblxuICAgIC8vIGZhdm9yIG9mIGdldEluaXRpYWxTdGF0ZS4gQWx0ZXJuYXRpdmVseSwgd2UgY2FuIGRpc2FsbG93XG4gICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGR1cmluZyBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICBlbnF1ZXVlQ2FsbGJhY2tJbnRlcm5hbDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdDYWxsYmFja3MpIHtcbiAgICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdDYWxsYmFja3MgPSBbY2FsbGJhY2tdO1xuICAgIH1cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuXG4gICAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gdHJ1ZTtcblxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuXG4gICAgaWYgKCFpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ1N0YXRlUXVldWUgPSBbY29tcGxldGVTdGF0ZV07XG4gICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IHRydWU7XG5cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcblxuICAgIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBxdWV1ZSA9IGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdTdGF0ZVF1ZXVlIHx8IChpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IFtdKTtcbiAgICBxdWV1ZS5wdXNoKHBhcnRpYWxTdGF0ZSk7XG5cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIGVucXVldWVFbGVtZW50SW50ZXJuYWw6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBuZXdFbGVtZW50KSB7XG4gICAgaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ0VsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgdmFsaWRhdGVDYWxsYmFjazogZnVuY3Rpb24gKGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgISghY2FsbGJhY2sgfHwgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcyguLi4pOiBFeHBlY3RlZCB0aGUgbGFzdCBvcHRpb25hbCBgY2FsbGJhY2tgIGFyZ3VtZW50IHRvIGJlIGEgJyArICdmdW5jdGlvbi4gSW5zdGVhZCByZWNlaXZlZDogJXMuJywgY2FsbGVyTmFtZSwgZm9ybWF0VW5leHBlY3RlZEFyZ3VtZW50KGNhbGxiYWNrKSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RVcGRhdGVRdWV1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEluc3RhbmNlTWFwXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGBSZWFjdEluc3RhbmNlTWFwYCBtYWludGFpbnMgYSBtYXBwaW5nIGZyb20gYSBwdWJsaWMgZmFjaW5nIHN0YXRlZnVsXG4gKiBpbnN0YW5jZSAoa2V5KSBhbmQgdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uICh2YWx1ZSkuIFRoaXMgYWxsb3dzIHB1YmxpY1xuICogbWV0aG9kcyB0byBhY2NlcHQgdGhlIHVzZXIgZmFjaW5nIGluc3RhbmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBtYXAgdGhlbSBiYWNrXG4gKiB0byBpbnRlcm5hbCBtZXRob2RzLlxuICovXG5cbi8vIFRPRE86IFJlcGxhY2UgdGhpcyB3aXRoIEVTNjogdmFyIFJlYWN0SW5zdGFuY2VNYXAgPSBuZXcgTWFwKCk7XG5cbnZhciBSZWFjdEluc3RhbmNlTWFwID0ge1xuXG4gIC8qKlxuICAgKiBUaGlzIEFQSSBzaG91bGQgYmUgY2FsbGVkIGBkZWxldGVgIGJ1dCB3ZSdkIGhhdmUgdG8gbWFrZSBzdXJlIHRvIGFsd2F5c1xuICAgKiB0cmFuc2Zvcm0gdGhlc2UgdG8gc3RyaW5ncyBmb3IgSUUgc3VwcG9ydC4gV2hlbiB0aGlzIHRyYW5zZm9ybSBpcyBmdWxseVxuICAgKiBzdXBwb3J0ZWQgd2UgY2FuIHJlbmFtZSBpdC5cbiAgICovXG4gIHJlbW92ZTogZnVuY3Rpb24gKGtleSkge1xuICAgIGtleS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZTtcbiAgfSxcblxuICBoYXM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgIT09IHVuZGVmaW5lZDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgPSB2YWx1ZTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0SW5zdGFuY2VNYXA7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW5zdGFuY2VNYXAuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RVcGRhdGVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIENhbGxiYWNrUXVldWUgPSByZXF1aXJlKCcuL0NhbGxiYWNrUXVldWUnKTtcbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJy4vUG9vbGVkQ2xhc3MnKTtcbnZhciBSZWFjdEZlYXR1cmVGbGFncyA9IHJlcXVpcmUoJy4vUmVhY3RGZWF0dXJlRmxhZ3MnKTtcbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCcuL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1RyYW5zYWN0aW9uJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIGRpcnR5Q29tcG9uZW50cyA9IFtdO1xudmFyIGFzYXBDYWxsYmFja1F1ZXVlID0gQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQoKTtcbnZhciBhc2FwRW5xdWV1ZWQgPSBmYWxzZTtcblxudmFyIGJhdGNoaW5nU3RyYXRlZ3kgPSBudWxsO1xuXG5mdW5jdGlvbiBlbnN1cmVJbmplY3RlZCgpIHtcbiAgIShSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiAmJiBiYXRjaGluZ1N0cmF0ZWd5KSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgaW5qZWN0IGEgcmVjb25jaWxlIHRyYW5zYWN0aW9uIGNsYXNzIGFuZCBiYXRjaGluZyAnICsgJ3N0cmF0ZWd5JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xufVxuXG52YXIgTkVTVEVEX1VQREFURVMgPSB7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCA9IGRpcnR5Q29tcG9uZW50cy5sZW5ndGg7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoICE9PSBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBBZGRpdGlvbmFsIHVwZGF0ZXMgd2VyZSBlbnF1ZXVlZCBieSBjb21wb25lbnREaWRVcGRhdGUgaGFuZGxlcnMgb3JcbiAgICAgIC8vIHNpbWlsYXI7IGJlZm9yZSBvdXIgb3duIFVQREFURV9RVUVVRUlORyB3cmFwcGVyIGNsb3Nlcywgd2Ugd2FudCB0byBydW5cbiAgICAgIC8vIHRoZXNlIG5ldyB1cGRhdGVzIHNvIHRoYXQgaWYgQSdzIGNvbXBvbmVudERpZFVwZGF0ZSBjYWxscyBzZXRTdGF0ZSBvblxuICAgICAgLy8gQiwgQiB3aWxsIHVwZGF0ZSBiZWZvcmUgdGhlIGNhbGxiYWNrIEEncyB1cGRhdGVyIHByb3ZpZGVkIHdoZW4gY2FsbGluZ1xuICAgICAgLy8gc2V0U3RhdGUuXG4gICAgICBkaXJ0eUNvbXBvbmVudHMuc3BsaWNlKDAsIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoKTtcbiAgICAgIGZsdXNoQmF0Y2hlZFVwZGF0ZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlydHlDb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG59O1xuXG52YXIgVVBEQVRFX1FVRVVFSU5HID0ge1xuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLnJlc2V0KCk7XG4gIH0sXG4gIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLm5vdGlmeUFsbCgpO1xuICB9XG59O1xuXG52YXIgVFJBTlNBQ1RJT05fV1JBUFBFUlMgPSBbTkVTVEVEX1VQREFURVMsIFVQREFURV9RVUVVRUlOR107XG5cbmZ1bmN0aW9uIFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24oKSB7XG4gIHRoaXMucmVpbml0aWFsaXplVHJhbnNhY3Rpb24oKTtcbiAgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggPSBudWxsO1xuICB0aGlzLmNhbGxiYWNrUXVldWUgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpO1xuICB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uID0gUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24uZ2V0UG9vbGVkKFxuICAvKiB1c2VDcmVhdGVFbGVtZW50ICovdHJ1ZSk7XG59XG5cbl9hc3NpZ24oUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbi5wcm90b3R5cGUsIFRyYW5zYWN0aW9uLk1peGluLCB7XG4gIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVFJBTlNBQ1RJT05fV1JBUFBFUlM7XG4gIH0sXG5cbiAgZGVzdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoID0gbnVsbDtcbiAgICBDYWxsYmFja1F1ZXVlLnJlbGVhc2UodGhpcy5jYWxsYmFja1F1ZXVlKTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBudWxsO1xuICAgIFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLnJlbGVhc2UodGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbik7XG4gICAgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbiA9IG51bGw7XG4gIH0sXG5cbiAgcGVyZm9ybTogZnVuY3Rpb24gKG1ldGhvZCwgc2NvcGUsIGEpIHtcbiAgICAvLyBFc3NlbnRpYWxseSBjYWxscyBgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbi5wZXJmb3JtKG1ldGhvZCwgc2NvcGUsIGEpYFxuICAgIC8vIHdpdGggdGhpcyB0cmFuc2FjdGlvbidzIHdyYXBwZXJzIGFyb3VuZCBpdC5cbiAgICByZXR1cm4gVHJhbnNhY3Rpb24uTWl4aW4ucGVyZm9ybS5jYWxsKHRoaXMsIHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24ucGVyZm9ybSwgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbiwgbWV0aG9kLCBzY29wZSwgYSk7XG4gIH1cbn0pO1xuXG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbik7XG5cbmZ1bmN0aW9uIGJhdGNoZWRVcGRhdGVzKGNhbGxiYWNrLCBhLCBiLCBjLCBkLCBlKSB7XG4gIGVuc3VyZUluamVjdGVkKCk7XG4gIGJhdGNoaW5nU3RyYXRlZ3kuYmF0Y2hlZFVwZGF0ZXMoY2FsbGJhY2ssIGEsIGIsIGMsIGQsIGUpO1xufVxuXG4vKipcbiAqIEFycmF5IGNvbXBhcmF0b3IgZm9yIFJlYWN0Q29tcG9uZW50cyBieSBtb3VudCBvcmRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjMSBmaXJzdCBjb21wb25lbnQgeW91J3JlIGNvbXBhcmluZ1xuICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gYzIgc2Vjb25kIGNvbXBvbmVudCB5b3UncmUgY29tcGFyaW5nXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFJldHVybiB2YWx1ZSB1c2FibGUgYnkgQXJyYXkucHJvdG90eXBlLnNvcnQoKS5cbiAqL1xuZnVuY3Rpb24gbW91bnRPcmRlckNvbXBhcmF0b3IoYzEsIGMyKSB7XG4gIHJldHVybiBjMS5fbW91bnRPcmRlciAtIGMyLl9tb3VudE9yZGVyO1xufVxuXG5mdW5jdGlvbiBydW5CYXRjaGVkVXBkYXRlcyh0cmFuc2FjdGlvbikge1xuICB2YXIgbGVuID0gdHJhbnNhY3Rpb24uZGlydHlDb21wb25lbnRzTGVuZ3RoO1xuICAhKGxlbiA9PT0gZGlydHlDb21wb25lbnRzLmxlbmd0aCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgZmx1c2ggdHJhbnNhY3Rpb25cXCdzIHN0b3JlZCBkaXJ0eS1jb21wb25lbnRzIGxlbmd0aCAoJXMpIHRvICcgKyAnbWF0Y2ggZGlydHktY29tcG9uZW50cyBhcnJheSBsZW5ndGggKCVzKS4nLCBsZW4sIGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAvLyBTaW5jZSByZWNvbmNpbGluZyBhIGNvbXBvbmVudCBoaWdoZXIgaW4gdGhlIG93bmVyIGhpZXJhcmNoeSB1c3VhbGx5IChub3RcbiAgLy8gYWx3YXlzIC0tIHNlZSBzaG91bGRDb21wb25lbnRVcGRhdGUoKSkgd2lsbCByZWNvbmNpbGUgY2hpbGRyZW4sIHJlY29uY2lsZVxuICAvLyB0aGVtIGJlZm9yZSB0aGVpciBjaGlsZHJlbiBieSBzb3J0aW5nIHRoZSBhcnJheS5cbiAgZGlydHlDb21wb25lbnRzLnNvcnQobW91bnRPcmRlckNvbXBhcmF0b3IpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAvLyBJZiBhIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQgYmVmb3JlIHBlbmRpbmcgY2hhbmdlcyBhcHBseSwgaXQgd2lsbCBzdGlsbFxuICAgIC8vIGJlIGhlcmUsIGJ1dCB3ZSBhc3N1bWUgdGhhdCBpdCBoYXMgY2xlYXJlZCBpdHMgX3BlbmRpbmdDYWxsYmFja3MgYW5kXG4gICAgLy8gdGhhdCBwZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkgaXMgYSBub29wLlxuICAgIHZhciBjb21wb25lbnQgPSBkaXJ0eUNvbXBvbmVudHNbaV07XG5cbiAgICAvLyBJZiBwZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkgaGFwcGVucyB0byBlbnF1ZXVlIGFueSBuZXcgdXBkYXRlcywgd2VcbiAgICAvLyBzaG91bGRuJ3QgZXhlY3V0ZSB0aGUgY2FsbGJhY2tzIHVudGlsIHRoZSBuZXh0IHJlbmRlciBoYXBwZW5zLCBzb1xuICAgIC8vIHN0YXNoIHRoZSBjYWxsYmFja3MgZmlyc3RcbiAgICB2YXIgY2FsbGJhY2tzID0gY29tcG9uZW50Ll9wZW5kaW5nQ2FsbGJhY2tzO1xuICAgIGNvbXBvbmVudC5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG5cbiAgICB2YXIgbWFya2VyTmFtZTtcbiAgICBpZiAoUmVhY3RGZWF0dXJlRmxhZ3MubG9nVG9wTGV2ZWxSZW5kZXJzKSB7XG4gICAgICB2YXIgbmFtZWRDb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgICAvLyBEdWNrIHR5cGUgVG9wTGV2ZWxXcmFwcGVyLiBUaGlzIGlzIHByb2JhYmx5IGFsd2F5cyB0cnVlLlxuICAgICAgaWYgKGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQucHJvcHMgPT09IGNvbXBvbmVudC5fcmVuZGVyZWRDb21wb25lbnQuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgIG5hbWVkQ29tcG9uZW50ID0gY29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudDtcbiAgICAgIH1cbiAgICAgIG1hcmtlck5hbWUgPSAnUmVhY3QgdXBkYXRlOiAnICsgbmFtZWRDb21wb25lbnQuZ2V0TmFtZSgpO1xuICAgICAgY29uc29sZS50aW1lKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIFJlYWN0UmVjb25jaWxlci5wZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkoY29tcG9uZW50LCB0cmFuc2FjdGlvbi5yZWNvbmNpbGVUcmFuc2FjdGlvbik7XG5cbiAgICBpZiAobWFya2VyTmFtZSkge1xuICAgICAgY29uc29sZS50aW1lRW5kKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2FsbGJhY2tzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmNhbGxiYWNrUXVldWUuZW5xdWV1ZShjYWxsYmFja3Nbal0sIGNvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGZsdXNoQmF0Y2hlZFVwZGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24ncyB3cmFwcGVycyB3aWxsIGNsZWFyIHRoZSBkaXJ0eUNvbXBvbmVudHNcbiAgLy8gYXJyYXkgYW5kIHBlcmZvcm0gYW55IHVwZGF0ZXMgZW5xdWV1ZWQgYnkgbW91bnQtcmVhZHkgaGFuZGxlcnMgKGkuZS4sXG4gIC8vIGNvbXBvbmVudERpZFVwZGF0ZSkgYnV0IHdlIG5lZWQgdG8gY2hlY2sgaGVyZSB0b28gaW4gb3JkZXIgdG8gY2F0Y2hcbiAgLy8gdXBkYXRlcyBlbnF1ZXVlZCBieSBzZXRTdGF0ZSBjYWxsYmFja3MgYW5kIGFzYXAgY2FsbHMuXG4gIHdoaWxlIChkaXJ0eUNvbXBvbmVudHMubGVuZ3RoIHx8IGFzYXBFbnF1ZXVlZCkge1xuICAgIGlmIChkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgdHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uLmdldFBvb2xlZCgpO1xuICAgICAgdHJhbnNhY3Rpb24ucGVyZm9ybShydW5CYXRjaGVkVXBkYXRlcywgbnVsbCwgdHJhbnNhY3Rpb24pO1xuICAgICAgUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbi5yZWxlYXNlKHRyYW5zYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoYXNhcEVucXVldWVkKSB7XG4gICAgICBhc2FwRW5xdWV1ZWQgPSBmYWxzZTtcbiAgICAgIHZhciBxdWV1ZSA9IGFzYXBDYWxsYmFja1F1ZXVlO1xuICAgICAgYXNhcENhbGxiYWNrUXVldWUgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpO1xuICAgICAgcXVldWUubm90aWZ5QWxsKCk7XG4gICAgICBDYWxsYmFja1F1ZXVlLnJlbGVhc2UocXVldWUpO1xuICAgIH1cbiAgfVxufTtcbmZsdXNoQmF0Y2hlZFVwZGF0ZXMgPSBSZWFjdFBlcmYubWVhc3VyZSgnUmVhY3RVcGRhdGVzJywgJ2ZsdXNoQmF0Y2hlZFVwZGF0ZXMnLCBmbHVzaEJhdGNoZWRVcGRhdGVzKTtcblxuLyoqXG4gKiBNYXJrIGEgY29tcG9uZW50IGFzIG5lZWRpbmcgYSByZXJlbmRlciwgYWRkaW5nIGFuIG9wdGlvbmFsIGNhbGxiYWNrIHRvIGFcbiAqIGxpc3Qgb2YgZnVuY3Rpb25zIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb25jZSB0aGUgcmVyZW5kZXIgb2NjdXJzLlxuICovXG5mdW5jdGlvbiBlbnF1ZXVlVXBkYXRlKGNvbXBvbmVudCkge1xuICBlbnN1cmVJbmplY3RlZCgpO1xuXG4gIC8vIFZhcmlvdXMgcGFydHMgb2Ygb3VyIGNvZGUgKHN1Y2ggYXMgUmVhY3RDb21wb3NpdGVDb21wb25lbnQnc1xuICAvLyBfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KSBhc3N1bWUgdGhhdCBjYWxscyB0byByZW5kZXIgYXJlbid0IG5lc3RlZDtcbiAgLy8gdmVyaWZ5IHRoYXQgdGhhdCdzIHRoZSBjYXNlLiAoVGhpcyBpcyBjYWxsZWQgYnkgZWFjaCB0b3AtbGV2ZWwgdXBkYXRlXG4gIC8vIGZ1bmN0aW9uLCBsaWtlIHNldFByb3BzLCBzZXRTdGF0ZSwgZm9yY2VVcGRhdGUsIGV0Yy47IGNyZWF0aW9uIGFuZFxuICAvLyBkZXN0cnVjdGlvbiBvZiB0b3AtbGV2ZWwgY29tcG9uZW50cyBpcyBndWFyZGVkIGluIFJlYWN0TW91bnQuKVxuXG4gIGlmICghYmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcykge1xuICAgIGJhdGNoaW5nU3RyYXRlZ3kuYmF0Y2hlZFVwZGF0ZXMoZW5xdWV1ZVVwZGF0ZSwgY29tcG9uZW50KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBkaXJ0eUNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xufVxuXG4vKipcbiAqIEVucXVldWUgYSBjYWxsYmFjayB0byBiZSBydW4gYXQgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBiYXRjaGluZyBjeWNsZS4gVGhyb3dzXG4gKiBpZiBubyB1cGRhdGVzIGFyZSBjdXJyZW50bHkgYmVpbmcgcGVyZm9ybWVkLlxuICovXG5mdW5jdGlvbiBhc2FwKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICFiYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlcy5hc2FwOiBDYW5cXCd0IGVucXVldWUgYW4gYXNhcCBjYWxsYmFjayBpbiBhIGNvbnRleHQgd2hlcmUnICsgJ3VwZGF0ZXMgYXJlIG5vdCBiZWluZyBiYXRjaGVkLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgYXNhcENhbGxiYWNrUXVldWUuZW5xdWV1ZShjYWxsYmFjaywgY29udGV4dCk7XG4gIGFzYXBFbnF1ZXVlZCA9IHRydWU7XG59XG5cbnZhciBSZWFjdFVwZGF0ZXNJbmplY3Rpb24gPSB7XG4gIGluamVjdFJlY29uY2lsZVRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoUmVjb25jaWxlVHJhbnNhY3Rpb24pIHtcbiAgICAhUmVjb25jaWxlVHJhbnNhY3Rpb24gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYSByZWNvbmNpbGUgdHJhbnNhY3Rpb24gY2xhc3MnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24gPSBSZWNvbmNpbGVUcmFuc2FjdGlvbjtcbiAgfSxcblxuICBpbmplY3RCYXRjaGluZ1N0cmF0ZWd5OiBmdW5jdGlvbiAoX2JhdGNoaW5nU3RyYXRlZ3kpIHtcbiAgICAhX2JhdGNoaW5nU3RyYXRlZ3kgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYSBiYXRjaGluZyBzdHJhdGVneScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAhKHR5cGVvZiBfYmF0Y2hpbmdTdHJhdGVneS5iYXRjaGVkVXBkYXRlcyA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYSBiYXRjaGVkVXBkYXRlcygpIGZ1bmN0aW9uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIF9iYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID09PSAnYm9vbGVhbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBwcm92aWRlIGFuIGlzQmF0Y2hpbmdVcGRhdGVzIGJvb2xlYW4gYXR0cmlidXRlJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIGJhdGNoaW5nU3RyYXRlZ3kgPSBfYmF0Y2hpbmdTdHJhdGVneTtcbiAgfVxufTtcblxudmFyIFJlYWN0VXBkYXRlcyA9IHtcbiAgLyoqXG4gICAqIFJlYWN0IHJlZmVyZW5jZXMgYFJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb25gIHVzaW5nIHRoaXMgcHJvcGVydHkgaW4gb3JkZXJcbiAgICogdG8gYWxsb3cgZGVwZW5kZW5jeSBpbmplY3Rpb24uXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbjogbnVsbCxcblxuICBiYXRjaGVkVXBkYXRlczogYmF0Y2hlZFVwZGF0ZXMsXG4gIGVucXVldWVVcGRhdGU6IGVucXVldWVVcGRhdGUsXG4gIGZsdXNoQmF0Y2hlZFVwZGF0ZXM6IGZsdXNoQmF0Y2hlZFVwZGF0ZXMsXG4gIGluamVjdGlvbjogUmVhY3RVcGRhdGVzSW5qZWN0aW9uLFxuICBhc2FwOiBhc2FwXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VXBkYXRlcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIENhbGxiYWNrUXVldWVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHBzZXVkby1ldmVudCBtb2R1bGUgdG8gaGVscCBrZWVwIHRyYWNrIG9mIGNvbXBvbmVudHMgd2FpdGluZyB0b1xuICogYmUgbm90aWZpZWQgd2hlbiB0aGVpciBET00gcmVwcmVzZW50YXRpb25zIGFyZSBhdmFpbGFibGUgZm9yIHVzZS5cbiAqXG4gKiBUaGlzIGltcGxlbWVudHMgYFBvb2xlZENsYXNzYCwgc28geW91IHNob3VsZCBuZXZlciBuZWVkIHRvIGluc3RhbnRpYXRlIHRoaXMuXG4gKiBJbnN0ZWFkLCB1c2UgYENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKClgLlxuICpcbiAqIEBjbGFzcyBSZWFjdE1vdW50UmVhZHlcbiAqIEBpbXBsZW1lbnRzIFBvb2xlZENsYXNzXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gQ2FsbGJhY2tRdWV1ZSgpIHtcbiAgdGhpcy5fY2FsbGJhY2tzID0gbnVsbDtcbiAgdGhpcy5fY29udGV4dHMgPSBudWxsO1xufVxuXG5fYXNzaWduKENhbGxiYWNrUXVldWUucHJvdG90eXBlLCB7XG5cbiAgLyoqXG4gICAqIEVucXVldWVzIGEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGBub3RpZnlBbGxgIGlzIGludm9rZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEludm9rZWQgd2hlbiBgbm90aWZ5QWxsYCBpcyBpbnZva2VkLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IGNvbnRleHQgQ29udGV4dCB0byBjYWxsIGBjYWxsYmFja2Agd2l0aC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlOiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwgW107XG4gICAgdGhpcy5fY29udGV4dHMgPSB0aGlzLl9jb250ZXh0cyB8fCBbXTtcbiAgICB0aGlzLl9jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgdGhpcy5fY29udGV4dHMucHVzaChjb250ZXh0KTtcbiAgfSxcblxuICAvKipcbiAgICogSW52b2tlcyBhbGwgZW5xdWV1ZWQgY2FsbGJhY2tzIGFuZCBjbGVhcnMgdGhlIHF1ZXVlLiBUaGlzIGlzIGludm9rZWQgYWZ0ZXJcbiAgICogdGhlIERPTSByZXByZXNlbnRhdGlvbiBvZiBhIGNvbXBvbmVudCBoYXMgYmVlbiBjcmVhdGVkIG9yIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgbm90aWZ5QWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcztcbiAgICB2YXIgY29udGV4dHMgPSB0aGlzLl9jb250ZXh0cztcbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAhKGNhbGxiYWNrcy5sZW5ndGggPT09IGNvbnRleHRzLmxlbmd0aCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnTWlzbWF0Y2hlZCBsaXN0IG9mIGNvbnRleHRzIGluIGNhbGxiYWNrIHF1ZXVlJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgdGhpcy5fY2FsbGJhY2tzID0gbnVsbDtcbiAgICAgIHRoaXMuX2NvbnRleHRzID0gbnVsbDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNhbGxiYWNrc1tpXS5jYWxsKGNvbnRleHRzW2ldKTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrcy5sZW5ndGggPSAwO1xuICAgICAgY29udGV4dHMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH0sXG5cbiAgY2hlY2twb2ludDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3MgPyB0aGlzLl9jYWxsYmFja3MubGVuZ3RoIDogMDtcbiAgfSxcblxuICByb2xsYmFjazogZnVuY3Rpb24gKGxlbikge1xuICAgIGlmICh0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5sZW5ndGggPSBsZW47XG4gICAgICB0aGlzLl9jb250ZXh0cy5sZW5ndGggPSBsZW47XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGludGVybmFsIHF1ZXVlLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0gbnVsbDtcbiAgICB0aGlzLl9jb250ZXh0cyA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGBQb29sZWRDbGFzc2AgbG9va3MgZm9yIHRoaXMuXG4gICAqL1xuICBkZXN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbn0pO1xuXG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oQ2FsbGJhY2tRdWV1ZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tRdWV1ZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvQ2FsbGJhY2tRdWV1ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEZlYXR1cmVGbGFnc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RmVhdHVyZUZsYWdzID0ge1xuICAvLyBXaGVuIHRydWUsIGNhbGwgY29uc29sZS50aW1lKCkgYmVmb3JlIGFuZCAudGltZUVuZCgpIGFmdGVyIGVhY2ggdG9wLWxldmVsXG4gIC8vIHJlbmRlciAoYm90aCBpbml0aWFsIHJlbmRlcnMgYW5kIHVwZGF0ZXMpLiBVc2VmdWwgd2hlbiBsb29raW5nIGF0IHByb2QtbW9kZVxuICAvLyB0aW1lbGluZSBwcm9maWxlcyBpbiBDaHJvbWUsIGZvciBleGFtcGxlLlxuICBsb2dUb3BMZXZlbFJlbmRlcnM6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RmVhdHVyZUZsYWdzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEZlYXR1cmVGbGFncy5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFJlY29uY2lsZXJcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFJlZiA9IHJlcXVpcmUoJy4vUmVhY3RSZWYnKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcblxuLyoqXG4gKiBIZWxwZXIgdG8gY2FsbCBSZWFjdFJlZi5hdHRhY2hSZWZzIHdpdGggdGhpcyBjb21wb3NpdGUgY29tcG9uZW50LCBzcGxpdCBvdXRcbiAqIHRvIGF2b2lkIGFsbG9jYXRpb25zIGluIHRoZSB0cmFuc2FjdGlvbiBtb3VudC1yZWFkeSBxdWV1ZS5cbiAqL1xuZnVuY3Rpb24gYXR0YWNoUmVmcygpIHtcbiAgUmVhY3RSZWYuYXR0YWNoUmVmcyh0aGlzLCB0aGlzLl9jdXJyZW50RWxlbWVudCk7XG59XG5cbnZhciBSZWFjdFJlY29uY2lsZXIgPSB7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHJlbmRlcnMgbWFya3VwLCBhbmQgcmVnaXN0ZXJzIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gaW50ZXJuYWxJbnN0YW5jZVxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb258UmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHs/b2JqZWN0fSB0aGUgY29udGFpbmluZyBuYXRpdmUgY29tcG9uZW50IGluc3RhbmNlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gaW5mbyBhYm91dCB0aGUgbmF0aXZlIGNvbnRhaW5lclxuICAgKiBAcmV0dXJuIHs/c3RyaW5nfSBSZW5kZXJlZCBtYXJrdXAgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgRE9NLlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIHRyYW5zYWN0aW9uLCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIGNvbnRleHQpIHtcbiAgICB2YXIgbWFya3VwID0gaW50ZXJuYWxJbnN0YW5jZS5tb3VudENvbXBvbmVudCh0cmFuc2FjdGlvbiwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KTtcbiAgICBpZiAoaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQgJiYgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQucmVmICE9IG51bGwpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYXR0YWNoUmVmcywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Nb3VudENvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcmt1cDtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhIHZhbHVlIHRoYXQgY2FuIGJlIHBhc3NlZCB0b1xuICAgKiBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cC5cbiAgICovXG4gIGdldE5hdGl2ZU5vZGU6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGludGVybmFsSW5zdGFuY2UuZ2V0TmF0aXZlTm9kZSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbnkgcmVzb3VyY2VzIGFsbG9jYXRlZCBieSBgbW91bnRDb21wb25lbnRgLlxuICAgKlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgc2FmZWx5KSB7XG4gICAgUmVhY3RSZWYuZGV0YWNoUmVmcyhpbnRlcm5hbEluc3RhbmNlLCBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudCk7XG4gICAgaW50ZXJuYWxJbnN0YW5jZS51bm1vdW50Q29tcG9uZW50KHNhZmVseSk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblVubW91bnRDb21wb25lbnQoaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVcGRhdGUgYSBjb21wb25lbnQgdXNpbmcgYSBuZXcgZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gaW50ZXJuYWxJbnN0YW5jZVxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlY2VpdmVDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgcHJldkVsZW1lbnQgPSBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudDtcblxuICAgIGlmIChuZXh0RWxlbWVudCA9PT0gcHJldkVsZW1lbnQgJiYgY29udGV4dCA9PT0gaW50ZXJuYWxJbnN0YW5jZS5fY29udGV4dCkge1xuICAgICAgLy8gU2luY2UgZWxlbWVudHMgYXJlIGltbXV0YWJsZSBhZnRlciB0aGUgb3duZXIgaXMgcmVuZGVyZWQsXG4gICAgICAvLyB3ZSBjYW4gZG8gYSBjaGVhcCBpZGVudGl0eSBjb21wYXJlIGhlcmUgdG8gZGV0ZXJtaW5lIGlmIHRoaXMgaXMgYVxuICAgICAgLy8gc3VwZXJmbHVvdXMgcmVjb25jaWxlLiBJdCdzIHBvc3NpYmxlIGZvciBzdGF0ZSB0byBiZSBtdXRhYmxlIGJ1dCBzdWNoXG4gICAgICAvLyBjaGFuZ2Ugc2hvdWxkIHRyaWdnZXIgYW4gdXBkYXRlIG9mIHRoZSBvd25lciB3aGljaCB3b3VsZCByZWNyZWF0ZVxuICAgICAgLy8gdGhlIGVsZW1lbnQuIFdlIGV4cGxpY2l0bHkgY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYW4gb3duZXIgc2luY2VcbiAgICAgIC8vIGl0J3MgcG9zc2libGUgZm9yIGFuIGVsZW1lbnQgY3JlYXRlZCBvdXRzaWRlIGEgY29tcG9zaXRlIHRvIGJlXG4gICAgICAvLyBkZWVwbHkgbXV0YXRlZCBhbmQgcmV1c2VkLlxuXG4gICAgICAvLyBUT0RPOiBCYWlsaW5nIG91dCBlYXJseSBpcyBqdXN0IGEgcGVyZiBvcHRpbWl6YXRpb24gcmlnaHQ/XG4gICAgICAvLyBUT0RPOiBSZW1vdmluZyB0aGUgcmV0dXJuIHN0YXRlbWVudCBzaG91bGQgYWZmZWN0IGNvcnJlY3RuZXNzP1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciByZWZzQ2hhbmdlZCA9IFJlYWN0UmVmLnNob3VsZFVwZGF0ZVJlZnMocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KTtcblxuICAgIGlmIChyZWZzQ2hhbmdlZCkge1xuICAgICAgUmVhY3RSZWYuZGV0YWNoUmVmcyhpbnRlcm5hbEluc3RhbmNlLCBwcmV2RWxlbWVudCk7XG4gICAgfVxuXG4gICAgaW50ZXJuYWxJbnN0YW5jZS5yZWNlaXZlQ29tcG9uZW50KG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG5cbiAgICBpZiAocmVmc0NoYW5nZWQgJiYgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQgJiYgaW50ZXJuYWxJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQucmVmICE9IG51bGwpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmdldFJlYWN0TW91bnRSZWFkeSgpLmVucXVldWUoYXR0YWNoUmVmcywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vblVwZGF0ZUNvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZsdXNoIGFueSBkaXJ0eSBjaGFuZ2VzIGluIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBpbnRlcm5hbEluc3RhbmNlXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwZXJmb3JtVXBkYXRlSWZOZWNlc3Nhcnk6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCB0cmFuc2FjdGlvbikge1xuICAgIGludGVybmFsSW5zdGFuY2UucGVyZm9ybVVwZGF0ZUlmTmVjZXNzYXJ5KHRyYW5zYWN0aW9uKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVXBkYXRlQ29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UmVjb25jaWxlcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RSZWNvbmNpbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UmVmXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RPd25lcicpO1xuXG52YXIgUmVhY3RSZWYgPSB7fTtcblxuZnVuY3Rpb24gYXR0YWNoUmVmKHJlZiwgY29tcG9uZW50LCBvd25lcikge1xuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZihjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTGVnYWN5IHJlZlxuICAgIFJlYWN0T3duZXIuYWRkQ29tcG9uZW50QXNSZWZUbyhjb21wb25lbnQsIHJlZiwgb3duZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRldGFjaFJlZihyZWYsIGNvbXBvbmVudCwgb3duZXIpIHtcbiAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZWYobnVsbCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTGVnYWN5IHJlZlxuICAgIFJlYWN0T3duZXIucmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tKGNvbXBvbmVudCwgcmVmLCBvd25lcik7XG4gIH1cbn1cblxuUmVhY3RSZWYuYXR0YWNoUmVmcyA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIGlmIChyZWYgIT0gbnVsbCkge1xuICAgIGF0dGFjaFJlZihyZWYsIGluc3RhbmNlLCBlbGVtZW50Ll9vd25lcik7XG4gIH1cbn07XG5cblJlYWN0UmVmLnNob3VsZFVwZGF0ZVJlZnMgPSBmdW5jdGlvbiAocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSB7XG4gIC8vIElmIGVpdGhlciB0aGUgb3duZXIgb3IgYSBgcmVmYCBoYXMgY2hhbmdlZCwgbWFrZSBzdXJlIHRoZSBuZXdlc3Qgb3duZXJcbiAgLy8gaGFzIHN0b3JlZCBhIHJlZmVyZW5jZSB0byBgdGhpc2AsIGFuZCB0aGUgcHJldmlvdXMgb3duZXIgKGlmIGRpZmZlcmVudClcbiAgLy8gaGFzIGZvcmdvdHRlbiB0aGUgcmVmZXJlbmNlIHRvIGB0aGlzYC4gV2UgdXNlIHRoZSBlbGVtZW50IGluc3RlYWRcbiAgLy8gb2YgdGhlIHB1YmxpYyB0aGlzLnByb3BzIGJlY2F1c2UgdGhlIHBvc3QgcHJvY2Vzc2luZyBjYW5ub3QgZGV0ZXJtaW5lXG4gIC8vIGEgcmVmLiBUaGUgcmVmIGNvbmNlcHR1YWxseSBsaXZlcyBvbiB0aGUgZWxlbWVudC5cblxuICAvLyBUT0RPOiBTaG91bGQgdGhpcyBldmVuIGJlIHBvc3NpYmxlPyBUaGUgb3duZXIgY2Fubm90IGNoYW5nZSBiZWNhdXNlXG4gIC8vIGl0J3MgZm9yYmlkZGVuIGJ5IHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50LiBUaGUgcmVmIGNhbiBjaGFuZ2VcbiAgLy8gaWYgeW91IHN3YXAgdGhlIGtleXMgb2YgYnV0IG5vdCB0aGUgcmVmcy4gUmVjb25zaWRlciB3aGVyZSB0aGlzIGNoZWNrXG4gIC8vIGlzIG1hZGUuIEl0IHByb2JhYmx5IGJlbG9uZ3Mgd2hlcmUgdGhlIGtleSBjaGVja2luZyBhbmRcbiAgLy8gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCBpcyBkb25lLlxuXG4gIHZhciBwcmV2RW1wdHkgPSBwcmV2RWxlbWVudCA9PT0gbnVsbCB8fCBwcmV2RWxlbWVudCA9PT0gZmFsc2U7XG4gIHZhciBuZXh0RW1wdHkgPSBuZXh0RWxlbWVudCA9PT0gbnVsbCB8fCBuZXh0RWxlbWVudCA9PT0gZmFsc2U7XG5cbiAgcmV0dXJuKFxuICAgIC8vIFRoaXMgaGFzIGEgZmV3IGZhbHNlIHBvc2l0aXZlcyB3L3IvdCBlbXB0eSBjb21wb25lbnRzLlxuICAgIHByZXZFbXB0eSB8fCBuZXh0RW1wdHkgfHwgbmV4dEVsZW1lbnQuX293bmVyICE9PSBwcmV2RWxlbWVudC5fb3duZXIgfHwgbmV4dEVsZW1lbnQucmVmICE9PSBwcmV2RWxlbWVudC5yZWZcbiAgKTtcbn07XG5cblJlYWN0UmVmLmRldGFjaFJlZnMgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICBpZiAocmVmICE9IG51bGwpIHtcbiAgICBkZXRhY2hSZWYocmVmLCBpbnN0YW5jZSwgZWxlbWVudC5fb3duZXIpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UmVmO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFJlZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE93bmVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogUmVhY3RPd25lcnMgYXJlIGNhcGFibGUgb2Ygc3RvcmluZyByZWZlcmVuY2VzIHRvIG93bmVkIGNvbXBvbmVudHMuXG4gKlxuICogQWxsIGNvbXBvbmVudHMgYXJlIGNhcGFibGUgb2YgLy9iZWluZy8vIHJlZmVyZW5jZWQgYnkgb3duZXIgY29tcG9uZW50cywgYnV0XG4gKiBvbmx5IFJlYWN0T3duZXIgY29tcG9uZW50cyBhcmUgY2FwYWJsZSBvZiAvL3JlZmVyZW5jaW5nLy8gb3duZWQgY29tcG9uZW50cy5cbiAqIFRoZSBuYW1lZCByZWZlcmVuY2UgaXMga25vd24gYXMgYSBcInJlZlwiLlxuICpcbiAqIFJlZnMgYXJlIGF2YWlsYWJsZSB3aGVuIG1vdW50ZWQgYW5kIHVwZGF0ZWQgZHVyaW5nIHJlY29uY2lsaWF0aW9uLlxuICpcbiAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gKFxuICogICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICogICAgICAgICAgIDxDdXN0b21Db21wb25lbnQgcmVmPVwiY3VzdG9tXCIgLz5cbiAqICAgICAgICAgPC9kaXY+XG4gKiAgICAgICApO1xuICogICAgIH0sXG4gKiAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICogICAgICAgdGhpcy5yZWZzLmN1c3RvbS5oYW5kbGVDbGljaygpO1xuICogICAgIH0sXG4gKiAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICogICAgICAgdGhpcy5yZWZzLmN1c3RvbS5pbml0aWFsaXplKCk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBSZWZzIHNob3VsZCByYXJlbHkgYmUgdXNlZC4gV2hlbiByZWZzIGFyZSB1c2VkLCB0aGV5IHNob3VsZCBvbmx5IGJlIGRvbmUgdG9cbiAqIGNvbnRyb2wgZGF0YSB0aGF0IGlzIG5vdCBoYW5kbGVkIGJ5IFJlYWN0J3MgZGF0YSBmbG93LlxuICpcbiAqIEBjbGFzcyBSZWFjdE93bmVyXG4gKi9cbnZhciBSZWFjdE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgb3duZXIuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNWYWxpZE93bmVyOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuICEhKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0LmF0dGFjaFJlZiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqZWN0LmRldGFjaFJlZiA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb21wb25lbnQgYnkgcmVmIHRvIGFuIG93bmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byByZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBieSB3aGljaCB0byByZWZlciB0byB0aGUgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge1JlYWN0T3duZXJ9IG93bmVyIENvbXBvbmVudCBvbiB3aGljaCB0byByZWNvcmQgdGhlIHJlZi5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgYWRkQ29tcG9uZW50QXNSZWZUbzogZnVuY3Rpb24gKGNvbXBvbmVudCwgcmVmLCBvd25lcikge1xuICAgICFSZWFjdE93bmVyLmlzVmFsaWRPd25lcihvd25lcikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnYWRkQ29tcG9uZW50QXNSZWZUbyguLi4pOiBPbmx5IGEgUmVhY3RPd25lciBjYW4gaGF2ZSByZWZzLiBZb3UgbWlnaHQgJyArICdiZSBhZGRpbmcgYSByZWYgdG8gYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IGNyZWF0ZWQgaW5zaWRlIGEgY29tcG9uZW50XFwncyAnICsgJ2ByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAnICsgJyhkZXRhaWxzOiBodHRwczovL2ZiLm1lL3JlYWN0LXJlZnMtbXVzdC1oYXZlLW93bmVyKS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgb3duZXIuYXR0YWNoUmVmKHJlZiwgY29tcG9uZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNvbXBvbmVudCBieSByZWYgZnJvbSBhbiBvd25lciBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gZGVyZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBvZiB0aGUgcmVmIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIHtSZWFjdE93bmVyfSBvd25lciBDb21wb25lbnQgb24gd2hpY2ggdGhlIHJlZiBpcyByZWNvcmRlZC5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tOiBmdW5jdGlvbiAoY29tcG9uZW50LCByZWYsIG93bmVyKSB7XG4gICAgIVJlYWN0T3duZXIuaXNWYWxpZE93bmVyKG93bmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdyZW1vdmVDb21wb25lbnRBc1JlZkZyb20oLi4uKTogT25seSBhIFJlYWN0T3duZXIgY2FuIGhhdmUgcmVmcy4gWW91IG1pZ2h0ICcgKyAnYmUgcmVtb3ZpbmcgYSByZWYgdG8gYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IGNyZWF0ZWQgaW5zaWRlIGEgY29tcG9uZW50XFwncyAnICsgJ2ByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAnICsgJyhkZXRhaWxzOiBodHRwczovL2ZiLm1lL3JlYWN0LXJlZnMtbXVzdC1oYXZlLW93bmVyKS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIG93bmVyUHVibGljSW5zdGFuY2UgPSBvd25lci5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgIC8vIENoZWNrIHRoYXQgYGNvbXBvbmVudGAncyBvd25lciBpcyBzdGlsbCBhbGl2ZSBhbmQgdGhhdCBgY29tcG9uZW50YCBpcyBzdGlsbCB0aGUgY3VycmVudCByZWZcbiAgICAvLyBiZWNhdXNlIHdlIGRvIG5vdCB3YW50IHRvIGRldGFjaCB0aGUgcmVmIGlmIGFub3RoZXIgY29tcG9uZW50IHN0b2xlIGl0LlxuICAgIGlmIChvd25lclB1YmxpY0luc3RhbmNlICYmIG93bmVyUHVibGljSW5zdGFuY2UucmVmc1tyZWZdID09PSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKSkge1xuICAgICAgb3duZXIuZGV0YWNoUmVmKHJlZik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RPd25lcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RPd25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBUcmFuc2FjdGlvblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIGBUcmFuc2FjdGlvbmAgY3JlYXRlcyBhIGJsYWNrIGJveCB0aGF0IGlzIGFibGUgdG8gd3JhcCBhbnkgbWV0aG9kIHN1Y2ggdGhhdFxuICogY2VydGFpbiBpbnZhcmlhbnRzIGFyZSBtYWludGFpbmVkIGJlZm9yZSBhbmQgYWZ0ZXIgdGhlIG1ldGhvZCBpcyBpbnZva2VkXG4gKiAoRXZlbiBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIHdoaWxlIGludm9raW5nIHRoZSB3cmFwcGVkIG1ldGhvZCkuIFdob2V2ZXJcbiAqIGluc3RhbnRpYXRlcyBhIHRyYW5zYWN0aW9uIGNhbiBwcm92aWRlIGVuZm9yY2VycyBvZiB0aGUgaW52YXJpYW50cyBhdFxuICogY3JlYXRpb24gdGltZS4gVGhlIGBUcmFuc2FjdGlvbmAgY2xhc3MgaXRzZWxmIHdpbGwgc3VwcGx5IG9uZSBhZGRpdGlvbmFsXG4gKiBhdXRvbWF0aWMgaW52YXJpYW50IGZvciB5b3UgLSB0aGUgaW52YXJpYW50IHRoYXQgYW55IHRyYW5zYWN0aW9uIGluc3RhbmNlXG4gKiBzaG91bGQgbm90IGJlIHJ1biB3aGlsZSBpdCBpcyBhbHJlYWR5IGJlaW5nIHJ1bi4gWW91IHdvdWxkIHR5cGljYWxseSBjcmVhdGUgYVxuICogc2luZ2xlIGluc3RhbmNlIG9mIGEgYFRyYW5zYWN0aW9uYCBmb3IgcmV1c2UgbXVsdGlwbGUgdGltZXMsIHRoYXQgcG90ZW50aWFsbHlcbiAqIGlzIHVzZWQgdG8gd3JhcCBzZXZlcmFsIGRpZmZlcmVudCBtZXRob2RzLiBXcmFwcGVycyBhcmUgZXh0cmVtZWx5IHNpbXBsZSAtXG4gKiB0aGV5IG9ubHkgcmVxdWlyZSBpbXBsZW1lbnRpbmcgdHdvIG1ldGhvZHMuXG4gKlxuICogPHByZT5cbiAqICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVycyAoaW5qZWN0ZWQgYXQgY3JlYXRpb24gdGltZSlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICAgICAgICArXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLXwtLS0tLS0tLS0tLS0tLStcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICB2ICAgICAgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgICAgICstLS0tLS0tLS0tLS0tLS0rICAgfCAgICAgICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICArLS18ICAgIHdyYXBwZXIxICAgfC0tLXwtLS0tKyAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgKy0tLS0tLS0tLS0tLS0tLSsgICB2ICAgIHwgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgICAgICAgKy0tLS0tLS0tLS0tLS0rICB8ICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICAgICArLS0tLXwgICB3cmFwcGVyMiAgfC0tLS0tLS0tKyAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgfCAgICArLS0tLS0tLS0tLS0tLSsgIHwgICAgIHwgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgIHwgICAgICAgICAgICAgICAgICAgICB8ICAgICB8ICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB2ICAgICB2ICAgICAgICAgICAgICAgICAgICAgdiAgICAgdiAgIHwgd3JhcHBlclxuICogICAgICAgICAgICAgICAgICAgIHwgKy0tLSsgKy0tLSsgICArLS0tLS0tLS0tKyAgICstLS0rICstLS0rIHwgaW52YXJpYW50c1xuICogcGVyZm9ybShhbnlNZXRob2QpIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHwgbWFpbnRhaW5lZFxuICogKy0tLS0tLS0tLS0tLS0tLS0tPnwtfC0tLXwtfC0tLXwtLT58YW55TWV0aG9kfC0tLXwtLS18LXwtLS18LXwtLS0tLS0tLT5cbiAqICAgICAgICAgICAgICAgICAgICB8IHwgICB8IHwgICB8ICAgfCAgICAgICAgIHwgICB8ICAgfCB8ICAgfCB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfFxuICogICAgICAgICAgICAgICAgICAgIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICstLS0rICstLS0rICAgKy0tLS0tLS0tLSsgICArLS0tKyArLS0tKyB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgaW5pdGlhbGl6ZSAgICAgICAgICAgICAgICAgICAgY2xvc2UgICAgfFxuICogICAgICAgICAgICAgICAgICAgICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAqIDwvcHJlPlxuICpcbiAqIFVzZSBjYXNlczpcbiAqIC0gUHJlc2VydmluZyB0aGUgaW5wdXQgc2VsZWN0aW9uIHJhbmdlcyBiZWZvcmUvYWZ0ZXIgcmVjb25jaWxpYXRpb24uXG4gKiAgIFJlc3RvcmluZyBzZWxlY3Rpb24gZXZlbiBpbiB0aGUgZXZlbnQgb2YgYW4gdW5leHBlY3RlZCBlcnJvci5cbiAqIC0gRGVhY3RpdmF0aW5nIGV2ZW50cyB3aGlsZSByZWFycmFuZ2luZyB0aGUgRE9NLCBwcmV2ZW50aW5nIGJsdXJzL2ZvY3VzZXMsXG4gKiAgIHdoaWxlIGd1YXJhbnRlZWluZyB0aGF0IGFmdGVyd2FyZHMsIHRoZSBldmVudCBzeXN0ZW0gaXMgcmVhY3RpdmF0ZWQuXG4gKiAtIEZsdXNoaW5nIGEgcXVldWUgb2YgY29sbGVjdGVkIERPTSBtdXRhdGlvbnMgdG8gdGhlIG1haW4gVUkgdGhyZWFkIGFmdGVyIGFcbiAqICAgcmVjb25jaWxpYXRpb24gdGFrZXMgcGxhY2UgaW4gYSB3b3JrZXIgdGhyZWFkLlxuICogLSBJbnZva2luZyBhbnkgY29sbGVjdGVkIGBjb21wb25lbnREaWRVcGRhdGVgIGNhbGxiYWNrcyBhZnRlciByZW5kZXJpbmcgbmV3XG4gKiAgIGNvbnRlbnQuXG4gKiAtIChGdXR1cmUgdXNlIGNhc2UpOiBXcmFwcGluZyBwYXJ0aWN1bGFyIGZsdXNoZXMgb2YgdGhlIGBSZWFjdFdvcmtlcmAgcXVldWVcbiAqICAgdG8gcHJlc2VydmUgdGhlIGBzY3JvbGxUb3BgIChhbiBhdXRvbWF0aWMgc2Nyb2xsIGF3YXJlIERPTSkuXG4gKiAtIChGdXR1cmUgdXNlIGNhc2UpOiBMYXlvdXQgY2FsY3VsYXRpb25zIGJlZm9yZSBhbmQgYWZ0ZXIgRE9NIHVwZGF0ZXMuXG4gKlxuICogVHJhbnNhY3Rpb25hbCBwbHVnaW4gQVBJOlxuICogLSBBIG1vZHVsZSB0aGF0IGhhcyBhbiBgaW5pdGlhbGl6ZWAgbWV0aG9kIHRoYXQgcmV0dXJucyBhbnkgcHJlY29tcHV0YXRpb24uXG4gKiAtIGFuZCBhIGBjbG9zZWAgbWV0aG9kIHRoYXQgYWNjZXB0cyB0aGUgcHJlY29tcHV0YXRpb24uIGBjbG9zZWAgaXMgaW52b2tlZFxuICogICB3aGVuIHRoZSB3cmFwcGVkIHByb2Nlc3MgaXMgY29tcGxldGVkLCBvciBoYXMgZmFpbGVkLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8VHJhbnNhY3Rpb25hbFdyYXBwZXI+fSB0cmFuc2FjdGlvbldyYXBwZXIgV3JhcHBlciBtb2R1bGVzXG4gKiB0aGF0IGltcGxlbWVudCBgaW5pdGlhbGl6ZWAgYW5kIGBjbG9zZWAuXG4gKiBAcmV0dXJuIHtUcmFuc2FjdGlvbn0gU2luZ2xlIHRyYW5zYWN0aW9uIGZvciByZXVzZSBpbiB0aHJlYWQuXG4gKlxuICogQGNsYXNzIFRyYW5zYWN0aW9uXG4gKi9cbnZhciBNaXhpbiA9IHtcbiAgLyoqXG4gICAqIFNldHMgdXAgdGhpcyBpbnN0YW5jZSBzbyB0aGF0IGl0IGlzIHByZXBhcmVkIGZvciBjb2xsZWN0aW5nIG1ldHJpY3MuIERvZXNcbiAgICogc28gc3VjaCB0aGF0IHRoaXMgc2V0dXAgbWV0aG9kIG1heSBiZSB1c2VkIG9uIGFuIGluc3RhbmNlIHRoYXQgaXMgYWxyZWFkeVxuICAgKiBpbml0aWFsaXplZCwgaW4gYSB3YXkgdGhhdCBkb2VzIG5vdCBjb25zdW1lIGFkZGl0aW9uYWwgbWVtb3J5IHVwb24gcmV1c2UuXG4gICAqIFRoYXQgY2FuIGJlIHVzZWZ1bCBpZiB5b3UgZGVjaWRlIHRvIG1ha2UgeW91ciBzdWJjbGFzcyBvZiB0aGlzIG1peGluIGFcbiAgICogXCJQb29sZWRDbGFzc1wiLlxuICAgKi9cbiAgcmVpbml0aWFsaXplVHJhbnNhY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnMgPSB0aGlzLmdldFRyYW5zYWN0aW9uV3JhcHBlcnMoKTtcbiAgICBpZiAodGhpcy53cmFwcGVySW5pdERhdGEpIHtcbiAgICAgIHRoaXMud3JhcHBlckluaXREYXRhLmxlbmd0aCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud3JhcHBlckluaXREYXRhID0gW107XG4gICAgfVxuICAgIHRoaXMuX2lzSW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICB9LFxuXG4gIF9pc0luVHJhbnNhY3Rpb246IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHJldHVybiB7QXJyYXk8VHJhbnNhY3Rpb25XcmFwcGVyPn0gQXJyYXkgb2YgdHJhbnNhY3Rpb24gd3JhcHBlcnMuXG4gICAqL1xuICBnZXRUcmFuc2FjdGlvbldyYXBwZXJzOiBudWxsLFxuXG4gIGlzSW5UcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXRoaXMuX2lzSW5UcmFuc2FjdGlvbjtcbiAgfSxcblxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGZ1bmN0aW9uIHdpdGhpbiBhIHNhZmV0eSB3aW5kb3cuIFVzZSB0aGlzIGZvciB0aGUgdG9wIGxldmVsXG4gICAqIG1ldGhvZHMgdGhhdCByZXN1bHQgaW4gbGFyZ2UgYW1vdW50cyBvZiBjb21wdXRhdGlvbi9tdXRhdGlvbnMgdGhhdCB3b3VsZFxuICAgKiBuZWVkIHRvIGJlIHNhZmV0eSBjaGVja2VkLiBUaGUgb3B0aW9uYWwgYXJndW1lbnRzIGhlbHBzIHByZXZlbnQgdGhlIG5lZWRcbiAgICogdG8gYmluZCBpbiBtYW55IGNhc2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWVtYmVyIG9mIHNjb3BlIHRvIGNhbGwuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZSBTY29wZSB0byBpbnZva2UgZnJvbS5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gYSBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGIgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBjIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gZCBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGUgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBmIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICpcbiAgICogQHJldHVybiB7Kn0gUmV0dXJuIHZhbHVlIGZyb20gYG1ldGhvZGAuXG4gICAqL1xuICBwZXJmb3JtOiBmdW5jdGlvbiAobWV0aG9kLCBzY29wZSwgYSwgYiwgYywgZCwgZSwgZikge1xuICAgICEhdGhpcy5pc0luVHJhbnNhY3Rpb24oKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcmFuc2FjdGlvbi5wZXJmb3JtKC4uLik6IENhbm5vdCBpbml0aWFsaXplIGEgdHJhbnNhY3Rpb24gd2hlbiB0aGVyZSAnICsgJ2lzIGFscmVhZHkgYW4gb3V0c3RhbmRpbmcgdHJhbnNhY3Rpb24uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciBlcnJvclRocm93bjtcbiAgICB2YXIgcmV0O1xuICAgIHRyeSB7XG4gICAgICB0aGlzLl9pc0luVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgLy8gQ2F0Y2hpbmcgZXJyb3JzIG1ha2VzIGRlYnVnZ2luZyBtb3JlIGRpZmZpY3VsdCwgc28gd2Ugc3RhcnQgd2l0aFxuICAgICAgLy8gZXJyb3JUaHJvd24gc2V0IHRvIHRydWUgYmVmb3JlIHNldHRpbmcgaXQgdG8gZmFsc2UgYWZ0ZXIgY2FsbGluZ1xuICAgICAgLy8gY2xvc2UgLS0gaWYgaXQncyBzdGlsbCBzZXQgdG8gdHJ1ZSBpbiB0aGUgZmluYWxseSBibG9jaywgaXQgbWVhbnNcbiAgICAgIC8vIG9uZSBvZiB0aGVzZSBjYWxscyB0aHJldy5cbiAgICAgIGVycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUFsbCgwKTtcbiAgICAgIHJldCA9IG1ldGhvZC5jYWxsKHNjb3BlLCBhLCBiLCBjLCBkLCBlLCBmKTtcbiAgICAgIGVycm9yVGhyb3duID0gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChlcnJvclRocm93bikge1xuICAgICAgICAgIC8vIElmIGBtZXRob2RgIHRocm93cywgcHJlZmVyIHRvIHNob3cgdGhhdCBzdGFjayB0cmFjZSBvdmVyIGFueSB0aHJvd25cbiAgICAgICAgICAvLyBieSBpbnZva2luZyBgY2xvc2VBbGxgLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWxsKDApO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTaW5jZSBgbWV0aG9kYCBkaWRuJ3QgdGhyb3csIHdlIGRvbid0IHdhbnQgdG8gc2lsZW5jZSB0aGUgZXhjZXB0aW9uXG4gICAgICAgICAgLy8gaGVyZS5cbiAgICAgICAgICB0aGlzLmNsb3NlQWxsKDApO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLl9pc0luVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBpbml0aWFsaXplQWxsOiBmdW5jdGlvbiAoc3RhcnRJbmRleCkge1xuICAgIHZhciB0cmFuc2FjdGlvbldyYXBwZXJzID0gdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDwgdHJhbnNhY3Rpb25XcmFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0cmFuc2FjdGlvbldyYXBwZXJzW2ldO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2F0Y2hpbmcgZXJyb3JzIG1ha2VzIGRlYnVnZ2luZyBtb3JlIGRpZmZpY3VsdCwgc28gd2Ugc3RhcnQgd2l0aCB0aGVcbiAgICAgICAgLy8gT0JTRVJWRURfRVJST1Igc3RhdGUgYmVmb3JlIG92ZXJ3cml0aW5nIGl0IHdpdGggdGhlIHJlYWwgcmV0dXJuIHZhbHVlXG4gICAgICAgIC8vIG9mIGluaXRpYWxpemUgLS0gaWYgaXQncyBzdGlsbCBzZXQgdG8gT0JTRVJWRURfRVJST1IgaW4gdGhlIGZpbmFsbHlcbiAgICAgICAgLy8gYmxvY2ssIGl0IG1lYW5zIHdyYXBwZXIuaW5pdGlhbGl6ZSB0aHJldy5cbiAgICAgICAgdGhpcy53cmFwcGVySW5pdERhdGFbaV0gPSBUcmFuc2FjdGlvbi5PQlNFUlZFRF9FUlJPUjtcbiAgICAgICAgdGhpcy53cmFwcGVySW5pdERhdGFbaV0gPSB3cmFwcGVyLmluaXRpYWxpemUgPyB3cmFwcGVyLmluaXRpYWxpemUuY2FsbCh0aGlzKSA6IG51bGw7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAodGhpcy53cmFwcGVySW5pdERhdGFbaV0gPT09IFRyYW5zYWN0aW9uLk9CU0VSVkVEX0VSUk9SKSB7XG4gICAgICAgICAgLy8gVGhlIGluaXRpYWxpemVyIGZvciB3cmFwcGVyIGkgdGhyZXcgYW4gZXJyb3I7IGluaXRpYWxpemUgdGhlXG4gICAgICAgICAgLy8gcmVtYWluaW5nIHdyYXBwZXJzIGJ1dCBzaWxlbmNlIGFueSBleGNlcHRpb25zIGZyb20gdGhlbSB0byBlbnN1cmVcbiAgICAgICAgICAvLyB0aGF0IHRoZSBmaXJzdCBlcnJvciBpcyB0aGUgb25lIHRvIGJ1YmJsZSB1cC5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplQWxsKGkgKyAxKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEludm9rZXMgZWFjaCBvZiBgdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzLmNsb3NlW2ldYCBmdW5jdGlvbnMsIHBhc3NpbmcgaW50b1xuICAgKiB0aGVtIHRoZSByZXNwZWN0aXZlIHJldHVybiB2YWx1ZXMgb2YgYHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycy5pbml0W2ldYFxuICAgKiAoYGNsb3NlYHJzIHRoYXQgY29ycmVzcG9uZCB0byBpbml0aWFsaXplcnMgdGhhdCBmYWlsZWQgd2lsbCBub3QgYmVcbiAgICogaW52b2tlZCkuXG4gICAqL1xuICBjbG9zZUFsbDogZnVuY3Rpb24gKHN0YXJ0SW5kZXgpIHtcbiAgICAhdGhpcy5pc0luVHJhbnNhY3Rpb24oKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUcmFuc2FjdGlvbi5jbG9zZUFsbCgpOiBDYW5ub3QgY2xvc2UgdHJhbnNhY3Rpb24gd2hlbiBub25lIGFyZSBvcGVuLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB2YXIgdHJhbnNhY3Rpb25XcmFwcGVycyA9IHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycztcbiAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8IHRyYW5zYWN0aW9uV3JhcHBlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB3cmFwcGVyID0gdHJhbnNhY3Rpb25XcmFwcGVyc1tpXTtcbiAgICAgIHZhciBpbml0RGF0YSA9IHRoaXMud3JhcHBlckluaXREYXRhW2ldO1xuICAgICAgdmFyIGVycm9yVGhyb3duO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2F0Y2hpbmcgZXJyb3JzIG1ha2VzIGRlYnVnZ2luZyBtb3JlIGRpZmZpY3VsdCwgc28gd2Ugc3RhcnQgd2l0aFxuICAgICAgICAvLyBlcnJvclRocm93biBzZXQgdG8gdHJ1ZSBiZWZvcmUgc2V0dGluZyBpdCB0byBmYWxzZSBhZnRlciBjYWxsaW5nXG4gICAgICAgIC8vIGNsb3NlIC0tIGlmIGl0J3Mgc3RpbGwgc2V0IHRvIHRydWUgaW4gdGhlIGZpbmFsbHkgYmxvY2ssIGl0IG1lYW5zXG4gICAgICAgIC8vIHdyYXBwZXIuY2xvc2UgdGhyZXcuXG4gICAgICAgIGVycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluaXREYXRhICE9PSBUcmFuc2FjdGlvbi5PQlNFUlZFRF9FUlJPUiAmJiB3cmFwcGVyLmNsb3NlKSB7XG4gICAgICAgICAgd3JhcHBlci5jbG9zZS5jYWxsKHRoaXMsIGluaXREYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvclRocm93biA9IGZhbHNlO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgLy8gVGhlIGNsb3NlciBmb3Igd3JhcHBlciBpIHRocmV3IGFuIGVycm9yOyBjbG9zZSB0aGUgcmVtYWluaW5nXG4gICAgICAgICAgLy8gd3JhcHBlcnMgYnV0IHNpbGVuY2UgYW55IGV4Y2VwdGlvbnMgZnJvbSB0aGVtIHRvIGVuc3VyZSB0aGF0IHRoZVxuICAgICAgICAgIC8vIGZpcnN0IGVycm9yIGlzIHRoZSBvbmUgdG8gYnViYmxlIHVwLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlQWxsKGkgKyAxKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMud3JhcHBlckluaXREYXRhLmxlbmd0aCA9IDA7XG4gIH1cbn07XG5cbnZhciBUcmFuc2FjdGlvbiA9IHtcblxuICBNaXhpbjogTWl4aW4sXG5cbiAgLyoqXG4gICAqIFRva2VuIHRvIGxvb2sgZm9yIHRvIGRldGVybWluZSBpZiBhbiBlcnJvciBvY2N1cnJlZC5cbiAgICovXG4gIE9CU0VSVkVEX0VSUk9SOiB7fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zYWN0aW9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9UcmFuc2FjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpO1xudmFyIFJlYWN0RW1wdHlDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0RW1wdHlDb21wb25lbnQnKTtcbnZhciBSZWFjdE5hdGl2ZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3ROYXRpdmVDb21wb25lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8vIFRvIGF2b2lkIGEgY3ljbGljIGRlcGVuZGVuY3ksIHdlIGNyZWF0ZSB0aGUgZmluYWwgY2xhc3MgaW4gdGhpcyBtb2R1bGVcbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFdyYXBwZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB0aGlzLmNvbnN0cnVjdChlbGVtZW50KTtcbn07XG5fYXNzaWduKFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50V3JhcHBlci5wcm90b3R5cGUsIFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50Lk1peGluLCB7XG4gIF9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50OiBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50XG59KTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKG93bmVyKSB7XG4gIGlmIChvd25lcikge1xuICAgIHZhciBuYW1lID0gb3duZXIuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHR5cGUgcmVmZXJlbmNlIGlzIGEga25vd24gaW50ZXJuYWwgdHlwZS4gSS5lLiBub3QgYSB1c2VyXG4gKiBwcm92aWRlZCBjb21wb3NpdGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0eXBlXG4gKiBAcmV0dXJuIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhpcyBpcyBhIHZhbGlkIGludGVybmFsIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGlzSW50ZXJuYWxDb21wb25lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlLnByb3RvdHlwZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHR5cGUucHJvdG90eXBlLm1vdW50Q29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlLnByb3RvdHlwZS5yZWNlaXZlQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgUmVhY3ROb2RlLCBjcmVhdGUgYW4gaW5zdGFuY2UgdGhhdCB3aWxsIGFjdHVhbGx5IGJlIG1vdW50ZWQuXG4gKlxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGVcbiAqIEByZXR1cm4ge29iamVjdH0gQSBuZXcgaW5zdGFuY2Ugb2YgdGhlIGVsZW1lbnQncyBjb25zdHJ1Y3Rvci5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuZnVuY3Rpb24gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChub2RlKSB7XG4gIHZhciBpbnN0YW5jZTtcblxuICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSBmYWxzZSkge1xuICAgIGluc3RhbmNlID0gUmVhY3RFbXB0eUNvbXBvbmVudC5jcmVhdGUoaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlO1xuICAgICEoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0VsZW1lbnQgdHlwZSBpcyBpbnZhbGlkOiBleHBlY3RlZCBhIHN0cmluZyAoZm9yIGJ1aWx0LWluIGNvbXBvbmVudHMpICcgKyAnb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSBjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIGVsZW1lbnQudHlwZSA9PSBudWxsID8gZWxlbWVudC50eXBlIDogdHlwZW9mIGVsZW1lbnQudHlwZSwgZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKGVsZW1lbnQuX293bmVyKSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHN0cmluZyB2YWx1ZXNcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGluc3RhbmNlID0gUmVhY3ROYXRpdmVDb21wb25lbnQuY3JlYXRlSW50ZXJuYWxDb21wb25lbnQoZWxlbWVudCk7XG4gICAgfSBlbHNlIGlmIChpc0ludGVybmFsQ29tcG9uZW50VHlwZShlbGVtZW50LnR5cGUpKSB7XG4gICAgICAvLyBUaGlzIGlzIHRlbXBvcmFyaWx5IGF2YWlsYWJsZSBmb3IgY3VzdG9tIGNvbXBvbmVudHMgdGhhdCBhcmUgbm90IHN0cmluZ1xuICAgICAgLy8gcmVwcmVzZW50YXRpb25zLiBJLmUuIEFSVC4gT25jZSB0aG9zZSBhcmUgdXBkYXRlZCB0byB1c2UgdGhlIHN0cmluZ1xuICAgICAgLy8gcmVwcmVzZW50YXRpb24sIHdlIGNhbiBkcm9wIHRoaXMgY29kZSBwYXRoLlxuICAgICAgaW5zdGFuY2UgPSBuZXcgZWxlbWVudC50eXBlKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZSA9IG5ldyBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFdyYXBwZXIoZWxlbWVudCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygbm9kZSA9PT0gJ251bWJlcicpIHtcbiAgICBpbnN0YW5jZSA9IFJlYWN0TmF0aXZlQ29tcG9uZW50LmNyZWF0ZUluc3RhbmNlRm9yVGV4dChub2RlKTtcbiAgfSBlbHNlIHtcbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRW5jb3VudGVyZWQgaW52YWxpZCBSZWFjdCBub2RlIG9mIHR5cGUgJXMnLCB0eXBlb2Ygbm9kZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdGFuY2UubW91bnRDb21wb25lbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGluc3RhbmNlLnJlY2VpdmVDb21wb25lbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGluc3RhbmNlLmdldE5hdGl2ZU5vZGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGluc3RhbmNlLnVubW91bnRDb21wb25lbnQgPT09ICdmdW5jdGlvbicsICdPbmx5IFJlYWN0IENvbXBvbmVudHMgY2FuIGJlIG1vdW50ZWQuJykgOiB2b2lkIDA7XG4gIH1cblxuICAvLyBUaGVzZSB0d28gZmllbGRzIGFyZSB1c2VkIGJ5IHRoZSBET00gYW5kIEFSVCBkaWZmaW5nIGFsZ29yaXRobXNcbiAgLy8gcmVzcGVjdGl2ZWx5LiBJbnN0ZWFkIG9mIHVzaW5nIGV4cGFuZG9zIG9uIGNvbXBvbmVudHMsIHdlIHNob3VsZCBiZVxuICAvLyBzdG9yaW5nIHRoZSBzdGF0ZSBuZWVkZWQgYnkgdGhlIGRpZmZpbmcgYWxnb3JpdGhtcyBlbHNld2hlcmUuXG4gIGluc3RhbmNlLl9tb3VudEluZGV4ID0gMDtcbiAgaW5zdGFuY2UuX21vdW50SW1hZ2UgPSBudWxsO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaW5zdGFuY2UuX2lzT3duZXJOZWNlc3NhcnkgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5fd2FybmVkQWJvdXRSZWZzSW5SZW5kZXIgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEludGVybmFsIGluc3RhbmNlcyBzaG91bGQgZnVsbHkgY29uc3RydWN0ZWQgYXQgdGhpcyBwb2ludCwgc28gdGhleSBzaG91bGRcbiAgLy8gbm90IGdldCBhbnkgbmV3IGZpZWxkcyBhZGRlZCB0byB0aGVtIGF0IHRoaXMgcG9pbnQuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucykge1xuICAgICAgT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKGluc3RhbmNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEVycm9yVXRpbHMgPSByZXF1aXJlKCcuL1JlYWN0RXJyb3JVdGlscycpO1xudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSByZXF1aXJlKCcuL1JlYWN0SW5zdGFuY2VNYXAnKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcbnZhciBSZWFjdE5vZGVUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3ROb2RlVHlwZXMnKTtcbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCcuL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0VXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oY29tcG9uZW50KSB7XG4gIHZhciBvd25lciA9IGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyIHx8IG51bGw7XG4gIGlmIChvd25lcikge1xuICAgIHZhciBuYW1lID0gb3duZXIuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIFN0YXRlbGVzc0NvbXBvbmVudChDb21wb25lbnQpIHt9XG5TdGF0ZWxlc3NDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENvbXBvbmVudCA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICB2YXIgZWxlbWVudCA9IENvbXBvbmVudCh0aGlzLnByb3BzLCB0aGlzLmNvbnRleHQsIHRoaXMudXBkYXRlcik7XG4gIHdhcm5JZkludmFsaWRFbGVtZW50KENvbXBvbmVudCwgZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuZnVuY3Rpb24gd2FybklmSW52YWxpZEVsZW1lbnQoQ29tcG9uZW50LCBlbGVtZW50KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCksICclcyguLi4pOiBBIHZhbGlkIFJlYWN0IGVsZW1lbnQgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQuIFlvdSBtYXkgaGF2ZSAnICsgJ3JldHVybmVkIHVuZGVmaW5lZCwgYW4gYXJyYXkgb3Igc29tZSBvdGhlciBpbnZhbGlkIG9iamVjdC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tIFRoZSBMaWZlLUN5Y2xlIG9mIGEgQ29tcG9zaXRlIENvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiAtIGNvbnN0cnVjdG9yOiBJbml0aWFsaXphdGlvbiBvZiBzdGF0ZS4gVGhlIGluc3RhbmNlIGlzIG5vdyByZXRhaW5lZC5cbiAqICAgLSBjb21wb25lbnRXaWxsTW91bnRcbiAqICAgLSByZW5kZXJcbiAqICAgLSBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnNdXG4gKiAgICAgLSBbY2hpbGRyZW4ncyBjb21wb25lbnRXaWxsTW91bnQgYW5kIHJlbmRlcl1cbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudERpZE1vdW50XVxuICogICAgIC0gY29tcG9uZW50RGlkTW91bnRcbiAqXG4gKiAgICAgICBVcGRhdGUgUGhhc2VzOlxuICogICAgICAgLSBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChvbmx5IGNhbGxlZCBpZiBwYXJlbnQgdXBkYXRlZClcbiAqICAgICAgIC0gc2hvdWxkQ29tcG9uZW50VXBkYXRlXG4gKiAgICAgICAgIC0gY29tcG9uZW50V2lsbFVwZGF0ZVxuICogICAgICAgICAgIC0gcmVuZGVyXG4gKiAgICAgICAgICAgLSBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnMgb3IgcmVjZWl2ZSBwcm9wcyBwaGFzZXNdXG4gKiAgICAgICAgIC0gY29tcG9uZW50RGlkVXBkYXRlXG4gKlxuICogICAgIC0gY29tcG9uZW50V2lsbFVubW91bnRcbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxVbm1vdW50XVxuICogICAtIFtjaGlsZHJlbiBkZXN0cm95ZWRdXG4gKiAtIChkZXN0cm95ZWQpOiBUaGUgaW5zdGFuY2UgaXMgbm93IGJsYW5rLCByZWxlYXNlZCBieSBSZWFjdCBhbmQgcmVhZHkgZm9yIEdDLlxuICpcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBBbiBpbmNyZW1lbnRpbmcgSUQgYXNzaWduZWQgdG8gZWFjaCBjb21wb25lbnQgd2hlbiBpdCBpcyBtb3VudGVkLiBUaGlzIGlzXG4gKiB1c2VkIHRvIGVuZm9yY2UgdGhlIG9yZGVyIGluIHdoaWNoIGBSZWFjdFVwZGF0ZXNgIHVwZGF0ZXMgZGlydHkgY29tcG9uZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgbmV4dE1vdW50SUQgPSAxO1xuXG4vKipcbiAqIEBsZW5kcyB7UmVhY3RDb21wb3NpdGVDb21wb25lbnQucHJvdG90eXBlfVxuICovXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpbiA9IHtcblxuICAvKipcbiAgICogQmFzZSBjb25zdHJ1Y3RvciBmb3IgYWxsIGNvbXBvc2l0ZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVRdWV1ZVxuICAgIHRoaXMuX3BlbmRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSAwO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVzIGFuZCBSZWFjdFVwZGF0ZVF1ZXVlLlxuICAgIHRoaXMuX3BlbmRpbmdDYWxsYmFja3MgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50LCByZW5kZXJzIG1hcmt1cCwgYW5kIHJlZ2lzdGVycyBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5hdGl2ZVBhcmVudFxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5hdGl2ZUNvbnRhaW5lckluZm9cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9zdHJpbmd9IFJlbmRlcmVkIG1hcmt1cCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBET00uXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSBuZXh0TW91bnRJRCsrO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbmF0aXZlQ29udGFpbmVySW5mbztcblxuICAgIHZhciBwdWJsaWNQcm9wcyA9IHRoaXMuX3Byb2Nlc3NQcm9wcyh0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcyk7XG4gICAgdmFyIHB1YmxpY0NvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChjb250ZXh0KTtcblxuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgcHVibGljIGNsYXNzXG4gICAgdmFyIGluc3Q7XG4gICAgdmFyIHJlbmRlcmVkRWxlbWVudDtcblxuICAgIGlmIChDb21wb25lbnQucHJvdG90eXBlICYmIENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGluc3QgPSBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0ID0gQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCBSZWFjdFVwZGF0ZVF1ZXVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0ID09IG51bGwgfHwgaW5zdC5yZW5kZXIgPT0gbnVsbCkge1xuICAgICAgICByZW5kZXJlZEVsZW1lbnQgPSBpbnN0O1xuICAgICAgICB3YXJuSWZJbnZhbGlkRWxlbWVudChDb21wb25lbnQsIHJlbmRlcmVkRWxlbWVudCk7XG4gICAgICAgICEoaW5zdCA9PT0gbnVsbCB8fCBpbnN0ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoaW5zdCkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IEEgdmFsaWQgUmVhY3QgZWxlbWVudCAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZC4gWW91IG1heSBoYXZlICcgKyAncmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICBpbnN0ID0gbmV3IFN0YXRlbGVzc0NvbXBvbmVudChDb21wb25lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgbGF0ZXIgaW4gX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCwgYnV0IGFkZCBhbiBlYXJseVxuICAgICAgLy8gd2FybmluZyBub3cgdG8gaGVscCBkZWJ1Z2dpbmdcbiAgICAgIGlmIChpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogTm8gYHJlbmRlcmAgbWV0aG9kIGZvdW5kIG9uIHRoZSByZXR1cm5lZCBjb21wb25lbnQgJyArICdpbnN0YW5jZTogeW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBkZWZpbmUgYHJlbmRlcmAuJywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb3BzTXV0YXRlZCA9IGluc3QucHJvcHMgIT09IHB1YmxpY1Byb3BzO1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGluc3QucHJvcHMgPT09IHVuZGVmaW5lZCB8fCAhcHJvcHNNdXRhdGVkLCAnJXMoLi4uKTogV2hlbiBjYWxsaW5nIHN1cGVyKCkgaW4gYCVzYCwgbWFrZSBzdXJlIHRvIHBhc3MgJyArICd1cCB0aGUgc2FtZSBwcm9wcyB0aGF0IHlvdXIgY29tcG9uZW50XFwncyBjb25zdHJ1Y3RvciB3YXMgcGFzc2VkLicsIGNvbXBvbmVudE5hbWUsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFRoZXNlIHNob3VsZCBiZSBzZXQgdXAgaW4gdGhlIGNvbnN0cnVjdG9yLCBidXQgYXMgYSBjb252ZW5pZW5jZSBmb3JcbiAgICAvLyBzaW1wbGVyIGNsYXNzIGFic3RyYWN0aW9ucywgd2Ugc2V0IHRoZW0gdXAgYWZ0ZXIgdGhlIGZhY3QuXG4gICAgaW5zdC5wcm9wcyA9IHB1YmxpY1Byb3BzO1xuICAgIGluc3QuY29udGV4dCA9IHB1YmxpY0NvbnRleHQ7XG4gICAgaW5zdC5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgaW5zdC51cGRhdGVyID0gUmVhY3RVcGRhdGVRdWV1ZTtcblxuICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdDtcblxuICAgIC8vIFN0b3JlIGEgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIGJhY2sgdG8gdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5zZXQoaW5zdCwgdGhpcyk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gU2luY2UgcGxhaW4gSlMgY2xhc3NlcyBhcmUgZGVmaW5lZCB3aXRob3V0IGFueSBzcGVjaWFsIGluaXRpYWxpemF0aW9uXG4gICAgICAvLyBsb2dpYywgd2UgY2FuIG5vdCBjYXRjaCBjb21tb24gZXJyb3JzIGVhcmx5LiBUaGVyZWZvcmUsIHdlIGhhdmUgdG9cbiAgICAgIC8vIGNhdGNoIHRoZW0gaGVyZSwgYXQgaW5pdGlhbGl6YXRpb24gdGltZSwgaW5zdGVhZC5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldEluaXRpYWxTdGF0ZSB8fCBpbnN0LmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldEluaXRpYWxTdGF0ZSB3YXMgZGVmaW5lZCBvbiAlcywgYSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzLiAnICsgJ1RoaXMgaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNsYXNzZXMgY3JlYXRlZCB1c2luZyBSZWFjdC5jcmVhdGVDbGFzcy4gJyArICdEaWQgeW91IG1lYW4gdG8gZGVmaW5lIGEgc3RhdGUgcHJvcGVydHkgaW5zdGVhZD8nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldERlZmF1bHRQcm9wcyB8fCBpbnN0LmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyB3YXMgZGVmaW5lZCBvbiAlcywgYSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzLiAnICsgJ1RoaXMgaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNsYXNzZXMgY3JlYXRlZCB1c2luZyBSZWFjdC5jcmVhdGVDbGFzcy4gJyArICdVc2UgYSBzdGF0aWMgcHJvcGVydHkgdG8gZGVmaW5lIGRlZmF1bHRQcm9wcyBpbnN0ZWFkLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QucHJvcFR5cGVzLCAncHJvcFR5cGVzIHdhcyBkZWZpbmVkIGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IG9uICVzLiBVc2UgYSBzdGF0aWMgJyArICdwcm9wZXJ0eSB0byBkZWZpbmUgcHJvcFR5cGVzIGluc3RlYWQuJywgdGhpcy5nZXROYW1lKCkgfHwgJ2EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaW5zdC5jb250ZXh0VHlwZXMsICdjb250ZXh0VHlwZXMgd2FzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgb24gJXMuIFVzZSBhICcgKyAnc3RhdGljIHByb3BlcnR5IHRvIGRlZmluZSBjb250ZXh0VHlwZXMgaW5zdGVhZC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0LmNvbXBvbmVudFNob3VsZFVwZGF0ZSAhPT0gJ2Z1bmN0aW9uJywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3QuY29tcG9uZW50RGlkVW5tb3VudCAhPT0gJ2Z1bmN0aW9uJywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnREaWRVbm1vdW50KCkuIEJ1dCB0aGVyZSBpcyBubyBzdWNoIGxpZmVjeWNsZSBtZXRob2QuICcgKyAnRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxVbm1vdW50KCk/JywgdGhpcy5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdC5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCB0aGlzLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gaW5zdC5zdGF0ZTtcbiAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGluc3Quc3RhdGUgPSBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgIH1cbiAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLnN0YXRlOiBtdXN0IGJlIHNldCB0byBhbiBvYmplY3Qgb3IgbnVsbCcsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG5cbiAgICB2YXIgbWFya3VwO1xuICAgIGlmIChpbnN0LnVuc3RhYmxlX2hhbmRsZUVycm9yKSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZyhyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnREaWRNb3VudCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShpbnN0LmNvbXBvbmVudERpZE1vdW50LCBpbnN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIHBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZzogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBtYXJrdXA7XG4gICAgdmFyIGNoZWNrcG9pbnQgPSB0cmFuc2FjdGlvbi5jaGVja3BvaW50KCk7XG4gICAgdHJ5IHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudChyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFJvbGwgYmFjayB0byBjaGVja3BvaW50LCBoYW5kbGUgZXJyb3IgKHdoaWNoIG1heSBhZGQgaXRlbXMgdG8gdGhlIHRyYW5zYWN0aW9uKSwgYW5kIHRha2UgYSBuZXcgY2hlY2twb2ludFxuICAgICAgdHJhbnNhY3Rpb24ucm9sbGJhY2soY2hlY2twb2ludCk7XG4gICAgICB0aGlzLl9pbnN0YW5jZS51bnN0YWJsZV9oYW5kbGVFcnJvcihlKTtcbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSkge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5zdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUodGhpcy5faW5zdGFuY2UucHJvcHMsIHRoaXMuX2luc3RhbmNlLmNvbnRleHQpO1xuICAgICAgfVxuICAgICAgY2hlY2twb2ludCA9IHRyYW5zYWN0aW9uLmNoZWNrcG9pbnQoKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQudW5tb3VudENvbXBvbmVudCh0cnVlKTtcbiAgICAgIHRyYW5zYWN0aW9uLnJvbGxiYWNrKGNoZWNrcG9pbnQpO1xuXG4gICAgICAvLyBUcnkgYWdhaW4gLSB3ZSd2ZSBpbmZvcm1lZCB0aGUgY29tcG9uZW50IGFib3V0IHRoZSBlcnJvciwgc28gdGhleSBjYW4gcmVuZGVyIGFuIGVycm9yIG1lc3NhZ2UgdGhpcyB0aW1lLlxuICAgICAgLy8gSWYgdGhpcyB0aHJvd3MgYWdhaW4sIHRoZSBlcnJvciB3aWxsIGJ1YmJsZSB1cCAoYW5kIGNhbiBiZSBjYXVnaHQgYnkgYSBoaWdoZXIgZXJyb3IgYm91bmRhcnkpLlxuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgcGVyZm9ybUluaXRpYWxNb3VudDogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbE1vdW50KSB7XG4gICAgICBpbnN0LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgLy8gV2hlbiBtb3VudGluZywgY2FsbHMgdG8gYHNldFN0YXRlYCBieSBgY29tcG9uZW50V2lsbE1vdW50YCB3aWxsIHNldFxuICAgICAgLy8gYHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlYCB3aXRob3V0IHRyaWdnZXJpbmcgYSByZS1yZW5kZXIuXG4gICAgICBpZiAodGhpcy5fcGVuZGluZ1N0YXRlUXVldWUpIHtcbiAgICAgICAgaW5zdC5zdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUoaW5zdC5wcm9wcywgaW5zdC5jb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBub3QgYSBzdGF0ZWxlc3MgY29tcG9uZW50LCB3ZSBub3cgcmVuZGVyXG4gICAgaWYgKHJlbmRlcmVkRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gUmVhY3ROb2RlVHlwZXMuZ2V0VHlwZShyZW5kZXJlZEVsZW1lbnQpO1xuICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gdGhpcy5faW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChyZW5kZXJlZEVsZW1lbnQpO1xuXG4gICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudCh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCwgdHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSk7XG5cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIGdldE5hdGl2ZU5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbnkgcmVzb3VyY2VzIGFsbG9jYXRlZCBieSBgbW91bnRDb21wb25lbnRgLlxuICAgKlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgaWYgKCF0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbFVubW91bnQpIHtcbiAgICAgIGlmIChzYWZlbHkpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSArICcuY29tcG9uZW50V2lsbFVubW91bnQoKSc7XG4gICAgICAgIFJlYWN0RXJyb3JVdGlscy5pbnZva2VHdWFyZGVkQ2FsbGJhY2sobmFtZSwgaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudC5iaW5kKGluc3QpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LCBzYWZlbHkpO1xuICAgICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgcGVuZGluZyBmaWVsZHNcbiAgICAvLyBFdmVuIGlmIHRoaXMgY29tcG9uZW50IGlzIHNjaGVkdWxlZCBmb3IgYW5vdGhlciB1cGRhdGUgaW4gUmVhY3RVcGRhdGVzLFxuICAgIC8vIGl0IHdvdWxkIHN0aWxsIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGVzZSBmaWVsZHMgYXJlIHJlc2V0LlxuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgLy8gVGhlc2UgZmllbGRzIGRvIG5vdCByZWFsbHkgbmVlZCB0byBiZSByZXNldCBzaW5jZSB0aGlzIG9iamVjdCBpcyBub1xuICAgIC8vIGxvbmdlciBhY2Nlc3NpYmxlLlxuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBEZWxldGUgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZSBpbnN0YW5jZSB0byB0aGlzIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgLy8gd2hpY2ggYWxsb3cgdGhlIGludGVybmFscyB0byBiZSBwcm9wZXJseSBjbGVhbmVkIHVwIGV2ZW4gaWYgdGhlIHVzZXJcbiAgICAvLyBsZWFrcyBhIHJlZmVyZW5jZSB0byB0aGUgcHVibGljIGluc3RhbmNlLlxuICAgIFJlYWN0SW5zdGFuY2VNYXAucmVtb3ZlKGluc3QpO1xuXG4gICAgLy8gU29tZSBleGlzdGluZyBjb21wb25lbnRzIHJlbHkgb24gaW5zdC5wcm9wcyBldmVuIGFmdGVyIHRoZXkndmUgYmVlblxuICAgIC8vIGRlc3Ryb3llZCAoaW4gZXZlbnQgaGFuZGxlcnMpLlxuICAgIC8vIFRPRE86IGluc3QucHJvcHMgPSBudWxsO1xuICAgIC8vIFRPRE86IGluc3Quc3RhdGUgPSBudWxsO1xuICAgIC8vIFRPRE86IGluc3QuY29udGV4dCA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgdGhlIGNvbnRleHQgb2JqZWN0IHRvIG9ubHkgY29udGFpbiBrZXlzIHNwZWNpZmllZCBpblxuICAgKiBgY29udGV4dFR5cGVzYFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21hc2tDb250ZXh0OiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgIHZhciBjb250ZXh0VHlwZXMgPSBDb21wb25lbnQuY29udGV4dFR5cGVzO1xuICAgIGlmICghY29udGV4dFR5cGVzKSB7XG4gICAgICByZXR1cm4gZW1wdHlPYmplY3Q7XG4gICAgfVxuICAgIHZhciBtYXNrZWRDb250ZXh0ID0ge307XG4gICAgZm9yICh2YXIgY29udGV4dE5hbWUgaW4gY29udGV4dFR5cGVzKSB7XG4gICAgICBtYXNrZWRDb250ZXh0W2NvbnRleHROYW1lXSA9IGNvbnRleHRbY29udGV4dE5hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgfSxcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY29udGV4dCBvYmplY3QgdG8gb25seSBjb250YWluIGtleXMgc3BlY2lmaWVkIGluXG4gICAqIGBjb250ZXh0VHlwZXNgLCBhbmQgYXNzZXJ0cyB0aGF0IHRoZXkgYXJlIHZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3Byb2Nlc3NDb250ZXh0OiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBtYXNrZWRDb250ZXh0ID0gdGhpcy5fbWFza0NvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgICAgaWYgKENvbXBvbmVudC5jb250ZXh0VHlwZXMpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LmNvbnRleHRUeXBlcywgbWFza2VkQ29udGV4dCwgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50Q29udGV4dFxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKGN1cnJlbnRDb250ZXh0KSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0KCk7XG4gICAgfVxuICAgIHZhciBjaGlsZENvbnRleHQgPSBpbnN0LmdldENoaWxkQ29udGV4dCAmJiBpbnN0LmdldENoaWxkQ29udGV4dCgpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0KCk7XG4gICAgfVxuICAgIGlmIChjaGlsZENvbnRleHQpIHtcbiAgICAgICEodHlwZW9mIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gJyArICd1c2UgZ2V0Q2hpbGRDb250ZXh0KCkuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHQsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY2hpbGRDb250ZXh0KTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY2hpbGRDb250ZXh0KSB7XG4gICAgICAgICEobmFtZSBpbiBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBrZXkgXCIlc1wiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYXNzaWduKHt9LCBjdXJyZW50Q29udGV4dCwgY2hpbGRDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRDb250ZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgcHJvcHMgYnkgc2V0dGluZyBkZWZhdWx0IHZhbHVlcyBmb3IgdW5zcGVjaWZpZWQgcHJvcHMgYW5kXG4gICAqIGFzc2VydGluZyB0aGF0IHRoZSBwcm9wcyBhcmUgdmFsaWQuIERvZXMgbm90IG11dGF0ZSBpdHMgYXJndW1lbnQ7IHJldHVybnNcbiAgICogYSBuZXcgcHJvcHMgb2JqZWN0IHdpdGggZGVmYXVsdHMgbWVyZ2VkIGluLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV3UHJvcHNcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3Byb2Nlc3NQcm9wczogZnVuY3Rpb24gKG5ld1Byb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgICAgaWYgKENvbXBvbmVudC5wcm9wVHlwZXMpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LnByb3BUeXBlcywgbmV3UHJvcHMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9wcztcbiAgfSxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgdGhlIHByb3BzIGFyZSB2YWxpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcFR5cGVzIE1hcCBvZiBwcm9wIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tQcm9wVHlwZXM6IGZ1bmN0aW9uIChwcm9wVHlwZXMsIHByb3BzLCBsb2NhdGlvbikge1xuICAgIC8vIFRPRE86IFN0b3AgdmFsaWRhdGluZyBwcm9wIHR5cGVzIGhlcmUgYW5kIG9ubHkgdXNlIHRoZSBlbGVtZW50XG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BUeXBlcykge1xuICAgICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICAhKHR5cGVvZiBwcm9wVHlwZXNbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSAnICsgJ2Zyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICAgIGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgLy8gV2UgbWF5IHdhbnQgdG8gZXh0ZW5kIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgZXJyb3JzIGluXG4gICAgICAgICAgLy8gdG9wLWxldmVsIHJlbmRlciBjYWxscywgc28gSSdtIGFic3RyYWN0aW5nIGl0IGF3YXkgaW50b1xuICAgICAgICAgIC8vIGEgZnVuY3Rpb24gdG8gbWluaW1pemUgcmVmYWN0b3JpbmcgaW4gdGhlIGZ1dHVyZVxuICAgICAgICAgIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSh0aGlzKTtcblxuICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKSB7XG4gICAgICAgICAgICAvLyBQcmVmYWNlIGdpdmVzIHVzIHNvbWV0aGluZyB0byBibGFja2xpc3QgaW4gd2FybmluZyBtb2R1bGVcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgQ29udGV4dCBUeXBlczogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgbmV4dENvbnRleHQpIHtcbiAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICB2YXIgcHJldkNvbnRleHQgPSB0aGlzLl9jb250ZXh0O1xuXG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgcHJldkNvbnRleHQsIG5leHRDb250ZXh0KTtcbiAgfSxcblxuICAvKipcbiAgICogSWYgYW55IG9mIGBfcGVuZGluZ0VsZW1lbnRgLCBgX3BlbmRpbmdTdGF0ZVF1ZXVlYCwgb3IgYF9wZW5kaW5nRm9yY2VVcGRhdGVgXG4gICAqIGlzIHNldCwgdXBkYXRlIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwZXJmb3JtVXBkYXRlSWZOZWNlc3Nhcnk6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgIGlmICh0aGlzLl9wZW5kaW5nRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudCh0aGlzLCB0aGlzLl9wZW5kaW5nRWxlbWVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSAhPT0gbnVsbCB8fCB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KHRyYW5zYWN0aW9uLCB0aGlzLl9jdXJyZW50RWxlbWVudCwgdGhpcy5fY3VycmVudEVsZW1lbnQsIHRoaXMuX2NvbnRleHQsIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUGVyZm9ybSBhbiB1cGRhdGUgdG8gYSBtb3VudGVkIGNvbXBvbmVudC4gVGhlIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgYW5kXG4gICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSBtZXRob2RzIGFyZSBjYWxsZWQsIHRoZW4gKGFzc3VtaW5nIHRoZSB1cGRhdGUgaXNuJ3RcbiAgICogc2tpcHBlZCkgdGhlIHJlbWFpbmluZyB1cGRhdGUgbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGNhbGxlZCBhbmQgdGhlIERPTVxuICAgKiByZXByZXNlbnRhdGlvbiBpcyB1cGRhdGVkLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IHByZXZQYXJlbnRFbGVtZW50XG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0UGFyZW50RWxlbWVudFxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldlBhcmVudEVsZW1lbnQsIG5leHRQYXJlbnRFbGVtZW50LCBwcmV2VW5tYXNrZWRDb250ZXh0LCBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICB2YXIgd2lsbFJlY2VpdmUgPSBmYWxzZTtcbiAgICB2YXIgbmV4dENvbnRleHQ7XG4gICAgdmFyIG5leHRQcm9wcztcblxuICAgIC8vIERldGVybWluZSBpZiB0aGUgY29udGV4dCBoYXMgY2hhbmdlZCBvciBub3RcbiAgICBpZiAodGhpcy5fY29udGV4dCA9PT0gbmV4dFVubWFza2VkQ29udGV4dCkge1xuICAgICAgbmV4dENvbnRleHQgPSBpbnN0LmNvbnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRDb250ZXh0ID0gdGhpcy5fcHJvY2Vzc0NvbnRleHQobmV4dFVubWFza2VkQ29udGV4dCk7XG4gICAgICB3aWxsUmVjZWl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gRGlzdGluZ3Vpc2ggYmV0d2VlbiBhIHByb3BzIHVwZGF0ZSB2ZXJzdXMgYSBzaW1wbGUgc3RhdGUgdXBkYXRlXG4gICAgaWYgKHByZXZQYXJlbnRFbGVtZW50ID09PSBuZXh0UGFyZW50RWxlbWVudCkge1xuICAgICAgLy8gU2tpcCBjaGVja2luZyBwcm9wIHR5cGVzIGFnYWluIC0tIHdlIGRvbid0IHJlYWQgaW5zdC5wcm9wcyB0byBhdm9pZFxuICAgICAgLy8gd2FybmluZyBmb3IgRE9NIGNvbXBvbmVudCBwcm9wcyBpbiB0aGlzIHVwZ3JhZGVcbiAgICAgIG5leHRQcm9wcyA9IG5leHRQYXJlbnRFbGVtZW50LnByb3BzO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0UHJvcHMgPSB0aGlzLl9wcm9jZXNzUHJvcHMobmV4dFBhcmVudEVsZW1lbnQucHJvcHMpO1xuICAgICAgd2lsbFJlY2VpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFuIHVwZGF0ZSBoZXJlIHdpbGwgc2NoZWR1bGUgYW4gdXBkYXRlIGJ1dCBpbW1lZGlhdGVseSBzZXRcbiAgICAvLyBfcGVuZGluZ1N0YXRlUXVldWUgd2hpY2ggd2lsbCBlbnN1cmUgdGhhdCBhbnkgc3RhdGUgdXBkYXRlcyBnZXRzXG4gICAgLy8gaW1tZWRpYXRlbHkgcmVjb25jaWxlZCBpbnN0ZWFkIG9mIHdhaXRpbmcgZm9yIHRoZSBuZXh0IGJhdGNoLlxuICAgIGlmICh3aWxsUmVjZWl2ZSAmJiBpbnN0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcblxuICAgIHZhciBzaG91bGRVcGRhdGUgPSB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgfHwgIWluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlIHx8IGluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoc2hvdWxkVXBkYXRlICE9PSB1bmRlZmluZWQsICclcy5zaG91bGRDb21wb25lbnRVcGRhdGUoKTogUmV0dXJuZWQgdW5kZWZpbmVkIGluc3RlYWQgb2YgYSAnICsgJ2Jvb2xlYW4gdmFsdWUuIE1ha2Ugc3VyZSB0byByZXR1cm4gdHJ1ZSBvciBmYWxzZS4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcbiAgICAgIC8vIFdpbGwgc2V0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgIGFuZCBgdGhpcy5jb250ZXh0YC5cbiAgICAgIHRoaXMuX3BlcmZvcm1Db21wb25lbnRVcGRhdGUobmV4dFBhcmVudEVsZW1lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgdHJhbnNhY3Rpb24sIG5leHRVbm1hc2tlZENvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBpdCdzIGRldGVybWluZWQgdGhhdCBhIGNvbXBvbmVudCBzaG91bGQgbm90IHVwZGF0ZSwgd2Ugc3RpbGwgd2FudFxuICAgICAgLy8gdG8gc2V0IHByb3BzIGFuZCBzdGF0ZSBidXQgd2Ugc2hvcnRjdXQgdGhlIHJlc3Qgb2YgdGhlIHVwZGF0ZS5cbiAgICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dFBhcmVudEVsZW1lbnQ7XG4gICAgICB0aGlzLl9jb250ZXh0ID0gbmV4dFVubWFza2VkQ29udGV4dDtcbiAgICAgIGluc3QucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgaW5zdC5jb250ZXh0ID0gbmV4dENvbnRleHQ7XG4gICAgfVxuICB9LFxuXG4gIF9wcm9jZXNzUGVuZGluZ1N0YXRlOiBmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIHZhciBxdWV1ZSA9IHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlO1xuICAgIHZhciByZXBsYWNlID0gdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZTtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcmV0dXJuIGluc3Quc3RhdGU7XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2UgJiYgcXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcXVldWVbMF07XG4gICAgfVxuXG4gICAgdmFyIG5leHRTdGF0ZSA9IF9hc3NpZ24oe30sIHJlcGxhY2UgPyBxdWV1ZVswXSA6IGluc3Quc3RhdGUpO1xuICAgIGZvciAodmFyIGkgPSByZXBsYWNlID8gMSA6IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcnRpYWwgPSBxdWV1ZVtpXTtcbiAgICAgIF9hc3NpZ24obmV4dFN0YXRlLCB0eXBlb2YgcGFydGlhbCA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnRpYWwuY2FsbChpbnN0LCBuZXh0U3RhdGUsIHByb3BzLCBjb250ZXh0KSA6IHBhcnRpYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1lcmdlcyBuZXcgcHJvcHMgYW5kIHN0YXRlLCBub3RpZmllcyBkZWxlZ2F0ZSBtZXRob2RzIG9mIHVwZGF0ZSBhbmRcbiAgICogcGVyZm9ybXMgdXBkYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnQgTmV4dCBlbGVtZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHMgTmV4dCBwdWJsaWMgb2JqZWN0IHRvIHNldCBhcyBwcm9wZXJ0aWVzLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZSBOZXh0IG9iamVjdCB0byBzZXQgYXMgc3RhdGUuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHQgTmV4dCBwdWJsaWMgb2JqZWN0IHRvIHNldCBhcyBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gdW5tYXNrZWRDb250ZXh0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGVyZm9ybUNvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKG5leHRFbGVtZW50LCBuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQsIHRyYW5zYWN0aW9uLCB1bm1hc2tlZENvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgdmFyIGhhc0NvbXBvbmVudERpZFVwZGF0ZSA9IEJvb2xlYW4oaW5zdC5jb21wb25lbnREaWRVcGRhdGUpO1xuICAgIHZhciBwcmV2UHJvcHM7XG4gICAgdmFyIHByZXZTdGF0ZTtcbiAgICB2YXIgcHJldkNvbnRleHQ7XG4gICAgaWYgKGhhc0NvbXBvbmVudERpZFVwZGF0ZSkge1xuICAgICAgcHJldlByb3BzID0gaW5zdC5wcm9wcztcbiAgICAgIHByZXZTdGF0ZSA9IGluc3Quc3RhdGU7XG4gICAgICBwcmV2Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVXBkYXRlKSB7XG4gICAgICBpbnN0LmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRFbGVtZW50O1xuICAgIHRoaXMuX2NvbnRleHQgPSB1bm1hc2tlZENvbnRleHQ7XG4gICAgaW5zdC5wcm9wcyA9IG5leHRQcm9wcztcbiAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgIGluc3QuY29udGV4dCA9IG5leHRDb250ZXh0O1xuXG4gICAgdGhpcy5fdXBkYXRlUmVuZGVyZWRDb21wb25lbnQodHJhbnNhY3Rpb24sIHVubWFza2VkQ29udGV4dCk7XG5cbiAgICBpZiAoaGFzQ29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQoaW5zdCwgcHJldlByb3BzLCBwcmV2U3RhdGUsIHByZXZDb250ZXh0KSwgaW5zdCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBjb21wb25lbnQncyBgcmVuZGVyYCBtZXRob2QgYW5kIHVwZGF0ZSB0aGUgRE9NIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgcHJldkNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgdmFyIHByZXZSZW5kZXJlZEVsZW1lbnQgPSBwcmV2Q29tcG9uZW50SW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuICAgIHZhciBuZXh0UmVuZGVyZWRFbGVtZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZSZW5kZXJlZEVsZW1lbnQsIG5leHRSZW5kZXJlZEVsZW1lbnQpKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudChwcmV2Q29tcG9uZW50SW5zdGFuY2UsIG5leHRSZW5kZXJlZEVsZW1lbnQsIHRyYW5zYWN0aW9uLCB0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KGNvbnRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9sZE5hdGl2ZU5vZGUgPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShwcmV2Q29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocHJldkNvbXBvbmVudEluc3RhbmNlLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVkTm9kZVR5cGUgPSBSZWFjdE5vZGVUeXBlcy5nZXRUeXBlKG5leHRSZW5kZXJlZEVsZW1lbnQpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRSZW5kZXJlZEVsZW1lbnQpO1xuICAgICAgdmFyIG5leHRNYXJrdXAgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsIHRyYW5zYWN0aW9uLCB0aGlzLl9uYXRpdmVQYXJlbnQsIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8sIHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQoY29udGV4dCkpO1xuICAgICAgdGhpcy5fcmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT3ZlcnJpZGRlbiBpbiBzaGFsbG93IHJlbmRlcmluZy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApIHtcbiAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cChvbGROYXRpdmVOb2RlLCBuZXh0TWFya3VwKTtcbiAgfSxcblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudFdpdGhvdXRPd25lck9yQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgdmFyIHJlbmRlcmVkQ29tcG9uZW50ID0gaW5zdC5yZW5kZXIoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICBpZiAocmVuZGVyZWRDb21wb25lbnQgPT09IHVuZGVmaW5lZCAmJiBpbnN0LnJlbmRlci5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZENvbXBvbmVudDtcbiAgfSxcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlcmVkQ29tcG9uZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50V2l0aG91dE93bmVyT3JDb250ZXh0KCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICAhKFxuICAgIC8vIFRPRE86IEFuIGBpc1ZhbGlkTm9kZWAgZnVuY3Rpb24gd291bGQgcHJvYmFibHkgYmUgbW9yZSBhcHByb3ByaWF0ZVxuICAgIHJlbmRlcmVkQ29tcG9uZW50ID09PSBudWxsIHx8IHJlbmRlcmVkQ29tcG9uZW50ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocmVuZGVyZWRDb21wb25lbnQpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5yZW5kZXIoKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgJyArICdyZXR1cm5lZCB1bmRlZmluZWQsIGFuIGFycmF5IG9yIHNvbWUgb3RoZXIgaW52YWxpZCBvYmplY3QuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHJldHVybiByZW5kZXJlZENvbXBvbmVudDtcbiAgfSxcblxuICAvKipcbiAgICogTGF6aWx5IGFsbG9jYXRlcyB0aGUgcmVmcyBvYmplY3QgYW5kIHN0b3JlcyBgY29tcG9uZW50YCBhcyBgcmVmYC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBSZWZlcmVuY2UgbmFtZS5cbiAgICogQHBhcmFtIHtjb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gc3RvcmUgYXMgYHJlZmAuXG4gICAqIEBmaW5hbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXR0YWNoUmVmOiBmdW5jdGlvbiAocmVmLCBjb21wb25lbnQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAhKGluc3QgIT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGhhdmUgcmVmcy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHB1YmxpY0NvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50ICYmIGNvbXBvbmVudC5nZXROYW1lID8gY29tcG9uZW50LmdldE5hbWUoKSA6ICdhIGNvbXBvbmVudCc7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhwdWJsaWNDb21wb25lbnRJbnN0YW5jZSAhPSBudWxsLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGJlIGdpdmVuIHJlZnMgJyArICcoU2VlIHJlZiBcIiVzXCIgaW4gJXMgY3JlYXRlZCBieSAlcykuICcgKyAnQXR0ZW1wdHMgdG8gYWNjZXNzIHRoaXMgcmVmIHdpbGwgZmFpbC4nLCByZWYsIGNvbXBvbmVudE5hbWUsIHRoaXMuZ2V0TmFtZSgpKSA6IHZvaWQgMDtcbiAgICB9XG4gICAgdmFyIHJlZnMgPSBpbnN0LnJlZnMgPT09IGVtcHR5T2JqZWN0ID8gaW5zdC5yZWZzID0ge30gOiBpbnN0LnJlZnM7XG4gICAgcmVmc1tyZWZdID0gcHVibGljQ29tcG9uZW50SW5zdGFuY2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGFjaGVzIGEgcmVmZXJlbmNlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSB0byBkZXJlZmVyZW5jZS5cbiAgICogQGZpbmFsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXRhY2hSZWY6IGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIgcmVmcyA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKS5yZWZzO1xuICAgIGRlbGV0ZSByZWZzW3JlZl07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhIHRleHQgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5IGl0XG4gICAqIGluIGVycm9yIG1lc3NhZ2VzLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9yIG51bGwuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLl9pbnN0YW5jZSAmJiB0aGlzLl9pbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgY29uc3RydWN0b3IgJiYgY29uc3RydWN0b3IubmFtZSB8fCBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHB1YmxpY2x5IGFjY2Vzc2libGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb21wb25lbnQgLSBpLmUuIHdoYXRcbiAgICogaXMgZXhwb3NlZCBieSByZWZzIGFuZCByZXR1cm5lZCBieSByZW5kZXIuIENhbiBiZSBudWxsIGZvciBzdGF0ZWxlc3NcbiAgICogY29tcG9uZW50cy5cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9IHRoZSBwdWJsaWMgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAoaW5zdCBpbnN0YW5jZW9mIFN0YXRlbGVzc0NvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpbnN0O1xuICB9LFxuXG4gIC8vIFN0dWJcbiAgX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6IG51bGxcblxufTtcblxuUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50TWl4aW4sICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIHtcbiAgbW91bnRDb21wb25lbnQ6ICdtb3VudENvbXBvbmVudCcsXG4gIHVwZGF0ZUNvbXBvbmVudDogJ3VwZGF0ZUNvbXBvbmVudCcsXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6ICdfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50J1xufSk7XG5cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHtcblxuICBNaXhpbjogUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpblxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudEVudmlyb25tZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBpbmplY3RlZCA9IGZhbHNlO1xuXG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHtcblxuICAvKipcbiAgICogT3B0aW9uYWxseSBpbmplY3RhYmxlIGVudmlyb25tZW50IGRlcGVuZGVudCBjbGVhbnVwIGhvb2suIChzZXJ2ZXIgdnMuXG4gICAqIGJyb3dzZXIgZXRjKS4gRXhhbXBsZTogQSBicm93c2VyIHN5c3RlbSBjYWNoZXMgRE9NIG5vZGVzIGJhc2VkIG9uIGNvbXBvbmVudFxuICAgKiBJRCBhbmQgbXVzdCByZW1vdmUgdGhhdCBjYWNoZSBlbnRyeSB3aGVuIHRoaXMgaW5zdGFuY2UgaXMgdW5tb3VudGVkLlxuICAgKi9cbiAgdW5tb3VudElERnJvbUVudmlyb25tZW50OiBudWxsLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IGluamVjdGFibGUgaG9vayBmb3Igc3dhcHBpbmcgb3V0IG1vdW50IGltYWdlcyBpbiB0aGUgbWlkZGxlIG9mXG4gICAqIHRoZSB0cmVlLlxuICAgKi9cbiAgcmVwbGFjZU5vZGVXaXRoTWFya3VwOiBudWxsLFxuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IGluamVjdGFibGUgaG9vayBmb3IgcHJvY2Vzc2luZyBhIHF1ZXVlIG9mIGNoaWxkIHVwZGF0ZXMuIFdpbGxcbiAgICogbGF0ZXIgbW92ZSBpbnRvIE11bHRpQ2hpbGRDb21wb25lbnRzLlxuICAgKi9cbiAgcHJvY2Vzc0NoaWxkcmVuVXBkYXRlczogbnVsbCxcblxuICBpbmplY3Rpb246IHtcbiAgICBpbmplY3RFbnZpcm9ubWVudDogZnVuY3Rpb24gKGVudmlyb25tZW50KSB7XG4gICAgICAhIWluamVjdGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50OiBpbmplY3RFbnZpcm9ubWVudCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50ID0gZW52aXJvbm1lbnQudW5tb3VudElERnJvbUVudmlyb25tZW50O1xuICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXAgPSBlbnZpcm9ubWVudC5yZXBsYWNlTm9kZVdpdGhNYXJrdXA7XG4gICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMgPSBlbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzO1xuICAgICAgaW5qZWN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RFcnJvclV0aWxzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2F1Z2h0RXJyb3IgPSBudWxsO1xuXG4vKipcbiAqIENhbGwgYSBmdW5jdGlvbiB3aGlsZSBndWFyZGluZyBhZ2FpbnN0IGVycm9ycyB0aGF0IGhhcHBlbnMgd2l0aGluIGl0LlxuICpcbiAqIEBwYXJhbSB7P1N0cmluZ30gbmFtZSBvZiB0aGUgZ3VhcmQgdG8gdXNlIGZvciBsb2dnaW5nIG9yIGRlYnVnZ2luZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlXG4gKiBAcGFyYW0geyp9IGEgRmlyc3QgYXJndW1lbnRcbiAqIEBwYXJhbSB7Kn0gYiBTZWNvbmQgYXJndW1lbnRcbiAqL1xuZnVuY3Rpb24gaW52b2tlR3VhcmRlZENhbGxiYWNrKG5hbWUsIGZ1bmMsIGEsIGIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnVuYyhhLCBiKTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIGlmIChjYXVnaHRFcnJvciA9PT0gbnVsbCkge1xuICAgICAgY2F1Z2h0RXJyb3IgPSB4O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbnZhciBSZWFjdEVycm9yVXRpbHMgPSB7XG4gIGludm9rZUd1YXJkZWRDYWxsYmFjazogaW52b2tlR3VhcmRlZENhbGxiYWNrLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJ5IFJlYWN0VGVzdFV0aWxzLlNpbXVsYXRlIHNvIHRoYXQgYW55IGVycm9ycyB0aHJvd24gYnkgdGhlIGV2ZW50XG4gICAqIGhhbmRsZXIgYXJlIHN1cmUgdG8gYmUgcmV0aHJvd24gYnkgcmV0aHJvd0NhdWdodEVycm9yLlxuICAgKi9cbiAgaW52b2tlR3VhcmRlZENhbGxiYWNrV2l0aENhdGNoOiBpbnZva2VHdWFyZGVkQ2FsbGJhY2ssXG5cbiAgLyoqXG4gICAqIER1cmluZyBleGVjdXRpb24gb2YgZ3VhcmRlZCBmdW5jdGlvbnMgd2Ugd2lsbCBjYXB0dXJlIHRoZSBmaXJzdCBlcnJvciB3aGljaFxuICAgKiB3ZSB3aWxsIHJldGhyb3cgdG8gYmUgaGFuZGxlZCBieSB0aGUgdG9wIGxldmVsIGVycm9yIGhhbmRsZXIuXG4gICAqL1xuICByZXRocm93Q2F1Z2h0RXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2F1Z2h0RXJyb3IpIHtcbiAgICAgIHZhciBlcnJvciA9IGNhdWdodEVycm9yO1xuICAgICAgY2F1Z2h0RXJyb3IgPSBudWxsO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAvKipcbiAgICogVG8gaGVscCBkZXZlbG9wbWVudCB3ZSBjYW4gZ2V0IGJldHRlciBkZXZ0b29scyBpbnRlZ3JhdGlvbiBieSBzaW11bGF0aW5nIGFcbiAgICogcmVhbCBicm93c2VyIGV2ZW50LlxuICAgKi9cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZGlzcGF0Y2hFdmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBmYWtlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3JlYWN0Jyk7XG4gICAgUmVhY3RFcnJvclV0aWxzLmludm9rZUd1YXJkZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jLCBhLCBiKSB7XG4gICAgICB2YXIgYm91bmRGdW5jID0gZnVuYy5iaW5kKG51bGwsIGEsIGIpO1xuICAgICAgdmFyIGV2dFR5cGUgPSAncmVhY3QtJyArIG5hbWU7XG4gICAgICBmYWtlTm9kZS5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGJvdW5kRnVuYywgZmFsc2UpO1xuICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZXZ0LmluaXRFdmVudChldnRUeXBlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgZmFrZU5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgZmFrZU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBib3VuZEZ1bmMsIGZhbHNlKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFcnJvclV0aWxzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEVycm9yVXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSA0OFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROb2RlVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdE5vZGVUeXBlcyA9IHtcbiAgTkFUSVZFOiAwLFxuICBDT01QT1NJVEU6IDEsXG4gIEVNUFRZOiAyLFxuXG4gIGdldFR5cGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBSZWFjdE5vZGVUeXBlcy5FTVBUWTtcbiAgICB9IGVsc2UgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgICAgaWYgKHR5cGVvZiBub2RlLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLkNPTVBPU0lURTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZWFjdE5vZGVUeXBlcy5OQVRJVkU7XG4gICAgICB9XG4gICAgfVxuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdVbmV4cGVjdGVkIG5vZGU6ICVzJywgbm9kZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9kZVR5cGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5vZGVUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHaXZlbiBhIGBwcmV2RWxlbWVudGAgYW5kIGBuZXh0RWxlbWVudGAsIGRldGVybWluZXMgaWYgdGhlIGV4aXN0aW5nXG4gKiBpbnN0YW5jZSBzaG91bGQgYmUgdXBkYXRlZCBhcyBvcHBvc2VkIHRvIGJlaW5nIGRlc3Ryb3llZCBvciByZXBsYWNlZCBieSBhIG5ld1xuICogaW5zdGFuY2UuIEJvdGggYXJndW1lbnRzIGFyZSBlbGVtZW50cy4gVGhpcyBlbnN1cmVzIHRoYXQgdGhpcyBsb2dpYyBjYW5cbiAqIG9wZXJhdGUgb24gc3RhdGVsZXNzIHRyZWVzIHdpdGhvdXQgYW55IGJhY2tpbmcgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2RWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0RWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZXhpc3RpbmcgaW5zdGFuY2Ugc2hvdWxkIGJlIHVwZGF0ZWQuXG4gKiBAcHJvdGVjdGVkXG4gKi9cblxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQocHJldkVsZW1lbnQsIG5leHRFbGVtZW50KSB7XG4gIHZhciBwcmV2RW1wdHkgPSBwcmV2RWxlbWVudCA9PT0gbnVsbCB8fCBwcmV2RWxlbWVudCA9PT0gZmFsc2U7XG4gIHZhciBuZXh0RW1wdHkgPSBuZXh0RWxlbWVudCA9PT0gbnVsbCB8fCBuZXh0RWxlbWVudCA9PT0gZmFsc2U7XG4gIGlmIChwcmV2RW1wdHkgfHwgbmV4dEVtcHR5KSB7XG4gICAgcmV0dXJuIHByZXZFbXB0eSA9PT0gbmV4dEVtcHR5O1xuICB9XG5cbiAgdmFyIHByZXZUeXBlID0gdHlwZW9mIHByZXZFbGVtZW50O1xuICB2YXIgbmV4dFR5cGUgPSB0eXBlb2YgbmV4dEVsZW1lbnQ7XG4gIGlmIChwcmV2VHlwZSA9PT0gJ3N0cmluZycgfHwgcHJldlR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIG5leHRUeXBlID09PSAnc3RyaW5nJyB8fCBuZXh0VHlwZSA9PT0gJ251bWJlcic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5leHRUeXBlID09PSAnb2JqZWN0JyAmJiBwcmV2RWxlbWVudC50eXBlID09PSBuZXh0RWxlbWVudC50eXBlICYmIHByZXZFbGVtZW50LmtleSA9PT0gbmV4dEVsZW1lbnQua2V5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL3Nob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RW1wdHlDb21wb25lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUNvbXBvbmVudEZhY3Rvcnk7XG5cbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50SW5qZWN0aW9uID0ge1xuICBpbmplY3RFbXB0eUNvbXBvbmVudEZhY3Rvcnk6IGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgZW1wdHlDb21wb25lbnRGYWN0b3J5ID0gZmFjdG9yeTtcbiAgfVxufTtcblxudmFyIFJlYWN0RW1wdHlDb21wb25lbnQgPSB7XG4gIGNyZWF0ZTogZnVuY3Rpb24gKGluc3RhbnRpYXRlKSB7XG4gICAgcmV0dXJuIGVtcHR5Q29tcG9uZW50RmFjdG9yeShpbnN0YW50aWF0ZSk7XG4gIH1cbn07XG5cblJlYWN0RW1wdHlDb21wb25lbnQuaW5qZWN0aW9uID0gUmVhY3RFbXB0eUNvbXBvbmVudEluamVjdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVtcHR5Q29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEVtcHR5Q29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0TmF0aXZlQ29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgYXV0b0dlbmVyYXRlV3JhcHBlckNsYXNzID0gbnVsbDtcbnZhciBnZW5lcmljQ29tcG9uZW50Q2xhc3MgPSBudWxsO1xuLy8gVGhpcyByZWdpc3RyeSBrZWVwcyB0cmFjayBvZiB3cmFwcGVyIGNsYXNzZXMgYXJvdW5kIG5hdGl2ZSB0YWdzLlxudmFyIHRhZ1RvQ29tcG9uZW50Q2xhc3MgPSB7fTtcbnZhciB0ZXh0Q29tcG9uZW50Q2xhc3MgPSBudWxsO1xuXG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnRJbmplY3Rpb24gPSB7XG4gIC8vIFRoaXMgYWNjZXB0cyBhIGNsYXNzIHRoYXQgcmVjZWl2ZXMgdGhlIHRhZyBzdHJpbmcuIFRoaXMgaXMgYSBjYXRjaCBhbGxcbiAgLy8gdGhhdCBjYW4gcmVuZGVyIGFueSBraW5kIG9mIHRhZy5cbiAgaW5qZWN0R2VuZXJpY0NvbXBvbmVudENsYXNzOiBmdW5jdGlvbiAoY29tcG9uZW50Q2xhc3MpIHtcbiAgICBnZW5lcmljQ29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcbiAgfSxcbiAgLy8gVGhpcyBhY2NlcHRzIGEgdGV4dCBjb21wb25lbnQgY2xhc3MgdGhhdCB0YWtlcyB0aGUgdGV4dCBzdHJpbmcgdG8gYmVcbiAgLy8gcmVuZGVyZWQgYXMgcHJvcHMuXG4gIGluamVjdFRleHRDb21wb25lbnRDbGFzczogZnVuY3Rpb24gKGNvbXBvbmVudENsYXNzKSB7XG4gICAgdGV4dENvbXBvbmVudENsYXNzID0gY29tcG9uZW50Q2xhc3M7XG4gIH0sXG4gIC8vIFRoaXMgYWNjZXB0cyBhIGtleWVkIG9iamVjdCB3aXRoIGNsYXNzZXMgYXMgdmFsdWVzLiBFYWNoIGtleSByZXByZXNlbnRzIGFcbiAgLy8gdGFnLiBUaGF0IHBhcnRpY3VsYXIgdGFnIHdpbGwgdXNlIHRoaXMgY2xhc3MgaW5zdGVhZCBvZiB0aGUgZ2VuZXJpYyBvbmUuXG4gIGluamVjdENvbXBvbmVudENsYXNzZXM6IGZ1bmN0aW9uIChjb21wb25lbnRDbGFzc2VzKSB7XG4gICAgX2Fzc2lnbih0YWdUb0NvbXBvbmVudENsYXNzLCBjb21wb25lbnRDbGFzc2VzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgYSBjb21wb3NpdGUgY29tcG9uZW50IHdyYXBwZXIgY2xhc3MgZm9yIGEgc3BlY2lmaWMgdGFnLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IFRoZSB0YWcgZm9yIHdoaWNoIHRvIGdldCB0aGUgY2xhc3MuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIFJlYWN0IGNsYXNzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnRDbGFzc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gIH1cbiAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gdGFnVG9Db21wb25lbnRDbGFzc1t0YWddO1xuICBpZiAoY29tcG9uZW50Q2xhc3MgPT0gbnVsbCkge1xuICAgIHRhZ1RvQ29tcG9uZW50Q2xhc3NbdGFnXSA9IGNvbXBvbmVudENsYXNzID0gYXV0b0dlbmVyYXRlV3JhcHBlckNsYXNzKHRhZyk7XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudENsYXNzO1xufVxuXG4vKipcbiAqIEdldCBhIG5hdGl2ZSBpbnRlcm5hbCBjb21wb25lbnQgY2xhc3MgZm9yIGEgc3BlY2lmaWMgdGFnLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGNyZWF0ZS5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgaW50ZXJuYWwgY2xhc3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUludGVybmFsQ29tcG9uZW50KGVsZW1lbnQpIHtcbiAgIWdlbmVyaWNDb21wb25lbnRDbGFzcyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUaGVyZSBpcyBubyByZWdpc3RlcmVkIGNvbXBvbmVudCBmb3IgdGhlIHRhZyAlcycsIGVsZW1lbnQudHlwZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICByZXR1cm4gbmV3IGdlbmVyaWNDb21wb25lbnRDbGFzcyhlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlYWN0VGV4dH0gdGV4dFxuICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlRm9yVGV4dCh0ZXh0KSB7XG4gIHJldHVybiBuZXcgdGV4dENvbXBvbmVudENsYXNzKHRleHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNUZXh0Q29tcG9uZW50KGNvbXBvbmVudCkge1xuICByZXR1cm4gY29tcG9uZW50IGluc3RhbmNlb2YgdGV4dENvbXBvbmVudENsYXNzO1xufVxuXG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSB7XG4gIGdldENvbXBvbmVudENsYXNzRm9yRWxlbWVudDogZ2V0Q29tcG9uZW50Q2xhc3NGb3JFbGVtZW50LFxuICBjcmVhdGVJbnRlcm5hbENvbXBvbmVudDogY3JlYXRlSW50ZXJuYWxDb21wb25lbnQsXG4gIGNyZWF0ZUluc3RhbmNlRm9yVGV4dDogY3JlYXRlSW5zdGFuY2VGb3JUZXh0LFxuICBpc1RleHRDb21wb25lbnQ6IGlzVGV4dENvbXBvbmVudCxcbiAgaW5qZWN0aW9uOiBSZWFjdE5hdGl2ZUNvbXBvbmVudEluamVjdGlvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dhcm5pbmcvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDUzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxyXG4gKlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0QW55dGhpbmdDb250YWluZXJJbmZvID0gZnVuY3Rpb24gKHJvb3RJbnN0YW5jZSwgY29udGFpbmVyTmFtZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBfcm9vdEluc3RhbmNlOiByb290SW5zdGFuY2UsXHJcbiAgICAgICAgX2NvbnRhaW5lck5hbWU6IGNvbnRhaW5lck5hbWVcclxuICAgIH07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdDb250YWluZXJJbmZvO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8uanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VXBkYXRlcycpO1xudmFyIFJlYWN0TmF0aXZlQ29tcG9uZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0TmF0aXZlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEVtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5Jyk7XG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG5cbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbicpO1xudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmdDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdDb21wb25lbnQnKTtcbnZhciBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCcpO1xudmFyIFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50Jyk7XG5cbnZhciBpbmplY3QgPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICBSZWFjdFVwZGF0ZXMuaW5qZWN0aW9uLmluamVjdFJlY29uY2lsZVRyYW5zYWN0aW9uKGNyZWF0ZVJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbihuYXRpdmVJbXBsZW1lbnRhdGlvbi50cmFuc2FjdGlvbikpO1xuICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0QmF0Y2hpbmdTdHJhdGVneShSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5KTtcblxuICAgIFJlYWN0TmF0aXZlQ29tcG9uZW50LmluamVjdGlvbi5pbmplY3RHZW5lcmljQ29tcG9uZW50Q2xhc3MoY3JlYXRlUmVhY3RBbnl0aGluZ0NvbXBvbmVudChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jb21wb25lbnRzKSk7XG5cbiAgICBSZWFjdEVtcHR5Q29tcG9uZW50LmluamVjdGlvbi5pbmplY3RFbXB0eUNvbXBvbmVudEZhY3RvcnkoZnVuY3Rpb24gKGluc3RhbnRpYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50KGluc3RhbnRpYXRlKTtcbiAgICB9KTtcblxuICAgIGlmIChSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCB8fFxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCB8fFxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMpIHtcblxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCA9IFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQ7XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cDtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5pbmplY3Rpb24uaW5qZWN0RW52aXJvbm1lbnQoUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50KTtcbiAgICB9XG59O1xuXG52YXIgY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24gPSBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5qZWN0OiBpbmplY3QsXG4gICAgY2xlYXI6IGNsZWFyXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdJbmplY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFVwZGF0ZXMgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlcycpO1xudmFyIFRyYW5zYWN0aW9uID0gcmVxdWlyZSgnLi9UcmFuc2FjdGlvbicpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcblxudmFyIFJFU0VUX0JBVENIRURfVVBEQVRFUyA9IHtcbiAgaW5pdGlhbGl6ZTogZW1wdHlGdW5jdGlvbixcbiAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzID0gZmFsc2U7XG4gIH1cbn07XG5cbnZhciBGTFVTSF9CQVRDSEVEX1VQREFURVMgPSB7XG4gIGluaXRpYWxpemU6IGVtcHR5RnVuY3Rpb24sXG4gIGNsb3NlOiBSZWFjdFVwZGF0ZXMuZmx1c2hCYXRjaGVkVXBkYXRlcy5iaW5kKFJlYWN0VXBkYXRlcylcbn07XG5cbnZhciBUUkFOU0FDVElPTl9XUkFQUEVSUyA9IFtGTFVTSF9CQVRDSEVEX1VQREFURVMsIFJFU0VUX0JBVENIRURfVVBEQVRFU107XG5cbmZ1bmN0aW9uIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3lUcmFuc2FjdGlvbigpIHtcbiAgdGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpO1xufVxuXG5fYXNzaWduKFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3lUcmFuc2FjdGlvbi5wcm90b3R5cGUsIFRyYW5zYWN0aW9uLk1peGluLCB7XG4gIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gVFJBTlNBQ1RJT05fV1JBUFBFUlM7XG4gIH1cbn0pO1xuXG52YXIgdHJhbnNhY3Rpb24gPSBuZXcgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVRyYW5zYWN0aW9uKCk7XG5cbnZhciBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5ID0ge1xuICBpc0JhdGNoaW5nVXBkYXRlczogZmFsc2UsXG5cbiAgLyoqXG4gICAqIENhbGwgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGluIGEgY29udGV4dCB3aXRoaW4gd2hpY2ggY2FsbHMgdG8gYHNldFN0YXRlYFxuICAgKiBhbmQgZnJpZW5kcyBhcmUgYmF0Y2hlZCBzdWNoIHRoYXQgY29tcG9uZW50cyBhcmVuJ3QgdXBkYXRlZCB1bm5lY2Vzc2FyaWx5LlxuICAgKi9cbiAgYmF0Y2hlZFVwZGF0ZXM6IGZ1bmN0aW9uIChjYWxsYmFjaywgYSwgYiwgYywgZCwgZSkge1xuICAgIHZhciBhbHJlYWR5QmF0Y2hpbmdVcGRhdGVzID0gUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcztcblxuICAgIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPSB0cnVlO1xuXG4gICAgLy8gVGhlIGNvZGUgaXMgd3JpdHRlbiB0aGlzIHdheSB0byBhdm9pZCBleHRyYSBhbGxvY2F0aW9uc1xuICAgIGlmIChhbHJlYWR5QmF0Y2hpbmdVcGRhdGVzKSB7XG4gICAgICBjYWxsYmFjayhhLCBiLCBjLCBkLCBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNhY3Rpb24ucGVyZm9ybShjYWxsYmFjaywgbnVsbCwgYSwgYiwgYywgZCwgZSk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3k7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBhIG1vZGlmaWVkIHZlcnNpb24gb2Y6XG4gKiAgcmVhY3QvbGliL1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24uanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDYWxsYmFja1F1ZXVlID0gcmVxdWlyZSgncmVhY3QvbGliL0NhbGxiYWNrUXVldWUnKTtcbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9Qb29sZWRDbGFzcycpO1xudmFyIFRyYW5zYWN0aW9uID0gcmVxdWlyZSgncmVhY3QvbGliL1RyYW5zYWN0aW9uJyk7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBPTl9SRUFEWV9RVUVVRUlORyA9IHtcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5LnJlc2V0KCk7XG4gICAgfSxcblxuICAgIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5Lm5vdGlmeUFsbCgpO1xuICAgIH1cbn07XG5cbnZhciBjcmVhdGVUcmFuc2FjdGlvblR5cGUgPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICB2YXIgVFJBTlNBQ1RJT05fV1JBUFBFUlMgPSBbT05fUkVBRFlfUVVFVUVJTkddO1xuXG4gICAgaWYgKG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgICAgIFRSQU5TQUNUSU9OX1dSQVBQRVJTLnB1c2gobmF0aXZlSW1wbGVtZW50YXRpb24pO1xuICAgIH1cblxuICAgIHZhciBSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVpbml0aWFsaXplVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgLy8gT25seSBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgcmVhbGx5IG5lZWRzIHRoaXMgb3B0aW9uIChzZWVcbiAgICAgICAgLy8gYFJlYWN0U2VydmVyUmVuZGVyaW5nYCksIGJ1dCBzZXJ2ZXItc2lkZSB1c2VzXG4gICAgICAgIC8vIGBSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9uYCBpbnN0ZWFkLiBUaGlzIG9wdGlvbiBpcyBoZXJlIHNvIHRoYXQgaXQnc1xuICAgICAgICAvLyBhY2Nlc3NpYmxlIGFuZCBkZWZhdWx0cyB0byBmYWxzZSB3aGVuIGBSZWFjdERPTUNvbXBvbmVudGAgYW5kXG4gICAgICAgIC8vIGBSZWFjdFRleHRDb21wb25lbnRgIGNoZWNrcyBpdCBpbiBgbW91bnRDb21wb25lbnRgLmBcbiAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZChudWxsKTtcbiAgICB9O1xuXG4gICAgdmFyIE1peGluID0ge1xuICAgICAgICBnZXRUcmFuc2FjdGlvbldyYXBwZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gVFJBTlNBQ1RJT05fV1JBUFBFUlM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0UmVhY3RNb3VudFJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFjdE1vdW50UmVhZHk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2twb2ludDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcmVhY3RNb3VudFJlYWR5IGlzIHRoZSBvdXIgb25seSBzdGF0ZWZ1bCB3cmFwcGVyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFjdE1vdW50UmVhZHkuY2hlY2twb2ludCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJvbGxiYWNrOiBmdW5jdGlvbiAoY2hlY2twb2ludCkge1xuICAgICAgICAgICAgdGhpcy5yZWFjdE1vdW50UmVhZHkucm9sbGJhY2soY2hlY2twb2ludCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVzdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgQ2FsbGJhY2tRdWV1ZS5yZWxlYXNlKHRoaXMucmVhY3RNb3VudFJlYWR5KTtcbiAgICAgICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGFzc2lnbihSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24ucHJvdG90eXBlLCBUcmFuc2FjdGlvbi5NaXhpbiwgTWl4aW4pO1xuXG4gICAgUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbik7XG5cbiAgICByZXR1cm4gUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVUcmFuc2FjdGlvblR5cGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIFxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RET01Db21wb25lbnQuanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RNdWx0aUNoaWxkID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZCcpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAxO1xuXG52YXIgY3JlYXRlSW1wbGVtZW50YXRpb24gPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcblxuICAgIHZhciBSZWFjdEFueXRoaW5nQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZTtcbiAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl90YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG4gICAgfTtcblxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuZGlzcGxheU5hbWUgPSAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudCc7XG5cbiAgICBSZWFjdEFueXRoaW5nQ29tcG9uZW50Lk1peGluID0ge1xuICAgICAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVDb250YWluZXJJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBnbG9iYWxJZENvdW50ZXIrKztcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBuYXRpdmVDb250YWluZXJJbmZvO1xuXG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlTm9kZSA9IG5hdGl2ZUltcGxlbWVudGF0aW9uLm1vdW50KHRoaXMuX3Jvb3ROb2RlSUQsIHRoaXMuX3RhZywgcHJvcHMsIG5hdGl2ZVBhcmVudCAmJiBuYXRpdmVQYXJlbnQuX25hdGl2ZU5vZGUpO1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuSW1hZ2VzID0gdGhpcy5tb3VudENoaWxkcmVuKHByb3BzLmNoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAobmF0aXZlSW1wbGVtZW50YXRpb24uY2hpbGRyZW5Nb3VudCAmJiBjaGlsZHJlbkltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24uY2hpbGRyZW5Nb3VudCh0aGlzLl9uYXRpdmVOb2RlLCBjaGlsZHJlbkltYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgbGFzdFByb3BzID0gcHJldkVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB2YXIgbmV4dFByb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG5cbiAgICAgICAgICAgIG5hdGl2ZUltcGxlbWVudGF0aW9uLnVwZGF0ZSh0aGlzLl9uYXRpdmVOb2RlLCBuZXh0UHJvcHMsIGxhc3RQcm9wcyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4obmV4dFByb3BzLmNoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZU5vZGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgICAgICAgdGhpcy51bm1vdW50Q2hpbGRyZW4oc2FmZWx5KTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24udW5tb3VudCh0aGlzLl9uYXRpdmVOb2RlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQdWJsaWNJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFJlYWN0UGVyZi5tZWFzdXJlTWV0aG9kcyhSZWFjdEFueXRoaW5nQ29tcG9uZW50Lk1peGluLCAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudCcsIHtcbiAgICAgICAgbW91bnRDb21wb25lbnQ6ICdtb3VudENvbXBvbmVudCcsXG4gICAgICAgIHJlY2VpdmVDb21wb25lbnQ6ICdyZWNlaXZlQ29tcG9uZW50JyxcbiAgICB9KTtcblxuICAgIGFzc2lnbihcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5wcm90b3R5cGUsXG4gICAgICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4sXG4gICAgICAgIFJlYWN0TXVsdGlDaGlsZC5NaXhpblxuICAgICk7XG5cbiAgICByZXR1cm4gUmVhY3RBbnl0aGluZ0NvbXBvbmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbXBsZW1lbnRhdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0TXVsdGlDaGlsZFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQnKTtcbnZhciBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG52YXIgUmVhY3RDaGlsZFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRSZWNvbmNpbGVyJyk7XG5cbnZhciBmbGF0dGVuQ2hpbGRyZW4gPSByZXF1aXJlKCcuL2ZsYXR0ZW5DaGlsZHJlbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBtYXJrdXAgdG8gYmUgcmVuZGVyZWQgYW5kIGluc2VydGVkIGF0IGEgc3VwcGxpZWQgaW5kZXguXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1hcmt1cCBNYXJrdXAgdGhhdCByZW5kZXJzIGludG8gYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZUluc2VydE1hcmt1cChtYXJrdXAsIGFmdGVyTm9kZSwgdG9JbmRleCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuSU5TRVJUX01BUktVUCxcbiAgICBjb250ZW50OiBtYXJrdXAsXG4gICAgZnJvbUluZGV4OiBudWxsLFxuICAgIGZyb21Ob2RlOiBudWxsLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgYWZ0ZXJOb2RlOiBhZnRlck5vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3IgbW92aW5nIGFuIGV4aXN0aW5nIGVsZW1lbnQgdG8gYW5vdGhlciBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFNvdXJjZSBpbmRleCBvZiB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b0luZGV4IERlc3RpbmF0aW9uIGluZGV4IG9mIHRoZSBlbGVtZW50LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZU1vdmUoY2hpbGQsIGFmdGVyTm9kZSwgdG9JbmRleCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuTU9WRV9FWElTVElORyxcbiAgICBjb250ZW50OiBudWxsLFxuICAgIGZyb21JbmRleDogY2hpbGQuX21vdW50SW5kZXgsXG4gICAgZnJvbU5vZGU6IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKGNoaWxkKSxcbiAgICB0b0luZGV4OiB0b0luZGV4LFxuICAgIGFmdGVyTm9kZTogYWZ0ZXJOb2RlXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIHJlbW92aW5nIGFuIGVsZW1lbnQgYXQgYW4gaW5kZXguXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21JbmRleCBJbmRleCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlUmVtb3ZlKGNoaWxkLCBub2RlKSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5SRU1PVkVfTk9ERSxcbiAgICBjb250ZW50OiBudWxsLFxuICAgIGZyb21JbmRleDogY2hpbGQuX21vdW50SW5kZXgsXG4gICAgZnJvbU5vZGU6IG5vZGUsXG4gICAgdG9JbmRleDogbnVsbCxcbiAgICBhZnRlck5vZGU6IG51bGxcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3Igc2V0dGluZyB0aGUgbWFya3VwIG9mIGEgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFya3VwIE1hcmt1cCB0aGF0IHJlbmRlcnMgaW50byBhbiBlbGVtZW50LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWFrZVNldE1hcmt1cChtYXJrdXApIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLlNFVF9NQVJLVVAsXG4gICAgY29udGVudDogbWFya3VwLFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBzZXR0aW5nIHRoZSB0ZXh0IGNvbnRlbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRDb250ZW50IFRleHQgY29udGVudCB0byBzZXQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlVGV4dENvbnRlbnQodGV4dENvbnRlbnQpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLlRFWFRfQ09OVEVOVCxcbiAgICBjb250ZW50OiB0ZXh0Q29udGVudCxcbiAgICBmcm9tSW5kZXg6IG51bGwsXG4gICAgZnJvbU5vZGU6IG51bGwsXG4gICAgdG9JbmRleDogbnVsbCxcbiAgICBhZnRlck5vZGU6IG51bGxcbiAgfTtcbn1cblxuLyoqXG4gKiBQdXNoIGFuIHVwZGF0ZSwgaWYgYW55LCBvbnRvIHRoZSBxdWV1ZS4gQ3JlYXRlcyBhIG5ldyBxdWV1ZSBpZiBub25lIGlzXG4gKiBwYXNzZWQgYW5kIGFsd2F5cyByZXR1cm5zIHRoZSBxdWV1ZS4gTXV0YXRpdmUuXG4gKi9cbmZ1bmN0aW9uIGVucXVldWUocXVldWUsIHVwZGF0ZSkge1xuICBpZiAodXBkYXRlKSB7XG4gICAgcXVldWUgPSBxdWV1ZSB8fCBbXTtcbiAgICBxdWV1ZS5wdXNoKHVwZGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufVxuXG4vKipcbiAqIFByb2Nlc3NlcyBhbnkgZW5xdWV1ZWQgdXBkYXRlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwcm9jZXNzUXVldWUoaW5zdCwgdXBkYXRlUXVldWUpIHtcbiAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzKGluc3QsIHVwZGF0ZVF1ZXVlKTtcbn1cblxuLyoqXG4gKiBSZWFjdE11bHRpQ2hpbGQgYXJlIGNhcGFibGUgb2YgcmVjb25jaWxpbmcgbXVsdGlwbGUgY2hpbGRyZW4uXG4gKlxuICogQGNsYXNzIFJlYWN0TXVsdGlDaGlsZFxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdE11bHRpQ2hpbGQgPSB7XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGNvbW1vbiBmdW5jdGlvbmFsaXR5IGZvciBjb21wb25lbnRzIHRoYXQgbXVzdCByZWNvbmNpbGUgbXVsdGlwbGVcbiAgICogY2hpbGRyZW4uIFRoaXMgaXMgdXNlZCBieSBgUmVhY3RET01Db21wb25lbnRgIHRvIG1vdW50LCB1cGRhdGUsIGFuZFxuICAgKiB1bm1vdW50IGNoaWxkIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEBsZW5kcyB7UmVhY3RNdWx0aUNoaWxkLnByb3RvdHlwZX1cbiAgICovXG4gIE1peGluOiB7XG5cbiAgICBfcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLmluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3RDaGlsZFJlY29uY2lsZXIuaW5zdGFudGlhdGVDaGlsZHJlbihuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICBfcmVjb25jaWxlclVwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAocHJldkNoaWxkcmVuLCBuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIG5leHRDaGlsZHJlbjtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gdGhpcy5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgICAgICAgICAgbmV4dENoaWxkcmVuID0gZmxhdHRlbkNoaWxkcmVuKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgICAgICByZXR1cm4gbmV4dENoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXh0Q2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMpO1xuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudXBkYXRlQ2hpbGRyZW4ocHJldkNoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgcmV0dXJuIG5leHRDaGlsZHJlbjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgXCJtb3VudCBpbWFnZVwiIGZvciBlYWNoIG9mIHRoZSBzdXBwbGllZCBjaGlsZHJlbi4gSW4gdGhlIGNhc2VcbiAgICAgKiBvZiBgUmVhY3RET01Db21wb25lbnRgLCBhIG1vdW50IGltYWdlIGlzIGEgc3RyaW5nIG9mIG1hcmt1cC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmVzdGVkQ2hpbGRyZW4gTmVzdGVkIGNoaWxkIG1hcHMuXG4gICAgICogQHJldHVybiB7YXJyYXl9IEFuIGFycmF5IG9mIG1vdW50ZWQgcmVwcmVzZW50YXRpb25zLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIG1vdW50Q2hpbGRyZW46IGZ1bmN0aW9uIChuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX3JlY29uY2lsZXJJbnN0YW50aWF0ZUNoaWxkcmVuKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICB0aGlzLl9yZW5kZXJlZENoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICB2YXIgbW91bnRJbWFnZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICBmb3IgKHZhciBuYW1lIGluIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW25hbWVdO1xuICAgICAgICAgIHZhciBtb3VudEltYWdlID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KGNoaWxkLCB0cmFuc2FjdGlvbiwgdGhpcywgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCk7XG4gICAgICAgICAgY2hpbGQuX21vdW50SW5kZXggPSBpbmRleCsrO1xuICAgICAgICAgIG1vdW50SW1hZ2VzLnB1c2gobW91bnRJbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtb3VudEltYWdlcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgYW55IHJlbmRlcmVkIGNoaWxkcmVuIHdpdGggYSB0ZXh0IGNvbnRlbnQgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5leHRDb250ZW50IFN0cmluZyBvZiBjb250ZW50LlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZVRleHRDb250ZW50OiBmdW5jdGlvbiAobmV4dENvbnRlbnQpIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgLy8gUmVtb3ZlIGFueSByZW5kZXJlZCBjaGlsZHJlbi5cbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJldkNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlVGV4dENvbnRlbnQgY2FsbGVkIG9uIG5vbi1lbXB0eSBjb21wb25lbnQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgbmV3IHRleHQgY29udGVudC5cbiAgICAgIHZhciB1cGRhdGVzID0gW21ha2VUZXh0Q29udGVudChuZXh0Q29udGVudCldO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbnkgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBhIG1hcmt1cCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dE1hcmt1cCBTdHJpbmcgb2YgbWFya3VwLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZU1hcmt1cDogZnVuY3Rpb24gKG5leHRNYXJrdXApIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgLy8gUmVtb3ZlIGFueSByZW5kZXJlZCBjaGlsZHJlbi5cbiAgICAgIFJlYWN0Q2hpbGRSZWNvbmNpbGVyLnVubW91bnRDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIGZhbHNlKTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcHJldkNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAndXBkYXRlVGV4dENvbnRlbnQgY2FsbGVkIG9uIG5vbi1lbXB0eSBjb21wb25lbnQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgdXBkYXRlcyA9IFttYWtlU2V0TWFya3VwKG5leHRNYXJrdXApXTtcbiAgICAgIHByb2Nlc3NRdWV1ZSh0aGlzLCB1cGRhdGVzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBuZXcgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzIE5lc3RlZCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVwZGF0ZUNoaWxkcmVuOiBmdW5jdGlvbiAobmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAvLyBIb29rIHVzZWQgYnkgUmVhY3QgQVJUXG4gICAgICB0aGlzLl91cGRhdGVDaGlsZHJlbihuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzIE5lc3RlZCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgICAqIEBmaW5hbFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBfdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBwcmV2Q2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgdmFyIHJlbW92ZWROb2RlcyA9IHt9O1xuICAgICAgdmFyIG5leHRDaGlsZHJlbiA9IHRoaXMuX3JlY29uY2lsZXJVcGRhdGVDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgIGlmICghbmV4dENoaWxkcmVuICYmICFwcmV2Q2hpbGRyZW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHVwZGF0ZXMgPSBudWxsO1xuICAgICAgdmFyIG5hbWU7XG4gICAgICAvLyBgbmV4dEluZGV4YCB3aWxsIGluY3JlbWVudCBmb3IgZWFjaCBjaGlsZCBpbiBgbmV4dENoaWxkcmVuYCwgYnV0XG4gICAgICAvLyBgbGFzdEluZGV4YCB3aWxsIGJlIHRoZSBsYXN0IGluZGV4IHZpc2l0ZWQgaW4gYHByZXZDaGlsZHJlbmAuXG4gICAgICB2YXIgbGFzdEluZGV4ID0gMDtcbiAgICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgICAgdmFyIGxhc3RQbGFjZWROb2RlID0gbnVsbDtcbiAgICAgIGZvciAobmFtZSBpbiBuZXh0Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldkNoaWxkID0gcHJldkNoaWxkcmVuICYmIHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IG5leHRDaGlsZHJlbltuYW1lXTtcbiAgICAgICAgaWYgKHByZXZDaGlsZCA9PT0gbmV4dENoaWxkKSB7XG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5tb3ZlQ2hpbGQocHJldkNoaWxkLCBsYXN0UGxhY2VkTm9kZSwgbmV4dEluZGV4LCBsYXN0SW5kZXgpKTtcbiAgICAgICAgICBsYXN0SW5kZXggPSBNYXRoLm1heChwcmV2Q2hpbGQuX21vdW50SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgICAgcHJldkNoaWxkLl9tb3VudEluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcmV2Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBgbGFzdEluZGV4YCBiZWZvcmUgYF9tb3VudEluZGV4YCBnZXRzIHVuc2V0IGJ5IHVubW91bnRpbmcuXG4gICAgICAgICAgICBsYXN0SW5kZXggPSBNYXRoLm1heChwcmV2Q2hpbGQuX21vdW50SW5kZXgsIGxhc3RJbmRleCk7XG4gICAgICAgICAgICAvLyBUaGUgYHJlbW92ZWROb2Rlc2AgbG9vcCBiZWxvdyB3aWxsIGFjdHVhbGx5IHJlbW92ZSB0aGUgY2hpbGQuXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRoZSBjaGlsZCBtdXN0IGJlIGluc3RhbnRpYXRlZCBiZWZvcmUgaXQncyBtb3VudGVkLlxuICAgICAgICAgIHVwZGF0ZXMgPSBlbnF1ZXVlKHVwZGF0ZXMsIHRoaXMuX21vdW50Q2hpbGRBdEluZGV4KG5leHRDaGlsZCwgbGFzdFBsYWNlZE5vZGUsIG5leHRJbmRleCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0SW5kZXgrKztcbiAgICAgICAgbGFzdFBsYWNlZE5vZGUgPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShuZXh0Q2hpbGQpO1xuICAgICAgfVxuICAgICAgLy8gUmVtb3ZlIGNoaWxkcmVuIHRoYXQgYXJlIG5vIGxvbmdlciBwcmVzZW50LlxuICAgICAgZm9yIChuYW1lIGluIHJlbW92ZWROb2Rlcykge1xuICAgICAgICBpZiAocmVtb3ZlZE5vZGVzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5fdW5tb3VudENoaWxkKHByZXZDaGlsZHJlbltuYW1lXSwgcmVtb3ZlZE5vZGVzW25hbWVdKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh1cGRhdGVzKSB7XG4gICAgICAgIHByb2Nlc3NRdWV1ZSh0aGlzLCB1cGRhdGVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBuZXh0Q2hpbGRyZW47XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubW91bnRzIGFsbCByZW5kZXJlZCBjaGlsZHJlbi4gVGhpcyBzaG91bGQgYmUgdXNlZCB0byBjbGVhbiB1cCBjaGlsZHJlblxuICAgICAqIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdW5tb3VudGVkLiBJdCBkb2VzIG5vdCBhY3R1YWxseSBwZXJmb3JtIGFueVxuICAgICAqIGJhY2tlbmQgb3BlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHVubW91bnRDaGlsZHJlbjogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgdmFyIHJlbmRlcmVkQ2hpbGRyZW4gPSB0aGlzLl9yZW5kZXJlZENoaWxkcmVuO1xuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudW5tb3VudENoaWxkcmVuKHJlbmRlcmVkQ2hpbGRyZW4sIHNhZmVseSk7XG4gICAgICB0aGlzLl9yZW5kZXJlZENoaWxkcmVuID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgYSBjaGlsZCBjb21wb25lbnQgdG8gdGhlIHN1cHBsaWVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIG1vdmUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXggb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxhc3RJbmRleCBMYXN0IGluZGV4IHZpc2l0ZWQgb2YgdGhlIHNpYmxpbmdzIG9mIGBjaGlsZGAuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG1vdmVDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBhZnRlck5vZGUsIHRvSW5kZXgsIGxhc3RJbmRleCkge1xuICAgICAgLy8gSWYgdGhlIGluZGV4IG9mIGBjaGlsZGAgaXMgbGVzcyB0aGFuIGBsYXN0SW5kZXhgLCB0aGVuIGl0IG5lZWRzIHRvXG4gICAgICAvLyBiZSBtb3ZlZC4gT3RoZXJ3aXNlLCB3ZSBkbyBub3QgbmVlZCB0byBtb3ZlIGl0IGJlY2F1c2UgYSBjaGlsZCB3aWxsIGJlXG4gICAgICAvLyBpbnNlcnRlZCBvciBtb3ZlZCBiZWZvcmUgYGNoaWxkYC5cbiAgICAgIGlmIChjaGlsZC5fbW91bnRJbmRleCA8IGxhc3RJbmRleCkge1xuICAgICAgICByZXR1cm4gbWFrZU1vdmUoY2hpbGQsIGFmdGVyTm9kZSwgdG9JbmRleCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBjaGlsZCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gY3JlYXRlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtb3VudEltYWdlIE1hcmt1cCB0byBpbnNlcnQuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNyZWF0ZUNoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIGFmdGVyTm9kZSwgbW91bnRJbWFnZSkge1xuICAgICAgcmV0dXJuIG1ha2VJbnNlcnRNYXJrdXAobW91bnRJbWFnZSwgYWZ0ZXJOb2RlLCBjaGlsZC5fbW91bnRJbmRleCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBjaGlsZCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDaGlsZCB0byByZW1vdmUuXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlbW92ZUNoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIG5vZGUpIHtcbiAgICAgIHJldHVybiBtYWtlUmVtb3ZlKGNoaWxkLCBub2RlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTW91bnRzIGEgY2hpbGQgd2l0aCB0aGUgc3VwcGxpZWQgbmFtZS5cbiAgICAgKlxuICAgICAqIE5PVEU6IFRoaXMgaXMgcGFydCBvZiBgdXBkYXRlQ2hpbGRyZW5gIGFuZCBpcyBoZXJlIGZvciByZWFkYWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byBtb3VudC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBOYW1lIG9mIHRoZSBjaGlsZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggYXQgd2hpY2ggdG8gaW5zZXJ0IHRoZSBjaGlsZC5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfbW91bnRDaGlsZEF0SW5kZXg6IGZ1bmN0aW9uIChjaGlsZCwgYWZ0ZXJOb2RlLCBpbmRleCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIHZhciBtb3VudEltYWdlID0gUmVhY3RSZWNvbmNpbGVyLm1vdW50Q29tcG9uZW50KGNoaWxkLCB0cmFuc2FjdGlvbiwgdGhpcywgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCk7XG4gICAgICBjaGlsZC5fbW91bnRJbmRleCA9IGluZGV4O1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hpbGQoY2hpbGQsIGFmdGVyTm9kZSwgbW91bnRJbWFnZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubW91bnRzIGEgcmVuZGVyZWQgY2hpbGQuXG4gICAgICpcbiAgICAgKiBOT1RFOiBUaGlzIGlzIHBhcnQgb2YgYHVwZGF0ZUNoaWxkcmVuYCBhbmQgaXMgaGVyZSBmb3IgcmVhZGFiaWxpdHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gdW5tb3VudC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF91bm1vdW50Q2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgbm9kZSkge1xuICAgICAgdmFyIHVwZGF0ZSA9IHRoaXMucmVtb3ZlQ2hpbGQoY2hpbGQsIG5vZGUpO1xuICAgICAgY2hpbGQuX21vdW50SW5kZXggPSBudWxsO1xuICAgICAgcmV0dXJuIHVwZGF0ZTtcbiAgICB9XG5cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TXVsdGlDaGlsZDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkLmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG5cbi8qKlxuICogV2hlbiBhIGNvbXBvbmVudCdzIGNoaWxkcmVuIGFyZSB1cGRhdGVkLCBhIHNlcmllcyBvZiB1cGRhdGUgY29uZmlndXJhdGlvblxuICogb2JqZWN0cyBhcmUgY3JlYXRlZCBpbiBvcmRlciB0byBiYXRjaCBhbmQgc2VyaWFsaXplIHRoZSByZXF1aXJlZCBjaGFuZ2VzLlxuICpcbiAqIEVudW1lcmF0ZXMgYWxsIHRoZSBwb3NzaWJsZSB0eXBlcyBvZiB1cGRhdGUgY29uZmlndXJhdGlvbnMuXG4gKlxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcyA9IGtleU1pcnJvcih7XG4gIElOU0VSVF9NQVJLVVA6IG51bGwsXG4gIE1PVkVfRVhJU1RJTkc6IG51bGwsXG4gIFJFTU9WRV9OT0RFOiBudWxsLFxuICBTRVRfTUFSS1VQOiBudWxsLFxuICBURVhUX0NPTlRFTlQ6IG51bGxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgN1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENoaWxkUmVjb25jaWxlclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG5cbnZhciBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL3Nob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlQ2hpbGQoY2hpbGRJbnN0YW5jZXMsIGNoaWxkLCBuYW1lKSB7XG4gIC8vIFdlIGZvdW5kIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICB2YXIga2V5VW5pcXVlID0gY2hpbGRJbnN0YW5jZXNbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhrZXlVbmlxdWUsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4nLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuICBpZiAoY2hpbGQgIT0gbnVsbCAmJiBrZXlVbmlxdWUpIHtcbiAgICBjaGlsZEluc3RhbmNlc1tuYW1lXSA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQoY2hpbGQpO1xuICB9XG59XG5cbi8qKlxuICogUmVhY3RDaGlsZFJlY29uY2lsZXIgcHJvdmlkZXMgaGVscGVycyBmb3IgaW5pdGlhbGl6aW5nIG9yIHVwZGF0aW5nIGEgc2V0IG9mXG4gKiBjaGlsZHJlbi4gSXRzIG91dHB1dCBpcyBzdWl0YWJsZSBmb3IgcGFzc2luZyBpdCBvbnRvIFJlYWN0TXVsdGlDaGlsZCB3aGljaFxuICogZG9lcyBkaWZmZWQgcmVvcmRlcmluZyBhbmQgaW5zZXJ0aW9uLlxuICovXG52YXIgUmVhY3RDaGlsZFJlY29uY2lsZXIgPSB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBcIm1vdW50IGltYWdlXCIgZm9yIGVhY2ggb2YgdGhlIHN1cHBsaWVkIGNoaWxkcmVuLiBJbiB0aGUgY2FzZVxuICAgKiBvZiBgUmVhY3RET01Db21wb25lbnRgLCBhIG1vdW50IGltYWdlIGlzIGEgc3RyaW5nIG9mIG1hcmt1cC5cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXN0ZWRDaGlsZE5vZGVzIE5lc3RlZCBjaGlsZCBtYXBzLlxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fSBBIHNldCBvZiBjaGlsZCBpbnN0YW5jZXMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaW5zdGFudGlhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKG5lc3RlZENoaWxkTm9kZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBjaGlsZEluc3RhbmNlcyA9IHt9O1xuICAgIHRyYXZlcnNlQWxsQ2hpbGRyZW4obmVzdGVkQ2hpbGROb2RlcywgaW5zdGFudGlhdGVDaGlsZCwgY2hpbGRJbnN0YW5jZXMpO1xuICAgIHJldHVybiBjaGlsZEluc3RhbmNlcztcbiAgfSxcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcmVuZGVyZWQgY2hpbGRyZW4gYW5kIHJldHVybnMgYSBuZXcgc2V0IG9mIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDaGlsZHJlbiBQcmV2aW91c2x5IGluaXRpYWxpemVkIHNldCBvZiBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q2hpbGRyZW4gRmxhdCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICogQHJldHVybiB7P29iamVjdH0gQSBuZXcgc2V0IG9mIGNoaWxkIGluc3RhbmNlcy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB1cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgLy8gV2UgY3VycmVudGx5IGRvbid0IGhhdmUgYSB3YXkgdG8gdHJhY2sgbW92ZXMgaGVyZSBidXQgaWYgd2UgdXNlIGl0ZXJhdG9yc1xuICAgIC8vIGluc3RlYWQgb2YgZm9yLi5pbiB3ZSBjYW4gemlwIHRoZSBpdGVyYXRvcnMgYW5kIGNoZWNrIGlmIGFuIGl0ZW0gaGFzXG4gICAgLy8gbW92ZWQuXG4gICAgLy8gVE9ETzogSWYgbm90aGluZyBoYXMgY2hhbmdlZCwgcmV0dXJuIHRoZSBwcmV2Q2hpbGRyZW4gb2JqZWN0IHNvIHRoYXQgd2VcbiAgICAvLyBjYW4gcXVpY2tseSBiYWlsb3V0IGlmIG5vdGhpbmcgaGFzIGNoYW5nZWQuXG4gICAgaWYgKCFuZXh0Q2hpbGRyZW4gJiYgIXByZXZDaGlsZHJlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmFtZTtcbiAgICB2YXIgcHJldkNoaWxkO1xuICAgIGZvciAobmFtZSBpbiBuZXh0Q2hpbGRyZW4pIHtcbiAgICAgIGlmICghbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcHJldkNoaWxkID0gcHJldkNoaWxkcmVuICYmIHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgIHZhciBwcmV2RWxlbWVudCA9IHByZXZDaGlsZCAmJiBwcmV2Q2hpbGQuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgdmFyIG5leHRFbGVtZW50ID0gbmV4dENoaWxkcmVuW25hbWVdO1xuICAgICAgaWYgKHByZXZDaGlsZCAhPSBudWxsICYmIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkpIHtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnJlY2VpdmVDb21wb25lbnQocHJldkNoaWxkLCBuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICBuZXh0Q2hpbGRyZW5bbmFtZV0gPSBwcmV2Q2hpbGQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJldkNoaWxkKSB7XG4gICAgICAgICAgcmVtb3ZlZE5vZGVzW25hbWVdID0gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUocHJldkNoaWxkKTtcbiAgICAgICAgICBSZWFjdFJlY29uY2lsZXIudW5tb3VudENvbXBvbmVudChwcmV2Q2hpbGQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgY2hpbGQgbXVzdCBiZSBpbnN0YW50aWF0ZWQgYmVmb3JlIGl0J3MgbW91bnRlZC5cbiAgICAgICAgdmFyIG5leHRDaGlsZEluc3RhbmNlID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChuZXh0RWxlbWVudCk7XG4gICAgICAgIG5leHRDaGlsZHJlbltuYW1lXSA9IG5leHRDaGlsZEluc3RhbmNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBVbm1vdW50IGNoaWxkcmVuIHRoYXQgYXJlIG5vIGxvbmdlciBwcmVzZW50LlxuICAgIGZvciAobmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkgJiYgIShuZXh0Q2hpbGRyZW4gJiYgbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSkge1xuICAgICAgICBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW5bbmFtZV07XG4gICAgICAgIHJlbW92ZWROb2Rlc1tuYW1lXSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKHByZXZDaGlsZCk7XG4gICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHByZXZDaGlsZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVW5tb3VudHMgYWxsIHJlbmRlcmVkIGNoaWxkcmVuLiBUaGlzIHNob3VsZCBiZSB1c2VkIHRvIGNsZWFuIHVwIGNoaWxkcmVuXG4gICAqIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IHJlbmRlcmVkQ2hpbGRyZW4gUHJldmlvdXNseSBpbml0aWFsaXplZCBzZXQgb2YgY2hpbGRyZW4uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdW5tb3VudENoaWxkcmVuOiBmdW5jdGlvbiAocmVuZGVyZWRDaGlsZHJlbiwgc2FmZWx5KSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiByZW5kZXJlZENoaWxkcmVuKSB7XG4gICAgICBpZiAocmVuZGVyZWRDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB2YXIgcmVuZGVyZWRDaGlsZCA9IHJlbmRlcmVkQ2hpbGRyZW5bbmFtZV07XG4gICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHJlbmRlcmVkQ2hpbGQsIHNhZmVseSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZFJlY29uY2lsZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRSZWNvbmNpbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGZsYXR0ZW5DaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IHBhc3NlZCB0aHJvdWdoIHRyYXZlcnNhbC5cbiAqIEBwYXJhbSB7P1JlYWN0Q29tcG9uZW50fSBjaGlsZCBSZWFjdCBjaGlsZCBjb21wb25lbnQuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWUgU3RyaW5nIG5hbWUgb2Yga2V5IHBhdGggdG8gY2hpbGQuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgLy8gV2UgZm91bmQgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gIHZhciByZXN1bHQgPSB0cmF2ZXJzZUNvbnRleHQ7XG4gIHZhciBrZXlVbmlxdWUgPSByZXN1bHRbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhrZXlVbmlxdWUsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4nLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuICBpZiAoa2V5VW5pcXVlICYmIGNoaWxkICE9IG51bGwpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBjaGlsZDtcbiAgfVxufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC4gQW55IG51bGxcbiAqIGNoaWxkcmVuIHdpbGwgbm90IGJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHRpbmcgb2JqZWN0LlxuICogQHJldHVybiB7IW9iamVjdH0gZmxhdHRlbmVkIGNoaWxkcmVuIGtleWVkIGJ5IG5hbWUuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge307XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0LCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5DaGlsZHJlbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvZmxhdHRlbkNoaWxkcmVuLmpzXG4gKiogbW9kdWxlIGlkID0gNjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ludmFyaWFudC9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG5cbnZhciBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVOb2RlID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVQYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBudWxsO1xuICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcbn07XG5cblJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQnO1xuXG5SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuTWl4aW4gPSB7XG4gICAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUNvbnRhaW5lckluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG5hdGl2ZUNvbnRhaW5lckluZm87XG5cbiAgICAgICAgdGhpcy5fbmF0aXZlTm9kZSA9IHtlbXB0eTogdHJ1ZX07XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICB9LFxuXG4gICAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICB9LFxuXG4gICAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB9LFxuXG4gICAgZ2V0UHVibGljSW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgIH1cbn07XG5cblxuYXNzaWduKFxuICAgIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5wcm90b3R5cGUsXG4gICAgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50Lk1peGluXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICogXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50LmpzXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQZXJmID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0UGVyZicpO1xuXG52YXIgUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50ID0ge1xuICAgIHByb2Nlc3NDaGlsZHJlblVwZGF0ZXM6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgfSxcbiAgICByZXBsYWNlTm9kZVdpdGhNYXJrdXA6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgfVxufTtcblxuUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCxcbiAgICAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50JyxcbiAgICB7XG4gICAgICAgIHJlcGxhY2VOb2RlV2l0aE1hcmt1cDogJ3JlcGxhY2VOb2RlV2l0aE1hcmt1cCcsXG4gICAgfVxuKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3XG4gKiovIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXHJcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxyXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXHJcbiAqXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgY3JlYXRlVHJlZUltcGwgPSByZXF1aXJlKCcuL25vZGUtbWFuYWdlbWVudC9ub2RlLXRyZWUtYWRhcHRlcicpLFxyXG4gICAgY3JlYXRlSW5pdEFkYXB0ZXIgPSByZXF1aXJlKCcuL25vZGUtbWFuYWdlbWVudC9ub2RlLWluaXQtYWRhcHRlcicpLFxyXG4gICAgbm9kZVR5cGVzID0gcmVxdWlyZSgnLi9pbXBsL3R5cGVzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRyZWVJbXBsKGNyZWF0ZUluaXRBZGFwdGVyKG5vZGVUeXBlcykpO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9waGFzZXItaW1wbGVtZW50YXRpb24uanNcbiAqKi8iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjcmVhdGUgPSBmdW5jdGlvbiAoaW1wbCkge1xyXG4gICAgdmFyIHRyZWUgPSB7XHJcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXHJcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcclxuICAgICAgICAgICAgYnluYW1lOiB7fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHJlZUltcGwgPSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgICAgICAgICAgIG1vdW50OiBmdW5jdGlvbiAoaWQsIHRhZywgcHJvcHMsIHBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogdGFnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczogcHJvcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50ICYmIHBhcmVudC5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlLnJvb3QgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0cmVlLm5vZGVzW2lkXSA9IG5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wcy5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWUuYnluYW1lW3Byb3BzLm5hbWVdID0gbm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGltcGwuY29tcG9uZW50cy5tb3VudChub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbk1vdW50OiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwuY29tcG9uZW50cy5jaGlsZHJlbk1vdW50KG5vZGUsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVubW91bnQ6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1wbC5jb21wb25lbnRzLnVubW91bnQobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRyZWUubm9kZXNbbm9kZS5pZF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0cmVlLm5vZGVzW25vZGUucGFyZW50XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnNwbGljZShwYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihub2RlLmlkKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0cmVlLm5vZGVzW25vZGUuaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlID09PSB0cmVlLnJvb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS5yb290ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnByb3BzLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRyZWUuYnluYW1lW25vZGUucHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG5vZGUsIG5leHRQcm9wcywgcHJldlByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wcm9wcyA9IG5leHRQcm9wcztcclxuICAgICAgICAgICAgICAgICAgICBpbXBsLmNvbXBvbmVudHMudXBkYXRlKG5vZGUsIHByZXZQcm9wcywgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5uYW1lICE9PSBwcmV2UHJvcHMubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlByb3BzLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0cmVlLmJ5bmFtZVtwcmV2UHJvcHMubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRQcm9wcy5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlLmJ5bmFtZVtuZXh0UHJvcHMubmFtZV0gPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZTogaW1wbC50cmFuc2FjdGlvbi5pbml0aWFsaXplICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbXBsLnRyYW5zYWN0aW9uLmluaXRpYWxpemUodHJlZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2xvc2U6IGltcGwudHJhbnNhY3Rpb24uY2xvc2UgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwudHJhbnNhY3Rpb24uY2xvc2UodHJlZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIHJldHVybiB0cmVlSW1wbDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ub2RlLW1hbmFnZW1lbnQvbm9kZS10cmVlLWFkYXB0ZXIuanNcbiAqKi8iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjcmVhdGUgPSBmdW5jdGlvbiAobm9kZVR5cGVzKSB7XHJcblxyXG4gICAgICAgIHZhciB0cmFuc2FjdGlvbkxpc3RlbmVycyA9IFtdLFxyXG5cclxuICAgICAgICAgICAgcGFyZW50SW5pdGQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUubm9kZXNbbm9kZS5wYXJlbnRdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFwYXJlbnQgfHwgcGFyZW50LmluaXRpYWxpemVkO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaW52b2tlID0gZnVuY3Rpb24gKG1ldGhvZCwgbm9kZSwgYSwgYiwgYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXSxcclxuICAgICAgICAgICAgICAgICAgICBmID0gbm9kZVR5cGUgJiYgbm9kZVR5cGVbbWV0aG9kXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGYobm9kZSwgYSwgYiwgYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbml0SW1tZWRpYXRlbHkgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhbm9kZVR5cGUgfHwgIW5vZGVUeXBlc1tub2RlLnRhZ10uZGVmZXJyZWRJbml0O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgaW5pdCA9IGZ1bmN0aW9uIChtZXRob2QsIG5vZGUsIHRyZWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgbm9kZSwgdHJlZSwgbWV0aG9kcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5vYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLm9iai5ybm9kZWlkID0gbm9kZS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGluaXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChwYXJlbnQsIHRyZWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfb3B0aW9ucyA9IG9wdGlvbnMgfHwge30sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZSA9IF9vcHRpb25zLmluY2x1ZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZSA9IF9vcHRpb25zLmV4Y2x1ZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB0cmVlLm5vZGVzW3BhcmVudC5jaGlsZHJlbltpXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvSW5pdCA9ICFjaGlsZC5pbml0aWFsaXplZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFpbmNsdWRlIHx8IGluY2x1ZGUuaW5kZXhPZihjaGlsZC50YWcpID49IDApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIWV4Y2x1ZGUgfHwgZXhjbHVkZS5pbmRleE9mKGNoaWxkLnRhZykgPCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvSW5pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdEltbWVkaWF0ZWx5KGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdCgnaW5pdCcsIGNoaWxkLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZHMuaW5pdENoaWxkcmVuKGNoaWxkLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZSgnb25DaGlsZHJlbkluaXQnLCBjaGlsZCwgdHJlZSwgbWV0aG9kcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0KCdvbkNoaWxkcmVuSW5pdCcsIGNoaWxkLCB0cmVlLCBtZXRob2RzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNsZWFyQ2hpbGRyZW4gPSBmdW5jdGlvbiAocGFyZW50LCB0cmVlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX29wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGUgPSBfb3B0aW9ucy5pbmNsdWRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGUgPSBfb3B0aW9ucy5leGNsdWRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdHJlZS5ub2Rlc1twYXJlbnQuY2hpbGRyZW5baV1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRDbGVhciA9IGNoaWxkLmluaXRpYWxpemVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIWluY2x1ZGUgfHwgaW5jbHVkZS5pbmRleE9mKGNoaWxkLnRhZykgPj0gMCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICghZXhjbHVkZSB8fCBleGNsdWRlLmluZGV4T2YoY2hpbGQudGFnKSA8IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkQ2xlYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlKCdjbGVhcicsIHRyZWUsIG1ldGhvZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDaGlsZHJlbihjaGlsZCwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0VHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24gPSBmdW5jdGlvbiAobm9kZWlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNhY3Rpb25MaXN0ZW5lcnMuaW5kZXhPZihub2RlaWQpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uTGlzdGVuZXJzLnB1c2gobm9kZWlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNhbmNlbFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uID0gZnVuY3Rpb24gKG5vZGVpZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdHJhbnNhY3Rpb25MaXN0ZW5lcnMuaW5kZXhPZihub2RlaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgICAgIGluaXRDaGlsZHJlbjogaW5pdENoaWxkcmVuLFxyXG4gICAgICAgICAgICAgICAgY2xlYXJDaGlsZHJlbjogY2xlYXJDaGlsZHJlbixcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RUcmFuc2FjdGlvbk5vZml0aWNhdGlvbjogcmVxdWVzdFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsVHJhbnNhY3Rpb25Ob2ZpdGljYXRpb246IGNhbmNlbFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBpbXBsID0ge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdW50OiBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdEltbWVkaWF0ZWx5KG5vZGUpICYmIHBhcmVudEluaXRkKG5vZGUsIHRyZWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0KCdpbml0Jywgbm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuTW91bnQ6IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZva2UoJ29uQ2hpbGRyZW5Jbml0Jywgbm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyZW50SW5pdGQobm9kZSwgdHJlZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQoJ29uQ2hpbGRyZW5Jbml0Jywgbm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHVubW91bnQ6IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZSgna2lsbCcsIG5vZGUsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobm9kZSwgcHJldlByb3BzLCB0cmVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZSgndXBkYXRlJywgbm9kZSwgcHJldlByb3BzLCB0cmVlLCBtZXRob2RzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdHJhbnNhY3Rpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKHRyZWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zYWN0aW9uTGlzdGVuZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNhY3Rpb25MaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHRyZWUubm9kZXNbdHJhbnNhY3Rpb25MaXN0ZW5lcnNbaV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludm9rZSgnbm90aWZ5VHJhbnNhY3Rpb24nLCBub2RlLCB0cmVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbkxpc3RlbmVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gaW1wbDtcclxuICAgIH1cclxuICAgIDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9ub2RlLW1hbmFnZW1lbnQvbm9kZS1pbml0LWFkYXB0ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHtcclxuICAgICAgICBnYW1lOiByZXF1aXJlKCcuL2dhbWUnKSxcclxuICAgICAgICBzdGF0ZTogcmVxdWlyZSgnLi9zdGF0ZScpLFxyXG4gICAgICAgIHNwcml0ZTogcmVxdWlyZSgnLi9zcHJpdGUnKSxcclxuICAgICAgICBncm91cDogcmVxdWlyZSgnLi9ncm91cCcpLFxyXG4gICAgICAgIGFuaW1hdGlvbjogcmVxdWlyZSgnLi9hbmltYXRpb24nKSxcclxuICAgICAgICBjb2xsaWRlczogcmVxdWlyZSgnLi9jb2xsaWRlcycpLFxyXG4gICAgICAgIG92ZXJsYXBzOiByZXF1aXJlKCcuL292ZXJsYXBzJyksXHJcbiAgICAgICAgdGV4dDogcmVxdWlyZSgnLi90ZXh0JyksXHJcbiAgICAgICAgYnV0dG9uOiByZXF1aXJlKCcuL2J1dHRvbicpXHJcbiAgICB9LFxyXG4gICAgcmVxdWlyZSgnLi9ncmFwaGljcycpLFxyXG4gICAgcmVxdWlyZSgnLi9pbnB1dCcpXHJcbik7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbnZhciBpc0FycmF5ID0gZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcblx0aWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKTtcblx0fVxuXG5cdHJldHVybiB0b1N0ci5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG5cdGlmICghb2JqIHx8IHRvU3RyLmNhbGwob2JqKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR2YXIgaGFzT3duQ29uc3RydWN0b3IgPSBoYXNPd24uY2FsbChvYmosICdjb25zdHJ1Y3RvcicpO1xuXHR2YXIgaGFzSXNQcm90b3R5cGVPZiA9IG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlICYmIGhhc093bi5jYWxsKG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsICdpc1Byb3RvdHlwZU9mJyk7XG5cdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0aWYgKG9iai5jb25zdHJ1Y3RvciAmJiAhaGFzT3duQ29uc3RydWN0b3IgJiYgIWhhc0lzUHJvdG90eXBlT2YpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBPd24gcHJvcGVydGllcyBhcmUgZW51bWVyYXRlZCBmaXJzdGx5LCBzbyB0byBzcGVlZCB1cCxcblx0Ly8gaWYgbGFzdCBvbmUgaXMgb3duLCB0aGVuIGFsbCBwcm9wZXJ0aWVzIGFyZSBvd24uXG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIG9iaikgey8qKi99XG5cblx0cmV0dXJuIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnIHx8IGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fSBlbHNlIGlmICgodHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykgfHwgdGFyZ2V0ID09IG51bGwpIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzW2ldO1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAob3B0aW9ucyAhPSBudWxsKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRzcmMgPSB0YXJnZXRbbmFtZV07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zW25hbWVdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKHRhcmdldCAhPT0gY29weSkge1xuXHRcdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRcdGlmIChkZWVwICYmIGNvcHkgJiYgKGlzUGxhaW5PYmplY3QoY29weSkgfHwgKGNvcHlJc0FycmF5ID0gaXNBcnJheShjb3B5KSkpKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29weUlzQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Y29weUlzQXJyYXkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTmV2ZXIgbW92ZSBvcmlnaW5hbCBvYmplY3RzLCBjbG9uZSB0aGVtXG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBleHRlbmQoZGVlcCwgY2xvbmUsIGNvcHkpO1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNvcHkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXRbbmFtZV0gPSBjb3B5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9leHRlbmQvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA3MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDdcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXBkYXRlR2FtZSA9IGZ1bmN0aW9uIChub2RlLCBsYXN0UHJvcHMpIHtcclxuICAgICAgICBpZiAobGFzdFByb3BzICYmIGxhc3RQcm9wcy5zdGF0ZU5hbWUgIT09IG5vZGUucHJvcHMuc3RhdGVOYW1lKSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqLnN0YXRlLnN0YXJ0KG5vZGUucHJvcHMuc3RhdGVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hpbGRyZW5Jbml0ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUsIG5vZGVNZXRob2RzKSB7XHJcbiAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kcyA9IFtdO1xyXG4gICAgICAgIG5vZGUuYWRkVXBkYXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgbm9kZS5fdXBkYXRlTWV0aG9kcy5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG5vZGUucmVtb3ZlVXBkYXRlTGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gbm9kZS5fdXBkYXRlTWV0aG9kcy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuX3VwZGF0ZU1ldGhvZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHMsXHJcbiAgICAgICAgICAgIGdhbWVJbXBsID0ge1xyXG4gICAgICAgICAgICAgICAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wcy5hc3NldHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvcHMuYXNzZXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NldCA9IHByb3BzLmFzc2V0c1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhc3NldC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLmxvYWQuaW1hZ2Uoa2V5LCBhc3NldC5zcmMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzcHJpdGVzaGVldCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldChrZXksIGFzc2V0LnNyYywgYXNzZXQud2lkdGgsIGFzc2V0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1ldGhvZHMuaW5pdENoaWxkcmVuKG5vZGUsIHRyZWUsIHtpbmNsdWRlOiBbJ2Fzc2V0cyddfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnByb3BzLmhhc093blByb3BlcnR5KCdwaHlzaWNzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5vYmoucGh5c2ljcy5zdGFydFN5c3RlbShub2RlLnByb3BzLnBoeXNpY3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1ldGhvZHMuaW5pdENoaWxkcmVuKG5vZGUsIHRyZWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5zdGF0ZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZS5zdGF0ZS5zdGFydChub2RlLnByb3BzLnN0YXRlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5fdXBkYXRlTWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLl91cGRhdGVNZXRob2RzW2ldKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUocHJvcHMud2lkdGgsIHByb3BzLmhlaWdodCwgcHJvcHMubW9kZSB8fCBQaGFzZXIuQVVUTywgJycsIGdhbWVJbXBsKSxcclxuICAgICAgICAgICAgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgICAgIGdhbWU6IGdhbWUsXHJcbiAgICAgICAgICAgICAgICBub2RlczogdHJlZS5ieW5hbWVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbm9kZS5vYmogPSBnYW1lO1xyXG4gICAgICAgIG5vZGUuY29udGV4dCA9IGNvbnRleHQ7XHJcblxyXG4gICAgICAgIHVwZGF0ZUdhbWUobm9kZSwgbnVsbCwgdHJlZSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBudWxsLFxyXG4gICAgb25DaGlsZHJlbkluaXQ6IG9uQ2hpbGRyZW5Jbml0LFxyXG4gICAgdXBkYXRlOiB1cGRhdGVHYW1lLFxyXG4gICAga2lsbDogbnVsbCxcclxuICAgIGRlZmVycmVkSW5pdDogdHJ1ZVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dhbWUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vdHJlZS11dGlscycpLFxyXG4gICAgXHJcbiAgICBvbkNoaWxkcmVuSW5pdCA9IGZ1bmN0aW9uIChub2RlLCB0cmVlLCB0cmVlTWV0aG9kcykge1xyXG4gICAgICAgIG5vZGUuX3VwZGF0ZU1ldGhvZHMgPSBbXTtcclxuICAgICAgICBub2RlLmFkZFVwZGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIG5vZGUuX3VwZGF0ZU1ldGhvZHMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBub2RlLnJlbW92ZVVwZGF0ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IG5vZGUuX3VwZGF0ZU1ldGhvZHMuaW5kZXhPZihsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLl91cGRhdGVNZXRob2RzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzLFxyXG4gICAgICAgICAgICBzdGF0ZUltcGwgPSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eSgncGh5c2ljcycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUub2JqLnBoeXNpY3Muc3RhcnRTeXN0ZW0obm9kZS5wcm9wcy5waHlzaWNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVNZXRob2RzLmNsZWFyQ2hpbGRyZW4obm9kZSwgdHJlZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJlZU1ldGhvZHMuaW5pdENoaWxkcmVuKG5vZGUsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5fdXBkYXRlTWV0aG9kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLl91cGRhdGVNZXRob2RzW2ldKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2FtZSA9IHRyZWVVdGlscy5nYW1lKHRyZWUpLFxyXG4gICAgICAgICAgICBzdGF0ZSA9IGdhbWUuc3RhdGUuYWRkKHByb3BzLm5hbWUsIHN0YXRlSW1wbCksXHJcbiAgICAgICAgICAgIGNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lOiBnYW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbm9kZXM6IHRyZWUuYnluYW1lXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIG5vZGUub2JqID0gc3RhdGU7XHJcbiAgICAgICAgbm9kZS5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IG51bGwsXHJcbiAgICBvbkNoaWxkcmVuSW5pdDogb25DaGlsZHJlbkluaXQsXHJcbiAgICBraWxsOiBudWxsLFxyXG4gICAgZGVmZXJyZWRJbml0OiB0cnVlXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvc3RhdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBwcm9wc0NoYW5nZWQgPSBmdW5jdGlvbiAobmV4dFByb3BzLCBsYXN0UHJvcHMpIHtcbiAgICAgICAgaWYgKCFsYXN0UHJvcHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5wbCA9IE9iamVjdC5rZXlzKG5leHRQcm9wcyksXG4gICAgICAgICAgICBscGwgPSBPYmplY3Qua2V5cyhsYXN0UHJvcHMpO1xuXG4gICAgICAgIGlmIChucGwubGVuZ3RoICE9PSBscGwubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnBsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IG5wbFtpXTtcbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHNbcHJvcF0gIT09IGxhc3RQcm9wc1twcm9wXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBnZW5Qcm9wZXJ0eU1hcFVwZGF0ZSA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUsIHByZXZQcm9wcywgdHJlZSkge1xuICAgICAgICAgICAgaWYgKHByZXZQcm9wcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHByZXZQcm9wcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcHNbcHJvcF0gJiYgdHlwZW9mIG5vZGUucHJvcHNbcHJvcF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wc1twcm9wXShub2RlLCBub2RlLnByb3BzW3Byb3BdLCBwcmV2UHJvcHNbcHJvcF0sIGZhbHNlLCB0cnVlLCB0cmVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgT2JqZWN0LmtleXMobm9kZS5wcm9wcykuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1twcm9wXSAmJiAoIXByZXZQcm9wcyB8fCBub2RlLnByb3BzW3Byb3BdICE9PSBwcmV2UHJvcHNbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzW3Byb3BdKG5vZGUsIG5vZGUucHJvcHNbcHJvcF0sIHByZXZQcm9wcyAmJiBwcmV2UHJvcHNbcHJvcF0sICFwcmV2UHJvcHMsIGZhbHNlLCB0cmVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnYW1lID0gZnVuY3Rpb24gKHRyZWUpIHtcbiAgICAgICAgcmV0dXJuIHRyZWUucm9vdCAmJiB0cmVlLnJvb3Qub2JqO1xuICAgIH0sXG5cbiAgICBwYXJlbnQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSwgdHlwZSkge1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgbm9kZSA9IHRyZWUubm9kZXNbbm9kZS5wYXJlbnRdO1xuICAgICAgICAgICAgaWYgKCFub2RlIHx8ICF0eXBlIHx8IHR5cGUgPT09IG5vZGUudGFnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGVOb2RlID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIG5vZGUgPSB0cmVlLm5vZGVzW25vZGUucGFyZW50XTtcbiAgICAgICAgICAgIGlmICghbm9kZSB8fCBub2RlLnRhZyA9PT0gJ2dhbWUnIHx8IG5vZGUudGFnID09PSAnc3RhdGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkRGlzcGxheU9iamVjdCA9IGZ1bmN0aW9uIChub2RlLCB0cmVlLCBvYmopIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRyZWUubm9kZXNbbm9kZS5wYXJlbnRdLFxuICAgICAgICAgICAgZ3JvdXAgPSBwYXJlbnQub2JqLndvcmxkIHx8IHBhcmVudC5vYmo7XG5cbiAgICAgICAgZ3JvdXAuYWRkKG9iaiB8fCBub2RlLm9iaik7XG4gICAgfSxcblxuICAgIHBoeXNpY3MgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xuICAgICAgICB2YXIgcGh5c2ljc05vZGUgPSBzdGF0ZU5vZGUobm9kZSwgdHJlZSk7XG4gICAgICAgIHJldHVybiBwaHlzaWNzTm9kZSAmJiBwaHlzaWNzTm9kZS5vYmoucGh5c2ljcztcbiAgICB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcm9wc0NoYW5nZWQ6IHByb3BzQ2hhbmdlZCxcbiAgICBnZW5Qcm9wZXJ0eU1hcFVwZGF0ZTogZ2VuUHJvcGVydHlNYXBVcGRhdGUsXG4gICAgZ2FtZTogZ2FtZSxcbiAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICBhZGREaXNwbGF5T2JqZWN0OiBhZGREaXNwbGF5T2JqZWN0LFxuICAgIHN0YXRlTm9kZTogc3RhdGVOb2RlLFxuICAgIHBoeXNpY3M6IHBoeXNpY3Ncbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3RyZWUtdXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vdHJlZS11dGlscycpLFxyXG4gICAgc3ByaXRlUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5TcHJpdGUnKSxcclxuXHJcbiAgICB1cGRhdGVTcHJpdGUgPSB0cmVlVXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoc3ByaXRlUHJvcGVydGVzKSxcclxuICAgIFxyXG4gICAgaW5pdFNwcml0ZSA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcztcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuU3ByaXRlKHRyZWVVdGlscy5nYW1lKHRyZWUpLCBwcm9wcy54LCBwcm9wcy55LCBwcm9wcy5hc3NldEtleSk7XHJcbiAgICAgICAgdHJlZVV0aWxzLmFkZERpc3BsYXlPYmplY3Qobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgdXBkYXRlU3ByaXRlKG5vZGUsIG51bGwsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsU3ByaXRlID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBub2RlLm9iai5raWxsKCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0U3ByaXRlLFxyXG4gICAga2lsbDoga2lsbFNwcml0ZSxcclxuICAgIHVwZGF0ZTogdXBkYXRlU3ByaXRlXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvc3ByaXRlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuU3ByaXRlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ29yZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Cb3VuZHMnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ3JvcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlbHRhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVzdHJveScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5IZWFsdGgnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkluV29ybGQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkxvYWRUZXh0dXJlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuT3ZlcmxhcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUmVzZXQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5TY2FsZU1pbk1heCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkJylcclxuKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5TcHJpdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXInKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLlNwcml0ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BJWEkuRGlzcGxheU9iamVjdCcpXHJcbik7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmdlbmVyYXRlUG9pbnRQcm9wTWFwKFsnc2NhbGUnXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKSxcclxuXHJcbiAgICBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICBhY2NbcHJvcF0gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwID0gZnVuY3Rpb24gKHByZWZpeCwgcHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeCArIHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJlZml4XVtwcm9wXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIGdlbmVyYXRlUG9pbnRQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGFjY1twcm9wXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgcHJldlZhbHVlLCBpc05ldykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gbm9kZS5vYmpbcHJvcF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueCAhPT0gcHJldlZhbHVlLngpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludC54ID0gdmFsdWUueDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc05ldyB8fCB2YWx1ZS55ICE9PSBwcmV2VmFsdWUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnkgPSB2YWx1ZS55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhY2NbcHJvcCArICdYJ10gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdLnggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3Byb3AgKyAnWSddID0gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcm9wXS55ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkUG9pbnRQcm9wTWFwID0gZnVuY3Rpb24gKHByZWZpeCwgcHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgdmFyIHByZWZpeGVkUHJvcCA9IHByZWZpeCArIHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICBhY2NbcHJlZml4ZWRQcm9wXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgcHJldlZhbHVlLCBpc05ldykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gbm9kZS5vYmpbcHJlZml4XVtwcm9wXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc05ldyB8fCB2YWx1ZS54ICE9PSBwcmV2VmFsdWUueCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnggPSB2YWx1ZS54O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnkgIT09IHByZXZWYWx1ZS55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueSA9IHZhbHVlLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGFjY1twcmVmaXhlZFByb3AgKyAnWCddID0gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcmVmaXhdW3Byb3BdLnggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYWNjW3ByZWZpeGVkUHJvcCArICdZJ10gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0ueSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2VuZXJhdGVBbGlhc1Byb3BNYXAgPSBmdW5jdGlvbiAoYWxpYXNlcykge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhhbGlhc2VzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgYWxpYXMpIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSBhbGlhc2VzW2FsaWFzXTtcclxuICAgICAgICAgICAgYWNjW2FsaWFzXSA9IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5vYmpbcHJvcF0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG4gICAgZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BNYXApIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocHJvcE1hcCkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcclxuICAgICAgICAgICAgdmFyIGltcGwgPSBwcm9wTWFwW3Byb3BdO1xyXG4gICAgICAgICAgICBhY2NbcHJvcF0gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIHByZXZWYWx1ZSwgaXNOZXcsIGRlbGV0ZWQsIHRyZWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc05ldykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwobm9kZSwgdmFsdWUsIHRyZWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH0sXHJcbiAgICBnZW5lcmF0ZUZpeGVkUHJvcE1hcCA9IGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xyXG4gICAgICAgICAgICBhY2NbcHJvcF0gPSBmdW5jdGlvbiAobm9kZSwgdmFsdWUsIHByZXZWYWx1ZSwgaXNOZXcpIHtcclxuICAgICAgICAgICAgICAgIGludmFyaWFudChpc05ldywgXCJQcm9wZXJ0eSAnJXMnIG9mICclcycgY2Fubm90IGNoYW5nZS5cIiwgcHJvcCwgbm9kZS50YWcpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGdlbmVyYXRlQmFzaWNQcm9wTWFwOiBnZW5lcmF0ZUJhc2ljUHJvcE1hcCxcclxuICAgIGdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXA6IGdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXAsXHJcbiAgICBnZW5lcmF0ZVBvaW50UHJvcE1hcDogZ2VuZXJhdGVQb2ludFByb3BNYXAsXHJcbiAgICBnZW5lcmF0ZVByZWZpeGVkUG9pbnRQcm9wTWFwOiBnZW5lcmF0ZVByZWZpeGVkUG9pbnRQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVBbGlhc1Byb3BNYXA6IGdlbmVyYXRlQWxpYXNQcm9wTWFwLFxyXG4gICAgZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwOiBnZW5lcmF0ZU1vdW50T25seVByb3BNYXAsXHJcbiAgICBnZW5lcmF0ZUZpeGVkUHJvcE1hcDogZ2VuZXJhdGVGaXhlZFByb3BNYXBcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL3V0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuZ2VuZXJhdGVBbGlhc1Byb3BNYXAoe1xyXG4gICAgYXNzZXRLZXk6ICdrZXknXHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkNvcmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnYW5nbGUnXSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5nbGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkFuaW1hdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5cclxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydhdXRvY3VsbCddKTtcclxuLyoqXHJcbiAqIDxyZWFkb25seT5pbkNhbWVyYVxyXG4gKi9cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQm91bmRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkNyb3AuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkRlbHRhLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5IZWFsdGguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkluQ2FtZXJhLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnY2hlY2tXb3JsZEJvdW5kcycsICdvdXRPZkJvdW5kc0tpbGwnXSk7XHJcbi8qKlxyXG4gKiA8cmVhZG9ubHk+aW5Xb3JsZFxyXG4gKi9cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbldvcmxkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydhbGl2ZScsICdsaWZlc3BhbiddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5MaWZlU3Bhbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnZnJhbWUnLCAnZnJhbWVOYW1lJ10pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxvYWRUZXh0dXJlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpLFxyXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHV0aWxzLmdlbmVyYXRlQmFzaWNQcm9wTWFwKFsneCcsICd5J10pLFxyXG4gICAgcmVxdWlyZSgnLi4vY3VzdG9tL2JvZHknKVxyXG4pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpLFxyXG4gICAgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpLFxyXG4gICAgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdHJlZS11dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHV0aWxzLmdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXAoJ2JvZHknLCBbJ2ltbW92YWJsZScsICdjb2xsaWRlV29ybGRCb3VuZHMnXSksXHJcbiAgICB1dGlscy5nZW5lcmF0ZVByZWZpeGVkUG9pbnRQcm9wTWFwKCdib2R5JywgWydib3VuY2UnLCAnZ3Jhdml0eSddKSxcclxuICAgIHV0aWxzLmdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcCh7XHJcbiAgICAgICAgYm9keVBoeXNpY3M6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSwgdHJlZSkge1xyXG4gICAgICAgICAgICB2YXIgcGh5c2ljcyA9IHRyZWVVdGlscy5waHlzaWNzKG5vZGUsIHRyZWUpLFxyXG4gICAgICAgICAgICAgICAgc3lzdGVtID0gdmFsdWUgIT09IHRydWUgPyB2YWx1ZSA6IHBoeXNpY3Muc3lzdGVtO1xyXG5cclxuICAgICAgICAgICAgcGh5c2ljcy5lbmFibGUobm9kZS5vYmosIHN5c3RlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2N1c3RvbS9ib2R5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5SZXNldC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge307XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuU2NhbGVNaW5NYXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ3Ntb290aGVkJ10pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TbW9vdGhlZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICBncm91cFByb3BlcnRlcyA9IHJlcXVpcmUoJy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JvdXAnKSxcclxuXHJcbiAgICB1cGRhdGVHcm91cCA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShncm91cFByb3BlcnRlcyksXHJcblxyXG4gICAgaW5pdEdyb3VwID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JvdXAodHJlZVV0aWxzLmdhbWUodHJlZSkpO1xyXG4gICAgICAgIHRyZWVVdGlscy5hZGREaXNwbGF5T2JqZWN0KG5vZGUsIHRyZWUpO1xyXG4gICAgICAgIHVwZGF0ZUdyb3VwKG5vZGUsIG51bGwsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsR3JvdXAgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH07O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0R3JvdXAsXHJcbiAgICBraWxsOiBraWxsR3JvdXAsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUdyb3VwXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JvdXAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpLFxyXG4gICAgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyJyksXHJcbiAgICBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2VuYWJsZUJvZHknXSlcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyb3VwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscyA9IHJlcXVpcmUoJy4uL3RyZWUtdXRpbHMnKSxcclxuXHJcbiAgICBpbml0QW5pbWF0aW9uID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHRyZWVVdGlscy5wYXJlbnQobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgbm9kZS5vYmogPSBwYXJlbnROb2RlLm9iai5hbmltYXRpb25zLmFkZChub2RlLnByb3BzLmlkLCBub2RlLnByb3BzLmZyYW1lcywgbm9kZS5wcm9wcy5mcHMsIG5vZGUucHJvcHMubG9vcCk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0QW5pbWF0aW9uLFxyXG4gICAga2lsbDogbnVsbCxcclxuICAgIHVwZGF0ZTogbnVsbFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2FuaW1hdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi90cmVlLXV0aWxzJyksXHJcbiAgICBzeXN0ZW1OYW1lID0gcmVxdWlyZSgnLi4vcGh5c2ljLXN5c3RlbS1uYW1lJyksXHJcblxyXG4gICAgaW5pdENvbGxpZGVzID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgYSA9IHRyZWUubm9kZXNbbm9kZS5wYXJlbnRdLFxyXG4gICAgICAgICAgICBiID0gdHJlZS5ieW5hbWVbbm9kZS5wcm9wcy53aXRoXSxcclxuICAgICAgICAgICAgbmFtZSA9IHN5c3RlbU5hbWUobm9kZS5wcm9wcy5zeXN0ZW0pLFxyXG4gICAgICAgICAgICBzdGF0ZU5vZGUgPSB0cmVlVXRpbHMuc3RhdGVOb2RlKG5vZGUsIHRyZWUpO1xyXG5cclxuICAgICAgICBub2RlLm9iaiA9IHtcclxuICAgICAgICAgICAgYTogYSxcclxuICAgICAgICAgICAgYjogYixcclxuICAgICAgICAgICAgb25VcGRhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmdhbWUucGh5c2ljc1tuYW1lXS5jb2xsaWRlKGEub2JqLCBiLm9iaik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdGF0ZU5vZGUuYWRkVXBkYXRlTGlzdGVuZXIobm9kZS5vYmoub25VcGRhdGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsQ29sbGlkZXMgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBzdGF0ZU5vZGUgPSB0cmVlVXRpbHMuc3RhdGVOb2RlKG5vZGUsIHRyZWUpO1xyXG4gICAgICAgIHN0YXRlTm9kZS5yZW1vdmVVcGRhdGVMaXN0ZW5lcihub2RlLm9iai5vblVwZGF0ZSk7XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0Q29sbGlkZXMsXHJcbiAgICBraWxsOiBraWxsQ29sbGlkZXMsXHJcbiAgICB1cGRhdGU6IG51bGxcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9jb2xsaWRlcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBuYW1lcyA9IHt9O1xyXG5cclxubmFtZXNbUGhhc2VyLlBoeXNpY3MuQVJDQURFXSA9ICdhcmNhZGUnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5CT1gyRF0gPSAnYm94MmQnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5DSElQTVVOS10gPSAnY2hpcG11bmsnO1xyXG5uYW1lc1tQaGFzZXIuUGh5c2ljcy5NQVRURVJKU10gPSAnbWF0dGVyJztcclxubmFtZXNbUGhhc2VyLlBoeXNpY3MuTklOSkFdID0gJ25pbmphJztcclxubmFtZXNbUGhhc2VyLlBoeXNpY3MuUDJKU10gPSAncDInO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3lzdGVtKSB7XHJcbiAgICByZXR1cm4gbmFtZXNbc3lzdGVtXSB8fCAnYXJjYWRlJztcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9waHlzaWMtc3lzdGVtLW5hbWUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vdHJlZS11dGlscycpLFxyXG4gICAgc3lzdGVtTmFtZSA9IHJlcXVpcmUoJy4uL3BoeXNpYy1zeXN0ZW0tbmFtZScpLFxyXG5cclxuICAgIGluaXRPdmVybGFwcyA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0cmVlLm5vZGVzW25vZGUucGFyZW50XSxcclxuICAgICAgICAgICAgYiA9IHRyZWUuYnluYW1lW25vZGUucHJvcHMud2l0aF0sXHJcbiAgICAgICAgICAgIG5hbWUgPSBzeXN0ZW1OYW1lKG5vZGUucHJvcHMuc3lzdGVtKSxcclxuICAgICAgICAgICAgc3RhdGVOb2RlID0gdHJlZVV0aWxzLnN0YXRlTm9kZShub2RlLCB0cmVlKSxcclxuICAgICAgICAgICAgb25PdmVybGFwID0gbm9kZS5wcm9wcy5vbk92ZXJsYXA7XHJcblxyXG4gICAgICAgIG5vZGUub2JqID0ge1xyXG4gICAgICAgICAgICBhOiBhLFxyXG4gICAgICAgICAgICBiOiBiLFxyXG4gICAgICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZ2FtZS5waHlzaWNzW25hbWVdLm92ZXJsYXAoYS5vYmosIGIub2JqLCBmdW5jdGlvbiAob3ZlcmxhcHBpbmdBLCBvdmVybGFwcGluZ0IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbk92ZXJsYXAodHJlZS5ub2Rlc1tvdmVybGFwcGluZ0Eucm5vZGVpZF0sIHRyZWUubm9kZXNbb3ZlcmxhcHBpbmdCLnJub2RlaWRdLCBjb250ZXh0LCBhLCBiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3RhdGVOb2RlLmFkZFVwZGF0ZUxpc3RlbmVyKG5vZGUub2JqLm9uVXBkYXRlKTtcclxuICAgIH0sXHJcblxyXG4gICAga2lsbE92ZXJsYXBzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZXMuZ2FtZU5vZGUucmVtb3ZlVXBkYXRlTGlzdGVuZXIobm9kZS5vYmoub25VcGRhdGUpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdE92ZXJsYXBzLFxyXG4gICAga2lsbDoga2lsbE92ZXJsYXBzLFxyXG4gICAgdXBkYXRlOiBudWxsXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvb3ZlcmxhcHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vdHJlZS11dGlscycpLFxyXG4gICAgdGV4dFByb3BlcnRlcyA9IHJlcXVpcmUoJy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuVGV4dCcpLFxyXG5cclxuICAgIHVwZGF0ZVRleHQgPSB0cmVlVXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUodGV4dFByb3BlcnRlcyksXHJcblxyXG4gICAgaW5pdFRleHQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHMsXHJcbiAgICAgICAgICAgIHRleHQgPSBuZXcgUGhhc2VyLlRleHQodHJlZVV0aWxzLmdhbWUodHJlZSksIDAsIDAsIHByb3BzLnRleHQsIHByb3BzLnN0eWxlKSxcclxuICAgICAgICAgICAgY29udGFpbmVyID0gdHJlZVV0aWxzLnBhcmVudChub2RlLCB0cmVlKS5vYmosXHJcbiAgICAgICAgICAgIHggPSBwcm9wcy54IHx8IChwcm9wcy5hbGlnbiAmJiAoY29udGFpbmVyLndpZHRoIC0gdGV4dC53aWR0aCkgKiAocHJvcHMuYWxpZ24uaW5kZXhPZigncmlnaHQnKSA+PSAwID8gMSA6XHJcbiAgICAgICAgICAgICAgICAgICAgKHByb3BzLmFsaWduLmluZGV4T2YoJ2NlbnRlcicpID49IDAgPyAuNSA6IDApKSkgfHwgMCxcclxuICAgICAgICAgICAgeSA9IHByb3BzLnkgfHwgKHByb3BzLmFsaWduICYmIChjb250YWluZXIuaGVpZ2h0IC0gdGV4dC5oZWlnaHQpICogKHByb3BzLmFsaWduLmluZGV4T2YoJ2JvdHRvbScpID49IDAgPyAxIDpcclxuICAgICAgICAgICAgICAgICAgICAocHJvcHMuYWxpZ24uaW5kZXhPZignbWlkZGxlJykgPj0gMCA/IC41IDogMCkpKSB8fCAwO1xyXG5cclxuICAgICAgICB0ZXh0LnggPSB4O1xyXG4gICAgICAgIHRleHQueSA9IHk7XHJcbiAgICAgICAgbm9kZS5vYmogPSB0ZXh0O1xyXG4gICAgICAgIHRyZWVVdGlscy5hZGREaXNwbGF5T2JqZWN0KG5vZGUsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsVGV4dCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xyXG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRUZXh0LFxyXG4gICAga2lsbDoga2lsbFRleHQsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZVRleHRcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy90ZXh0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcclxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge30sXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5TcHJpdGUnKSxcclxuICAgIHV0aWxzLmdlbmVyYXRlQmFzaWNQcm9wTWFwKFsndGV4dCddKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlRleHQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vdHJlZS11dGlscycpLFxyXG4gICAgYnV0dG9uUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5CdXR0b24nKSxcclxuXHJcbiAgICB1cGRhdGVCdXR0b24gPSB0cmVlVXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoYnV0dG9uUHJvcGVydGVzKSxcclxuXHJcbiAgICBpbml0QnV0dG9uID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzLFxyXG4gICAgICAgICAgICBrZXkgPSBwcm9wcy5hc3NldEtleSxcclxuICAgICAgICAgICAgZ2FtZSA9IHRyZWVVdGlscy5nYW1lKHRyZWUpO1xyXG5cclxuICAgICAgICBub2RlLmJ1dHRvbiA9IG5ldyBQaGFzZXIuQnV0dG9uKFxyXG4gICAgICAgICAgICBnYW1lLFxyXG4gICAgICAgICAgICBwcm9wcy54LFxyXG4gICAgICAgICAgICBwcm9wcy55LFxyXG4gICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgIHByb3BzLm9uQ2xpY2ssXHJcbiAgICAgICAgICAgIG5vZGUsXHJcbiAgICAgICAgICAgIHByb3BzLmZyYW1lc1swXSxcclxuICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzFdLFxyXG4gICAgICAgICAgICBwcm9wcy5mcmFtZXNbMl0sXHJcbiAgICAgICAgICAgIHByb3BzLmZyYW1lc1szXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChub2RlLnByb3BzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5Hcm91cChnYW1lKTtcclxuICAgICAgICAgICAgbm9kZS5vYmouYWRkKG5vZGUuYnV0dG9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlLm9iaiA9IG5vZGUuYnV0dG9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJlZVV0aWxzLmFkZERpc3BsYXlPYmplY3Qobm9kZSwgdHJlZSk7XHJcbiAgICAgICAgdXBkYXRlQnV0dG9uKG5vZGUsIG51bGwsIHRyZWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBraWxsQnV0dG9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogaW5pdEJ1dHRvbixcclxuICAgIGtpbGw6IGtpbGxCdXR0b24sXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUJ1dHRvblxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuSW1hZ2UnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLlNwcml0ZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNvcmUnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5BbmdsZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuaW1hdGlvbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQm91bmRzJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQnJpbmdUb1RvcCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNyb3AnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZWx0YScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3knKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuTGlmZVNwYW4nKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5SZXNldCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkJylcclxuKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5JbWFnZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxyXG4gICAge1xyXG4gICAgICAgIGdyYXBoaWNzOiByZXF1aXJlKCcuL2dyYXBoaWNzJyksXHJcbiAgICAgICAgcmVuZGVydGV4dHVyZTogcmVxdWlyZSgnLi9yZW5kZXJ0ZXh0dXJlJyksXHJcbiAgICAgICAgcmVuZGVyaW1hZ2U6IHJlcXVpcmUoJy4vcmVuZGVyaW1hZ2UnKVxyXG4gICAgfSxcclxuICAgIHJlcXVpcmUoJy4vcmVuZGVyZXJzJylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi8uLi90cmVlLXV0aWxzJyksXHJcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcclxuXHJcbiAgICB1cGRhdGVHcmFwaGljcyA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShncmFwaGljc1Byb3BlcnRlcyksXHJcblxyXG4gICAgaXRlbVR5cGVzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKSxcclxuXHJcbiAgICBpbml0R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHM7XHJcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyYXBoaWNzKHRyZWVVdGlscy5nYW1lKHRyZWUpLCBwcm9wcy54LCBwcm9wcy55KTtcclxuICAgICAgICB0cmVlVXRpbHMuYWRkRGlzcGxheU9iamVjdChub2RlLCB0cmVlKTtcclxuICAgICAgICB1cGRhdGVHcmFwaGljcyhub2RlLCB0cmVlKTtcclxuICAgIH0sXHJcblxyXG4gICAga2lsbEdyYXBoaWNzID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iai5raWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hpbGRyZW5Jbml0ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUsIHRyZWVNZXRob2RzKSB7XHJcbiAgICAgICAgdHJlZU1ldGhvZHMuY2FuY2VsVHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24obm9kZS5pZCk7XHJcbiAgICAgICAgZHJhdyhub2RlLCB0cmVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVkcmF3ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBub2RlLm9iai5jbGVhcigpO1xyXG4gICAgICAgIGRyYXcobm9kZSwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRyYXcgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSB0cmVlLm5vZGVzW25vZGUuY2hpbGRyZW5baV1dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGVzW2NoaWxkLnRhZ10pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlc1tjaGlsZC50YWddLmRyYXcoY2hpbGQsIHRyZWUsIG5vZGUub2JqLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRHcmFwaGljcyxcclxuICAgIG9uQ2hpbGRyZW5Jbml0OiBvbkNoaWxkcmVuSW5pdCxcclxuICAgIGtpbGw6IGtpbGxHcmFwaGljcyxcclxuICAgIHVwZGF0ZTogdXBkYXRlR3JhcGhpY3MsXHJcbiAgICBub3RpZnlUcmFuc2FjdGlvbjogcmVkcmF3XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvZ3JhcGhpY3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcclxuICAgIHt9LFxyXG4gICAgcmVxdWlyZSgnLi9QSVhJLkdyYXBoaWNzJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQ29yZScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlJyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Cb3VuZHMnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRml4ZWRUb0NhbWVyYScpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZCcpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkluV29ybGQnKSxcclxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxyXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5JyksXHJcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUmVzZXQnKVxyXG4pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyYXBoaWNzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXHJcbiAgICB7fSxcclxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyJylcclxuKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5HcmFwaGljcy5qc1xuICoqLyIsInZhciBjcmVhdGVHcmFwaGljc05vZGUgPSByZXF1aXJlKCcuL2NyZWF0ZS1ncmFwaGljcy1pdGVtJyksXHJcblxyXG4gICAgcmVuZGVyZXJzID0ge1xyXG4gICAgICAgIGFyYzogZnVuY3Rpb24gKG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuYXJjKFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5yYWRpdXMgfHwgMCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuc3RhcnRBbmdsZSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5lbmRBbmdsZSB8fCAyICogTWF0aC5QSSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuYW50aWNsb2Nrd2lzZSB8fCBmYWxzZSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuc2VnbWVudHNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNpcmNsZTogZnVuY3Rpb24gKG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd0NpcmNsZShcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueCB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuZGlhbWV0ZXIgfHwgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZWxsaXBzZTogZnVuY3Rpb24gKG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd0VsbGlwc2UoXHJcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkgfHwgMCksXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLndpZHRoIHx8IDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmhlaWdodCB8fCAwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWN0OiBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5kcmF3UmVjdChcclxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueCB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMud2lkdGggfHwgMCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuaGVpZ2h0IHx8IDBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJvdW5kZWRyZWN0OiBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5kcmF3Um91bmRlZFJlY3QoXHJcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkgfHwgMCksXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLndpZHRoIHx8IDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmhlaWdodCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5yYWRpdXMgfHwgMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluZTogZnVuY3Rpb24gKG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54MSB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueTEgfHwgMClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54MiB8fCAwKSxcclxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueTIgfHwgMClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbmV0bzogZnVuY3Rpb24gKG5vZGUsIHRyZWUsIGdyYXBoaWNzLCB4MCwgeTApIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKFxyXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxyXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55IHx8IDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBxdWFkcmF0aWNjdXJ2ZXRvOiBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5xdWFkcmF0aWNDdXJ2ZVRvKFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5jcHggKyB4MCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuY3B5ICsgeTAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLnggKyB4MCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMueSArIHkwXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZXppZXJjdXJ2ZXRvOiBmdW5jdGlvbiAobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xyXG4gICAgICAgICAgICBncmFwaGljcy5xdWFkcmF0aWNDdXJ2ZVRvKFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5jcHggKyB4MCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuY3B5ICsgeTAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmNweDIgKyB4MCxcclxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMuY3B5MiArIHkwLFxyXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy54ICsgeDAsXHJcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLnkgKyB5MFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hhcGU6IGZ1bmN0aW9uIChub2RlLCB0cmVlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIHZhciBzeDAgPSB4MCArIChub2RlLnByb3BzLnggfHwgMCksXHJcbiAgICAgICAgICAgICAgICBzeTAgPSB5MCArIChub2RlLnByb3BzLnkgfHwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLnByb3BzLnMucmVwbGFjZSgvXFxzL2csICcnKS5tYXRjaCgvKFthLXpdWzAtOSxdKykvZyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IHBhcnQuY2hhckF0KDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gcGFydC5tYXRjaCgvWzAtOV0rL2cpLm1hcChmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5hcmModlswXSArIHN4MCwgdlsxXSArIHN5MCwgdlsyXSwgdlszXSwgdls0XSwgISF2WzVdLCB2WzZdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyh2WzBdICsgc3gwLCB2WzFdICsgc3kwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUodlswXSArIHN4MCwgdlsxXSArIHN5MCwgdlsyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5kcmF3RWxsaXBzZSh2WzBdICsgc3gwLCB2WzFdICsgc3kwLCB2WzJdLCB2WzNdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdSZWN0KHZbMF0gKyBzeDAsIHZbMV0gKyBzeTAsIHZbMl0sIHZbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd1JvdW5kZWRSZWN0KHZbMF0gKyBzeDAsIHZbMV0gKyBzeTAsIHZbMl0sIHZbM10sIHZbNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuYmV6aWVyQ3VydmVUbyh2WzBdICsgc3gwLCB2WzFdICsgc3kwLCB2WzJdICsgc3gwLCB2WzNdICsgc3kwLCB2WzRdICsgc3gwLCB2WzVdICsgc3kwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdxJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLnF1YWRyYXRpY0N1cnZlVG8odlswXSArIHN4MCwgdlsxXSArIHN5MCwgdlsyXSArIHN4MCwgdlszXSArIHN5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB0cmVlLm5vZGVzW25vZGUuY2hpbGRyZW5baV1dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVyc1tjaGlsZC50YWddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXJzW2NoaWxkLnRhZ10oY2hpbGQsIHRyZWUsIGdyYXBoaWNzLCBzeDAsIHN5MCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyhyZW5kZXJlcnMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB0eXBlKSB7XHJcbiAgICBhY2NbdHlwZV0gPSBjcmVhdGVHcmFwaGljc05vZGUocmVuZGVyZXJzW3R5cGVdKTtcclxuICAgIHJldHVybiBhY2M7XHJcbn0sIHt9KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9ncmFwaGljcy9yZW5kZXJlcnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdHJlZVV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdHJlZS11dGlscycpLFxyXG4gICAgY3JlYXRlID0gZnVuY3Rpb24gKGRyYXcpIHtcclxuXHJcbiAgICB2YXIgcmVxdWVzdE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlLCB0cmVlLCB0cmVlTWV0aG9kcykge1xyXG4gICAgICAgICAgICB2YXIgZ3JhcGhpY3MgPSB0cmVlVXRpbHMucGFyZW50KG5vZGUsIHRyZWUsICdncmFwaGljcycpO1xyXG4gICAgICAgICAgICBpZiAoZ3JhcGhpY3MpIHtcclxuICAgICAgICAgICAgICAgIHRyZWVNZXRob2RzLnJlcXVlc3RUcmFuc2FjdGlvbk5vZml0aWNhdGlvbihncmFwaGljcy5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGUgPSBmdW5jdGlvbiAobm9kZSwgcHJldlByb3BzLCB0cmVlLCB0cmVlTWV0aG9kcykge1xyXG4gICAgICAgICAgICBpZiAodHJlZVV0aWxzLnByb3BzQ2hhbmdlZChub2RlLnByb3BzLCBwcmV2UHJvcHMpKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Tm90aWZpY2F0aW9uKG5vZGUsIHRyZWUsIHRyZWVNZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBkcmF3V3JhcHBlciA9IGZ1bmN0aW9uIChub2RlLCB0cmVlLCBncmFwaGljcywgeDAsIHkwKSB7XHJcbiAgICAgICAgICAgIHZhciBmaWxsID0gdHlwZW9mIG5vZGUucHJvcHMuZmlsbCAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgICAgICAgICBsaW5lID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlIT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlV2lkdGggIT09ICd1bmRlZmluZWQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlQWxwaGEgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpbGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxsQ29sb3IgPSB0eXBlb2Ygbm9kZS5wcm9wcy5maWxsICE9PSAndW5kZWZpbmVkJyA/IG5vZGUucHJvcHMuZmlsbCA6IDB4MDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGxBbHBoYSA9IHR5cGVvZiBub2RlLnByb3BzLmZpbGxBbHBoYSA9PT0gJ251bWJlcicgPyBub2RlLnByb3BzLmZpbGxBbHBoYSA6IDE7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5iZWdpbkZpbGwoZmlsbENvbG9yLCBmaWxsQWxwaGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGluZUNvbG9yID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlICE9PSAndW5kZWZpbmVkJyA/IG5vZGUucHJvcHMuc3Ryb2tlIDogMHgwMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUFscGhhID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlQWxwaGEgPT09ICdudW1iZXInID8gbm9kZS5wcm9wcy5zdHJva2VBbHBoYSA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlV2lkdGggPT09ICdudW1iZXInID8gbm9kZS5wcm9wcy5zdHJva2VXaWR0aCA6IDE7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lU3R5bGUobGluZVdpZHRoLCBsaW5lQ29sb3IsIGxpbmVBbHBoYSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lU3R5bGUoMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXcobm9kZSwgdHJlZSwgZ3JhcGhpY3MsIHgwLCB5MCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IHJlcXVlc3ROb3RpZmljYXRpb24sXHJcbiAgICAgICAga2lsbDogcmVxdWVzdE5vdGlmaWNhdGlvbixcclxuICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuICAgICAgICBkcmF3OiBkcmF3V3JhcHBlclxyXG4gICAgfTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2NyZWF0ZS1ncmFwaGljcy1pdGVtLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscyA9IHJlcXVpcmUoJy4uLy4uL3RyZWUtdXRpbHMnKSxcclxuICAgIGdyYXBoaWNzUHJvcGVydGVzID0gcmVxdWlyZSgnLi4vLi4vcHJvcGVydGllcy9iYXNlL1BoYXNlci5HcmFwaGljcycpLFxyXG5cclxuICAgIHVwZGF0ZUdyYXBoaWNzID0gdHJlZVV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyYXBoaWNzUHJvcGVydGVzKSxcclxuXHJcbiAgICBpdGVtVHlwZXMgPSByZXF1aXJlKCcuL3JlbmRlcmVycycpLFxyXG5cclxuICAgIGluaXRHcmFwaGljcyA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyYXBoaWNzKHRyZWVVdGlscy5nYW1lKHRyZWUpLCAwLCAwKTtcclxuICAgICAgICB1cGRhdGVHcmFwaGljcyhub2RlLCBudWxsLCB0cmVlKTtcclxuICAgIH0sXHJcblxyXG4gICAga2lsbEdyYXBoaWNzID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBub2RlLm9iai5raWxsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2hpbGRyZW5Jbml0ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBkcmF3KG5vZGUsIHRyZWUpO1xyXG5cclxuICAgICAgICB2YXIgZ2FtZSA9IHRyZWVVdGlscy5nYW1lKHRyZWUpLFxyXG4gICAgICAgICAgICB0ZXh0dXJlID0gbmV3IFBoYXNlci5SZW5kZXJUZXh0dXJlKGdhbWUsIG5vZGUub2JqLndpZHRoLCBub2RlLm9iai5oZWlnaHQpO1xyXG5cclxuICAgICAgICB0ZXh0dXJlLnJlbmRlclhZKG5vZGUub2JqLCAwLCAwKTtcclxuICAgICAgICB0ZXh0dXJlLmRlc3Ryb3koKTtcclxuICAgICAgICBub2RlLm9iai5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIGdhbWUuY2FjaGUuYWRkUmVuZGVyVGV4dHVyZShub2RlLnByb3BzLmFzc2V0S2V5LCB0ZXh0dXJlKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGRyYXcgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSB0cmVlLm5vZGVzW25vZGUuY2hpbGRyZW5baV1dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGVzW2NoaWxkLnRhZ10pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlc1tjaGlsZC50YWddLmRyYXcoY2hpbGQsIHRyZWUsIG5vZGUub2JqLCAwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRHcmFwaGljcyxcclxuICAgIG9uQ2hpbGRyZW5Jbml0OiBvbkNoaWxkcmVuSW5pdCxcclxuICAgIGtpbGw6IGtpbGxHcmFwaGljcyxcclxuICAgIHVwZGF0ZTogdXBkYXRlR3JhcGhpY3NcclxufTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVydGV4dHVyZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi8uLi90cmVlLXV0aWxzJyksXHJcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcclxuXHJcbiAgICB1cGRhdGVHcmFwaGljcyA9IHRyZWVVdGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShncmFwaGljc1Byb3BlcnRlcyksXHJcblxyXG4gICAgaXRlbVR5cGVzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKSxcclxuXHJcbiAgICBpbml0R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5HcmFwaGljcyh0cmVlVXRpbHMuZ2FtZSh0cmVlKSwgMCwgMCk7XHJcbiAgICAgICAgdXBkYXRlR3JhcGhpY3Mobm9kZSwgbnVsbCwgdHJlZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGtpbGxHcmFwaGljcyA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNoaWxkcmVuSW5pdCA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgZHJhdyhub2RlLCB0cmVlKTtcclxuXHJcbiAgICAgICAgdmFyIGdhbWUgPSB0cmVlVXRpbHMuZ2FtZSh0cmVlKSxcclxuICAgICAgICAgICAgdGV4dHVyZSA9IG5ldyBQaGFzZXIuUmVuZGVyVGV4dHVyZShnYW1lLCBub2RlLm9iai53aWR0aCwgbm9kZS5vYmouaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGV4dHVyZS5yZW5kZXJYWShub2RlLm9iaiwgMCwgMCk7XHJcblxyXG4gICAgICAgIHZhciB1cmwgPSB0ZXh0dXJlLmdldEJhc2U2NCgpO1xyXG5cclxuICAgICAgICB0ZXh0dXJlLmRlc3Ryb3koKTtcclxuICAgICAgICBub2RlLm9iai5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgIGlmIChub2RlLnByb3BzLmZyYW1lV2lkdGggfHwgbm9kZS5wcm9wcy5mcmFtZUhlaWdodCkge1xyXG4gICAgICAgICAgICB2YXIgdyA9IG5vZGUucHJvcHMuZnJhbWVXaWR0aCB8fCB0ZXh0dXJlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgaCA9IG5vZGUucHJvcHMuZnJhbWVIZWlnaHQgfHwgdGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBub2RlLm9iaiA9IGdhbWUubG9hZC5zcHJpdGVzaGVldChub2RlLnByb3BzLmFzc2V0S2V5LCB1cmwsIHcsIGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUub2JqID0gZ2FtZS5sb2FkLmltYWdlKG5vZGUucHJvcHMuYXNzZXRLZXksIHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkcmF3ID0gZnVuY3Rpb24gKG5vZGUsIHRyZWUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gdHJlZS5ub2Rlc1tub2RlLmNoaWxkcmVuW2ldXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlc1tjaGlsZC50YWddKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZXNbY2hpbGQudGFnXS5kcmF3KGNoaWxkLCB0cmVlLCBub2RlLm9iaiwgMCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0R3JhcGhpY3MsXHJcbiAgICBvbkNoaWxkcmVuSW5pdDogb25DaGlsZHJlbkluaXQsXHJcbiAgICBraWxsOiBraWxsR3JhcGhpY3MsXHJcbiAgICB1cGRhdGU6IHVwZGF0ZUdyYXBoaWNzXHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyaW1hZ2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGlucHV0OiByZXF1aXJlKCcuL2lucHV0JyksXHJcbiAgICBrZXk6IHJlcXVpcmUoJy4va2V5JylcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB0cmVlVXRpbHMgPSByZXF1aXJlKCcuLi8uLi90cmVlLXV0aWxzJyksXHJcblxyXG4gICAgZGVmYXVsdFBvaW50ZXJOdW1iZXIgPSAyLFxyXG4gICAgZXZlbnRzID0gW1wib25Eb3duXCIsIFwib25VcFwiLCBcIm9uVGFwXCIsIFwib25Ib2xkXCJdLFxyXG5cclxuICAgIGNsZWFySW5wdXQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBjb250ZXh0ID0gdHJlZVV0aWxzLnN0YXRlTm9kZShub2RlLCB0cmVlKS5jb250ZXh0O1xyXG4gICAgICAgIGRlbGV0ZSBjb250ZXh0LmlucHV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0SW5wdXQgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBzdGF0ZU5vZGUgPSB0cmVlVXRpbHMuc3RhdGVOb2RlKG5vZGUsIHRyZWUpO1xyXG4gICAgICAgIGlmICghc3RhdGVOb2RlLmNvbnRleHQuaW5wdXQpIHtcclxuICAgICAgICAgICAgdmFyIHBoYXNlcklucHV0ID0gc3RhdGVOb2RlLm9iai5pbnB1dCxcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJDb3VudCA9IG5vZGUucHJvcHMucG9pbnRlcnMgfHwgZGVmYXVsdFBvaW50ZXJOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZVBvaW50ZXI6IHBoYXNlcklucHV0Lm1vdXNlUG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVQb2ludGVyOiBwaGFzZXJJbnB1dC5hY3RpdmVQb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXJzOiBbXVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIG5vZGUub2JqID0ge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IGlucHV0XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzdGF0ZU5vZGUuY29udGV4dC5pbnB1dCA9IGlucHV0O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludGVyQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gZGVmYXVsdFBvaW50ZXJOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwaGFzZXJJbnB1dC5hZGRQb2ludGVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5wb2ludGVyc1tpXSA9IHBoYXNlcklucHV0Wydwb2ludGVyJyArIChpICsgMSldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IG5vZGUucHJvcHNbZXZlbnRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGhhc2VySW5wdXRbZXZlbnRdLmFkZChmdW5jdGlvbiAocG9pbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihwb2ludGVyLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5jdXJzb3JzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5jdXJzb3JzID0gcGhhc2VySW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5rZXlzKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5rZXlzID0gT2JqZWN0LmtleXMobm9kZS5wcm9wcy5rZXlzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSBwaGFzZXJJbnB1dC5rZXlib2FyZC5hZGRLZXkobm9kZS5wcm9wcy5rZXlzW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9wcy5vbklucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZU5vZGUuYWRkVXBkYXRlTGlzdGVuZXIobm9kZS5wcm9wcy5vbklucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRJbnB1dCxcclxuICAgIGNsZWFyOiBjbGVhcklucHV0LFxyXG4gICAga2lsbDogbnVsbCxcclxuICAgIHVwZGF0ZTogbnVsbFxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2lucHV0L2lucHV0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyZWVVdGlscz0gcmVxdWlyZSgnLi4vLi4vdHJlZS11dGlscycpLFxyXG4gICAga2V5UHJvcGVydGVzID0gcmVxdWlyZSgnLi4vLi4vcHJvcGVydGllcy9jdXN0b20va2V5JyksXHJcblxyXG4gICAgdXBkYXRlS2V5ID0gdHJlZVV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGtleVByb3BlcnRlcyksXHJcblxyXG4gICAgZXZlbnRzID0gW1wib25Eb3duXCIsIFwib25VcFwiLCBcIm9uSG9sZENhbGxiYWNrXCJdLFxyXG5cclxuICAgIGluaXRLZXkgPSBmdW5jdGlvbiAobm9kZSwgdHJlZSkge1xyXG4gICAgICAgIHZhciBzdGF0ZU5vZGUgPSB0cmVlVXRpbHMuc3RhdGVOb2RlKG5vZGUsIHRyZWUpO1xyXG4gICAgICAgIGlmIChzdGF0ZU5vZGUuY29udGV4dC5pbnB1dCAmJiBub2RlLnByb3BzLmtleU5hbWUgJiYgbm9kZS5wcm9wcy5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIHZhciBwaGFzZXJJbnB1dCA9IHN0YXRlTm9kZS5vYmouaW5wdXQsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHN0YXRlTm9kZS5jb250ZXh0LmlucHV0LFxyXG4gICAgICAgICAgICAgICAga2V5ID0gcGhhc2VySW5wdXQua2V5Ym9hcmQuYWRkS2V5KG5vZGUucHJvcHMua2V5Q29kZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlucHV0LmtleXMpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmtleXMgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9kZS5vYmogPSBrZXk7XHJcbiAgICAgICAgICAgIGlucHV0LmtleXNbbm9kZS5wcm9wcy5rZXlOYW1lXSA9IG5vZGUub2JqO1xyXG5cclxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBub2RlLnByb3BzW2V2ZW50XTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleVtldmVudF0uYWRkKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIoa2V5LCBzdGF0ZU5vZGUuY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAga2lsbEtleSA9IGZ1bmN0aW9uIChub2RlLCB0cmVlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUub2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZU5vZGUgPSB0cmVlVXRpbHMuc3RhdGVOb2RlKG5vZGUsIHRyZWUpO1xyXG5cclxuICAgICAgICAgICAgc3RhdGVOb2RlLm9iai5rZXlib2FyZC5yZW1vdmVLZXkobm9kZS5vYmoua2V5Q29kZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZU5vZGUuY29udGV4dC5pbnB1dFtub2RlLnByb3BzLmtleU5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRLZXksXHJcbiAgICBraWxsOiBraWxsS2V5LFxyXG4gICAgdXBkYXRlOiB1cGRhdGVLZXlcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9pbnB1dC9rZXkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5nZW5lcmF0ZUZpeGVkUHJvcE1hcChbJ2tleU5hbWUnLCAna2V5Q29kZSddKTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2N1c3RvbS9rZXkuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9