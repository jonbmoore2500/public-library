import React from "react"
import MessageCard from "./MessageCard"
import NewMessageForm from "./NewMessageForm"


function ConvoContainer({selected, userID}) {

    const otherUser = selected.two_users.find(u => u.id !== userID)

    return(
        <div>
           <h3>Conversation with {otherUser.username}</h3>
           {selected.messages.map((m) => (
                <MessageCard key={m.id} message={m} loggedUser={m.sender_id === userID} />
           ))}
           <div>
                <NewMessageForm recipient={otherUser.id} convoID={selected.id}/>
           </div>
        </div>
    )
}

export default ConvoContainer