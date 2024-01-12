import {useEffect, useState} from "react";
import Company from "../../Models/Company";
import {loginStore} from "../../Redux/Stores/LoginStore";
import {useNavigate, useParams} from "react-router-dom";
import companyService from "../../Services/CompanyService";
import errorHandler from "../../Services/ErrorHandler";
import adminService from "../../Services/AdminService";
import {routs} from "../../Utils/routs";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {Formik} from "formik";
import {Alert, Button, Stack, TextField} from "@mui/material";
import Customer from "../../Models/Customer";

export const UpdateCustomer = () => {
    const [customer, setCustomer] = useState<Customer>()
    const [error, setError] = useState()
    const token = loginStore.getState().token
    const navigate = useNavigate()
    const id = parseInt(useParams().id!)

    useEffect(() => {
        adminService.getOneCustomer(token, id)
            .then(c => {
                setCustomer(c)
            })
            .catch(err => {
                errorHandler.showError(err)
            })
    }, [])

    function handleDelete() {
        const result = window.confirm("Are you sure ?");
        if (result) {
            adminService.deleteCustomer(token, id)
                .then(c => navigate(routs.adminCustomers))
                .catch(err => errorHandler.showError(err))
        }
    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex" m={5}>
            <TitledCard title={"Update Customer"}>

                {customer &&
                    <Formik initialValues={{
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        email: customer.email,
                        password: customer.password
                    }}
                            onSubmit={(values, {setSubmitting}) => {
                                const updatedCustomer: Customer = {
                                    id: customer.id,
                                    firstName: customer.firstName,
                                    lastName: customer.lastName,
                                    email: values.email,
                                    password: values.password,
                                    coupons: null
                                }
                                {
                                    adminService.updateCustomer(token, updatedCustomer)
                                        .then(() => {
                                                setSubmitting(false);
                                                navigate(routs.adminCustomerDetails + customer.id);
                                            }
                                        )
                                        .catch(err => {
                                            console.log(err);
                                            setSubmitting(false);
                                            setError(errorHandler.showError(err))
                                        })
                                }

                            }}>
                        {({
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              values
                          }) => (

                            <form onSubmit={handleSubmit}>
                                <Stack alignItems="center" spacing={5} mt={5}>
                                    <TextField onChange={handleChange} type={"text"} name={"firstName"} id="firstName"
                                               label={"First Name"}
                                               variant="filled"
                                               value={customer.firstName}
                                    />
                                    <TextField onChange={handleChange} type={"text"} name={"lastName"} id="lastName"
                                               label={"Last Name"}
                                               variant="filled"
                                               value={customer.lastName}
                                    />
                                    <TextField onChange={handleChange} type={"email"} name={"email"}
                                               label="Email" id="email"
                                               value={values.email}
                                               variant="filled"
                                    />
                                    <TextField onChange={handleChange} type={"password"} name={"password"} id="password"
                                               label="Password" value={values.password} variant="filled"/>

                                    <Button type="submit" disabled={isSubmitting} variant="contained"
                                            color={"secondary"}>Update Customer</Button>

                                        <Button sx={{background: "Red", color: "black", width: "190px"}}
                                                onClick={handleDelete}>Delete Customer</Button>
                                    {error && <Alert severity="error">{error}</Alert>}
                                </Stack>
                            </form>
                        )}
                    </Formik>
                }

            </TitledCard>
        </Box>
    );
}