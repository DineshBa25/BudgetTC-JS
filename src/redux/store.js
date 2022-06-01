import {configureStore} from '@reduxjs/toolkit'

import authReducer from "./slice/authSlice";
import themeReducer from "./slice/themeSlice"
import userDataReducer from "./slice/userDataSlice"


export const store = configureStore({
    reducer:  {
        auth: authReducer,
       theme: themeReducer,
        userData: userDataReducer
    },


})
