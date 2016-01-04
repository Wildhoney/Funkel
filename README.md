<img src="media/logo.png" width="230" alt="Funkel" />

> Simple and lightweight functional toolset inspired by Clojure using `import`.

# Getting Started

Use `import` to bring in the necessary functions into your module. In the following example we're going to `import` the `partial` function and utilise it!

```javascript
import {partial} from 'funkel';

const addNumbers = (a, b) => a + b;
const addTwo     = partial(addNumbers, 2);

expect(addTwo(3)).toEqual(5);
```

## Releases

 > :package: `v0.1.x`
 
 * `identity(a)`
 * `trace(a)`
 * `curry(fn)`
 * `partial(fn, ...a)`
 * `compose(...fns)`
 * `composeDeferred(...fns)`
 
# Examples

Below are a set of examples for using `Funkel` &ndash; although it's not an exhaustive list, and you should refer to the source and/or associated unit-tests if you need further information about what `Funkel` provides and how it functions.

### `trace`

If you have a `compose`d function but are having troubles, it's useful to `console.log` the current value at any given step, for these cases use `trace` in the `compose` function:

```javascript
const pay = compose(printInvoice, f.trace, sendMoney, createOrder);
```

# Promise-Safe Composing

For cases where you have functions that return promises, you can use the `composeDeferred` function.

```javascript
import {composeDeferred} from 'funkel';

const addOne   = a => new Promise(resolve => resolve(a + 1));
const addTwo   = a => a + 2;
const addThree = a => new Promise(resolve => resolve(a + 3));

const composedFn = composeDeferred(addOne, addTwo, addEleven);

composedFn(0).then(result => {
    expect(result).toEqual(6);
});
```
