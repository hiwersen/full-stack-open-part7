import React from "react";
import { useBlogQuery, useBlogs } from "../hooks/index";
import { Link } from "react-router-dom";
import { color, size, listStyle, flex, styleInitial } from "../styles";

const Bloglist = () => {
  const { isLoading, isError } = useBlogQuery();
  const blogs = useBlogs();

  const error = {
    ...styleInitial,
    color: color.error,
    borderColor: color.error,
  };

  if (isLoading)
    return (
      <div>
        <span style={styleInitial}>Loading blogs...</span>
      </div>
    );

  if (isError)
    return (
      <div>
        <span style={error}>Error loading blogs...</span>
      </div>
    );

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
