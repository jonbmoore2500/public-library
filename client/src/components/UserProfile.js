import React, {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext.js"
import EditUserModal from "./EditUserModal.js"


function UserProfile() {

    const {user, handleUpdateUser} = useContext(UserContext)
    const [editModal, setEditModal] = useState(false)

    return(
        <div>
            <h2>{user.username}</h2>
            <h3>Neighborhood: {user.neighborhood}</h3>
            <h3>Bio: {user.bio}</h3>
            <h3>Favorite genre: {user.fav_genre}</h3>
            <h3>Favorite author: {user.fav_author}</h3>
            <button onClick={() => setEditModal(true)}>Edit Profile</button>
            {editModal && (
                <EditUserModal setEditModal={setEditModal} user={user} handleUpdate={handleUpdateUser}/>
            )}
        </div>
    )
}

export default UserProfile