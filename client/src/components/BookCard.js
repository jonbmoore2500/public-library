import React, {useState} from "react"
import BookFormEdit from "./BookFormEdit"
import BookBorrowModal from "./BookBorrowModal"

function BookCard({book, owned = true, owner = book.owner, handleExchanged}) {

    const [showEditModal, setShowEditModal] = useState(false)
    const [showBorrowModal, setShowBorrowModal] = useState(false)

    return(
        <>
            <div onClick={owned ? () => setShowEditModal(true) : () => setShowBorrowModal(true)}>
                <div className="title-author">
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                </div>
                <div className="other-book-info">
                    <h4>{book.genre}</h4>
                    <h4>{book.num_pages} pages, {book.hardback ? "hardback" : "paperback"}</h4>
                    {owned ? 
                        <h4>Hidden: {book.hidden.toString()}</h4> 
                    : 
                        <h4>Owned by: {owner.username}</h4>
                    }
                    {book.checked_out ? 
                        <h4>Checked out</h4>
                    :
                        <h4>Available</h4>
                    }
                </div>
            </div>
            
            {owned && showEditModal ? (
                <BookFormEdit setShowModal={setShowEditModal} book={book}/>
            ) : null}
            {(!owned && !book.checked_out) && showBorrowModal ? (
                <BookBorrowModal setShowModal={setShowBorrowModal} book={book} owner={owner} handleExchanged={handleExchanged}/>
            ) : null}
        </>
    )
}

export default BookCard