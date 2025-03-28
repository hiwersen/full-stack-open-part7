import { Link } from "react-router-dom";
import { list, flex } from "../styles";

const Menu = () => {
  return (
    <nav>
      <ul style={{ ...flex, ...list }}>
        <li>
          <Link to="/">anecdotes</Link>
        </li>
        <li>
          <Link to="/create">create new</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
