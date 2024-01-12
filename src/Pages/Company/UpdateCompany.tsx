import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {useEffect, useState} from "react";
import Company from "../../Models/Company";
import companyService from "../../Services/CompanyService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import errorHandler from "../../Services/ErrorHandler";
import {routs} from "../../Utils/routs";
import { Button, Stack, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import adminService from "../../Services/AdminService";
import {Error} from "../../Services/Error";
import {useForm} from "react-hook-form";
import * as React from "react";

const UpdateCompany = () => {
    const [company, setCompany] = useState<Company>()
    const [error, setError] = useState()
    const [dialog, setDialog] = useState(false)
    const token = loginStore.getState().token
    const navigate = useNavigate()
    const id = parseInt(useParams().id!)
    const {register, handleSubmit, formState} = useForm<Company>({mode: "onBlur"})

    useEffect(() => {
        loginStore.getState().clientType === "COMPANY" ?
            companyService.getCompanyDetails(token)
                .then(c => {
                    setCompany(c)
                })
                .catch(err => {
                    setError(errorHandler.showError(err))
                    setDialog(true)
                })
            :
            adminService.getOneCompany(token, id)
                .then(c => {
                    setCompany(c)
                })
                .catch(err => {
                    setError(errorHandler.showError(err))
                    setDialog(true)
                })
    }, [])

    function handleDelete() {
        const result = window.confirm("Are you sure ?");
        if (result) {
            adminService.deleteCompany(token, id)
                .then(c => {
                    navigate(routs.adminCompanies)
                })
                .catch(err => {
                    setError(errorHandler.showError(err))
                    setDialog(true)
                })
        }
    }

    function sendForm(formCompany: Company) {

        formCompany.id = company.id
        formCompany.name = company.name
        {
            loginStore.getState().clientType === "COMPANY" ?
                companyService.updateCompany(token, formCompany)
                    .then(() => {
                            navigate(routs.companyDetails);
                        }
                    )
                    .catch(err => {
                        setError(errorHandler.showError(err))
                        setDialog(true)
                    })
                :
                adminService.updateCompany(token, formCompany)
                    .then(() => {
                            navigate(routs.adminCompanyDetails + id);
                        }
                    )
                    .catch(err => {
                        setError(errorHandler.showError(err))
                        setDialog(true)
                    })
        }

    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex" m={5}>
            {dialog && <Error error={error} onClose={() => setDialog(false)}/>}
            <TitledCard title={"Update Company"}>

                {company &&
                    <form onSubmit={handleSubmit(sendForm)}>
                        <Stack alignItems="center" spacing={5} mt={5}>

                            <TextField type={"text"} name={"name"} id={"name"} label={"Company Name"} variant={"filled"}
                                       value={company.name} disabled />
                            {formState.errors?.name && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.name.message}</span>}

                            <TextField type={"email"} name={"email"} id={"email"} label={"Company Email"}
                                       variant={"filled"}
                                       defaultValue={company.email}
                                       {...register("email", {
                                           required: {message: "Required", value: true},
                                           pattern: {
                                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                               message: 'Invalid email address',
                                           }
                                       })}
                            />
                            {formState.errors?.email && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.email.message}</span>}

                            <TextField type={"password"} name={"password"} id={"password"} label={"Password"}
                                       variant={"filled"}
                                       defaultValue={company.password} {...register("password", {
                                required: {message: "Required", value: true}
                            })}/>
                            {formState.errors?.password && <span style={{
                                fontSize: "8px",
                                color: "red",
                                margin: 0,
                                padding: 0,
                            }}>{formState.errors.password.message}</span>}

                            <Button type={"submit"} variant={"contained"} color={"secondary"}>Update Company</Button>

                            {loginStore.getState().clientType === "ADMINISTRATOR" &&
                                <Button sx={{background: "red", color: "black", width: "190px"}} onClick={handleDelete}>Delete Company</Button>
                            }

                        </Stack>
                    </form>
                }

            </TitledCard>
        </Box>
    );
}
export default UpdateCompany