import React from 'react'
import { useBlogQuery } from '../hooks';

const BlogHeading = () => {
    const { blog } = useBlogQuery();
    const flex = {
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
      };

    return (
        <h2 className="content-main" style={flex}>
            <span>{blog.title}</span>
            <span style={{ color: "#606060", fontStyle: 'italic' }}>{blog.author}</span>
        </h2>
    )
}

export default BlogHeading