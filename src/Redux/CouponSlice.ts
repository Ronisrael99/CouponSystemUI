import Coupon from "../Models/Coupon";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface CouponState{
    value: Coupon[]

}
const initState: CouponState = {
    value: []
}

export const couponSlice = createSlice({
    name: "coupons",
    initialState: initState,
    reducers: {
        fill: (state, action:PayloadAction<Coupon[]>) =>{
            state.value = action.payload;
        },
        remove: (state, action:PayloadAction<number>)=>{
            const indexToDelete = state.value.findIndex(e=>e.id == action.payload);
            if (indexToDelete >= 0){
                state.value.splice(indexToDelete, 1);
            }
        },
        add: (state, action:PayloadAction<Coupon>)=>{
            state.value.push(action.payload);
        },
        update: (state, action:PayloadAction<Coupon>)=>{
            const indexToUpdate = state.value.findIndex(e=> e.id == action.payload.id);
            if (indexToUpdate >= 0){
                state.value[indexToUpdate] = action.payload;
            }
        }
    }
})

export const {fill, remove, add, update} = couponSlice.actions;
export default couponSlice.reducer;