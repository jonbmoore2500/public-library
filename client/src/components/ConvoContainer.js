import React from "react"
import NewMessageForm from "./NewMessageForm"


function ConvoContainer({selected, userID}) {

    const otherUser = selected.two_users.find(u => u.id != userID)
    function handleSendMessage(e) {
        e.preventDefault()
        console.log(e.target.value)
    }

    return(
        <div>
           <h3>Conversation with {otherUser.username}</h3>
           {selected.messages.map((m) => (
            <p key={m.id}>{m.text}</p>
           ))}
           <div>
            <NewMessageForm handleSendMessage={handleSendMessage} recipient={otherUser.id} convo={selected.id}/>
           </div>
        </div>
    )
}

export default ConvoContainer