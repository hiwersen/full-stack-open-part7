import React from 'react';
import ToggleVisibility from "./ToggleVisibility";
import BlogForm from "./BlogForm";
import { useCreateBlog } from '../hooks';

const CreateBlog = () => {
    const { createBlog, toggleBlogFormRef } = useCreateBlog();

    return (
        <ToggleVisibility
            showLabel="Create New Blog"
            hideLabel="Cancel"
            ref={toggleBlogFormRef}
        >
            <BlogForm createBlog={createBlog} />
        </ToggleVisibility>
    )
}

export default CreateBlog