import React, {useContext} from "react"
import { UserContext } from "./contexts/UserContext.js"

import Header from "./components/Header.js"
import Home from "./components/Home.js"
import './App.css';


function App() {

  const {user} = useContext(UserContext)


  return (
    <div className="App">
      {user ? 
        <div>
          <Header />
          <h3>Logged in!</h3>
        </div> 
      :
        <Home />
      }
    </div>
  );
}

export default App;
