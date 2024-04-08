import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sendMailPassword: {
    isFetching: false,
    success: "",
    error: "",
    email: "",
  },
  resetPassword: {
    email: "",
    isFetching: false,
    success: "",
    error: "",
  },
};

const forgotPasswordSlice = createSlice({
  initialState,
  name: "forgotPassword",
  reducers: {
    setEmailForgotPassword: (state, action) => {
      state.resetPassword.email = action.payload;
    },
    sendMailPasswordStart: (state) => {
      state.sendMailPassword.isFetching = false;
    },
    sendMailPasswordSuccess: (state, action) => {
      state.sendMailPassword.isFetching = false;
      state.sendMailPassword.success = action.payload?.mess || "";
      state.sendMailPassword.email = action.payload?.email || "";
      state.sendMailPassword.error = "";
    },
    sendMailPasswordError: (state, action) => {
      state.sendMailPassword.isFetching = false;
      state.sendMailPassword.success = "";
      state.sendMailPassword.error = action.payload;
      state.sendMailPassword.email = "";
    },
    resetSendMailPassword: (state) => {
      state.sendMailPassword.isFetching = false;
      state.sendMailPassword.success = "";
      state.sendMailPassword.error = "";
      state.sendMailPassword.email = "";
    },
    forgotStart: (state) => {
      state.resetPassword.isFetching = true;
    },
    forgotSuccess: (state, action) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.success = action.payload;
      state.resetPassword.error = "";
    },
    forgotError: (state, action) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.success = "";
      state.resetPassword.error = action.payload;
    },
    resetForgot: (state) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.success = "";
      state.resetPassword.error = "";
    },
  },
});

export const {
  sendMailPasswordStart,
  sendMailPasswordSuccess,
  sendMailPasswordError,
  resetSendMailPassword,
  forgotStart,
  forgotSuccess,
  forgotError,
  resetForgot,
  setEmailForgotPassword,
} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
