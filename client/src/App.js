import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './semantic/dist/semantic.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useUser } from "./context/user";
import { useAdmin } from "./context/admin.js"

import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from "./components/HomePage";
import Learn from "./components/Learn.js";
import LoginForm from "./components/Login";
import PostDetail from './components/PostDetail.js';
import AddPost from "./components/AddPost.js";
import EditPost from "./components/EditPost.js";
import EventsPage from "./components/EventsPage.js";
import EventDetail from "./components/EventDetail.js";
import AddEvent from "./components/AddEvent.js";
import EditEvent from "./components/EditEvent.js";
import AboutPage from "./components/AboutPage.js";
import ContactPage from "./components/ContactPage.js"
import SignUp from "./components/SignUp.js";
import ReleasesPage from "./components/ReleasesPage.js";
import AddRelease from "./components/AddRelease.js";
import EditRelease from "./components/EditRelease.js";
import User from "./components/User.js";
import Forum from "./components/Forum.js";
import SearchResults from "./components/SearchResults.js";
import ReleaseDetail from "./components/ReleaseDetail.js";
import FormTest from "./components/TestForm.js";



function App() {
  const { setUser } = useUser()
  const { setIsAdmin } = useAdmin()
  const navigate = useNavigate();

  function checkAdminStatus(user) {
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
  }

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          checkAdminStatus(user);
        }
    )}
    });
  }, [setUser]);

  function handleLogin(user) {
    setUser(user);
    user.is_admin ? setIsAdmin(true) : setIsAdmin(false)
    toast.dark(`Welcome back, ${user.username}!`);
  }

  function handleLogout() {
    setUser(null);
    setIsAdmin(false)
    navigate('/')
    toast.dark(`Goodbye, thanks for visiting!`);
  }
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
  // console.log(API_KEY)
  return (
  <div style={{backgroundColor: "#303030"}} className="App">
    <Nav onLogout={handleLogout}/>
    <ToastContainer/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>        
          <Route path="/learn" element={<Learn/>}/>
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>}/>
          <Route path="/signup" element={<SignUp/>} /> 
          <Route path="/posts/:id" element={<PostDetail/>} />
          <Route path="/posts/new" element={<AddPost/>} />
          <Route path="/posts/:id/edit" element={<EditPost/>} />
          <Route path="/events" element={<EventsPage/>} />
          <Route path="/events/:id" element={<EventDetail />} /> 
          <Route path="/events/:id/edit" element={<EditEvent/>} />
          <Route path="/events/new" element={<AddEvent/>} />
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/releases" element={<ReleasesPage/>}/>
          <Route path="/releases/new" element={<AddRelease/>}/>
          <Route path="/releases/:id/edit" element={<EditRelease/>}/>
          <Route path="/releases/:id" element={<ReleaseDetail/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/forum" element={<Forum/>}/>
          <Route path="/search_results/:searchParams" element={<SearchResults/>}/>
          <Route path="/formtest" element={<FormTest />}/>
      </Routes>
    <Footer />
  </div>
  );
}

export default App;
