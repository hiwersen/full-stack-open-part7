import React from 'react'
import { useUserValue, useUsersQuery } from '../hooks/index'
import { Link } from "react-router-dom"

const Users = () => {
  const user = useUserValue();
  const { users } = useUsersQuery();

  const style = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  return user && (
    <section>
      <h2>Users</h2>
      <div style={style}>
        <div>
          <h3>Name</h3>
          { users.map(user => (
              <div key={user.id}>
                <Link to={`/users/${user.id}`}>{user?.name || user.username}</Link>
              </div>
            )) }
        </div>
        <div>
          <h3>Blogs Created</h3>
          { users.map(user => (<div key={user.id}>{user.blogs.length}</div>)) }
        </div>
      </div>
    </section>
  )
}

export default Users