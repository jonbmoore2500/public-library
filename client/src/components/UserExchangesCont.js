import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "../contexts/UserContext.js"

function UserExchangesCont() {

    const [exchangeObj, setExchangeObj] = useState({})
    useEffect(() => {
        fetch("/user_exchanges").then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setExchangeObj(data)
                })
            }
        })
    }, [])
    
    return(
        <div>
            <h3>user exchanges container</h3>

            <h3>Lent to others: </h3>
            {exchangeObj.lent.map((e) => (
                <h4 key={e.id}>You borrowed {e.book_id}</h4>
            ))}
            <h3>Borrowed from others: </h3>
            {exchangeObj.borrowed.map((e) => (
                <h4 key={e.id}>You lent out {e.book_id}</h4>
            ))}
            
        </div>
    )
}


export default UserExchangesCont