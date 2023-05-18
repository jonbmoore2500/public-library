import React, {useState, useEffect} from "react"


const UserContext = React.createContext()

function UserProvider({children}) {

    const [user, setUser] = useState(null)
    // const [exchanges, setExchanges] = useState(null)
    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    console.log("current user", user)
                    setUser(user)
                })
                // .then(fetch("/user_exchanges").then((r) => {
                //     if (r.ok) {
                //         r.json().then((data) => {
                //             setExchanges(data)
                //         })
                //     }
                // }))
                // best way? way to streamline? need to know the current user in order to grab the correct exchanges
            }
        })
    }, [])

    function addUserBooks(newBook) {
        setUser({...user, owned_books: [newBook, ...user.owned_books]})
    }

    function deleteUserBook(deleteID) {
        let newBooks = user.owned_books.filter(b => b.id !== deleteID)
        setUser({...user, owned_books: newBooks})
    }

    function updateUserBook(book) {
        let newBooks = user.owned_books.map((b) => {
            if (b.id === book.id) {
                return book
            }
            return b
        })
        setUser({...user, owned_books: newBooks})
    }

    return <UserContext.Provider value={{user, setUser, addUserBooks, deleteUserBook, updateUserBook}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}