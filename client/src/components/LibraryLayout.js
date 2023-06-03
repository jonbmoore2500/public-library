import {Outlet, Link} from "react-router-dom"

function LibraryLayout() {

    return(
        <>
            <nav>

                        <Link to ="/library_books">Browse</Link>

                        <Link to ="/library_books/search">Search</Link>

            </nav>

            <Outlet />
        </>
    )
}

export default LibraryLayout