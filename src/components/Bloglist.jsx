import React, { useEffect } from "react";
import { useBlog } from "../hooks/index";
import { Link } from "react-router-dom";
import { color, size, listStyle, flex } from "../styles";
import { useDispatch } from "react-redux";
import { setBlogs } from "../reducers/blogReducer";

const Bloglist = () => {
  const dispatch = useDispatch();
  const { blogs } = useBlog();

  useEffect(() => {
    dispatch(setBlogs());
  }, [dispatch]);

  const ulStyle = {
    padding: `${size.sz7} 0`,
    width: "100%",
    fontSize: "1.17em",
  };

  const liStyle = {
    ...listStyle,
    ...flex,
    fontWeight: "bold",
  };

  const authorStyle = {
    color: color.c3,
  };

  return (
    <ul style={ulStyle}>
      {blogs.map((blog) => (
        <li className="blog" style={liStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <span style={authorStyle}>{blog.author}</span>
        </li>
      ))}
    </ul>
  );
};

export default Bloglist;
