import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import Coupon from "../../Models/Coupon";
import Box from "@mui/material/Box";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {routs} from "../../Utils/routs";
import {useEffect, useState} from "react";
import {loginStore} from "../../Redux/Stores/LoginStore";

interface Props {
    coupon:Coupon;
}

const CompanyManageCouponCard = (props:Props) => {
    const navigate = useNavigate();
    const [client, setClient] = useState(loginStore.getState().clientType ? loginStore.getState().clientType : "DEFAULT")

    useEffect(()=>{
        setClient(loginStore.getState().clientType)
    },[])

    const truncatedDescription = props.coupon?.description.length > 180
        ? props.coupon?.description.substring(0, 180) + '...'
        : props.coupon?.description;

  return (
      <Card sx={{ width: 345, height: 350, margin: "20px", position: "relative" }}>
          <CardMedia
              component="img"
              height="140"
              image={props.coupon?.image}
              alt={props.coupon?.title}
          />
          <CardContent sx={{ position: "absolute"}}>
              <Typography gutterBottom variant="h6" component="div" sx={{ minHeight: "10px"}}>
                  {props.coupon?.title}
              </Typography>
              <Typography variant="h4" color="text.secondary">
                  {truncatedDescription}
              </Typography>
          </CardContent>
          <Box textAlign="center">
              <CardActions
                  sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                  }}
              >
                  <Typography gutterBottom variant="h6" component="div" sx={{ minHeight: "10px"}}>
                      Price: {" " + props.coupon.price}
                  </Typography>
                  {client === "COMPANY" && (
                      <Button size="small" onClick={() => navigate(routs.manageCoupon + props.coupon.id)}>
                          EDIT/DELETE COUPON
                      </Button>
                  )}
              </CardActions>
          </Box>
      </Card>
  );
}
export default CompanyManageCouponCard