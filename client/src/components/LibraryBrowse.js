import React, {useState, useRef, useCallback} from "react"
import useLibraryGet from "../custom_hooks/useLibraryGet"
import BookCard from "./BookCard"

function LibraryBrowse() {

    const [pageNum, setPageNum] = useState(1)
    const {books, hasMore, loading, handleExchanged} = useLibraryGet(pageNum)
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
        <div className="lib-content">
            <h3><u>Browse</u></h3>
            <div>
                {books.map((b, i) => {
                    if (books.length === i + 1) {
                        return <div ref={lastBookRef} key={b.id} className="book-card"> <BookCard book={b} owned={false} handleExchanged={handleExchanged}/> </div>
                    } else {
                    return <div key={b.id} className="book-card"> <BookCard book={b} owned={false} handleExchanged={handleExchanged}/> </div>
                    }
                })}
            </div>
            <div>{ loading ? "Loading..." : null }</div>
            <br></br>
        </div>
    )
}

export default LibraryBrowse