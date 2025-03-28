import { useState, useEffect } from "react";
import { useBlog } from "../hooks";
import Subheading from "./Subheading";
import BlogDetails from "./BlogDetails";
import Comments from "./Comments";
import { Navigate, useMatch } from "react-router-dom";
import { setBlogs } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { blogs } = useBlog();
  const match = useMatch("/blogs/:id");
  const blog = blogs.find(({ id }) => match?.params.id === id) || null;

  useEffect(() => {
    if (!blogs.length) {
      dispatch(setBlogs());
    } else {
      setLoading(false);
    }
  }, [dispatch, blogs.length]);

  if (!blog && !loading) return <Navigate to="/" replace />;

  return (
    blog && (
      <section data-testid="blog">
        <Subheading text={blog.title} />
        <BlogDetails />
        <Comments />
      </section>
    )
  );
};

export default Blog;
