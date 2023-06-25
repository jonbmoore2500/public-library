import React, {useContext} from "react"
import {Outlet, Link} from "react-router-dom"
import { ProfilesContext } from "../contexts/ProfilesContext"

function ProfilesLayout() {

    const {profiles} = useContext(ProfilesContext)

    return(
        <>
            {profiles ? 
            <>
                <h2 className="chapter-header">Chapter 5: Other Users</h2>
                <div className="chapter-content"> 
                    <nav className="leftnav">
                        {profiles ? 
                            <div>
                                {profiles.map((p) => (
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