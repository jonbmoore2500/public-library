import {Outlet, Link} from "react-router-dom"

function Layout() {

    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to ="/">Profile</Link>
                    </li>
                    <li>
                        <Link to ="/user_books">Your Library</Link>
                    </li>
                    <li>
                        <Link to ="/exchanges">Exchanges</Link>
                    </li>
                    {/* <li>
                        <Link to ="/library">Public Library</Link>
                    </li> */}
                    {/* 
                    // <li>
                    //     <Link to ="/profiles">Explore Profiles</Link>
                    // </li>
                    // <li>
                    //     <Link to ="/messages">Messaging Center</Link>
                    // </li>
                    */}
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout