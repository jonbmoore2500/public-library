import {useEffect, useState} from "react"
import axios from "axios"

function useLibraryGet(pageNum) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setBooks([])
    }, [])

    useEffect(() => {
        setLoading(true)
        setError(false)
        fetch(`/library?page=${pageNum}`)
        .then(r => r.json())
        .then((data) => {
            setBooks(prevBooks => {
                return [...prevBooks, ...data]
            })
            setHasMore(data.length == 20) // make sure to match changes to page size in back end pagination
            setLoading(false)
        })
    }, [pageNum])
    return {loading, error, books, hasMore}
}

export default useLibraryGet