(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["jform"] = factory();
	else
		root["jform"] = factory();
})(this, function() {
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

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/// <reference path="../node_modules/views/views.d.ts" />
	var form_1 = __webpack_require__(20);
	var ed = __webpack_require__(21);
	var validator_1 = __webpack_require__(27);
	var editor_1 = __webpack_require__(1);
	var types_1 = __webpack_require__(24);
	__export(__webpack_require__(20));
	function create(elm, options) {
	    if (options === void 0) { options = {}; }
	    if (typeof elm === 'string') {
	        var e = document.querySelector(elm);
	        if (!e)
	            return null;
	        options.el = e;
	    }
	    else if (elm instanceof HTMLElement) {
	        options.el = elm;
	    }
	    else {
	        options = elm;
	    }
	    return new form_1.Form(options);
	}
	exports.create = create;
	function createError(msg) {
	    return new ed.EditorError(msg);
	}
	exports.createError = createError;
	var editors;
	(function (editors) {
	    editors.ValidationError = types_1.FormValidationError;
	    function extend(name, prototype, staticProps) {
	        var editor = editor_1.Editor.extend(prototype, staticProps);
	        editors.set(name, editor);
	        return editor;
	    }
	    editors.extend = extend;
	    function get(name) {
	        return ed.get(name);
	    }
	    editors.get = get;
	    function set(name, editor) {
	        ed.set(editor, name);
	    }
	    editors.set = set;
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
	var Types_1 = __webpack_require__(19);
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
	exports.EditorError = EditorError;
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
	__export(__webpack_require__(5));
	__export(__webpack_require__(4));
	__export(__webpack_require__(9));
	__export(__webpack_require__(8));
	__export(__webpack_require__(7));
	__export(__webpack_require__(6));
	__export(__webpack_require__(12));
	__export(__webpack_require__(11));
	__export(__webpack_require__(3));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	__export(__webpack_require__(16));
	__export(__webpack_require__(17));
	__export(__webpack_require__(18));
	__export(__webpack_require__(10));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	/*global View, RegionManager, Region*/
	var templateview_1 = __webpack_require__(4);
	var region_manager_1 = __webpack_require__(11);
	var utils_1 = __webpack_require__(9);
	var region_1 = __webpack_require__(12);
	var LayoutView = (function (_super) {
	    __extends(LayoutView, _super);
	    /**
	     * LayoutView
	     * @param {Object} options options
	     * @constructor LayoutView
	     * @extends TemplateView
	     */
	    function LayoutView(options) {
	        // Set region manager
	        this._regionManager = new region_manager_1.RegionManager();
	        utils_1.utils.proxy(this, this._regionManager, ['removeRegion', 'removeRegions']);
	        this._regions = this.getOption('regions', options || {});
	        _super.call(this, options);
	    }
	    Object.defineProperty(LayoutView.prototype, "regions", {
	        get: function () {
	            return this._regionManager.regions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LayoutView.prototype.render = function (options) {
	        this.triggerMethod('before:render');
	        _super.prototype.render.call(this, { silent: true });
	        this.addRegion(this._regions || {});
	        this.triggerMethod('render');
	        return this;
	    };
	    /**
	     * Add one or more regions to the view
	     * @param {string|RegionMap} name
	     * @param {Object|string|HTMLElement} def
	     */
	    LayoutView.prototype.addRegion = function (name, def) {
	        var regions = {};
	        if (typeof name === 'string') {
	            if (def == null)
	                throw new Error('add region');
	            regions[name] = def;
	        }
	        else {
	            regions = name;
	        }
	        for (var k in regions) {
	            var region = region_1.Region.buildRegion(regions[k], this.el);
	            this._regionManager.addRegion(k, region);
	        }
	    };
	    /**
	     * Delete one or more regions from the the layoutview
	     * @param {string|Array<string>} name
	     */
	    LayoutView.prototype.removeRegion = function (name) {
	        this._regionManager.removeRegion(name);
	    };
	    LayoutView.prototype.destroy = function () {
	        _super.prototype.destroy.call(this);
	        this._regionManager.destroy();
	    };
	    return LayoutView;
	})(templateview_1.TemplateView);
	exports.LayoutView = LayoutView;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var views = __webpack_require__(5);
	var debug_1 = __webpack_require__(10);
	var debug = debug_1.logger('templateview');
	var TemplateView = (function (_super) {
	    __extends(TemplateView, _super);
	    /** TemplateView
	     * @param {TemplateViewOptions} options
	     * @extends View
	     */
	    function TemplateView(options) {
	        if (options && options.template) {
	            this.template = options.template;
	        }
	        _super.call(this, options);
	    }
	    TemplateView.prototype.getTemplateData = function () {
	        return {};
	    };
	    TemplateView.prototype.render = function (options) {
	        if (options === void 0) { options = {}; }
	        if (!options.silent)
	            this.triggerMethod('before:render');
	        this.renderTemplate(this.getTemplateData());
	        if (!options.silent)
	            this.triggerMethod('render');
	        return this;
	    };
	    TemplateView.prototype.renderTemplate = function (data) {
	        var template = this.getOption('template');
	        if (typeof template === 'function') {
	            debug('%s render template function', this.cid);
	            template = template.call(this, data);
	        }
	        if (template && typeof template === 'string') {
	            debug('%s attach template: %s', this.cid, template);
	            this.attachTemplate(template);
	        }
	    };
	    TemplateView.prototype.attachTemplate = function (template) {
	        this.undelegateEvents();
	        this.el.innerHTML = template;
	        this.delegateEvents();
	    };
	    return TemplateView;
	})(views.View);
	exports.TemplateView = TemplateView;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var base = __webpack_require__(6);
	var utils_1 = __webpack_require__(9);
	var debug_1 = __webpack_require__(10);
	var kUIRegExp = /@ui.([a-zA-Z_\-\$#]+)/i;
	var debug = debug_1.logger('view');
	function normalizeUIKeys(obj, uimap) {
	    /*jshint -W030 */
	    var o = {}, k, v, ms, sel, ui;
	    for (k in obj) {
	        v = obj[k];
	        if ((ms = kUIRegExp.exec(k)) !== null) {
	            ui = ms[1], sel = uimap[ui];
	            if (sel != null) {
	                k = k.replace(ms[0], sel);
	            }
	        }
	        o[k] = v;
	    }
	    return o;
	}
	exports.normalizeUIKeys = normalizeUIKeys;
	var View = (function (_super) {
	    __extends(View, _super);
	    /**
	     * View
	     * @param {ViewOptions} options
	     * @extends BaseView
	     */
	    function View(options) {
	        this._options = options;
	        _super.call(this, options);
	    }
	    View.prototype.delegateEvents = function (events) {
	        this._bindUIElements();
	        events = events || this.events;
	        events = normalizeUIKeys(events, this._ui);
	        var triggers = this._configureTriggers();
	        events = utils_1.utils.extend({}, events, triggers);
	        debug('%s delegate events %j', this.cid, events);
	        _super.prototype.delegateEvents.call(this, events);
	        return this;
	    };
	    View.prototype.undelegateEvents = function () {
	        this._unbindUIElements();
	        debug('%s undelegate events', this.cid);
	        _super.prototype.undelegateEvents.call(this);
	        return this;
	    };
	    /**
	     * Bind ui elements
	     * @private
	     */
	    View.prototype._bindUIElements = function () {
	        var _this = this;
	        var ui = this.getOption('ui'); //this.options.ui||this.ui
	        if (!ui)
	            return;
	        if (!this._ui) {
	            this._ui = ui;
	        }
	        ui = utils_1.utils.result(this, '_ui');
	        this.ui = {};
	        Object.keys(ui).forEach(function (k) {
	            var elm = _this.$(ui[k]);
	            if (elm && elm.length) {
	                // unwrap if it's a nodelist.
	                if (elm instanceof NodeList) {
	                    elm = elm[0];
	                }
	                debug('added ui element %s %s', k, ui[k]);
	                _this.ui[k] = elm;
	            }
	            else {
	                console.warn('view ', _this.cid, ': ui element not found ', k, ui[k]);
	            }
	        });
	    };
	    /**
	     * Unbind ui elements
	     * @private
	     */
	    View.prototype._unbindUIElements = function () {
	    };
	    /**
	     * Configure triggers
	     * @return {Object} events object
	     * @private
	     */
	    View.prototype._configureTriggers = function () {
	        var triggers = this.getOption('triggers') || {};
	        if (typeof triggers === 'function') {
	            triggers = triggers.call(this);
	        }
	        // Allow `triggers` to be configured as a function
	        triggers = normalizeUIKeys(triggers, this._ui);
	        // Configure the triggers, prevent default
	        // action and stop propagation of DOM events
	        var events = {}, val, key;
	        for (key in triggers) {
	            val = triggers[key];
	            debug('added trigger %s %s', key, val);
	            events[key] = this._buildViewTrigger(val);
	        }
	        return events;
	    };
	    /**
	     * builder trigger function
	     * @param  {Object|String} triggerDef Trigger definition
	     * @return {Function}
	     * @private
	     */
	    View.prototype._buildViewTrigger = function (triggerDef) {
	        if (typeof triggerDef === 'string')
	            triggerDef = { event: triggerDef };
	        var options = utils_1.utils.extend({
	            preventDefault: true,
	            stopPropagation: true
	        }, triggerDef);
	        return function (e) {
	            if (e) {
	                if (e.preventDefault && options.preventDefault) {
	                    e.preventDefault();
	                }
	                if (e.stopPropagation && options.stopPropagation) {
	                    e.stopPropagation();
	                }
	            }
	            this.triggerMethod(options.event, {
	                view: this,
	                model: this.model,
	                collection: this.collection
	            });
	        };
	    };
	    return View;
	})(base.BaseView);
	exports.View = View;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var object_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(9);
	var debug_1 = __webpack_require__(10);
	var debug = debug_1.logger('baseview');
	var paddedLt = /^\s*</;
	var unbubblebles = 'focus blur change'.split(' ');
	var viewOptions = ['el', 'id', 'attributes', 'className', 'tagName', 'events'];
	var BaseView = (function (_super) {
	    __extends(BaseView, _super);
	    /**
	     * BaseView
	     * @param {BaseViewOptions} options
	     * @extends BaseObject
	     */
	    function BaseView(options) {
	        if (options === void 0) { options = {}; }
	        this._cid = utils_1.utils.uniqueId('view');
	        utils_1.utils.extend(this, utils_1.utils.pick(options, viewOptions));
	        this._domEvents = [];
	        if (this.el == null) {
	            this._ensureElement();
	        }
	        else {
	            this.delegateEvents();
	        }
	        _super.call(this, options);
	    }
	    BaseView.find = function (selector, context) {
	        return context.querySelectorAll(selector);
	    };
	    Object.defineProperty(BaseView.prototype, "cid", {
	        get: function () {
	            return this._cid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Delegate events
	     * @param {EventsMap} events
	     */
	    BaseView.prototype.delegateEvents = function (events) {
	        var _this = this;
	        if (!(events || (events = utils_1.utils.result(this, 'events'))))
	            return this;
	        this.undelegateEvents();
	        var dels = [];
	        for (var key in events) {
	            var method = events[key];
	            if (typeof method !== 'function')
	                method = this[method];
	            var match = key.match(/^(\S+)\s*(.*)$/);
	            // Set delegates immediately and defer event on this.el
	            var boundFn = utils_1.utils.bind(method, this);
	            if (match[2]) {
	                this.delegate(match[1], match[2], boundFn);
	            }
	            else {
	                dels.push([match[1], boundFn]);
	            }
	        }
	        dels.forEach(function (d) { _this.delegate(d[0], d[1]); });
	        return this;
	    };
	    /**
	     * Undelegate events
	     */
	    BaseView.prototype.undelegateEvents = function () {
	        if (this.el) {
	            for (var i = 0, len = this._domEvents.length; i < len; i++) {
	                var item = this._domEvents[i];
	                utils_1.html.removeEventListener(this.el, item.eventName, item.handler);
	            }
	            this._domEvents.length = 0;
	        }
	        return this;
	    };
	    BaseView.prototype.delegate = function (eventName, selector, listener) {
	        if (typeof selector === 'function') {
	            listener = selector;
	            selector = null;
	        }
	        var root = this.el;
	        var handler = selector ? function (e) {
	            var node = e.target || e.srcElement;
	            // Already handled
	            if (e.delegateTarget)
	                return;
	            for (; node && node != root; node = node.parentNode) {
	                if (utils_1.html.matches(node, selector)) {
	                    e.delegateTarget = node;
	                    listener(e);
	                }
	            }
	        } : function (e) {
	            if (e.delegateTarget)
	                return;
	            listener(e);
	        };
	        /*jshint bitwise: false*/
	        var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
	        debug('%s delegate event %s ', this.cid, eventName);
	        utils_1.html.addEventListener(this.el, eventName, handler, useCap);
	        this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
	        return handler;
	    };
	    BaseView.prototype.undelegate = function (eventName, selector, listener) {
	        if (typeof selector === 'function') {
	            listener = selector;
	            selector = null;
	        }
	        if (this.el) {
	            var handlers = this._domEvents.slice();
	            for (var i = 0, len = handlers.length; i < len; i++) {
	                var item = handlers[i];
	                var match = item.eventName === eventName &&
	                    (listener ? item.listener === listener : true) &&
	                    (selector ? item.selector === selector : true);
	                if (!match)
	                    continue;
	                utils_1.html.removeEventListener(this.el, item.eventName, item.handler);
	                this._domEvents.splice(utils_1.utils.indexOf(handlers, item), 1);
	            }
	        }
	        return this;
	    };
	    BaseView.prototype.render = function (options) {
	        return this;
	    };
	    /**
	     * Append the view to a HTMLElement
	     * @param {HTMLElement|string} elm A html element or a selector string
	     * @return {this} for chaining
	     */
	    BaseView.prototype.appendTo = function (elm) {
	        if (elm instanceof HTMLElement) {
	            elm.appendChild(this.el);
	        }
	        else {
	            var el = document.querySelector(elm);
	            el ? el.appendChild(this.el) : void 0;
	        }
	        return this;
	    };
	    /**
	     * Append a element the view
	     * @param {HTMLElement} elm
	     * @param {String} toSelector
	     * @return {this} for chaining
	     */
	    BaseView.prototype.append = function (elm, toSelector) {
	        if (toSelector != null) {
	            var ret = this.$(toSelector);
	            if (ret instanceof NodeList && ret.length > 0) {
	                ret[0].appendChild(elm);
	            }
	            else if (ret instanceof HTMLElement) {
	                ret.appendChild(elm);
	            }
	        }
	        else {
	            this.el.appendChild(elm);
	        }
	        return this;
	    };
	    /**
	     * Convience for view.el.querySelectorAll()
	     * @param {string|HTMLElement} selector
	     */
	    BaseView.prototype.$ = function (selector) {
	        if (selector instanceof HTMLElement) {
	            return selector;
	        }
	        else {
	            return BaseView.find(selector, this.el);
	        }
	    };
	    BaseView.prototype.setElement = function (elm) {
	        this.undelegateEvents();
	        this._setElement(elm);
	        this.delegateEvents();
	    };
	    BaseView.prototype.remove = function () {
	        this._removeElement();
	        return this;
	    };
	    BaseView.prototype._createElement = function (tagName) {
	        return document.createElement(tagName);
	    };
	    BaseView.prototype._ensureElement = function () {
	        if (!this.el) {
	            var attrs = utils_1.utils.extend({}, utils_1.utils.result(this, 'attributes'));
	            if (this.id)
	                attrs.id = utils_1.utils.result(this, 'id');
	            if (this.className)
	                attrs['class'] = utils_1.utils.result(this, 'className');
	            debug('%s created element: %s', this.cid, utils_1.utils.result(this, 'tagName') || 'div');
	            this.setElement(this._createElement(utils_1.utils.result(this, 'tagName') || 'div'));
	            this._setAttributes(attrs);
	        }
	        else {
	            this.setElement(utils_1.utils.result(this, 'el'));
	        }
	    };
	    BaseView.prototype._removeElement = function () {
	        this.undelegateEvents();
	        if (this.el.parentNode)
	            this.el.parentNode.removeChild(this.el);
	    };
	    BaseView.prototype._setElement = function (element) {
	        if (typeof element === 'string') {
	            if (paddedLt.test(element)) {
	                var el = document.createElement('div');
	                el.innerHTML = element;
	                this.el = el.firstElementChild;
	            }
	            else {
	                this.el = document.querySelector(element);
	            }
	        }
	        else {
	            this.el = element;
	        }
	    };
	    BaseView.prototype._setAttributes = function (attrs) {
	        for (var attr in attrs) {
	            attr in this.el ? this.el[attr] = attrs[attr] : this.el.setAttribute(attr, attrs[attr]);
	        }
	    };
	    return BaseView;
	})(object_1.BaseObject);
	exports.BaseView = BaseView;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var events_1 = __webpack_require__(8);
	var utils_1 = __webpack_require__(9);
	var debug_1 = __webpack_require__(10);
	var debug = debug_1.logger('object');
	/** Base object */
	var BaseObject = (function (_super) {
	    __extends(BaseObject, _super);
	    /**
	     * Object
	     * @extends EventEmitter
	     */
	    function BaseObject(args) {
	        _super.call(this);
	        this._isDestroyed = false;
	        if (typeof this.initialize === 'function') {
	            utils_1.utils.call(this.initialize, this, utils_1.utils.slice(arguments));
	        }
	    }
	    Object.defineProperty(BaseObject.prototype, "isDestroyed", {
	        /**
	         * Whether the object is "destroyed" or not
	         * @type boolean
	         */
	        get: function () {
	            return this._isDestroyed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BaseObject.prototype.destroy = function () {
	        if (this.isDestroyed)
	            return this;
	        this.triggerMethod('before:destroy');
	        this.stopListening();
	        this.off();
	        this._isDestroyed = true;
	        this.triggerMethod('destroy');
	        debug("%s destroy", this);
	        if (typeof Object.freeze) {
	            Object.freeze(this);
	        }
	        return this;
	    };
	    BaseObject.prototype.triggerMethod = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        utils_1.utils.triggerMethodOn(this, eventName, args);
	        return this;
	    };
	    BaseObject.prototype.getOption = function (prop) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        if (this.options) {
	            args.push(this.options);
	        }
	        if (this._options) {
	            args.push(this._options);
	        }
	        args.push(this);
	        return utils_1.utils.getOption(prop, args);
	    };
	    BaseObject.extend = utils_1.extend;
	    return BaseObject;
	})(events_1.EventEmitter);
	exports.BaseObject = BaseObject;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var idCounter = 0;
	function getID() {
	    return "" + (++idCounter);
	}
	var EventEmitter = (function () {
	    function EventEmitter() {
	    }
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        get: function () {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        //let events = this._listeners[event]||(this._listeners[event]=[])
	        events.push({
	            name: event,
	            once: once,
	            handler: fn,
	            ctx: ctx || this
	        });
	        return this;
	    };
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    EventEmitter.prototype.off = function (eventName, fn) {
	        if (eventName == null) {
	            this._listeners = {};
	        }
	        else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null) {
	                this._listeners[eventName] = [];
	            }
	            else {
	                for (var i = 0; i < events.length; i++) {
	                    var event_1 = events[i];
	                    if (events[i].handler == fn) {
	                        this._listeners[eventName].splice(i, 1);
	                    }
	                }
	            }
	        }
	    };
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var events = (this._listeners || (this._listeners = {}))[eventName] || (this._listeners[eventName] = []);
	        events = events.concat(this._listeners['all'] || []);
	        if (EventEmitter.debugCallback)
	            EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args);
	        var event, a, len = events.length, index, i;
	        for (i = 0; i < events.length; i++) {
	            event = events[i];
	            a = args;
	            if (event.name == 'all') {
	                a = [eventName].concat(args);
	            }
	            event.handler.apply(event.ctx, a);
	            if (event.once === true) {
	                index = this._listeners[event.name].indexOf(event);
	                this._listeners[event.name].splice(index, 1);
	            }
	        }
	        return this;
	    };
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var remove = !event && !callback;
	        if (!callback && typeof event === 'object')
	            callback = this;
	        if (obj)
	            (listeningTo = {})[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length) {
	                delete this._listeningTo[id];
	            }
	        }
	        return this;
	    };
	    return EventEmitter;
	})();
	exports.EventEmitter = EventEmitter;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var ElementProto = (typeof Element !== 'undefined' && Element.prototype) || {};
	var matchesSelector = ElementProto.matches ||
	    ElementProto.webkitMatchesSelector ||
	    ElementProto.mozMatchesSelector ||
	    ElementProto.msMatchesSelector ||
	    ElementProto.oMatchesSelector || function (selector) {
	    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
	    return !!~utils.indexOf(nodeList, this);
	};
	var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
	    return this.attachEvent('on' + eventName, listener);
	};
	var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
	    return this.detachEvent('on' + eventName, listener);
	};
	var transitionEndEvent = (function transitionEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitTransition': 'webkitTransitionEnd',
	        'MozTransition': 'transitionend',
	        'OTransition': 'oTransitionEnd otransitionend',
	        'transition': 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null; // explicit for ie8 (  ._.)
	});
	var animationEndEvent = (function animationEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitAnimation': 'webkitAnimationEnd',
	        'MozAnimation': 'animationend',
	        'OTransition': 'oAnimationEnd oanimationend',
	        'animation': 'animationend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null; // explicit for ie8 (  ._.)
	});
	function extend(protoProps, staticProps) {
	    var parent = this;
	    var child;
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent's constructor.
	    if (protoProps && utils.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    }
	    else {
	        child = function () { return parent.apply(this, arguments); };
	    }
	    // Add static properties to the constructor function, if supplied.
	    utils.extend(child, parent, staticProps);
	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function.
	    var Surrogate = function () { this.constructor = child; };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;
	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps)
	        utils.extend(child.prototype, protoProps);
	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.extend = extend;
	var html;
	(function (html) {
	    function matches(elm, selector) {
	        return matchesSelector.call(elm, selector);
	    }
	    html.matches = matches;
	    function addEventListener(elm, eventName, listener, useCap) {
	        if (useCap === void 0) { useCap = false; }
	        elementAddEventListener.call(elm, eventName, listener, useCap);
	    }
	    html.addEventListener = addEventListener;
	    function removeEventListener(elm, eventName, listener) {
	        elementRemoveEventListener.call(elm, eventName, listener);
	    }
	    html.removeEventListener = removeEventListener;
	    function addClass(elm, className) {
	        if (elm.classList)
	            elm.classList.add(className);
	        else {
	            elm.className = elm.className.split(' ').concat(className.split(' ')).join(' ');
	        }
	    }
	    html.addClass = addClass;
	    function removeClass(elm, className) {
	        if (elm.classList)
	            elm.classList.remove(className);
	        else {
	            elm.className = elm.className.split(' ').concat(className.split(' ')).join(' ');
	        }
	    }
	    html.removeClass = removeClass;
	    function selectionStart(elm) {
	        if ('selectionStart' in elm) {
	            // Standard-compliant browsers
	            return elm.selectionStart;
	        }
	        else if (document.selection) {
	            // IE
	            elm.focus();
	            var sel = document.selection.createRange();
	            var selLen = document.selection.createRange().text.length;
	            sel.moveStart('character', -elm.value.length);
	            return sel.text.length - selLen;
	        }
	    }
	    html.selectionStart = selectionStart;
	    var _events = {
	        animationEnd: null,
	        transitionEnd: null
	    };
	    function transitionEnd(elm, fn, ctx, duration) {
	        var event = _events.transitionEnd || (_events.transitionEnd = transitionEndEvent());
	        var callback = function (e) {
	            removeEventListener(elm, event, callback);
	            fn.call(ctx, e);
	        };
	        addEventListener(elm, event, callback);
	    }
	    html.transitionEnd = transitionEnd;
	    function animationEnd(elm, fn, ctx, duration) {
	        var event = _events.animationEnd || (_events.animationEnd = animationEndEvent());
	        var callback = function (e) {
	            removeEventListener(elm, event, callback);
	            fn.call(ctx, e);
	        };
	        addEventListener(elm, event, callback);
	    }
	    html.animationEnd = animationEnd;
	})(html = exports.html || (exports.html = {}));
	var nativeBind = Function.prototype.bind;
	var noop = function () { };
	var idCounter = 0;
	/** @module utils */
	var utils;
	(function (utils) {
	    utils.Promise = global.Promise;
	    function camelcase(input) {
	        return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	            return group1.toUpperCase();
	        });
	    }
	    utils.camelcase = camelcase;
	    ;
	    /** Generate an unique id with an optional prefix
	     * @param {string} prefix
	     * @return {string}
	     */
	    function uniqueId(prefix) {
	        if (prefix === void 0) { prefix = ''; }
	        return prefix + (++idCounter);
	    }
	    utils.uniqueId = uniqueId;
	    function isObject(obj) {
	        return obj === Object(obj);
	    }
	    utils.isObject = isObject;
	    function extend(obj) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        if (!utils.isObject(obj))
	            return obj;
	        var o, k;
	        for (var _a = 0; _a < args.length; _a++) {
	            o = args[_a];
	            if (!utils.isObject(o))
	                continue;
	            for (k in o) {
	                if (utils.has(o, k))
	                    obj[k] = o[k];
	            }
	        }
	        return obj;
	    }
	    utils.extend = extend;
	    function pick(obj, props) {
	        var out = {}, prop;
	        for (var _i = 0; _i < props.length; _i++) {
	            prop = props[_i];
	            if (utils.has(obj, prop))
	                out[prop] = obj[prop];
	        }
	        return out;
	    }
	    utils.pick = pick;
	    function has(obj, prop) {
	        return Object.prototype.hasOwnProperty.call(obj, prop);
	    }
	    utils.has = has;
	    function indexOf(array, item) {
	        for (var i = 0, len = array.length; i < len; i++)
	            if (array[i] === item)
	                return i;
	        return -1;
	    }
	    utils.indexOf = indexOf;
	    function result(obj, prop, ctx, args) {
	        var ret = obj[prop];
	        return (typeof ret === 'function') ? utils.call(ret, ctx, args || []) : ret;
	    }
	    utils.result = result;
	    function values(obj) {
	        var output = [];
	        for (var k in obj)
	            if (utils.has(obj, k)) {
	                output.push(obj[k]);
	            }
	        return output;
	    }
	    utils.values = values;
	    function find(array, callback, ctx) {
	        var i, v;
	        for (i = 0; i < array.length; i++) {
	            v = array[i];
	            if (callback.call(ctx, v))
	                return v;
	        }
	        return null;
	    }
	    utils.find = find;
	    function proxy(from, to, fns) {
	        if (!Array.isArray(fns))
	            fns = [fns];
	        fns.forEach(function (fn) {
	            if (typeof to[fn] === 'function') {
	                from[fn] = utils.bind(to[fn], to);
	            }
	        });
	    }
	    utils.proxy = proxy;
	    function bind(method, context) {
	        var args = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            args[_i - 2] = arguments[_i];
	        }
	        if (typeof method !== 'function')
	            throw new Error('method not at function');
	        if (nativeBind != null)
	            return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	        args = args || [];
	        var fnoop = function () { };
	        var fBound = function () {
	            var ctx = this instanceof fnoop ? this : context;
	            return utils.call(method, ctx, args.concat(utils.slice(arguments)));
	        };
	        fnoop.prototype = this.prototype;
	        fBound.prototype = new fnoop();
	        return fBound;
	    }
	    utils.bind = bind;
	    function call(fn, ctx, args) {
	        if (args === void 0) { args = []; }
	        switch (args.length) {
	            case 0:
	                return fn.call(ctx);
	            case 1:
	                return fn.call(ctx, args[0]);
	            case 2:
	                return fn.call(ctx, args[0], args[1]);
	            case 3:
	                return fn.call(ctx, args[0], args[1], args[2]);
	            case 4:
	                return fn.call(ctx, args[0], args[1], args[2], args[3]);
	            case 5:
	                return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	            default:
	                return fn.apply(ctx, args);
	        }
	    }
	    utils.call = call;
	    function slice(array) {
	        return Array.prototype.slice.call(array);
	    }
	    utils.slice = slice;
	    function flatten(arr) {
	        return arr.reduce(function (flat, toFlatten) {
	            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	        }, []);
	    }
	    utils.flatten = flatten;
	    function equal(a, b) {
	        return eq(a, b, [], []);
	    }
	    utils.equal = equal;
	    function triggerMethodOn(obj, eventName, args) {
	        var ev = camelcase("on-" + eventName.replace(':', '-'));
	        if (obj[ev] && typeof obj[ev] === 'function') {
	            utils.call(obj[ev], obj, args);
	        }
	        if (typeof obj.trigger === 'function') {
	            args = [eventName].concat(args);
	            utils.call(obj.trigger, obj, args);
	        }
	    }
	    utils.triggerMethodOn = triggerMethodOn;
	    function getOption(option, objs) {
	        for (var _i = 0; _i < objs.length; _i++) {
	            var o = objs[_i];
	            if (isObject(o) && o[option])
	                return o[option];
	        }
	        return null;
	    }
	    utils.getOption = getOption;
	    function sortBy(obj, value, context) {
	        var iterator = typeof value === 'function' ? value : function (obj) { return obj[value]; };
	        return obj
	            .map(function (value, index, list) {
	            return {
	                value: value,
	                index: index,
	                criteria: iterator.call(context, value, index, list)
	            };
	        })
	            .sort(function (left, right) {
	            var a = left.criteria;
	            var b = right.criteria;
	            if (a !== b) {
	                if (a > b || a === void 0)
	                    return 1;
	                if (a < b || b === void 0)
	                    return -1;
	            }
	            return left.index - right.index;
	        })
	            .map(function (item) {
	            return item.value;
	        });
	    }
	    utils.sortBy = sortBy;
	    // Promises
	    function isPromise(obj) {
	        return obj && typeof obj.then === 'function';
	    }
	    utils.isPromise = isPromise;
	    function toPromise(obj) {
	        /* jshint validthis:true */
	        if (!obj) {
	            return obj;
	        }
	        if (isPromise(obj)) {
	            return obj;
	        }
	        if ("function" == typeof obj) {
	            return thunkToPromise.call(this, obj);
	        }
	        if (Array.isArray(obj)) {
	            return arrayToPromise.call(this, obj);
	        }
	        if (isObject(obj)) {
	            return objectToPromise.call(this, obj);
	        }
	        return utils.Promise.resolve(obj);
	    }
	    utils.toPromise = toPromise;
	    /**
	     * Convert a thunk to a promise.
	     *
	     * @param {Function}
	     * @return {Promise}
	     * @api private
	     */
	    function thunkToPromise(fn) {
	        /* jshint validthis:true */
	        var ctx = this;
	        return new utils.Promise(function (resolve, reject) {
	            fn.call(ctx, function (err, res) {
	                if (err)
	                    return reject(err);
	                if (arguments.length > 2)
	                    res = slice.call(arguments, 1);
	                resolve(res);
	            });
	        });
	    }
	    utils.thunkToPromise = thunkToPromise;
	    /**
	     * Convert an array of "yieldables" to a promise.
	     * Uses `Promise.all()` internally.
	     *
	     * @param {Array} obj
	     * @return {Promise}
	     * @api private
	     */
	    function arrayToPromise(obj) {
	        /* jshint validthis:true */
	        return utils.Promise.all(obj.map(toPromise, this));
	    }
	    utils.arrayToPromise = arrayToPromise;
	    /**
	     * Convert an object of "yieldables" to a promise.
	     * Uses `Promise.all()` internally.
	     *
	     * @param {Object} obj
	     * @return {Promise}
	     * @api private
	     */
	    function objectToPromise(obj) {
	        /* jshint validthis:true */
	        var results = new obj.constructor();
	        var keys = Object.keys(obj);
	        var promises = [];
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            var promise = toPromise.call(this, obj[key]);
	            if (promise && isPromise(promise))
	                defer(promise, key);
	            else
	                results[key] = obj[key];
	        }
	        return utils.Promise.all(promises).then(function () {
	            return results;
	        });
	        function defer(promise, key) {
	            // predefine the key in the result
	            results[key] = undefined;
	            promises.push(promise.then(function (res) {
	                results[key] = res;
	            }));
	        }
	    }
	    utils.objectToPromise = objectToPromise;
	    function deferred(fn, ctx) {
	        var args = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            args[_i - 2] = arguments[_i];
	        }
	        var ret = {};
	        ret.promise = new utils.Promise(function (resolve, reject) {
	            ret.resolve = resolve;
	            ret.reject = reject;
	            ret.done = function (err, result) { if (err)
	                return reject(err);
	            else
	                resolve(result); };
	        });
	        if (typeof fn === 'function') {
	            fn.apply(ctx, args.concat([ret.done]));
	            return ret.promise;
	        }
	        return ret;
	    }
	    utils.deferred = deferred;
	    ;
	    function callback(promise, callback, ctx) {
	        promise.then(function (result) {
	            callback.call(ctx, null, result);
	        }).catch(function (err) {
	            callback.call(ctx, err);
	        });
	    }
	    utils.callback = callback;
	    function delay(timeout) {
	        var defer = deferred();
	        setTimeout(defer.resolve, timeout);
	        return defer.promise;
	    }
	    utils.delay = delay;
	    ;
	    function eachAsync(array, iterator, context, accumulate) {
	        if (accumulate === void 0) { accumulate = false; }
	        /*return new Promise<void>(function(resolve, reject) {
	          let i = 0, len = array.length,
	            errors = [];
	          function next(err, result?: any) {
	            if (err && !accumulate) return reject(err);
	            if (err) errors.push(err);
	            if (i === len)
	              return errors.length ? reject(flatten(errors)) : resolve();
	    
	            iterator(array[i++]).then(function(r) { next(null, r); }, next);
	          }
	    
	          next(null);
	    
	        });*/
	        return mapAsync(array, iterator, context, accumulate)
	            .then(function () { return void 0; });
	    }
	    utils.eachAsync = eachAsync;
	    function mapAsync(array, iterator, context, accumulate) {
	        if (accumulate === void 0) { accumulate = false; }
	        return new utils.Promise(function (resolve, reject) {
	            var i = 0, len = array.length, errors = [], results = [];
	            function next(err, result) {
	                if (err && !accumulate)
	                    return reject(err);
	                if (err)
	                    errors.push(err);
	                if (i === len)
	                    return errors.length ? reject(flatten(errors)) : resolve(results);
	                var ret = iterator.call(context, array[i++]);
	                if (isPromise(ret)) {
	                    ret.then(function (r) { results.push(r); next(null, r); }, next);
	                }
	                else if (ret instanceof Error) {
	                    next(ret);
	                }
	                else {
	                    next(null);
	                }
	            }
	            next(null);
	        });
	    }
	    utils.mapAsync = mapAsync;
	})(utils = exports.utils || (exports.utils = {}));
	function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b)
	        return a !== 0 || 1 / a == 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null)
	        return a === b;
	    // Unwrap any wrapped objects.
	    //if (a instanceof _) a = a._wrapped;
	    //if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className != toString.call(b))
	        return false;
	    switch (className) {
	        // Strings, numbers, dates, and booleans are compared by value.
	        case '[object String]':
	            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	            // equivalent to `new String("5")`.
	            return a == String(b);
	        case '[object Number]':
	            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	            // other numeric values.
	            return a !== +a ? b !== +b : (a === 0 ? 1 / a === 1 / b : a === +b);
	        case '[object Date]':
	        case '[object Boolean]':
	            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	            // millisecond representations. Note that invalid dates with millisecond representations
	            // of `NaN` are not equivalent.
	            return +a == +b;
	        // RegExps are compared by their source patterns and flags.
	        case '[object RegExp]':
	            return a.source == b.source &&
	                a.global == b.global &&
	                a.multiline == b.multiline &&
	                a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object')
	        return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	        // Linear search. Performance is inversely proportional to the number of
	        // unique nested structures.
	        if (aStack[length] == a)
	            return bStack[length] == b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && (aCtor instanceof aCtor) &&
	        typeof bCtor === 'function' && (bCtor instanceof bCtor))) {
	        return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0, result = true;
	    // Recursively compare objects and arrays.
	    if (className === '[object Array]') {
	        // Compare array lengths to determine if a deep comparison is necessary.
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            // Deep compare the contents, ignoring non-numeric properties.
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack)))
	                    break;
	            }
	        }
	    }
	    else {
	        // Deep compare objects.
	        for (var key in a) {
	            if (utils.has(a, key)) {
	                // Count the expected number of properties.
	                size++;
	                // Deep compare each member.
	                if (!(result = utils.has(b, key) && eq(a[key], b[key], aStack, bStack)))
	                    break;
	            }
	        }
	        // Ensure that both objects contain the same number of properties.
	        if (result) {
	            for (key in b) {
	                if (utils.has(b, key) && !(size--))
	                    break;
	            }
	            result = !size;
	        }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	function _log() {
	    // this hackery is required for IE8/9, where
	    // the `console.log` function doesn't have 'apply'
	    return 'object' === typeof console
	        && console.log
	        && Function.prototype.apply.call(console.log, console, arguments);
	}
	var _debug = false;
	function debug(should) {
	    _debug = should;
	}
	exports.debug = debug;
	var formatters = {
	    j: function (v) {
	        return JSON.stringify(v);
	    }
	};
	function coerce(val) {
	    if (val instanceof Error)
	        return val.stack || val.message;
	    return val;
	}
	function logger(namespace) {
	    var fn = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (!_debug)
	            return;
	        args[0] = coerce(args[0]);
	        if ('string' !== typeof args[0]) {
	            // anything else let's inspect with %o
	            args = ['%o'].concat(args);
	        }
	        // apply any `formatters` transformations
	        var index = 0;
	        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	            // if we encounter an escaped % then don't increase the array index
	            if (match === '%%')
	                return match;
	            index++;
	            var formatter = formatters[format];
	            if ('function' === typeof formatter) {
	                var val = args[index];
	                match = formatter.call(self, val);
	                // now we need to remove `args[index]` since it's inlined in the `format`
	                args.splice(index, 1);
	                index--;
	            }
	            return match;
	        });
	        args = formatArgs(namespace, args);
	        utils_1.utils.call(_log, null, args);
	    };
	    return fn;
	}
	exports.logger = logger;
	function formatArgs(namespace, args) {
	    //var args = arguments;
	    args[0] = '[views:' + namespace + '] ' + args[0];
	    return args;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* global BaseClass, __has */
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var object_1 = __webpack_require__(7);
	var region_1 = __webpack_require__(12);
	var utils_1 = __webpack_require__(9);
	var RegionManager = (function (_super) {
	    __extends(RegionManager, _super);
	    /** Region manager
	     * @extends BaseObject
	     */
	    function RegionManager() {
	        _super.call(this);
	        this._regions = {};
	    }
	    Object.defineProperty(RegionManager.prototype, "regions", {
	        /**
	         * Regions
	         * @type {string:Region}
	         */
	        get: function () {
	            return this._regions;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	      * Add one or more regions to the region manager
	      * @param {Object} regions
	      */
	    RegionManager.prototype.addRegions = function (regions) {
	        var def, out = {}, keys = Object.keys(regions);
	        keys.forEach(function (k) {
	            def = regions[k];
	            out[k] = this.addRegion(k, def);
	        }, this);
	        return out;
	    };
	    /**
	     * Add a region to the RegionManager
	     * @param {String} name   The name of the regions
	     * @param {String|Object|Region|HTMLElement} def The region to associate with the name and the RegionManager
	     */
	    RegionManager.prototype.addRegion = function (name, def) {
	        var region = region_1.Region.buildRegion(def);
	        this._setRegion(name, region);
	        return region;
	    };
	    /**
	     * Remove one or more regions from the manager
	     * @param {...name} name A array of region names
	     */
	    RegionManager.prototype.removeRegion = function (names) {
	        //let names = utils.slice(arguments)
	        if (typeof names === 'string') {
	            names = [names];
	        }
	        names.forEach(function (name) {
	            if (utils_1.utils.has(this.regions, name)) {
	                var region = this.regions[name];
	                region.destroy();
	                this._unsetRegion(name);
	            }
	        }, this);
	    };
	    /**
	     * Destroy the regionmanager
	     */
	    RegionManager.prototype.destroy = function () {
	        this.removeRegions();
	        _super.prototype.destroy.call(this);
	    };
	    /**
	     * Remove all regions from the manager
	     */
	    RegionManager.prototype.removeRegions = function () {
	        utils_1.utils.call(this.removeRegion, this, Object.keys(this._regions));
	    };
	    /**
	     * @private
	     */
	    RegionManager.prototype._setRegion = function (name, region) {
	        if (this._regions[name]) {
	            this._regions[name].destroy();
	        }
	        this._regions[name] = region;
	    };
	    /**
	     * @private
	     */
	    RegionManager.prototype._unsetRegion = function (name) {
	        delete this._regions[name];
	    };
	    return RegionManager;
	})(object_1.BaseObject);
	exports.RegionManager = RegionManager;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* global BaseClass */
	/* jshint latedef:nofunc */
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var object_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(9);
	/** Region  */
	var Region = (function (_super) {
	    __extends(Region, _super);
	    /**
	     * Regions manage a view
	     * @param {Object} options
	     * @param {HTMLElement} options.el  A Html element
	     * @constructor Region
	     * @extends BaseObject
	     * @inheritdoc
	     */
	    function Region(options) {
	        this.options = options;
	        this._el = this.getOption('el');
	        _super.call(this);
	    }
	    Object.defineProperty(Region.prototype, "view", {
	        get: function () {
	            return this._view;
	        },
	        set: function (view) {
	            this.show(view);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Region.prototype, "el", {
	        get: function () {
	            return this._el;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Build region from a definition
	     * @param {Object|String|Region} def The description of the region
	     * @return {Region}
	     */
	    Region.buildRegion = function (def, context) {
	        if (context === void 0) { context = null; }
	        if (def instanceof Region) {
	            return def;
	        }
	        else if (typeof def === 'string') {
	            return buildBySelector(def, Region, context);
	        }
	        else {
	            return buildByObject(def, context);
	        }
	    };
	    /**
	   * Show a view in the region.
	   * This will destroy or remove any existing views.
	   * @param  {View} view    The view to Show
	   * @return {Region}       this for chaining.
	   */
	    Region.prototype.show = function (view, options) {
	        var diff = view !== this._view;
	        if (diff) {
	            // Remove any containing views
	            this.empty();
	            // If the view is destroyed be others
	            view.once('destroy', this.empty, this);
	            view.render();
	            utils_1.utils.triggerMethodOn(view, 'before:show');
	            this._attachHtml(view);
	            utils_1.utils.triggerMethodOn(view, 'show');
	            this._view = view;
	        }
	        return this;
	    };
	    /**
	     * Destroy the region, this will remove any views, but not the containing element
	     * @return {Region} this for chaining
	     */
	    Region.prototype.destroy = function () {
	        this.empty();
	        _super.prototype.destroy.call(this);
	    };
	    /**
	     * Empty the region. This will destroy any existing view.
	     * @return {Region} this for chaining;
	     */
	    Region.prototype.empty = function () {
	        if (!this._view)
	            return;
	        var view = this._view;
	        view.off('destroy', this.empty, this);
	        this.trigger('before:empty', view);
	        this._destroyView();
	        this.trigger('empty', view);
	        delete this._view;
	        return this;
	    };
	    /**
	     * Attach the view element to the regions element
	     * @param {View} view
	     * @private
	     *
	     */
	    Region.prototype._attachHtml = function (view) {
	        this._el.innerHTML = '';
	        this._el.appendChild(view.el);
	    };
	    Region.prototype._destroyView = function () {
	        var view = this._view;
	        if ((view.destroy && typeof view.destroy === 'function') && !view.isDestroyed) {
	            view.destroy();
	        }
	        else if (view.remove && typeof view.remove === 'function') {
	            view.remove();
	        }
	        this._el.innerHTML = '';
	    };
	    return Region;
	})(object_1.BaseObject);
	exports.Region = Region;
	function buildByObject(object, context) {
	    if (object === void 0) { object = {}; }
	    if (!object.selector)
	        throw new Error('No selector specified: ' + object);
	    return buildBySelector(object.selector, object.regionClass || Region, context);
	}
	function buildBySelector(selector, Klass, context) {
	    if (Klass === void 0) { Klass = Region; }
	    context = context || document;
	    var el = context.querySelector(selector);
	    if (!el)
	        throw new Error('selector must exist in the dom');
	    return new Klass({
	        el: el
	    });
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var templateview_1 = __webpack_require__(4);
	var utils_1 = __webpack_require__(9);
	var DataView = (function (_super) {
	    __extends(DataView, _super);
	    /**
	     * DataView
	     * @param {DataViewOptions} options
	     * @extends TemplateView
	     */
	    function DataView(options) {
	        if (options === void 0) { options = {}; }
	        if (options.model) {
	            this.model = options.model;
	        }
	        if (options.collection) {
	            this.collection = options.collection;
	        }
	        _super.call(this, options);
	    }
	    Object.defineProperty(DataView.prototype, "model", {
	        get: function () { return this._model; },
	        set: function (model) {
	            this.setModel(model);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataView.prototype, "collection", {
	        get: function () { return this._collection; },
	        set: function (collection) {
	            this.setCollection(collection);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataView.prototype.setModel = function (model) {
	        if (this._model === model)
	            return;
	        this.triggerMethod('before:model', this._model, model);
	        if (this._model) {
	            this.stopListening(this._model);
	        }
	        this._model = model;
	        this.triggerMethod('model', model);
	    };
	    DataView.prototype.setCollection = function (collection) {
	        if (this._collection === collection)
	            return;
	        this.triggerMethod('before:collection', this._collection, collection);
	        if (this._collection) {
	            this.stopListening(this._collection);
	        }
	        this._collection = collection;
	        this.triggerMethod('collection', collection);
	    };
	    DataView.prototype.getTemplateData = function () {
	        return this.model ?
	            typeof this.model.toJSON === 'function' ?
	                this.model.toJSON() : this.model : {};
	    };
	    DataView.prototype.delegateEvents = function (events) {
	        events = events || this.events;
	        //events = normalizeUIKeys(events)
	        var _a = this._filterEvents(events), c = _a.c, e = _a.e, m = _a.m;
	        _super.prototype.delegateEvents.call(this, e);
	        this._delegateDataEvents(m, c);
	        return this;
	    };
	    DataView.prototype.undelegateEvents = function () {
	        this._undelegateDataEvents();
	        _super.prototype.undelegateEvents.call(this);
	        return this;
	    };
	    DataView.prototype._delegateDataEvents = function (model, collection) {
	        var _this = this;
	        this._dataEvents = {};
	        var fn = function (item, ev) {
	            if (!_this[item])
	                return {};
	            var out = {}, k, f;
	            for (k in ev) {
	                f = utils_1.utils.bind(ev[k], _this);
	                _this[item].on(k, f);
	                out[item + ":" + k] = f;
	            }
	            return out;
	        };
	        utils_1.utils.extend(this._dataEvents, fn('model', model), fn('collection', collection));
	    };
	    DataView.prototype._undelegateDataEvents = function () {
	        if (!this._dataEvents)
	            return;
	        var k, v;
	        for (k in this._dataEvents) {
	            v = this._dataEvents[k];
	            var _a = k.split(':'), item = _a[0], ev = _a[1];
	            if (!this[item])
	                continue;
	            this[item].off(ev, v);
	        }
	        delete this._dataEvents;
	    };
	    DataView.prototype._filterEvents = function (obj) {
	        /*jshint -W030 */
	        var c = {}, m = {}, e = {}, k, v;
	        for (k in obj) {
	            var _a = k.split(' '), ev = _a[0], t = _a[1];
	            ev = ev.trim(), t = t ? t.trim() : "", v = obj[k];
	            if (t === 'collection') {
	                c[ev] = v;
	            }
	            else if (t === 'model') {
	                m[ev] = v;
	            }
	            else {
	                e[k] = v;
	            }
	        }
	        return { c: c, m: m, e: e };
	    };
	    return DataView;
	})(templateview_1.TemplateView);
	exports.DataView = DataView;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var data_view_1 = __webpack_require__(13);
	var utils_1 = __webpack_require__(9);
	var events_1 = __webpack_require__(8);
	var debug_1 = __webpack_require__(10);
	var debug = debug_1.logger('collectionview');
	var Buffer = (function () {
	    function Buffer() {
	        this.children = [];
	        this.buffer = document.createDocumentFragment();
	    }
	    Buffer.prototype.append = function (view) {
	        this.children.push(view);
	        this.buffer.appendChild(view.el);
	    };
	    return Buffer;
	})();
	var CollectionView = (function (_super) {
	    __extends(CollectionView, _super);
	    /** CollectionView
	   * @extends DataView
	   * @param {DataViewOptions} options
	   */
	    function CollectionView(options) {
	        //this._options = options||{}
	        this.children = [];
	        this.sort = (options && options.sort != null) ? options.sort : true;
	        _super.call(this, options);
	    }
	    /**
	   * Render the collection view and alle of the children
	   * @return {CollectionView}
	   *
	   */
	    CollectionView.prototype.render = function (options) {
	        this.destroyChildren();
	        this._destroyContainer();
	        _super.prototype.render.call(this, options);
	        this._initContainer();
	        if (this.collection && this.collection.length) {
	            this.renderCollection();
	        }
	        return this;
	    };
	    /**
	     * @protected
	     */
	    CollectionView.prototype.setCollection = function (collection) {
	        _super.prototype.setCollection.call(this, collection);
	        this._delegateCollectionEvents();
	    };
	    CollectionView.prototype.renderCollection = function () {
	        this.destroyChildren();
	        if (this.collection.length != 0) {
	            this.hideEmptyView();
	            this._startBuffering();
	            this._renderCollection();
	            this._stopBuffering();
	        }
	        else {
	            this.showEmptyView();
	        }
	    };
	    /**
	   * Returns a new instance of this.childView with attached model.
	   *
	   * @param {IModel} model
	   * @protected
	   */
	    CollectionView.prototype.getChildView = function (model) {
	        var View = this.getOption('childView') || data_view_1.DataView, options = this.getOption('childViewOptions') || {};
	        return new View(utils_1.utils.extend({
	            model: model
	        }, options));
	    };
	    CollectionView.prototype.renderChildView = function (view, index) {
	        this.triggerMethod('before:render:child', view);
	        debug('%s render child: %s', this.cid, view.cid);
	        view.render();
	        this._attachHTML(view, index);
	        this.triggerMethod('render:child', view);
	    };
	    CollectionView.prototype.showEmptyView = function () {
	        var EmptyView = this.getOption('emptyView');
	        if (EmptyView == null)
	            return;
	        var view = new EmptyView();
	        this._emptyView = view;
	        this._container.appendChild(view.render().el);
	    };
	    CollectionView.prototype.hideEmptyView = function () {
	        if (!this._emptyView)
	            return;
	        this._emptyView.destroy();
	        this._emptyView.remove();
	        this._emptyView = void 0;
	    };
	    CollectionView.prototype.destroyChildren = function () {
	        if (this._container) {
	            this._container.innerHTML = '';
	        }
	        if (this.children.length === 0)
	            return;
	        this.children.forEach(this.removeChildView, this);
	        this.children = [];
	    };
	    CollectionView.prototype.removeChildView = function (view) {
	        if (!view)
	            return;
	        if (typeof view.destroy === 'function') {
	            view.destroy();
	        }
	        if (typeof view.remove === 'function') {
	            view.remove();
	        }
	        this.stopListening(view);
	        //this.children.delete(view);
	        this.children.splice(this.children.indexOf(view), 1);
	        if (this.children.length === 0) {
	            this.showEmptyView();
	        }
	        this._updateIndexes(view, false);
	    };
	    /**
	   * Destroy the collection view and all of it's children
	   * @see JaffaMVC.View
	   * @return {JaffaMVC.View}
	   */
	    CollectionView.prototype.destroy = function () {
	        this.triggerMethod('before:destroy:children');
	        this.destroyChildren();
	        this.triggerMethod('destroy:children');
	        this.hideEmptyView();
	        //if (this._emptyView) this.hideEmptyView();
	        return _super.prototype.destroy.call(this);
	    };
	    CollectionView.prototype._renderCollection = function () {
	        var _this = this;
	        this.triggerMethod('before:render:collection');
	        this.collection.forEach(function (model, index) {
	            var view = _this.getChildView(model);
	            _this._appendChild(view, index);
	        });
	        this.triggerMethod('render:collection');
	    };
	    /**
	   * Append childview to the container
	   * @private
	   * @param {IDataView} view
	   * @param {Number} index
	   */
	    CollectionView.prototype._appendChild = function (view, index) {
	        this._updateIndexes(view, true, index);
	        this._proxyChildViewEvents(view);
	        debug('%s append child %s at index: %s', this.cid, view.cid, index);
	        this.children.push(view);
	        this.hideEmptyView();
	        this.renderChildView(view, index);
	        this.triggerMethod('add:child', view);
	    };
	    /**
	   * Attach the childview's element to the CollectionView.
	   * When in buffer mode, the view is added to a documentfragment to optimize performance
	   * @param {View} view  A view
	   * @param {Number} index The index in which to insert the view
	   * @private
	   */
	    CollectionView.prototype._attachHTML = function (view, index) {
	        if (this._buffer) {
	            debug("%s attach to buffer: %s", this.cid, view.cid);
	            this._buffer.append(view);
	        }
	        else {
	            //if (this._isShown) {
	            //  utils.triggerMethodOn(view, 'before:show');
	            //}
	            if (!this._insertBefore(view, index)) {
	                this._insertAfter(view);
	            }
	        }
	    };
	    /**
	   * Proxy event froms childview to the collectionview
	   * @param {IView} view
	   * @private
	   */
	    CollectionView.prototype._proxyChildViewEvents = function (view) {
	        var prefix = this.getOption('prefix') || 'childview';
	        this.listenTo(view, 'all', function () {
	            var args = utils_1.utils.slice(arguments);
	            args[0] = prefix + ':' + args[0];
	            args.splice(1, 0, view);
	            utils_1.utils.call(this.triggerMethod, this, args);
	        });
	    };
	    CollectionView.prototype._updateIndexes = function (view, increment, index) {
	        if (!this.sort)
	            return;
	        if (increment)
	            view._index = index;
	        this.children.forEach(function (lView) {
	            if (lView._index >= view._index) {
	                increment ? lView._index++ : lView._index--;
	            }
	        });
	    };
	    CollectionView.prototype._startBuffering = function () {
	        this._buffer = new Buffer();
	    };
	    CollectionView.prototype._stopBuffering = function () {
	        this._container.appendChild(this._buffer.buffer);
	        delete this._buffer;
	    };
	    CollectionView.prototype._initContainer = function () {
	        var container = this.getOption('childViewContainer');
	        if (container) {
	            container = this.$(container)[0];
	        }
	        else {
	            container = this.el;
	        }
	        this._container = container;
	    };
	    CollectionView.prototype._destroyContainer = function () {
	        if (this._container)
	            delete this._container;
	    };
	    /**
	     * Internal method. Check whether we need to insert the view into
	   * the correct position.
	     * @param  {IView} childView [description]
	     * @param  {number} index     [description]
	     * @return {boolean}           [description]
	     */
	    CollectionView.prototype._insertBefore = function (childView, index) {
	        var currentView;
	        var findPosition = this.sort && (index < this.children.length - 1);
	        if (findPosition) {
	            // Find the view after this one
	            currentView = utils_1.utils.find(this.children, function (view) {
	                return view._index === index + 1;
	            });
	        }
	        if (currentView) {
	            this._container.insertBefore(childView.el, currentView.el);
	            return true;
	        }
	        return false;
	    };
	    /**
	     * Internal method. Append a view to the end of the $el
	     * @private
	     */
	    CollectionView.prototype._insertAfter = function (childView) {
	        this._container.appendChild(childView.el);
	    };
	    /**
	     * Delegate collection events
	     * @private
	     */
	    CollectionView.prototype._delegateCollectionEvents = function () {
	        if (this.collection && this.collection instanceof events_1.EventEmitter) {
	            this.listenTo(this.collection, 'add', this._onCollectionAdd);
	            this.listenTo(this.collection, 'remove', this._onCollectionRemove);
	            this.listenTo(this.collection, 'reset', this.render);
	            if (this.sort)
	                this.listenTo(this.collection, 'sort', this._onCollectionSort);
	        }
	    };
	    // Event handlers
	    /**
	     * Called when a model is add to the collection
	     * @param {JaffaMVC.Model|Backbone.model} model Model
	     * @private
	     */
	    CollectionView.prototype._onCollectionAdd = function (model) {
	        var view = this.getChildView(model);
	        var index = this.collection.indexOf(model);
	        this._appendChild(view, index);
	    };
	    /**
	     * Called when a model is removed from the collection
	     * @param {JaffaMVC.Model|Backbone.model} model Model
	     * @private
	     */
	    CollectionView.prototype._onCollectionRemove = function (model) {
	        var view = utils_1.utils.find(this.children, function (view) {
	            return view.model === model;
	        });
	        this.removeChildView(view);
	    };
	    /**
	     * Called when the collection is sorted
	     * @private
	     */
	    CollectionView.prototype._onCollectionSort = function () {
	        var _this = this;
	        var orderChanged = this.collection.find(function (model, index) {
	            var view = utils_1.utils.find(_this.children, function (view) {
	                return view.model === model;
	            });
	            return !view || view._index !== index;
	        });
	        if (orderChanged)
	            this.render();
	    };
	    return CollectionView;
	})(data_view_1.DataView);
	exports.CollectionView = CollectionView;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var utils_1 = __webpack_require__(9);
	var object_1 = __webpack_require__(7);
	var Model = (function (_super) {
	    __extends(Model, _super);
	    function Model(attributes, options) {
	        if (attributes === void 0) { attributes = {}; }
	        options = options || {};
	        this._attributes = attributes;
	        this.uid = utils_1.utils.uniqueId('uid');
	        this._changed = {};
	        this.collection = options.collection;
	        _super.call(this);
	    }
	    Object.defineProperty(Model.prototype, "id", {
	        get: function () {
	            if (this.idAttribute in this._attributes)
	                return this._attributes[this.idAttribute];
	            return this.uid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.set = function (key, val, options) {
	        if (options === void 0) { options = {}; }
	        var attr, attrs = {}, unset, changes, silent, changing, prev, current;
	        if (key == null)
	            return this;
	        // Handle both `"key", value` and `{key: value}` -style arguments.
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val;
	        }
	        else {
	            attrs[key] = val;
	        }
	        options || (options = {});
	        // Run validation.
	        //if (!this._validate(attrs, options)) return false;
	        // Extract attributes and options.
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = utils_1.utils.extend(Object.create(null), this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        // For each `set` attribute, update or delete the current value.
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!utils_1.utils.equal(current[attr], val))
	                changes.push(attr);
	            if (!utils_1.utils.equal(prev[attr], val)) {
	                this._changed[attr] = val;
	            }
	            else {
	                delete this._changed[attr];
	            }
	            unset ? delete current[attr] : current[attr] = val;
	        }
	        // Trigger all relevant attribute changes.
	        if (!silent) {
	            if (changes.length)
	                this._pending = !!options;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                this.trigger('change:' + changes[i], this, current[changes[i]], options);
	            }
	        }
	        // You might be wondering why there's a `while` loop here. Changes can
	        // be recursively nested within `"change"` events.
	        if (changing)
	            return this;
	        if (!silent) {
	            while (this._pending) {
	                options = this._pending;
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    Model.prototype.get = function (key) {
	        return this._attributes[key];
	    };
	    Model.prototype.unset = function (key, options) {
	        this.set(key, void 0, utils_1.utils.extend({}, options, { unset: true }));
	    };
	    Model.prototype.has = function (attr) {
	        return this.get(attr) != null;
	    };
	    Model.prototype.hasChanged = function (attr) {
	        if (attr == null)
	            return !!Object.keys(this.changed).length;
	        return utils_1.utils.has(this.changed, attr);
	    };
	    Model.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this._attributes)
	            attrs[key] = void 0;
	        return this.set(attrs, utils_1.utils.extend({}, options, { unset: true }));
	    };
	    Object.defineProperty(Model.prototype, "changed", {
	        get: function () {
	            return utils_1.utils.extend({}, this._changed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    Model.prototype.changedAttributes = function (diff) {
	        if (!diff)
	            return this.hasChanged() ? utils_1.utils.extend(Object.create(null), this.changed) : false;
	        var val, changed = {};
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        for (var attr in diff) {
	            if (utils_1.utils.equal(old[attr], (val = diff[attr])))
	                continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    Model.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes)
	            return null;
	        return this._previousAttributes[attr];
	    };
	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    Model.prototype.previousAttributes = function () {
	        return utils_1.utils.extend(Object.create(null), this._previousAttributes);
	    };
	    Model.prototype.toJSON = function () {
	        return JSON.parse(JSON.stringify(this._attributes));
	    };
	    Model.prototype.clone = function () {
	        return new (this.constructor)(this._attributes);
	    };
	    return Model;
	})(object_1.BaseObject);
	exports.Model = Model;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var object_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(9);
	var model_1 = __webpack_require__(15);
	var setOptions = { add: true, remove: true, merge: true };
	var addOptions = { add: true, remove: false };
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(models, options) {
	        if (options === void 0) { options = {}; }
	        this.options = options;
	        if (this.options.model) {
	            this.Model = this.options.model;
	        }
	        //this._byId = {};
	        if (models) {
	            this.add(models);
	        }
	        _super.call(this);
	    }
	    Object.defineProperty(Collection.prototype, "length", {
	        /**
	         * The length of the collection
	         * @property {Number} length
	         */
	        get: function () {
	            return this.models.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "Model", {
	        get: function () {
	            if (!this._model) {
	                this._model = model_1.Model;
	            }
	            return this._model;
	        },
	        set: function (con) {
	            this._model = con;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "models", {
	        get: function () {
	            return this._models || (this._models = []);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.add = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        if (!Array.isArray(models)) {
	            if (!(models instanceof this.Model)) {
	                models = this.create(models, { add: false });
	            }
	        }
	        else {
	            models = models.map(function (item) {
	                return (item instanceof _this.Model) ? item : _this.create(item, { add: false });
	            });
	        }
	        this.set(models, utils_1.utils.extend({ merge: false }, options, addOptions));
	    };
	    Collection.prototype.set = function (items, options) {
	        if (options === void 0) { options = {}; }
	        options = utils_1.utils.extend({}, setOptions, options);
	        if (options.parse)
	            items = this.parse(items, options);
	        var singular = !Array.isArray(items);
	        var models = (singular ? (items ? [items] : []) : items.slice());
	        var i, l, id, model, attrs, existing, sort;
	        var at = options.at;
	        //var targetModel = this.model;
	        var sortable = this.comparator && (at == null) && options.sort !== false;
	        var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
	        var toAdd = [], toRemove = [], modelMap = {};
	        var add = options.add, merge = options.merge, remove = options.remove;
	        var order = !sortable && add && remove ? [] : null;
	        // Turn bare objects into model references, and prevent invalid models
	        // from being added.
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i];
	            id = model.get(model.idAttribute) || model.uid;
	            // If a duplicate is found, prevent it from being added and
	            // optionally merge it into the existing model.
	            if (existing = this.get(id)) {
	                if (remove)
	                    modelMap[existing.uid] = true;
	                if (merge) {
	                    attrs = model.toJSON();
	                    //if (options.parse) attrs = existing.parse(attrs, options);
	                    existing.set(attrs, options);
	                    if (sortable && !sort && existing.hasChanged(sortAttr))
	                        sort = true;
	                }
	                models[i] = existing;
	            }
	            else if (add) {
	                models[i] = model; //this._prepareModel(attrs, options);
	                if (!model)
	                    continue;
	                toAdd.push(model);
	                this._addReference(model, options);
	            }
	            // Do not add multiple models with the same `id`.
	            model = existing || model;
	            if (order && !modelMap[model.id])
	                order.push(model);
	            modelMap[model.uid] = true;
	        }
	        // Remove nonexistent models if appropriate.
	        if (remove) {
	            for (i = 0, l = this.length; i < l; ++i) {
	                if (!modelMap[(model = this.models[i]).uid])
	                    toRemove.push(model);
	            }
	            if (toRemove.length)
	                this.remove(toRemove, options);
	        }
	        // See if sorting is needed, update `length` and splice in new models.
	        if (toAdd.length || (order && order.length)) {
	            if (sortable)
	                sort = true;
	            //this.length += toAdd.length;
	            if (at != null) {
	                for (i = 0, l = toAdd.length; i < l; i++) {
	                    this.models.splice(at + i, 0, toAdd[i]);
	                }
	            }
	            else {
	                if (order)
	                    this.models.length = 0;
	                var orderedModels = order || toAdd;
	                for (i = 0, l = orderedModels.length; i < l; i++) {
	                    this.models.push(orderedModels[i]);
	                }
	            }
	        }
	        // Silently sort the collection if appropriate.
	        if (sort)
	            this.sort({ silent: true });
	        // Unless silenced, it's time to fire all appropriate add/sort events.
	        if (!options.silent) {
	            for (i = 0, l = toAdd.length; i < l; i++) {
	                (model = toAdd[i]).trigger('add', model, this, options);
	            }
	            if (sort || (order && order.length))
	                this.trigger('sort', this, options);
	            if (toAdd.length || toRemove.length)
	                this.trigger('update', this, options);
	        }
	        // Return the added (or merged) model (or models).
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.remove = function (models, options) {
	        if (options === void 0) { options = {}; }
	        var singular = !Array.isArray(models);
	        models = (singular ? [models] : models.slice());
	        var i, l, index, model;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i] = this.get(models[i]);
	            if (!model)
	                continue;
	            index = this.indexOf(model);
	            this.models.splice(index, 1);
	            if (!options.silent) {
	                options.index = index;
	                model.trigger('remove', model, this, options);
	            }
	            this._removeReference(model, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.get = function (id) {
	        return this.find(id);
	    };
	    // Get the model at the given index.
	    Collection.prototype.at = function (index) {
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (options) {
	        options = options || this.options;
	        return new this.constructor(this.models, options);
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) { options = {}; }
	        if (!this.comparator)
	            throw new Error('Cannot sort a set without a comparator');
	        // Run sort based on type of `comparator`.
	        if (typeof this.comparator === 'string' || this.comparator.length === 1) {
	            this._models = this.sortBy(this.comparator, this);
	        }
	        else {
	            this.models.sort(this.comparator.bind(this));
	        }
	        if (!options.silent)
	            this.trigger('sort', this, options);
	        return this;
	    };
	    Collection.prototype.sortBy = function (key, context) {
	        return utils_1.utils.sortBy(this._models, key, context);
	    };
	    Collection.prototype.push = function (model, options) {
	        if (options === void 0) { options = {}; }
	        return this.add(model, utils_1.utils.extend({ at: this.length }, options));
	    };
	    Collection.prototype.reset = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        this.forEach(function (model) {
	            _this._removeReference(model, options);
	        });
	        options.previousModels = this.models;
	        this._reset();
	        models = this.add(models, options);
	        if (!options.silent)
	            this.trigger('reset', this, options);
	        return models;
	    };
	    Collection.prototype.create = function (values, options) {
	        if (options === void 0) { options = { add: true }; }
	        var model = new this.Model(values, options);
	        if (options.add)
	            this.add(model);
	        return model;
	    };
	    Collection.prototype.parse = function (models, options) {
	        if (options === void 0) { options = {}; }
	        return models;
	    };
	    Collection.prototype.find = function (nidOrFn) {
	        var model;
	        if (typeof nidOrFn === 'function') {
	            model = utils_1.utils.find(this.models, nidOrFn);
	        }
	        else {
	            model = utils_1.utils.find(this.models, function (model) {
	                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
	            });
	        }
	        return model;
	    };
	    Collection.prototype.forEach = function (iterator, ctx) {
	        for (var i = 0, l = this.models.length; i < l; i++) {
	            iterator.call(ctx || this, this.models[i], i);
	        }
	        return this;
	    };
	    Collection.prototype.indexOf = function (model) {
	        return this.models.indexOf(model);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (m) { return m.toJSON(); });
	    };
	    Collection.prototype._removeReference = function (model, options) {
	        if (this === model.collection)
	            delete model.collection;
	        this.stopListening(model);
	    };
	    Collection.prototype._addReference = function (model, options) {
	        if (!model.collection)
	            model.collection = this;
	        this.listenTo(model, 'all', this._onModelEvent);
	    };
	    Collection.prototype._reset = function () {
	        this._models = [];
	    };
	    Collection.prototype._onModelEvent = function (event, model, collection, options) {
	        if ((event === 'add' || event === 'remove') && collection !== this)
	            return;
	        if (event === 'destroy')
	            this.remove(model, options);
	        utils_1.utils.call(this.trigger, this, utils_1.utils.slice(arguments));
	    };
	    Collection.prototype.destroy = function () {
	        var _this = this;
	        this.models.forEach(function (m) {
	            if (typeof m.destroy === 'function' &&
	                m.collection == _this)
	                m.destroy();
	        });
	        _super.prototype.destroy.call(this);
	    };
	    return Collection;
	})(object_1.BaseObject);
	exports.Collection = Collection;


/***/ },
/* 17 */
/***/ function(module, exports) {

	


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(9);
	function attributes(attrs) {
	    return function (target) {
	        utils_1.utils.extend(target.prototype, attrs);
	    };
	}
	exports.attributes = attributes;
	function events(events) {
	    return function (target) {
	        target.prototype.events = events;
	    };
	}
	exports.events = events;
	function triggers(triggers) {
	    return function (target) {
	        target.prototype.triggers = triggers;
	    };
	}
	exports.triggers = triggers;


/***/ },
/* 19 */
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var views_1 = __webpack_require__(2);
	var editors = __webpack_require__(21);
	var Types_1 = __webpack_require__(19);
	var validator_1 = __webpack_require__(27);
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
	                return errors.length ? reject(views_1.utils.flatten(errors)) : resolve();
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
	                if ((--count) === 0)
	                    return errors.length ? reject(views_1.utils.flatten(errors)) : resolve(results.length ? results : null);
	            }, function (err) {
	                errors.push(err);
	                if ((--count) === 0)
	                    reject(views_1.utils.flatten(errors));
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
	        this.autoValidate = options.autoValidate || this.autoValidate || false;
	        this._validator = options.validator || new validator_1.Validator();
	        this._validations = {};
	    }
	    Object.defineProperty(Form, "defaults", {
	        get: function () { return { selector: '[name]', attribute: 'form-editor' }; },
	        enumerable: true,
	        configurable: true
	    });
	    Form.prototype.render = function (options) {
	        this._destroyEditors();
	        _super.prototype.render.call(this, options);
	        this._renderEditors();
	        return this;
	    };
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
	        this.trigger("before:setvalue", values);
	        for (var key in values) {
	            if (this.editors[key]) {
	                this.trigger('before:setvalue:' + key);
	                try {
	                    this.editors[key].setValue(values[key]);
	                }
	                catch (e) {
	                    throw e;
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
	        return all(promises).catch(function (errors) {
	            errors.forEach(function (error) {
	                var msg = error.message || validator_1.Validator.messages[error.name];
	                error.message = renderMessage(editor, msg);
	            });
	            var e = new Types_1.FormEditorValidationError(editor.name, errors);
	            editor.trigger('invalid', e);
	            throw e;
	        });
	    };
	    Form.prototype.validate = function () {
	        var _this = this;
	        var names = Object.keys(this.editors);
	        return asyncEach(names, function (name) {
	            return _this.validateEditor.call(_this, name);
	        }, this, true).then(function (x) { return null; })
	            .catch(function (e) {
	            var map = {};
	            e.forEach(function (e) {
	                map[e.name] = e;
	            });
	            return map;
	        });
	    };
	    Form.prototype._getElements = function (formEl, options) {
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
	            this.listenTo(editor, 'invalid', this._onEditorInvalid);
	            output[name_1] = editor;
	        }
	        return output;
	    };
	    Form.prototype._renderEditors = function () {
	        this._editors = this._getElements(this.el, this._options || {});
	        for (var k in this._editors) {
	            this._editors[k].render();
	        }
	    };
	    Form.prototype._destroyEditors = function () {
	        for (var k in this.editors) {
	            this.stopListening(this.editors[k]);
	            this.editors[k].destroy();
	        }
	        this._editors = {};
	    };
	    Form.prototype._onEditorChange = function (editor) {
	        this.triggerMethod('change', editor);
	    };
	    Form.prototype._onEditorInvalid = function (error) {
	        var editor = this.editors[error.name];
	        this.triggerMethod('invalid', editor, error);
	    };
	    Form.prototype._getType = function (element) {
	        if (element.nodeName === 'INPUT') {
	            return element.type.toLowerCase();
	        }
	        else {
	            return element.nodeName.toLowerCase();
	        }
	    };
	    Form.prototype.destroy = function () {
	        this._destroyEditors();
	        _super.prototype.destroy.call(this);
	    };
	    return Form;
	})(views_1.TemplateView);
	exports.Form = Form;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/// <reference path="../../node_modules/views/views.d.ts" />
	var input_editor_1 = __webpack_require__(22);
	var list_1 = __webpack_require__(23);
	var number_1 = __webpack_require__(25);
	var select_1 = __webpack_require__(26);
	__export(__webpack_require__(1));
	exports.editors = {
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
	    return exports.editors[editor];
	}
	exports.get = get;
	function set(editor, name) {
	    exports.editors[name] = editor;
	}
	exports.set = set;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

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
	var editor_1 = __webpack_require__(1);
	var views_1 = __webpack_require__(2);
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


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var views_1 = __webpack_require__(2);
	var types_1 = __webpack_require__(24);
	var SelectView = views_1.CollectionView.extend({
	    tagName: 'select',
	    events: {
	        'change': function (e) {
	            var selected = this.el.options[this.el.selectedIndex], cid = selected.getAttribute('cid'), child = views_1.utils.find(this.children, function (item) {
	                return item.cid === cid;
	            });
	            if (child == null) {
	                throw new types_1.FormError("could not find view for option " + cid);
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
	            throw new types_1.FormError('name property is required');
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
/* 24 */
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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

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
	var views_1 = __webpack_require__(2);
	var editor_1 = __webpack_require__(1);
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


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

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
	var views_1 = __webpack_require__(2);
	var editor_1 = __webpack_require__(1);
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


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/views/views.d.ts" />
	var types_1 = __webpack_require__(24);
	var views_1 = __webpack_require__(2);
	function errorToPromise(err) {
	    if (err instanceof Error || err instanceof types_1.FormValidationError) {
	        return Promise.reject(err);
	    }
	    else if (views_1.utils.isPromise(err)) {
	        return err;
	    }
	    return Promise.resolve(null);
	}
	exports.errorToPromise = errorToPromise;
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


/***/ }
/******/ ])
});
;