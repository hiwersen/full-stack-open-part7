import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { flex, listStyle, size } from "../styles";
import Subheading from "./Subheading";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../reducers/usersReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch]);

  const style = {
    ...flex,
    padding: `${size.sz7} 0`,
  };

  return (
    users.length && (
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
