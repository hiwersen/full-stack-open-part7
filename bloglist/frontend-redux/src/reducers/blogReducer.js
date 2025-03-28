import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    doSetBlogs(_, action) {
      return action.payload;
    },
    doAddBlog(state, action) {
      state.push(action.payload);
    },
    doUpdateBlog(state, action) {
      return state.map((b) =>
        b.id === action.payload.id ? action.payload : b,
      );
    },
    doDeleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id);
    },
  },
});

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(doSetBlogs(blogs));
  };
};

export const createBlog = (blogToCreate) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogToCreate);
    dispatch(doAddBlog(blog));
  };
};

export const updateBlog = (blogToUpdate) => {
  return async (dispatch) => {
    const blog = await blogService.update(blogToUpdate);
    dispatch(doUpdateBlog(blog));
  };
};

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    const blog = await blogService.like(blogToLike);
    console.log(blog);
    dispatch(doUpdateBlog(blog));
  };
};

export const commentBlog = (comment) => {
  return async (dispatch) => {
    const blog = await blogService.comment(comment);
    dispatch(doUpdateBlog(blog));
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogService.delete(blogToDelete);
    dispatch(doDeleteBlog(blogToDelete));
  };
};

export const { doSetBlogs, doAddBlog, doUpdateBlog, doDeleteBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
