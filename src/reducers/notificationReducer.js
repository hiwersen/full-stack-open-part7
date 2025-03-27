import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    doSetNotification(_, action) {
      return action.payload;
    },
    doRemoveNotification() {
      return null;
    },
  },
});

export const { doSetNotification, doRemoveNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
