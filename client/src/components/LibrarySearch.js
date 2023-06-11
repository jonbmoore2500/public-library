import React, {useState} from "react"
import BookCard from "./BookCard"
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

    function handleExchanged(bookID) {
        setDispBooks(dispBooks.filter(b => b.id !== bookID))
    }

    return(
        <div>
            <h2>Chapter 4: Public Library</h2>
            <h3>Search</h3>
            <BookSearch handleSearchGet={handleSearchGet}/>
            {dispBooks.length >= 1 ? 
            <ul>
                {dispBooks.map((b) => (
                    <li key={b.id}>
                        <BookCard book={b} owned={false} handleExchanged={handleExchanged}/>
                    </li>
                ))}
            </ul>
            :    
            <>
                {searched ? 
                <h3>No results</h3>
                :
                <h3>Enter search terms and/or choose a genre to display books</h3>
                }
            </>
            }
        </div>
    )
}

export default LibrarySearch