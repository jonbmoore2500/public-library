import React, {useState} from "react"
import BookFormEdit from "./BookFormEdit"
import BookBorrowModal from "./BookBorrowModal"


function BookCard({book, owned = true}) {

    const [showEditModal, setShowEditModal] = useState(false)
    const [showBorrowModal, setShowBorrowModal] = useState(false)

    return(
        <>
            <div>
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>
                <h3>{book.id}</h3>
                <h5>{book.genre}, {book.num_pages} pages, hardback: {book.hardback.toString()}</h5>
                {owned ? 
                <>
                    <h5>hidden: {book.hidden.toString()}</h5> 
                    <button onClick={() => setShowEditModal(true)}>Edit Book</button>
                </>
                : 
                <>
                    <h5>info about owner goes here</h5>
                    <button onClick={() => setShowBorrowModal(true)}>See more? </button>
                </>
                }
            </div>
            {owned && showEditModal ? (
                <BookFormEdit setShowModal={setShowEditModal} book={book}/>
            ) : null}
            {!owned && showBorrowModal ? (
                <BookBorrowModal setShowModal={setShowBorrowModal} book={book}/>
            ) : null}
        </>
    )
}

export default BookCard