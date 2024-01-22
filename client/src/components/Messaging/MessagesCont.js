import React, {useContext, useState} from "react"
import { UserContext } from "../../contexts/UserContext.js"
import ConvoCard from "./ConvoCard.js"
import ConvoContainer from "./ConvoContainer.js"
import '../../styles/messaging.css'

function MessagesCont() {

    const {user} = useContext(UserContext)

    const [selectedConvo, setSelectedConvo] = useState(null)

    return(
        <div>
            <h2 className="chapter-header">Chapter 6: Your Messages</h2>
            <div className="chapter-content">
                <div className="leftnav">
                    {user.convos.map((c) => (
                        <ConvoCard key={c.id} convo={c} handleSelect={setSelectedConvo} userID={user.id}/>
                    ))}
                </div>
                <div className="rightcontent">
                    {selectedConvo ? 
                        <ConvoContainer selected={selectedConvo} userID={user.id}/>
                    :
                        <h2>Select a Conversation</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagesCont