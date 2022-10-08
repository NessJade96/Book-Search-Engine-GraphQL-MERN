import React from 'react';
import {Jumbotron, Container, CardColumns, Card, Button} from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';

import Auth from '../utils/auth';

import {GET_ME} from '../utils/queries';
import {REMOVE_BOOK} from '../utils/mutations';
import {removeBookId} from '../utils/localStorage';

const SavedBooks = () => {
	// executes the GET_ME query on load and saves it to a variable baned userData
	const userData = useQuery(GET_ME);
	console.log(
		'🚀 ~ file: SavedBooks.js ~ line 14 ~ SavedBooks ~ userData',
		userData
	);

	const usersBooks = userData.data.me.savedBooks;

	const [deleteBook] = useMutation(REMOVE_BOOK);

	// create function that accepts the book's mongo _id value as param and deletes the book from the database
	const handleDeleteBook = async (bookId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}
		try {
			await deleteBook({variables: {bookId}});

			// upon success, remove book's id from localStorage
			removeBookId(bookId);
		} catch (err) {
			console.log('something went wrong :(');
			console.error(err);
		}
	};

	// if data isn't here yet, say so
	if (!usersBooks.length) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<Jumbotron fluid className="text-light bg-dark">
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</Jumbotron>
			<Container>
				<h2>
					{usersBooks.length
						? `Viewing ${usersBooks.length} saved ${
								usersBooks.length === 1 ? 'book' : 'books'
						  }:`
						: 'You have no saved books!'}
				</h2>
				<CardColumns>
					{usersBooks.map((book) => {
						return (
							<Card key={book.bookId} border="dark">
								{book.image ? (
									<Card.Img
										src={book.image}
										alt={`The cover for ${book.title}`}
										variant="top"
									/>
								) : null}
								<Card.Body>
									<Card.Title>{book.title}</Card.Title>
									<p className="small">Authors: {book.authors}</p>
									<Card.Text>{book.description}</Card.Text>
									<Button
										className="btn-block btn-danger"
										onClick={() => handleDeleteBook(book.bookId)}
									>
										Delete this Book!
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container>
		</>
	);
};

export default SavedBooks;
