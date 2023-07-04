import React, {useState, useEffect} from "react"

const ProfilesContext = React.createContext()

function ProfilesProvider({children}) {

    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        fetch("/users").then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setProfiles(data)
                })
            } else {
                r.json().then(err => console.log(err))
            }
        })
    }, [])

    function newUser(data) {
        setProfiles([...profiles, data])
    }

    return <ProfilesContext.Provider value={{profiles, setProfiles, newUser}}>{children}</ProfilesContext.Provider>
}

export {ProfilesContext, ProfilesProvider}