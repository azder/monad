MONAD = require('../monad.js');
helpers = require('./helpers.js');

Exception = MONAD(function (monad, value) {
    var old = monad.pipe;
    monad.pipe = function () {
        if (monad.error) {
            return monad;
        }
        try {
            return old.apply(this, arguments);
        } catch (e) {
            helpers.alert(e);
            monad.error = e;
            return monad;
        }
    };
    return value;
});

monad = Exception(0);

Exception.method('tap', function (fn, tag) {
    fn(tag, this.error);
});

monad.tap(helpers.alert, 'before');

helpers.alert(Exception.prototype);

realized = monad
    .pipe(helpers.id)
    .pipe(helpers.tap, [console.log, 'second pipe'])
    .pipe(helpers.error)
    .bind(function () {
        return 'hello';
    });

monad.tap(helpers.alert, 'after');

helpers.alert(monad, realized);
