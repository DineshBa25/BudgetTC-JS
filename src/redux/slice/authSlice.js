import { createSlice } from "@reduxjs/toolkit";

const initialState = {isAuth: false};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.value = action.payload;
        },
        toggleAuth:  (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, toggleAuth } = authSlice.actions;

export default authSlice.reducer;