import React, { Fragment } from 'react';
import { LoadingSkeleton } from 'components/vendors/loading-skeleton-wrapper';
import { BookListCard } from 'components/book/book-card';


const BookList = (props) => {
	const { type = 'list', books = [], loading, onPress } = props;

	// Render
	if (loading) {
		return <LoadingSkeleton type={type}/>
	}
	if (books.length > 0) {
		return (
			<Fragment>
				{books.map(book => (
					<BookListCard
						key={message.id}
						book={book}
						loading={loading}
						onPress={onPress}
					/>
				))}
			</Fragment>
		)
	}
	return <Text>Sorry, we don't have any users...</Text>
}

export default BookList;
