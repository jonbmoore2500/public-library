import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"


function UserProfile() {

    const {user} = useContext(UserContext)
    console.log(user)
    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Neighborhood: {user.neighborhood}</h3>
            <h3>Bio: {user.bio}</h3>
            <h3>Favorite genre: {user.fav_genre}</h3>
            <h3>Favorite author: {user.fav_author}</h3>
        </div>
    )
}

export default UserProfile