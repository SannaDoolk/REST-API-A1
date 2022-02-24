**GET https://cscloud8-128.lnu.se/api/library** - Root of the application.

**POST https://cscloud8-128.lnu.se/api/library/user/register** - Registers a user with a username and a password. 

**POST https://cscloud8-128.lnu.se/api/library/user/login** - Log in a user with registered username and a password.

**GET https://cscloud8-128.lnu.se/api/library/books** - Gets all books posted in the database.

**GET https://cscloud8-128.lnu.se/api/library/books/genre/{search}** - Gets all books by a specific genre.

**POST https://cscloud8-128.lnu.se/api/library/books/book** - Lets a user post a book with title, author, description and genre to the database.

**GET https://cscloud8-128.lnu.se/api/library/books/book/{id}** - Gets a specific book by its ID.

**PUT https://cscloud8-128.lnu.se/api/library/books/book/{id}** - Updates a specific book by its ID completely with title, author, description and genre.

**DELETE https://cscloud8-128.lnu.se/api/library/books/book/{id}** - Deletes a specific book by its ID.

**GET https://cscloud8-128.lnu.se/api/library/user/{username}** - Gets a specific user by its username. 

**GET https://cscloud8-128.lnu.se/api/library/user/:username/uploaded-books** - Gets all books uploaded by a specific user.

**POST https://cscloud8-128.lnu.se/api/library/subscribe** - Lets a user subscribe for the webhook.