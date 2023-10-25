import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function SignInForm() {

    const [loginObj, setLoginObj] = useState({username: "", password: ""})
    const [error, setError] = useState(null)
    const [showPWord, setShowPWord] = useState(false)
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
            <h1 className="formTitle">Sign in:</h1>

            <form onSubmit={handleLogin}>
                <div className="registerFormTop">
                <div className="formGroup">
                    <label className="loginLabel">USERNAME</label>
                    <input
                        onChange={(e) => setLoginObj({...loginObj, username: e.target.value})} 
                        value={loginObj.username}
                        className="logInInput"
                        placeholder="USERNAME"
                    />
                </div>

                <div className="formGroup">
                    <label className="loginLabel">PASSWORD</label>
                    <input
                        onChange={(e) => setLoginObj({...loginObj, password: e.target.value})} 
                        value={loginObj.password}
                        className="logInInput"
                        placeholder="PASSWORD"
                        type={showPWord ? "" : "password"}
                    />
                </div>
                <div className="homepageSubForm">
                    <label className="pwSelect">
                        <span className="pwBoxLabel">Show password</span>
                        <input type="checkbox" checked={showPWord} onChange={() => setShowPWord(!showPWord)} />
                    </label>
                </div>
                <br></br>
                <div className="homepageSubForm">
                    {error && <h4>{error.error}</h4>}
                    <button type="submit" className="homepageBtn">Login</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default SignInForm