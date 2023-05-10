import React from "react"
import SignInForm from "./SignInForm.js"
import SignUpForm from "./SignUpForm.js"

function Home() {

    return(
        <div className="homepage">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}


export default Home 