import React, {useContext} from "react"
import {Outlet, Link} from "react-router-dom"
import { ProfilesContext } from "../contexts/ProfilesContext"

function ProfilesLayout() {

    const {profiles} = useContext(ProfilesContext)

    return(
        <>
            <nav>
                <ul>
                    {profiles.map((p) => (
                    <li key={p.id}>
                        <Link to ="/profiles/:userID">{p.username}</Link>
                    </li>
                    ))}
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default ProfilesLayout