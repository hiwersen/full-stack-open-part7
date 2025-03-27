import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    doSetBlogs(_, action) {
      return action.payload;
    },
  },
});

export const { doSetBlogs } = blogSlice.actions;

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(doSetBlogs(blogs));
  };
};

export default blogSlice.reducer;
