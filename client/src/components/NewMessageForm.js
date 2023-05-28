import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function NewMessageForm({recipient, convoID = null}) {

    const [message, setMessage] = useState("")
    const {user, handleNewMsg, handleNewConvo} = useContext(UserContext)

    let messageBase = {
        recipient_id: recipient,
        text: message
    }

    function newConvoMessage() {
        fetch("/new_convo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageBase)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    handleNewConvo(data)
                    setMessage("")
                })
            } else {
                r.json().then((err) => console.log(err))
            }
        })
    }

    function newMessage(convoID) {
        fetch("/new_message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...messageBase, conversation_id: convoID})
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    handleNewMsg(data)
                    setMessage("")
                })
            } else {
                r.json().then((err) => console.log(err))
            }
        })
    }

    function handleMessagePost(e) {
        e.preventDefault()
        if (!convoID) {
            let convo = user.convos.find((c) => c.two_users.find((u) => u.id !== user.id).id === recipient)
            if (convo) {
                newMessage(convo.id)
            } else {
                newConvoMessage()
            }
        } else {
            newMessage(convoID)
        }
    }

    return(
        <div>
            <form onSubmit={handleMessagePost}>
                <input onChange={(e) => setMessage(e.target.value)} value={message} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default NewMessageForm