import React, { useState, useEffect } from 'react'
import usersService from '../services/users'
import { useUserValue } from '../hooks/index'

const Users = () => {
  const user = useUserValue();
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll().then(users => setUsers(users))
  }, [])

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
          { users.map(user => (<div key={user.id}>{user?.name || user.username}</div>)) }
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