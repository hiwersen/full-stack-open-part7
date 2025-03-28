import Field from "./Field";
import { useField } from "../hooks/index";
import Subheading from "./Subheading";

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

  return (
    <div>
      <Subheading text="Create New Blog" />
      <form>
        <Field attributes={title} />
        <Field attributes={author} />
        <Field attributes={url} />
        <button type="button" onClick={handleCreateBlog}>
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
