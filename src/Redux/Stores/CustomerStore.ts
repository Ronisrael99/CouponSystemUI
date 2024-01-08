import {configureStore} from "@reduxjs/toolkit";
import {customerSlice} from "../CustomerSlice";


export const customerStore = configureStore({
    reducer: customerSlice.reducer
})
export  type RootState = ReturnType<typeof customerStore.getState>;
export type AppDispatch = typeof customerStore.dispatch;