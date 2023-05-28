import React, {useContext} from "react"
import { LibraryContext } from "../contexts/LibraryContext.js"
import { UserContext } from "../contexts/UserContext.js"
import NewMessageForm from "./NewMessageForm.js"


function BookBorrowModal({setShowModal, book}) {

    const {handleExchanged} = useContext(LibraryContext)
    const {handleNewExch} = useContext(UserContext)

    function handleSubmitRequest() {
        console.log("submit")
        fetch("/exchanges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                book_id: book.id
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    handleExchanged(book.id)
                    handleNewExch(data)
                })
            } else {
                r.json().then(errors => console.log(errors))
            }
        })
    }

    function handleSendMessage() {

    }

    return(
        <div className="modal">
            <div onClick={() => setShowModal(false)} className="overlay"></div> 
            <div className="modal-content">
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>
                <h5>{book.genre}, {book.num_pages} pages, hardback: {book.hardback.toString()}</h5>
                <p>{book.notes}</p>
                <h4>Owner: {book.owner.username}</h4>
                {/* add link to user's profile 
                add option to message user */}
                <label>Send Message to {book.owner.username}?</label>
                <NewMessageForm handleSendMessage={handleSendMessage} recipient={book.user_id}/>
                <button onClick={() => handleSubmitRequest()}>Request to borrow?</button>
            </div>
        </div>
    )
}

export default BookBorrowModal