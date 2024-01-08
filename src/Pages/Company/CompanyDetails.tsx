import {useEffect, useState} from "react";
import companyService from "../../Services/CompanyService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ProductCard} from "../../Components/ProductCard";


const CompanyDetails = () => {

    const [company, setCompany] = useState<Company>()

    const token = loginStore.getState().token


    useEffect(() => {
        companyService.getCompanyDetails(token)
            .then(c => setCompany(c))
            .catch(err => errorHandler.showError(err))
    }, [])
    // NEED TO CHECK IF ANY SUBSCRIBE NEEDED

    return (
        <Box m={5}>
            <Box textAlign={"center"} display={"flex"} justifyContent={"center"}>
                <Box mr={"40px"}>
                    <Typography variant={"h6"}>Company Name</Typography>
                    <Typography variant={"h6"}>{company?.name}</Typography>
                </Box>
                <Box ml={"40px"}>
                    <Typography variant={"h6"}>Company Email</Typography>
                    <Typography variant={"h6"}>{company?.email}</Typography>
                </Box>
            </Box>
            <Box textAlign="center">
                <Typography variant={"h2"}>Company Coupons</Typography>
            </Box>
            <Box display="flex" flexWrap="wrap">
                {company?.coupons.map(c=> <ProductCard key={c.id} coupon={c}/>)}
            </Box>
        </Box>
    );

}
export default CompanyDetails