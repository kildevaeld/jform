var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var editor_1 = require('./editor');
var views_1 = require('views');
var InputEditor = (function (_super) {
    __extends(InputEditor, _super);
    function InputEditor() {
        _super.apply(this, arguments);
    }
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
    InputEditor = __decorate([
        views_1.events({
            'change': '_onChange'
        }), 
        __metadata('design:paramtypes', [])
    ], InputEditor);
    return InputEditor;
})(editor_1.Editor);
exports.InputEditor = InputEditor;
