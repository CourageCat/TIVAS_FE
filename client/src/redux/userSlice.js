import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isFetching: false,
    data: null,
    error: "",
  },
  editUser: {
    isFetching: false,
    success: "",
    error: "",
  },
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    getUserStart: (state) => {
      state.user.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.user.isFetching = false;
      state.user.data = action.payload;
      state.user.error = "";
    },
    getUserError: (state, action) => {
      state.user.isFetching = false;
      state.user.data = null;
      state.user.error = action.payload;
    },
    editUserStart: (state) => {
      state.editUser.isFetching = true;
    },
    editUserSuccess: (state, action) => {
      state.editUser.isFetching = false;
      state.editUser.success = action.payload;
      state.editUser.error = "";
    },
    editUserError: (state, action) => {
      state.editUser.isFetching = false;
      state.editUser.success = "";
      state.editUser.error = action.payload;
    },
    resetEditUser: (state) => {
      state.editUser.isFetching = false;
      state.editUser.success = "";
      state.editUser.error = "";
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserError,
  editUserStart,
  editUserSuccess,
  editUserError,
  resetEditUser,
} = userSlice.actions;

export default userSlice.reducer;
