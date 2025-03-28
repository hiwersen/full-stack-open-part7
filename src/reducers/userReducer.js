import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    doSetUser(_, action) {
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    doRemoveUser() {
      window.localStorage.removeItem("user");
      blogService.setToken(null);
      return null;
    },
  },
});

export const setUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    dispatch(doSetUser(user));
    window.localStorage.setItem("user", JSON.stringify(user));
  };
};

export const { doSetUser, doRemoveUser } = userSlice.actions;

export default userSlice.reducer;
