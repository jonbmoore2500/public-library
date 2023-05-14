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
    console.log(user)
    return <UserContext.Provider value={{user, setUser, addUserBooks, deleteUserBook, updateUserBook}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}