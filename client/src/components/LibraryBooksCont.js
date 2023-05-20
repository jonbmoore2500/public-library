import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"
import { LibraryContext } from "../contexts/LibraryContext.js"
import BookSort from "./BookSort.js"
import BookSearch from "./BookSearch.js"
import BookCard from "./BookCard.js"

function LibraryBooksCont() {

    // add infinite scroll!
    const {books} = useContext(LibraryContext)


    return(
        <div>
            <BookSort />
            <BookSearch />
            {books.map((b) => (
                <BookCard key={b.id} book={b} owned={false}/>
            ))}
        </div>
    )
}


export default LibraryBooksCont