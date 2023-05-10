import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function Header() {

    const {setUser} = useContext(UserContext)


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
        <div>
            <h2>Header for Public Library!</h2>
            <button onClick={handleLogOut}>X</button>
        </div>
    )
}


export default Header 