import React, {useState} from "react"
import BookCard from "./BookCardOLD"
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
        <div className="lib-content">
            <h3><u>Search</u></h3>
            <BookSearch handleSearchGet={handleSearchGet}/>
            {dispBooks.length >= 1 ? 
            <div>
                {dispBooks.map((b) => (
                    <div key={b.id} className="book-card">
                        <BookCard book={b} ownedByUser={false} handleExchanged={handleExchanged}/>
                    </div>
                ))}
            </div>
            :    
            <>
                {searched ? 
                <h3>No results</h3>
                :
                <h3>Enter search terms and/or choose a genre to display books</h3>
                }
            </>
            }
            <br></br>
        </div>
    )
}

export default LibrarySearch