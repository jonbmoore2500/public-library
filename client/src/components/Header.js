import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function Header() {

    const {user, setUser} = useContext(UserContext)


    function handleLogOut(e) {
        e.preventDefault()
        fetch("/logout", {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                setUser(null)
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