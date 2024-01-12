import {useEffect, useState} from "react";
import Company from "../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import {loginStore} from "../../Redux/Stores/LoginStore";
import companyService from "../../Services/CompanyService";
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

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState<Customer>()

  const [isVacation, setIsVacation] = useState<boolean>(true)
  const [isAllCoupons, setIsAllCoupons] = useState<boolean>(false)
  const [isFood, setIsFood] = useState<boolean>(false)


  const navigate = useNavigate()


  const token = loginStore.getState().token
  const id = parseInt(useParams().id!)

  useEffect(() => {
    adminService.getOneCustomer(token, id)
        .then(c => setCustomer(c))
        .catch(err => errorHandler.showError(err))
  }, [])

  function handleAllCoupons() {
    setIsAllCoupons(!isAllCoupons)
    console.log("is all:" + isAllCoupons)
  }

  function handleFood() {
    setIsFood(!isFood)
    console.log("is food: " + isFood)
  }

  function handleVacation() {
    setIsVacation(!isVacation)
    console.log("is vacation: " + isVacation)
  }


  return (
      <Box m={5}>
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
          <Button variant="contained" color={"primary"} onClick={() => navigate(routs.adminUpdateCustomer + id)}>Update
            Customer Details</Button>
        </Box>
        <Box textAlign="center">
          <Typography variant={"h2"}>Customer Coupons</Typography>
        </Box>
        <Box display={"flex"} flexWrap={"nowrap"}>
          <Typography variant={"h5"} m={2}>Filter</Typography>
          <FormControlLabel control={<Checkbox defaultChecked onChange={() => handleAllCoupons()}/>}
                            label="All Coupons" sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
          <FormControlLabel control={<Checkbox onChange={() => handleFood()}/>} label="Food"
                            sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
          <FormControlLabel control={<Checkbox onChange={() => handleVacation()}/>} label="Vacation"
                            sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
          <FormControlLabel control={<Checkbox/>} label="Shopping" sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
          <FormControlLabel control={<Checkbox/>} label="Flights" sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
          <FormControlLabel control={<Checkbox/>} label="Pets" sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
          <FormControlLabel control={<Checkbox/>} label="Electricity"
                            sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {customer?.coupons.map(c => <CompanyManageCouponCard key={c.id} coupon={c}/>)}
        </Box>
      </Box>
  );
}