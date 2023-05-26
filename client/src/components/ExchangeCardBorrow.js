import React from "react"

function ExchangeCardBorrow({exchange, updateExchanges}) {

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
                        <h3>Request approved. Mark as received?</h3>
                        <button onClick={() => handleUpdate("received")}>Received</button>
                    </>
                )
            case "received":
                return (
                    <>
                        <h3>Book received. Mark as returned?</h3>
                        <button onClick={() => handleUpdate("returned")}>Returned</button>
                    </>
                )
            case "returned":
                return <h3>Book returned. Awaiting owner to complete the exchange</h3>
            default :
                return <h3>Requested on {exchange.updated_at}. Awaiting approval</h3>
        }
    }

    return(
        <div>
            <h3>{exchange.book.title} by {exchange.book.author}</h3>
            <h3>Owner: {exchange.book.user_id}</h3>
            {renderSwitch(exchange.exch_status)}
        </div>
    )
}

export default ExchangeCardBorrow