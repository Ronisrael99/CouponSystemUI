import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import MenuItem from '@mui/material/MenuItem';
import {usePages} from "../../../Hooks/UsePages";
import {useNavigate} from "react-router-dom";
import {routs} from "../../../Utils/routs";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleNav = (route: string) => {
        navigate(route)
    }
    const pages = usePages();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box display='flex' alignItems="center">
                        <Typography
                            variant="h6"
                        >
                            <i style={{cursor: "pointer"}} onClick={()=> handleNav(routs.home)}>GrooRon</i>
                        </Typography>

                        <Box sx={{flexGrow: 1}} display='flex' alignItems="center" ml={10}>
                            {pages.map(({title, route}) => (
                                <Button
                                    key={route}
                                    onClick={() => handleNav(route)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {title}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
