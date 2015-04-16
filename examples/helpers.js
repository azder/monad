/**
 * Created by azder on 2015-04-13.
 */

// ALWAYS
'use strict';


exports.alert = console.log.bind(console);

exports.id = function (value) {
    return value;
};

exports.tap = function (value, fn, tag) {
    fn(tag, value);
    return exports.id(value);
};

exports.error = function (value) {
    throw new Error(value);
};
