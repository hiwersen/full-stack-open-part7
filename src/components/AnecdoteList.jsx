import { Link } from "react-router-dom";
import { section, list } from "../styles";

const AnecdoteList = ({ anecdotes }) => (
  <section style={section}>
    <h2>Anecdotes</h2>
    <ul style={list}>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default AnecdoteList;
