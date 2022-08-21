import { createSlice } from "@reduxjs/toolkit";
import {authSlice} from "../redux/slice/authSlice";

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
        },
        setBudgetTotalAmount: (state, action) => {
            state.userDataDocument.budget[action.payload.category].amount = parseFloat(action.payload.oldCategoryValue) + (parseFloat(action.payload.newValue) - parseFloat(action.payload.oldSubCatValue)) ;
            state.userDataDocument.budget[action.payload.category].items[action.payload.name].amount = action.payload.newValue;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setRetirementCalcData401K, setQuote, setBudgetTotalAmount } = userDataSlice.actions;

export default userDataSlice.reducer;