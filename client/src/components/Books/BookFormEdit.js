import React, {useState, useContext} from "react"
import { UserContext } from "../../contexts/UserContext.js"

const genres = [
    "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action & Adventure", "Crime & Mystery", "Romance", "Humor", "Horror",
    "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non-fiction)"
    ]

function BookFormEdit({setShowModal, book}) {

    const {deleteUserBook, updateUserBook} = useContext(UserContext)

    const [newNotes, setNewNotes] = useState(book.notes)
    const [newTitle, setNewTitle] = useState(book.title)
    const [newAuthor, setNewAuthor] = useState(book.author)
    const [newGenre, setNewGenre] = useState(book.genre)
    const [newHidden, setNewHidden] = useState(book.hidden)
    const [newCheckedOut, setNewCheckedOut] = useState(book.checked_out)
    const [errors, setErrors] = useState([])
    
    function handleEditSubmit() {

        fetch(`/books/${book.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: newTitle, author: newAuthor, genre: newGenre, notes: newNotes, hidden: newHidden, checked_out: newCheckedOut})
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((book) => {
                    updateUserBook(book)
                    setErrors([])
                    setShowModal(false)
                })
            } else {
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    function handleDeleteBook() {
        fetch(`/books/${book.id}`, {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                deleteUserBook(book.id)
                setErrors([])
            } else {
                r.json().then((e) => setErrors(e.errors))
            }
        })
    }

    return(
        <div className="modal">
            <div onClick={() => setShowModal(false)} className="overlay"></div> 
            <div className="modal-content">        
                <div>
                    <h2>Edit "{book.title}": </h2>
                </div>
                <div id="book-edit-grid">
                    <div id="book-edit-left">
                        <label>
                            Title:
                            <input 
                                onChange={(e) => setNewTitle(e.target.value)}
                                value={newTitle}
                            />
                        </label>
                        <br></br>
                        <label>
                            Author:
                            <input 
                                onChange={(e) => setNewAuthor(e.target.value)}
                                value={newAuthor}
                            />
                        </label>
                        <br></br>
                        <label>
                            Genre:
                            <select onChange={(e) => setNewGenre(e.target.value)} value={newGenre} >
                                <optgroup label="Fiction">
                                {genres.slice(0, 10).map((g, i) => (
                                    <option key={i} value={g}>{g}</option>
                                ))}
                                </optgroup>
                                <optgroup label="Non-fiction">
                                {genres.slice(11, 16).map((g, i) => (
                                    <option key={i} value={g}>{g}</option>
                                ))}
                                </optgroup>
                            </select>
                        </label>
                        <br></br>
                        <label>
                            Notes:                     
                            <textarea 
                                onChange={(e) => setNewNotes(e.target.value)}
                                value={newNotes}
                                rows="4"
                            />
                        </label>
                    </div>
                    <div id="book-edit-right">
                        <br></br>
                        <label>
                            <input type="checkbox" onChange={() => setNewHidden(!newHidden)}/>
                            {book.hidden ? "Unhide" : "Hide" }?
                        </label>
                        {book.checked_out ? 
                            <label>
                                <input type="checkbox" onChange={() => setNewCheckedOut(!newCheckedOut)}/>
                                Check in?
                            </label> : null
                        }
                        <br></br>
                        <button onClick={() => handleEditSubmit()} className="modal-btn">Save Edits?</button>
                        <br></br>
                        <button onClick={() => handleDeleteBook()} className="modal-btn">Delete Book</button>
                        <br></br>
                        <button onClick={() => setShowModal(false)} className="modal-btn">Close</button>
                    </div>
                </div>
                {errors && errors.map((e, i) => <p key={i}>{e}</p>)}
                <br></br>
            </div>
        </div>
    )
}

export default BookFormEdit