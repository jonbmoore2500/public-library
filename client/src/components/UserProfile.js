import React, {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext.js"
import EditUserModal from "./EditUserModal.js"


function UserProfile() {

    const {user, handleUpdateUser} = useContext(UserContext)
    const [editModal, setEditModal] = useState(false)

    return(
        <div id="profile-home">
            <h2>Chapter 1: Your Profile</h2>
            <ul>
                <li className="profile">
                    Username:<br></br> <strong>{user.username}</strong>
                </li>
                <br></br>
                <li className="profile">
                    Neighborhood:<br></br> <strong>{user.neighborhood}</strong>
                </li>
                <br></br>
                <li className="profile bio">
                    Bio:<br></br> <div className="bio"><strong>{user.bio}</strong></div>
                </li>
                <br></br>
                <li className="profile">
                    Favorite Genre:<br></br> <strong>{user.fav_genre}</strong>
                </li>
                <br></br>
                <li className="profile">
                    Favorite Author:<br></br> <strong>{user.fav_author}</strong>
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