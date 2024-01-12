import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {Formik} from "formik";
import {LoginService} from "../../Services/LoginService";
import {routs} from "../../Utils/routs";
import {Alert, Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import adminService from "../../Services/AdminService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";
import errorHandler from "../../Services/ErrorHandler";

export const AddCompany = () => {

    const navigate = useNavigate();
    const [errormessage, setErrorMessage] = useState();

    const token = loginStore.getState().token


    return <Box justifyContent="center" alignItems="center" display="flex">
        <TitledCard title="Add Company" sx={{mt: 5}}>
            <Formik initialValues={{name: "", email: "", password: ""}}
                    onSubmit={(values, {setSubmitting}) => {
                        const company: Company = {
                            email: values.email,
                            id: 0,
                            name: values.name,
                            password: values.password,
                            coupons: []
                        }

                        adminService.addCompany(token, company)
                            .then(c => {
                                setSubmitting(false);
                                navigate(routs.adminCompanies)
                            })
                            .catch(err => {
                                setErrorMessage(errorHandler.showError(err));
                                setSubmitting(false)
                            })
                    }}>
                {({
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                  }) => (

                    <form onSubmit={handleSubmit}>
                        <Stack alignItems="center" spacing={5} mt={5}>
                            <TextField onChange={handleChange} type={"text"} name={"name"} id="name"
                                       label="Company Name"
                                       variant="filled"/>
                            <TextField onChange={handleChange} type={"email"} name={"email"} id="email"
                                       label="Company Email"
                                       variant="filled"/>
                            <TextField onChange={handleChange} type={"password"} name={"password"} id="password"
                                       label="Password" variant="filled"/>
                            <Button type="submit" disabled={isSubmitting} variant="contained"
                                    color={"secondary"}>Submit</Button>
                            {errormessage && <Alert severity="error">{errormessage}</Alert>}
                        </Stack>
                    </form>
                )}
            </Formik>
        </TitledCard>
    </Box>

}