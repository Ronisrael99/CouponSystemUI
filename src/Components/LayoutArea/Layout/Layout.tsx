import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import Footer from "../Footer/Footer";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Box from "@mui/material/Box";

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
                body2: {fontSize: "8px", margin:0, padding:0, color:"red"}
            }

        }
    );

    return (
        <div className="Layout">
            <ThemeProvider theme={materialTheme}>

                    <Navbar/>

                <Routing/>

                <Box display="flex" position="fixed" bottom={0} left={"50%"} sx={{transform:"translate(-50%)"}}>
                    <Footer/>
                </Box>
            </ThemeProvider>

        </div>
    );
}

export default Layout;
