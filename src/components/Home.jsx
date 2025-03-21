import React, { useEffect } from 'react'
import Bloglist from "./Bloglist";
import CreateBlog from "./CreateBlog";
import blogService from "../services/blogs";
import {
  useUserDispatch,
  useUserValue
} from "../hooks/index";

const Home = () => {
    const user = useUserValue();
    const userDispatch = useUserDispatch();

    useEffect(() => {
        let user = window.localStorage.getItem("user");
        if (user) {
          user = JSON.parse(user);
          userDispatch({ type: 'SET', payload: user });
          blogService.setToken(user.token);
        }
      }, [userDispatch]);

      const flex = {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      };

  return user && (
    <section style={flex}>
        <CreateBlog />
        <Bloglist />
    </section>
  )
}

export default Home