import React, {useState} from "react"
import BookFormEdit from "./BookFormEdit"


function BookCard({book}) {

    const [showModal, setShowModal] = useState(false)

    return(
        <>
            <div key={book.id} onClick={() => setShowModal(true)}>
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>
                <h5>{book.genre}, {book.num_pages} pages, hardback: {book.hardback.toString()}</h5>
                <h5>hidden: {book.hidden.toString()}</h5>
            </div>
            {showModal && (
                <BookFormEdit setShowModal={setShowModal} book={book}/>
            )}
        </>
    )
}

export default BookCard