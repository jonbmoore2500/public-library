import React from "react"
import { Routes, Route } from "react-router-dom"

import Layout from "./Layout.js"
import LibraryLayout from "./LibraryLayout.js"
import UserProfile from "./UserProfile.js"
import UserBooksCont from "./UserBooksCont.js"
import UserExchangesCont from "./UserExchangesCont.js"
import LibraryBrowse from "./LibraryBrowse.js"
import LibrarySearch from "./LibrarySearch.js"
import ProfilesLayout from "./ProfilesLayout.js"
import ProfileCont from "./ProfileCont.js"
import MessagesCont from "./MessagesCont.js"
import HelpPage from "./HelpPage.js"

function MainRoutes() {

    return(
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<UserProfile />} />
                <Route path="user_books" element={<UserBooksCont />} />
                <Route path="exchanges" element={<UserExchangesCont />} />
                <Route path="library_books" element={<LibraryLayout />}>
                    <Route index element={<LibraryBrowse/>} />
                    <Route path="search" element={<LibrarySearch />} />
                </Route>
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