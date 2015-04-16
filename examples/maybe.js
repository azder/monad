/**
 * Created by azder on 2015-04-13.
 */


MONAD = require('../monad.js');
alert = require('./helpers.js').alert;

maybe = MONAD(function (monad, value) {

    if (value === null || value === undefined) {
        monad.null = true;
        monad.bind = function () {
            return monad;
        };
        return null;
    }

    return value;

});


monad = maybe(null);
monad.bind(alert);    // Nothing happens.
alert(maybe, monad);


