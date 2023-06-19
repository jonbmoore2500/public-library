import React, {useState} from "react"
import { Link } from "react-router-dom"
import NewMessageForm from "./NewMessageForm"


function ExchangeCardLend({exchange, updateExchanges}) {

    const [confirmModal, setConfirmModal] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    function handleUpdate(param) {
        let updateObj = {}
        if (param === "approved") {
            updateObj = {approved: true}
        } else {
            updateObj = {complete: true}
        }
        fetch(`/exchanges/${exchange.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((exch) => {
                    // console.log(exch)
                    // consider dropping nested data from backend and just updating based on what is already in state
                    updateExchanges(exch, "lent")
                })
            }
        })
        // move to context
    }

    function renderSwitch(param) {
        switch(param) {
            case "approved":
                return (
                    <>
                        <h4>Request approved</h4>
                        <h4>Awaiting borrower to mark as received.</h4>
                    </>
                )
            case "received":
                return (
                    <>
                        <h4>Borrower has received the book</h4>
                        <h4>Awaiting borrower to mark as returned.</h4>
                    </>
                )
            case "returned":
                return (
                    <>
                        <h4>Borrower has returned the book</h4>
                        <h4>Complete the exchange?</h4>
                        <button onClick={() => handleUpdate("complete")}>Complete</button>
                    </>
                )
            default :
                return (
                    <>
                        <h4>{exchange.user.username} has requested to borrow this book</h4>
                        <h4>Approve the request?</h4>
                        <button onClick={() => handleUpdate("approved")}>Approve</button>
                        <button onClick={() => handleUpdate("denied")}>Deny</button>
                    </>
                )
        }
    }

    return(
        <div className="exchange-card">
            <div className="exchange-left">
                <h2>{exchange.book.title}</h2>
                <h3>{exchange.book.author}</h3>
            </div>
            <div className="exchange-right">
                <h4>Borrower: <Link to={"/profiles/" + exchange.user.id}>{exchange.user.username}</Link></h4>
                {renderSwitch(exchange.exch_status)}
                <label>Cancel this Exchange? </label>
                <button onClick={() => setConfirmModal(true)}>Cancel</button>
                <br></br>
                <button onClick={() => setShowMessage(!showMessage)}>{!showMessage ? "Message the borrower?" : "Cancel the message"}</button>
                {showMessage && (
                    <NewMessageForm recipient={exchange.user.id}/>
                )}
            </div>
            <br></br>
            {confirmModal && ( 
            <>
                <div className="modal">
                <div onClick={() => setConfirmModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <label>Really cancel the exchange?</label>
                    <button onClick={() => handleUpdate("cancel")}>Yes</button>
                    <button onClick={() => setConfirmModal(false)}>No</button>
                </div>
                </div>
            </>
            )}
        </div>
    )
}

export default ExchangeCardLend