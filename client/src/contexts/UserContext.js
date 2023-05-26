import React, {useState, useEffect} from "react"


const UserContext = React.createContext()

function UserProvider({children}) {

    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    console.log("current user", user)
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

    function handleNewExch(newExch) {
        let updatedExchs = [...user.exchanges_borrow, newExch]
        setUser({...user, exchanges_borrow: updatedExchs})
    }

    function handleExchUpdate(data, type) {
        if (type === "borrowed") {
            let updatedExchs = user.exchanges_borrow.map((e) => {
                if (e.id === data.id) {
                    return data
                }
                return e
            })
            setUser({...user, exchanges_borrow: updatedExchs})
        } else {
            let updatedExchs = user.exchanges_lend.map((e) => {
                if (e.id === data.id) {
                    return data
                }
                return e
            })
            setUser({...user, exchanges_lend: updatedExchs})
        }
    }

    return <UserContext.Provider value={{user, setUser, addUserBooks, deleteUserBook, updateUserBook, handleNewExch, handleExchUpdate}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}