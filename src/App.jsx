import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doSetUser } from "./reducers/userReducer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let storedUser = localStorage.getItem("user");
    if (storedUser) {
      storedUser = JSON.parse(storedUser);
      dispatch(doSetUser(storedUser));
    }
    setLoading(false);
  }, [dispatch]);

  return (
    <>
      <Notification />
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/login" element={<Auth />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute loading={loading} />}>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
