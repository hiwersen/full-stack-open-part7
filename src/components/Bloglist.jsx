import React from 'react';
import Blog from "./Blog";
import { useBlogQuery } from '../hooks/index';

const Bloglist = () => {
    const {
        blogs,
        isLoading,
        isError
    } = useBlogQuery()

    if ( isLoading ) return <div>loading data...</div>

    if ( isError ) return <div>Error...</div>

    return (
        <div style={{ width: "100%" }}>
            {blogs.map((blog) => (
                <Blog
                key={blog.id}
                blog={blog}
                />
            ))}
        </div>
    )
}

export default Bloglist