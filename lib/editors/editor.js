var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var views_1 = require('views');
var Types_1 = require('../Types');
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
        this.label = options.label;
        this._name = options.name;
        this._defaultValue = options.defaultValue;
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
    Editor.prototype.validate = function () {
        return null;
    };
    Editor.prototype.triggerChange = function (e) {
        this.triggerMethod('change', this);
    };
    Editor.prototype.render = function () {
        this.undelegateEvents();
        _super.prototype.render.call(this);
        this.delegateEvents();
        return this;
    };
    Editor.prototype.setDefault = function () {
        if (this._defaultValue != null)
            this.setValue(this._defaultValue);
    };
    return Editor;
})(views_1.TemplateView);
exports.Editor = Editor;
var CollectionEditor = (function (_super) {
    __extends(CollectionEditor, _super);
    function CollectionEditor(options) {
        if (!options || !options.name) {
            throw new EditorError("no name specified");
        }
        this._name = options.name;
        this._defaultValue = options.defaultValue;
        _super.call(this, options);
    }
    Object.defineProperty(CollectionEditor.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionEditor.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        set: function (value) {
            this.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    CollectionEditor.prototype.setValue = function (value) { throw new AbstractClassError("setValue not implemented"); };
    CollectionEditor.prototype.getValue = function () { throw new AbstractClassError("getValue not implemented"); };
    CollectionEditor.prototype.clear = function () { throw new AbstractClassError("clear not implemented"); };
    CollectionEditor.prototype.validate = function () {
        return null;
    };
    CollectionEditor.prototype.triggerChange = function (e) {
        this.triggerMethod('change', this);
    };
    CollectionEditor.prototype.setDefault = function () {
        if (this._defaultValue != null)
            this.setValue(this._defaultValue);
    };
    return CollectionEditor;
})(views_1.CollectionView);
exports.CollectionEditor = CollectionEditor;
