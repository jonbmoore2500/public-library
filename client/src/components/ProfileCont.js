import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import BookCard from "./BookCard"


function ProfileCont() {

    let userID = useParams()
    const [dispUser, setDispUser] = useState(null)
    
    useEffect(() => {
        fetch(`/users/${userID.userID}`)
        .then(r => r.json())
        .then(data => setDispUser(data))
    }, [userID])
    if (dispUser) console.log(dispUser)

    return(
        <div className="rightcontent">
            {dispUser ? 
            <>
                <h3>{dispUser.username}</h3>
                <h4>Neighborhood: {dispUser.neighborhood}</h4>
                <h4>Favorite Genre: {dispUser.fav_genre}</h4>
                <h4>Favorite Author: {dispUser.fav_author}</h4>
                <h4>Completed Exchanges: {dispUser.num_ex_complete}</h4>
                <h4>Books:</h4>
                <ul>

                    {dispUser.owned_books.map((b) => (
                        <li key={b.id}>
                            <BookCard book={b}  /> 
                            {/* need owned to be false */}
                        </li>
                    ))}

                </ul>
            </>
            :
            <>
            Loading...
            </>
            }
        </div>
    )
}

export default ProfileCont