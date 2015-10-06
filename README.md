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

 > :package: `v0.1.0`
 
 * `identity(a)`
 * `trace(a)`
 * `curry(f)`
 * `partial(f, ...a)`
 * `compose(...f)`
 
 
# Examples

Below are a set of examples for using `Funkel` &ndash; although it's not an exhaustive list, and you should refer to the source and/or associated unit-tests if you need further information about what `Funkel` provides and how it functions.

### Debugging `compose` with `trace`

If you have a `compose`d function but are having troubles, it's useful to `console.log` the current value at any given step, for these cases use `trace` in the `compose` function:

```javascript
const pay = compose(printInvoice, f.trace, sendMoney, createOrder);
```
