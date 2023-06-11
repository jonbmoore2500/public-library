import React, {useContext} from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext.js"

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
            <h1>PUBLIC LIBRARY</h1>
            <div id="logout">
                <p>User: {user.username}</p>
                <button onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    )
}


export default Header 