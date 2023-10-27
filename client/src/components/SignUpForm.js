import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"
import { ProfilesContext } from "../contexts/ProfilesContext.js"

function SignUpForm() {

    const {setUser} = useContext(UserContext)
    const {newUser} = useContext(ProfilesContext)

    const [errors, setErrors] = useState([])
    const [showPWord, setShowPWord] = useState(false)

    const genres = [
        "Classics", "Tragedy", "Science Fiction", "Fantasy", "Action & Adventure", "Crime & Mystery", "Romance", "Humor", "Horror",
        "Other (fiction)", "Biography", "Cookbook", "History", "Self Help", "Academic", "Other (non fiction)"
        ]
    const hoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]

    const [signUpObj, setSignUpObj] = useState({
        username: "", 
        password: "", 
        password_confirmation: "",
        neighborhood: hoods[0], 
        bio: "", 
        fav_genre: genres[0],
        fav_author: ""
    })

    function handleSignUp(e) {
        e.preventDefault()
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    newUser(user)
                })
            } else {
                r.json().then(err => {
                    setErrors(err.errors)
                })
            }
        })
    }

    return(
        <div className="userform">
            <h1 className="formTitle">Register:</h1>
            <form onSubmit={handleSignUp}>
                <div className="registerFormTop">
                    <div className="formGroup">
                        <label className="loginLabel">USERNAME</label>
                        <input
                            onChange={(e) => setSignUpObj({...signUpObj, username: e.target.value})}
                            value={signUpObj.username}
                            className="logInInput"
                            placeholder="USERNAME"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="loginLabel">PASSWORD</label>
                        <input
                            onChange={(e) => setSignUpObj({...signUpObj, password: e.target.value})}
                            value={signUpObj.password}
                            type={showPWord ? "" : "password"}
                            className="logInInput"
                            placeholder="PASSWORD"
                        />
                    </div>
                    <div className="formGroup">
                        <label className="loginLabel">CONFIRM</label>
                        <input
                            onChange={(e) => setSignUpObj({...signUpObj, password_confirmation: e.target.value})}
                            value={signUpObj.password_confirmation}
                            type={showPWord ? "" : "password"}
                            className="logInInput"
                            placeholder="CONFIRM PASSWORD"
                        />
                    </div>
                    <div className="homepageSubForm">
                        {signUpObj.password_confirmation.length > 0 && signUpObj.password_confirmation !== signUpObj.password ? <p id="pwordError">Passwords must match</p> : null }
                        <label>Show password</label>
                        <input type="checkbox" checked={showPWord} onChange={() => setShowPWord(!showPWord)} />
                    </div>       
                </div>
                <div id="registerFormBottom">
                    <div className="formGroup firstForm">
                        <label className="loginLabel">NEIGHBORHOOD</label>
                        <select 
                            onChange={(e) => setSignUpObj({...signUpObj, neighborhood: e.target.value})} 
                            value={signUpObj.neighborhood}
                            className="logInInput"
                        >
                            {hoods.map((h, i) => (
                                <option key={i} value={h}>{h}</option>
                            ))}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="loginLabel">USER BIO</label>
                        <input
                            onChange={(e) => setSignUpObj({...signUpObj, bio: e.target.value})}
                            value={signUpObj.bio}
                            className="logInInput"
                            placeholder="USER BIO"
                        />
                    </div>
                    <h2 style={{textAlign: "left", paddingLeft: "10%", marginBottom: 0}}>Favorite: </h2>
                    <div className="formGroup firstForm">
                        <label className="loginLabel">GENRE</label>
                        <select 
                            onChange={(e) => setSignUpObj({...signUpObj, fav_genre: e.target.value})} 
                            value={signUpObj.fav_genre}
                            className="logInInput"
                        >
                            <optgroup label="Fiction">
                                {genres.slice(0, 10).map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Non-fiction">
                                {genres.slice(11, 16).map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label className="loginLabel">AUTHOR</label>
                        <input
                            onChange={(e) => setSignUpObj({...signUpObj, fav_author: e.target.value})}
                            value={signUpObj.fav_author}
                            className="logInInput"
                            placeholder="FAVORITE AUTHOR"
                        />
                    </div>
                    {errors && <ul>{errors.map((e) => <li>{e}</li>)}</ul>}
                    <div className="homepageSubForm">
                        <button type="submit" className="homepageBtn">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm