import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";
import Notification from "./components/Notification";
import AuthForm from "./components/AuthForm";
import ToggleVisibility from "./components/ToggleVisibility";
import BlogForm from "./components/BlogForm";
import ToggleComponents from "./components/ToggleComponents";
import {
  useNotificationDispatch,
  useNotificationValue,
  useUserDispatch,
  useUserValue
} from "./hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch()
  const notificationValue = useNotificationValue();
  const notificationDispatch = useNotificationDispatch();

  const toggleBlogFormRef = useRef();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: blogs => [...blogs].sort((a, b) => b.likes - a.likes),
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const blogs = result.data;

  const queryClient = useQueryClient();

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

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: blog => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id === blog.id ? blog : b));
      const message = `"${blog.title}" has been updated`;
      showNotification({ message: message, error: false });
    },
    onError: error => {
      const message = error.response?.data?.error || "error updating blog";
      showNotification({ message, error: true });
      console.error(error.message);
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: (_, blog) => {
      queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id));
      const message = `blog "${blog.title}" has been deleted`;
      showNotification({ message: message, error: false });
    },
    onError: (error, blog) => {
      const message = error.response?.data?.error || `error deleting blog: "${blog.title}"`;
      showNotification({ message, error: true });
    }
  });

  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      userDispatch({ type: 'SET', payload: user });
      blogService.setToken(user.token);
    }
  }, [userDispatch]);

  const showNotification = notification => {
    notificationValue && clearTimeout(notificationValue?.timeoutID)

    notification.timeoutID = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' });
      }, 5000);

    notificationDispatch({ type: 'SHOW', payload: notification });
  }

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

  const updateBlog = (blogToUpdate) => {
    updateBlogMutation.mutate(blogToUpdate)
  };

  const deleteBlog = (blogToDelete) => {
    const ok = window.confirm(`Delete blog "${blogToDelete.title}" by ${blogToDelete.author}?`);
    if (!ok) return;

    deleteBlogMutation.mutate(blogToDelete)
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

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

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
          <div style={{ width: "100%" }}>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
