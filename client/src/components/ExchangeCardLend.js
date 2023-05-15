import React from "react"

function ExchangeCardLend({exchange}) {

    return(
        <div>
            {exchange.approved ? 
            <h4>You lent out "{exchange.book.title}"" to {exchange.user.username}</h4>
            : 
            <h4>{exchange.user.username} requested to borrow "{exchange.book.title}"</h4>
            }      
        </div>
    )
}

export default ExchangeCardLend