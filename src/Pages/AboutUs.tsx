import Box from "@mui/material/Box";


function AboutUs(): JSX.Element {
    return (
        <Box display={"flex"} justifyContent={"center"} mt="10px" mb="10px">
            <Box textAlign="center" width="40%" margin="0">
                <img src={"/resume.png"} alt={"resume"} style={{width: "100%"}}/>
            </Box>
        </Box>
    );
}

export default AboutUs;
