import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";
import Coupon from "../Models/Coupon";

interface Props {
    coupon:Coupon;
}

const CompanyManageCouponCard = (props:Props) => {
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
          <CardActions>
              <Button size="small">EDIT COUPON</Button>
              <Button size="small">DELETE COUPON</Button>
          </CardActions>
      </Card>
  );
}
export default CompanyManageCouponCard