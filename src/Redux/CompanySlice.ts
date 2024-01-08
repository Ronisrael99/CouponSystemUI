import Company from "../Models/Company";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";
import {couponSlice} from "./CouponSlice";

export interface CompanyState{
    value: Company[]
}
const initState:CompanyState = {
    value: []
}

export const companySlice= createSlice({
    name: "companies",
    initialState: initState,
    reducers: {
        fill: (state, action:PayloadAction<Company[]>) =>{
            state.value = action.payload;
        },
        remove: (state, action:PayloadAction<number>)=>{
            const indexToDelete = state.value.findIndex(e=>e.id == action.payload);
            if (indexToDelete >= 0){
                state.value.splice(indexToDelete, 1);
            }
        },
        add: (state, action:PayloadAction<Company>)=>{
            state.value.push(action.payload);
        },
        update: (state, action:PayloadAction<Company>)=>{
            const indexToUpdate = state.value.findIndex(e=> e.id == action.payload.id);
            if (indexToUpdate >= 0){
                state.value[indexToUpdate] = action.payload;
            }
        }
    }
})
export const {fill, remove, add, update} = companySlice.actions;
export default companySlice.reducer;