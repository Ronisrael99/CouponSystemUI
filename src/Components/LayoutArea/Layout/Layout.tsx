import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Box from "@mui/material/Box";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {routs} from "../../../Utils/routs";
import {LoginService} from "../../../Services/LoginService";
import errorHandler from "../../../Services/ErrorHandler";
import {Error} from "../../../Services/Error";

function Layout(): JSX.Element {


    const materialTheme = createTheme(
        {
            palette: {
                // primary: {main: "#e4f602"},
                secondary: {main: "#0e0e0e"}
            },
            typography: {
                h1: {fontSize: "60px"},
                h2: {fontSize: "35px"},
                h3: {fontSize: "18px"},
                h4: {fontSize: "12px"},
                body1: {fontSize: "18px"},
                body2: {fontSize: "10px", margin: 0, padding: 0, color: "red"}
            }

        }
    );
    const navigate = useNavigate()
    const [error, setError] = useState<string>()
    const [dialog, setDialog] = useState(false)

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 408) {
                    // Unauthorized error, redirect to login page
                    LoginService.logout()
                        .then(s => {
                            setError("Time out")
                            setDialog(true)
                            navigate(routs.login)
                        }).catch(err => {
                        setError(errorHandler.showError(err))
                        setDialog(true)
                    })// replace '/login' with your actual login page route
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Remove the interceptor when the component unmounts
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <>
            {dialog && <Error error={error} onClose={()=> setDialog(false)}/>}
            <div className="Layout">
                <ThemeProvider theme={materialTheme}>

                    <Navbar/>

                    <Routing/>

                    <Box display="flex" position="fixed" bottom={0} left={"50%"} sx={{transform: "translate(-50%)"}}>
                        <Footer/>
                    </Box>
                </ThemeProvider>

            </div>
        </>
    );
}

export default Layout;
