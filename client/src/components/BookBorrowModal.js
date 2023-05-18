import React from "react"

function BookBorrowModal({setShowModal, book}) {

    function handleSubmitRequest() {
        console.log("submit")
        fetch("/exchanges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                book_id: book.id,
                approved: false,
                received: false,
                returned: false,
                complete: false
            })
            // add default false booleans in back end, don't need to include in this step
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    console.log(data)
                    // add to user's exchanges
                })
            } else {
                r.json().then(errors => console.log(errors))
            }
        })
    }

console.log(book)
    return(
        <div className="modal">
            <div onClick={() => setShowModal(false)} className="overlay"></div> 
            <div className="modal-content">
                <h3>{book.title}</h3>
                <h4>{book.author}</h4>
                <h5>{book.genre}, {book.num_pages} pages, hardback: {book.hardback.toString()}</h5>
                <p>{book.notes}</p>
                <h4>Owner: info here</h4>
                {/* add link to user's profile 
                add option to message user */}
                <button onClick={() => handleSubmitRequest()}>Request to borrow?</button>
            </div>
        </div>
    )
}



export default BookBorrowModal