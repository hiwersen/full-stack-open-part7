import React, { useEffect } from "react";
import { useUsers } from "../hooks/index";
import { Link } from "react-router-dom";
import { flex, listStyle, size } from "../styles";
import Subheading from "./Subheading";
import { useDispatch } from "react-redux";
import { setUsers } from "../reducers/usersReducer";

const Users = () => {
  const users = useUsers();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch]);

  const style = {
    ...flex,
    padding: `${size.sz7} 0`,
  };

  return (
    users && (
      <section>
        <Subheading text="Users" />
        <div style={style}>
          <div style={{ flex: 2 }}>
            <h3>Name</h3>
            <ul>
              {users.map((user) => (
                <li style={listStyle} key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    {user?.name || user.username}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Blogs Created</h3>
            <ul>
              {users.map((user) => (
                <li style={listStyle} key={user.id}>
                  {user.blogs.length}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  );
};

export default Users;
