import axios from "axios";
import appConfig from "../Utils/AppConfig";
import {loginStore} from "../Redux/Stores/LoginStore";
import {login, logout} from "../Redux/LoginSlice";

interface LoginPayload {
    clientType: string,
    email: string,
    password: string
}

export const LoginService = {
    login: async (payload: LoginPayload) => {
        const response = (await axios.post(appConfig.url + "login", payload)).data;
        loginStore.dispatch(login({token: response.token, clientType: payload.clientType}))
    },
    logout: async () => {
        loginStore.dispatch(logout())
    }
}