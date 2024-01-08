import {configureStore} from "@reduxjs/toolkit";
import {companySlice} from "../CompanySlice";

export const companyStore = configureStore({
    reducer: companySlice.reducer
})

export  type RootState = ReturnType<typeof companyStore.getState>;
export type AppDispatch = typeof companyStore.dispatch;