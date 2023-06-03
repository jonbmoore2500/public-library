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
            
            <ul>
            {showForm ?
                <li>
                    <BookFormNew setShowForm={setShowForm}/>
                </li>
                :
                <li>
                    <label>Add a book to your library </label>
                    <button onClick={() => setShowForm(true)}>Open form</button>
                </li>
            }
            {user.owned_books.map((book) => (
                <li key={book.id}>
                    <BookCard book={book}/>
                </li>
            ))}
            </ul>
        </div>
    )
}


export default UserBooksCont