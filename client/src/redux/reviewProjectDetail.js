import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  form: null,
};

const reviewProjectDetailSlice = createSlice({
  initialState,
  name: "reviewProjectDetail",
  reducers: {
    getDataStart: (state) => {
      state.isFetching = true;
    },
    getDataSuccess: (state, action) => {
      state.isFetching = false;
      state.form = action.payload
    },
    resetData: (state) => {
      state.isFetching = false;
      state.form = null;
    },
  },
});

export const { getDataStart, getDataSuccess } =
  reviewProjectDetailSlice.actions;

export default reviewProjectDetailSlice.reducer;
