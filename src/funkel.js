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
 * @param {Function} f
 * @return {Function}
 */
export function curry(f) {

    const argArity = f.length;

    return function curried(...a) {

        if (a.length >= argArity) {
            return f(...a);
        }

        return (...b) => {
            return curried(...[...a, ...b]);
        };

    };

}

/**
 * @method partial
 * @param {Function} f
 * @param {Array} a
 * @return {Function}
 */
export function partial(f, ...a) {
    return f.bind(null, ...a);
}

/**
 * @method compose
 * @param {Function[]} fns
 * @return {Function}
 */
export function compose(...fns) {

    return function(a) {
        return fns.reduceRight((acc, fn) => fn.call(this, acc), a);
    };

}

/**
 * @method memoize
 * @param {Function} fn
 * @return {Function}
 */
export function memoize(fn) {

    const cache = new Map();

    return (...args) => {

        const key    = JSON.stringify(args);
        const cached = cache.get(key);

        return cached ? cached : (() => {
            const value = fn(...args);
            cache.set(key, value);
            return value;
        })();

    };

}

/**
 * @method pluck
 * @param {Object} model
 * @param {String} keys
 * @return
 */
export function pluck(model, ...keys) {

    return model.map(item => {
        //const key = keys[0];
        return item[keys[0]];
    });

}
