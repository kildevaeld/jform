/// <reference path="../node_modules/views/views.d.ts" />
var types_1 = require('./types');
var views_1 = require('views');
function errorToPromise(err) {
    if (err instanceof Error) {
        return Promise.reject(err);
    }
    else if (views_1.utils.isPromise(err)) {
        return err;
    }
    return null;
}
var Validator = (function () {
    function Validator() {
    }
    Validator.prototype.validate = function (el, value, validate) {
        if (validate.name === 'required') {
            return value == null ? Promise.reject(new types_1.FormValidationError('required', value)) : null;
        }
        if (Validator.validators[validate.name]) {
            var e = Validator.validators[validate.name](el, value);
            return errorToPromise(e);
        }
        return null;
    };
    Validator.validators = {};
    Validator.messages = {};
    return Validator;
})();
exports.Validator = Validator;
