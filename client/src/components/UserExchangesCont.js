import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"
import ExchangeCardLend from "./ExchangeCardLend.js"
import ExchangeCardBorrow from "./ExchangeCardBorrow.js"

function UserExchangesCont() {

    const {user, handleExchUpdate} = useContext(UserContext)

    function updateExchanges(updatedExch, type) {
        handleExchUpdate(updatedExch, type)
    }

    return(
        <div>
            <h2>Chapter 3: Your Exchanges</h2>

            <h3>Lending: </h3>
            {user.exchanges_lend.map((e) => (
                <ExchangeCardLend key={e.id} exchange={e} updateExchanges={updateExchanges}/>
            ))}
            <h3>Borrowing: </h3>
            {user.exchanges_borrow.map((e) => (
                <ExchangeCardBorrow key={e.id} exchange={e} updateExchanges={updateExchanges}/>
            ))}
            
        </div>
    )
}


export default UserExchangesCont