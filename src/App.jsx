import React from "react";
import Notification from "./components/Notification";
import Auth from "./components/Auth";
import Nav from "./components/Nav"
import Home from "./components/Home";
import Users from "./components/Users"
import User from "./components/User"
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Auth />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      <Footer />
    </div>
  );
};

export default App;
