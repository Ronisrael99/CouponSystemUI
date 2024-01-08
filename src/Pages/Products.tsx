import {useEffect, useState} from "react";
import Coupon from "../Models/Coupon";
import couponService from "../Services/CouponService";
import {Alert} from "@mui/material";
import Box from "@mui/material/Box";
import {ProductCard} from "../Components/ProductCard";
import {couponStore} from "../Redux/Stores/CouponStore";
import errorHandler from "../Services/ErrorHandler";
import {NavLink, useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";

export const Products = () => {

    const [products, setProducts] = useState<Coupon[]>([])
    const [error, setError] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        couponService.getAllCoupons()
            .then(p => setProducts(p))
            .catch(err => setError(errorHandler.showError(err)))

        couponStore.subscribe(()=> {
            couponService.getAllCoupons()
                .then(p => setProducts(p))
                .catch(err => setError(errorHandler.showError(err)))
        })
    }, [])

    return (<Box display="flex" flexWrap="wrap" m={5}>
            {error && <Alert severity="error">{error}</Alert>}

            {products.map(p =>  <NavLink key={p.id} to={routs.productDetails + p.id} style={{textDecoration:"none"}}><ProductCard key={p.id} coupon={p}/></NavLink>)}

        </Box>
    );
}