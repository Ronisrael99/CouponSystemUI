import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {useEffect, useState} from "react";
import Company from "../../Models/Company";
import companyService from "../../Services/CompanyService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import errorHandler from "../../Services/ErrorHandler";
import {LoginService} from "../../Services/LoginService";
import {routs} from "../../Utils/routs";
import {Alert, Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Formik} from "formik";
import {useNavigate, useParams} from "react-router-dom";
import Coupon from "../../Models/Coupon";
import adminService from "../../Services/AdminService";

const UpdateCompany = () => {
    const [company, setCompany] = useState<Company>()
    const [error, setError] = useState()
    const token = loginStore.getState().token
    const navigate = useNavigate()
    const id = parseInt(useParams().id!)

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getCompanyDetails(token)
                .then(c => setCompany(c))
                .catch(err => errorHandler.showError(err))
            :
            adminService.getOneCompany(token, id)
                .then(c => setCompany(c))
                .catch(err => errorHandler.showError(err))
    }, [])

    function handleDelete() {
        const result = window.confirm("Are you sure ?");
        if (result){
            adminService.deleteCompany(token, id)
                .then(c => navigate(routs.adminCompanies))
                .catch(err => errorHandler.showError(err))
        }
    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex" m={5}>
            <TitledCard title={"Update Company"}>

                {company &&
                    <Formik initialValues={{
                        name: company.name,
                        email: company.email,
                        password: company.password
                    }}
                            onSubmit={(values, {setSubmitting}) => {
                                const updatedCompany: Company = {
                                    id: company.id,
                                    name: company.name,
                                    email: values.email,
                                    password: values.password,
                                    coupons: null
                                }
                                {loginStore.getState().clientType === "COMPANY" ?
                                    companyService.updateCompany(token, updatedCompany)
                                        .then(() => {
                                                setSubmitting(false);
                                                navigate(routs.companyDetails);
                                            }
                                        )
                                        .catch(err => {
                                            console.log(err);
                                            setSubmitting(false);
                                            setError(errorHandler.showError(err))
                                        })
                                    :
                                    adminService.updateCompany(token, updatedCompany)
                                        .then(() => {
                                                setSubmitting(false);
                                                navigate(routs.adminCompanyDetails + id);
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
                                    <TextField onChange={handleChange} type={"text"} name={"name"} id="name"
                                               label={"Company Name"}
                                               variant="filled"
                                               value={company.name}
                                    />
                                    <TextField onChange={handleChange} type={"email"} name={"email"}
                                               label="Email" id="email"
                                               value={values.email}
                                               variant="filled"
                                    />
                                    <TextField onChange={handleChange} type={"password"} name={"password"} id="password"
                                               label="Password" value={values.password} variant="filled"/>

                                    <Button type="submit" disabled={isSubmitting} variant="contained"
                                            color={"secondary"}>Update Company</Button>
                                    {loginStore.getState().clientType === "ADMINISTRATOR" &&
                                        <Button sx={{background: "Red", color: "black", width: "190px"}}
                                                onClick={handleDelete}>Delete Company</Button>}
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
export default UpdateCompany