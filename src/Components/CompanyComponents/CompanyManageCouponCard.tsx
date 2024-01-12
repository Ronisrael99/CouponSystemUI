import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
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

  return (
      <Card sx={{ width: 345, margin: "20px" }}>
          <CardMedia
              sx={{ height: 140 }}
              image={props.coupon?.image}
              title={props.coupon?.title}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{minHeight: "80px"}}>
                  {props.coupon?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  {props.coupon?.description}
              </Typography>
          </CardContent>
          <Box textAlign="center">
              <CardActions sx={{display: "grid", gridTemplateRows: "50% 50%"}}>
                  <Button size="small" color="primary">
                      {props.coupon.price}
                  </Button>
                  {client === "COMPANY" && <Button size="small" onClick={()=> navigate(routs.manageCoupon + props.coupon.id)}>EDIT/DELETE COUPON</Button>}
              </CardActions>
          </Box>
      </Card>
  );
}
export default CompanyManageCouponCard