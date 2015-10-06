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
            const addTwoNumbers = (x, y) => x + y;
            const addFive       = f.partial(addTwoNumbers, 5);
            expect(typeof addFive).toBe('function');
            expect(addFive(2)).toEqual(7);
        });

        it('Should be able to partially apply a variadic function;', () => {
            const addAllNumbers = (...xs) => xs.reduce((acc, x) => acc += x, 0);
            const addNumbers    = f.partial(addAllNumbers, 1, 2, 3);
            expect(addNumbers(4)).toEqual(10);
        });

    });

});
