import React from "react";
import { useMatch } from "react-router-dom";
import { useUsers } from "../hooks";
import { listStyle, flex, color, size } from "../styles";
import Subheading from "./Subheading";
import { Link } from "react-router-dom";

const User = () => {
  const match = useMatch("/users/:id");
  const users = useUsers();
  const user = users.find(({ id }) => match.params.id === id) || null;
  const name = user?.name || user?.username;

  const liStyle = {
    ...flex,
    ...listStyle,
  };

  const style = {
    padding: `${size.sz7} 0`,
  };

  return (
    user && (
      <section>
        <Subheading text={name} />
        <div style={style}>
          <h3>Blogs Created</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li style={liStyle} key={blog.id}>
                <span>
                  Title: <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </span>
                <span style={{ color: color.c3 }}>by: {blog.author}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  );
};

export default User;
