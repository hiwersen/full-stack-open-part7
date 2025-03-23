import React from 'react'
import { useUserValue, useBlogQuery } from '../hooks';

const BlogDetails = () => {
    const { blog, updateBlog, deleteBlog } = useBlogQuery();
     const user = useUserValue();

    const flex = {
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
      };

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
        <div style={{ marginBottom: 48 }}>
            <div>
              <a href="#" target="_blank">
                  {blog.url}
              </a>
            </div>
            <div data-testid="likes" style={flex}>
              <span style={{ marginTop: 12 }}>
                  <span>Likes</span>
                  <span style={{  marginLeft: 12 }} data-testid="likes-count">{blog.likes}</span>
              </span>
              {likeBtn()}
            </div>
            <div>Added by: {blog.user?.name || "Anonymous"}</div>
            <div style={{ textAlign: "right" }}>{deleteBtn()}</div>
        </div>
    )
}

export default BlogDetails