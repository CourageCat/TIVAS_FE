import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formValue: null,
    status: false,
};

const formRegisterSlice = createSlice({
    initialState,
    name: "formRegister",
    reducers: {
        saveValue: (state, action) => {
            state.formValue = action.payload;
            state.status = true;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        resetForm: (state) => {
            state.status = false;
            state.formValue = null;
        },
    },
});

export const { saveValue, setStatus, resetForm } = formRegisterSlice.actions;
export default formRegisterSlice.reducer;
