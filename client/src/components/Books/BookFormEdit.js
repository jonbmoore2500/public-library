import React, {useState, useContext} from "react"
import { UserContext } from "../../contexts/UserContext.js"

function BookFormEdit({setShowModal, book}) {

    const {deleteUserBook, updateUserBook} = useContext(UserContext)

    const [newNotes, setNewNotes] = useState(book.notes)
    const [newHidden, setNewHidden] = useState(book.hidden)
    const [newCheckedOut, setNewCheckedOut] = useState(book.checked_out)
    const [errors, setErrors] = useState([])
    
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
                <h3>Edit "{book.title}": </h3>
                <form onSubmit={handleEditSubmit}>
                    <label>Edit Notes: </label>
                    <textarea 
                        onChange={(e) => setNewNotes(e.target.value)}
                        value={newNotes}
                        rows="4"
                    />
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
                    <button type="submit">Save Edits?</button>
                </form>
                {errors && errors.map((e, i) => <p key={i}>{e}</p>)}
                <br></br>
                <button onClick={() => handleDeleteBook()}>Delete Book</button>
                <button onClick={() => setShowModal(false)}>Close</button>
            </div>
        </div>
    )
}

export default BookFormEdit