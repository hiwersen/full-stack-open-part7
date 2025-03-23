import React from 'react'
import { useUsersQuery } from '../hooks/index'
import { Link } from "react-router-dom"

const Users = () => {
  const { users } = useUsersQuery();

  const flex = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 24,
  }

  const listStyle = {
    padding: "16px 8px 4px",
    listStyle: "none",
    borderBottom: "solid 1px #d1d1d1",
}

  return (
    <section style={{ margin: "44px 24px" }}>
      <h2>Users</h2>
      <div style={flex}>
        <div style={{ flex: 1 }}>
          <h3>Name</h3>
          { users.map(user => (
              <div style={listStyle} key={user.id}>
                <Link to={`/users/${user.id}`}>{user?.name || user.username}</Link>
              </div>
            )) }
        </div>
        <div>
          <h3>Blogs Created</h3>
          { users.map(user => (<div style={listStyle} key={user.id}>{user.blogs.length}</div>)) }
        </div>
      </div>
    </section>
  )
}

export default Users