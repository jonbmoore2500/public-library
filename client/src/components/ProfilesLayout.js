import React, {useContext} from "react"
import {Outlet, Link} from "react-router-dom"
import { ProfilesContext } from "../contexts/ProfilesContext"
import { UserContext } from "../contexts/UserContext"

function ProfilesLayout() {

    const {profiles} = useContext(ProfilesContext)
    const {user} = useContext(UserContext)

    return(
        <>
            {profiles ? 
            <>
                <h2 className="chapter-header">Chapter 5: Other Users</h2>
                <div className="chapter-content"> 
                    <nav className="leftnav">
                        {profiles ? 
                            <div>
                                {profiles.filter(prof => prof.id != user.id).map((p) => (
                                <div key={p.id} className="user-link">
                                    <Link to={"/profiles/" + p.id} >{p.username}</Link>
                                </div>
                                ))}
                            </div>
                        :
                            <h2>loading...</h2>
                        }
                    </nav>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </>
            :
            <>Loading...</>}
        </>
    )
}

export default ProfilesLayout