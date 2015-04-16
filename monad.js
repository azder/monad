// monad.js by Douglas Crockford 2013-05-18

// Forked and modified by azder on 2015-04-12

// The MONAD function is a macroid that produces monad constructor functions.
// It can take an optional modifier function, which is a function that is
// allowed to modify new monads at the end of the construction processes.

// A monad constructor (sometimes called 'unit' or 'return' in some mythologies)
// comes with three methods, lift, vlift, and method, all of which can add
// methods and properties to the monad's prototype.

// A monad has a 'bind' method that takes a function that receives a value and
// is usually expected to return a monad.


module.exports = function MONAD(init) {

    'use strict';

    // Each unit constructor has a monad prototype. The prototype will contain a
    // monadic property for classification, as well as all inheritable methods.

    var prototype = Object.create(null);
    prototype.monadic = true;

    // the Monad (unit) constructor function returned by MONAD
    function Monad(value) {

        // Construct a new monad.
        var monad = Object.create(prototype);

        // in some mythologies it is called 'bind', 'pipe' or '>>='.
        monad.bind = function (fn, args) {
            // return fn(value, ...args);
            monad.pipe(fn, args);
            return value;
        };

        monad.pipe = function (fn, args) {
            value = fn.apply(undefined, [value].concat(args || []));
            return monad;
        };

        // If MONAD's `init` is a function, it should be called to initialize/modify the monad and/or value.
        if ('function' === typeof init) {
            value = init(monad, value);
        }

        return monad;

    }

    Monad.method = function (name, fn) {
        prototype[name] = fn;
        return Monad;
    };

    Monad.val = function (name, fn) {
        // This can be used for ajax methods that return values other than monads.
        prototype[name] = function () {
            return this.bind(fn, arguments);
        };
        return Monad;
    };

    Monad.lift = function (name, fn) {
        // If the value returned by the fn is not a monad, then make a monad.
        prototype[name] = function () {
            var monad = this.bind(fn, arguments);
            return monad && true === monad.monadic ? monad : Monad(monad);
        };
        return Monad;
    };

    return Monad;

};
