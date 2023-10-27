import React, {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext.js"
import EditUserModal from "./EditUserModal.js"

function UserProfile() {

    const {user, handleUpdateUser} = useContext(UserContext)
    let profileData = [
        ["Username", user.username],
        ["Neighborhood", user.neighborhood],
        ["User Bio", user.bio],
        ["Fav. Genre", user.fav_genre],
        ["Fav. Author", user.fav_author]
    ]
    const [editModal, setEditModal] = useState(false)
    const [selected, setSelected] = useState("none")
    const [clickActive, setClickActive] = useState(false)

    function handleMouseEnter(e) {
        if (!clickActive) {
            setSelected(e.target.id)
        }
    }

    function handleMouseLeave() {
        if (!clickActive) {
            setSelected("none")
        }
    }

    function handleClick(e) { 
        if (clickActive && e.currentTarget.id === selected) {
            setClickActive(false)
        } else {
            setSelected(e.currentTarget.id)
            setClickActive(true)
        }
    }

    return(
        <div id="profile-home">
            <h2 className="chapter-header">Chapter 1: Your Profile</h2>
            <div id="profileHomeOuter">
                <img src="/border_deco.png" id="borderDecoLeft" alt="profile page decoration"/>
                <div className="chapter-content" id="profileHomeInner">
                    <div id="profileGrid">
                    {profileData.map((dataItem => (
                        <div 
                            className="profileBox"                             
                            id={dataItem[0]}
                            onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseLeave}
                            onClick={handleClick}
                            key={dataItem[0]}
                        >
                            <h2 className="profile">{dataItem[0]}:</h2>
                            {selected === dataItem[0] ? <h2 className={dataItem[0] === "bio" ? "profData bio" : "profData"}>&#9830;   {dataItem[1]}   &#9830;</h2> : <h2 className="profData"> </h2>}
                        </div>
                    )))}
                    </div>
                    <button onClick={() => setEditModal(true)} id="editProfBtn">Edit Profile</button>
                    {editModal && (
                        <EditUserModal setEditModal={setEditModal} user={user} handleUpdate={handleUpdateUser}/>
                    )}
                    <br></br>
                </div>
                <img src="/border_deco.png" id="borderDecoRight" alt="profile page decoration"/>
            </div>
        </div>
    )
}

export default UserProfile