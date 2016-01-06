module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.identity = identity;
	exports.trace = trace;
	exports.curry = curry;
	exports.partial = partial;
	exports.compose = compose;
	exports.composeDeferred = composeDeferred;
	exports.memoize = memoize;
	exports.pluck = pluck;
	exports.once = once;
	exports.functionId = functionId;

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	/**
	 * @method identity
	 * @param {*} a
	 * @return {*}
	 */
	function identity(a) {
	    return a;
	}

	/**
	 * @method trace
	 * @param {*} a
	 * @return {*}
	 */
	function trace(a) {

	    var isArrayMap = function isArrayMap(a) {
	        return Array.isArray(a) && _typeof(a[0]) === 'object';
	    };
	    (isArrayMap(a) ? console.table : console.log)(a);

	    return identity(a);
	}

	/**
	 * @method curry
	 * @param {Function} fn
	 * @return {Function}
	 */
	function curry(fn) {

	    var argArity = fn.length;

	    function curriedFn() {
	        for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
	            a[_key] = arguments[_key];
	        }

	        if (a.length >= argArity) {
	            return fn.apply(undefined, a);
	        }

	        function internalCurriedFn() {
	            for (var _len2 = arguments.length, b = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                b[_key2] = arguments[_key2];
	            }

	            return curriedFn.apply(undefined, [].concat(a, b));
	        }

	        /**
	         * @method toString
	         * @return {String}
	         */
	        internalCurriedFn.toString = function () {
	            return functionId(fn) + '(' + a.join(', ') + ')';
	        };

	        return internalCurriedFn;
	    }

	    /**
	     * @method toString
	     * @return {String}
	     */
	    curriedFn.toString = function () {
	        return functionId(fn);
	    };

	    return curriedFn;
	}

	/**
	 * @method partial
	 * @param {Function} fn
	 * @param {Array} a
	 * @return {Function}
	 */
	function partial(fn) {
	    for (var _len3 = arguments.length, a = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        a[_key3 - 1] = arguments[_key3];
	    }

	    var partialFn = fn.bind.apply(fn, [null].concat(a));

	    /**
	     * @method toString
	     * @type {Function}
	     */
	    partialFn.toString = function () {
	        return fn.toString() + '(' + a.join(', ') + ')';
	    };

	    return partialFn;
	}

	/**
	 * @method compose
	 * @param {Function[]} fns
	 * @return {Function}
	 */
	function compose() {
	    for (var _len4 = arguments.length, fns = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        fns[_key4] = arguments[_key4];
	    }

	    var composeFn = function composeFn(a) {
	        var _this = this;

	        return fns.reduceRight(function (accumulator, fn) {
	            return fn.call(_this, accumulator);
	        }, a);
	    };

	    /**
	     * @method toString
	     * @return {String}
	     */
	    composeFn.toString = function () {
	        return 'compose(' + fns.map(function (fn) {
	            return fn.toString();
	        }).join(', ') + ')';
	    };

	    return composeFn;
	}

	/**
	 * @method composeDeferred
	 * @param {Function[]} fns
	 * @return {Promise}
	 */
	function composeDeferred() {
	    for (var _len5 = arguments.length, fns = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        fns[_key5] = arguments[_key5];
	    }

	    var composeFn = function composeFn(a) {
	        var _this2 = this;

	        return new Promise(function (resolve) {

	            var next = function next(accumulator) {
	                var index = arguments.length <= 1 || arguments[1] === undefined ? fns.length - 1 : arguments[1];

	                if (! ~index) {
	                    return void resolve(accumulator);
	                }

	                var r = fns[index].call(_this2, accumulator);
	                Promise.resolve(r).then(function (x) {
	                    return next(x, index - 1);
	                });
	            };

	            next(a);
	        });
	    };

	    /**
	     * @method toString
	     * @return {String}
	     */
	    composeFn.toString = function () {
	        return 'compose(' + fns.map(function (fn) {
	            return fn.toString();
	        }).join(', ') + ')';
	    };

	    return composeFn;
	}

	/**
	 * @method memoize
	 * @param {Function} fn
	 * @return {Function}
	 */
	function memoize(fn) {

	    var cache = new Map();
	    var memoizeFn = function memoizeFn() {
	        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	            args[_key6] = arguments[_key6];
	        }

	        var key = JSON.stringify(args);
	        var cached = cache.get(key);

	        return cached ? cached : (function () {
	            var value = fn.apply(undefined, args);
	            cache.set(key, value);
	            return value;
	        })();
	    };

	    /**
	     * @method toString
	     * @return {String}
	     */
	    memoizeFn.toString = function () {
	        return fn.toString();
	    };
	    return memoizeFn;
	}

	/**
	 * @method pluck
	 * @param {Object} model
	 * @param {String} key
	 * @return
	 */
	function pluck(model, key) {
	    return model.map(function (item) {
	        return item[key];
	    });
	}

	/**
	 * @method once
	 * @param {Function} fn
	 * @return {Function}
	 */
	function once(fn) {

	    var invoked = false;
	    var onceFn = function onceFn() {
	        var value = invoked ? (function () {})() : fn.apply(undefined, arguments);
	        invoked = true;
	        return value;
	    };

	    /**
	     * @method toString
	     * @return {String}
	     */
	    onceFn.toString = function () {
	        return fn.toString();
	    };
	    return onceFn;
	}

	/**
	 * @method functionId
	 * @param {Function} fn
	 * @return {String}
	 */
	function functionId(fn) {
	    return fn.name ? fn.name : fn.toString();
	}

/***/ }
/******/ ]);