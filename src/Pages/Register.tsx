import {TitledCard} from "../Components/TitledCard";
import {Button, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {LoginService} from "../Services/LoginService";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import {useState} from "react";
import customerService from "../Services/CustomerService";
import errorHandler from "../Services/ErrorHandler";
import {useForm} from "react-hook-form";
import Customer from "../Models/Customer";
import {Error} from "../Services/Error";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";


export const Register = () => {

    const navigate = useNavigate();
    const [errormessage, setErrorMessage] = useState();
    const [dialog, setDialog] = useState(false);
    const {register, handleSubmit, formState, setValue, getValues} = useForm<Customer>({mode: "onBlur"})

    function sendForm(customer: Customer) {
        setValue("id", 0)
        customerService.addCustomer(customer)
            .then(c => {
                const logInCustomer = {
                    clientType: "CUSTOMER",
                    email: getValues("email"),
                    password: getValues("password")
                }

                LoginService.login(logInCustomer)
                    .then(c => {
                        navigate(routs.home)
                    })
                    .catch(err => {
                        setErrorMessage(errorHandler.showError(err))
                        setDialog(true)
                    })

            })
            .catch(err => {
                setErrorMessage(errorHandler.showError(err))
                setDialog(true)
            })
    }


    return <Box justifyContent="center" alignItems="center" display="flex">
        <TitledCard title="Register" sx={{mt: 5}}>

            {dialog && <Error error={errormessage} onClose={() => setDialog(false)}/>}

            <form onSubmit={handleSubmit(sendForm)}>
                <Stack alignItems="center" spacing={5} mt={5}>

                    <TextField type={"text"} name={"firstName"} id={"firstName"} label={"First Name"}
                               variant={"filled"} {...register("firstName", {
                        required: {message: "Required", value: true}
                    })}/>
                    {formState.errors?.firstName && <span style={{
                        fontSize: "10px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.firstName.message}</span>}

                    <TextField type={"text"} name={"lastName"} id={"lastName"} label={"Last Name"}
                               variant={"filled"} {...register("lastName", {
                        required: {message: "Required", value: true}
                    })}/>
                    {formState.errors?.lastName && <span style={{
                        fontSize: "10px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.lastName.message}</span>}

                    <TextField type={"email"} name={"email"} id="email" label="Email"
                               variant="filled" {...register("email", {
                        required: {message: "Required", value: true},
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                        }
                    })}/>
                    {formState.errors?.email && <span style={{
                        fontSize: "10px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.email.message}</span>}

                    <TextField type={"password"} name={"password"} id={"password"} label={"Password"}
                               variant={"filled"} {...register("password", {
                        required: {message: "Required", value: true}
                    })}/>
                    {formState.errors?.password && <span style={{
                        fontSize: "10px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.password.message}</span>}

                    <Button type={"submit"} variant={"contained"} endIcon={<SendIcon/>}>Sign Up</Button>

                    <Button variant="outlined" size="small" sx={{width: "70%"}}
                            onClick={() => navigate(routs.login)}>Already have an account ? Login</Button>


                </Stack>

            </form>

        </TitledCard>
    </Box>

}
