import React, {useState} from "react"

function EditUserModal({setEditModal, user, handleUpdate}) {

    const [newNeighbor, setNewNeighbor] = useState(user.neighborhood)
    const [newBio, setNewBio] = useState(user.bio)
    const [newGenre, setNewGenre] = useState(user.fav_genre)
    const [newAuthor, setNewAuthor] = useState(user.fav_author)
    const [errors, setErrors] = useState([])

    const hoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
    const genres = [
        "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action and Adventure", "Crime and Mystery", "Romance", "Humor", "Horror",
        "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non fiction)"
        ]

    function handleEditSubmit(e) {
        e.preventDefault()
        const editObj = {
            neighborhood: newNeighbor,
            bio: newBio, 
            fav_genre: newGenre,
            fav_author: newAuthor
        }
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    handleUpdate(data)
                    setEditModal(false)
                    setErrors([])
                })
            } else {
                r.json().then((e) => setErrors(e.errors))
            }
        })
    }

    return(
        <div className="modal">
            <div onClick={() => setEditModal(false)} className="overlay"></div> 
            <div className="modal-content">
                <form onSubmit={handleEditSubmit}>
                    <label>Change your Neighborhood: </label>
                    <select onChange={(e) => setNewNeighbor(e.target.value)} value={newNeighbor}>
                        {hoods.map((h, i) => (
                            <option key={i} value={h}>{h}</option>
                        ))}
                    </select>
                    <br></br>
                    <label>Change your Bio: </label>
                    <textarea 
                        onChange={(e) => setNewBio(e.target.value)}
                        value={newBio}
                        rows="4"
                        colums="1000"
                    />
                    <br></br>
                    <label>Change your Favorite Genre: </label>
                    <select onChange={(e) => setNewGenre(e.target.value)} value={newGenre}>
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
                    <br></br>
                    <label>Change your Favorite Author: </label>
                    <input 
                        onChange={(e) => setNewAuthor(e.target.value)}
                        value={newAuthor}
                    />
                    {errors && errors.map((e, i) => <p key={i}>{e}</p>)}
                    <br></br>
                    <button type="submit">Submit</button>
                    <button onClick={() => setEditModal(false)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EditUserModal