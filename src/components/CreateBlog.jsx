import React from "react";
import ToggleVisibility from "./ToggleVisibility";
import BlogForm from "./BlogForm";
import { useCreateBlog } from "../hooks";

const CreateBlog = () => {
  // ! toggleBlogFormRef.current?.toggleVisibility(); only works if
  // createBlog fn is passed as props from this component to Blogform!
  const { createBlog, toggleBlogFormRef } = useCreateBlog();

  return (
    <ToggleVisibility ref={toggleBlogFormRef}>
      <BlogForm createBlog={createBlog} />
    </ToggleVisibility>
  );
};

export default CreateBlog;
