import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "../contexts/UserContext.js"
import { ExchangesContext } from "../contexts/ExchangesContext.js"
import ExchangeCardLend from "./ExchangeCardLend.js"
import ExchangeCardBorrow from "./ExchangeCardBorrow.js"

function UserExchangesCont() {

    const {user} = useContext(UserContext)
    const {exchanges} = useContext(ExchangesContext)

    const lent = exchanges.filter((e) => e.user_id !== user.id)
    const borrowed = exchanges.filter((e) => e.user_id === user.id)

    return(
        <div>
            <h3>user exchanges container</h3>

            <h3>Lending: </h3>
            {lent.map((e) => (
                <ExchangeCardLend key={e.id} exchange={e}/>
            ))}
            <h3>Borrowing: </h3>
            {borrowed.map((e) => (
                <ExchangeCardBorrow key={e.id} exchange={e}/>
            ))}
            
        </div>
    )
}


export default UserExchangesCont