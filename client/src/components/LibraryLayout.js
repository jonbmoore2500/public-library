import {Outlet, Link} from "react-router-dom"

function LibraryLayout() {

    return(
        <>
            <div>
                <h2>Chapter 4: Public Library</h2>
                <nav>
                    <Link to ="/library_books"  className="nav-bar-link">Browse</Link>
                    <Link to ="/library_books/search"  className="nav-bar-link">Search</Link>
                </nav>
            </div>

            <Outlet />
        </>
    )
}

export default LibraryLayout