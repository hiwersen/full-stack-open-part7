import React, { useEffect, useState } from "react";
import { listStyle, flex, color, size } from "../styles";
import Subheading from "./Subheading";
import { Link, Navigate, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";

const User = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const match = useMatch("/users/:id");
  const users = useSelector((state) => state.users);
  const user = users.find(({ id }) => match?.params.id === id) || null;

  const name = user?.name || user?.username;

  useEffect(() => {
    if (!users.length) {
      dispatch(setUsers());
    } else {
      setLoading(false);
    }
  }, [dispatch, users.length]);

  if (!user && !loading) return <Navigate to="/users" replace />;

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
