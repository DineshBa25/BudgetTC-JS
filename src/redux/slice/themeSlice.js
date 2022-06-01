import { createSlice } from "@reduxjs/toolkit";

const initialState = {themeSet: "dark"};

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function

export default themeSlice.reducer;