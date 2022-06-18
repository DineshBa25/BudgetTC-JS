import { createSlice } from "@reduxjs/toolkit";
import {authSlice} from "./authSlice";

const initialState = {userDataDocument: null};

export const userDataSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setRetirementCalcData401K: (state, action) => {
            state.userDataDocument = action.payload;
        },
        setQuote: (state, action) => {
            state.userDataDocument.quote = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setRetirementCalcData401K, setQuote } = userDataSlice.actions;

export default userDataSlice.reducer;