import {useEffect, useState} from "react";
import Coupon from "../../Models/Coupon";
import customerService from "../../Services/CustomerService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import errorHandler from "../../Services/ErrorHandler";
import {Error} from "../../Services/Error";
import Box from "@mui/material/Box";
import {ProductCard} from "../../Components/ProductCard";
import Typography from "@mui/material/Typography";
import {routs} from "../../Utils/routs";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export const CustomerCoupons = () => {

    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)
    const [coupons, setCoupons] = useState<Coupon[]>()
    const navigate = useNavigate()
    const token = loginStore.getState().token


    useEffect(() => {
        customerService.getCustomerCoupons(token)
            .then(c => {
                setCoupons(c);
            })
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }, [])

    return (
        <Box>
            {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
            {
                coupons?.length > 0 ?
                    <Box display="flex" flexWrap="wrap" m={5}>
                        {coupons?.map(c => <ProductCard coupon={c}/>)}
                    </Box>
                    : <Box textAlign={"center"} p={5}>
                        <Typography variant={"h5"}>You dont have any coupons yet!</Typography>
                        <Button variant="contained" color={"primary"} onClick={() => navigate(routs.products)}>Shop for
                            coupons</Button>
                    </Box>
            }
        </Box>
    );
}