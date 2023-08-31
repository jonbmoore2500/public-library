import React, {useRef, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import MessageCard from "./MessageCard"
import NewMessageForm from "./NewMessageForm"

function ConvoContainer({selected, userID}) {
    console.log(selected)
    // mostly works. make sure:
    // works with new convo
    
    let newIndex = selected.messages.findIndex(msg => msg.recipient_id === userID && msg.msg_read === false) 
    // finds first message TO user and unread, -1 if nothing qualifies
    
    let readArr = []
    newIndex === -1 ? readArr = selected.messages : readArr = selected.messages.slice(0, newIndex) 
    // fills readArr with all messages up to newIndex, or all if -1

    const divRef = useRef(null)
    const [newMsgCount, setNewMsgCount] = useState(0)

    function handleIncrement() {
        setNewMsgCount(newMsgCount + 1)
    }

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({behavior: 'instant', block: 'end'})
        }
    }, [selected, newMsgCount])

    const otherUser = selected.two_users.find(u => u.id !== userID)

    return(
        <div id="convo-container">
            <div id="convo-header">
                <h2>Conversation with <Link to={"/profiles/" + otherUser.id}>{otherUser.username}</Link></h2>
            </div>
            <div id="convo-content">
                {readArr.map((m) => (
                    <MessageCard key={m.id} message={m} loggedUser={m.sender_id === userID} />
                ))}
                {newIndex >= 0 && 
                    <>
                        <h6>----- Unread Messages -----</h6>
                        {selected.messages.slice(newIndex, selected.messages.length).map((m) => (
                            <MessageCard key={m.id} message={m} loggedUser={m.sender_id === userID} newMsg={true}/>
                        ))}
                    </>
                }
                <div>
                    <NewMessageForm recipient={otherUser.id} convoID={selected.id} handleIncrement={handleIncrement}/>
                </div>
                <br ref={divRef}></br>
            </div>
        </div>
    )
}

export default ConvoContainer