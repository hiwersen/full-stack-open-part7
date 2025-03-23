import Field from "./Field"
import { useField } from "../hooks/index";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const title = useField("title");
  const author = useField("author");
  const url = useField("url");

  const handleCreateBlog = () => {
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    title.reset();
    author.reset();
    url.reset();
  };

  const style = {
    width: "100%",
    marginBottom: 8,
    padding: "2px 4px",
    textAlign: "center",
  };

  return (
    <div>
      <h2 style={style}>Create New Blog</h2>
      <form>
        <Field attributes={ title } />
        <Field attributes={ author } />
        <Field attributes={ url } />
        <button type="button" onClick={handleCreateBlog}>Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
