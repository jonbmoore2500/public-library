import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function BookFormNew({setShowForm}) {

    const {addUserBooks} = useContext(UserContext)

    const genres = ["Science Fiction", "Mystery", "Romance", "Thriller", "Horror", "Fantasy", "Historical Fiction", "Young Adult", "Biography", "Self-Help", "Academic"]

    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newGenre, setNewGenre] = useState("Science Fiction")
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
            hardback: newHardback === "true",
            hidden: newHidden === "true",
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
                <label>Genre: </label>
                <select onChange={(e) => setNewGenre(e.target.value)} value={newGenre}>
                    {genres.map((g, i) => (
                        <option key={i} value={g}>{g}</option>
                    ))}
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
                {errors && errors.map((e, i) => <p key={i}>{e}</p>)}
                <br></br>
                <button type="submit">Submit new book</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default BookFormNew