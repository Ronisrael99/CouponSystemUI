import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";
import Customer from "../Models/Customer";

interface Props {
    customer:Customer
}

export const CustomerCard = (props:Props) => {
    const navigate = useNavigate()

    return (
        <Card sx={{width: 345, margin: "20px", textAlign:"center"}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Customer ID: {" " + props.customer.id}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.customer.firstName + " " + props.customer.lastName}
                </Typography>
                <Typography sx={{ mb: 1, mt:2 }} color="text.secondary">
                    Email:
                </Typography>
                <Typography variant="body1">
                    {props.customer.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" sx={{marginLeft: "32%"}} onClick={()=> navigate(routs.adminCustomerDetails + props.customer.id)}>Show Customer</Button>
            </CardActions>
        </Card>
    );
}