import React from "react"


function BookCard({book}) {

    return(
        <div key={book.id}>
            <h3>{book.title}</h3>
            <h4>{book.author}</h4>
            <h5>{book.genre}, {book.num_pages} pages, hardback: {book.hardback.toString()}</h5>
            <h5>hidden: {book.hidden.toString()}</h5>
        </div>
    )
}

export default BookCard