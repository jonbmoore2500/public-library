import React from "react"


function ConvoCard({convo, handleSelect}) {

    

    return(
        <div onClick={() => handleSelect(convo)}>
            Convo with {convo.id}
        </div>
    )
}
export default ConvoCard