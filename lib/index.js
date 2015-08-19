/// <reference path="../node_modules/views/views.d.ts" />
//// <reference path="../typings/es6-promise/es6-promise.d.ts" />
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Form_1 = require('./Form');
var ed = require('./Editors');
var validator_1 = require('./validator');
exports.default = Form_1.Form;
__export(require('./Form'));
var editors;
(function (editors) {
    editors.Editor = ed.Editor;
    function extend(name, prototype) {
        var editor = ed.Editor.extend(prototype, {});
        ed.set(editor, name);
        return editor;
    }
    editors.extend = extend;
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
