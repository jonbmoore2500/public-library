import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"

function SignUpForm() {

    const {setUser} = useContext(UserContext)


    const [signUpObj, setSignUpObj] = useState({
        username: "", 
        password: "", 
        password_confirmation: "",
        neighborhood: "", 
        bio: "", 
        fav_genre: "",
        fav_author: ""
    })

    function handleSignUp(e) {
        e.preventDefault()
        console.log(signUpObj)
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
                <label>Neighborhood: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, neighborhood: e.target.value})}
                    value={signUpObj.neighborhood}
                />
                <label>User Bio: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, bio: e.target.value})}
                    value={signUpObj.bio}
                />
                <label>Favorite Genre: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, fav_genre: e.target.value})}
                    value={signUpObj.fav_genre}
                />
                <label>Favorite Author: </label>
                <input 
                    onChange={(e) => setSignUpObj({...signUpObj, fav_author: e.target.value})}
                    value={signUpObj.fav_author}
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default SignUpForm