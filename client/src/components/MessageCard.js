import React, {useState} from "react"

function MessageCard({message, loggedUser}) {

    const [showDate, setShowDate] = useState(false)

    return(
        <div>
            <div 
                className={loggedUser ? "chat-bubble-right tri-right round border right-top" : "chat-bubble-left tri-right round border left-top"}
                onClick={() => setShowDate(!showDate)}
            >
                <div className="chat-text">
                    {message.text}
                </div>
            </div>
            {showDate ? <h5>Sent on: {message.created_at.slice(0, 10)}</h5> : null }
        </div>
    )
}

export default MessageCard