import React, {useRef, useEffect} from "react"
import { Link } from "react-router-dom"
import MessageCard from "./MessageCard"
import NewMessageForm from "./NewMessageForm"


function ConvoContainer({selected, userID}) {

    const divRef = useRef(null)

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }, [selected])

    const otherUser = selected.two_users.find(u => u.id !== userID)

    return(
        <div>
            <h2>Conversation with {otherUser.username}</h2>
            <Link to={"/profiles/" + otherUser.id}>See {otherUser.username}'s profile</Link>
            {selected.messages.map((m) => (
                <MessageCard key={m.id} message={m} loggedUser={m.sender_id === userID} />
            ))}
            <div ref={divRef}>
                <NewMessageForm recipient={otherUser.id} convoID={selected.id}/>
            </div>
        </div>
    )
}

export default ConvoContainer