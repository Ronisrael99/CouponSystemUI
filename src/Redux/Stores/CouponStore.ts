import {couponSlice} from "../CouponSlice";
import {configureStore} from "@reduxjs/toolkit";

export const couponStore = configureStore({
    reducer: couponSlice.reducer
});

export  type RootState = ReturnType<typeof couponStore.getState>;
export type AppDispatch = typeof couponStore.dispatch;