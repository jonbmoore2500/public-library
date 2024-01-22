import React, {useState} from "react"
import BookFormEdit from "./BookFormEdit"
import BookBorrowModal from "../Exchanges/BookBorrowModal"

function BookCard({book, ownedByUser = true, owner = book.owner, handleExchanged}) {

    const available = !(book.hidden || book.checked_out)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showBorrowModal, setShowBorrowModal] = useState(false)

    return(
        <>
            <div>
                <div className="book-card-header">
                    <h2>{book.title}</h2>
                    <h3>by: {book.author}</h3>
                    <h4>{book.genre} - {book.hardback ? "Hardback" : "Paperback"} - {book.num_pages} pages</h4>
                </div>
                <hr style={{background: 'black', color: 'black', borderColor: 'black', height: '2px'}}/>
                <div className="book-card-body">
                    <div className="book-card-body-left">
                        <p>{book.notes}</p>
                    </div>
                    <div className="book-card-body-right">
                        {ownedByUser ? 
                            <p className={available ? "book-status available-yes" : "book-status available-no"}>{available ? "Available" : (book.hidden ? "Hidden": "Checked Out")}</p>
                        : 
                            <p>Owned by: {owner.username}</p>
                        }

                        {(ownedByUser || !book.checked_out) && <button onClick={ownedByUser ? () => setShowEditModal(true) : () => setShowBorrowModal(true)}>Edit</button>}
                    </div>
                </div>
            </div>
            
            {ownedByUser && showEditModal ? (
                <BookFormEdit setShowModal={setShowEditModal} book={book}/>
            ) : null}
            {(!ownedByUser && !book.checked_out) && showBorrowModal ? (
                <BookBorrowModal setShowModal={setShowBorrowModal} book={book} owner={owner} handleExchanged={handleExchanged}/>
            ) : null}
        </>
    )
}

export default BookCard