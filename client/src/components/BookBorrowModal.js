import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { LibraryContext } from "../contexts/LibraryContext.js"
import { UserContext } from "../contexts/UserContext.js"
import NewMessageForm from "./NewMessageForm.js"


function BookBorrowModal({setShowModal, book, owner}) {

    // const {handleExchanged} = useContext(LibraryContext)
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
                    // handleExchanged(book.id)
                    console.log(data)
                    handleNewExch(data)
                })
            } else {
                r.json().then(errors => console.log(errors))
            }
        })
    }

    return(
        <div className="modal">
            <div onClick={() => setShowModal(false)} className="overlay"></div> 
            <div className="modal-content">
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <h5>{book.genre}, {book.num_pages} pages, {book.hardback ? "hardback" : "paperback"}</h5>
                <p>{book.notes}</p>
                <h4>Owner: <Link to={"/profiles/" + owner.id}>{owner.username}</Link></h4>
                <label>Send Message to {owner.username}?</label>
                <NewMessageForm recipient={book.user_id}/>
                <button onClick={() => handleSubmitRequest()}>Request to borrow?</button>
            </div>
        </div>
    )
}

export default BookBorrowModal