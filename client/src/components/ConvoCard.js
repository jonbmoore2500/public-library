import React from "react"


function ConvoCard({convo, handleSelect, userID}) {

    const otherUser = convo.two_users.find(u => u.id !== userID)

    return(
        <div onClick={() => handleSelect(convo)}>
            <h3>Conversation with {otherUser.username}</h3>
        </div>
    )
}
export default ConvoCard