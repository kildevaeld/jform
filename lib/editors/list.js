var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var views_1 = require('views');
var types_1 = require('../types');
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
