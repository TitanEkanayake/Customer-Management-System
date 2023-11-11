import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userObj: null,
  },
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserObj(state, action) {
      state.userObj = action.payload;
    },
    logoutUser(state) {
      state.userId = null;
      state.userObj = null;
    },
  },
});

export const { setUserId, setUserObj, logoutUser } = userSlice.actions;
export const selectUserId = (state) => state.userIdReducer.userId;
export const selectUserObj = (state) => state.userIdReducer.userObj;

export default userSlice.reducer;
