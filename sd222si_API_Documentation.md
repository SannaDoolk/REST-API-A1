**GET https://cscloud8-128.lnu.se/api/library** - Root of the application.

**POST https://cscloud8-128.lnu.se/api/library/user/register** - Registers a user with a username and a password. Expects a username (unique for the database) and a password in JSON.

**POST https://cscloud8-128.lnu.se/api/library/user/login** - Log in a user with registered username and a password. Expects the registered username and password from the user in JSON.

**GET https://cscloud8-128.lnu.se/api/library/books** - Gets all books saved in the database.

**GET https://cscloud8-128.lnu.se/api/library/books/genre/{search}** - Gets all books by a specific genre.

**POST https://cscloud8-128.lnu.se/api/library/books/book** - Lets a user post a book in JSON with title, author, description and genre to the database.

**GET https://cscloud8-128.lnu.se/api/library/books/book/{id}** - Gets a specific book by the book's ID.

**PUT https://cscloud8-128.lnu.se/api/library/books/book/{id}** - Updates a specific book by the book's ID completely with title, author, description and genre in JSON.

**DELETE https://cscloud8-128.lnu.se/api/library/books/book/{id}** - Deletes a specific book by its ID.

**GET https://cscloud8-128.lnu.se/api/library/user/{username}** - Gets a specific user by its username. 

**GET https://cscloud8-128.lnu.se/api/library/user/:username/uploaded-books** - Gets all books uploaded by a specific user.

**POST https://cscloud8-128.lnu.se/api/library/subscribe** - Lets a user subscribe for the webhook. Expects a url and a secret in JSON.