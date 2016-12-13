(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var _isPlaceholder$1 = function _isPlaceholder$1(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};

var _isPlaceholder = _isPlaceholder$1;


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry1$1 = function _curry1$1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

var _arity$1 = function _arity$1(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};

var _curry1$4 = _curry1$1;
var _isPlaceholder$3 = _isPlaceholder$1;


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry2$1 = function _curry2$1(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder$3(a) ? f2
             : _curry1$4(function(_b) { return fn(a, _b); });
      default:
        return _isPlaceholder$3(a) && _isPlaceholder$3(b) ? f2
             : _isPlaceholder$3(a) ? _curry1$4(function(_a) { return fn(_a, b); })
             : _isPlaceholder$3(b) ? _curry1$4(function(_b) { return fn(a, _b); })
             : fn(a, b);
    }
  };
};

var _arity$3 = _arity$1;
var _isPlaceholder$4 = _isPlaceholder$1;


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curryN$1 = function _curryN$1(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder$4(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder$4(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _arity$3(left, _curryN$1(length, combined, fn));
  };
};

var _arity = _arity$1;
var _curry1$3 = _curry1$1;
var _curry2 = _curry2$1;
var _curryN = _curryN$1;


/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curryN$1 = _curry2(function curryN$1(length, fn) {
  if (length === 1) {
    return _curry1$3(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});

var _curry1 = _curry1$1;
var curryN = curryN$1;


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
 * following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
var curry$1 = _curry1(function curry$1(fn) {
  return curryN(fn.length, fn);
});

/**
  type Validation
    = Success a
    | Failure b
 */

const types = {
  Just: Math.random(),
  Nothing: Math.random()
}; /* eslint-disable new-cap */


function Maybe$1(value, type) {
  // Check that a valid type is being used
  const isJust = value !== null && value !== undefined && type === types.Just;
  this.isJust = isJust;
  this.isNothing = !isJust;
  this.withDefault = defaultVal => isJust ? value : defaultVal;
  this.map = f => isJust ? Maybe$1.of(f(value)) : Maybe$1.Nothing();
  this.chain = f => this.map(f).withDefault(Maybe$1.Nothing());
}

// Static functions
Maybe$1.Just = v => new Maybe$1(v, types.Just);
Maybe$1.Nothing = _ => new Maybe$1(null, types.Nothing);
Maybe$1.of = Maybe$1.Just; // the function itself will take care of nulls and undefineds

Maybe$1.isJust = v => v.isJust;
Maybe$1.isNothing = v => v.isNothing;
Maybe$1.withDefault = curry$1((defaultVal, v) => v.withDefault(defaultVal));
Maybe$1.map = curry$1((f, v) => v.map(f));
Maybe$1.map2 = curry$1((f, v1, v2) => Maybe$1.isJust(v1) && Maybe$1.isJust(v2) ? Maybe$1.of(f(Maybe$1.withDefault(null, v1), Maybe$1.withDefault(null, v2))) : Maybe$1.Nothing());
Maybe$1.chain = curry$1((v, f) => v.chain(f));

const types$1 = {
  NotAsked: Math.random(),
  Loading: Math.random(),
  Failure: Math.random(),
  Success: Math.random()
};

const mapIf = curry$1((condition, value, f) => condition ? f(value) : value);

// =========================================
// INSTANCE FUNCTIONS
// =========================================
function RemoteData$1(value, type) {
  const isSuccess = type === types$1.Success;
  const isFailure = type === types$1.Failure;
  const isLoading = type === types$1.Loading;
  if (isFailure) {
    console.log('Failing with reason:', value);
  }

  this.isSuccess = isSuccess;
  this.isFailure = isFailure;
  this.isLoading = isLoading;
  this.isNotAsked = type === types$1.NotAsked;
  this.withDefault = elseVal => isSuccess ? value : elseVal;
  this.map = f => new RemoteData$1(mapIf(isSuccess, value, f), type);
  this.mapSuccess = f => new RemoteData$1(mapIf(isSuccess, value, f), type);
  this.mapLoading = f => new RemoteData$1(mapIf(isLoading, value, f), type);
  this.mapFailure = f => new RemoteData$1(mapIf(isFailure, value, f), type);
  this.toMaybe = _ => isSuccess ? Maybe$1.Just(value) : Maybe$1.Nothing(); // eslint-disable-line max-len, new-cap
  this._value = value; // JUST FOR DEBUGGING PURPOSES. DO NOT USE
}

// =========================================
// STATIC FUNCTIONS
// =========================================
RemoteData$1.NotAsked = _ => new RemoteData$1(null, types$1.NotAsked);
RemoteData$1.Loading = v => new RemoteData$1(v, types$1.Loading);
RemoteData$1.Failure = v => new RemoteData$1(v, types$1.Failure);
RemoteData$1.Success = v => new RemoteData$1(v, types$1.Success);

RemoteData$1.isNotAsked = v => v.isNotAsked;
RemoteData$1.isLoading = v => v.isLoading;
RemoteData$1.isFailure = v => v.isFailure;
RemoteData$1.isSuccess = v => v.isSuccess;
RemoteData$1.withDefault = curry$1((elseVal, v) => v.withDefault(elseVal));
RemoteData$1.map = curry$1((f, v) => v.map(f));
RemoteData$1.mapSuccess = curry$1((f, v) => v.mapSuccess(f));
RemoteData$1.mapLoading = curry$1((f, v) => v.mapLoading(f));
RemoteData$1.mapFailure = curry$1((f, v) => v.mapFailure(f));
RemoteData$1.toMaybe = v => v.toMaybe();

// Bug checking function that will throw an error whenever
// the condition sent to it is evaluated to false
/**
 * Processes the message and outputs the correct message if the condition
 * is false. Otherwise it outputs null.
 * @api private
 * @method processCondition
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return {String | null}  - Error message if there is an error, nul otherwise.
 */
function processCondition(condition, errorMessage) {
  if (!condition) {
    var completeErrorMessage = '';
    var re = /at ([^\s]+)\s\(/g;
    var stackTrace = new Error().stack;
    var stackFunctions = [];

    var funcName = re.exec(stackTrace);
    while (funcName && funcName[1]) {
      stackFunctions.push(funcName[1]);
      funcName = re.exec(stackTrace);
    }

    // Number 0 is processCondition itself,
    // Number 1 is assert,
    // Number 2 is the caller function.
    if (stackFunctions[2]) {
      completeErrorMessage = stackFunctions[2] + ': ' + completeErrorMessage;
    }

    completeErrorMessage += errorMessage;
    return completeErrorMessage;
  }

  return null;
}

/**
 * Throws an error if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert(myDate !== undefined, "Date cannot be undefined.");
 * @api public
 * @method assert
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
function assert(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    throw new Error(error);
  }
}

/**
 * Logs a warning if the boolean passed to it evaluates to false.
 * To be used like this:
 * 		assert.warn(myDate !== undefined, "No date provided.");
 * @api public
 * @method warn
 * @param  {Boolean} condition - Result of the evaluated condition
 * @param  {String} errorMessage - Message explainig the error in case it is thrown
 * @return void
 */
assert.warn = function warn(condition, errorMessage) {
  var error = processCondition(condition, errorMessage);
  if (typeof error === 'string') {
    console.warn(error);
  }
};

/**
  type Validation
    = Success a
    | Failure b
 */

const types$2 = {
  Success: Math.random(),
  Failure: Math.random()
};

const mapIf$1 = curry$1((condition, value, f) => condition ? f(value) : value);

// This function should never be called by anyone other than this file.
function Validation$1(value, type) {
  // Check that a valid type is being used
  const isSuccess = type === types$2.Success;

  this.isSuccess = isSuccess;
  this.isFailure = !isSuccess;
  this.withDefault = defaultVal => isSuccess ? value : defaultVal;
  this.map = f => new Validation$1(mapIf$1(isSuccess, value, f), type);
  this.mapSuccess = f => new Validation$1(mapIf$1(isSuccess, value, f), type);
  this.mapFailure = f => new Validation$1(mapIf$1(!isSuccess, value, f), type);
  this.throwFailure = _ => !isSuccess ? assert(false, value) : this;
  this.andThen = f => {
    if (!isSuccess) {
      return this;
    }

    const val = f(value);
    assert(val instanceof Validation$1, 'Value returned by Validation.andThen is not of type Validation');
    return val;
  };
  // Validation -> Validation
  this.chain = v => {
    if (!isSuccess) {
      return this;
    }

    assert(v instanceof Validation$1, 'Value passed to Validation.chain is not of type Validation');

    return v;
  };
  // JUST FOR DEBUGGING PURPOSES. DO NOT USE
  this._value = value; // eslint-disable-line no-underscore-dangle
}

// Static functions
Validation$1.Success = v => new Validation$1(v, types$2.Success);
Validation$1.Failure = v => new Validation$1(v, types$2.Failure);

Validation$1.isSuccess = v => v.isSuccess;
Validation$1.isFailure = v => v.isFailure;
Validation$1.withDefault = curry$1((defaultVal, v) => v.withDefault(defaultVal));
Validation$1.map = curry$1((f, v) => v.map(f));
Validation$1.mapSuccess = curry$1((f, v) => v.mapSuccess(f));
Validation$1.mapFailure = curry$1((f, v) => v.mapFailure(f));
Validation$1.throwFailure = v => v.throwFailure();
Validation$1.andThen = curry$1((f, v) => v.andThen(f));
Validation$1.chain = curry$1((v1, v2) => v1.chain(v2));

var _curry1$5 = _curry1$1;


/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */
var isNil = _curry1$5(function isNil(x) { return x == null; });

var _pipe$1 = function _pipe$1(f, g) {
  return function() {
    return g.call(this, f.apply(this, arguments));
  };
};

var _curry1$6 = _curry1$1;
var _curry2$3 = _curry2$1;
var _isPlaceholder$5 = _isPlaceholder$1;


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
var _curry3$1 = function _curry3$1(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder$5(a) ? f3
             : _curry2$3(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return _isPlaceholder$5(a) && _isPlaceholder$5(b) ? f3
             : _isPlaceholder$5(a) ? _curry2$3(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder$5(b) ? _curry2$3(function(_b, _c) { return fn(a, _b, _c); })
             : _curry1$6(function(_c) { return fn(a, b, _c); });
      default:
        return _isPlaceholder$5(a) && _isPlaceholder$5(b) && _isPlaceholder$5(c) ? f3
             : _isPlaceholder$5(a) && _isPlaceholder$5(b) ? _curry2$3(function(_a, _b) { return fn(_a, _b, c); })
             : _isPlaceholder$5(a) && _isPlaceholder$5(c) ? _curry2$3(function(_a, _c) { return fn(_a, b, _c); })
             : _isPlaceholder$5(b) && _isPlaceholder$5(c) ? _curry2$3(function(_b, _c) { return fn(a, _b, _c); })
             : _isPlaceholder$5(a) ? _curry1$6(function(_a) { return fn(_a, b, c); })
             : _isPlaceholder$5(b) ? _curry1$6(function(_b) { return fn(a, _b, c); })
             : _isPlaceholder$5(c) ? _curry1$6(function(_c) { return fn(a, b, _c); })
             : fn(a, b, c);
    }
  };
};

var _xwrap$1 = (function() {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function() {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
  XWrap.prototype['@@transducer/step'] = function(acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap$1(fn) { return new XWrap(fn); };
}());

var _arity$5 = _arity$1;
var _curry2$4 = _curry2$1;


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 */
var bind$1 = _curry2$4(function bind$1(fn, thisObj) {
  return _arity$5(fn.length, function() {
    return fn.apply(thisObj, arguments);
  });
});

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray$1 = Array.isArray || function _isArray$1(val) {
  return (val != null &&
          val.length >= 0 &&
          Object.prototype.toString.call(val) === '[object Array]');
};

var _isString$1 = function _isString$1(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};

var _curry1$7 = _curry1$1;
var _isArray = _isArray$1;
var _isString = _isString$1;


/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
var isArrayLike$1 = _curry1$7(function isArrayLike$1(x) {
  if (_isArray(x)) { return true; }
  if (!x) { return false; }
  if (typeof x !== 'object') { return false; }
  if (_isString(x)) { return false; }
  if (x.nodeType === 1) { return !!x.length; }
  if (x.length === 0) { return true; }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});

var _xwrap = _xwrap$1;
var bind = bind$1;
var isArrayLike = isArrayLike$1;


var _reduce$1 = (function() {
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      idx += 1;
    }
    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);
      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }
      step = iter.next();
    }
    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj) {
    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
  return function _reduce$1(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }
    if (isArrayLike(list)) {
      return _arrayReduce(fn, acc, list);
    }
    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list);
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }
    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }
    throw new TypeError('reduce: list must be array or iterable');
  };
}());

var _curry3 = _curry3$1;
var _reduce = _reduce$1;


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * `R.reduced` to shortcut the iteration.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex
 * @example
 *
 *      var numbers = [1, 2, 3];
 *      var plus = (a, b) => a + b;
 *
 *      R.reduce(plus, 10, numbers); //=> 16
 */
var reduce$1 = _curry3(_reduce);

/**
 * An optimized, private array `slice` implementation.
 *
 * @private
 * @param {Arguments|Array} args The array or arguments object to consider.
 * @param {Number} [from=0] The array index to slice from, inclusive.
 * @param {Number} [to=args.length] The array index to slice to, exclusive.
 * @return {Array} A new, sliced array.
 * @example
 *
 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
 *
 *      var firstThreeArgs = function(a, b, c, d) {
 *        return _slice(arguments, 0, 3);
 *      };
 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
 */
var _slice$1 = function _slice$1(args, from, to) {
  switch (arguments.length) {
    case 1: return _slice$1(args, 0, args.length);
    case 2: return _slice$1(args, from, args.length);
    default:
      var list = [];
      var idx = 0;
      var len = Math.max(0, Math.min(args.length, to) - from);
      while (idx < len) {
        list[idx] = args[from + idx];
        idx += 1;
      }
      return list;
  }
};

var _isArray$3 = _isArray$1;
var _slice = _slice$1;


/**
 * Similar to hasMethod, this checks whether a function has a [methodname]
 * function. If it isn't an array it will execute that function otherwise it
 * will default to the ramda implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
var _checkForMethod$1 = function _checkForMethod$1(methodname, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return (_isArray$3(obj) || typeof obj[methodname] !== 'function') ?
      fn.apply(this, arguments) :
      obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
  };
};

var _checkForMethod$3 = _checkForMethod$1;
var _curry3$3 = _curry3$1;


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
var slice$1 = _curry3$3(_checkForMethod$3('slice', function slice$1(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

var _checkForMethod = _checkForMethod$1;
var slice = slice$1;


/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */
var tail$1 = _checkForMethod('tail', slice(1, Infinity));

var _arity$4 = _arity$1;
var _pipe = _pipe$1;
var reduce = reduce$1;
var tail = tail$1;


/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 */
var pipe$1 = function pipe$1() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity$4(arguments[0].length,
                reduce(_pipe, arguments[0], tail(arguments)));
};

/* eslint-disable new-cap */
const errMsg = curry$1((prop, errorMessage) => `Invalid property value for ${ prop }. ${ errorMessage }`);

// All type checks return a Validation object.
// ===================================================================
//  General Type checkers
// ===================================================================





const string = v => typeof v === 'string' ? Validation$1.Success(v) : Validation$1.Failure(`${ v } is not a string`);

const bool = v => typeof v === 'boolean' ? Validation$1.Success(v) : Validation$1.Failure(`${ v } is not a boolean`);



const array = curry$1((subType, v) => {
  if (v instanceof Validation$1) {
    return Validation$1.andThen(array, v);
  }

  if (!Array.isArray(v)) {
    return Validation$1.Failure(`${ v } is not an array`);
  }

  const subTypesValidation = v.map(subType).reduce(Validation$1.chain, Validation$1.Success(v));

  if (Validation$1.isSuccess(subTypesValidation)) {
    return Validation$1.Success(v);
  }
  return Validation$1.mapFailure(errMsg('array'), subTypesValidation);
});

const date = v => v !== undefined && v instanceof Date ? Validation$1.Success(v) : Validation$1.Failure(`${ v } is not a Date`);

const nullable = curry$1((subType, v) => v === null ? Validation$1.Success(v) : subType(v));

const maybe = curry$1((subType, v) => typeof v === 'object' && Validation$1.isSuccess(bool(v.isNothing)) ? pipe$1(Maybe$1.map(subType), Maybe$1.map(Validation$1.map(_ => Validation$1.Success(v))), Maybe$1.withDefault(Validation$1.Success(v)))(v) : Validation$1.Failure(`${ v } is not of type Maybe`));







const haveSameKeys = (o1, o2) => {
  const k1 = Object.keys(o1);
  const k2 = Object.keys(o2);
  return k1.reduce((out, key) => out && k2.includes(key), true);
};

const object = curry$1((typeSignature, v) => {
  if (isNil(v)) {
    return Validation$1.Failure(`${ v } is not of type object.`);
  }
  if (!haveSameKeys(typeSignature, v)) {
    return Validation$1.Failure(`Object does not have same keys as its type signature:
      Keys present: ${ Object.keys(v) }
      Keys expected: ${ Object.keys(typeSignature) }
      ${ v }`);
  }

  return Object.keys(typeSignature).reduce((outcome, key) => Validation$1.chain(outcome, pipe$1(typeSignature[key], Validation$1.mapFailure(errMsg(key)), Validation$1.mapSuccess(_ => v))(v[key])), Validation$1.Success(v));
});

var _has$1 = function _has$1(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

var _curry3$4 = _curry3$1;
var _has = _has$1;


/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */
var propOr$1 = _curry3$4(function propOr$1(val, p, obj) {
  return (obj != null && _has(p, obj)) ? obj[p] : val;
});

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var seamlessImmutable = createCommonjsModule(function (module, exports) {
(function() {
  "use strict";

  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L21
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element');
  var REACT_ELEMENT_TYPE_FALLBACK = 0xeac7;

  function addPropertyTo(target, methodName, value) {
    Object.defineProperty(target, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });
  }

  function banProperty(target, methodName) {
    addPropertyTo(target, methodName, function() {
      throw new ImmutableError("The " + methodName +
        " method cannot be invoked on an Immutable data structure.");
    });
  }

  var immutabilityTag = "__immutable_invariants_hold";

  function addImmutabilityTag(target) {
    addPropertyTo(target, immutabilityTag, true);
  }

  function isImmutable(target) {
    if (typeof target === "object") {
      return target === null || Boolean(
        Object.getOwnPropertyDescriptor(target, immutabilityTag)
      );
    } else {
      // In JavaScript, only objects are even potentially mutable.
      // strings, numbers, null, and undefined are all naturally immutable.
      return true;
    }
  }

  function isEqual(a, b) {
    // Avoid false positives due to (NaN !== NaN) evaluating to true
    return (a === b || (a !== a && b !== b));
  }

  function isMergableObject(target) {
    return target !== null && typeof target === "object" && !(Array.isArray(target)) && !(target instanceof Date);
  }

  var mutatingObjectMethods = [
    "setPrototypeOf"
  ];

  var nonMutatingObjectMethods = [
    "keys"
  ];

  var mutatingArrayMethods = mutatingObjectMethods.concat([
    "push", "pop", "sort", "splice", "shift", "unshift", "reverse"
  ]);

  var nonMutatingArrayMethods = nonMutatingObjectMethods.concat([
    "map", "filter", "slice", "concat", "reduce", "reduceRight"
  ]);

  var mutatingDateMethods = mutatingObjectMethods.concat([
    "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds",
    "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes",
    "setUTCMonth", "setUTCSeconds", "setYear"
  ]);

  function ImmutableError(message) {
    var err       = new Error(message);
    // TODO: Consider `Object.setPrototypeOf(err, ImmutableError);`
    err.__proto__ = ImmutableError;

    return err;
  }
  ImmutableError.prototype = Error.prototype;

  function makeImmutable(obj, bannedMethods) {
    // Tag it so we can quickly tell it's immutable later.
    addImmutabilityTag(obj);

    {
      // Make all mutating methods throw exceptions.
      for (var index in bannedMethods) {
        if (bannedMethods.hasOwnProperty(index)) {
          banProperty(obj, bannedMethods[index]);
        }
      }

      // Freeze it and return it.
      Object.freeze(obj);
    }

    return obj;
  }

  function makeMethodReturnImmutable(obj, methodName) {
    var currentMethod = obj[methodName];

    addPropertyTo(obj, methodName, function() {
      return Immutable(currentMethod.apply(obj, arguments));
    });
  }

  function arraySet(idx, value, config) {
    var deep          = config && config.deep;

    if (idx in this) {
      if (deep && this[idx] !== value && isMergableObject(value) && isMergableObject(this[idx])) {
        value = this[idx].merge(value, {deep: true, mode: 'replace'});
      }
      if (isEqual(this[idx], value)) {
        return this;
      }
    }

    var mutable = asMutableArray.call(this);
    mutable[idx] = Immutable(value);
    return makeImmutableArray(mutable);
  }

  var immutableEmptyArray = Immutable([]);

  function arraySetIn(pth, value, config) {
    var head = pth[0];

    if (pth.length === 1) {
      return arraySet.call(this, head, value, config);
    } else {
      var tail = pth.slice(1);
      var thisHead = this[head];
      var newValue;

      if (typeof(thisHead) === "object" && thisHead !== null && typeof(thisHead.setIn) === "function") {
        // Might (validly) be object or array
        newValue = thisHead.setIn(tail, value);
      } else {
        var nextHead = tail[0];
        // If the next path part is a number, then we are setting into an array, else an object.
        if (nextHead !== '' && isFinite(nextHead)) {
          newValue = arraySetIn.call(immutableEmptyArray, tail, value);
        } else {
          newValue = objectSetIn.call(immutableEmptyObject, tail, value);
        }
      }

      if (head in this && thisHead === newValue) {
        return this;
      }

      var mutable = asMutableArray.call(this);
      mutable[head] = newValue;
      return makeImmutableArray(mutable);
    }
  }

  function makeImmutableArray(array) {
    // Don't change their implementations, but wrap these functions to make sure
    // they always return an immutable value.
    for (var index in nonMutatingArrayMethods) {
      if (nonMutatingArrayMethods.hasOwnProperty(index)) {
        var methodName = nonMutatingArrayMethods[index];
        makeMethodReturnImmutable(array, methodName);
      }
    }

    addPropertyTo(array, "flatMap",  flatMap);
    addPropertyTo(array, "asObject", asObject);
    addPropertyTo(array, "asMutable", asMutableArray);
    addPropertyTo(array, "set", arraySet);
    addPropertyTo(array, "setIn", arraySetIn);
    addPropertyTo(array, "update", update);
    addPropertyTo(array, "updateIn", updateIn);

    for(var i = 0, length = array.length; i < length; i++) {
      array[i] = Immutable(array[i]);
    }

    return makeImmutable(array, mutatingArrayMethods);
  }

  function makeImmutableDate(date) {
    addPropertyTo(date, "asMutable", asMutableDate);

    return makeImmutable(date, mutatingDateMethods);
  }

  function asMutableDate() {
    return new Date(this.getTime());
  }

  /**
   * Effectively performs a map() over the elements in the array, using the
   * provided iterator, except that whenever the iterator returns an array, that
   * array's elements are added to the final result instead of the array itself.
   *
   * @param {function} iterator - The iterator function that will be invoked on each element in the array. It will receive three arguments: the current value, the current index, and the current object.
   */
  function flatMap(iterator) {
    // Calling .flatMap() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    var result = [],
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var iteratorResult = iterator(this[index], index, this);

      if (Array.isArray(iteratorResult)) {
        // Concatenate Array results into the return value we're building up.
        result.push.apply(result, iteratorResult);
      } else {
        // Handle non-Array results the same way map() does.
        result.push(iteratorResult);
      }
    }

    return makeImmutableArray(result);
  }

  /**
   * Returns an Immutable copy of the object without the given keys included.
   *
   * @param {array} keysToRemove - A list of strings representing the keys to exclude in the return value. Instead of providing a single array, this method can also be called by passing multiple strings as separate arguments.
   */
  function without(remove) {
    // Calling .without() with no arguments is a no-op. Don't bother cloning.
    if (typeof remove === "undefined" && arguments.length === 0) {
      return this;
    }

    if (typeof remove !== "function") {
      // If we weren't given an array, use the arguments list.
      var keysToRemoveArray = (Array.isArray(remove)) ?
         remove.slice() : Array.prototype.slice.call(arguments);

      // Convert numeric keys to strings since that's how they'll
      // come from the enumeration of the object.
      keysToRemoveArray.forEach(function(el, idx, arr) {
        if(typeof(el) === "number") {
          arr[idx] = el.toString();
        }
      });

      remove = function(val, key) {
        return keysToRemoveArray.indexOf(key) !== -1;
      };
    }

    var result = this.instantiateEmptyObject();

    for (var key in this) {
      if (this.hasOwnProperty(key) && remove(this[key], key) === false) {
        result[key] = this[key];
      }
    }

    return makeImmutableObject(result,
      {instantiateEmptyObject: this.instantiateEmptyObject});
  }

  function asMutableArray(opts) {
    var result = [], i, length;

    if(opts && opts.deep) {
      for(i = 0, length = this.length; i < length; i++) {
        result.push(asDeepMutable(this[i]));
      }
    } else {
      for(i = 0, length = this.length; i < length; i++) {
        result.push(this[i]);
      }
    }

    return result;
  }

  /**
   * Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, expecting that the iterator function
   * will return an array of two elements - the first representing a key, the other
   * a value. Then returns an Immutable Object constructed of those keys and values.
   *
   * @param {function} iterator - A function which should return an array of two elements - the first representing the desired key, the other the desired value.
   */
  function asObject(iterator) {
    // If no iterator was provided, assume the identity function
    // (suggesting this array is already a list of key/value pairs.)
    if (typeof iterator !== "function") {
      iterator = function(value) { return value; };
    }

    var result = {},
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var pair  = iterator(this[index], index, this),
          key   = pair[0],
          value = pair[1];

      result[key] = value;
    }

    return makeImmutableObject(result);
  }

  function asDeepMutable(obj) {
    if (
      (!obj) ||
      (typeof obj !== 'object') ||
      (!Object.getOwnPropertyDescriptor(obj, immutabilityTag)) ||
      (obj instanceof Date)
    ) { return obj; }
    return obj.asMutable({deep: true});
  }

  function quickCopy(src, dest) {
    for (var key in src) {
      if (Object.getOwnPropertyDescriptor(src, key)) {
        dest[key] = src[key];
      }
    }

    return dest;
  }

  /**
   * Returns an Immutable Object containing the properties and values of both
   * this object and the provided object, prioritizing the provided object's
   * values whenever the same key is present in both objects.
   *
   * @param {object} other - The other object to merge. Multiple objects can be passed as an array. In such a case, the later an object appears in that list, the higher its priority.
   * @param {object} config - Optional config object that contains settings. Supported settings are: {deep: true} for deep merge and {merger: mergerFunc} where mergerFunc is a function
   *                          that takes a property from both objects. If anything is returned it overrides the normal merge behaviour.
   */
  function merge(other, config) {
    // Calling .merge() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (other === null || (typeof other !== "object")) {
      throw new TypeError("Immutable#merge can only be invoked with objects or arrays, not " + JSON.stringify(other));
    }

    var receivedArray = (Array.isArray(other)),
        deep          = config && config.deep,
        mode          = config && config.mode || 'merge',
        merger        = config && config.merger,
        result;

    // Use the given key to extract a value from the given object, then place
    // that value in the result object under the same key. If that resulted
    // in a change from this object's value at that key, set anyChanges = true.
    function addToResult(currentObj, otherObj, key) {
      var immutableValue = Immutable(otherObj[key]);
      var mergerResult = merger && merger(currentObj[key], immutableValue, config);
      var currentValue = currentObj[key];

      if ((result !== undefined) ||
        (mergerResult !== undefined) ||
        (!currentObj.hasOwnProperty(key)) ||
        !isEqual(immutableValue, currentValue)) {

        var newValue;

        if (mergerResult) {
          newValue = mergerResult;
        } else if (deep && isMergableObject(currentValue) && isMergableObject(immutableValue)) {
          newValue = currentValue.merge(immutableValue, config);
        } else {
          newValue = immutableValue;
        }

        if (!isEqual(currentValue, newValue) || !currentObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, currentObj.instantiateEmptyObject());
          }

          result[key] = newValue;
        }
      }
    }

    function clearDroppedKeys(currentObj, otherObj) {
      for (var key in currentObj) {
        if (!otherObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, currentObj.instantiateEmptyObject());
          }
          delete result[key];
        }
      }
    }

    var key;

    // Achieve prioritization by overriding previous values that get in the way.
    if (!receivedArray) {
      // The most common use case: just merge one object into the existing one.
      for (key in other) {
        if (Object.getOwnPropertyDescriptor(other, key)) {
          addToResult(this, other, key);
        }
      }
      if (mode === 'replace') {
        clearDroppedKeys(this, other);
      }
    } else {
      // We also accept an Array
      for (var index = 0, length = other.length; index < length; index++) {
        var otherFromArray = other[index];

        for (key in otherFromArray) {
          if (otherFromArray.hasOwnProperty(key)) {
            addToResult(result !== undefined ? result : this, otherFromArray, key);
          }
        }
      }
    }

    if (result === undefined) {
      return this;
    } else {
      return makeImmutableObject(result,
        {instantiateEmptyObject: this.instantiateEmptyObject});
    }
  }

  function objectReplace(value, config) {
    var deep          = config && config.deep;

    // Calling .replace() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (value === null || typeof value !== "object") {
      throw new TypeError("Immutable#replace can only be invoked with objects or arrays, not " + JSON.stringify(value));
    }

    return this.merge(value, {deep: deep, mode: 'replace'});
  }

  var immutableEmptyObject = Immutable({});

  function objectSetIn(path, value, config) {
    var head = path[0];
    if (path.length === 1) {
      return objectSet.call(this, head, value, config);
    }

    var tail = path.slice(1);
    var newValue;
    var thisHead = this[head];

    if (this.hasOwnProperty(head) && typeof(thisHead) === "object" && thisHead !== null && typeof(thisHead.setIn) === "function") {
      // Might (validly) be object or array
      newValue = thisHead.setIn(tail, value);
    } else {
      newValue = objectSetIn.call(immutableEmptyObject, tail, value);
    }

    if (this.hasOwnProperty(head) && thisHead === newValue) {
      return this;
    }

    var mutable = quickCopy(this, this.instantiateEmptyObject());
    mutable[head] = newValue;
    return makeImmutableObject(mutable, this);
  }

  function objectSet(property, value, config) {
    var deep          = config && config.deep;

    if (this.hasOwnProperty(property)) {
      if (deep && this[property] !== value && isMergableObject(value) && isMergableObject(this[property])) {
        value = this[property].merge(value, {deep: true, mode: 'replace'});
      }
      if (isEqual(this[property], value)) {
        return this;
      }
    }

    var mutable = quickCopy(this, this.instantiateEmptyObject());
    mutable[property] = Immutable(value);
    return makeImmutableObject(mutable, this);
  }

  function update(property, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = this[property];
    return this.set(property, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function getInPath(obj, path) {
    /*jshint eqnull:true */
    for (var i = 0, l = path.length; obj != null && i < l; i++) {
      obj = obj[path[i]];
    }

    return (i && i == l) ? obj : undefined;
  }

  function updateIn(path, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = getInPath(this, path);

    return this.setIn(path, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function asMutableObject(opts) {
    var result = this.instantiateEmptyObject(), key;

    if(opts && opts.deep) {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = asDeepMutable(this[key]);
        }
      }
    } else {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = this[key];
        }
      }
    }

    return result;
  }

  // Creates plain object to be used for cloning
  function instantiatePlainObject() {
    return {};
  }

  // Finalizes an object with immutable methods, freezes it, and returns it.
  function makeImmutableObject(obj, options) {
    var instantiateEmptyObject =
      (options && options.instantiateEmptyObject) ?
        options.instantiateEmptyObject : instantiatePlainObject;

    addPropertyTo(obj, "merge", merge);
    addPropertyTo(obj, "replace", objectReplace);
    addPropertyTo(obj, "without", without);
    addPropertyTo(obj, "asMutable", asMutableObject);
    addPropertyTo(obj, "instantiateEmptyObject", instantiateEmptyObject);
    addPropertyTo(obj, "set", objectSet);
    addPropertyTo(obj, "setIn", objectSetIn);
    addPropertyTo(obj, "update", update);
    addPropertyTo(obj, "updateIn", updateIn);

    return makeImmutable(obj, mutatingObjectMethods);
  }

  // Returns true if object is a valid react element
  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L326
  function isReactElement(obj) {
    return typeof obj === 'object' &&
           obj !== null &&
           (obj.$$typeof === REACT_ELEMENT_TYPE_FALLBACK || obj.$$typeof === REACT_ELEMENT_TYPE);
  }

  function Immutable(obj, options, stackRemaining) {
    if (isImmutable(obj) || isReactElement(obj)) {
      return obj;
    } else if (Array.isArray(obj)) {
      return makeImmutableArray(obj.slice());
    } else if (obj instanceof Date) {
      return makeImmutableDate(new Date(obj.getTime()));
    } else {
      // Don't freeze the object we were given; make a clone and use that.
      var prototype = options && options.prototype;
      var instantiateEmptyObject =
        (!prototype || prototype === Object.prototype) ?
          instantiatePlainObject : (function() { return Object.create(prototype); });
      var clone = instantiateEmptyObject();

      {
        /*jshint eqnull:true */
        if (stackRemaining == null) {
          stackRemaining = 64;
        }
        if (stackRemaining <= 0) {
          throw new ImmutableError("Attempt to construct Immutable from a deeply nested object was detected." +
            " Have you tried to wrap an object with circular references (e.g. React element)?" +
            " See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");
        }
        stackRemaining -= 1;
      }

      for (var key in obj) {
        if (Object.getOwnPropertyDescriptor(obj, key)) {
          clone[key] = Immutable(obj[key], undefined, stackRemaining);
        }
      }

      return makeImmutableObject(clone,
        {instantiateEmptyObject: instantiateEmptyObject});
    }
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  function toStatic(fn) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      return fn.apply(self, args);
    }

    return staticWrapper;
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  // with the additional condition of choosing which function to call depending
  // if argument is an array or an object.
  function toStaticObjectOrArray(fnObject, fnArray) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      if (Array.isArray(self)) {
          return fnArray.apply(self, args);
      } else {
          return fnObject.apply(self, args);
      }
    }

    return staticWrapper;
  }

  // Export the library
  Immutable.from           = Immutable;
  Immutable.isImmutable    = isImmutable;
  Immutable.ImmutableError = ImmutableError;
  Immutable.merge          = toStatic(merge);
  Immutable.replace        = toStatic(objectReplace);
  Immutable.without        = toStatic(without);
  Immutable.asMutable      = toStaticObjectOrArray(asMutableObject, asMutableArray);
  Immutable.set            = toStaticObjectOrArray(objectSet, arraySet);
  Immutable.setIn          = toStaticObjectOrArray(objectSetIn, arraySetIn);
  Immutable.update         = toStatic(update);
  Immutable.updateIn       = toStatic(updateIn);
  Immutable.flatMap        = toStatic(flatMap);
  Immutable.asObject       = toStatic(asObject);

  Object.freeze(Immutable);

  /* istanbul ignore if */
  if (typeof module === "object") {
    module.exports = Immutable;
  } else if (typeof exports === "object") {
    exports.Immutable = Immutable;
  } else if (typeof window === "object") {
    window.Immutable = Immutable;
  } else if (typeof commonjsGlobal === "object") {
    commonjsGlobal.Immutable = Immutable;
  }
})();
});

function immutableConstructor(typeChecker, customCheck = v => v) {
  return {
    of: pipe$1(customCheck, seamlessImmutable)
  };
}

/* eslint-disable no-nested-ternary */
// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

const typeCheck$1 = object({
  start: date,
  end: date
});

// CONSTRUCTOR
const TimeInterval$1 = immutableConstructor(typeCheck$1);

// PRIVATE GETTERS
const getStart = model => !model ? null : model.start instanceof Date ? model.start : null;

const getEnd = model => !model ? null : model.end instanceof Date ? model.end : null;
// GETTERS
// Returns the time difference betweet start and end in milliseconds
const getValue = model => {
  const maybeStart = pipe$1(Maybe$1.of, Maybe$1.map(getStart), Maybe$1.map(v => v.valueOf()))(model);

  const maybeEnd = pipe$1(Maybe$1.of, Maybe$1.map(getEnd), Maybe$1.map(v => v.valueOf()))(model);
  return pipe$1(Maybe$1.map2((s, e) => e - s), Maybe$1.withDefault(null))(maybeStart, maybeEnd);
};

Object.assign(TimeInterval$1, {
  typeCheck: typeCheck$1,
  getStart,
  getEnd,
  getValue
});

/**
 * Toggles a recording to on or off
 * @params {Project} model
 * @params {Date} time
 * @params {Boolean} on
 */
var _toggleRecording = curry$1(model => {
  if (!isRecording(model)) {
    return setStartTime(model, new Date());
  }

  const newInterval = TimeInterval$1.of({
    start: getStartTime(model),
    end: new Date()
  });

  const withStartTime = setStartTime(model, null);
  return setIntervals(withStartTime, [newInterval, ...getIntervals(model)]);
});

var _curry2$5 = _curry2$1;


/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
var add = _curry2$5(function add(a, b) {
  return Number(a) + Number(b);
});

/**
 * @method calculateRunningTime
 * @param  {Date} startTime
 * @param  {Array<TimeInterval>} intervals - Time intervals of type { start: Object, end: Object}
 * @return {Integer}
 */
function calculateRunningTime(startTime, intervals) {
  const intervalsSum = intervals.map(TimeInterval$1.getValue).reduce(add, 0);

  const sumSinceStartTime = !startTime ? 0 : pipe$1(d => ({ start: d, end: new Date() }), TimeInterval$1.of, TimeInterval$1.getValue)(startTime);

  return intervalsSum + sumSinceStartTime;
}

/**
 *
 * @param  {Recording} recording
 * @return {Integer} - Time in milliseconds
 */
var _totalTime = (model => {
  const startTime = getStartTime(model);
  const intervals = getIntervals(model);

  return calculateRunningTime(startTime, intervals);
});

/* eslint-disable new-cap, no-nested-ternary */
// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

const typeCheck$$1 = object({
  startTime: nullable(date),
  intervals: array(TimeInterval$1.typeCheck)
});

// CONSTRUCTOR
const Recording$1 = immutableConstructor(typeCheck$$1, r => ({
  startTime: r && r.startTime ? r.startTime : null,
  intervals: r && r.intervals ? r.intervals : []
}));

// PRIVATE GETTERS
const getStartTime = propOr$1(null, 'startTime');
const getIntervals = model => isNil(model) ? [] : isNil(model.intervals) ? [] : model.intervals;

// PRIVATE SETTERS
const setStartTime = curry$1((model, v) => {
  const imutableModel = seamlessImmutable(model);
  return !!imutableModel && !!imutableModel.merge ? imutableModel.merge({ startTime: v }, { deep: true }) : null;
});

const setIntervals = curry$1((model, v) => {
  const imutableModel = seamlessImmutable(model);
  return !!imutableModel && !!imutableModel.merge ? imutableModel.merge({ intervals: v }, { deep: true }) : null;
});
// ===========================
// PUBLIC INTERFACE
// BOOLEAN "gettters"
const isRecording = pipe$1(getStartTime, v => !!v);
const toggleRecording = _toggleRecording;
const totalTime = _totalTime;

Object.assign(Recording$1, {
  typeCheck: typeCheck$$1,
  getStartTime,
  getIntervals,
  setStartTime,
  setIntervals,
  isRecording,
  toggleRecording,
  totalTime
});

// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

const typeCheck$2 = object({
  name: string,
  url: string,
  recording: nullable(Recording$1.typeCheck)
});

const Deliverable$1 = immutableConstructor(typeCheck$2);

const getRecording = deliverable => deliverable ? deliverable.recording || Recording$1.of({}) : null;

const getName = propOr$1(null, 'name');
const getUrl = propOr$1(null, 'url');

// Deliverable -> Recording -> Deliverable
const setRecording = curry$1((model, newRecording) => isNil(model) ? null : seamlessImmutable(model).merge({ recording: newRecording }, { deep: true }));

const isSame = curry$1((d1, d2) => getName(d1) === getName(d2));

Object.assign(Deliverable$1, {
  typeCheck: typeCheck$2,
  getRecording,
  getName,
  getUrl,
  setRecording,
  isSame
});

var _arrayFromIterator$1 = function _arrayFromIterator$1(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
};

var _functionName$1 = function _functionName$1(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
};

var _curry2$7 = _curry2$1;


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */
var identical$1 = _curry2$7(function identical$1(a, b) {
  // SameValue algorithm
  if (a === b) { // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});

var _has$5 = _has$1;


var _isArguments$1 = (function() {
  var toString = Object.prototype.toString;
  return toString.call(arguments) === '[object Arguments]' ?
    function _isArguments$1(x) { return toString.call(x) === '[object Arguments]'; } :
    function _isArguments$1(x) { return _has$5('callee', x); };
}());

var _curry1$8 = _curry1$1;
var _has$4 = _has$1;
var _isArguments = _isArguments$1;


/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var keys$1 = (function() {
  // cover IE < 9 keys issues
  var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
                            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
  // Safari bug
  var hasArgsEnumBug = (function() {
    'use strict';
    return arguments.propertyIsEnumerable('length');
  }());

  var contains = function contains(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };

  return typeof Object.keys === 'function' && !hasArgsEnumBug ?
    _curry1$8(function keys$1(obj) {
      return Object(obj) !== obj ? [] : Object.keys(obj);
    }) :
    _curry1$8(function keys$1(obj) {
      if (Object(obj) !== obj) {
        return [];
      }
      var prop, nIdx;
      var ks = [];
      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
      for (prop in obj) {
        if (_has$4(prop, obj) && (!checkArgsLength || prop !== 'length')) {
          ks[ks.length] = prop;
        }
      }
      if (hasEnumBug) {
        nIdx = nonEnumerableProps.length - 1;
        while (nIdx >= 0) {
          prop = nonEnumerableProps[nIdx];
          if (_has$4(prop, obj) && !contains(ks, prop)) {
            ks[ks.length] = prop;
          }
          nIdx -= 1;
        }
      }
      return ks;
    });
}());

var _curry1$9 = _curry1$1;


/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 */
var type$1 = _curry1$9(function type$1(val) {
  return val === null      ? 'Null'      :
         val === undefined ? 'Undefined' :
         Object.prototype.toString.call(val).slice(8, -1);
});

var _arrayFromIterator = _arrayFromIterator$1;
var _functionName = _functionName$1;
var _has$3 = _has$1;
var identical = identical$1;
var keys = keys$1;
var type = type$1;


var _equals$1 = function _equals$1(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  if (type(a) !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
           typeof b.equals === 'function' && b.equals(a);
  }

  switch (type(a)) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' &&
          _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline &&
            a.sticky === b.sticky &&
            a.unicode === b.unicode)) {
        return false;
      }
      break;
    case 'Map':
    case 'Set':
      if (!_equals$1(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
        return false;
      }
      break;
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
      break;
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  stackA.push(a);
  stackB.push(b);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has$3(key, b) && _equals$1(b[key], a[key], stackA, stackB))) {
      return false;
    }
    idx -= 1;
  }
  stackA.pop();
  stackB.pop();
  return true;
};

var _curry2$6 = _curry2$1;
var _equals = _equals$1;


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
var equals$1 = _curry2$6(function equals$1(a, b) {
  return _equals(a, b, [], []);
});

var _curry3$5 = _curry3$1;
var equals = equals$1;


/**
 * Returns `true` if the specified object property is equal, in `R.equals`
 * terms, to the given value; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.equals, R.propSatisfies
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */
var propEq = _curry3$5(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});

var _curry1$10 = _curry1$1;


/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */
var not = _curry1$10(function not(a) {
  return !a;
});

var _isTransformer$1 = function _isTransformer$1(obj) {
  return typeof obj['@@transducer/step'] === 'function';
};

var _isArray$4 = _isArray$1;
var _isTransformer = _isTransformer$1;
var _slice$3 = _slice$1;


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with [methodname], it will execute that
 * function (functor case). Otherwise, if it is a transformer, uses transducer
 * [xf] to return a new transformer (transducer case). Otherwise, it will
 * default to executing [fn].
 *
 * @private
 * @param {String} methodname property to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
var _dispatchable$1 = function _dispatchable$1(methodname, xf, fn) {
  return function() {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    if (!_isArray$4(obj)) {
      var args = _slice$3(arguments, 0, length - 1);
      if (typeof obj[methodname] === 'function') {
        return obj[methodname].apply(obj, args);
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
};

var _filter$1 = function _filter$1(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};

var _isObject$1 = function _isObject$1(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};

var _xfBase$1 = {
  init: function() {
    return this.xf['@@transducer/init']();
  },
  result: function(result) {
    return this.xf['@@transducer/result'](result);
  }
};

var _curry2$9 = _curry2$1;
var _xfBase = _xfBase$1;


var _xfilter$1 = (function() {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function(result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return _curry2$9(function _xfilter$1(f, xf) { return new XFilter(f, xf); });
}());

var _curry2$8 = _curry2$1;
var _dispatchable = _dispatchable$1;
var _filter = _filter$1;
var _isObject = _isObject$1;
var _reduce$3 = _reduce$1;
var _xfilter = _xfilter$1;
var keys$3 = keys$1;


/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = _curry2$8(_dispatchable('filter', _xfilter, function(pred, filterable) {
  return (
    _isObject(filterable) ?
      _reduce$3(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys$3(filterable)) :
    // else
      _filter(pred, filterable)
  );
}));

/* eslint-disable new-cap */
// ========================================================================
//
//     ALL GETTERS AND SETTERS (PUBLIC OR NOT) MUST BE IN THIS FILE
//
// ========================================================================

const typeCheck$3 = object({
  name: string,
  url: string,
  unselectedDeliverables: array(Deliverable$1.typeCheck),
  selectedDeliverable: nullable(Deliverable$1.typeCheck)
});

// unselectedDeliverables and selectedDeliverables together form a ziplist.
const Project$1 = immutableConstructor(typeCheck$3);

// GETTERS
const getName$1 = propOr$1(null, 'name');
const getUrl$1 = propOr$1(null, 'url');
const getSelectedDeliverable = propOr$1(null, 'selectedDeliverable');
const getDeliverables = model => getSelectedDeliverable(model) ? [getSelectedDeliverable(model), ...propOr$1([], 'unselectedDeliverables', model)] : propOr$1([], 'unselectedDeliverables', model);

const setSelectedDeliverable = curry$1((model, newSelected) => Maybe$1.of(model).map(getDeliverables).map(filter(pipe$1(Deliverable$1.isSame(newSelected), not))).map(newDeliverables => seamlessImmutable(model).merge({
  unselectedDeliverables: newDeliverables,
  selectedDeliverable: newSelected || null
})).withDefault(model));

const updateDeliverable = curry$1((model, newDeliverable) => {
  // eslint-disable complexity
  if (!model || !newDeliverable) {
    return model;
  }

  const sameName = deliv => deliv ? propEq('name', newDeliverable.name, deliv) : false;

  if (sameName(Project$1.getSelectedDeliverable(model))) {
    return seamlessImmutable(model).merge({
      selectedDeliverable: newDeliverable
    });
  } else if (model.unselectedDeliverables.find(sameName)) {
    const newUnselected = model.unselectedDeliverables.map(d => sameName(d) ? newDeliverable : d);

    return seamlessImmutable(model).merge({
      unselectedDeliverables: newUnselected
    });
  }
  return model;
});

const isSame$1 = curry$1((p1, p2) => getName$1(p1) === getName$1(p2));

// NO SETTERS
Object.assign(Project$1, {
  typeCheck: typeCheck$3,
  getName: getName$1,
  getUrl: getUrl$1,
  getDeliverables,
  getSelectedDeliverable,
  setSelectedDeliverable,
  updateDeliverable,
  isSame: isSame$1
});

const Maybe = Maybe$1;

const Validation = Validation$1;

const Recording = Recording$1;
const TimeInterval = TimeInterval$1;
const Deliverable = Deliverable$1;
const Project = Project$1;

/* eslint-env jasmine */
/* eslint-disable new-cap, no-underscore-dangle */
describe('Validation type', () => {
  const successVal = 'success';
  const successVal2 = 'success2';
  const failureVal = 'failure';
  const aSuccess = Validation.Success(successVal);
  const aSuccess2 = Validation.Success(successVal2);
  const aFailure = Validation.Failure(failureVal);

  it('creates a success value with a truthy parameter', () => {
    const a = Validation.Success(123);
    expect(a.isSuccess).toBe(true);
    expect(Validation.isSuccess(a)).toBe(true);
  });

  it('creates a failure with the Failure function even if the value is truthy', () => {
    expect(Validation.Failure('a reason').isSuccess).toBe(false);
  });

  it('returns the default value when Failure with withDefalault', () => {
    expect(Validation.Failure().withDefault('default')).toEqual('default');
    expect(Validation.withDefault('default', Validation.Failure())).toEqual('default');
  });

  it('returns the main value when Success with withDefalault', () => {
    expect(aSuccess.withDefault('error')).toEqual(successVal);
    expect(Validation.withDefault('error', aSuccess)).toEqual(successVal);
  });

  it('maps successes and not failures', () => {
    expect(aSuccess.map(_ => 'r')._value).toEqual('r');
    expect(Validation.map(_ => 'r', aSuccess)._value).toEqual('r');
    expect(Validation.map(_ => 'r')(aSuccess)._value).toEqual('r');

    expect(aFailure.map(_ => 'r')._value).toEqual(failureVal);
    expect(Validation.map(_ => 'r', aFailure)._value).toEqual(failureVal);
    expect(Validation.map(_ => 'r')(aFailure)._value).toEqual(failureVal);
  });

  it('outputs a Validation type when mapping', () => {
    expect(aSuccess.map(_ => 'r') instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r', aSuccess) instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r')(aSuccess) instanceof Validation).toBe(true);

    expect(aFailure.map(_ => 'r') instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r', aFailure) instanceof Validation).toBe(true);
    expect(Validation.map(_ => 'r')(aFailure) instanceof Validation).toBe(true);
  });

  it('maps only successes with mapSuccess', () => {
    expect(aSuccess.mapSuccess(_ => 'r')._value).toEqual('r');
    expect(Validation.mapSuccess(_ => 'r', aSuccess)._value).toEqual('r');
    expect(Validation.mapSuccess(_ => 'r')(aSuccess)._value).toEqual('r');

    expect(aFailure.mapSuccess(_ => 'r')._value).toEqual(failureVal);
    expect(Validation.mapSuccess(_ => 'r', aFailure)._value).toEqual(failureVal);
    expect(Validation.mapSuccess(_ => 'r')(aFailure)._value).toEqual(failureVal);
  });

  it('maps only failures with mapFailure', () => {
    expect(aSuccess.mapFailure(_ => 'r')._value).toEqual(successVal);
    expect(Validation.mapFailure(_ => 'r', aSuccess)._value).toEqual(successVal);
    expect(Validation.mapFailure(_ => 'r')(aSuccess)._value).toEqual(successVal);

    expect(aFailure.mapFailure(_ => 'r')._value).toEqual('r');
    expect(Validation.mapFailure(_ => 'r', aFailure)._value).toEqual('r');
    expect(Validation.mapFailure(_ => 'r')(aFailure)._value).toEqual('r');
  });

  it('throws with throwFailure when Failure and doesn\'t when Success', () => {
    expect(_ => aFailure.throwFailure()).toThrow();
    expect(_ => Validation.throwFailure(aFailure)).toThrow();

    expect(_ => aSuccess.throwFailure()).not.toThrow();
    expect(_ => Validation.throwFailure(aSuccess)).not.toThrow();
  });

  it('calls the callback with andThen only when Success', () => {
    expect(aSuccess.andThen(_ => aSuccess2)).toEqual(aSuccess2);
    expect(Validation.andThen(_ => aSuccess2, aSuccess)).toEqual(aSuccess2);
    expect(Validation.andThen(_ => aSuccess2)(aSuccess)).toEqual(aSuccess2);

    expect(aFailure.andThen(_ => 'r')).toEqual(aFailure);
    expect(Validation.andThen(_ => 'r', aFailure)).toEqual(aFailure);
    expect(Validation.andThen(_ => 'r')(aFailure)).toEqual(aFailure);
  });

  it('throws when andThen callback does not return a validation', () => {
    expect(_ => aSuccess.andThen(_ => 'r')).toThrow();
    expect(_ => Validation.andThen(_ => 'r', aSuccess)).toThrow();
    expect(_ => Validation.andThen(_ => 'r')(aSuccess)).toThrow();
  });

  it('chains only successes', () => {
    const success1 = Validation.Success('1');
    const success2 = Validation.Success('2');

    expect(success1.chain(success2)._value).toEqual('2');
    expect(Validation.chain(success1, success2)._value).toEqual('2');
    expect(Validation.chain(success1)(success2)._value).toEqual('2');

    expect(aFailure.chain(success2)._value).toEqual(failureVal);
    expect(Validation.chain(aFailure, success2)._value).toEqual(failureVal);
    expect(Validation.chain(aFailure)(success2)._value).toEqual(failureVal);
  });
});

/* eslint-disable new-cap, no-underscore-dangle */


describe('Deliverable type', () => {
  const delivName = 'name';
  const delivUrl = 'url';
  const delivRec = Recording.of({ startTime: null, intervals: [] });
  const validObject = { name: delivName, url: delivUrl, recording: delivRec };
  const validDeliv = Deliverable.of(validObject);
  const validObjectNoRec = { name: delivName, url: delivUrl, recording: null };
  const validDelivNoRec = Deliverable.of(validObjectNoRec);

  it('type checks correctly', () => {
    const invalid1 = { name: 'asfd', url: 'adsf', recording: 'asdfa' };
    const invalid2 = { name: null, url: 'adsf', recording: null };
    const invalid3 = { name: 'asdf', url: null, recording: null };

    expect(Validation.isSuccess(Deliverable.typeCheck(invalid1))).toEqual(false);
    expect(Validation.isSuccess(Deliverable.typeCheck(invalid2))).toEqual(false);
    expect(Validation.isSuccess(Deliverable.typeCheck(invalid3))).toEqual(false);
    expect(Validation.isSuccess(Deliverable.typeCheck(validObject))).toEqual(true);
    expect(Validation.isSuccess(Deliverable.typeCheck(validObjectNoRec))).toEqual(true);
  });

  it('retuns a recording even if the Deliverable doesn\'t have one yet', () => {
    expect(pipe$1(Deliverable.getRecording, Recording.typeCheck, Validation.isSuccess)({})).toEqual(true);
    expect(Deliverable.getRecording(null)).toEqual(null);
    expect(Deliverable.getRecording(undefined)).toEqual(null);
    expect(Deliverable.getRecording({ recording: delivRec })).toEqual(delivRec);
  });

  it('returns name and doesn\'t throw with null', () => {
    expect(Deliverable.getName(validDeliv)).toEqual(delivName);
    expect(_ => Deliverable.getName(null)).not.toThrow();
  });

  it('returns url and doesn\'t throw with null', () => {
    expect(Deliverable.getUrl(validDeliv)).toEqual(delivUrl);
    expect(_ => Deliverable.getUrl(null)).not.toThrow();
  });

  it('returns an object with the correct recording when using setRecording', () => {
    const setAndGetRecording = pipe$1(Deliverable.setRecording, Deliverable.getRecording);

    expect(setAndGetRecording(validDelivNoRec, delivRec)).toEqual(delivRec);
    expect(setAndGetRecording(null, validDeliv)).toEqual(null);
    expect(_ => setAndGetRecording(null, null)).not.toThrow();
  });
});

/* eslint-disable new-cap, no-underscore-dangle */


describe('Recording type', () => {
  const now = Date.now();

  const secInterval5 = TimeInterval.of({
    start: new Date(now - 100 * 1000),
    end: new Date(now - 95 * 1000)
  });
  const secInterval10 = TimeInterval.of({
    start: new Date(now - 200 * 1000),
    end: new Date(now - 190 * 1000)
  });

  const valid1 = { startTime: null, intervals: [] };
  const valid1Running = { startTime: new Date(), intervals: [] };
  const valid2 = { startTime: null, intervals: [secInterval5, secInterval10] };
  const valid2Running = { startTime: new Date(), intervals: [secInterval5, secInterval10] };

  it('type checks correctly', () => {
    const invalid1 = {};
    const invalid1Running = { startTime: 'adsf', intervals: [] };
    const invalid2 = { startTime: 'adsf', intervals: null };
    const validates = pipe$1(Recording.typeCheck, Validation.isSuccess);

    expect(validates(invalid1)).toBe(false);
    expect(validates(invalid1Running)).toBe(false);
    expect(validates(invalid2)).toBe(false);

    expect(validates(valid1)).toBe(true);
    expect(validates(valid1Running)).toBe(true);
    expect(validates(valid2)).toBe(true);
    expect(validates(valid2Running)).toBe(true);
  });

  it('returns the startTime and does not break with null', () => {
    const date = new Date();
    expect(Recording.getStartTime({ startTime: date })).toEqual(date);
    expect(Recording.getStartTime({ startTime: null })).toEqual(null);
    expect(Recording.getStartTime({})).toEqual(null);
    expect(_ => Recording.getStartTime(null)).not.toThrow();
  });

  it('always returns an array for getIntervals', () => {
    const intervals = [secInterval10, secInterval5];
    const intervalIsArray = pipe$1(Recording.getIntervals, v => Array.isArray(v));

    expect(intervalIsArray({ intervals })).toEqual(true);
    expect(intervalIsArray({ intervals: null })).toEqual(true);
    expect(intervalIsArray({})).toEqual(true);
    expect(intervalIsArray(null)).toEqual(true);
    expect(_ => Recording.getIntervals(null)).not.toThrow();
  });

  it('sets the interval without throwing with null', () => {
    expect(_ => Recording.setIntervals(null, null)).not.toThrow();
    expect(_ => Recording.setIntervals(null, [])).not.toThrow();
    expect(_ => Recording.setIntervals({ intervals: [] }, null)).not.toThrow();
    expect(_ => Recording.setIntervals({ intervals: [] }, undefined)).not.toThrow();
    expect(_ => Recording.setIntervals({ intervals: [] }, 'asfadsf')).not.toThrow();
    expect(_ => Recording.setIntervals('asasdf', 'asfadsf')).not.toThrow();
    expect(_ => Recording.setIntervals('asasdf', [])).not.toThrow();
  });

  it('setIntervals works', () => {
    const empty = [];
    const intervals = [secInterval10, secInterval5];
    const setAndGetIntervals = pipe$1(Recording.setIntervals, Recording.getIntervals);
    expect(setAndGetIntervals({ intervals: [] }, intervals)).toEqual(intervals);
    expect(setAndGetIntervals({ intervals }, empty)).toEqual(empty);
    expect(setAndGetIntervals({}, empty)).toEqual(empty);
  });

  it('says whether isRecording or not', () => {
    expect(Recording.isRecording(valid1Running)).toEqual(true);
    expect(Recording.isRecording(valid2)).toEqual(false);
    expect(_ => Recording.isRecording(null)).not.toThrow();
  });

  it('sets the correct startTime in toggleRecording', () => {
    const toggledValue = pipe$1(Recording.toggleRecording, Recording.isRecording);
    const toggledStartTime = pipe$1(Recording.toggleRecording, Recording.getStartTime);
    expect(toggledValue(valid1Running)).toEqual(false);
    expect(toggledValue(valid1)).toEqual(true);
    expect(toggledValue(null)).toEqual(false);
    expect(toggledStartTime(valid1Running)).toBe(null);
    expect(toggledStartTime(valid2).valueOf()).toBeLessThanOrEqual(new Date().valueOf());
  });

  it('calculates the total time correctly', () => {
    const sec15 = { startTime: null, intervals: [secInterval10, secInterval5] };
    const sec15Running = { startTime: new Date(), intervals: [secInterval10, secInterval5] };
    const sec0 = { startTime: null, intervals: [] };
    const sec0Running = { startTime: new Date(), intervals: [] };

    expect(Recording.totalTime(sec15)).toEqual(1000 * 15);
    expect(Recording.totalTime(sec0)).toEqual(0);
    expect(Recording.totalTime(sec15Running)).toBeGreaterThan(100 * 15);
    expect(Recording.totalTime(sec0Running)).toBeGreaterThan(0);
  });

  it('does not break when totalTime receives null and always returns a number', () => {
    expect(_ => Recording.totalTime(null)).not.toThrow();
    expect(Recording.totalTime(null)).toEqual(0);
    expect(Recording.totalTime()).toEqual(0);
    expect(Recording.totalTime({})).toEqual(0);
    expect(Recording.totalTime([])).toEqual(0);
  });
});

/* eslint-env jasmine */

describe('Maybe type', () => {
  const createdJustWithOf = pipe$1(Maybe.of, Maybe.isJust);
  const createdJust = pipe$1(Maybe.Just, Maybe.isJust);
  const createdNothing = pipe$1(Maybe.Nothing, Maybe.isNothing);
  const defaultVal = 'default';
  const justVal = 'asfd';

  it('creates a Just when passed truthy and falsy non-null values', () => {
    expect(createdJust('1')).toBe(true);
    expect(createdJust({})).toBe(true);
    expect(createdJust(true)).toBe(true);
    expect(createdJust(false)).toBe(true);
    expect(createdJust([])).toBe(true);
  });

  it('creates a Nothing when passed anything with the Nothing constructor', () => {
    expect(createdNothing('1')).toBe(true);
    expect(createdNothing({})).toBe(true);
    expect(createdNothing(true)).toBe(true);
    expect(createdNothing(false)).toBe(true);
    expect(createdNothing([])).toBe(true);
    expect(createdNothing(null)).toBe(true);
    expect(createdNothing()).toBe(true);
  });

  it('creates a Nothing if null or undefined is passed to the general constructor', () => {
    expect(createdJustWithOf(null)).toBe(false);
    expect(createdJustWithOf()).toBe(false);
  });

  it('creates a Just if something is passed to the general constructor', () => {
    expect(createdJustWithOf('1')).toBe(true);
    expect(createdJustWithOf({})).toBe(true);
    expect(createdJustWithOf(true)).toBe(true);
    expect(createdJustWithOf(false)).toBe(true);
    expect(createdJustWithOf([])).toBe(true);
  });

  it('Retuns default only to Nothing values', () => {
    expect(Maybe.withDefault(defaultVal, Maybe.Just(justVal))).toEqual(justVal);
    expect(Maybe.withDefault(defaultVal, Maybe.Nothing(justVal))).toEqual(defaultVal);
  });

  it('maps Just only values', () => {
    const mappedVal = 'mapped';
    const func = _ => mappedVal;
    const mapAndGetDefault = pipe$1(Maybe.map(func), Maybe.withDefault(defaultVal));
    expect(mapAndGetDefault(Maybe.Just(justVal))).toEqual(mappedVal);
    expect(mapAndGetDefault(Maybe.Nothing(justVal))).toEqual(defaultVal);
  });

  it('doesn\' does not continue mapping when a null value appears', () => {
    expect(Maybe.of(justVal).map(_ => null).map(_ => justVal).withDefault(defaultVal)).toEqual(defaultVal);
  });

  it('maps only two Justs in map2', () => {
    const mappedVal = 'mapped';
    const func = _ => mappedVal;
    const map2AndGetDefault = pipe$1(Maybe.map2(func), Maybe.withDefault(defaultVal));
    expect(map2AndGetDefault(Maybe.Just(justVal), Maybe.Just(justVal))).toEqual(mappedVal);
    expect(map2AndGetDefault(Maybe.Just(justVal), Maybe.Nothing(justVal))).toEqual(defaultVal);
    expect(map2AndGetDefault(Maybe.Nothing(justVal), Maybe.Just(justVal))).toEqual(defaultVal);
    expect(map2AndGetDefault(Maybe.Nothing(justVal), Maybe.Nothing(justVal))).toEqual(defaultVal);
  });

  it('has curried maps', () => {
    const mappedVal = 'mapped';
    expect(Maybe.withDefault(defaultVal, Maybe.map(_ => mappedVal)(Maybe.Just('j')))).toEqual(mappedVal);
  });
});

/* eslint-disable new-cap, no-underscore-dangle */


describe('TimeInterval type', () => {
  const now = Date.now();
  const validObj = { start: new Date(now), end: new Date(now + 5 * 1000) };

  it('checks for types correctly', () => {
    const invalid1 = {};
    const invalid2 = { start: new Date() };
    const invalid3 = { start: new Date(), end: '' };
    const invalid4 = { start: new Date(), end: 123 };
    const invalid5 = { end: new Date() };

    const validates = pipe$1(TimeInterval.typeCheck, Validation.isSuccess);
    expect(validates(invalid1)).toEqual(false);
    expect(validates(invalid2)).toEqual(false);
    expect(validates(invalid3)).toEqual(false);
    expect(validates(invalid4)).toEqual(false);
    expect(validates(invalid5)).toEqual(false);
  });

  it('returns start date without breaking with null', () => {
    expect(TimeInterval.getStart(validObj)).toEqual(validObj.start);
    expect(TimeInterval.getStart({})).toEqual(null);
    expect(TimeInterval.getStart(null)).toEqual(null);
    expect(TimeInterval.getStart(undefined)).toEqual(null);
  });

  it('returns end date without breaking with null', () => {
    expect(TimeInterval.getEnd(validObj)).toEqual(validObj.end);
    expect(TimeInterval.getEnd({})).toEqual(null);
    expect(TimeInterval.getEnd(null)).toEqual(null);
    expect(TimeInterval.getEnd(undefined)).toEqual(null);
  });

  it('calculates the date difference correctly', () => {
    expect(TimeInterval.getValue(validObj)).toEqual(5 * 1000);
  });

  it('returns null if an invalid TimeInterval object is provided in getValue', () => {
    expect(_ => TimeInterval.getValue(null)).not.toThrow();
    expect(TimeInterval.getValue(null)).toEqual(null);
    expect(TimeInterval.getValue(undefined)).toEqual(null);
    expect(TimeInterval.getValue({})).toEqual(null);
    expect(TimeInterval.getValue([])).toEqual(null);
  });
});

/* eslint-disable new-cap, no-underscore-dangle */

describe('Project type', () => {
  const delivRec = Recording.of({ startTime: null, intervals: [] });
  const mockDeliverable = { name: 'aaa', url: 'www', recording: delivRec };
  const validName = 'name';
  const validUrl = 'url';
  const unselectedDeliverables = [mockDeliverable];
  const valid = {
    name: validName,
    url: validUrl,
    unselectedDeliverables,
    selectedDeliverable: mockDeliverable
  };
  const isValid = pipe$1(v => seamlessImmutable(v).asMutable({ deep: true }), Project.typeCheck, Validation.isSuccess);

  it('typeChecks ok', () => {
    const invalid1 = {
      name: validName,
      url: validUrl,
      unselectedDeliverables: null,
      selectedDeliverable: null
    };
    const invalid2 = {
      name: validName,
      url: validUrl,
      unselectedDeliverables: [],
      selectedDeliverable: []
    };
    const invalid3 = {};

    expect(isValid(invalid1)).toEqual(false);
    expect(isValid(invalid2)).toEqual(false);
    expect(isValid(invalid3)).toEqual(false);
    expect(isValid(valid)).toEqual(true);
  });

  it('returns name without breaking with null', () => {
    const getName = pipe$1(Project.of, Project.getName);
    expect(getName(valid)).toEqual(validName);
    expect(getName({})).toEqual(null);
    expect(getName()).toEqual(null);
    expect(getName(null)).toEqual(null);
  });

  it('returns url without breaking with null', () => {
    const getUrl = pipe$1(Project.of, Project.getUrl);
    expect(getUrl(valid)).toEqual(validUrl);
    expect(getUrl({})).toEqual(null);
    expect(getUrl()).toEqual(null);
    expect(getUrl(null)).toEqual(null);
  });

  it('returns deliverables without breaking with null', () => {
    const getDeliverables = pipe$1(Project.of, Project.getDeliverables);
    expect(getDeliverables(valid).find(m => m.url === mockDeliverable.url)).toBeTruthy();
    expect(getDeliverables({})).toEqual([]);
    expect(getDeliverables()).toEqual([]);
    expect(getDeliverables(null)).toEqual([]);
  });

  it('returns selectedDeliverable without breaking with null', () => {
    const getSelectedDeliverable = pipe$1(Project.of, Project.getSelectedDeliverable);
    expect(getSelectedDeliverable(valid)).toEqual(mockDeliverable);
    expect(getSelectedDeliverable({})).toEqual(null);
    expect(getSelectedDeliverable()).toEqual(null);
    expect(getSelectedDeliverable(null)).toEqual(null);
  });

  it('updates a deliverable that is selected', () => {
    const mockDeliverableChanged = Object.assign({}, mockDeliverable, { url: 'jjj' });
    const mockProject = {
      name: 'asfd',
      url: 'asdf',
      unselectedDeliverables: [],
      selectedDeliverable: mockDeliverable
    };

    const updateAndGetDeliverables = pipe$1(Project.updateDeliverable, Project.getDeliverables);

    expect(updateAndGetDeliverables(mockProject, mockDeliverableChanged).find(m => m.url === mockDeliverableChanged.url)).toBeTruthy();
    expect(updateAndGetDeliverables(mockProject, mockDeliverableChanged).find(m => m.url === mockDeliverable.url)).toBeFalsy();

    expect(pipe$1(Project.updateDeliverable, isValid)(mockProject, mockDeliverableChanged)).toEqual(true);
  });

  it('updates a deliverable that is not selected', () => {
    const mockDeliverableChanged = Object.assign({}, mockDeliverable, { url: 'jjj' });
    const mockProject = {
      name: 'asfd',
      url: 'asdf',
      unselectedDeliverables: [mockDeliverable],
      selectedDeliverable: null
    };

    const updateAndGetDeliverables = pipe$1(Project.updateDeliverable, Project.getDeliverables);

    expect(updateAndGetDeliverables(mockProject, mockDeliverableChanged).find(m => m.url === mockDeliverableChanged.url)).toBeTruthy();
    expect(updateAndGetDeliverables(mockProject, mockDeliverableChanged).find(m => m.url === mockDeliverable.url)).toBeFalsy();

    expect(pipe$1(Project.updateDeliverable, isValid)(mockProject, mockDeliverableChanged)).toEqual(true);
  });

  it('handles nulls when updating deliverables', () => {
    expect(_ => Project.updateDeliverable(null, null)).not.toThrow();
    expect(_ => Project.updateDeliverable(valid, null)).not.toThrow();
    expect(_ => Project.updateDeliverable(valid, valid)).not.toThrow();
  });
});

var _curry2$10 = _curry2$1;


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */
var prop = _curry2$10(function prop(p, obj) { return obj[p]; });

var _reduced$1 = function _reduced$1(x) {
  return x && x['@@transducer/reduced'] ? x :
    {
      '@@transducer/value': x,
      '@@transducer/reduced': true
    };
};

var _curry2$12 = _curry2$1;
var _reduced = _reduced$1;
var _xfBase$3 = _xfBase$1;


var _xfind$1 = (function() {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase$3.init;
  XFind.prototype['@@transducer/result'] = function(result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return _curry2$12(function _xfind$1(f, xf) { return new XFind(f, xf); });
}());

var _curry2$11 = _curry2$1;
var _dispatchable$3 = _dispatchable$1;
var _xfind = _xfind$1;


/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
var find = _curry2$11(_dispatchable$3('find', _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));

var _curry2$13 = _curry2$1;
var _isString$3 = _isString$1;


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 */
var nth$1 = _curry2$13(function nth$1(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString$3(list) ? list.charAt(idx) : list[idx];
});

var nth = nth$1;


/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */
var head = nth(0);

var _isFunction$1 = function _isFunction$1(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
};

var equals$3 = equals$1;


var _indexOf$1 = function _indexOf$1(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals$3(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
};

var _indexOf = _indexOf$1;


var _contains$1 = function _contains$1(a, list) {
  return _indexOf(list, a, 0) >= 0;
};

var _map$1 = function _map$1(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
};

var _quote$1 = function _quote$1(s) {
  var escaped = s
    .replace(/\\/g, '\\\\')
    .replace(/[\b]/g, '\\b')  // \b matches word boundary; [\b] matches backspace
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\v/g, '\\v')
    .replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
};

/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var _toISOString$1 = (function() {
  var pad = function pad(n) { return (n < 10 ? '0' : '') + n; };

  return typeof Date.prototype.toISOString === 'function' ?
    function _toISOString$1(d) {
      return d.toISOString();
    } :
    function _toISOString$1(d) {
      return (
        d.getUTCFullYear() + '-' +
        pad(d.getUTCMonth() + 1) + '-' +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) + '.' +
        (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z'
      );
    };
}());

var _complement$1 = function _complement$1(f) {
  return function() {
    return !f.apply(this, arguments);
  };
};

var _complement = _complement$1;
var _curry2$15 = _curry2$1;
var filter$1 = filter;


/**
 * The complement of `filter`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var reject$1 = _curry2$15(function reject$1(pred, filterable) {
  return filter$1(_complement(pred), filterable);
});

var _contains = _contains$1;
var _map = _map$1;
var _quote = _quote$1;
var _toISOString = _toISOString$1;
var keys$4 = keys$1;
var reject = reject$1;


var _toString$1 = function _toString$1(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString$1(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function(obj, keys) {
    return _map(function(k) { return _quote(k) + ': ' + recur(obj[k]); }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function(k) { return /^\d+$/.test(k); }, keys$4(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys$4(x)).join(', ') + '}';
  }
};

var _curry1$11 = _curry1$1;
var _toString = _toString$1;


/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
var toString$1 = _curry1$11(function toString$1(val) { return _toString(val, []); });

var _curry2$14 = _curry2$1;
var _isArray$5 = _isArray$1;
var _isFunction = _isFunction$1;
var toString = toString$1;


/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} a
 * @param {Array|String} b
 * @return {Array|String}
 *
 * @example
 *
 *      R.concat([], []); //=> []
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 */
var concat = _curry2$14(function concat(a, b) {
  if (a == null || !_isFunction(a.concat)) {
    throw new TypeError(toString(a) + ' does not have a method named "concat"');
  }
  if (_isArray$5(a) && !_isArray$5(b)) {
    throw new TypeError(toString(b) + ' is not an array');
  }
  return a.concat(b);
});

var _curry2$17 = _curry2$1;
var _xfBase$4 = _xfBase$1;


var _xmap$1 = (function() {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase$4.init;
  XMap.prototype['@@transducer/result'] = _xfBase$4.result;
  XMap.prototype['@@transducer/step'] = function(result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return _curry2$17(function _xmap$1(f, xf) { return new XMap(f, xf); });
}());

var _curry2$16 = _curry2$1;
var _dispatchable$4 = _dispatchable$1;
var _map$3 = _map$1;
var _reduce$4 = _reduce$1;
var _xmap = _xmap$1;
var curryN$3 = curryN$1;
var keys$5 = keys$1;


/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 */
var map = _curry2$16(_dispatchable$4('map', _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN$3(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce$4(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys$5(functor));
    default:
      return _map$3(fn, functor);
  }
}));

var _curry2$18 = _curry2$1;


/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */
var lt = _curry2$18(function lt(a, b) { return a < b; });

var _curry2$19 = _curry2$1;


/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} val The default value.
 * @param {b} val The value to return if it is not null or undefined
 * @return {*} The the second value or the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      defaultTo42(parseInt('string')); //=> 42
 */
var defaultTo$1 = _curry2$19(function defaultTo$1(d, v) {
  return v == null || v !== v ? d : v;
});

var _curry2$20 = _curry2$1;


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig [String] -> {k: v} -> v | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
var path$1 = _curry2$20(function path$1(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});

var _curry3$6 = _curry3$1;
var defaultTo = defaultTo$1;
var path = path$1;


/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig a -> [String] -> Object -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
var pathOr$1 = _curry3$6(function pathOr$1(d, p, obj) {
  return defaultTo(d, path(p, obj));
});

const updateAt = curry$1((keyArray, newVal, obj) => {
  const deepNewVal = keyArray.reduceRight((result, key) => ({ [key]: result }), newVal);

  return seamlessImmutable(obj).merge(deepNewVal, { deep: true });
});

const selectedProject = pathOr$1(null, ['selectedProject']);

// Model -> [Project]
const unselectedProjects = pipe$1(propOr$1(null, 'unselectedProjects'), v => v || []);

const allProjects = model => selectedProject(model) ? unselectedProjects(model).concat(selectedProject(model)) : unselectedProjects(model);

const recordingsInfo = model => {
  const nonZeroRecordingTime = pipe$1(propOr$1(null, 'recording'), Recording.totalTime, lt(0));

  const projectRecordingInfos = project => pipe$1(Project.getDeliverables, map(d => ({ project, deliverable: d, recording: Deliverable.getRecording(d) })))(project);

  const all = pipe$1(allProjects, map(projectRecordingInfos), reduce$1(concat, []))(model);

  return all.filter(nonZeroRecordingTime);
};

const getProject = curry$1((projectName, model) => pipe$1(allProjects, filter(propEq('name', projectName)))(model));

const getDeliverable = curry$1((deliverableName, projectName, model) => pipe$1(getProject(projectName), Project.getDeliverables, filter(propEq('name', deliverableName)))(model));

const updateProject = curry$1((project, model, newProject) => {
  const projectName = Project.getName(project);
  if (!(model && projectName && newProject)) {
    return model;
  }

  const sameProjectName = propEq('name', projectName);
  const updatingSelectedProject = projectName === propOr$1(null, 'name', model.selectedProject);
  const updatingUnselectedProject = !!unselectedProjects(model).find(sameProjectName);

  if (updatingSelectedProject) {
    return updateAt(['selectedProject'], newProject, model);
  } else if (updatingUnselectedProject) {
    const newUnselectedProjects = unselectedProjects(model).map(p => sameProjectName(p) ? newProject : p);

    return updateAt(['unselectedProjects'], newUnselectedProjects, model);
  }

  return model;
});

// Model -> {Project, Deliverable} -> Model
const toggleDeliverableRecording = curry$1((model, { project, deliverable }) => Maybe.of(deliverable).map(Deliverable.getRecording).map(Recording.toggleRecording).map(Deliverable.setRecording(deliverable)).map(Project.updateDeliverable(project)).map(updateProject(project, model)).withDefault(model));

// Model -> Maybe
const findRecordingDeliverable = model => Maybe.of(model).map(recordingsInfo).map(filter(pipe$1(prop('recording'), Recording.isRecording))).map(head);

// Model -> Model
const stopAllRecordings = model => Maybe.of(model).chain(findRecordingDeliverable).map(toggleDeliverableRecording(model)).map(stopAllRecordings).withDefault(model);

// Project -> Maybe(Project)
const getUpToDateProject = curry$1((project, model) => Maybe.of(model).map(allProjects).map(find(Project.isSame(project))));

var toggleRecording$1 = ((model, { project, deliverable }) => Maybe.of(model).map(stopAllRecordings).chain(changedModel => getUpToDateProject(project, changedModel).map(p => toggleDeliverableRecording(changedModel, { project: p, deliverable }))).withDefault(model));

const mockDeliverable = {
  "name": "Rush with possible clients",
  "url": "localhost:8080/deliverables/rush-cold-call",
  "recording": {
    "startTime": null,
    "intervals": [{
      "start": "2016-12-13T13:37:01.465Z",
      "end": "2016-12-13T13:41:23.457Z"
    }]
  }
};

const mockProject = {
  "name": "Rushed project",
  "url": "localhost:8080/projects/rushed-project",
  "unselectedDeliverables": [mockDeliverable, {
    "name": "Rush with online ads",
    "url": "localhost:8080/deliverables/rush-buy-ads",
    "recording": {
      "startTime": null,
      "intervals": [{
        "start": "2016-12-13T13:36:58.941Z",
        "end": "2016-12-13T13:37:01.460Z"
      }]
    }
  }, {
    "name": "Rush with logo",
    "url": "localhost:8080/deliverables/rush-create-logo",
    "recording": null
  }],
  "selectedDeliverable": mockDeliverable
};

const mockUnselectedDeliverable = {
  "name": "Useless logo",
  "url": "localhost:8080/deliverables/useless-create-logo",
  "recording": null
};

const mockUnselectedProject = {
  "name": "Useless project",
  "url": "localhost:8080/projects/rushed-project",
  "unselectedDeliverables": [mockUnselectedDeliverable, {
    "name": "Useless online ads",
    "url": "localhost:8080/deliverables/useless-buy-ads",
    "recording": null
  }, {
    "name": "Useless possible clients",
    "url": "localhost:8080/deliverables/useless-cold-call",
    "recording": null
  }],
  "selectedDeliverable": null
};

const mockModel = {
  "minimised": false,
  "serverURL": "./data.json",
  "unselectedProjects": [mockUnselectedProject, {
    "name": "Big project",
    "url": "localhost:8080/projects/big-project",
    "unselectedDeliverables": [{
      "name": "Cold call possible clients",
      "url": "localhost:8080/deliverables/cold-call",
      "recording": {
        "startTime": "2016-12-13T13:37:52.078Z", /// Is recording
        "intervals": [{
          "start": "2016-12-13T13:36:52.078Z",
          "end": "2016-12-13T13:36:55.013Z"
        }]
      }
    }, {
      "name": "Buy online ads",
      "url": "localhost:8080/deliverables/buy-ads",
      "recording": {
        "startTime": "2016-12-13T13:39:52.078Z", // Is recording
        "intervals": [{
          "start": "2016-12-13T13:36:50.309Z",
          "end": "2016-12-13T13:36:52.075Z"
        }]
      }
    }],
    "selectedDeliverable": {
      "name": "Create logo",
      "url": "localhost:8080/deliverables/create-logo",
      "recording": {
        "startTime": null,
        "intervals": [{
          "start": "2016-12-13T13:36:55.018Z",
          "end": "2016-12-13T13:36:58.935Z"
        }]
      }
    }
  }],
  "selectedProject": mockProject
};

/* eslint-env jasmine */
describe('Update.toggleRecording', () => {
  it('stops other recordings when toggling the selected project', () => {
    const mockAction = {
      project: mockProject,
      deliverable: mockDeliverable
    };

    const toggledModel = toggleRecording$1(mockModel, mockAction);

    const deliverablesRecording = recordingsInfo(toggledModel).filter(pipe$1(prop('recording'), Recording.isRecording)).map(prop('deliverable'));

    expect(deliverablesRecording.length).toEqual(1);
    const sameName = Deliverable.getName(mockDeliverable) === Deliverable.getName(deliverablesRecording[0]);
    expect(sameName).toEqual(true);
  });

  it('stops other recordings when toggling an unselected project and deliverable', () => {
    const mockAction = {
      project: mockUnselectedProject,
      deliverable: mockUnselectedDeliverable
    };

    const toggledModel = toggleRecording$1(mockModel, mockAction);

    const deliverablesRecording = recordingsInfo(toggledModel).filter(pipe$1(prop('recording'), Recording.isRecording)).map(prop('deliverable'));

    expect(deliverablesRecording.length).toEqual(1);
    const sameName = Deliverable.getName(mockUnselectedDeliverable) === Deliverable.getName(deliverablesRecording[0]);
    expect(sameName).toEqual(true);
  });
});

var selectProject = ((model, action) => {
  const { project = null } = action;

  const projectName = propOr$1(null, 'name', project);
  const newUnselectedProjects = pipe$1(allProjects, reject$1(propEq('name', projectName)))(model);

  return pipe$1(updateAt(['selectedProject'], project), updateAt(['unselectedProjects'], newUnselectedProjects))(model);
});

/* eslint-env jasmine */
describe('update.selectProject', () => {
  it('selects a project successfully', () => {
    const mockAction = {
      project: mockUnselectedProject,
      deliverable: mockUnselectedProject.unselectedDeliverables[0]
    };
    const modifiedModel = selectProject(mockModel, mockAction);
    expect(Project.isSame(mockUnselectedProject, modifiedModel.selectedProject)).toEqual(true);
  });

  it('selects a the current project successfully', () => {
    const mockAction = {
      project: mockProject
    };
    const modifiedModel = selectProject(mockModel, mockAction);
    expect(Project.isSame(mockProject, modifiedModel.selectedProject)).toEqual(true);
  });
});

var selectDeliverable = ((model, { project, deliverable }) => Maybe.of(project).map(p => selectProject(model, { project: p })).chain(m => Maybe.of(m.selectedProject).chain(p => Maybe.of(deliverable).map(Project.setSelectedDeliverable(p)).map(updateProject(p, m)))).withDefault(model));

/* eslint-env jasmine */
describe('update.selectDeliverable', () => {
  it('selects a deliverable from the selected project successfully', () => {
    const mockAction = {
      project: mockProject,
      deliverable: mockProject.unselectedDeliverables[0]
    };
    const modifiedModel = selectDeliverable(mockModel, mockAction);
    expect(Project.isSame(mockProject, modifiedModel.selectedProject)).toEqual(true);
    expect(Deliverable.isSame(mockProject.unselectedDeliverables[0], modifiedModel.selectedProject.selectedDeliverable)).toEqual(true);
  });

  it('selects a deliverable from the a non selected project successfully', () => {
    const mockAction = {
      project: mockUnselectedProject,
      deliverable: mockUnselectedProject.unselectedDeliverables[0]
    };
    const modifiedModel = selectDeliverable(mockModel, mockAction);
    expect(Project.isSame(mockUnselectedProject, modifiedModel.selectedProject)).toEqual(true);
    expect(Deliverable.isSame(mockUnselectedProject.unselectedDeliverables[0], modifiedModel.selectedProject.selectedDeliverable)).toEqual(true);
  });
});

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1BsYWNlaG9sZGVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5MS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3VycnlOLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnlOLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnkuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL2pzL3R5cGVzL01heWJlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL3NyYy9qcy90eXBlcy9SZW1vdGVEYXRhLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9mbC1hc3NlcnQvZGlzdC9hc3NlcnQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL2pzL3R5cGVzL1ZhbGlkYXRpb24uanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pc05pbC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19waXBlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2N1cnJ5My5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194d3JhcC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2JpbmQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcnJheS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1N0cmluZy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2lzQXJyYXlMaWtlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3JlZHVjZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlZHVjZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19zbGljZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jaGVja0Zvck1ldGhvZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NsaWNlLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFpbC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpcGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL2pzL3R5cGVzL3R5cGUtY2hlY2tlcnMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faGFzLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcE9yLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9zZWFtbGVzcy1pbW11dGFibGUvc3JjL3NlYW1sZXNzLWltbXV0YWJsZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvanMvdHlwZXMvdXRpbHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL2pzL3R5cGVzL1RpbWVJbnRlcnZhbC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvanMvdHlwZXMvUmVjb3JkaW5nL3RvZ2dsZVJlY29yZGluZy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FkZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvanMvdHlwZXMvUmVjb3JkaW5nL3RvdGFsVGltZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvanMvdHlwZXMvUmVjb3JkaW5nL2luZGV4LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL3NyYy9qcy90eXBlcy9EZWxpdmVyYWJsZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcnJheUZyb21JdGVyYXRvci5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19mdW5jdGlvbk5hbWUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pZGVudGljYWwuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcmd1bWVudHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9rZXlzLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHlwZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19lcXVhbHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9lcXVhbHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wRXEuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ub3QuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNUcmFuc2Zvcm1lci5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kaXNwYXRjaGFibGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZmlsdGVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzT2JqZWN0LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmQmFzZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmlsdGVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZmlsdGVyLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL3NyYy9qcy90eXBlcy9Qcm9qZWN0LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL3NyYy9qcy90eXBlcy9pbmRleC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvdGVzdHMvdHlwZXMvVmFsaWRhdGlvbi5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvdGVzdHMvdHlwZXMvRGVsaXZlcmFibGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL3Rlc3RzL3R5cGVzL1JlY29yZGluZy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvdGVzdHMvdHlwZXMvTWF5YmUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL3Rlc3RzL3R5cGVzL1RpbWVJbnRlcnZhbC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvdGVzdHMvdHlwZXMvUHJvamVjdC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3AuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcmVkdWNlZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZmluZC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmQuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9udGguanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9oZWFkLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzRnVuY3Rpb24uanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faW5kZXhPZi5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jb250YWlucy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19tYXAuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcXVvdGUuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fdG9JU09TdHJpbmcuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY29tcGxlbWVudC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlamVjdC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL190b1N0cmluZy5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RvU3RyaW5nLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29uY2F0LmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL25vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3htYXAuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXAuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sdC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL2RlZmF1bHRUby5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9ub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhdGguanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvbm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXRoT3IuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL2pzL1dpZGdldC91cGRhdGUvdXRpbHMuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL2pzL1dpZGdldC91cGRhdGUvdG9nZ2xlUmVjb3JkaW5nLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL3NyYy90ZXN0cy9XaWRnZXQvbW9ja0RhdGEuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL3Rlc3RzL1dpZGdldC91cGRhdGUudG9nZ2xlUmVjb3JkaW5nLmpzIiwiL2hvbWUvbWFyY2Vsby9Qcm9ncmFtcy9Gb3VyTGFicy9VdGlsaXRpZXMvdGltZS10cmFja2VyL3NyYy9qcy9XaWRnZXQvdXBkYXRlL3NlbGVjdFByb2plY3QuanMiLCIvaG9tZS9tYXJjZWxvL1Byb2dyYW1zL0ZvdXJMYWJzL1V0aWxpdGllcy90aW1lLXRyYWNrZXIvc3JjL3Rlc3RzL1dpZGdldC91cGRhdGUuc2VsZWN0UHJvamVjdC5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvanMvV2lkZ2V0L3VwZGF0ZS9zZWxlY3REZWxpdmVyYWJsZS5qcyIsIi9ob21lL21hcmNlbG8vUHJvZ3JhbXMvRm91ckxhYnMvVXRpbGl0aWVzL3RpbWUtdHJhY2tlci9zcmMvdGVzdHMvV2lkZ2V0L3VwZGF0ZS5zZWxlY3REZWxpdmVyYWJsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9pc1BsYWNlaG9sZGVyKGEpIHtcbiAgcmV0dXJuIGEgIT0gbnVsbCAmJlxuICAgICAgICAgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmXG4gICAgICAgICBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZTtcbn07XG4iLCJ2YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgb25lLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnkxKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMShhKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgX2lzUGxhY2Vob2xkZXIoYSkpIHtcbiAgICAgIHJldHVybiBmMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2FyaXR5KG4sIGZuKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHN3aXRjaCAobikge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhMCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhMCwgYTEpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMikgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMykgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA2OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDc6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNikgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDg6IHJldHVybiBmdW5jdGlvbihhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgY2FzZSA5OiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkgeyByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfTtcbiAgICBjYXNlIDEwOiByZXR1cm4gZnVuY3Rpb24oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTkpIHsgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9fY3VycnkxJyk7XG52YXIgX2lzUGxhY2Vob2xkZXIgPSByZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdHdvLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnkyKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmMihhLCBiKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBmMjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpID8gZjJcbiAgICAgICAgICAgICA6IF9jdXJyeTEoZnVuY3Rpb24oX2IpIHsgcmV0dXJuIGZuKGEsIF9iKTsgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmMlxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkxKGZ1bmN0aW9uKF9hKSB7IHJldHVybiBmbihfYSwgYik7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2IpIHsgcmV0dXJuIGZuKGEsIF9iKTsgfSlcbiAgICAgICAgICAgICA6IGZuKGEsIGIpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJ2YXIgX2FyaXR5ID0gcmVxdWlyZSgnLi9fYXJpdHknKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIEludGVybmFsIGN1cnJ5TiBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBvZiB0aGUgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHJlY2VpdmVkIEFuIGFycmF5IG9mIGFyZ3VtZW50cyByZWNlaXZlZCB0aHVzIGZhci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICB2YXIgYXJnc0lkeCA9IDA7XG4gICAgdmFyIGxlZnQgPSBsZW5ndGg7XG4gICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICB3aGlsZSAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggfHwgYXJnc0lkeCA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICBpZiAoY29tYmluZWRJZHggPCByZWNlaXZlZC5sZW5ndGggJiZcbiAgICAgICAgICAoIV9pc1BsYWNlaG9sZGVyKHJlY2VpdmVkW2NvbWJpbmVkSWR4XSkgfHxcbiAgICAgICAgICAgYXJnc0lkeCA+PSBhcmd1bWVudHMubGVuZ3RoKSkge1xuICAgICAgICByZXN1bHQgPSByZWNlaXZlZFtjb21iaW5lZElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBhcmd1bWVudHNbYXJnc0lkeF07XG4gICAgICAgIGFyZ3NJZHggKz0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkW2NvbWJpbmVkSWR4XSA9IHJlc3VsdDtcbiAgICAgIGlmICghX2lzUGxhY2Vob2xkZXIocmVzdWx0KSkge1xuICAgICAgICBsZWZ0IC09IDE7XG4gICAgICB9XG4gICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gbGVmdCA8PSAwID8gZm4uYXBwbHkodGhpcywgY29tYmluZWQpXG4gICAgICAgICAgICAgICAgICAgICA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gIH07XG59O1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfY3VycnlOID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGUgc3BlY2lmaWVkXG4gKiBhcml0eS4gVGhlIGN1cnJpZWQgZnVuY3Rpb24gaGFzIHR3byB1bnVzdWFsIGNhcGFiaWxpdGllcy4gRmlyc3QsIGl0c1xuICogYXJndW1lbnRzIG5lZWRuJ3QgYmUgcHJvdmlkZWQgb25lIGF0IGEgdGltZS4gSWYgYGdgIGlzIGBSLmN1cnJ5TigzLCBmKWAsIHRoZVxuICogZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxKSgyKSgzKWBcbiAqICAgLSBgZygxKSgyLCAzKWBcbiAqICAgLSBgZygxLCAyKSgzKWBcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqXG4gKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAqIFwiZ2Fwc1wiLCBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsXG4gKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHN1bUFyZ3MgPSAoLi4uYXJncykgPT4gUi5zdW0oYXJncyk7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgc3VtQXJncyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGN1cnJ5TihsZW5ndGgsIGZuKSB7XG4gIGlmIChsZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gIH1cbiAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbn0pO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBjdXJyeU4gPSByZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZVxuICogYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXMgYFIuY3VycnkoZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIGBSLl9fYCBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICogcmVnYXJkbGVzcyBvZiB0aGVpciBwb3NpdGlvbnMuIElmIGBnYCBpcyBhcyBhYm92ZSBhbmQgYF9gIGlzIGBSLl9fYCwgdGhlXG4gKiBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAtIGBnKDEsIDIsIDMpYFxuICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICogICAtIGBnKF8sIF8sIDMpKDEsIDIpYFxuICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICogICAtIGBnKF8sIDIpKF8sIDMpKDEpYFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlOXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFkZEZvdXJOdW1iZXJzID0gKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQ7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGN1cnJ5KGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmbik7XG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAgKi9cbmltcG9ydCB7IGN1cnJ5LCBwaXBlIH0gZnJvbSAncmFtZGEnO1xuXG4vKipcbiAgdHlwZSBWYWxpZGF0aW9uXG4gICAgPSBTdWNjZXNzIGFcbiAgICB8IEZhaWx1cmUgYlxuICovXG5cbmNvbnN0IHR5cGVzID0ge1xuICBKdXN0OiBNYXRoLnJhbmRvbSgpLFxuICBOb3RoaW5nOiBNYXRoLnJhbmRvbSgpLFxufTtcblxuXG5mdW5jdGlvbiBNYXliZSh2YWx1ZSwgdHlwZSkge1xuICAvLyBDaGVjayB0aGF0IGEgdmFsaWQgdHlwZSBpcyBiZWluZyB1c2VkXG4gIGNvbnN0IGlzSnVzdCA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZSA9PT0gdHlwZXMuSnVzdDtcbiAgdGhpcy5pc0p1c3QgPSBpc0p1c3Q7XG4gIHRoaXMuaXNOb3RoaW5nID0gIWlzSnVzdDtcbiAgdGhpcy53aXRoRGVmYXVsdCA9IGRlZmF1bHRWYWwgPT4gKGlzSnVzdCA/IHZhbHVlIDogZGVmYXVsdFZhbCk7XG4gIHRoaXMubWFwID0gZiA9PiAoaXNKdXN0XG4gICAgPyBNYXliZS5vZihmKHZhbHVlKSlcbiAgICA6IE1heWJlLk5vdGhpbmcoKVxuICApO1xuICB0aGlzLmNoYWluID0gZiA9PiB0aGlzLm1hcChmKS53aXRoRGVmYXVsdChNYXliZS5Ob3RoaW5nKCkpO1xufVxuXG4vLyBTdGF0aWMgZnVuY3Rpb25zXG5NYXliZS5KdXN0ID0gdiA9PiBuZXcgTWF5YmUodiwgdHlwZXMuSnVzdCk7XG5NYXliZS5Ob3RoaW5nID0gXyA9PiBuZXcgTWF5YmUobnVsbCwgdHlwZXMuTm90aGluZyk7XG5NYXliZS5vZiA9IE1heWJlLkp1c3Q7IC8vIHRoZSBmdW5jdGlvbiBpdHNlbGYgd2lsbCB0YWtlIGNhcmUgb2YgbnVsbHMgYW5kIHVuZGVmaW5lZHNcblxuTWF5YmUuaXNKdXN0ID0gdiA9PiB2LmlzSnVzdDtcbk1heWJlLmlzTm90aGluZyA9IHYgPT4gdi5pc05vdGhpbmc7XG5NYXliZS53aXRoRGVmYXVsdCA9IGN1cnJ5KChkZWZhdWx0VmFsLCB2KSA9PiB2LndpdGhEZWZhdWx0KGRlZmF1bHRWYWwpKTtcbk1heWJlLm1hcCA9IGN1cnJ5KChmLCB2KSA9PiB2Lm1hcChmKSk7XG5NYXliZS5tYXAyID0gY3VycnkoKGYsIHYxLCB2MikgPT4gKFxuICBNYXliZS5pc0p1c3QodjEpICYmIE1heWJlLmlzSnVzdCh2MilcbiAgPyBNYXliZS5vZihmKFxuICAgICAgTWF5YmUud2l0aERlZmF1bHQobnVsbCwgdjEpLFxuICAgICAgTWF5YmUud2l0aERlZmF1bHQobnVsbCwgdjIpXG4gICAgKSlcbiAgOiBNYXliZS5Ob3RoaW5nKClcbikpO1xuTWF5YmUuY2hhaW4gPSBjdXJyeSgodiwgZikgPT4gdi5jaGFpbihmKSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1heWJlO1xuIiwiLyoqXG5cbiAgVGhpcyB0eXBlIHRha2VzIGNhcmUgb2YgZGF0YSB0aGF0IGlzIGZldGNoZWQgZnJvbSB0aGUgc2VydmVyLlxuICB0eXBlIFJlbW90ZURhdGFcbiAgICA9IE5vdEFza2VkIG51bGxcbiAgICB8IExvYWRpbmcgUmVxdWVzdFxuICAgIHwgRmFpbHVyZSBSZXNwb25zZVxuICAgIHwgU3VjY2VzcyBSZXNwb25zZVxuXG4gKi9cbmltcG9ydCB7IGN1cnJ5IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IE1heWJlIGZyb20gJy4vTWF5YmUnO1xuXG5jb25zdCB0eXBlcyA9IHtcbiAgTm90QXNrZWQ6IE1hdGgucmFuZG9tKCksXG4gIExvYWRpbmc6IE1hdGgucmFuZG9tKCksXG4gIEZhaWx1cmU6IE1hdGgucmFuZG9tKCksXG4gIFN1Y2Nlc3M6IE1hdGgucmFuZG9tKCksXG59O1xuXG5jb25zdCBtYXBJZiA9IGN1cnJ5KChjb25kaXRpb24sIHZhbHVlLCBmKSA9PiAoY29uZGl0aW9uID8gZih2YWx1ZSkgOiB2YWx1ZSkpO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gSU5TVEFOQ0UgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gUmVtb3RlRGF0YSh2YWx1ZSwgdHlwZSkge1xuICBjb25zdCBpc1N1Y2Nlc3MgPSB0eXBlID09PSB0eXBlcy5TdWNjZXNzO1xuICBjb25zdCBpc0ZhaWx1cmUgPSB0eXBlID09PSB0eXBlcy5GYWlsdXJlO1xuICBjb25zdCBpc0xvYWRpbmcgPSB0eXBlID09PSB0eXBlcy5Mb2FkaW5nO1xuICBpZiAoaXNGYWlsdXJlKSB7XG4gICAgY29uc29sZS5sb2coJ0ZhaWxpbmcgd2l0aCByZWFzb246JywgdmFsdWUpO1xuICB9XG5cbiAgdGhpcy5pc1N1Y2Nlc3MgPSBpc1N1Y2Nlc3M7XG4gIHRoaXMuaXNGYWlsdXJlID0gaXNGYWlsdXJlO1xuICB0aGlzLmlzTG9hZGluZyA9IGlzTG9hZGluZztcbiAgdGhpcy5pc05vdEFza2VkID0gdHlwZSA9PT0gdHlwZXMuTm90QXNrZWQ7XG4gIHRoaXMud2l0aERlZmF1bHQgPSBlbHNlVmFsID0+IChpc1N1Y2Nlc3MgPyB2YWx1ZSA6IGVsc2VWYWwpO1xuICB0aGlzLm1hcCA9IGYgPT4gbmV3IFJlbW90ZURhdGEobWFwSWYoaXNTdWNjZXNzLCB2YWx1ZSwgZiksIHR5cGUpO1xuICB0aGlzLm1hcFN1Y2Nlc3MgPSBmID0+IG5ldyBSZW1vdGVEYXRhKG1hcElmKGlzU3VjY2VzcywgdmFsdWUsIGYpLCB0eXBlKTtcbiAgdGhpcy5tYXBMb2FkaW5nID0gZiA9PiBuZXcgUmVtb3RlRGF0YShtYXBJZihpc0xvYWRpbmcsIHZhbHVlLCBmKSwgdHlwZSk7XG4gIHRoaXMubWFwRmFpbHVyZSA9IGYgPT4gbmV3IFJlbW90ZURhdGEobWFwSWYoaXNGYWlsdXJlLCB2YWx1ZSwgZiksIHR5cGUpO1xuICB0aGlzLnRvTWF5YmUgPSBfID0+IChpc1N1Y2Nlc3MgPyBNYXliZS5KdXN0KHZhbHVlKSA6IE1heWJlLk5vdGhpbmcoKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbWF4LWxlbiwgbmV3LWNhcFxuICB0aGlzLl92YWx1ZSA9IHZhbHVlOyAvLyBKVVNUIEZPUiBERUJVR0dJTkcgUFVSUE9TRVMuIERPIE5PVCBVU0Vcbn1cblxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU1RBVElDIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblJlbW90ZURhdGEuTm90QXNrZWQgPSBfID0+IG5ldyBSZW1vdGVEYXRhKG51bGwsIHR5cGVzLk5vdEFza2VkKTtcblJlbW90ZURhdGEuTG9hZGluZyA9IHYgPT4gbmV3IFJlbW90ZURhdGEodiwgdHlwZXMuTG9hZGluZyk7XG5SZW1vdGVEYXRhLkZhaWx1cmUgPSB2ID0+IG5ldyBSZW1vdGVEYXRhKHYsIHR5cGVzLkZhaWx1cmUpO1xuUmVtb3RlRGF0YS5TdWNjZXNzID0gdiA9PiBuZXcgUmVtb3RlRGF0YSh2LCB0eXBlcy5TdWNjZXNzKTtcblxuUmVtb3RlRGF0YS5pc05vdEFza2VkID0gdiA9PiB2LmlzTm90QXNrZWQ7XG5SZW1vdGVEYXRhLmlzTG9hZGluZyA9IHYgPT4gdi5pc0xvYWRpbmc7XG5SZW1vdGVEYXRhLmlzRmFpbHVyZSA9IHYgPT4gdi5pc0ZhaWx1cmU7XG5SZW1vdGVEYXRhLmlzU3VjY2VzcyA9IHYgPT4gdi5pc1N1Y2Nlc3M7XG5SZW1vdGVEYXRhLndpdGhEZWZhdWx0ID0gY3VycnkoKGVsc2VWYWwsIHYpID0+IHYud2l0aERlZmF1bHQoZWxzZVZhbCkpO1xuUmVtb3RlRGF0YS5tYXAgPSBjdXJyeSgoZiwgdikgPT4gdi5tYXAoZikpO1xuUmVtb3RlRGF0YS5tYXBTdWNjZXNzID0gY3VycnkoKGYsIHYpID0+IHYubWFwU3VjY2VzcyhmKSk7XG5SZW1vdGVEYXRhLm1hcExvYWRpbmcgPSBjdXJyeSgoZiwgdikgPT4gdi5tYXBMb2FkaW5nKGYpKTtcblJlbW90ZURhdGEubWFwRmFpbHVyZSA9IGN1cnJ5KChmLCB2KSA9PiB2Lm1hcEZhaWx1cmUoZikpO1xuUmVtb3RlRGF0YS50b01heWJlID0gdiA9PiB2LnRvTWF5YmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlRGF0YTtcbiIsIi8vIEJ1ZyBjaGVja2luZyBmdW5jdGlvbiB0aGF0IHdpbGwgdGhyb3cgYW4gZXJyb3Igd2hlbmV2ZXJcbi8vIHRoZSBjb25kaXRpb24gc2VudCB0byBpdCBpcyBldmFsdWF0ZWQgdG8gZmFsc2Vcbi8qKlxuICogUHJvY2Vzc2VzIHRoZSBtZXNzYWdlIGFuZCBvdXRwdXRzIHRoZSBjb3JyZWN0IG1lc3NhZ2UgaWYgdGhlIGNvbmRpdGlvblxuICogaXMgZmFsc2UuIE90aGVyd2lzZSBpdCBvdXRwdXRzIG51bGwuXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBtZXRob2QgcHJvY2Vzc0NvbmRpdGlvblxuICogQHBhcmFtICB7Qm9vbGVhbn0gY29uZGl0aW9uIC0gUmVzdWx0IG9mIHRoZSBldmFsdWF0ZWQgY29uZGl0aW9uXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGVycm9yTWVzc2FnZSAtIE1lc3NhZ2UgZXhwbGFpbmlnIHRoZSBlcnJvciBpbiBjYXNlIGl0IGlzIHRocm93blxuICogQHJldHVybiB7U3RyaW5nIHwgbnVsbH0gIC0gRXJyb3IgbWVzc2FnZSBpZiB0aGVyZSBpcyBhbiBlcnJvciwgbnVsIG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gcHJvY2Vzc0NvbmRpdGlvbihjb25kaXRpb24sIGVycm9yTWVzc2FnZSkge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBjb21wbGV0ZUVycm9yTWVzc2FnZSA9ICcnO1xuICAgIHZhciByZSA9IC9hdCAoW15cXHNdKylcXHNcXCgvZztcbiAgICB2YXIgc3RhY2tUcmFjZSA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIHZhciBzdGFja0Z1bmN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIGZ1bmNOYW1lID0gcmUuZXhlYyhzdGFja1RyYWNlKTtcbiAgICB3aGlsZSAoZnVuY05hbWUgJiYgZnVuY05hbWVbMV0pIHtcbiAgICAgIHN0YWNrRnVuY3Rpb25zLnB1c2goZnVuY05hbWVbMV0pO1xuICAgICAgZnVuY05hbWUgPSByZS5leGVjKHN0YWNrVHJhY2UpO1xuICAgIH1cblxuICAgIC8vIE51bWJlciAwIGlzIHByb2Nlc3NDb25kaXRpb24gaXRzZWxmLFxuICAgIC8vIE51bWJlciAxIGlzIGFzc2VydCxcbiAgICAvLyBOdW1iZXIgMiBpcyB0aGUgY2FsbGVyIGZ1bmN0aW9uLlxuICAgIGlmIChzdGFja0Z1bmN0aW9uc1syXSkge1xuICAgICAgY29tcGxldGVFcnJvck1lc3NhZ2UgPSBzdGFja0Z1bmN0aW9uc1syXSArICc6ICcgKyBjb21wbGV0ZUVycm9yTWVzc2FnZTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZUVycm9yTWVzc2FnZSArPSBlcnJvck1lc3NhZ2U7XG4gICAgcmV0dXJuIGNvbXBsZXRlRXJyb3JNZXNzYWdlO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBib29sZWFuIHBhc3NlZCB0byBpdCBldmFsdWF0ZXMgdG8gZmFsc2UuXG4gKiBUbyBiZSB1c2VkIGxpa2UgdGhpczpcbiAqIFx0XHRhc3NlcnQobXlEYXRlICE9PSB1bmRlZmluZWQsIFwiRGF0ZSBjYW5ub3QgYmUgdW5kZWZpbmVkLlwiKTtcbiAqIEBhcGkgcHVibGljXG4gKiBAbWV0aG9kIGFzc2VydFxuICogQHBhcmFtICB7Qm9vbGVhbn0gY29uZGl0aW9uIC0gUmVzdWx0IG9mIHRoZSBldmFsdWF0ZWQgY29uZGl0aW9uXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGVycm9yTWVzc2FnZSAtIE1lc3NhZ2UgZXhwbGFpbmlnIHRoZSBlcnJvciBpbiBjYXNlIGl0IGlzIHRocm93blxuICogQHJldHVybiB2b2lkXG4gKi9cbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIGVycm9yTWVzc2FnZSkge1xuICB2YXIgZXJyb3IgPSBwcm9jZXNzQ29uZGl0aW9uKGNvbmRpdGlvbiwgZXJyb3JNZXNzYWdlKTtcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICB9XG59XG5cbi8qKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGJvb2xlYW4gcGFzc2VkIHRvIGl0IGV2YWx1YXRlcyB0byBmYWxzZS5cbiAqIFRvIGJlIHVzZWQgbGlrZSB0aGlzOlxuICogXHRcdGFzc2VydC53YXJuKG15RGF0ZSAhPT0gdW5kZWZpbmVkLCBcIk5vIGRhdGUgcHJvdmlkZWQuXCIpO1xuICogQGFwaSBwdWJsaWNcbiAqIEBtZXRob2Qgd2FyblxuICogQHBhcmFtICB7Qm9vbGVhbn0gY29uZGl0aW9uIC0gUmVzdWx0IG9mIHRoZSBldmFsdWF0ZWQgY29uZGl0aW9uXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGVycm9yTWVzc2FnZSAtIE1lc3NhZ2UgZXhwbGFpbmlnIHRoZSBlcnJvciBpbiBjYXNlIGl0IGlzIHRocm93blxuICogQHJldHVybiB2b2lkXG4gKi9cbmFzc2VydC53YXJuID0gZnVuY3Rpb24gd2Fybihjb25kaXRpb24sIGVycm9yTWVzc2FnZSkge1xuICB2YXIgZXJyb3IgPSBwcm9jZXNzQ29uZGl0aW9uKGNvbmRpdGlvbiwgZXJyb3JNZXNzYWdlKTtcbiAgaWYgKHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NlcnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaUlpd2ljMjkxY21ObGN5STZXeUpoYzNObGNuUXVhbk1pWFN3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5OGdRblZuSUdOb1pXTnJhVzVuSUdaMWJtTjBhVzl1SUhSb1lYUWdkMmxzYkNCMGFISnZkeUJoYmlCbGNuSnZjaUIzYUdWdVpYWmxjbHh1THk4Z2RHaGxJR052Ym1ScGRHbHZiaUJ6Wlc1MElIUnZJR2wwSUdseklHVjJZV3gxWVhSbFpDQjBieUJtWVd4elpWeHVMeW9xWEc0Z0tpQlFjbTlqWlhOelpYTWdkR2hsSUcxbGMzTmhaMlVnWVc1a0lHOTFkSEIxZEhNZ2RHaGxJR052Y25KbFkzUWdiV1Z6YzJGblpTQnBaaUIwYUdVZ1kyOXVaR2wwYVc5dVhHNGdLaUJwY3lCbVlXeHpaUzRnVDNSb1pYSjNhWE5sSUdsMElHOTFkSEIxZEhNZ2JuVnNiQzVjYmlBcUlFQmhjR2tnY0hKcGRtRjBaVnh1SUNvZ1FHMWxkR2h2WkNCd2NtOWpaWE56UTI5dVpHbDBhVzl1WEc0Z0tpQkFjR0Z5WVcwZ0lIdENiMjlzWldGdWZTQmpiMjVrYVhScGIyNGdMU0JTWlhOMWJIUWdiMllnZEdobElHVjJZV3gxWVhSbFpDQmpiMjVrYVhScGIyNWNiaUFxSUVCd1lYSmhiU0FnZTFOMGNtbHVaMzBnWlhKeWIzSk5aWE56WVdkbElDMGdUV1Z6YzJGblpTQmxlSEJzWVdsdWFXY2dkR2hsSUdWeWNtOXlJR2x1SUdOaGMyVWdhWFFnYVhNZ2RHaHliM2R1WEc0Z0tpQkFjbVYwZFhKdUlIdFRkSEpwYm1jZ2ZDQnVkV3hzZlNBZ0xTQkZjbkp2Y2lCdFpYTnpZV2RsSUdsbUlIUm9aWEpsSUdseklHRnVJR1Z5Y205eUxDQnVkV3dnYjNSb1pYSjNhWE5sTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJ3Y205alpYTnpRMjl1WkdsMGFXOXVLR052Ym1ScGRHbHZiaXdnWlhKeWIzSk5aWE56WVdkbEtTQjdYRzRnSUdsbUlDZ2hZMjl1WkdsMGFXOXVLU0I3WEc0Z0lDQWdiR1YwSUdOdmJYQnNaWFJsUlhKeWIzSk5aWE56WVdkbElEMGdKeWM3WEc0Z0lDQWdZMjl1YzNRZ2NtVWdQU0F2WVhRZ0tGdGVYRnh6WFNzcFhGeHpYRndvTDJjN1hHNGdJQ0FnWTI5dWMzUWdjM1JoWTJ0VWNtRmpaU0E5SUc1bGR5QkZjbkp2Y2lncExuTjBZV05yTzF4dUlDQWdJR052Ym5OMElITjBZV05yUm5WdVkzUnBiMjV6SUQwZ1cxMDdYRzVjYmlBZ0lDQnNaWFFnWm5WdVkwNWhiV1VnUFNCeVpTNWxlR1ZqS0hOMFlXTnJWSEpoWTJVcE8xeHVJQ0FnSUhkb2FXeGxJQ2htZFc1alRtRnRaU0FtSmlCbWRXNWpUbUZ0WlZzeFhTa2dlMXh1SUNBZ0lDQWdjM1JoWTJ0R2RXNWpkR2x2Ym5NdWNIVnphQ2htZFc1alRtRnRaVnN4WFNrN1hHNGdJQ0FnSUNCbWRXNWpUbUZ0WlNBOUlISmxMbVY0WldNb2MzUmhZMnRVY21GalpTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ0x5OGdUblZ0WW1WeUlEQWdhWE1nY0hKdlkyVnpjME52Ym1ScGRHbHZiaUJwZEhObGJHWXNYRzRnSUNBZ0x5OGdUblZ0WW1WeUlERWdhWE1nWVhOelpYSjBMRnh1SUNBZ0lDOHZJRTUxYldKbGNpQXlJR2x6SUhSb1pTQmpZV3hzWlhJZ1puVnVZM1JwYjI0dVhHNGdJQ0FnYVdZZ0tITjBZV05yUm5WdVkzUnBiMjV6V3pKZEtTQjdYRzRnSUNBZ0lDQmpiMjF3YkdWMFpVVnljbTl5VFdWemMyRm5aU0E5SUdBa2UzTjBZV05yUm5WdVkzUnBiMjV6V3pKZGZUb2dKSHRqYjIxd2JHVjBaVVZ5Y205eVRXVnpjMkZuWlgxZ08xeHVJQ0FnSUgxY2JseHVJQ0FnSUdOdmJYQnNaWFJsUlhKeWIzSk5aWE56WVdkbElDczlJR1Z5Y205eVRXVnpjMkZuWlR0Y2JpQWdJQ0J5WlhSMWNtNGdZMjl0Y0d4bGRHVkZjbkp2Y2sxbGMzTmhaMlU3WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnYm5Wc2JEdGNibjFjYmx4dUx5b3FYRzRnS2lCVWFISnZkM01nWVc0Z1pYSnliM0lnYVdZZ2RHaGxJR0p2YjJ4bFlXNGdjR0Z6YzJWa0lIUnZJR2wwSUdWMllXeDFZWFJsY3lCMGJ5Qm1ZV3h6WlM1Y2JpQXFJRlJ2SUdKbElIVnpaV1FnYkdsclpTQjBhR2x6T2x4dUlDb2dYSFJjZEdGemMyVnlkQ2h0ZVVSaGRHVWdJVDA5SUhWdVpHVm1hVzVsWkN3Z1hDSkVZWFJsSUdOaGJtNXZkQ0JpWlNCMWJtUmxabWx1WldRdVhDSXBPMXh1SUNvZ1FHRndhU0J3ZFdKc2FXTmNiaUFxSUVCdFpYUm9iMlFnWVhOelpYSjBYRzRnS2lCQWNHRnlZVzBnSUh0Q2IyOXNaV0Z1ZlNCamIyNWthWFJwYjI0Z0xTQlNaWE4xYkhRZ2IyWWdkR2hsSUdWMllXeDFZWFJsWkNCamIyNWthWFJwYjI1Y2JpQXFJRUJ3WVhKaGJTQWdlMU4wY21sdVozMGdaWEp5YjNKTlpYTnpZV2RsSUMwZ1RXVnpjMkZuWlNCbGVIQnNZV2x1YVdjZ2RHaGxJR1Z5Y205eUlHbHVJR05oYzJVZ2FYUWdhWE1nZEdoeWIzZHVYRzRnS2lCQWNtVjBkWEp1SUhadmFXUmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1lYTnpaWEowS0dOdmJtUnBkR2x2Yml3Z1pYSnliM0pOWlhOellXZGxLU0I3WEc0Z0lHTnZibk4wSUdWeWNtOXlJRDBnY0hKdlkyVnpjME52Ym1ScGRHbHZiaWhqYjI1a2FYUnBiMjRzSUdWeWNtOXlUV1Z6YzJGblpTazdYRzRnSUdsbUlDaDBlWEJsYjJZZ1pYSnliM0lnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0dWeWNtOXlLVHRjYmlBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxSUV4dlozTWdZU0IzWVhKdWFXNW5JR2xtSUhSb1pTQmliMjlzWldGdUlIQmhjM05sWkNCMGJ5QnBkQ0JsZG1Gc2RXRjBaWE1nZEc4Z1ptRnNjMlV1WEc0Z0tpQlVieUJpWlNCMWMyVmtJR3hwYTJVZ2RHaHBjenBjYmlBcUlGeDBYSFJoYzNObGNuUXVkMkZ5YmlodGVVUmhkR1VnSVQwOUlIVnVaR1ZtYVc1bFpDd2dYQ0pPYnlCa1lYUmxJSEJ5YjNacFpHVmtMbHdpS1R0Y2JpQXFJRUJoY0drZ2NIVmliR2xqWEc0Z0tpQkFiV1YwYUc5a0lIZGhjbTVjYmlBcUlFQndZWEpoYlNBZ2UwSnZiMnhsWVc1OUlHTnZibVJwZEdsdmJpQXRJRkpsYzNWc2RDQnZaaUIwYUdVZ1pYWmhiSFZoZEdWa0lHTnZibVJwZEdsdmJseHVJQ29nUUhCaGNtRnRJQ0I3VTNSeWFXNW5mU0JsY25KdmNrMWxjM05oWjJVZ0xTQk5aWE56WVdkbElHVjRjR3hoYVc1cFp5QjBhR1VnWlhKeWIzSWdhVzRnWTJGelpTQnBkQ0JwY3lCMGFISnZkMjVjYmlBcUlFQnlaWFIxY200Z2RtOXBaRnh1SUNvdlhHNWhjM05sY25RdWQyRnliaUE5SUdaMWJtTjBhVzl1SUhkaGNtNG9ZMjl1WkdsMGFXOXVMQ0JsY25KdmNrMWxjM05oWjJVcElIdGNiaUFnWTI5dWMzUWdaWEp5YjNJZ1BTQndjbTlqWlhOelEyOXVaR2wwYVc5dUtHTnZibVJwZEdsdmJpd2daWEp5YjNKTlpYTnpZV2RsS1R0Y2JpQWdhV1lnS0hSNWNHVnZaaUJsY25KdmNpQTlQVDBnSjNOMGNtbHVaeWNwSUh0Y2JpQWdJQ0JqYjI1emIyeGxMbmRoY200b1pYSnliM0lwTzF4dUlDQjlYRzU5TzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCaGMzTmxjblE3WEc0aVhTd2labWxzWlNJNkltRnpjMlZ5ZEM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJdmMyOTFjbU5sTHlKOVxuIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2ZsLWFzc2VydCc7XG5cbi8qKlxuICB0eXBlIFZhbGlkYXRpb25cbiAgICA9IFN1Y2Nlc3MgYVxuICAgIHwgRmFpbHVyZSBiXG4gKi9cblxuY29uc3QgdHlwZXMgPSB7XG4gIFN1Y2Nlc3M6IE1hdGgucmFuZG9tKCksXG4gIEZhaWx1cmU6IE1hdGgucmFuZG9tKCksXG59O1xuXG5jb25zdCBtYXBJZiA9IGN1cnJ5KChjb25kaXRpb24sIHZhbHVlLCBmKSA9PiAoY29uZGl0aW9uID8gZih2YWx1ZSkgOiB2YWx1ZSkpO1xuXG4vLyBUaGlzIGZ1bmN0aW9uIHNob3VsZCBuZXZlciBiZSBjYWxsZWQgYnkgYW55b25lIG90aGVyIHRoYW4gdGhpcyBmaWxlLlxuZnVuY3Rpb24gVmFsaWRhdGlvbih2YWx1ZSwgdHlwZSkge1xuICAvLyBDaGVjayB0aGF0IGEgdmFsaWQgdHlwZSBpcyBiZWluZyB1c2VkXG4gIGNvbnN0IGlzU3VjY2VzcyA9IHR5cGUgPT09IHR5cGVzLlN1Y2Nlc3M7XG5cbiAgdGhpcy5pc1N1Y2Nlc3MgPSBpc1N1Y2Nlc3M7XG4gIHRoaXMuaXNGYWlsdXJlID0gIWlzU3VjY2VzcztcbiAgdGhpcy53aXRoRGVmYXVsdCA9IGRlZmF1bHRWYWwgPT4gKGlzU3VjY2VzcyA/IHZhbHVlIDogZGVmYXVsdFZhbCk7XG4gIHRoaXMubWFwID0gZiA9PiBuZXcgVmFsaWRhdGlvbihtYXBJZihpc1N1Y2Nlc3MsIHZhbHVlLCBmKSwgdHlwZSk7XG4gIHRoaXMubWFwU3VjY2VzcyA9IGYgPT4gbmV3IFZhbGlkYXRpb24obWFwSWYoaXNTdWNjZXNzLCB2YWx1ZSwgZiksIHR5cGUpO1xuICB0aGlzLm1hcEZhaWx1cmUgPSBmID0+IG5ldyBWYWxpZGF0aW9uKG1hcElmKCFpc1N1Y2Nlc3MsIHZhbHVlLCBmKSwgdHlwZSk7XG4gIHRoaXMudGhyb3dGYWlsdXJlID0gXyA9PiAoIWlzU3VjY2Vzc1xuICAgID8gYXNzZXJ0KGZhbHNlLCB2YWx1ZSlcbiAgICA6IHRoaXNcbiAgKTtcbiAgdGhpcy5hbmRUaGVuID0gZiA9PiB7XG4gICAgaWYgKCFpc1N1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNvbnN0IHZhbCA9IGYodmFsdWUpO1xuICAgIGFzc2VydChcbiAgICAgIHZhbCBpbnN0YW5jZW9mIFZhbGlkYXRpb24sXG4gICAgICAnVmFsdWUgcmV0dXJuZWQgYnkgVmFsaWRhdGlvbi5hbmRUaGVuIGlzIG5vdCBvZiB0eXBlIFZhbGlkYXRpb24nXG4gICAgKTtcbiAgICByZXR1cm4gdmFsO1xuICB9O1xuICAvLyBWYWxpZGF0aW9uIC0+IFZhbGlkYXRpb25cbiAgdGhpcy5jaGFpbiA9IHYgPT4ge1xuICAgIGlmICghaXNTdWNjZXNzKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICBhc3NlcnQoXG4gICAgICB2IGluc3RhbmNlb2YgVmFsaWRhdGlvbixcbiAgICAgICdWYWx1ZSBwYXNzZWQgdG8gVmFsaWRhdGlvbi5jaGFpbiBpcyBub3Qgb2YgdHlwZSBWYWxpZGF0aW9uJ1xuICAgICk7XG5cbiAgICByZXR1cm4gdjtcbiAgfTtcbiAgLy8gSlVTVCBGT1IgREVCVUdHSU5HIFBVUlBPU0VTLiBETyBOT1QgVVNFXG4gIHRoaXMuX3ZhbHVlID0gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbn1cblxuLy8gU3RhdGljIGZ1bmN0aW9uc1xuVmFsaWRhdGlvbi5TdWNjZXNzID0gdiA9PiBuZXcgVmFsaWRhdGlvbih2LCB0eXBlcy5TdWNjZXNzKTtcblZhbGlkYXRpb24uRmFpbHVyZSA9IHYgPT4gbmV3IFZhbGlkYXRpb24odiwgdHlwZXMuRmFpbHVyZSk7XG5cblZhbGlkYXRpb24uaXNTdWNjZXNzID0gdiA9PiB2LmlzU3VjY2VzcztcblZhbGlkYXRpb24uaXNGYWlsdXJlID0gdiA9PiB2LmlzRmFpbHVyZTtcblZhbGlkYXRpb24ud2l0aERlZmF1bHQgPSBjdXJyeSgoZGVmYXVsdFZhbCwgdikgPT4gdi53aXRoRGVmYXVsdChkZWZhdWx0VmFsKSk7XG5WYWxpZGF0aW9uLm1hcCA9IGN1cnJ5KChmLCB2KSA9PiB2Lm1hcChmKSk7XG5WYWxpZGF0aW9uLm1hcFN1Y2Nlc3MgPSBjdXJyeSgoZiwgdikgPT4gdi5tYXBTdWNjZXNzKGYpKTtcblZhbGlkYXRpb24ubWFwRmFpbHVyZSA9IGN1cnJ5KChmLCB2KSA9PiB2Lm1hcEZhaWx1cmUoZikpO1xuVmFsaWRhdGlvbi50aHJvd0ZhaWx1cmUgPSB2ID0+IHYudGhyb3dGYWlsdXJlKCk7XG5WYWxpZGF0aW9uLmFuZFRoZW4gPSBjdXJyeSgoZiwgdikgPT4gdi5hbmRUaGVuKGYpKTtcblZhbGlkYXRpb24uY2hhaW4gPSBjdXJyeSgodjEsIHYyKSA9PiB2MS5jaGFpbih2MikpO1xuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0aW9uO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHggVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGlzIGB1bmRlZmluZWRgIG9yIGBudWxsYCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pc05pbChudWxsKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNOaWwodW5kZWZpbmVkKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXNOaWwoMCk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc05pbChbXSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIGlzTmlsKHgpIHsgcmV0dXJuIHggPT0gbnVsbDsgfSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9waXBlKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBnLmNhbGwodGhpcywgZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn07XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vX2N1cnJ5MScpO1xudmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfaXNQbGFjZWhvbGRlciA9IHJlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCB0aHJlZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2N1cnJ5Myhmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjMoYSwgYiwgYykge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gZjM7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSA/IGYzXG4gICAgICAgICAgICAgOiBfY3VycnkyKGZ1bmN0aW9uKF9iLCBfYykgeyByZXR1cm4gZm4oYSwgX2IsIF9jKTsgfSk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSA/IGYzXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2EsIF9jKSB7IHJldHVybiBmbihfYSwgYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkyKGZ1bmN0aW9uKF9iLCBfYykgeyByZXR1cm4gZm4oYSwgX2IsIF9jKTsgfSlcbiAgICAgICAgICAgICA6IF9jdXJyeTEoZnVuY3Rpb24oX2MpIHsgcmV0dXJuIGZuKGEsIGIsIF9jKTsgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgJiYgX2lzUGxhY2Vob2xkZXIoYykgPyBmM1xuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkyKGZ1bmN0aW9uKF9hLCBfYikgeyByZXR1cm4gZm4oX2EsIF9iLCBjKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MihmdW5jdGlvbihfYSwgX2MpIHsgcmV0dXJuIGZuKF9hLCBiLCBfYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihiKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTIoZnVuY3Rpb24oX2IsIF9jKSB7IHJldHVybiBmbihhLCBfYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkxKGZ1bmN0aW9uKF9hKSB7IHJldHVybiBmbihfYSwgYiwgYyk7IH0pXG4gICAgICAgICAgICAgOiBfaXNQbGFjZWhvbGRlcihiKSA/IF9jdXJyeTEoZnVuY3Rpb24oX2IpIHsgcmV0dXJuIGZuKGEsIF9iLCBjKTsgfSlcbiAgICAgICAgICAgICA6IF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MShmdW5jdGlvbihfYykgeyByZXR1cm4gZm4oYSwgYiwgX2MpOyB9KVxuICAgICAgICAgICAgIDogZm4oYSwgYiwgYyk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYV3JhcChmbikge1xuICAgIHRoaXMuZiA9IGZuO1xuICB9XG4gIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdCBub3QgaW1wbGVtZW50ZWQgb24gWFdyYXAnKTtcbiAgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihhY2MpIHsgcmV0dXJuIGFjYzsgfTtcbiAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24oYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBfeHdyYXAoZm4pIHsgcmV0dXJuIG5ldyBYV3JhcChmbik7IH07XG59KCkpO1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgYm91bmQgdG8gYSBjb250ZXh0LlxuICogTm90ZTogYFIuYmluZGAgZG9lcyBub3QgcHJvdmlkZSB0aGUgYWRkaXRpb25hbCBhcmd1bWVudC1iaW5kaW5nIGNhcGFiaWxpdGllcyBvZlxuICogW0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9GdW5jdGlvbi9iaW5kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyAoKiAtPiAqKSAtPiB7Kn0gLT4gKCogLT4gKilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzT2JqIFRoZSBjb250ZXh0IHRvIGJpbmQgYGZuYCB0b1xuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIGV4ZWN1dGUgaW4gdGhlIGNvbnRleHQgb2YgYHRoaXNPYmpgLlxuICogQHNlZSBSLnBhcnRpYWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbG9nID0gUi5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAqICAgICAgUi5waXBlKFIuYXNzb2MoJ2EnLCAyKSwgUi50YXAobG9nKSwgUi5hc3NvYygnYScsIDMpKSh7YTogMX0pOyAvLz0+IHthOiAzfVxuICogICAgICAvLyBsb2dzIHthOiAyfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gYmluZChmbiwgdGhpc09iaikge1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNPYmosIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG4iLCIvKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGB2YWxgIGlzIGFuIGFycmF5LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheShbXSk7IC8vPT4gdHJ1ZVxuICogICAgICBfaXNBcnJheShudWxsKTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheSh7fSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICByZXR1cm4gKHZhbCAhPSBudWxsICYmXG4gICAgICAgICAgdmFsLmxlbmd0aCA+PSAwICYmXG4gICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XScpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzU3RyaW5nKHgpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJyYXknKTtcbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1N0cmluZycpO1xuXG5cbi8qKlxuICogVGVzdHMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGlzIHNpbWlsYXIgdG8gYW4gYXJyYXkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHggVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGB4YCBoYXMgYSBudW1lcmljIGxlbmd0aCBwcm9wZXJ0eSBhbmQgZXh0cmVtZSBpbmRpY2VzIGRlZmluZWQ7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaXNBcnJheUxpa2UoW10pOyAvLz0+IHRydWVcbiAqICAgICAgUi5pc0FycmF5TGlrZSh0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlzQXJyYXlMaWtlKHt9KTsgLy89PiBmYWxzZVxuICogICAgICBSLmlzQXJyYXlMaWtlKHtsZW5ndGg6IDEwfSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pc0FycmF5TGlrZSh7MDogJ3plcm8nLCA5OiAnbmluZScsIGxlbmd0aDogMTB9KTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gIGlmIChfaXNBcnJheSh4KSkgeyByZXR1cm4gdHJ1ZTsgfVxuICBpZiAoIXgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChfaXNTdHJpbmcoeCkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICh4Lm5vZGVUeXBlID09PSAxKSB7IHJldHVybiAhIXgubGVuZ3RoOyB9XG4gIGlmICh4Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxuICBpZiAoeC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pO1xuIiwidmFyIF94d3JhcCA9IHJlcXVpcmUoJy4vX3h3cmFwJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2JpbmQnKTtcbnZhciBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2lzQXJyYXlMaWtlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgbGlzdFtpZHhdKTtcbiAgICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gIH1cblxuICBmdW5jdGlvbiBfaXRlcmFibGVSZWR1Y2UoeGYsIGFjYywgaXRlcikge1xuICAgIHZhciBzdGVwID0gaXRlci5uZXh0KCk7XG4gICAgd2hpbGUgKCFzdGVwLmRvbmUpIHtcbiAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgICBhY2MgPSBhY2NbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oYWNjKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9tZXRob2RSZWR1Y2UoeGYsIGFjYywgb2JqKSB7XG4gICAgcmV0dXJuIHhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ob2JqLnJlZHVjZShiaW5kKHhmWydAQHRyYW5zZHVjZXIvc3RlcCddLCB4ZiksIGFjYykpO1xuICB9XG5cbiAgdmFyIHN5bUl0ZXJhdG9yID0gKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnKSA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJztcbiAgcmV0dXJuIGZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZuID0gX3h3cmFwKGZuKTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXlMaWtlKGxpc3QpKSB7XG4gICAgICByZXR1cm4gX2FycmF5UmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxpc3QucmVkdWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0KTtcbiAgICB9XG4gICAgaWYgKGxpc3Rbc3ltSXRlcmF0b3JdICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdC5uZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gX2l0ZXJhYmxlUmVkdWNlKGZuLCBhY2MsIGxpc3QpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xuICB9O1xufSgpKTtcbiIsInZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIHNpbmdsZSBpdGVtIGJ5IGl0ZXJhdGluZyB0aHJvdWdoIHRoZSBsaXN0LCBzdWNjZXNzaXZlbHkgY2FsbGluZ1xuICogdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudFxuICogdmFsdWUgZnJvbSB0aGUgYXJyYXksIGFuZCB0aGVuIHBhc3NpbmcgdGhlIHJlc3VsdCB0byB0aGUgbmV4dCBjYWxsLlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKi4gSXQgbWF5IHVzZVxuICogYFIucmVkdWNlZGAgdG8gc2hvcnRjdXQgdGhlIGl0ZXJhdGlvbi5cbiAqXG4gKiBOb3RlOiBgUi5yZWR1Y2VgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZVxuICogYXJyYXlzKSwgdW5saWtlIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlsc1xuICogb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlI0Rlc2NyaXB0aW9uXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHJlZHVjZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGUgYWNjdW11bGF0b3IgYW5kIHRoZVxuICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5yZWR1Y2VkLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG51bWJlcnMgPSBbMSwgMiwgM107XG4gKiAgICAgIHZhciBwbHVzID0gKGEsIGIpID0+IGEgKyBiO1xuICpcbiAqICAgICAgUi5yZWR1Y2UocGx1cywgMTAsIG51bWJlcnMpOyAvLz0+IDE2XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhfcmVkdWNlKTtcbiIsIi8qKlxuICogQW4gb3B0aW1pemVkLCBwcml2YXRlIGFycmF5IGBzbGljZWAgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJndW1lbnRzfEFycmF5fSBhcmdzIFRoZSBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0IHRvIGNvbnNpZGVyLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtmcm9tPTBdIFRoZSBhcnJheSBpbmRleCB0byBzbGljZSBmcm9tLCBpbmNsdXNpdmUuXG4gKiBAcGFyYW0ge051bWJlcn0gW3RvPWFyZ3MubGVuZ3RoXSBUaGUgYXJyYXkgaW5kZXggdG8gc2xpY2UgdG8sIGV4Y2x1c2l2ZS5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldywgc2xpY2VkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9zbGljZShbMSwgMiwgMywgNCwgNV0sIDEsIDMpOyAvLz0+IFsyLCAzXVxuICpcbiAqICAgICAgdmFyIGZpcnN0VGhyZWVBcmdzID0gZnVuY3Rpb24oYSwgYiwgYywgZCkge1xuICogICAgICAgIHJldHVybiBfc2xpY2UoYXJndW1lbnRzLCAwLCAzKTtcbiAqICAgICAgfTtcbiAqICAgICAgZmlyc3RUaHJlZUFyZ3MoMSwgMiwgMywgNCk7IC8vPT4gWzEsIDIsIDNdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX3NsaWNlKGFyZ3MsIGZyb20sIHRvKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIF9zbGljZShhcmdzLCAwLCBhcmdzLmxlbmd0aCk7XG4gICAgY2FzZSAyOiByZXR1cm4gX3NsaWNlKGFyZ3MsIGZyb20sIGFyZ3MubGVuZ3RoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgIHZhciBpZHggPSAwO1xuICAgICAgdmFyIGxlbiA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFyZ3MubGVuZ3RoLCB0bykgLSBmcm9tKTtcbiAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgbGlzdFtpZHhdID0gYXJnc1tmcm9tICsgaWR4XTtcbiAgICAgICAgaWR4ICs9IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgfVxufTtcbiIsInZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzQXJyYXknKTtcbnZhciBfc2xpY2UgPSByZXF1aXJlKCcuL19zbGljZScpO1xuXG5cbi8qKlxuICogU2ltaWxhciB0byBoYXNNZXRob2QsIHRoaXMgY2hlY2tzIHdoZXRoZXIgYSBmdW5jdGlvbiBoYXMgYSBbbWV0aG9kbmFtZV1cbiAqIGZ1bmN0aW9uLiBJZiBpdCBpc24ndCBhbiBhcnJheSBpdCB3aWxsIGV4ZWN1dGUgdGhhdCBmdW5jdGlvbiBvdGhlcndpc2UgaXRcbiAqIHdpbGwgZGVmYXVsdCB0byB0aGUgcmFtZGEgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZG5hbWUgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IFdoYXRldmVyIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIG1ldGhvZCBpcy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY2hlY2tGb3JNZXRob2QobWV0aG9kbmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2xlbmd0aCAtIDFdO1xuICAgIHJldHVybiAoX2lzQXJyYXkob2JqKSB8fCB0eXBlb2Ygb2JqW21ldGhvZG5hbWVdICE9PSAnZnVuY3Rpb24nKSA/XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDpcbiAgICAgIG9ialttZXRob2RuYW1lXS5hcHBseShvYmosIF9zbGljZShhcmd1bWVudHMsIDAsIGxlbmd0aCAtIDEpKTtcbiAgfTtcbn07XG4iLCJ2YXIgX2NoZWNrRm9yTWV0aG9kID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QnKTtcbnZhciBfY3VycnkzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdCB3aXRoIGEgYHNsaWNlYFxuICogbWV0aG9kKSBmcm9tIGBmcm9tSW5kZXhgIChpbmNsdXNpdmUpIHRvIGB0b0luZGV4YCAoZXhjbHVzaXZlKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgc2xpY2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4IFRoZSBzdGFydCBpbmRleCAoaW5jbHVzaXZlKS5cbiAqIEBwYXJhbSB7TnVtYmVyfSB0b0luZGV4IFRoZSBlbmQgaW5kZXggKGV4Y2x1c2l2ZSkuXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zbGljZSgxLCAzLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgxLCBJbmZpbml0eSwgWydhJywgJ2InLCAnYycsICdkJ10pOyAvLz0+IFsnYicsICdjJywgJ2QnXVxuICogICAgICBSLnNsaWNlKDAsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgIC8vPT4gWydhJywgJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoLTMsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgLy89PiBbJ2InLCAnYyddXG4gKiAgICAgIFIuc2xpY2UoMCwgMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgICAgICAgLy89PiAncmFtJ1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoX2NoZWNrRm9yTWV0aG9kKCdzbGljZScsIGZ1bmN0aW9uIHNsaWNlKGZyb21JbmRleCwgdG9JbmRleCwgbGlzdCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobGlzdCwgZnJvbUluZGV4LCB0b0luZGV4KTtcbn0pKTtcbiIsInZhciBfY2hlY2tGb3JNZXRob2QgPSByZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xudmFyIHNsaWNlID0gcmVxdWlyZSgnLi9zbGljZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhbGwgYnV0IHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0XG4gKiB3aXRoIGEgYHRhaWxgIG1ldGhvZCkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNsaWNlYCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuaGVhZCwgUi5pbml0LCBSLmxhc3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRhaWwoWzEsIDIsIDNdKTsgIC8vPT4gWzIsIDNdXG4gKiAgICAgIFIudGFpbChbMSwgMl0pOyAgICAgLy89PiBbMl1cbiAqICAgICAgUi50YWlsKFsxXSk7ICAgICAgICAvLz0+IFtdXG4gKiAgICAgIFIudGFpbChbXSk7ICAgICAgICAgLy89PiBbXVxuICpcbiAqICAgICAgUi50YWlsKCdhYmMnKTsgIC8vPT4gJ2JjJ1xuICogICAgICBSLnRhaWwoJ2FiJyk7ICAgLy89PiAnYidcbiAqICAgICAgUi50YWlsKCdhJyk7ICAgIC8vPT4gJydcbiAqICAgICAgUi50YWlsKCcnKTsgICAgIC8vPT4gJydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY2hlY2tGb3JNZXRob2QoJ3RhaWwnLCBzbGljZSgxLCBJbmZpbml0eSkpO1xuIiwidmFyIF9hcml0eSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG52YXIgX3BpcGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19waXBlJyk7XG52YXIgcmVkdWNlID0gcmVxdWlyZSgnLi9yZWR1Y2UnKTtcbnZhciB0YWlsID0gcmVxdWlyZSgnLi90YWlsJyk7XG5cblxuLyoqXG4gKiBQZXJmb3JtcyBsZWZ0LXRvLXJpZ2h0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLiBUaGUgbGVmdG1vc3QgZnVuY3Rpb24gbWF5IGhhdmVcbiAqIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAqXG4gKiBJbiBzb21lIGxpYnJhcmllcyB0aGlzIGZ1bmN0aW9uIGlzIG5hbWVkIGBzZXF1ZW5jZWAuXG4gKlxuICogKipOb3RlOioqIFRoZSByZXN1bHQgb2YgcGlwZSBpcyBub3QgYXV0b21hdGljYWxseSBjdXJyaWVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoKGEsIGIsIC4uLiwgbikgLT4gbyksIChvIC0+IHApLCAuLi4sICh4IC0+IHkpLCAoeSAtPiB6KSkgLT4gKChhLCBiLCAuLi4sIG4pIC0+IHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jdGlvbnNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLmNvbXBvc2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZiA9IFIucGlwZShNYXRoLnBvdywgUi5uZWdhdGUsIFIuaW5jKTtcbiAqXG4gKiAgICAgIGYoMywgNCk7IC8vIC0oM140KSArIDFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwaXBlKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGlwZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGFyZ3VtZW50c1swXS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcmVkdWNlKF9waXBlLCBhcmd1bWVudHNbMF0sIHRhaWwoYXJndW1lbnRzKSkpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAgKi9cbmltcG9ydCBWYWxpZGF0aW9uIGZyb20gJy4vVmFsaWRhdGlvbic7XG5pbXBvcnQgTWF5YmUgZnJvbSAnLi9NYXliZSc7XG5pbXBvcnQgeyBjdXJyeSwgcGlwZSwgaXNOaWwgfSBmcm9tICdyYW1kYSc7XG5cbmV4cG9ydCBjb25zdCBlcnJNc2cgPSBjdXJyeSgocHJvcCwgZXJyb3JNZXNzYWdlKSA9PlxuICBgSW52YWxpZCBwcm9wZXJ0eSB2YWx1ZSBmb3IgJHtwcm9wfS4gJHtlcnJvck1lc3NhZ2V9YFxuKTtcblxuLy8gQWxsIHR5cGUgY2hlY2tzIHJldHVybiBhIFZhbGlkYXRpb24gb2JqZWN0LlxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gIEdlbmVyYWwgVHlwZSBjaGVja2Vyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgY29uc3QgaW50ID0gdiA9PiAoXG4gIHR5cGVvZiB2ID09PSAnbnVtYmVyJyAmJiAodiAlIDEpID09PSAwXG4gICAgPyBWYWxpZGF0aW9uLlN1Y2Nlc3ModilcbiAgICA6IFZhbGlkYXRpb24uRmFpbHVyZShgJHt2fSBpcyBub3QgYW4gaW50ZWdlcmApXG4pO1xuXG5leHBvcnQgY29uc3QgZmxvYXQgPSB2ID0+IChcbiAgdHlwZW9mIHYgPT09ICdudW1iZXInXG4gICAgPyBWYWxpZGF0aW9uLlN1Y2Nlc3ModilcbiAgICA6IFZhbGlkYXRpb24uRmFpbHVyZShgJHt2fSBpcyBub3QgYSBmbG9hdGApXG4pO1xuXG5leHBvcnQgY29uc3Qgc3RyaW5nID0gdiA9PiAoXG4gIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuICAgID8gVmFsaWRhdGlvbi5TdWNjZXNzKHYpXG4gICAgOiBWYWxpZGF0aW9uLkZhaWx1cmUoYCR7dn0gaXMgbm90IGEgc3RyaW5nYClcbik7XG5cbmV4cG9ydCBjb25zdCBib29sID0gdiA9PiAoXG4gIHR5cGVvZiB2ID09PSAnYm9vbGVhbidcbiAgICA/IFZhbGlkYXRpb24uU3VjY2Vzcyh2KVxuICAgIDogVmFsaWRhdGlvbi5GYWlsdXJlKGAke3Z9IGlzIG5vdCBhIGJvb2xlYW5gKVxuKTtcblxuZXhwb3J0IGNvbnN0IG51bGxUeXBlID0gdiA9PiAoXG4gIHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2ID09PSBudWxsXG4gICAgPyBWYWxpZGF0aW9uLlN1Y2Nlc3ModilcbiAgICA6IFZhbGlkYXRpb24uRmFpbHVyZShgJHt2fSBpcyBub3QgbnVsbGApXG4pO1xuXG5leHBvcnQgY29uc3QgYXJyYXkgPSBjdXJyeSgoc3ViVHlwZSwgdikgPT4ge1xuICBpZiAodiBpbnN0YW5jZW9mIFZhbGlkYXRpb24pIHtcbiAgICByZXR1cm4gVmFsaWRhdGlvbi5hbmRUaGVuKGFycmF5LCB2KTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheSh2KSkge1xuICAgIHJldHVybiBWYWxpZGF0aW9uLkZhaWx1cmUoYCR7dn0gaXMgbm90IGFuIGFycmF5YCk7XG4gIH1cblxuICBjb25zdCBzdWJUeXBlc1ZhbGlkYXRpb24gPSB2XG4gICAgLm1hcChzdWJUeXBlKVxuICAgIC5yZWR1Y2UoVmFsaWRhdGlvbi5jaGFpbiwgVmFsaWRhdGlvbi5TdWNjZXNzKHYpKTtcblxuICBpZiAoVmFsaWRhdGlvbi5pc1N1Y2Nlc3Moc3ViVHlwZXNWYWxpZGF0aW9uKSkge1xuICAgIHJldHVybiBWYWxpZGF0aW9uLlN1Y2Nlc3Modik7XG4gIH1cbiAgcmV0dXJuIFZhbGlkYXRpb24ubWFwRmFpbHVyZShlcnJNc2coJ2FycmF5JyksIHN1YlR5cGVzVmFsaWRhdGlvbik7XG59KTtcblxuZXhwb3J0IGNvbnN0IGRhdGUgPSB2ID0+IChcbiAgdiAhPT0gdW5kZWZpbmVkICYmIHYgaW5zdGFuY2VvZiBEYXRlXG4gICAgPyBWYWxpZGF0aW9uLlN1Y2Nlc3ModilcbiAgICA6IFZhbGlkYXRpb24uRmFpbHVyZShgJHt2fSBpcyBub3QgYSBEYXRlYClcbik7XG5cbmV4cG9ydCBjb25zdCBudWxsYWJsZSA9IGN1cnJ5KChzdWJUeXBlLCB2KSA9PiAoXG4gICB2ID09PSBudWxsXG4gICA/IFZhbGlkYXRpb24uU3VjY2Vzcyh2KVxuICAgOiBzdWJUeXBlKHYpXG4pKTtcblxuZXhwb3J0IGNvbnN0IG1heWJlID0gY3VycnkoKHN1YlR5cGUsIHYpID0+IChcbiAgdHlwZW9mIHYgPT09ICdvYmplY3QnICYmIFZhbGlkYXRpb24uaXNTdWNjZXNzKGJvb2wodi5pc05vdGhpbmcpKVxuICAgID8gcGlwZShcbiAgICAgICAgTWF5YmUubWFwKHN1YlR5cGUpLFxuICAgICAgICBNYXliZS5tYXAoVmFsaWRhdGlvbi5tYXAoXyA9PiBWYWxpZGF0aW9uLlN1Y2Nlc3ModikpKSxcbiAgICAgICAgTWF5YmUud2l0aERlZmF1bHQoVmFsaWRhdGlvbi5TdWNjZXNzKHYpKSxcbiAgICAgICkodilcbiAgICA6IFZhbGlkYXRpb24uRmFpbHVyZShgJHt2fSBpcyBub3Qgb2YgdHlwZSBNYXliZWApXG4pKTtcblxuZXhwb3J0IGNvbnN0IHJlbW90ZURhdGEgPSB2ID0+IChcbiAgdHlwZW9mIHYgPT09ICdvYmplY3QnICYmIFZhbGlkYXRpb24uaXNTdWNjZXNzKGJvb2wodi5pc05vdEFza2VkKSlcbiAgICA/IFZhbGlkYXRpb24uU3VjY2Vzcyh2KVxuICAgIDogVmFsaWRhdGlvbi5GYWlsdXJlKGAke3Z9IGlzIG5vdCBvZiB0eXBlIFJlbW90ZURhdGEuYClcbik7XG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0ID0gdiA9PiAoXG4gIHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2IGluc3RhbmNlb2YgUmVxdWVzdFxuICAgID8gVmFsaWRhdGlvbi5TdWNjZXNzKHYpXG4gICAgOiBWYWxpZGF0aW9uLkZhaWx1cmUoYCR7dn0gaXMgbm90IG9mIHR5cGUgUmVxdWVzdC5gKVxuKTtcblxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlID0gdiA9PiAoXG4gIHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2IGluc3RhbmNlb2YgUmVzcG9uc2VcbiAgICA/IFZhbGlkYXRpb24uU3VjY2Vzcyh2KVxuICAgIDogVmFsaWRhdGlvbi5GYWlsdXJlKGAke3Z9IGlzIG5vdCBvZiB0eXBlIFJlc3BvbnNlLmApXG4pO1xuXG5jb25zdCBoYXZlU2FtZUtleXMgPSAobzEsIG8yKSA9PiB7XG4gIGNvbnN0IGsxID0gT2JqZWN0LmtleXMobzEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKG8yKTtcbiAgcmV0dXJuIGsxLnJlZHVjZSgob3V0LCBrZXkpID0+IG91dCAmJiBrMi5pbmNsdWRlcyhrZXkpLCB0cnVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBvYmplY3QgPSBjdXJyeSgodHlwZVNpZ25hdHVyZSwgdikgPT4ge1xuICBpZiAoaXNOaWwodikpIHtcbiAgICByZXR1cm4gVmFsaWRhdGlvbi5GYWlsdXJlKGAke3Z9IGlzIG5vdCBvZiB0eXBlIG9iamVjdC5gKTtcbiAgfVxuICBpZiAoIWhhdmVTYW1lS2V5cyh0eXBlU2lnbmF0dXJlLCB2KSkge1xuICAgIHJldHVybiBWYWxpZGF0aW9uLkZhaWx1cmUoXG4gICAgICBgT2JqZWN0IGRvZXMgbm90IGhhdmUgc2FtZSBrZXlzIGFzIGl0cyB0eXBlIHNpZ25hdHVyZTpcbiAgICAgIEtleXMgcHJlc2VudDogJHtPYmplY3Qua2V5cyh2KX1cbiAgICAgIEtleXMgZXhwZWN0ZWQ6ICR7T2JqZWN0LmtleXModHlwZVNpZ25hdHVyZSl9XG4gICAgICAke3Z9YFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmtleXModHlwZVNpZ25hdHVyZSlcbiAgLnJlZHVjZShcbiAgICAob3V0Y29tZSwga2V5KSA9PlxuICAgICAgVmFsaWRhdGlvbi5jaGFpbihcbiAgICAgICAgb3V0Y29tZSxcbiAgICAgICAgcGlwZShcbiAgICAgICAgICAgIHR5cGVTaWduYXR1cmVba2V5XSxcbiAgICAgICAgICAgIFZhbGlkYXRpb24ubWFwRmFpbHVyZShlcnJNc2coa2V5KSksXG4gICAgICAgICAgICBWYWxpZGF0aW9uLm1hcFN1Y2Nlc3MoXyA9PiB2KVxuICAgICAgICAgICkodltrZXldKVxuICAgICAgKSxcbiAgICAgIFZhbGlkYXRpb24uU3VjY2Vzcyh2KVxuICApO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW50LFxuICBmbG9hdCxcbiAgc3RyaW5nLFxuICBib29sLFxuICBudWxsVHlwZSxcbiAgbnVsbGFibGUsXG4gIGFycmF5LFxuICBkYXRlLFxuICBtYXliZSxcbiAgcmVtb3RlRGF0YSxcbiAgcmVxdWVzdCxcbiAgcmVzcG9uc2UsXG4gIG9iamVjdCxcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9oYXMocHJvcCwgb2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn07XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIF9oYXMgPSByZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuXG4vKipcbiAqIElmIHRoZSBnaXZlbiwgbm9uLW51bGwgb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsXG4gKiByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGF0IHByb3BlcnR5LiBPdGhlcndpc2UgcmV0dXJucyB0aGUgcHJvdmlkZWQgZGVmYXVsdFxuICogdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIGEgLT4gU3RyaW5nIC0+IE9iamVjdCAtPiBhXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byByZXR1cm4uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJuIHsqfSBUaGUgdmFsdWUgb2YgZ2l2ZW4gcHJvcGVydHkgb2YgdGhlIHN1cHBsaWVkIG9iamVjdCBvciB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWxpY2UgPSB7XG4gKiAgICAgICAgbmFtZTogJ0FMSUNFJyxcbiAqICAgICAgICBhZ2U6IDEwMVxuICogICAgICB9O1xuICogICAgICB2YXIgZmF2b3JpdGUgPSBSLnByb3AoJ2Zhdm9yaXRlTGlicmFyeScpO1xuICogICAgICB2YXIgZmF2b3JpdGVXaXRoRGVmYXVsdCA9IFIucHJvcE9yKCdSYW1kYScsICdmYXZvcml0ZUxpYnJhcnknKTtcbiAqXG4gKiAgICAgIGZhdm9yaXRlKGFsaWNlKTsgIC8vPT4gdW5kZWZpbmVkXG4gKiAgICAgIGZhdm9yaXRlV2l0aERlZmF1bHQoYWxpY2UpOyAgLy89PiAnUmFtZGEnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wT3IodmFsLCBwLCBvYmopIHtcbiAgcmV0dXJuIChvYmogIT0gbnVsbCAmJiBfaGFzKHAsIG9iaikpID8gb2JqW3BdIDogdmFsO1xufSk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL3YxNS4wLjEvc3JjL2lzb21vcnBoaWMvY2xhc3NpYy9lbGVtZW50L1JlYWN0RWxlbWVudC5qcyNMMjFcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvciAmJiBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50Jyk7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEVfRkFMTEJBQ0sgPSAweGVhYzc7XG5cbiAgZnVuY3Rpb24gYWRkUHJvcGVydHlUbyh0YXJnZXQsIG1ldGhvZE5hbWUsIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbWV0aG9kTmFtZSwge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBiYW5Qcm9wZXJ0eSh0YXJnZXQsIG1ldGhvZE5hbWUpIHtcbiAgICBhZGRQcm9wZXJ0eVRvKHRhcmdldCwgbWV0aG9kTmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgSW1tdXRhYmxlRXJyb3IoXCJUaGUgXCIgKyBtZXRob2ROYW1lICtcbiAgICAgICAgXCIgbWV0aG9kIGNhbm5vdCBiZSBpbnZva2VkIG9uIGFuIEltbXV0YWJsZSBkYXRhIHN0cnVjdHVyZS5cIik7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgaW1tdXRhYmlsaXR5VGFnID0gXCJfX2ltbXV0YWJsZV9pbnZhcmlhbnRzX2hvbGRcIjtcblxuICBmdW5jdGlvbiBhZGRJbW11dGFiaWxpdHlUYWcodGFyZ2V0KSB7XG4gICAgYWRkUHJvcGVydHlUbyh0YXJnZXQsIGltbXV0YWJpbGl0eVRhZywgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0ltbXV0YWJsZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbCB8fCBCb29sZWFuKFxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgaW1tdXRhYmlsaXR5VGFnKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSW4gSmF2YVNjcmlwdCwgb25seSBvYmplY3RzIGFyZSBldmVuIHBvdGVudGlhbGx5IG11dGFibGUuXG4gICAgICAvLyBzdHJpbmdzLCBudW1iZXJzLCBudWxsLCBhbmQgdW5kZWZpbmVkIGFyZSBhbGwgbmF0dXJhbGx5IGltbXV0YWJsZS5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRXF1YWwoYSwgYikge1xuICAgIC8vIEF2b2lkIGZhbHNlIHBvc2l0aXZlcyBkdWUgdG8gKE5hTiAhPT0gTmFOKSBldmFsdWF0aW5nIHRvIHRydWVcbiAgICByZXR1cm4gKGEgPT09IGIgfHwgKGEgIT09IGEgJiYgYiAhPT0gYikpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNZXJnYWJsZU9iamVjdCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgIShBcnJheS5pc0FycmF5KHRhcmdldCkpICYmICEodGFyZ2V0IGluc3RhbmNlb2YgRGF0ZSk7XG4gIH1cblxuICB2YXIgbXV0YXRpbmdPYmplY3RNZXRob2RzID0gW1xuICAgIFwic2V0UHJvdG90eXBlT2ZcIlxuICBdO1xuXG4gIHZhciBub25NdXRhdGluZ09iamVjdE1ldGhvZHMgPSBbXG4gICAgXCJrZXlzXCJcbiAgXTtcblxuICB2YXIgbXV0YXRpbmdBcnJheU1ldGhvZHMgPSBtdXRhdGluZ09iamVjdE1ldGhvZHMuY29uY2F0KFtcbiAgICBcInB1c2hcIiwgXCJwb3BcIiwgXCJzb3J0XCIsIFwic3BsaWNlXCIsIFwic2hpZnRcIiwgXCJ1bnNoaWZ0XCIsIFwicmV2ZXJzZVwiXG4gIF0pO1xuXG4gIHZhciBub25NdXRhdGluZ0FycmF5TWV0aG9kcyA9IG5vbk11dGF0aW5nT2JqZWN0TWV0aG9kcy5jb25jYXQoW1xuICAgIFwibWFwXCIsIFwiZmlsdGVyXCIsIFwic2xpY2VcIiwgXCJjb25jYXRcIiwgXCJyZWR1Y2VcIiwgXCJyZWR1Y2VSaWdodFwiXG4gIF0pO1xuXG4gIHZhciBtdXRhdGluZ0RhdGVNZXRob2RzID0gbXV0YXRpbmdPYmplY3RNZXRob2RzLmNvbmNhdChbXG4gICAgXCJzZXREYXRlXCIsIFwic2V0RnVsbFllYXJcIiwgXCJzZXRIb3Vyc1wiLCBcInNldE1pbGxpc2Vjb25kc1wiLCBcInNldE1pbnV0ZXNcIiwgXCJzZXRNb250aFwiLCBcInNldFNlY29uZHNcIixcbiAgICBcInNldFRpbWVcIiwgXCJzZXRVVENEYXRlXCIsIFwic2V0VVRDRnVsbFllYXJcIiwgXCJzZXRVVENIb3Vyc1wiLCBcInNldFVUQ01pbGxpc2Vjb25kc1wiLCBcInNldFVUQ01pbnV0ZXNcIixcbiAgICBcInNldFVUQ01vbnRoXCIsIFwic2V0VVRDU2Vjb25kc1wiLCBcInNldFllYXJcIlxuICBdKTtcblxuICBmdW5jdGlvbiBJbW11dGFibGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdmFyIGVyciAgICAgICA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvLyBUT0RPOiBDb25zaWRlciBgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVyciwgSW1tdXRhYmxlRXJyb3IpO2BcbiAgICBlcnIuX19wcm90b19fID0gSW1tdXRhYmxlRXJyb3I7XG5cbiAgICByZXR1cm4gZXJyO1xuICB9XG4gIEltbXV0YWJsZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBtYWtlSW1tdXRhYmxlKG9iaiwgYmFubmVkTWV0aG9kcykge1xuICAgIC8vIFRhZyBpdCBzbyB3ZSBjYW4gcXVpY2tseSB0ZWxsIGl0J3MgaW1tdXRhYmxlIGxhdGVyLlxuICAgIGFkZEltbXV0YWJpbGl0eVRhZyhvYmopO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgLy8gTWFrZSBhbGwgbXV0YXRpbmcgbWV0aG9kcyB0aHJvdyBleGNlcHRpb25zLlxuICAgICAgZm9yICh2YXIgaW5kZXggaW4gYmFubmVkTWV0aG9kcykge1xuICAgICAgICBpZiAoYmFubmVkTWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShpbmRleCkpIHtcbiAgICAgICAgICBiYW5Qcm9wZXJ0eShvYmosIGJhbm5lZE1ldGhvZHNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBGcmVlemUgaXQgYW5kIHJldHVybiBpdC5cbiAgICAgIE9iamVjdC5mcmVlemUob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZU1ldGhvZFJldHVybkltbXV0YWJsZShvYmosIG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgY3VycmVudE1ldGhvZCA9IG9ialttZXRob2ROYW1lXTtcblxuICAgIGFkZFByb3BlcnR5VG8ob2JqLCBtZXRob2ROYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBJbW11dGFibGUoY3VycmVudE1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cykpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJyYXlTZXQoaWR4LCB2YWx1ZSwgY29uZmlnKSB7XG4gICAgdmFyIGRlZXAgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLmRlZXA7XG5cbiAgICBpZiAoaWR4IGluIHRoaXMpIHtcbiAgICAgIGlmIChkZWVwICYmIHRoaXNbaWR4XSAhPT0gdmFsdWUgJiYgaXNNZXJnYWJsZU9iamVjdCh2YWx1ZSkgJiYgaXNNZXJnYWJsZU9iamVjdCh0aGlzW2lkeF0pKSB7XG4gICAgICAgIHZhbHVlID0gdGhpc1tpZHhdLm1lcmdlKHZhbHVlLCB7ZGVlcDogdHJ1ZSwgbW9kZTogJ3JlcGxhY2UnfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNFcXVhbCh0aGlzW2lkeF0sIHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbXV0YWJsZSA9IGFzTXV0YWJsZUFycmF5LmNhbGwodGhpcyk7XG4gICAgbXV0YWJsZVtpZHhdID0gSW1tdXRhYmxlKHZhbHVlKTtcbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG11dGFibGUpO1xuICB9XG5cbiAgdmFyIGltbXV0YWJsZUVtcHR5QXJyYXkgPSBJbW11dGFibGUoW10pO1xuXG4gIGZ1bmN0aW9uIGFycmF5U2V0SW4ocHRoLCB2YWx1ZSwgY29uZmlnKSB7XG4gICAgdmFyIGhlYWQgPSBwdGhbMF07XG5cbiAgICBpZiAocHRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGFycmF5U2V0LmNhbGwodGhpcywgaGVhZCwgdmFsdWUsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0YWlsID0gcHRoLnNsaWNlKDEpO1xuICAgICAgdmFyIHRoaXNIZWFkID0gdGhpc1toZWFkXTtcbiAgICAgIHZhciBuZXdWYWx1ZTtcblxuICAgICAgaWYgKHR5cGVvZih0aGlzSGVhZCkgPT09IFwib2JqZWN0XCIgJiYgdGhpc0hlYWQgIT09IG51bGwgJiYgdHlwZW9mKHRoaXNIZWFkLnNldEluKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIC8vIE1pZ2h0ICh2YWxpZGx5KSBiZSBvYmplY3Qgb3IgYXJyYXlcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzSGVhZC5zZXRJbih0YWlsLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV4dEhlYWQgPSB0YWlsWzBdO1xuICAgICAgICAvLyBJZiB0aGUgbmV4dCBwYXRoIHBhcnQgaXMgYSBudW1iZXIsIHRoZW4gd2UgYXJlIHNldHRpbmcgaW50byBhbiBhcnJheSwgZWxzZSBhbiBvYmplY3QuXG4gICAgICAgIGlmIChuZXh0SGVhZCAhPT0gJycgJiYgaXNGaW5pdGUobmV4dEhlYWQpKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBhcnJheVNldEluLmNhbGwoaW1tdXRhYmxlRW1wdHlBcnJheSwgdGFpbCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1ZhbHVlID0gb2JqZWN0U2V0SW4uY2FsbChpbW11dGFibGVFbXB0eU9iamVjdCwgdGFpbCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWFkIGluIHRoaXMgJiYgdGhpc0hlYWQgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgbXV0YWJsZSA9IGFzTXV0YWJsZUFycmF5LmNhbGwodGhpcyk7XG4gICAgICBtdXRhYmxlW2hlYWRdID0gbmV3VmFsdWU7XG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG11dGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VJbW11dGFibGVBcnJheShhcnJheSkge1xuICAgIC8vIERvbid0IGNoYW5nZSB0aGVpciBpbXBsZW1lbnRhdGlvbnMsIGJ1dCB3cmFwIHRoZXNlIGZ1bmN0aW9ucyB0byBtYWtlIHN1cmVcbiAgICAvLyB0aGV5IGFsd2F5cyByZXR1cm4gYW4gaW1tdXRhYmxlIHZhbHVlLlxuICAgIGZvciAodmFyIGluZGV4IGluIG5vbk11dGF0aW5nQXJyYXlNZXRob2RzKSB7XG4gICAgICBpZiAobm9uTXV0YXRpbmdBcnJheU1ldGhvZHMuaGFzT3duUHJvcGVydHkoaW5kZXgpKSB7XG4gICAgICAgIHZhciBtZXRob2ROYW1lID0gbm9uTXV0YXRpbmdBcnJheU1ldGhvZHNbaW5kZXhdO1xuICAgICAgICBtYWtlTWV0aG9kUmV0dXJuSW1tdXRhYmxlKGFycmF5LCBtZXRob2ROYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcImZsYXRNYXBcIiwgIGZsYXRNYXApO1xuICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwiYXNPYmplY3RcIiwgYXNPYmplY3QpO1xuICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwiYXNNdXRhYmxlXCIsIGFzTXV0YWJsZUFycmF5KTtcbiAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcInNldFwiLCBhcnJheVNldCk7XG4gICAgYWRkUHJvcGVydHlUbyhhcnJheSwgXCJzZXRJblwiLCBhcnJheVNldEluKTtcbiAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcInVwZGF0ZVwiLCB1cGRhdGUpO1xuICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwidXBkYXRlSW5cIiwgdXBkYXRlSW4pO1xuXG4gICAgZm9yKHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycmF5W2ldID0gSW1tdXRhYmxlKGFycmF5W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZShhcnJheSwgbXV0YXRpbmdBcnJheU1ldGhvZHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZURhdGUoZGF0ZSkge1xuICAgIGFkZFByb3BlcnR5VG8oZGF0ZSwgXCJhc011dGFibGVcIiwgYXNNdXRhYmxlRGF0ZSk7XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZShkYXRlLCBtdXRhdGluZ0RhdGVNZXRob2RzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzTXV0YWJsZURhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFZmZlY3RpdmVseSBwZXJmb3JtcyBhIG1hcCgpIG92ZXIgdGhlIGVsZW1lbnRzIGluIHRoZSBhcnJheSwgdXNpbmcgdGhlXG4gICAqIHByb3ZpZGVkIGl0ZXJhdG9yLCBleGNlcHQgdGhhdCB3aGVuZXZlciB0aGUgaXRlcmF0b3IgcmV0dXJucyBhbiBhcnJheSwgdGhhdFxuICAgKiBhcnJheSdzIGVsZW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgZmluYWwgcmVzdWx0IGluc3RlYWQgb2YgdGhlIGFycmF5IGl0c2VsZi5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaXRlcmF0b3IgLSBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGludm9rZWQgb24gZWFjaCBlbGVtZW50IGluIHRoZSBhcnJheS4gSXQgd2lsbCByZWNlaXZlIHRocmVlIGFyZ3VtZW50czogdGhlIGN1cnJlbnQgdmFsdWUsIHRoZSBjdXJyZW50IGluZGV4LCBhbmQgdGhlIGN1cnJlbnQgb2JqZWN0LlxuICAgKi9cbiAgZnVuY3Rpb24gZmxhdE1hcChpdGVyYXRvcikge1xuICAgIC8vIENhbGxpbmcgLmZsYXRNYXAoKSB3aXRoIG5vIGFyZ3VtZW50cyBpcyBhIG5vLW9wLiBEb24ndCBib3RoZXIgY2xvbmluZy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgICBsZW5ndGggPSB0aGlzLmxlbmd0aCxcbiAgICAgICAgaW5kZXg7XG5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBpdGVyYXRvclJlc3VsdCA9IGl0ZXJhdG9yKHRoaXNbaW5kZXhdLCBpbmRleCwgdGhpcyk7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZXJhdG9yUmVzdWx0KSkge1xuICAgICAgICAvLyBDb25jYXRlbmF0ZSBBcnJheSByZXN1bHRzIGludG8gdGhlIHJldHVybiB2YWx1ZSB3ZSdyZSBidWlsZGluZyB1cC5cbiAgICAgICAgcmVzdWx0LnB1c2guYXBwbHkocmVzdWx0LCBpdGVyYXRvclJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYW5kbGUgbm9uLUFycmF5IHJlc3VsdHMgdGhlIHNhbWUgd2F5IG1hcCgpIGRvZXMuXG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZXJhdG9yUmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KHJlc3VsdCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJbW11dGFibGUgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGdpdmVuIGtleXMgaW5jbHVkZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGtleXNUb1JlbW92ZSAtIEEgbGlzdCBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUga2V5cyB0byBleGNsdWRlIGluIHRoZSByZXR1cm4gdmFsdWUuIEluc3RlYWQgb2YgcHJvdmlkaW5nIGEgc2luZ2xlIGFycmF5LCB0aGlzIG1ldGhvZCBjYW4gYWxzbyBiZSBjYWxsZWQgYnkgcGFzc2luZyBtdWx0aXBsZSBzdHJpbmdzIGFzIHNlcGFyYXRlIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHdpdGhvdXQocmVtb3ZlKSB7XG4gICAgLy8gQ2FsbGluZyAud2l0aG91dCgpIHdpdGggbm8gYXJndW1lbnRzIGlzIGEgbm8tb3AuIERvbid0IGJvdGhlciBjbG9uaW5nLlxuICAgIGlmICh0eXBlb2YgcmVtb3ZlID09PSBcInVuZGVmaW5lZFwiICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVtb3ZlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIElmIHdlIHdlcmVuJ3QgZ2l2ZW4gYW4gYXJyYXksIHVzZSB0aGUgYXJndW1lbnRzIGxpc3QuXG4gICAgICB2YXIga2V5c1RvUmVtb3ZlQXJyYXkgPSAoQXJyYXkuaXNBcnJheShyZW1vdmUpKSA/XG4gICAgICAgICByZW1vdmUuc2xpY2UoKSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgIC8vIENvbnZlcnQgbnVtZXJpYyBrZXlzIHRvIHN0cmluZ3Mgc2luY2UgdGhhdCdzIGhvdyB0aGV5J2xsXG4gICAgICAvLyBjb21lIGZyb20gdGhlIGVudW1lcmF0aW9uIG9mIHRoZSBvYmplY3QuXG4gICAgICBrZXlzVG9SZW1vdmVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpZHgsIGFycikge1xuICAgICAgICBpZih0eXBlb2YoZWwpID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgYXJyW2lkeF0gPSBlbC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVtb3ZlID0gZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleXNUb1JlbW92ZUFycmF5LmluZGV4T2Yoa2V5KSAhPT0gLTE7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB0aGlzLmluc3RhbnRpYXRlRW1wdHlPYmplY3QoKTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHJlbW92ZSh0aGlzW2tleV0sIGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCxcbiAgICAgIHtpbnN0YW50aWF0ZUVtcHR5T2JqZWN0OiB0aGlzLmluc3RhbnRpYXRlRW1wdHlPYmplY3R9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzTXV0YWJsZUFycmF5KG9wdHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gW10sIGksIGxlbmd0aDtcblxuICAgIGlmKG9wdHMgJiYgb3B0cy5kZWVwKSB7XG4gICAgICBmb3IoaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXNEZWVwTXV0YWJsZSh0aGlzW2ldKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEVmZmVjdGl2ZWx5IHBlcmZvcm1zIGEgW21hcF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKSBvdmVyIHRoZSBlbGVtZW50cyBpbiB0aGUgYXJyYXksIGV4cGVjdGluZyB0aGF0IHRoZSBpdGVyYXRvciBmdW5jdGlvblxuICAgKiB3aWxsIHJldHVybiBhbiBhcnJheSBvZiB0d28gZWxlbWVudHMgLSB0aGUgZmlyc3QgcmVwcmVzZW50aW5nIGEga2V5LCB0aGUgb3RoZXJcbiAgICogYSB2YWx1ZS4gVGhlbiByZXR1cm5zIGFuIEltbXV0YWJsZSBPYmplY3QgY29uc3RydWN0ZWQgb2YgdGhvc2Uga2V5cyBhbmQgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBpdGVyYXRvciAtIEEgZnVuY3Rpb24gd2hpY2ggc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiB0d28gZWxlbWVudHMgLSB0aGUgZmlyc3QgcmVwcmVzZW50aW5nIHRoZSBkZXNpcmVkIGtleSwgdGhlIG90aGVyIHRoZSBkZXNpcmVkIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gYXNPYmplY3QoaXRlcmF0b3IpIHtcbiAgICAvLyBJZiBubyBpdGVyYXRvciB3YXMgcHJvdmlkZWQsIGFzc3VtZSB0aGUgaWRlbnRpdHkgZnVuY3Rpb25cbiAgICAvLyAoc3VnZ2VzdGluZyB0aGlzIGFycmF5IGlzIGFscmVhZHkgYSBsaXN0IG9mIGtleS92YWx1ZSBwYWlycy4pXG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpdGVyYXRvciA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0ge30sXG4gICAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxuICAgICAgICBpbmRleDtcblxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIHBhaXIgID0gaXRlcmF0b3IodGhpc1tpbmRleF0sIGluZGV4LCB0aGlzKSxcbiAgICAgICAgICBrZXkgICA9IHBhaXJbMF0sXG4gICAgICAgICAgdmFsdWUgPSBwYWlyWzFdO1xuXG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhc0RlZXBNdXRhYmxlKG9iaikge1xuICAgIGlmIChcbiAgICAgICghb2JqKSB8fFxuICAgICAgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fFxuICAgICAgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgaW1tdXRhYmlsaXR5VGFnKSkgfHxcbiAgICAgIChvYmogaW5zdGFuY2VvZiBEYXRlKVxuICAgICkgeyByZXR1cm4gb2JqOyB9XG4gICAgcmV0dXJuIG9iai5hc011dGFibGUoe2RlZXA6IHRydWV9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1aWNrQ29weShzcmMsIGRlc3QpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzcmMsIGtleSkpIHtcbiAgICAgICAgZGVzdFtrZXldID0gc3JjW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJbW11dGFibGUgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb3BlcnRpZXMgYW5kIHZhbHVlcyBvZiBib3RoXG4gICAqIHRoaXMgb2JqZWN0IGFuZCB0aGUgcHJvdmlkZWQgb2JqZWN0LCBwcmlvcml0aXppbmcgdGhlIHByb3ZpZGVkIG9iamVjdCdzXG4gICAqIHZhbHVlcyB3aGVuZXZlciB0aGUgc2FtZSBrZXkgaXMgcHJlc2VudCBpbiBib3RoIG9iamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvdGhlciAtIFRoZSBvdGhlciBvYmplY3QgdG8gbWVyZ2UuIE11bHRpcGxlIG9iamVjdHMgY2FuIGJlIHBhc3NlZCBhcyBhbiBhcnJheS4gSW4gc3VjaCBhIGNhc2UsIHRoZSBsYXRlciBhbiBvYmplY3QgYXBwZWFycyBpbiB0aGF0IGxpc3QsIHRoZSBoaWdoZXIgaXRzIHByaW9yaXR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0gT3B0aW9uYWwgY29uZmlnIG9iamVjdCB0aGF0IGNvbnRhaW5zIHNldHRpbmdzLiBTdXBwb3J0ZWQgc2V0dGluZ3MgYXJlOiB7ZGVlcDogdHJ1ZX0gZm9yIGRlZXAgbWVyZ2UgYW5kIHttZXJnZXI6IG1lcmdlckZ1bmN9IHdoZXJlIG1lcmdlckZ1bmMgaXMgYSBmdW5jdGlvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCB0YWtlcyBhIHByb3BlcnR5IGZyb20gYm90aCBvYmplY3RzLiBJZiBhbnl0aGluZyBpcyByZXR1cm5lZCBpdCBvdmVycmlkZXMgdGhlIG5vcm1hbCBtZXJnZSBiZWhhdmlvdXIuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZShvdGhlciwgY29uZmlnKSB7XG4gICAgLy8gQ2FsbGluZyAubWVyZ2UoKSB3aXRoIG5vIGFyZ3VtZW50cyBpcyBhIG5vLW9wLiBEb24ndCBib3RoZXIgY2xvbmluZy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKG90aGVyID09PSBudWxsIHx8ICh0eXBlb2Ygb3RoZXIgIT09IFwib2JqZWN0XCIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1tdXRhYmxlI21lcmdlIGNhbiBvbmx5IGJlIGludm9rZWQgd2l0aCBvYmplY3RzIG9yIGFycmF5cywgbm90IFwiICsgSlNPTi5zdHJpbmdpZnkob3RoZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZWRBcnJheSA9IChBcnJheS5pc0FycmF5KG90aGVyKSksXG4gICAgICAgIGRlZXAgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLmRlZXAsXG4gICAgICAgIG1vZGUgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLm1vZGUgfHwgJ21lcmdlJyxcbiAgICAgICAgbWVyZ2VyICAgICAgICA9IGNvbmZpZyAmJiBjb25maWcubWVyZ2VyLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICAvLyBVc2UgdGhlIGdpdmVuIGtleSB0byBleHRyYWN0IGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LCB0aGVuIHBsYWNlXG4gICAgLy8gdGhhdCB2YWx1ZSBpbiB0aGUgcmVzdWx0IG9iamVjdCB1bmRlciB0aGUgc2FtZSBrZXkuIElmIHRoYXQgcmVzdWx0ZWRcbiAgICAvLyBpbiBhIGNoYW5nZSBmcm9tIHRoaXMgb2JqZWN0J3MgdmFsdWUgYXQgdGhhdCBrZXksIHNldCBhbnlDaGFuZ2VzID0gdHJ1ZS5cbiAgICBmdW5jdGlvbiBhZGRUb1Jlc3VsdChjdXJyZW50T2JqLCBvdGhlck9iaiwga2V5KSB7XG4gICAgICB2YXIgaW1tdXRhYmxlVmFsdWUgPSBJbW11dGFibGUob3RoZXJPYmpba2V5XSk7XG4gICAgICB2YXIgbWVyZ2VyUmVzdWx0ID0gbWVyZ2VyICYmIG1lcmdlcihjdXJyZW50T2JqW2tleV0sIGltbXV0YWJsZVZhbHVlLCBjb25maWcpO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRPYmpba2V5XTtcblxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCkgfHxcbiAgICAgICAgKG1lcmdlclJlc3VsdCAhPT0gdW5kZWZpbmVkKSB8fFxuICAgICAgICAoIWN1cnJlbnRPYmouaGFzT3duUHJvcGVydHkoa2V5KSkgfHxcbiAgICAgICAgIWlzRXF1YWwoaW1tdXRhYmxlVmFsdWUsIGN1cnJlbnRWYWx1ZSkpIHtcblxuICAgICAgICB2YXIgbmV3VmFsdWU7XG5cbiAgICAgICAgaWYgKG1lcmdlclJlc3VsdCkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gbWVyZ2VyUmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgaXNNZXJnYWJsZU9iamVjdChjdXJyZW50VmFsdWUpICYmIGlzTWVyZ2FibGVPYmplY3QoaW1tdXRhYmxlVmFsdWUpKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBjdXJyZW50VmFsdWUubWVyZ2UoaW1tdXRhYmxlVmFsdWUsIGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBpbW11dGFibGVWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNFcXVhbChjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKSB8fCAhY3VycmVudE9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBNYWtlIGEgc2hhbGxvdyBjbG9uZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG4gICAgICAgICAgICByZXN1bHQgPSBxdWlja0NvcHkoY3VycmVudE9iaiwgY3VycmVudE9iai5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc3VsdFtrZXldID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckRyb3BwZWRLZXlzKGN1cnJlbnRPYmosIG90aGVyT2JqKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gY3VycmVudE9iaikge1xuICAgICAgICBpZiAoIW90aGVyT2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICAgICAgICAgIHJlc3VsdCA9IHF1aWNrQ29weShjdXJyZW50T2JqLCBjdXJyZW50T2JqLmluc3RhbnRpYXRlRW1wdHlPYmplY3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByZXN1bHRba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXk7XG5cbiAgICAvLyBBY2hpZXZlIHByaW9yaXRpemF0aW9uIGJ5IG92ZXJyaWRpbmcgcHJldmlvdXMgdmFsdWVzIHRoYXQgZ2V0IGluIHRoZSB3YXkuXG4gICAgaWYgKCFyZWNlaXZlZEFycmF5KSB7XG4gICAgICAvLyBUaGUgbW9zdCBjb21tb24gdXNlIGNhc2U6IGp1c3QgbWVyZ2Ugb25lIG9iamVjdCBpbnRvIHRoZSBleGlzdGluZyBvbmUuXG4gICAgICBmb3IgKGtleSBpbiBvdGhlcikge1xuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvdGhlciwga2V5KSkge1xuICAgICAgICAgIGFkZFRvUmVzdWx0KHRoaXMsIG90aGVyLCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobW9kZSA9PT0gJ3JlcGxhY2UnKSB7XG4gICAgICAgIGNsZWFyRHJvcHBlZEtleXModGhpcywgb3RoZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBhbHNvIGFjY2VwdCBhbiBBcnJheVxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBvdGhlci5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBvdGhlckZyb21BcnJheSA9IG90aGVyW2luZGV4XTtcblxuICAgICAgICBmb3IgKGtleSBpbiBvdGhlckZyb21BcnJheSkge1xuICAgICAgICAgIGlmIChvdGhlckZyb21BcnJheS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBhZGRUb1Jlc3VsdChyZXN1bHQgIT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRoaXMsIG90aGVyRnJvbUFycmF5LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCxcbiAgICAgICAge2luc3RhbnRpYXRlRW1wdHlPYmplY3Q6IHRoaXMuaW5zdGFudGlhdGVFbXB0eU9iamVjdH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdFJlcGxhY2UodmFsdWUsIGNvbmZpZykge1xuICAgIHZhciBkZWVwICAgICAgICAgID0gY29uZmlnICYmIGNvbmZpZy5kZWVwO1xuXG4gICAgLy8gQ2FsbGluZyAucmVwbGFjZSgpIHdpdGggbm8gYXJndW1lbnRzIGlzIGEgbm8tb3AuIERvbid0IGJvdGhlciBjbG9uaW5nLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1tdXRhYmxlI3JlcGxhY2UgY2FuIG9ubHkgYmUgaW52b2tlZCB3aXRoIG9iamVjdHMgb3IgYXJyYXlzLCBub3QgXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lcmdlKHZhbHVlLCB7ZGVlcDogZGVlcCwgbW9kZTogJ3JlcGxhY2UnfSk7XG4gIH1cblxuICB2YXIgaW1tdXRhYmxlRW1wdHlPYmplY3QgPSBJbW11dGFibGUoe30pO1xuXG4gIGZ1bmN0aW9uIG9iamVjdFNldEluKHBhdGgsIHZhbHVlLCBjb25maWcpIHtcbiAgICB2YXIgaGVhZCA9IHBhdGhbMF07XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gb2JqZWN0U2V0LmNhbGwodGhpcywgaGVhZCwgdmFsdWUsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgdmFyIHRhaWwgPSBwYXRoLnNsaWNlKDEpO1xuICAgIHZhciBuZXdWYWx1ZTtcbiAgICB2YXIgdGhpc0hlYWQgPSB0aGlzW2hlYWRdO1xuXG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoaGVhZCkgJiYgdHlwZW9mKHRoaXNIZWFkKSA9PT0gXCJvYmplY3RcIiAmJiB0aGlzSGVhZCAhPT0gbnVsbCAmJiB0eXBlb2YodGhpc0hlYWQuc2V0SW4pID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIE1pZ2h0ICh2YWxpZGx5KSBiZSBvYmplY3Qgb3IgYXJyYXlcbiAgICAgIG5ld1ZhbHVlID0gdGhpc0hlYWQuc2V0SW4odGFpbCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IG9iamVjdFNldEluLmNhbGwoaW1tdXRhYmxlRW1wdHlPYmplY3QsIHRhaWwsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShoZWFkKSAmJiB0aGlzSGVhZCA9PT0gbmV3VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBtdXRhYmxlID0gcXVpY2tDb3B5KHRoaXMsIHRoaXMuaW5zdGFudGlhdGVFbXB0eU9iamVjdCgpKTtcbiAgICBtdXRhYmxlW2hlYWRdID0gbmV3VmFsdWU7XG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGVPYmplY3QobXV0YWJsZSwgdGhpcyk7XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3RTZXQocHJvcGVydHksIHZhbHVlLCBjb25maWcpIHtcbiAgICB2YXIgZGVlcCAgICAgICAgICA9IGNvbmZpZyAmJiBjb25maWcuZGVlcDtcblxuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgaWYgKGRlZXAgJiYgdGhpc1twcm9wZXJ0eV0gIT09IHZhbHVlICYmIGlzTWVyZ2FibGVPYmplY3QodmFsdWUpICYmIGlzTWVyZ2FibGVPYmplY3QodGhpc1twcm9wZXJ0eV0pKSB7XG4gICAgICAgIHZhbHVlID0gdGhpc1twcm9wZXJ0eV0ubWVyZ2UodmFsdWUsIHtkZWVwOiB0cnVlLCBtb2RlOiAncmVwbGFjZSd9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0VxdWFsKHRoaXNbcHJvcGVydHldLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG11dGFibGUgPSBxdWlja0NvcHkodGhpcywgdGhpcy5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCkpO1xuICAgIG11dGFibGVbcHJvcGVydHldID0gSW1tdXRhYmxlKHZhbHVlKTtcbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChtdXRhYmxlLCB0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShwcm9wZXJ0eSwgdXBkYXRlcikge1xuICAgIHZhciByZXN0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGluaXRpYWxWYWwgPSB0aGlzW3Byb3BlcnR5XTtcbiAgICByZXR1cm4gdGhpcy5zZXQocHJvcGVydHksIHVwZGF0ZXIuYXBwbHkoaW5pdGlhbFZhbCwgW2luaXRpYWxWYWxdLmNvbmNhdChyZXN0QXJncykpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluUGF0aChvYmosIHBhdGgpIHtcbiAgICAvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGF0aC5sZW5ndGg7IG9iaiAhPSBudWxsICYmIGkgPCBsOyBpKyspIHtcbiAgICAgIG9iaiA9IG9ialtwYXRoW2ldXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGkgJiYgaSA9PSBsKSA/IG9iaiA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUluKHBhdGgsIHVwZGF0ZXIpIHtcbiAgICB2YXIgcmVzdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBpbml0aWFsVmFsID0gZ2V0SW5QYXRoKHRoaXMsIHBhdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2V0SW4ocGF0aCwgdXBkYXRlci5hcHBseShpbml0aWFsVmFsLCBbaW5pdGlhbFZhbF0uY29uY2F0KHJlc3RBcmdzKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNNdXRhYmxlT2JqZWN0KG9wdHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCksIGtleTtcblxuICAgIGlmKG9wdHMgJiYgb3B0cy5kZWVwKSB7XG4gICAgICBmb3IgKGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGFzRGVlcE11dGFibGUodGhpc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBDcmVhdGVzIHBsYWluIG9iamVjdCB0byBiZSB1c2VkIGZvciBjbG9uaW5nXG4gIGZ1bmN0aW9uIGluc3RhbnRpYXRlUGxhaW5PYmplY3QoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gRmluYWxpemVzIGFuIG9iamVjdCB3aXRoIGltbXV0YWJsZSBtZXRob2RzLCBmcmVlemVzIGl0LCBhbmQgcmV0dXJucyBpdC5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZU9iamVjdChvYmosIG9wdGlvbnMpIHtcbiAgICB2YXIgaW5zdGFudGlhdGVFbXB0eU9iamVjdCA9XG4gICAgICAob3B0aW9ucyAmJiBvcHRpb25zLmluc3RhbnRpYXRlRW1wdHlPYmplY3QpID9cbiAgICAgICAgb3B0aW9ucy5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0IDogaW5zdGFudGlhdGVQbGFpbk9iamVjdDtcblxuICAgIGFkZFByb3BlcnR5VG8ob2JqLCBcIm1lcmdlXCIsIG1lcmdlKTtcbiAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJyZXBsYWNlXCIsIG9iamVjdFJlcGxhY2UpO1xuICAgIGFkZFByb3BlcnR5VG8ob2JqLCBcIndpdGhvdXRcIiwgd2l0aG91dCk7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwiYXNNdXRhYmxlXCIsIGFzTXV0YWJsZU9iamVjdCk7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwiaW5zdGFudGlhdGVFbXB0eU9iamVjdFwiLCBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KTtcbiAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJzZXRcIiwgb2JqZWN0U2V0KTtcbiAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJzZXRJblwiLCBvYmplY3RTZXRJbik7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwidXBkYXRlXCIsIHVwZGF0ZSk7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwidXBkYXRlSW5cIiwgdXBkYXRlSW4pO1xuXG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGUob2JqLCBtdXRhdGluZ09iamVjdE1ldGhvZHMpO1xuICB9XG5cbiAgLy8gUmV0dXJucyB0cnVlIGlmIG9iamVjdCBpcyBhIHZhbGlkIHJlYWN0IGVsZW1lbnRcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvdjE1LjAuMS9zcmMvaXNvbW9ycGhpYy9jbGFzc2ljL2VsZW1lbnQvUmVhY3RFbGVtZW50LmpzI0wzMjZcbiAgZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgIG9iaiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAob2JqLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVfRkFMTEJBQ0sgfHwgb2JqLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpO1xuICB9XG5cbiAgZnVuY3Rpb24gSW1tdXRhYmxlKG9iaiwgb3B0aW9ucywgc3RhY2tSZW1haW5pbmcpIHtcbiAgICBpZiAoaXNJbW11dGFibGUob2JqKSB8fCBpc1JlYWN0RWxlbWVudChvYmopKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG9iai5zbGljZSgpKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlRGF0ZShuZXcgRGF0ZShvYmouZ2V0VGltZSgpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERvbid0IGZyZWV6ZSB0aGUgb2JqZWN0IHdlIHdlcmUgZ2l2ZW47IG1ha2UgYSBjbG9uZSBhbmQgdXNlIHRoYXQuXG4gICAgICB2YXIgcHJvdG90eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnByb3RvdHlwZTtcbiAgICAgIHZhciBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0ID1cbiAgICAgICAgKCFwcm90b3R5cGUgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlKSA/XG4gICAgICAgICAgaW5zdGFudGlhdGVQbGFpbk9iamVjdCA6IChmdW5jdGlvbigpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTsgfSk7XG4gICAgICB2YXIgY2xvbmUgPSBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCk7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgLypqc2hpbnQgZXFudWxsOnRydWUgKi9cbiAgICAgICAgaWYgKHN0YWNrUmVtYWluaW5nID09IG51bGwpIHtcbiAgICAgICAgICBzdGFja1JlbWFpbmluZyA9IDY0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFja1JlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEltbXV0YWJsZUVycm9yKFwiQXR0ZW1wdCB0byBjb25zdHJ1Y3QgSW1tdXRhYmxlIGZyb20gYSBkZWVwbHkgbmVzdGVkIG9iamVjdCB3YXMgZGV0ZWN0ZWQuXCIgK1xuICAgICAgICAgICAgXCIgSGF2ZSB5b3UgdHJpZWQgdG8gd3JhcCBhbiBvYmplY3Qgd2l0aCBjaXJjdWxhciByZWZlcmVuY2VzIChlLmcuIFJlYWN0IGVsZW1lbnQpP1wiICtcbiAgICAgICAgICAgIFwiIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcnRmZWxkbWFuL3NlYW1sZXNzLWltbXV0YWJsZS93aWtpL0RlZXBseS1uZXN0ZWQtb2JqZWN0LXdhcy1kZXRlY3RlZCBmb3IgZGV0YWlscy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2tSZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpIHtcbiAgICAgICAgICBjbG9uZVtrZXldID0gSW1tdXRhYmxlKG9ialtrZXldLCB1bmRlZmluZWQsIHN0YWNrUmVtYWluaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChjbG9uZSxcbiAgICAgICAge2luc3RhbnRpYXRlRW1wdHlPYmplY3Q6IGluc3RhbnRpYXRlRW1wdHlPYmplY3R9KTtcbiAgICB9XG4gIH1cblxuICAvLyBXcmFwcGVyIHRvIGFsbG93IHRoZSB1c2Ugb2Ygb2JqZWN0IG1ldGhvZHMgYXMgc3RhdGljIG1ldGhvZHMgb2YgSW1tdXRhYmxlLlxuICBmdW5jdGlvbiB0b1N0YXRpYyhmbikge1xuICAgIGZ1bmN0aW9uIHN0YXRpY1dyYXBwZXIoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHZhciBzZWxmID0gYXJncy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0aWNXcmFwcGVyO1xuICB9XG5cbiAgLy8gV3JhcHBlciB0byBhbGxvdyB0aGUgdXNlIG9mIG9iamVjdCBtZXRob2RzIGFzIHN0YXRpYyBtZXRob2RzIG9mIEltbXV0YWJsZS5cbiAgLy8gd2l0aCB0aGUgYWRkaXRpb25hbCBjb25kaXRpb24gb2YgY2hvb3Npbmcgd2hpY2ggZnVuY3Rpb24gdG8gY2FsbCBkZXBlbmRpbmdcbiAgLy8gaWYgYXJndW1lbnQgaXMgYW4gYXJyYXkgb3IgYW4gb2JqZWN0LlxuICBmdW5jdGlvbiB0b1N0YXRpY09iamVjdE9yQXJyYXkoZm5PYmplY3QsIGZuQXJyYXkpIHtcbiAgICBmdW5jdGlvbiBzdGF0aWNXcmFwcGVyKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgc2VsZiA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGYpKSB7XG4gICAgICAgICAgcmV0dXJuIGZuQXJyYXkuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmbk9iamVjdC5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGljV3JhcHBlcjtcbiAgfVxuXG4gIC8vIEV4cG9ydCB0aGUgbGlicmFyeVxuICBJbW11dGFibGUuZnJvbSAgICAgICAgICAgPSBJbW11dGFibGU7XG4gIEltbXV0YWJsZS5pc0ltbXV0YWJsZSAgICA9IGlzSW1tdXRhYmxlO1xuICBJbW11dGFibGUuSW1tdXRhYmxlRXJyb3IgPSBJbW11dGFibGVFcnJvcjtcbiAgSW1tdXRhYmxlLm1lcmdlICAgICAgICAgID0gdG9TdGF0aWMobWVyZ2UpO1xuICBJbW11dGFibGUucmVwbGFjZSAgICAgICAgPSB0b1N0YXRpYyhvYmplY3RSZXBsYWNlKTtcbiAgSW1tdXRhYmxlLndpdGhvdXQgICAgICAgID0gdG9TdGF0aWMod2l0aG91dCk7XG4gIEltbXV0YWJsZS5hc011dGFibGUgICAgICA9IHRvU3RhdGljT2JqZWN0T3JBcnJheShhc011dGFibGVPYmplY3QsIGFzTXV0YWJsZUFycmF5KTtcbiAgSW1tdXRhYmxlLnNldCAgICAgICAgICAgID0gdG9TdGF0aWNPYmplY3RPckFycmF5KG9iamVjdFNldCwgYXJyYXlTZXQpO1xuICBJbW11dGFibGUuc2V0SW4gICAgICAgICAgPSB0b1N0YXRpY09iamVjdE9yQXJyYXkob2JqZWN0U2V0SW4sIGFycmF5U2V0SW4pO1xuICBJbW11dGFibGUudXBkYXRlICAgICAgICAgPSB0b1N0YXRpYyh1cGRhdGUpO1xuICBJbW11dGFibGUudXBkYXRlSW4gICAgICAgPSB0b1N0YXRpYyh1cGRhdGVJbik7XG4gIEltbXV0YWJsZS5mbGF0TWFwICAgICAgICA9IHRvU3RhdGljKGZsYXRNYXApO1xuICBJbW11dGFibGUuYXNPYmplY3QgICAgICAgPSB0b1N0YXRpYyhhc09iamVjdCk7XG5cbiAgT2JqZWN0LmZyZWV6ZShJbW11dGFibGUpO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSW1tdXRhYmxlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZXhwb3J0cy5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgIHdpbmRvdy5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbC5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH1cbn0pKCk7XG4iLCJpbXBvcnQgSW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG5pbXBvcnQgVmFsaWRhdGlvbiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuaW1wb3J0IHsgcGlwZSB9IGZyb20gJ3JhbWRhJztcblxuZXhwb3J0IGNvbnN0IGNoZWNrVHlwZSA9ICh0eXBlQ2hlY2tlciwgY3VzdG9tQ2hlY2spID0+XG4gIHBpcGUoXG4gICAgdHlwZUNoZWNrZXIsXG4gICAgVmFsaWRhdGlvbi50aHJvd0ZhaWx1cmUsXG4gICAgVmFsaWRhdGlvbi53aXRoRGVmYXVsdChudWxsKSxcbiAgICBjdXN0b21DaGVja1xuICApO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1tdXRhYmxlQ29uc3RydWN0b3IodHlwZUNoZWNrZXIsIGN1c3RvbUNoZWNrID0gdiA9PiB2KSB7XG4gIHJldHVybiB7XG4gICAgb2Y6IHBpcGUoXG4gICAgICBjdXN0b21DaGVjayxcbiAgICAgIEltbXV0YWJsZSxcbiAgICApLFxuICB9O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbmltcG9ydCB7IGltbXV0YWJsZUNvbnN0cnVjdG9yIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBkYXRlLCBvYmplY3QgfSBmcm9tICcuL3R5cGUtY2hlY2tlcnMnO1xuaW1wb3J0IE1heWJlIGZyb20gJy4vTWF5YmUnO1xuaW1wb3J0IHsgcGlwZSB9IGZyb20gJ3JhbWRhJztcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vICAgICBBTEwgR0VUVEVSUyBBTkQgU0VUVEVSUyAoUFVCTElDIE9SIE5PVCkgTVVTVCBCRSBJTiBUSElTIEZJTEVcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGNvbnN0IHR5cGVDaGVjayA9IG9iamVjdCh7XG4gIHN0YXJ0OiBkYXRlLFxuICBlbmQ6IGRhdGUsXG59KTtcblxuLy8gQ09OU1RSVUNUT1JcbmNvbnN0IFRpbWVJbnRlcnZhbCA9IGltbXV0YWJsZUNvbnN0cnVjdG9yKHR5cGVDaGVjayk7XG5cbi8vIFBSSVZBVEUgR0VUVEVSU1xuZXhwb3J0IGNvbnN0IGdldFN0YXJ0ID0gbW9kZWwgPT4gKFxuICAhbW9kZWwgPyBudWxsXG4gICAgOiBtb2RlbC5zdGFydCBpbnN0YW5jZW9mIERhdGUgPyBtb2RlbC5zdGFydFxuICAgIDogbnVsbFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEVuZCA9IG1vZGVsID0+IChcbiAgIW1vZGVsID8gbnVsbFxuICAgIDogbW9kZWwuZW5kIGluc3RhbmNlb2YgRGF0ZSA/IG1vZGVsLmVuZFxuICAgIDogbnVsbFxuKTtcbi8vIEdFVFRFUlNcbi8vIFJldHVybnMgdGhlIHRpbWUgZGlmZmVyZW5jZSBiZXR3ZWV0IHN0YXJ0IGFuZCBlbmQgaW4gbWlsbGlzZWNvbmRzXG5leHBvcnQgY29uc3QgZ2V0VmFsdWUgPSAobW9kZWwpID0+IHtcbiAgY29uc3QgbWF5YmVTdGFydCA9IHBpcGUoXG4gICAgTWF5YmUub2YsXG4gICAgTWF5YmUubWFwKGdldFN0YXJ0KSxcbiAgICBNYXliZS5tYXAodiA9PiB2LnZhbHVlT2YoKSlcbiAgKShtb2RlbCk7XG5cbiAgY29uc3QgbWF5YmVFbmQgPSBwaXBlKFxuICAgIE1heWJlLm9mLFxuICAgIE1heWJlLm1hcChnZXRFbmQpLFxuICAgIE1heWJlLm1hcCh2ID0+IHYudmFsdWVPZigpKVxuICApKG1vZGVsKTtcbiAgcmV0dXJuIHBpcGUoXG4gICAgTWF5YmUubWFwMigocywgZSkgPT4gZSAtIHMpLFxuICAgIE1heWJlLndpdGhEZWZhdWx0KG51bGwpXG4gICkobWF5YmVTdGFydCwgbWF5YmVFbmQpO1xufTtcblxuT2JqZWN0LmFzc2lnbihUaW1lSW50ZXJ2YWwsIHtcbiAgdHlwZUNoZWNrLFxuICBnZXRTdGFydCxcbiAgZ2V0RW5kLFxuICBnZXRWYWx1ZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBUaW1lSW50ZXJ2YWw7XG4iLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCBUaW1lSW50ZXJ2YWwgZnJvbSAnLi4vVGltZUludGVydmFsJztcbmltcG9ydCB7XG4gIGlzUmVjb3JkaW5nLFxuICBnZXRTdGFydFRpbWUsXG4gIGdldEludGVydmFscyxcbiAgc2V0U3RhcnRUaW1lLFxuICBzZXRJbnRlcnZhbHMsXG59IGZyb20gJy4vaW5kZXgnO1xuXG4vKipcbiAqIFRvZ2dsZXMgYSByZWNvcmRpbmcgdG8gb24gb3Igb2ZmXG4gKiBAcGFyYW1zIHtQcm9qZWN0fSBtb2RlbFxuICogQHBhcmFtcyB7RGF0ZX0gdGltZVxuICogQHBhcmFtcyB7Qm9vbGVhbn0gb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3VycnkoKG1vZGVsKSA9PiB7XG4gIGlmICghaXNSZWNvcmRpbmcobW9kZWwpKSB7XG4gICAgcmV0dXJuIHNldFN0YXJ0VGltZShtb2RlbCwgbmV3IERhdGUoKSk7XG4gIH1cblxuICBjb25zdCBuZXdJbnRlcnZhbCA9IFRpbWVJbnRlcnZhbC5vZih7XG4gICAgc3RhcnQ6IGdldFN0YXJ0VGltZShtb2RlbCksXG4gICAgZW5kOiBuZXcgRGF0ZSgpLFxuICB9KTtcblxuICBjb25zdCB3aXRoU3RhcnRUaW1lID0gc2V0U3RhcnRUaW1lKG1vZGVsLCBudWxsKTtcbiAgcmV0dXJuIHNldEludGVydmFscyh3aXRoU3RhcnRUaW1lLCBbbmV3SW50ZXJ2YWwsIC4uLmdldEludGVydmFscyhtb2RlbCldKTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIEFkZHMgdHdvIHZhbHVlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBzZWUgUi5zdWJ0cmFjdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYWRkKDIsIDMpOyAgICAgICAvLz0+ICA1XG4gKiAgICAgIFIuYWRkKDcpKDEwKTsgICAgICAvLz0+IDE3XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gTnVtYmVyKGEpICsgTnVtYmVyKGIpO1xufSk7XG4iLCJpbXBvcnQgeyBhZGQsIHBpcGUgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBnZXRJbnRlcnZhbHMsIGdldFN0YXJ0VGltZSB9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IFRpbWVJbnRlcnZhbCBmcm9tICcuLi9UaW1lSW50ZXJ2YWwnO1xuXG4vKipcbiAqIEBtZXRob2QgY2FsY3VsYXRlUnVubmluZ1RpbWVcbiAqIEBwYXJhbSAge0RhdGV9IHN0YXJ0VGltZVxuICogQHBhcmFtICB7QXJyYXk8VGltZUludGVydmFsPn0gaW50ZXJ2YWxzIC0gVGltZSBpbnRlcnZhbHMgb2YgdHlwZSB7IHN0YXJ0OiBPYmplY3QsIGVuZDogT2JqZWN0fVxuICogQHJldHVybiB7SW50ZWdlcn1cbiAqL1xuZnVuY3Rpb24gY2FsY3VsYXRlUnVubmluZ1RpbWUoc3RhcnRUaW1lLCBpbnRlcnZhbHMpIHtcbiAgY29uc3QgaW50ZXJ2YWxzU3VtID0gaW50ZXJ2YWxzXG4gICAgLm1hcChUaW1lSW50ZXJ2YWwuZ2V0VmFsdWUpXG4gICAgLnJlZHVjZShhZGQsIDApO1xuXG4gIGNvbnN0IHN1bVNpbmNlU3RhcnRUaW1lID0gIXN0YXJ0VGltZVxuICAgID8gMFxuICAgIDogcGlwZShcbiAgICAgICAgZCA9PiAoeyBzdGFydDogZCwgZW5kOiBuZXcgRGF0ZSgpIH0pLFxuICAgICAgICBUaW1lSW50ZXJ2YWwub2YsXG4gICAgICAgIFRpbWVJbnRlcnZhbC5nZXRWYWx1ZVxuICAgICAgKShzdGFydFRpbWUpO1xuXG4gIHJldHVybiBpbnRlcnZhbHNTdW0gKyBzdW1TaW5jZVN0YXJ0VGltZTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtICB7UmVjb3JkaW5nfSByZWNvcmRpbmdcbiAqIEByZXR1cm4ge0ludGVnZXJ9IC0gVGltZSBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKG1vZGVsKSA9PiB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IGdldFN0YXJ0VGltZShtb2RlbCk7XG4gIGNvbnN0IGludGVydmFscyA9IGdldEludGVydmFscyhtb2RlbCk7XG5cbiAgcmV0dXJuIGNhbGN1bGF0ZVJ1bm5pbmdUaW1lKHN0YXJ0VGltZSwgaW50ZXJ2YWxzKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwLCBuby1uZXN0ZWQtdGVybmFyeSAqL1xuaW1wb3J0IHsgaW1tdXRhYmxlQ29uc3RydWN0b3IgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgVGltZUludGVydmFsIGZyb20gJy4uL1RpbWVJbnRlcnZhbCc7XG5pbXBvcnQgeyBudWxsYWJsZSwgYXJyYXksIGRhdGUsIG9iamVjdCB9IGZyb20gJy4uL3R5cGUtY2hlY2tlcnMnO1xuaW1wb3J0IHsgaXNOaWwsIHByb3BPciwgcGlwZSwgY3VycnkgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgX3RvZ2dsZVJlY29yZGluZyBmcm9tICcuL3RvZ2dsZVJlY29yZGluZyc7XG5pbXBvcnQgX3RvdGFsVGltZSBmcm9tICcuL3RvdGFsVGltZSc7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vICAgICBBTEwgR0VUVEVSUyBBTkQgU0VUVEVSUyAoUFVCTElDIE9SIE5PVCkgTVVTVCBCRSBJTiBUSElTIEZJTEVcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGNvbnN0IHR5cGVDaGVjayA9IG9iamVjdCh7XG4gIHN0YXJ0VGltZTogbnVsbGFibGUoZGF0ZSksXG4gIGludGVydmFsczogYXJyYXkoVGltZUludGVydmFsLnR5cGVDaGVjayksXG59KTtcblxuLy8gQ09OU1RSVUNUT1JcbmNvbnN0IFJlY29yZGluZyA9IGltbXV0YWJsZUNvbnN0cnVjdG9yKFxuICB0eXBlQ2hlY2ssXG4gIHIgPT4gKHtcbiAgICBzdGFydFRpbWU6IHIgJiYgci5zdGFydFRpbWUgPyByLnN0YXJ0VGltZSA6IG51bGwsXG4gICAgaW50ZXJ2YWxzOiByICYmIHIuaW50ZXJ2YWxzID8gci5pbnRlcnZhbHMgOiBbXSxcbiAgfSlcbik7XG5cbi8vIFBSSVZBVEUgR0VUVEVSU1xuZXhwb3J0IGNvbnN0IGdldFN0YXJ0VGltZSA9IHByb3BPcihudWxsLCAnc3RhcnRUaW1lJyk7XG5leHBvcnQgY29uc3QgZ2V0SW50ZXJ2YWxzID0gbW9kZWwgPT4gKFxuICBpc05pbChtb2RlbCkgPyBbXVxuICA6IGlzTmlsKG1vZGVsLmludGVydmFscykgPyBbXVxuICA6IG1vZGVsLmludGVydmFsc1xuKTtcblxuLy8gUFJJVkFURSBTRVRURVJTXG5leHBvcnQgY29uc3Qgc2V0U3RhcnRUaW1lID0gY3VycnkoKG1vZGVsLCB2KSA9PiB7XG4gIGNvbnN0IGltdXRhYmxlTW9kZWwgPSBJbW11dGFibGUobW9kZWwpO1xuICByZXR1cm4gISFpbXV0YWJsZU1vZGVsICYmICEhaW11dGFibGVNb2RlbC5tZXJnZVxuICAgID8gaW11dGFibGVNb2RlbC5tZXJnZSh7IHN0YXJ0VGltZTogdiB9LCB7IGRlZXA6IHRydWUgfSlcbiAgICA6IG51bGw7XG59KTtcblxuZXhwb3J0IGNvbnN0IHNldEludGVydmFscyA9IGN1cnJ5KChtb2RlbCwgdikgPT4ge1xuICBjb25zdCBpbXV0YWJsZU1vZGVsID0gSW1tdXRhYmxlKG1vZGVsKTtcbiAgcmV0dXJuICEhaW11dGFibGVNb2RlbCAmJiAhIWltdXRhYmxlTW9kZWwubWVyZ2VcbiAgICA/IGltdXRhYmxlTW9kZWwubWVyZ2UoeyBpbnRlcnZhbHM6IHYgfSwgeyBkZWVwOiB0cnVlIH0pXG4gICAgOiBudWxsO1xufSk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFBVQkxJQyBJTlRFUkZBQ0Vcbi8vIEJPT0xFQU4gXCJnZXR0dGVyc1wiXG5leHBvcnQgY29uc3QgaXNSZWNvcmRpbmcgPSBwaXBlKGdldFN0YXJ0VGltZSwgdiA9PiAhIXYpO1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVJlY29yZGluZyA9IF90b2dnbGVSZWNvcmRpbmc7XG5leHBvcnQgY29uc3QgdG90YWxUaW1lID0gX3RvdGFsVGltZTtcblxuT2JqZWN0LmFzc2lnbihSZWNvcmRpbmcsIHtcbiAgdHlwZUNoZWNrLFxuICBnZXRTdGFydFRpbWUsXG4gIGdldEludGVydmFscyxcbiAgc2V0U3RhcnRUaW1lLFxuICBzZXRJbnRlcnZhbHMsXG4gIGlzUmVjb3JkaW5nLFxuICB0b2dnbGVSZWNvcmRpbmcsXG4gIHRvdGFsVGltZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBSZWNvcmRpbmc7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG5pbXBvcnQgeyBwcm9wT3IsIGN1cnJ5LCBpc05pbCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IG9iamVjdCwgc3RyaW5nLCBudWxsYWJsZSB9IGZyb20gJy4vdHlwZS1jaGVja2Vycyc7XG5pbXBvcnQgeyBpbW11dGFibGVDb25zdHJ1Y3RvciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFJlY29yZGluZyBmcm9tICcuL1JlY29yZGluZyc7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy9cbi8vICAgICBBTEwgR0VUVEVSUyBBTkQgU0VUVEVSUyAoUFVCTElDIE9SIE5PVCkgTVVTVCBCRSBJTiBUSElTIEZJTEVcbi8vXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGNvbnN0IHR5cGVDaGVjayA9IG9iamVjdCh7XG4gIG5hbWU6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG4gIHJlY29yZGluZzogbnVsbGFibGUoUmVjb3JkaW5nLnR5cGVDaGVjayksXG59KTtcblxuY29uc3QgRGVsaXZlcmFibGUgPSBpbW11dGFibGVDb25zdHJ1Y3Rvcih0eXBlQ2hlY2spO1xuXG5leHBvcnQgY29uc3QgZ2V0UmVjb3JkaW5nID0gZGVsaXZlcmFibGUgPT4gKFxuICBkZWxpdmVyYWJsZVxuICAgID8gZGVsaXZlcmFibGUucmVjb3JkaW5nIHx8IFJlY29yZGluZy5vZih7fSlcbiAgICA6IG51bGxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXROYW1lID0gcHJvcE9yKG51bGwsICduYW1lJyk7XG5leHBvcnQgY29uc3QgZ2V0VXJsID0gcHJvcE9yKG51bGwsICd1cmwnKTtcblxuLy8gRGVsaXZlcmFibGUgLT4gUmVjb3JkaW5nIC0+IERlbGl2ZXJhYmxlXG5leHBvcnQgY29uc3Qgc2V0UmVjb3JkaW5nID0gY3VycnkoKG1vZGVsLCBuZXdSZWNvcmRpbmcpID0+IChcbiAgaXNOaWwobW9kZWwpXG4gICAgPyBudWxsXG4gICAgOiBJbW11dGFibGUobW9kZWwpLm1lcmdlKHsgcmVjb3JkaW5nOiBuZXdSZWNvcmRpbmcgfSwgeyBkZWVwOiB0cnVlIH0pXG4pKTtcblxuZXhwb3J0IGNvbnN0IGlzU2FtZSA9IGN1cnJ5KChkMSwgZDIpID0+IGdldE5hbWUoZDEpID09PSBnZXROYW1lKGQyKSk7XG5cbk9iamVjdC5hc3NpZ24oRGVsaXZlcmFibGUsIHtcbiAgdHlwZUNoZWNrLFxuICBnZXRSZWNvcmRpbmcsXG4gIGdldE5hbWUsXG4gIGdldFVybCxcbiAgc2V0UmVjb3JkaW5nLFxuICBpc1NhbWUsXG59KTtcbmV4cG9ydCBkZWZhdWx0IERlbGl2ZXJhYmxlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfYXJyYXlGcm9tSXRlcmF0b3IoaXRlcikge1xuICB2YXIgbGlzdCA9IFtdO1xuICB2YXIgbmV4dDtcbiAgd2hpbGUgKCEobmV4dCA9IGl0ZXIubmV4dCgpKS5kb25lKSB7XG4gICAgbGlzdC5wdXNoKG5leHQudmFsdWUpO1xuICB9XG4gIHJldHVybiBsaXN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2Z1bmN0aW9uTmFtZShmKSB7XG4gIC8vIFN0cmluZyh4ID0+IHgpIGV2YWx1YXRlcyB0byBcInggPT4geFwiLCBzbyB0aGUgcGF0dGVybiBtYXkgbm90IG1hdGNoLlxuICB2YXIgbWF0Y2ggPSBTdHJpbmcoZikubWF0Y2goL15mdW5jdGlvbiAoXFx3KikvKTtcbiAgcmV0dXJuIG1hdGNoID09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgaXRzIGFyZ3VtZW50cyBhcmUgaWRlbnRpY2FsLCBmYWxzZSBvdGhlcndpc2UuIFZhbHVlcyBhcmVcbiAqIGlkZW50aWNhbCBpZiB0aGV5IHJlZmVyZW5jZSB0aGUgc2FtZSBtZW1vcnkuIGBOYU5gIGlzIGlkZW50aWNhbCB0byBgTmFOYDtcbiAqIGAwYCBhbmQgYC0wYCBhcmUgbm90IGlkZW50aWNhbC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgYSAtPiBhIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBvID0ge307XG4gKiAgICAgIFIuaWRlbnRpY2FsKG8sIG8pOyAvLz0+IHRydWVcbiAqICAgICAgUi5pZGVudGljYWwoMSwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlkZW50aWNhbCgxLCAnMScpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaWRlbnRpY2FsKFtdLCBbXSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pZGVudGljYWwoMCwgLTApOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaWRlbnRpY2FsKE5hTiwgTmFOKTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBpZGVudGljYWwoYSwgYikge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmIChhID09PSBiKSB7IC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIGEgIT09IGEgJiYgYiAhPT0gYjtcbiAgfVxufSk7XG4iLCJ2YXIgX2hhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcmd1bWVudHMpID09PSAnW29iamVjdCBBcmd1bWVudHNdJyA/XG4gICAgZnVuY3Rpb24gX2lzQXJndW1lbnRzKHgpIHsgcmV0dXJuIHRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nOyB9IDpcbiAgICBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkgeyByZXR1cm4gX2hhcygnY2FsbGVlJywgeCk7IH07XG59KCkpO1xuIiwidmFyIF9jdXJyeTEgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcbnZhciBfaGFzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG52YXIgX2lzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcmd1bWVudHMnKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IGNvbnRhaW5pbmcgdGhlIG5hbWVzIG9mIGFsbCB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZlxuICogdGhlIHN1cHBsaWVkIG9iamVjdC5cbiAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50XG4gKiBhY3Jvc3MgZGlmZmVyZW50IEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6IHZ9IC0+IFtrXVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgcHJvcGVydGllcyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIua2V5cyh7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IFsnYScsICdiJywgJ2MnXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgLy8gY292ZXIgSUUgPCA5IGtleXMgaXNzdWVzXG4gIHZhciBoYXNFbnVtQnVnID0gISh7dG9TdHJpbmc6IG51bGx9KS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsnY29uc3RydWN0b3InLCAndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcbiAgLy8gU2FmYXJpIGJ1Z1xuICB2YXIgaGFzQXJnc0VudW1CdWcgPSAoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJldHVybiBhcmd1bWVudHMucHJvcGVydHlJc0VudW1lcmFibGUoJ2xlbmd0aCcpO1xuICB9KCkpO1xuXG4gIHZhciBjb250YWlucyA9IGZ1bmN0aW9uIGNvbnRhaW5zKGxpc3QsIGl0ZW0pIHtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgIGlmIChsaXN0W2lkeF0gPT09IGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgIWhhc0FyZ3NFbnVtQnVnID9cbiAgICBfY3VycnkxKGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iaiA/IFtdIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICB9KSA6XG4gICAgX2N1cnJ5MShmdW5jdGlvbiBrZXlzKG9iaikge1xuICAgICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgdmFyIHByb3AsIG5JZHg7XG4gICAgICB2YXIga3MgPSBbXTtcbiAgICAgIHZhciBjaGVja0FyZ3NMZW5ndGggPSBoYXNBcmdzRW51bUJ1ZyAmJiBfaXNBcmd1bWVudHMob2JqKTtcbiAgICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKF9oYXMocHJvcCwgb2JqKSAmJiAoIWNoZWNrQXJnc0xlbmd0aCB8fCBwcm9wICE9PSAnbGVuZ3RoJykpIHtcbiAgICAgICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGhhc0VudW1CdWcpIHtcbiAgICAgICAgbklkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAobklkeCA+PSAwKSB7XG4gICAgICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tuSWR4XTtcbiAgICAgICAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICFjb250YWlucyhrcywgcHJvcCkpIHtcbiAgICAgICAgICAgIGtzW2tzLmxlbmd0aF0gPSBwcm9wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuSWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBrcztcbiAgICB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG5cbi8qKlxuICogR2l2ZXMgYSBzaW5nbGUtd29yZCBzdHJpbmcgZGVzY3JpcHRpb24gb2YgdGhlIChuYXRpdmUpIHR5cGUgb2YgYSB2YWx1ZSxcbiAqIHJldHVybmluZyBzdWNoIGFuc3dlcnMgYXMgJ09iamVjdCcsICdOdW1iZXInLCAnQXJyYXknLCBvciAnTnVsbCcuIERvZXMgbm90XG4gKiBhdHRlbXB0IHRvIGRpc3Rpbmd1aXNoIHVzZXIgT2JqZWN0IHR5cGVzIGFueSBmdXJ0aGVyLCByZXBvcnRpbmcgdGhlbSBhbGwgYXNcbiAqICdPYmplY3QnLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IFR5cGVcbiAqIEBzaWcgKCogLT4geyp9KSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50eXBlKHt9KTsgLy89PiBcIk9iamVjdFwiXG4gKiAgICAgIFIudHlwZSgxKTsgLy89PiBcIk51bWJlclwiXG4gKiAgICAgIFIudHlwZShmYWxzZSk7IC8vPT4gXCJCb29sZWFuXCJcbiAqICAgICAgUi50eXBlKCdzJyk7IC8vPT4gXCJTdHJpbmdcIlxuICogICAgICBSLnR5cGUobnVsbCk7IC8vPT4gXCJOdWxsXCJcbiAqICAgICAgUi50eXBlKFtdKTsgLy89PiBcIkFycmF5XCJcbiAqICAgICAgUi50eXBlKC9bQS16XS8pOyAvLz0+IFwiUmVnRXhwXCJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkxKGZ1bmN0aW9uIHR5cGUodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IG51bGwgICAgICA/ICdOdWxsJyAgICAgIDpcbiAgICAgICAgIHZhbCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOlxuICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xufSk7XG4iLCJ2YXIgX2FycmF5RnJvbUl0ZXJhdG9yID0gcmVxdWlyZSgnLi9fYXJyYXlGcm9tSXRlcmF0b3InKTtcbnZhciBfZnVuY3Rpb25OYW1lID0gcmVxdWlyZSgnLi9fZnVuY3Rpb25OYW1lJyk7XG52YXIgX2hhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIGlkZW50aWNhbCA9IHJlcXVpcmUoJy4uL2lkZW50aWNhbCcpO1xudmFyIGtleXMgPSByZXF1aXJlKCcuLi9rZXlzJyk7XG52YXIgdHlwZSA9IHJlcXVpcmUoJy4uL3R5cGUnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9lcXVhbHMoYSwgYiwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKGlkZW50aWNhbChhLCBiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGUoYSkgIT09IHR5cGUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBhLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJiBhLmVxdWFscyhiKSAmJlxuICAgICAgICAgICB0eXBlb2YgYi5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYi5lcXVhbHMoYSk7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGUoYSkpIHtcbiAgICBjYXNlICdBcmd1bWVudHMnOlxuICAgIGNhc2UgJ0FycmF5JzpcbiAgICBjYXNlICdPYmplY3QnOlxuICAgICAgaWYgKHR5cGVvZiBhLmNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgX2Z1bmN0aW9uTmFtZShhLmNvbnN0cnVjdG9yKSA9PT0gJ1Byb21pc2UnKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgaWYgKCEodHlwZW9mIGEgPT09IHR5cGVvZiBiICYmIGlkZW50aWNhbChhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdEYXRlJzpcbiAgICAgIGlmICghaWRlbnRpY2FsKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRXJyb3InOlxuICAgICAgcmV0dXJuIGEubmFtZSA9PT0gYi5uYW1lICYmIGEubWVzc2FnZSA9PT0gYi5tZXNzYWdlO1xuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICBpZiAoIShhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiZcbiAgICAgICAgICAgIGEuZ2xvYmFsID09PSBiLmdsb2JhbCAmJlxuICAgICAgICAgICAgYS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2UgJiZcbiAgICAgICAgICAgIGEubXVsdGlsaW5lID09PSBiLm11bHRpbGluZSAmJlxuICAgICAgICAgICAgYS5zdGlja3kgPT09IGIuc3RpY2t5ICYmXG4gICAgICAgICAgICBhLnVuaWNvZGUgPT09IGIudW5pY29kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTWFwJzpcbiAgICBjYXNlICdTZXQnOlxuICAgICAgaWYgKCFfZXF1YWxzKF9hcnJheUZyb21JdGVyYXRvcihhLmVudHJpZXMoKSksIF9hcnJheUZyb21JdGVyYXRvcihiLmVudHJpZXMoKSksIHN0YWNrQSwgc3RhY2tCKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdJbnQ4QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQ4QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQ4Q2xhbXBlZEFycmF5JzpcbiAgICBjYXNlICdJbnQxNkFycmF5JzpcbiAgICBjYXNlICdVaW50MTZBcnJheSc6XG4gICAgY2FzZSAnSW50MzJBcnJheSc6XG4gICAgY2FzZSAnVWludDMyQXJyYXknOlxuICAgIGNhc2UgJ0Zsb2F0MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQ2NEFycmF5JzpcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0FycmF5QnVmZmVyJzpcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBWYWx1ZXMgb2Ygb3RoZXIgdHlwZXMgYXJlIG9ubHkgZXF1YWwgaWYgaWRlbnRpY2FsLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0ga2V5cyhhKTtcbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaWR4ID0gc3RhY2tBLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCkge1xuICAgIGlmIChzdGFja0FbaWR4XSA9PT0gYSkge1xuICAgICAgcmV0dXJuIHN0YWNrQltpZHhdID09PSBiO1xuICAgIH1cbiAgICBpZHggLT0gMTtcbiAgfVxuXG4gIHN0YWNrQS5wdXNoKGEpO1xuICBzdGFja0IucHVzaChiKTtcbiAgaWR4ID0ga2V5c0EubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgdmFyIGtleSA9IGtleXNBW2lkeF07XG4gICAgaWYgKCEoX2hhcyhrZXksIGIpICYmIF9lcXVhbHMoYltrZXldLCBhW2tleV0sIHN0YWNrQSwgc3RhY2tCKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG4gIHJldHVybiB0cnVlO1xufTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2VxdWFscyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2VxdWFscycpO1xuXG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgaXRzIGFyZ3VtZW50cyBhcmUgZXF1aXZhbGVudCwgYGZhbHNlYCBvdGhlcndpc2UuIEhhbmRsZXNcbiAqIGN5Y2xpY2FsIGRhdGEgc3RydWN0dXJlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHN5bW1ldHJpY2FsbHkgdG8gdGhlIGBlcXVhbHNgIG1ldGhvZHMgb2YgYm90aCBhcmd1bWVudHMsIGlmXG4gKiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBhIC0+IGIgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcXVhbHMoMSwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmVxdWFscygxLCAnMScpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gKlxuICogICAgICB2YXIgYSA9IHt9OyBhLnYgPSBhO1xuICogICAgICB2YXIgYiA9IHt9OyBiLnYgPSBiO1xuICogICAgICBSLmVxdWFscyhhLCBiKTsgLy89PiB0cnVlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICByZXR1cm4gX2VxdWFscyhhLCBiLCBbXSwgW10pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGVxdWFscyA9IHJlcXVpcmUoJy4vZXF1YWxzJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBpcyBlcXVhbCwgaW4gYFIuZXF1YWxzYFxuICogdGVybXMsIHRvIHRoZSBnaXZlbiB2YWx1ZTsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgU3RyaW5nIC0+IGEgLT4gT2JqZWN0IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZXF1YWxzLCBSLnByb3BTYXRpc2ZpZXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWJieSA9IHtuYW1lOiAnQWJieScsIGFnZTogNywgaGFpcjogJ2Jsb25kJ307XG4gKiAgICAgIHZhciBmcmVkID0ge25hbWU6ICdGcmVkJywgYWdlOiAxMiwgaGFpcjogJ2Jyb3duJ307XG4gKiAgICAgIHZhciBydXN0eSA9IHtuYW1lOiAnUnVzdHknLCBhZ2U6IDEwLCBoYWlyOiAnYnJvd24nfTtcbiAqICAgICAgdmFyIGFsb2lzID0ge25hbWU6ICdBbG9pcycsIGFnZTogMTUsIGRpc3Bvc2l0aW9uOiAnc3VybHknfTtcbiAqICAgICAgdmFyIGtpZHMgPSBbYWJieSwgZnJlZCwgcnVzdHksIGFsb2lzXTtcbiAqICAgICAgdmFyIGhhc0Jyb3duSGFpciA9IFIucHJvcEVxKCdoYWlyJywgJ2Jyb3duJyk7XG4gKiAgICAgIFIuZmlsdGVyKGhhc0Jyb3duSGFpciwga2lkcyk7IC8vPT4gW2ZyZWQsIHJ1c3R5XVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcHJvcEVxKG5hbWUsIHZhbCwgb2JqKSB7XG4gIHJldHVybiBlcXVhbHModmFsLCBvYmpbbmFtZV0pO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGAhYCBvZiBpdHMgYXJndW1lbnQuIEl0IHdpbGwgcmV0dXJuIGB0cnVlYCB3aGVuXG4gKiBwYXNzZWQgZmFsc2UteSB2YWx1ZSwgYW5kIGBmYWxzZWAgd2hlbiBwYXNzZWQgYSB0cnV0aC15IG9uZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gYSBhbnkgdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRoZSBsb2dpY2FsIGludmVyc2Ugb2YgcGFzc2VkIGFyZ3VtZW50LlxuICogQHNlZSBSLmNvbXBsZW1lbnRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm5vdCh0cnVlKTsgLy89PiBmYWxzZVxuICogICAgICBSLm5vdChmYWxzZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLm5vdCgwKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubm90KDEpOyAvLz0+IGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiBub3QoYSkge1xuICByZXR1cm4gIWE7XG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2lzVHJhbnNmb3JtZXIob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqWydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBfaXNBcnJheSA9IHJlcXVpcmUoJy4vX2lzQXJyYXknKTtcbnZhciBfaXNUcmFuc2Zvcm1lciA9IHJlcXVpcmUoJy4vX2lzVHJhbnNmb3JtZXInKTtcbnZhciBfc2xpY2UgPSByZXF1aXJlKCcuL19zbGljZScpO1xuXG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyB3aXRoIGRpZmZlcmVudCBzdHJhdGVnaWVzIGJhc2VkIG9uIHRoZVxuICogb2JqZWN0IGluIGxpc3QgcG9zaXRpb24gKGxhc3QgYXJndW1lbnQpLiBJZiBpdCBpcyBhbiBhcnJheSwgZXhlY3V0ZXMgW2ZuXS5cbiAqIE90aGVyd2lzZSwgaWYgaXQgaGFzIGEgZnVuY3Rpb24gd2l0aCBbbWV0aG9kbmFtZV0sIGl0IHdpbGwgZXhlY3V0ZSB0aGF0XG4gKiBmdW5jdGlvbiAoZnVuY3RvciBjYXNlKS4gT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRyYW5zZm9ybWVyLCB1c2VzIHRyYW5zZHVjZXJcbiAqIFt4Zl0gdG8gcmV0dXJuIGEgbmV3IHRyYW5zZm9ybWVyICh0cmFuc2R1Y2VyIGNhc2UpLiBPdGhlcndpc2UsIGl0IHdpbGxcbiAqIGRlZmF1bHQgdG8gZXhlY3V0aW5nIFtmbl0uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RuYW1lIHByb3BlcnR5IHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0geGYgdHJhbnNkdWNlciB0byBpbml0aWFsaXplIGlmIG9iamVjdCBpcyB0cmFuc2Zvcm1lclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gZGVmYXVsdCByYW1kYSBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIG9uIG9iamVjdCBpbiBsaXN0IHBvc2l0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2Rpc3BhdGNoYWJsZShtZXRob2RuYW1lLCB4ZiwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgb2JqID0gYXJndW1lbnRzW2xlbmd0aCAtIDFdO1xuICAgIGlmICghX2lzQXJyYXkob2JqKSkge1xuICAgICAgdmFyIGFyZ3MgPSBfc2xpY2UoYXJndW1lbnRzLCAwLCBsZW5ndGggLSAxKTtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW21ldGhvZG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBvYmpbbWV0aG9kbmFtZV0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIGlmIChfaXNUcmFuc2Zvcm1lcihvYmopKSB7XG4gICAgICAgIHZhciB0cmFuc2R1Y2VyID0geGYuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgIHJldHVybiB0cmFuc2R1Y2VyKG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2ZpbHRlcihmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNPYmplY3QoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBPYmplY3RdJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbiAgfSxcbiAgcmVzdWx0OiBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH1cbn07XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vX2N1cnJ5MicpO1xudmFyIF94ZkJhc2UgPSByZXF1aXJlKCcuL194ZkJhc2UnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWEZpbHRlcihmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICB9XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KSA6IHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbHRlcihmLCB4ZikgeyByZXR1cm4gbmV3IFhGaWx0ZXIoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfZmlsdGVyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fZmlsdGVyJyk7XG52YXIgX2lzT2JqZWN0ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNPYmplY3QnKTtcbnZhciBfcmVkdWNlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG52YXIgX3hmaWx0ZXIgPSByZXF1aXJlKCcuL2ludGVybmFsL194ZmlsdGVyJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgXCJmaWx0ZXJhYmxlXCIsIGFuZCByZXR1cm5zIGEgbmV3IGZpbHRlcmFibGUgb2YgdGhlXG4gKiBzYW1lIHR5cGUgY29udGFpbmluZyB0aGUgbWVtYmVycyBvZiB0aGUgZ2l2ZW4gZmlsdGVyYWJsZSB3aGljaCBzYXRpc2Z5IHRoZVxuICogZ2l2ZW4gcHJlZGljYXRlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmaWx0ZXJgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5yZWplY3QsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLmZpbHRlcihpc0V2ZW4sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGQ6IDR9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaWx0ZXInLCBfeGZpbHRlciwgZnVuY3Rpb24ocHJlZCwgZmlsdGVyYWJsZSkge1xuICByZXR1cm4gKFxuICAgIF9pc09iamVjdChmaWx0ZXJhYmxlKSA/XG4gICAgICBfcmVkdWNlKGZ1bmN0aW9uKGFjYywga2V5KSB7XG4gICAgICAgIGlmIChwcmVkKGZpbHRlcmFibGVba2V5XSkpIHtcbiAgICAgICAgICBhY2Nba2V5XSA9IGZpbHRlcmFibGVba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30sIGtleXMoZmlsdGVyYWJsZSkpIDpcbiAgICAvLyBlbHNlXG4gICAgICBfZmlsdGVyKHByZWQsIGZpbHRlcmFibGUpXG4gICk7XG59KSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG5pbXBvcnQgeyBzdHJpbmcsIG9iamVjdCwgYXJyYXksIG51bGxhYmxlIH0gZnJvbSAnLi90eXBlLWNoZWNrZXJzJztcbmltcG9ydCBEZWxpdmVyYWJsZSBmcm9tICcuL0RlbGl2ZXJhYmxlJztcbmltcG9ydCBNYXliZSBmcm9tICcuL01heWJlJztcbmltcG9ydCB7IGltbXV0YWJsZUNvbnN0cnVjdG9yIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBwaXBlLCBwcm9wT3IsIGN1cnJ5LCBwcm9wRXEsIGZpbHRlciwgbm90IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IEltbXV0YWJsZSBmcm9tICdzZWFtbGVzcy1pbW11dGFibGUnO1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vL1xuLy8gICAgIEFMTCBHRVRURVJTIEFORCBTRVRURVJTIChQVUJMSUMgT1IgTk9UKSBNVVNUIEJFIElOIFRISVMgRklMRVxuLy9cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgY29uc3QgdHlwZUNoZWNrID0gb2JqZWN0KHtcbiAgbmFtZTogc3RyaW5nLFxuICB1cmw6IHN0cmluZyxcbiAgdW5zZWxlY3RlZERlbGl2ZXJhYmxlczogYXJyYXkoRGVsaXZlcmFibGUudHlwZUNoZWNrKSxcbiAgc2VsZWN0ZWREZWxpdmVyYWJsZTogbnVsbGFibGUoRGVsaXZlcmFibGUudHlwZUNoZWNrKSxcbn0pO1xuXG4vLyB1bnNlbGVjdGVkRGVsaXZlcmFibGVzIGFuZCBzZWxlY3RlZERlbGl2ZXJhYmxlcyB0b2dldGhlciBmb3JtIGEgemlwbGlzdC5cbmNvbnN0IFByb2plY3QgPSBpbW11dGFibGVDb25zdHJ1Y3Rvcih0eXBlQ2hlY2spO1xuXG4vLyBHRVRURVJTXG5leHBvcnQgY29uc3QgZ2V0TmFtZSA9IHByb3BPcihudWxsLCAnbmFtZScpO1xuZXhwb3J0IGNvbnN0IGdldFVybCA9IHByb3BPcihudWxsLCAndXJsJyk7XG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZSA9IHByb3BPcihudWxsLCAnc2VsZWN0ZWREZWxpdmVyYWJsZScpO1xuZXhwb3J0IGNvbnN0IGdldERlbGl2ZXJhYmxlcyA9IG1vZGVsID0+IChcbiAgZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZShtb2RlbClcbiAgICA/IFtnZXRTZWxlY3RlZERlbGl2ZXJhYmxlKG1vZGVsKSwgLi4ucHJvcE9yKFtdLCAndW5zZWxlY3RlZERlbGl2ZXJhYmxlcycsIG1vZGVsKV1cbiAgICA6IHByb3BPcihbXSwgJ3Vuc2VsZWN0ZWREZWxpdmVyYWJsZXMnLCBtb2RlbClcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHNldFNlbGVjdGVkRGVsaXZlcmFibGUgPSBjdXJyeSgobW9kZWwsIG5ld1NlbGVjdGVkKSA9PlxuICBNYXliZS5vZihtb2RlbClcbiAgICAubWFwKGdldERlbGl2ZXJhYmxlcylcbiAgICAubWFwKGZpbHRlcihwaXBlKERlbGl2ZXJhYmxlLmlzU2FtZShuZXdTZWxlY3RlZCksIG5vdCkpKVxuICAgIC5tYXAobmV3RGVsaXZlcmFibGVzID0+XG4gICAgICBJbW11dGFibGUobW9kZWwpLm1lcmdlKHtcbiAgICAgICAgdW5zZWxlY3RlZERlbGl2ZXJhYmxlczogbmV3RGVsaXZlcmFibGVzLFxuICAgICAgICBzZWxlY3RlZERlbGl2ZXJhYmxlOiBuZXdTZWxlY3RlZCB8fCBudWxsLFxuICAgICAgfSlcbiAgICApXG4gICAgLndpdGhEZWZhdWx0KG1vZGVsKVxuKTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZURlbGl2ZXJhYmxlID0gY3VycnkoKG1vZGVsLCBuZXdEZWxpdmVyYWJsZSkgPT4geyAvLyBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5XG4gIGlmICghbW9kZWwgfHwgIW5ld0RlbGl2ZXJhYmxlKSB7XG4gICAgcmV0dXJuIG1vZGVsO1xuICB9XG5cbiAgY29uc3Qgc2FtZU5hbWUgPSBkZWxpdiA9PiAoXG4gICAgICBkZWxpdlxuICAgICAgPyBwcm9wRXEoJ25hbWUnLCBuZXdEZWxpdmVyYWJsZS5uYW1lLCBkZWxpdilcbiAgICAgIDogZmFsc2VcbiAgICApO1xuXG4gIGlmIChzYW1lTmFtZShQcm9qZWN0LmdldFNlbGVjdGVkRGVsaXZlcmFibGUobW9kZWwpKSkge1xuICAgIHJldHVybiBJbW11dGFibGUobW9kZWwpLm1lcmdlKHtcbiAgICAgIHNlbGVjdGVkRGVsaXZlcmFibGU6IG5ld0RlbGl2ZXJhYmxlLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKG1vZGVsLnVuc2VsZWN0ZWREZWxpdmVyYWJsZXMuZmluZChzYW1lTmFtZSkpIHtcbiAgICBjb25zdCBuZXdVbnNlbGVjdGVkID0gbW9kZWwudW5zZWxlY3RlZERlbGl2ZXJhYmxlcy5tYXAoXG4gICAgICBkID0+IChzYW1lTmFtZShkKSA/IG5ld0RlbGl2ZXJhYmxlIDogZClcbiAgICApO1xuXG4gICAgcmV0dXJuIEltbXV0YWJsZShtb2RlbCkubWVyZ2Uoe1xuICAgICAgdW5zZWxlY3RlZERlbGl2ZXJhYmxlczogbmV3VW5zZWxlY3RlZCxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbW9kZWw7XG59KTtcblxuZXhwb3J0IGNvbnN0IGlzU2FtZSA9IGN1cnJ5KChwMSwgcDIpID0+IGdldE5hbWUocDEpID09PSBnZXROYW1lKHAyKSk7XG5cblxuLy8gTk8gU0VUVEVSU1xuT2JqZWN0LmFzc2lnbihQcm9qZWN0LCB7XG4gIHR5cGVDaGVjayxcbiAgZ2V0TmFtZSxcbiAgZ2V0VXJsLFxuICBnZXREZWxpdmVyYWJsZXMsXG4gIGdldFNlbGVjdGVkRGVsaXZlcmFibGUsXG4gIHNldFNlbGVjdGVkRGVsaXZlcmFibGUsXG4gIHVwZGF0ZURlbGl2ZXJhYmxlLFxuICBpc1NhbWUsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbiIsImltcG9ydCBfTWF5YmUgZnJvbSAnLi9NYXliZSc7XG5pbXBvcnQgX1JlbW90ZURhdGEgZnJvbSAnLi9SZW1vdGVEYXRhJztcbmltcG9ydCBfVmFsaWRhdGlvbiBmcm9tICcuL1ZhbGlkYXRpb24nO1xuaW1wb3J0IF90eXBlQ2hlY2tlcnMgZnJvbSAnLi90eXBlLWNoZWNrZXJzJztcbmltcG9ydCBfUmVjb3JkaW5nIGZyb20gJy4vUmVjb3JkaW5nJztcbmltcG9ydCBfVGltZUludGVydmFsIGZyb20gJy4vVGltZUludGVydmFsJztcbmltcG9ydCBfRGVsaXZlcmFibGUgZnJvbSAnLi9EZWxpdmVyYWJsZSc7XG5pbXBvcnQgX1Byb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcblxuZXhwb3J0IGNvbnN0IE1heWJlID0gX01heWJlO1xuZXhwb3J0IGNvbnN0IFJlbW90ZURhdGEgPSBfUmVtb3RlRGF0YTtcbmV4cG9ydCBjb25zdCBWYWxpZGF0aW9uID0gX1ZhbGlkYXRpb247XG5leHBvcnQgY29uc3QgdHlwZUNoZWNrZXJzID0gX3R5cGVDaGVja2VycztcbmV4cG9ydCBjb25zdCBSZWNvcmRpbmcgPSBfUmVjb3JkaW5nO1xuZXhwb3J0IGNvbnN0IFRpbWVJbnRlcnZhbCA9IF9UaW1lSW50ZXJ2YWw7XG5leHBvcnQgY29uc3QgRGVsaXZlcmFibGUgPSBfRGVsaXZlcmFibGU7XG5leHBvcnQgY29uc3QgUHJvamVjdCA9IF9Qcm9qZWN0O1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwLCBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuaW1wb3J0IHtcbiAgVmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vanMvdHlwZXMnO1xuXG5kZXNjcmliZSgnVmFsaWRhdGlvbiB0eXBlJywgKCkgPT4ge1xuICBjb25zdCBzdWNjZXNzVmFsID0gJ3N1Y2Nlc3MnO1xuICBjb25zdCBzdWNjZXNzVmFsMiA9ICdzdWNjZXNzMic7XG4gIGNvbnN0IGZhaWx1cmVWYWwgPSAnZmFpbHVyZSc7XG4gIGNvbnN0IGFTdWNjZXNzID0gVmFsaWRhdGlvbi5TdWNjZXNzKHN1Y2Nlc3NWYWwpO1xuICBjb25zdCBhU3VjY2VzczIgPSBWYWxpZGF0aW9uLlN1Y2Nlc3Moc3VjY2Vzc1ZhbDIpO1xuICBjb25zdCBhRmFpbHVyZSA9IFZhbGlkYXRpb24uRmFpbHVyZShmYWlsdXJlVmFsKTtcblxuICBpdCgnY3JlYXRlcyBhIHN1Y2Nlc3MgdmFsdWUgd2l0aCBhIHRydXRoeSBwYXJhbWV0ZXInLCAoKSA9PiB7XG4gICAgY29uc3QgYSA9IFZhbGlkYXRpb24uU3VjY2VzcygxMjMpO1xuICAgIGV4cGVjdChhLmlzU3VjY2VzcykudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5pc1N1Y2Nlc3MoYSkpLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdjcmVhdGVzIGEgZmFpbHVyZSB3aXRoIHRoZSBGYWlsdXJlIGZ1bmN0aW9uIGV2ZW4gaWYgdGhlIHZhbHVlIGlzIHRydXRoeScsICgpID0+IHtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5GYWlsdXJlKCdhIHJlYXNvbicpLmlzU3VjY2VzcykudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gRmFpbHVyZSB3aXRoIHdpdGhEZWZhbGF1bHQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uRmFpbHVyZSgpLndpdGhEZWZhdWx0KCdkZWZhdWx0JykpLnRvRXF1YWwoJ2RlZmF1bHQnKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi53aXRoRGVmYXVsdCgnZGVmYXVsdCcsIFZhbGlkYXRpb24uRmFpbHVyZSgpKSkudG9FcXVhbCgnZGVmYXVsdCcpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB0aGUgbWFpbiB2YWx1ZSB3aGVuIFN1Y2Nlc3Mgd2l0aCB3aXRoRGVmYWxhdWx0JywgKCkgPT4ge1xuICAgIGV4cGVjdChhU3VjY2Vzcy53aXRoRGVmYXVsdCgnZXJyb3InKSkudG9FcXVhbChzdWNjZXNzVmFsKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi53aXRoRGVmYXVsdCgnZXJyb3InLCBhU3VjY2VzcykpLnRvRXF1YWwoc3VjY2Vzc1ZhbCk7XG4gIH0pO1xuXG5cbiAgaXQoJ21hcHMgc3VjY2Vzc2VzIGFuZCBub3QgZmFpbHVyZXMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGFTdWNjZXNzLm1hcChfID0+ICdyJykuX3ZhbHVlKS50b0VxdWFsKCdyJyk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwKF8gPT4gJ3InLCBhU3VjY2VzcykuX3ZhbHVlKS50b0VxdWFsKCdyJyk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwKF8gPT4gJ3InKShhU3VjY2VzcykuX3ZhbHVlKS50b0VxdWFsKCdyJyk7XG5cbiAgICBleHBlY3QoYUZhaWx1cmUubWFwKF8gPT4gJ3InKS5fdmFsdWUpLnRvRXF1YWwoZmFpbHVyZVZhbCk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwKF8gPT4gJ3InLCBhRmFpbHVyZSkuX3ZhbHVlKS50b0VxdWFsKGZhaWx1cmVWYWwpO1xuICAgIGV4cGVjdChWYWxpZGF0aW9uLm1hcChfID0+ICdyJykoYUZhaWx1cmUpLl92YWx1ZSkudG9FcXVhbChmYWlsdXJlVmFsKTtcbiAgfSk7XG5cbiAgaXQoJ291dHB1dHMgYSBWYWxpZGF0aW9uIHR5cGUgd2hlbiBtYXBwaW5nJywgKCkgPT4ge1xuICAgIGV4cGVjdChhU3VjY2Vzcy5tYXAoXyA9PiAncicpIGluc3RhbmNlb2YgVmFsaWRhdGlvbikudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5tYXAoXyA9PiAncicsIGFTdWNjZXNzKSBpbnN0YW5jZW9mIFZhbGlkYXRpb24pLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwKF8gPT4gJ3InKShhU3VjY2VzcykgaW5zdGFuY2VvZiBWYWxpZGF0aW9uKS50b0JlKHRydWUpO1xuXG4gICAgZXhwZWN0KGFGYWlsdXJlLm1hcChfID0+ICdyJykgaW5zdGFuY2VvZiBWYWxpZGF0aW9uKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChWYWxpZGF0aW9uLm1hcChfID0+ICdyJywgYUZhaWx1cmUpIGluc3RhbmNlb2YgVmFsaWRhdGlvbikudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5tYXAoXyA9PiAncicpKGFGYWlsdXJlKSBpbnN0YW5jZW9mIFZhbGlkYXRpb24pLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdtYXBzIG9ubHkgc3VjY2Vzc2VzIHdpdGggbWFwU3VjY2VzcycsICgpID0+IHtcbiAgICBleHBlY3QoYVN1Y2Nlc3MubWFwU3VjY2VzcyhfID0+ICdyJykuX3ZhbHVlKS50b0VxdWFsKCdyJyk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwU3VjY2VzcyhfID0+ICdyJywgYVN1Y2Nlc3MpLl92YWx1ZSkudG9FcXVhbCgncicpO1xuICAgIGV4cGVjdChWYWxpZGF0aW9uLm1hcFN1Y2Nlc3MoXyA9PiAncicpKGFTdWNjZXNzKS5fdmFsdWUpLnRvRXF1YWwoJ3InKTtcblxuICAgIGV4cGVjdChhRmFpbHVyZS5tYXBTdWNjZXNzKF8gPT4gJ3InKS5fdmFsdWUpLnRvRXF1YWwoZmFpbHVyZVZhbCk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwU3VjY2VzcyhfID0+ICdyJywgYUZhaWx1cmUpLl92YWx1ZSkudG9FcXVhbChmYWlsdXJlVmFsKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5tYXBTdWNjZXNzKF8gPT4gJ3InKShhRmFpbHVyZSkuX3ZhbHVlKS50b0VxdWFsKGZhaWx1cmVWYWwpO1xuICB9KTtcblxuICBpdCgnbWFwcyBvbmx5IGZhaWx1cmVzIHdpdGggbWFwRmFpbHVyZScsICgpID0+IHtcbiAgICBleHBlY3QoYVN1Y2Nlc3MubWFwRmFpbHVyZShfID0+ICdyJykuX3ZhbHVlKS50b0VxdWFsKHN1Y2Nlc3NWYWwpO1xuICAgIGV4cGVjdChWYWxpZGF0aW9uLm1hcEZhaWx1cmUoXyA9PiAncicsIGFTdWNjZXNzKS5fdmFsdWUpLnRvRXF1YWwoc3VjY2Vzc1ZhbCk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwRmFpbHVyZShfID0+ICdyJykoYVN1Y2Nlc3MpLl92YWx1ZSkudG9FcXVhbChzdWNjZXNzVmFsKTtcblxuICAgIGV4cGVjdChhRmFpbHVyZS5tYXBGYWlsdXJlKF8gPT4gJ3InKS5fdmFsdWUpLnRvRXF1YWwoJ3InKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5tYXBGYWlsdXJlKF8gPT4gJ3InLCBhRmFpbHVyZSkuX3ZhbHVlKS50b0VxdWFsKCdyJyk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24ubWFwRmFpbHVyZShfID0+ICdyJykoYUZhaWx1cmUpLl92YWx1ZSkudG9FcXVhbCgncicpO1xuICB9KTtcblxuICBpdCgndGhyb3dzIHdpdGggdGhyb3dGYWlsdXJlIHdoZW4gRmFpbHVyZSBhbmQgZG9lc25cXCd0IHdoZW4gU3VjY2VzcycsICgpID0+IHtcbiAgICBleHBlY3QoXyA9PiBhRmFpbHVyZS50aHJvd0ZhaWx1cmUoKSkudG9UaHJvdygpO1xuICAgIGV4cGVjdChfID0+IFZhbGlkYXRpb24udGhyb3dGYWlsdXJlKGFGYWlsdXJlKSkudG9UaHJvdygpO1xuXG4gICAgZXhwZWN0KF8gPT4gYVN1Y2Nlc3MudGhyb3dGYWlsdXJlKCkpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gVmFsaWRhdGlvbi50aHJvd0ZhaWx1cmUoYVN1Y2Nlc3MpKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnY2FsbHMgdGhlIGNhbGxiYWNrIHdpdGggYW5kVGhlbiBvbmx5IHdoZW4gU3VjY2VzcycsICgpID0+IHtcbiAgICBleHBlY3QoYVN1Y2Nlc3MuYW5kVGhlbihfID0+IGFTdWNjZXNzMikpLnRvRXF1YWwoYVN1Y2Nlc3MyKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5hbmRUaGVuKF8gPT4gYVN1Y2Nlc3MyLCBhU3VjY2VzcykpLnRvRXF1YWwoYVN1Y2Nlc3MyKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5hbmRUaGVuKF8gPT4gYVN1Y2Nlc3MyKShhU3VjY2VzcykpLnRvRXF1YWwoYVN1Y2Nlc3MyKTtcblxuICAgIGV4cGVjdChhRmFpbHVyZS5hbmRUaGVuKF8gPT4gJ3InKSkudG9FcXVhbChhRmFpbHVyZSk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uYW5kVGhlbihfID0+ICdyJywgYUZhaWx1cmUpKS50b0VxdWFsKGFGYWlsdXJlKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5hbmRUaGVuKF8gPT4gJ3InKShhRmFpbHVyZSkpLnRvRXF1YWwoYUZhaWx1cmUpO1xuICB9KTtcblxuICBpdCgndGhyb3dzIHdoZW4gYW5kVGhlbiBjYWxsYmFjayBkb2VzIG5vdCByZXR1cm4gYSB2YWxpZGF0aW9uJywgKCkgPT4ge1xuICAgIGV4cGVjdChfID0+IGFTdWNjZXNzLmFuZFRoZW4oXyA9PiAncicpKS50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gVmFsaWRhdGlvbi5hbmRUaGVuKF8gPT4gJ3InLCBhU3VjY2VzcykpLnRvVGhyb3coKTtcbiAgICBleHBlY3QoXyA9PiBWYWxpZGF0aW9uLmFuZFRoZW4oXyA9PiAncicpKGFTdWNjZXNzKSkudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnY2hhaW5zIG9ubHkgc3VjY2Vzc2VzJywgKCkgPT4ge1xuICAgIGNvbnN0IHN1Y2Nlc3MxID0gVmFsaWRhdGlvbi5TdWNjZXNzKCcxJyk7XG4gICAgY29uc3Qgc3VjY2VzczIgPSBWYWxpZGF0aW9uLlN1Y2Nlc3MoJzInKTtcblxuICAgIGV4cGVjdChzdWNjZXNzMS5jaGFpbihzdWNjZXNzMikuX3ZhbHVlKS50b0VxdWFsKCcyJyk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uY2hhaW4oc3VjY2VzczEsIHN1Y2Nlc3MyKS5fdmFsdWUpLnRvRXF1YWwoJzInKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5jaGFpbihzdWNjZXNzMSkoc3VjY2VzczIpLl92YWx1ZSkudG9FcXVhbCgnMicpO1xuXG4gICAgZXhwZWN0KGFGYWlsdXJlLmNoYWluKHN1Y2Nlc3MyKS5fdmFsdWUpLnRvRXF1YWwoZmFpbHVyZVZhbCk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uY2hhaW4oYUZhaWx1cmUsIHN1Y2Nlc3MyKS5fdmFsdWUpLnRvRXF1YWwoZmFpbHVyZVZhbCk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uY2hhaW4oYUZhaWx1cmUpKHN1Y2Nlc3MyKS5fdmFsdWUpLnRvRXF1YWwoZmFpbHVyZVZhbCk7XG4gIH0pO1xufSk7XG4iLCIvKiBlc2xpbnQtZW52IGphc21pbmUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAsIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5pbXBvcnQgeyBwaXBlIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHtcbiAgRGVsaXZlcmFibGUsXG4gIFJlY29yZGluZyxcbiAgVmFsaWRhdGlvbixcbn0gZnJvbSAnLi4vLi4vanMvdHlwZXMnO1xuXG5kZXNjcmliZSgnRGVsaXZlcmFibGUgdHlwZScsICgpID0+IHtcbiAgY29uc3QgZGVsaXZOYW1lID0gJ25hbWUnO1xuICBjb25zdCBkZWxpdlVybCA9ICd1cmwnO1xuICBjb25zdCBkZWxpdlJlYyA9IFJlY29yZGluZy5vZih7IHN0YXJ0VGltZTogbnVsbCwgaW50ZXJ2YWxzOiBbXSB9KTtcbiAgY29uc3QgdmFsaWRPYmplY3QgPSB7IG5hbWU6IGRlbGl2TmFtZSwgdXJsOiBkZWxpdlVybCwgcmVjb3JkaW5nOiBkZWxpdlJlYyB9O1xuICBjb25zdCB2YWxpZERlbGl2ID0gRGVsaXZlcmFibGUub2YodmFsaWRPYmplY3QpO1xuICBjb25zdCB2YWxpZE9iamVjdE5vUmVjID0geyBuYW1lOiBkZWxpdk5hbWUsIHVybDogZGVsaXZVcmwsIHJlY29yZGluZzogbnVsbCB9O1xuICBjb25zdCB2YWxpZERlbGl2Tm9SZWMgPSBEZWxpdmVyYWJsZS5vZih2YWxpZE9iamVjdE5vUmVjKTtcblxuICBpdCgndHlwZSBjaGVja3MgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGludmFsaWQxID0geyBuYW1lOiAnYXNmZCcsIHVybDogJ2Fkc2YnLCByZWNvcmRpbmc6ICdhc2RmYScgfTtcbiAgICBjb25zdCBpbnZhbGlkMiA9IHsgbmFtZTogbnVsbCwgdXJsOiAnYWRzZicsIHJlY29yZGluZzogbnVsbCB9O1xuICAgIGNvbnN0IGludmFsaWQzID0geyBuYW1lOiAnYXNkZicsIHVybDogbnVsbCwgcmVjb3JkaW5nOiBudWxsIH07XG5cbiAgICBleHBlY3QoVmFsaWRhdGlvbi5pc1N1Y2Nlc3MoRGVsaXZlcmFibGUudHlwZUNoZWNrKGludmFsaWQxKSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIGV4cGVjdChWYWxpZGF0aW9uLmlzU3VjY2VzcyhEZWxpdmVyYWJsZS50eXBlQ2hlY2soaW52YWxpZDIpKSkudG9FcXVhbChmYWxzZSk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uaXNTdWNjZXNzKERlbGl2ZXJhYmxlLnR5cGVDaGVjayhpbnZhbGlkMykpKS50b0VxdWFsKGZhbHNlKTtcbiAgICBleHBlY3QoVmFsaWRhdGlvbi5pc1N1Y2Nlc3MoRGVsaXZlcmFibGUudHlwZUNoZWNrKHZhbGlkT2JqZWN0KSkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgZXhwZWN0KFZhbGlkYXRpb24uaXNTdWNjZXNzKERlbGl2ZXJhYmxlLnR5cGVDaGVjayh2YWxpZE9iamVjdE5vUmVjKSkpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1bnMgYSByZWNvcmRpbmcgZXZlbiBpZiB0aGUgRGVsaXZlcmFibGUgZG9lc25cXCd0IGhhdmUgb25lIHlldCcsICgpID0+IHtcbiAgICBleHBlY3QoXG4gICAgICBwaXBlKFxuICAgICAgICBEZWxpdmVyYWJsZS5nZXRSZWNvcmRpbmcsXG4gICAgICAgIFJlY29yZGluZy50eXBlQ2hlY2ssXG4gICAgICAgIFZhbGlkYXRpb24uaXNTdWNjZXNzXG4gICAgICApKHt9KVxuICAgICkudG9FcXVhbCh0cnVlKTtcbiAgICBleHBlY3QoRGVsaXZlcmFibGUuZ2V0UmVjb3JkaW5nKG51bGwpKS50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChEZWxpdmVyYWJsZS5nZXRSZWNvcmRpbmcodW5kZWZpbmVkKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoRGVsaXZlcmFibGUuZ2V0UmVjb3JkaW5nKHsgcmVjb3JkaW5nOiBkZWxpdlJlYyB9KSkudG9FcXVhbChkZWxpdlJlYyk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIG5hbWUgYW5kIGRvZXNuXFwndCB0aHJvdyB3aXRoIG51bGwnLCAoKSA9PiB7XG4gICAgZXhwZWN0KERlbGl2ZXJhYmxlLmdldE5hbWUodmFsaWREZWxpdikpLnRvRXF1YWwoZGVsaXZOYW1lKTtcbiAgICBleHBlY3QoXyA9PiBEZWxpdmVyYWJsZS5nZXROYW1lKG51bGwpKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyB1cmwgYW5kIGRvZXNuXFwndCB0aHJvdyB3aXRoIG51bGwnLCAoKSA9PiB7XG4gICAgZXhwZWN0KERlbGl2ZXJhYmxlLmdldFVybCh2YWxpZERlbGl2KSkudG9FcXVhbChkZWxpdlVybCk7XG4gICAgZXhwZWN0KF8gPT4gRGVsaXZlcmFibGUuZ2V0VXJsKG51bGwpKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0aGUgY29ycmVjdCByZWNvcmRpbmcgd2hlbiB1c2luZyBzZXRSZWNvcmRpbmcnLCAoKSA9PiB7XG4gICAgY29uc3Qgc2V0QW5kR2V0UmVjb3JkaW5nID0gcGlwZShEZWxpdmVyYWJsZS5zZXRSZWNvcmRpbmcsIERlbGl2ZXJhYmxlLmdldFJlY29yZGluZyk7XG5cbiAgICBleHBlY3Qoc2V0QW5kR2V0UmVjb3JkaW5nKHZhbGlkRGVsaXZOb1JlYywgZGVsaXZSZWMpKS50b0VxdWFsKGRlbGl2UmVjKTtcbiAgICBleHBlY3Qoc2V0QW5kR2V0UmVjb3JkaW5nKG51bGwsIHZhbGlkRGVsaXYpKS50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChfID0+IHNldEFuZEdldFJlY29yZGluZyhudWxsLCBudWxsKSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCwgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCB7IHBpcGUgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQge1xuICBSZWNvcmRpbmcsXG4gIFZhbGlkYXRpb24sXG4gIFRpbWVJbnRlcnZhbCxcbn0gZnJvbSAnLi4vLi4vanMvdHlwZXMnO1xuXG5cbmRlc2NyaWJlKCdSZWNvcmRpbmcgdHlwZScsICgpID0+IHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICBjb25zdCBzZWNJbnRlcnZhbDUgPSBUaW1lSW50ZXJ2YWwub2Yoe1xuICAgIHN0YXJ0OiBuZXcgRGF0ZShub3cgLSAxMDAgKiAxMDAwKSxcbiAgICBlbmQ6IG5ldyBEYXRlKG5vdyAtIDk1ICogMTAwMCksXG4gIH0pO1xuICBjb25zdCBzZWNJbnRlcnZhbDEwID0gVGltZUludGVydmFsLm9mKHtcbiAgICBzdGFydDogbmV3IERhdGUobm93IC0gMjAwICogMTAwMCksXG4gICAgZW5kOiBuZXcgRGF0ZShub3cgLSAxOTAgKiAxMDAwKSxcbiAgfSk7XG5cbiAgY29uc3QgdmFsaWQxID0geyBzdGFydFRpbWU6IG51bGwsIGludGVydmFsczogW10gfTtcbiAgY29uc3QgdmFsaWQxUnVubmluZyA9IHsgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLCBpbnRlcnZhbHM6IFtdIH07XG4gIGNvbnN0IHZhbGlkMiA9IHsgc3RhcnRUaW1lOiBudWxsLCBpbnRlcnZhbHM6IFtcbiAgICBzZWNJbnRlcnZhbDUsXG4gICAgc2VjSW50ZXJ2YWwxMCxcbiAgXSB9O1xuICBjb25zdCB2YWxpZDJSdW5uaW5nID0geyBzdGFydFRpbWU6IG5ldyBEYXRlKCksIGludGVydmFsczogW1xuICAgIHNlY0ludGVydmFsNSxcbiAgICBzZWNJbnRlcnZhbDEwLFxuICBdIH07XG5cbiAgaXQoJ3R5cGUgY2hlY2tzIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBpbnZhbGlkMSA9IHt9O1xuICAgIGNvbnN0IGludmFsaWQxUnVubmluZyA9IHsgc3RhcnRUaW1lOiAnYWRzZicsIGludGVydmFsczogW10gfTtcbiAgICBjb25zdCBpbnZhbGlkMiA9IHsgc3RhcnRUaW1lOiAnYWRzZicsIGludGVydmFsczogbnVsbCB9O1xuICAgIGNvbnN0IHZhbGlkYXRlcyA9IHBpcGUoUmVjb3JkaW5nLnR5cGVDaGVjaywgVmFsaWRhdGlvbi5pc1N1Y2Nlc3MpO1xuXG4gICAgZXhwZWN0KHZhbGlkYXRlcyhpbnZhbGlkMSkpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdCh2YWxpZGF0ZXMoaW52YWxpZDFSdW5uaW5nKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KHZhbGlkYXRlcyhpbnZhbGlkMikpLnRvQmUoZmFsc2UpO1xuXG4gICAgZXhwZWN0KHZhbGlkYXRlcyh2YWxpZDEpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh2YWxpZGF0ZXModmFsaWQxUnVubmluZykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KHZhbGlkYXRlcyh2YWxpZDIpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdCh2YWxpZGF0ZXModmFsaWQyUnVubmluZykpLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHRoZSBzdGFydFRpbWUgYW5kIGRvZXMgbm90IGJyZWFrIHdpdGggbnVsbCcsICgpID0+IHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLmdldFN0YXJ0VGltZSh7IHN0YXJ0VGltZTogZGF0ZSB9KSkudG9FcXVhbChkYXRlKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLmdldFN0YXJ0VGltZSh7IHN0YXJ0VGltZTogbnVsbCB9KSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLmdldFN0YXJ0VGltZSh7fSkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLmdldFN0YXJ0VGltZShudWxsKSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG5cbiAgaXQoJ2Fsd2F5cyByZXR1cm5zIGFuIGFycmF5IGZvciBnZXRJbnRlcnZhbHMnLCAoKSA9PiB7XG4gICAgY29uc3QgaW50ZXJ2YWxzID0gW3NlY0ludGVydmFsMTAsIHNlY0ludGVydmFsNV07XG4gICAgY29uc3QgaW50ZXJ2YWxJc0FycmF5ID0gcGlwZShSZWNvcmRpbmcuZ2V0SW50ZXJ2YWxzLCB2ID0+IEFycmF5LmlzQXJyYXkodikpO1xuXG4gICAgZXhwZWN0KGludGVydmFsSXNBcnJheSh7IGludGVydmFscyB9KSkudG9FcXVhbCh0cnVlKTtcbiAgICBleHBlY3QoaW50ZXJ2YWxJc0FycmF5KHsgaW50ZXJ2YWxzOiBudWxsIH0pKS50b0VxdWFsKHRydWUpO1xuICAgIGV4cGVjdChpbnRlcnZhbElzQXJyYXkoe30pKS50b0VxdWFsKHRydWUpO1xuICAgIGV4cGVjdChpbnRlcnZhbElzQXJyYXkobnVsbCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLmdldEludGVydmFscyhudWxsKSkubm90LnRvVGhyb3coKTtcbiAgfSk7XG5cbiAgaXQoJ3NldHMgdGhlIGludGVydmFsIHdpdGhvdXQgdGhyb3dpbmcgd2l0aCBudWxsJywgKCkgPT4ge1xuICAgIGV4cGVjdChfID0+IFJlY29yZGluZy5zZXRJbnRlcnZhbHMobnVsbCwgbnVsbCkpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLnNldEludGVydmFscyhudWxsLCBbXSkpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLnNldEludGVydmFscyh7IGludGVydmFsczogW10gfSwgbnVsbCkpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLnNldEludGVydmFscyh7IGludGVydmFsczogW10gfSwgdW5kZWZpbmVkKSkubm90LnRvVGhyb3coKTtcbiAgICBleHBlY3QoXyA9PiBSZWNvcmRpbmcuc2V0SW50ZXJ2YWxzKHsgaW50ZXJ2YWxzOiBbXSB9LCAnYXNmYWRzZicpKS5ub3QudG9UaHJvdygpO1xuICAgIGV4cGVjdChfID0+IFJlY29yZGluZy5zZXRJbnRlcnZhbHMoJ2FzYXNkZicsICdhc2ZhZHNmJykpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLnNldEludGVydmFscygnYXNhc2RmJywgW10pKS5ub3QudG9UaHJvdygpO1xuICB9KTtcblxuICBpdCgnc2V0SW50ZXJ2YWxzIHdvcmtzJywgKCkgPT4ge1xuICAgIGNvbnN0IGVtcHR5ID0gW107XG4gICAgY29uc3QgaW50ZXJ2YWxzID0gW3NlY0ludGVydmFsMTAsIHNlY0ludGVydmFsNV07XG4gICAgY29uc3Qgc2V0QW5kR2V0SW50ZXJ2YWxzID0gcGlwZShSZWNvcmRpbmcuc2V0SW50ZXJ2YWxzLCBSZWNvcmRpbmcuZ2V0SW50ZXJ2YWxzKTtcbiAgICBleHBlY3Qoc2V0QW5kR2V0SW50ZXJ2YWxzKHsgaW50ZXJ2YWxzOiBbXSB9LCBpbnRlcnZhbHMpKS50b0VxdWFsKGludGVydmFscyk7XG4gICAgZXhwZWN0KHNldEFuZEdldEludGVydmFscyh7IGludGVydmFscyB9LCBlbXB0eSkpLnRvRXF1YWwoZW1wdHkpO1xuICAgIGV4cGVjdChzZXRBbmRHZXRJbnRlcnZhbHMoe30sIGVtcHR5KSkudG9FcXVhbChlbXB0eSk7XG4gIH0pO1xuXG4gIGl0KCdzYXlzIHdoZXRoZXIgaXNSZWNvcmRpbmcgb3Igbm90JywgKCkgPT4ge1xuICAgIGV4cGVjdChSZWNvcmRpbmcuaXNSZWNvcmRpbmcodmFsaWQxUnVubmluZykpLnRvRXF1YWwodHJ1ZSk7XG4gICAgZXhwZWN0KFJlY29yZGluZy5pc1JlY29yZGluZyh2YWxpZDIpKS50b0VxdWFsKGZhbHNlKTtcbiAgICBleHBlY3QoXyA9PiBSZWNvcmRpbmcuaXNSZWNvcmRpbmcobnVsbCkpLm5vdC50b1Rocm93KCk7XG4gIH0pO1xuXG4gIGl0KCdzZXRzIHRoZSBjb3JyZWN0IHN0YXJ0VGltZSBpbiB0b2dnbGVSZWNvcmRpbmcnLCAoKSA9PiB7XG4gICAgY29uc3QgdG9nZ2xlZFZhbHVlID0gcGlwZShSZWNvcmRpbmcudG9nZ2xlUmVjb3JkaW5nLCBSZWNvcmRpbmcuaXNSZWNvcmRpbmcpO1xuICAgIGNvbnN0IHRvZ2dsZWRTdGFydFRpbWUgPSBwaXBlKFJlY29yZGluZy50b2dnbGVSZWNvcmRpbmcsIFJlY29yZGluZy5nZXRTdGFydFRpbWUpO1xuICAgIGV4cGVjdCh0b2dnbGVkVmFsdWUodmFsaWQxUnVubmluZykpLnRvRXF1YWwoZmFsc2UpO1xuICAgIGV4cGVjdCh0b2dnbGVkVmFsdWUodmFsaWQxKSkudG9FcXVhbCh0cnVlKTtcbiAgICBleHBlY3QodG9nZ2xlZFZhbHVlKG51bGwpKS50b0VxdWFsKGZhbHNlKTtcbiAgICBleHBlY3QodG9nZ2xlZFN0YXJ0VGltZSh2YWxpZDFSdW5uaW5nKSkudG9CZShudWxsKTtcbiAgICBleHBlY3QodG9nZ2xlZFN0YXJ0VGltZSh2YWxpZDIpLnZhbHVlT2YoKSkudG9CZUxlc3NUaGFuT3JFcXVhbChuZXcgRGF0ZSgpLnZhbHVlT2YoKSk7XG4gIH0pO1xuXG4gIGl0KCdjYWxjdWxhdGVzIHRoZSB0b3RhbCB0aW1lIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBjb25zdCBzZWMxNSA9IHsgc3RhcnRUaW1lOiBudWxsLCBpbnRlcnZhbHM6IFtzZWNJbnRlcnZhbDEwLCBzZWNJbnRlcnZhbDVdIH07XG4gICAgY29uc3Qgc2VjMTVSdW5uaW5nID0geyBzdGFydFRpbWU6IG5ldyBEYXRlKCksIGludGVydmFsczogW3NlY0ludGVydmFsMTAsIHNlY0ludGVydmFsNV0gfTtcbiAgICBjb25zdCBzZWMwID0geyBzdGFydFRpbWU6IG51bGwsIGludGVydmFsczogW10gfTtcbiAgICBjb25zdCBzZWMwUnVubmluZyA9IHsgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLCBpbnRlcnZhbHM6IFtdIH07XG5cbiAgICBleHBlY3QoUmVjb3JkaW5nLnRvdGFsVGltZShzZWMxNSkpLnRvRXF1YWwoMTAwMCAqIDE1KTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLnRvdGFsVGltZShzZWMwKSkudG9FcXVhbCgwKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLnRvdGFsVGltZShzZWMxNVJ1bm5pbmcpKS50b0JlR3JlYXRlclRoYW4oMTAwICogMTUpO1xuICAgIGV4cGVjdChSZWNvcmRpbmcudG90YWxUaW1lKHNlYzBSdW5uaW5nKSkudG9CZUdyZWF0ZXJUaGFuKDApO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3QgYnJlYWsgd2hlbiB0b3RhbFRpbWUgcmVjZWl2ZXMgbnVsbCBhbmQgYWx3YXlzIHJldHVybnMgYSBudW1iZXInLCAoKSA9PiB7XG4gICAgZXhwZWN0KF8gPT4gUmVjb3JkaW5nLnRvdGFsVGltZShudWxsKSkubm90LnRvVGhyb3coKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLnRvdGFsVGltZShudWxsKSkudG9FcXVhbCgwKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLnRvdGFsVGltZSgpKS50b0VxdWFsKDApO1xuICAgIGV4cGVjdChSZWNvcmRpbmcudG90YWxUaW1lKHt9KSkudG9FcXVhbCgwKTtcbiAgICBleHBlY3QoUmVjb3JkaW5nLnRvdGFsVGltZShbXSkpLnRvRXF1YWwoMCk7XG4gIH0pO1xufSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuZXctY2FwICovXG4vKiBlc2xpbnQtZW52IGphc21pbmUgKi9cblxuaW1wb3J0IHsgcGlwZSB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE1heWJlIH0gZnJvbSAnLi4vLi4vanMvdHlwZXMnO1xuXG5cbmRlc2NyaWJlKCdNYXliZSB0eXBlJywgKCkgPT4ge1xuICBjb25zdCBjcmVhdGVkSnVzdFdpdGhPZiA9IHBpcGUoTWF5YmUub2YsIE1heWJlLmlzSnVzdCk7XG4gIGNvbnN0IGNyZWF0ZWRKdXN0ID0gcGlwZShNYXliZS5KdXN0LCBNYXliZS5pc0p1c3QpO1xuICBjb25zdCBjcmVhdGVkTm90aGluZyA9IHBpcGUoTWF5YmUuTm90aGluZywgTWF5YmUuaXNOb3RoaW5nKTtcbiAgY29uc3QgZGVmYXVsdFZhbCA9ICdkZWZhdWx0JztcbiAgY29uc3QganVzdFZhbCA9ICdhc2ZkJztcblxuICBpdCgnY3JlYXRlcyBhIEp1c3Qgd2hlbiBwYXNzZWQgdHJ1dGh5IGFuZCBmYWxzeSBub24tbnVsbCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGNyZWF0ZWRKdXN0KCcxJykpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KGNyZWF0ZWRKdXN0KHt9KSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoY3JlYXRlZEp1c3QodHJ1ZSkpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KGNyZWF0ZWRKdXN0KGZhbHNlKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoY3JlYXRlZEp1c3QoW10pKS50b0JlKHRydWUpO1xuICB9KTtcblxuICBpdCgnY3JlYXRlcyBhIE5vdGhpbmcgd2hlbiBwYXNzZWQgYW55dGhpbmcgd2l0aCB0aGUgTm90aGluZyBjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICBleHBlY3QoY3JlYXRlZE5vdGhpbmcoJzEnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoY3JlYXRlZE5vdGhpbmcoe30pKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChjcmVhdGVkTm90aGluZyh0cnVlKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoY3JlYXRlZE5vdGhpbmcoZmFsc2UpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChjcmVhdGVkTm90aGluZyhbXSkpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KGNyZWF0ZWROb3RoaW5nKG51bGwpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChjcmVhdGVkTm90aGluZygpKS50b0JlKHRydWUpO1xuICB9KTtcblxuICBpdCgnY3JlYXRlcyBhIE5vdGhpbmcgaWYgbnVsbCBvciB1bmRlZmluZWQgaXMgcGFzc2VkIHRvIHRoZSBnZW5lcmFsIGNvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgIGV4cGVjdChjcmVhdGVkSnVzdFdpdGhPZihudWxsKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KGNyZWF0ZWRKdXN0V2l0aE9mKCkpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnY3JlYXRlcyBhIEp1c3QgaWYgc29tZXRoaW5nIGlzIHBhc3NlZCB0byB0aGUgZ2VuZXJhbCBjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICBleHBlY3QoY3JlYXRlZEp1c3RXaXRoT2YoJzEnKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoY3JlYXRlZEp1c3RXaXRoT2Yoe30pKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChjcmVhdGVkSnVzdFdpdGhPZih0cnVlKSkudG9CZSh0cnVlKTtcbiAgICBleHBlY3QoY3JlYXRlZEp1c3RXaXRoT2YoZmFsc2UpKS50b0JlKHRydWUpO1xuICAgIGV4cGVjdChjcmVhdGVkSnVzdFdpdGhPZihbXSkpLnRvQmUodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdSZXR1bnMgZGVmYXVsdCBvbmx5IHRvIE5vdGhpbmcgdmFsdWVzJywgKCkgPT4ge1xuICAgIGV4cGVjdChNYXliZS53aXRoRGVmYXVsdChkZWZhdWx0VmFsLCBNYXliZS5KdXN0KGp1c3RWYWwpKSkudG9FcXVhbChqdXN0VmFsKTtcbiAgICBleHBlY3QoTWF5YmUud2l0aERlZmF1bHQoZGVmYXVsdFZhbCwgTWF5YmUuTm90aGluZyhqdXN0VmFsKSkpLnRvRXF1YWwoZGVmYXVsdFZhbCk7XG4gIH0pO1xuXG4gIGl0KCdtYXBzIEp1c3Qgb25seSB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgY29uc3QgbWFwcGVkVmFsID0gJ21hcHBlZCc7XG4gICAgY29uc3QgZnVuYyA9IF8gPT4gbWFwcGVkVmFsO1xuICAgIGNvbnN0IG1hcEFuZEdldERlZmF1bHQgPSBwaXBlKE1heWJlLm1hcChmdW5jKSwgTWF5YmUud2l0aERlZmF1bHQoZGVmYXVsdFZhbCkpO1xuICAgIGV4cGVjdChtYXBBbmRHZXREZWZhdWx0KE1heWJlLkp1c3QoanVzdFZhbCkpKS50b0VxdWFsKG1hcHBlZFZhbCk7XG4gICAgZXhwZWN0KG1hcEFuZEdldERlZmF1bHQoTWF5YmUuTm90aGluZyhqdXN0VmFsKSkpLnRvRXF1YWwoZGVmYXVsdFZhbCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzblxcJyBkb2VzIG5vdCBjb250aW51ZSBtYXBwaW5nIHdoZW4gYSBudWxsIHZhbHVlIGFwcGVhcnMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KFxuICAgICAgTWF5YmUub2YoanVzdFZhbClcbiAgICAgIC5tYXAoXyA9PiBudWxsKVxuICAgICAgLm1hcChfID0+IGp1c3RWYWwpXG4gICAgICAud2l0aERlZmF1bHQoZGVmYXVsdFZhbClcbiAgICApLnRvRXF1YWwoZGVmYXVsdFZhbCk7XG4gIH0pO1xuXG4gIGl0KCdtYXBzIG9ubHkgdHdvIEp1c3RzIGluIG1hcDInLCAoKSA9PiB7XG4gICAgY29uc3QgbWFwcGVkVmFsID0gJ21hcHBlZCc7XG4gICAgY29uc3QgZnVuYyA9IF8gPT4gbWFwcGVkVmFsO1xuICAgIGNvbnN0IG1hcDJBbmRHZXREZWZhdWx0ID0gcGlwZShNYXliZS5tYXAyKGZ1bmMpLCBNYXliZS53aXRoRGVmYXVsdChkZWZhdWx0VmFsKSk7XG4gICAgZXhwZWN0KG1hcDJBbmRHZXREZWZhdWx0KE1heWJlLkp1c3QoanVzdFZhbCksIE1heWJlLkp1c3QoanVzdFZhbCkpKS50b0VxdWFsKG1hcHBlZFZhbCk7XG4gICAgZXhwZWN0KG1hcDJBbmRHZXREZWZhdWx0KE1heWJlLkp1c3QoanVzdFZhbCksIE1heWJlLk5vdGhpbmcoanVzdFZhbCkpKS50b0VxdWFsKGRlZmF1bHRWYWwpO1xuICAgIGV4cGVjdChtYXAyQW5kR2V0RGVmYXVsdChNYXliZS5Ob3RoaW5nKGp1c3RWYWwpLCBNYXliZS5KdXN0KGp1c3RWYWwpKSkudG9FcXVhbChkZWZhdWx0VmFsKTtcbiAgICBleHBlY3QobWFwMkFuZEdldERlZmF1bHQoTWF5YmUuTm90aGluZyhqdXN0VmFsKSwgTWF5YmUuTm90aGluZyhqdXN0VmFsKSkpLnRvRXF1YWwoZGVmYXVsdFZhbCk7XG4gIH0pO1xuXG4gIGl0KCdoYXMgY3VycmllZCBtYXBzJywgKCkgPT4ge1xuICAgIGNvbnN0IG1hcHBlZFZhbCA9ICdtYXBwZWQnO1xuICAgIGV4cGVjdChcbiAgICAgIE1heWJlLndpdGhEZWZhdWx0KFxuICAgICAgICBkZWZhdWx0VmFsLFxuICAgICAgICBNYXliZS5tYXAoXyA9PiBtYXBwZWRWYWwpKE1heWJlLkp1c3QoJ2onKSlcbiAgICAgIClcbiAgICApLnRvRXF1YWwobWFwcGVkVmFsKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCwgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCB7IHBpcGUgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQge1xuICBWYWxpZGF0aW9uLFxuICBUaW1lSW50ZXJ2YWwsXG59IGZyb20gJy4uLy4uL2pzL3R5cGVzJztcblxuZGVzY3JpYmUoJ1RpbWVJbnRlcnZhbCB0eXBlJywgKCkgPT4ge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCB2YWxpZE9iaiA9IHsgc3RhcnQ6IG5ldyBEYXRlKG5vdyksIGVuZDogbmV3IERhdGUobm93ICsgNSAqIDEwMDApIH07XG5cbiAgaXQoJ2NoZWNrcyBmb3IgdHlwZXMgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGludmFsaWQxID0ge307XG4gICAgY29uc3QgaW52YWxpZDIgPSB7IHN0YXJ0OiBuZXcgRGF0ZSgpIH07XG4gICAgY29uc3QgaW52YWxpZDMgPSB7IHN0YXJ0OiBuZXcgRGF0ZSgpLCBlbmQ6ICcnIH07XG4gICAgY29uc3QgaW52YWxpZDQgPSB7IHN0YXJ0OiBuZXcgRGF0ZSwgZW5kOiAxMjMgfTtcbiAgICBjb25zdCBpbnZhbGlkNSA9IHsgZW5kOiBuZXcgRGF0ZSB9O1xuXG4gICAgY29uc3QgdmFsaWRhdGVzID0gcGlwZShUaW1lSW50ZXJ2YWwudHlwZUNoZWNrLCBWYWxpZGF0aW9uLmlzU3VjY2Vzcyk7XG4gICAgZXhwZWN0KHZhbGlkYXRlcyhpbnZhbGlkMSkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIGV4cGVjdCh2YWxpZGF0ZXMoaW52YWxpZDIpKS50b0VxdWFsKGZhbHNlKTtcbiAgICBleHBlY3QodmFsaWRhdGVzKGludmFsaWQzKSkudG9FcXVhbChmYWxzZSk7XG4gICAgZXhwZWN0KHZhbGlkYXRlcyhpbnZhbGlkNCkpLnRvRXF1YWwoZmFsc2UpO1xuICAgIGV4cGVjdCh2YWxpZGF0ZXMoaW52YWxpZDUpKS50b0VxdWFsKGZhbHNlKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgc3RhcnQgZGF0ZSB3aXRob3V0IGJyZWFraW5nIHdpdGggbnVsbCcsICgpID0+IHtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldFN0YXJ0KHZhbGlkT2JqKSkudG9FcXVhbCh2YWxpZE9iai5zdGFydCk7XG4gICAgZXhwZWN0KFRpbWVJbnRlcnZhbC5nZXRTdGFydCh7fSkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KFRpbWVJbnRlcnZhbC5nZXRTdGFydChudWxsKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldFN0YXJ0KHVuZGVmaW5lZCkpLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGVuZCBkYXRlIHdpdGhvdXQgYnJlYWtpbmcgd2l0aCBudWxsJywgKCkgPT4ge1xuICAgIGV4cGVjdChUaW1lSW50ZXJ2YWwuZ2V0RW5kKHZhbGlkT2JqKSkudG9FcXVhbCh2YWxpZE9iai5lbmQpO1xuICAgIGV4cGVjdChUaW1lSW50ZXJ2YWwuZ2V0RW5kKHt9KSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldEVuZChudWxsKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldEVuZCh1bmRlZmluZWQpKS50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnY2FsY3VsYXRlcyB0aGUgZGF0ZSBkaWZmZXJlbmNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldFZhbHVlKHZhbGlkT2JqKSkudG9FcXVhbCg1ICogMTAwMCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIG51bGwgaWYgYW4gaW52YWxpZCBUaW1lSW50ZXJ2YWwgb2JqZWN0IGlzIHByb3ZpZGVkIGluIGdldFZhbHVlJywgKCkgPT4ge1xuICAgIGV4cGVjdChfID0+IFRpbWVJbnRlcnZhbC5nZXRWYWx1ZShudWxsKSkubm90LnRvVGhyb3coKTtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldFZhbHVlKG51bGwpKS50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChUaW1lSW50ZXJ2YWwuZ2V0VmFsdWUodW5kZWZpbmVkKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldFZhbHVlKHt9KSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoVGltZUludGVydmFsLmdldFZhbHVlKFtdKSkudG9FcXVhbChudWxsKTtcbiAgfSk7XG59KTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCwgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbmltcG9ydCB7IHBpcGUgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQge1xuICBQcm9qZWN0LFxuICBSZWNvcmRpbmcsXG4gIFZhbGlkYXRpb24sXG59IGZyb20gJy4uLy4uL2pzL3R5cGVzJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnc2VhbWxlc3MtaW1tdXRhYmxlJztcblxuZGVzY3JpYmUoJ1Byb2plY3QgdHlwZScsICgpID0+IHtcbiAgY29uc3QgZGVsaXZSZWMgPSBSZWNvcmRpbmcub2YoeyBzdGFydFRpbWU6IG51bGwsIGludGVydmFsczogW10gfSk7XG4gIGNvbnN0IG1vY2tEZWxpdmVyYWJsZSA9IHsgbmFtZTogJ2FhYScsIHVybDogJ3d3dycsIHJlY29yZGluZzogZGVsaXZSZWMgfTtcbiAgY29uc3QgdmFsaWROYW1lID0gJ25hbWUnO1xuICBjb25zdCB2YWxpZFVybCA9ICd1cmwnO1xuICBjb25zdCB1bnNlbGVjdGVkRGVsaXZlcmFibGVzID0gW21vY2tEZWxpdmVyYWJsZV07XG4gIGNvbnN0IHZhbGlkID0ge1xuICAgIG5hbWU6IHZhbGlkTmFtZSxcbiAgICB1cmw6IHZhbGlkVXJsLFxuICAgIHVuc2VsZWN0ZWREZWxpdmVyYWJsZXMsXG4gICAgc2VsZWN0ZWREZWxpdmVyYWJsZTogbW9ja0RlbGl2ZXJhYmxlLFxuICB9O1xuICBjb25zdCBpc1ZhbGlkID0gcGlwZShcbiAgICB2ID0+IEltbXV0YWJsZSh2KS5hc011dGFibGUoeyBkZWVwOiB0cnVlIH0pLFxuICAgIFByb2plY3QudHlwZUNoZWNrLFxuICAgIFZhbGlkYXRpb24uaXNTdWNjZXNzXG4gICk7XG5cblxuICBpdCgndHlwZUNoZWNrcyBvaycsICgpID0+IHtcbiAgICBjb25zdCBpbnZhbGlkMSA9IHtcbiAgICAgIG5hbWU6IHZhbGlkTmFtZSxcbiAgICAgIHVybDogdmFsaWRVcmwsXG4gICAgICB1bnNlbGVjdGVkRGVsaXZlcmFibGVzOiBudWxsLFxuICAgICAgc2VsZWN0ZWREZWxpdmVyYWJsZTogbnVsbCxcbiAgICB9O1xuICAgIGNvbnN0IGludmFsaWQyID0ge1xuICAgICAgbmFtZTogdmFsaWROYW1lLFxuICAgICAgdXJsOiB2YWxpZFVybCxcbiAgICAgIHVuc2VsZWN0ZWREZWxpdmVyYWJsZXM6IFtdLFxuICAgICAgc2VsZWN0ZWREZWxpdmVyYWJsZTogW10sXG4gICAgfTtcbiAgICBjb25zdCBpbnZhbGlkMyA9IHt9O1xuXG4gICAgZXhwZWN0KGlzVmFsaWQoaW52YWxpZDEpKS50b0VxdWFsKGZhbHNlKTtcbiAgICBleHBlY3QoaXNWYWxpZChpbnZhbGlkMikpLnRvRXF1YWwoZmFsc2UpO1xuICAgIGV4cGVjdChpc1ZhbGlkKGludmFsaWQzKSkudG9FcXVhbChmYWxzZSk7XG4gICAgZXhwZWN0KGlzVmFsaWQodmFsaWQpKS50b0VxdWFsKHRydWUpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBuYW1lIHdpdGhvdXQgYnJlYWtpbmcgd2l0aCBudWxsJywgKCkgPT4ge1xuICAgIGNvbnN0IGdldE5hbWUgPSBwaXBlKFByb2plY3Qub2YsIFByb2plY3QuZ2V0TmFtZSk7XG4gICAgZXhwZWN0KGdldE5hbWUodmFsaWQpKS50b0VxdWFsKHZhbGlkTmFtZSk7XG4gICAgZXhwZWN0KGdldE5hbWUoe30pKS50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChnZXROYW1lKCkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KGdldE5hbWUobnVsbCkpLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHVybCB3aXRob3V0IGJyZWFraW5nIHdpdGggbnVsbCcsICgpID0+IHtcbiAgICBjb25zdCBnZXRVcmwgPSBwaXBlKFByb2plY3Qub2YsIFByb2plY3QuZ2V0VXJsKTtcbiAgICBleHBlY3QoZ2V0VXJsKHZhbGlkKSkudG9FcXVhbCh2YWxpZFVybCk7XG4gICAgZXhwZWN0KGdldFVybCh7fSkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KGdldFVybCgpKS50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChnZXRVcmwobnVsbCkpLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGRlbGl2ZXJhYmxlcyB3aXRob3V0IGJyZWFraW5nIHdpdGggbnVsbCcsICgpID0+IHtcbiAgICBjb25zdCBnZXREZWxpdmVyYWJsZXMgPSBwaXBlKFByb2plY3Qub2YsIFByb2plY3QuZ2V0RGVsaXZlcmFibGVzKTtcbiAgICBleHBlY3QoZ2V0RGVsaXZlcmFibGVzKHZhbGlkKS5maW5kKG0gPT4gbS51cmwgPT09IG1vY2tEZWxpdmVyYWJsZS51cmwpKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KGdldERlbGl2ZXJhYmxlcyh7fSkpLnRvRXF1YWwoW10pO1xuICAgIGV4cGVjdChnZXREZWxpdmVyYWJsZXMoKSkudG9FcXVhbChbXSk7XG4gICAgZXhwZWN0KGdldERlbGl2ZXJhYmxlcyhudWxsKSkudG9FcXVhbChbXSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIHNlbGVjdGVkRGVsaXZlcmFibGUgd2l0aG91dCBicmVha2luZyB3aXRoIG51bGwnLCAoKSA9PiB7XG4gICAgY29uc3QgZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZSA9IHBpcGUoUHJvamVjdC5vZiwgUHJvamVjdC5nZXRTZWxlY3RlZERlbGl2ZXJhYmxlKTtcbiAgICBleHBlY3QoZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZSh2YWxpZCkpLnRvRXF1YWwobW9ja0RlbGl2ZXJhYmxlKTtcbiAgICBleHBlY3QoZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZSh7fSkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KGdldFNlbGVjdGVkRGVsaXZlcmFibGUoKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZShudWxsKSkudG9FcXVhbChudWxsKTtcbiAgfSk7XG5cbiAgaXQoJ3VwZGF0ZXMgYSBkZWxpdmVyYWJsZSB0aGF0IGlzIHNlbGVjdGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tEZWxpdmVyYWJsZUNoYW5nZWQgPSBPYmplY3QuYXNzaWduKHt9LCBtb2NrRGVsaXZlcmFibGUsIHsgdXJsOiAnampqJyB9KTtcbiAgICBjb25zdCBtb2NrUHJvamVjdCA9IHtcbiAgICAgIG5hbWU6ICdhc2ZkJyxcbiAgICAgIHVybDogJ2FzZGYnLFxuICAgICAgdW5zZWxlY3RlZERlbGl2ZXJhYmxlczogW10sXG4gICAgICBzZWxlY3RlZERlbGl2ZXJhYmxlOiBtb2NrRGVsaXZlcmFibGUsXG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZUFuZEdldERlbGl2ZXJhYmxlcyA9IHBpcGUoXG4gICAgICBQcm9qZWN0LnVwZGF0ZURlbGl2ZXJhYmxlLFxuICAgICAgUHJvamVjdC5nZXREZWxpdmVyYWJsZXMsXG4gICAgKTtcblxuICAgIGV4cGVjdChcbiAgICAgIHVwZGF0ZUFuZEdldERlbGl2ZXJhYmxlcyhtb2NrUHJvamVjdCwgbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZClcbiAgICAgICAgLmZpbmQobSA9PiBtLnVybCA9PT0gbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZC51cmwpXG4gICAgKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KFxuICAgICAgdXBkYXRlQW5kR2V0RGVsaXZlcmFibGVzKG1vY2tQcm9qZWN0LCBtb2NrRGVsaXZlcmFibGVDaGFuZ2VkKVxuICAgICAgICAuZmluZChtID0+IG0udXJsID09PSBtb2NrRGVsaXZlcmFibGUudXJsKVxuICAgICkudG9CZUZhbHN5KCk7XG5cbiAgICBleHBlY3QocGlwZShcbiAgICAgICAgUHJvamVjdC51cGRhdGVEZWxpdmVyYWJsZSxcbiAgICAgICAgaXNWYWxpZFxuICAgICAgKShtb2NrUHJvamVjdCwgbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZClcbiAgICApLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCd1cGRhdGVzIGEgZGVsaXZlcmFibGUgdGhhdCBpcyBub3Qgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZCA9IE9iamVjdC5hc3NpZ24oe30sIG1vY2tEZWxpdmVyYWJsZSwgeyB1cmw6ICdqamonIH0pO1xuICAgIGNvbnN0IG1vY2tQcm9qZWN0ID0ge1xuICAgICAgbmFtZTogJ2FzZmQnLFxuICAgICAgdXJsOiAnYXNkZicsXG4gICAgICB1bnNlbGVjdGVkRGVsaXZlcmFibGVzOiBbbW9ja0RlbGl2ZXJhYmxlXSxcbiAgICAgIHNlbGVjdGVkRGVsaXZlcmFibGU6IG51bGwsXG4gICAgfTtcblxuICAgIGNvbnN0IHVwZGF0ZUFuZEdldERlbGl2ZXJhYmxlcyA9IHBpcGUoXG4gICAgICBQcm9qZWN0LnVwZGF0ZURlbGl2ZXJhYmxlLFxuICAgICAgUHJvamVjdC5nZXREZWxpdmVyYWJsZXMsXG4gICAgKTtcblxuICAgIGV4cGVjdChcbiAgICAgIHVwZGF0ZUFuZEdldERlbGl2ZXJhYmxlcyhtb2NrUHJvamVjdCwgbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZClcbiAgICAgICAgLmZpbmQobSA9PiBtLnVybCA9PT0gbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZC51cmwpXG4gICAgKS50b0JlVHJ1dGh5KCk7XG4gICAgZXhwZWN0KFxuICAgICAgdXBkYXRlQW5kR2V0RGVsaXZlcmFibGVzKG1vY2tQcm9qZWN0LCBtb2NrRGVsaXZlcmFibGVDaGFuZ2VkKVxuICAgICAgICAuZmluZChtID0+IG0udXJsID09PSBtb2NrRGVsaXZlcmFibGUudXJsKVxuICAgICkudG9CZUZhbHN5KCk7XG5cbiAgICBleHBlY3QocGlwZShcbiAgICAgICAgUHJvamVjdC51cGRhdGVEZWxpdmVyYWJsZSxcbiAgICAgICAgaXNWYWxpZFxuICAgICAgKShtb2NrUHJvamVjdCwgbW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZClcbiAgICApLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdoYW5kbGVzIG51bGxzIHdoZW4gdXBkYXRpbmcgZGVsaXZlcmFibGVzJywgKCkgPT4ge1xuICAgIGV4cGVjdChfID0+IFByb2plY3QudXBkYXRlRGVsaXZlcmFibGUobnVsbCwgbnVsbCkpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gUHJvamVjdC51cGRhdGVEZWxpdmVyYWJsZSh2YWxpZCwgbnVsbCkpLm5vdC50b1Rocm93KCk7XG4gICAgZXhwZWN0KF8gPT4gUHJvamVjdC51cGRhdGVEZWxpdmVyYWJsZSh2YWxpZCwgdmFsaWQpKS5ub3QudG9UaHJvdygpO1xuICB9KTtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdoZW4gc3VwcGxpZWQgYW4gb2JqZWN0IHJldHVybnMgdGhlIGluZGljYXRlZFxuICogcHJvcGVydHkgb2YgdGhhdCBvYmplY3QsIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogYX0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHBhcmFtIHtTdHJpbmd9IHAgVGhlIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeVxuICogQHJldHVybiB7Kn0gVGhlIHZhbHVlIGF0IGBvYmoucGAuXG4gKiBAc2VlIFIucGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJvcCgneCcsIHt4OiAxMDB9KTsgLy89PiAxMDBcbiAqICAgICAgUi5wcm9wKCd4Jywge30pOyAvLz0+IHVuZGVmaW5lZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gcHJvcChwLCBvYmopIHsgcmV0dXJuIG9ialtwXTsgfSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9yZWR1Y2VkKHgpIHtcbiAgcmV0dXJuIHggJiYgeFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSA/IHggOlxuICAgIHtcbiAgICAgICdAQHRyYW5zZHVjZXIvdmFsdWUnOiB4LFxuICAgICAgJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJzogdHJ1ZVxuICAgIH07XG59O1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL19jdXJyeTInKTtcbnZhciBfcmVkdWNlZCA9IHJlcXVpcmUoJy4vX3JlZHVjZWQnKTtcbnZhciBfeGZCYXNlID0gcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFhGaW5kKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gICAgdGhpcy5mb3VuZCA9IGZhbHNlO1xuICB9XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB2b2lkIDApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmQoZiwgeGYpIHsgcmV0dXJuIG5ldyBYRmluZChmLCB4Zik7IH0pO1xufSgpKTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgX2Rpc3BhdGNoYWJsZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xudmFyIF94ZmluZCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3hmaW5kJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3JcbiAqIGB1bmRlZmluZWRgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmluZGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IGEgfCB1bmRlZmluZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgaXMgdGhlXG4gKiAgICAgICAgZGVzaXJlZCBvbmUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgZm91bmQsIG9yIGB1bmRlZmluZWRgLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4cyA9IFt7YTogMX0sIHthOiAyfSwge2E6IDN9XTtcbiAqICAgICAgUi5maW5kKFIucHJvcEVxKCdhJywgMikpKHhzKTsgLy89PiB7YTogMn1cbiAqICAgICAgUi5maW5kKFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiB1bmRlZmluZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2ZpbmQnLCBfeGZpbmQsIGZ1bmN0aW9uIGZpbmQoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gbGlzdFtpZHhdO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxufSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcbnZhciBfaXNTdHJpbmcgPSByZXF1aXJlKCcuL2ludGVybmFsL19pc1N0cmluZycpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnRoIGVsZW1lbnQgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nLiBJZiBuIGlzIG5lZ2F0aXZlIHRoZVxuICogZWxlbWVudCBhdCBpbmRleCBsZW5ndGggKyBuIGlzIHJldHVybmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBhIHwgVW5kZWZpbmVkXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0XG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGxpc3QgPSBbJ2ZvbycsICdiYXInLCAnYmF6JywgJ3F1dXgnXTtcbiAqICAgICAgUi5udGgoMSwgbGlzdCk7IC8vPT4gJ2JhcidcbiAqICAgICAgUi5udGgoLTEsIGxpc3QpOyAvLz0+ICdxdXV4J1xuICogICAgICBSLm50aCgtOTksIGxpc3QpOyAvLz0+IHVuZGVmaW5lZFxuICpcbiAqICAgICAgUi5udGgoMiwgJ2FiYycpOyAvLz0+ICdjJ1xuICogICAgICBSLm50aCgzLCAnYWJjJyk7IC8vPT4gJydcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIG50aChvZmZzZXQsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IG9mZnNldCA8IDAgPyBsaXN0Lmxlbmd0aCArIG9mZnNldCA6IG9mZnNldDtcbiAgcmV0dXJuIF9pc1N0cmluZyhsaXN0KSA/IGxpc3QuY2hhckF0KGlkeCkgOiBsaXN0W2lkeF07XG59KTtcbiIsInZhciBudGggPSByZXF1aXJlKCcuL250aCcpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuIEluIHNvbWUgbGlicmFyaWVzXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIG5hbWVkIGBmaXJzdGAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi50YWlsLCBSLmluaXQsIFIubGFzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaGVhZChbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiAnZmknXG4gKiAgICAgIFIuaGVhZChbXSk7IC8vPT4gdW5kZWZpbmVkXG4gKlxuICogICAgICBSLmhlYWQoJ2FiYycpOyAvLz0+ICdhJ1xuICogICAgICBSLmhlYWQoJycpOyAvLz0+ICcnXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gbnRoKDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuIiwidmFyIGVxdWFscyA9IHJlcXVpcmUoJy4uL2VxdWFscycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2luZGV4T2YobGlzdCwgYSwgaWR4KSB7XG4gIHZhciBpbmYsIGl0ZW07XG4gIC8vIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIGRvZXNuJ3QgZXhpc3QgYmVsb3cgSUU5XG4gIGlmICh0eXBlb2YgbGlzdC5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgYSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAvLyBtYW51YWxseSBjcmF3bCB0aGUgbGlzdCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuICswIGFuZCAtMFxuICAgICAgICAgIGluZiA9IDEgLyBhO1xuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSAwICYmIDEgLyBpdGVtID09PSBpbmYpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSAhPT0gYSkge1xuICAgICAgICAgIC8vIE5hTlxuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicgJiYgaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub24temVybyBudW1iZXJzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGEsIGlkeCk7XG5cbiAgICAgIC8vIGFsbCB0aGVzZSB0eXBlcyBjYW4gdXRpbGlzZSBTZXRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKGEgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBudWxsIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBhbnl0aGluZyBlbHNlIG5vdCBjb3ZlcmVkIGFib3ZlLCBkZWZlciB0byBSLmVxdWFsc1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAoZXF1YWxzKGxpc3RbaWR4XSwgYSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCJ2YXIgX2luZGV4T2YgPSByZXF1aXJlKCcuL19pbmRleE9mJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfY29udGFpbnMoYSwgbGlzdCkge1xuICByZXR1cm4gX2luZGV4T2YobGlzdCwgYSwgMCkgPj0gMDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9tYXAoZm4sIGZ1bmN0b3IpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBmdW5jdG9yLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbik7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICByZXN1bHRbaWR4XSA9IGZuKGZ1bmN0b3JbaWR4XSk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9xdW90ZShzKSB7XG4gIHZhciBlc2NhcGVkID0gc1xuICAgIC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpXG4gICAgLnJlcGxhY2UoL1tcXGJdL2csICdcXFxcYicpICAvLyBcXGIgbWF0Y2hlcyB3b3JkIGJvdW5kYXJ5OyBbXFxiXSBtYXRjaGVzIGJhY2tzcGFjZVxuICAgIC5yZXBsYWNlKC9cXGYvZywgJ1xcXFxmJylcbiAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgIC5yZXBsYWNlKC9cXHQvZywgJ1xcXFx0JylcbiAgICAucmVwbGFjZSgvXFx2L2csICdcXFxcdicpXG4gICAgLnJlcGxhY2UoL1xcMC9nLCAnXFxcXDAnKTtcblxuICByZXR1cm4gJ1wiJyArIGVzY2FwZWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiJztcbn07XG4iLCIvKipcbiAqIFBvbHlmaWxsIGZyb20gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGUvdG9JU09TdHJpbmc+LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHBhZCA9IGZ1bmN0aW9uIHBhZChuKSB7IHJldHVybiAobiA8IDEwID8gJzAnIDogJycpICsgbjsgfTtcblxuICByZXR1cm4gdHlwZW9mIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nID9cbiAgICBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICAgICAgcmV0dXJuIGQudG9JU09TdHJpbmcoKTtcbiAgICB9IDpcbiAgICBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgZC5nZXRVVENGdWxsWWVhcigpICsgJy0nICtcbiAgICAgICAgcGFkKGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICtcbiAgICAgICAgcGFkKGQuZ2V0VVRDRGF0ZSgpKSArICdUJyArXG4gICAgICAgIHBhZChkLmdldFVUQ0hvdXJzKCkpICsgJzonICtcbiAgICAgICAgcGFkKGQuZ2V0VVRDTWludXRlcygpKSArICc6JyArXG4gICAgICAgIHBhZChkLmdldFVUQ1NlY29uZHMoKSkgKyAnLicgK1xuICAgICAgICAoZC5nZXRVVENNaWxsaXNlY29uZHMoKSAvIDEwMDApLnRvRml4ZWQoMykuc2xpY2UoMiwgNSkgKyAnWidcbiAgICAgICk7XG4gICAgfTtcbn0oKSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9jb21wbGVtZW50KGYpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAhZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBfY29tcGxlbWVudCA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbXBsZW1lbnQnKTtcbnZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG52YXIgZmlsdGVyID0gcmVxdWlyZSgnLi9maWx0ZXInKTtcblxuXG4vKipcbiAqIFRoZSBjb21wbGVtZW50IG9mIGBmaWx0ZXJgLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5maWx0ZXIsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGlzT2RkID0gKG4pID0+IG4gJSAyID09PSAxO1xuICpcbiAqICAgICAgUi5yZWplY3QoaXNPZGQsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDRdXG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgZDogNH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIHJlamVjdChwcmVkLCBmaWx0ZXJhYmxlKSB7XG4gIHJldHVybiBmaWx0ZXIoX2NvbXBsZW1lbnQocHJlZCksIGZpbHRlcmFibGUpO1xufSk7XG4iLCJ2YXIgX2NvbnRhaW5zID0gcmVxdWlyZSgnLi9fY29udGFpbnMnKTtcbnZhciBfbWFwID0gcmVxdWlyZSgnLi9fbWFwJyk7XG52YXIgX3F1b3RlID0gcmVxdWlyZSgnLi9fcXVvdGUnKTtcbnZhciBfdG9JU09TdHJpbmcgPSByZXF1aXJlKCcuL190b0lTT1N0cmluZycpO1xudmFyIGtleXMgPSByZXF1aXJlKCcuLi9rZXlzJyk7XG52YXIgcmVqZWN0ID0gcmVxdWlyZSgnLi4vcmVqZWN0Jyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfdG9TdHJpbmcoeCwgc2Vlbikge1xuICB2YXIgcmVjdXIgPSBmdW5jdGlvbiByZWN1cih5KSB7XG4gICAgdmFyIHhzID0gc2Vlbi5jb25jYXQoW3hdKTtcbiAgICByZXR1cm4gX2NvbnRhaW5zKHksIHhzKSA/ICc8Q2lyY3VsYXI+JyA6IF90b1N0cmluZyh5LCB4cyk7XG4gIH07XG5cbiAgLy8gIG1hcFBhaXJzIDo6IChPYmplY3QsIFtTdHJpbmddKSAtPiBbU3RyaW5nXVxuICB2YXIgbWFwUGFpcnMgPSBmdW5jdGlvbihvYmosIGtleXMpIHtcbiAgICByZXR1cm4gX21hcChmdW5jdGlvbihrKSB7IHJldHVybiBfcXVvdGUoaykgKyAnOiAnICsgcmVjdXIob2JqW2tdKTsgfSwga2V5cy5zbGljZSgpLnNvcnQoKSk7XG4gIH07XG5cbiAgc3dpdGNoIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkpIHtcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOlxuICAgICAgcmV0dXJuICcoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oJyArIF9tYXAocmVjdXIsIHgpLmpvaW4oJywgJykgKyAnKSknO1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzpcbiAgICAgIHJldHVybiAnWycgKyBfbWFwKHJlY3VyLCB4KS5jb25jYXQobWFwUGFpcnMoeCwgcmVqZWN0KGZ1bmN0aW9uKGspIHsgcmV0dXJuIC9eXFxkKyQvLnRlc3Qoayk7IH0sIGtleXMoeCkpKSkuam9pbignLCAnKSArICddJztcbiAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IEJvb2xlYW4oJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IHgudG9TdHJpbmcoKTtcbiAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIHJldHVybiAnbmV3IERhdGUoJyArIChpc05hTih4LnZhbHVlT2YoKSkgPyByZWN1cihOYU4pIDogX3F1b3RlKF90b0lTT1N0cmluZyh4KSkpICsgJyknO1xuICAgIGNhc2UgJ1tvYmplY3QgTnVsbF0nOlxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgTnVtYmVyKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiAxIC8geCA9PT0gLUluZmluaXR5ID8gJy0wJyA6IHgudG9TdHJpbmcoMTApO1xuICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBTdHJpbmcoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IF9xdW90ZSh4KTtcbiAgICBjYXNlICdbb2JqZWN0IFVuZGVmaW5lZF0nOlxuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAodHlwZW9mIHgudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIHJlcHIgPSB4LnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChyZXByICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgIHJldHVybiByZXByO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3snICsgbWFwUGFpcnMoeCwga2V5cyh4KSkuam9pbignLCAnKSArICd9JztcbiAgfVxufTtcbiIsInZhciBfY3VycnkxID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG52YXIgX3RvU3RyaW5nID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fdG9TdHJpbmcnKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gdmFsdWUuIGBldmFsYCdpbmcgdGhlIG91dHB1dFxuICogc2hvdWxkIHJlc3VsdCBpbiBhIHZhbHVlIGVxdWl2YWxlbnQgdG8gdGhlIGlucHV0IHZhbHVlLiBNYW55IG9mIHRoZSBidWlsdC1pblxuICogYHRvU3RyaW5nYCBtZXRob2RzIGRvIG5vdCBzYXRpc2Z5IHRoaXMgcmVxdWlyZW1lbnQuXG4gKlxuICogSWYgdGhlIGdpdmVuIHZhbHVlIGlzIGFuIGBbb2JqZWN0IE9iamVjdF1gIHdpdGggYSBgdG9TdHJpbmdgIG1ldGhvZCBvdGhlclxuICogdGhhbiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AsIHRoaXMgbWV0aG9kIGlzIGludm9rZWQgd2l0aCBubyBhcmd1bWVudHNcbiAqIHRvIHByb2R1Y2UgdGhlIHJldHVybiB2YWx1ZS4gVGhpcyBtZWFucyB1c2VyLWRlZmluZWQgY29uc3RydWN0b3IgZnVuY3Rpb25zXG4gKiBjYW4gcHJvdmlkZSBhIHN1aXRhYmxlIGB0b1N0cmluZ2AgbWV0aG9kLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICogICAgICAgdGhpcy54ID0geDtcbiAqICAgICAgIHRoaXMueSA9IHk7XG4gKiAgICAgfVxuICpcbiAqICAgICBQb2ludC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiAnbmV3IFBvaW50KCcgKyB0aGlzLnggKyAnLCAnICsgdGhpcy55ICsgJyknO1xuICogICAgIH07XG4gKlxuICogICAgIFIudG9TdHJpbmcobmV3IFBvaW50KDEsIDIpKTsgLy89PiAnbmV3IFBvaW50KDEsIDIpJ1xuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgKiAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50b1N0cmluZyg0Mik7IC8vPT4gJzQyJ1xuICogICAgICBSLnRvU3RyaW5nKCdhYmMnKTsgLy89PiAnXCJhYmNcIidcbiAqICAgICAgUi50b1N0cmluZyhbMSwgMiwgM10pOyAvLz0+ICdbMSwgMiwgM10nXG4gKiAgICAgIFIudG9TdHJpbmcoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9KTsgLy89PiAne1wiYmFyXCI6IDIsIFwiYmF6XCI6IDMsIFwiZm9vXCI6IDF9J1xuICogICAgICBSLnRvU3RyaW5nKG5ldyBEYXRlKCcyMDAxLTAyLTAzVDA0OjA1OjA2WicpKTsgLy89PiAnbmV3IERhdGUoXCIyMDAxLTAyLTAzVDA0OjA1OjA2LjAwMFpcIiknXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MShmdW5jdGlvbiB0b1N0cmluZyh2YWwpIHsgcmV0dXJuIF90b1N0cmluZyh2YWwsIFtdKTsgfSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9pc0FycmF5ID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcnJheScpO1xudmFyIF9pc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNGdW5jdGlvbicpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi90b1N0cmluZycpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIGNvbmNhdGVuYXRpbmcgdGhlIGdpdmVuIGxpc3RzIG9yIHN0cmluZ3MuXG4gKlxuICogTm90ZTogYFIuY29uY2F0YCBleHBlY3RzIGJvdGggYXJndW1lbnRzIHRvIGJlIG9mIHRoZSBzYW1lIHR5cGUsXG4gKiB1bmxpa2UgdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kLiBJdCB3aWxsIHRocm93XG4gKiBhbiBlcnJvciBpZiB5b3UgYGNvbmNhdGAgYW4gQXJyYXkgd2l0aCBhIG5vbi1BcnJheSB2YWx1ZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgY29uY2F0YCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBhXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gYlxuICogQHJldHVybiB7QXJyYXl8U3RyaW5nfVxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmNvbmNhdChbXSwgW10pOyAvLz0+IFtdXG4gKiAgICAgIFIuY29uY2F0KFs0LCA1LCA2XSwgWzEsIDIsIDNdKTsgLy89PiBbNCwgNSwgNiwgMSwgMiwgM11cbiAqICAgICAgUi5jb25jYXQoJ0FCQycsICdERUYnKTsgLy8gJ0FCQ0RFRidcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKGZ1bmN0aW9uIGNvbmNhdChhLCBiKSB7XG4gIGlmIChhID09IG51bGwgfHwgIV9pc0Z1bmN0aW9uKGEuY29uY2F0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcoYSkgKyAnIGRvZXMgbm90IGhhdmUgYSBtZXRob2QgbmFtZWQgXCJjb25jYXRcIicpO1xuICB9XG4gIGlmIChfaXNBcnJheShhKSAmJiAhX2lzQXJyYXkoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nKGIpICsgJyBpcyBub3QgYW4gYXJyYXknKTtcbiAgfVxuICByZXR1cm4gYS5jb25jYXQoYik7XG59KTtcbiIsInZhciBfY3VycnkyID0gcmVxdWlyZSgnLi9fY3VycnkyJyk7XG52YXIgX3hmQmFzZSA9IHJlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBYTWFwKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhNYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWE1hcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmYoaW5wdXQpKTtcbiAgfTtcblxuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeG1hcChmLCB4ZikgeyByZXR1cm4gbmV3IFhNYXAoZiwgeGYpOyB9KTtcbn0oKSk7XG4iLCJ2YXIgX2N1cnJ5MiA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xudmFyIF9kaXNwYXRjaGFibGUgPSByZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcbnZhciBfbWFwID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFwJyk7XG52YXIgX3JlZHVjZSA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xudmFyIF94bWFwID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9feG1hcCcpO1xudmFyIGN1cnJ5TiA9IHJlcXVpcmUoJy4vY3VycnlOJyk7XG52YXIga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBhbmRcbiAqIGEgW2Z1bmN0b3JdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjZnVuY3RvciksXG4gKiBhcHBsaWVzIHRoZSBmdW5jdGlvbiB0byBlYWNoIG9mIHRoZSBmdW5jdG9yJ3MgdmFsdWVzLCBhbmQgcmV0dXJuc1xuICogYSBmdW5jdG9yIG9mIHRoZSBzYW1lIHNoYXBlLlxuICpcbiAqIFJhbWRhIHByb3ZpZGVzIHN1aXRhYmxlIGBtYXBgIGltcGxlbWVudGF0aW9ucyBmb3IgYEFycmF5YCBhbmQgYE9iamVjdGAsXG4gKiBzbyB0aGlzIGZ1bmN0aW9uIG1heSBiZSBhcHBsaWVkIHRvIGBbMSwgMiwgM11gIG9yIGB7eDogMSwgeTogMiwgejogM31gLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBtYXBgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBBbHNvIHRyZWF0cyBmdW5jdGlvbnMgYXMgZnVuY3RvcnMgYW5kIHdpbGwgY29tcG9zZSB0aGVtIHRvZ2V0aGVyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgRnVuY3RvciBmID0+IChhIC0+IGIpIC0+IGYgYSAtPiBmIGJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBiZSBpdGVyYXRlZCBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBuZXcgbGlzdC5cbiAqIEBzZWUgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZG91YmxlID0geCA9PiB4ICogMjtcbiAqXG4gKiAgICAgIFIubWFwKGRvdWJsZSwgWzEsIDIsIDNdKTsgLy89PiBbMiwgNCwgNl1cbiAqXG4gKiAgICAgIFIubWFwKGRvdWJsZSwge3g6IDEsIHk6IDIsIHo6IDN9KTsgLy89PiB7eDogMiwgeTogNCwgejogNn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ21hcCcsIF94bWFwLCBmdW5jdGlvbiBtYXAoZm4sIGZ1bmN0b3IpIHtcbiAgc3dpdGNoIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuY3RvcikpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZ1bmN0aW9uXSc6XG4gICAgICByZXR1cm4gY3VycnlOKGZ1bmN0b3IubGVuZ3RoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZnVuY3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgIH0pO1xuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbihhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IGZuKGZ1bmN0b3Jba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSwga2V5cyhmdW5jdG9yKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBfbWFwKGZuLCBmdW5jdG9yKTtcbiAgfVxufSkpO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZDsgYGZhbHNlYFxuICogb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5ndFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubHQoMiwgMSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5sdCgyLCAyKTsgLy89PiBmYWxzZVxuICogICAgICBSLmx0KDIsIDMpOyAvLz0+IHRydWVcbiAqICAgICAgUi5sdCgnYScsICd6Jyk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0KCd6JywgJ2EnKTsgLy89PiBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gbHQoYSwgYikgeyByZXR1cm4gYSA8IGI7IH0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHNlY29uZCBhcmd1bWVudCBpZiBpdCBpcyBub3QgYG51bGxgLCBgdW5kZWZpbmVkYCBvciBgTmFOYFxuICogb3RoZXJ3aXNlIHRoZSBmaXJzdCBhcmd1bWVudCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBiIC0+IGEgfCBiXG4gKiBAcGFyYW0ge2F9IHZhbCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7Yn0gdmFsIFRoZSB2YWx1ZSB0byByZXR1cm4gaWYgaXQgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkXG4gKiBAcmV0dXJuIHsqfSBUaGUgdGhlIHNlY29uZCB2YWx1ZSBvciB0aGUgZGVmYXVsdCB2YWx1ZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkZWZhdWx0VG80MiA9IFIuZGVmYXVsdFRvKDQyKTtcbiAqXG4gKiAgICAgIGRlZmF1bHRUbzQyKG51bGwpOyAgLy89PiA0MlxuICogICAgICBkZWZhdWx0VG80Mih1bmRlZmluZWQpOyAgLy89PiA0MlxuICogICAgICBkZWZhdWx0VG80MignUmFtZGEnKTsgIC8vPT4gJ1JhbWRhJ1xuICogICAgICBkZWZhdWx0VG80MihwYXJzZUludCgnc3RyaW5nJykpOyAvLz0+IDQyXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MihmdW5jdGlvbiBkZWZhdWx0VG8oZCwgdikge1xuICByZXR1cm4gdiA9PSBudWxsIHx8IHYgIT09IHYgPyBkIDogdjtcbn0pO1xuIiwidmFyIF9jdXJyeTIgPSByZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSB2YWx1ZSBhdCBhIGdpdmVuIHBhdGguXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMi4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtTdHJpbmddIC0+IHtrOiB2fSAtPiB2IHwgVW5kZWZpbmVkXG4gKiBAcGFyYW0ge0FycmF5fSBwYXRoIFRoZSBwYXRoIHRvIHVzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byByZXRyaWV2ZSB0aGUgbmVzdGVkIHByb3BlcnR5IGZyb20uXG4gKiBAcmV0dXJuIHsqfSBUaGUgZGF0YSBhdCBgcGF0aGAuXG4gKiBAc2VlIFIucHJvcFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGF0aChbJ2EnLCAnYiddLCB7YToge2I6IDJ9fSk7IC8vPT4gMlxuICogICAgICBSLnBhdGgoWydhJywgJ2InXSwge2M6IHtiOiAyfX0pOyAvLz0+IHVuZGVmaW5lZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTIoZnVuY3Rpb24gcGF0aChwYXRocywgb2JqKSB7XG4gIHZhciB2YWwgPSBvYmo7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgcGF0aHMubGVuZ3RoKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbCA9IHZhbFtwYXRoc1tpZHhdXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gdmFsO1xufSk7XG4iLCJ2YXIgX2N1cnJ5MyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xudmFyIGRlZmF1bHRUbyA9IHJlcXVpcmUoJy4vZGVmYXVsdFRvJyk7XG52YXIgcGF0aCA9IHJlcXVpcmUoJy4vcGF0aCcpO1xuXG5cbi8qKlxuICogSWYgdGhlIGdpdmVuLCBub24tbnVsbCBvYmplY3QgaGFzIGEgdmFsdWUgYXQgdGhlIGdpdmVuIHBhdGgsIHJldHVybnMgdGhlXG4gKiB2YWx1ZSBhdCB0aGF0IHBhdGguIE90aGVyd2lzZSByZXR1cm5zIHRoZSBwcm92aWRlZCBkZWZhdWx0IHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgYSAtPiBbU3RyaW5nXSAtPiBPYmplY3QgLT4gYVxuICogQHBhcmFtIHsqfSBkIFRoZSBkZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gcCBUaGUgcGF0aCB0byB1c2UuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcmV0cmlldmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSBmcm9tLlxuICogQHJldHVybiB7Kn0gVGhlIGRhdGEgYXQgYHBhdGhgIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgb3IgdGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXRoT3IoJ04vQScsIFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gKiAgICAgIFIucGF0aE9yKCdOL0EnLCBbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gXCJOL0FcIlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF9jdXJyeTMoZnVuY3Rpb24gcGF0aE9yKGQsIHAsIG9iaikge1xuICByZXR1cm4gZGVmYXVsdFRvKGQsIHBhdGgocCwgb2JqKSk7XG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAgKi9cbmltcG9ydCB7IHBhdGhPciwgcGlwZSwgY3VycnksIHJlZHVjZSwgY29uY2F0LCBtYXAsIGx0LCBwcm9wT3IsIHByb3BFcSwgZmlsdGVyIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgUHJvamVjdCwgUmVjb3JkaW5nLCBEZWxpdmVyYWJsZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnc2VhbWxlc3MtaW1tdXRhYmxlJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUF0ID0gY3VycnkoKGtleUFycmF5LCBuZXdWYWwsIG9iaikgPT4ge1xuICBjb25zdCBkZWVwTmV3VmFsID0ga2V5QXJyYXkucmVkdWNlUmlnaHQoXG4gICAgKHJlc3VsdCwga2V5KSA9PiAoeyBba2V5XTogcmVzdWx0IH0pXG4gICAgLCBuZXdWYWxcbiAgKTtcblxuICByZXR1cm4gSW1tdXRhYmxlKG9iaikubWVyZ2UoZGVlcE5ld1ZhbCwgeyBkZWVwOiB0cnVlIH0pO1xufSk7XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBwYXRoT3IobnVsbCwgWydzZWxlY3RlZFByb2plY3QnXSk7XG5cbi8vIE1vZGVsIC0+IFtQcm9qZWN0XVxuY29uc3QgdW5zZWxlY3RlZFByb2plY3RzID0gcGlwZShwcm9wT3IobnVsbCwgJ3Vuc2VsZWN0ZWRQcm9qZWN0cycpLCB2ID0+IHYgfHwgW10pO1xuXG5leHBvcnQgY29uc3QgYWxsUHJvamVjdHMgPSBtb2RlbCA9PiAoXG4gICAgc2VsZWN0ZWRQcm9qZWN0KG1vZGVsKVxuICAgID8gdW5zZWxlY3RlZFByb2plY3RzKG1vZGVsKS5jb25jYXQoc2VsZWN0ZWRQcm9qZWN0KG1vZGVsKSlcbiAgICA6IHVuc2VsZWN0ZWRQcm9qZWN0cyhtb2RlbClcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHJlY29yZGluZ3NJbmZvID0gbW9kZWwgPT4ge1xuICBjb25zdCBub25aZXJvUmVjb3JkaW5nVGltZSA9IHBpcGUoXG4gICAgcHJvcE9yKG51bGwsICdyZWNvcmRpbmcnKSxcbiAgICBSZWNvcmRpbmcudG90YWxUaW1lLFxuICAgIGx0KDApLCAvLyBJbnQgLT4gQm9vbC4gV2hldGhlciB6ZXJvIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIHRoYXQgd2lsbCBiZSBwYXNzZWRcbiAgKTtcblxuICBjb25zdCBwcm9qZWN0UmVjb3JkaW5nSW5mb3MgPSBwcm9qZWN0ID0+IHBpcGUoXG4gICAgUHJvamVjdC5nZXREZWxpdmVyYWJsZXMsXG4gICAgbWFwKGQgPT4gKHsgcHJvamVjdCwgZGVsaXZlcmFibGU6IGQsIHJlY29yZGluZzogRGVsaXZlcmFibGUuZ2V0UmVjb3JkaW5nKGQpIH0pKVxuICApKHByb2plY3QpO1xuXG4gIGNvbnN0IGFsbCA9IHBpcGUoXG4gICAgYWxsUHJvamVjdHMsXG4gICAgbWFwKHByb2plY3RSZWNvcmRpbmdJbmZvcyksXG4gICAgcmVkdWNlKGNvbmNhdCwgW10pXG4gICkobW9kZWwpO1xuXG4gIHJldHVybiBhbGwuZmlsdGVyKG5vblplcm9SZWNvcmRpbmdUaW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9qZWN0ID0gY3VycnkoKHByb2plY3ROYW1lLCBtb2RlbCkgPT4gcGlwZShcbiAgYWxsUHJvamVjdHMsXG4gIGZpbHRlcihwcm9wRXEoJ25hbWUnLCBwcm9qZWN0TmFtZSkpXG4pKG1vZGVsKSk7XG5cbmV4cG9ydCBjb25zdCBnZXREZWxpdmVyYWJsZSA9IGN1cnJ5KChkZWxpdmVyYWJsZU5hbWUsIHByb2plY3ROYW1lLCBtb2RlbCkgPT4gcGlwZShcbiAgZ2V0UHJvamVjdChwcm9qZWN0TmFtZSksXG4gIFByb2plY3QuZ2V0RGVsaXZlcmFibGVzLFxuICBmaWx0ZXIocHJvcEVxKCduYW1lJywgZGVsaXZlcmFibGVOYW1lKSlcbikobW9kZWwpKTtcblxuXG5leHBvcnQgY29uc3QgdXBkYXRlUHJvamVjdCA9IGN1cnJ5KChwcm9qZWN0LCBtb2RlbCwgbmV3UHJvamVjdCkgPT4ge1xuICBjb25zdCBwcm9qZWN0TmFtZSA9IFByb2plY3QuZ2V0TmFtZShwcm9qZWN0KTtcbiAgaWYgKCEobW9kZWwgJiYgcHJvamVjdE5hbWUgJiYgbmV3UHJvamVjdCkpIHtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICBjb25zdCBzYW1lUHJvamVjdE5hbWUgPSBwcm9wRXEoJ25hbWUnLCBwcm9qZWN0TmFtZSk7XG4gIGNvbnN0IHVwZGF0aW5nU2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdE5hbWUgPT09IHByb3BPcihudWxsLCAnbmFtZScsIG1vZGVsLnNlbGVjdGVkUHJvamVjdCk7XG4gIGNvbnN0IHVwZGF0aW5nVW5zZWxlY3RlZFByb2plY3QgPSAhIXVuc2VsZWN0ZWRQcm9qZWN0cyhtb2RlbCkuZmluZChzYW1lUHJvamVjdE5hbWUpO1xuXG4gIGlmICh1cGRhdGluZ1NlbGVjdGVkUHJvamVjdCkge1xuICAgIHJldHVybiB1cGRhdGVBdChcbiAgICAgIFsnc2VsZWN0ZWRQcm9qZWN0J10sXG4gICAgICBuZXdQcm9qZWN0LFxuICAgICAgbW9kZWxcbiAgICApO1xuICB9IGVsc2UgaWYgKHVwZGF0aW5nVW5zZWxlY3RlZFByb2plY3QpIHtcbiAgICBjb25zdCBuZXdVbnNlbGVjdGVkUHJvamVjdHMgPSB1bnNlbGVjdGVkUHJvamVjdHMobW9kZWwpXG4gICAgICAubWFwKHAgPT4gKHNhbWVQcm9qZWN0TmFtZShwKSA/IG5ld1Byb2plY3QgOiBwKSk7XG5cbiAgICByZXR1cm4gdXBkYXRlQXQoXG4gICAgICBbJ3Vuc2VsZWN0ZWRQcm9qZWN0cyddLFxuICAgICAgbmV3VW5zZWxlY3RlZFByb2plY3RzLFxuICAgICAgbW9kZWxcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG1vZGVsO1xufSk7XG4iLCJpbXBvcnQgeyBhbGxQcm9qZWN0cywgdXBkYXRlUHJvamVjdCwgcmVjb3JkaW5nc0luZm8gfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFByb2plY3QsIFJlY29yZGluZywgRGVsaXZlcmFibGUsIE1heWJlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3VycnksIGZpbmQsIHBpcGUsIGZpbHRlciwgcHJvcCwgaGVhZCB9IGZyb20gJ3JhbWRhJztcblxuLy8gTW9kZWwgLT4ge1Byb2plY3QsIERlbGl2ZXJhYmxlfSAtPiBNb2RlbFxuY29uc3QgdG9nZ2xlRGVsaXZlcmFibGVSZWNvcmRpbmcgPSBjdXJyeSgobW9kZWwsIHsgcHJvamVjdCwgZGVsaXZlcmFibGUgfSkgPT5cbiAgTWF5YmUub2YoZGVsaXZlcmFibGUpXG4gICAgLm1hcChEZWxpdmVyYWJsZS5nZXRSZWNvcmRpbmcpXG4gICAgLm1hcChSZWNvcmRpbmcudG9nZ2xlUmVjb3JkaW5nKVxuICAgIC5tYXAoRGVsaXZlcmFibGUuc2V0UmVjb3JkaW5nKGRlbGl2ZXJhYmxlKSlcbiAgICAubWFwKFByb2plY3QudXBkYXRlRGVsaXZlcmFibGUocHJvamVjdCkpXG4gICAgLm1hcCh1cGRhdGVQcm9qZWN0KHByb2plY3QsIG1vZGVsKSlcbiAgICAud2l0aERlZmF1bHQobW9kZWwpXG4pO1xuXG4vLyBNb2RlbCAtPiBNYXliZVxuY29uc3QgZmluZFJlY29yZGluZ0RlbGl2ZXJhYmxlID0gbW9kZWwgPT5cbiAgTWF5YmUub2YobW9kZWwpXG4gICAgLm1hcChyZWNvcmRpbmdzSW5mbylcbiAgICAubWFwKGZpbHRlcihwaXBlKHByb3AoJ3JlY29yZGluZycpLCBSZWNvcmRpbmcuaXNSZWNvcmRpbmcpKSlcbiAgICAubWFwKGhlYWQpO1xuXG4vLyBNb2RlbCAtPiBNb2RlbFxuY29uc3Qgc3RvcEFsbFJlY29yZGluZ3MgPSBtb2RlbCA9PlxuICBNYXliZS5vZihtb2RlbClcbiAgICAuY2hhaW4oZmluZFJlY29yZGluZ0RlbGl2ZXJhYmxlKVxuICAgIC5tYXAodG9nZ2xlRGVsaXZlcmFibGVSZWNvcmRpbmcobW9kZWwpKVxuICAgIC5tYXAoc3RvcEFsbFJlY29yZGluZ3MpXG4gICAgLndpdGhEZWZhdWx0KG1vZGVsKTtcblxuLy8gUHJvamVjdCAtPiBNYXliZShQcm9qZWN0KVxuY29uc3QgZ2V0VXBUb0RhdGVQcm9qZWN0ID0gY3VycnkoKHByb2plY3QsIG1vZGVsKSA9PlxuICBNYXliZS5vZihtb2RlbClcbiAgICAubWFwKGFsbFByb2plY3RzKVxuICAgIC5tYXAoZmluZChQcm9qZWN0LmlzU2FtZShwcm9qZWN0KSkpXG4pO1xuXG5leHBvcnQgZGVmYXVsdCAobW9kZWwsIHsgcHJvamVjdCwgZGVsaXZlcmFibGUgfSkgPT5cbiAgTWF5YmUub2YobW9kZWwpXG4gICAgLm1hcChzdG9wQWxsUmVjb3JkaW5ncylcbiAgICAuY2hhaW4oY2hhbmdlZE1vZGVsID0+XG4gICAgICBnZXRVcFRvRGF0ZVByb2plY3QocHJvamVjdCwgY2hhbmdlZE1vZGVsKVxuICAgICAgLm1hcChwID0+XG4gICAgICAgIHRvZ2dsZURlbGl2ZXJhYmxlUmVjb3JkaW5nKFxuICAgICAgICAgIGNoYW5nZWRNb2RlbCxcbiAgICAgICAgICB7IHByb2plY3Q6IHAsIGRlbGl2ZXJhYmxlIH1cbiAgICAgICAgKSlcbiAgICApXG4gICAgLndpdGhEZWZhdWx0KG1vZGVsKTtcbiIsImV4cG9ydCBjb25zdCBtb2NrRGVsaXZlcmFibGUgPSB7XG4gIFwibmFtZVwiOiBcIlJ1c2ggd2l0aCBwb3NzaWJsZSBjbGllbnRzXCIsXG4gIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvZGVsaXZlcmFibGVzL3J1c2gtY29sZC1jYWxsXCIsXG4gIFwicmVjb3JkaW5nXCI6IHtcbiAgICBcInN0YXJ0VGltZVwiOiBudWxsLFxuICAgIFwiaW50ZXJ2YWxzXCI6IFt7XG4gICAgICBcInN0YXJ0XCI6IFwiMjAxNi0xMi0xM1QxMzozNzowMS40NjVaXCIsXG4gICAgICBcImVuZFwiOiBcIjIwMTYtMTItMTNUMTM6NDE6MjMuNDU3WlwiXG4gICAgfV1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbW9ja1Byb2plY3QgPSB7XG4gIFwibmFtZVwiOiBcIlJ1c2hlZCBwcm9qZWN0XCIsXG4gIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvcHJvamVjdHMvcnVzaGVkLXByb2plY3RcIixcbiAgXCJ1bnNlbGVjdGVkRGVsaXZlcmFibGVzXCI6IFtcbiAgICBtb2NrRGVsaXZlcmFibGUsIHtcbiAgICBcIm5hbWVcIjogXCJSdXNoIHdpdGggb25saW5lIGFkc1wiLFxuICAgIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvZGVsaXZlcmFibGVzL3J1c2gtYnV5LWFkc1wiLFxuICAgIFwicmVjb3JkaW5nXCI6IHtcbiAgICAgIFwic3RhcnRUaW1lXCI6IG51bGwsXG4gICAgICBcImludGVydmFsc1wiOiBbe1xuICAgICAgICBcInN0YXJ0XCI6IFwiMjAxNi0xMi0xM1QxMzozNjo1OC45NDFaXCIsXG4gICAgICAgIFwiZW5kXCI6IFwiMjAxNi0xMi0xM1QxMzozNzowMS40NjBaXCJcbiAgICAgIH1dXG4gICAgfVxuICB9LCB7XG4gICAgXCJuYW1lXCI6IFwiUnVzaCB3aXRoIGxvZ29cIixcbiAgICBcInVybFwiOiBcImxvY2FsaG9zdDo4MDgwL2RlbGl2ZXJhYmxlcy9ydXNoLWNyZWF0ZS1sb2dvXCIsXG4gICAgXCJyZWNvcmRpbmdcIjogbnVsbFxuICB9XSxcbiAgXCJzZWxlY3RlZERlbGl2ZXJhYmxlXCI6IG1vY2tEZWxpdmVyYWJsZVxufTtcblxuZXhwb3J0IGNvbnN0IG1vY2tVbnNlbGVjdGVkRGVsaXZlcmFibGUgPSB7XG4gIFwibmFtZVwiOiBcIlVzZWxlc3MgbG9nb1wiLFxuICBcInVybFwiOiBcImxvY2FsaG9zdDo4MDgwL2RlbGl2ZXJhYmxlcy91c2VsZXNzLWNyZWF0ZS1sb2dvXCIsXG4gIFwicmVjb3JkaW5nXCI6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2NrVW5zZWxlY3RlZFByb2plY3QgPSB7XG4gIFwibmFtZVwiOiBcIlVzZWxlc3MgcHJvamVjdFwiLFxuICBcInVybFwiOiBcImxvY2FsaG9zdDo4MDgwL3Byb2plY3RzL3J1c2hlZC1wcm9qZWN0XCIsXG4gIFwidW5zZWxlY3RlZERlbGl2ZXJhYmxlc1wiOiBbXG4gICAgbW9ja1Vuc2VsZWN0ZWREZWxpdmVyYWJsZSwge1xuICAgIFwibmFtZVwiOiBcIlVzZWxlc3Mgb25saW5lIGFkc1wiLFxuICAgIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvZGVsaXZlcmFibGVzL3VzZWxlc3MtYnV5LWFkc1wiLFxuICAgIFwicmVjb3JkaW5nXCI6IG51bGxcbiAgfSwge1xuICAgIFwibmFtZVwiOiBcIlVzZWxlc3MgcG9zc2libGUgY2xpZW50c1wiLFxuICAgIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvZGVsaXZlcmFibGVzL3VzZWxlc3MtY29sZC1jYWxsXCIsXG4gICAgXCJyZWNvcmRpbmdcIjogbnVsbFxuICB9XSxcbiAgXCJzZWxlY3RlZERlbGl2ZXJhYmxlXCI6IG51bGxcbn07XG5cbmV4cG9ydCBjb25zdCBtb2NrTW9kZWwgPSB7XG4gIFwibWluaW1pc2VkXCI6IGZhbHNlLFxuICBcInNlcnZlclVSTFwiOiBcIi4vZGF0YS5qc29uXCIsXG4gIFwidW5zZWxlY3RlZFByb2plY3RzXCI6IFtcbiAgICBtb2NrVW5zZWxlY3RlZFByb2plY3QsIHtcbiAgICBcIm5hbWVcIjogXCJCaWcgcHJvamVjdFwiLFxuICAgIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvcHJvamVjdHMvYmlnLXByb2plY3RcIixcbiAgICBcInVuc2VsZWN0ZWREZWxpdmVyYWJsZXNcIjogW3tcbiAgICAgIFwibmFtZVwiOiBcIkNvbGQgY2FsbCBwb3NzaWJsZSBjbGllbnRzXCIsXG4gICAgICBcInVybFwiOiBcImxvY2FsaG9zdDo4MDgwL2RlbGl2ZXJhYmxlcy9jb2xkLWNhbGxcIixcbiAgICAgIFwicmVjb3JkaW5nXCI6IHtcbiAgICAgICAgXCJzdGFydFRpbWVcIjogXCIyMDE2LTEyLTEzVDEzOjM3OjUyLjA3OFpcIiwgLy8vIElzIHJlY29yZGluZ1xuICAgICAgICBcImludGVydmFsc1wiOiBbe1xuICAgICAgICAgIFwic3RhcnRcIjogXCIyMDE2LTEyLTEzVDEzOjM2OjUyLjA3OFpcIixcbiAgICAgICAgICBcImVuZFwiOiBcIjIwMTYtMTItMTNUMTM6MzY6NTUuMDEzWlwiXG4gICAgICAgIH1dXG4gICAgICB9XG4gICAgfSwge1xuICAgICAgXCJuYW1lXCI6IFwiQnV5IG9ubGluZSBhZHNcIixcbiAgICAgIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvZGVsaXZlcmFibGVzL2J1eS1hZHNcIixcbiAgICAgIFwicmVjb3JkaW5nXCI6IHtcbiAgICAgICAgXCJzdGFydFRpbWVcIjogXCIyMDE2LTEyLTEzVDEzOjM5OjUyLjA3OFpcIiwgLy8gSXMgcmVjb3JkaW5nXG4gICAgICAgIFwiaW50ZXJ2YWxzXCI6IFt7XG4gICAgICAgICAgXCJzdGFydFwiOiBcIjIwMTYtMTItMTNUMTM6MzY6NTAuMzA5WlwiLFxuICAgICAgICAgIFwiZW5kXCI6IFwiMjAxNi0xMi0xM1QxMzozNjo1Mi4wNzVaXCJcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9XSxcbiAgICBcInNlbGVjdGVkRGVsaXZlcmFibGVcIjoge1xuICAgICAgXCJuYW1lXCI6IFwiQ3JlYXRlIGxvZ29cIixcbiAgICAgIFwidXJsXCI6IFwibG9jYWxob3N0OjgwODAvZGVsaXZlcmFibGVzL2NyZWF0ZS1sb2dvXCIsXG4gICAgICBcInJlY29yZGluZ1wiOiB7XG4gICAgICAgIFwic3RhcnRUaW1lXCI6IG51bGwsXG4gICAgICAgIFwiaW50ZXJ2YWxzXCI6IFt7XG4gICAgICAgICAgXCJzdGFydFwiOiBcIjIwMTYtMTItMTNUMTM6MzY6NTUuMDE4WlwiLFxuICAgICAgICAgIFwiZW5kXCI6IFwiMjAxNi0xMi0xM1QxMzozNjo1OC45MzVaXCJcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICB9XG4gIH1dLFxuICBcInNlbGVjdGVkUHJvamVjdFwiOiBtb2NrUHJvamVjdCxcbn1cbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuaW1wb3J0IHRvZ2dsZVJlY29yZGluZyBmcm9tICcuLi8uLi9qcy9XaWRnZXQvdXBkYXRlL3RvZ2dsZVJlY29yZGluZyc7XG5pbXBvcnQgeyBSZWNvcmRpbmcsIERlbGl2ZXJhYmxlIH0gZnJvbSAnLi4vLi4vanMvdHlwZXMnO1xuaW1wb3J0IHsgcGlwZSwgcHJvcCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IHJlY29yZGluZ3NJbmZvIH0gZnJvbSAnLi4vLi4vanMvV2lkZ2V0L3VwZGF0ZS91dGlscyc7XG5pbXBvcnQge1xuICBtb2NrRGVsaXZlcmFibGUsXG4gIG1vY2tQcm9qZWN0LFxuICBtb2NrVW5zZWxlY3RlZERlbGl2ZXJhYmxlLFxuICBtb2NrVW5zZWxlY3RlZFByb2plY3QsXG4gIG1vY2tNb2RlbCxcbn0gZnJvbSAnLi9tb2NrRGF0YSc7XG5cbmRlc2NyaWJlKCdVcGRhdGUudG9nZ2xlUmVjb3JkaW5nJywgKCkgPT4ge1xuICBpdCgnc3RvcHMgb3RoZXIgcmVjb3JkaW5ncyB3aGVuIHRvZ2dsaW5nIHRoZSBzZWxlY3RlZCBwcm9qZWN0JywgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7XG4gICAgICBwcm9qZWN0OiBtb2NrUHJvamVjdCxcbiAgICAgIGRlbGl2ZXJhYmxlOiBtb2NrRGVsaXZlcmFibGUsXG4gICAgfTtcblxuICAgIGNvbnN0IHRvZ2dsZWRNb2RlbCA9IHRvZ2dsZVJlY29yZGluZyhtb2NrTW9kZWwsIG1vY2tBY3Rpb24pO1xuXG4gICAgY29uc3QgZGVsaXZlcmFibGVzUmVjb3JkaW5nID0gcmVjb3JkaW5nc0luZm8odG9nZ2xlZE1vZGVsKVxuICAgICAgLmZpbHRlcihwaXBlKHByb3AoJ3JlY29yZGluZycpLCBSZWNvcmRpbmcuaXNSZWNvcmRpbmcpKVxuICAgICAgLm1hcChwcm9wKCdkZWxpdmVyYWJsZScpKTtcblxuICAgIGV4cGVjdChkZWxpdmVyYWJsZXNSZWNvcmRpbmcubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIGNvbnN0IHNhbWVOYW1lID1cbiAgICAgIERlbGl2ZXJhYmxlLmdldE5hbWUobW9ja0RlbGl2ZXJhYmxlKVxuICAgICAgPT09IERlbGl2ZXJhYmxlLmdldE5hbWUoZGVsaXZlcmFibGVzUmVjb3JkaW5nWzBdKTtcbiAgICBleHBlY3Qoc2FtZU5hbWUpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdzdG9wcyBvdGhlciByZWNvcmRpbmdzIHdoZW4gdG9nZ2xpbmcgYW4gdW5zZWxlY3RlZCBwcm9qZWN0IGFuZCBkZWxpdmVyYWJsZScsICgpID0+IHtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0ge1xuICAgICAgcHJvamVjdDogbW9ja1Vuc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgZGVsaXZlcmFibGU6IG1vY2tVbnNlbGVjdGVkRGVsaXZlcmFibGUsXG4gICAgfTtcblxuICAgIGNvbnN0IHRvZ2dsZWRNb2RlbCA9IHRvZ2dsZVJlY29yZGluZyhtb2NrTW9kZWwsIG1vY2tBY3Rpb24pO1xuXG4gICAgY29uc3QgZGVsaXZlcmFibGVzUmVjb3JkaW5nID0gcmVjb3JkaW5nc0luZm8odG9nZ2xlZE1vZGVsKVxuICAgICAgLmZpbHRlcihwaXBlKHByb3AoJ3JlY29yZGluZycpLCBSZWNvcmRpbmcuaXNSZWNvcmRpbmcpKVxuICAgICAgLm1hcChwcm9wKCdkZWxpdmVyYWJsZScpKTtcblxuICAgIGV4cGVjdChkZWxpdmVyYWJsZXNSZWNvcmRpbmcubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgIGNvbnN0IHNhbWVOYW1lID1cbiAgICAgIERlbGl2ZXJhYmxlLmdldE5hbWUobW9ja1Vuc2VsZWN0ZWREZWxpdmVyYWJsZSlcbiAgICAgID09PSBEZWxpdmVyYWJsZS5nZXROYW1lKGRlbGl2ZXJhYmxlc1JlY29yZGluZ1swXSk7XG4gICAgZXhwZWN0KHNhbWVOYW1lKS50b0VxdWFsKHRydWUpO1xuICB9KTtcbn0pO1xuIiwiaW1wb3J0IHsgcHJvcEVxLCBwcm9wT3IsIHJlamVjdCwgcGlwZSB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7XG4gIGFsbFByb2plY3RzLFxuICB1cGRhdGVBdCxcbn0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IChtb2RlbCwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcHJvamVjdCA9IG51bGwgfSA9IGFjdGlvbjtcblxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb3BPcihudWxsLCAnbmFtZScsIHByb2plY3QpO1xuICBjb25zdCBuZXdVbnNlbGVjdGVkUHJvamVjdHMgPSBwaXBlKFxuICAgIGFsbFByb2plY3RzLFxuICAgIHJlamVjdChwcm9wRXEoJ25hbWUnLCBwcm9qZWN0TmFtZSkpXG4gICkobW9kZWwpO1xuXG4gIHJldHVybiBwaXBlKFxuICAgIHVwZGF0ZUF0KFsnc2VsZWN0ZWRQcm9qZWN0J10sIHByb2plY3QpLFxuICAgIHVwZGF0ZUF0KFsndW5zZWxlY3RlZFByb2plY3RzJ10sIG5ld1Vuc2VsZWN0ZWRQcm9qZWN0cylcbiAgKShtb2RlbCk7XG59O1xuIiwiLyogZXNsaW50LWVudiBqYXNtaW5lICovXG5pbXBvcnQgc2VsZWN0UHJvamVjdCBmcm9tICcuLi8uLi9qcy9XaWRnZXQvdXBkYXRlL3NlbGVjdFByb2plY3QnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uLy4uL2pzL3R5cGVzJztcbmltcG9ydCB7XG4gIG1vY2tQcm9qZWN0LFxuICBtb2NrVW5zZWxlY3RlZFByb2plY3QsXG4gIG1vY2tNb2RlbCxcbn0gZnJvbSAnLi9tb2NrRGF0YSc7XG5cbmRlc2NyaWJlKCd1cGRhdGUuc2VsZWN0UHJvamVjdCcsICgpID0+IHtcbiAgaXQoJ3NlbGVjdHMgYSBwcm9qZWN0IHN1Y2Nlc3NmdWxseScsICgpID0+IHtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0ge1xuICAgICAgcHJvamVjdDogbW9ja1Vuc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgZGVsaXZlcmFibGU6IG1vY2tVbnNlbGVjdGVkUHJvamVjdC51bnNlbGVjdGVkRGVsaXZlcmFibGVzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbW9kaWZpZWRNb2RlbCA9IHNlbGVjdFByb2plY3QobW9ja01vZGVsLCBtb2NrQWN0aW9uKTtcbiAgICBleHBlY3QoUHJvamVjdC5pc1NhbWUobW9ja1Vuc2VsZWN0ZWRQcm9qZWN0LCBtb2RpZmllZE1vZGVsLnNlbGVjdGVkUHJvamVjdCkpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdzZWxlY3RzIGEgdGhlIGN1cnJlbnQgcHJvamVjdCBzdWNjZXNzZnVsbHknLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0FjdGlvbiA9IHtcbiAgICAgIHByb2plY3Q6IG1vY2tQcm9qZWN0LFxuICAgIH07XG4gICAgY29uc3QgbW9kaWZpZWRNb2RlbCA9IHNlbGVjdFByb2plY3QobW9ja01vZGVsLCBtb2NrQWN0aW9uKTtcbiAgICBleHBlY3QoUHJvamVjdC5pc1NhbWUobW9ja1Byb2plY3QsIG1vZGlmaWVkTW9kZWwuc2VsZWN0ZWRQcm9qZWN0KSkudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG59KTtcbiIsImltcG9ydCB7IFByb2plY3QsIE1heWJlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgdXBkYXRlUHJvamVjdCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHNlbGVjdFByb2plY3QgZnJvbSAnLi9zZWxlY3RQcm9qZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgKG1vZGVsLCB7IHByb2plY3QsIGRlbGl2ZXJhYmxlIH0pID0+XG4gIE1heWJlLm9mKHByb2plY3QpXG4gICAgLm1hcChwID0+IHNlbGVjdFByb2plY3QobW9kZWwsIHsgcHJvamVjdDogcCB9KSlcbiAgICAuY2hhaW4obSA9PlxuICAgICAgTWF5YmUub2YobS5zZWxlY3RlZFByb2plY3QpXG4gICAgICAgIC5jaGFpbihwID0+XG4gICAgICAgICAgTWF5YmUub2YoZGVsaXZlcmFibGUpXG4gICAgICAgICAgLm1hcChQcm9qZWN0LnNldFNlbGVjdGVkRGVsaXZlcmFibGUocCkpXG4gICAgICAgICAgLm1hcCh1cGRhdGVQcm9qZWN0KHAsIG0pKVxuICAgICAgICApXG4gIClcbiAgLndpdGhEZWZhdWx0KG1vZGVsKTtcbiIsIi8qIGVzbGludC1lbnYgamFzbWluZSAqL1xuaW1wb3J0IHNlbGVjdERlbGl2ZXJhYmxlIGZyb20gJy4uLy4uL2pzL1dpZGdldC91cGRhdGUvc2VsZWN0RGVsaXZlcmFibGUnO1xuaW1wb3J0IHsgUHJvamVjdCwgRGVsaXZlcmFibGUgfSBmcm9tICcuLi8uLi9qcy90eXBlcyc7XG5pbXBvcnQge1xuICBtb2NrUHJvamVjdCxcbiAgbW9ja1Vuc2VsZWN0ZWRQcm9qZWN0LFxuICBtb2NrTW9kZWwsXG59IGZyb20gJy4vbW9ja0RhdGEnO1xuXG5kZXNjcmliZSgndXBkYXRlLnNlbGVjdERlbGl2ZXJhYmxlJywgKCkgPT4ge1xuICBpdCgnc2VsZWN0cyBhIGRlbGl2ZXJhYmxlIGZyb20gdGhlIHNlbGVjdGVkIHByb2plY3Qgc3VjY2Vzc2Z1bGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IG1vY2tBY3Rpb24gPSB7XG4gICAgICBwcm9qZWN0OiBtb2NrUHJvamVjdCxcbiAgICAgIGRlbGl2ZXJhYmxlOiBtb2NrUHJvamVjdC51bnNlbGVjdGVkRGVsaXZlcmFibGVzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbW9kaWZpZWRNb2RlbCA9IHNlbGVjdERlbGl2ZXJhYmxlKG1vY2tNb2RlbCwgbW9ja0FjdGlvbik7XG4gICAgZXhwZWN0KFByb2plY3QuaXNTYW1lKG1vY2tQcm9qZWN0LCBtb2RpZmllZE1vZGVsLnNlbGVjdGVkUHJvamVjdCkpLnRvRXF1YWwodHJ1ZSk7XG4gICAgZXhwZWN0KERlbGl2ZXJhYmxlLmlzU2FtZShcbiAgICAgIG1vY2tQcm9qZWN0LnVuc2VsZWN0ZWREZWxpdmVyYWJsZXNbMF0sXG4gICAgICBtb2RpZmllZE1vZGVsLnNlbGVjdGVkUHJvamVjdC5zZWxlY3RlZERlbGl2ZXJhYmxlXG4gICAgKSkudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3NlbGVjdHMgYSBkZWxpdmVyYWJsZSBmcm9tIHRoZSBhIG5vbiBzZWxlY3RlZCBwcm9qZWN0IHN1Y2Nlc3NmdWxseScsICgpID0+IHtcbiAgICBjb25zdCBtb2NrQWN0aW9uID0ge1xuICAgICAgcHJvamVjdDogbW9ja1Vuc2VsZWN0ZWRQcm9qZWN0LFxuICAgICAgZGVsaXZlcmFibGU6IG1vY2tVbnNlbGVjdGVkUHJvamVjdC51bnNlbGVjdGVkRGVsaXZlcmFibGVzWzBdLFxuICAgIH07XG4gICAgY29uc3QgbW9kaWZpZWRNb2RlbCA9IHNlbGVjdERlbGl2ZXJhYmxlKG1vY2tNb2RlbCwgbW9ja0FjdGlvbik7XG4gICAgZXhwZWN0KFByb2plY3QuaXNTYW1lKG1vY2tVbnNlbGVjdGVkUHJvamVjdCwgbW9kaWZpZWRNb2RlbC5zZWxlY3RlZFByb2plY3QpKS50b0VxdWFsKHRydWUpO1xuICAgIGV4cGVjdChEZWxpdmVyYWJsZS5pc1NhbWUoXG4gICAgICBtb2NrVW5zZWxlY3RlZFByb2plY3QudW5zZWxlY3RlZERlbGl2ZXJhYmxlc1swXSxcbiAgICAgIG1vZGlmaWVkTW9kZWwuc2VsZWN0ZWRQcm9qZWN0LnNlbGVjdGVkRGVsaXZlcmFibGVcbiAgICApKS50b0VxdWFsKHRydWUpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbIl9pc1BsYWNlaG9sZGVyIiwicmVxdWlyZSQkMCIsIl9jdXJyeTEiLCJfYXJpdHkiLCJyZXF1aXJlJCQxIiwiX2N1cnJ5MiIsIl9jdXJyeU4iLCJyZXF1aXJlJCQzIiwicmVxdWlyZSQkMiIsImN1cnJ5TiIsImN1cnJ5IiwidHlwZXMiLCJNYXRoIiwicmFuZG9tIiwiTWF5YmUiLCJ2YWx1ZSIsInR5cGUiLCJpc0p1c3QiLCJ1bmRlZmluZWQiLCJKdXN0IiwiaXNOb3RoaW5nIiwid2l0aERlZmF1bHQiLCJkZWZhdWx0VmFsIiwibWFwIiwiZiIsIm9mIiwiTm90aGluZyIsImNoYWluIiwidiIsIl8iLCJfZGVmYXVsdCIsIm1hcDIiLCJ2MSIsInYyIiwibWFwSWYiLCJjb25kaXRpb24iLCJSZW1vdGVEYXRhIiwiaXNTdWNjZXNzIiwiU3VjY2VzcyIsImlzRmFpbHVyZSIsIkZhaWx1cmUiLCJpc0xvYWRpbmciLCJMb2FkaW5nIiwibG9nIiwiaXNOb3RBc2tlZCIsIk5vdEFza2VkIiwiZWxzZVZhbCIsIm1hcFN1Y2Nlc3MiLCJtYXBMb2FkaW5nIiwibWFwRmFpbHVyZSIsInRvTWF5YmUiLCJfdmFsdWUiLCJWYWxpZGF0aW9uIiwidGhyb3dGYWlsdXJlIiwiYXNzZXJ0IiwiYW5kVGhlbiIsInZhbCIsIl9waXBlIiwiX2N1cnJ5MyIsIl94d3JhcCIsImJpbmQiLCJfaXNBcnJheSIsIl9pc1N0cmluZyIsImlzQXJyYXlMaWtlIiwiX3JlZHVjZSIsIl9zbGljZSIsIl9jaGVja0Zvck1ldGhvZCIsInNsaWNlIiwicGlwZSIsImVyck1zZyIsInByb3AiLCJlcnJvck1lc3NhZ2UiLCJzdHJpbmciLCJib29sIiwiYXJyYXkiLCJzdWJUeXBlIiwiQXJyYXkiLCJpc0FycmF5Iiwic3ViVHlwZXNWYWxpZGF0aW9uIiwicmVkdWNlIiwiZGF0ZSIsIkRhdGUiLCJudWxsYWJsZSIsIm1heWJlIiwiX2RlZmF1bHQyIiwiaGF2ZVNhbWVLZXlzIiwibzEiLCJvMiIsImsxIiwiT2JqZWN0Iiwia2V5cyIsImsyIiwib3V0Iiwia2V5IiwiaW5jbHVkZXMiLCJvYmplY3QiLCJ0eXBlU2lnbmF0dXJlIiwiX2RlZmF1bHQzIiwib3V0Y29tZSIsIl9oYXMiLCJwcm9wT3IiLCJnbG9iYWwiLCJpbW11dGFibGVDb25zdHJ1Y3RvciIsInR5cGVDaGVja2VyIiwiY3VzdG9tQ2hlY2siLCJJbW11dGFibGUiLCJ0eXBlQ2hlY2siLCJUaW1lSW50ZXJ2YWwiLCJnZXRTdGFydCIsIm1vZGVsIiwic3RhcnQiLCJnZXRFbmQiLCJlbmQiLCJnZXRWYWx1ZSIsIm1heWJlU3RhcnQiLCJ2YWx1ZU9mIiwibWF5YmVFbmQiLCJzIiwiZSIsImFzc2lnbiIsImlzUmVjb3JkaW5nIiwic2V0U3RhcnRUaW1lIiwibmV3SW50ZXJ2YWwiLCJnZXRTdGFydFRpbWUiLCJ3aXRoU3RhcnRUaW1lIiwic2V0SW50ZXJ2YWxzIiwiZ2V0SW50ZXJ2YWxzIiwiY2FsY3VsYXRlUnVubmluZ1RpbWUiLCJzdGFydFRpbWUiLCJpbnRlcnZhbHMiLCJpbnRlcnZhbHNTdW0iLCJzdW1TaW5jZVN0YXJ0VGltZSIsImQiLCJSZWNvcmRpbmciLCJyIiwiaW11dGFibGVNb2RlbCIsIm1lcmdlIiwiZGVlcCIsIl9kZWZhdWx0NCIsInRvZ2dsZVJlY29yZGluZyIsIl90b2dnbGVSZWNvcmRpbmciLCJ0b3RhbFRpbWUiLCJfdG90YWxUaW1lIiwiRGVsaXZlcmFibGUiLCJnZXRSZWNvcmRpbmciLCJkZWxpdmVyYWJsZSIsInJlY29yZGluZyIsImdldE5hbWUiLCJnZXRVcmwiLCJzZXRSZWNvcmRpbmciLCJuZXdSZWNvcmRpbmciLCJpc1NhbWUiLCJkMSIsImQyIiwiX2FycmF5RnJvbUl0ZXJhdG9yIiwiX2Z1bmN0aW9uTmFtZSIsImlkZW50aWNhbCIsIl9pc0FyZ3VtZW50cyIsInJlcXVpcmUkJDUiLCJyZXF1aXJlJCQ0IiwiX2VxdWFscyIsImVxdWFscyIsIl9pc1RyYW5zZm9ybWVyIiwiX2Rpc3BhdGNoYWJsZSIsIl9maWx0ZXIiLCJfaXNPYmplY3QiLCJfeGZpbHRlciIsInJlcXVpcmUkJDYiLCJQcm9qZWN0IiwiZ2V0U2VsZWN0ZWREZWxpdmVyYWJsZSIsImdldERlbGl2ZXJhYmxlcyIsInNldFNlbGVjdGVkRGVsaXZlcmFibGUiLCJuZXdTZWxlY3RlZCIsIm5ld0RlbGl2ZXJhYmxlcyIsInVwZGF0ZURlbGl2ZXJhYmxlIiwibmV3RGVsaXZlcmFibGUiLCJzYW1lTmFtZSIsImRlbGl2IiwiX2RlZmF1bHQ2IiwibmFtZSIsInVuc2VsZWN0ZWREZWxpdmVyYWJsZXMiLCJmaW5kIiwibmV3VW5zZWxlY3RlZCIsInAxIiwicDIiLCJfTWF5YmUiLCJfUmVtb3RlRGF0YSIsIl9WYWxpZGF0aW9uIiwiX1JlY29yZGluZyIsIl9UaW1lSW50ZXJ2YWwiLCJfRGVsaXZlcmFibGUiLCJfUHJvamVjdCIsImRlc2NyaWJlIiwic3VjY2Vzc1ZhbCIsInN1Y2Nlc3NWYWwyIiwiZmFpbHVyZVZhbCIsImFTdWNjZXNzIiwiYVN1Y2Nlc3MyIiwiYUZhaWx1cmUiLCJhIiwidG9CZSIsInRvRXF1YWwiLCJ0b1Rocm93Iiwibm90Iiwic3VjY2VzczEiLCJzdWNjZXNzMiIsImRlbGl2TmFtZSIsImRlbGl2VXJsIiwiZGVsaXZSZWMiLCJ2YWxpZE9iamVjdCIsInVybCIsInZhbGlkRGVsaXYiLCJ2YWxpZE9iamVjdE5vUmVjIiwidmFsaWREZWxpdk5vUmVjIiwiaW52YWxpZDEiLCJpbnZhbGlkMiIsImludmFsaWQzIiwic2V0QW5kR2V0UmVjb3JkaW5nIiwibm93Iiwic2VjSW50ZXJ2YWw1Iiwic2VjSW50ZXJ2YWwxMCIsInZhbGlkMSIsInZhbGlkMVJ1bm5pbmciLCJ2YWxpZDIiLCJ2YWxpZDJSdW5uaW5nIiwiaW52YWxpZDFSdW5uaW5nIiwidmFsaWRhdGVzIiwiaW50ZXJ2YWxJc0FycmF5IiwiZW1wdHkiLCJzZXRBbmRHZXRJbnRlcnZhbHMiLCJ0b2dnbGVkVmFsdWUiLCJ0b2dnbGVkU3RhcnRUaW1lIiwidG9CZUxlc3NUaGFuT3JFcXVhbCIsInNlYzE1Iiwic2VjMTVSdW5uaW5nIiwic2VjMCIsInNlYzBSdW5uaW5nIiwidG9CZUdyZWF0ZXJUaGFuIiwiY3JlYXRlZEp1c3RXaXRoT2YiLCJjcmVhdGVkSnVzdCIsImNyZWF0ZWROb3RoaW5nIiwianVzdFZhbCIsIm1hcHBlZFZhbCIsImZ1bmMiLCJtYXBBbmRHZXREZWZhdWx0IiwibWFwMkFuZEdldERlZmF1bHQiLCJ2YWxpZE9iaiIsImludmFsaWQ0IiwiaW52YWxpZDUiLCJtb2NrRGVsaXZlcmFibGUiLCJ2YWxpZE5hbWUiLCJ2YWxpZFVybCIsInZhbGlkIiwiaXNWYWxpZCIsImFzTXV0YWJsZSIsIm0iLCJ0b0JlVHJ1dGh5IiwibW9ja0RlbGl2ZXJhYmxlQ2hhbmdlZCIsIm1vY2tQcm9qZWN0IiwidXBkYXRlQW5kR2V0RGVsaXZlcmFibGVzIiwidG9CZUZhbHN5IiwiX3JlZHVjZWQiLCJfeGZCYXNlIiwiX3hmaW5kIiwibnRoIiwiX2lzRnVuY3Rpb24iLCJfaW5kZXhPZiIsIl9jb250YWlucyIsIl9tYXAiLCJfcXVvdGUiLCJfdG9JU09TdHJpbmciLCJfY29tcGxlbWVudCIsImZpbHRlciIsInJlamVjdCIsIl90b1N0cmluZyIsInRvU3RyaW5nIiwiX3htYXAiLCJkZWZhdWx0VG8iLCJwYXRoIiwicGF0aE9yIiwidXBkYXRlQXQiLCJrZXlBcnJheSIsIm5ld1ZhbCIsIm9iaiIsImRlZXBOZXdWYWwiLCJyZWR1Y2VSaWdodCIsInJlc3VsdCIsInNlbGVjdGVkUHJvamVjdCIsInVuc2VsZWN0ZWRQcm9qZWN0cyIsImFsbFByb2plY3RzIiwiY29uY2F0IiwicmVjb3JkaW5nc0luZm8iLCJub25aZXJvUmVjb3JkaW5nVGltZSIsIl9kZWZhdWx0NSIsInByb2plY3RSZWNvcmRpbmdJbmZvcyIsInByb2plY3QiLCJhbGwiLCJfZGVmYXVsdDciLCJnZXRQcm9qZWN0IiwicHJvamVjdE5hbWUiLCJfZGVmYXVsdDkiLCJfZGVmYXVsdDEwIiwiZ2V0RGVsaXZlcmFibGUiLCJkZWxpdmVyYWJsZU5hbWUiLCJ1cGRhdGVQcm9qZWN0IiwibmV3UHJvamVjdCIsInNhbWVQcm9qZWN0TmFtZSIsInVwZGF0aW5nU2VsZWN0ZWRQcm9qZWN0IiwidXBkYXRpbmdVbnNlbGVjdGVkUHJvamVjdCIsIm5ld1Vuc2VsZWN0ZWRQcm9qZWN0cyIsInAiLCJ0b2dnbGVEZWxpdmVyYWJsZVJlY29yZGluZyIsImZpbmRSZWNvcmRpbmdEZWxpdmVyYWJsZSIsInN0b3BBbGxSZWNvcmRpbmdzIiwiZ2V0VXBUb0RhdGVQcm9qZWN0IiwiY2hhbmdlZE1vZGVsIiwibW9ja1Vuc2VsZWN0ZWREZWxpdmVyYWJsZSIsIm1vY2tVbnNlbGVjdGVkUHJvamVjdCIsIm1vY2tNb2RlbCIsIm1vY2tBY3Rpb24iLCJ0b2dnbGVkTW9kZWwiLCJkZWxpdmVyYWJsZXNSZWNvcmRpbmciLCJsZW5ndGgiLCJhY3Rpb24iLCJtb2RpZmllZE1vZGVsIiwic2VsZWN0UHJvamVjdCIsInNlbGVjdERlbGl2ZXJhYmxlIiwic2VsZWN0ZWREZWxpdmVyYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0JBQWMsR0FBRyxTQUFTQSxnQkFBYyxDQUFDLENBQUMsRUFBRTtFQUMxQyxPQUFPLENBQUMsSUFBSSxJQUFJO1NBQ1QsT0FBTyxDQUFDLEtBQUssUUFBUTtTQUNyQixDQUFDLENBQUMsMEJBQTBCLENBQUMsS0FBSyxJQUFJLENBQUM7Q0FDL0MsQ0FBQzs7QUNKRixJQUFJLGNBQWMsR0FBR0MsZ0JBQTJCLENBQUM7Ozs7Ozs7Ozs7O0FBV2pELGFBQWMsR0FBRyxTQUFTQyxTQUFPLENBQUMsRUFBRSxFQUFFO0VBQ3BDLE9BQU8sU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3BCLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQy9DLE9BQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTTtNQUNMLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDbEM7R0FDRixDQUFDO0NBQ0gsQ0FBQzs7QUNuQkYsWUFBYyxHQUFHLFNBQVNDLFFBQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFOztFQUV0QyxRQUFRLENBQUM7SUFDUCxLQUFLLENBQUMsRUFBRSxPQUFPLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoRSxLQUFLLENBQUMsRUFBRSxPQUFPLFNBQVMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEUsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN0RSxLQUFLLENBQUMsRUFBRSxPQUFPLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRSxLQUFLLENBQUMsRUFBRSxPQUFPLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRixLQUFLLENBQUMsRUFBRSxPQUFPLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FB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