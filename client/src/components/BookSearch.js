import React, {useState} from "react"

function BookSearch({handleSearchGet}) {

    const [searchText, setSearchText] = useState("")
    const [genre, setGenre] = useState("")

    function handleSearchSubmit(e) {
        e.preventDefault()
        handleSearchGet(genre, searchText)
    }
    const allowed_genres = ["Science Fiction", "Mystery", "Romance", "Thriller", "Horror", "Fantasy", "Historical Fiction", "Young Adult", "Biography", "Self-Help", "Academic"]

    return(
        <>
            <h3>Sort by: </h3>
            <form onSubmit={handleSearchSubmit}>
                <input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                    <option value="">All genres</option>
                    {allowed_genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default BookSearch