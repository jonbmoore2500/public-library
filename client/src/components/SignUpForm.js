import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"
import { ProfilesContext } from "../contexts/ProfilesContext.js"

function SignUpForm() {

    const {setUser} = useContext(UserContext)
    const {newUser} = useContext(ProfilesContext)

    const [errors, setErrors] = useState([])

    const genres = ["Science Fiction", "Mystery", "Romance", "Thriller", "Horror", "Fantasy", "Historical Fiction", "Young Adult", "Biography", "Self-Help", "Academic"]
    const hoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]

    const [signUpObj, setSignUpObj] = useState({
        username: "", 
        password: "", 
        password_confirmation: "",
        neighborhood: "Uptown", 
        bio: "", 
        fav_genre: "Science Fiction",
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
            <form onSubmit={handleSignUp}>
                <h3>Sign up!</h3>
                <label>Username: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, username: e.target.value})}
                    value={signUpObj.username}
                />
                <br></br>
                <label>Password: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, password: e.target.value})}
                    value={signUpObj.password}
                />
                <label>Confirm Password: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, password_confirmation: e.target.value})}
                    value={signUpObj.password_confirmation}
                />
                <br></br>
                <label>Neighborhood: </label>
                <select 
                    onChange={(e) => setSignUpObj({...signUpObj, neighborhood: e.target.value})} 
                    value={signUpObj.neighborhood}
                >
                    {hoods.map((h, i) => (
                        <option key={i} value={h}>{h}</option>
                    ))}
                </select>
                <label>User Bio: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, bio: e.target.value})}
                    value={signUpObj.bio}
                />
                <br></br>
                <label>Favorite Genre: </label>
                <select 
                    onChange={(e) => setSignUpObj({...signUpObj, fav_genre: e.target.value})} 
                    value={signUpObj.fav_genre}
                >
                    {genres.map((g, i) => (
                        <option key={i} value={g}>{g}</option>
                    ))}
                </select>
                <label>Favorite Author: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, fav_author: e.target.value})}
                    value={signUpObj.fav_author}
                />
                {errors && <ul>{errors.map((e) => <li>{e}</li>)}</ul>}
                <br></br>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm