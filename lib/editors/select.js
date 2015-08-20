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
var SelectEditor = (function (_super) {
    __extends(SelectEditor, _super);
    function SelectEditor(options) {
        _super.call(this, options);
    }
    SelectEditor.prototype.setValue = function (value) {
        var index = null;
        for (var i = 0; i < this.el.options.length; i++) {
            var o = this.el.options[i];
            if (o.value === value.value && o.innerText === value.text) {
                index = i;
                break;
            }
        }
        if (index !== null) {
            this.el.selectedIndex = index;
        }
    };
    SelectEditor.prototype.getValue = function () {
        var elm = this.el.options[this.el.selectedIndex];
        return {
            value: elm.value,
            text: elm.innerText
        };
    };
    SelectEditor.prototype.clear = function () {
        this.setDefault();
    };
    SelectEditor = __decorate([
        views_1.events({
            'change': 'triggerChange'
        }), 
        __metadata('design:paramtypes', [Object])
    ], SelectEditor);
    return SelectEditor;
})(editor_1.Editor);
exports.SelectEditor = SelectEditor;
