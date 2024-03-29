import React, {useContext, useState} from "react"
import { UserContext } from "../../contexts/UserContext.js"
// import BookCard from "../Books/BookCard.js"
import BookCard from "../Books/BookCard.js"
import BookFormNew from "../Books/BookFormNew.js"

function UserBooksCont() {

    const {user} = useContext(UserContext)
    const [showForm, setShowForm] = useState(false)
    const [filterBy, setFilterBy] = useState("all")

    let displayBooks = user.owned_books.filter(book => {
        switch (filterBy) {
            case "availableYes":
                return !(book.hidden || book.checked_out);
            case "availableNo":
                return book.hidden || book.checked_out;
            case "checkedOut":
                return book.checked_out;
            case "hidden":
                return book.hidden;
            default:
                return true;
        }
    })

    return(
        <div>
            <div className="chapter-content">
                <br></br>
                <div>
                    <label>Add a book to your library </label>
                    <button onClick={() => setShowForm(true)}>Open form</button>
                </div>
                <select onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="all">All</option>
                    <option value="availableYes">Available</option>
                    <option value="availableNo">Unavailable</option>
                    <option value="checkedOut">Checked Out</option>
                    <option value="hidden">Hidden</option>
                </select>
                {displayBooks.length > 0 ?
                    <div id="books-grid">
                        {displayBooks.map((book) => (
                            <div key={book.id} className="book-card-new">
                                <BookCard book={book}/>
                            </div>
                        ))}
                    </div>
                :
                    <h2>No books meet this criteria</h2>
                }
                <br></br>
                <br></br>
            </div>
            {showForm ? <BookFormNew setShowForm={setShowForm}/> : null }
        </div>
    )
}

export default UserBooksCont