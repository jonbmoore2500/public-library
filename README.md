# README

## Public Library App

This is the "Public Library" app, fulfilling the requirements of my Phase 5 project at Flatiron. 

Inspired by Little Free Libraries (https://littlefreelibrary.org/), it offers a variety of features that allow users to swap books and track what books they and other people have available. A user can curate a list of books that they own, view books that other users own, handle the details of exchanging books with other users, and message other users. 

A video demonstrating the basic functionality of the app can be accessed at the following link:


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

App
 - base component, contains Home page (if not logged in) and all Routes (if logged in). Renders all Route components upon successful fetch of User data. 

Home
 - container component for SignInForm and SignupForm components, renders if there is not a logged in User

SignInForm
 - Allows for a User to sign in. Provides User data to UserContext, causing Routes to render in App component, and provides UserID to Sessions.

SignUpForm
 - Allows a User to create a new User account. Upon successful sign up, provides User data to UserContext, causing Routes to render in App component, and provides UserID to Sessions.

Header
 - Contains title of app, name of logged in User, and logout button. Logging out removes User data from UserContext and UserID from Sessions. 

Layout
 - Provides links to all top level client-side Routing components.

UserProfile
 - Lists key info about the logged in User, includes a button to open EditUserModal

EditUserModal
 - allows User to change certain attributes

UserBooksCont
 - Container component for User's books data, including all of User's books via BookCard component and a form to create a new book via BookFormNew

BookFormNew
 - Form allowing a User to create a new book belonging to them, assigning all attributes including title, author, and hidden.

BookCard
 - Displays info about a book, with certain pieces of info dependent on whether it is owned by the current User
 - Includes either a button to open an edit form via BookFormEdit or to open a borrowing form via BookBorrowModal

BookFormEdit
 - allows a User who owns the book to edit information about that book or delete the book altogether

BookBorrowModal
 - Allows a User to make a borrow request for a book, creating an Exchange object
 - Includes NewMessageForm
 
NewMessageForm
 - Form allowing the User to create a new Message object and send a message to another User. If a conversation between the two Users does not already exist, the form sends a request to the Conversations controller instead, where a Conversation object and a Message object are created

UserExchangesCont
 - Container component for Exchanges involving the User, both lending and borrowing

ExchangeCardLend
 - Provides info for an exchange involving a Book belonging to the logged-in User
 - Allows the User to update the exchange and send a Message to the User borrowing the book

ExchangeCardBorrow
 - Provides info for an exchange involving a Book being borrowed by the logged-in User
 - Allows the User to update the exchange and send a Message to the User who owns the Book

LibraryLayout
 - Provides the links for the nested Routes for the LibraryBrowse and LibrarySearch components

LibraryBrowse
 - receives an array of Books from the useLibraryGet custom hook, mapping them into BookCard components
 - includes the main Infinite Scroll section of the app

LibrarySearch
 - Allows User to search by keyword and genre for available Books through the LibrarySearch component, mapping them into BookCard components

BookSearch
 - Handles the search function for the LibrarySearch component

ProfilesLayout
 - receives the array of Profiles from ProfilesContext, mapping them into Links that will populate the ProfileCont component

ProfileCont
 - Displays info about a given User other than the logged-in User, including an array of their owned Books mapped into BookCard components

MessagesCont
 - Similarly to ProfilesLayout, maps the names of other Users from the logged-in User's Conversations to ConvoCard components
 - Contains the ConvoContainer component, displaying the Messages from the selected ConvoCard

ConvoCard
 - Identifies the Conversation to display in the ConvoContainer component

ConvoContainer
 - Links to the other User's profile
 - Maps messages into MessageCard components
 - Provides the NewMessageForm

MessageCard
 - Includes the text of a given message, styled via CSS to show which User participating in the Conversation sent it. 
 - On click will toggle showing/not showing the time the Message was created


#### Context

Public Library includes 2 context components in order to incorporate global state - one for User data (including all nested data) and one for other users. A possible future update involves dividing the User data into multiple, more specific contexts for some of the nested data in order to more clearly separate concerns. 

The UserContext contains the fetch request that identifies the logged-in User from the Sessions data, and provides that User object to assorted other components as needed, including the User's nested books, exchanges, and messages. It also includes the functions necessary to add any new nested items to the global state, as well as update or delete items that are already included. 

The ProfilesContext contains the fetch request that identifies the names and ids of all users other than the logged-in User. These Profiles are displayed as links in the Profiles route, triggering a fetch request for the specific profile data upon selection.

#### Infinite Scroll

The Phase 5 project at Flatiron requires the incorporation of a feature not covered in the curriculum - I chose an infinite scroll. The LibraryBrowse component and the custom useLibraryGet hook help handle this in the front end while the Kaminari gem used in the books_controller file deals with pagination in the back end. 

https://github.com/kaminari/kaminari

A Medium blog post I wrote about my experience incorporating this feature can be accessed at: 
https://medium.com/@jonathanmoorevla/learning-the-art-of-the-infinite-scroll-45eb7641daec

### Server

Public Library uses Ruby on Rails as an API, serving JSON data to the React front end. It uses PostreSQL as a database system in order to facilitate deployment using Render, which requires PostgreSQL.

#### Table Organization

At the current stage Public Library has 5 tables, creating multiple many-to-many relationships branching from Users. A wireframe chart displahing the relationships graphically can be found at the following Google Drive link: 
https://drive.google.com/file/d/14Et8RNLoJIVXiihuiozMlg_hWk8MOmMn/view?usp=sharing 

Possible options for additional tables are identified in the Roadmap section at the end of this README.

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
 - Option to rate other users following completion of exchanges
