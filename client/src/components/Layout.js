import {Outlet, NavLink} from "react-router-dom"

function Layout() {

    return(
        <>
            <div id="navs-main">
                <nav>
                    {/* <NavLink to ="/" className="nav-bar-link">Profile</NavLink> */}
                    <NavLink to ="/home" className="nav-bar-link">Home Page</NavLink>
                    <NavLink to ="/books" className="nav-bar-link">Your Books</NavLink>
                    {/* <NavLink to ="/exchanges" className="nav-bar-link">Exchanges</NavLink>
                    <NavLink to ="/explore" className="nav-bar-link">Explore</NavLink>
                    <NavLink to ="/messages" className="nav-bar-link">Messaging Center</NavLink>
                    <NavLink to ="/help" className="nav-bar-link">Help</NavLink> */}

                    {/* <NavLink to ="/library_books" className="nav-bar-link">Public Library</NavLink> */}
                    {/* <NavLink to ="/profiles" className="nav-bar-link">Explore Profiles</NavLink> */}
                </nav>
            </div>
            <div id="navs-content">
                <Outlet />
            </div>
        </>
    )
}

export default Layout