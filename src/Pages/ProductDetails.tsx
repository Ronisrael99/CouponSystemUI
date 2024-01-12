import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Coupon from "../Models/Coupon";
import couponService from "../Services/CouponService";
import errorHandler from "../Services/ErrorHandler";
import Box from "@mui/material/Box";
import * as React from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {loginStore} from "../Redux/Stores/LoginStore";
import {routs} from "../Utils/routs";
import customerService from "../Services/CustomerService";
import 'reactjs-popup/dist/index.css';
import {Error} from "../Services/Error";


export const ProductDetails = () => {

    const id = parseInt(useParams().id!)
    const navigate = useNavigate()
    const [product, setProduct] = useState<Coupon>()
    const [error, setError] = useState<string>();
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [client, setClient] = useState<string>(loginStore.getState().clientType ? loginStore.getState().clientType : "DEFAULT")

    const token = loginStore.getState().token

    useEffect(() => {
        couponService.getOneCoupon(id)
            .then(p => {
                setProduct(p);
            })
            .catch(err => {
                setError(errorHandler.showError(err));
                setOpenErrorDialog(true)
            })

        setClient(loginStore.getState().clientType)
    }, [])

    function handlePurchase() {
        if (client === "DEFAULT") {
            navigate(routs.login)
        } else if (client === "CUSTOMER") {
            customerService.purchaseCoupon(token, id)
                .then(e => navigate(routs.customerCoupons))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setOpenErrorDialog(true)
                })
        } else {
            navigate(routs.home)
        }
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {openErrorDialog && <Error error={error} onClose={() => setOpenErrorDialog(false)}/>}
            <Paper elevation={3} sx={{
                borderRadius: 5,
                p: 3,
                minWidth: "90%",
                minHeight: 650,
                m: 5,
                display: "grid",
                gridTemplateColumns: "50% 50%",
            }}>
                <Box display="grid" gridTemplateRows="20% 70% 5% 5%">
                    <Typography variant="h2">{product?.title}</Typography>
                    <Typography variant="h3">{product?.description}</Typography>
                    <Typography variant={"h4"}>{product?.company}</Typography>
                    <Button sx={{ml: "20%", width: "50%"}} variant="contained" onClick={handlePurchase}>Purchase
                        coupon</Button>
                </Box>

                <Paper elevation={3} sx={{
                    borderRadius: 5,
                    p: 3,
                    m: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <img style={{width: "90%", height: "90%"}} src={product?.image} alt={product?.title}/>
                </Paper>
            </Paper>
        </Box>
    );

}