import React, {useRef, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import MessageCard from "./MessageCard"
import NewMessageForm from "./NewMessageForm"

function ConvoContainer({selected, userID}) {

    const divRef = useRef(null)
    const [newMsgCount, setNewMsgCount] = useState(0)

    function handleIncrement() {
        setNewMsgCount(newMsgCount + 1)
    }

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }, [selected, newMsgCount])

    const otherUser = selected.two_users.find(u => u.id !== userID)

    return(
        <div id="convo-container">
            <div id="convo-header">
                <h2>Conversation with {otherUser.username}</h2>
                <Link to={"/profiles/" + otherUser.id}>See {otherUser.username}'s profile</Link>
            </div>
            <div id="convo-content">
                {selected.messages.map((m) => (
                    <MessageCard key={m.id} message={m} loggedUser={m.sender_id === userID} />
                ))}
                <div>
                    <NewMessageForm recipient={otherUser.id} convoID={selected.id} handleIncrement={handleIncrement}/>
                </div>
                <br ref={divRef}></br>
            </div>
        </div>
    )
}

export default ConvoContainer