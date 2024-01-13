import {Button, Stack, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {TitledCard} from "../Components/TitledCard";
import {useState} from "react";
import {Error} from "../Services/Error";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";


function Contact(): JSX.Element {

    const [dialog, setDialog] = useState(false)

    function handleSubmit() {
        setDialog(true)
    }

    return (
        <Box>
            {dialog && <Error error={"We got your message! We will make contact with you as soon as possible!"} title={"Thank You"} onClose={()=>setDialog(false)}/>}
            <Box textAlign='center'>
                <Typography variant="h1" mb={5}>Contact Us</Typography>
            </Box>
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
                <TitledCard title="Ask us anything">
                    <Stack spacing={10} my={10}>
                        <Typography variant={"body1"}><i className={"fa-solid fa-location-dot"}></i> Gorodeski 14,
                            Rehovot</Typography>
                        <Typography variant={"body1"}><i className={"fa-solid fa-phone"}></i> +972
                            52-6609205</Typography>
                        <Typography variant={"body1"}><i
                            className={"fa-solid fa-envelope"}></i> Ronisrael99@gmail.com</Typography>
                    </Stack>
                </TitledCard>
                <TitledCard title="Lets talk">
                    <form>
                        <Stack alignItems="center" spacing={2}>
                            <TextField id="filled-basic" label="First Name" variant="filled"/>
                            <TextField id="filled-basic" label="Last Name" variant="filled"/>
                            <TextField id="filled-basic" label="Phone Number" variant="filled"/>
                            <TextField id="filled-basic" label="Email" variant="filled"/>
                            <TextField id="filled-basic" label="Ask Anything" variant="filled"/>
                            <Button variant="contained" onClick={handleSubmit} endIcon={<SendIcon/>}>Submit</Button>
                        </Stack>
                    </form>
                </TitledCard>
            </Box>
        </Box>

    );
}

export default Contact;
