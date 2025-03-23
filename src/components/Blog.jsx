import { useBlogQuery } from "../hooks";
import BlogHeading from "./BlogHeading";
import BlogDetails from "./BlogDetails";
import Comments from "./Comments"
import { Navigate } from "react-router-dom";

const Blog = () => {
  const { blog } = useBlogQuery();

  const style = {
    // backgroundColor: '#ffffff8b',
    padding: "24px 14px 12px",
    border: "solid 0.5px lightgray",
    marginTop: 48,
    marginBottom: 12,
    borderRadius: 4,
    boxShadow: "0 8px 12px #d1d1d1",
  };

  if (!blog) return <Navigate to="/" replace />

  return (
    <section data-testid="blog" className="blog" style={style}>
      <BlogHeading />
      <BlogDetails />
      <Comments />
    </section>
  );
};

export default Blog;
