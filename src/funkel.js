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
 * @return {void}
 */
export function trace(a) {
    const isArrayMap = (a) => Array.isArray(a) && (typeof a[0] === 'object');
    (isArrayMap(a) ? console.table : console.log)(a);
}

/**
 * @method curry
 * @param {Function} f
 * @return {Function}
 */
export function curry(f) {

    const argArity = f.length;
    const args     = [];

    return function curried(...a) {
        args.push(...a);
        return (args.length === argArity) ? f(...args) : curried;
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
 * @param {Function[]} fs
 * @return {Function}
 */
export function compose(...fs) {
    return a => fs.reduceRight((acc, f) => f(acc), a);
}
