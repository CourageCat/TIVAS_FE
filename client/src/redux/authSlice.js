import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sendMail: {
    isFetching: false,
    error: "",
    success: "",
    email: "",
  },
  login: {
    isFetching: false,
    user: null,
    error: "",
  },
  logout: {
    isFetching: false,
    success: false,
    error: false,
  },
  register: {
    isFetching: false,
    success: false,
    error: false,
  },
  registerGoogle: {
    isFetching: false,
    success: false,
    error: false,
  },
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    sendMailStart: (state) => {
      state.sendMail.isFetching = true;
    },
    sendMailSuccess: (state, action) => {
      state.sendMail.isFetching = false;
      state.sendMail.success = action.payload?.mess;
      state.sendMail.email = action.payload?.email;
      state.sendMail.error = "";
    },
    sendMailError: (state, action) => {
      state.sendMail.isFetching = false;
      state.sendMail.success = "";
      state.sendMail.email = "";
      state.sendMail.error = action.payload;
    },
    resetSendMail: (state) => {
      state.sendMail.isFetching = false;
      state.sendMail.success = "";
      state.sendMail.email = "";
      state.sendMail.error = "";
    },
    handlerTimeSendMail: (state, action) => {
      state.sendMail.time = action.payload;
    },
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.user = action.payload;  
      state.login.error = "";
    },
    loginError: (state, action) => {
      state.login.isFetching = false;
      state.login.user = null;
      state.login.error = action.payload;
    },
    resetLogin: (state) => {
      state.login.isFetching = false;
      state.login.user = null;
      state.login.error = "";
    },
    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.logout.isFetching = false;
      state.login.user = null;
      state.logout.success = true;
      state.logout.error = false;
    },
    logoutError: (state) => {
      state.logout.isFetching = false;
      state.logout.success = false;
      state.logout.error = true;
    },
    resetLogout: (state) => {
      state.logout.isFetching = false;
      state.logout.success = false;
      state.logout.error = false;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    registerError: (state) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = true;
    },
    resetRegister: (state) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = false;
    },
    registerGoogleStart: (state) => {
      state.registerGoogle.isFetching = true;
    },
    registerGoogleSuccess: (state) => {
      state.registerGoogle.isFetching = false;
      state.registerGoogle.success = true;
      state.registerGoogle.error = false;
    },
    registerGoogleError: (state) => {
      state.registerGoogle.isFetching = false;
      state.registerGoogle.success = false;
      state.registerGoogle.error = true;
    },
    resetRegisterGoogle: (state) => {
      state.registerGoogle.isFetching = false;
      state.registerGoogle.success = false;
      state.registerGoogle.error = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  resetLogin,
  logoutStart,
  logoutSuccess,
  logoutError,
  resetLogout,
  sendMailError,
  sendMailStart,
  sendMailSuccess,
  resetSendMail,
  handlerTimeSendMail,
  registerStart,
  registerError,
  registerSuccess,
  resetRegister,
  registerGoogleStart,
  registerGoogleSuccess,
  registerGoogleError,
  resetRegisterGoogle,
} = authSlice.actions;

export default authSlice.reducer;
