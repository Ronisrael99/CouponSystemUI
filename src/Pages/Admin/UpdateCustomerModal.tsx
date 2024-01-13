import {useEffect, useState} from "react";
import {loginStore} from "../../Redux/Stores/LoginStore";
import {useNavigate, useParams} from "react-router-dom";
import errorHandler from "../../Services/ErrorHandler";
import adminService from "../../Services/AdminService";
import {routs} from "../../Utils/routs";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {Button, Stack, TextField} from "@mui/material";
import Customer from "../../Models/Customer";
import {useForm} from "react-hook-form";
import {Error} from "../../Services/Error";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const UpdateCustomer = () => {

    const [customer, setCustomer] = useState<Customer>()
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)
    const [open, setOpen] = useState(true);
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

    function handleClose() {
        setOpen(false)
        navigate(routs.adminCustomerDetails + id)
    }

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

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
                <Box sx={style}>
                    <ArrowBackIcon onClick={handleClose} sx={{cursor: "pointer"}}/>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
                        Update Customer
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>

                        {customer &&
                            <>
                                <form onSubmit={handleSubmit(sendForm)}>
                                    <Stack alignItems={"center"} spacing={5} mt={5}>

                                        <TextField type={"text"} name={"firstName"} id={"firstName"}
                                                   label={"First Name"}
                                                   variant={"filled"} defaultValue={customer.firstName}
                                                   required {...register("firstName")}/>

                                        <TextField type={"text"} name={"lastName"} id={"lastName"} label={"Last Name"}
                                                   variant={"filled"} defaultValue={customer.lastName}
                                                   required {...register("lastName")}/>

                                        <TextField type={"email"} name={"email"} id={"email"} label={"Email"}
                                                   variant={"filled"}
                                                   defaultValue={customer.email} required {...register("email", {
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

                                        <TextField type={"password"} name={"password"} id={"password"}
                                                   label={"Password"}
                                                   variant={"filled"} defaultValue={customer.password}
                                                   required {...register("password")}/>

                                        <Button type={"submit"} variant={"contained"} endIcon={<SendIcon/>}>Update
                                            Customer</Button>


                                        <Button variant={"outlined"} startIcon={<DeleteIcon/>}
                                                onClick={handleDelete}>Delete Customer</Button>

                                    </Stack>
                                </form>
                            </>
                        }

                    </Typography>
                </Box>
            </>
        </Modal>


        // <Box justifyContent="center" alignItems="center" display="flex" m={5}>
        //     {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
        //     <TitledCard title={"Update Customer"}>
        //
        //
        //     </TitledCard>
        // </Box>
    )
        ;
}