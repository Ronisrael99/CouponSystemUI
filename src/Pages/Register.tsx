import {TitledCard} from "../Components/TitledCard";
import {Alert, Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {Formik} from "formik";
import {LoginService} from "../Services/LoginService";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import {useState} from "react";
import customerService from "../Services/CustomerService";
import errorHandler from "../Services/ErrorHandler";


export const Register = () => {

    const navigate = useNavigate();
    const [errormessage, setErrorMessage] = useState();


    return <Box justifyContent="center" alignItems="center" display="flex">
        <TitledCard title="Register" sx={{mt: 5}}>
            <Formik initialValues={{
                clientType: "CUSTOMER",
                id: 0,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                coupons: []
            }} onSubmit={(values, {setSubmitting}) => {
                customerService.addCustomer(values)
                    .then(() => {
                    setSubmitting(false);

                    const logInCustomer = {
                        clientType: values.clientType,
                        email: values.email,
                        password: values.password
                    }
                    LoginService.login(logInCustomer).then(() => {
                            setSubmitting(false);
                            navigate(routs.home);
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                            setSubmitting(false);
                            setErrorMessage(errorHandler.showError(error));
                        }
                    )

                }).catch(
                    (error) => {
                        console.log(error);
                        setSubmitting(false);
                        setErrorMessage(errorHandler.showError(error));
                    }
                )
            }}>
                {({
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                  }) => (

                    <form onSubmit={handleSubmit}>
                        <Stack alignItems="center" spacing={5} mt={5}>
                            <TextField onChange={handleChange} type={"text"} name={"firstName"} id="firstName"
                                       label="First Name" variant="filled"/>
                            <TextField onChange={handleChange} type={"text"} name={"lastName"} id="lastName"
                                       label="Last Name" variant="filled"/>
                            <TextField onChange={handleChange} type={"email"} name={"email"} id="email" label="Email"
                                       variant="filled"/>
                            <TextField onChange={handleChange} type={"password"} name={"password"} id="password"
                                       label="Password" variant="filled"/>
                            <Button type="submit" disabled={isSubmitting} variant="contained"
                                    color={"secondary"}>Submit</Button>
                            {errormessage && <Alert severity="error">{errormessage}</Alert>}
                            <Button variant="outlined" size="small" sx={{width: "70%"}}
                                    onClick={() => navigate(routs.login)}>Already have an account ? Login</Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </TitledCard>
    </Box>

}
