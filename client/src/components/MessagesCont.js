import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"



function MessagesCont() {

    const {user} = useContext(UserContext)

    return(
        <div>
            messages here 
        {user.convos.map((c) => (
            <div key={c.id}>
                <h3>{c.id}</h3>
            </div>
        ))}
        </div>
    )
}

export default MessagesCont