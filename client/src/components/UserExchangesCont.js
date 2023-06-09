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
            <h2 className="chapter-header">Chapter 3: Your Exchanges</h2>
            <div className="chapter-content">
                <h3><u>Lending: </u></h3>
                <div>
                    {user.exchanges_lend.length > 0 ?
                        <div className="exch-container">
                            {user.exchanges_lend.map((e) => (
                                <ExchangeCardLend key={e.id} exchange={e} updateExchanges={updateExchanges}/>
                            ))}
                        </div>
                    : 
                        <h3>You aren't lending any books at the moment</h3> 
                    }
                </div>
                <br></br>
                <h3><u>Borrowing: </u></h3>
                <div>
                    {user.exchanges_borrow.length > 0 ?
                        <div className="exch-container">
                            {user.exchanges_borrow.map((e) => (
                                <ExchangeCardBorrow key={e.id} exchange={e} updateExchanges={updateExchanges}/>
                            ))}
                        </div>    
                    :
                        <h3>You aren't borrowing any books at the moment</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserExchangesCont