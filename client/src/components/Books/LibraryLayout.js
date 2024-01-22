import {Outlet, Link} from "react-router-dom"

function LibraryLayout() {

    return(
        <>
            <div id="lib-header">
                <h2 className="chapter-header">Chapter 4: Public Library</h2>
                <nav>
                    <Link to ="/library_books"  className="nav-bar-link-sub">Browse</Link>
                    <Link to ="/library_books/search"  className="nav-bar-link-sub">Search</Link>
                </nav>
            </div>
            <div id="lib-content">
                <Outlet />
            </div>
        </>
    )
}

export default LibraryLayout