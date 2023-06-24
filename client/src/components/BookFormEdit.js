import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function BookFormEdit({setShowModal, book}) {

    const {deleteUserBook, updateUserBook} = useContext(UserContext)

    const [newNotes, setNewNotes] = useState(book.notes)
    const [newHidden, setNewHidden] = useState(book.hidden)
    const [newCheckedOut, setNewCheckedOut] = useState(book.checked_out)
    
    function handleEditSubmit(e) {
        e.preventDefault()
        fetch(`/books/${book.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({notes: newNotes, hidden: newHidden, checked_out: newCheckedOut})
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((book) => {
                    updateUserBook(book)
                    setShowModal(false)
                })
            } else {
                r.json().then(e => console.log(e))
            }
        })
    }

    function handleDeleteBook() {
        fetch(`/books/${book.id}`, {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                deleteUserBook(book.id)
            } else {
                r.json().then((e) => console.log(e))
            }
        })
    }

    return(
        <div className="modal">
            <div onClick={() => setShowModal(false)} className="overlay"></div> 
            <div className="modal-content">
                <h3>Edit "{book.title}": </h3>
                <form onSubmit={handleEditSubmit}>
                    <label>Edit Notes: </label>
                    <textarea 
                        onChange={(e) => setNewNotes(e.target.value)}
                        value={newNotes}
                        rows="4"
                    />
                    <label>
                        <input type="checkbox" onChange={() => setNewHidden(!newHidden)}/>
                        {book.hidden ? "Unhide" : "Hide" }?
                    </label>
                    {book.checked_out ? 
                    <label>
                        <input type="checkbox" onChange={() => setNewCheckedOut(!newCheckedOut)}/>
                        Check in?
                    </label> : null}
                    <button type="submit">Save Edits?</button>
                </form>
                <br></br>
                <button onClick={() => handleDeleteBook()}>Delete Book</button>
                <button onClick={() => setShowModal(false)}>Close</button>
            </div>
        </div>
    )
}

export default BookFormEdit