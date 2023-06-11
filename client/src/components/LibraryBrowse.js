import React, {useState, useRef, useCallback} from "react"
import useLibraryGet from "../custom_hooks/useLibraryGet"
import BookCard from "./BookCard"

function LibraryBrowse() {

    const [pageNum, setPageNum] = useState(1)
    const {books, hasMore, loading, error, handleExchanged} = useLibraryGet(pageNum)
    const observer = useRef()
    
    const lastBookRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prevPageNum => prevPageNum + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return(
        <div>
            <h2>Chapter 4: Public Library</h2>
            <h3>Browse</h3>
            <ul>
                {books.map((b, i) => {
                    if (books.length === i + 1) {
                        return <li ref={lastBookRef} key={b.id}> <BookCard book={b} owned={false} handleExchanged={handleExchanged}/> </li>
                    } else {
                    return <li key={b.id}> <BookCard book={b} owned={false} handleExchanged={handleExchanged}/> </li>
                    }
                })}
            </ul>
            <div>{ loading ? "Loading..." : null }</div>
        </div>
    )
}

export default LibraryBrowse