import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../slice/usersSlice";
import selectedSlice from '../slice/selectedSlice';


export const store = configureStore({
    reducer: {
       usersSlice,
       selectedSlice
    }
    
})