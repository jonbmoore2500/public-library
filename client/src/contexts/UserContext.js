import React, {useState, useEffect, useContext} from "react"


const UserContext = React.createContext()

function UserProvider({children}) {


    const [user, setUser] = useState(null)
    // const [convos, setConvos] = useState(null)
    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    console.log(user)
                    setUser(user)
                    // setConvos(user.convos)
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

    return <UserContext.Provider value={{user, setUser, addUserBooks, deleteUserBook, updateUserBook, handleNewExch, handleExchUpdate, handleNewMsg, handleNewConvo, handleUpdateUser}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}