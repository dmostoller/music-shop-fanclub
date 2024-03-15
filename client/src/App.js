import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import './semantic/dist/semantic.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from './components/Nav'
import Footer from './components/Footer'
import Shop from "./components/Shop";
import HomePage from "./components/HomePage";
import Learn from "./components/Learn.js";
import { useUser } from "./context/user";
import { useAdmin } from "./context/admin.js"
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


  return (
  <div style={{backgroundColor: "#303030"}} className="App">
    <Nav onLogout={handleLogout}/>
    <ToastContainer/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>        
          <Route path="/video" element={<Learn/>}/>
          <Route path="/shop" element={<Shop/>}/>
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
      </Routes>
    <Footer />
  </div>
  );
}

export default App;
