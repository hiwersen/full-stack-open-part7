import { useNavigate } from "react-router-dom";
import { useField, useReset } from "../hooks";
import { section } from "../styles";

const CreateNew = (props) => {
  const content = useField();
  const author = useField();
  const info = useField();
  const reset = useReset(content.reset, author.reset, info.reset);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <section style={section}>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <div>
          <input type="submit" value="create" />
          <input type="button" value="reset" onClick={reset} />
        </div>
      </form>
    </section>
  );
};

export default CreateNew;
