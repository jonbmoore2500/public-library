import React, {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext.js"
import ConvoCard from "./ConvoCard.js"
import ConvoContainer from "./ConvoContainer.js"

function MessagesCont() {

    const {user, handleSendMessage} = useContext(UserContext)

    const [selectedConvo, setSelectedConvo] = useState(null)


    return(
        <div>
            messages here 
            {user.convos.map((c) => (
                <ConvoCard key={c.id} convo={c} handleSelect={setSelectedConvo}/>
            ))}
            <div>
                {selectedConvo ? 
                    <ConvoContainer selected={selectedConvo} userID={user.id} handleSendMessage={handleSendMessage}/>
                :
                    <>Select a Conversation</>
                }
            </div>
        </div>
    )
}

export default MessagesCont