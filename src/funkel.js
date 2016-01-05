/**
 * @method identity
 * @param {*} a
 * @return {*}
 */
export function identity(a) {
    return a;
}

/**
 * @method trace
 * @param {*} a
 * @return {*}
 */
export function trace(a) {

    const isArrayMap = (a) => Array.isArray(a) && (typeof a[0] === 'object');
    (isArrayMap(a) ? console.table : console.log)(a);

    return identity(a);

}

/**
 * @method curry
 * @param {Function} fn
 * @return {Function}
 */
export function curry(fn) {

    const argArity = fn.length;

    function curriedFn(...a) {

        if (a.length >= argArity) {
            return fn(...a);
        }

        function internalCurriedFn(...b) {
            return curriedFn(...[...a, ...b]);
        }

        /**
         * @method toString
         * @return {String}
         */
        internalCurriedFn.toString = function() {
            return `${functionId(fn)}(${a.join(', ')})`;
        };

        return internalCurriedFn;

    }

    /**
     * @method toString
     * @return {String}
     */
    curriedFn.toString = () => functionId(fn);

    return curriedFn;

}

/**
 * @method partial
 * @param {Function} fn
 * @param {Array} a
 * @return {Function}
 */
export function partial(fn, ...a) {

    const partialFn = fn.bind(null, ...a);

    /**
     * @method toString
     * @type {Function}
     */
    partialFn.toString = () => {
        return `${fn.toString()}(${a.join(', ')})`;
    };

    return partialFn;

}

/**
 * @method compose
 * @param {Function[]} fns
 * @return {Function}
 */
export function compose(...fns) {

    const composeFn = function(a) {
        return fns.reduceRight((accumulator, fn) => this::fn(accumulator), a);
    };

    /**
     * @method toString
     * @return {String}
     */
    composeFn.toString = () => `compose(${fns.map(fn => fn.toString()).join(', ')})`;

    return composeFn;

}

/**
 * @method composeDeferred
 * @param {Function[]} fns
 * @return {Promise}
 */
export function composeDeferred(...fns) {

    const composeFn = function(a) {

        return new Promise(resolve => {

            const next = (accumulator, index = fns.length - 1) => {

                if (!~index) {
                    return void resolve(accumulator);
                }

                const r = this::fns[index](accumulator);
                Promise.resolve(r).then(x => next(x, index - 1));

            };

            next(a);

        });

    };

    /**
     * @method toString
     * @return {String}
     */
    composeFn.toString = () => `compose(${fns.map(fn => fn.toString()).join(', ')})`;

    return composeFn;

}

/**
 * @method memoize
 * @param {Function} fn
 * @return {Function}
 */
export function memoize(fn) {

    const cache     = new Map();
    const memoizeFn = (...args) => {

        const key    = JSON.stringify(args);
        const cached = cache.get(key);

        return cached ? cached : (() => {
            const value = fn(...args);
            cache.set(key, value);
            return value;
        })();

    };

    /**
     * @method toString
     * @return {String}
     */
    memoizeFn.toString = () => fn.toString();
    return memoizeFn

}

/**
 * @method pluck
 * @param {Object} model
 * @param {String} key
 * @return
 */
export function pluck(model, key) {
    return model.map(item => item[key]);
}

/**
 * @method once
 * @param {Function} fn
 * @return {Function}
 */
export function once(fn) {

    let invoked  = false;
    const onceFn = (...args) => {
        const value = invoked ? (() => {})() : fn(...args);
        invoked = true;
        return value;
    };

    /**
     * @method toString
     * @return {String}
     */
    onceFn.toString = () => fn.toString();
    return onceFn;

}

/**
 * @method functionId
 * @param {Function} fn
 * @return {String}
 */
export function functionId(fn) {
    return fn.name ? fn.name : fn.toString();
}
