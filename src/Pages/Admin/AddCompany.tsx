import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Box from "@mui/material/Box";
import {TitledCard} from "../../Components/TitledCard";
import {routs} from "../../Utils/routs";
import { Button, Stack, TextField} from "@mui/material";
import adminService from "../../Services/AdminService";
import {loginStore} from "../../Redux/Stores/LoginStore";
import Company from "../../Models/Company";
import errorHandler from "../../Services/ErrorHandler";
import {useForm} from "react-hook-form";
import {Error} from "../../Services/Error";

export const AddCompany = () => {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [dialog, setDialog] = useState(false)
    const {register, handleSubmit, formState} = useForm<Company>({mode: "onBlur"})

    const token = loginStore.getState().token

    function sendForm(company: Company) {
        company.id = 0
        company.coupons = []

        adminService.addCompany(token, company)
            .then(c => {
                navigate(routs.adminCompanies)
            })
            .catch(err => {
                setError(errorHandler.showError(err))
                setDialog(true)
            })
    }


    return <Box justifyContent="center" alignItems="center" display="flex">
        <TitledCard title="Add Company" sx={{mt: 5}}>
            {dialog && <Error error={error} onClose={() => setDialog(false)}/>}

            <form onSubmit={handleSubmit(sendForm)}>
                <Stack alignItems="center" spacing={5} mt={5}>

                    <TextField type={"text"} name={"name"} id={"name"} label={"Company Name"} variant={"filled"}
                               required {...register("name")}/>

                    <TextField type={"email"} name={"email"} id={"email"} label={"Company Email"} variant={"filled"}
                               required {...register("email", {
                        required: {message: "Required", value: true},
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                        }
                    })}/>
                    {formState.errors?.email && <span style={{
                        fontSize: "8px",
                        color: "red",
                        margin: 0,
                        padding: 0,
                    }}>{formState.errors.email.message}</span>}

                    <TextField type={"password"} name={"password"} id={"password"} label={"Password"} variant={"filled"}
                               required {...register("password")}/>

                    <Button type="submit" variant="contained"
                            color={"secondary"}>Submit</Button>

                </Stack>

            </form>

        </TitledCard>
    </Box>

}