import { loginStore } from "../../Redux/Stores/LoginStore";
import { useEffect, useState } from "react";
import adminService from "../../Services/AdminService";
import errorHandler from "../../Services/ErrorHandler";
import * as React from "react";
import Box from "@mui/material/Box";
import { CompanyCard } from "../../Components/CompanyCard";
import { TextField, Typography } from "@mui/material";
import Company from "../../Models/Company";

export const Companies = () => {
    const token = loginStore.getState().token;
    const [companies, setCompanies] = useState<Company[]>();
    const [error, setError] = useState();
    const [searchId, setSearchId] = useState("");

    useEffect(() => {
        if (searchId.trim() === "") {
            adminService
                .getAllCompanies(token)
                .then((c) => {
                    setCompanies(c);
                    setError(null);
                })
                .catch((err) => {
                    setError(errorHandler.showError(err));
                    setCompanies([]);
                });
        } else {
            adminService
                .getOneCompany(token, parseInt(searchId))
                .then((company) => {
                    setCompanies(company ? [company] : []);
                    setError(null);
                })
                .catch((err) => {
                    setError(errorHandler.showError(err));
                    setCompanies([]);
                });
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
                {companies?.map((c) => (
                    <CompanyCard company={c} key={c.id} />
                ))}
                {error && <Typography variant="body1">Company not found</Typography>}
            </Box>
        </Box>
    );
};


