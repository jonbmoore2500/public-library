import React, {useState} from "react"
import BookFormEdit from "./BookFormEdit"
import BookBorrowModal from "./BookBorrowModal"


function BookCard({book, owned = true, owner = book.owner}) {

    const [showEditModal, setShowEditModal] = useState(false)
    const [showBorrowModal, setShowBorrowModal] = useState(false)

    return(
        <>
            <div onClick={owned ? () => setShowEditModal(true) : () => setShowBorrowModal(true)}>
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>
                <h5>{book.genre}</h5>
                {/* <h5>{book.num_pages} pages, hardback: {book.hardback.toString()}</h5> */}
                {owned ? 
                <>
                    <h5>Hidden: {book.hidden.toString()}</h5> 
                </>
                : 
                <>
                    <h5>Owned by: {owner.username}</h5>
                </>
                }
            </div>
            {owned && showEditModal ? (
                <BookFormEdit setShowModal={setShowEditModal} book={book}/>
            ) : null}
            {!owned && showBorrowModal ? (
                <BookBorrowModal setShowModal={setShowBorrowModal} book={book} owner={owner}/>
            ) : null}
        </>
    )
}

export default BookCard