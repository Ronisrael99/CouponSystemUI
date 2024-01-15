import {useEffect, useState} from "react";
import companyService from "../../Services/CompanyService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CompanyManageCouponCard from "../../Components/CompanyComponents/CompanyManageCouponCard";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {routs} from "../../Utils/routs";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import adminService from "../../Services/AdminService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {current} from "@reduxjs/toolkit";
import Coupon from "../../Models/Coupon";
import {Error} from "../../Services/Error";
import FilterNav from "../../Components/FilterNav";


const CompanyDetails = () => {

    const [error, setError] = useState<string>()
    const [dialog, setDialog] = useState(false)

    const [company, setCompany] = useState<Company>()

    const [filters, setFilters] = useState({
        All: true,
        Food: false,
        Vacation: false,
        Flights: false,
        Pets: false,
        Shopping: false,
        Electricity: false,
    });

    const [foodCoupons, setFoodCoupons] = useState<Coupon[]>()
    const [vacationCoupons, setVacationCoupons] = useState<Coupon[]>()
    const [flightsCoupons, setFlightsCoupons] = useState<Coupon[]>()
    const [petsCoupons, setPetsCoupons] = useState<Coupon[]>()
    const [shoppingCoupons, setShoppingCoupons] = useState<Coupon[]>()
    const [electricityCoupons, setElectricityCoupons] = useState<Coupon[]>()

    const navigate = useNavigate()
    const token = loginStore.getState().token
    const id = parseInt(useParams().id!)

    function handleBack() {
        navigate(routs.adminCompanies)
    }

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getCompanyDetails(token)
                .then(c => {
                    setCompany(c);
                })
                .catch(err => errorHandler.showError(err))
            :
            adminService.getOneCompany(token, id)
                .then(c => {
                    setCompany(c);
                })
                .catch(err => errorHandler.showError(err))
    }, [])

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getAllCouponsByCategory(token, "FOOD")
                .then(c => setFoodCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
            :
            adminService.getAllCouponsByCategory(token, id, "FOOD")
                .then(c => setFoodCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
    }, [filters.Food])

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getAllCouponsByCategory(token, "VACATION")
                .then(c => setVacationCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
            :
            adminService.getAllCouponsByCategory(token, id, "VACATION")
                .then(c => setVacationCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
    }, [filters.Vacation])

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getAllCouponsByCategory(token, "FLIGHTS")
                .then(c => setFlightsCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
            :
            adminService.getAllCouponsByCategory(token, id, "FLIGHTS")
                .then(c => setFlightsCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
    }, [filters.Flights])

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getAllCouponsByCategory(token, "PETS")
                .then(c => setPetsCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
            :
            adminService.getAllCouponsByCategory(token, id, "PETS")
                .then(c => setPetsCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
    }, [filters.Pets])

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getAllCouponsByCategory(token, "SHOPPING")
                .then(c => setShoppingCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
            :
            adminService.getAllCouponsByCategory(token, id, "SHOPPING")
                .then(c => setShoppingCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
    }, [filters.Shopping])

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getAllCouponsByCategory(token, "ELECTRICITY")
                .then(c => setElectricityCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
            :
            adminService.getAllCouponsByCategory(token, id,"ELECTRICITY")
                .then(c => setElectricityCoupons(c))
                .catch(err => {
                    setError(errorHandler.showError(err));
                    setDialog(true)
                })
    }, [filters.Electricity])

    return (<>
            {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
            {loginStore.getState().clientType === "ADMINISTRATOR" &&
                <ArrowBackIcon onClick={handleBack} sx={{cursor: "pointer", marginTop: 2, marginLeft: 9}}/>
            }
            <Box m={5}>
                <Box textAlign={"center"} display={"flex"} justifyContent={"center"}>
                    <Box mr={"40px"}>
                        <Paper elevation={3} sx={{padding: 2, borderRadius: 5}}>
                            <Typography variant={"h6"}>Company Name</Typography>
                            <Typography variant={"h5"}>{company?.name}</Typography>
                        </Paper>
                    </Box>
                    <Box ml={"40px"}>
                        <Paper elevation={3} sx={{padding: 2, borderRadius: 5}}>
                            <Typography variant={"h6"}>Company Email</Typography>
                            <Typography variant={"h5"}>{company?.email}</Typography>
                        </Paper>
                    </Box>
                </Box>
                <Box textAlign={"center"} m={5}>
                    <Button variant="contained" color={"primary"}
                            onClick={() => navigate(loginStore.getState().clientType === "COMPANY" ? routs.updateCompany : routs.adminUpdateCompany + id)}>Update
                        Company Details</Button>
                </Box>
                <Box textAlign="center">
                    <Typography variant={"h2"}>Company Coupons</Typography>
                </Box>

                <FilterNav filters={filters} setFilters={setFilters}/>

                <Box display="flex" flexWrap="wrap">
                    {filters.All &&
                        company?.coupons.map(c => <CompanyManageCouponCard key={c.id} coupon={c}/>)
                    }
                    {!filters.All && filters.Food &&
                        foodCoupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)
                    }
                    {!filters.All && filters.Vacation &&
                        vacationCoupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)
                    }
                    {!filters.All && filters.Flights &&
                        flightsCoupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)
                    }
                    {!filters.All && filters.Pets &&
                        petsCoupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)
                    }
                    {!filters.All && filters.Shopping &&
                        shoppingCoupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)
                    }
                    {!filters.All && filters.Electricity &&
                        electricityCoupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)
                    }
                </Box>
            </Box>
        </>
    );

}
export default CompanyDetails