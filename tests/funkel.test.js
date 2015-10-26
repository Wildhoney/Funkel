import * as f from './../src/funkel';

describe('Funkel', () => {

    describe('Identity', () => {

        it('Should be able to return the argument that is passed;', () => {
            expect(f.identity('Adam')).toEqual('Adam');
            expect(f.identity(true)).toEqual(true);
            expect(f.identity(null)).toEqual(null);
            expect(f.identity(1.5)).toEqual(1.5);
        });

    });

    describe('Curry', () => {

        it('Should be able to curry a function;', () => {
            const divideTwoNumbers = f.curry((a, b) => a / b);
            expect(typeof divideTwoNumbers).toBe('function');
            expect(divideTwoNumbers(3)(2)).toEqual(1.5);
        });

        it('Should be able to curry two functions with multiple arguments;', () => {

            const addThreeNumbers = (a, b, z) => a + b + z;
            const curriedAddThree = f.curry(addThreeNumbers);

            const addTwoNumbers   = (a, b) => a + b;
            const curriedAddTwo   = f.curry(addTwoNumbers);

            expect(curriedAddThree(1)(2)(3)).toEqual(6);
            expect(curriedAddTwo(1)(2)).toEqual(3);

        });

        it('Should be able to curry a function in multiple steps;', () => {
            const multiplyTwoNumbers = f.curry((a, b) => a * b);
            const multiplyByThree    = multiplyTwoNumbers(3);
            expect(multiplyByThree(9)).toEqual(27);
        });

        it('Should be able to curry with passing more than one argument;', () => {
            const multiplyAllNumbers = f.curry((a, b, c, d) => a * b * c * d);
            expect(multiplyAllNumbers(2, 3)(4, 5)).toEqual(120);
        });

    });

    describe('Trace', () => {

        it('Should be able to output the given string using `console.log`;', () => {
            spyOn(console, 'log');
            expect(f.trace('Adam')).toEqual('Adam');
            expect(console.log).toHaveBeenCalled();
        });

        it('Should be able to output the given object using `console.table`;', () => {

            spyOn(console, 'log');
            spyOn(console, 'table');

            const model = [{ name: 'Adam', age: 29 }, { name: 'Maria', age: 24 }];
            expect(f.trace(model)).toEqual(model);
            expect(console.log).not.toHaveBeenCalled();
            expect(console.table).toHaveBeenCalled();

        });

    });

    describe('Partial', () => {

        it('Should be able to partially apply a given function;', () => {
            const addTwoNumbers = (a, b) => a + b;
            const addFive       = f.partial(addTwoNumbers, 5);
            expect(typeof addFive).toBe('function');
            expect(addFive(2)).toEqual(7);
        });

        it('Should be able to partially apply a variadic function;', () => {
            const addAllNumbers = (...xs) => xs.reduce((acc, a) => acc += a, 0);
            const addNumbers    = f.partial(addAllNumbers, 1, 2, 3);
            expect(addNumbers(4)).toEqual(10);
        });

    });

    describe('Compose', () => {

        it('Should be able to compose a list of functions to be applied sequentially from right-to-left', () => {
            const addOne          = a => a + 1;
            const multipleByTwo   = a => a * 2;
            const processEquation = f.compose(multipleByTwo, addOne);
            expect(processEquation(2)).toEqual(6);
        });

        it('Should be able to use trace to debug composed functions;', () => {
            const addTwo          = a => a + 2;
            const multiplyByThree = a => a * 3;
            const processEquation = f.compose(addTwo, f.trace, multiplyByThree);
            spyOn(console, 'log');
            expect(processEquation(3)).toEqual(11);
            expect(console.log).toHaveBeenCalledWith(9);
        });

    });

    describe('Memoize', () => {

        it('Should be able to memoize a referentially transparent function;', () => {

            const spy = { fn: (x, y) => x + y };
            spyOn(spy, 'fn').and.callThrough();

            const addNumbers = f.memoize(spy.fn);
            expect(addNumbers(1, 2)).toEqual(3);
            expect(spy.fn.calls.count()).toEqual(1);
            expect(addNumbers(1, 2)).toEqual(3);
            expect(spy.fn.calls.count()).toEqual(1);
            expect(addNumbers(3, 4)).toEqual(7);
            expect(spy.fn.calls.count()).toEqual(2);

        });

    });

    describe('Pluck', () => {

        it('Should be able to pluck keys from the array of objects;', () => {
            const user = [{ name: 'Adam', age: 30 }, { name: 'Maria', age: 24 }];
            expect(f.pluck(user, 'name')).toEqual(['Adam', 'Maria']);
        });

    });

});
