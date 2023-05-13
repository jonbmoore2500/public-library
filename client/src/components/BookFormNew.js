import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"


function BookFormNew() {

    const {updateUserBooks} = useContext(UserContext)
    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newGenre, setNewGenre] = useState("")
    const [newNumPages, setNewNumPages] = useState("")
    const [newNotes, setNewNotes] = useState("")
    const [newHardback, setNewHardback] = useState(true)
    const [newHidden, setNewHidden] = useState(false)

    function handleNewBookSave(e) {
        e.preventDefault()
        const newBookObj = {
            title: newTitle, 
            author: newAuthor, 
            genre: newGenre, 
            num_pages: Number.parseInt(newNumPages), 
            notes: newNotes,
            hardback: newHardback === "true",
            hidden: newHidden === "true",
            checked_out: false
        }
        console.log(newBookObj)
        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBookObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(book => updateUserBooks(book))
            } else {
                r.json().then(errors => console.log(errors))
            }
        })
    }

    return(
        <div>   
            <form onSubmit={handleNewBookSave}>
                <h3>Add a book to your library: </h3>
                <label>Title: </label>
                <input
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
                />
                <label>Author: </label>
                <input
                    onChange={(e) => setNewAuthor(e.target.value)}
                    value={newAuthor}
                />
                <label>Genre: </label>
                <input
                    onChange={(e) => setNewGenre(e.target.value)}
                    value={newGenre}
                />
                <label>Number of pages: </label>
                <input
                    onChange={(e) => setNewNumPages(e.target.value)}
                    value={newNumPages}
                />
                <label>Notes: </label>
                <input
                    onChange={(e) => setNewNotes(e.target.value)}
                    value={newNotes}
                />
                <label>Book type: </label>
                <select onChange={(e) => setNewHardback(e.target.value)}>
                    <option value={true}>Hardback</option>
                    <option value={false}>Paperback</option>
                </select>
                <label>Set as hidden: </label>
                <select onChange={(e) => setNewHidden(e.target.value)}>
                    <option value={true}>Yes, hide it</option>
                    <option value={false}>No, display it</option>
                </select>
                <button type="submit">Submit new book</button>
            </form>
        </div>
    )
}

export default BookFormNew