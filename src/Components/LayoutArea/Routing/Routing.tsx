import {Navigate, Route, Routes} from "react-router-dom";
import {routs} from "../../../Utils/routs";
import {Login} from "../../../Pages/Login";
import {Register} from "../../../Pages/Register";
import {ProductDetails} from "../../../Pages/ProductDetails";
import {loginStore} from "../../../Redux/Stores/LoginStore";
import {useEffect, useState} from "react";
import Home from "../../../Pages/Home";
import {Products} from "../../../Pages/Products";
import Contact from "../../../Pages/Contact";
import AboutUs from "../../../Pages/AboutUs";
import AddCoupon from "../../../Pages/Company/AddCoupon";
import Logout from "../../../Pages/Logout";
import CompanyDetails from "../../../Pages/Company/CompanyDetails";
import CouponManage from "../../../Pages/Company/CouponManage";
import UpdateCompany from "../../../Pages/Company/UpdateCompany";


function Routing(): JSX.Element {
    const [client, setClient] = useState("DEFAULT");

    useEffect(() => {
        setClient(loginStore.getState().clientType || "DEFAULT");

        loginStore.subscribe(() => {
            setClient(loginStore.getState().clientType || "DEFAULT")
        })
    }, [])


    return (
        <div className="Routing">
            <Routes>
                {client === "DEFAULT" &&
                    <>
                        <Route path={routs.home} Component={Home}/>
                        <Route path={routs.products} Component={Products}/>
                        <Route path={routs.contact} Component={Contact}/>
                        <Route path={routs.aboutUs} Component={AboutUs}/>
                        <Route path={routs.login} Component={Login}/>
                        <Route path={routs.register} Component={Register}/>
                        <Route path={routs.productDetails + ":id"} Component={ProductDetails}/>
                        <Route path={"*"} element={<Navigate to={routs.home}/>}/>
                    </>
                }
                {client === "COMPANY" &&
                    <>
                        <Route path={routs.companyDetails} Component={CompanyDetails}/>
                        <Route path={routs.addCoupon} Component={AddCoupon}/>
                        <Route path={routs.logout} Component={Logout}/>
                        <Route path={routs.manageCoupon + ":id"} Component={CouponManage}/>
                        <Route path={routs.updateCompany} Component={UpdateCompany}/>
                        <Route path={"*"} element={<Navigate to={routs.companyDetails}/>}/>
                    </>
                }
                {client === "ADMINISTRATOR" &&
                    <>
                        <Route path={routs.home} Component={Home}/>
                        <Route path={routs.logout} Component={Logout}/>
                        <Route path={"*"} element={<Navigate to={routs.home}/>}/>
                    </>
                }
                {client === "CUSTOMER" &&
                    <>
                        <Route path={routs.home} Component={Home}/>
                        <Route path={routs.logout} Component={Logout}/>
                        <Route path={"*"} element={<Navigate to={routs.home}/>}/>
                    </>
                }
            </Routes>
        </div>
    );
}

export default Routing;
