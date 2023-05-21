import React, {useContext, useState, useRef, useCallback} from "react"
import useLibraryGet from "../custom_hooks/useLibraryGet"
import BookCard from "./BookCard"

function LibraryBrowse() {

    const [pageNum, setPageNum] = useState(1)
    const {books, hasMore, loading, error} = useLibraryGet(pageNum)
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
            <h3>browse</h3>
            {books.map((b, i) => {
                if (books.length === i + 1) {
                    return <div ref={lastBookRef} key={b.id}> <BookCard book={b} /> </div>
                } else {
                return <div key={b.id}> <BookCard book={b} /> </div>
                }
            })}
            <div>{ loading ? "Loading..." : null }</div>
        </div>
    )
}

export default LibraryBrowse