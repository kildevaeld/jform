var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var views_1 = require('views');
var Types_1 = require('./Types');
var list_1 = require('./editors/list');
//import {View, ViewOptions, IView, IEventEmitter, utils} from 'views/lib/index'
var AbstractClassError = (function (_super) {
    __extends(AbstractClassError, _super);
    function AbstractClassError() {
        _super.apply(this, arguments);
        this.name = "EditorImplementationError";
    }
    return AbstractClassError;
})(Types_1.FormError);
var EditorError = (function (_super) {
    __extends(EditorError, _super);
    function EditorError() {
        _super.apply(this, arguments);
        this.name = 'EditorError';
    }
    return EditorError;
})(Types_1.FormError);
var Editor = (function (_super) {
    __extends(Editor, _super);
    function Editor(options) {
        if (!options || !options.name) {
            throw new EditorError("no name specified");
        }
        this._name = options.name;
        _super.call(this, options);
    }
    Object.defineProperty(Editor.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        set: function (value) {
            this.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Editor.prototype.setValue = function (value) { throw new AbstractClassError("setValue not implemented"); };
    Editor.prototype.getValue = function () { throw new AbstractClassError("getValue not implemented"); };
    Editor.prototype.clear = function () { throw new AbstractClassError("clear not implemented"); };
    // no-op
    Editor.prototype.validate = function () {
        return null;
    };
    Editor.prototype.triggerChange = function (e) {
        this.triggerMethod('change', this);
    };
    return Editor;
})(views_1.View);
exports.Editor = Editor;
var InputEditor = (function (_super) {
    __extends(InputEditor, _super);
    function InputEditor() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(InputEditor.prototype, "events", {
        get: function () {
            return {
                'change': '_onChange'
            };
        },
        enumerable: true,
        configurable: true
    });
    InputEditor.prototype.setValue = function (value) {
        this.el.value = value;
    };
    InputEditor.prototype.getValue = function () {
        return this.el.value === '' ? null : this.el.value;
    };
    InputEditor.prototype._onChange = function () {
        var current = this.getValue();
        if (views_1.utils.equal(current, this._prev)) {
            return;
        }
        this.triggerChange();
    };
    return InputEditor;
})(Editor);
exports.InputEditor = InputEditor;
var editors = {
    text: InputEditor,
    textarea: InputEditor,
    list: list_1.ListEditor
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
