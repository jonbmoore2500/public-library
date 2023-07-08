import React, {useState} from "react"

function BookSearch({handleSearchGet}) {

    const [searchText, setSearchText] = useState("")
    const [genre, setGenre] = useState("")

    function handleSearchSubmit(e) {
        e.preventDefault()
        if (searchText.length + genre.length > 0) {
            handleSearchGet(genre, searchText)
        }
    }
    const genres = [
        "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action and Adventure", "Crime and Mystery", "Romance", "Humor", "Horror",
        "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non fiction)"
        ]

    return(
        <>
            <h3>Sort by: </h3>
            <form onSubmit={handleSearchSubmit}>
                <input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value="">All genres</option>
                    <optgroup label="Fiction">
                        <option value="fict">All Fiction</option>
                        {genres.slice(0, 10).map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Non-fiction">
                        <option value="non_fict">All Non-fiction</option>
                        {genres.slice(11, 16).map((g, i) => (
                            <option key={i} value={g}>{g}</option>
                        ))}
                    </optgroup>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default BookSearch