import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import BookCard from "./BookCard"

function ProfileCont() {

    let userID = useParams()
    const [dispUser, setDispUser] = useState(null)
    
    useEffect(() => {
        fetch(`/users/${userID.userID}`)
        .then(r => r.json())
        .then(data => setDispUser(data))
    }, [userID])

    function handleExchanged(bookID) {
        let newBooks = dispUser.owned_books.map((b) => {
            if (b.id === bookID) {
                b.checked_out = true 
                return b
            }
            return b
        })
        setDispUser({...dispUser, owned_books: newBooks})
    }

    return(
        <div className="rightcontent other-profile">
            {
            dispUser ? 
                <>
                    <h2>{dispUser.username}</h2>
                    <h4>Neighborhood: {dispUser.neighborhood}</h4>
                    <h4>Bio: {dispUser.bio}</h4>
                    <h4>Favorite Genre: {dispUser.fav_genre}</h4>
                    <h4>Favorite Author: {dispUser.fav_author}</h4>
                    <h4>Completed Exchanges: {dispUser.num_ex_complete}</h4>
                    <h4>Books:</h4>
                    <div>
                        {dispUser.owned_books.map((b) => (
                            <div key={b.id} className={b.checked_out ? "book-card unavailable" : "book-card"}>
                                <BookCard book={b} ownedByUser={false} owner={dispUser} handleExchanged={handleExchanged}/> 
                            </div>
                        ))}
                    </div>
                </>
            :
                <>
                    Loading...
                </>
            }
            <br></br>
        </div>
    )
}

export default ProfileCont