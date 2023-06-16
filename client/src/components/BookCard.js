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
                    <h3>{book.title}</h3>
                    <h4>{book.author}</h4>
                </div>
                <div className="other-book-info">
                    <h5>{book.genre}</h5>
                    <h5>{book.num_pages} pages, {book.hardback ? "hardback" : "paperback"}</h5>
                    {owned ? 
                        <h5>Hidden: {book.hidden.toString()}</h5> 
                    : 
                        <h5>Owned by: {owner.username}</h5>
                    }
                    {book.checked_out ? 
                        <h5>Checked out</h5>
                    :
                        <h5>Available</h5>
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