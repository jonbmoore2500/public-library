import React, {useState} from "react"
import BookFormEdit from "./BookFormEdit"
import BookBorrowModal from "./BookBorrowModal"

function BookCard({book, owned = true, owner = book.owner, handleExchanged}) {

    const [showEditModal, setShowEditModal] = useState(false)
    const [showBorrowModal, setShowBorrowModal] = useState(false)

    return(
        <>
            <div>
                <div className="title-author">
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                </div>
                <div className="other-book-info">
                    <p>{book.genre}</p>
                    <p>{book.num_pages} pages, {book.hardback ? "hardback" : "paperback"}</p>
                    {owned ? 
                        <p>{book.hidden ? "Hidden": "On Display"}</p>
                    : 
                        <p>Owned by: {owner.username}</p>
                    }
                    {book.checked_out ? 
                        <p>Checked out</p>
                    :
                        <p>Available</p>
                    }
                    {(owned || !book.checked_out) && <button onClick={owned ? () => setShowEditModal(true) : () => setShowBorrowModal(true)}>Show more</button>}
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