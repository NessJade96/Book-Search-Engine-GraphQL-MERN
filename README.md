# Book-Search-Engine-GraphQL-MERN

## Description:

Given starter code of a fully functioning Google Books API search engine built with a RESTful API, and refactor it to be a GraphQL API built with Apollo Server. The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and API. It's already set up to allow users to save book searches to the back end.

## User Setup:

To use this at home, in your terminal run the following commands to invoke the application:
`npm i` to install packages,
then `npm run start` starts the live server.

## User Story

```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Screenshots:

![image](./src/assets/)

## Links:

- GitHub repo: https://github.com/NessJade96/Book-Search-Engine-GraphQL-MERN
- Deploy:

## planning notes:

1. Copy the RESTful API starter code to convert to GraphQL

2. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.

3. Modify the existing authentication middleware so that it works in the context of a GraphQL API.

4. Create an Apollo Provider so that requests can communicate with an Apollo Server.

   > searchBooks.js line 34 (useEffect hooks to set local storage)

5. Deploy your application to Heroku with a MongoDB database using MongoDB Atlas.

## Commit notes:

1. Created Readme, setup folders, and created the mutations and queries on the backend of application.

2. Worked through the backend folders, server.js, index.js etc. to ensure everything was linking properly and tweeked some resolvers funcitons.

3. Using Apollo I was able to create the mutations and queries on the client side in the utils folder.

4. In the searchBooks.js file I implemented the useMutation() Hook to execute the SAVE_BOOK mutation in the handeSaveBook() function, coverting it to GraphQL.

5. In the savedBooks.js file I converted the functions with useQuery(GET_ME), and useMutation(REMOVE_BOOK), to update the GraphQL database.

6. The login and add user pages/requests converted over to GraphQL queries and mutations.

7. Removed all console logs to clean up code, added in the [savedBookIds] to line 37 in searchBooks.js so the userEffect will run each time that function is called. Also added in the refetchQueries in line 30 of the same file so the user would update and the saved books would refresh when you go onto the saved books page. Lastly, I had the wrong LOGIN_USER mutation variable names, fixed those and now the user can login successfully.

Thank you, Vanessa Bloom <(^.^)>
