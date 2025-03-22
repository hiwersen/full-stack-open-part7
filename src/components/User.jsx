import React from 'react'
import { useMatch } from "react-router-dom"
import { useUsersQuery } from '../hooks';

const User = () => {
    const match = useMatch('/users/:id');
    const { users } = useUsersQuery();
    const user = users.find(({ id }) => match.params.id === id) || null

    const usersStyle = {
        padding: 8,
        listStyle: "none",
        borderTop: "solid 1px #d1d1d1",
    }

    const flex = {
        display: "flex",
        justifyContent: "space-between",
    };

    return user && (
        <section style={{ margin: "44px 24px" }}>
            <h2>{ user.name || user.username }</h2>
            <ul>
                {
                    user.blogs.map(blog => (
                        <li style={{ ...usersStyle, ...flex }} key={blog.id}>
                            <span>{ blog.title }</span>
                            <span style={{ fontStyle: "italic", color: "#606060" }}>by: { blog.author }</span>
                        </li>
                    ))
                 }
            </ul>
        </section>
    )
}

export default User