/// <reference path="../../node_modules/views/views.d.ts" />
var input_editor_1 = require('./input-editor');
var list_1 = require('./list');
var number_1 = require('./number');
var select_1 = require('./select');
var editors = {
    input: input_editor_1.InputEditor,
    text: input_editor_1.InputEditor,
    checkbox: input_editor_1.InputEditor,
    radio: input_editor_1.InputEditor,
    textarea: input_editor_1.InputEditor,
    list: list_1.ListEditor,
    number: number_1.NumberEditor,
    select: select_1.SelectEditor
};
function has(editor) {
    return get(editor) != null;
}
exports.has = has;
function get(editor) {
    return editors[editor];
}
exports.get = get;
function set(editor, name) {
    editors[name] = editor;
}
exports.set = set;
