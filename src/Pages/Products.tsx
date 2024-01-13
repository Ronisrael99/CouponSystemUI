import {useEffect, useState} from "react";
import Coupon from "../Models/Coupon";
import couponService from "../Services/CouponService";
import Box from "@mui/material/Box";
import {ProductCard} from "../Components/ProductCard";
import {couponStore} from "../Redux/Stores/CouponStore";
import errorHandler from "../Services/ErrorHandler";
import {NavLink} from "react-router-dom";
import {routs} from "../Utils/routs";
import {Error} from "../Services/Error";
import Typography from "@mui/material/Typography";

export const Products = () => {

    const [products, setProducts] = useState<Coupon[]>([])
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)

    useEffect(() => {
        couponService.getAllCoupons()
            .then(p => setProducts(p))
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })

        couponStore.subscribe(() => {
            couponService.getAllCoupons()
                .then(p => setProducts(p))
                .catch(err => {
                    setError(errorHandler.showError(err))
                    setDialog(true)
                })
        })
    }, [])

    return (
        <>
            <Typography variant={"h2"} textAlign={"center"} mt={2}>Our Products</Typography>
            <Box display="flex" flexWrap="wrap" m={5}>
                {dialog && <Error error={error} onClose={() => setDialog(false)}/>}

                {products.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                            style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                          coupon={p}/></NavLink>)}

            </Box>
        </>
    );
}