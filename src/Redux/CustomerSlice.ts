import Customer from "../Models/Customer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface CustomerState{
    value: Customer[]
}
const initState:CustomerState ={
    value: []
}

export const customerSlice = createSlice({
    name:"customers",
    initialState: initState,
    reducers: {
        fill: (state, action:PayloadAction<Customer[]>) =>{
            state.value = action.payload;
        },
        remove: (state, action:PayloadAction<number>)=>{
            const indexToDelete = state.value.findIndex(e=>e.id == action.payload);
            if (indexToDelete >= 0){
                state.value.splice(indexToDelete, 1);
            }
        },
        add: (state, action:PayloadAction<Customer>)=>{
            state.value.push(action.payload);
        },
        update: (state, action:PayloadAction<Customer>)=>{
            const indexToUpdate = state.value.findIndex(e=> e.id == action.payload.id);
            if (indexToUpdate >= 0){
                state.value[indexToUpdate] = action.payload;
            }
        }
    }
})
export const {fill, remove, add, update} = customerSlice.actions;
export default customerSlice.reducer;