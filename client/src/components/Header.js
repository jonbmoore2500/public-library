import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext.js"
import '../styles/homepage.css'

function Header() {

    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    function handleLogOut(e) {
        e.preventDefault()
        fetch("/logout", {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                setUser(null)
                navigate("/")
            }
        })
    }

    function handleGoToProfile(e) {
        e.preventDefault()
        console.log("profile!")
    }

    return(
        <div id="header">
            <div id="header-grid">
                <div id="header-left">
                    <button onClick={handleGoToProfile} className="headerBtn" id="profileBtn">View Profile</button>
                </div>
                <div id="header-center">
                    <h1>PUBLIC&#160;&#160;LIBRARY</h1>
                </div>
                <div id="header-right">
                    <p>User: <strong>{user.username}</strong></p>
                    <button onClick={handleLogOut} className="headerBtn" id="logoutBtn">Log out</button>
                </div>
            </div>
        </div>
    )
}

export default Header 