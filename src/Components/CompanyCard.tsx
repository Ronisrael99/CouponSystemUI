import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Company from "../Models/Company";
import {useNavigate} from "react-router-dom";
import {routs} from "../Utils/routs";

interface Props {
    company:Company
}

export const CompanyCard = (props:Props) => {
    const navigate = useNavigate()

  return (
      <Card sx={{width: 345, margin: "20px", textAlign:"center"}}>
          <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Company ID: {" " + props.company.id}
              </Typography>
              <Typography variant="h5" component="div">
                  {props.company.name}
              </Typography>
              <Typography sx={{ mb: 1, mt:2 }} color="text.secondary">
                  Email:
              </Typography>
              <Typography variant="body2">
                  {props.company.email}
              </Typography>
          </CardContent>
          <CardActions>
              <Button size="small" sx={{marginLeft: "32%"}} onClick={()=> navigate(routs.adminCompanyDetails + props.company.id)}>Show Company</Button>
          </CardActions>
      </Card>
  );
}