import React, {useState, useEffect, useContext} from "react"

const ProfilesContext = React.createContext()

function ProfilesProvider({children}) {

    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        fetch("/users").then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setProfiles(data)
                })
            }
        })
    }, [])

    return <ProfilesContext.Provider value={{profiles, setProfiles}}>{children}</ProfilesContext.Provider>
}

export {ProfilesContext, ProfilesProvider}