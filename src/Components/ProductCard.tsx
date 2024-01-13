import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import Coupon from "../Models/Coupon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";



interface Props {
    coupon: Coupon
}


export const ProductCard = (props: Props) => {

    return ( <>
            <Card sx={{width: 345, margin: "20px"}}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.coupon.image}
                        alt={props.coupon.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{minHeight: "80px"}}>
                            {props.coupon.title}
                        </Typography>
                        <Typography variant="h4" color="text.secondary">
                            {props.coupon.description} <br/>
                            {props.coupon.category}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{display: "flex", justifyContent: "center"}}>

                      Price:  { " " + props.coupon.price}

                </CardActions>
            </Card>
        </>
    );
}