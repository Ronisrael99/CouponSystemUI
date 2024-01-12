import {useEffect, useState} from "react";
import {loginStore} from "../../Redux/Stores/LoginStore";
import {useNavigate, useParams} from "react-router-dom";
import errorHandler from "../../Services/ErrorHandler";
import adminService from "../../Services/AdminService";
import {routs} from "../../Utils/routs";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import { Button, Stack, TextField} from "@mui/material";
import Customer from "../../Models/Customer";
import {useForm} from "react-hook-form";
import {Error} from "../../Services/Error";

export const UpdateCustomer = () => {

    const [customer, setCustomer] = useState<Customer>()
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)
    const {register, handleSubmit, formState} = useForm<Customer>({mode: "onBlur"})
    const token = loginStore.getState().token
    const navigate = useNavigate()
    const id = parseInt(useParams().id!)

    useEffect(() => {
        adminService.getOneCustomer(token, id)
            .then(c => {
                setCustomer(c)
            })
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }, [])

    function handleDelete() {
        const result = window.confirm("Are you sure ?");
        if (result) {
            adminService.deleteCustomer(token, id)
                .then(c => navigate(routs.adminCustomers))
                .catch(err => {
                    setError(errorHandler.showError(err))
                    setDialog(true)
                })
        }
    }

    function sendForm(formCustomer: Customer) {
        formCustomer.id = customer.id
        formCustomer.coupons = null
        adminService.updateCustomer(token, formCustomer)
            .then(c => {
                navigate(routs.adminCustomerDetails + customer.id)
            })
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex" m={5}>
            {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
            <TitledCard title={"Update Customer"}>

                {customer &&

                    <form onSubmit={handleSubmit(sendForm)}>
                        <Stack alignItems={"center"} spacing={5} mt={5}>

                            <TextField type={"text"} name={"firstName"} id={"firstName"} label={"First Name"}
                                       variant={"filled"} defaultValue={customer.firstName}
                                       required {...register("firstName")}/>

                            <TextField type={"text"} name={"lastName"} id={"lastName"} label={"Last Name"}
                                       variant={"filled"} defaultValue={customer.lastName}
                                       required {...register("lastName")}/>

                            <TextField type={"email"} name={"email"} id={"email"} label={"Email"} variant={"filled"}
                                       defaultValue={customer.email} required {...register("email", {
                                required: {message: "Required", value: true},
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                }
                            })}/>
                            {formState.errors?.email && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.email.message}</span>}

                            <TextField type={"password"} name={"password"} id={"password"} label={"Password"}
                                       variant={"filled"} defaultValue={customer.password}
                                       required {...register("password")}/>

                            <Button type="submit" variant="contained"
                                    color={"secondary"}>Update Customer</Button>

                            <Button sx={{background: "Red", color: "black", width: "190px"}}
                                    onClick={handleDelete}>Delete Customer</Button>

                        </Stack>
                    </form>

                }
            </TitledCard>
        </Box>
    );
}