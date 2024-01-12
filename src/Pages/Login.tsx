import {TitledCard} from "../Components/TitledCard";
import { Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {LoginService} from "../Services/LoginService";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import { useState} from "react";
import {useForm} from "react-hook-form";
import errorHandler from "../Services/ErrorHandler";
import {Error} from "../Services/Error";
import * as React from "react";

interface PayLoad {
    clientType: string,
    email: string,
    password: string
}

export const Login = () => {

    const navigate = useNavigate();
    const [errormessage, setErrorMessage] = useState();
    const [dialog, setDialog] = useState(false)
    const {register, handleSubmit, formState, setValue, getValues} = useForm<PayLoad>({mode: "onBlur"})

    function sendForm(data: PayLoad) {
        LoginService.login(data)
            .then(l => {
                const clientType = getValues("clientType")
                {
                    clientType === "CUSTOMER" ?
                        navigate(routs.home) :
                        clientType === "COMPANY" ?
                            navigate(routs.companyDetails) :
                            navigate(routs.home)
                }
            })
            .catch(err => {
                setErrorMessage(errorHandler.showError(err) === "Unauthorized" ? "Invalid email or password" : errorHandler.showError(err))
                setDialog(true)
            })
    }

    return <Box justifyContent="center" alignItems="center" display="flex">
        <TitledCard title="Login" sx={{mt: 5}}>

            {dialog && <Error error={errormessage} onClose={() => setDialog(false)}/>}

            <form onSubmit={handleSubmit(sendForm)}>
                <Stack alignItems="center" spacing={5} mt={5}>

                    <Select {...register("clientType")} name={"clientType"} id={"clientType"} sx={{width: 250}} defaultValue="CUSTOMER"
                            onChange={c => setValue("clientType", c.target.value)}>
                        <MenuItem value="ADMINISTRATOR">Admin</MenuItem>
                        <MenuItem value="COMPANY">Company</MenuItem>
                        <MenuItem value="CUSTOMER">Customer</MenuItem>
                    </Select>

                    <TextField type={"email"} name={"email"} id="email" label="Email" variant="filled"
                               {...register("email", {
                                   required: {message: "Required", value: true},
                                   pattern: {
                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                       message: 'Invalid email address',
                                   }
                               })}
                    />
                    {formState.errors?.email && <span style={{
                        fontSize: "8px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.email.message}</span>}

                    <TextField type={"password"} name={"password"} id={"password"} label={"Password"} variant={"filled"}
                               {...register("password", {
                                   required: {message: "Required", value: true},
                               })}
                    />
                    {formState.errors?.password && <span style={{
                        fontSize: "8px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.password.message}</span>}

                    <Button variant={"contained"} type={"submit"} color={"secondary"}>Submit</Button>

                    <Button variant="outlined" size="small" sx={{width: "50%"}}
                            onClick={() => navigate(routs.register)}>Or sign up</Button>
                </Stack>
            </form>

        </TitledCard>
    </Box>

}