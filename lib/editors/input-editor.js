var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var editor_1 = require('./editor');
var views_1 = require('views');
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
        if (this.el.nodeName === 'INPUT' && !!~['checkbox', 'radio'].indexOf(this.el.type)) {
            this.el.checked = !!value;
        }
        else if (this.el.nodeName === 'INPUT' && this.el.type === 'file') {
        }
        else {
            this.el.value = (value == null ? "" : value);
        }
    };
    InputEditor.prototype.getValue = function () {
        if (this.el.nodeName === 'INPUT' && ~['checkbox', 'radio'].indexOf(this.el.type)) {
            return this.el.checked;
        }
        else if (this.el.nodeName === 'INPUT' && this.el.type === 'file') {
            return this.el.files;
        }
        return (this.el.value === '' ? null : this.el.value);
    };
    InputEditor.prototype.clear = function () {
        this.el.value = '';
        this.setDefault();
    };
    InputEditor.prototype._onChange = function () {
        var current = this.getValue();
        if (views_1.utils.equal(current, this._prev)) {
            return;
        }
        this.triggerChange();
    };
    return InputEditor;
})(editor_1.Editor);
exports.InputEditor = InputEditor;
