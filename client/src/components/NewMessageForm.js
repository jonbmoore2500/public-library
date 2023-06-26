import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function NewMessageForm({recipient, convoID = null, handleIncrement = null}) {

    const [message, setMessage] = useState("")
    const {user, handleNewMsg, handleNewConvo} = useContext(UserContext)
    const [errors, setErrors] = useState([])

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
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    function newMessage(convoID) {
        fetch("/messages", {
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
                    if (handleIncrement) {
                        handleIncrement()
                    }
                    setMessage("")
                    setErrors([])
                })
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                    if (handleIncrement) {
                        handleIncrement()
                    }
                })
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
                {errors && errors.map((e, i) => <p id={i}>{e}</p>)}
            </form>
        </div>
    )
}

export default NewMessageForm