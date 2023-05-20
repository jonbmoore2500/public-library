import React, {useState, useEffect} from "react"

const LibraryContext = React.createContext()

function LibraryProvider({children}) {

    const [books, setBooks] = useState(null)
    useEffect(() => {
        fetch("/library").then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    // console.log(data)
                    setBooks(data)
                })
            }
        })
    }, [])
    // console.log(books)
    function handleExchanged(idToRemove) {
        let newBooks = books.filter((b) => b.id !== idToRemove)
        setBooks(newBooks)
    }

    return <LibraryContext.Provider value={{books, setBooks, handleExchanged}}>{children}</LibraryContext.Provider>
}

export {LibraryContext, LibraryProvider}