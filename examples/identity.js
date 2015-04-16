/**
 * Created by azder on 2015-04-13.
 */

MONAD = require('../monad.js');
alert = require('./helpers.js').alert;

Identity = MONAD(function (monad, value) {
    alert('init()', monad, monad.monadic);
    return value;
});

monad = Identity("Hello world.");
monad.bind(alert);

alert(Identity, monad, monad.monadic);
alert(Identity.prototype);
