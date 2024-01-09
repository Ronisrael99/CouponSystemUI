import {useEffect, useState} from "react";
import companyService from "../../Services/CompanyService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CompanyManageCouponCard from "../../Components/CompanyComponents/CompanyManageCouponCard";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {routs} from "../../Utils/routs";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Coupon from "../../Models/Coupon";



const CompanyDetails = () => {

    const [company, setCompany] = useState<Company>()
    const [isVacation, setIsVacation] = useState<boolean>(true)


    const navigate = useNavigate()


    const token = loginStore.getState().token

    useEffect(() => {
        companyService.getCompanyDetails(token)
            .then(c => setCompany(c))
            .catch(err => errorHandler.showError(err))
    }, [])


    function handleVacation() {
        setIsVacation(!isVacation)
        console.log(isVacation)
    }
    return (
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
                <Button variant="contained" color={"primary"} onClick={() => navigate(routs.updateCompany)}>Update Company Details</Button>
            </Box>
            <Box textAlign="center">
                <Typography variant={"h2"}>Company Coupons</Typography>
            </Box>
            <Box display={"flex"} flexWrap={"nowrap"}>
                <Typography variant={"h5"} m={2}>Filter</Typography>
                <FormControlLabel control={<Checkbox defaultChecked />} label="All Coupons" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                <FormControlLabel control={<Checkbox  />} label="Food" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                <FormControlLabel control={<Checkbox onClick={handleVacation} />} label="Vacation" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                <FormControlLabel control={<Checkbox  />} label="Shopping" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                <FormControlLabel control={<Checkbox  />} label="Flights" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                <FormControlLabel control={<Checkbox  />} label="Pets" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                <FormControlLabel control={<Checkbox  />} label="Electricity" sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
            </Box>
            <Box display="flex" flexWrap="wrap">
                {company?.coupons.map(c => <CompanyManageCouponCard key={c.id} coupon={c}/>)}
            </Box>
        </Box>
    );

}
export default CompanyDetails