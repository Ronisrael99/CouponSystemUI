import {loginStore} from "../../Redux/Stores/LoginStore";
import {useEffect, useState} from "react";
import adminService from "../../Services/AdminService";
import errorHandler from "../../Services/ErrorHandler";
import * as React from "react";
import Box from "@mui/material/Box";
import {TextField, Typography} from "@mui/material";
import {CustomerCard} from "../../Components/CustomerCard";
import Customer from "../../Models/Customer";

export const Customers = () => {
  const token = loginStore.getState().token;
  const [customers, setCustomers] = useState<Customer[]>();
  const [error, setError] = useState();
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    if (searchId.trim() === "") {
        adminService.getAllCustomers(token)
            .then(c => {
                setCustomers(c)
            })
            .catch(err => {
                setError(errorHandler.showError(err));
                setCustomers([])
            })
    } else {
        adminService.getOneCustomer(token, parseInt(searchId))
            .then(c => {
                setCustomers(c ? [c] : [])
                setError(null)
            })
            .catch(err => {
                setError(errorHandler.showError(err));
                setCustomers([])
            })
    }
  }, [token, searchId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  return (
      <Box>
        <TextField
            id="filled-basic"
            label="Search By ID"
            variant="filled"
            sx={{ marginLeft: 8, marginTop: 5 }}
            onChange={handleSearchChange}
            value={searchId}
        />
        <Box display={"flex"} flexWrap={"wrap"} m={5}>
          {customers?.map((c) => (
              <CustomerCard customer={c} key={c.id}/>
          ))}
          {error && <Typography variant="body1">Customer not found</Typography>}
        </Box>
      </Box>
  );
}