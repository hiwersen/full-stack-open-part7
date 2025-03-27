import { useContext, useRef, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import loginService from "../services/login";
import usersService from "../services/users";
import { useNavigate, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  doRemoveNotification,
  doSetNotification,
} from "../reducers/notificationReducer";
import {
  setBlogs,
  createBlog as createBlogAction,
  likeBlog as likeBlogAction,
  commentBlog as commentBlogAction,
  updateBlog as updateBlogAction,
  deleteBlog as deleteBlogAction,
} from "../reducers/blogReducer";
import { createSelector } from "@reduxjs/toolkit";

export const useUserValue = () => {
  return useContext(UserContext).user[0];
};

export const useUserDispatch = () => {
  return useContext(UserContext).user[1];
};

export const useUserLoading = () => {
  return useContext(UserContext).loading;
};

export const useNotificationValue = () => {
  return useSelector((state) => state.notification);
};

export const useShowNotification = () => {
  const notification = useNotificationValue();
  const dispatch = useDispatch();

  return (notificationToShow) => {
    notification && clearTimeout(notification?.timeoutID);

    notificationToShow.timeoutID = setTimeout(() => {
      dispatch(doRemoveNotification());
    }, 5000);

    dispatch(doSetNotification(notificationToShow));
  };
};

export const useUsersQuery = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    retry: false,
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
  };
};

export const useBlog = () => {
  const match = useMatch("/blogs/:id");
  const dispatch = useDispatch();
  const showNotification = useShowNotification();
  const toggleBlogFormRef = useRef();
  const user = useUserValue();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setBlogs());
  }, [dispatch]);

  const selectBlogs = (state) => state.blogs;
  const outputSelector = (blogs) => {
    return [...blogs].sort((a, b) => b.likes.length - a.likes.length);
  };
  const memoizedSelector = createSelector([selectBlogs], outputSelector);

  const blogs = useSelector(memoizedSelector);

  const blog =
    match && (blogs.find(({ id }) => match.params.id === id) || null);

  const createBlog = async (blogToCreate) => {
    try {
      await dispatch(createBlogAction(blogToCreate));
      const message = `a new blog "${blogToCreate.title}" by ${blogToCreate.author} added`;
      showNotification({ message, error: false });
      toggleBlogFormRef.current?.toggleVisibility();
    } catch (error) {
      console.log("error:", error);
      const message = error.response?.data?.error || "error creating new blog";
      showNotification({ message, error: true });
    }
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      await dispatch(updateBlogAction(blogToUpdate));
      const message = `"${blogToUpdate.title}" has been updated`;
      showNotification({ message, error: false });
    } catch (error) {
      const message = error.response?.data?.error || "error updating blog";
      showNotification({ message, error: true });
    }
  };

  let userHasLiked = false;
  const likeBlog = async (blogToLike) => {
    userHasLiked = blogToLike?.likes?.some(
      ({ username }) => username === user.username,
    );
    const message = `You have already liked this blog!`;
    if (userHasLiked) return showNotification({ message, error: true });

    try {
      await dispatch(likeBlogAction(blogToLike));
      const message = `"${blogToLike.title}" liked`;
      showNotification({ message: message, error: false });
    } catch (error) {
      const message = error.response?.data?.error || "error liking blog";
      showNotification({ message, error: true });
    }
  };

  const commentBlog = async (comment) => {
    try {
      await dispatch(commentBlogAction(comment));
      const message = `comment: "${comment.comment}" added!`;
      showNotification({ message: message, error: false });
    } catch (error) {
      const message = error.response?.data?.error || "error commenting blog";
      showNotification({ message, error: true });
    }
  };

  const deleteBlog = async (blogToDelete) => {
    const ok = window.confirm(
      `Delete blog "${blogToDelete.title}" by ${blogToDelete.author}?`,
    );
    if (!ok) return;

    try {
      await dispatch(deleteBlogAction(blogToDelete));
      const message = `blog "${blogToDelete.title}" has been deleted`;
      showNotification({ message: message, error: false });
      navigate("/");
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.error ||
        `error deleting blog: "${blogToDelete.title}"`;
      showNotification({ message, error: true });
    }
  };

  return {
    blog,
    blogs,
    createBlog,
    updateBlog,
    likeBlog,
    commentBlog,
    deleteBlog,
    toggleBlogFormRef,
    userHasLiked,
  };
};

export const useField = (name, type = "text") => {
  const [value, setValue] = useState("");

  class Attributes {
    constructor() {
      this.name = name;
      this.type = type;
      this.value = value;
      this.id = name;
      this["data-testid"] = name;
      this.onChange = ({ target: { value } }) => setValue(value);
    }

    set(value) {
      setValue(value);
    }

    reset() {
      setValue("");
    }
  }

  return new Attributes();
};
