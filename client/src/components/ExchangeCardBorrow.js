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
                        <p>Request approved. Mark as received?</p>
                        <button onClick={() => handleUpdate("received")}>Received</button>
                    </>
                )
            case "received":
                return (
                    <>
                        <p>Book received</p>
                        <p>Mark as returned?</p>
                        <button onClick={() => handleUpdate("returned")}>Returned</button>
                    </>
                )
            case "returned":
                return (
                    <>
                        <p>Book returned</p>
                        <p>Awaiting owner to complete the exchange</p>
                    </>
                )
            default :
                return (
                    <>
                        <p>Requested on {exchange.updated_at.slice(0, 10)}</p>
                        <p>Awaiting approval</p>
                    </>
                )
        }
    }

    return(
        <div className="exchange-card" >
            <div className="exchange-left">
                <h2>{exchange.book.title}</h2>
                <h3>{exchange.book.author}</h3>
            </div>
            <div className="exchange-right">
                <h4>Owner: <Link to={"/profiles/" + exchange.book.owner.id}>{exchange.book.owner.username}</Link></h4>
                {renderSwitch(exchange.exch_status)}
                <br></br>
                <button onClick={() => setShowMessage(!showMessage)} >{!showMessage ? "Message the owner?" : "Cancel the message"}</button>
                {showMessage && (
                    <NewMessageForm recipient={exchange.book.owner.id}/>
                )}
            </div>
            <br></br>
        </div>
    )
}

export default ExchangeCardBorrow