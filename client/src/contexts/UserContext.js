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

    if (user) console.log(user)

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

    function exchUpdateHelper(arr, data) {
        let results = arr.map((e) => {
            if (e.id === data.id) {
                return data
            }
            return e
        })
        return results
    }

    function handleExchUpdate(data, type) {
        if (type === "borrowed") {
            setUser({...user, exchanges_borrow: exchUpdateHelper(user.exchanges_borrow, data)})
        } else {
            let updatedExchs = []
            let updatedBooks = []
            if (data.complete === true) {
                updatedExchs = user.exchanges_lend.filter((e) => e.id !== data.id)
                updatedBooks = user.owned_books.map((b) => {
                    if (data.book_id === b.id) {
                        b.checked_out = false
                        return b
                    }
                    return b
                })
            } else {
                updatedExchs = exchUpdateHelper(user.exchanges_lend, data)
                updatedBooks = user.owned_books.map((b) => {
                    if (data.book_id === b.id) {
                        b.checked_out = true
                        return b
                    }
                    return b
                })
            }
            setUser({...user, exchanges_lend: updatedExchs, owned_books: updatedBooks})
        }
    }

    function exchNotifHelper(arr, ids){
        return arr.map((e) => {
            if (ids.includes(e.id)) { e.update_read = true } 
            return e 
        })
    }

    function handleExchNotifRead(lendIDs, borrowIDs) {
        setUser({
            ...user, 
            exchanges_lend: exchNotifHelper(user.exchanges_lend, lendIDs),
            exchanges_borow: exchNotifHelper(user.exchanges_borrow, borrowIDs)
        })
    }

    function handleNewMsg(msg) {
        let updatedConvos = user.convos.map((c) => {
            if (msg.conversation_id === c.id) {
                c.messages = [...c.messages, msg]
                return c
            }
            return c
        })
        setUser({...user, convos: updatedConvos})
    }
    
    function handleNewConvo(convo) {
        setUser({...user, convos: [...user.convos, convo]})
    }

    function handleUpdateUser(data) {
        setUser({...user, bio: data.bio, fav_author: data.fav_author, fav_genre: data.fav_genre, neighborhood: data.neighborhood})
    }

    return <UserContext.Provider value={{user, setUser, addUserBooks, updateUserBook, deleteUserBook, handleNewExch, handleExchUpdate, handleExchNotifRead, handleNewMsg, handleNewConvo, handleUpdateUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}