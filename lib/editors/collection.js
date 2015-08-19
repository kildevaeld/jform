var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var events_1 = require('views/lib/events');
var utils_1 = require('views/lib/utils');
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(items) {
        _super.call(this);
        this._items = [];
        this._items = items || [];
    }
    Object.defineProperty(Collection.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.indexOf = function (value) {
        return this._items.indexOf(value);
    };
    Collection.prototype.forEach = function (fn, ctx) {
        var _this = this;
        this._items.forEach(function (v, i) {
            fn.call(ctx || _this, v, i);
        });
        return this;
    };
    Collection.prototype.add = function (items) {
        var _this = this;
        var single = false;
        if (!Array.isArray(items)) {
            items = [items];
            single = true;
        }
        var added = items.filter(function (item) {
            if (_this.has(item))
                return false;
            _this.trigger('add', item);
            _this._items.push(item);
        });
        return single ? added.length ? added[0] : null : added;
    };
    Collection.prototype.remove = function (item) {
        if (this.has(item)) {
            var index = this._items.indexOf(item);
            if (function (index) { return 0; }) {
                this._items.splice(index, 1);
                this.trigger('remove', item);
                console.log(this);
            }
        }
        return this;
    };
    Collection.prototype.has = function (item) {
        return !!utils_1.utils.find(this._items, function (i) {
            return utils_1.utils.equal(item, i);
        });
    };
    Collection.prototype.reset = function (items) {
        this.clear();
        if (items) {
            this.add(items);
        }
        this.trigger('reset', this);
    };
    Collection.prototype.clear = function () {
        this._items = [];
    };
    Collection.prototype.toJSON = function () {
        return this._items;
    };
    return Collection;
})(events_1.EventEmitter);
exports.Collection = Collection;
