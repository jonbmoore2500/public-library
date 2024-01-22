import React from "react"
import { Routes, Route } from "react-router-dom"

import Layout from "./Layout.js"
import LibraryLayout from "./Books/LibraryLayout.js"
import UserProfile from "./Profiles/UserProfile.js"
import HomePage from "./Profiles/HomePage.js"
import UserBooksCont from "./Profiles/UserBooksCont.js"
import UserExchangesCont from "./Exchanges/UserExchangesCont.js"
import LibraryBrowse from "./Books/LibraryBrowse.js"
import LibrarySearch from "./Books/LibrarySearch.js"
import ProfilesLayout from "./Profiles/ProfilesLayout.js"
import ProfileCont from "./Profiles/ProfileCont.js"
import MessagesCont from "./Messaging/MessagesCont.js"
import HelpPage from "./HelpPage.js"

function MainRoutes() {

    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<UserProfile />} />
                <Route path="home" element={<HomePage />} />
                <Route path="books" element={<UserBooksCont />} />


                {/* <Route path="user_books" element={<UserBooksCont />} /> */}
                {/* <Route path="exchanges" element={<UserExchangesCont />} />
                <Route path="library_books" element={<LibraryLayout />}>
                    <Route index element={<LibraryBrowse/>} />
                    <Route path="search" element={<LibrarySearch />} />
                </Route> */}
                <Route path="profiles" element={<ProfilesLayout />} >
                    <Route path=":userID" element={<ProfileCont />} />
                </Route>
                <Route path="messages" element={<MessagesCont />} />
                <Route path="help" element={<HelpPage />} />
            </Route>
        </Routes>
    )
}

export default MainRoutes