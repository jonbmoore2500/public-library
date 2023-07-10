import React from "react"

function HelpPage() {

    return(
        <div>
            <h2 className="chapter-header">Appendix: Help</h2>
            <div className="chapter-content help-page">
                <h3>Background</h3>
                <p><strong>Public Library</strong> is an app that allows Users to curate a selection of books they may be interested in lending to other people and to peruse the selections that other Users have made available to lend. Users can then arrange Exchanges of those books with the other Users, organizing those Exchanges through an Exchange-specific interface and a Messaging functionality.</p>
                <h3>Profile</h3>
                <p>Share information about yourself, including your favorite author and genre. Other Users will want to know something about the people they're lending their books to!</p>
                <h3>Your Library</h3>
                <p>Curate your book selection here. You can add new books to your list, delete books that you no longer own or wish to lend out, and edit existing books, including hiding them temporarily or checking them back in if you received them outside the normal Exchange process. Books that other Users won't be able to borrow, either because they are already checked out or because you've chosen to hide them for the time being, are shown in a different color for the sake of organization.</p>
                <h3>Exchanges</h3>
                <p>Maintain your various <strong>Exchanges</strong> here, both where you are lending the book and where you are borrowing the book. Provide updates to the Exchanges to keep both Users &#40;the borrower and the lender&#41; in the loop on the progress of the Exchange. You can also send a message to the other User, or navigate to their public profile to learn more about them.</p>
                <h3>Public Library</h3>
                <p>Explore all the books available for you to borrow here. You can simply browse, whereby a list of all the books will be available to scroll through, or search, where you can find specific books by keyword and/or genre. Each book has a form where you can request to borrow it, message the User who owns it, or navigate to that User's public profile.</p>
                <h3>Explore Profiles</h3>
                <p>Explore the profiles of other Users here. See who they are and what books they have. You can request to borrow one of their books here, or send them messages about a book they have available. Books that are not available to borrow because they are checked out &#40;by you or by another User&#41; are shown in a darker color and do not have a button to display the borrow form.</p>
                <h3>Messaging Center</h3>
                <p>The <strong>Messaging Center</strong> is where you can view messages you've exchanged with other Users. It currently does not provide real-time chat capabilities or notifications for unread messages, but that is being planned for a future update!</p>
            </div>
        </div>
    )
}

export default HelpPage