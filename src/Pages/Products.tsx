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
import * as React from "react";
import FilterNav from "../Components/FilterNav";

export const Products = () => {

    const [products, setProducts] = useState<Coupon[]>([])
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)

    const [foodCoupons, setFoodCoupons] = useState<Coupon[]>()
    const [vacationCoupons, setVacationCoupons] = useState<Coupon[]>()
    const [flightsCoupons, setFlightsCoupons] = useState<Coupon[]>()
    const [petsCoupons, setPetsCoupons] = useState<Coupon[]>()
    const [shoppingCoupons, setShoppingCoupons] = useState<Coupon[]>()
    const [electricityCoupons, setElectricityCoupons] = useState<Coupon[]>()

    const [filters, setFilters] = useState({
        All: true,
        Food: false,
        Vacation: false,
        Flights: false,
        Pets: false,
        Shopping: false,
        Electricity: false,
    });

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

    useEffect(() => {
        couponService.PUBLICGetAllCouponsByCategory("FOOD")
            .then(c => setFoodCoupons(c))
            .catch(err => {
                setError(err);
                setDialog(true);
            })
    }, [filters.Food])

    useEffect(() => {
        couponService.PUBLICGetAllCouponsByCategory("PETS")
            .then(c => setPetsCoupons(c))
            .catch(err => {
                setError(err);
                setDialog(true);
            })
    }, [filters.Pets])

    useEffect(() => {
        couponService.PUBLICGetAllCouponsByCategory("FLIGHTS")
            .then(c => setFlightsCoupons(c))
            .catch(err => {
                setError(err);
                setDialog(true);
            })
    }, [filters.Flights])

    useEffect(() => {
        couponService.PUBLICGetAllCouponsByCategory("ELECTRICITY")
            .then(c => setElectricityCoupons(c))
            .catch(err => {
                setError(err);
                setDialog(true);
            })
    }, [filters.Electricity])

    useEffect(() => {
        couponService.PUBLICGetAllCouponsByCategory("SHOPPING")
            .then(c => setShoppingCoupons(c))
            .catch(err => {
                setError(err);
                setDialog(true);
            })
    }, [filters.Shopping])

    useEffect(() => {
        couponService.PUBLICGetAllCouponsByCategory("VACATION")
            .then(c => setVacationCoupons(c))
            .catch(err => {
                setError(err);
                setDialog(true);
            })
    }, [filters.Vacation])


    return (
        <>
            <Typography variant={"h2"} textAlign={"center"} mt={2}>Our Products</Typography>
            <Box display="flex" flexWrap="wrap" m={5}>
                {dialog && <Error error={error} onClose={() => setDialog(false)}/>}

                <FilterNav filters={filters} setFilters={setFilters}/>

                <Box display="flex" flexWrap="wrap">
                    {filters.All &&
                        products?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                                    style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                                  coupon={p}/></NavLink>)
                    }
                    {!filters.All && filters.Food &&
                        foodCoupons?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                        style={{textDecoration: "none"}}><ProductCard key={p.id}
                        coupon={p}/></NavLink>)
                    }
                    {!filters.All && filters.Pets &&
                        petsCoupons?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                                       style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                                     coupon={p}/></NavLink>)
                    }
                    {!filters.All && filters.Vacation &&
                        vacationCoupons?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                                       style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                                     coupon={p}/></NavLink>)
                    }
                    {!filters.All && filters.Flights &&
                        flightsCoupons?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                                       style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                                     coupon={p}/></NavLink>)
                    }
                    {!filters.All && filters.Shopping &&
                        shoppingCoupons?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                                       style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                                     coupon={p}/></NavLink>)
                    }
                    {!filters.All && filters.Electricity &&
                        electricityCoupons?.map(p => <NavLink key={p.id} to={routs.productDetails + p.id}
                                                       style={{textDecoration: "none"}}><ProductCard key={p.id}
                                                                                                     coupon={p}/></NavLink>)
                    }
                </Box>


            </Box>
        </>
    );
}