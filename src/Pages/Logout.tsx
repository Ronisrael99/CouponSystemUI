import {TitledCard} from "../Components/TitledCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import {loginSlice} from "../Redux/LoginSlice";
import {loginStore} from "../Redux/Stores/LoginStore";
import {LoginService} from "../Services/LoginService";
import companyService from "../Services/CompanyService";

function Logout() {
    const navigate = useNavigate()

    function handleLogout(){
        LoginService.logout();
        navigate(routs.home)
    }

    return ( <Box justifyContent="center" alignItems="center" display="flex">
            <TitledCard title="Are you sure ?" sx={{mt: 5}}>
                <Stack alignItems="center" spacing={10} mt={15}>
                    <Button variant="contained" onClick={()=>navigate(routs.companyDetails)}>No, Send me back</Button>
                    <Button variant="contained" onClick={handleLogout}>Yes, See you soon</Button>
                </Stack>
            </TitledCard>
        </Box>

    );
}
export default Logout