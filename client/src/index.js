import React from "react";
import App from "./App";
import ReactDOM from 'react-dom/client';

import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "./context/user";
import { AdminProvider } from "./context/admin";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
console.log(API_KEY)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <Router>
      <UserProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>

);
