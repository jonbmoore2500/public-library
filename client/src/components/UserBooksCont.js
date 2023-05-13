import React, {useContext} from "react"
import { UserContext } from "../contexts/UserContext.js"
import BookCard from "./BookCard.js"
import BookFormNew from "./BookFormNew.js"


function UserBooksCont() {
    const {user} = useContext(UserContext)


    return(
        <div>
            <h3>user books container</h3>
            <BookFormNew />
            {user.owned_books.map((book) => (
                <BookCard key={book.id} book={book}/>
            ))}
        </div>
    )
}


export default UserBooksCont