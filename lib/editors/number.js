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
var views_1 = require('views');
var editor_1 = require('./editor');
var NumberEditor = (function (_super) {
    __extends(NumberEditor, _super);
    function NumberEditor(options) {
        _super.call(this, options);
        this._floating = options.float == null ? false : options.float;
    }
    NumberEditor.prototype._onKeyPress = function (e) {
        var real_val = String.fromCharCode(e.which), cur_val = this.el.value;
        if (e.which == 8)
            real_val = real_val.substr(0, real_val.length - 2);
        if (!~cur_val.indexOf(',') && real_val === ',' && this._floating) {
            var sel = this.el.selectionStart;
            if (cur_val == '' || sel === 0) {
                this.el.value = '0,' + this.el.value;
                this.el.setSelectionRange(2, 2);
            }
            else {
                return;
            }
        }
        if (isNaN(parseFloat(real_val))) {
            e.preventDefault();
        }
    };
    NumberEditor.prototype.setValue = function (value) {
        this.el.value = "" + (this._floating ? value : Math.round(value));
    };
    NumberEditor.prototype.getValue = function () {
        var value = this.el.value;
        if (value === '')
            return null;
        return this._floating ? parseFloat(value.replace(',', '.')) : parseInt(value);
    };
    NumberEditor.prototype.clear = function () {
        this.el.value = '';
        this.setDefault();
    };
    NumberEditor = __decorate([
        views_1.events({
            'keypress': '_onKeyPress'
        }), 
        __metadata('design:paramtypes', [Object])
    ], NumberEditor);
    return NumberEditor;
})(editor_1.Editor);
exports.NumberEditor = NumberEditor;
