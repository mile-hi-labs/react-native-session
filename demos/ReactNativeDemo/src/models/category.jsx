import AppModel from 'models/app';

class Category extends AppModel {
	constructor(type, store, props = {}) {
		super(type, store, props);

		// Attrs
		this.photo = props.photo;
		this.title = props.title;


		// Relationships
		this.books = this.hasMany('book', props.books);
	}
}

export default Category;
