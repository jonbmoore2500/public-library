import React, {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext.js"
import EditUserModal from "./EditUserModal.js"


function UserProfile() {

    const {user, handleUpdateUser} = useContext(UserContext)
    const [editModal, setEditModal] = useState(false)

    return(
        <div>
            <h2>Chapter 1: Your Profile</h2>
            <ul>
                <li>
                    <h3>Username: {user.username}</h3>
                </li>
                <li>
                    <h3>Neighborhood: {user.neighborhood}</h3>
                </li>
                <li>
                    <h3>Bio: {user.bio}</h3>
                </li>
                <li>
                    <h3>Favorite genre: {user.fav_genre}</h3>
                </li>
                <li>
                    <h3>Favorite author: {user.fav_author}</h3>
                </li>
            </ul>
            <button onClick={() => setEditModal(true)}>Edit Profile</button>
            {editModal && (
                <EditUserModal setEditModal={setEditModal} user={user} handleUpdate={handleUpdateUser}/>
            )}
        </div>
    )
}

export default UserProfile