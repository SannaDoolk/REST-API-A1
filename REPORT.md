1. Explain and defend your implementation of HATEOAS in your solution.

I have tried to implement HATEOAS according to the HAL media type. I've choosen HAL because HATEOAS is new to me and it seemed easy to understand. I have an object called "_links" in my json response and contains a href to "self", pointing to the link you're currently watching. It also contains links to other resources that are related to the self url, and the point of this is to make it easier to browse around in the api. I think this aproach is pretty straight forward and easy to understand.  

2. If your solution should implement multiple representations of the resources. How would you do it?

I think I could have added code in my controller in the project to send the respons in different representation such as json and xml for example, and by that make it possible for a user to  get the respons in the content-type they choose in their request. 

3. Motivate and defend your authentication solution.
3a. What other authentication solutions could you implement?
3b. What are the pros/cons of this solution?

a) There are Basic Auth, OAuth 1.0, OAuth 2.0 for example.

b) Cons with JWT: Hard to revoke if the user misbehaves, especially a problem if the jwt is not set to expire within a short time. Also jwt:s are signed using cryptography which can be slow and there is a risk that the encryption method will be cracked. 

Pros with JWT: Can be used on different web services where one hold the private key and the other the public key so they don't have to be connected. Jwt:s can contain data that is useful (although not protected unless encrypted). Jwt:s will not work of they are manipulated.

Sources: https://fusionauth.io/learn/expert-advice/tokens/pros-and-cons-of-jwts, https://medium.com/@rahulgolwalkar/pros-and-cons-in-using-jwt-json-web-tokens-196ac6d41fb4 

4. Explain how your webhook works.

a) The user sends an URL by their choice along with a secret by a POST to /api/library/subscribe in json to get noted every time a new book is posted to the API. The user has to be logged in to do this.

b) The URL and secret provided by the user is saved in the Database as a Subscriber.

c) Every time a user posts a new book to the Database a POST request will be sent to every URL in the list of Subscribers in the database. Their saved secret will be sent in the request as ’private-token’ to make the request safer for the subscriber receiving the webhook. 

d) The subscriber will get information in json about the title, author, genre and description of the new book posted.


5. Since this is your first own web API, there are probably things you would solve in another way, looking back at this assignment. Write your thoughts about this.

My HATEOAS implementation could be better and more detailed, for example showing what kind of http method is used in a better way and other information that could be useful to the user. It would also probably been a good idea to implement refresh tokens for the jwt. 

6. Which "linguistic design rules" have you implemented? List them here and motivate "for each" of them very briefly why you choose them? Remember that you must consider "at least" FIVE "linguistic design rules" as the linguistic quality of your API.

*Forward slash separator (/) must be used to indicate a "hierarchical relationship”.* - This approach felt natural and like a good way to form the API.

*CRUD function names or their synonyms should not be used in URIs.* - This is something I have done in the past and realized it felt like unessecary information. 

*Hyphens (-) should be used to improve the readability of URIs.* - I have used to this to improve readability as it says.

*Underscores (_) should not be used in URIs.* - Since I used hyphens to improve readability it was natural to not use underscores. 

*Lowercase letters should be preferred in URI paths.* - This felt more natural, I think to include uppercase letters would make the uri:s seem strange, since this is not something you usually see. 

7. Did you do something extra besides the fundamental requirements? Explain them.

Did unfortunately not have time for this.

8. Do not miss it! A text document "LastName_API_Documentation.txt" where you will list your resource URIs and their corresponding brief descriptions. If you have a URI being used with multiple HTTP methods, you need to describe each pair of HTTP METHOD : URI separately. For example, if you have a resource URI as www.example.com/fish/types and you have HTTP methods GET, PUT, POST, and DELETE to perform something on that resource, you need to describe each pair of Method and URI briefly, e.g., what GET www.example.com/fish/types does, what PUT www.example.com/fish/types does, what DELETE www.example.com/fish/types does, and so on.