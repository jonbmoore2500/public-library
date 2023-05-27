import React, {useState} from "react"

function NewMessageForm({handleSendMessage, recipient, convo}) {

    const [message, setMessage] = useState("")
    function handleMessagePost(e) {
        e.preventDefault()
        let messageObj = {
            conversation_id: convo,
            recipient_id: recipient,
            text: message
        }
        fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    console.log(data)
                })
            } else {
                r.json().then((err) => console.log(err))
            }
        })
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