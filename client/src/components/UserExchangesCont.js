import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "../contexts/UserContext.js"
import { ExchangesContext } from "../contexts/ExchangesContext.js"
import ExchangeCardLend from "./ExchangeCardLend.js"
import ExchangeCardBorrow from "./ExchangeCardBorrow.js"

function UserExchangesCont() {

    const {user} = useContext(UserContext)
    const {exchanges, handleExchEdit} = useContext(ExchangesContext)

    const lent = exchanges.filter((e) => e.user_id !== user.id)
    const borrowed = exchanges.filter((e) => e.user_id === user.id)

    // function updateExchanges(updatedExch) {
    //     let newExchanges = exchanges.map((e) => {
    //         if (e.id === updatedExch.id) {
    //             return updatedExch
    //         } 
    //         return e
    //     })
    //     setExchanges(newExchanges)
    // }

    return(
        <div>
            <h3>user exchanges container</h3>

            <h3>Lending: </h3>
            {lent.map((e) => (
                <ExchangeCardLend key={e.id} exchange={e} updateExchanges={handleExchEdit}/>
            ))}
            <h3>Borrowing: </h3>
            {borrowed.map((e) => (
                <ExchangeCardBorrow key={e.id} exchange={e} updateExchanges={handleExchEdit}/>
            ))}
            
        </div>
    )
}


export default UserExchangesCont