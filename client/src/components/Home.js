import React, {useState} from "react"
import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js"

function Home() {

    const [showSignUp, setShowSignUp] = useState(false)

    return(
        <div className="homepage">
            <div id="homepageLeft">
                <div id="homepageLCont">
                    <h1 className="appTitle">Public</h1>
                    <img src="books-logo.png" width={250} height={250} alt="Books logo"/>
                    <h1 className="appTitle">Library</h1>
                </div>
            </div>
            <div id="homepageRight">
                {showSignUp ? <SignUpForm /> : <SignInForm />}
                <div id="loginLineBreak"></div>
                <div className="homepageSubForm">
                    <button 
                        onClick={() => setShowSignUp(!showSignUp)}
                        className="homepageBtn toggleForm" 
                    >
                        {showSignUp ? "Sign In" : "Register"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home 