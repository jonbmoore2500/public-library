import React, {useState, useRef, useCallback} from "react"
import { Link } from "react-router-dom"
import NewMessageForm from "./NewMessageForm"

function ExchangeCardLend({exchange, updateExchanges}) {

    // determine more eloquent way to notify user. updates at top, but duplicate below? move to top? mark whole card? open to reorg

    const [confirmModal, setConfirmModal] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [updated, setUpdated] = useState(false)

    const observer = useRef()
    
    const updateRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(() => {
            if (!updated && !exchange.update_read) {
                fetch(`/exchanges/${exchange.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({update_read: true})
                })
                .then((r) => {
                    if (r.ok) {
                        r.json().then(() => {
                            setUpdated(true)
                        })
                    }
                })
            }
        })
        if (node) observer.current.observe(node)
    }, [updated])

    function handleUpdate(param) {
        let updateObj = {}
        if (param === "approved") {
            updateObj = {approved: true, update_read: false}
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
                    updateExchanges(exch, "lent")
                })
            }
        })
    }

    function renderSwitch(param) {
        switch(param) {
            case "approved":
                return (
                    <>
                        <p>Request approved</p>
                        <p>Awaiting borrower to mark as received.</p>
                    </>
                )
            case "received":
                return (
                    <div ref={updateRef} className={exchange.update_read ? null : "exch-update"}>
                        <p>Borrower has received the book</p>
                        <p>Awaiting borrower to mark as returned.</p>
                    </div>
                )
            case "returned":
                return (
                    <div ref={updateRef} className={exchange.update_read ? null : "exch-update"}>
                        <p>Borrower has returned the book</p>
                        <p>Complete the exchange?</p>
                        <button onClick={() => handleUpdate("complete")}>Complete</button>
                    </div>
                )
            default :
                return (
                    <div ref={updateRef} className={exchange.update_read ? null : "exch-update"}>
                        <p>Requested on {exchange.created_at.slice(0, 10)}</p>
                        <p>Approve the request?</p>
                        <button onClick={() => handleUpdate("approved")}>Approve</button>
                        <button onClick={() => handleUpdate("denied")}>Deny</button>
                    </div>
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
                <br></br>
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