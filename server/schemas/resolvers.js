const {User, Book} = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');

const resolvers = {
	Query: {
		// Get a single user by thier id or username
		User: async ({user = null, params}) => {
			const foundUser = await User.findOne({
				$or: [{_id: user ? user._id : params.id}, {username: params.username}],
			});
			if (!foundUser) {
				return;
			}
			return User.find(foundUser);
		},
	},
	Mutation: {
		// Login a user, sign a token, and send it back
		login: async (parent, {email, password}) => {
			const user = await User.findOne({email});
			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}
			const token = signToken(user);
			return {token, user};
		},
		// Creates a user, sign a token, and send it back
		addUser: async (parent, {username, email, password}) => {
			const user = await User.create({username, email, password});
			const token = signToken(user);
			return {token, user};
		},
		// save a book to a users 'savedBooks' field by adding it to the set (this prevents duplicates)
		saveBook: async (parent, {input}) => {
			const user = User.findOneAndUpdate(
				{_id: user._id},
				{$addToSet: {savedBooks: body}},
				{new: true, runValidators: true}
			);
			if (!user) {
				throw new AuthenticationError('No user found to update books');
			}
			return user;
		},
		// remove a book from `savedBooks`
		removeBook: async (parent, {bookId}) => {
			const book = Book.findOneAndDelete(
				{_id: user._id},
				{$pull: {savedBooks: {bookId: params.bookId}}},
				{new: true}
			);
			if (!book) {
				throw new AuthenticationError('No book under this Id to remove');
			}
			return book;
		},
	},
};

module.exports = resolvers;
