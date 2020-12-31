import AppModel from 'models/app';

class Author extends AppModel {
	constructor(type, store, props = {}) {
		super(type, store, props);

		// Attrs
		this.photo = props.photo;
		this.name = props.name;


		// Relationships
		this.books = this.hasMany('book', props.books);
	}
}

export default Author;
