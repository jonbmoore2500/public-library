import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function NewMessageForm({handleSendMessage, recipient, convo = null}) {

    const [message, setMessage] = useState("")
    const {user} = useContext(UserContext)

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
                    handleSendMessage(data)
                    setMessage("")
                })
            } else {
                r.json().then((err) => console.log(err))
            }
        })
    }

    function newMessage() {
        fetch("/new_message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...messageBase, conversation_id: convo})
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    handleSendMessage(data)
                    setMessage("")
                })
            } else {
                r.json().then((err) => console.log(err))
            }
        })
    }

    function handleSendMessage(e) {
        e.preventDefault()
        if (user.convos.some((c) => c.two_users.find((u) => u.id !== user.id).id === recipient)) {
            newMessage()
            // console.log("just new message")
        } else {
            newConvoMessage()
            // console.log("new convo")
        }
    }





    return(
        <div>
            <form onSubmit={handleSendMessage}>
                <input onChange={(e) => setMessage(e.target.value)} value={message} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default NewMessageForm