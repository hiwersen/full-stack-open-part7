import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    doSetUsers(_, action) {
      return action.payload;
    },
    doAddUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const setUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(doSetUsers(users));
  };
};

export const createUser = (credentials) => {
  return async (dispatch) => {
    const user = await usersService.create(credentials);
    dispatch(doAddUser(user));
  };
};

export const { doSetUsers, doAddUser } = usersSlice.actions;

export default usersSlice.reducer;
