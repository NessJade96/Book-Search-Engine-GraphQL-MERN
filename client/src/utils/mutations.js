import {gql} from '@apollo/client';

export const ADD_USER = gql`
	mutation Mutation($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation Login($loginEmail2: String!, $loginPassword2: String!) {
		login(email: $loginEmail2, password: $loginPassword2) {
			token
			user {
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation SaveBook($input: BookInput) {
		saveBook(input: $input) {
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation RemoveBook($bookId: ID!) {
		removeBook(bookId: $bookId) {
			savedBooks {
				bookId
			}
		}
	}
`;
