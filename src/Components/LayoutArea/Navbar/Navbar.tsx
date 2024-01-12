import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {routs} from "../../../Utils/routs";
import {useEffect, useState} from "react";
import {loginStore} from "../../../Redux/Stores/LoginStore";

function ResponsiveAppBar() {

    const navigate = useNavigate();

    const [client, setClient] = useState("DEFAULT")

    useEffect(() => {
        setClient(loginStore.getState().clientType || "DEFAULT")

        loginStore.subscribe(() => {
            setClient(loginStore.getState().clientType || "DEFAULT")
        })
    }, [])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box display='flex' alignItems="center">
                        <Typography
                            variant="h6"
                        >
                            <i style={{cursor: "pointer"}} onClick={() => navigate(routs.home)}>GrooRon</i>
                        </Typography>

                        <Box sx={{flexGrow: 1}} display='flex' alignItems="center" ml={10}>
                            {client === "DEFAULT" &&
                                <>
                                    <Button onClick={() => navigate(routs.home)} sx={{my: 2, color: 'white', display: 'block'}}>Home</Button>
                                    <Button onClick={() => navigate(routs.products)} sx={{my: 2, color: 'white', display: 'block'}}>Products</Button>
                                    <Button onClick={() => navigate(routs.contact)} sx={{my: 2, color: 'white', display: 'block'}}>Contact</Button>
                                    <Button onClick={() => navigate(routs.aboutUs)} sx={{my: 2, color: 'white', display: 'block'}}>About Us</Button>
                                    <Button onClick={() => navigate(routs.login)} sx={{my: 2, color: 'white', display: 'block'}}>Login</Button>
                                </>
                            }
                            {client === "COMPANY" &&
                                <>
                                    <Button onClick={() => navigate(routs.companyDetails)} sx={{my: 2, color: 'white', display: 'block'}}>My Company</Button>
                                    <Button onClick={() => navigate(routs.addCoupon)} sx={{my: 2, color: 'white', display: 'block'}}>Add Coupon</Button>
                                    <Button onClick={() => navigate(routs.logout)} sx={{my: 2, color: 'white', display: 'block'}}>Logout</Button>
                                </>
                            }
                            {client === "CUSTOMER" &&
                                <>
                                    <Button onClick={() => navigate(routs.home)} sx={{my: 2, color: 'white', display: 'block'}}>Home</Button>
                                    <Button onClick={() => navigate(routs.products)} sx={{my: 2, color: 'white', display: 'block'}}>Products</Button>
                                    <Button onClick={() => navigate(routs.contact)} sx={{my: 2, color: 'white', display: 'block'}}>Contact</Button>
                                    <Button onClick={() => navigate(routs.aboutUs)} sx={{my: 2, color: 'white', display: 'block'}}>About Us</Button>
                                    <Button onClick={() => navigate(routs.customerCoupons)} sx={{my: 2, color: 'white', display: 'block'}}>My Coupons</Button>
                                    <Button onClick={() => navigate(routs.logout)} sx={{my: 2, color: 'white', display: 'block'}}>Logout</Button>
                                </>
                            }
                            {client === "ADMINISTRATOR" &&
                                <>
                                    <Button onClick={() => navigate(routs.home)} sx={{my: 2, color: 'white', display: 'block'}}>Home</Button>
                                    <Button onClick={() => navigate(routs.adminCompanies)} sx={{my: 2, color: 'white', display: 'block'}}>Companies</Button>
                                    <Button onClick={() => navigate(routs.adminAddCompany)} sx={{my: 2, color: 'white', display: 'block'}}>Add Company</Button>
                                    <Button onClick={() => navigate(routs.adminCustomers)} sx={{my: 2, color: 'white', display: 'block'}}>Customers</Button>
                                    <Button onClick={() => navigate(routs.logout)} sx={{my: 2, color: 'white', display: 'block'}}>Logout</Button>
                                </>
                            }
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
