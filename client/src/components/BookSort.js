import React, {useState} from "react"

function BookSort() {

    const [sortType, setSortType] = useState("")
    const sortOptions = ["Title", "Genre", "Author", "Length"]

    return(
        <>
            <h3>Sort by: </h3>
            <form >
                <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
                    {sortOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default BookSort