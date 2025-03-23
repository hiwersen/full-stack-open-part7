import Field from "./Field"
import { useField } from "../hooks/index";
import PropTypes from "prop-types";

const AuthForm = ({ type, auth }) => {
  const name = useField('name');
  const username = useField('username');
  const password = useField('password', 'password');

  const handleAuth = async (event) => {
    event.preventDefault();

    auth({
      username : username.value,
      password : password.value,
      name : name.value
    });
  };

  return (
    <>
      <h1>{type === "Sign Up" ? "Signup" : "Login"}</h1>
      <form onSubmit={handleAuth}>
        {type === "Sign Up" && <Field attributes={ name } />}
        <Field attributes={ username } />
        <Field attributes={ password } />
        <button type="submit">{type}</button>
      </form>
    </>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
  auth: PropTypes.func.isRequired,
};

export default AuthForm;
