import React from "react";
import App from "./App";
import ReactDOM from 'react-dom/client';

import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "./context/user";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>

);
