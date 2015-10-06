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

# Releases

 > :package: `v0.1.0`
 
 * `identity(x)`;
 * `trace(x)`
 * `curry(f)`
 * `partial(f, ...x)`
 * `compose(...f)`
 