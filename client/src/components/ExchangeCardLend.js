import React, {useState} from "react"
import { Link } from "react-router-dom"
import NewMessageForm from "./NewMessageForm"


function ExchangeCardLend({exchange, updateExchanges}) {

    const [confirmModal, setConfirmModal] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    function handleUpdate(param) {
        let updateObj = {}
        switch(param) {
            case "approved":
                updateObj = {approved: true}
            case "denied":
                updateObj = {approved: false, complete: true}
            default:
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
                    updateExchanges(exch, "lent")
                })
            }
        })
        // move to context
    }

    function renderSwitch(param) {
        switch(param) {
            case "approved":
                return <h3>Request approved. Awaiting borrower to mark as received.</h3>
            case "received":
                return <h3>Borrower has received the book. Awaiting borrower to mark as returned.</h3>
            case "returned":
                return (
                    <>
                        <h4>Borrower has returned the book. Complete the exchange?</h4>
                        <button onClick={() => handleUpdate("complete")}>Complete</button>
                    </>
                )
            default :
                return (
                    <>
                        <h4>{exchange.user.username} has requested to borrow this book. Approve the request?</h4>
                        <button onClick={() => handleUpdate("approved")}>Approve</button>
                        <button onClick={() => handleUpdate("denied")}>Deny</button>
                    </>
                )
        }
    }

    return(
        <div className="exchange-card">
            <h4><strong>{exchange.book.title} by {exchange.book.author}</strong></h4>
            <h4>Borrower: <Link to={"/profiles/" + exchange.user.id}>{exchange.user.username}</Link></h4>
            {renderSwitch(exchange.exch_status)}
            <label>Cancel this Exchange? </label>
            <button onClick={() => setConfirmModal(true)}>Cancel</button>
            {showMessage && (
                <NewMessageForm recipient={exchange.user.id}/>
            )}
            
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