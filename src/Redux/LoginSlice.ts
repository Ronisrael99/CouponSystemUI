import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface LoginState {
    token: string,
    clientType: string
}

// const initState: LoginState = {
//     token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null,
//     clientType: sessionStorage.getItem("clientType") ? sessionStorage.getItem("clientType") :null
// }

const initState: LoginState = {
    token: (() => {
        const token = sessionStorage.getItem("token");
        console.log("Token in initState:", token);
        return token ? token : null;
    })(),
    clientType: (() => {
        const clientType = sessionStorage.getItem("clientType");
        console.log("Client Type in initState:", clientType);
        return clientType ? clientType : "DEFAULT";
    })(),
};

export const loginSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        login: (state, action: PayloadAction<LoginState>) => {
            state.token = action.payload.token; // save token to ram
            state.clientType = action.payload.clientType;
            // save token to file: sessionStorage - deleting after getting out of the session, localStorage - never deleting
            sessionStorage.setItem("token", state.token);
            sessionStorage.setItem("clientType", state.clientType)
        },
        logout: (state) => {
            state.token = null;
            state.clientType = null
            sessionStorage.setItem("token", null);
            sessionStorage.setItem("clientType", "DEFAULT")
        }
    }
})
export const {login, logout} = loginSlice.actions;