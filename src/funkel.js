/**
 * @method identity
 * @param {*} x
 * @return {*}
 */
export function identity(x) {
    return x;
}

/**
 * @method trace
 * @param {*} x
 * @return {void}
 */
export function trace(x) {
    const isArrayMap = (x) => Array.isArray(x) && (typeof x[0] === 'object');
    (isArrayMap(x) ? console.table : console.log)(x);
}

/**
 * @method curry
 * @param {Function} f
 * @return {Function}
 */
export function curry(f) {

}

/**
 * @method partial
 * @param {Function} f
 * @param {Array} x
 * @return {Function}
 */
export function partial(f, ...x) {
    return f.bind(null, ...x);
}

/**
 * @method compose
 * @param {Function[]} fs
 * @return {Function}
 */
export function compose(...fs) {
    return x => fs.reduceRight((acc, f) => f(acc), x);
}
