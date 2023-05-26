import React from "react"

function ExchangeCardLend({exchange, updateExchanges}) {

    function handleUpdate(param) {
        let updateObj = {complete: true}
        if (param === "approved") {
            updateObj = {approved: true}
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
        // if exch.complete = true, remove from exchanges. else update in exchange array.
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
                        <h3>Borrower has returned the book. Complete the exchange?</h3>
                        <button onClick={() => handleUpdate("complete")}>Complete</button>
                    </>
                )
            default :
                return (
                    <>
                        <h3>{exchange.user.username} has requested to borrow this book. Approve the request?</h3>
                        <button onClick={() => handleUpdate("approved")}>Approve</button>
                        <button onClick={() => handleUpdate("denied")}>Deny</button>
                    </>
                )
        }
    }

    return(
        <div>
            <h3>{exchange.book.title} by {exchange.book.author}</h3>
            <h3>Borrower: {exchange.user.username}</h3>
            {renderSwitch(exchange.exch_status)}
        </div>
    )
}

export default ExchangeCardLend