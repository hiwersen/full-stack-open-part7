import { useState } from "react";
import PropTypes from "prop-types";
import { useBlogQuery, useUserValue } from "../hooks";

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const { updateBlog, deleteBlog } = useBlogQuery();
  const user = useUserValue();

  const style = {
    // backgroundColor: '#ffffff8b',
    padding: "24px 14px 12px",
    border: "solid 0.5px lightgray",
    borderRadius: 4,
    marginBottom: 12,
    boxShadow: "0 8px 12px #d1d1d1",
  };

  const flex = {
    display: "flex",
    justifyContent: "space-between",
  };

  const toggleViewBtn = () => (
    <input
      type="button"
      value={viewDetails ? "Hide" : "View"}
      onClick={() => setViewDetails(!viewDetails)}
    />
  );

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
    <div data-testid="blog" className="blog" style={style}>
      <div className="content-main" style={{ ...flex, fontSize: 18 }}>
        <span>
          {blog.title}, {blog.author}
        </span>
        {toggleViewBtn()}
      </div>
      <div
        className="content-details"
        style={{ display: viewDetails ? "" : "none", fontSize: 14 }}
      >
        <div>
          <a href="#" target="_blank">
            {blog.url}
          </a>
        </div>
        <div data-testid="likes" style={flex}>
          Likes <span data-testid="likes-count">{blog.likes}</span>&nbsp;
          {likeBtn()}
        </div>
        <div>{blog.user?.name}</div>
        <div style={{ textAlign: "right" }}>{deleteBtn()}</div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
