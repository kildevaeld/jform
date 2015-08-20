/// <reference path="../node_modules/views/views.d.ts" />
//// <reference path="../typings/es6-promise/es6-promise.d.ts" />
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var form_1 = require('./form');
var ed = require('./editors/index');
var validator_1 = require('./validator');
__export(require('./form'));
function create(elm, options) {
    if (options === void 0) { options = {}; }
    if (typeof elm === 'string') {
        var e = document.querySelector(elm);
        if (!e)
            return null;
        options.el = e;
    }
    else {
        options = elm;
    }
    return new form_1.Form(options);
}
exports.create = create;
var editors;
(function (editors) {
    editors.Editor = editors.Editor;
    function extend(name, prototype) {
        var editor = editors.Editor.extend(prototype, {});
        ed.set(editor, name);
        return editor;
    }
    editors.extend = extend;
    function get(name) {
        return ed.get(name);
    }
    editors.get = get;
})(editors = exports.editors || (exports.editors = {}));
var validators;
(function (validators) {
    function add(name, fn, message) {
        validator_1.Validator.validators[name] = fn;
        addMessage(name, message);
    }
    validators.add = add;
    function addMessage(name, message) {
        validator_1.Validator.messages[name] = message;
    }
    validators.addMessage = addMessage;
})(validators = exports.validators || (exports.validators = {}));
