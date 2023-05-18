import React, {useContext} from "react"
import { LibraryContext } from "../contexts/LibraryContext.js"
import BookCard from "./BookCard.js"

function LibraryBooksCont() {

    // add infinite scroll!
    const {books} = useContext(LibraryContext)

    return(
        <div>
            {books.map((b) => (
                <BookCard key={b.id} book={b} owned={false}/>
            ))}
        </div>
    )
}


export default LibraryBooksCont