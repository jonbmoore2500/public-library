import React, {useContext} from "react"
import {Outlet, Link} from "react-router-dom"
import { ProfilesContext } from "../contexts/ProfilesContext"

function ProfilesLayout() {

    const {profiles} = useContext(ProfilesContext)

    return(
        <>
            {profiles ? 
            <>
                <nav className="leftnav">
                    <ul>
                        {profiles.map((p) => (
                        <li key={p.id}>
                            <Link to={"/profiles/" + p.id}>{p.username}</Link>
                        </li>
                        ))}
                    </ul>
                </nav>
                <Outlet />
            </>
            :
            <>Loading...</>}
        </>
    )
}

export default ProfilesLayout