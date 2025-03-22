import { useState } from "react";
import { useBlogQuery, useUserValue } from "../hooks";
import { useMatch } from "react-router-dom";

const Blog = () => {
  const [comment, setComment] = useState("")
  const { updateBlog, commentBlog, deleteBlog } = useBlogQuery();
  const user = useUserValue();

  const match = useMatch('/blogs/:id');
  const { blogs } = useBlogQuery();
  const blog = blogs.find(({ id }) => match.params.id === id) || null

  const handleAddComment = event => {
    event.preventDefault();
    commentBlog({ comment, id: blog.id })
    setComment("")
  }

  const style = {
    // backgroundColor: '#ffffff8b',
    padding: "24px 14px 12px",
    border: "solid 0.5px lightgray",
    marginTop: 48,
    marginBottom: 12,
    borderRadius: 4,
    boxShadow: "0 8px 12px #d1d1d1",
  };

  const flex = {
    display: "flex",
    justifyContent: "space-between",
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

  return blog && (
    <div data-testid="blog" className="blog" style={style}>
      <h2 className="content-main" style={flex}>
        <span>{blog.title}</span>
        <span style={{ color: "#606060", fontStyle: 'italic' }}>{blog.author}</span>
      </h2>

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

      <div>
        <h3>Comments</h3>
        <div>
          <form style={flex} onSubmit={handleAddComment}>
            <label htmlFor="comment">
              Comment:
              <input
                id="comment"
                name="comment"
                value={comment}
                onChange={({ target: { value } }) => setComment(value)}
              />
            </label>
            <input type="submit" value="Comment" />
          </form>
        </div>
        <ul>
          { blog.comments.map((c, i) => <li key={i}>{c}</li>) }
        </ul>
      </div>
    </div>
  );
};

export default Blog;
