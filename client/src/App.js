import React, {useContext} from "react"
import { BrowserRouter} from "react-router-dom"
import { UserContext } from "./contexts/UserContext.js"

import Header from "./components/Header.js"
import MainRoutes from "./components/MainRoutes.js"
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
            <div id="app-content">
                <MainRoutes />
            </div>
          </BrowserRouter> 
        :
          <Home />
        }
    </div>
  );
}

export default App;
