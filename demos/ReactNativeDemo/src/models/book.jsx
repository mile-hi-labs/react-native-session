import AppModel from 'models/app';
import { truncate } from 'utils/transforms';

class Book extends AppModel {
	constructor(type, store, props = {}) {
		super(type, store, props);

		// Attrs
		this.photo = props.photo;
		this.title = props.title;
		this.description = props.description;
		this.printType = props.printType;
		this.language = props.language;

		// Nested
		this.urls = {
			webUrl: props.webUrl,
		}


		// Relationships
		this.authors = this.hasMany('author', props.authors);
		this.categories = this.hasMany('category', props.categories);
		this.publishers = this.hasMany('publisher', props.publishers);
	}

	get printTypeOptions() {
		return ['Paper', 'HardBack', 'Digital'];
	}

	get languageOptions() {
		return ['Dutch', 'English', 'French', 'German', 'Italian'];
	}

	get previewDescription() {
		return this.description ? truncate(this.description, 60, true) : '--'
	}

	get url() {
		return `/book/${this.id}`
	}
}

export default Book;
