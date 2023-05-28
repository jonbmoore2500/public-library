import React from "react"

function MessageCard({message, loggedUser}) {

    return(
        <div className={loggedUser ? "loggedUserMessage" : "otherUserMessage"}>
            {message.text}
            {loggedUser ? <>You</> : <>Other User</>}
        </div>
    )
}

export default MessageCard