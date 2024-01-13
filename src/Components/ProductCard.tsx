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

    const truncatedDescription = props.coupon.description.length > 180
        ? props.coupon.description.substring(0, 180) + '...'
        : props.coupon.description;

    return ( <>
            <Card sx={{ width: 345, height: 350, margin: "20px", position: "relative" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.coupon.image}
                        alt={props.coupon.title}
                    />
                    <CardContent sx={{ position: "absolute"}}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ minHeight: "10px", whiteSpace: "nowrap" }}>
                            {props.coupon.title}
                        </Typography>
                        <Typography variant="h4" color="text.secondary">
                            {truncatedDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ position: "absolute", bottom: 0, width: "100%", display: "flex", justifyContent: "center", marginTop: 2 }}>
                    Price: {" " + props.coupon.price}
                </CardActions>
            </Card>
        </>
    );
}