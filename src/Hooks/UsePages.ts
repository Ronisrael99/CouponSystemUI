import {routs} from "../Utils/routs";
import {useEffect, useState} from "react";
import {loginStore} from "../Redux/Stores/LoginStore";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import AboutUs from "../Pages/AboutUs";
import {Login} from "../Pages/Login";
import Logout from "../Pages/Logout";
import {Products} from "../Pages/Products";
import CompanyDetails from "../Pages/Company/CompanyDetails";
import AddCoupon from "../Pages/Company/AddCoupon";
import ManageCoupons from "../Pages/Company/ManageCoupons";

type Page = {
    title: string;
    route: string;
    component: () => JSX.Element
}

export const usePages = (): Page[] => {

    const [client, setClient] = useState("DEFAULT");

    useEffect(() => {
        setClient(loginStore.getState().clientType || "DEFAULT")

        loginStore.subscribe(() => {
            //console.log(loginStore.getState().clientType)
            setClient(loginStore.getState().clientType || "DEFAULT")
        })
    }, [])
    const userToRoutes = {
        ADMINISTRATOR: [
            {
                title: "Home",
                route: routs.home,
                component: Home
            },
            {
                title: "Contact",
                route: routs.contact,
                component: Contact
            },
            {
                title: "Logout",
                route: routs.logout,
                component: Logout
            }
        ],
        COMPANY: [
            {
                title: "My Company",
                route: routs.companyDetails,
                component: CompanyDetails
            },
            {
                title: "Manage Coupons",
                route: routs.manageCoupons,
                component: ManageCoupons
            },
            {
                title: "Add Coupon",
                route: routs.addCoupon,
                component: AddCoupon
            },
            {
                title: "Logout",
                route: routs.logout,
                component: Logout
            }
        ],
        CUSTOMER: [
            {
                title: "Home",
                route: routs.home,
                component: Home
            },
            {
                title: "Products",
                route: routs.products,
                component: Products
            },
            {
                title: "Contact",
                route: routs.contact,
                component: Contact
            },
            {
                title: "About us",
                route: routs.aboutUs,
                component: AboutUs
            },
            {
                title: "Logout",
                route: routs.logout,
                component: Logout
            }
        ],
        DEFAULT: [
            {
                title: "Home",
                route: routs.home,
                component: Home
            },
            {
                title: "Products",
                route: routs.products,
                component: Products
            },
            {
                title: "Contact",
                route: routs.contact,
                component: Contact
            },
            {
                title: "About us",
                route: routs.aboutUs,
                component: AboutUs
            },
            {
                title: "Login",
                route: routs.login,
                component: Login
            }
        ]
    }
    // @ts-ignore
    return userToRoutes[client]
}