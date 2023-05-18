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

    return <LibraryContext.Provider value={{books, setBooks}}>{children}</LibraryContext.Provider>
}

export {LibraryContext, LibraryProvider}