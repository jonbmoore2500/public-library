import React, {useContext, useLayoutEffect} from "react"
import { UserContext } from "../../contexts/UserContext.js"
import ExchangeCardLend from "./ExchangeCardLend.js"
import ExchangeCardBorrow from "./ExchangeCardBorrow.js"

function UserExchangesCont() {

    const {user, handleExchUpdate, handleExchNotifRead} = useContext(UserContext)

    const lendIDs = user.exchanges_lend.filter((exch) => exch.exch_status !== "approved" && !exch.update_read).map((e) => e.id)
    const borrowIDs = user.exchanges_borrow.filter((exch) => exch.exch_status === "approved" && !exch.update_read).map((e) => e.id)
    const numUpdates = lendIDs.length + borrowIDs.length

    useLayoutEffect(() => { // handles UserContext update only on unmount of UserExchangesCont
        return () => {
            if (numUpdates > 0) {
                handleExchNotifRead(lendIDs, borrowIDs)
            }
        }
    }, [])

    function updateExchanges(updatedExch, type) {
        handleExchUpdate(updatedExch, type)
    }

    return(
        <div className="chapter-content">
            {numUpdates > 0 ? <h4>There are updates in {numUpdates} of your exchanges &#40;in red&#41;</h4> : null}
            <div id="exch-container-outer">
                <div className="exch-container-inner">
                    <h3><u>Lending: </u></h3>
                    <div>
                        {user.exchanges_lend.length > 0 ?
                            <div>
                                {user.exchanges_lend.map((e) => (
                                    <ExchangeCardLend key={e.id} exchange={e} updateExchanges={updateExchanges}/>
                                ))}
                            </div>
                        : 
                            <h3>You aren't lending any books at the moment</h3> 
                        }
                    </div>
                </div>
                <div className="exch-container-inner">
                    <h3><u>Borrowing: </u></h3>
                    <div>
                        {user.exchanges_borrow.length > 0 ?
                            <div>
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
        </div>
    )
}

export default UserExchangesCont