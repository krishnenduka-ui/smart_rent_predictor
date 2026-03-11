import { configureStore } from "@reduxjs/toolkit";
import socialReducer from '../features/socialSlice'
import authReducer from '../features/authSlice'
import propertyReducer from '../features/propertySlice'
import searchReducer from '../features/searchSlice'
export const store = configureStore({
    reducer:{
        social:socialReducer,
        auth : authReducer,
        properties: propertyReducer,
        search: searchReducer
    }
})