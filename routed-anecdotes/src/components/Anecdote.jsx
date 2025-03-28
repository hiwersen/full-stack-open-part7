import { section } from "../styles";

const Anecdote = ({ anecdote }) =>
  anecdote && (
    <section style={section}>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        <span>for more info see </span>
        <a href={anecdote.info} target="_blank" rel="noreferrer">
          {anecdote.info}
        </a>
      </p>
    </section>
  );

export default Anecdote;
