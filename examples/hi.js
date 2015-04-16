/**
 * Created by azder on 2015-04-14.
 */

MONAD = require('../monad.js');
alert = require('./helpers.js').alert;

var Hi = MONAD().lift('alert', alert);

monad = Hi("Hello world.");
monad.alert();

alert('alert', Hi, monad);

