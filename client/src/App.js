import React, {useContext} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from "./contexts/UserContext.js"

import Header from "./components/Header.js"
import Layout from "./components/Layout.js"
import UserProfile from "./components/UserProfile.js"
import UserBooksCont from "./components/UserBooksCont.js"
import UserExchangesCont from "./components/UserExchangesCont.js"

import Home from "./components/Home.js"

import './App.css';
import './modal.css'


function App() {

  const {user} = useContext(UserContext)


  return (
    <div className="App">
      {user ? 
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<UserProfile />} />
              <Route path="user_books" element={<UserBooksCont />} />
              <Route path="exchanges" element={<UserExchangesCont />} />
            </Route>
          </Routes>
        </BrowserRouter> 
      :
        <Home />
      }
    </div>
  );
}

export default App;
