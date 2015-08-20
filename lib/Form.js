var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var views_1 = require('views');
var editors = require('./editors/index');
var Types_1 = require('./Types');
var validator_1 = require('./validator');
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
function renderMessage(view, msg) {
    if (!msg)
        return null;
    return msg.replace(/\{{name\}}/, view.label || view.name);
}
function asyncEach(array, iterator, context, accumulate) {
    if (accumulate === void 0) { accumulate = false; }
    return new Promise(function (resolve, reject) {
        var i = 0, len = array.length, errors = [];
        function next(err, result) {
            if (err && !accumulate)
                return reject(err);
            if (err)
                errors.push(err);
            if (i === len)
                return errors.length ? reject(flatten(errors)) : resolve();
            iterator(array[i++]).then(function (r) { next(null, r); }, next);
        }
        next(null);
    });
}
function all(array) {
    var errors = [], len = array.length, results = Array(len), i = 0, count = len - 0;
    if (len === 0)
        return Promise.resolve();
    return new Promise(function (resolve, reject) {
        function done(promise, index) {
            promise.then(function (result) {
                results[index] = result;
                //console.log('count',count)
                if ((--count) === 0)
                    return errors.length ? reject(flatten(errors)) : resolve(results.length ? results : null);
            }, function (err) {
                errors.push(err);
                if ((--count) === 0)
                    reject(flatten(errors));
            });
        }
        for (i; i < len; i++) {
            done(array[i], i);
        }
    });
}
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(options) {
        if (options != null) {
            options = views_1.utils.extend({}, Form.defaults, options);
        }
        _super.call(this, options);
        this.strict = options.strict || this.strict || false;
        this._validator = options.validator || new validator_1.Validator();
        this._validations = {};
        this._editors = this.getElements(this.el, options);
        for (var k in this._editors) {
            this._editors[k].render();
        }
    }
    Object.defineProperty(Form, "defaults", {
        get: function () { return { selector: '[name]', attribute: 'form-editor' }; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "val", {
        get: function () {
            return this.getValue();
        },
        set: function (values) {
            this.setValue(values);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "editors", {
        get: function () {
            return views_1.utils.extend({}, this._editors);
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.setValue = function (values) {
        this.trigger("before:setvalue");
        for (var key in values) {
            if (this.editors[key]) {
                this.trigger('before:setvalue:' + key);
                try {
                    this.editors[key].setValue(values[key]);
                }
                catch (e) {
                }
                this.trigger('setvalue:' + key);
            }
            else {
                var msg = "form does not have an editor for: '" + key + "'";
                if (this.strict)
                    throw new Types_1.FormError(msg);
                console.warn(msg);
            }
        }
        this.trigger('setvalue');
        return this;
    };
    Form.prototype.getValue = function () {
        var values = {};
        for (var key in this.editors) {
            var e = this.editors[key];
            values[key] = e.getValue();
        }
        return values;
    };
    Form.prototype.clear = function () {
        this.triggerMethod('before:clear');
        for (var key in this.editors) {
            this.editors[key].clear();
        }
        this.triggerMethod('clear');
    };
    Form.prototype.validateEditor = function (name) {
        var _this = this;
        var editor = this.editors[name];
        if (!editor)
            return Promise.reject(new Types_1.FormError("no editor named " + name));
        var e = validator_1.errorToPromise(editor.validate());
        var promises = [];
        if (e)
            promises.push(e);
        if (this._validations[editor.name]) {
            var value = editor.getValue();
            var p = this._validations[editor.name].map(function (v) {
                return validator_1.errorToPromise(_this._validator.validate(editor.el, value, v));
            });
            promises = promises.concat(p);
        }
        return all(promises).catch(function (err) {
            throw new Types_1.FormEditorValidationError(editor.name, err);
        });
    };
    Form.prototype.validate = function () {
        var _this = this;
        var editors = views_1.utils.values(this.editors);
        var self = this;
        return asyncEach(editors, function (editor) {
            var e = validator_1.errorToPromise(editor.validate());
            var promises = [];
            if (e)
                promises.push(e);
            if (_this._validations[editor.name]) {
                var value = editor.getValue();
                var p = _this._validations[editor.name].map(function (v) {
                    return validator_1.errorToPromise(_this._validator.validate(editor.el, value, v));
                });
                promises = promises.concat(p);
            }
            return views_1.utils.objectToPromise((_a = {}, _a[editor.name] = all(promises), _a)).catch(function (err) {
                throw new Types_1.FormEditorValidationError(editor.name, err);
            });
            var _a;
        }, this, true).catch(function (errors) {
            var map = {};
            errors.forEach(function (err) {
                map[err.name] = err.errors.map(function (e) {
                    return { message: renderMessage(_this.editors[err.name], e.message || validator_1.Validator.messages[e.name]), value: e.value, name: e.name };
                });
            });
            return map;
        });
    };
    Form.prototype.getElements = function (formEl, options) {
        var elms = formEl.querySelectorAll(options.selector);
        var i, elm, editorName, required;
        var output = {};
        for (i = 0; i < elms.length; i++) {
            elm = elms[i];
            editorName = elm.getAttribute(options.attribute);
            var name_1 = elm.getAttribute('name');
            editorName = editorName || this._getType(elm);
            var Editor = editors.get(editorName);
            if (Editor == null) {
                var msg = "editor not found: '" + editorName + "' for '" + name_1 + "'";
                if (this.strict)
                    throw new Types_1.FormError(msg);
                console.warn(msg);
                continue;
            }
            required = elm.getAttribute('required');
            var opts = views_1.utils.result(options, name_1, undefined, [this, options]) || {};
            opts = views_1.utils.extend(opts, options.editors[name_1] || {});
            opts.name = name_1;
            opts.el = elm;
            if (required != null)
                (opts.validations || (opts.validations = [])).push({
                    name: 'required'
                });
            var editor = new Editor(opts);
            if (opts.validations && this._validator) {
                if (this._validator.bootstrap) {
                    this._validator.bootstrap(elm);
                }
                this._validations[name_1] = opts.validations;
            }
            this.listenTo(editor, 'change', this._onEditorChange);
            /*if (output[name]) {
              let editors = Array.isArray(output[name]) ? output[name] : (output[name] = [output[name]])
            } else {
      
            }*/
            output[name_1] = editor;
        }
        return output;
    };
    Form.prototype._onEditorChange = function (editor) {
        this.trigger('change', editor);
    };
    Form.prototype._onEditorInvalid = function (editor, error) {
        this.trigger('invalid', editor, error);
    };
    Form.prototype._getType = function (element) {
        if (element.nodeName === 'INPUT') {
            return element.type;
        }
        else {
            return element.nodeName.toLowerCase();
        }
    };
    Form.prototype.destroy = function () {
        for (var key in this._editors) {
            this._editors[key].destroy();
        }
        _super.prototype.destroy.call(this);
    };
    return Form;
})(views_1.View);
exports.Form = Form;
