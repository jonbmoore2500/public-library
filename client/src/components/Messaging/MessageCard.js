import React, {useState, useRef, useCallback} from "react"

function MessageCard({message, loggedUser, newMsg = false}) {

    const [showDate, setShowDate] = useState(false)
    
    const observer = useRef()
    
    const msgRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(() => {
            fetch(`/messages/${message.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({msg_read: true})
            })
            .then((r) => {
                if (!r.ok) {
                    r.json().then(r => console.log(r))
                }
            })
        })
        if (node) observer.current.observe(node)
    }, []) // remove dependency array?

    return(
        <div>
            <div 
                ref={newMsg && !loggedUser ? msgRef : null}
                className={loggedUser ? "chat-bubble-right tri-right round border right-top" : "chat-bubble-left tri-right round border left-top"}
                onClick={() => setShowDate(!showDate)}
            >
                <div className="chat-text">
                    {message.text}
                </div>
            </div>
            {showDate ? <h5>Sent on: {message.created_at.slice(0, 10)}</h5> : null }
        </div>
    )
}

export default MessageCard