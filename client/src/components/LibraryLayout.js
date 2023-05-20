import {Outlet, Link} from "react-router-dom"

function LibraryLayout() {

    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to ="/library_books">Browse</Link>
                    </li>
                    <li>
                        <Link to ="/library_books/search">Search</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default LibraryLayout