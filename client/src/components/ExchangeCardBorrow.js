import React, {useState} from "react"
import { Link } from "react-router-dom"
import NewMessageForm from "./NewMessageForm"

function ExchangeCardBorrow({exchange, updateExchanges}) {

    const [showMessage, setShowMessage] = useState(false)
    function handleUpdate(param) {
        let updateObj = {returned: true}
        if (param === "received") {
            updateObj = {received: true}
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
                    updateExchanges(exch, "borrowed")
                })
            }
        })
    }
    
    function renderSwitch(param) {
        switch(param) {
            case "approved":
                return (
                    <>
                        <h4>Request approved. Mark as received?</h4>
                        <button onClick={() => handleUpdate("received")}>Received</button>
                    </>
                )
            case "received":
                return (
                    <>
                        <h4>Book received. Mark as returned?</h4>
                        <button onClick={() => handleUpdate("returned")}>Returned</button>
                    </>
                )
            case "returned":
                return <h4>Book returned. Awaiting owner to complete the exchange</h4>
            default :
                return <h4>Requested on {exchange.updated_at}. Awaiting approval</h4>
        }
    }

    return(
        <div className="exchange-card" onClick={() => setShowMessage(!showMessage)}>
            <h4>{exchange.book.title} by {exchange.book.author}</h4>
            <h4>Owner: <Link to={"/profiles/" + exchange.book.owner.id}>{exchange.book.owner.username}</Link></h4>
            {renderSwitch(exchange.exch_status)}
            {showMessage && (
                <NewMessageForm recipient={exchange.book.owner.id}/>
            )}
        </div>
    )
}

export default ExchangeCardBorrow