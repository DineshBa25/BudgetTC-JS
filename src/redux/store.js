import {combineReducers, configureStore} from '@reduxjs/toolkit'

import authReducer from "./slice/authSlice";
import themeReducer from "./slice/themeSlice"
import userDataReducer from "../pages/userDataSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';




const persistConfig = {
    key: 'root',
    storage,
}


//combine auth them and userdata reducers
const persistedReducer = persistReducer(persistConfig,
    combineReducers({
        auth: authReducer,
        theme: themeReducer,
        userData: userDataReducer
    }));



export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)
