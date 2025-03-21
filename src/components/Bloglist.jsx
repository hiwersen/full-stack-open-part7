import React from 'react';
import { useBlogQuery } from '../hooks/index';
import { Link } from 'react-router-dom';

const Bloglist = () => {
    const {
        blogs,
        isLoading,
        isError
    } = useBlogQuery()

    if ( isLoading ) return <div>Loading data...</div>

    if ( isError ) return <div>Error...</div>

    const style = {
        padding: "24px 14px 12px",
        border: "solid 0.5px lightgray",
        borderRadius: 4,
        marginBottom: 12,
        boxShadow: "0 8px 12px #d1d1d1",
        display: 'flex',
        justifyContent: 'space-between',
      };

    const authorStyle = {
        color: "#606060",
        marginLeft: 12,
        fontSize: 14,
    }

    return (
        <div style={{ width: "100%" }}>
            {blogs.map((blog) => (
                <div className="blog" style={style} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                    <span style={authorStyle}>{blog.author}</span>
                </div>
            ))}
        </div>
    )
}

export default Bloglist