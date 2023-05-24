import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { UserProvider } from "./contexts/UserContext";
// import { ExchangesProvider } from './contexts/ExchangesContext';
import { LibraryProvider } from './contexts/LibraryContext';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <UserProvider>
    {/* <ExchangesProvider> */}
      <LibraryProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </LibraryProvider>
    {/* </ExchangesProvider> */}
  </UserProvider>
  
  ,
  document.getElementById('root')
);
// will have ConversationsContext
// when submit message - if has Convo no need to create new one. If does not have Convo need to create new one
// message with create convo goes to convo controller
// just message goes to message controller

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
