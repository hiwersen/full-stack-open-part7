import React from 'react'
import { useMatch } from "react-router-dom"
import { useUsersQuery } from '../hooks';

const User = () => {
    const match = useMatch('/users/:id');
    const { users } = useUsersQuery();
    const user = users.find(({ id }) => match.params.id === id) || null

    return user && (
        <section>
            <h2>{ user.name || user.username }</h2>
            <ul style={{ listStyleType: 'none' }}>
                {
                    user.blogs.map(blog => (
                        <li key={blog.id}>
                            <span>{ blog.title }</span>
                            <span style={{ padding: 12 }}>{ blog.author }</span>
                        </li>
                    ))
                 }
            </ul>
        </section>
    )
}

export default User