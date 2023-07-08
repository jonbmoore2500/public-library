import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function BookFormNew({setShowForm}) {

    const {addUserBooks} = useContext(UserContext)

    const genres = [
        "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action & Adventure", "Crime & Mystery", "Romance", "Humor", "Horror",
        "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non-fiction)"
        ]

    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newGenre, setNewGenre] = useState(genres[0])
    const [newNumPages, setNewNumPages] = useState("")
    const [newNotes, setNewNotes] = useState("")
    const [newHardback, setNewHardback] = useState(true)
    const [newHidden, setNewHidden] = useState(false)
    const [errors, setErrors] = useState([])

    function handleNewBookSave(e) {
        e.preventDefault()
        const newBookObj = {
            title: newTitle, 
            author: newAuthor, 
            genre: newGenre, 
            num_pages: Number.parseInt(newNumPages), 
            notes: newNotes,
            hardback: newHardback,
            hidden: newHidden,
            checked_out: false
        }
        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBookObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((book) => {
                    addUserBooks(book)
                    setErrors([])
                })
            } else {
                r.json().then(e => setErrors(e.errors))
            }
        })
    }

    return(
        <div>   
            <form onSubmit={handleNewBookSave}>
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
                <br></br>
                <label>Genre: </label>
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
                <label>Number of pages: </label>
                <input
                    onChange={(e) => setNewNumPages(e.target.value)}
                    value={newNumPages}
                />
                <label>Notes: </label>
                <textarea
                    onChange={(e) => setNewNotes(e.target.value)}
                    value={newNotes}
                    rows="4"
                />
                <br></br>
                <label>Book type: </label>
                <select onChange={(e) => setNewHardback(e.target.value)}>
                    <option value={true}>Hardback</option>
                    <option value={false}>Paperback</option>
                </select>
                <label>Set as hidden: </label>
                <select onChange={(e) => setNewHidden(e.target.value)}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                {errors && errors.map((e, i) => <p key={i}>{e}</p>)}
                <br></br>
                <button type="submit">Submit new book</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default BookFormNew