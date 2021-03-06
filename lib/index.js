function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/// <reference path="../node_modules/views/views.d.ts" />
var form_1 = require('./form');
var ed = require('./editors/index');
var validator_1 = require('./validator');
var editor_1 = require('./editors/editor');
var types_1 = require('./types');
__export(require('./form'));
function create(elm, options) {
    if (options === void 0) { options = {}; }
    if (typeof elm === 'string') {
        var e = document.querySelector(elm);
        if (!e)
            return null;
        options.el = e;
    }
    else if (elm instanceof HTMLElement) {
        options.el = elm;
    }
    else {
        options = elm;
    }
    return new form_1.Form(options);
}
exports.create = create;
function createError(msg) {
    return new ed.EditorError(msg);
}
exports.createError = createError;
var editors;
(function (editors) {
    editors.ValidationError = types_1.FormValidationError;
    function extend(name, prototype, staticProps) {
        var editor = editor_1.Editor.extend(prototype, staticProps);
        editors.set(name, editor);
        return editor;
    }
    editors.extend = extend;
    function get(name) {
        return ed.get(name);
    }
    editors.get = get;
    function set(name, editor) {
        ed.set(editor, name);
    }
    editors.set = set;
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
