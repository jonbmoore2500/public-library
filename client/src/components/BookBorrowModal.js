import React, {useContext, useState} from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext.js"
import NewMessageForm from "./NewMessageForm.js"

function BookBorrowModal({setShowModal, book, owner, handleExchanged}) {

    const {handleNewExch} = useContext(UserContext)
    const [errors, setErrors] = useState([])

    function handleSubmitRequest() {
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
                r.json().then(e => setErrors(e.errors))
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
                {errors && errors.map((e, i) => <p key={i}>{e}</p>)}
                <button onClick={() => handleSubmitRequest()}>Request to borrow?</button>
            </div>
        </div>
    )
}

export default BookBorrowModal