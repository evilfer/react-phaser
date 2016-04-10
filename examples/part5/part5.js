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
	};
	
	React.render(React.createElement(
	    'game',
	    { assets: assets, width: 800, height: 600, physics: Phaser.Physics.ARCADE },
	    React.createElement('sprite', { assetKey: 'sky' }),
	    React.createElement('sprite', { x: 0, y: 0, assetKey: 'star' }),
	    React.createElement(
	        'group',
	        { name: 'platforms', enableBody: true },
	        React.createElement('sprite', { name: 'ground', assetKey: 'ground', y: 600 - 64, scale: { x: 2, y: 2 }, bodyImmovable: true }),
	        React.createElement('sprite', { name: 'ledge1', assetKey: 'ground', x: 400, y: 400, bodyImmovable: true }),
	        React.createElement('sprite', { name: 'ledge2', assetKey: 'ground', x: -150, y: 250, bodyImmovable: true })
	    ),
	    React.createElement(
	        'sprite',
	        { name: 'player', x: 32, y: 450, assetKey: 'dude',
	            bodyPhysics: true, bodyBounceY: 0.2, bodyGravityY: 300,
	            collideWorldBounds: true },
	        React.createElement('animation', { id: 'left', frames: [0, 1, 2, 3], fps: 10, loop: true }),
	        React.createElement('animation', { id: 'right', frames: [5, 6, 7, 8], fps: 10, loop: true }),
	        React.createElement('collides', { 'with': 'platforms' })
	    )
	), 'game');

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
	var init = __webpack_require__(116);
	var Nodes = __webpack_require__(118);
	
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
	
	var nodeTypes = __webpack_require__(68);
	
	var mount = function mount(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType) {
	        nodeType.mount(nodes, node);
	        if (node.obj) {
	            node.obj.rnodeid = node.id;
	        }
	    }
	};
	
	var update = function update(nodes, node, prevProps) {
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
	};
	
	var unmount = function unmount(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType) {
	        nodeType.unmount(nodes, node);
	    }
	};
	
	var childrenMount = function childrenMount(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType && nodeType.childrenMount) {
	        nodeType.childrenMount(nodes, node);
	    }
	};
	
	var notifyTransaction = function notifyTransaction(nodes, node) {
	    var nodeType = nodeTypes[node.tag];
	    if (nodeType && nodeType.notifyTransaction) {
	        nodeType.notifyTransaction(nodes, node);
	    }
	};
	
	module.exports = {
	    mount: mount,
	    childrenMount: childrenMount,
	    unmount: unmount,
	    update: update,
	    notifyTransaction: notifyTransaction
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
	        graphics: __webpack_require__(111)
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
	    mountSButton = function mountSButton(nodes, node) {
	    var props = node.props;
	
	    node.button = new Phaser.Button(nodes.game(), props.x, props.y, props.assetKey, props.onClick, node, props.frames[0], props.frames[1], props.frames[2], props.frames[3]);
	
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
	    mount: mountSButton,
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
	
	        if (node.props.d) {
	            var parts = node.props.d.match(/([a-z][0-9,]+)/g);
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
	
	var nodeManager = __webpack_require__(67),
	    loadAssets = __webpack_require__(117),
	    initChildren = function initChildren(nodes, children) {
	    children.forEach(function (childId) {
	        var child = nodes.ids[childId];
	        nodeManager.mount(nodes, child);
	        if (child.children.length > 0) {
	            initChildren(nodes, child.children);
	            nodeManager.childrenMount(nodes, child);
	        }
	    });
	},
	    init = function init(nodes) {
	    var _nodes$gameNode$props = nodes.gameNode.props;
	    var _nodes$gameNode$props2 = _nodes$gameNode$props.assets;
	    var assets = _nodes$gameNode$props2 === undefined ? {} : _nodes$gameNode$props2;
	    var width = _nodes$gameNode$props.width;
	    var height = _nodes$gameNode$props.height;
	    var _nodes$gameNode$props3 = _nodes$gameNode$props.mode;
	    var mode = _nodes$gameNode$props3 === undefined ? Phaser.AUTO : _nodes$gameNode$props3;
	
	
	    var gameImpl = {
	        preload: function preload() {
	            loadAssets(nodes.gameNode, assets);
	        },
	        create: function create() {
	            nodeManager.mount(nodes, nodes.gameNode);
	            initChildren(nodes, nodes.gameNode.children);
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
	    nodes.gameNode.obj = new Phaser.Game(width, height, mode, '', gameImpl);
	};
	
	module.exports = init;

/***/ },
/* 117 */
/***/ function(module, exports) {

	'use strict';
	
	var loadAssets = function loadAssets(gameNode, assets) {
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
	};
	
	module.exports = loadAssets;

/***/ },
/* 118 */
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
	        if (parent === null || parent.tag === tag) {
	            return parent;
	        } else {
	            node = parent;
	        }
	    }
	};
	
	module.exports = Nodes;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjdjNGVlZGI5NmM1MDJiN2MzZDA/NWQyMyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4YW1wbGVzL3BhcnQ1LmpzIiwid2VicGFjazovLy8uL3NyYy9uYXRpdmUuanM/N2I0NSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvbmF0aXZlLmpzPzQyZTEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0LmpzPzI0ZWYqIiwid2VicGFjazovLy8uL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanM/NDk0YyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qcz80ZjA1KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcz9jMjlhKiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2ludmFyaWFudC5qcz80NTk5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnQuanM/YWIyZioiLCJ3ZWJwYWNrOi8vLy4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzPzI5MjcqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzPzYxZGIqIiwid2VicGFjazovLy8uL34vZmJqcy9saWIvd2FybmluZy5qcz84YTU2KiIsIndlYnBhY2s6Ly8vLi9+L2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanM/MmEzYioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanM/ZTlhMCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qcz81NmRlKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzPzE1MDcqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzPzcwMmEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzP2FkMGIqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uLmpzPzAyNGUqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RGVidWdUb29sLmpzP2FkMmUqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wuanM/YjIxMioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcz80MmU0KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdENsYXNzLmpzPzBkNzQqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMuanM/YmMxNioiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlNaXJyb3IuanM/MTg2NCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMuanM/N2RkOSoiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9rZXlPZi5qcz8zYWQyKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcz81YTkyKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRWYWxpZGF0b3IuanM/YTU5OSoiLCJ3ZWJwYWNrOi8vLy4vfi9mYmpzL2xpYi9tYXBPYmplY3QuanM/ZWZiMyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanM/M2M4MyoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RWZXJzaW9uLmpzP2MwODMqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL29ubHlDaGlsZC5qcz8yN2UzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nLmpzPzFiYTQqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UGVyZi5qcz9lZjkzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nTW91bnQuanM/OWZiNioiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RVcGRhdGVRdWV1ZS5qcz9mZDJjKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEluc3RhbmNlTWFwLmpzP2E4M2UqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlcy5qcz9jZTA5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlLmpzP2JlYTgqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RmVhdHVyZUZsYWdzLmpzPzc5YWIqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0UmVjb25jaWxlci5qcz82YmZhKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdFJlZi5qcz83MzMzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE93bmVyLmpzPzQwZTAqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1RyYW5zYWN0aW9uLmpzPzZkZmYqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanM/NzVkYSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb3NpdGVDb21wb25lbnQuanM/Y2Q1OSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5qcz8xYTQwKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdEVycm9yVXRpbHMuanM/NmIzMSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3ROb2RlVHlwZXMuanM/MjU4MCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuanM/YzBlMSoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RFbXB0eUNvbXBvbmVudC5qcz9iN2I5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9SZWFjdE5hdGl2ZUNvbXBvbmVudC5qcz9jZjViKiIsIndlYnBhY2s6Ly8vLi9+L3dhcm5pbmcvYnJvd3Nlci5qcz8yNmQzKiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29udGFpbmVySW5mby5qcz9mNzY5KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nSW5qZWN0aW9uLmpzP2IwNjEqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuanM/ZWY3MCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC1hbnl0aGluZy9zcmMvUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLmpzP2UyMDkqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb21wb25lbnQuanM/NWJlNCoiLCJ3ZWJwYWNrOi8vLy4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkLmpzP2M4N2QqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLmpzP2Q0YTAqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRSZWNvbmNpbGVyLmpzP2ZmNDYqIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ZsYXR0ZW5DaGlsZHJlbi5qcz8wZDA2KiIsIndlYnBhY2s6Ly8vLi9+L2ludmFyaWFudC9icm93c2VyLmpzPzk1MjAqIiwid2VicGFjazovLy8uL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5qcz9kNDA2KiIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQuanM/NWQ3NSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL05hdGl2ZUltcGxlbWVudGF0aW9uLmpzPzZhNjYqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL25vZGUtbWFuYWdlci5qcz8wNjZlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9pbmRleC5qcz83NWFlKiIsIndlYnBhY2s6Ly8vLi9+L2V4dGVuZC9pbmRleC5qcz8zNmM4KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9nYW1lLmpzP2Q3N2IqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL3Nwcml0ZS5qcz85ZDgyKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy91dGlscy5qcz85ZWNiKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlNwcml0ZS5qcz81MmU3KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5TcHJpdGUuanM/NmVhZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lci5qcz80NTcxKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUElYSS5EaXNwbGF5T2JqZWN0LmpzPzE5ZmYqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvdXRpbHMuanM/ZTZmOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ29yZS5qcz9lMjljKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmdsZS5qcz8xM2Q1KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmltYXRpb24uanM/MTViYSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQXV0b0N1bGwuanM/Y2YwZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQm91bmRzLmpzPzllZWIqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkJyaW5nVG9Ub3AuanM/Y2ZmYyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ3JvcC5qcz8yZDA1KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZWx0YS5qcz9mYmE5KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95LmpzPzVkNWMqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEuanM/NGQ5MioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSGVhbHRoLmpzP2M0NWUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkluQ2FtZXJhLmpzPzA3MWUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZC5qcz81ZmM2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbldvcmxkLmpzPzczZGUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuLmpzPzYyMjUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxvYWRUZXh0dXJlLmpzPzUwODEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50Lk92ZXJsYXAuanM/YmFkNioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHkuanM/MDQxMCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9jdXN0b20vYm9keS5qcz84MWZkKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5SZXNldC5qcz9lOWU0KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TY2FsZU1pbk1heC5qcz9iODZiKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5TbW9vdGhlZC5qcz9lMjRlKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9ncm91cC5qcz8zNTM2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyb3VwLmpzP2EyNTMqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2FuaW1hdGlvbi5qcz83NTI5KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC90eXBlcy9jdXJzb3JzLmpzPzgwYzcqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2NvbGxpZGVzLmpzP2ZhNjIqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL292ZXJsYXBzLmpzP2ZkODEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL3RleHQuanM/ZTdlYSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5UZXh0LmpzP2M3MDEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qcz9iOGViKiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbi5qcz9lNGY2KiIsIndlYnBhY2s6Ly8vLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkltYWdlLmpzPzI5NGQqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2dyYXBoaWNzLmpzPzBiNWEqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MuanM/Y2JkNioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuR3JhcGhpY3MuanM/MjY5NyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyZXJzLmpzPzkxMzkqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2NyZWF0ZS1ncmFwaGljcy1pdGVtLmpzPzRhNDUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL2luaXQuanM/MDllYyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltcGwvYXNzZXRzLmpzP2M4OWUqIiwid2VicGFjazovLy8uL3NyYy9pbXBsL25vZGVzLmpzP2UyZWIqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBSSxRQUFRLG9CQUFRLENBQVIsQ0FBUjtLQUVBLFNBQVM7QUFDTCxZQUFPLEVBQUMsTUFBTSxPQUFOLEVBQWUsS0FBSyxtQkFBTCxFQUF2QjtBQUNBLGVBQVUsRUFB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Q0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVTs7Ozs7OztBQzFGdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsVUFBVTtBQUNyQixZQUFXLEdBQUc7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxHQUFHO0FBQ2QsWUFBVyxpQkFBaUI7QUFDNUIsWUFBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLEdBQUc7QUFDZCxZQUFXLFVBQVU7QUFDckIsWUFBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFD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Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOztBQUVELG9DOzs7Ozs7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxhQUFhO0FBQ3hCLFlBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLGFBQWE7QUFDeEIsWUFBVyxFQUFFO0FBQ2IsY0FBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdHQUErRjtBQUMvRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxVQUFVO0FBQ3JCLFlBQVcsRUFBRTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhJQUE2STtBQUM3STtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsdUlBQXNJO0FBQ3RJO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0M7Ozs7Ozs7QUN4UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFFBQVE7QUFDbkIsWUFBVyxTQUFTO0FBQ3BCLFlBQVcsRUFBRTtBQUNiLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1IsNEJBQTJCO0FBQzNCLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixLQUFLO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsMkJBQTBCO0FBQzFCLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxvQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0Esb0JBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxXQUFXO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFdBQVc7QUFDeEIsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFdBQVc7QUFDeEIsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQzs7Ozs7OztBQ3ROQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQzs7Ozs7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFF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LFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsOEI7Ozs7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFNBQVM7QUFDcEIsYUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsVUFBVTtBQUNyQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw0Qzs7Ozs7OztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsY0FBYSwwREFBMEQ7QUFDdkUsY0FBYSxRQUFRO0FBQ3JCLGNBQWEsUUFBUTtBQUNyQixjQUFhLFFBQVE7QUFDckIsZUFBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLGNBQWEsT0FBTztBQUNwQixlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDOzs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUFXLElBQVgsRUFBaUI7QUFDakIsZ0JBQU8sS0FBSyxPQUFMLENBQWEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFwQixDQURpQjtBQUVqQixnQkFBTyxLQUFLLE9BQUwsQ0FBYSxLQUFLLEVBQUwsQ0FBcEIsQ0FGaUI7TUFBckI7RUFGeUI7O0FBUTdCLE9BQU0sU0FBTixDQUFnQixJQUFoQixHQUF1QixVQUFVLEVBQVYsRUFBYztBQUNqQyxZQUFPLEtBQUssR0FBTCxDQUFTLEVBQVQsQ0FBUCxDQURpQztFQUFkOztBQUl2QixPQUFNLFNBQU4sQ0FBZ0IsUUFBaEIsR0FBMkIsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZDLFlBQU8sS0FBSyxPQUFMLENBQWEsSUFBYixDQUFQLENBRHVDO0VBQWhCOztBQUkzQixPQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsR0FBeUIsVUFBVSxJQUFWLEVBQWdCO0FBQ3JDLFlBQU8sS0FBSyxHQUFMLENBQVMsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFULENBQVAsQ0FEcUM7RUFBaEI7O0FBSXpCLE9BQU0sU0FBTixDQUFnQixNQUFoQixHQUF5QixVQUFVLElBQVYsRUFBZ0IsR0FBaEIsRUFBcUI7QUFDMUMsWUFBTSxJQUFOLEVBQVk7QUFDUixhQUFJLFNBQVMsS0FBSyxHQUFMLENBQVMsS0FBSyxNQUFMLENBQWxCLENBREk7QUFFUixhQUFJLFdBQVcsSUFBWCxJQUFtQixPQUFPLEdBQVAsS0FBZSxHQUFmLEVBQW9CO0FBQ3ZDLG9CQUFPLE1BQVAsQ0FEdUM7VUFBM0MsTUFFTztBQUNILG9CQUFPLE1BQVAsQ0FERztVQUZQO01BRko7RUFEcUI7O0FBV3pCLFFBQU8sT0FBUCxHQUFpQixLQUFqQixDIiwiZmlsZSI6InBhcnQ1L3BhcnQ1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmN2M0ZWVkYjk2YzUwMmI3YzNkMFxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJy4uL25hdGl2ZScpLFxuXG4gICAgYXNzZXRzID0ge1xuICAgICAgICAnc2t5Jzoge3R5cGU6ICdpbWFnZScsIHNyYzogJy4uL2Fzc2V0cy9za3kucG5nJ30sXG4gICAgICAgICdncm91bmQnOiB7dHlwZTogJ2ltYWdlJywgc3JjOiAnLi4vYXNzZXRzL3BsYXRmb3JtLnBuZyd9LFxuICAgICAgICAnc3Rhcic6IHt0eXBlOiAnaW1hZ2UnLCBzcmM6ICcuLi9hc3NldHMvc3Rhci5wbmcnfSxcbiAgICAgICAgJ2R1ZGUnOiB7dHlwZTogJ3Nwcml0ZXNoZWV0Jywgc3JjOiAnLi4vYXNzZXRzL2R1ZGUucG5nJywgd2lkdGg6IDMyLCBoZWlnaHQ6IDQ4fVxuICAgIH07XG5cblJlYWN0LnJlbmRlcigoXG4gICAgPGdhbWUgYXNzZXRzPXthc3NldHN9IHdpZHRoPXs4MDB9IGhlaWdodD17NjAwfSBwaHlzaWNzPXtQaGFzZXIuUGh5c2ljcy5BUkNBREV9PlxuICAgICAgICA8c3ByaXRlIGFzc2V0S2V5PVwic2t5XCIvPlxuICAgICAgICA8c3ByaXRlIHg9ezB9IHk9ezB9IGFzc2V0S2V5PVwic3RhclwiLz5cbiAgICAgICAgPGdyb3VwIG5hbWU9XCJwbGF0Zm9ybXNcIiBlbmFibGVCb2R5PXt0cnVlfT5cbiAgICAgICAgICAgIDxzcHJpdGUgbmFtZT1cImdyb3VuZFwiIGFzc2V0S2V5PVwiZ3JvdW5kXCIgeT17NjAwIC0gNjR9IHNjYWxlPXt7eDogMiwgeToyfX0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxuICAgICAgICAgICAgPHNwcml0ZSBuYW1lPVwibGVkZ2UxXCIgYXNzZXRLZXk9XCJncm91bmRcIiB4PXs0MDB9IHk9ezQwMH0gYm9keUltbW92YWJsZT17dHJ1ZX0vPlxuICAgICAgICAgICAgPHNwcml0ZSBuYW1lPVwibGVkZ2UyXCIgYXNzZXRLZXk9XCJncm91bmRcIiB4PXstMTUwfSB5PXsyNTB9IGJvZHlJbW1vdmFibGU9e3RydWV9Lz5cbiAgICAgICAgPC9ncm91cD5cbiAgICAgICAgPHNwcml0ZSBuYW1lPVwicGxheWVyXCIgeD17MzJ9IHk9ezQ1MH0gYXNzZXRLZXk9XCJkdWRlXCJcbiAgICAgICAgICAgICAgICBib2R5UGh5c2ljcz17dHJ1ZX0gYm9keUJvdW5jZVk9ezAuMn0gYm9keUdyYXZpdHlZPXszMDB9XG4gICAgICAgICAgICAgICAgY29sbGlkZVdvcmxkQm91bmRzPXt0cnVlfT5cbiAgICAgICAgICAgIDxhbmltYXRpb24gaWQ9XCJsZWZ0XCIgZnJhbWVzPXtbMCwgMSwgMiwgM119IGZwcz17MTB9IGxvb3A9e3RydWV9Lz5cbiAgICAgICAgICAgIDxhbmltYXRpb24gaWQ9XCJyaWdodFwiIGZyYW1lcz17WzUsIDYsIDcsIDhdfSBmcHM9ezEwfSBsb29wPXt0cnVlfS8+XG4gICAgICAgICAgICA8Y29sbGlkZXMgd2l0aD1cInBsYXRmb3Jtc1wiLz5cbiAgICAgICAgPC9zcHJpdGU+XG4gICAgPC9nYW1lPlxuKSwgJ2dhbWUnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leGFtcGxlcy9wYXJ0NS5qc1xuICoqLyIsIlxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmcgPSByZXF1aXJlKCdyZWFjdC1hbnl0aGluZy9zcmMvbmF0aXZlJyk7XG52YXIgTmF0aXZlSW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL05hdGl2ZUltcGxlbWVudGF0aW9uJyk7XG5cbnZhciBSZWFjdFBoYXNlciA9IGNyZWF0ZVJlYWN0QW55dGhpbmcoTmF0aXZlSW1wbGVtZW50YXRpb24pO1xudmFyIFJlYWN0ID0gUmVhY3RQaGFzZXIuUmVhY3Q7XG5cblJlYWN0LnJlbmRlciA9IFJlYWN0UGhhc2VyLnJlbmRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25hdGl2ZS5qc1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdCcpO1xuXG52YXIgY3JlYXRlUmVhY3RBbnl0aGluZyA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZycpO1xudmFyIGNyZWF0ZU5hdGl2ZVJlYWN0QW55dGhpbmcgPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlUmVhY3RBbnl0aGluZyhSZWFjdCwgbmF0aXZlSW1wbGVtZW50YXRpb24pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVOYXRpdmVSZWFjdEFueXRoaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL25hdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdENoaWxkcmVuID0gcmVxdWlyZSgnLi9SZWFjdENoaWxkcmVuJyk7XG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RDbGFzcyA9IHJlcXVpcmUoJy4vUmVhY3RDbGFzcycpO1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZhY3RvcmllcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbnZhciBSZWFjdFByb3BUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXMnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCcuL1JlYWN0VmVyc2lvbicpO1xuXG52YXIgb25seUNoaWxkID0gcmVxdWlyZSgnLi9vbmx5Q2hpbGQnKTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50O1xuICBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG4gIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jbG9uZUVsZW1lbnQ7XG59XG5cbnZhciBSZWFjdCA9IHtcblxuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbi5tYXAsXG4gICAgZm9yRWFjaDogUmVhY3RDaGlsZHJlbi5mb3JFYWNoLFxuICAgIGNvdW50OiBSZWFjdENoaWxkcmVuLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW4udG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IFJlYWN0Q29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50LFxuXG4gIC8vIENsYXNzaWNcblxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjcmVhdGVDbGFzczogUmVhY3RDbGFzcy5jcmVhdGVDbGFzcyxcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIC8vIEN1cnJlbnRseSBhIG5vb3AuIFdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBhbmQgdHJhY2UgbWl4aW5zLlxuICAgIHJldHVybiBtaXhpbjtcbiAgfSxcblxuICAvLyBUaGlzIGxvb2tzIERPTSBzcGVjaWZpYyBidXQgdGhlc2UgYXJlIGFjdHVhbGx5IGlzb21vcnBoaWMgaGVscGVyc1xuICAvLyBzaW5jZSB0aGV5IGFyZSBqdXN0IGdlbmVyYXRpbmcgRE9NIHN0cmluZ3MuXG4gIERPTTogUmVhY3RET01GYWN0b3JpZXMsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmM7XG4gIHZhciBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IEZvckVhY2hCb29rS2VlcGluZy5nZXRQb29sZWQoZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICBGb3JFYWNoQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogbWFwcGluZy4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBNYXBCb29rS2VlcGluZ1xuICogQHBhcmFtIHshKn0gbWFwUmVzdWx0IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICogQHBhcmFtIHshZnVuY3Rpb259IG1hcEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICogQHBhcmFtIHs/Kn0gbWFwQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICovXG5mdW5jdGlvbiBNYXBCb29rS2VlcGluZyhtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgdGhpcy5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gIHRoaXMua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICB0aGlzLmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5NYXBCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZXN1bHQgPSBudWxsO1xuICB0aGlzLmtleVByZWZpeCA9IG51bGw7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhNYXBCb29rS2VlcGluZywgZm91ckFyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQ7XG4gIHZhciBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXg7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYztcbiAgdmFyIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBNYXBCb29rS2VlcGluZy5nZXRQb29sZWQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICBNYXBCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHtcbiAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICBtYXA6IG1hcENoaWxkcmVuLFxuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsLFxuICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgdG9BcnJheTogdG9BcnJheVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkcmVuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENoaWxkcmVuLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBQb29sZWRDbGFzc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFN0YXRpYyBwb29sZXJzLiBTZXZlcmFsIGN1c3RvbSB2ZXJzaW9ucyBmb3IgZWFjaCBwb3RlbnRpYWwgbnVtYmVyIG9mXG4gKiBhcmd1bWVudHMuIEEgY29tcGxldGVseSBnZW5lcmljIHBvb2xlciBpcyBlYXN5IHRvIGltcGxlbWVudCwgYnV0IHdvdWxkXG4gKiByZXF1aXJlIGFjY2Vzc2luZyB0aGUgYGFyZ3VtZW50c2Agb2JqZWN0LiBJbiBlYWNoIG9mIHRoZXNlLCBgdGhpc2AgcmVmZXJzIHRvXG4gKiB0aGUgQ2xhc3MgaXRzZWxmLCBub3QgYW4gaW5zdGFuY2UuIElmIGFueSBvdGhlcnMgYXJlIG5lZWRlZCwgc2ltcGx5IGFkZCB0aGVtXG4gKiBoZXJlLCBvciBpbiB0aGVpciBvd24gZmlsZXMuXG4gKi9cbnZhciBvbmVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChjb3B5RmllbGRzRnJvbSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBjb3B5RmllbGRzRnJvbSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoY29weUZpZWxkc0Zyb20pO1xuICB9XG59O1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMik7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyKTtcbiAgfVxufTtcblxudmFyIHRocmVlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMykge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzKTtcbiAgfVxufTtcblxudmFyIGZvdXJBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzLCBhNCkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQpO1xuICB9XG59O1xuXG52YXIgZml2ZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gIGluc3RhbmNlLmRlc3RydWN0b3IoKTtcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGggPCBLbGFzcy5wb29sU2l6ZSkge1xuICAgIEtsYXNzLmluc3RhbmNlUG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgfVxufTtcblxudmFyIERFRkFVTFRfUE9PTF9TSVpFID0gMTA7XG52YXIgREVGQVVMVF9QT09MRVIgPSBvbmVBcmd1bWVudFBvb2xlcjtcblxuLyoqXG4gKiBBdWdtZW50cyBgQ29weUNvbnN0cnVjdG9yYCB0byBiZSBhIHBvb2xhYmxlIGNsYXNzLCBhdWdtZW50aW5nIG9ubHkgdGhlIGNsYXNzXG4gKiBpdHNlbGYgKHN0YXRpY2FsbHkpIG5vdCBhZGRpbmcgYW55IHByb3RvdHlwaWNhbCBmaWVsZHMuIEFueSBDb3B5Q29uc3RydWN0b3JcbiAqIHlvdSBnaXZlIHRoaXMgbWF5IGhhdmUgYSBgcG9vbFNpemVgIHByb3BlcnR5LCBhbmQgd2lsbCBsb29rIGZvciBhXG4gKiBwcm90b3R5cGljYWwgYGRlc3RydWN0b3JgIG9uIGluc3RhbmNlcyAob3B0aW9uYWwpLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbiAoQ29weUNvbnN0cnVjdG9yLCBwb29sZXIpIHtcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyLFxuICBmaXZlQXJndW1lbnRQb29sZXI6IGZpdmVBcmd1bWVudFBvb2xlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb29sZWRDbGFzcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUG9vbGVkQ2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudCB0eXBlLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cblJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZWYgPSAhY29uZmlnLmhhc093blByb3BlcnR5KCdyZWYnKSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldCA/IG51bGwgOiBjb25maWcucmVmO1xuICAgICAga2V5ID0gIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgna2V5JykgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQgPyBudWxsIDogJycgKyBjb25maWcua2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZWYgPSBjb25maWcucmVmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLnJlZjtcbiAgICAgIGtleSA9IGNvbmZpZy5rZXkgPT09IHVuZGVmaW5lZCA/IG51bGwgOiAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBDcmVhdGUgZHVtbXkgYGtleWAgYW5kIGByZWZgIHByb3BlcnR5IHRvIGBwcm9wc2AgdG8gd2FybiB1c2Vyc1xuICAgIC8vIGFnYWluc3QgaXRzIHVzZVxuICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkoJ2tleScpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmICdkaXNwbGF5TmFtZScgaW4gdHlwZSA/IHR5cGUuZGlzcGxheU5hbWUgOiAnRWxlbWVudCcpIDogdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkoJ3JlZicpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nICYmICdkaXNwbGF5TmFtZScgaW4gdHlwZSA/IHR5cGUuZGlzcGxheU5hbWUgOiAnRWxlbWVudCcpIDogdm9pZCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChjb25maWcua2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5SZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFbGVtZW50LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEN1cnJlbnRPd25lclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi93YXJuaW5nLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xuZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgY2FuRGVmaW5lUHJvcGVydHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdHJ5IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4JywgeyBnZXQ6IGZ1bmN0aW9uICgpIHt9IH0pO1xuICAgIGNhbkRlZmluZVByb3BlcnR5ID0gdHJ1ZTtcbiAgfSBjYXRjaCAoeCkge1xuICAgIC8vIElFIHdpbGwgZmFpbCBvbiBkZWZpbmVQcm9wZXJ0eVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FuRGVmaW5lUHJvcGVydHk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2NhbkRlZmluZVByb3BlcnR5LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdHJhdmVyc2VBbGxDaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVyTG9va3VwID0ge1xuICAnPSc6ICc9MCcsXG4gICc6JzogJz0yJ1xufTtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcblxudmFyIGRpZFdhcm5BYm91dE1hcHMgPSBmYWxzZTtcblxuZnVuY3Rpb24gdXNlclByb3ZpZGVkS2V5RXNjYXBlcihtYXRjaCkge1xuICByZXR1cm4gdXNlclByb3ZpZGVkS2V5RXNjYXBlckxvb2t1cFttYXRjaF07XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIHdyYXBVc2VyUHJvdmlkZWRLZXkoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBFc2NhcGUgYSBjb21wb25lbnQga2V5IHNvIHRoYXQgaXQgaXMgc2FmZSB0byB1c2UgaW4gYSByZWFjdGlkLlxuICpcbiAqIEBwYXJhbSB7Kn0gdGV4dCBDb21wb25lbnQga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEFuIGVzY2FwZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgdXNlclByb3ZpZGVkS2V5RXNjYXBlcik7XG59XG5cbi8qKlxuICogV3JhcCBhIGBrZXlgIHZhbHVlIGV4cGxpY2l0bHkgcHJvdmlkZWQgYnkgdGhlIHVzZXIgdG8gZGlzdGluZ3Vpc2ggaXQgZnJvbVxuICogaW1wbGljaXRseS1nZW5lcmF0ZWQga2V5cyBnZW5lcmF0ZWQgYnkgYSBjb21wb25lbnQncyBpbmRleCBpbiBpdHMgcGFyZW50LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVmFsdWUgb2YgYSB1c2VyLXByb3ZpZGVkIGBrZXlgIGF0dHJpYnV0ZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB3cmFwVXNlclByb3ZpZGVkS2V5KGtleSkge1xuICByZXR1cm4gJyQnICsgZXNjYXBlVXNlclByb3ZpZGVkS2V5KGtleSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCB8fCB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgY2hpbGQgPSBlbnRyeVsxXTtcbiAgICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyB3cmFwVXNlclByb3ZpZGVkS2V5KGVudHJ5WzBdKSArIFNVQlNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZCwgMCk7XG4gICAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFkZGVuZHVtID0gJyBJZiB5b3UgbWVhbnQgdG8gcmVuZGVyIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiwgdXNlIGFuIGFycmF5ICcgKyAnaW5zdGVhZCBvciB3cmFwIHRoZSBvYmplY3QgdXNpbmcgY3JlYXRlRnJhZ21lbnQob2JqZWN0KSBmcm9tIHRoZSAnICsgJ1JlYWN0IGFkZC1vbnMuJztcbiAgICAgICAgaWYgKGNoaWxkcmVuLl9pc1JlYWN0RWxlbWVudCkge1xuICAgICAgICAgIGFkZGVuZHVtID0gJyBJdCBsb29rcyBsaWtlIHlvdVxcJ3JlIHVzaW5nIGFuIGVsZW1lbnQgY3JlYXRlZCBieSBhIGRpZmZlcmVudCAnICsgJ3ZlcnNpb24gb2YgUmVhY3QuIE1ha2Ugc3VyZSB0byB1c2Ugb25seSBvbmUgY29weSBvZiBSZWFjdC4nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgICAgdmFyIG5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICAgICAgICBpZiAobmFtZSkge1xuICAgICAgICAgICAgYWRkZW5kdW0gKz0gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gU3RyaW5nKGNoaWxkcmVuKTtcbiAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBnZXRJdGVyYXRvckZuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgU3ltYm9sICovXG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAqXG4gKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAqXG4gKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yRm47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2dldEl0ZXJhdG9yRm4uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhICcgKyAnZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25TZXRTdGF0ZSgpO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHBhcnRpYWxTdGF0ZSAhPSBudWxsLCAnc2V0U3RhdGUoLi4uKTogWW91IHBhc3NlZCBhbiB1bmRlZmluZWQgb3IgbnVsbCBzdGF0ZSBvYmplY3Q7ICcgKyAnaW5zdGVhZCwgdXNlIGZvcmNlVXBkYXRlKCkuJykgOiB2b2lkIDA7XG4gIH1cbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE5vb3BVcGRhdGVRdWV1ZVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIHdhcm5URFoocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvciAmJiBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgdGhlIHBlbmRpbmcgdXBkYXRlc1xuICAgKiBoYXZlIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdG8gdXNlIGFzIGB0aGlzYCBjb250ZXh0LlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUNhbGxiYWNrOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrKSB7fSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHdhcm5URFoocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgd2FyblREWihwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5URFoocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5vb3BVcGRhdGVRdWV1ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0SW5zdHJ1bWVudGF0aW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3REZWJ1Z1Rvb2wgPSByZXF1aXJlKCcuL1JlYWN0RGVidWdUb29sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0geyBkZWJ1Z1Rvb2w6IFJlYWN0RGVidWdUb29sIH07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW5zdHJ1bWVudGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3REZWJ1Z1Rvb2xcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sID0gcmVxdWlyZSgnLi9SZWFjdEludmFsaWRTZXRTdGF0ZVdhcm5pbmdEZXZUb29sJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGV2ZW50SGFuZGxlcnMgPSBbXTtcbnZhciBoYW5kbGVyRG9lc1Rocm93Rm9yRXZlbnQgPSB7fTtcblxuZnVuY3Rpb24gZW1pdEV2ZW50KGhhbmRsZXJGdW5jdGlvbk5hbWUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBldmVudEhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyW2hhbmRsZXJGdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgaGFuZGxlcltoYW5kbGVyRnVuY3Rpb25OYW1lXShhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaGFuZGxlckRvZXNUaHJvd0ZvckV2ZW50W2hhbmRsZXJGdW5jdGlvbk5hbWVdLCAnZXhjZXB0aW9uIHRocm93biBieSBkZXZ0b29sIHdoaWxlIGhhbmRsaW5nICVzOiAlcycsIGhhbmRsZXJGdW5jdGlvbk5hbWUsIGUubWVzc2FnZSkgOiB2b2lkIDA7XG4gICAgICAgIGhhbmRsZXJEb2VzVGhyb3dGb3JFdmVudFtoYW5kbGVyRnVuY3Rpb25OYW1lXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIFJlYWN0RGVidWdUb29sID0ge1xuICBhZGREZXZ0b29sOiBmdW5jdGlvbiAoZGV2dG9vbCkge1xuICAgIGV2ZW50SGFuZGxlcnMucHVzaChkZXZ0b29sKTtcbiAgfSxcbiAgcmVtb3ZlRGV2dG9vbDogZnVuY3Rpb24gKGRldnRvb2wpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50SGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudEhhbmRsZXJzW2ldID09PSBkZXZ0b29sKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBvbkJlZ2luUHJvY2Vzc2luZ0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIGVtaXRFdmVudCgnb25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQnKTtcbiAgfSxcbiAgb25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgZW1pdEV2ZW50KCdvbkVuZFByb2Nlc3NpbmdDaGlsZENvbnRleHQnKTtcbiAgfSxcbiAgb25TZXRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIGVtaXRFdmVudCgnb25TZXRTdGF0ZScpO1xuICB9LFxuICBvbk1vdW50Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICBlbWl0RXZlbnQoJ29uTW91bnRSb290Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlKSB7XG4gICAgZW1pdEV2ZW50KCdvbk1vdW50Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG4gIG9uVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25VcGRhdGVDb21wb25lbnQnLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGVtaXRFdmVudCgnb25Vbm1vdW50Q29tcG9uZW50JywgaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH1cbn07XG5cblJlYWN0RGVidWdUb29sLmFkZERldnRvb2woUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3REZWJ1Z1Rvb2w7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RGVidWdUb29sLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcm9jZXNzaW5nQ2hpbGRDb250ZXh0ID0gZmFsc2U7XG5cbiAgdmFyIHdhcm5JbnZhbGlkU2V0U3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIXByb2Nlc3NpbmdDaGlsZENvbnRleHQsICdzZXRTdGF0ZSguLi4pOiBDYW5ub3QgY2FsbCBzZXRTdGF0ZSgpIGluc2lkZSBnZXRDaGlsZENvbnRleHQoKScpIDogdm9pZCAwO1xuICB9O1xufVxuXG52YXIgUmVhY3RJbnZhbGlkU2V0U3RhdGVXYXJuaW5nRGV2VG9vbCA9IHtcbiAgb25CZWdpblByb2Nlc3NpbmdDaGlsZENvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9jZXNzaW5nQ2hpbGRDb250ZXh0ID0gdHJ1ZTtcbiAgfSxcbiAgb25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzc2luZ0NoaWxkQ29udGV4dCA9IGZhbHNlO1xuICB9LFxuICBvblNldFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgd2FybkludmFsaWRTZXRTdGF0ZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2w7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW52YWxpZFNldFN0YXRlV2FybmluZ0RldlRvb2wuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmJqcy9saWIvZW1wdHlPYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENsYXNzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xudmFyIGtleU9mID0gcmVxdWlyZSgnZmJqcy9saWIva2V5T2YnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9IGtleU9mKHsgbWl4aW5zOiBudWxsIH0pO1xuXG4vKipcbiAqIFBvbGljaWVzIHRoYXQgZGVzY3JpYmUgbWV0aG9kcyBpbiBgUmVhY3RDbGFzc0ludGVyZmFjZWAuXG4gKi9cbnZhciBTcGVjUG9saWN5ID0ga2V5TWlycm9yKHtcbiAgLyoqXG4gICAqIFRoZXNlIG1ldGhvZHMgbWF5IGJlIGRlZmluZWQgb25seSBvbmNlIGJ5IHRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIG9yIG1peGluLlxuICAgKi9cbiAgREVGSU5FX09OQ0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIG1heSBiZSBkZWZpbmVkIGJ5IGJvdGggdGhlIGNsYXNzIHNwZWNpZmljYXRpb24gYW5kIG1peGlucy5cbiAgICogU3Vic2VxdWVudCBkZWZpbml0aW9ucyB3aWxsIGJlIGNoYWluZWQuIFRoZXNlIG1ldGhvZHMgbXVzdCByZXR1cm4gdm9pZC5cbiAgICovXG4gIERFRklORV9NQU5ZOiBudWxsLFxuICAvKipcbiAgICogVGhlc2UgbWV0aG9kcyBhcmUgb3ZlcnJpZGluZyB0aGUgYmFzZSBjbGFzcy5cbiAgICovXG4gIE9WRVJSSURFX0JBU0U6IG51bGwsXG4gIC8qKlxuICAgKiBUaGVzZSBtZXRob2RzIGFyZSBzaW1pbGFyIHRvIERFRklORV9NQU5ZLCBleGNlcHQgd2UgYXNzdW1lIHRoZXkgcmV0dXJuXG4gICAqIG9iamVjdHMuIFdlIHRyeSB0byBtZXJnZSB0aGUga2V5cyBvZiB0aGUgcmV0dXJuIHZhbHVlcyBvZiBhbGwgdGhlIG1peGVkIGluXG4gICAqIGZ1bmN0aW9ucy4gSWYgdGhlcmUgaXMgYSBrZXkgY29uZmxpY3Qgd2UgdGhyb3cuXG4gICAqL1xuICBERUZJTkVfTUFOWV9NRVJHRUQ6IG51bGxcbn0pO1xuXG52YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuLyoqXG4gKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICogb3IgbmF0aXZlIGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZX01FUkdFRCxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQG5vc2lkZWVmZmVjdHNcbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogU3BlY1BvbGljeS5ERUZJTkVfTUFOWSxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX09OQ0UsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBTcGVjUG9saWN5LkRFRklORV9NQU5ZLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IFNwZWNQb2xpY3kuREVGSU5FX01BTlksXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0VcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jaGlsZENvbnRleHQpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY29udGV4dCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuLy8gbm9vcFxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5Lk9WRVJSSURFX0JBU0UpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSAnICsgJ2Alc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzICcgKyAnZG8gbm90IG92ZXJsYXAgd2l0aCBSZWFjdCBtZXRob2RzLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTlkgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgJyArICdgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgJyArICd0byBhIG1peGluLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgISh0eXBlb2Ygc3BlYyAhPT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byAnICsgJ3VzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhICcgKyAncmVndWxhciBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAhIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzcGVjKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvICcgKyAndXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWV9NRVJHRUQgfHwgc3BlY1BvbGljeSA9PT0gU3BlY1BvbGljeS5ERUZJTkVfTUFOWSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyAnICsgJ3doZW4gbWl4aW5nIGluIGNvbXBvbmVudCBzcGVjcy4nLCBzcGVjUG9saWN5LCBuYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09IFNwZWNQb2xpY3kuREVGSU5FX01BTllfTUVSR0VEKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSBTcGVjUG9saWN5LkRFRklORV9NQU5ZKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkICcgKyAncHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0ICcgKyAnYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgaW5zdGVhZDsgaXQgd2lsbCBzdGlsbCBiZSBhY2Nlc3NpYmxlIG9uIHRoZSAnICsgJ2NvbnN0cnVjdG9yLicsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lICcgKyAnYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgJyArICdkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IENhbm5vdCBtZXJnZSBub24tb2JqZWN0cy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG5cbiAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgIShvbmVba2V5XSA9PT0gdW5kZWZpbmVkKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6ICcgKyAnVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgJyArICdtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gJyArICdnZXRJbml0aWFsU3RhdGUoKSBvciBnZXREZWZhdWx0UHJvcHMoKSBtZXRob2RzIHJldHVybmluZyBvYmplY3RzICcgKyAnd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3BlYyBDbGFzcyBzcGVjaWZpY2F0aW9uICh3aGljaCBtdXN0IGRlZmluZSBgcmVuZGVyYCkuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBDb21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNyZWF0ZUNsYXNzOiBmdW5jdGlvbiAoc3BlYykge1xuICAgIHZhciBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvciwgJ1NvbWV0aGluZyBpcyBjYWxsaW5nIGEgUmVhY3QgY29tcG9uZW50IGRpcmVjdGx5LiBVc2UgYSBmYWN0b3J5IG9yICcgKyAnSlNYIGluc3RlYWQuIFNlZTogaHR0cHM6Ly9mYi5tZS9yZWFjdC1sZWdhY3lmYWN0b3J5JykgOiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIC8vIFdpcmUgdXAgYXV0by1iaW5kaW5nXG4gICAgICBpZiAodGhpcy5fX3JlYWN0QXV0b0JpbmRQYWlycy5sZW5ndGgpIHtcbiAgICAgICAgYmluZEF1dG9CaW5kTWV0aG9kcyh0aGlzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IG51bGw7XG5cbiAgICAgIC8vIFJlYWN0Q2xhc3NlcyBkb2Vzbid0IGhhdmUgY29uc3RydWN0b3JzLiBJbnN0ZWFkLCB0aGV5IHVzZSB0aGVcbiAgICAgIC8vIGdldEluaXRpYWxTdGF0ZSBhbmQgY29tcG9uZW50V2lsbE1vdW50IG1ldGhvZHMgZm9yIGluaXRpYWxpemF0aW9uLlxuXG4gICAgICB2YXIgaW5pdGlhbFN0YXRlID0gdGhpcy5nZXRJbml0aWFsU3RhdGUgPyB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgICB0aGlzLnN0YXRlID0gaW5pdGlhbFN0YXRlO1xuICAgIH07XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50U2hvdWxkVXBkYXRlLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFNob3VsZFVwZGF0ZSgpLiBEaWQgeW91IG1lYW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCk/ICcgKyAnVGhlIG5hbWUgaXMgcGhyYXNlZCBhcyBhIHF1ZXN0aW9uIGJlY2F1c2UgdGhlIGZ1bmN0aW9uIGlzICcgKyAnZXhwZWN0ZWQgdG8gcmV0dXJuIGEgdmFsdWUuJywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2xhc3MuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlTG9jYXRpb25zXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5TWlycm9yID0gcmVxdWlyZSgnZmJqcy9saWIva2V5TWlycm9yJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25zID0ga2V5TWlycm9yKHtcbiAgcHJvcDogbnVsbCxcbiAgY29udGV4dDogbnVsbCxcbiAgY2hpbGRDb250ZXh0OiBudWxsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25zO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCcuL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gZW51bWVyYXRpb24gd2l0aCBrZXlzIGVxdWFsIHRvIHRoZWlyIHZhbHVlLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqICAgdmFyIENPTE9SUyA9IGtleU1pcnJvcih7Ymx1ZTogbnVsbCwgcmVkOiBudWxsfSk7XG4gKiAgIHZhciBteUNvbG9yID0gQ09MT1JTLmJsdWU7XG4gKiAgIHZhciBpc0NvbG9yVmFsaWQgPSAhIUNPTE9SU1tteUNvbG9yXTtcbiAqXG4gKiBUaGUgbGFzdCBsaW5lIGNvdWxkIG5vdCBiZSBwZXJmb3JtZWQgaWYgdGhlIHZhbHVlcyBvZiB0aGUgZ2VuZXJhdGVkIGVudW0gd2VyZVxuICogbm90IGVxdWFsIHRvIHRoZWlyIGtleXMuXG4gKlxuICogICBJbnB1dDogIHtrZXkxOiB2YWwxLCBrZXkyOiB2YWwyfVxuICogICBPdXRwdXQ6IHtrZXkxOiBrZXkxLCBrZXkyOiBrZXkyfVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xudmFyIGtleU1pcnJvciA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAhKG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZianMvbGliL2tleU1pcnJvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuLyoqXG4gKiBBbGxvd3MgZXh0cmFjdGlvbiBvZiBhIG1pbmlmaWVkIGtleS4gTGV0J3MgdGhlIGJ1aWxkIHN5c3RlbSBtaW5pZnkga2V5c1xuICogd2l0aG91dCBsb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG52YXIga2V5T2YgPSBmdW5jdGlvbiAob25lS2V5T2JqKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIG9uZUtleU9iaikge1xuICAgIGlmICghb25lS2V5T2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlPZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9rZXlPZi5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RE9NRmFjdG9yaWVzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuXG52YXIgbWFwT2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvbWFwT2JqZWN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgSFRNTCB0YWcgZWxlbWVudHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUYWcgbmFtZSAoZS5nLiBgZGl2YCkuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVET01GYWN0b3J5KHRhZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHJldHVybiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeSh0YWcpO1xuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSh0YWcpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIGZyb20gc3VwcG9ydGVkIEhUTUwgdGFncyB0byBgUmVhY3RET01Db21wb25lbnRgIGNsYXNzZXMuXG4gKiBUaGlzIGlzIGFsc28gYWNjZXNzaWJsZSB2aWEgYFJlYWN0LkRPTWAuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSBtYXBPYmplY3Qoe1xuICBhOiAnYScsXG4gIGFiYnI6ICdhYmJyJyxcbiAgYWRkcmVzczogJ2FkZHJlc3MnLFxuICBhcmVhOiAnYXJlYScsXG4gIGFydGljbGU6ICdhcnRpY2xlJyxcbiAgYXNpZGU6ICdhc2lkZScsXG4gIGF1ZGlvOiAnYXVkaW8nLFxuICBiOiAnYicsXG4gIGJhc2U6ICdiYXNlJyxcbiAgYmRpOiAnYmRpJyxcbiAgYmRvOiAnYmRvJyxcbiAgYmlnOiAnYmlnJyxcbiAgYmxvY2txdW90ZTogJ2Jsb2NrcXVvdGUnLFxuICBib2R5OiAnYm9keScsXG4gIGJyOiAnYnInLFxuICBidXR0b246ICdidXR0b24nLFxuICBjYW52YXM6ICdjYW52YXMnLFxuICBjYXB0aW9uOiAnY2FwdGlvbicsXG4gIGNpdGU6ICdjaXRlJyxcbiAgY29kZTogJ2NvZGUnLFxuICBjb2w6ICdjb2wnLFxuICBjb2xncm91cDogJ2NvbGdyb3VwJyxcbiAgZGF0YTogJ2RhdGEnLFxuICBkYXRhbGlzdDogJ2RhdGFsaXN0JyxcbiAgZGQ6ICdkZCcsXG4gIGRlbDogJ2RlbCcsXG4gIGRldGFpbHM6ICdkZXRhaWxzJyxcbiAgZGZuOiAnZGZuJyxcbiAgZGlhbG9nOiAnZGlhbG9nJyxcbiAgZGl2OiAnZGl2JyxcbiAgZGw6ICdkbCcsXG4gIGR0OiAnZHQnLFxuICBlbTogJ2VtJyxcbiAgZW1iZWQ6ICdlbWJlZCcsXG4gIGZpZWxkc2V0OiAnZmllbGRzZXQnLFxuICBmaWdjYXB0aW9uOiAnZmlnY2FwdGlvbicsXG4gIGZpZ3VyZTogJ2ZpZ3VyZScsXG4gIGZvb3RlcjogJ2Zvb3RlcicsXG4gIGZvcm06ICdmb3JtJyxcbiAgaDE6ICdoMScsXG4gIGgyOiAnaDInLFxuICBoMzogJ2gzJyxcbiAgaDQ6ICdoNCcsXG4gIGg1OiAnaDUnLFxuICBoNjogJ2g2JyxcbiAgaGVhZDogJ2hlYWQnLFxuICBoZWFkZXI6ICdoZWFkZXInLFxuICBoZ3JvdXA6ICdoZ3JvdXAnLFxuICBocjogJ2hyJyxcbiAgaHRtbDogJ2h0bWwnLFxuICBpOiAnaScsXG4gIGlmcmFtZTogJ2lmcmFtZScsXG4gIGltZzogJ2ltZycsXG4gIGlucHV0OiAnaW5wdXQnLFxuICBpbnM6ICdpbnMnLFxuICBrYmQ6ICdrYmQnLFxuICBrZXlnZW46ICdrZXlnZW4nLFxuICBsYWJlbDogJ2xhYmVsJyxcbiAgbGVnZW5kOiAnbGVnZW5kJyxcbiAgbGk6ICdsaScsXG4gIGxpbms6ICdsaW5rJyxcbiAgbWFpbjogJ21haW4nLFxuICBtYXA6ICdtYXAnLFxuICBtYXJrOiAnbWFyaycsXG4gIG1lbnU6ICdtZW51JyxcbiAgbWVudWl0ZW06ICdtZW51aXRlbScsXG4gIG1ldGE6ICdtZXRhJyxcbiAgbWV0ZXI6ICdtZXRlcicsXG4gIG5hdjogJ25hdicsXG4gIG5vc2NyaXB0OiAnbm9zY3JpcHQnLFxuICBvYmplY3Q6ICdvYmplY3QnLFxuICBvbDogJ29sJyxcbiAgb3B0Z3JvdXA6ICdvcHRncm91cCcsXG4gIG9wdGlvbjogJ29wdGlvbicsXG4gIG91dHB1dDogJ291dHB1dCcsXG4gIHA6ICdwJyxcbiAgcGFyYW06ICdwYXJhbScsXG4gIHBpY3R1cmU6ICdwaWN0dXJlJyxcbiAgcHJlOiAncHJlJyxcbiAgcHJvZ3Jlc3M6ICdwcm9ncmVzcycsXG4gIHE6ICdxJyxcbiAgcnA6ICdycCcsXG4gIHJ0OiAncnQnLFxuICBydWJ5OiAncnVieScsXG4gIHM6ICdzJyxcbiAgc2FtcDogJ3NhbXAnLFxuICBzY3JpcHQ6ICdzY3JpcHQnLFxuICBzZWN0aW9uOiAnc2VjdGlvbicsXG4gIHNlbGVjdDogJ3NlbGVjdCcsXG4gIHNtYWxsOiAnc21hbGwnLFxuICBzb3VyY2U6ICdzb3VyY2UnLFxuICBzcGFuOiAnc3BhbicsXG4gIHN0cm9uZzogJ3N0cm9uZycsXG4gIHN0eWxlOiAnc3R5bGUnLFxuICBzdWI6ICdzdWInLFxuICBzdW1tYXJ5OiAnc3VtbWFyeScsXG4gIHN1cDogJ3N1cCcsXG4gIHRhYmxlOiAndGFibGUnLFxuICB0Ym9keTogJ3Rib2R5JyxcbiAgdGQ6ICd0ZCcsXG4gIHRleHRhcmVhOiAndGV4dGFyZWEnLFxuICB0Zm9vdDogJ3Rmb290JyxcbiAgdGg6ICd0aCcsXG4gIHRoZWFkOiAndGhlYWQnLFxuICB0aW1lOiAndGltZScsXG4gIHRpdGxlOiAndGl0bGUnLFxuICB0cjogJ3RyJyxcbiAgdHJhY2s6ICd0cmFjaycsXG4gIHU6ICd1JyxcbiAgdWw6ICd1bCcsXG4gICd2YXInOiAndmFyJyxcbiAgdmlkZW86ICd2aWRlbycsXG4gIHdicjogJ3dicicsXG5cbiAgLy8gU1ZHXG4gIGNpcmNsZTogJ2NpcmNsZScsXG4gIGNsaXBQYXRoOiAnY2xpcFBhdGgnLFxuICBkZWZzOiAnZGVmcycsXG4gIGVsbGlwc2U6ICdlbGxpcHNlJyxcbiAgZzogJ2cnLFxuICBpbWFnZTogJ2ltYWdlJyxcbiAgbGluZTogJ2xpbmUnLFxuICBsaW5lYXJHcmFkaWVudDogJ2xpbmVhckdyYWRpZW50JyxcbiAgbWFzazogJ21hc2snLFxuICBwYXRoOiAncGF0aCcsXG4gIHBhdHRlcm46ICdwYXR0ZXJuJyxcbiAgcG9seWdvbjogJ3BvbHlnb24nLFxuICBwb2x5bGluZTogJ3BvbHlsaW5lJyxcbiAgcmFkaWFsR3JhZGllbnQ6ICdyYWRpYWxHcmFkaWVudCcsXG4gIHJlY3Q6ICdyZWN0JyxcbiAgc3RvcDogJ3N0b3AnLFxuICBzdmc6ICdzdmcnLFxuICB0ZXh0OiAndGV4dCcsXG4gIHRzcGFuOiAndHNwYW4nXG5cbn0sIGNyZWF0ZURPTUZhY3RvcnkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NRmFjdG9yaWVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RWxlbWVudFZhbGlkYXRvclxuICovXG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9ucycpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIGFkZGVuZGEgPSBnZXRBZGRlbmRhRm9yS2V5VXNlKCd1bmlxdWVLZXknLCBlbGVtZW50LCBwYXJlbnRUeXBlKTtcbiAgaWYgKGFkZGVuZGEgPT09IG51bGwpIHtcbiAgICAvLyB3ZSBhbHJlYWR5IHNob3dlZCB0aGUgd2FybmluZ1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyVzJywgYWRkZW5kYS5wYXJlbnRPck93bmVyIHx8ICcnLCBhZGRlbmRhLmNoaWxkT3duZXIgfHwgJycsIGFkZGVuZGEudXJsIHx8ICcnKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBTaGFyZWQgd2FybmluZyBhbmQgbW9uaXRvcmluZyBjb2RlIGZvciB0aGUga2V5IHdhcm5pbmdzLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VUeXBlIEEga2V5IHVzZWQgZm9yIGRlLWR1cGluZyB3YXJuaW5ncy5cbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IENvbXBvbmVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICogQHJldHVybnMgez9vYmplY3R9IEEgc2V0IG9mIGFkZGVuZGEgdG8gdXNlIGluIHRoZSB3YXJuaW5nIG1lc3NhZ2UsIG9yIG51bGxcbiAqIGlmIHRoZSB3YXJuaW5nIGhhcyBhbHJlYWR5IGJlZW4gc2hvd24gYmVmb3JlIChhbmQgc2hvdWxkbid0IGJlIHNob3duIGFnYWluKS5cbiAqL1xuZnVuY3Rpb24gZ2V0QWRkZW5kYUZvcktleVVzZShtZXNzYWdlVHlwZSwgZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICB2YXIgYWRkZW5kdW0gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgaWYgKCFhZGRlbmR1bSkge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBhZGRlbmR1bSA9ICcgQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtZW1vaXplciA9IG93bmVySGFzS2V5VXNlV2FybmluZ1ttZXNzYWdlVHlwZV0gfHwgKG93bmVySGFzS2V5VXNlV2FybmluZ1ttZXNzYWdlVHlwZV0gPSB7fSk7XG4gIGlmIChtZW1vaXplclthZGRlbmR1bV0pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBtZW1vaXplclthZGRlbmR1bV0gPSB0cnVlO1xuXG4gIHZhciBhZGRlbmRhID0ge1xuICAgIHBhcmVudE9yT3duZXI6IGFkZGVuZHVtLFxuICAgIHVybDogJyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJyxcbiAgICBjaGlsZE93bmVyOiBudWxsXG4gIH07XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgYWRkZW5kYS5jaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nO1xuICB9XG5cbiAgcmV0dXJuIGFkZGVuZGE7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KGNoaWxkLCBwYXJlbnRUeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG4gICAgLy8gRW50cnkgaXRlcmF0b3JzIHByb3ZpZGUgaW1wbGljaXQga2V5cy5cbiAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IG5vZGUuZW50cmllcykge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobm9kZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgcHJvcHMgYXJlIHZhbGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wVHlwZXMgTWFwIG9mIHByb3AgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXMoY29tcG9uZW50TmFtZSwgcHJvcFR5cGVzLCBwcm9wcywgbG9jYXRpb24pIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzKSB7XG4gICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAhKHR5cGVvZiBwcm9wVHlwZXNbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICBlcnJvciA9IHByb3BUeXBlc1twcm9wTmFtZV0ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbik7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgcHJvcE5hbWUsIHR5cGVvZiBlcnJvcikgOiB2b2lkIDA7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB2YXIgYWRkZW5kdW0gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgcHJvcFR5cGU6ICVzJXMnLCBlcnJvci5tZXNzYWdlLCBhZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgaWYgKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcykge1xuICAgIGNoZWNrUHJvcFR5cGVzKG5hbWUsIGNvbXBvbmVudENsYXNzLnByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKTtcbiAgfVxuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh2YWxpZFR5cGUsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIHNob3VsZCBub3QgYmUgbnVsbCwgdW5kZWZpbmVkLCBib29sZWFuLCBvciAnICsgJ251bWJlci4gSXQgc2hvdWxkIGJlIGEgc3RyaW5nIChmb3IgRE9NIGVsZW1lbnRzKSBvciBhIFJlYWN0Q2xhc3MgJyArICcoZm9yIGNvbXBvc2l0ZSBjb21wb25lbnRzKS4lcycsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpKSA6IHZvaWQgMDtcblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJykgOiB2b2lkIDA7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG4gIH0sXG5cbiAgY2xvbmVFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgICB9XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3I7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0RWxlbWVudFZhbGlkYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGBjYWxsYmFja2Agb25jZSBmb3IgZWFjaCBlbnVtZXJhYmxlIG93biBwcm9wZXJ0eSBpbiB0aGVcbiAqIG9iamVjdCBhbmQgY29uc3RydWN0cyBhIG5ldyBvYmplY3QgZnJvbSB0aGUgcmVzdWx0cy4gVGhlIGBjYWxsYmFja2AgaXNcbiAqIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6XG4gKlxuICogIC0gdGhlIHByb3BlcnR5IHZhbHVlXG4gKiAgLSB0aGUgcHJvcGVydHkgbmFtZVxuICogIC0gdGhlIG9iamVjdCBiZWluZyB0cmF2ZXJzZWRcbiAqXG4gKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIGFkZGVkIGFmdGVyIHRoZSBjYWxsIHRvIGBtYXBPYmplY3RgIHdpbGwgbm90IGJlIHZpc2l0ZWRcbiAqIGJ5IGBjYWxsYmFja2AuIElmIHRoZSB2YWx1ZXMgb2YgZXhpc3RpbmcgcHJvcGVydGllcyBhcmUgY2hhbmdlZCwgdGhlIHZhbHVlXG4gKiBwYXNzZWQgdG8gYGNhbGxiYWNrYCB3aWxsIGJlIHRoZSB2YWx1ZSBhdCB0aGUgdGltZSBgbWFwT2JqZWN0YCB2aXNpdHMgdGhlbS5cbiAqIFByb3BlcnRpZXMgdGhhdCBhcmUgZGVsZXRlZCBiZWZvcmUgYmVpbmcgdmlzaXRlZCBhcmUgbm90IHZpc2l0ZWQuXG4gKlxuICogQGdyZXAgZnVuY3Rpb24gb2JqZWN0TWFwKClcbiAqIEBncmVwIGZ1bmN0aW9uIG9iak1hcCgpXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0geyp9IGNvbnRleHRcbiAqIEByZXR1cm4gez9vYmplY3R9XG4gKi9cbmZ1bmN0aW9uIG1hcE9iamVjdChvYmplY3QsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gIGlmICghb2JqZWN0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpIHtcbiAgICAgIHJlc3VsdFtuYW1lXSA9IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgb2JqZWN0W25hbWVdLCBuYW1lLCBvYmplY3QpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcE9iamVjdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mYmpzL2xpYi9tYXBPYmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFByb3BUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcblxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICpcbiAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAqXG4gKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAqICAgICB9LFxuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gKiAgIH0pO1xuICpcbiAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAqXG4gKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICpcbiAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgIHByb3BUeXBlczoge1xuICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICogICAgICAgICAgKTtcbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgIH0sXG4gKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAqICB9KTtcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG52YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG52YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG5cbiAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxufTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG4vKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG4gICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignUmVxdWlyZWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCB3YXMgbm90IHNwZWNpZmllZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMobnVsbCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nKTtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXkpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG5mdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG4gIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG5mdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gJ2RhdGUnO1xuICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbmZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgfVxuICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXM7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RWZXJzaW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICcxNS4wLjAnO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFZlcnNpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBvbmx5Q2hpbGRcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXNcbiAqIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZVxuICogcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0byBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZVxuICogb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0Q29tcG9uZW50YCBjb250YWluZWQgaW4gdGhlXG4gKiBzdHJ1Y3R1cmUuXG4gKi9cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdvbmx5Q2hpbGQgbXVzdCBiZSBwYXNzZWQgYSBjaGlsZHJlbiB3aXRoIGV4YWN0bHkgb25lIGNoaWxkLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvb25seUNoaWxkLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcbnZhciBSZWFjdFZlcnNpb24gPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RWZXJzaW9uJyk7XG5cbnZhciBSZWFjdEFueXRoaW5nTW91bnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdNb3VudCcpO1xudmFyIFJlYWN0QW55dGhpbmdJbmplY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdJbmplY3Rpb24nKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciByZW5kZXIgPSBSZWFjdFBlcmYubWVhc3VyZSgnUmVhY3QnLCAncmVuZGVyJywgUmVhY3RBbnl0aGluZ01vdW50LnJlbmRlcik7XG5cblxudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmcgPSBmdW5jdGlvbiAoUmVhY3QsIG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgUmVhY3RBbnl0aGluZ0luamVjdGlvbi5pbmplY3QobmF0aXZlSW1wbGVtZW50YXRpb24pO1xuXG4gICAgdmFyIFJlYWN0QW55dGhpbmcgPSB7XG4gICAgICAgIFJlYWN0OiBSZWFjdCxcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHZlcnNpb246IFJlYWN0VmVyc2lvbixcbiAgICAgICAgY29tcG9uZW50czogKG5hdGl2ZUltcGxlbWVudGF0aW9uLmNvbXBvbmVudHMudHlwZXMgfHwgW10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB0YWcpIHtcbiAgICAgICAgICAgIGFjY1t0YWddID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pXG4gICAgfTtcblxuICAgIHJldHVybiBSZWFjdEFueXRoaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSZWFjdEFueXRoaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmcuanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFBlcmZcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVhY3RQZXJmIGlzIGEgZ2VuZXJhbCBBT1Agc3lzdGVtIGRlc2lnbmVkIHRvIG1lYXN1cmUgcGVyZm9ybWFuY2UuIFRoaXNcbiAqIG1vZHVsZSBvbmx5IGhhcyB0aGUgaG9va3M6IHNlZSBSZWFjdERlZmF1bHRQZXJmIGZvciB0aGUgYW5hbHlzaXMgdG9vbC5cbiAqL1xuXG52YXIgUmVhY3RQZXJmID0ge1xuICAvKipcbiAgICogQm9vbGVhbiB0byBlbmFibGUvZGlzYWJsZSBtZWFzdXJlbWVudC4gU2V0IHRvIGZhbHNlIGJ5IGRlZmF1bHQgdG8gcHJldmVudFxuICAgKiBhY2NpZGVudGFsIGxvZ2dpbmcgYW5kIHBlcmYgbG9zcy5cbiAgICovXG4gIGVuYWJsZU1lYXN1cmU6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBIb2xkcyBvbnRvIHRoZSBtZWFzdXJlIGZ1bmN0aW9uIGluIHVzZS4gQnkgZGVmYXVsdCwgZG9uJ3QgbWVhc3VyZVxuICAgKiBhbnl0aGluZywgYnV0IHdlJ2xsIG92ZXJyaWRlIHRoaXMgaWYgd2UgaW5qZWN0IGEgbWVhc3VyZSBmdW5jdGlvbi5cbiAgICovXG4gIHN0b3JlZE1lYXN1cmU6IF9ub01lYXN1cmUsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9iamVjdE5hbWVcbiAgICogQHBhcmFtIHtvYmplY3Q8c3RyaW5nPn0gbWV0aG9kTmFtZXNcbiAgICovXG4gIG1lYXN1cmVNZXRob2RzOiBmdW5jdGlvbiAob2JqZWN0LCBvYmplY3ROYW1lLCBtZXRob2ROYW1lcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kTmFtZXMpIHtcbiAgICAgICAgaWYgKCFtZXRob2ROYW1lcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgb2JqZWN0W2tleV0gPSBSZWFjdFBlcmYubWVhc3VyZShvYmplY3ROYW1lLCBtZXRob2ROYW1lc1trZXldLCBvYmplY3Rba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyB0byB3cmFwIG1ldGhvZHMgeW91IHdhbnQgdG8gbWVhc3VyZS4gWmVybyBvdmVyaGVhZCBpbiBwcm9kdWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb2JqTmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm5OYW1lXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICogQHJldHVybiB7ZnVuY3Rpb259XG4gICAqL1xuICBtZWFzdXJlOiBmdW5jdGlvbiAob2JqTmFtZSwgZm5OYW1lLCBmdW5jKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtZWFzdXJlZEZ1bmMgPSBudWxsO1xuICAgICAgdmFyIHdyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChSZWFjdFBlcmYuZW5hYmxlTWVhc3VyZSkge1xuICAgICAgICAgIGlmICghbWVhc3VyZWRGdW5jKSB7XG4gICAgICAgICAgICBtZWFzdXJlZEZ1bmMgPSBSZWFjdFBlcmYuc3RvcmVkTWVhc3VyZShvYmpOYW1lLCBmbk5hbWUsIGZ1bmMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWVhc3VyZWRGdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICB3cmFwcGVyLmRpc3BsYXlOYW1lID0gb2JqTmFtZSArICdfJyArIGZuTmFtZTtcbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cbiAgICByZXR1cm4gZnVuYztcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZWFzdXJlXG4gICAgICovXG4gICAgaW5qZWN0TWVhc3VyZTogZnVuY3Rpb24gKG1lYXN1cmUpIHtcbiAgICAgIFJlYWN0UGVyZi5zdG9yZWRNZWFzdXJlID0gbWVhc3VyZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogU2ltcGx5IHBhc3NlcyB0aHJvdWdoIHRoZSBtZWFzdXJlZCBmdW5jdGlvbiwgd2l0aG91dCBtZWFzdXJpbmcgaXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG9iak5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmbk5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBfbm9NZWFzdXJlKG9iak5hbWUsIGZuTmFtZSwgZnVuYykge1xuICByZXR1cm4gZnVuYztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFBlcmY7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0UGVyZi5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdE1vdW50LmpzXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFVwZGF0ZVF1ZXVlJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VXBkYXRlcycpO1xudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG52YXIgaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgUmVhY3RBbnl0aGluZ0NvbnRhaW5lckluZm8gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdDb250YWluZXJJbmZvJyk7XG5cbnZhciBtb3VudGVkUm9vdENvbXBvbmVudHMgPSB7fTtcbnZhciBtb3VudGVkSW1hZ2VzID0ge307XG52YXIgX19ERVZfXyA9IHRydWU7XG5cblxuZnVuY3Rpb24gYmF0Y2hlZE1vdW50Q29tcG9uZW50SW50b05vZGUoY29tcG9uZW50SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUsIGNvbnRleHQpIHtcbiAgICB2YXIgdHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5nZXRQb29sZWQoZmFsc2UpO1xuICAgIHRyYW5zYWN0aW9uLnBlcmZvcm0oXG4gICAgICAgIG1vdW50Q29tcG9uZW50SW50b05vZGUsXG4gICAgICAgIG51bGwsXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgY29udGV4dFxuICAgICk7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24ucmVsZWFzZSh0cmFuc2FjdGlvbik7XG59XG5cblxuZnVuY3Rpb24gbW91bnRDb21wb25lbnRJbnRvTm9kZShjb21wb25lbnRJbnN0YW5jZSwgY29udGFpbmVyTmFtZSwgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgbWFya2VyTmFtZTtcbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjb21wb25lbnRJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQ7XG4gICAgICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgICAgICBtYXJrZXJOYW1lID0gJ1JlYWN0IG1vdW50OiAnICsgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUgOlxuICAgICAgICAgICAgICAgIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICBjb25zb2xlLnRpbWUobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudChcbiAgICAgICAgY29tcG9uZW50SW5zdGFuY2UsXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBudWxsLFxuICAgICAgICBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbyhjb21wb25lbnRJbnN0YW5jZSwgY29udGFpbmVyTmFtZSksXG4gICAgICAgIGNvbnRleHRcbiAgICApO1xuXG4gICAgaWYgKG1hcmtlck5hbWUpIHtcbiAgICAgICAgY29uc29sZS50aW1lRW5kKG1hcmtlck5hbWUpO1xuICAgIH1cblxuICAgIFJlYWN0QW55dGhpbmdNb3VudC5fbW91bnRJbWFnZUludG9Ob2RlKFxuICAgICAgICBtYXJrdXAsXG4gICAgICAgIGNvbnRhaW5lck5hbWUsXG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgY29udGV4dFxuICAgICk7XG59XG5cblxudmFyIFJlYWN0QW55dGhpbmdNb3VudCA9IHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChuZXh0RWxlbWVudCwgY29udGFpbmVyTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG5leHRFbGVtZW50KSxcbiAgICAgICAgICAgICdSZWFjdEFueXRpbmcucmVuZGVyKCk6IEludmFsaWQgY29tcG9uZW50IGVsZW1lbnQuJXMnLFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIHR5cGVvZiBuZXh0RWxlbWVudCA9PT0gJ3N0cmluZycgP1xuICAgICAgICAgICAgICAgICcgSW5zdGVhZCBvZiBwYXNzaW5nIGEgc3RyaW5nIGxpa2UgXFwnZGl2XFwnLCBwYXNzICcgK1xuICAgICAgICAgICAgICAgICdSZWFjdC5jcmVhdGVFbGVtZW50KFxcJ2RpdlxcJykgb3IgPGRpdiAvPi4nIDpcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5leHRFbGVtZW50ID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgICAgICAgJyBJbnN0ZWFkIG9mIHBhc3NpbmcgYSBjbGFzcyBsaWtlIEZvbywgcGFzcyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQoRm9vKSBvciA8Rm9vIC8+LicgOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXQgcXVhY2tzIGxpa2UgYW4gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQgIT0gbnVsbCAmJiBuZXh0RWxlbWVudC5wcm9wcyAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICcgVGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHVuaW50ZW50aW9uYWxseSBsb2FkaW5nIHR3byBpbmRlcGVuZGVudCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb3BpZXMgb2YgUmVhY3QuJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgY29udGFpbmVyTmFtZSAmJiB0eXBlb2YgY29udGFpbmVyTmFtZSA9PT0gJ3N0cmluZycsXG4gICAgICAgICAgICAncmVuZGVyKCk6IGNvbnRhaW5lck5hbWUgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgcHJldkNvbXBvbmVudCA9IG1vdW50ZWRSb290Q29tcG9uZW50c1tjb250YWluZXJOYW1lXTtcblxuICAgICAgICBpZiAocHJldkNvbXBvbmVudCkge1xuICAgICAgICAgICAgdmFyIHByZXZFbGVtZW50ID0gcHJldkNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB1YmxpY0luc3QgPSBwcmV2Q29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudC5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgIHZhciB1cGRhdGVkQ2FsbGJhY2sgPSBjYWxsYmFjayAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHB1YmxpY0luc3QpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFJlYWN0QW55dGhpbmdNb3VudC5fdXBkYXRlUm9vdENvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgICAgcHJldkNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRDYWxsYmFja1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1YmxpY0luc3Q7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFJlYWN0QW55dGhpbmdNb3VudC5fdW5tb3VudFJvb3RDb21wb25lbnQoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21wb25lbnQgPSBSZWFjdEFueXRoaW5nTW91bnQuX3JlbmRlck5ld1Jvb3RDb21wb25lbnQobmV4dEVsZW1lbnQsIGNvbnRhaW5lck5hbWUpO1xuXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfSxcblxuICAgIF91cGRhdGVSb290Q29tcG9uZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcblxuICAgIF91bm1vdW50Um9vdENvbXBvbmVudDogZnVuY3Rpb24gKGNvbnRhaW5lck5hbWUpIHtcbiAgICB9LFxuICAgIFxuICAgIF9yZW5kZXJOZXdSb290Q29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIGNvbnRhaW5lck5hbWUpIHtcbiAgICAgICAgLy8gVmFyaW91cyBwYXJ0cyBvZiBvdXIgY29kZSAoc3VjaCBhcyBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCdzXG4gICAgICAgIC8vIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQpIGFzc3VtZSB0aGF0IGNhbGxzIHRvIHJlbmRlciBhcmVuJ3QgbmVzdGVkO1xuICAgICAgICAvLyB2ZXJpZnkgdGhhdCB0aGF0J3MgdGhlIGNhc2UuXG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID09IG51bGwsXG4gICAgICAgICAgICAnX3JlbmRlck5ld1Jvb3RDb21wb25lbnQoKTogUmVuZGVyIG1ldGhvZHMgc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiAnICtcbiAgICAgICAgICAgICdvZiBwcm9wcyBhbmQgc3RhdGU7IHRyaWdnZXJpbmcgbmVzdGVkIGNvbXBvbmVudCB1cGRhdGVzIGZyb20gJyArXG4gICAgICAgICAgICAncmVuZGVyIGlzIG5vdCBhbGxvd2VkLiBJZiBuZWNlc3NhcnksIHRyaWdnZXIgbmVzdGVkIHVwZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAnY29tcG9uZW50RGlkVXBkYXRlLiBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiAlcy4nLFxuICAgICAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKSB8fFxuICAgICAgICAgICAgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50J1xuICAgICAgICApO1xuXG4gICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGNvbnRhaW5lck5hbWUgJiYgdHlwZW9mIGNvbnRhaW5lck5hbWUgPT09ICdzdHJpbmcnLFxuICAgICAgICAgICAgJ19yZWdpc3RlckNvbXBvbmVudCguLi4pOiBUYXJnZXQgY29udGFpbmVyTmFtZSBpcyBub3QgYSBzdHJpbmcuJ1xuICAgICAgICApO1xuXG4gICAgICAgIHZhciBjb21wb25lbnRJbnN0YW5jZSA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobmV4dEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFRoZSBpbml0aWFsIHJlbmRlciBpcyBzeW5jaHJvbm91cyBidXQgYW55IHVwZGF0ZXMgdGhhdCBoYXBwZW4gZHVyaW5nXG4gICAgICAgIC8vIHJlbmRlcmluZywgaW4gY29tcG9uZW50V2lsbE1vdW50IG9yIGNvbXBvbmVudERpZE1vdW50LCB3aWxsIGJlIGJhdGNoZWRcbiAgICAgICAgLy8gYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGJhdGNoaW5nIHN0cmF0ZWd5LlxuXG4gICAgICAgIFJlYWN0VXBkYXRlcy5iYXRjaGVkVXBkYXRlcyhcbiAgICAgICAgICAgIGJhdGNoZWRNb3VudENvbXBvbmVudEludG9Ob2RlLFxuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UsXG4gICAgICAgICAgICBjb250YWluZXJOYW1lLFxuICAgICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIG1vdW50ZWRSb290Q29tcG9uZW50c1tjb250YWluZXJOYW1lXSA9IGNvbXBvbmVudEluc3RhbmNlO1xuXG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25Nb3VudFJvb3RDb21wb25lbnQoY29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudEluc3RhbmNlO1xuICAgIH0sXG5cblxuICAgIF9tb3VudEltYWdlSW50b05vZGU6IGZ1bmN0aW9uIChtYXJrdXAsIGNvbnRhaW5lck5hbWUsIGltYWdlLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICB0eXBlb2YgY29udGFpbmVyTmFtZSA9PT0gJ3N0cmluZycsXG4gICAgICAgICAgICAnbW91bnRDb21wb25lbnRJbnRvTm9kZSguLi4pOiBUYXJnZXQgY29udGFpbmVyIGlzIG5vdCB2YWxpZC4nXG4gICAgICAgICk7XG5cbiAgICAgICAgbW91bnRlZEltYWdlc1tjb250YWluZXJOYW1lXSA9IGltYWdlO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RBbnl0aGluZ01vdW50O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdNb3VudC5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VXBkYXRlUXVldWVcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdEluc3RhbmNlTWFwID0gcmVxdWlyZSgnLi9SZWFjdEluc3RhbmNlTWFwJyk7XG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgnLi9SZWFjdFVwZGF0ZXMnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSkge1xuICBSZWFjdFVwZGF0ZXMuZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VW5leHBlY3RlZEFyZ3VtZW50KGFyZykge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBhcmc7XG4gIGlmICh0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG4gIHZhciBkaXNwbGF5TmFtZSA9IGFyZy5jb25zdHJ1Y3RvciAmJiBhcmcuY29uc3RydWN0b3IubmFtZSB8fCB0eXBlO1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFyZyk7XG4gIGlmIChrZXlzLmxlbmd0aCA+IDAgJiYga2V5cy5sZW5ndGggPCAyMCkge1xuICAgIHJldHVybiBkaXNwbGF5TmFtZSArICcgKGtleXM6ICcgKyBrZXlzLmpvaW4oJywgJykgKyAnKSc7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXlOYW1lO1xufVxuXG5mdW5jdGlvbiBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBSZWFjdEluc3RhbmNlTWFwLmdldChwdWJsaWNJbnN0YW5jZSk7XG4gIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBPbmx5IHdhcm4gd2hlbiB3ZSBoYXZlIGEgY2FsbGVyTmFtZS4gT3RoZXJ3aXNlIHdlIHNob3VsZCBiZSBzaWxlbnQuXG4gICAgICAvLyBXZSdyZSBwcm9iYWJseSBjYWxsaW5nIGZyb20gZW5xdWV1ZUNhbGxiYWNrLiBXZSBkb24ndCB3YW50IHRvIHdhcm5cbiAgICAgIC8vIHRoZXJlIGJlY2F1c2Ugd2UgYWxyZWFkeSB3YXJuZWQgZm9yIHRoZSBjb3JyZXNwb25kaW5nIGxpZmVjeWNsZSBtZXRob2QuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghY2FsbGVyTmFtZSwgJyVzKC4uLik6IENhbiBvbmx5IHVwZGF0ZSBhIG1vdW50ZWQgb3IgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb24gYW4gdW5tb3VudGVkIGNvbXBvbmVudC4gJyArICdUaGlzIGlzIGEgbm8tb3AuIFBsZWFzZSBjaGVjayB0aGUgY29kZSBmb3IgdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjYWxsZXJOYW1lLCBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID09IG51bGwsICclcyguLi4pOiBDYW5ub3QgdXBkYXRlIGR1cmluZyBhbiBleGlzdGluZyBzdGF0ZSB0cmFuc2l0aW9uIChzdWNoIGFzICcgKyAnd2l0aGluIGByZW5kZXJgIG9yIGFub3RoZXIgY29tcG9uZW50XFwncyBjb25zdHJ1Y3RvcikuIFJlbmRlciBtZXRob2RzICcgKyAnc2hvdWxkIGJlIGEgcHVyZSBmdW5jdGlvbiBvZiBwcm9wcyBhbmQgc3RhdGU7IGNvbnN0cnVjdG9yICcgKyAnc2lkZS1lZmZlY3RzIGFyZSBhbiBhbnRpLXBhdHRlcm4sIGJ1dCBjYW4gYmUgbW92ZWQgdG8gJyArICdgY29tcG9uZW50V2lsbE1vdW50YC4nLCBjYWxsZXJOYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIHJldHVybiBpbnRlcm5hbEluc3RhbmNlO1xufVxuXG4vKipcbiAqIFJlYWN0VXBkYXRlUXVldWUgYWxsb3dzIGZvciBzdGF0ZSB1cGRhdGVzIHRvIGJlIHNjaGVkdWxlZCBpbnRvIGEgbGF0ZXJcbiAqIHJlY29uY2lsaWF0aW9uIHN0ZXAuXG4gKi9cbnZhciBSZWFjdFVwZGF0ZVF1ZXVlID0ge1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgICAgaWYgKG93bmVyICE9PSBudWxsKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKG93bmVyLl93YXJuZWRBYm91dFJlZnNJblJlbmRlciwgJyVzIGlzIGFjY2Vzc2luZyBpc01vdW50ZWQgaW5zaWRlIGl0cyByZW5kZXIoKSBmdW5jdGlvbi4gJyArICdyZW5kZXIoKSBzaG91bGQgYmUgYSBwdXJlIGZ1bmN0aW9uIG9mIHByb3BzIGFuZCBzdGF0ZS4gSXQgc2hvdWxkICcgKyAnbmV2ZXIgYWNjZXNzIHNvbWV0aGluZyB0aGF0IHJlcXVpcmVzIHN0YWxlIGRhdGEgZnJvbSB0aGUgcHJldmlvdXMgJyArICdyZW5kZXIsIHN1Y2ggYXMgcmVmcy4gTW92ZSB0aGlzIGxvZ2ljIHRvIGNvbXBvbmVudERpZE1vdW50IGFuZCAnICsgJ2NvbXBvbmVudERpZFVwZGF0ZSBpbnN0ZWFkLicsIG93bmVyLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgICAgb3duZXIuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBSZWFjdEluc3RhbmNlTWFwLmdldChwdWJsaWNJbnN0YW5jZSk7XG4gICAgaWYgKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIC8vIER1cmluZyBjb21wb25lbnRXaWxsTW91bnQgYW5kIHJlbmRlciB0aGlzIHdpbGwgc3RpbGwgYmUgbnVsbCBidXQgYWZ0ZXJcbiAgICAgIC8vIHRoYXQgd2lsbCBhbHdheXMgcmVuZGVyIHRvIHNvbWV0aGluZy4gQXQgbGVhc3QgZm9yIG5vdy4gU28gd2UgY2FuIHVzZVxuICAgICAgLy8gdGhpcyBoYWNrLlxuICAgICAgcmV0dXJuICEhaW50ZXJuYWxJbnN0YW5jZS5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2FsbGVyTmFtZSBOYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIFJlYWN0VXBkYXRlUXVldWUudmFsaWRhdGVDYWxsYmFjayhjYWxsYmFjaywgY2FsbGVyTmFtZSk7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UpO1xuXG4gICAgLy8gUHJldmlvdXNseSB3ZSB3b3VsZCB0aHJvdyBhbiBlcnJvciBpZiB3ZSBkaWRuJ3QgaGF2ZSBhbiBpbnRlcm5hbFxuICAgIC8vIGluc3RhbmNlLiBTaW5jZSB3ZSB3YW50IHRvIG1ha2UgaXQgYSBuby1vcCBpbnN0ZWFkLCB3ZSBtaXJyb3IgdGhlIHNhbWVcbiAgICAvLyBiZWhhdmlvciB3ZSBoYXZlIGluIG90aGVyIGVucXVldWUqIG1ldGhvZHMuXG4gICAgLy8gV2UgYWxzbyBuZWVkIHRvIGlnbm9yZSBjYWxsYmFja3MgaW4gY29tcG9uZW50V2lsbE1vdW50LiBTZWVcbiAgICAvLyBlbnF1ZXVlVXBkYXRlcy5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzKSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzID0gW2NhbGxiYWNrXTtcbiAgICB9XG4gICAgLy8gVE9ETzogVGhlIGNhbGxiYWNrIGhlcmUgaXMgaWdub3JlZCB3aGVuIHNldFN0YXRlIGlzIGNhbGxlZCBmcm9tXG4gICAgLy8gY29tcG9uZW50V2lsbE1vdW50LiBFaXRoZXIgZml4IGl0IG9yIGRpc2FsbG93IGRvaW5nIHNvIGNvbXBsZXRlbHkgaW5cbiAgICAvLyBmYXZvciBvZiBnZXRJbml0aWFsU3RhdGUuIEFsdGVybmF0aXZlbHksIHdlIGNhbiBkaXNhbGxvd1xuICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBkdXJpbmcgc2VydmVyLXNpZGUgcmVuZGVyaW5nLlxuICAgIGVucXVldWVVcGRhdGUoaW50ZXJuYWxJbnN0YW5jZSk7XG4gIH0sXG5cbiAgZW5xdWV1ZUNhbGxiYWNrSW50ZXJuYWw6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBjYWxsYmFjaykge1xuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzKSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nQ2FsbGJhY2tzID0gW2NhbGxiYWNrXTtcbiAgICB9XG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHZhciBpbnRlcm5hbEluc3RhbmNlID0gZ2V0SW50ZXJuYWxJbnN0YW5jZVJlYWR5Rm9yVXBkYXRlKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcblxuICAgIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IHRydWU7XG5cbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAqIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb21wbGV0ZVN0YXRlIE5leHQgc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlKSB7XG4gICAgdmFyIGludGVybmFsSW5zdGFuY2UgPSBnZXRJbnRlcm5hbEluc3RhbmNlUmVhZHlGb3JVcGRhdGUocHVibGljSW5zdGFuY2UsICdyZXBsYWNlU3RhdGUnKTtcblxuICAgIGlmICghaW50ZXJuYWxJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gW2NvbXBsZXRlU3RhdGVdO1xuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdSZXBsYWNlU3RhdGUgPSB0cnVlO1xuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIFRoaXMgb25seSBleGlzdHMgYmVjYXVzZSBfcGVuZGluZ1N0YXRlIGlzXG4gICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgKiBwcm9wZXJ0aWVzIHdoaWNoIGlzIGNvbmZ1c2luZy4gVE9ETzogRXhwb3NlIHBlbmRpbmdTdGF0ZSBvciBkb24ndCB1c2UgaXRcbiAgICogZHVyaW5nIHRoZSBtZXJnZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUpIHtcbiAgICB2YXIgaW50ZXJuYWxJbnN0YW5jZSA9IGdldEludGVybmFsSW5zdGFuY2VSZWFkeUZvclVwZGF0ZShwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG5cbiAgICBpZiAoIWludGVybmFsSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgcXVldWUgPSBpbnRlcm5hbEluc3RhbmNlLl9wZW5kaW5nU3RhdGVRdWV1ZSB8fCAoaW50ZXJuYWxJbnN0YW5jZS5fcGVuZGluZ1N0YXRlUXVldWUgPSBbXSk7XG4gICAgcXVldWUucHVzaChwYXJ0aWFsU3RhdGUpO1xuXG4gICAgZW5xdWV1ZVVwZGF0ZShpbnRlcm5hbEluc3RhbmNlKTtcbiAgfSxcblxuICBlbnF1ZXVlRWxlbWVudEludGVybmFsOiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgbmV3RWxlbWVudCkge1xuICAgIGludGVybmFsSW5zdGFuY2UuX3BlbmRpbmdFbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICBlbnF1ZXVlVXBkYXRlKGludGVybmFsSW5zdGFuY2UpO1xuICB9LFxuXG4gIHZhbGlkYXRlQ2FsbGJhY2s6IGZ1bmN0aW9uIChjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgICEoIWNhbGxiYWNrIHx8IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMoLi4uKTogRXhwZWN0ZWQgdGhlIGxhc3Qgb3B0aW9uYWwgYGNhbGxiYWNrYCBhcmd1bWVudCB0byBiZSBhICcgKyAnZnVuY3Rpb24uIEluc3RlYWQgcmVjZWl2ZWQ6ICVzLicsIGNhbGxlck5hbWUsIGZvcm1hdFVuZXhwZWN0ZWRBcmd1bWVudChjYWxsYmFjaykpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0VXBkYXRlUXVldWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0VXBkYXRlUXVldWUuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEluc3RhbmNlTWFwXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIGBSZWFjdEluc3RhbmNlTWFwYCBtYWludGFpbnMgYSBtYXBwaW5nIGZyb20gYSBwdWJsaWMgZmFjaW5nIHN0YXRlZnVsXG4gKiBpbnN0YW5jZSAoa2V5KSBhbmQgdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uICh2YWx1ZSkuIFRoaXMgYWxsb3dzIHB1YmxpY1xuICogbWV0aG9kcyB0byBhY2NlcHQgdGhlIHVzZXIgZmFjaW5nIGluc3RhbmNlIGFzIGFuIGFyZ3VtZW50IGFuZCBtYXAgdGhlbSBiYWNrXG4gKiB0byBpbnRlcm5hbCBtZXRob2RzLlxuICovXG5cbi8vIFRPRE86IFJlcGxhY2UgdGhpcyB3aXRoIEVTNjogdmFyIFJlYWN0SW5zdGFuY2VNYXAgPSBuZXcgTWFwKCk7XG5cbnZhciBSZWFjdEluc3RhbmNlTWFwID0ge1xuXG4gIC8qKlxuICAgKiBUaGlzIEFQSSBzaG91bGQgYmUgY2FsbGVkIGBkZWxldGVgIGJ1dCB3ZSdkIGhhdmUgdG8gbWFrZSBzdXJlIHRvIGFsd2F5c1xuICAgKiB0cmFuc2Zvcm0gdGhlc2UgdG8gc3RyaW5ncyBmb3IgSUUgc3VwcG9ydC4gV2hlbiB0aGlzIHRyYW5zZm9ybSBpcyBmdWxseVxuICAgKiBzdXBwb3J0ZWQgd2UgY2FuIHJlbmFtZSBpdC5cbiAgICovXG4gIHJlbW92ZTogZnVuY3Rpb24gKGtleSkge1xuICAgIGtleS5fcmVhY3RJbnRlcm5hbEluc3RhbmNlID0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIGdldDogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBrZXkuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZTtcbiAgfSxcblxuICBoYXM6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgIT09IHVuZGVmaW5lZDtcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAga2V5Ll9yZWFjdEludGVybmFsSW5zdGFuY2UgPSB2YWx1ZTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0SW5zdGFuY2VNYXA7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0SW5zdGFuY2VNYXAuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFVwZGF0ZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgQ2FsbGJhY2tRdWV1ZSA9IHJlcXVpcmUoJy4vQ2FsbGJhY2tRdWV1ZScpO1xudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RmVhdHVyZUZsYWdzID0gcmVxdWlyZSgnLi9SZWFjdEZlYXR1cmVGbGFncycpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJy4vUmVhY3RQZXJmJyk7XG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vVHJhbnNhY3Rpb24nKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgZGlydHlDb21wb25lbnRzID0gW107XG52YXIgYXNhcENhbGxiYWNrUXVldWUgPSBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpO1xudmFyIGFzYXBFbnF1ZXVlZCA9IGZhbHNlO1xuXG52YXIgYmF0Y2hpbmdTdHJhdGVneSA9IG51bGw7XG5cbmZ1bmN0aW9uIGVuc3VyZUluamVjdGVkKCkge1xuICAhKFJlYWN0VXBkYXRlcy5SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uICYmIGJhdGNoaW5nU3RyYXRlZ3kpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0VXBkYXRlczogbXVzdCBpbmplY3QgYSByZWNvbmNpbGUgdHJhbnNhY3Rpb24gY2xhc3MgYW5kIGJhdGNoaW5nICcgKyAnc3RyYXRlZ3knKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG59XG5cbnZhciBORVNURURfVVBEQVRFUyA9IHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGlydHlDb21wb25lbnRzTGVuZ3RoID0gZGlydHlDb21wb25lbnRzLmxlbmd0aDtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggIT09IGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIEFkZGl0aW9uYWwgdXBkYXRlcyB3ZXJlIGVucXVldWVkIGJ5IGNvbXBvbmVudERpZFVwZGF0ZSBoYW5kbGVycyBvclxuICAgICAgLy8gc2ltaWxhcjsgYmVmb3JlIG91ciBvd24gVVBEQVRFX1FVRVVFSU5HIHdyYXBwZXIgY2xvc2VzLCB3ZSB3YW50IHRvIHJ1blxuICAgICAgLy8gdGhlc2UgbmV3IHVwZGF0ZXMgc28gdGhhdCBpZiBBJ3MgY29tcG9uZW50RGlkVXBkYXRlIGNhbGxzIHNldFN0YXRlIG9uXG4gICAgICAvLyBCLCBCIHdpbGwgdXBkYXRlIGJlZm9yZSB0aGUgY2FsbGJhY2sgQSdzIHVwZGF0ZXIgcHJvdmlkZWQgd2hlbiBjYWxsaW5nXG4gICAgICAvLyBzZXRTdGF0ZS5cbiAgICAgIGRpcnR5Q29tcG9uZW50cy5zcGxpY2UoMCwgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGgpO1xuICAgICAgZmx1c2hCYXRjaGVkVXBkYXRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBVUERBVEVfUVVFVUVJTkcgPSB7XG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUucmVzZXQoKTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUubm90aWZ5QWxsKCk7XG4gIH1cbn07XG5cbnZhciBUUkFOU0FDVElPTl9XUkFQUEVSUyA9IFtORVNURURfVVBEQVRFUywgVVBEQVRFX1FVRVVFSU5HXTtcblxuZnVuY3Rpb24gUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbigpIHtcbiAgdGhpcy5yZWluaXRpYWxpemVUcmFuc2FjdGlvbigpO1xuICB0aGlzLmRpcnR5Q29tcG9uZW50c0xlbmd0aCA9IG51bGw7XG4gIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKCk7XG4gIHRoaXMucmVjb25jaWxlVHJhbnNhY3Rpb24gPSBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbi5nZXRQb29sZWQoXG4gIC8qIHVzZUNyZWF0ZUVsZW1lbnQgKi90cnVlKTtcbn1cblxuX2Fzc2lnbihSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uLnByb3RvdHlwZSwgVHJhbnNhY3Rpb24uTWl4aW4sIHtcbiAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBUUkFOU0FDVElPTl9XUkFQUEVSUztcbiAgfSxcblxuICBkZXN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kaXJ0eUNvbXBvbmVudHNMZW5ndGggPSBudWxsO1xuICAgIENhbGxiYWNrUXVldWUucmVsZWFzZSh0aGlzLmNhbGxiYWNrUXVldWUpO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IG51bGw7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24ucmVsZWFzZSh0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uKTtcbiAgICB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uID0gbnVsbDtcbiAgfSxcblxuICBwZXJmb3JtOiBmdW5jdGlvbiAobWV0aG9kLCBzY29wZSwgYSkge1xuICAgIC8vIEVzc2VudGlhbGx5IGNhbGxzIGB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uLnBlcmZvcm0obWV0aG9kLCBzY29wZSwgYSlgXG4gICAgLy8gd2l0aCB0aGlzIHRyYW5zYWN0aW9uJ3Mgd3JhcHBlcnMgYXJvdW5kIGl0LlxuICAgIHJldHVybiBUcmFuc2FjdGlvbi5NaXhpbi5wZXJmb3JtLmNhbGwodGhpcywgdGhpcy5yZWNvbmNpbGVUcmFuc2FjdGlvbi5wZXJmb3JtLCB0aGlzLnJlY29uY2lsZVRyYW5zYWN0aW9uLCBtZXRob2QsIHNjb3BlLCBhKTtcbiAgfVxufSk7XG5cblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uKTtcblxuZnVuY3Rpb24gYmF0Y2hlZFVwZGF0ZXMoY2FsbGJhY2ssIGEsIGIsIGMsIGQsIGUpIHtcbiAgZW5zdXJlSW5qZWN0ZWQoKTtcbiAgYmF0Y2hpbmdTdHJhdGVneS5iYXRjaGVkVXBkYXRlcyhjYWxsYmFjaywgYSwgYiwgYywgZCwgZSk7XG59XG5cbi8qKlxuICogQXJyYXkgY29tcGFyYXRvciBmb3IgUmVhY3RDb21wb25lbnRzIGJ5IG1vdW50IG9yZGVyaW5nLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGMxIGZpcnN0IGNvbXBvbmVudCB5b3UncmUgY29tcGFyaW5nXG4gKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjMiBzZWNvbmQgY29tcG9uZW50IHlvdSdyZSBjb21wYXJpbmdcbiAqIEByZXR1cm4ge251bWJlcn0gUmV0dXJuIHZhbHVlIHVzYWJsZSBieSBBcnJheS5wcm90b3R5cGUuc29ydCgpLlxuICovXG5mdW5jdGlvbiBtb3VudE9yZGVyQ29tcGFyYXRvcihjMSwgYzIpIHtcbiAgcmV0dXJuIGMxLl9tb3VudE9yZGVyIC0gYzIuX21vdW50T3JkZXI7XG59XG5cbmZ1bmN0aW9uIHJ1bkJhdGNoZWRVcGRhdGVzKHRyYW5zYWN0aW9uKSB7XG4gIHZhciBsZW4gPSB0cmFuc2FjdGlvbi5kaXJ0eUNvbXBvbmVudHNMZW5ndGg7XG4gICEobGVuID09PSBkaXJ0eUNvbXBvbmVudHMubGVuZ3RoKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBmbHVzaCB0cmFuc2FjdGlvblxcJ3Mgc3RvcmVkIGRpcnR5LWNvbXBvbmVudHMgbGVuZ3RoICglcykgdG8gJyArICdtYXRjaCBkaXJ0eS1jb21wb25lbnRzIGFycmF5IGxlbmd0aCAoJXMpLicsIGxlbiwgZGlydHlDb21wb25lbnRzLmxlbmd0aCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuXG4gIC8vIFNpbmNlIHJlY29uY2lsaW5nIGEgY29tcG9uZW50IGhpZ2hlciBpbiB0aGUgb3duZXIgaGllcmFyY2h5IHVzdWFsbHkgKG5vdFxuICAvLyBhbHdheXMgLS0gc2VlIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpKSB3aWxsIHJlY29uY2lsZSBjaGlsZHJlbiwgcmVjb25jaWxlXG4gIC8vIHRoZW0gYmVmb3JlIHRoZWlyIGNoaWxkcmVuIGJ5IHNvcnRpbmcgdGhlIGFycmF5LlxuICBkaXJ0eUNvbXBvbmVudHMuc29ydChtb3VudE9yZGVyQ29tcGFyYXRvcik7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIC8vIElmIGEgY29tcG9uZW50IGlzIHVubW91bnRlZCBiZWZvcmUgcGVuZGluZyBjaGFuZ2VzIGFwcGx5LCBpdCB3aWxsIHN0aWxsXG4gICAgLy8gYmUgaGVyZSwgYnV0IHdlIGFzc3VtZSB0aGF0IGl0IGhhcyBjbGVhcmVkIGl0cyBfcGVuZGluZ0NhbGxiYWNrcyBhbmRcbiAgICAvLyB0aGF0IHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeSBpcyBhIG5vb3AuXG4gICAgdmFyIGNvbXBvbmVudCA9IGRpcnR5Q29tcG9uZW50c1tpXTtcblxuICAgIC8vIElmIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeSBoYXBwZW5zIHRvIGVucXVldWUgYW55IG5ldyB1cGRhdGVzLCB3ZVxuICAgIC8vIHNob3VsZG4ndCBleGVjdXRlIHRoZSBjYWxsYmFja3MgdW50aWwgdGhlIG5leHQgcmVuZGVyIGhhcHBlbnMsIHNvXG4gICAgLy8gc3Rhc2ggdGhlIGNhbGxiYWNrcyBmaXJzdFxuICAgIHZhciBjYWxsYmFja3MgPSBjb21wb25lbnQuX3BlbmRpbmdDYWxsYmFja3M7XG4gICAgY29tcG9uZW50Ll9wZW5kaW5nQ2FsbGJhY2tzID0gbnVsbDtcblxuICAgIHZhciBtYXJrZXJOYW1lO1xuICAgIGlmIChSZWFjdEZlYXR1cmVGbGFncy5sb2dUb3BMZXZlbFJlbmRlcnMpIHtcbiAgICAgIHZhciBuYW1lZENvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICAgIC8vIER1Y2sgdHlwZSBUb3BMZXZlbFdyYXBwZXIuIFRoaXMgaXMgcHJvYmFibHkgYWx3YXlzIHRydWUuXG4gICAgICBpZiAoY29tcG9uZW50Ll9jdXJyZW50RWxlbWVudC5wcm9wcyA9PT0gY29tcG9uZW50Ll9yZW5kZXJlZENvbXBvbmVudC5fY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgbmFtZWRDb21wb25lbnQgPSBjb21wb25lbnQuX3JlbmRlcmVkQ29tcG9uZW50O1xuICAgICAgfVxuICAgICAgbWFya2VyTmFtZSA9ICdSZWFjdCB1cGRhdGU6ICcgKyBuYW1lZENvbXBvbmVudC5nZXROYW1lKCk7XG4gICAgICBjb25zb2xlLnRpbWUobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgUmVhY3RSZWNvbmNpbGVyLnBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeShjb21wb25lbnQsIHRyYW5zYWN0aW9uLnJlY29uY2lsZVRyYW5zYWN0aW9uKTtcblxuICAgIGlmIChtYXJrZXJOYW1lKSB7XG4gICAgICBjb25zb2xlLnRpbWVFbmQobWFya2VyTmFtZSk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYWxsYmFja3MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uY2FsbGJhY2tRdWV1ZS5lbnF1ZXVlKGNhbGxiYWNrc1tqXSwgY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG52YXIgZmx1c2hCYXRjaGVkVXBkYXRlcyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gUmVhY3RVcGRhdGVzRmx1c2hUcmFuc2FjdGlvbidzIHdyYXBwZXJzIHdpbGwgY2xlYXIgdGhlIGRpcnR5Q29tcG9uZW50c1xuICAvLyBhcnJheSBhbmQgcGVyZm9ybSBhbnkgdXBkYXRlcyBlbnF1ZXVlZCBieSBtb3VudC1yZWFkeSBoYW5kbGVycyAoaS5lLixcbiAgLy8gY29tcG9uZW50RGlkVXBkYXRlKSBidXQgd2UgbmVlZCB0byBjaGVjayBoZXJlIHRvbyBpbiBvcmRlciB0byBjYXRjaFxuICAvLyB1cGRhdGVzIGVucXVldWVkIGJ5IHNldFN0YXRlIGNhbGxiYWNrcyBhbmQgYXNhcCBjYWxscy5cbiAgd2hpbGUgKGRpcnR5Q29tcG9uZW50cy5sZW5ndGggfHwgYXNhcEVucXVldWVkKSB7XG4gICAgaWYgKGRpcnR5Q29tcG9uZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciB0cmFuc2FjdGlvbiA9IFJlYWN0VXBkYXRlc0ZsdXNoVHJhbnNhY3Rpb24uZ2V0UG9vbGVkKCk7XG4gICAgICB0cmFuc2FjdGlvbi5wZXJmb3JtKHJ1bkJhdGNoZWRVcGRhdGVzLCBudWxsLCB0cmFuc2FjdGlvbik7XG4gICAgICBSZWFjdFVwZGF0ZXNGbHVzaFRyYW5zYWN0aW9uLnJlbGVhc2UodHJhbnNhY3Rpb24pO1xuICAgIH1cblxuICAgIGlmIChhc2FwRW5xdWV1ZWQpIHtcbiAgICAgIGFzYXBFbnF1ZXVlZCA9IGZhbHNlO1xuICAgICAgdmFyIHF1ZXVlID0gYXNhcENhbGxiYWNrUXVldWU7XG4gICAgICBhc2FwQ2FsbGJhY2tRdWV1ZSA9IENhbGxiYWNrUXVldWUuZ2V0UG9vbGVkKCk7XG4gICAgICBxdWV1ZS5ub3RpZnlBbGwoKTtcbiAgICAgIENhbGxiYWNrUXVldWUucmVsZWFzZShxdWV1ZSk7XG4gICAgfVxuICB9XG59O1xuZmx1c2hCYXRjaGVkVXBkYXRlcyA9IFJlYWN0UGVyZi5tZWFzdXJlKCdSZWFjdFVwZGF0ZXMnLCAnZmx1c2hCYXRjaGVkVXBkYXRlcycsIGZsdXNoQmF0Y2hlZFVwZGF0ZXMpO1xuXG4vKipcbiAqIE1hcmsgYSBjb21wb25lbnQgYXMgbmVlZGluZyBhIHJlcmVuZGVyLCBhZGRpbmcgYW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gYVxuICogbGlzdCBvZiBmdW5jdGlvbnMgd2hpY2ggd2lsbCBiZSBleGVjdXRlZCBvbmNlIHRoZSByZXJlbmRlciBvY2N1cnMuXG4gKi9cbmZ1bmN0aW9uIGVucXVldWVVcGRhdGUoY29tcG9uZW50KSB7XG4gIGVuc3VyZUluamVjdGVkKCk7XG5cbiAgLy8gVmFyaW91cyBwYXJ0cyBvZiBvdXIgY29kZSAoc3VjaCBhcyBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCdzXG4gIC8vIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQpIGFzc3VtZSB0aGF0IGNhbGxzIHRvIHJlbmRlciBhcmVuJ3QgbmVzdGVkO1xuICAvLyB2ZXJpZnkgdGhhdCB0aGF0J3MgdGhlIGNhc2UuIChUaGlzIGlzIGNhbGxlZCBieSBlYWNoIHRvcC1sZXZlbCB1cGRhdGVcbiAgLy8gZnVuY3Rpb24sIGxpa2Ugc2V0UHJvcHMsIHNldFN0YXRlLCBmb3JjZVVwZGF0ZSwgZXRjLjsgY3JlYXRpb24gYW5kXG4gIC8vIGRlc3RydWN0aW9uIG9mIHRvcC1sZXZlbCBjb21wb25lbnRzIGlzIGd1YXJkZWQgaW4gUmVhY3RNb3VudC4pXG5cbiAgaWYgKCFiYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzKSB7XG4gICAgYmF0Y2hpbmdTdHJhdGVneS5iYXRjaGVkVXBkYXRlcyhlbnF1ZXVlVXBkYXRlLCBjb21wb25lbnQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRpcnR5Q29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG59XG5cbi8qKlxuICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRvIGJlIHJ1biBhdCB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGJhdGNoaW5nIGN5Y2xlLiBUaHJvd3NcbiAqIGlmIG5vIHVwZGF0ZXMgYXJlIGN1cnJlbnRseSBiZWluZyBwZXJmb3JtZWQuXG4gKi9cbmZ1bmN0aW9uIGFzYXAoY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgIWJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzLmFzYXA6IENhblxcJ3QgZW5xdWV1ZSBhbiBhc2FwIGNhbGxiYWNrIGluIGEgY29udGV4dCB3aGVyZScgKyAndXBkYXRlcyBhcmUgbm90IGJlaW5nIGJhdGNoZWQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICBhc2FwQ2FsbGJhY2tRdWV1ZS5lbnF1ZXVlKGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgYXNhcEVucXVldWVkID0gdHJ1ZTtcbn1cblxudmFyIFJlYWN0VXBkYXRlc0luamVjdGlvbiA9IHtcbiAgaW5qZWN0UmVjb25jaWxlVHJhbnNhY3Rpb246IGZ1bmN0aW9uIChSZWNvbmNpbGVUcmFuc2FjdGlvbikge1xuICAgICFSZWNvbmNpbGVUcmFuc2FjdGlvbiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhIHJlY29uY2lsZSB0cmFuc2FjdGlvbiBjbGFzcycpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICBSZWFjdFVwZGF0ZXMuUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbiA9IFJlY29uY2lsZVRyYW5zYWN0aW9uO1xuICB9LFxuXG4gIGluamVjdEJhdGNoaW5nU3RyYXRlZ3k6IGZ1bmN0aW9uIChfYmF0Y2hpbmdTdHJhdGVneSkge1xuICAgICFfYmF0Y2hpbmdTdHJhdGVneSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhIGJhdGNoaW5nIHN0cmF0ZWd5JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIF9iYXRjaGluZ1N0cmF0ZWd5LmJhdGNoZWRVcGRhdGVzID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdFVwZGF0ZXM6IG11c3QgcHJvdmlkZSBhIGJhdGNoZWRVcGRhdGVzKCkgZnVuY3Rpb24nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgISh0eXBlb2YgX2JhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPT09ICdib29sZWFuJykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RVcGRhdGVzOiBtdXN0IHByb3ZpZGUgYW4gaXNCYXRjaGluZ1VwZGF0ZXMgYm9vbGVhbiBhdHRyaWJ1dGUnKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgYmF0Y2hpbmdTdHJhdGVneSA9IF9iYXRjaGluZ1N0cmF0ZWd5O1xuICB9XG59O1xuXG52YXIgUmVhY3RVcGRhdGVzID0ge1xuICAvKipcbiAgICogUmVhY3QgcmVmZXJlbmNlcyBgUmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbmAgdXNpbmcgdGhpcyBwcm9wZXJ0eSBpbiBvcmRlclxuICAgKiB0byBhbGxvdyBkZXBlbmRlbmN5IGluamVjdGlvbi5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uOiBudWxsLFxuXG4gIGJhdGNoZWRVcGRhdGVzOiBiYXRjaGVkVXBkYXRlcyxcbiAgZW5xdWV1ZVVwZGF0ZTogZW5xdWV1ZVVwZGF0ZSxcbiAgZmx1c2hCYXRjaGVkVXBkYXRlczogZmx1c2hCYXRjaGVkVXBkYXRlcyxcbiAgaW5qZWN0aW9uOiBSZWFjdFVwZGF0ZXNJbmplY3Rpb24sXG4gIGFzYXA6IGFzYXBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RVcGRhdGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFVwZGF0ZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDYWxsYmFja1F1ZXVlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCBwc2V1ZG8tZXZlbnQgbW9kdWxlIHRvIGhlbHAga2VlcCB0cmFjayBvZiBjb21wb25lbnRzIHdhaXRpbmcgdG9cbiAqIGJlIG5vdGlmaWVkIHdoZW4gdGhlaXIgRE9NIHJlcHJlc2VudGF0aW9ucyBhcmUgYXZhaWxhYmxlIGZvciB1c2UuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRzIGBQb29sZWRDbGFzc2AsIHNvIHlvdSBzaG91bGQgbmV2ZXIgbmVlZCB0byBpbnN0YW50aWF0ZSB0aGlzLlxuICogSW5zdGVhZCwgdXNlIGBDYWxsYmFja1F1ZXVlLmdldFBvb2xlZCgpYC5cbiAqXG4gKiBAY2xhc3MgUmVhY3RNb3VudFJlYWR5XG4gKiBAaW1wbGVtZW50cyBQb29sZWRDbGFzc1xuICogQGludGVybmFsXG4gKi9cbmZ1bmN0aW9uIENhbGxiYWNrUXVldWUoKSB7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IG51bGw7XG4gIHRoaXMuX2NvbnRleHRzID0gbnVsbDtcbn1cblxuX2Fzc2lnbihDYWxsYmFja1F1ZXVlLnByb3RvdHlwZSwge1xuXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBgbm90aWZ5QWxsYCBpcyBpbnZva2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBJbnZva2VkIHdoZW4gYG5vdGlmeUFsbGAgaXMgaW52b2tlZC5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBjb250ZXh0IENvbnRleHQgdG8gY2FsbCBgY2FsbGJhY2tgIHdpdGguXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZTogZnVuY3Rpb24gKGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IFtdO1xuICAgIHRoaXMuX2NvbnRleHRzID0gdGhpcy5fY29udGV4dHMgfHwgW107XG4gICAgdGhpcy5fY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXMuX2NvbnRleHRzLnB1c2goY29udGV4dCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEludm9rZXMgYWxsIGVucXVldWVkIGNhbGxiYWNrcyBhbmQgY2xlYXJzIHRoZSBxdWV1ZS4gVGhpcyBpcyBpbnZva2VkIGFmdGVyXG4gICAqIHRoZSBET00gcmVwcmVzZW50YXRpb24gb2YgYSBjb21wb25lbnQgaGFzIGJlZW4gY3JlYXRlZCBvciB1cGRhdGVkLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG5vdGlmeUFsbDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3M7XG4gICAgdmFyIGNvbnRleHRzID0gdGhpcy5fY29udGV4dHM7XG4gICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgIShjYWxsYmFja3MubGVuZ3RoID09PSBjb250ZXh0cy5sZW5ndGgpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ01pc21hdGNoZWQgbGlzdCBvZiBjb250ZXh0cyBpbiBjYWxsYmFjayBxdWV1ZScpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IG51bGw7XG4gICAgICB0aGlzLl9jb250ZXh0cyA9IG51bGw7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjYWxsYmFja3NbaV0uY2FsbChjb250ZXh0c1tpXSk7XG4gICAgICB9XG4gICAgICBjYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICAgIGNvbnRleHRzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9LFxuXG4gIGNoZWNrcG9pbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzID8gdGhpcy5fY2FsbGJhY2tzLmxlbmd0aCA6IDA7XG4gIH0sXG5cbiAgcm9sbGJhY2s6IGZ1bmN0aW9uIChsZW4pIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9jYWxsYmFja3MubGVuZ3RoID0gbGVuO1xuICAgICAgdGhpcy5fY29udGV4dHMubGVuZ3RoID0gbGVuO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBpbnRlcm5hbCBxdWV1ZS5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IG51bGw7XG4gICAgdGhpcy5fY29udGV4dHMgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBgUG9vbGVkQ2xhc3NgIGxvb2tzIGZvciB0aGlzLlxuICAgKi9cbiAgZGVzdHJ1Y3RvcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG59KTtcblxuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKENhbGxiYWNrUXVldWUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrUXVldWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL0NhbGxiYWNrUXVldWUuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEZlYXR1cmVGbGFnc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RmVhdHVyZUZsYWdzID0ge1xuICAvLyBXaGVuIHRydWUsIGNhbGwgY29uc29sZS50aW1lKCkgYmVmb3JlIGFuZCAudGltZUVuZCgpIGFmdGVyIGVhY2ggdG9wLWxldmVsXG4gIC8vIHJlbmRlciAoYm90aCBpbml0aWFsIHJlbmRlcnMgYW5kIHVwZGF0ZXMpLiBVc2VmdWwgd2hlbiBsb29raW5nIGF0IHByb2QtbW9kZVxuICAvLyB0aW1lbGluZSBwcm9maWxlcyBpbiBDaHJvbWUsIGZvciBleGFtcGxlLlxuICBsb2dUb3BMZXZlbFJlbmRlcnM6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RmVhdHVyZUZsYWdzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdEZlYXR1cmVGbGFncy5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0UmVjb25jaWxlclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UmVmID0gcmVxdWlyZSgnLi9SZWFjdFJlZicpO1xudmFyIFJlYWN0SW5zdHJ1bWVudGF0aW9uID0gcmVxdWlyZSgnLi9SZWFjdEluc3RydW1lbnRhdGlvbicpO1xuXG4vKipcbiAqIEhlbHBlciB0byBjYWxsIFJlYWN0UmVmLmF0dGFjaFJlZnMgd2l0aCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQsIHNwbGl0IG91dFxuICogdG8gYXZvaWQgYWxsb2NhdGlvbnMgaW4gdGhlIHRyYW5zYWN0aW9uIG1vdW50LXJlYWR5IHF1ZXVlLlxuICovXG5mdW5jdGlvbiBhdHRhY2hSZWZzKCkge1xuICBSZWFjdFJlZi5hdHRhY2hSZWZzKHRoaXMsIHRoaXMuX2N1cnJlbnRFbGVtZW50KTtcbn1cblxudmFyIFJlYWN0UmVjb25jaWxlciA9IHtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCwgcmVuZGVycyBtYXJrdXAsIGFuZCByZWdpc3RlcnMgZXZlbnQgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBpbnRlcm5hbEluc3RhbmNlXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9vYmplY3R9IHRoZSBjb250YWluaW5nIG5hdGl2ZSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBpbmZvIGFib3V0IHRoZSBuYXRpdmUgY29udGFpbmVyXG4gICAqIEByZXR1cm4gez9zdHJpbmd9IFJlbmRlcmVkIG1hcmt1cCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBET00uXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaW50ZXJuYWxJbnN0YW5jZSwgdHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHZhciBtYXJrdXAgPSBpbnRlcm5hbEluc3RhbmNlLm1vdW50Q29tcG9uZW50KHRyYW5zYWN0aW9uLCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIGNvbnRleHQpO1xuICAgIGlmIChpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudCAmJiBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC5yZWYgIT0gbnVsbCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShhdHRhY2hSZWZzLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFJlYWN0SW5zdHJ1bWVudGF0aW9uLmRlYnVnVG9vbC5vbk1vdW50Q29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmFsdWUgdGhhdCBjYW4gYmUgcGFzc2VkIHRvXG4gICAqIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwLlxuICAgKi9cbiAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gaW50ZXJuYWxJbnN0YW5jZS5nZXROYXRpdmVOb2RlKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIGFueSByZXNvdXJjZXMgYWxsb2NhdGVkIGJ5IGBtb3VudENvbXBvbmVudGAuXG4gICAqXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHVubW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpbnRlcm5hbEluc3RhbmNlLCBzYWZlbHkpIHtcbiAgICBSZWFjdFJlZi5kZXRhY2hSZWZzKGludGVybmFsSW5zdGFuY2UsIGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50KTtcbiAgICBpbnRlcm5hbEluc3RhbmNlLnVubW91bnRDb21wb25lbnQoc2FmZWx5KTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVW5tb3VudENvbXBvbmVudChpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBhIGNvbXBvbmVudCB1c2luZyBhIG5ldyBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBpbnRlcm5hbEluc3RhbmNlXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0RWxlbWVudFxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0XG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBwcmV2RWxlbWVudCA9IGludGVybmFsSW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuXG4gICAgaWYgKG5leHRFbGVtZW50ID09PSBwcmV2RWxlbWVudCAmJiBjb250ZXh0ID09PSBpbnRlcm5hbEluc3RhbmNlLl9jb250ZXh0KSB7XG4gICAgICAvLyBTaW5jZSBlbGVtZW50cyBhcmUgaW1tdXRhYmxlIGFmdGVyIHRoZSBvd25lciBpcyByZW5kZXJlZCxcbiAgICAgIC8vIHdlIGNhbiBkbyBhIGNoZWFwIGlkZW50aXR5IGNvbXBhcmUgaGVyZSB0byBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhXG4gICAgICAvLyBzdXBlcmZsdW91cyByZWNvbmNpbGUuIEl0J3MgcG9zc2libGUgZm9yIHN0YXRlIHRvIGJlIG11dGFibGUgYnV0IHN1Y2hcbiAgICAgIC8vIGNoYW5nZSBzaG91bGQgdHJpZ2dlciBhbiB1cGRhdGUgb2YgdGhlIG93bmVyIHdoaWNoIHdvdWxkIHJlY3JlYXRlXG4gICAgICAvLyB0aGUgZWxlbWVudC4gV2UgZXhwbGljaXRseSBjaGVjayBmb3IgdGhlIGV4aXN0ZW5jZSBvZiBhbiBvd25lciBzaW5jZVxuICAgICAgLy8gaXQncyBwb3NzaWJsZSBmb3IgYW4gZWxlbWVudCBjcmVhdGVkIG91dHNpZGUgYSBjb21wb3NpdGUgdG8gYmVcbiAgICAgIC8vIGRlZXBseSBtdXRhdGVkIGFuZCByZXVzZWQuXG5cbiAgICAgIC8vIFRPRE86IEJhaWxpbmcgb3V0IGVhcmx5IGlzIGp1c3QgYSBwZXJmIG9wdGltaXphdGlvbiByaWdodD9cbiAgICAgIC8vIFRPRE86IFJlbW92aW5nIHRoZSByZXR1cm4gc3RhdGVtZW50IHNob3VsZCBhZmZlY3QgY29ycmVjdG5lc3M/XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHJlZnNDaGFuZ2VkID0gUmVhY3RSZWYuc2hvdWxkVXBkYXRlUmVmcyhwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpO1xuXG4gICAgaWYgKHJlZnNDaGFuZ2VkKSB7XG4gICAgICBSZWFjdFJlZi5kZXRhY2hSZWZzKGludGVybmFsSW5zdGFuY2UsIHByZXZFbGVtZW50KTtcbiAgICB9XG5cbiAgICBpbnRlcm5hbEluc3RhbmNlLnJlY2VpdmVDb21wb25lbnQobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcblxuICAgIGlmIChyZWZzQ2hhbmdlZCAmJiBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudCAmJiBpbnRlcm5hbEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC5yZWYgIT0gbnVsbCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShhdHRhY2hSZWZzLCBpbnRlcm5hbEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uVXBkYXRlQ29tcG9uZW50KGludGVybmFsSW5zdGFuY2UpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRmx1c2ggYW55IGRpcnR5IGNoYW5nZXMgaW4gYSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGludGVybmFsSW5zdGFuY2VcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHBlcmZvcm1VcGRhdGVJZk5lY2Vzc2FyeTogZnVuY3Rpb24gKGludGVybmFsSW5zdGFuY2UsIHRyYW5zYWN0aW9uKSB7XG4gICAgaW50ZXJuYWxJbnN0YW5jZS5wZXJmb3JtVXBkYXRlSWZOZWNlc3NhcnkodHJhbnNhY3Rpb24pO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25VcGRhdGVDb21wb25lbnQoaW50ZXJuYWxJbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RSZWNvbmNpbGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdFJlY29uY2lsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdFJlZlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0T3duZXInKTtcblxudmFyIFJlYWN0UmVmID0ge307XG5cbmZ1bmN0aW9uIGF0dGFjaFJlZihyZWYsIGNvbXBvbmVudCwgb3duZXIpIHtcbiAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZWYoY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCkpO1xuICB9IGVsc2Uge1xuICAgIC8vIExlZ2FjeSByZWZcbiAgICBSZWFjdE93bmVyLmFkZENvbXBvbmVudEFzUmVmVG8oY29tcG9uZW50LCByZWYsIG93bmVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXRhY2hSZWYocmVmLCBjb21wb25lbnQsIG93bmVyKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKG51bGwpO1xuICB9IGVsc2Uge1xuICAgIC8vIExlZ2FjeSByZWZcbiAgICBSZWFjdE93bmVyLnJlbW92ZUNvbXBvbmVudEFzUmVmRnJvbShjb21wb25lbnQsIHJlZiwgb3duZXIpO1xuICB9XG59XG5cblJlYWN0UmVmLmF0dGFjaFJlZnMgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICBpZiAocmVmICE9IG51bGwpIHtcbiAgICBhdHRhY2hSZWYocmVmLCBpbnN0YW5jZSwgZWxlbWVudC5fb3duZXIpO1xuICB9XG59O1xuXG5SZWFjdFJlZi5zaG91bGRVcGRhdGVSZWZzID0gZnVuY3Rpb24gKHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkge1xuICAvLyBJZiBlaXRoZXIgdGhlIG93bmVyIG9yIGEgYHJlZmAgaGFzIGNoYW5nZWQsIG1ha2Ugc3VyZSB0aGUgbmV3ZXN0IG93bmVyXG4gIC8vIGhhcyBzdG9yZWQgYSByZWZlcmVuY2UgdG8gYHRoaXNgLCBhbmQgdGhlIHByZXZpb3VzIG93bmVyIChpZiBkaWZmZXJlbnQpXG4gIC8vIGhhcyBmb3Jnb3R0ZW4gdGhlIHJlZmVyZW5jZSB0byBgdGhpc2AuIFdlIHVzZSB0aGUgZWxlbWVudCBpbnN0ZWFkXG4gIC8vIG9mIHRoZSBwdWJsaWMgdGhpcy5wcm9wcyBiZWNhdXNlIHRoZSBwb3N0IHByb2Nlc3NpbmcgY2Fubm90IGRldGVybWluZVxuICAvLyBhIHJlZi4gVGhlIHJlZiBjb25jZXB0dWFsbHkgbGl2ZXMgb24gdGhlIGVsZW1lbnQuXG5cbiAgLy8gVE9ETzogU2hvdWxkIHRoaXMgZXZlbiBiZSBwb3NzaWJsZT8gVGhlIG93bmVyIGNhbm5vdCBjaGFuZ2UgYmVjYXVzZVxuICAvLyBpdCdzIGZvcmJpZGRlbiBieSBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudC4gVGhlIHJlZiBjYW4gY2hhbmdlXG4gIC8vIGlmIHlvdSBzd2FwIHRoZSBrZXlzIG9mIGJ1dCBub3QgdGhlIHJlZnMuIFJlY29uc2lkZXIgd2hlcmUgdGhpcyBjaGVja1xuICAvLyBpcyBtYWRlLiBJdCBwcm9iYWJseSBiZWxvbmdzIHdoZXJlIHRoZSBrZXkgY2hlY2tpbmcgYW5kXG4gIC8vIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQgaXMgZG9uZS5cblxuICB2YXIgcHJldkVtcHR5ID0gcHJldkVsZW1lbnQgPT09IG51bGwgfHwgcHJldkVsZW1lbnQgPT09IGZhbHNlO1xuICB2YXIgbmV4dEVtcHR5ID0gbmV4dEVsZW1lbnQgPT09IG51bGwgfHwgbmV4dEVsZW1lbnQgPT09IGZhbHNlO1xuXG4gIHJldHVybihcbiAgICAvLyBUaGlzIGhhcyBhIGZldyBmYWxzZSBwb3NpdGl2ZXMgdy9yL3QgZW1wdHkgY29tcG9uZW50cy5cbiAgICBwcmV2RW1wdHkgfHwgbmV4dEVtcHR5IHx8IG5leHRFbGVtZW50Ll9vd25lciAhPT0gcHJldkVsZW1lbnQuX293bmVyIHx8IG5leHRFbGVtZW50LnJlZiAhPT0gcHJldkVsZW1lbnQucmVmXG4gICk7XG59O1xuXG5SZWFjdFJlZi5kZXRhY2hSZWZzID0gZnVuY3Rpb24gKGluc3RhbmNlLCBlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgaWYgKHJlZiAhPSBudWxsKSB7XG4gICAgZGV0YWNoUmVmKHJlZiwgaW5zdGFuY2UsIGVsZW1lbnQuX293bmVyKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFJlZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RSZWYuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE93bmVyXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogUmVhY3RPd25lcnMgYXJlIGNhcGFibGUgb2Ygc3RvcmluZyByZWZlcmVuY2VzIHRvIG93bmVkIGNvbXBvbmVudHMuXG4gKlxuICogQWxsIGNvbXBvbmVudHMgYXJlIGNhcGFibGUgb2YgLy9iZWluZy8vIHJlZmVyZW5jZWQgYnkgb3duZXIgY29tcG9uZW50cywgYnV0XG4gKiBvbmx5IFJlYWN0T3duZXIgY29tcG9uZW50cyBhcmUgY2FwYWJsZSBvZiAvL3JlZmVyZW5jaW5nLy8gb3duZWQgY29tcG9uZW50cy5cbiAqIFRoZSBuYW1lZCByZWZlcmVuY2UgaXMga25vd24gYXMgYSBcInJlZlwiLlxuICpcbiAqIFJlZnMgYXJlIGF2YWlsYWJsZSB3aGVuIG1vdW50ZWQgYW5kIHVwZGF0ZWQgZHVyaW5nIHJlY29uY2lsaWF0aW9uLlxuICpcbiAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gKFxuICogICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICogICAgICAgICAgIDxDdXN0b21Db21wb25lbnQgcmVmPVwiY3VzdG9tXCIgLz5cbiAqICAgICAgICAgPC9kaXY+XG4gKiAgICAgICApO1xuICogICAgIH0sXG4gKiAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICogICAgICAgdGhpcy5yZWZzLmN1c3RvbS5oYW5kbGVDbGljaygpO1xuICogICAgIH0sXG4gKiAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICogICAgICAgdGhpcy5yZWZzLmN1c3RvbS5pbml0aWFsaXplKCk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBSZWZzIHNob3VsZCByYXJlbHkgYmUgdXNlZC4gV2hlbiByZWZzIGFyZSB1c2VkLCB0aGV5IHNob3VsZCBvbmx5IGJlIGRvbmUgdG9cbiAqIGNvbnRyb2wgZGF0YSB0aGF0IGlzIG5vdCBoYW5kbGVkIGJ5IFJlYWN0J3MgZGF0YSBmbG93LlxuICpcbiAqIEBjbGFzcyBSZWFjdE93bmVyXG4gKi9cbnZhciBSZWFjdE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgb3duZXIuXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNWYWxpZE93bmVyOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuICEhKG9iamVjdCAmJiB0eXBlb2Ygb2JqZWN0LmF0dGFjaFJlZiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqZWN0LmRldGFjaFJlZiA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjb21wb25lbnQgYnkgcmVmIHRvIGFuIG93bmVyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byByZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBieSB3aGljaCB0byByZWZlciB0byB0aGUgY29tcG9uZW50LlxuICAgKiBAcGFyYW0ge1JlYWN0T3duZXJ9IG93bmVyIENvbXBvbmVudCBvbiB3aGljaCB0byByZWNvcmQgdGhlIHJlZi5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgYWRkQ29tcG9uZW50QXNSZWZUbzogZnVuY3Rpb24gKGNvbXBvbmVudCwgcmVmLCBvd25lcikge1xuICAgICFSZWFjdE93bmVyLmlzVmFsaWRPd25lcihvd25lcikgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnYWRkQ29tcG9uZW50QXNSZWZUbyguLi4pOiBPbmx5IGEgUmVhY3RPd25lciBjYW4gaGF2ZSByZWZzLiBZb3UgbWlnaHQgJyArICdiZSBhZGRpbmcgYSByZWYgdG8gYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IGNyZWF0ZWQgaW5zaWRlIGEgY29tcG9uZW50XFwncyAnICsgJ2ByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAnICsgJyhkZXRhaWxzOiBodHRwczovL2ZiLm1lL3JlYWN0LXJlZnMtbXVzdC1oYXZlLW93bmVyKS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgb3duZXIuYXR0YWNoUmVmKHJlZiwgY29tcG9uZW50KTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNvbXBvbmVudCBieSByZWYgZnJvbSBhbiBvd25lciBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gZGVyZWZlcmVuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSBvZiB0aGUgcmVmIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIHtSZWFjdE93bmVyfSBvd25lciBDb21wb25lbnQgb24gd2hpY2ggdGhlIHJlZiBpcyByZWNvcmRlZC5cbiAgICogQGZpbmFsXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVtb3ZlQ29tcG9uZW50QXNSZWZGcm9tOiBmdW5jdGlvbiAoY29tcG9uZW50LCByZWYsIG93bmVyKSB7XG4gICAgIVJlYWN0T3duZXIuaXNWYWxpZE93bmVyKG93bmVyKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdyZW1vdmVDb21wb25lbnRBc1JlZkZyb20oLi4uKTogT25seSBhIFJlYWN0T3duZXIgY2FuIGhhdmUgcmVmcy4gWW91IG1pZ2h0ICcgKyAnYmUgcmVtb3ZpbmcgYSByZWYgdG8gYSBjb21wb25lbnQgdGhhdCB3YXMgbm90IGNyZWF0ZWQgaW5zaWRlIGEgY29tcG9uZW50XFwncyAnICsgJ2ByZW5kZXJgIG1ldGhvZCwgb3IgeW91IGhhdmUgbXVsdGlwbGUgY29waWVzIG9mIFJlYWN0IGxvYWRlZCAnICsgJyhkZXRhaWxzOiBodHRwczovL2ZiLm1lL3JlYWN0LXJlZnMtbXVzdC1oYXZlLW93bmVyKS4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIG93bmVyUHVibGljSW5zdGFuY2UgPSBvd25lci5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuICAgIC8vIENoZWNrIHRoYXQgYGNvbXBvbmVudGAncyBvd25lciBpcyBzdGlsbCBhbGl2ZSBhbmQgdGhhdCBgY29tcG9uZW50YCBpcyBzdGlsbCB0aGUgY3VycmVudCByZWZcbiAgICAvLyBiZWNhdXNlIHdlIGRvIG5vdCB3YW50IHRvIGRldGFjaCB0aGUgcmVmIGlmIGFub3RoZXIgY29tcG9uZW50IHN0b2xlIGl0LlxuICAgIGlmIChvd25lclB1YmxpY0luc3RhbmNlICYmIG93bmVyUHVibGljSW5zdGFuY2UucmVmc1tyZWZdID09PSBjb21wb25lbnQuZ2V0UHVibGljSW5zdGFuY2UoKSkge1xuICAgICAgb3duZXIuZGV0YWNoUmVmKHJlZik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RPd25lcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RPd25lci5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFRyYW5zYWN0aW9uXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogYFRyYW5zYWN0aW9uYCBjcmVhdGVzIGEgYmxhY2sgYm94IHRoYXQgaXMgYWJsZSB0byB3cmFwIGFueSBtZXRob2Qgc3VjaCB0aGF0XG4gKiBjZXJ0YWluIGludmFyaWFudHMgYXJlIG1haW50YWluZWQgYmVmb3JlIGFuZCBhZnRlciB0aGUgbWV0aG9kIGlzIGludm9rZWRcbiAqIChFdmVuIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gd2hpbGUgaW52b2tpbmcgdGhlIHdyYXBwZWQgbWV0aG9kKS4gV2hvZXZlclxuICogaW5zdGFudGlhdGVzIGEgdHJhbnNhY3Rpb24gY2FuIHByb3ZpZGUgZW5mb3JjZXJzIG9mIHRoZSBpbnZhcmlhbnRzIGF0XG4gKiBjcmVhdGlvbiB0aW1lLiBUaGUgYFRyYW5zYWN0aW9uYCBjbGFzcyBpdHNlbGYgd2lsbCBzdXBwbHkgb25lIGFkZGl0aW9uYWxcbiAqIGF1dG9tYXRpYyBpbnZhcmlhbnQgZm9yIHlvdSAtIHRoZSBpbnZhcmlhbnQgdGhhdCBhbnkgdHJhbnNhY3Rpb24gaW5zdGFuY2VcbiAqIHNob3VsZCBub3QgYmUgcnVuIHdoaWxlIGl0IGlzIGFscmVhZHkgYmVpbmcgcnVuLiBZb3Ugd291bGQgdHlwaWNhbGx5IGNyZWF0ZSBhXG4gKiBzaW5nbGUgaW5zdGFuY2Ugb2YgYSBgVHJhbnNhY3Rpb25gIGZvciByZXVzZSBtdWx0aXBsZSB0aW1lcywgdGhhdCBwb3RlbnRpYWxseVxuICogaXMgdXNlZCB0byB3cmFwIHNldmVyYWwgZGlmZmVyZW50IG1ldGhvZHMuIFdyYXBwZXJzIGFyZSBleHRyZW1lbHkgc2ltcGxlIC1cbiAqIHRoZXkgb25seSByZXF1aXJlIGltcGxlbWVudGluZyB0d28gbWV0aG9kcy5cbiAqXG4gKiA8cHJlPlxuICogICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXJzIChpbmplY3RlZCBhdCBjcmVhdGlvbiB0aW1lKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgICAgICAgICtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tK1xuICogICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgIHYgICAgICAgIHwgICAgICAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgICAgKy0tLS0tLS0tLS0tLS0tLSsgICB8ICAgICAgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgICstLXwgICAgd3JhcHBlcjEgICB8LS0tfC0tLS0rICAgICAgICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICArLS0tLS0tLS0tLS0tLS0tKyAgIHYgICAgfCAgICAgICAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgICAgICArLS0tLS0tLS0tLS0tLSsgIHwgICAgICAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHwgICAgICstLS0tfCAgIHdyYXBwZXIyICB8LS0tLS0tLS0rICAgfFxuICogICAgICAgICAgICAgICAgICAgIHwgICB8ICAgICB8ICAgICstLS0tLS0tLS0tLS0tKyAgfCAgICAgfCAgIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICAgfCAgICAgfCAgICAgICAgICAgICAgICAgICAgIHwgICAgIHwgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCAgIHYgICAgIHYgICAgICAgICAgICAgICAgICAgICB2ICAgICB2ICAgfCB3cmFwcGVyXG4gKiAgICAgICAgICAgICAgICAgICAgfCArLS0tKyArLS0tKyAgICstLS0tLS0tLS0rICAgKy0tLSsgKy0tLSsgfCBpbnZhcmlhbnRzXG4gKiBwZXJmb3JtKGFueU1ldGhvZCkgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfCBtYWludGFpbmVkXG4gKiArLS0tLS0tLS0tLS0tLS0tLS0+fC18LS0tfC18LS0tfC0tPnxhbnlNZXRob2R8LS0tfC0tLXwtfC0tLXwtfC0tLS0tLS0tPlxuICogICAgICAgICAgICAgICAgICAgIHwgfCAgIHwgfCAgIHwgICB8ICAgICAgICAgfCAgIHwgICB8IHwgICB8IHxcbiAqICAgICAgICAgICAgICAgICAgICB8IHwgICB8IHwgICB8ICAgfCAgICAgICAgIHwgICB8ICAgfCB8ICAgfCB8XG4gKiAgICAgICAgICAgICAgICAgICAgfCB8ICAgfCB8ICAgfCAgIHwgICAgICAgICB8ICAgfCAgIHwgfCAgIHwgfFxuICogICAgICAgICAgICAgICAgICAgIHwgKy0tLSsgKy0tLSsgICArLS0tLS0tLS0tKyAgICstLS0rICstLS0rIHxcbiAqICAgICAgICAgICAgICAgICAgICB8ICBpbml0aWFsaXplICAgICAgICAgICAgICAgICAgICBjbG9zZSAgICB8XG4gKiAgICAgICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICogPC9wcmU+XG4gKlxuICogVXNlIGNhc2VzOlxuICogLSBQcmVzZXJ2aW5nIHRoZSBpbnB1dCBzZWxlY3Rpb24gcmFuZ2VzIGJlZm9yZS9hZnRlciByZWNvbmNpbGlhdGlvbi5cbiAqICAgUmVzdG9yaW5nIHNlbGVjdGlvbiBldmVuIGluIHRoZSBldmVudCBvZiBhbiB1bmV4cGVjdGVkIGVycm9yLlxuICogLSBEZWFjdGl2YXRpbmcgZXZlbnRzIHdoaWxlIHJlYXJyYW5naW5nIHRoZSBET00sIHByZXZlbnRpbmcgYmx1cnMvZm9jdXNlcyxcbiAqICAgd2hpbGUgZ3VhcmFudGVlaW5nIHRoYXQgYWZ0ZXJ3YXJkcywgdGhlIGV2ZW50IHN5c3RlbSBpcyByZWFjdGl2YXRlZC5cbiAqIC0gRmx1c2hpbmcgYSBxdWV1ZSBvZiBjb2xsZWN0ZWQgRE9NIG11dGF0aW9ucyB0byB0aGUgbWFpbiBVSSB0aHJlYWQgYWZ0ZXIgYVxuICogICByZWNvbmNpbGlhdGlvbiB0YWtlcyBwbGFjZSBpbiBhIHdvcmtlciB0aHJlYWQuXG4gKiAtIEludm9raW5nIGFueSBjb2xsZWN0ZWQgYGNvbXBvbmVudERpZFVwZGF0ZWAgY2FsbGJhY2tzIGFmdGVyIHJlbmRlcmluZyBuZXdcbiAqICAgY29udGVudC5cbiAqIC0gKEZ1dHVyZSB1c2UgY2FzZSk6IFdyYXBwaW5nIHBhcnRpY3VsYXIgZmx1c2hlcyBvZiB0aGUgYFJlYWN0V29ya2VyYCBxdWV1ZVxuICogICB0byBwcmVzZXJ2ZSB0aGUgYHNjcm9sbFRvcGAgKGFuIGF1dG9tYXRpYyBzY3JvbGwgYXdhcmUgRE9NKS5cbiAqIC0gKEZ1dHVyZSB1c2UgY2FzZSk6IExheW91dCBjYWxjdWxhdGlvbnMgYmVmb3JlIGFuZCBhZnRlciBET00gdXBkYXRlcy5cbiAqXG4gKiBUcmFuc2FjdGlvbmFsIHBsdWdpbiBBUEk6XG4gKiAtIEEgbW9kdWxlIHRoYXQgaGFzIGFuIGBpbml0aWFsaXplYCBtZXRob2QgdGhhdCByZXR1cm5zIGFueSBwcmVjb21wdXRhdGlvbi5cbiAqIC0gYW5kIGEgYGNsb3NlYCBtZXRob2QgdGhhdCBhY2NlcHRzIHRoZSBwcmVjb21wdXRhdGlvbi4gYGNsb3NlYCBpcyBpbnZva2VkXG4gKiAgIHdoZW4gdGhlIHdyYXBwZWQgcHJvY2VzcyBpcyBjb21wbGV0ZWQsIG9yIGhhcyBmYWlsZWQuXG4gKlxuICogQHBhcmFtIHtBcnJheTxUcmFuc2FjdGlvbmFsV3JhcHBlcj59IHRyYW5zYWN0aW9uV3JhcHBlciBXcmFwcGVyIG1vZHVsZXNcbiAqIHRoYXQgaW1wbGVtZW50IGBpbml0aWFsaXplYCBhbmQgYGNsb3NlYC5cbiAqIEByZXR1cm4ge1RyYW5zYWN0aW9ufSBTaW5nbGUgdHJhbnNhY3Rpb24gZm9yIHJldXNlIGluIHRocmVhZC5cbiAqXG4gKiBAY2xhc3MgVHJhbnNhY3Rpb25cbiAqL1xudmFyIE1peGluID0ge1xuICAvKipcbiAgICogU2V0cyB1cCB0aGlzIGluc3RhbmNlIHNvIHRoYXQgaXQgaXMgcHJlcGFyZWQgZm9yIGNvbGxlY3RpbmcgbWV0cmljcy4gRG9lc1xuICAgKiBzbyBzdWNoIHRoYXQgdGhpcyBzZXR1cCBtZXRob2QgbWF5IGJlIHVzZWQgb24gYW4gaW5zdGFuY2UgdGhhdCBpcyBhbHJlYWR5XG4gICAqIGluaXRpYWxpemVkLCBpbiBhIHdheSB0aGF0IGRvZXMgbm90IGNvbnN1bWUgYWRkaXRpb25hbCBtZW1vcnkgdXBvbiByZXVzZS5cbiAgICogVGhhdCBjYW4gYmUgdXNlZnVsIGlmIHlvdSBkZWNpZGUgdG8gbWFrZSB5b3VyIHN1YmNsYXNzIG9mIHRoaXMgbWl4aW4gYVxuICAgKiBcIlBvb2xlZENsYXNzXCIuXG4gICAqL1xuICByZWluaXRpYWxpemVUcmFuc2FjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudHJhbnNhY3Rpb25XcmFwcGVycyA9IHRoaXMuZ2V0VHJhbnNhY3Rpb25XcmFwcGVycygpO1xuICAgIGlmICh0aGlzLndyYXBwZXJJbml0RGF0YSkge1xuICAgICAgdGhpcy53cmFwcGVySW5pdERhdGEubGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cmFwcGVySW5pdERhdGEgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5faXNJblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gIH0sXG5cbiAgX2lzSW5UcmFuc2FjdGlvbjogZmFsc2UsXG5cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcmV0dXJuIHtBcnJheTxUcmFuc2FjdGlvbldyYXBwZXI+fSBBcnJheSBvZiB0cmFuc2FjdGlvbiB3cmFwcGVycy5cbiAgICovXG4gIGdldFRyYW5zYWN0aW9uV3JhcHBlcnM6IG51bGwsXG5cbiAgaXNJblRyYW5zYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5faXNJblRyYW5zYWN0aW9uO1xuICB9LFxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgZnVuY3Rpb24gd2l0aGluIGEgc2FmZXR5IHdpbmRvdy4gVXNlIHRoaXMgZm9yIHRoZSB0b3AgbGV2ZWxcbiAgICogbWV0aG9kcyB0aGF0IHJlc3VsdCBpbiBsYXJnZSBhbW91bnRzIG9mIGNvbXB1dGF0aW9uL211dGF0aW9ucyB0aGF0IHdvdWxkXG4gICAqIG5lZWQgdG8gYmUgc2FmZXR5IGNoZWNrZWQuIFRoZSBvcHRpb25hbCBhcmd1bWVudHMgaGVscHMgcHJldmVudCB0aGUgbmVlZFxuICAgKiB0byBiaW5kIGluIG1hbnkgY2FzZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZCBNZW1iZXIgb2Ygc2NvcGUgdG8gY2FsbC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlIFNjb3BlIHRvIGludm9rZSBmcm9tLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBhIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gYiBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGMgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge09iamVjdD89fSBkIEFyZ3VtZW50IHRvIHBhc3MgdG8gdGhlIG1ldGhvZC5cbiAgICogQHBhcmFtIHtPYmplY3Q/PX0gZSBBcmd1bWVudCB0byBwYXNzIHRvIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0Pz19IGYgQXJndW1lbnQgdG8gcGFzcyB0byB0aGUgbWV0aG9kLlxuICAgKlxuICAgKiBAcmV0dXJuIHsqfSBSZXR1cm4gdmFsdWUgZnJvbSBgbWV0aG9kYC5cbiAgICovXG4gIHBlcmZvcm06IGZ1bmN0aW9uIChtZXRob2QsIHNjb3BlLCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gICAgISF0aGlzLmlzSW5UcmFuc2FjdGlvbigpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyYW5zYWN0aW9uLnBlcmZvcm0oLi4uKTogQ2Fubm90IGluaXRpYWxpemUgYSB0cmFuc2FjdGlvbiB3aGVuIHRoZXJlICcgKyAnaXMgYWxyZWFkeSBhbiBvdXRzdGFuZGluZyB0cmFuc2FjdGlvbi4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIGVycm9yVGhyb3duO1xuICAgIHZhciByZXQ7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2lzSW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gICAgICAvLyBDYXRjaGluZyBlcnJvcnMgbWFrZXMgZGVidWdnaW5nIG1vcmUgZGlmZmljdWx0LCBzbyB3ZSBzdGFydCB3aXRoXG4gICAgICAvLyBlcnJvclRocm93biBzZXQgdG8gdHJ1ZSBiZWZvcmUgc2V0dGluZyBpdCB0byBmYWxzZSBhZnRlciBjYWxsaW5nXG4gICAgICAvLyBjbG9zZSAtLSBpZiBpdCdzIHN0aWxsIHNldCB0byB0cnVlIGluIHRoZSBmaW5hbGx5IGJsb2NrLCBpdCBtZWFuc1xuICAgICAgLy8gb25lIG9mIHRoZXNlIGNhbGxzIHRocmV3LlxuICAgICAgZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgdGhpcy5pbml0aWFsaXplQWxsKDApO1xuICAgICAgcmV0ID0gbWV0aG9kLmNhbGwoc2NvcGUsIGEsIGIsIGMsIGQsIGUsIGYpO1xuICAgICAgZXJyb3JUaHJvd24gPSBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgLy8gSWYgYG1ldGhvZGAgdGhyb3dzLCBwcmVmZXIgdG8gc2hvdyB0aGF0IHN0YWNrIHRyYWNlIG92ZXIgYW55IHRocm93blxuICAgICAgICAgIC8vIGJ5IGludm9raW5nIGBjbG9zZUFsbGAuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGwoMCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbmNlIGBtZXRob2RgIGRpZG4ndCB0aHJvdywgd2UgZG9uJ3Qgd2FudCB0byBzaWxlbmNlIHRoZSBleGNlcHRpb25cbiAgICAgICAgICAvLyBoZXJlLlxuICAgICAgICAgIHRoaXMuY2xvc2VBbGwoMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuX2lzSW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9LFxuXG4gIGluaXRpYWxpemVBbGw6IGZ1bmN0aW9uIChzdGFydEluZGV4KSB7XG4gICAgdmFyIHRyYW5zYWN0aW9uV3JhcHBlcnMgPSB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnM7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXg7IGkgPCB0cmFuc2FjdGlvbldyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IHRyYW5zYWN0aW9uV3JhcHBlcnNbaV07XG4gICAgICB0cnkge1xuICAgICAgICAvLyBDYXRjaGluZyBlcnJvcnMgbWFrZXMgZGVidWdnaW5nIG1vcmUgZGlmZmljdWx0LCBzbyB3ZSBzdGFydCB3aXRoIHRoZVxuICAgICAgICAvLyBPQlNFUlZFRF9FUlJPUiBzdGF0ZSBiZWZvcmUgb3ZlcndyaXRpbmcgaXQgd2l0aCB0aGUgcmVhbCByZXR1cm4gdmFsdWVcbiAgICAgICAgLy8gb2YgaW5pdGlhbGl6ZSAtLSBpZiBpdCdzIHN0aWxsIHNldCB0byBPQlNFUlZFRF9FUlJPUiBpbiB0aGUgZmluYWxseVxuICAgICAgICAvLyBibG9jaywgaXQgbWVhbnMgd3JhcHBlci5pbml0aWFsaXplIHRocmV3LlxuICAgICAgICB0aGlzLndyYXBwZXJJbml0RGF0YVtpXSA9IFRyYW5zYWN0aW9uLk9CU0VSVkVEX0VSUk9SO1xuICAgICAgICB0aGlzLndyYXBwZXJJbml0RGF0YVtpXSA9IHdyYXBwZXIuaW5pdGlhbGl6ZSA/IHdyYXBwZXIuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpIDogbnVsbDtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZXJJbml0RGF0YVtpXSA9PT0gVHJhbnNhY3Rpb24uT0JTRVJWRURfRVJST1IpIHtcbiAgICAgICAgICAvLyBUaGUgaW5pdGlhbGl6ZXIgZm9yIHdyYXBwZXIgaSB0aHJldyBhbiBlcnJvcjsgaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgICAvLyByZW1haW5pbmcgd3JhcHBlcnMgYnV0IHNpbGVuY2UgYW55IGV4Y2VwdGlvbnMgZnJvbSB0aGVtIHRvIGVuc3VyZVxuICAgICAgICAgIC8vIHRoYXQgdGhlIGZpcnN0IGVycm9yIGlzIHRoZSBvbmUgdG8gYnViYmxlIHVwLlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVBbGwoaSArIDEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSW52b2tlcyBlYWNoIG9mIGB0aGlzLnRyYW5zYWN0aW9uV3JhcHBlcnMuY2xvc2VbaV1gIGZ1bmN0aW9ucywgcGFzc2luZyBpbnRvXG4gICAqIHRoZW0gdGhlIHJlc3BlY3RpdmUgcmV0dXJuIHZhbHVlcyBvZiBgdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzLmluaXRbaV1gXG4gICAqIChgY2xvc2VgcnMgdGhhdCBjb3JyZXNwb25kIHRvIGluaXRpYWxpemVycyB0aGF0IGZhaWxlZCB3aWxsIG5vdCBiZVxuICAgKiBpbnZva2VkKS5cbiAgICovXG4gIGNsb3NlQWxsOiBmdW5jdGlvbiAoc3RhcnRJbmRleCkge1xuICAgICF0aGlzLmlzSW5UcmFuc2FjdGlvbigpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyYW5zYWN0aW9uLmNsb3NlQWxsKCk6IENhbm5vdCBjbG9zZSB0cmFuc2FjdGlvbiB3aGVuIG5vbmUgYXJlIG9wZW4uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHZhciB0cmFuc2FjdGlvbldyYXBwZXJzID0gdGhpcy50cmFuc2FjdGlvbldyYXBwZXJzO1xuICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDwgdHJhbnNhY3Rpb25XcmFwcGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0cmFuc2FjdGlvbldyYXBwZXJzW2ldO1xuICAgICAgdmFyIGluaXREYXRhID0gdGhpcy53cmFwcGVySW5pdERhdGFbaV07XG4gICAgICB2YXIgZXJyb3JUaHJvd247XG4gICAgICB0cnkge1xuICAgICAgICAvLyBDYXRjaGluZyBlcnJvcnMgbWFrZXMgZGVidWdnaW5nIG1vcmUgZGlmZmljdWx0LCBzbyB3ZSBzdGFydCB3aXRoXG4gICAgICAgIC8vIGVycm9yVGhyb3duIHNldCB0byB0cnVlIGJlZm9yZSBzZXR0aW5nIGl0IHRvIGZhbHNlIGFmdGVyIGNhbGxpbmdcbiAgICAgICAgLy8gY2xvc2UgLS0gaWYgaXQncyBzdGlsbCBzZXQgdG8gdHJ1ZSBpbiB0aGUgZmluYWxseSBibG9jaywgaXQgbWVhbnNcbiAgICAgICAgLy8gd3JhcHBlci5jbG9zZSB0aHJldy5cbiAgICAgICAgZXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICBpZiAoaW5pdERhdGEgIT09IFRyYW5zYWN0aW9uLk9CU0VSVkVEX0VSUk9SICYmIHdyYXBwZXIuY2xvc2UpIHtcbiAgICAgICAgICB3cmFwcGVyLmNsb3NlLmNhbGwodGhpcywgaW5pdERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAvLyBUaGUgY2xvc2VyIGZvciB3cmFwcGVyIGkgdGhyZXcgYW4gZXJyb3I7IGNsb3NlIHRoZSByZW1haW5pbmdcbiAgICAgICAgICAvLyB3cmFwcGVycyBidXQgc2lsZW5jZSBhbnkgZXhjZXB0aW9ucyBmcm9tIHRoZW0gdG8gZW5zdXJlIHRoYXQgdGhlXG4gICAgICAgICAgLy8gZmlyc3QgZXJyb3IgaXMgdGhlIG9uZSB0byBidWJibGUgdXAuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VBbGwoaSArIDEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy53cmFwcGVySW5pdERhdGEubGVuZ3RoID0gMDtcbiAgfVxufTtcblxudmFyIFRyYW5zYWN0aW9uID0ge1xuXG4gIE1peGluOiBNaXhpbixcblxuICAvKipcbiAgICogVG9rZW4gdG8gbG9vayBmb3IgdG8gZGV0ZXJtaW5lIGlmIGFuIGVycm9yIG9jY3VycmVkLlxuICAgKi9cbiAgT0JTRVJWRURfRVJST1I6IHt9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNhY3Rpb247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1RyYW5zYWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKTtcbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0TmF0aXZlQ29tcG9uZW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vLyBUbyBhdm9pZCBhIGN5Y2xpYyBkZXBlbmRlbmN5LCB3ZSBjcmVhdGUgdGhlIGZpbmFsIGNsYXNzIGluIHRoaXMgbW9kdWxlXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdGhpcy5jb25zdHJ1Y3QoZWxlbWVudCk7XG59O1xuX2Fzc2lnbihSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFdyYXBwZXIucHJvdG90eXBlLCBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5NaXhpbiwge1xuICBfaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudDogaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudFxufSk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShvd25lcikge1xuICBpZiAob3duZXIpIHtcbiAgICB2YXIgbmFtZSA9IG93bmVyLmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSB0eXBlIHJlZmVyZW5jZSBpcyBhIGtub3duIGludGVybmFsIHR5cGUuIEkuZS4gbm90IGEgdXNlclxuICogcHJvdmlkZWQgY29tcG9zaXRlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHlwZVxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoaXMgaXMgYSB2YWxpZCBpbnRlcm5hbCB0eXBlLlxuICovXG5mdW5jdGlvbiBpc0ludGVybmFsQ29tcG9uZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0eXBlLnByb3RvdHlwZS5tb3VudENvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdHlwZS5wcm90b3R5cGUucmVjZWl2ZUNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBHaXZlbiBhIFJlYWN0Tm9kZSwgY3JlYXRlIGFuIGluc3RhbmNlIHRoYXQgd2lsbCBhY3R1YWxseSBiZSBtb3VudGVkLlxuICpcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtvYmplY3R9IEEgbmV3IGluc3RhbmNlIG9mIHRoZSBlbGVtZW50J3MgY29uc3RydWN0b3IuXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmZ1bmN0aW9uIGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQobm9kZSkge1xuICB2YXIgaW5zdGFuY2U7XG5cbiAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHtcbiAgICBpbnN0YW5jZSA9IFJlYWN0RW1wdHlDb21wb25lbnQuY3JlYXRlKGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0Jykge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZTtcbiAgICAhKGVsZW1lbnQgJiYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFbGVtZW50IHR5cGUgaXMgaW52YWxpZDogZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciBidWlsdC1pbiBjb21wb25lbnRzKSAnICsgJ29yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCBlbGVtZW50LnR5cGUgPT0gbnVsbCA/IGVsZW1lbnQudHlwZSA6IHR5cGVvZiBlbGVtZW50LnR5cGUsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShlbGVtZW50Ll9vd25lcikpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBzdHJpbmcgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbnN0YW5jZSA9IFJlYWN0TmF0aXZlQ29tcG9uZW50LmNyZWF0ZUludGVybmFsQ29tcG9uZW50KGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNJbnRlcm5hbENvbXBvbmVudFR5cGUoZWxlbWVudC50eXBlKSkge1xuICAgICAgLy8gVGhpcyBpcyB0ZW1wb3JhcmlseSBhdmFpbGFibGUgZm9yIGN1c3RvbSBjb21wb25lbnRzIHRoYXQgYXJlIG5vdCBzdHJpbmdcbiAgICAgIC8vIHJlcHJlc2VudGF0aW9ucy4gSS5lLiBBUlQuIE9uY2UgdGhvc2UgYXJlIHVwZGF0ZWQgdG8gdXNlIHRoZSBzdHJpbmdcbiAgICAgIC8vIHJlcHJlc2VudGF0aW9uLCB3ZSBjYW4gZHJvcCB0aGlzIGNvZGUgcGF0aC5cbiAgICAgIGluc3RhbmNlID0gbmV3IGVsZW1lbnQudHlwZShlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UgPSBuZXcgUmVhY3RDb21wb3NpdGVDb21wb25lbnRXcmFwcGVyKGVsZW1lbnQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG5vZGUgPT09ICdudW1iZXInKSB7XG4gICAgaW5zdGFuY2UgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudC5jcmVhdGVJbnN0YW5jZUZvclRleHQobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgIWZhbHNlID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0VuY291bnRlcmVkIGludmFsaWQgUmVhY3Qgbm9kZSBvZiB0eXBlICVzJywgdHlwZW9mIG5vZGUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3RhbmNlLm1vdW50Q29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS5yZWNlaXZlQ29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS5nZXROYXRpdmVOb2RlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbnN0YW5jZS51bm1vdW50Q29tcG9uZW50ID09PSAnZnVuY3Rpb24nLCAnT25seSBSZWFjdCBDb21wb25lbnRzIGNhbiBiZSBtb3VudGVkLicpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gVGhlc2UgdHdvIGZpZWxkcyBhcmUgdXNlZCBieSB0aGUgRE9NIGFuZCBBUlQgZGlmZmluZyBhbGdvcml0aG1zXG4gIC8vIHJlc3BlY3RpdmVseS4gSW5zdGVhZCBvZiB1c2luZyBleHBhbmRvcyBvbiBjb21wb25lbnRzLCB3ZSBzaG91bGQgYmVcbiAgLy8gc3RvcmluZyB0aGUgc3RhdGUgbmVlZGVkIGJ5IHRoZSBkaWZmaW5nIGFsZ29yaXRobXMgZWxzZXdoZXJlLlxuICBpbnN0YW5jZS5fbW91bnRJbmRleCA9IDA7XG4gIGluc3RhbmNlLl9tb3VudEltYWdlID0gbnVsbDtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGluc3RhbmNlLl9pc093bmVyTmVjZXNzYXJ5ID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuX3dhcm5lZEFib3V0UmVmc0luUmVuZGVyID0gZmFsc2U7XG4gIH1cblxuICAvLyBJbnRlcm5hbCBpbnN0YW5jZXMgc2hvdWxkIGZ1bGx5IGNvbnN0cnVjdGVkIGF0IHRoaXMgcG9pbnQsIHNvIHRoZXkgc2hvdWxkXG4gIC8vIG5vdCBnZXQgYW55IG5ldyBmaWVsZHMgYWRkZWQgdG8gdGhlbSBhdCB0aGlzIHBvaW50LlxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChPYmplY3QucHJldmVudEV4dGVuc2lvbnMpIHtcbiAgICAgIE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyhpbnN0YW5jZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdEVycm9yVXRpbHMgPSByZXF1aXJlKCcuL1JlYWN0RXJyb3JVdGlscycpO1xudmFyIFJlYWN0SW5zdGFuY2VNYXAgPSByZXF1aXJlKCcuL1JlYWN0SW5zdGFuY2VNYXAnKTtcbnZhciBSZWFjdEluc3RydW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vUmVhY3RJbnN0cnVtZW50YXRpb24nKTtcbnZhciBSZWFjdE5vZGVUeXBlcyA9IHJlcXVpcmUoJy4vUmVhY3ROb2RlVHlwZXMnKTtcbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCcuL1JlYWN0UGVyZicpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbnMnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFJlY29uY2lsZXIgPSByZXF1aXJlKCcuL1JlYWN0UmVjb25jaWxlcicpO1xudmFyIFJlYWN0VXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0VXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oY29tcG9uZW50KSB7XG4gIHZhciBvd25lciA9IGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyIHx8IG51bGw7XG4gIGlmIChvd25lcikge1xuICAgIHZhciBuYW1lID0gb3duZXIuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIFN0YXRlbGVzc0NvbXBvbmVudChDb21wb25lbnQpIHt9XG5TdGF0ZWxlc3NDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENvbXBvbmVudCA9IFJlYWN0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICB2YXIgZWxlbWVudCA9IENvbXBvbmVudCh0aGlzLnByb3BzLCB0aGlzLmNvbnRleHQsIHRoaXMudXBkYXRlcik7XG4gIHdhcm5JZkludmFsaWRFbGVtZW50KENvbXBvbmVudCwgZWxlbWVudCk7XG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuZnVuY3Rpb24gd2FybklmSW52YWxpZEVsZW1lbnQoQ29tcG9uZW50LCBlbGVtZW50KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCksICclcyguLi4pOiBBIHZhbGlkIFJlYWN0IGVsZW1lbnQgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQuIFlvdSBtYXkgaGF2ZSAnICsgJ3JldHVybmVkIHVuZGVmaW5lZCwgYW4gYXJyYXkgb3Igc29tZSBvdGhlciBpbnZhbGlkIG9iamVjdC4nLCBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCcpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tIFRoZSBMaWZlLUN5Y2xlIG9mIGEgQ29tcG9zaXRlIENvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiAtIGNvbnN0cnVjdG9yOiBJbml0aWFsaXphdGlvbiBvZiBzdGF0ZS4gVGhlIGluc3RhbmNlIGlzIG5vdyByZXRhaW5lZC5cbiAqICAgLSBjb21wb25lbnRXaWxsTW91bnRcbiAqICAgLSByZW5kZXJcbiAqICAgLSBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnNdXG4gKiAgICAgLSBbY2hpbGRyZW4ncyBjb21wb25lbnRXaWxsTW91bnQgYW5kIHJlbmRlcl1cbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudERpZE1vdW50XVxuICogICAgIC0gY29tcG9uZW50RGlkTW91bnRcbiAqXG4gKiAgICAgICBVcGRhdGUgUGhhc2VzOlxuICogICAgICAgLSBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChvbmx5IGNhbGxlZCBpZiBwYXJlbnQgdXBkYXRlZClcbiAqICAgICAgIC0gc2hvdWxkQ29tcG9uZW50VXBkYXRlXG4gKiAgICAgICAgIC0gY29tcG9uZW50V2lsbFVwZGF0ZVxuICogICAgICAgICAgIC0gcmVuZGVyXG4gKiAgICAgICAgICAgLSBbY2hpbGRyZW4ncyBjb25zdHJ1Y3RvcnMgb3IgcmVjZWl2ZSBwcm9wcyBwaGFzZXNdXG4gKiAgICAgICAgIC0gY29tcG9uZW50RGlkVXBkYXRlXG4gKlxuICogICAgIC0gY29tcG9uZW50V2lsbFVubW91bnRcbiAqICAgICAtIFtjaGlsZHJlbidzIGNvbXBvbmVudFdpbGxVbm1vdW50XVxuICogICAtIFtjaGlsZHJlbiBkZXN0cm95ZWRdXG4gKiAtIChkZXN0cm95ZWQpOiBUaGUgaW5zdGFuY2UgaXMgbm93IGJsYW5rLCByZWxlYXNlZCBieSBSZWFjdCBhbmQgcmVhZHkgZm9yIEdDLlxuICpcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiBBbiBpbmNyZW1lbnRpbmcgSUQgYXNzaWduZWQgdG8gZWFjaCBjb21wb25lbnQgd2hlbiBpdCBpcyBtb3VudGVkLiBUaGlzIGlzXG4gKiB1c2VkIHRvIGVuZm9yY2UgdGhlIG9yZGVyIGluIHdoaWNoIGBSZWFjdFVwZGF0ZXNgIHVwZGF0ZXMgZGlydHkgY29tcG9uZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgbmV4dE1vdW50SUQgPSAxO1xuXG4vKipcbiAqIEBsZW5kcyB7UmVhY3RDb21wb3NpdGVDb21wb25lbnQucHJvdG90eXBlfVxuICovXG52YXIgUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpbiA9IHtcblxuICAvKipcbiAgICogQmFzZSBjb25zdHJ1Y3RvciBmb3IgYWxsIGNvbXBvc2l0ZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgdGhpcy5faW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVRdWV1ZVxuICAgIHRoaXMuX3BlbmRpbmdFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuX3BlbmRpbmdGb3JjZVVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSAwO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBTZWUgUmVhY3RVcGRhdGVzIGFuZCBSZWFjdFVwZGF0ZVF1ZXVlLlxuICAgIHRoaXMuX3BlbmRpbmdDYWxsYmFja3MgPSBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50LCByZW5kZXJzIG1hcmt1cCwgYW5kIHJlZ2lzdGVycyBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbnxSZWFjdFNlcnZlclJlbmRlcmluZ1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5hdGl2ZVBhcmVudFxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5hdGl2ZUNvbnRhaW5lckluZm9cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm4gez9zdHJpbmd9IFJlbmRlcmVkIG1hcmt1cCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBET00uXG4gICAqIEBmaW5hbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgY29udGV4dCkge1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuX21vdW50T3JkZXIgPSBuZXh0TW91bnRJRCsrO1xuICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvID0gbmF0aXZlQ29udGFpbmVySW5mbztcblxuICAgIHZhciBwdWJsaWNQcm9wcyA9IHRoaXMuX3Byb2Nlc3NQcm9wcyh0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcyk7XG4gICAgdmFyIHB1YmxpY0NvbnRleHQgPSB0aGlzLl9wcm9jZXNzQ29udGV4dChjb250ZXh0KTtcblxuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgcHVibGljIGNsYXNzXG4gICAgdmFyIGluc3Q7XG4gICAgdmFyIHJlbmRlcmVkRWxlbWVudDtcblxuICAgIGlmIChDb21wb25lbnQucHJvdG90eXBlICYmIENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaW5zdCA9IG5ldyBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChwdWJsaWNQcm9wcywgcHVibGljQ29udGV4dCwgUmVhY3RVcGRhdGVRdWV1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGluc3QgPSBDb21wb25lbnQocHVibGljUHJvcHMsIHB1YmxpY0NvbnRleHQsIFJlYWN0VXBkYXRlUXVldWUpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0ID0gQ29tcG9uZW50KHB1YmxpY1Byb3BzLCBwdWJsaWNDb250ZXh0LCBSZWFjdFVwZGF0ZVF1ZXVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0ID09IG51bGwgfHwgaW5zdC5yZW5kZXIgPT0gbnVsbCkge1xuICAgICAgICByZW5kZXJlZEVsZW1lbnQgPSBpbnN0O1xuICAgICAgICB3YXJuSWZJbnZhbGlkRWxlbWVudChDb21wb25lbnQsIHJlbmRlcmVkRWxlbWVudCk7XG4gICAgICAgICEoaW5zdCA9PT0gbnVsbCB8fCBpbnN0ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoaW5zdCkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IEEgdmFsaWQgUmVhY3QgZWxlbWVudCAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZC4gWW91IG1heSBoYXZlICcgKyAncmV0dXJuZWQgdW5kZWZpbmVkLCBhbiBhcnJheSBvciBzb21lIG90aGVyIGludmFsaWQgb2JqZWN0LicsIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICBpbnN0ID0gbmV3IFN0YXRlbGVzc0NvbXBvbmVudChDb21wb25lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgbGF0ZXIgaW4gX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudCwgYnV0IGFkZCBhbiBlYXJseVxuICAgICAgLy8gd2FybmluZyBub3cgdG8gaGVscCBkZWJ1Z2dpbmdcbiAgICAgIGlmIChpbnN0LnJlbmRlciA9PSBudWxsKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogTm8gYHJlbmRlcmAgbWV0aG9kIGZvdW5kIG9uIHRoZSByZXR1cm5lZCBjb21wb25lbnQgJyArICdpbnN0YW5jZTogeW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBkZWZpbmUgYHJlbmRlcmAuJywgQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb3BzTXV0YXRlZCA9IGluc3QucHJvcHMgIT09IHB1YmxpY1Byb3BzO1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGluc3QucHJvcHMgPT09IHVuZGVmaW5lZCB8fCAhcHJvcHNNdXRhdGVkLCAnJXMoLi4uKTogV2hlbiBjYWxsaW5nIHN1cGVyKCkgaW4gYCVzYCwgbWFrZSBzdXJlIHRvIHBhc3MgJyArICd1cCB0aGUgc2FtZSBwcm9wcyB0aGF0IHlvdXIgY29tcG9uZW50XFwncyBjb25zdHJ1Y3RvciB3YXMgcGFzc2VkLicsIGNvbXBvbmVudE5hbWUsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFRoZXNlIHNob3VsZCBiZSBzZXQgdXAgaW4gdGhlIGNvbnN0cnVjdG9yLCBidXQgYXMgYSBjb252ZW5pZW5jZSBmb3JcbiAgICAvLyBzaW1wbGVyIGNsYXNzIGFic3RyYWN0aW9ucywgd2Ugc2V0IHRoZW0gdXAgYWZ0ZXIgdGhlIGZhY3QuXG4gICAgaW5zdC5wcm9wcyA9IHB1YmxpY1Byb3BzO1xuICAgIGluc3QuY29udGV4dCA9IHB1YmxpY0NvbnRleHQ7XG4gICAgaW5zdC5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgaW5zdC51cGRhdGVyID0gUmVhY3RVcGRhdGVRdWV1ZTtcblxuICAgIHRoaXMuX2luc3RhbmNlID0gaW5zdDtcblxuICAgIC8vIFN0b3JlIGEgcmVmZXJlbmNlIGZyb20gdGhlIGluc3RhbmNlIGJhY2sgdG8gdGhlIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgUmVhY3RJbnN0YW5jZU1hcC5zZXQoaW5zdCwgdGhpcyk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gU2luY2UgcGxhaW4gSlMgY2xhc3NlcyBhcmUgZGVmaW5lZCB3aXRob3V0IGFueSBzcGVjaWFsIGluaXRpYWxpemF0aW9uXG4gICAgICAvLyBsb2dpYywgd2UgY2FuIG5vdCBjYXRjaCBjb21tb24gZXJyb3JzIGVhcmx5LiBUaGVyZWZvcmUsIHdlIGhhdmUgdG9cbiAgICAgIC8vIGNhdGNoIHRoZW0gaGVyZSwgYXQgaW5pdGlhbGl6YXRpb24gdGltZSwgaW5zdGVhZC5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldEluaXRpYWxTdGF0ZSB8fCBpbnN0LmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldEluaXRpYWxTdGF0ZSB3YXMgZGVmaW5lZCBvbiAlcywgYSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzLiAnICsgJ1RoaXMgaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNsYXNzZXMgY3JlYXRlZCB1c2luZyBSZWFjdC5jcmVhdGVDbGFzcy4gJyArICdEaWQgeW91IG1lYW4gdG8gZGVmaW5lIGEgc3RhdGUgcHJvcGVydHkgaW5zdGVhZD8nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFpbnN0LmdldERlZmF1bHRQcm9wcyB8fCBpbnN0LmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyB3YXMgZGVmaW5lZCBvbiAlcywgYSBwbGFpbiBKYXZhU2NyaXB0IGNsYXNzLiAnICsgJ1RoaXMgaXMgb25seSBzdXBwb3J0ZWQgZm9yIGNsYXNzZXMgY3JlYXRlZCB1c2luZyBSZWFjdC5jcmVhdGVDbGFzcy4gJyArICdVc2UgYSBzdGF0aWMgcHJvcGVydHkgdG8gZGVmaW5lIGRlZmF1bHRQcm9wcyBpbnN0ZWFkLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdhIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWluc3QucHJvcFR5cGVzLCAncHJvcFR5cGVzIHdhcyBkZWZpbmVkIGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IG9uICVzLiBVc2UgYSBzdGF0aWMgJyArICdwcm9wZXJ0eSB0byBkZWZpbmUgcHJvcFR5cGVzIGluc3RlYWQuJywgdGhpcy5nZXROYW1lKCkgfHwgJ2EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghaW5zdC5jb250ZXh0VHlwZXMsICdjb250ZXh0VHlwZXMgd2FzIGRlZmluZWQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgb24gJXMuIFVzZSBhICcgKyAnc3RhdGljIHByb3BlcnR5IHRvIGRlZmluZSBjb250ZXh0VHlwZXMgaW5zdGVhZC4nLCB0aGlzLmdldE5hbWUoKSB8fCAnYSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiBpbnN0LmNvbXBvbmVudFNob3VsZFVwZGF0ZSAhPT0gJ2Z1bmN0aW9uJywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIGluc3QuY29tcG9uZW50RGlkVW5tb3VudCAhPT0gJ2Z1bmN0aW9uJywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnREaWRVbm1vdW50KCkuIEJ1dCB0aGVyZSBpcyBubyBzdWNoIGxpZmVjeWNsZSBtZXRob2QuICcgKyAnRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxVbm1vdW50KCk/JywgdGhpcy5nZXROYW1lKCkgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgaW5zdC5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzICE9PSAnZnVuY3Rpb24nLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCB0aGlzLmdldE5hbWUoKSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gaW5zdC5zdGF0ZTtcbiAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGluc3Quc3RhdGUgPSBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgIH1cbiAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLnN0YXRlOiBtdXN0IGJlIHNldCB0byBhbiBvYmplY3Qgb3IgbnVsbCcsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcblxuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG5cbiAgICB2YXIgbWFya3VwO1xuICAgIGlmIChpbnN0LnVuc3RhYmxlX2hhbmRsZUVycm9yKSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZyhyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXJrdXAgPSB0aGlzLnBlcmZvcm1Jbml0aWFsTW91bnQocmVuZGVyZWRFbGVtZW50LCBuYXRpdmVQYXJlbnQsIG5hdGl2ZUNvbnRhaW5lckluZm8sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnREaWRNb3VudCkge1xuICAgICAgdHJhbnNhY3Rpb24uZ2V0UmVhY3RNb3VudFJlYWR5KCkuZW5xdWV1ZShpbnN0LmNvbXBvbmVudERpZE1vdW50LCBpbnN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIHBlcmZvcm1Jbml0aWFsTW91bnRXaXRoRXJyb3JIYW5kbGluZzogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBtYXJrdXA7XG4gICAgdmFyIGNoZWNrcG9pbnQgPSB0cmFuc2FjdGlvbi5jaGVja3BvaW50KCk7XG4gICAgdHJ5IHtcbiAgICAgIG1hcmt1cCA9IHRoaXMucGVyZm9ybUluaXRpYWxNb3VudChyZW5kZXJlZEVsZW1lbnQsIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIFJvbGwgYmFjayB0byBjaGVja3BvaW50LCBoYW5kbGUgZXJyb3IgKHdoaWNoIG1heSBhZGQgaXRlbXMgdG8gdGhlIHRyYW5zYWN0aW9uKSwgYW5kIHRha2UgYSBuZXcgY2hlY2twb2ludFxuICAgICAgdHJhbnNhY3Rpb24ucm9sbGJhY2soY2hlY2twb2ludCk7XG4gICAgICB0aGlzLl9pbnN0YW5jZS51bnN0YWJsZV9oYW5kbGVFcnJvcihlKTtcbiAgICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSkge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZS5zdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUodGhpcy5faW5zdGFuY2UucHJvcHMsIHRoaXMuX2luc3RhbmNlLmNvbnRleHQpO1xuICAgICAgfVxuICAgICAgY2hlY2twb2ludCA9IHRyYW5zYWN0aW9uLmNoZWNrcG9pbnQoKTtcblxuICAgICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQudW5tb3VudENvbXBvbmVudCh0cnVlKTtcbiAgICAgIHRyYW5zYWN0aW9uLnJvbGxiYWNrKGNoZWNrcG9pbnQpO1xuXG4gICAgICAvLyBUcnkgYWdhaW4gLSB3ZSd2ZSBpbmZvcm1lZCB0aGUgY29tcG9uZW50IGFib3V0IHRoZSBlcnJvciwgc28gdGhleSBjYW4gcmVuZGVyIGFuIGVycm9yIG1lc3NhZ2UgdGhpcyB0aW1lLlxuICAgICAgLy8gSWYgdGhpcyB0aHJvd3MgYWdhaW4sIHRoZSBlcnJvciB3aWxsIGJ1YmJsZSB1cCAoYW5kIGNhbiBiZSBjYXVnaHQgYnkgYSBoaWdoZXIgZXJyb3IgYm91bmRhcnkpLlxuICAgICAgbWFya3VwID0gdGhpcy5wZXJmb3JtSW5pdGlhbE1vdW50KHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXJrdXA7XG4gIH0sXG5cbiAgcGVyZm9ybUluaXRpYWxNb3VudDogZnVuY3Rpb24gKHJlbmRlcmVkRWxlbWVudCwgbmF0aXZlUGFyZW50LCBuYXRpdmVDb250YWluZXJJbmZvLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbE1vdW50KSB7XG4gICAgICBpbnN0LmNvbXBvbmVudFdpbGxNb3VudCgpO1xuICAgICAgLy8gV2hlbiBtb3VudGluZywgY2FsbHMgdG8gYHNldFN0YXRlYCBieSBgY29tcG9uZW50V2lsbE1vdW50YCB3aWxsIHNldFxuICAgICAgLy8gYHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlYCB3aXRob3V0IHRyaWdnZXJpbmcgYSByZS1yZW5kZXIuXG4gICAgICBpZiAodGhpcy5fcGVuZGluZ1N0YXRlUXVldWUpIHtcbiAgICAgICAgaW5zdC5zdGF0ZSA9IHRoaXMuX3Byb2Nlc3NQZW5kaW5nU3RhdGUoaW5zdC5wcm9wcywgaW5zdC5jb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBub3QgYSBzdGF0ZWxlc3MgY29tcG9uZW50LCB3ZSBub3cgcmVuZGVyXG4gICAgaWYgKHJlbmRlcmVkRWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZW5kZXJlZEVsZW1lbnQgPSB0aGlzLl9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlZE5vZGVUeXBlID0gUmVhY3ROb2RlVHlwZXMuZ2V0VHlwZShyZW5kZXJlZEVsZW1lbnQpO1xuICAgIHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50ID0gdGhpcy5faW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChyZW5kZXJlZEVsZW1lbnQpO1xuXG4gICAgdmFyIG1hcmt1cCA9IFJlYWN0UmVjb25jaWxlci5tb3VudENvbXBvbmVudCh0aGlzLl9yZW5kZXJlZENvbXBvbmVudCwgdHJhbnNhY3Rpb24sIG5hdGl2ZVBhcmVudCwgbmF0aXZlQ29udGFpbmVySW5mbywgdGhpcy5fcHJvY2Vzc0NoaWxkQ29udGV4dChjb250ZXh0KSk7XG5cbiAgICByZXR1cm4gbWFya3VwO1xuICB9LFxuXG4gIGdldE5hdGl2ZU5vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyBhbnkgcmVzb3VyY2VzIGFsbG9jYXRlZCBieSBgbW91bnRDb21wb25lbnRgLlxuICAgKlxuICAgKiBAZmluYWxcbiAgICogQGludGVybmFsXG4gICAqL1xuICB1bm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgaWYgKCF0aGlzLl9yZW5kZXJlZENvbXBvbmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgaWYgKGluc3QuY29tcG9uZW50V2lsbFVubW91bnQpIHtcbiAgICAgIGlmIChzYWZlbHkpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSArICcuY29tcG9uZW50V2lsbFVubW91bnQoKSc7XG4gICAgICAgIFJlYWN0RXJyb3JVdGlscy5pbnZva2VHdWFyZGVkQ2FsbGJhY2sobmFtZSwgaW5zdC5jb21wb25lbnRXaWxsVW5tb3VudC5iaW5kKGluc3QpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3QuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVuZGVyZWRDb21wb25lbnQpIHtcbiAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHRoaXMuX3JlbmRlcmVkQ29tcG9uZW50LCBzYWZlbHkpO1xuICAgICAgdGhpcy5fcmVuZGVyZWROb2RlVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLl9yZW5kZXJlZENvbXBvbmVudCA9IG51bGw7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVzZXQgcGVuZGluZyBmaWVsZHNcbiAgICAvLyBFdmVuIGlmIHRoaXMgY29tcG9uZW50IGlzIHNjaGVkdWxlZCBmb3IgYW5vdGhlciB1cGRhdGUgaW4gUmVhY3RVcGRhdGVzLFxuICAgIC8vIGl0IHdvdWxkIHN0aWxsIGJlIGlnbm9yZWQgYmVjYXVzZSB0aGVzZSBmaWVsZHMgYXJlIHJlc2V0LlxuICAgIHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlID0gbnVsbDtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0ZvcmNlVXBkYXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ0NhbGxiYWNrcyA9IG51bGw7XG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgLy8gVGhlc2UgZmllbGRzIGRvIG5vdCByZWFsbHkgbmVlZCB0byBiZSByZXNldCBzaW5jZSB0aGlzIG9iamVjdCBpcyBub1xuICAgIC8vIGxvbmdlciBhY2Nlc3NpYmxlLlxuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG5cbiAgICAvLyBEZWxldGUgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZSBpbnN0YW5jZSB0byB0aGlzIGludGVybmFsIHJlcHJlc2VudGF0aW9uXG4gICAgLy8gd2hpY2ggYWxsb3cgdGhlIGludGVybmFscyB0byBiZSBwcm9wZXJseSBjbGVhbmVkIHVwIGV2ZW4gaWYgdGhlIHVzZXJcbiAgICAvLyBsZWFrcyBhIHJlZmVyZW5jZSB0byB0aGUgcHVibGljIGluc3RhbmNlLlxuICAgIFJlYWN0SW5zdGFuY2VNYXAucmVtb3ZlKGluc3QpO1xuXG4gICAgLy8gU29tZSBleGlzdGluZyBjb21wb25lbnRzIHJlbHkgb24gaW5zdC5wcm9wcyBldmVuIGFmdGVyIHRoZXkndmUgYmVlblxuICAgIC8vIGRlc3Ryb3llZCAoaW4gZXZlbnQgaGFuZGxlcnMpLlxuICAgIC8vIFRPRE86IGluc3QucHJvcHMgPSBudWxsO1xuICAgIC8vIFRPRE86IGluc3Quc3RhdGUgPSBudWxsO1xuICAgIC8vIFRPRE86IGluc3QuY29udGV4dCA9IG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgdGhlIGNvbnRleHQgb2JqZWN0IHRvIG9ubHkgY29udGFpbiBrZXlzIHNwZWNpZmllZCBpblxuICAgKiBgY29udGV4dFR5cGVzYFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX21hc2tDb250ZXh0OiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgIHZhciBjb250ZXh0VHlwZXMgPSBDb21wb25lbnQuY29udGV4dFR5cGVzO1xuICAgIGlmICghY29udGV4dFR5cGVzKSB7XG4gICAgICByZXR1cm4gZW1wdHlPYmplY3Q7XG4gICAgfVxuICAgIHZhciBtYXNrZWRDb250ZXh0ID0ge307XG4gICAgZm9yICh2YXIgY29udGV4dE5hbWUgaW4gY29udGV4dFR5cGVzKSB7XG4gICAgICBtYXNrZWRDb250ZXh0W2NvbnRleHROYW1lXSA9IGNvbnRleHRbY29udGV4dE5hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gbWFza2VkQ29udGV4dDtcbiAgfSxcblxuICAvKipcbiAgICogRmlsdGVycyB0aGUgY29udGV4dCBvYmplY3QgdG8gb25seSBjb250YWluIGtleXMgc3BlY2lmaWVkIGluXG4gICAqIGBjb250ZXh0VHlwZXNgLCBhbmQgYXNzZXJ0cyB0aGF0IHRoZXkgYXJlIHZhbGlkLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29udGV4dFxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3Byb2Nlc3NDb250ZXh0OiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHZhciBtYXNrZWRDb250ZXh0ID0gdGhpcy5fbWFza0NvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgICAgaWYgKENvbXBvbmVudC5jb250ZXh0VHlwZXMpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LmNvbnRleHRUeXBlcywgbWFza2VkQ29udGV4dCwgUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5jb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50Q29udGV4dFxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcHJvY2Vzc0NoaWxkQ29udGV4dDogZnVuY3Rpb24gKGN1cnJlbnRDb250ZXh0KSB7XG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMuX2N1cnJlbnRFbGVtZW50LnR5cGU7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgUmVhY3RJbnN0cnVtZW50YXRpb24uZGVidWdUb29sLm9uQmVnaW5Qcm9jZXNzaW5nQ2hpbGRDb250ZXh0KCk7XG4gICAgfVxuICAgIHZhciBjaGlsZENvbnRleHQgPSBpbnN0LmdldENoaWxkQ29udGV4dCAmJiBpbnN0LmdldENoaWxkQ29udGV4dCgpO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBSZWFjdEluc3RydW1lbnRhdGlvbi5kZWJ1Z1Rvb2wub25FbmRQcm9jZXNzaW5nQ2hpbGRDb250ZXh0KCk7XG4gICAgfVxuICAgIGlmIChjaGlsZENvbnRleHQpIHtcbiAgICAgICEodHlwZW9mIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcyA9PT0gJ29iamVjdCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gJyArICd1c2UgZ2V0Q2hpbGRDb250ZXh0KCkuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHQsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMuY2hpbGRDb250ZXh0KTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY2hpbGRDb250ZXh0KSB7XG4gICAgICAgICEobmFtZSBpbiBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBrZXkgXCIlc1wiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLicsIHRoaXMuZ2V0TmFtZSgpIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIG5hbWUpIDogaW52YXJpYW50KGZhbHNlKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYXNzaWduKHt9LCBjdXJyZW50Q29udGV4dCwgY2hpbGRDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRDb250ZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgcHJvcHMgYnkgc2V0dGluZyBkZWZhdWx0IHZhbHVlcyBmb3IgdW5zcGVjaWZpZWQgcHJvcHMgYW5kXG4gICAqIGFzc2VydGluZyB0aGF0IHRoZSBwcm9wcyBhcmUgdmFsaWQuIERvZXMgbm90IG11dGF0ZSBpdHMgYXJndW1lbnQ7IHJldHVybnNcbiAgICogYSBuZXcgcHJvcHMgb2JqZWN0IHdpdGggZGVmYXVsdHMgbWVyZ2VkIGluLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV3UHJvcHNcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3Byb2Nlc3NQcm9wczogZnVuY3Rpb24gKG5ld1Byb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC50eXBlO1xuICAgICAgaWYgKENvbXBvbmVudC5wcm9wVHlwZXMpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tQcm9wVHlwZXMoQ29tcG9uZW50LnByb3BUeXBlcywgbmV3UHJvcHMsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbnMucHJvcCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdQcm9wcztcbiAgfSxcblxuICAvKipcbiAgICogQXNzZXJ0IHRoYXQgdGhlIHByb3BzIGFyZSB2YWxpZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcFR5cGVzIE1hcCBvZiBwcm9wIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2hlY2tQcm9wVHlwZXM6IGZ1bmN0aW9uIChwcm9wVHlwZXMsIHByb3BzLCBsb2NhdGlvbikge1xuICAgIC8vIFRPRE86IFN0b3AgdmFsaWRhdGluZyBwcm9wIHR5cGVzIGhlcmUgYW5kIG9ubHkgdXNlIHRoZSBlbGVtZW50XG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BUeXBlcykge1xuICAgICAgaWYgKHByb3BUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICAhKHR5cGVvZiBwcm9wVHlwZXNbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSAnICsgJ2Zyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgICAgIGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgLy8gV2UgbWF5IHdhbnQgdG8gZXh0ZW5kIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgZXJyb3JzIGluXG4gICAgICAgICAgLy8gdG9wLWxldmVsIHJlbmRlciBjYWxscywgc28gSSdtIGFic3RyYWN0aW5nIGl0IGF3YXkgaW50b1xuICAgICAgICAgIC8vIGEgZnVuY3Rpb24gdG8gbWluaW1pemUgcmVmYWN0b3JpbmcgaW4gdGhlIGZ1dHVyZVxuICAgICAgICAgIHZhciBhZGRlbmR1bSA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSh0aGlzKTtcblxuICAgICAgICAgIGlmIChsb2NhdGlvbiA9PT0gUmVhY3RQcm9wVHlwZUxvY2F0aW9ucy5wcm9wKSB7XG4gICAgICAgICAgICAvLyBQcmVmYWNlIGdpdmVzIHVzIHNvbWV0aGluZyB0byBibGFja2xpc3QgaW4gd2FybmluZyBtb2R1bGVcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgQ29udGV4dCBUeXBlczogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgbmV4dENvbnRleHQpIHtcbiAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICB2YXIgcHJldkNvbnRleHQgPSB0aGlzLl9jb250ZXh0O1xuXG4gICAgdGhpcy5fcGVuZGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgcHJldkNvbnRleHQsIG5leHRDb250ZXh0KTtcbiAgfSxcblxuICAvKipcbiAgICogSWYgYW55IG9mIGBfcGVuZGluZ0VsZW1lbnRgLCBgX3BlbmRpbmdTdGF0ZVF1ZXVlYCwgb3IgYF9wZW5kaW5nRm9yY2VVcGRhdGVgXG4gICAqIGlzIHNldCwgdXBkYXRlIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqL1xuICBwZXJmb3JtVXBkYXRlSWZOZWNlc3Nhcnk6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbikge1xuICAgIGlmICh0aGlzLl9wZW5kaW5nRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudCh0aGlzLCB0aGlzLl9wZW5kaW5nRWxlbWVudCwgdHJhbnNhY3Rpb24sIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZW5kaW5nU3RhdGVRdWV1ZSAhPT0gbnVsbCB8fCB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KHRyYW5zYWN0aW9uLCB0aGlzLl9jdXJyZW50RWxlbWVudCwgdGhpcy5fY3VycmVudEVsZW1lbnQsIHRoaXMuX2NvbnRleHQsIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUGVyZm9ybSBhbiB1cGRhdGUgdG8gYSBtb3VudGVkIGNvbXBvbmVudC4gVGhlIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgYW5kXG4gICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSBtZXRob2RzIGFyZSBjYWxsZWQsIHRoZW4gKGFzc3VtaW5nIHRoZSB1cGRhdGUgaXNuJ3RcbiAgICogc2tpcHBlZCkgdGhlIHJlbWFpbmluZyB1cGRhdGUgbGlmZWN5Y2xlIG1ldGhvZHMgYXJlIGNhbGxlZCBhbmQgdGhlIERPTVxuICAgKiByZXByZXNlbnRhdGlvbiBpcyB1cGRhdGVkLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IHByZXZQYXJlbnRFbGVtZW50XG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBuZXh0UGFyZW50RWxlbWVudFxuICAgKiBAaW50ZXJuYWxcbiAgICogQG92ZXJyaWRhYmxlXG4gICAqL1xuICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldlBhcmVudEVsZW1lbnQsIG5leHRQYXJlbnRFbGVtZW50LCBwcmV2VW5tYXNrZWRDb250ZXh0LCBuZXh0VW5tYXNrZWRDb250ZXh0KSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICB2YXIgd2lsbFJlY2VpdmUgPSBmYWxzZTtcbiAgICB2YXIgbmV4dENvbnRleHQ7XG4gICAgdmFyIG5leHRQcm9wcztcblxuICAgIC8vIERldGVybWluZSBpZiB0aGUgY29udGV4dCBoYXMgY2hhbmdlZCBvciBub3RcbiAgICBpZiAodGhpcy5fY29udGV4dCA9PT0gbmV4dFVubWFza2VkQ29udGV4dCkge1xuICAgICAgbmV4dENvbnRleHQgPSBpbnN0LmNvbnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRDb250ZXh0ID0gdGhpcy5fcHJvY2Vzc0NvbnRleHQobmV4dFVubWFza2VkQ29udGV4dCk7XG4gICAgICB3aWxsUmVjZWl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gRGlzdGluZ3Vpc2ggYmV0d2VlbiBhIHByb3BzIHVwZGF0ZSB2ZXJzdXMgYSBzaW1wbGUgc3RhdGUgdXBkYXRlXG4gICAgaWYgKHByZXZQYXJlbnRFbGVtZW50ID09PSBuZXh0UGFyZW50RWxlbWVudCkge1xuICAgICAgLy8gU2tpcCBjaGVja2luZyBwcm9wIHR5cGVzIGFnYWluIC0tIHdlIGRvbid0IHJlYWQgaW5zdC5wcm9wcyB0byBhdm9pZFxuICAgICAgLy8gd2FybmluZyBmb3IgRE9NIGNvbXBvbmVudCBwcm9wcyBpbiB0aGlzIHVwZ3JhZGVcbiAgICAgIG5leHRQcm9wcyA9IG5leHRQYXJlbnRFbGVtZW50LnByb3BzO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0UHJvcHMgPSB0aGlzLl9wcm9jZXNzUHJvcHMobmV4dFBhcmVudEVsZW1lbnQucHJvcHMpO1xuICAgICAgd2lsbFJlY2VpdmUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFuIHVwZGF0ZSBoZXJlIHdpbGwgc2NoZWR1bGUgYW4gdXBkYXRlIGJ1dCBpbW1lZGlhdGVseSBzZXRcbiAgICAvLyBfcGVuZGluZ1N0YXRlUXVldWUgd2hpY2ggd2lsbCBlbnN1cmUgdGhhdCBhbnkgc3RhdGUgdXBkYXRlcyBnZXRzXG4gICAgLy8gaW1tZWRpYXRlbHkgcmVjb25jaWxlZCBpbnN0ZWFkIG9mIHdhaXRpbmcgZm9yIHRoZSBuZXh0IGJhdGNoLlxuICAgIGlmICh3aWxsUmVjZWl2ZSAmJiBpbnN0LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIHtcbiAgICAgIGluc3QuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcbiAgICB9XG5cbiAgICB2YXIgbmV4dFN0YXRlID0gdGhpcy5fcHJvY2Vzc1BlbmRpbmdTdGF0ZShuZXh0UHJvcHMsIG5leHRDb250ZXh0KTtcblxuICAgIHZhciBzaG91bGRVcGRhdGUgPSB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgfHwgIWluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlIHx8IGluc3Quc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoc2hvdWxkVXBkYXRlICE9PSB1bmRlZmluZWQsICclcy5zaG91bGRDb21wb25lbnRVcGRhdGUoKTogUmV0dXJuZWQgdW5kZWZpbmVkIGluc3RlYWQgb2YgYSAnICsgJ2Jvb2xlYW4gdmFsdWUuIE1ha2Ugc3VyZSB0byByZXR1cm4gdHJ1ZSBvciBmYWxzZS4nLCB0aGlzLmdldE5hbWUoKSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICB0aGlzLl9wZW5kaW5nRm9yY2VVcGRhdGUgPSBmYWxzZTtcbiAgICAgIC8vIFdpbGwgc2V0IGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgIGFuZCBgdGhpcy5jb250ZXh0YC5cbiAgICAgIHRoaXMuX3BlcmZvcm1Db21wb25lbnRVcGRhdGUobmV4dFBhcmVudEVsZW1lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgdHJhbnNhY3Rpb24sIG5leHRVbm1hc2tlZENvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBpdCdzIGRldGVybWluZWQgdGhhdCBhIGNvbXBvbmVudCBzaG91bGQgbm90IHVwZGF0ZSwgd2Ugc3RpbGwgd2FudFxuICAgICAgLy8gdG8gc2V0IHByb3BzIGFuZCBzdGF0ZSBidXQgd2Ugc2hvcnRjdXQgdGhlIHJlc3Qgb2YgdGhlIHVwZGF0ZS5cbiAgICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dFBhcmVudEVsZW1lbnQ7XG4gICAgICB0aGlzLl9jb250ZXh0ID0gbmV4dFVubWFza2VkQ29udGV4dDtcbiAgICAgIGluc3QucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgaW5zdC5jb250ZXh0ID0gbmV4dENvbnRleHQ7XG4gICAgfVxuICB9LFxuXG4gIF9wcm9jZXNzUGVuZGluZ1N0YXRlOiBmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuICAgIHZhciBxdWV1ZSA9IHRoaXMuX3BlbmRpbmdTdGF0ZVF1ZXVlO1xuICAgIHZhciByZXBsYWNlID0gdGhpcy5fcGVuZGluZ1JlcGxhY2VTdGF0ZTtcbiAgICB0aGlzLl9wZW5kaW5nUmVwbGFjZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fcGVuZGluZ1N0YXRlUXVldWUgPSBudWxsO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuICAgICAgcmV0dXJuIGluc3Quc3RhdGU7XG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2UgJiYgcXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gcXVldWVbMF07XG4gICAgfVxuXG4gICAgdmFyIG5leHRTdGF0ZSA9IF9hc3NpZ24oe30sIHJlcGxhY2UgPyBxdWV1ZVswXSA6IGluc3Quc3RhdGUpO1xuICAgIGZvciAodmFyIGkgPSByZXBsYWNlID8gMSA6IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBhcnRpYWwgPSBxdWV1ZVtpXTtcbiAgICAgIF9hc3NpZ24obmV4dFN0YXRlLCB0eXBlb2YgcGFydGlhbCA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnRpYWwuY2FsbChpbnN0LCBuZXh0U3RhdGUsIHByb3BzLCBjb250ZXh0KSA6IHBhcnRpYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1lcmdlcyBuZXcgcHJvcHMgYW5kIHN0YXRlLCBub3RpZmllcyBkZWxlZ2F0ZSBtZXRob2RzIG9mIHVwZGF0ZSBhbmRcbiAgICogcGVyZm9ybXMgdXBkYXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbmV4dEVsZW1lbnQgTmV4dCBlbGVtZW50XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHMgTmV4dCBwdWJsaWMgb2JqZWN0IHRvIHNldCBhcyBwcm9wZXJ0aWVzLlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZSBOZXh0IG9iamVjdCB0byBzZXQgYXMgc3RhdGUuXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHQgTmV4dCBwdWJsaWMgb2JqZWN0IHRvIHNldCBhcyBjb250ZXh0LlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSB7P29iamVjdH0gdW5tYXNrZWRDb250ZXh0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGVyZm9ybUNvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKG5leHRFbGVtZW50LCBuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQsIHRyYW5zYWN0aW9uLCB1bm1hc2tlZENvbnRleHQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuX2luc3RhbmNlO1xuXG4gICAgdmFyIGhhc0NvbXBvbmVudERpZFVwZGF0ZSA9IEJvb2xlYW4oaW5zdC5jb21wb25lbnREaWRVcGRhdGUpO1xuICAgIHZhciBwcmV2UHJvcHM7XG4gICAgdmFyIHByZXZTdGF0ZTtcbiAgICB2YXIgcHJldkNvbnRleHQ7XG4gICAgaWYgKGhhc0NvbXBvbmVudERpZFVwZGF0ZSkge1xuICAgICAgcHJldlByb3BzID0gaW5zdC5wcm9wcztcbiAgICAgIHByZXZTdGF0ZSA9IGluc3Quc3RhdGU7XG4gICAgICBwcmV2Q29udGV4dCA9IGluc3QuY29udGV4dDtcbiAgICB9XG5cbiAgICBpZiAoaW5zdC5jb21wb25lbnRXaWxsVXBkYXRlKSB7XG4gICAgICBpbnN0LmNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcbiAgICB9XG5cbiAgICB0aGlzLl9jdXJyZW50RWxlbWVudCA9IG5leHRFbGVtZW50O1xuICAgIHRoaXMuX2NvbnRleHQgPSB1bm1hc2tlZENvbnRleHQ7XG4gICAgaW5zdC5wcm9wcyA9IG5leHRQcm9wcztcbiAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgIGluc3QuY29udGV4dCA9IG5leHRDb250ZXh0O1xuXG4gICAgdGhpcy5fdXBkYXRlUmVuZGVyZWRDb21wb25lbnQodHJhbnNhY3Rpb24sIHVubWFza2VkQ29udGV4dCk7XG5cbiAgICBpZiAoaGFzQ29tcG9uZW50RGlkVXBkYXRlKSB7XG4gICAgICB0cmFuc2FjdGlvbi5nZXRSZWFjdE1vdW50UmVhZHkoKS5lbnF1ZXVlKGluc3QuY29tcG9uZW50RGlkVXBkYXRlLmJpbmQoaW5zdCwgcHJldlByb3BzLCBwcmV2U3RhdGUsIHByZXZDb250ZXh0KSwgaW5zdCk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDYWxsIHRoZSBjb21wb25lbnQncyBgcmVuZGVyYCBtZXRob2QgYW5kIHVwZGF0ZSB0aGUgRE9NIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX3VwZGF0ZVJlbmRlcmVkQ29tcG9uZW50OiBmdW5jdGlvbiAodHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICB2YXIgcHJldkNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5fcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgdmFyIHByZXZSZW5kZXJlZEVsZW1lbnQgPSBwcmV2Q29tcG9uZW50SW5zdGFuY2UuX2N1cnJlbnRFbGVtZW50O1xuICAgIHZhciBuZXh0UmVuZGVyZWRFbGVtZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50KCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZSZW5kZXJlZEVsZW1lbnQsIG5leHRSZW5kZXJlZEVsZW1lbnQpKSB7XG4gICAgICBSZWFjdFJlY29uY2lsZXIucmVjZWl2ZUNvbXBvbmVudChwcmV2Q29tcG9uZW50SW5zdGFuY2UsIG5leHRSZW5kZXJlZEVsZW1lbnQsIHRyYW5zYWN0aW9uLCB0aGlzLl9wcm9jZXNzQ2hpbGRDb250ZXh0KGNvbnRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9sZE5hdGl2ZU5vZGUgPSBSZWFjdFJlY29uY2lsZXIuZ2V0TmF0aXZlTm9kZShwcmV2Q29tcG9uZW50SW5zdGFuY2UpO1xuICAgICAgUmVhY3RSZWNvbmNpbGVyLnVubW91bnRDb21wb25lbnQocHJldkNvbXBvbmVudEluc3RhbmNlLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVkTm9kZVR5cGUgPSBSZWFjdE5vZGVUeXBlcy5nZXRUeXBlKG5leHRSZW5kZXJlZEVsZW1lbnQpO1xuICAgICAgdGhpcy5fcmVuZGVyZWRDb21wb25lbnQgPSB0aGlzLl9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50KG5leHRSZW5kZXJlZEVsZW1lbnQpO1xuICAgICAgdmFyIG5leHRNYXJrdXAgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQodGhpcy5fcmVuZGVyZWRDb21wb25lbnQsIHRyYW5zYWN0aW9uLCB0aGlzLl9uYXRpdmVQYXJlbnQsIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8sIHRoaXMuX3Byb2Nlc3NDaGlsZENvbnRleHQoY29udGV4dCkpO1xuICAgICAgdGhpcy5fcmVwbGFjZU5vZGVXaXRoTWFya3VwKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT3ZlcnJpZGRlbiBpbiBzaGFsbG93IHJlbmRlcmluZy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKG9sZE5hdGl2ZU5vZGUsIG5leHRNYXJrdXApIHtcbiAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cChvbGROYXRpdmVOb2RlLCBuZXh0TWFya3VwKTtcbiAgfSxcblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgX3JlbmRlclZhbGlkYXRlZENvbXBvbmVudFdpdGhvdXRPd25lck9yQ29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnN0ID0gdGhpcy5faW5zdGFuY2U7XG4gICAgdmFyIHJlbmRlcmVkQ29tcG9uZW50ID0gaW5zdC5yZW5kZXIoKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICBpZiAocmVuZGVyZWRDb21wb25lbnQgPT09IHVuZGVmaW5lZCAmJiBpbnN0LnJlbmRlci5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgcmVuZGVyZWRDb21wb25lbnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW5kZXJlZENvbXBvbmVudDtcbiAgfSxcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVuZGVyZWRDb21wb25lbnQ7XG4gICAgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCA9IHRoaXM7XG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlcmVkQ29tcG9uZW50ID0gdGhpcy5fcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50V2l0aG91dE93bmVyT3JDb250ZXh0KCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICAhKFxuICAgIC8vIFRPRE86IEFuIGBpc1ZhbGlkTm9kZWAgZnVuY3Rpb24gd291bGQgcHJvYmFibHkgYmUgbW9yZSBhcHByb3ByaWF0ZVxuICAgIHJlbmRlcmVkQ29tcG9uZW50ID09PSBudWxsIHx8IHJlbmRlcmVkQ29tcG9uZW50ID09PSBmYWxzZSB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocmVuZGVyZWRDb21wb25lbnQpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICclcy5yZW5kZXIoKTogQSB2YWxpZCBSZWFjdCBlbGVtZW50IChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkLiBZb3UgbWF5IGhhdmUgJyArICdyZXR1cm5lZCB1bmRlZmluZWQsIGFuIGFycmF5IG9yIHNvbWUgb3RoZXIgaW52YWxpZCBvYmplY3QuJywgdGhpcy5nZXROYW1lKCkgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgIHJldHVybiByZW5kZXJlZENvbXBvbmVudDtcbiAgfSxcblxuICAvKipcbiAgICogTGF6aWx5IGFsbG9jYXRlcyB0aGUgcmVmcyBvYmplY3QgYW5kIHN0b3JlcyBgY29tcG9uZW50YCBhcyBgcmVmYC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlZiBSZWZlcmVuY2UgbmFtZS5cbiAgICogQHBhcmFtIHtjb21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gc3RvcmUgYXMgYHJlZmAuXG4gICAqIEBmaW5hbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXR0YWNoUmVmOiBmdW5jdGlvbiAocmVmLCBjb21wb25lbnQpIHtcbiAgICB2YXIgaW5zdCA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKTtcbiAgICAhKGluc3QgIT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGhhdmUgcmVmcy4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgdmFyIHB1YmxpY0NvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50LmdldFB1YmxpY0luc3RhbmNlKCk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50ICYmIGNvbXBvbmVudC5nZXROYW1lID8gY29tcG9uZW50LmdldE5hbWUoKSA6ICdhIGNvbXBvbmVudCc7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhwdWJsaWNDb21wb25lbnRJbnN0YW5jZSAhPSBudWxsLCAnU3RhdGVsZXNzIGZ1bmN0aW9uIGNvbXBvbmVudHMgY2Fubm90IGJlIGdpdmVuIHJlZnMgJyArICcoU2VlIHJlZiBcIiVzXCIgaW4gJXMgY3JlYXRlZCBieSAlcykuICcgKyAnQXR0ZW1wdHMgdG8gYWNjZXNzIHRoaXMgcmVmIHdpbGwgZmFpbC4nLCByZWYsIGNvbXBvbmVudE5hbWUsIHRoaXMuZ2V0TmFtZSgpKSA6IHZvaWQgMDtcbiAgICB9XG4gICAgdmFyIHJlZnMgPSBpbnN0LnJlZnMgPT09IGVtcHR5T2JqZWN0ID8gaW5zdC5yZWZzID0ge30gOiBpbnN0LnJlZnM7XG4gICAgcmVmc1tyZWZdID0gcHVibGljQ29tcG9uZW50SW5zdGFuY2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGFjaGVzIGEgcmVmZXJlbmNlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWYgTmFtZSB0byBkZXJlZmVyZW5jZS5cbiAgICogQGZpbmFsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXRhY2hSZWY6IGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIgcmVmcyA9IHRoaXMuZ2V0UHVibGljSW5zdGFuY2UoKS5yZWZzO1xuICAgIGRlbGV0ZSByZWZzW3JlZl07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhIHRleHQgZGVzY3JpcHRpb24gb2YgdGhlIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGlkZW50aWZ5IGl0XG4gICAqIGluIGVycm9yIG1lc3NhZ2VzLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9yIG51bGwuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZ2V0TmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5fY3VycmVudEVsZW1lbnQudHlwZTtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLl9pbnN0YW5jZSAmJiB0aGlzLl9pbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgY29uc3RydWN0b3IgJiYgY29uc3RydWN0b3IubmFtZSB8fCBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHB1YmxpY2x5IGFjY2Vzc2libGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb21wb25lbnQgLSBpLmUuIHdoYXRcbiAgICogaXMgZXhwb3NlZCBieSByZWZzIGFuZCByZXR1cm5lZCBieSByZW5kZXIuIENhbiBiZSBudWxsIGZvciBzdGF0ZWxlc3NcbiAgICogY29tcG9uZW50cy5cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9IHRoZSBwdWJsaWMgY29tcG9uZW50IGluc3RhbmNlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGdldFB1YmxpY0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGluc3QgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICBpZiAoaW5zdCBpbnN0YW5jZW9mIFN0YXRlbGVzc0NvbXBvbmVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpbnN0O1xuICB9LFxuXG4gIC8vIFN0dWJcbiAgX2luc3RhbnRpYXRlUmVhY3RDb21wb25lbnQ6IG51bGxcblxufTtcblxuUmVhY3RQZXJmLm1lYXN1cmVNZXRob2RzKFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50TWl4aW4sICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcsIHtcbiAgbW91bnRDb21wb25lbnQ6ICdtb3VudENvbXBvbmVudCcsXG4gIHVwZGF0ZUNvbXBvbmVudDogJ3VwZGF0ZUNvbXBvbmVudCcsXG4gIF9yZW5kZXJWYWxpZGF0ZWRDb21wb25lbnQ6ICdfcmVuZGVyVmFsaWRhdGVkQ29tcG9uZW50J1xufSk7XG5cbnZhciBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCA9IHtcblxuICBNaXhpbjogUmVhY3RDb21wb3NpdGVDb21wb25lbnRNaXhpblxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9zaXRlQ29tcG9uZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdENvbXBvc2l0ZUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxudmFyIGluamVjdGVkID0gZmFsc2U7XG5cbnZhciBSZWFjdENvbXBvbmVudEVudmlyb25tZW50ID0ge1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbGx5IGluamVjdGFibGUgZW52aXJvbm1lbnQgZGVwZW5kZW50IGNsZWFudXAgaG9vay4gKHNlcnZlciB2cy5cbiAgICogYnJvd3NlciBldGMpLiBFeGFtcGxlOiBBIGJyb3dzZXIgc3lzdGVtIGNhY2hlcyBET00gbm9kZXMgYmFzZWQgb24gY29tcG9uZW50XG4gICAqIElEIGFuZCBtdXN0IHJlbW92ZSB0aGF0IGNhY2hlIGVudHJ5IHdoZW4gdGhpcyBpbnN0YW5jZSBpcyB1bm1vdW50ZWQuXG4gICAqL1xuICB1bm1vdW50SURGcm9tRW52aXJvbm1lbnQ6IG51bGwsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgaW5qZWN0YWJsZSBob29rIGZvciBzd2FwcGluZyBvdXQgbW91bnQgaW1hZ2VzIGluIHRoZSBtaWRkbGUgb2ZcbiAgICogdGhlIHRyZWUuXG4gICAqL1xuICByZXBsYWNlTm9kZVdpdGhNYXJrdXA6IG51bGwsXG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgaW5qZWN0YWJsZSBob29rIGZvciBwcm9jZXNzaW5nIGEgcXVldWUgb2YgY2hpbGQgdXBkYXRlcy4gV2lsbFxuICAgKiBsYXRlciBtb3ZlIGludG8gTXVsdGlDaGlsZENvbXBvbmVudHMuXG4gICAqL1xuICBwcm9jZXNzQ2hpbGRyZW5VcGRhdGVzOiBudWxsLFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdEVudmlyb25tZW50OiBmdW5jdGlvbiAoZW52aXJvbm1lbnQpIHtcbiAgICAgICEhaW5qZWN0ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQ6IGluamVjdEVudmlyb25tZW50KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2UuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQ7XG4gICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cCA9IGVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cDtcbiAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucHJvY2Vzc0NoaWxkcmVuVXBkYXRlcyA9IGVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXM7XG4gICAgICBpbmplY3RlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0RXJyb3JVdGlsc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhdWdodEVycm9yID0gbnVsbDtcblxuLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gd2hpbGUgZ3VhcmRpbmcgYWdhaW5zdCBlcnJvcnMgdGhhdCBoYXBwZW5zIHdpdGhpbiBpdC5cbiAqXG4gKiBAcGFyYW0gez9TdHJpbmd9IG5hbWUgb2YgdGhlIGd1YXJkIHRvIHVzZSBmb3IgbG9nZ2luZyBvciBkZWJ1Z2dpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZVxuICogQHBhcmFtIHsqfSBhIEZpcnN0IGFyZ3VtZW50XG4gKiBAcGFyYW0geyp9IGIgU2Vjb25kIGFyZ3VtZW50XG4gKi9cbmZ1bmN0aW9uIGludm9rZUd1YXJkZWRDYWxsYmFjayhuYW1lLCBmdW5jLCBhLCBiKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZ1bmMoYSwgYik7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICBpZiAoY2F1Z2h0RXJyb3IgPT09IG51bGwpIHtcbiAgICAgIGNhdWdodEVycm9yID0geDtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG52YXIgUmVhY3RFcnJvclV0aWxzID0ge1xuICBpbnZva2VHdWFyZGVkQ2FsbGJhY2s6IGludm9rZUd1YXJkZWRDYWxsYmFjayxcblxuICAvKipcbiAgICogSW52b2tlZCBieSBSZWFjdFRlc3RVdGlscy5TaW11bGF0ZSBzbyB0aGF0IGFueSBlcnJvcnMgdGhyb3duIGJ5IHRoZSBldmVudFxuICAgKiBoYW5kbGVyIGFyZSBzdXJlIHRvIGJlIHJldGhyb3duIGJ5IHJldGhyb3dDYXVnaHRFcnJvci5cbiAgICovXG4gIGludm9rZUd1YXJkZWRDYWxsYmFja1dpdGhDYXRjaDogaW52b2tlR3VhcmRlZENhbGxiYWNrLFxuXG4gIC8qKlxuICAgKiBEdXJpbmcgZXhlY3V0aW9uIG9mIGd1YXJkZWQgZnVuY3Rpb25zIHdlIHdpbGwgY2FwdHVyZSB0aGUgZmlyc3QgZXJyb3Igd2hpY2hcbiAgICogd2Ugd2lsbCByZXRocm93IHRvIGJlIGhhbmRsZWQgYnkgdGhlIHRvcCBsZXZlbCBlcnJvciBoYW5kbGVyLlxuICAgKi9cbiAgcmV0aHJvd0NhdWdodEVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhdWdodEVycm9yKSB7XG4gICAgICB2YXIgZXJyb3IgPSBjYXVnaHRFcnJvcjtcbiAgICAgIGNhdWdodEVycm9yID0gbnVsbDtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgLyoqXG4gICAqIFRvIGhlbHAgZGV2ZWxvcG1lbnQgd2UgY2FuIGdldCBiZXR0ZXIgZGV2dG9vbHMgaW50ZWdyYXRpb24gYnkgc2ltdWxhdGluZyBhXG4gICAqIHJlYWwgYnJvd3NlciBldmVudC5cbiAgICovXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgZmFrZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdyZWFjdCcpO1xuICAgIFJlYWN0RXJyb3JVdGlscy5pbnZva2VHdWFyZGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgZnVuYywgYSwgYikge1xuICAgICAgdmFyIGJvdW5kRnVuYyA9IGZ1bmMuYmluZChudWxsLCBhLCBiKTtcbiAgICAgIHZhciBldnRUeXBlID0gJ3JlYWN0LScgKyBuYW1lO1xuICAgICAgZmFrZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBib3VuZEZ1bmMsIGZhbHNlKTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0RXZlbnQoZXZ0VHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgIGZha2VOb2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIGZha2VOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgYm91bmRGdW5jLCBmYWxzZSk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RXJyb3JVdGlscztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFcnJvclV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3ROb2RlVHlwZXNcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdE5vZGVUeXBlcyA9IHtcbiAgTkFUSVZFOiAwLFxuICBDT01QT1NJVEU6IDEsXG4gIEVNUFRZOiAyLFxuXG4gIGdldFR5cGU6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBSZWFjdE5vZGVUeXBlcy5FTVBUWTtcbiAgICB9IGVsc2UgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgICAgaWYgKHR5cGVvZiBub2RlLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0Tm9kZVR5cGVzLkNPTVBPU0lURTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZWFjdE5vZGVUeXBlcy5OQVRJVkU7XG4gICAgICB9XG4gICAgfVxuICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdVbmV4cGVjdGVkIG5vZGU6ICVzJywgbm9kZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9kZVR5cGVzO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE5vZGVUeXBlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDQ5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEdpdmVuIGEgYHByZXZFbGVtZW50YCBhbmQgYG5leHRFbGVtZW50YCwgZGV0ZXJtaW5lcyBpZiB0aGUgZXhpc3RpbmdcbiAqIGluc3RhbmNlIHNob3VsZCBiZSB1cGRhdGVkIGFzIG9wcG9zZWQgdG8gYmVpbmcgZGVzdHJveWVkIG9yIHJlcGxhY2VkIGJ5IGEgbmV3XG4gKiBpbnN0YW5jZS4gQm90aCBhcmd1bWVudHMgYXJlIGVsZW1lbnRzLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGlzIGxvZ2ljIGNhblxuICogb3BlcmF0ZSBvbiBzdGF0ZWxlc3MgdHJlZXMgd2l0aG91dCBhbnkgYmFja2luZyBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IHByZXZFbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG5leHRFbGVtZW50XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBleGlzdGluZyBpbnN0YW5jZSBzaG91bGQgYmUgdXBkYXRlZC5cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuXG5mdW5jdGlvbiBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudChwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQpIHtcbiAgdmFyIHByZXZFbXB0eSA9IHByZXZFbGVtZW50ID09PSBudWxsIHx8IHByZXZFbGVtZW50ID09PSBmYWxzZTtcbiAgdmFyIG5leHRFbXB0eSA9IG5leHRFbGVtZW50ID09PSBudWxsIHx8IG5leHRFbGVtZW50ID09PSBmYWxzZTtcbiAgaWYgKHByZXZFbXB0eSB8fCBuZXh0RW1wdHkpIHtcbiAgICByZXR1cm4gcHJldkVtcHR5ID09PSBuZXh0RW1wdHk7XG4gIH1cblxuICB2YXIgcHJldlR5cGUgPSB0eXBlb2YgcHJldkVsZW1lbnQ7XG4gIHZhciBuZXh0VHlwZSA9IHR5cGVvZiBuZXh0RWxlbWVudDtcbiAgaWYgKHByZXZUeXBlID09PSAnc3RyaW5nJyB8fCBwcmV2VHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gbmV4dFR5cGUgPT09ICdzdHJpbmcnIHx8IG5leHRUeXBlID09PSAnbnVtYmVyJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV4dFR5cGUgPT09ICdvYmplY3QnICYmIHByZXZFbGVtZW50LnR5cGUgPT09IG5leHRFbGVtZW50LnR5cGUgJiYgcHJldkVsZW1lbnQua2V5ID09PSBuZXh0RWxlbWVudC5rZXk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVcGRhdGVSZWFjdENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdEVtcHR5Q29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlDb21wb25lbnRGYWN0b3J5O1xuXG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudEluamVjdGlvbiA9IHtcbiAgaW5qZWN0RW1wdHlDb21wb25lbnRGYWN0b3J5OiBmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGVtcHR5Q29tcG9uZW50RmFjdG9yeSA9IGZhY3Rvcnk7XG4gIH1cbn07XG5cbnZhciBSZWFjdEVtcHR5Q29tcG9uZW50ID0ge1xuICBjcmVhdGU6IGZ1bmN0aW9uIChpbnN0YW50aWF0ZSkge1xuICAgIHJldHVybiBlbXB0eUNvbXBvbmVudEZhY3RvcnkoaW5zdGFudGlhdGUpO1xuICB9XG59O1xuXG5SZWFjdEVtcHR5Q29tcG9uZW50LmluamVjdGlvbiA9IFJlYWN0RW1wdHlDb21wb25lbnRJbmplY3Rpb247XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbXB0eUNvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RFbXB0eUNvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDUxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0TmF0aXZlQ29tcG9uZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG52YXIgYXV0b0dlbmVyYXRlV3JhcHBlckNsYXNzID0gbnVsbDtcbnZhciBnZW5lcmljQ29tcG9uZW50Q2xhc3MgPSBudWxsO1xuLy8gVGhpcyByZWdpc3RyeSBrZWVwcyB0cmFjayBvZiB3cmFwcGVyIGNsYXNzZXMgYXJvdW5kIG5hdGl2ZSB0YWdzLlxudmFyIHRhZ1RvQ29tcG9uZW50Q2xhc3MgPSB7fTtcbnZhciB0ZXh0Q29tcG9uZW50Q2xhc3MgPSBudWxsO1xuXG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnRJbmplY3Rpb24gPSB7XG4gIC8vIFRoaXMgYWNjZXB0cyBhIGNsYXNzIHRoYXQgcmVjZWl2ZXMgdGhlIHRhZyBzdHJpbmcuIFRoaXMgaXMgYSBjYXRjaCBhbGxcbiAgLy8gdGhhdCBjYW4gcmVuZGVyIGFueSBraW5kIG9mIHRhZy5cbiAgaW5qZWN0R2VuZXJpY0NvbXBvbmVudENsYXNzOiBmdW5jdGlvbiAoY29tcG9uZW50Q2xhc3MpIHtcbiAgICBnZW5lcmljQ29tcG9uZW50Q2xhc3MgPSBjb21wb25lbnRDbGFzcztcbiAgfSxcbiAgLy8gVGhpcyBhY2NlcHRzIGEgdGV4dCBjb21wb25lbnQgY2xhc3MgdGhhdCB0YWtlcyB0aGUgdGV4dCBzdHJpbmcgdG8gYmVcbiAgLy8gcmVuZGVyZWQgYXMgcHJvcHMuXG4gIGluamVjdFRleHRDb21wb25lbnRDbGFzczogZnVuY3Rpb24gKGNvbXBvbmVudENsYXNzKSB7XG4gICAgdGV4dENvbXBvbmVudENsYXNzID0gY29tcG9uZW50Q2xhc3M7XG4gIH0sXG4gIC8vIFRoaXMgYWNjZXB0cyBhIGtleWVkIG9iamVjdCB3aXRoIGNsYXNzZXMgYXMgdmFsdWVzLiBFYWNoIGtleSByZXByZXNlbnRzIGFcbiAgLy8gdGFnLiBUaGF0IHBhcnRpY3VsYXIgdGFnIHdpbGwgdXNlIHRoaXMgY2xhc3MgaW5zdGVhZCBvZiB0aGUgZ2VuZXJpYyBvbmUuXG4gIGluamVjdENvbXBvbmVudENsYXNzZXM6IGZ1bmN0aW9uIChjb21wb25lbnRDbGFzc2VzKSB7XG4gICAgX2Fzc2lnbih0YWdUb0NvbXBvbmVudENsYXNzLCBjb21wb25lbnRDbGFzc2VzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgYSBjb21wb3NpdGUgY29tcG9uZW50IHdyYXBwZXIgY2xhc3MgZm9yIGEgc3BlY2lmaWMgdGFnLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IFRoZSB0YWcgZm9yIHdoaWNoIHRvIGdldCB0aGUgY2xhc3MuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIFJlYWN0IGNsYXNzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnRDbGFzc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gIH1cbiAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gdGFnVG9Db21wb25lbnRDbGFzc1t0YWddO1xuICBpZiAoY29tcG9uZW50Q2xhc3MgPT0gbnVsbCkge1xuICAgIHRhZ1RvQ29tcG9uZW50Q2xhc3NbdGFnXSA9IGNvbXBvbmVudENsYXNzID0gYXV0b0dlbmVyYXRlV3JhcHBlckNsYXNzKHRhZyk7XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudENsYXNzO1xufVxuXG4vKipcbiAqIEdldCBhIG5hdGl2ZSBpbnRlcm5hbCBjb21wb25lbnQgY2xhc3MgZm9yIGEgc3BlY2lmaWMgdGFnLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGNyZWF0ZS5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgaW50ZXJuYWwgY2xhc3MgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUludGVybmFsQ29tcG9uZW50KGVsZW1lbnQpIHtcbiAgIWdlbmVyaWNDb21wb25lbnRDbGFzcyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUaGVyZSBpcyBubyByZWdpc3RlcmVkIGNvbXBvbmVudCBmb3IgdGhlIHRhZyAlcycsIGVsZW1lbnQudHlwZSkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdm9pZCAwO1xuICByZXR1cm4gbmV3IGdlbmVyaWNDb21wb25lbnRDbGFzcyhlbGVtZW50KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlYWN0VGV4dH0gdGV4dFxuICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlRm9yVGV4dCh0ZXh0KSB7XG4gIHJldHVybiBuZXcgdGV4dENvbXBvbmVudENsYXNzKHRleHQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNUZXh0Q29tcG9uZW50KGNvbXBvbmVudCkge1xuICByZXR1cm4gY29tcG9uZW50IGluc3RhbmNlb2YgdGV4dENvbXBvbmVudENsYXNzO1xufVxuXG52YXIgUmVhY3ROYXRpdmVDb21wb25lbnQgPSB7XG4gIGdldENvbXBvbmVudENsYXNzRm9yRWxlbWVudDogZ2V0Q29tcG9uZW50Q2xhc3NGb3JFbGVtZW50LFxuICBjcmVhdGVJbnRlcm5hbENvbXBvbmVudDogY3JlYXRlSW50ZXJuYWxDb21wb25lbnQsXG4gIGNyZWF0ZUluc3RhbmNlRm9yVGV4dDogY3JlYXRlSW5zdGFuY2VGb3JUZXh0LFxuICBpc1RleHRDb21wb25lbnQ6IGlzVGV4dENvbXBvbmVudCxcbiAgaW5qZWN0aW9uOiBSZWFjdE5hdGl2ZUNvbXBvbmVudEluamVjdGlvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5hdGl2ZUNvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3ROYXRpdmVDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB3YXJuaW5nID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGFyZ3MpIHtcbiAgICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiA+IDIgPyBsZW4gLSAyIDogMCk7XG4gICAgZm9yICh2YXIga2V5ID0gMjsga2V5IDwgbGVuOyBrZXkrKykge1xuICAgICAgYXJnc1trZXkgLSAyXSA9IGFyZ3VtZW50c1trZXldO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgK1xuICAgICAgICAnbWVzc2FnZSBhcmd1bWVudCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5sZW5ndGggPCAxMCB8fCAoL15bc1xcV10qJC8pLnRlc3QoZm9ybWF0KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlIHdhcm5pbmcgZm9ybWF0IHNob3VsZCBiZSBhYmxlIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgJyArXG4gICAgICAgICd3YXJuaW5nLiBQbGVhc2UsIHVzZSBhIG1vcmUgZGVzY3JpcHRpdmUgZm9ybWF0IHRoYW46ICcgKyBmb3JtYXRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICtcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCh4KSB7fVxuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd2FybmluZy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcclxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXHJcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbyA9IGZ1bmN0aW9uIChyb290SW5zdGFuY2UsIGNvbnRhaW5lck5hbWUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgX3Jvb3RJbnN0YW5jZTogcm9vdEluc3RhbmNlLFxyXG4gICAgICAgIF9jb250YWluZXJOYW1lOiBjb250YWluZXJOYW1lXHJcbiAgICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEFueXRoaW5nQ29udGFpbmVySW5mbztcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdDb250YWluZXJJbmZvLmpzXG4gKiogbW9kdWxlIGlkID0gNTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEVsb3kgVmlsbGFzY2xhcmFzXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RVcGRhdGVzID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0VXBkYXRlcycpO1xudmFyIFJlYWN0TmF0aXZlQ29tcG9uZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0TmF0aXZlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbXB0eUNvbXBvbmVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdEVtcHR5Q29tcG9uZW50Jyk7XG52YXIgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5Jyk7XG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudEVudmlyb25tZW50Jyk7XG5cbnZhciBjcmVhdGVSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbicpO1xudmFyIGNyZWF0ZVJlYWN0QW55dGhpbmdDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdDb21wb25lbnQnKTtcbnZhciBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudCcpO1xudmFyIFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50Jyk7XG5cbnZhciBpbmplY3QgPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcbiAgICBSZWFjdFVwZGF0ZXMuaW5qZWN0aW9uLmluamVjdFJlY29uY2lsZVRyYW5zYWN0aW9uKGNyZWF0ZVJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbihuYXRpdmVJbXBsZW1lbnRhdGlvbi50cmFuc2FjdGlvbikpO1xuICAgIFJlYWN0VXBkYXRlcy5pbmplY3Rpb24uaW5qZWN0QmF0Y2hpbmdTdHJhdGVneShSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5KTtcblxuICAgIFJlYWN0TmF0aXZlQ29tcG9uZW50LmluamVjdGlvbi5pbmplY3RHZW5lcmljQ29tcG9uZW50Q2xhc3MoY3JlYXRlUmVhY3RBbnl0aGluZ0NvbXBvbmVudChuYXRpdmVJbXBsZW1lbnRhdGlvbi5jb21wb25lbnRzKSk7XG5cbiAgICBSZWFjdEVtcHR5Q29tcG9uZW50LmluamVjdGlvbi5pbmplY3RFbXB0eUNvbXBvbmVudEZhY3RvcnkoZnVuY3Rpb24gKGluc3RhbnRpYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50KGluc3RhbnRpYXRlKTtcbiAgICB9KTtcblxuICAgIGlmIChSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCB8fFxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCB8fFxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMpIHtcblxuICAgICAgICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnVubW91bnRJREZyb21FbnZpcm9ubWVudCA9IFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudC51bm1vdW50SURGcm9tRW52aXJvbm1lbnQ7XG4gICAgICAgIFJlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQucmVwbGFjZU5vZGVXaXRoTWFya3VwID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnJlcGxhY2VOb2RlV2l0aE1hcmt1cDtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5wcm9jZXNzQ2hpbGRyZW5VcGRhdGVzID0gUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudC5pbmplY3Rpb24uaW5qZWN0RW52aXJvbm1lbnQoUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50KTtcbiAgICB9XG59O1xuXG52YXIgY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgUmVhY3RVcGRhdGVzLlJlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb24gPSBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5qZWN0OiBpbmplY3QsXG4gICAgY2xlYXI6IGNsZWFyXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdJbmplY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSA1NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0VXBkYXRlcyA9IHJlcXVpcmUoJy4vUmVhY3RVcGRhdGVzJyk7XG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL1RyYW5zYWN0aW9uJyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xuXG52YXIgUkVTRVRfQkFUQ0hFRF9VUERBVEVTID0ge1xuICBpbml0aWFsaXplOiBlbXB0eUZ1bmN0aW9uLFxuICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kuaXNCYXRjaGluZ1VwZGF0ZXMgPSBmYWxzZTtcbiAgfVxufTtcblxudmFyIEZMVVNIX0JBVENIRURfVVBEQVRFUyA9IHtcbiAgaW5pdGlhbGl6ZTogZW1wdHlGdW5jdGlvbixcbiAgY2xvc2U6IFJlYWN0VXBkYXRlcy5mbHVzaEJhdGNoZWRVcGRhdGVzLmJpbmQoUmVhY3RVcGRhdGVzKVxufTtcblxudmFyIFRSQU5TQUNUSU9OX1dSQVBQRVJTID0gW0ZMVVNIX0JBVENIRURfVVBEQVRFUywgUkVTRVRfQkFUQ0hFRF9VUERBVEVTXTtcblxuZnVuY3Rpb24gUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVRyYW5zYWN0aW9uKCkge1xuICB0aGlzLnJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uKCk7XG59XG5cbl9hc3NpZ24oUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneVRyYW5zYWN0aW9uLnByb3RvdHlwZSwgVHJhbnNhY3Rpb24uTWl4aW4sIHtcbiAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBUUkFOU0FDVElPTl9XUkFQUEVSUztcbiAgfVxufSk7XG5cbnZhciB0cmFuc2FjdGlvbiA9IG5ldyBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5VHJhbnNhY3Rpb24oKTtcblxudmFyIFJlYWN0RGVmYXVsdEJhdGNoaW5nU3RyYXRlZ3kgPSB7XG4gIGlzQmF0Y2hpbmdVcGRhdGVzOiBmYWxzZSxcblxuICAvKipcbiAgICogQ2FsbCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaW4gYSBjb250ZXh0IHdpdGhpbiB3aGljaCBjYWxscyB0byBgc2V0U3RhdGVgXG4gICAqIGFuZCBmcmllbmRzIGFyZSBiYXRjaGVkIHN1Y2ggdGhhdCBjb21wb25lbnRzIGFyZW4ndCB1cGRhdGVkIHVubmVjZXNzYXJpbHkuXG4gICAqL1xuICBiYXRjaGVkVXBkYXRlczogZnVuY3Rpb24gKGNhbGxiYWNrLCBhLCBiLCBjLCBkLCBlKSB7XG4gICAgdmFyIGFscmVhZHlCYXRjaGluZ1VwZGF0ZXMgPSBSZWFjdERlZmF1bHRCYXRjaGluZ1N0cmF0ZWd5LmlzQmF0Y2hpbmdVcGRhdGVzO1xuXG4gICAgUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5pc0JhdGNoaW5nVXBkYXRlcyA9IHRydWU7XG5cbiAgICAvLyBUaGUgY29kZSBpcyB3cml0dGVuIHRoaXMgd2F5IHRvIGF2b2lkIGV4dHJhIGFsbG9jYXRpb25zXG4gICAgaWYgKGFscmVhZHlCYXRjaGluZ1VwZGF0ZXMpIHtcbiAgICAgIGNhbGxiYWNrKGEsIGIsIGMsIGQsIGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2FjdGlvbi5wZXJmb3JtKGNhbGxiYWNrLCBudWxsLCBhLCBiLCBjLCBkLCBlKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3REZWZhdWx0QmF0Y2hpbmdTdHJhdGVneS5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgYSBtb2RpZmllZCB2ZXJzaW9uIG9mOlxuICogIHJlYWN0L2xpYi9SZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9uLmpzXG4gKiAgQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqICBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FsbGJhY2tRdWV1ZSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9DYWxsYmFja1F1ZXVlJyk7XG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCdyZWFjdC9saWIvUG9vbGVkQ2xhc3MnKTtcbnZhciBUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9UcmFuc2FjdGlvbicpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgT05fUkVBRFlfUVVFVUVJTkcgPSB7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeS5yZXNldCgpO1xuICAgIH0sXG5cbiAgICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeS5ub3RpZnlBbGwoKTtcbiAgICB9XG59O1xuXG52YXIgY3JlYXRlVHJhbnNhY3Rpb25UeXBlID0gZnVuY3Rpb24gKG5hdGl2ZUltcGxlbWVudGF0aW9uKSB7XG4gICAgdmFyIFRSQU5TQUNUSU9OX1dSQVBQRVJTID0gW09OX1JFQURZX1FVRVVFSU5HXTtcblxuICAgIGlmIChuYXRpdmVJbXBsZW1lbnRhdGlvbikge1xuICAgICAgICBUUkFOU0FDVElPTl9XUkFQUEVSUy5wdXNoKG5hdGl2ZUltcGxlbWVudGF0aW9uKTtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlaW5pdGlhbGl6ZVRyYW5zYWN0aW9uKCk7XG4gICAgICAgIC8vIE9ubHkgc2VydmVyLXNpZGUgcmVuZGVyaW5nIHJlYWxseSBuZWVkcyB0aGlzIG9wdGlvbiAoc2VlXG4gICAgICAgIC8vIGBSZWFjdFNlcnZlclJlbmRlcmluZ2ApLCBidXQgc2VydmVyLXNpZGUgdXNlc1xuICAgICAgICAvLyBgUmVhY3RTZXJ2ZXJSZW5kZXJpbmdUcmFuc2FjdGlvbmAgaW5zdGVhZC4gVGhpcyBvcHRpb24gaXMgaGVyZSBzbyB0aGF0IGl0J3NcbiAgICAgICAgLy8gYWNjZXNzaWJsZSBhbmQgZGVmYXVsdHMgdG8gZmFsc2Ugd2hlbiBgUmVhY3RET01Db21wb25lbnRgIGFuZFxuICAgICAgICAvLyBgUmVhY3RUZXh0Q29tcG9uZW50YCBjaGVja3MgaXQgaW4gYG1vdW50Q29tcG9uZW50YC5gXG4gICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5ID0gQ2FsbGJhY2tRdWV1ZS5nZXRQb29sZWQobnVsbCk7XG4gICAgfTtcblxuICAgIHZhciBNaXhpbiA9IHtcbiAgICAgICAgZ2V0VHJhbnNhY3Rpb25XcmFwcGVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFRSQU5TQUNUSU9OX1dSQVBQRVJTO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFJlYWN0TW91bnRSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhY3RNb3VudFJlYWR5O1xuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrcG9pbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHJlYWN0TW91bnRSZWFkeSBpcyB0aGUgb3VyIG9ubHkgc3RhdGVmdWwgd3JhcHBlclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhY3RNb3VudFJlYWR5LmNoZWNrcG9pbnQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICByb2xsYmFjazogZnVuY3Rpb24gKGNoZWNrcG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVhY3RNb3VudFJlYWR5LnJvbGxiYWNrKGNoZWNrcG9pbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIENhbGxiYWNrUXVldWUucmVsZWFzZSh0aGlzLnJlYWN0TW91bnRSZWFkeSk7XG4gICAgICAgICAgICB0aGlzLnJlYWN0TW91bnRSZWFkeSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICBhc3NpZ24oUmVhY3RBbnl0aGluZ1JlY29uY2lsZVRyYW5zYWN0aW9uLnByb3RvdHlwZSwgVHJhbnNhY3Rpb24uTWl4aW4sIE1peGluKTtcblxuICAgIFBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhSZWFjdEFueXRoaW5nUmVjb25jaWxlVHJhbnNhY3Rpb24pO1xuXG4gICAgcmV0dXJuIFJlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVHJhbnNhY3Rpb25UeXBlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QtYW55dGhpbmcvc3JjL1JlYWN0QW55dGhpbmdSZWNvbmNpbGVUcmFuc2FjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqIFxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZjpcbiAqICByZWFjdC9saWIvUmVhY3RET01Db21wb25lbnQuanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RNdWx0aUNoaWxkID0gcmVxdWlyZSgncmVhY3QvbGliL1JlYWN0TXVsdGlDaGlsZCcpO1xudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG5cbnZhciBnbG9iYWxJZENvdW50ZXIgPSAxO1xuXG52YXIgY3JlYXRlSW1wbGVtZW50YXRpb24gPSBmdW5jdGlvbiAobmF0aXZlSW1wbGVtZW50YXRpb24pIHtcblxuICAgIHZhciBSZWFjdEFueXRoaW5nQ29tcG9uZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHRhZyA9IGVsZW1lbnQudHlwZTtcbiAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl90YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5fcm9vdE5vZGVJRCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBudWxsO1xuICAgICAgICB0aGlzLl9uYXRpdmVOb2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmF0aXZlUGFyZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RvcExldmVsV3JhcHBlciA9IG51bGw7XG4gICAgfTtcblxuICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuZGlzcGxheU5hbWUgPSAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudCc7XG5cbiAgICBSZWFjdEFueXRoaW5nQ29tcG9uZW50Lk1peGluID0ge1xuICAgICAgICBtb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVDb250YWluZXJJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBnbG9iYWxJZENvdW50ZXIrKztcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBuYXRpdmVDb250YWluZXJJbmZvO1xuXG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5wcm9wcztcblxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlTm9kZSA9IG5hdGl2ZUltcGxlbWVudGF0aW9uLm1vdW50KHRoaXMuX3Jvb3ROb2RlSUQsIHRoaXMuX3RhZywgcHJvcHMsIG5hdGl2ZVBhcmVudCAmJiBuYXRpdmVQYXJlbnQuX25hdGl2ZU5vZGUpO1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuSW1hZ2VzID0gdGhpcy5tb3VudENoaWxkcmVuKHByb3BzLmNoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAobmF0aXZlSW1wbGVtZW50YXRpb24uY2hpbGRyZW5Nb3VudCAmJiBjaGlsZHJlbkltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24uY2hpbGRyZW5Nb3VudCh0aGlzLl9uYXRpdmVOb2RlLCBjaGlsZHJlbkltYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWNlaXZlQ29tcG9uZW50OiBmdW5jdGlvbiAobmV4dEVsZW1lbnQsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gbmV4dEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudCh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KTtcbiAgICAgICAgfSxcblxuICAgICAgICB1cGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbiwgcHJldkVsZW1lbnQsIG5leHRFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgbGFzdFByb3BzID0gcHJldkVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB2YXIgbmV4dFByb3BzID0gdGhpcy5fY3VycmVudEVsZW1lbnQucHJvcHM7XG5cbiAgICAgICAgICAgIG5hdGl2ZUltcGxlbWVudGF0aW9uLnVwZGF0ZSh0aGlzLl9uYXRpdmVOb2RlLCBuZXh0UHJvcHMsIGxhc3RQcm9wcyk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hpbGRyZW4obmV4dFByb3BzLmNoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hdGl2ZU5vZGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgICAgICAgdGhpcy51bm1vdW50Q2hpbGRyZW4oc2FmZWx5KTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3ROb2RlSUQgPSBudWxsO1xuICAgICAgICAgICAgbmF0aXZlSW1wbGVtZW50YXRpb24udW5tb3VudCh0aGlzLl9uYXRpdmVOb2RlKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQdWJsaWNJbnN0YW5jZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFJlYWN0UGVyZi5tZWFzdXJlTWV0aG9kcyhSZWFjdEFueXRoaW5nQ29tcG9uZW50Lk1peGluLCAnUmVhY3RBbnl0aGluZ0NvbXBvbmVudCcsIHtcbiAgICAgICAgbW91bnRDb21wb25lbnQ6ICdtb3VudENvbXBvbmVudCcsXG4gICAgICAgIHJlY2VpdmVDb21wb25lbnQ6ICdyZWNlaXZlQ29tcG9uZW50JyxcbiAgICB9KTtcblxuICAgIGFzc2lnbihcbiAgICAgICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudC5wcm90b3R5cGUsXG4gICAgICAgIFJlYWN0QW55dGhpbmdDb21wb25lbnQuTWl4aW4sXG4gICAgICAgIFJlYWN0TXVsdGlDaGlsZC5NaXhpblxuICAgICk7XG5cbiAgICByZXR1cm4gUmVhY3RBbnl0aGluZ0NvbXBvbmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVJbXBsZW1lbnRhdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RNdWx0aUNoaWxkXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRFbnZpcm9ubWVudCcpO1xudmFyIFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcycpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RSZWNvbmNpbGVyID0gcmVxdWlyZSgnLi9SZWFjdFJlY29uY2lsZXInKTtcbnZhciBSZWFjdENoaWxkUmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZFJlY29uY2lsZXInKTtcblxudmFyIGZsYXR0ZW5DaGlsZHJlbiA9IHJlcXVpcmUoJy4vZmxhdHRlbkNoaWxkcmVuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIG1hcmt1cCB0byBiZSByZW5kZXJlZCBhbmQgaW5zZXJ0ZWQgYXQgYSBzdXBwbGllZCBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFya3VwIE1hcmt1cCB0aGF0IHJlbmRlcnMgaW50byBhbiBlbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXguXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlSW5zZXJ0TWFya3VwKG1hcmt1cCwgYWZ0ZXJOb2RlLCB0b0luZGV4KSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5JTlNFUlRfTUFSS1VQLFxuICAgIGNvbnRlbnQ6IG1hcmt1cCxcbiAgICBmcm9tSW5kZXg6IG51bGwsXG4gICAgZnJvbU5vZGU6IG51bGwsXG4gICAgdG9JbmRleDogdG9JbmRleCxcbiAgICBhZnRlck5vZGU6IGFmdGVyTm9kZVxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBtb3ZpbmcgYW4gZXhpc3RpbmcgZWxlbWVudCB0byBhbm90aGVyIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tSW5kZXggU291cmNlIGluZGV4IG9mIHRoZSBleGlzdGluZyBlbGVtZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IHRvSW5kZXggRGVzdGluYXRpb24gaW5kZXggb2YgdGhlIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlTW92ZShjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4KSB7XG4gIC8vIE5PVEU6IE51bGwgdmFsdWVzIHJlZHVjZSBoaWRkZW4gY2xhc3Nlcy5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcy5NT1ZFX0VYSVNUSU5HLFxuICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgZnJvbUluZGV4OiBjaGlsZC5fbW91bnRJbmRleCxcbiAgICBmcm9tTm9kZTogUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUoY2hpbGQpLFxuICAgIHRvSW5kZXg6IHRvSW5kZXgsXG4gICAgYWZ0ZXJOb2RlOiBhZnRlck5vZGVcbiAgfTtcbn1cblxuLyoqXG4gKiBNYWtlIGFuIHVwZGF0ZSBmb3IgcmVtb3ZpbmcgYW4gZWxlbWVudCBhdCBhbiBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IEluZGV4IG9mIHRoZSBlbGVtZW50IHRvIHJlbW92ZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VSZW1vdmUoY2hpbGQsIG5vZGUpIHtcbiAgLy8gTk9URTogTnVsbCB2YWx1ZXMgcmVkdWNlIGhpZGRlbiBjbGFzc2VzLlxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJlYWN0TXVsdGlDaGlsZFVwZGF0ZVR5cGVzLlJFTU9WRV9OT0RFLFxuICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgZnJvbUluZGV4OiBjaGlsZC5fbW91bnRJbmRleCxcbiAgICBmcm9tTm9kZTogbm9kZSxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIE1ha2UgYW4gdXBkYXRlIGZvciBzZXR0aW5nIHRoZSBtYXJrdXAgb2YgYSBub2RlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrdXAgTWFya3VwIHRoYXQgcmVuZGVycyBpbnRvIGFuIGVsZW1lbnQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBtYWtlU2V0TWFya3VwKG1hcmt1cCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuU0VUX01BUktVUCxcbiAgICBjb250ZW50OiBtYXJrdXAsXG4gICAgZnJvbUluZGV4OiBudWxsLFxuICAgIGZyb21Ob2RlOiBudWxsLFxuICAgIHRvSW5kZXg6IG51bGwsXG4gICAgYWZ0ZXJOb2RlOiBudWxsXG4gIH07XG59XG5cbi8qKlxuICogTWFrZSBhbiB1cGRhdGUgZm9yIHNldHRpbmcgdGhlIHRleHQgY29udGVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dENvbnRlbnQgVGV4dCBjb250ZW50IHRvIHNldC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1ha2VUZXh0Q29udGVudCh0ZXh0Q29udGVudCkge1xuICAvLyBOT1RFOiBOdWxsIHZhbHVlcyByZWR1Y2UgaGlkZGVuIGNsYXNzZXMuXG4gIHJldHVybiB7XG4gICAgdHlwZTogUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuVEVYVF9DT05URU5ULFxuICAgIGNvbnRlbnQ6IHRleHRDb250ZW50LFxuICAgIGZyb21JbmRleDogbnVsbCxcbiAgICBmcm9tTm9kZTogbnVsbCxcbiAgICB0b0luZGV4OiBudWxsLFxuICAgIGFmdGVyTm9kZTogbnVsbFxuICB9O1xufVxuXG4vKipcbiAqIFB1c2ggYW4gdXBkYXRlLCBpZiBhbnksIG9udG8gdGhlIHF1ZXVlLiBDcmVhdGVzIGEgbmV3IHF1ZXVlIGlmIG5vbmUgaXNcbiAqIHBhc3NlZCBhbmQgYWx3YXlzIHJldHVybnMgdGhlIHF1ZXVlLiBNdXRhdGl2ZS5cbiAqL1xuZnVuY3Rpb24gZW5xdWV1ZShxdWV1ZSwgdXBkYXRlKSB7XG4gIGlmICh1cGRhdGUpIHtcbiAgICBxdWV1ZSA9IHF1ZXVlIHx8IFtdO1xuICAgIHF1ZXVlLnB1c2godXBkYXRlKTtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59XG5cbi8qKlxuICogUHJvY2Vzc2VzIGFueSBlbnF1ZXVlZCB1cGRhdGVzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NRdWV1ZShpbnN0LCB1cGRhdGVRdWV1ZSkge1xuICBSZWFjdENvbXBvbmVudEVudmlyb25tZW50LnByb2Nlc3NDaGlsZHJlblVwZGF0ZXMoaW5zdCwgdXBkYXRlUXVldWUpO1xufVxuXG4vKipcbiAqIFJlYWN0TXVsdGlDaGlsZCBhcmUgY2FwYWJsZSBvZiByZWNvbmNpbGluZyBtdWx0aXBsZSBjaGlsZHJlbi5cbiAqXG4gKiBAY2xhc3MgUmVhY3RNdWx0aUNoaWxkXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0TXVsdGlDaGlsZCA9IHtcblxuICAvKipcbiAgICogUHJvdmlkZXMgY29tbW9uIGZ1bmN0aW9uYWxpdHkgZm9yIGNvbXBvbmVudHMgdGhhdCBtdXN0IHJlY29uY2lsZSBtdWx0aXBsZVxuICAgKiBjaGlsZHJlbi4gVGhpcyBpcyB1c2VkIGJ5IGBSZWFjdERPTUNvbXBvbmVudGAgdG8gbW91bnQsIHVwZGF0ZSwgYW5kXG4gICAqIHVubW91bnQgY2hpbGQgY29tcG9uZW50cy5cbiAgICpcbiAgICogQGxlbmRzIHtSZWFjdE11bHRpQ2hpbGQucHJvdG90eXBlfVxuICAgKi9cbiAgTWl4aW46IHtcblxuICAgIF9yZWNvbmNpbGVySW5zdGFudGlhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RDaGlsZFJlY29uY2lsZXIuaW5zdGFudGlhdGVDaGlsZHJlbihuZXN0ZWRDaGlsZHJlbiwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdENoaWxkUmVjb25jaWxlci5pbnN0YW50aWF0ZUNoaWxkcmVuKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIF9yZWNvbmNpbGVyVXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChwcmV2Q2hpbGRyZW4sIG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbmV4dENoaWxkcmVuO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgICAgICAgICBuZXh0Q2hpbGRyZW4gPSBmbGF0dGVuQ2hpbGRyZW4obmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudXBkYXRlQ2hpbGRyZW4ocHJldkNoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICAgIHJldHVybiBuZXh0Q2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5leHRDaGlsZHJlbiA9IGZsYXR0ZW5DaGlsZHJlbihuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cyk7XG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51cGRhdGVDaGlsZHJlbihwcmV2Q2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgcmVtb3ZlZE5vZGVzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgICByZXR1cm4gbmV4dENoaWxkcmVuO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBcIm1vdW50IGltYWdlXCIgZm9yIGVhY2ggb2YgdGhlIHN1cHBsaWVkIGNoaWxkcmVuLiBJbiB0aGUgY2FzZVxuICAgICAqIG9mIGBSZWFjdERPTUNvbXBvbmVudGAsIGEgbW91bnQgaW1hZ2UgaXMgYSBzdHJpbmcgb2YgbWFya3VwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXN0ZWRDaGlsZHJlbiBOZXN0ZWQgY2hpbGQgbWFwcy5cbiAgICAgKiBAcmV0dXJuIHthcnJheX0gQW4gYXJyYXkgb2YgbW91bnRlZCByZXByZXNlbnRhdGlvbnMuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgbW91bnRDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkcmVuLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fcmVjb25jaWxlckluc3RhbnRpYXRlQ2hpbGRyZW4obmVzdGVkQ2hpbGRyZW4sIHRyYW5zYWN0aW9uLCBjb250ZXh0KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgIHZhciBtb3VudEltYWdlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGNoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5bbmFtZV07XG4gICAgICAgICAgdmFyIG1vdW50SW1hZ2UgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoY2hpbGQsIHRyYW5zYWN0aW9uLCB0aGlzLCB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KTtcbiAgICAgICAgICBjaGlsZC5fbW91bnRJbmRleCA9IGluZGV4Kys7XG4gICAgICAgICAgbW91bnRJbWFnZXMucHVzaChtb3VudEltYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1vdW50SW1hZ2VzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbnkgcmVuZGVyZWQgY2hpbGRyZW4gd2l0aCBhIHRleHQgY29udGVudCBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV4dENvbnRlbnQgU3RyaW5nIG9mIGNvbnRlbnQuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlVGV4dENvbnRlbnQ6IGZ1bmN0aW9uIChuZXh0Q29udGVudCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICAvLyBSZW1vdmUgYW55IHJlbmRlcmVkIGNoaWxkcmVuLlxuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudW5tb3VudENoaWxkcmVuKHByZXZDaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHByZXZDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGVUZXh0Q29udGVudCBjYWxsZWQgb24gbm9uLWVtcHR5IGNvbXBvbmVudC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBuZXcgdGV4dCBjb250ZW50LlxuICAgICAgdmFyIHVwZGF0ZXMgPSBbbWFrZVRleHRDb250ZW50KG5leHRDb250ZW50KV07XG4gICAgICBwcm9jZXNzUXVldWUodGhpcywgdXBkYXRlcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFueSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIGEgbWFya3VwIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0TWFya3VwIFN0cmluZyBvZiBtYXJrdXAuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlTWFya3VwOiBmdW5jdGlvbiAobmV4dE1hcmt1cCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICAvLyBSZW1vdmUgYW55IHJlbmRlcmVkIGNoaWxkcmVuLlxuICAgICAgUmVhY3RDaGlsZFJlY29uY2lsZXIudW5tb3VudENoaWxkcmVuKHByZXZDaGlsZHJlbiwgZmFsc2UpO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKHByZXZDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICFmYWxzZSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICd1cGRhdGVUZXh0Q29udGVudCBjYWxsZWQgb24gbm9uLWVtcHR5IGNvbXBvbmVudC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciB1cGRhdGVzID0gW21ha2VTZXRNYXJrdXAobmV4dE1hcmt1cCldO1xuICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSByZW5kZXJlZCBjaGlsZHJlbiB3aXRoIG5ldyBjaGlsZHJlbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMgTmVzdGVkIGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdXBkYXRlQ2hpbGRyZW46IGZ1bmN0aW9uIChuZXh0TmVzdGVkQ2hpbGRyZW5FbGVtZW50cywgdHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgIC8vIEhvb2sgdXNlZCBieSBSZWFjdCBBUlRcbiAgICAgIHRoaXMuX3VwZGF0ZUNoaWxkcmVuKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMgTmVzdGVkIGNoaWxkIGVsZW1lbnQgbWFwcy5cbiAgICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAgICogQGZpbmFsXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIF91cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5leHROZXN0ZWRDaGlsZHJlbkVsZW1lbnRzLCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICB2YXIgcmVtb3ZlZE5vZGVzID0ge307XG4gICAgICB2YXIgbmV4dENoaWxkcmVuID0gdGhpcy5fcmVjb25jaWxlclVwZGF0ZUNoaWxkcmVuKHByZXZDaGlsZHJlbiwgbmV4dE5lc3RlZENoaWxkcmVuRWxlbWVudHMsIHJlbW92ZWROb2RlcywgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgaWYgKCFuZXh0Q2hpbGRyZW4gJiYgIXByZXZDaGlsZHJlbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdXBkYXRlcyA9IG51bGw7XG4gICAgICB2YXIgbmFtZTtcbiAgICAgIC8vIGBuZXh0SW5kZXhgIHdpbGwgaW5jcmVtZW50IGZvciBlYWNoIGNoaWxkIGluIGBuZXh0Q2hpbGRyZW5gLCBidXRcbiAgICAgIC8vIGBsYXN0SW5kZXhgIHdpbGwgYmUgdGhlIGxhc3QgaW5kZXggdmlzaXRlZCBpbiBgcHJldkNoaWxkcmVuYC5cbiAgICAgIHZhciBsYXN0SW5kZXggPSAwO1xuICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICB2YXIgbGFzdFBsYWNlZE5vZGUgPSBudWxsO1xuICAgICAgZm9yIChuYW1lIGluIG5leHRDaGlsZHJlbikge1xuICAgICAgICBpZiAoIW5leHRDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW4gJiYgcHJldkNoaWxkcmVuW25hbWVdO1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gbmV4dENoaWxkcmVuW25hbWVdO1xuICAgICAgICBpZiAocHJldkNoaWxkID09PSBuZXh0Q2hpbGQpIHtcbiAgICAgICAgICB1cGRhdGVzID0gZW5xdWV1ZSh1cGRhdGVzLCB0aGlzLm1vdmVDaGlsZChwcmV2Q2hpbGQsIGxhc3RQbGFjZWROb2RlLCBuZXh0SW5kZXgsIGxhc3RJbmRleCkpO1xuICAgICAgICAgIGxhc3RJbmRleCA9IE1hdGgubWF4KHByZXZDaGlsZC5fbW91bnRJbmRleCwgbGFzdEluZGV4KTtcbiAgICAgICAgICBwcmV2Q2hpbGQuX21vdW50SW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByZXZDaGlsZCkge1xuICAgICAgICAgICAgLy8gVXBkYXRlIGBsYXN0SW5kZXhgIGJlZm9yZSBgX21vdW50SW5kZXhgIGdldHMgdW5zZXQgYnkgdW5tb3VudGluZy5cbiAgICAgICAgICAgIGxhc3RJbmRleCA9IE1hdGgubWF4KHByZXZDaGlsZC5fbW91bnRJbmRleCwgbGFzdEluZGV4KTtcbiAgICAgICAgICAgIC8vIFRoZSBgcmVtb3ZlZE5vZGVzYCBsb29wIGJlbG93IHdpbGwgYWN0dWFsbHkgcmVtb3ZlIHRoZSBjaGlsZC5cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVGhlIGNoaWxkIG11c3QgYmUgaW5zdGFudGlhdGVkIGJlZm9yZSBpdCdzIG1vdW50ZWQuXG4gICAgICAgICAgdXBkYXRlcyA9IGVucXVldWUodXBkYXRlcywgdGhpcy5fbW91bnRDaGlsZEF0SW5kZXgobmV4dENoaWxkLCBsYXN0UGxhY2VkTm9kZSwgbmV4dEluZGV4LCB0cmFuc2FjdGlvbiwgY29udGV4dCkpO1xuICAgICAgICB9XG4gICAgICAgIG5leHRJbmRleCsrO1xuICAgICAgICBsYXN0UGxhY2VkTm9kZSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKG5leHRDaGlsZCk7XG4gICAgICB9XG4gICAgICAvLyBSZW1vdmUgY2hpbGRyZW4gdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQuXG4gICAgICBmb3IgKG5hbWUgaW4gcmVtb3ZlZE5vZGVzKSB7XG4gICAgICAgIGlmIChyZW1vdmVkTm9kZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICB1cGRhdGVzID0gZW5xdWV1ZSh1cGRhdGVzLCB0aGlzLl91bm1vdW50Q2hpbGQocHJldkNoaWxkcmVuW25hbWVdLCByZW1vdmVkTm9kZXNbbmFtZV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHVwZGF0ZXMpIHtcbiAgICAgICAgcHJvY2Vzc1F1ZXVlKHRoaXMsIHVwZGF0ZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fcmVuZGVyZWRDaGlsZHJlbiA9IG5leHRDaGlsZHJlbjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tb3VudHMgYWxsIHJlbmRlcmVkIGNoaWxkcmVuLiBUaGlzIHNob3VsZCBiZSB1c2VkIHRvIGNsZWFuIHVwIGNoaWxkcmVuXG4gICAgICogd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQuIEl0IGRvZXMgbm90IGFjdHVhbGx5IHBlcmZvcm0gYW55XG4gICAgICogYmFja2VuZCBvcGVyYXRpb25zLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgdW5tb3VudENoaWxkcmVuOiBmdW5jdGlvbiAoc2FmZWx5KSB7XG4gICAgICB2YXIgcmVuZGVyZWRDaGlsZHJlbiA9IHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW47XG4gICAgICBSZWFjdENoaWxkUmVjb25jaWxlci51bm1vdW50Q2hpbGRyZW4ocmVuZGVyZWRDaGlsZHJlbiwgc2FmZWx5KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVkQ2hpbGRyZW4gPSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhIGNoaWxkIGNvbXBvbmVudCB0byB0aGUgc3VwcGxpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q29tcG9uZW50fSBjaGlsZCBDb21wb25lbnQgdG8gbW92ZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG9JbmRleCBEZXN0aW5hdGlvbiBpbmRleCBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGFzdEluZGV4IExhc3QgaW5kZXggdmlzaXRlZCBvZiB0aGUgc2libGluZ3Mgb2YgYGNoaWxkYC5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgbW92ZUNoaWxkOiBmdW5jdGlvbiAoY2hpbGQsIGFmdGVyTm9kZSwgdG9JbmRleCwgbGFzdEluZGV4KSB7XG4gICAgICAvLyBJZiB0aGUgaW5kZXggb2YgYGNoaWxkYCBpcyBsZXNzIHRoYW4gYGxhc3RJbmRleGAsIHRoZW4gaXQgbmVlZHMgdG9cbiAgICAgIC8vIGJlIG1vdmVkLiBPdGhlcndpc2UsIHdlIGRvIG5vdCBuZWVkIHRvIG1vdmUgaXQgYmVjYXVzZSBhIGNoaWxkIHdpbGwgYmVcbiAgICAgIC8vIGluc2VydGVkIG9yIG1vdmVkIGJlZm9yZSBgY2hpbGRgLlxuICAgICAgaWYgKGNoaWxkLl9tb3VudEluZGV4IDwgbGFzdEluZGV4KSB7XG4gICAgICAgIHJldHVybiBtYWtlTW92ZShjaGlsZCwgYWZ0ZXJOb2RlLCB0b0luZGV4KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNoaWxkIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byBjcmVhdGUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1vdW50SW1hZ2UgTWFya3VwIHRvIGluc2VydC5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY3JlYXRlQ2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgYWZ0ZXJOb2RlLCBtb3VudEltYWdlKSB7XG4gICAgICByZXR1cm4gbWFrZUluc2VydE1hcmt1cChtb3VudEltYWdlLCBhZnRlck5vZGUsIGNoaWxkLl9tb3VudEluZGV4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGNoaWxkIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENoaWxkIHRvIHJlbW92ZS5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVtb3ZlQ2hpbGQ6IGZ1bmN0aW9uIChjaGlsZCwgbm9kZSkge1xuICAgICAgcmV0dXJuIG1ha2VSZW1vdmUoY2hpbGQsIG5vZGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNb3VudHMgYSBjaGlsZCB3aXRoIHRoZSBzdXBwbGllZCBuYW1lLlxuICAgICAqXG4gICAgICogTk9URTogVGhpcyBpcyBwYXJ0IG9mIGB1cGRhdGVDaGlsZHJlbmAgYW5kIGlzIGhlcmUgZm9yIHJlYWRhYmlsaXR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENvbXBvbmVudH0gY2hpbGQgQ29tcG9uZW50IHRvIG1vdW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIE5hbWUgb2YgdGhlIGNoaWxkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIGNoaWxkLlxuICAgICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9tb3VudENoaWxkQXRJbmRleDogZnVuY3Rpb24gKGNoaWxkLCBhZnRlck5vZGUsIGluZGV4LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgdmFyIG1vdW50SW1hZ2UgPSBSZWFjdFJlY29uY2lsZXIubW91bnRDb21wb25lbnQoY2hpbGQsIHRyYW5zYWN0aW9uLCB0aGlzLCB0aGlzLl9uYXRpdmVDb250YWluZXJJbmZvLCBjb250ZXh0KTtcbiAgICAgIGNoaWxkLl9tb3VudEluZGV4ID0gaW5kZXg7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVDaGlsZChjaGlsZCwgYWZ0ZXJOb2RlLCBtb3VudEltYWdlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tb3VudHMgYSByZW5kZXJlZCBjaGlsZC5cbiAgICAgKlxuICAgICAqIE5PVEU6IFRoaXMgaXMgcGFydCBvZiBgdXBkYXRlQ2hpbGRyZW5gIGFuZCBpcyBoZXJlIGZvciByZWFkYWJpbGl0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhY3RDb21wb25lbnR9IGNoaWxkIENvbXBvbmVudCB0byB1bm1vdW50LlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3VubW91bnRDaGlsZDogZnVuY3Rpb24gKGNoaWxkLCBub2RlKSB7XG4gICAgICB2YXIgdXBkYXRlID0gdGhpcy5yZW1vdmVDaGlsZChjaGlsZCwgbm9kZSk7XG4gICAgICBjaGlsZC5fbW91bnRJbmRleCA9IG51bGw7XG4gICAgICByZXR1cm4gdXBkYXRlO1xuICAgIH1cblxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RNdWx0aUNoaWxkO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9SZWFjdE11bHRpQ2hpbGQuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ2ZianMvbGliL2tleU1pcnJvcicpO1xuXG4vKipcbiAqIFdoZW4gYSBjb21wb25lbnQncyBjaGlsZHJlbiBhcmUgdXBkYXRlZCwgYSBzZXJpZXMgb2YgdXBkYXRlIGNvbmZpZ3VyYXRpb25cbiAqIG9iamVjdHMgYXJlIGNyZWF0ZWQgaW4gb3JkZXIgdG8gYmF0Y2ggYW5kIHNlcmlhbGl6ZSB0aGUgcmVxdWlyZWQgY2hhbmdlcy5cbiAqXG4gKiBFbnVtZXJhdGVzIGFsbCB0aGUgcG9zc2libGUgdHlwZXMgb2YgdXBkYXRlIGNvbmZpZ3VyYXRpb25zLlxuICpcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMgPSBrZXlNaXJyb3Ioe1xuICBJTlNFUlRfTUFSS1VQOiBudWxsLFxuICBNT1ZFX0VYSVNUSU5HOiBudWxsLFxuICBSRU1PVkVfTk9ERTogbnVsbCxcbiAgU0VUX01BUktVUDogbnVsbCxcbiAgVEVYVF9DT05URU5UOiBudWxsXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE11bHRpQ2hpbGRVcGRhdGVUeXBlcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvUmVhY3RNdWx0aUNoaWxkVXBkYXRlVHlwZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZWFjdENoaWxkUmVjb25jaWxlclxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UmVjb25jaWxlciA9IHJlcXVpcmUoJy4vUmVhY3RSZWNvbmNpbGVyJyk7XG5cbnZhciBpbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9pbnN0YW50aWF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgc2hvdWxkVXBkYXRlUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL3Nob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50Jyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlQ2hpbGQoY2hpbGRJbnN0YW5jZXMsIGNoaWxkLCBuYW1lKSB7XG4gIC8vIFdlIGZvdW5kIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICB2YXIga2V5VW5pcXVlID0gY2hpbGRJbnN0YW5jZXNbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhrZXlVbmlxdWUsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4nLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuICBpZiAoY2hpbGQgIT0gbnVsbCAmJiBrZXlVbmlxdWUpIHtcbiAgICBjaGlsZEluc3RhbmNlc1tuYW1lXSA9IGluc3RhbnRpYXRlUmVhY3RDb21wb25lbnQoY2hpbGQpO1xuICB9XG59XG5cbi8qKlxuICogUmVhY3RDaGlsZFJlY29uY2lsZXIgcHJvdmlkZXMgaGVscGVycyBmb3IgaW5pdGlhbGl6aW5nIG9yIHVwZGF0aW5nIGEgc2V0IG9mXG4gKiBjaGlsZHJlbi4gSXRzIG91dHB1dCBpcyBzdWl0YWJsZSBmb3IgcGFzc2luZyBpdCBvbnRvIFJlYWN0TXVsdGlDaGlsZCB3aGljaFxuICogZG9lcyBkaWZmZWQgcmVvcmRlcmluZyBhbmQgaW5zZXJ0aW9uLlxuICovXG52YXIgUmVhY3RDaGlsZFJlY29uY2lsZXIgPSB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBcIm1vdW50IGltYWdlXCIgZm9yIGVhY2ggb2YgdGhlIHN1cHBsaWVkIGNoaWxkcmVuLiBJbiB0aGUgY2FzZVxuICAgKiBvZiBgUmVhY3RET01Db21wb25lbnRgLCBhIG1vdW50IGltYWdlIGlzIGEgc3RyaW5nIG9mIG1hcmt1cC5cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXN0ZWRDaGlsZE5vZGVzIE5lc3RlZCBjaGlsZCBtYXBzLlxuICAgKiBAcmV0dXJuIHs/b2JqZWN0fSBBIHNldCBvZiBjaGlsZCBpbnN0YW5jZXMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaW5zdGFudGlhdGVDaGlsZHJlbjogZnVuY3Rpb24gKG5lc3RlZENoaWxkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgaWYgKG5lc3RlZENoaWxkTm9kZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBjaGlsZEluc3RhbmNlcyA9IHt9O1xuICAgIHRyYXZlcnNlQWxsQ2hpbGRyZW4obmVzdGVkQ2hpbGROb2RlcywgaW5zdGFudGlhdGVDaGlsZCwgY2hpbGRJbnN0YW5jZXMpO1xuICAgIHJldHVybiBjaGlsZEluc3RhbmNlcztcbiAgfSxcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcmVuZGVyZWQgY2hpbGRyZW4gYW5kIHJldHVybnMgYSBuZXcgc2V0IG9mIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDaGlsZHJlbiBQcmV2aW91c2x5IGluaXRpYWxpemVkIHNldCBvZiBjaGlsZHJlbi5cbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q2hpbGRyZW4gRmxhdCBjaGlsZCBlbGVtZW50IG1hcHMuXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbnRleHRcbiAgICogQHJldHVybiB7P29iamVjdH0gQSBuZXcgc2V0IG9mIGNoaWxkIGluc3RhbmNlcy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB1cGRhdGVDaGlsZHJlbjogZnVuY3Rpb24gKHByZXZDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCByZW1vdmVkTm9kZXMsIHRyYW5zYWN0aW9uLCBjb250ZXh0KSB7XG4gICAgLy8gV2UgY3VycmVudGx5IGRvbid0IGhhdmUgYSB3YXkgdG8gdHJhY2sgbW92ZXMgaGVyZSBidXQgaWYgd2UgdXNlIGl0ZXJhdG9yc1xuICAgIC8vIGluc3RlYWQgb2YgZm9yLi5pbiB3ZSBjYW4gemlwIHRoZSBpdGVyYXRvcnMgYW5kIGNoZWNrIGlmIGFuIGl0ZW0gaGFzXG4gICAgLy8gbW92ZWQuXG4gICAgLy8gVE9ETzogSWYgbm90aGluZyBoYXMgY2hhbmdlZCwgcmV0dXJuIHRoZSBwcmV2Q2hpbGRyZW4gb2JqZWN0IHNvIHRoYXQgd2VcbiAgICAvLyBjYW4gcXVpY2tseSBiYWlsb3V0IGlmIG5vdGhpbmcgaGFzIGNoYW5nZWQuXG4gICAgaWYgKCFuZXh0Q2hpbGRyZW4gJiYgIXByZXZDaGlsZHJlbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmFtZTtcbiAgICB2YXIgcHJldkNoaWxkO1xuICAgIGZvciAobmFtZSBpbiBuZXh0Q2hpbGRyZW4pIHtcbiAgICAgIGlmICghbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcHJldkNoaWxkID0gcHJldkNoaWxkcmVuICYmIHByZXZDaGlsZHJlbltuYW1lXTtcbiAgICAgIHZhciBwcmV2RWxlbWVudCA9IHByZXZDaGlsZCAmJiBwcmV2Q2hpbGQuX2N1cnJlbnRFbGVtZW50O1xuICAgICAgdmFyIG5leHRFbGVtZW50ID0gbmV4dENoaWxkcmVuW25hbWVdO1xuICAgICAgaWYgKHByZXZDaGlsZCAhPSBudWxsICYmIHNob3VsZFVwZGF0ZVJlYWN0Q29tcG9uZW50KHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCkpIHtcbiAgICAgICAgUmVhY3RSZWNvbmNpbGVyLnJlY2VpdmVDb21wb25lbnQocHJldkNoaWxkLCBuZXh0RWxlbWVudCwgdHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgICAgICBuZXh0Q2hpbGRyZW5bbmFtZV0gPSBwcmV2Q2hpbGQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJldkNoaWxkKSB7XG4gICAgICAgICAgcmVtb3ZlZE5vZGVzW25hbWVdID0gUmVhY3RSZWNvbmNpbGVyLmdldE5hdGl2ZU5vZGUocHJldkNoaWxkKTtcbiAgICAgICAgICBSZWFjdFJlY29uY2lsZXIudW5tb3VudENvbXBvbmVudChwcmV2Q2hpbGQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgY2hpbGQgbXVzdCBiZSBpbnN0YW50aWF0ZWQgYmVmb3JlIGl0J3MgbW91bnRlZC5cbiAgICAgICAgdmFyIG5leHRDaGlsZEluc3RhbmNlID0gaW5zdGFudGlhdGVSZWFjdENvbXBvbmVudChuZXh0RWxlbWVudCk7XG4gICAgICAgIG5leHRDaGlsZHJlbltuYW1lXSA9IG5leHRDaGlsZEluc3RhbmNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBVbm1vdW50IGNoaWxkcmVuIHRoYXQgYXJlIG5vIGxvbmdlciBwcmVzZW50LlxuICAgIGZvciAobmFtZSBpbiBwcmV2Q2hpbGRyZW4pIHtcbiAgICAgIGlmIChwcmV2Q2hpbGRyZW4uaGFzT3duUHJvcGVydHkobmFtZSkgJiYgIShuZXh0Q2hpbGRyZW4gJiYgbmV4dENoaWxkcmVuLmhhc093blByb3BlcnR5KG5hbWUpKSkge1xuICAgICAgICBwcmV2Q2hpbGQgPSBwcmV2Q2hpbGRyZW5bbmFtZV07XG4gICAgICAgIHJlbW92ZWROb2Rlc1tuYW1lXSA9IFJlYWN0UmVjb25jaWxlci5nZXROYXRpdmVOb2RlKHByZXZDaGlsZCk7XG4gICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHByZXZDaGlsZCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVW5tb3VudHMgYWxsIHJlbmRlcmVkIGNoaWxkcmVuLiBUaGlzIHNob3VsZCBiZSB1c2VkIHRvIGNsZWFuIHVwIGNoaWxkcmVuXG4gICAqIHdoZW4gdGhpcyBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IHJlbmRlcmVkQ2hpbGRyZW4gUHJldmlvdXNseSBpbml0aWFsaXplZCBzZXQgb2YgY2hpbGRyZW4uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdW5tb3VudENoaWxkcmVuOiBmdW5jdGlvbiAocmVuZGVyZWRDaGlsZHJlbiwgc2FmZWx5KSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiByZW5kZXJlZENoaWxkcmVuKSB7XG4gICAgICBpZiAocmVuZGVyZWRDaGlsZHJlbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICB2YXIgcmVuZGVyZWRDaGlsZCA9IHJlbmRlcmVkQ2hpbGRyZW5bbmFtZV07XG4gICAgICAgIFJlYWN0UmVjb25jaWxlci51bm1vdW50Q29tcG9uZW50KHJlbmRlcmVkQ2hpbGQsIHNhZmVseSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDaGlsZFJlY29uY2lsZXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL1JlYWN0Q2hpbGRSZWNvbmNpbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZmxhdHRlbkNoaWxkcmVuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgcGFzc2VkIHRocm91Z2ggdHJhdmVyc2FsLlxuICogQHBhcmFtIHs/UmVhY3RDb21wb25lbnR9IGNoaWxkIFJlYWN0IGNoaWxkIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZSBTdHJpbmcgbmFtZSBvZiBrZXkgcGF0aCB0byBjaGlsZC5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICAvLyBXZSBmb3VuZCBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAgdmFyIHJlc3VsdCA9IHRyYXZlcnNlQ29udGV4dDtcbiAgdmFyIGtleVVuaXF1ZSA9IHJlc3VsdFtuYW1lXSA9PT0gdW5kZWZpbmVkO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGtleVVuaXF1ZSwgJ2ZsYXR0ZW5DaGlsZHJlbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCB0aGUgc2FtZSBrZXksICcgKyAnYCVzYC4gQ2hpbGQga2V5cyBtdXN0IGJlIHVuaXF1ZTsgd2hlbiB0d28gY2hpbGRyZW4gc2hhcmUgYSBrZXksIG9ubHkgJyArICd0aGUgZmlyc3QgY2hpbGQgd2lsbCBiZSB1c2VkLicsIG5hbWUpIDogdm9pZCAwO1xuICB9XG4gIGlmIChrZXlVbmlxdWUgJiYgY2hpbGQgIT0gbnVsbCkge1xuICAgIHJlc3VsdFtuYW1lXSA9IGNoaWxkO1xuICB9XG59XG5cbi8qKlxuICogRmxhdHRlbnMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLiBBbnkgbnVsbFxuICogY2hpbGRyZW4gd2lsbCBub3QgYmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdGluZyBvYmplY3QuXG4gKiBAcmV0dXJuIHshb2JqZWN0fSBmbGF0dGVuZWQgY2hpbGRyZW4ga2V5ZWQgYnkgbmFtZS5cbiAqL1xuZnVuY3Rpb24gZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZmxhdHRlblNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZmxhdHRlbkNoaWxkcmVuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9mbGF0dGVuQ2hpbGRyZW4uanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBFbG95IFZpbGxhc2NsYXJhc1xuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UGVyZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdFBlcmYnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG5cbnZhciBSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuX2N1cnJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVOb2RlID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVQYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZUNvbnRhaW5lckluZm8gPSBudWxsO1xuICAgIHRoaXMuX3dyYXBwZXJTdGF0ZSA9IG51bGw7XG4gICAgdGhpcy5fdG9wTGV2ZWxXcmFwcGVyID0gbnVsbDtcbn07XG5cblJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5kaXNwbGF5TmFtZSA9ICdSZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQnO1xuXG5SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuTWl4aW4gPSB7XG4gICAgbW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uICh0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZUNvbnRhaW5lckluZm8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX25hdGl2ZVBhcmVudCA9IG5hdGl2ZVBhcmVudDtcbiAgICAgICAgdGhpcy5fbmF0aXZlQ29udGFpbmVySW5mbyA9IG5hdGl2ZUNvbnRhaW5lckluZm87XG5cbiAgICAgICAgdGhpcy5fbmF0aXZlTm9kZSA9IHtlbXB0eTogdHJ1ZX07XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9LFxuXG4gICAgcmVjZWl2ZUNvbXBvbmVudDogZnVuY3Rpb24gKG5leHRFbGVtZW50LCB0cmFuc2FjdGlvbiwgY29udGV4dCkge1xuICAgICAgICB2YXIgcHJldkVsZW1lbnQgPSB0aGlzLl9jdXJyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5fY3VycmVudEVsZW1lbnQgPSBuZXh0RWxlbWVudDtcbiAgICAgICAgdGhpcy51cGRhdGVDb21wb25lbnQodHJhbnNhY3Rpb24sIHByZXZFbGVtZW50LCBuZXh0RWxlbWVudCwgY29udGV4dCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKHRyYW5zYWN0aW9uLCBwcmV2RWxlbWVudCwgbmV4dEVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICB9LFxuXG4gICAgZ2V0TmF0aXZlTm9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF0aXZlTm9kZTtcbiAgICB9LFxuXG4gICAgdW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKHNhZmVseSkge1xuICAgICAgICB0aGlzLl9yb290Tm9kZUlEID0gbnVsbDtcbiAgICB9LFxuXG4gICAgZ2V0UHVibGljSW5zdGFuY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFbGVtZW50O1xuICAgIH1cbn07XG5cblxuYXNzaWduKFxuICAgIFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudC5wcm90b3R5cGUsXG4gICAgUmVhY3RBbnl0aGluZ0VtcHR5Q29tcG9uZW50Lk1peGluXG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdFbXB0eUNvbXBvbmVudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nRW1wdHlDb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKiBcbiAqIFRoaXMgZmlsZSBpcyBhIG1vZGlmaWVkIHZlcnNpb24gb2Y6XG4gKiAgcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50RW52aXJvbm1lbnQuanNcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogIFxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFBlcmYgPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RQZXJmJyk7XG5cbnZhciBSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQgPSB7XG4gICAgcHJvY2Vzc0NoaWxkcmVuVXBkYXRlczogZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICB9LFxuICAgIHJlcGxhY2VOb2RlV2l0aE1hcmt1cDogZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICB9XG59O1xuXG5SZWFjdFBlcmYubWVhc3VyZU1ldGhvZHMoXG4gICAgUmVhY3RBbnl0aGluZ0NvbXBvbmVudEVudmlyb25tZW50LFxuICAgICdSZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQnLFxuICAgIHtcbiAgICAgICAgcmVwbGFjZU5vZGVXaXRoTWFya3VwOiAncmVwbGFjZU5vZGVXaXRoTWFya3VwJyxcbiAgICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0QW55dGhpbmdDb21wb25lbnRFbnZpcm9ubWVudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0LWFueXRoaW5nL3NyYy9SZWFjdEFueXRoaW5nQ29tcG9uZW50RW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNVxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRWxveSBWaWxsYXNjbGFyYXNcbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxuXG52YXIgbm9kZU1hbmFnZXIgPSByZXF1aXJlKCcuL2ltcGwvbm9kZS1tYW5hZ2VyLmpzJyk7XG52YXIgaW5pdCA9IHJlcXVpcmUoJy4vaW1wbC9pbml0Jyk7XG52YXIgTm9kZXMgPSByZXF1aXJlKCcuL2ltcGwvbm9kZXMnKTtcblxudmFyIG5vZGVzID0gbmV3IE5vZGVzKCk7XG52YXIgcnVubmluZyA9IGZhbHNlO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgbW91bnQ6IGZ1bmN0aW9uIChpZCwgdGFnLCBwcm9wcywgcGFyZW50KSB7XG4gICAgICAgICAgICBpbnZhcmlhbnQoISh0YWcgPT09ICdnYW1lJyAmJiBub2Rlcy5nYW1lTm9kZSksICdPbmx5IG9uZSBnYW1lIG5vZGUgY2FuIGJlIG1vdW50ZWQuJyk7XG4gICAgICAgICAgICBpbnZhcmlhbnQoISh0YWcgIT09ICdnYW1lJyAmJiAhcGFyZW50KSwgJ09ubHkgXFwnZ2FtZVxcJyBjYW4gYmUgcm9vdCBub2RlLicpO1xuICAgICAgICAgICAgaW52YXJpYW50KCEocHJvcHMubmFtZSAmJiBub2Rlcy5pZEJ5TmFtZShwcm9wcy5uYW1lKSksICdDYW5ub3QgcmVwZWF0IG5hbWVzLicpO1xuXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50ICYmIHBhcmVudC5pZCxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2Rlcy5yZWdpc3Rlcihub2RlKTtcblxuICAgICAgICAgICAgaWYgKHRhZyA9PT0gJ2dhbWUnKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMuc2V0R2FtZU5vZGUobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5tb3VudChub2Rlcywgbm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9LFxuICAgICAgICBjaGlsZHJlbk1vdW50OiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5jaGlsZHJlbk1vdW50KG5vZGVzLCBub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdW5tb3VudDogZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSBub2Rlcy5ieUlkKG5vZGUucGFyZW50KTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKG5vZGUuaWQpLCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZXMudW5yZWdpc3Rlcihub2RlKTtcblxuICAgICAgICAgICAgaWYgKG5vZGUudGFnID09PSAnZ2FtZScpIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5zZXRHYW1lTm9kZShudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIudW5tb3VudChub2Rlcywgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG5vZGUsIG5leHRQcm9wcywgbGFzdFByb3BzKSB7XG4gICAgICAgICAgICBub2RlLnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgICAgICAgbm9kZXMudXBkYXRlKG5vZGUsIGxhc3RQcm9wcyk7XG4gICAgICAgICAgICBub2RlTWFuYWdlci51cGRhdGUobm9kZXMsIG5vZGUsIGxhc3RQcm9wcyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRyYW5zYWN0aW9uOiB7XG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChub2Rlcy5nYW1lTm9kZSAmJiAhcnVubmluZykge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGluaXQobm9kZXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChydW5uaW5nICYmICFub2Rlcy5nYW1lTm9kZSkge1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVzdHJveScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNhY3Rpb25MaXN0ZW5lcnMgPSBub2Rlcy5wb3BUcmFuc2FjdGlvbkxpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIGlmICh0cmFuc2FjdGlvbkxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zYWN0aW9uTGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzLmJ5SWQodHJhbnNhY3Rpb25MaXN0ZW5lcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlTWFuYWdlci5ub3RpZnlUcmFuc2FjdGlvbihub2Rlcywgbm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvTmF0aXZlSW1wbGVtZW50YXRpb24uanNcbiAqKi8iLCIndXNlIHN0cnVjdCc7XG5cbnZhciBub2RlVHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG5cbnZhciBtb3VudCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xuICAgIHZhciBub2RlVHlwZSA9IG5vZGVUeXBlc1tub2RlLnRhZ107XG4gICAgaWYgKG5vZGVUeXBlKSB7XG4gICAgICAgIG5vZGVUeXBlLm1vdW50KG5vZGVzLCBub2RlKTtcbiAgICAgICAgaWYgKG5vZGUub2JqKSB7XG4gICAgICAgICAgICBub2RlLm9iai5ybm9kZWlkID0gbm9kZS5pZDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciB1cGRhdGUgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHByZXZQcm9wcykge1xuICAgIHZhciBub2RlVHlwZSA9IG5vZGVUeXBlc1tub2RlLnRhZ107XG4gICAgaWYgKG5vZGVUeXBlICYmIG5vZGVUeXBlLnVwZGF0ZSkge1xuICAgICAgICB2YXIgY2hhbmdlZFByb3BzID0gT2JqZWN0LmtleXMobm9kZS5wcm9wcyk7XG4gICAgICAgIGNoYW5nZWRQcm9wcyA9IGNoYW5nZWRQcm9wcy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBub2RlLnByb3BzW2tleV0gIT09IHByZXZQcm9wc1trZXldO1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3Qua2V5cyhwcmV2UHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiAhKGtleSBpbiBub2RlLnByb3BzKSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWRQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkUHJvcHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbm9kZVR5cGUudXBkYXRlKG5vZGVzLCBub2RlLCBjaGFuZ2VkUHJvcHMsIHByZXZQcm9wcyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgdW5tb3VudCA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xuICAgIHZhciBub2RlVHlwZSA9IG5vZGVUeXBlc1tub2RlLnRhZ107XG4gICAgaWYgKG5vZGVUeXBlKSB7XG4gICAgICAgIG5vZGVUeXBlLnVubW91bnQobm9kZXMsIG5vZGUpO1xuICAgIH1cbn07XG5cbnZhciBjaGlsZHJlbk1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgdmFyIG5vZGVUeXBlID0gbm9kZVR5cGVzW25vZGUudGFnXTtcbiAgICBpZiAobm9kZVR5cGUgJiYgbm9kZVR5cGUuY2hpbGRyZW5Nb3VudCkge1xuICAgICAgICBub2RlVHlwZS5jaGlsZHJlbk1vdW50KG5vZGVzLCBub2RlKTtcbiAgICB9XG59O1xuXG52YXIgbm90aWZ5VHJhbnNhY3Rpb24gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICB2YXIgbm9kZVR5cGUgPSBub2RlVHlwZXNbbm9kZS50YWddO1xuICAgIGlmIChub2RlVHlwZSAmJiBub2RlVHlwZS5ub3RpZnlUcmFuc2FjdGlvbikge1xuICAgICAgICBub2RlVHlwZS5ub3RpZnlUcmFuc2FjdGlvbihub2Rlcywgbm9kZSk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGNoaWxkcmVuTW91bnQ6IGNoaWxkcmVuTW91bnQsXG4gICAgdW5tb3VudDogdW5tb3VudCxcbiAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICBub3RpZnlUcmFuc2FjdGlvblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvbm9kZS1tYW5hZ2VyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKHtcbiAgICAgICAgZ2FtZTogcmVxdWlyZSgnLi9nYW1lJyksXG4gICAgICAgIHNwcml0ZTogcmVxdWlyZSgnLi9zcHJpdGUnKSxcbiAgICAgICAgZ3JvdXA6IHJlcXVpcmUoJy4vZ3JvdXAnKSxcbiAgICAgICAgYW5pbWF0aW9uOiByZXF1aXJlKCcuL2FuaW1hdGlvbicpLFxuICAgICAgICBjdXJzb3JzOiByZXF1aXJlKCcuL2N1cnNvcnMnKSxcbiAgICAgICAgY29sbGlkZXM6IHJlcXVpcmUoJy4vY29sbGlkZXMnKSxcbiAgICAgICAgb3ZlcmxhcHM6IHJlcXVpcmUoJy4vb3ZlcmxhcHMnKSxcbiAgICAgICAgdGV4dDogcmVxdWlyZSgnLi90ZXh0JyksXG4gICAgICAgIGJ1dHRvbjogcmVxdWlyZSgnLi9idXR0b24nKSxcbiAgICAgICAgZ3JhcGhpY3M6IHJlcXVpcmUoJy4vZ3JhcGhpY3MvZ3JhcGhpY3MnKVxuICAgIH0sXG4gICAgcmVxdWlyZSgnLi9ncmFwaGljcy9yZW5kZXJlcnMnKVxuKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuXHRpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpO1xuXHR9XG5cblx0cmV0dXJuIHRvU3RyLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcblx0aWYgKCFvYmogfHwgdG9TdHIuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBoYXNPd25Db25zdHJ1Y3RvciA9IGhhc093bi5jYWxsKG9iaiwgJ2NvbnN0cnVjdG9yJyk7XG5cdHZhciBoYXNJc1Byb3RvdHlwZU9mID0gb2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgJiYgaGFzT3duLmNhbGwob2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZSwgJ2lzUHJvdG90eXBlT2YnKTtcblx0Ly8gTm90IG93biBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBtdXN0IGJlIE9iamVjdFxuXHRpZiAob2JqLmNvbnN0cnVjdG9yICYmICFoYXNPd25Db25zdHJ1Y3RvciAmJiAhaGFzSXNQcm90b3R5cGVPZikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHQvLyBpZiBsYXN0IG9uZSBpcyBvd24sIHRoZW4gYWxsIHByb3BlcnRpZXMgYXJlIG93bi5cblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7LyoqL31cblxuXHRyZXR1cm4gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQoKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG5cdFx0ZGVlcCA9IHRhcmdldDtcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMV0gfHwge307XG5cdFx0Ly8gc2tpcCB0aGUgYm9vbGVhbiBhbmQgdGhlIHRhcmdldFxuXHRcdGkgPSAyO1xuXHR9IGVsc2UgaWYgKCh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nKSB8fCB0YXJnZXQgPT0gbnVsbCkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Zm9yICg7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmIChvcHRpb25zICE9IG51bGwpIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAobmFtZSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFtuYW1lXTtcblx0XHRcdFx0Y29weSA9IG9wdGlvbnNbbmFtZV07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAodGFyZ2V0ICE9PSBjb3B5KSB7XG5cdFx0XHRcdFx0Ly8gUmVjdXJzZSBpZiB3ZSdyZSBtZXJnaW5nIHBsYWluIG9iamVjdHMgb3IgYXJyYXlzXG5cdFx0XHRcdFx0aWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSkpIHtcblx0XHRcdFx0XHRcdGlmIChjb3B5SXNBcnJheSkge1xuXHRcdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBpc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGlzUGxhaW5PYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSk7XG5cblx0XHRcdFx0XHQvLyBEb24ndCBicmluZyBpbiB1bmRlZmluZWQgdmFsdWVzXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgY29weSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdHRhcmdldFtuYW1lXSA9IGNvcHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4dGVuZC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDY5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW91bnRHYW1lID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG5cbiAgICBub2RlLmNvbGxpc2lvbnMgPSBbXTtcbiAgICBub2RlLm92ZXJsYXBzID0gW107XG4gICAgbm9kZS51cGRhdGVNZXRob2RzID0gW107XG5cbiAgICBpZiAobm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eSgncGh5c2ljcycpKSB7XG4gICAgICAgIG5vZGUub2JqLnBoeXNpY3Muc3RhcnRTeXN0ZW0obm9kZS5wcm9wcy5waHlzaWNzKTtcbiAgICAgICAgbm9kZS5waHlzaWNzID0gJ2FyY2FkZSc7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW91bnQ6IG1vdW50R2FtZSxcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ2FtZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIHNwcml0ZVByb3BlcnRlcyA9IHJlcXVpcmUoJy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuU3ByaXRlJyksXG5cbiAgICB1cGRhdGVTcHJpdGUgPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZShzcHJpdGVQcm9wZXJ0ZXMpLFxuICAgIFxuICAgIG1vdW50U3ByaXRlID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IG5vZGUucHJvcHM7XG4gICAgICAgIG5vZGUub2JqID0gbmV3IFBoYXNlci5TcHJpdGUobm9kZXMuZ2FtZSgpLCBwcm9wcy54LCBwcm9wcy55LCBwcm9wcy5hc3NldEtleSk7XG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcbiAgICAgICAgdXBkYXRlU3ByaXRlKG5vZGVzLCBub2RlKTtcbiAgICB9LFxuXG4gICAgdW5tb3VudFNwcml0ZSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xuICAgICAgICBub2RlLm9iai5raWxsKCk7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW91bnQ6IG1vdW50U3ByaXRlLFxuICAgIHVubW91bnQ6IHVubW91bnRTcHJpdGUsXG4gICAgdXBkYXRlOiB1cGRhdGVTcHJpdGVcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL3Nwcml0ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpLFxuXG4gICAgYWRkTm9kZURpc3BsYXlPYmplY3QgPSBmdW5jdGlvbiAobm9kZXMsIHdyYXBwZXIsIG9iaikge1xuICAgICAgICB2YXIgcGFyZW50ID0gbm9kZXMuYnlJZCh3cmFwcGVyLnBhcmVudCksXG4gICAgICAgICAgICBncm91cCA9IHBhcmVudC50YWcgPT09ICdnYW1lJyA/IHBhcmVudC5vYmoud29ybGQgOiBwYXJlbnQub2JqO1xuXG4gICAgICAgIGdyb3VwLmFkZChvYmogfHwgd3JhcHBlci5vYmopO1xuICAgIH0sXG5cblxuICAgIGdlblByb3BlcnR5TWFwVXBkYXRlID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGNoYW5nZVByb3BzID0gT2JqZWN0LmtleXMobm9kZS5wcm9wcyksIHByZXZQcm9wcyA9IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbmdlUHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IGNoYW5nZVByb3BzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eVVwZGF0ZSA9IHByb3BzW3Byb3BdO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVVwZGF0ZShub2Rlcywgbm9kZSwgbm9kZS5wcm9wc1twcm9wXSwgIXByZXZQcm9wcywgcHJldlByb3BzICYmIHByZXZQcm9wc1twcm9wXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYWRkTm9kZURpc3BsYXlPYmplY3Q6IGFkZE5vZGVEaXNwbGF5T2JqZWN0LFxuICAgIGdlblByb3BlcnR5TWFwVXBkYXRlOiBnZW5Qcm9wZXJ0eU1hcFVwZGF0ZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvdXRpbHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcbiAgICB7fSxcbiAgICByZXF1aXJlKCcuL1BJWEkuU3ByaXRlJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNvcmUnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5nbGUnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNyb3AnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVsdGEnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVzdHJveScpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aCcpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbkNhbWVyYScpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5JbnB1dEVuYWJsZWQnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5Xb3JsZCcpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZScpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlBoeXNpY3NCb2R5JyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlJlc2V0JyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNjYWxlTWluTWF4JyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkJylcbik7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5TcHJpdGUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXG4gICAge30sXG4gICAgcmVxdWlyZSgnLi9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXInKVxuKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuU3ByaXRlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Jylcbik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuZ2VuZXJhdGVQb2ludFByb3BNYXAoWydzY2FsZSddKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BJWEkuRGlzcGxheU9iamVjdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xuICAgICAgICAgICAgYWNjW3Byb3BdID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgIH0sXG5cbiAgICBnZW5lcmF0ZVByZWZpeGVkQmFzaWNQcm9wTWFwID0gZnVuY3Rpb24gKHByZWZpeCwgcHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XG4gICAgICAgICAgICBhY2NbcHJlZml4ICsgcHJvcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSldID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfSxcblxuXG4gICAgZ2VuZXJhdGVQb2ludFByb3BNYXAgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XG4gICAgICAgICAgICBhY2NbcHJvcF0gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIHZhbHVlLCBpc05ldywgcHJldlZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gbm9kZS5vYmpbcHJvcF07XG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnggIT09IHByZXZWYWx1ZS54KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnggPSB2YWx1ZS54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueSAhPT0gcHJldlZhbHVlLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueSA9IHZhbHVlLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFjY1twcm9wICsgJ1gnXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcm9wXS54ID0gdmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgYWNjW3Byb3AgKyAnWSddID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUub2JqW3Byb3BdLnkgPSB2YWx1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXAgPSBmdW5jdGlvbiAocHJlZml4LCBwcm9wcykge1xuICAgICAgICByZXR1cm4gcHJvcHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXhlZFByb3AgPSBwcmVmaXggKyBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKTtcbiAgICAgICAgICAgIGFjY1twcmVmaXhlZFByb3BdID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSwgaXNOZXcsIHByZXZWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IG5vZGUub2JqW3ByZWZpeF1bcHJvcF07XG4gICAgICAgICAgICAgICAgaWYgKGlzTmV3IHx8IHZhbHVlLnggIT09IHByZXZWYWx1ZS54KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50LnggPSB2YWx1ZS54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcgfHwgdmFsdWUueSAhPT0gcHJldlZhbHVlLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQueSA9IHZhbHVlLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFjY1twcmVmaXhlZFByb3AgKyAnWCddID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0ueCA9IHZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFjY1twcmVmaXhlZFByb3AgKyAnWSddID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZGUub2JqW3ByZWZpeF1bcHJvcF0ueSA9IHZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVBbGlhc1Byb3BNYXAgPSBmdW5jdGlvbiAoYWxpYXNlcykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoYWxpYXNlcykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGFsaWFzKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGFsaWFzZXNbYWxpYXNdO1xuICAgICAgICAgICAgYWNjW2FsaWFzXSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2RlLm9ialtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9LFxuICAgIGdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcCA9IGZ1bmN0aW9uIChwcm9wTWFwKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wTWFwKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcHJvcCkge1xuICAgICAgICAgICAgdmFyIGltcGwgPSBwcm9wTWFwW3Byb3BdO1xuICAgICAgICAgICAgYWNjW3Byb3BdID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlLCB2YWx1ZSwgaXNOZXcpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1wbChub2Rlcywgbm9kZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2VuZXJhdGVCYXNpY1Byb3BNYXA6IGdlbmVyYXRlQmFzaWNQcm9wTWFwLFxuICAgIGdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXA6IGdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXAsXG4gICAgZ2VuZXJhdGVQb2ludFByb3BNYXA6IGdlbmVyYXRlUG9pbnRQcm9wTWFwLFxuICAgIGdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXA6IGdlbmVyYXRlUHJlZml4ZWRQb2ludFByb3BNYXAsXG4gICAgZ2VuZXJhdGVBbGlhc1Byb3BNYXA6IGdlbmVyYXRlQWxpYXNQcm9wTWFwLFxuICAgIGdlbmVyYXRlTW91bnRPbmx5UHJvcE1hcDogZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL3V0aWxzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmdlbmVyYXRlQWxpYXNQcm9wTWFwKHtcbiAgICBhc3NldEtleTogJ2tleSdcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Db3JlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2FuZ2xlJ10pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BbmdsZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxudmFyIGdlbmVyYXRlQmFzaWNQcm9wTWFwID0gcmVxdWlyZSgnLi4vdXRpbHMnKS5nZW5lcmF0ZUJhc2ljUHJvcE1hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUJhc2ljUHJvcE1hcChbJ2F1dG9jdWxsJ10pO1xuLyoqXG4gKiA8cmVhZG9ubHk+aW5DYW1lcmFcbiAqL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5BdXRvQ3VsbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQm91bmRzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuQ3JvcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuRGVsdGEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkRlc3Ryb3kuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkhlYWx0aC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuSW5DYW1lcmEuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuXG5cbnZhciBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydjaGVja1dvcmxkQm91bmRzJywgJ291dE9mQm91bmRzS2lsbCddKTtcbi8qKlxuICogPHJlYWRvbmx5PmluV29ybGRcbiAqL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5JbldvcmxkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnYWxpdmUnLCAnbGlmZXNwYW4nXSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LkxpZmVTcGFuLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnZnJhbWUnLCAnZnJhbWVOYW1lJ10pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuT3ZlcmxhcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpLFxuICAgIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQoXG4gICAge30sXG4gICAgdXRpbHMuZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWyd4JywgJ3knXSksXG4gICAgcmVxdWlyZSgnLi4vY3VzdG9tL2JvZHknKVxuKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHV0aWxzLmdlbmVyYXRlUHJlZml4ZWRCYXNpY1Byb3BNYXAoJ2JvZHknLCBbJ2ltbW92YWJsZScsICdjb2xsaWRlV29ybGRCb3VuZHMnXSksXG4gICAgdXRpbHMuZ2VuZXJhdGVQcmVmaXhlZFBvaW50UHJvcE1hcCgnYm9keScsIFsnYm91bmNlJywgJ2dyYXZpdHknXSksXG4gICAgdXRpbHMuZ2VuZXJhdGVNb3VudE9ubHlQcm9wTWFwKHtcbiAgICAgICAgYm9keVBoeXNpY3M6IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwaHlzaWNzID0gbm9kZXMuZ2FtZSgpLnBoeXNpY3MsXG4gICAgICAgICAgICAgICAgc3lzdGVtID0gdmFsdWUgIT09IHRydWUgPyB2YWx1ZSA6IHBoeXNpY3Muc3lzdGVtO1xuXG4gICAgICAgICAgICBub2Rlcy5nYW1lKCkucGh5c2ljcy5lbmFibGUobm9kZS5vYmosIHN5c3RlbSk7XG4gICAgICAgIH1cbiAgICB9KVxuKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9jdXN0b20vYm9keS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5Db21wb25lbnQuUmVzZXQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlNjYWxlTWluTWF4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2VuZXJhdGVCYXNpY1Byb3BNYXAgPSByZXF1aXJlKCcuLi91dGlscycpLmdlbmVyYXRlQmFzaWNQcm9wTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQmFzaWNQcm9wTWFwKFsnc21vb3RoZWQnXSlcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgZ3JvdXBQcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyb3VwJyksXG5cbiAgICB1cGRhdGVHcm91cCA9IHV0aWxzLmdlblByb3BlcnR5TWFwVXBkYXRlKGdyb3VwUHJvcGVydGVzKSxcblxuICAgIG1vdW50R3JvdXAgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyb3VwKG5vZGVzLmdhbWUoKSk7XG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcbiAgICAgICAgdXBkYXRlR3JvdXAobm9kZXMsIG5vZGUpO1xuICAgIH07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vdW50OiBtb3VudEdyb3VwLFxuICAgIHVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuICAgIHVwZGF0ZTogdXBkYXRlR3JvdXBcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyb3VwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcbiAgICBnZW5lcmF0ZUJhc2ljUHJvcE1hcCA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2VuZXJhdGVCYXNpY1Byb3BNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyJyksXG4gICAgZ2VuZXJhdGVCYXNpY1Byb3BNYXAoWydlbmFibGVCb2R5J10pXG4pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyb3VwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW91bnRBbmltYXRpb24gPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBub2Rlcy5ieUlkKG5vZGUucGFyZW50KTtcbiAgICAgICAgbm9kZS5vYmogPSBwYXJlbnROb2RlLm9iai5hbmltYXRpb25zLmFkZChub2RlLnByb3BzLmlkLCBub2RlLnByb3BzLmZyYW1lcywgbm9kZS5wcm9wcy5mcHMsIG5vZGUucHJvcHMubG9vcCk7XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW91bnQ6IG1vdW50QW5pbWF0aW9uLFxuICAgIHVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB9LFxuICAgIHVwZGF0ZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvYW5pbWF0aW9uLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW91bnRDdXJzb3JzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgdmFyIG9uSW5wdXQgPSBub2RlLnByb3BzLm9uSW5wdXQsXG4gICAgICAgIGN1cnNvcnMgPSBub2Rlcy5nYW1lKCkuaW5wdXQua2V5Ym9hcmQuY3JlYXRlQ3Vyc29yS2V5cygpO1xuXG4gICAgbm9kZS5vYmogPSB7XG4gICAgICAgIGN1cnNvcnM6IGN1cnNvcnMsXG4gICAgICAgIGNhbGxiYWNrOiBvbklucHV0LmJpbmQobnVsbCwgY3Vyc29ycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBub2Rlcy5ieU5hbWUobmFtZSkub2JqO1xuICAgICAgICB9KVxuICAgIH07XG5cbiAgICBub2Rlcy5nYW1lTm9kZS51cGRhdGVNZXRob2RzLnB1c2gobm9kZS5vYmouY2FsbGJhY2spO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW91bnQ6IG1vdW50Q3Vyc29ycyxcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcbiAgICB1cGRhdGU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2N1cnNvcnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtb3VudENvbGxpZGVzID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgdmFyIGNvbGxpZGVzV2l0aElkID0gbm9kZXMuaWRCeU5hbWUobm9kZS5wcm9wcy53aXRoKTtcbiAgICBub2RlLm9iaiA9IFtub2RlLnBhcmVudCwgY29sbGlkZXNXaXRoSWRdO1xuICAgIG5vZGVzLmdhbWVOb2RlLmNvbGxpc2lvbnMucHVzaChub2RlLm9iaik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb3VudDogbW91bnRDb2xsaWRlcyxcbiAgICB1bm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgfSxcbiAgICB1cGRhdGU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2NvbGxpZGVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW91bnRDb2xsaWRlcyA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xuICAgIHZhciBvdmVybGFwc1dpdGhJZCA9IG5vZGVzLmlkQnlOYW1lKG5vZGUucHJvcHMud2l0aCk7XG4gICAgbm9kZS5vYmogPSB7XG4gICAgICAgIHBhaXI6IFtub2RlLnBhcmVudCwgb3ZlcmxhcHNXaXRoSWRdLFxuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIG5vZGUucHJvcHMub25PdmVybGFwKG5vZGVzLmJ5SWQoYS5ybm9kZWlkKSwgbm9kZXMuYnlJZChiLnJub2RlaWQpKVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIG5vZGVzLmdhbWVOb2RlLm92ZXJsYXBzLnB1c2gobm9kZS5vYmopO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW91bnQ6IG1vdW50Q29sbGlkZXMsXG4gICAgdW5tb3VudDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG4gICAgdXBkYXRlOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy9vdmVybGFwcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIHRleHRQcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlRleHQnKSxcblxuICAgIHVwZGF0ZVRleHQgPSB1dGlscy5nZW5Qcm9wZXJ0eU1hcFVwZGF0ZSh0ZXh0UHJvcGVydGVzKSxcbiAgICBcbiAgICBtb3VudFRleHQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcztcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLlRleHQobm9kZXMuZ2FtZSgpLCBwcm9wcy54LCBwcm9wcy55LCBwcm9wcy50ZXh0LCBwcm9wcy5zdHlsZSk7XG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcbiAgICB9LFxuXG4gICAgdW5tb3VudFRleHQgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xuICAgIH07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vdW50OiBtb3VudFRleHQsXG4gICAgdW5tb3VudDogdW5tb3VudFRleHQsXG4gICAgdXBkYXRlOiB1cGRhdGVUZXh0XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC90eXBlcy90ZXh0LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQnKSxcbiAgICB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLlNwcml0ZScpLFxuICAgIHV0aWxzLmdlbmVyYXRlQmFzaWNQcm9wTWFwKFsndGV4dCddKVxuKTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLlRleHQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBidXR0b25Qcm9wZXJ0ZXMgPSByZXF1aXJlKCcuLi9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkJ1dHRvbicpLFxuXG4gICAgdXBkYXRlQnV0dG9uID0gdXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoYnV0dG9uUHJvcGVydGVzKSxcblxuICAgIG1vdW50U0J1dHRvbiA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSkge1xuICAgICAgICB2YXIgcHJvcHMgPSBub2RlLnByb3BzO1xuXG4gICAgICAgIG5vZGUuYnV0dG9uID0gbmV3IFBoYXNlci5CdXR0b24oXG4gICAgICAgICAgICAgICAgbm9kZXMuZ2FtZSgpLFxuICAgICAgICAgICAgICAgIHByb3BzLngsXG4gICAgICAgICAgICAgICAgcHJvcHMueSxcbiAgICAgICAgICAgICAgICBwcm9wcy5hc3NldEtleSxcbiAgICAgICAgICAgICAgICBwcm9wcy5vbkNsaWNrLFxuICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzBdLFxuICAgICAgICAgICAgICAgIHByb3BzLmZyYW1lc1sxXSxcbiAgICAgICAgICAgICAgICBwcm9wcy5mcmFtZXNbMl0sXG4gICAgICAgICAgICAgICAgcHJvcHMuZnJhbWVzWzNdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGlmIChub2RlLnByb3BzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBub2RlLm9iaiA9IG5ldyBQaGFzZXIuR3JvdXAobm9kZXMuZ2FtZSgpKTtcbiAgICAgICAgICAgIG5vZGUub2JqLmFkZChub2RlLmJ1dHRvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlLm9iaiA9IG5vZGUuYnV0dG9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYWRkTm9kZURpc3BsYXlPYmplY3Qobm9kZXMsIG5vZGUpO1xuICAgICAgICB1cGRhdGVCdXR0b24obm9kZXMsIG5vZGUpO1xuICAgIH0sXG5cbiAgICB1bm1vdW50QnV0dG9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgICAgIG5vZGUub2JqLmtpbGwoKTtcbiAgICB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb3VudDogbW91bnRTQnV0dG9uLFxuICAgIHVubW91bnQ6IHVubW91bnRCdXR0b24sXG4gICAgdXBkYXRlOiB1cGRhdGVCdXR0b25cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2J1dHRvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkltYWdlJylcbik7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5CdXR0b24uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cblxudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZChcbiAgICB7fSxcbiAgICByZXF1aXJlKCcuL1BJWEkuU3ByaXRlJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNvcmUnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5nbGUnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuQW5pbWF0aW9uJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5CcmluZ1RvVG9wJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkNyb3AnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVsdGEnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuRGVzdHJveScpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5GaXhlZFRvQ2FtZXJhJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LklucHV0RW5hYmxlZCcpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5MaWZlU3BhbicpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Mb2FkVGV4dHVyZScpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5PdmVybGFwJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlJlc2V0JyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LlNtb290aGVkJylcbik7XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvcHJvcGVydGllcy9iYXNlL1BoYXNlci5JbWFnZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKSxcbiAgICBncmFwaGljc1Byb3BlcnRlcyA9IHJlcXVpcmUoJy4uLy4uL3Byb3BlcnRpZXMvYmFzZS9QaGFzZXIuR3JhcGhpY3MnKSxcblxuICAgIHVwZGF0ZUdyYXBoaWNzID0gdXRpbHMuZ2VuUHJvcGVydHlNYXBVcGRhdGUoZ3JhcGhpY3NQcm9wZXJ0ZXMpLFxuXG4gICAgaXRlbVR5cGVzID0gcmVxdWlyZSgnLi9yZW5kZXJlcnMnKSxcblxuICAgIG1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICAgICAgdmFyIHByb3BzID0gbm9kZS5wcm9wcztcbiAgICAgICAgbm9kZS5vYmogPSBuZXcgUGhhc2VyLkdyYXBoaWNzKG5vZGVzLmdhbWUoKSwgcHJvcHMueCwgcHJvcHMueSk7XG4gICAgICAgIHV0aWxzLmFkZE5vZGVEaXNwbGF5T2JqZWN0KG5vZGVzLCBub2RlKTtcbiAgICAgICAgdXBkYXRlR3JhcGhpY3Mobm9kZXMsIG5vZGUpO1xuICAgIH0sXG5cbiAgICB1bm1vdW50R3JhcGhpY3MgPSBmdW5jdGlvbiAobm9kZXMsIG5vZGUpIHtcbiAgICAgICAgbm9kZS5vYmoua2lsbCgpO1xuICAgIH0sXG5cbiAgICBjaGlsZHJlbk1vdW50ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgICAgIG5vZGVzLmNhbmNlbFRyYW5zYWN0aW9uTm9maXRpY2F0aW9uKG5vZGUuaWQpO1xuICAgICAgICBkcmF3KG5vZGVzLCBub2RlKTtcbiAgICB9LFxuXG4gICAgcmVkcmF3ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgICAgIG5vZGUub2JqLmNsZWFyKCk7XG4gICAgICAgIGRyYXcobm9kZXMsIG5vZGUpO1xuICAgIH0sXG5cbiAgICBkcmF3ID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuYnlJZChub2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZXNbY2hpbGQudGFnXSkge1xuICAgICAgICAgICAgICAgIGl0ZW1UeXBlc1tjaGlsZC50YWddLmRyYXcobm9kZXMsIGNoaWxkLCBub2RlLm9iaiwgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBtb3VudDogbW91bnRHcmFwaGljcyxcbiAgICBjaGlsZHJlbk1vdW50OiBjaGlsZHJlbk1vdW50LFxuICAgIHVubW91bnQ6IHVubW91bnRHcmFwaGljcyxcbiAgICB1cGRhdGU6IHVwZGF0ZUdyYXBoaWNzLFxuICAgIG5vdGlmeVRyYW5zYWN0aW9uOiByZWRyYXdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2dyYXBoaWNzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHJlcXVpcmUoJy4vUElYSS5HcmFwaGljcycpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5Db3JlJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkFuZ2xlJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkF1dG9DdWxsJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkJvdW5kcycpLFxuICAgIHJlcXVpcmUoJy4vUGhhc2VyLkNvbXBvbmVudC5EZXN0cm95JyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkZpeGVkVG9DYW1lcmEnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuSW5wdXRFbmFibGVkJyksXG4gICAgcmVxdWlyZSgnLi9QaGFzZXIuQ29tcG9uZW50LkluV29ybGQnKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuTGlmZVNwYW4nKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUGh5c2ljc0JvZHknKSxcbiAgICByZXF1aXJlKCcuL1BoYXNlci5Db21wb25lbnQuUmVzZXQnKVxuKTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW1wbC9wcm9wZXJ0aWVzL2Jhc2UvUGhhc2VyLkdyYXBoaWNzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgnZXh0ZW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKFxuICAgIHt9LFxuICAgIHJlcXVpcmUoJy4vUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyJylcbik7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3Byb3BlcnRpZXMvYmFzZS9QSVhJLkdyYXBoaWNzLmpzXG4gKiovIiwidmFyIGNyZWF0ZUdyYXBoaWNzTm9kZSA9IHJlcXVpcmUoJy4vY3JlYXRlLWdyYXBoaWNzLWl0ZW0nKSxcblxuICAgIHJlbmRlcmVycyA9IHtcbiAgICAgICAgY2lyY2xlOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcbiAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdDaXJjbGUoXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmRpYW1ldGVyIHx8IDBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlY3Q6IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xuICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd1JlY3QoXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxuICAgICAgICAgICAgICAgIHkwICsgKG5vZGUucHJvcHMueSB8fCAwKSxcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLndpZHRoIHx8IDAsXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5oZWlnaHQgfHwgMFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluZTogZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XG4gICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8oXG4gICAgICAgICAgICAgICAgeDAgKyAobm9kZS5wcm9wcy54MSB8fCAwKSxcbiAgICAgICAgICAgICAgICB5MCArIChub2RlLnByb3BzLnkxIHx8IDApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKFxuICAgICAgICAgICAgICAgIHgwICsgKG5vZGUucHJvcHMueDIgfHwgMCksXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55MiB8fCAwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluZXRvOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcbiAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhcbiAgICAgICAgICAgICAgICB4MCArIChub2RlLnByb3BzLnggfHwgMCksXG4gICAgICAgICAgICAgICAgeTAgKyAobm9kZS5wcm9wcy55IHx8IDApXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBjdXJ2ZXRvOiBmdW5jdGlvbiAobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApIHtcbiAgICAgICAgICAgIGdyYXBoaWNzLnF1YWRyYXRpY0N1cnZlVG8oXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wcy5jcHggKyB4MCxcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzLmNweSArIHkwLFxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMueCArIHgwLFxuICAgICAgICAgICAgICAgIG5vZGUucHJvcHMueSArIHkwXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBzaGFwZTogZnVuY3Rpb24gKG5vZGVzLCBub2RlLCBncmFwaGljcywgeDAsIHkwKSB7XG4gICAgICAgICAgICB2YXIgc3gwID0geDAgKyAobm9kZS5wcm9wcy54IHx8IDApLFxuICAgICAgICAgICAgICAgIHN5MCA9IHkwICsgKG5vZGUucHJvcHMueSB8fCAwKTtcblxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcHMuZCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IG5vZGUucHJvcHMuZC5tYXRjaCgvKFthLXpdWzAtOSxdKykvZyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IHBhcnQuY2hhckF0KDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IHBhcnQubWF0Y2goL1swLTldKy9nKS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MuZHJhd0NpcmNsZSh2WzBdICsgc3gwLCB2WzFdICsgc3kwLCB2WzJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmRyYXdSZWN0KHZbMF0gKyBzeDAsIHZbMV0gKyBzeTAsIHZbMl0sIHZbM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKHZbMF0gKyBzeDAsIHZbMV0gKyBzeTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhpY3MucXVhZHJhdGljQ3VydmVUbyh2WzBdLCB2WzFdLCB2WzJdICsgc3gwLCB2WzNdICsgc3kwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBub2Rlcy5ieUlkKG5vZGUuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlcnNbY2hpbGQudGFnXSkge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnNbY2hpbGQudGFnXShub2RlcywgY2hpbGQsIGdyYXBoaWNzLCBzeDAsIHN5MCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyhyZW5kZXJlcnMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB0eXBlKSB7XG4gICAgYWNjW3R5cGVdID0gY3JlYXRlR3JhcGhpY3NOb2RlKHJlbmRlcmVyc1t0eXBlXSk7XG4gICAgcmV0dXJuIGFjYztcbn0sIHt9KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvdHlwZXMvZ3JhcGhpY3MvcmVuZGVyZXJzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlID0gZnVuY3Rpb24gKGRyYXcpIHtcblxuICAgIHZhciByZXF1ZXN0Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24gKG5vZGVzLCBub2RlKSB7XG4gICAgICAgICAgICB2YXIgZ3JhcGhpY3MgPSBub2Rlcy5wYXJlbnQobm9kZSwgJ2dyYXBoaWNzJyk7XG4gICAgICAgICAgICBpZiAoZ3JhcGhpY3MpIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5yZXF1ZXN0VHJhbnNhY3Rpb25Ob2ZpdGljYXRpb24oZ3JhcGhpY3MuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlcXVlc3ROb3RpZmljYXRpb25PblVwZGF0ZSA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgY2hhbmdlUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQcm9wcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdE5vdGlmaWNhdGlvbihub2Rlcywgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblxuICAgICAgICBkcmF3V3JhcHBlciA9IGZ1bmN0aW9uIChub2Rlcywgbm9kZSwgZ3JhcGhpY3MsIHgwLCB5MCkge1xuICAgICAgICAgICAgdmFyIGZpbGwgPSB0eXBlb2Ygbm9kZS5wcm9wcy5maWxsICE9PSAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgICAgICBsaW5lID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlIT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZVdpZHRoICE9PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2VBbHBoYSAhPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgICAgICAgIGlmIChmaWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IHR5cGVvZiBub2RlLnByb3BzLmZpbGwgIT09ICd1bmRlZmluZWQnID8gbm9kZS5wcm9wcy5maWxsIDogMHgwMDAwMDAsXG4gICAgICAgICAgICAgICAgICAgIGZpbGxBbHBoYSA9IHR5cGVvZiBub2RlLnByb3BzLmZpbGxBbHBoYSA9PT0gJ251bWJlcicgPyBub2RlLnByb3BzLmZpbGxBbHBoYSA6IDE7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MuYmVnaW5GaWxsKGZpbGxDb2xvciwgZmlsbEFscGhhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW5lKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmVDb2xvciA9IHR5cGVvZiBub2RlLnByb3BzLnN0cm9rZSAhPT0gJ3VuZGVmaW5lZCcgPyBub2RlLnByb3BzLnN0cm9rZSA6IDB4MDAwMDAwLFxuICAgICAgICAgICAgICAgICAgICBsaW5lQWxwaGEgPSB0eXBlb2Ygbm9kZS5wcm9wcy5zdHJva2VBbHBoYSA9PT0gJ251bWJlcicgPyBub2RlLnByb3BzLnN0cm9rZUFscGhhIDogMSxcbiAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoID0gdHlwZW9mIG5vZGUucHJvcHMuc3Ryb2tlV2lkdGggPT09ICdudW1iZXInID8gbm9kZS5wcm9wcy5zdHJva2VXaWR0aCA6IDE7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVN0eWxlKGxpbmVXaWR0aCwgbGluZUNvbG9yLCBsaW5lQWxwaGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lU3R5bGUoMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRyYXcobm9kZXMsIG5vZGUsIGdyYXBoaWNzLCB4MCwgeTApO1xuXG4gICAgICAgICAgICBpZiAoZmlsbCkge1xuICAgICAgICAgICAgICAgIGdyYXBoaWNzLmVuZEZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG1vdW50OiByZXF1ZXN0Tm90aWZpY2F0aW9uLFxuICAgICAgICB1bm1vdW50OiByZXF1ZXN0Tm90aWZpY2F0aW9uLFxuICAgICAgICB1cGRhdGU6IHJlcXVlc3ROb3RpZmljYXRpb25PblVwZGF0ZSxcbiAgICAgICAgZHJhdzogZHJhd1dyYXBwZXJcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL3R5cGVzL2dyYXBoaWNzL2NyZWF0ZS1ncmFwaGljcy1pdGVtLmpzXG4gKiovIiwidmFyIG5vZGVNYW5hZ2VyID0gcmVxdWlyZSgnLi9ub2RlLW1hbmFnZXInKSxcbiAgICBsb2FkQXNzZXRzID0gcmVxdWlyZSgnLi9hc3NldHMnKSxcblxuICAgIGluaXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChub2RlcywgY2hpbGRyZW4pIHtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGRJZCkge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gbm9kZXMuaWRzW2NoaWxkSWRdO1xuICAgICAgICAgICAgbm9kZU1hbmFnZXIubW91bnQobm9kZXMsIGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5pdENoaWxkcmVuKG5vZGVzLCBjaGlsZC5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIuY2hpbGRyZW5Nb3VudChub2RlcywgY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgaW5pdCA9IGZ1bmN0aW9uIChub2Rlcykge1xuICAgICAgICB2YXIge2Fzc2V0cyA9IHt9LCB3aWR0aCwgaGVpZ2h0LCBtb2RlID0gUGhhc2VyLkFVVE99ID0gbm9kZXMuZ2FtZU5vZGUucHJvcHM7XG5cbiAgICAgICAgdmFyIGdhbWVJbXBsID0ge1xuICAgICAgICAgICAgcHJlbG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxvYWRBc3NldHMobm9kZXMuZ2FtZU5vZGUsIGFzc2V0cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbm9kZU1hbmFnZXIubW91bnQobm9kZXMsIG5vZGVzLmdhbWVOb2RlKTtcbiAgICAgICAgICAgICAgICBpbml0Q2hpbGRyZW4obm9kZXMsIG5vZGVzLmdhbWVOb2RlLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmdhbWVOb2RlLmNvbGxpc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSBub2Rlcy5nYW1lTm9kZS5jb2xsaXNpb25zW2ldO1xuICAgICAgICAgICAgICAgICAgICBub2Rlcy5nYW1lTm9kZS5vYmoucGh5c2ljcy5hcmNhZGUuY29sbGlkZShub2Rlcy5pZHNbY1swXV0ub2JqLCBub2Rlcy5pZHNbY1sxXV0ub2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5vZGVzLmdhbWVOb2RlLm92ZXJsYXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvdmVybGFwID0gbm9kZXMuZ2FtZU5vZGUub3ZlcmxhcHNbaV07XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmdhbWVOb2RlLm9iai5waHlzaWNzLmFyY2FkZS5vdmVybGFwKFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMuaWRzW292ZXJsYXAucGFpclswXV0ub2JqLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMuaWRzW292ZXJsYXAucGFpclsxXV0ub2JqLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmxhcC5jYWxsYmFjaywgbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBub2Rlcy5nYW1lTm9kZS51cGRhdGVNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmdhbWVOb2RlLnVwZGF0ZU1ldGhvZHNbaV0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5vZGVzLmdhbWVOb2RlLm9iaiA9IG5ldyBQaGFzZXIuR2FtZSh3aWR0aCwgaGVpZ2h0LCBtb2RlLCAnJywgZ2FtZUltcGwpO1xuICAgIH07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvaW5pdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGxvYWRBc3NldHMgPSBmdW5jdGlvbiAoZ2FtZU5vZGUsIGFzc2V0cykge1xuICAgIE9iamVjdC5rZXlzKGFzc2V0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBhc3NldCA9IGFzc2V0c1trZXldO1xuICAgICAgICBzd2l0Y2ggKGFzc2V0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgICAgICBnYW1lTm9kZS5vYmoubG9hZC5pbWFnZShrZXksIGFzc2V0LnNyYyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzcHJpdGVzaGVldCc6XG4gICAgICAgICAgICAgICAgZ2FtZU5vZGUub2JqLmxvYWQuc3ByaXRlc2hlZXQoa2V5LCBhc3NldC5zcmMsIGFzc2V0LndpZHRoLCBhc3NldC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGxvYWRBc3NldHM7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbXBsL2Fzc2V0cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIE5vZGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ2FtZU5vZGUgPSBudWxsO1xuICAgIHRoaXMuaWRzID0ge307XG4gICAgdGhpcy5uYW1lMmlkID0ge307XG4gICAgdGhpcy5pZDJuYW1lID0ge307XG4gICAgdGhpcy5ub3RpZnlUcmFuc2FjdGlvbiA9IFtdO1xufTtcblxuTm9kZXMucHJvdG90eXBlLnNldEdhbWVOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB0aGlzLmdhbWVOb2RlID0gbm9kZTsgIFxufTtcblxuTm9kZXMucHJvdG90eXBlLnJlcXVlc3RUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcbiAgICBpZiAodGhpcy5ub3RpZnlUcmFuc2FjdGlvbi5pbmRleE9mKG5vZGVpZCkgPCAwKSB7XG4gICAgICAgIHRoaXMubm90aWZ5VHJhbnNhY3Rpb24ucHVzaChub2RlaWQpO1xuICAgIH1cbn07XG5cbk5vZGVzLnByb3RvdHlwZS5jYW5jZWxUcmFuc2FjdGlvbk5vZml0aWNhdGlvbiA9IGZ1bmN0aW9uIChub2RlaWQpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLmluZGV4T2Yobm9kZWlkKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufTtcblxuTm9kZXMucHJvdG90eXBlLnBvcFRyYW5zYWN0aW9uTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm5vdGlmeVRyYW5zYWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubm90aWZ5VHJhbnNhY3Rpb247XG4gICAgICAgIHRoaXMubm90aWZ5VHJhbnNhY3Rpb24gPSBbXTtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG5Ob2Rlcy5wcm90b3R5cGUuZ2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lTm9kZS5vYmo7XG59O1xuXG5cbk5vZGVzLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdGhpcy5pZHNbbm9kZS5pZF0gPSBub2RlO1xuICAgIGlmIChub2RlLnByb3BzLm5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lMmlkW25vZGUucHJvcHMubmFtZV0gPSBub2RlLmlkO1xuICAgICAgICB0aGlzLmlkMm5hbWVbbm9kZS5pZF0gPSBub2RlLnByb3BzLm5hbWU7XG4gICAgfVxufTtcblxuTm9kZXMucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChub2RlLCBsYXN0UHJvcHMpIHtcbiAgICBpZiAobGFzdFByb3BzLm5hbWUgIT09IG5vZGUucHJvcHMubmFtZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5uYW1lMmlkW2xhc3RQcm9wcy5uYW1lXTtcbiAgICAgICAgdGhpcy5uYW1lMmlkW25vZGUucHJvcHMubmFtZV0gPSBub2RlLmlkO1xuICAgICAgICB0aGlzLmlkMm5hbWVbbm9kZS5pZF0gPSBub2RlLnByb3BzLm5hbWU7XG4gICAgfVxufTtcblxuTm9kZXMucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIGRlbGV0ZSB0aGlzLmlkc1tub2RlLmlkXTtcbiAgICBpZiAobm9kZS5wcm9wcy5uYW1lKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm5hbWUyaWRbbm9kZS5wcm9wcy5uYW1lXTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWQybmFtZVtub2RlLmlkXTtcbiAgICB9XG59O1xuXG5Ob2Rlcy5wcm90b3R5cGUuYnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiB0aGlzLmlkc1tpZF07XG59O1xuXG5Ob2Rlcy5wcm90b3R5cGUuaWRCeU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLm5hbWUyaWRbbmFtZV07XG59O1xuXG5Ob2Rlcy5wcm90b3R5cGUuYnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5pZHNbdGhpcy5uYW1lMmlkW25hbWVdXTtcbn07XG5cbk5vZGVzLnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAobm9kZSwgdGFnKSB7XG4gICAgd2hpbGUodHJ1ZSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5pZHNbbm9kZS5wYXJlbnRdO1xuICAgICAgICBpZiAocGFyZW50ID09PSBudWxsIHx8IHBhcmVudC50YWcgPT09IHRhZykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGVzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ltcGwvbm9kZXMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9