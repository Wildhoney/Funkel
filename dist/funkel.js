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
/***/ function(module, exports, __webpack_require__) {

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

	var _es6Map = __webpack_require__(1);

	var _es6Map2 = _interopRequireDefault(_es6Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	    var cache = new _es6Map2.default();
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(2)() ? Map : __webpack_require__(3);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var map, iterator, result;
		if (typeof Map !== 'function') return false;
		try {
			// WebKit doesn't support arguments and crashes
			map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
		} catch (e) {
			return false;
		}
		if (String(map) !== '[object Map]') return false;
		if (map.size !== 3) return false;
		if (typeof map.clear !== 'function') return false;
		if (typeof map.delete !== 'function') return false;
		if (typeof map.entries !== 'function') return false;
		if (typeof map.forEach !== 'function') return false;
		if (typeof map.get !== 'function') return false;
		if (typeof map.has !== 'function') return false;
		if (typeof map.keys !== 'function') return false;
		if (typeof map.set !== 'function') return false;
		if (typeof map.values !== 'function') return false;

		iterator = map.entries();
		result = iterator.next();
		if (result.done !== false) return false;
		if (!result.value) return false;
		if (result.value[0] !== 'raz') return false;
		if (result.value[1] !== 'one') return false;

		return true;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear = __webpack_require__(4),
	    eIndexOf = __webpack_require__(6),
	    setPrototypeOf = __webpack_require__(12),
	    callable = __webpack_require__(17),
	    validValue = __webpack_require__(5),
	    d = __webpack_require__(18),
	    ee = __webpack_require__(30),
	    Symbol = __webpack_require__(31),
	    iterator = __webpack_require__(36),
	    forOf = __webpack_require__(40),
	    Iterator = __webpack_require__(50),
	    isNative = __webpack_require__(53),
	    call = Function.prototype.call,
	    defineProperties = Object.defineProperties,
	    getPrototypeOf = Object.getPrototypeOf,
	    MapPoly;

	module.exports = MapPoly = function () /*iterable*/{
		var iterable = arguments[0],
		    keys,
		    values,
		    self;
		if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
		if (isNative && setPrototypeOf && Map !== MapPoly) {
			self = setPrototypeOf(new Map(), getPrototypeOf(this));
		} else {
			self = this;
		}
		if (iterable != null) iterator(iterable);
		defineProperties(self, {
			__mapKeysData__: d('c', keys = []),
			__mapValuesData__: d('c', values = [])
		});
		if (!iterable) return self;
		forOf(iterable, function (value) {
			var key = validValue(value)[0];
			value = value[1];
			if (eIndexOf.call(keys, key) !== -1) return;
			keys.push(key);
			values.push(value);
		}, self);
		return self;
	};

	if (isNative) {
		if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
		MapPoly.prototype = Object.create(Map.prototype, {
			constructor: d(MapPoly)
		});
	}

	ee(defineProperties(MapPoly.prototype, {
		clear: d(function () {
			if (!this.__mapKeysData__.length) return;
			clear.call(this.__mapKeysData__);
			clear.call(this.__mapValuesData__);
			this.emit('_clear');
		}),
		delete: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return false;
			this.__mapKeysData__.splice(index, 1);
			this.__mapValuesData__.splice(index, 1);
			this.emit('_delete', index, key);
			return true;
		}),
		entries: d(function () {
			return new Iterator(this, 'key+value');
		}),
		forEach: d(function (cb /*, thisArg*/) {
			var thisArg = arguments[1],
			    iterator,
			    result;
			callable(cb);
			iterator = this.entries();
			result = iterator._next();
			while (result !== undefined) {
				call.call(cb, thisArg, this.__mapValuesData__[result], this.__mapKeysData__[result], this);
				result = iterator._next();
			}
		}),
		get: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return;
			return this.__mapValuesData__[index];
		}),
		has: d(function (key) {
			return eIndexOf.call(this.__mapKeysData__, key) !== -1;
		}),
		keys: d(function () {
			return new Iterator(this, 'key');
		}),
		set: d(function (key, value) {
			var index = eIndexOf.call(this.__mapKeysData__, key),
			    emit;
			if (index === -1) {
				index = this.__mapKeysData__.push(key) - 1;
				emit = true;
			}
			this.__mapValuesData__[index] = value;
			if (emit) this.emit('_add', index, key);
			return this;
		}),
		size: d.gs(function () {
			return this.__mapKeysData__.length;
		}),
		values: d(function () {
			return new Iterator(this, 'value');
		}),
		toString: d(function () {
			return '[object Map]';
		})
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
		return this.entries();
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// Inspired by Google Closure:
	// http://closure-library.googlecode.com/svn/docs/
	// closure_goog_array_array.js.html#goog.array.clear

	'use strict';

	var value = __webpack_require__(5);

	module.exports = function () {
		value(this).length = 0;
		return this;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toPosInt = __webpack_require__(7),
	    value = __webpack_require__(5),
	    indexOf = Array.prototype.indexOf,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    abs = Math.abs,
	    floor = Math.floor;

	module.exports = function (searchElement /*, fromIndex*/) {
		var i, l, fromIndex, val;
		if (searchElement === searchElement) {
			//jslint: ignore
			return indexOf.apply(this, arguments);
		}

		l = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;else if (fromIndex >= 0) fromIndex = floor(fromIndex);else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

		for (i = fromIndex; i < l; ++i) {
			if (hasOwnProperty.call(this, i)) {
				val = this[i];
				if (val !== val) return i; //jslint: ignore
			}
		}
		return -1;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(8),
	    max = Math.max;

	module.exports = function (value) {
	  return max(0, toInteger(value));
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sign = __webpack_require__(9),
	    abs = Math.abs,
	    floor = Math.floor;

	module.exports = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if (value === 0 || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(10)() ? Math.sign : __webpack_require__(11);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var sign = Math.sign;
		if (typeof sign !== 'function') return false;
		return sign(10) === 1 && sign(-20) === -1;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		value = Number(value);
		if (isNaN(value) || value === 0) return value;
		return value > 0 ? 1 : -1;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13)() ? Object.setPrototypeOf : __webpack_require__(14);

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var create = Object.create,
	    getPrototypeOf = Object.getPrototypeOf,
	    x = {};

	module.exports = function () /*customCreate*/{
		var setPrototypeOf = Object.setPrototypeOf,
		    customCreate = arguments[0] || create;
		if (typeof setPrototypeOf !== 'function') return false;
		return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Big thanks to @WebReflection for sorting this out
	// https://gist.github.com/WebReflection/5593554

	'use strict';

	var isObject = __webpack_require__(15),
	    value = __webpack_require__(5),
	    isPrototypeOf = Object.prototype.isPrototypeOf,
	    defineProperty = Object.defineProperty,
	    nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined },
	    validate;

	validate = function (obj, prototype) {
		value(obj);
		if (prototype === null || isObject(prototype)) return obj;
		throw new TypeError('Prototype must be null or an object');
	};

	module.exports = (function (status) {
		var fn, set;
		if (!status) return null;
		if (status.level === 2) {
			if (status.set) {
				set = status.set;
				fn = function (obj, prototype) {
					set.call(validate(obj, prototype), prototype);
					return obj;
				};
			} else {
				fn = function (obj, prototype) {
					validate(obj, prototype).__proto__ = prototype;
					return obj;
				};
			}
		} else {
			fn = function self(obj, prototype) {
				var isNullBase;
				validate(obj, prototype);
				isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
				if (isNullBase) delete self.nullPolyfill.__proto__;
				if (prototype === null) prototype = self.nullPolyfill;
				obj.__proto__ = prototype;
				if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
				return obj;
			};
		}
		return Object.defineProperty(fn, 'level', { configurable: false,
			enumerable: false, writable: false, value: status.level });
	})((function () {
		var x = Object.create(null),
		    y = {},
		    set,
		    desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(x, y);
			} catch (ignore) {}
			if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
		}

		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 2 };

		x = {};
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 1 };

		return false;
	})());

	__webpack_require__(16);

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var map = { function: true, object: true };

	module.exports = function (x) {
		return x != null && map[typeof x === 'undefined' ? 'undefined' : _typeof(x)] || false;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

	'use strict';

	var create = Object.create,
	    shim;

	if (!__webpack_require__(13)()) {
		shim = __webpack_require__(14);
	}

	module.exports = (function () {
		var nullObject, props, desc;
		if (!shim) return create;
		if (shim.level !== 1) return create;

		nullObject = {};
		props = {};
		desc = { configurable: false, enumerable: false, writable: true,
			value: undefined };
		Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
			if (name === '__proto__') {
				props[name] = { configurable: true, enumerable: false, writable: true,
					value: undefined };
				return;
			}
			props[name] = desc;
		});
		Object.defineProperties(nullObject, props);

		Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
			enumerable: false, writable: false, value: nullObject });

		return function (prototype, props) {
			return create(prototype === null ? nullObject : prototype, props);
		};
	})();

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(19),
	    normalizeOpts = __webpack_require__(25),
	    isCallable = __webpack_require__(26),
	    contains = __webpack_require__(27),
	    d;

	d = module.exports = function (dscr, value /*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== 'string') {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set /*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(20)() ? Object.assign : __webpack_require__(21);

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign,
		    obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return obj.foo + obj.bar + obj.trzy === 'razdwatrzy';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(22),
	    value = __webpack_require__(5),
	    max = Math.max;

	module.exports = function (dest, src /*, …srcn*/) {
		var error,
		    i,
		    l = max(arguments.length, 2),
		    assign;
		dest = Object(value(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(23)() ? Object.keys : __webpack_require__(24);

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) {
			return false;
		}
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach,
	    create = Object.create;

	var process = function process(src, obj) {
		var key;
		for (key in src) {
			obj[key] = src[key];
		}
	};

	module.exports = function (options /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) {
	  return typeof obj === 'function';
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(28)() ? String.prototype.contains : __webpack_require__(29);

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return str.contains('dwa') === true && str.contains('foo') === false;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString /*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var d = __webpack_require__(18),
	    callable = __webpack_require__(17),
	    apply = Function.prototype.apply,
	    call = Function.prototype.call,
	    create = Object.create,
	    defineProperty = Object.defineProperty,
	    defineProperties = Object.defineProperties,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    descriptor = { configurable: true, enumerable: false, writable: true },
	    on,
	    once,
	    off,
	    emit,
	    methods,
	    descriptors,
	    base;

	on = function (type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
			for (i = 0; candidate = listeners[i]; ++i) {
				if (candidate === listener || candidate.__eeOnceListener__ === listener) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
				}
			}
		} else {
			if (listeners === listener || listeners.__eeOnceListener__ === listener) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}listeners = listeners.slice();
			for (i = 0; listener = listeners[i]; ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
				case 1:
					call.call(listeners, this);
					break;
				case 2:
					call.call(listeners, this, arguments[1]);
					break;
				case 3:
					call.call(listeners, this, arguments[1], arguments[2]);
					break;
				default:
					l = arguments.length;
					args = new Array(l - 1);
					for (i = 1; i < l; ++i) {
						args[i - 1] = arguments[i];
					}
					apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return o == null ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(32)() ? Symbol : __webpack_require__(33);

/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try {
			String(symbol);
		} catch (e) {
			return false;
		}
		if (_typeof(Symbol.iterator) === 'symbol') return true;

		// Return 'true' for polyfills
		if (_typeof(Symbol.isConcatSpreadable) !== 'object') return false;
		if (_typeof(Symbol.iterator) !== 'object') return false;
		if (_typeof(Symbol.toPrimitive) !== 'object') return false;
		if (_typeof(Symbol.toStringTag) !== 'object') return false;
		if (_typeof(Symbol.unscopables) !== 'object') return false;

		return true;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not support it (or partially support it_

	'use strict';

	var d = __webpack_require__(18),
	    validateSymbol = __webpack_require__(34),
	    create = Object.create,
	    defineProperties = Object.defineProperties,
	    defineProperty = Object.defineProperty,
	    objPrototype = Object.prototype,
	    NativeSymbol,
	    SymbolPolyfill,
	    HiddenSymbol,
	    globalSymbols = create(null);

	if (typeof Symbol === 'function') NativeSymbol = Symbol;

	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0,
			    name,
			    ie11BugWorkaround;
			while (created[desc + (postfix || '')]) {
				++postfix;
			}desc += postfix || '';
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	})();

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		symbol = create(HiddenSymbol.prototype);
		description = description === undefined ? '' : String(description);
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return globalSymbols[key] = SymbolPolyfill(String(key));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) {
				if (globalSymbols[key] === s) return key;
			}
		}),

		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', NativeSymbol && NativeSymbol.iterator || SymbolPolyfill('iterator')),
		match: d('', NativeSymbol && NativeSymbol.match || SymbolPolyfill('match')),
		replace: d('', NativeSymbol && NativeSymbol.replace || SymbolPolyfill('replace')),
		search: d('', NativeSymbol && NativeSymbol.search || SymbolPolyfill('search')),
		species: d('', NativeSymbol && NativeSymbol.species || SymbolPolyfill('species')),
		split: d('', NativeSymbol && NativeSymbol.split || SymbolPolyfill('split')),
		toPrimitive: d('', NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill('toStringTag')),
		unscopables: d('', NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () {
			return this.__name__;
		})
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () {
			return 'Symbol (' + validateSymbol(this).__description__ + ')';
		}),
		valueOf: d(function () {
			return validateSymbol(this);
		})
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		return validateSymbol(this);
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(35);

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	module.exports = function (x) {
		return x && ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'symbol' || x['@@toStringTag'] === 'Symbol') || false;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isIterable = __webpack_require__(37);

	module.exports = function (value) {
		if (!isIterable(value)) throw new TypeError(value + " is not iterable");
		return value;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(38),
	    isString = __webpack_require__(39),
	    iteratorSymbol = __webpack_require__(31).iterator,
	    isArray = Array.isArray;

	module.exports = function (value) {
		if (value == null) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return typeof value[iteratorSymbol] === 'function';
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString,
	    id = toString.call((function () {
	  return arguments;
	})());

	module.exports = function (x) {
	  return toString.call(x) === id;
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var toString = Object.prototype.toString,
	    id = toString.call('');

	module.exports = function (x) {
			return typeof x === 'string' || x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && (x instanceof String || toString.call(x) === id) || false;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(38),
	    callable = __webpack_require__(17),
	    isString = __webpack_require__(39),
	    get = __webpack_require__(41),
	    isArray = Array.isArray,
	    call = Function.prototype.call,
	    some = Array.prototype.some;

	module.exports = function (iterable, cb /*, thisArg*/) {
		var mode,
		    thisArg = arguments[2],
		    result,
		    doBreak,
		    broken,
		    i,
		    l,
		    char,
		    code;
		if (isArray(iterable) || isArguments(iterable)) mode = 'array';else if (isString(iterable)) mode = 'string';else iterable = get(iterable);

		callable(cb);
		doBreak = function () {
			broken = true;
		};
		if (mode === 'array') {
			some.call(iterable, function (value) {
				call.call(cb, thisArg, value, doBreak);
				if (broken) return true;
			});
			return;
		}
		if (mode === 'string') {
			l = iterable.length;
			for (i = 0; i < l; ++i) {
				char = iterable[i];
				if (i + 1 < l) {
					code = char.charCodeAt(0);
					if (code >= 0xD800 && code <= 0xDBFF) char += iterable[++i];
				}
				call.call(cb, thisArg, char, doBreak);
				if (broken) break;
			}
			return;
		}
		result = iterable.next();

		while (!result.done) {
			call.call(cb, thisArg, result.value, doBreak);
			if (broken) return;
			result = iterable.next();
		}
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(38),
	    isString = __webpack_require__(39),
	    ArrayIterator = __webpack_require__(42),
	    StringIterator = __webpack_require__(49),
	    iterable = __webpack_require__(36),
	    iteratorSymbol = __webpack_require__(31).iterator;

	module.exports = function (obj) {
	  if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	  if (isArguments(obj)) return new ArrayIterator(obj);
	  if (isString(obj)) return new StringIterator(obj);
	  return new ArrayIterator(obj);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf = __webpack_require__(12),
	    contains = __webpack_require__(27),
	    d = __webpack_require__(18),
	    Iterator = __webpack_require__(43),
	    defineProperty = Object.defineProperty,
	    ArrayIterator;

	ArrayIterator = module.exports = function (arr, kind) {
		if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
		Iterator.call(this, arr);
		if (!kind) kind = 'value';else if (contains.call(kind, 'key+value')) kind = 'key+value';else if (contains.call(kind, 'key')) kind = 'key';else kind = 'value';
		defineProperty(this, '__kind__', d('', kind));
	};
	if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(ArrayIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__list__[i];
			if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
			return i;
		}),
		toString: d(function () {
			return '[object Array Iterator]';
		})
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear = __webpack_require__(4),
	    assign = __webpack_require__(19),
	    callable = __webpack_require__(17),
	    value = __webpack_require__(5),
	    d = __webpack_require__(18),
	    autoBind = __webpack_require__(44),
	    Symbol = __webpack_require__(31),
	    defineProperty = Object.defineProperty,
	    defineProperties = Object.defineProperties,
	    Iterator;

	module.exports = Iterator = function (list, context) {
		if (!(this instanceof Iterator)) return new Iterator(list, context);
		defineProperties(this, {
			__list__: d('w', value(list)),
			__context__: d('w', context),
			__nextIndex__: d('w', 0)
		});
		if (!context) return;
		callable(context.on);
		context.on('_add', this._onAdd);
		context.on('_delete', this._onDelete);
		context.on('_clear', this._onClear);
	};

	defineProperties(Iterator.prototype, assign({
		constructor: d(Iterator),
		_next: d(function () {
			var i;
			if (!this.__list__) return;
			if (this.__redo__) {
				i = this.__redo__.shift();
				if (i !== undefined) return i;
			}
			if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
			this._unBind();
		}),
		next: d(function () {
			return this._createResult(this._next());
		}),
		_createResult: d(function (i) {
			if (i === undefined) return { done: true, value: undefined };
			return { done: false, value: this._resolve(i) };
		}),
		_resolve: d(function (i) {
			return this.__list__[i];
		}),
		_unBind: d(function () {
			this.__list__ = null;
			delete this.__redo__;
			if (!this.__context__) return;
			this.__context__.off('_add', this._onAdd);
			this.__context__.off('_delete', this._onDelete);
			this.__context__.off('_clear', this._onClear);
			this.__context__ = null;
		}),
		toString: d(function () {
			return '[object Iterator]';
		})
	}, autoBind({
		_onAdd: d(function (index) {
			if (index >= this.__nextIndex__) return;
			++this.__nextIndex__;
			if (!this.__redo__) {
				defineProperty(this, '__redo__', d('c', [index]));
				return;
			}
			this.__redo__.forEach(function (redo, i) {
				if (redo >= index) this.__redo__[i] = ++redo;
			}, this);
			this.__redo__.push(index);
		}),
		_onDelete: d(function (index) {
			var i;
			if (index >= this.__nextIndex__) return;
			--this.__nextIndex__;
			if (!this.__redo__) return;
			i = this.__redo__.indexOf(index);
			if (i !== -1) this.__redo__.splice(i, 1);
			this.__redo__.forEach(function (redo, i) {
				if (redo > index) this.__redo__[i] = --redo;
			}, this);
		}),
		_onClear: d(function () {
			if (this.__redo__) clear.call(this.__redo__);
			this.__nextIndex__ = 0;
		})
	})));

	defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
		return this;
	}));
	defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copy = __webpack_require__(45),
	    map = __webpack_require__(46),
	    callable = __webpack_require__(17),
	    validValue = __webpack_require__(5),
	    bind = Function.prototype.bind,
	    defineProperty = Object.defineProperty,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    define;

	define = function (name, desc, bindTo) {
		var value = validValue(desc) && callable(desc.value),
		    dgs;
		dgs = copy(desc);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			if (hasOwnProperty.call(this, name)) return value;
			desc.value = bind.call(value, bindTo == null ? this : this[bindTo]);
			defineProperty(this, name, desc);
			return this[name];
		};
		return dgs;
	};

	module.exports = function (props /*, bindTo*/) {
		var bindTo = arguments[1];
		return map(props, function (desc, name) {
			return define(name, desc, bindTo);
		});
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(19),
	    value = __webpack_require__(5);

	module.exports = function (obj) {
		var copy = Object(value(obj));
		if (copy !== obj) return copy;
		return assign({}, obj);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var callable = __webpack_require__(17),
	    forEach = __webpack_require__(47),
	    call = Function.prototype.call;

	module.exports = function (obj, cb /*, thisArg*/) {
		var o = {},
		    thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, obj, index) {
			o[key] = call.call(cb, thisArg, value, key, obj, index);
		});
		return o;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(48)('forEach');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order

	'use strict';

	var callable = __webpack_require__(17),
	    value = __webpack_require__(5),
	    bind = Function.prototype.bind,
	    call = Function.prototype.call,
	    keys = Object.keys,
	    propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	module.exports = function (method, defVal) {
		return function (obj, cb /*, thisArg, compareFn*/) {
			var list,
			    thisArg = arguments[2],
			    compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);

			list = keys(obj);
			if (compareFn) {
				list.sort(typeof compareFn === 'function' ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== 'function') method = list[method];
			return call.call(method, list, function (key, index) {
				if (!propertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// Thanks @mathiasbynens
	// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

	'use strict';

	var setPrototypeOf = __webpack_require__(12),
	    d = __webpack_require__(18),
	    Iterator = __webpack_require__(43),
	    defineProperty = Object.defineProperty,
	    StringIterator;

	StringIterator = module.exports = function (str) {
		if (!(this instanceof StringIterator)) return new StringIterator(str);
		str = String(str);
		Iterator.call(this, str);
		defineProperty(this, '__length__', d('', str.length));
	};
	if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

	StringIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(StringIterator),
		_next: d(function () {
			if (!this.__list__) return;
			if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
			this._unBind();
		}),
		_resolve: d(function (i) {
			var char = this.__list__[i],
			    code;
			if (this.__nextIndex__ === this.__length__) return char;
			code = char.charCodeAt(0);
			if (code >= 0xD800 && code <= 0xDBFF) return char + this.__list__[this.__nextIndex__++];
			return char;
		}),
		toString: d(function () {
			return '[object String Iterator]';
		})
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf = __webpack_require__(12),
	    d = __webpack_require__(18),
	    Iterator = __webpack_require__(43),
	    toStringTagSymbol = __webpack_require__(31).toStringTag,
	    kinds = __webpack_require__(51),
	    defineProperties = Object.defineProperties,
	    unBind = Iterator.prototype._unBind,
	    MapIterator;

	MapIterator = module.exports = function (map, kind) {
		if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
		Iterator.call(this, map.__mapKeysData__, map);
		if (!kind || !kinds[kind]) kind = 'key+value';
		defineProperties(this, {
			__kind__: d('', kind),
			__values__: d('w', map.__mapValuesData__)
		});
	};
	if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

	MapIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(MapIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__values__[i];
			if (this.__kind__ === 'key') return this.__list__[i];
			return [this.__list__[i], this.__values__[i]];
		}),
		_unBind: d(function () {
			this.__values__ = null;
			unBind.call(this);
		}),
		toString: d(function () {
			return '[object Map Iterator]';
		})
	});
	Object.defineProperty(MapIterator.prototype, toStringTagSymbol, d('c', 'Map Iterator'));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(52)('key', 'value', 'key+value');

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach,
	    create = Object.create;

	module.exports = function (arg /*, …args*/) {
		var set = create(null);
		forEach.call(arguments, function (name) {
			set[name] = true;
		});
		return set;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	// Exports true if environment provides native `Map` implementation,
	// whatever that is.

	'use strict';

	module.exports = (function () {
		if (typeof Map === 'undefined') return false;
		return Object.prototype.toString.call(new Map()) === '[object Map]';
	})();

/***/ }
/******/ ]);