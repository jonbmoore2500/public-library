import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { UserProvider } from "./contexts/UserContext";
import { ProfilesProvider } from './contexts/ProfilesContext';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <UserProvider>
    <ProfilesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProfilesProvider>
  </UserProvider>
  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
