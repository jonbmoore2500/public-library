import React, {useState, useEffect} from "react"


const UserContext = React.createContext()

function UserProvider({children}) {

    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                })
            }
        })
    }, [])

    function updateUserBooks(newBook) {
        setUser({...user, owned_books: [newBook, ...user.owned_books]})
    }
    console.log(user)
    return <UserContext.Provider value={{user, setUser, updateUserBooks}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}