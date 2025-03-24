import React from 'react'
import { useUserValue, useBlogQuery } from '../hooks';
import { color, size, flex } from '../styles';

const BlogDetails = () => {
    const { blog, updateBlog, deleteBlog } = useBlogQuery();
    const user = useUserValue();

    const style = {
      display: 'flex',
      justifyContent: 'end',
    }

    const info = {
      marginBottom: size.sz8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: size.sz6,
    }

    const author = {
      ...flex,
      color: color.c3,
      fontStyle: 'italic',
      fontSize: '1.3em',
      textShadow: `2px 2px 2px ${color.c1}`,
      marginBottom: size.sz2,
    }

      const likeBtn = () => {
        const likes = Number(blog.likes || 0) + 1;
        const blogToDelete = { ...blog, likes }

        return (
          <input
            type="button"
            value="Like"
            onClick={() => updateBlog(blogToDelete)}
          />
        );
      };

      const deleteBtn = () => {
        const style = {
          display: blog.user?.username === user?.username ? "" : "none",
        };

        return (
          <input
            style={style}
            type="button"
            value="Delete"
            onClick={() => deleteBlog(blog)}
          />
        );
      };

    return (
        <div style={style}>
          <div style={info}>

            <div>
              <div style={author}>author: {blog.author}</div>
              <div>
                <a href="#" target="_blank">{blog.url}</a>
              </div>
            </div>

            <div data-testid="likes" style={flex}>
              <span>
                  <span>Likes </span>
                  <span data-testid="likes-count">{blog.likes}</span>
              </span>
              {likeBtn()}
            </div>

            <div style={flex}>
              <div>Added by: {blog.user?.name || "Anonymous"}</div>
              <div>{deleteBtn()}</div>
            </div>
          </div>

        </div>
    )
}

export default BlogDetails