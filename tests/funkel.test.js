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
            multiplyTwoNumbers(3);
            expect(multiplyTwoNumbers(9)).toEqual(27);
        });

        it('Should be able to curry with passing more than one argument;', () => {
            const multiplyAllNumbers = f.curry((a, b, c, d) => a * b * c * d);
            expect(multiplyAllNumbers(2, 3)(4, 5)).toEqual(120);
        });

    });

    describe('Trace', () => {

        it('Should be able to output the given string using `console.log`;', () => {
            spyOn(console, 'log');
            f.trace('Adam');
            expect(console.log).toHaveBeenCalled();
        });

        it('Should be able to output the given object using `console.table`;', () => {

            spyOn(console, 'log');
            spyOn(console, 'table');

            const model = [{ name: 'Adam', age: 29 }, { name: 'Maria', age: 24 }];
            f.trace(model);
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
            const multiplyNumber  = a => a * 2;
            const processEquation = f.compose(multiplyNumber, addOne);
            expect(processEquation(2)).toEqual(6);
        });

    });

});
