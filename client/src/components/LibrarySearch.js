import React, {useState} from "react"
import BookCard from "./BookCard"
// import BookSort from "./BookSort"
import BookSearch from "./BookSearch"

function LibrarySearch() {

    const [dispBooks, setDispBooks] = useState([])
    const [searched, setSearched] = useState(false)

    
    function handleSearchGet(searchGenre, searchText) {
        fetch(`/book_search?genre=${searchGenre}&text=${searchText}`)
        .then(r => r.json())
        .then((data) => {
            setDispBooks(data)
            setSearched(true)
        })
    }

    return(
        <div>
            <h3>search</h3>
            {/* <BookSort /> */}
            <BookSearch handleSearchGet={handleSearchGet}/>
            {dispBooks.length >= 1 ? 
            <>
                {dispBooks.map((b) => (
                    <BookCard key={b.id} book={b} />
                ))}
            </>
            :    
            <>
                {searched ? 
                <h3>No results</h3>
                :
                <h3>Enter search terms or a filter category to display books</h3>
                }
            </>
            }
        </div>
    )
}

export default LibrarySearch