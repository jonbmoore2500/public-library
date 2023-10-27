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

    return(
        <div id="header">
            <div id="header-left">
                <h1>PUBLIC LIBRARY</h1>
            </div>
            <div id="header-right">
                <p>User: <strong>{user.username}</strong></p>
                <button onClick={handleLogOut} id="logoutBtn">Log out</button>
            </div>
        </div>
    )
}

export default Header 