import React, {useState, useContext, useEffect} from "react"
import { UserContext } from "../contexts/UserContext.js"
import ExchangeCardLend from "./ExchangeCardLend.js"
import ExchangeCardBorrow from "./ExchangeCardBorrow.js"

function UserExchangesCont() {

    const {user} = useContext(UserContext)
    const [exchangeArr, setExchangeObj] = useState([])
    const lent = exchangeArr.filter((e) => e.user_id !== user.id)
    const borrowed = exchangeArr.filter((e) => e.user_id === user.id)

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