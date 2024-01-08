import {configureStore} from "@reduxjs/toolkit";
import {loginSlice} from "../LoginSlice";


export const loginStore = configureStore({
    reducer: loginSlice.reducer
})

export  type RootState = ReturnType<typeof loginStore.getState>;
export type AppDispatch = typeof loginStore.dispatch;