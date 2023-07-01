# README

## Public Library App

This is the "Public Library" app, fulfilling the requirements of my Phase 5 project at Flatiron. 

Inspired by Little Free Libraries (https://littlefreelibrary.org/), it offers a variety of features that allow users to swap books and track what books they and other people have available. A user can curate a list of books that they own, view books that other users own, handle the details of exchanging books with other users, and message other users. 

### Sessions and Cookies

Logging in assings the :user_id from the User resource as the :user_id in sessions, allowing the ability to stay logged in and to authenticate certain routes, namely user.update, book.delete, and message.create. A user can only update or delete (as appropriate) resources that they created or are assigned the responsibility for deleting if desired. 

## Deployed

This app is currently deployed through Render at the following URL: 


However, if you'd like to run it locally perform the following steps:

(make sure you have Rails and PostreSQL installed)

$ bundle install
$ rails db:create
$ rails db:migreate db:seed
$ rails server

In the client folder:

$ npm install
$ npm start

### Client

Public Library utilizes a React client, incorporating Client-Side Routing to separately render a user's Profile Page, a user's Library, a user's Exchanges, the Public Library, and a Messaging Center. There are additional nested routes within the Public Library route for Browsing and Searching, respectively. On logging out useHistory returns to the index route, making sure that the next user to log in will view the proper component upon logging in.

#### Components



#### Context

Public Library includes 2 context components in order to incorporate global state - one for User data (including all nested data) and one for other users. A possible future update involves dividing the User data into multiple, more specific contexts for some of the nested data in order to more clearly separate concerns. 

The UserContext contains the fetch request that identifies the logged-in User from the Sessions data, and provides that User object to assorted other components as needed, including the User's nested books, exchanges, and messages. It also includes the functions necessary to add any new nested items to the global state, as well as update or delete items that are already included. 

The ProfilesContext contains the fetch request that identifies the names and ids of all users other than the logged-in User. These Profiles are displayed as links in the Profiles route, triggering a fetch request for the specific profile data upon selection.

#### Infinite Scroll

The Phase 5 project at Flatiron requires the incorporation of a feature not covered in the curriculum - I chose an infinite scroll. The LibraryBrowse component and the custom useLibraryGet hook help handle this in the front end while the Kaminari gem used in the books_controller file deals with pagination in the back end. 

### Server



#### Table Organization

At the current stage Public Library has 5 tables, creating multiple many-to-many relationships branching from Users. A wireframe chart displahing the relationships graphically can be found at the following Google Drive link: 


#### Models

Specific attributes can be viewed in the schema.rb file. Basic descriptions and explanations of relationships and certain key validations are provided below.

##### Users
 
Contains info about a User, including login credentials and a bio. 

 - has_many books
 - has_many exchanges
 - has_many books through exchanges
 - has_many messages (2 types, s_messages and r_messages corresponding to sender_id and recipient_id)
 - has_many conversations through messages (due to requirements of this table format there are 2 types, s_conversations and r_conversations, depending on what type the message is)

 ##### Books

 Contains assorted info about a Book, including basic details like title and author as well as exchange-related booleans like checked_out and hidden.

 - belongs_to user (alias - owner)
 - has_many exchanges
 - has_many users through exchanges

Due to the multi-faceted relationship between books and users (users own books, but also borrow them through exchanges) one of the relationships required an alias. 

##### Exchanges

Tracks an exchange where a user borrows a book that belongs to another user. Acts as a join table for Users and Books. Includes assorted booleans tracking the different stages of an exchange. Validations make sure there can be only 1 active exchange at a time for a given book.

 - belongs_to user
 - belongs_to book

##### Conversations

Provides no real data, used purely for organization purposes through the many-to-many relationship with Users.

 - has_many messages
 - has_many users through messages
 
##### Messages

Allows Users to send each other messages. Validations make sure that all messages belonging to a conversation involve the same 2 users, and that a given message's sender and recipient are different. 

 - belongs_to conversation (2 types, matching the types described in the Users section. s_conversations and r_conversations)
 - belongs_to user (aliases - sender, recipient)

## Roadmap

Options for future expansion/development:

 - Adding infinite scroll to additional locations. Other user books, messages, or even lists of users in the explore page if the number of users gets great enough to merit it
 - Add options to send contact info through messages with a click. 
 - Randomize pagination, with consistency in a session
 - Add password change option
 - Refine exchange cards - add information about how long the exchange has been active, nudge the other user, etc
 - Make messages real-time, learn WebSprocket or similar method
 - Add notifications for new messages or exchange requests
 - Allow option to favorite/follow other users, seeing when they add new books
 - Option to favorite other books, getting notifications when they are available
