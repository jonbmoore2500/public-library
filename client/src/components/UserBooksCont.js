import React, {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext.js"
import BookCard from "./BookCard.js"
import BookFormNew from "./BookFormNew.js"


function UserBooksCont() {

    const {user} = useContext(UserContext)
    const [showForm, setShowForm] = useState(false)


    return(
        <div>
            <h2>Chapter 2: Your Books</h2>
            
            <div>
            {showForm ?
                <div>
                    <BookFormNew setShowForm={setShowForm}/>
                </div>
                :
                <div>
                    <label>Add a book to your library </label>
                    <button onClick={() => setShowForm(true)}>Open form</button>
                </div>
            }
            {user.owned_books.map((book) => (
                <div key={book.id} className="book-card">
                    <BookCard book={book}/>
                </div>
            ))}
            </div>
        </div>
    )
}


export default UserBooksCont