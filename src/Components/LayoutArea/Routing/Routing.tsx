import {Navigate, Route, Routes } from "react-router-dom";
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
import {CustomerCoupons} from "../../../Pages/Customer/CustomerCoupons";
import {Companies} from "../../../Pages/Admin/Companies";
import {AddCompany} from "../../../Pages/Admin/AddCompany";
import {Customers} from "../../../Pages/Admin/Customers";
import {CustomerDetails} from "../../../Pages/Admin/CustomerDetails";
import {UpdateCustomer} from "../../../Pages/Admin/UpdateCustomer";


function Routing(): JSX.Element {
    const [client, setClient] = useState<string>(loginStore.getState().clientType ? loginStore.getState().clientType : "DEFAULT");

    useEffect(() => {
        setClient(loginStore.getState().clientType || "DEFAULT");

        loginStore.subscribe(() => {
            setClient(loginStore.getState().clientType || "DEFAULT")
        })
    }, [client])


    return (
        <div className="Routing">
            <Routes>
                {client === "DEFAULT" ? (
                    <>
                        <Route path={routs.home} element={<Home />} />
                        <Route path={routs.products} element={<Products />} />
                        <Route path={routs.contact} element={<Contact />} />
                        <Route path={routs.aboutUs} element={<AboutUs />} />
                        <Route path={routs.login} element={<Login />} />
                        <Route path={routs.register} element={<Register />} />
                        <Route path={routs.productDetails + ":id"} element={<ProductDetails />} />
                        <Route path={"*"} element={<Navigate to={routs.home} />} />
                    </>
                ) : client === "COMPANY" ? (
                    <>
                        <Route path={routs.companyDetails} element={<CompanyDetails />} />
                        <Route path={routs.addCoupon} element={<AddCoupon />} />
                        <Route path={routs.logout} element={<Logout />} />
                        <Route path={routs.manageCoupon + ":id"} element={<CouponManage />} />
                        <Route path={routs.updateCompany} element={<UpdateCompany />} />
                        <Route path={"*"} element={<Navigate to={routs.companyDetails} />} />
                    </>
                ) : client === "ADMINISTRATOR" ? (
                    <>
                        <Route path={routs.home} element={<Home />} />
                        <Route path={routs.adminCompanies} element={<Companies />} />
                        <Route path={routs.adminCompanyDetails + ":id"} element={<CompanyDetails />} />
                        <Route path={routs.adminUpdateCompany + ":id"} element={<UpdateCompany />} />
                        <Route path={routs.adminAddCompany} element={<AddCompany />} />
                        <Route path={routs.adminCustomers} element={<Customers />} />
                        <Route path={routs.adminCustomerDetails + ":id"} element={<CustomerDetails />} />
                        <Route path={routs.adminUpdateCustomer + ":id"} element={<UpdateCustomer />} />
                        <Route path={routs.logout} element={<Logout />} />
                        <Route path={"*"} element={<Navigate to={routs.home} />} />
                    </>
                ) : client === "CUSTOMER" ? (
                    <>
                        <Route path={routs.home} element={<Home />} />
                        <Route path={routs.products} element={<Products />} />
                        <Route path={routs.contact} element={<Contact />} />
                        <Route path={routs.aboutUs} element={<AboutUs />} />
                        <Route path={routs.productDetails + ":id"} element={<ProductDetails />} />
                        <Route path={routs.customerCoupons} element={<CustomerCoupons />} />
                        <Route path={routs.logout} element={<Logout />} />
                        <Route path={"*"} element={<Navigate to={routs.home} />} />
                    </>
                ) : null}
            </Routes>
        </div>
    );
}

export default Routing;
