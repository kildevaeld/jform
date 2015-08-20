
import {TemplateFunction, View, DataView, ICollection, IModel,
	CollectionView, CollectionViewOptions, utils, Collection, Model} from 'views'
import {IEditor, EditorOptions, CollectionEditor} from './editor'
import {FormValidationError, FormError} from '../types'


export interface ListEditorOptions<U extends IModel> extends CollectionViewOptions, EditorOptions {
	items?: U[]
	values?: U[]

}

const Template = `
<select></select>
<ul class="selected-list"></ul>
`
const SelectView = CollectionView.extend({
	tagName: 'select',
	events: {
		'change': function(e) {
						let selected = this.el.options[this.el.selectedIndex],
				cid = selected.getAttribute('cid'),
				child = utils.find<DataView<HTMLElement>>(this.children, (item) => {
					return item.cid === cid
				})

						if (child == null) {
				throw new FormError(`could not find view for option ${cid}`)
						}

						this.trigger('select', child.model)

		}
	},
	childView: DataView.extend({
		tagName: 'option',
		template: function(data: any): string {
			this.el.setAttribute('value', data.value)
			this.el.setAttribute('cid', this.cid)
			return data.name
		}
	}, {})
}, {})


export class ListEditorModel extends Model {
	idAttribute = 'value'
}

export class ListEditor<U extends IModel> extends View<HTMLDivElement> implements IEditor {
	private _name: string
	private _values: Collection<U>

	private _selectView: CollectionView<HTMLSelectElement>
	private _listView: CollectionView<HTMLUListElement>

	public get name() { return this._name }

	public get val(): U[] {
		return this.getValue()
	}

	public set val(value: U[]) {
		this.setValue(value)
	}

	constructor(options: ListEditorOptions<U>) {

		if (options.items) {
			options.collection = new Collection<ListEditorModel>(<any>options.items, {model:ListEditorModel})
		}

		this._name = options.name
		this._values = new Collection<U>(options.values || [])

		this._selectView = new SelectView({
			collection: options.collection || new Collection<U>([])
		})

		this._listView = new CollectionView<HTMLUListElement>({
			tagName: 'ul',
			collection: this._values,
			childViewOptions: {
				triggers: {
					'click': 'click'
				},
				tagName: 'li',
				template: function(data: any): string {
					return data.name
				}
			}
		})

		this.listenTo(this._listView, 'childview:click', function({model}) {
			this._values.remove(model)
		})

		this.listenTo(this._selectView, 'select', (model) => {
			this._values.add(model.clone())
		})

		if (this.name == null) throw new FormError('name property is required')

		super(options)
	}

	setValue(values: U[]) {
		this._values.reset(values)
	}

	getValue(): U[] {
		return this._values.toJSON()
	}

	clear() {
		this._values.reset([])
	}

	validate(): FormValidationError {

		return null
	}

	render() {
		this.el.appendChild(this._selectView.render().el)
		this.el.appendChild(this._listView.render().el)
		return this
	}

	destroy() {
		this._selectView.destroy()
		this._listView.destroy()

		super.destroy()
	}
}

