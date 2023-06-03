import {Outlet, NavLink} from "react-router-dom"

function Layout() {

    return(
        <>
            <nav>
                <NavLink to ="/">Profile</NavLink>
                <NavLink to ="/user_books">Your Library</NavLink>
                <NavLink to ="/exchanges">Exchanges</NavLink>
                <NavLink to ="/library_books">Public Library</NavLink>
                <NavLink to ="/profiles">Explore Profiles</NavLink>
                <NavLink to ="/messages">Messaging Center</NavLink>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout