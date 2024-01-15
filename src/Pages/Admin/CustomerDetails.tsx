import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {loginStore} from "../../Redux/Stores/LoginStore";
import errorHandler from "../../Services/ErrorHandler";
import adminService from "../../Services/AdminService";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {routs} from "../../Utils/routs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CompanyManageCouponCard from "../../Components/CompanyComponents/CompanyManageCouponCard";
import * as React from "react";
import Customer from "../../Models/Customer";
import {Error} from "../../Services/Error";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState<Customer>()
    const [error, setError] = useState();
    const [dialog, setDialog] = useState(false)

    const navigate = useNavigate()


    const token = loginStore.getState().token
    const id = parseInt(useParams().id!)

    useEffect(() => {
        adminService.getOneCustomer(token, id)
            .then(c => setCustomer(c))
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }, [])


    function handleBack() {
        navigate(routs.adminCustomers)
    }


    return (
        <>
            <ArrowBackIcon onClick={handleBack} sx={{cursor: "pointer", marginTop: 2, marginLeft: 9}}/>

            <Box m={5}>
                {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
                <Box textAlign={"center"} display={"flex"} justifyContent={"center"}>
                    <Box mr={"40px"}>
                        <Paper elevation={3} sx={{padding: 2, borderRadius: 5}}>
                            <Typography variant={"h6"}>Customer Name</Typography>
                            <Typography variant={"h5"}>{customer?.firstName + " " + customer?.lastName}</Typography>
                        </Paper>
                    </Box>
                    <Box ml={"40px"}>
                        <Paper elevation={3} sx={{padding: 2, borderRadius: 5}}>
                            <Typography variant={"h6"}>Customer Email</Typography>
                            <Typography variant={"h5"}>{customer?.email}</Typography>
                        </Paper>
                    </Box>
                </Box>
                <Box textAlign={"center"} m={5}>
                    <Button variant="contained" color={"primary"}
                            onClick={() => navigate(routs.adminUpdateCustomer + id)}>Update
                        Customer Details</Button>
                </Box>
                <Box textAlign="center">
                    <Typography variant={"h2"}>Customer Coupons</Typography>
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {customer?.coupons.map(c => <CompanyManageCouponCard key={c.id} coupon={c}/>)}
                </Box>
            </Box>
        </>
    );
}