import {useEffect, useState} from "react";
import {loginStore} from "../../Redux/Stores/LoginStore";
import companyService from "../../Services/CompanyService";
import Coupon from "../../Models/Coupon";
import errorHandler from "../../Services/ErrorHandler";
import Box from "@mui/material/Box";
import CompanyManageCouponCard from "../../Components/CompanyManageCouponCard";

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState<Coupon[]>()

    const token = loginStore.getState().token

    useEffect(() => {
        console.log(token)
        companyService.getCompanyCoupons(token)
            .then(c => setCoupons(c))
            .catch(err => errorHandler.showError(err))

        loginStore.subscribe(()=> {
            companyService.getCompanyCoupons(token)
                .then(c => setCoupons(c))
                .catch(err => errorHandler.showError(err))
        })
    }, [])


    return (
        <Box m={5}>
            <Box display={"flex"} flexWrap={"wrap"}>
                {coupons?.map(c => <CompanyManageCouponCard coupon={c} key={c.id}/>)}
            </Box>
        </Box>
    );
}
export default ManageCoupons