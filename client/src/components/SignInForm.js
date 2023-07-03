import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function SignInForm() {

    const [loginObj, setLoginObj] = useState({username: "", password: ""})
    const [error, setError] = useState(null)
    const {setUser} = useContext(UserContext)

    function handleLogin(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then(user => {
                    setUser(user)
                })
            } else {
                r.json().then(err => {
                    setError(err)
                })
            }
        })
    }

    return(
        <div className="userform">
            <form onSubmit={handleLogin}>
                <h3>Sign in!</h3>
                <label>Username: </label>
                <input
                    onChange={(e) => setLoginObj({...loginObj, username: e.target.value})}
                    value={loginObj.username}
                /> 
                <label>Password: </label>
                <input
                    onChange={(e) => setLoginObj({...loginObj, password: e.target.value})}
                    value={loginObj.password}
                />
                <br></br>
                {error && <h4>{error.error}</h4>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default SignInForm