import React from "react"

function ConvoContainer({selected}) {

    // messages will go the wrong way for now

    return(
        <div>
           {selected.messages.map((m) => (
            <p key={m.id}>{m.text}</p>
           ))}
        </div>
    )
}

export default ConvoContainer