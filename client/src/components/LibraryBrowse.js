import React, {useContext} from "react"
import { LibraryContext } from "../contexts/LibraryContext"
import BookCard from "./BookCard"

function LibraryBrowse() {

    const {books} = useContext(LibraryContext)
    return(
        <div>
            <h3>browse</h3>
            {books.map((b) => (
                <BookCard key={b.id} book={b} />
            ))}
        </div>
    )
}

export default LibraryBrowse