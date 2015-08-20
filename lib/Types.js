var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FormError = (function () {
    function FormError(message, code) {
        this.name = "FormError";
        this.message = message;
    }
    FormError.prototype.toString = function () {
        return this.name + ": " + this.message;
    };
    FormError.prototype.toJSON = function () {
        return {
            name: this.name,
            message: this.message,
            code: this.code
        };
    };
    return FormError;
})();
exports.FormError = FormError;
var FormValidationError = (function (_super) {
    __extends(FormValidationError, _super);
    function FormValidationError(name, value, message) {
        _super.call(this, message);
        this.name = "FormValidationError";
        this.name = name;
        this.value = value;
    }
    return FormValidationError;
})(FormError);
exports.FormValidationError = FormValidationError;
var FormEditorValidationError = (function (_super) {
    __extends(FormEditorValidationError, _super);
    function FormEditorValidationError(name, error) {
        _super.call(this, null);
        this.name = name;
        this.errors = error;
    }
    FormEditorValidationError.prototype.toJSON = function () {
        return {
            name: this.name,
            errors: this.errors.map(function (e) {
                return e.message;
            })
        };
    };
    return FormEditorValidationError;
})(FormError);
exports.FormEditorValidationError = FormEditorValidationError;
