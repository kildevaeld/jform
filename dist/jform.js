(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("views"));
	else if(typeof define === 'function' && define.amd)
		define(["views"], factory);
	else if(typeof exports === 'object')
		exports["jform"] = factory(require("views"));
	else
		root["jform"] = factory(root["views"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/views/views.d.ts" />
	//// <reference path="../typings/es6-promise/es6-promise.d.ts" />
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var Form_1 = __webpack_require__(1);
	var ed = __webpack_require__(3);
	var validator_1 = __webpack_require__(6);
	__export(__webpack_require__(1));
	function create(elm, options) {
	    if (options === void 0) { options = {}; }
	    if (typeof elm === 'string') {
	        var e = document.querySelector(elm);
	        if (!e)
	            return null;
	        options.el = e;
	    }
	    else {
	        options = elm;
	    }
	    return new Form_1.Form(options);
	}
	exports.create = create;
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var views_1 = __webpack_require__(2);
	var editors = __webpack_require__(3);
	var Types_1 = __webpack_require__(4);
	var validator_1 = __webpack_require__(6);
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	function renderMessage(view, msg) {
	    if (!msg)
	        return null;
	    return msg.replace(/\{{name\}}/, view.name);
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
	    Form.prototype.validate = function () {
	        var _this = this;
	        function errorToPromise(err) {
	            if (err instanceof Error) {
	                return Promise.reject(err);
	            }
	            else if (views_1.utils.isPromise(err)) {
	                return err;
	            }
	            return Promise.resolve(null);
	        }
	        var editors = views_1.utils.values(this.editors);
	        var self = this;
	        return asyncEach(editors, function (editor) {
	            var e = errorToPromise(editor.validate());
	            var promises = [];
	            if (e)
	                promises.push(e);
	            if (_this._validations[editor.name]) {
	                var value = editor.getValue();
	                var p = _this._validations[editor.name].map(function (v) {
	                    return errorToPromise(_this._validator.validate(editor.el, value, v));
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var views_1 = __webpack_require__(2);
	var Types_1 = __webpack_require__(4);
	var list_1 = __webpack_require__(5);
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


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	    return FormEditorValidationError;
	})(FormError);
	exports.FormEditorValidationError = FormEditorValidationError;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var views_1 = __webpack_require__(2);
	var Types_1 = __webpack_require__(4);
	var Template = "\n<select></select>\n<ul class=\"selected-list\"></ul>\n";
	var SelectView = views_1.CollectionView.extend({
	    tagName: 'select',
	    events: {
	        'change': function (e) {
	            var selected = this.el.options[this.el.selectedIndex], cid = selected.getAttribute('cid'), child = views_1.utils.find(this.children, function (item) {
	                return item.cid === cid;
	            });
	            if (child == null) {
	                throw new Types_1.FormError("could not find view for option " + cid);
	            }
	            this.trigger('select', child.model);
	        }
	    },
	    childView: views_1.DataView.extend({
	        tagName: 'option',
	        template: function (data) {
	            this.el.setAttribute('value', data.value);
	            this.el.setAttribute('cid', this.cid);
	            return data.name;
	        }
	    }, {})
	}, {});
	var ListEditorModel = (function (_super) {
	    __extends(ListEditorModel, _super);
	    function ListEditorModel() {
	        _super.apply(this, arguments);
	        this.idAttribute = 'value';
	    }
	    return ListEditorModel;
	})(views_1.Model);
	exports.ListEditorModel = ListEditorModel;
	var ListEditor = (function (_super) {
	    __extends(ListEditor, _super);
	    function ListEditor(options) {
	        var _this = this;
	        if (options.items) {
	            options.collection = new views_1.Collection(options.items, { model: ListEditorModel });
	        }
	        this._name = options.name;
	        this._values = new views_1.Collection(options.values || []);
	        this._selectView = new SelectView({
	            collection: options.collection || new views_1.Collection([])
	        });
	        this._listView = new views_1.CollectionView({
	            tagName: 'ul',
	            collection: this._values,
	            childViewOptions: {
	                triggers: {
	                    'click': 'click'
	                },
	                tagName: 'li',
	                template: function (data) {
	                    return data.name;
	                }
	            }
	        });
	        this.listenTo(this._listView, 'childview:click', function (_a) {
	            var model = _a.model;
	            this._values.remove(model);
	        });
	        this.listenTo(this._selectView, 'select', function (model) {
	            _this._values.add(model.clone());
	        });
	        if (this.name == null)
	            throw new Types_1.FormError('name property is required');
	        _super.call(this, options);
	    }
	    Object.defineProperty(ListEditor.prototype, "name", {
	        get: function () { return this._name; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ListEditor.prototype, "val", {
	        get: function () {
	            return this.getValue();
	        },
	        set: function (value) {
	            this.setValue(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ListEditor.prototype.setValue = function (values) {
	        this._values.reset(values);
	    };
	    ListEditor.prototype.getValue = function () {
	        return this._values.toJSON();
	    };
	    ListEditor.prototype.clear = function () {
	        this._values.reset([]);
	    };
	    ListEditor.prototype.validate = function () {
	        return null;
	    };
	    ListEditor.prototype.render = function () {
	        this.el.appendChild(this._selectView.render().el);
	        this.el.appendChild(this._listView.render().el);
	        return this;
	    };
	    ListEditor.prototype.destroy = function () {
	        this._selectView.destroy();
	        this._listView.destroy();
	        _super.prototype.destroy.call(this);
	    };
	    return ListEditor;
	})(views_1.View);
	exports.ListEditor = ListEditor;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/views/views.d.ts" />
	var types_1 = __webpack_require__(7);
	var views_1 = __webpack_require__(2);
	function errorToPromise(err) {
	    if (err instanceof Error) {
	        return Promise.reject(err);
	    }
	    else if (views_1.utils.isPromise(err)) {
	        return err;
	    }
	    return null;
	}
	var Validator = (function () {
	    function Validator() {
	    }
	    Validator.prototype.validate = function (el, value, validate) {
	        if (validate.name === 'required') {
	            return value == null ? Promise.reject(new types_1.FormValidationError('required', value)) : null;
	        }
	        if (Validator.validators[validate.name]) {
	            var e = Validator.validators[validate.name](el, value);
	            return errorToPromise(e);
	        }
	        return null;
	    };
	    Validator.validators = {};
	    Validator.messages = {};
	    return Validator;
	})();
	exports.Validator = Validator;


/***/ },
/* 7 */
/***/ function(module, exports) {

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
	    return FormEditorValidationError;
	})(FormError);
	exports.FormEditorValidationError = FormEditorValidationError;


/***/ }
/******/ ])
});
;