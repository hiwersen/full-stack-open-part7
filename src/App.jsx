import { useEffect, useRef } from "react";
import Bloglist from "./components/Bloglist";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";
import Notification from "./components/Notification";
import AuthForm from "./components/AuthForm";
import ToggleVisibility from "./components/ToggleVisibility";
import BlogForm from "./components/BlogForm";
import ToggleComponents from "./components/ToggleComponents";
import {
  useUserDispatch,
  useUserValue
} from "./hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useShowNotification } from './hooks/index'

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const showNotification = useShowNotification();
  const queryClient = useQueryClient();
  const toggleBlogFormRef = useRef();

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: blog => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      const message = `a new blog "${blog.title}" by ${blog.author} added`;
      showNotification({ message: message, error: false });
      toggleBlogFormRef.current.toggleVisibility();
    },
    onError: error => {
      const message = error.response?.data?.error || "error creating new blog";
      showNotification({ message, error: true });
    }
  })

  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      userDispatch({ type: 'SET', payload: user });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const signup = async (userToSignup) => {
    try {
      const user = await userService.post(userToSignup);

      if (user) {
        login({
          username: userToSignup.username,
          password: userToSignup.password,
        });
      }
    } catch (error) {
      const message = error.response.data.error || error.message;
      showNotification({ message, error: true });
    }
  };

  const login = async (userToLogin) => {
    try {
      const user = await loginService.login(userToLogin);
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: 'SET', payload: user });
    } catch (error) {
      const message = error.response.data.error || error.message;
      showNotification({ message, error: true });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    userDispatch({ type: 'CLEAR' });
  };

  const createBlog = (blogToCreate) => {
    createBlogMutation.mutate(blogToCreate)
  };

  const flex = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const authStyle = {
    width: 328,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -75%)",
    transformOrigin: "top",
  };

  return (
    <div>
      <Notification />
      {!user ? (
        <section style={authStyle}>
          <ToggleComponents showByDefault="Sign Up" hideByDefault="Log In">
            <AuthForm key="login" type="Log In" auth={login} />
            <AuthForm key="signup" type="Sign Up" auth={signup} />
          </ToggleComponents>
        </section>
      ) : (
        <section style={flex}>
          <h1>Blogs</h1>
          <div
            style={{
              fontSize: 14,
              width: "100%",
              textAlign: "right",
              paddingRight: 8,
            }}
          >
            {user.name} logged-in
            <input
              style={{
                fontSize: 14,
                marginLeft: 14,
                width: 82,
                padding: "2px 4px",
              }}
              type="button"
              value="Log out"
              onClick={handleLogout}
            />
          </div>
          <ToggleVisibility
            showLabel="Create New Blog"
            hideLabel="Cancel"
            ref={toggleBlogFormRef}
          >
          <BlogForm createBlog={createBlog} />
          </ToggleVisibility>
          <Bloglist />
        </section>
      )}
    </div>
  );
};

export default App;
