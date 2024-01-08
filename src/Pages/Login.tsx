import {TitledCard} from "../Components/TitledCard";
import {Alert, Button, Select, Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {Formik} from "formik";
import {LoginService} from "../Services/LoginService";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import {useState} from "react";


export const Login = () => {

    const navigate = useNavigate();
    const [errormessage, setErrorMessage] = useState();


    return <Box justifyContent="center" alignItems="center" display="flex">
        <TitledCard title="Login" sx={{mt: 5}}>
            <Formik initialValues={{clientType: "CUSTOMER", email: "", password: ""}}
                    onSubmit={(values, {setSubmitting}) => {
                        LoginService.login(values).then(() => {
                                setSubmitting(false);
                                {
                                    values.clientType === "CUSTOMER" && navigate(routs.home)
                                }
                                {
                                    values.clientType === "COMPANY" && navigate(routs.companyDetails)
                                }
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                setSubmitting(false);
                                setErrorMessage(error.response.data.message);
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
                            <Select onChange={handleChange} name={"clientType"} sx={{width: 250}}
                                    defaultValue="CUSTOMER">
                                <MenuItem value="ADMINISTRATOR">Admin</MenuItem>
                                <MenuItem value="COMPANY">Company</MenuItem>
                                <MenuItem value="CUSTOMER">Customer</MenuItem>
                            </Select>
                            <TextField onChange={handleChange} type={"email"} name={"email"} id="email" label="Email"
                                       variant="filled"/>
                            <TextField onChange={handleChange} type={"password"} name={"password"} id="password"
                                       label="Password" variant="filled"/>
                            <Button type="submit" disabled={isSubmitting} variant="contained"
                                    color={"secondary"}>Submit</Button>
                            {errormessage && <Alert severity="error">{errormessage}</Alert>}
                            <Button variant="outlined" size="small" sx={{width: "50%"}}
                                    onClick={() => navigate(routs.register)}>Or sign up</Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </TitledCard>
    </Box>

}