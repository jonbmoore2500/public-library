import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"


function ProfilesCont() {

    let userID = useParams()
    const [dispUser, setDispUser] = useState(null)
    
    useEffect(() => {
        fetch(`/users/${userID.userID}`)
        .then(r => r.json())
        .then(data => setDispUser(data))
    }, [userID])

    return(
        <div>
            {dispUser ? 
            <>
            {dispUser.username}
            </>
            :
            <>
            Loading...
            </>
            }
        </div>
    )
}

export default ProfilesCont