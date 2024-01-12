import {TitledCard} from "../Components/TitledCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import {loginStore} from "../Redux/Stores/LoginStore";
import {LoginService} from "../Services/LoginService";
import {useEffect, useState} from "react";
import errorHandler from "../Services/ErrorHandler";

function Logout() {
    const navigate = useNavigate()

    const [client, setClient] = useState<string>(loginStore.getState().clientType ? loginStore.getState().clientType : "DEFAULT")
    useEffect(()=>{
        setClient(loginStore.getState().clientType)

        loginStore.subscribe(()=>{
            setClient(loginStore.getState().clientType)
        })
    },[])

    function handleLogout(){
        LoginService.logout()
            .then(()=> {navigate(routs.home)})
            .catch(err => errorHandler.showError(err));
    }
    function handleStay() {
        switch (client) {
            case "DEFAULT":
                return routs.home
            case "COMPANY":
                return routs.companyDetails
            case "ADMINISTRATOR":
                return routs.home
            case "CUSTOMER":
                return routs.home
        }
    }

    return ( <Box justifyContent="center" alignItems="center" display="flex">
            <TitledCard title="Are you sure ?" sx={{mt: 5}}>
                <Stack alignItems="center" spacing={10} mt={15}>
                    <Button variant="contained" onClick={()=>navigate(handleStay())}>No, Send me back</Button>
                    <Button variant="contained" onClick={handleLogout}>Yes, See you soon</Button>
                </Stack>
            </TitledCard>
        </Box>

    );
}
export default Logout