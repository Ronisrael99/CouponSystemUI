// FilterNav.tsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface FilterNavProps {
    filters: {
        All: boolean;
        Food: boolean;
        Vacation: boolean;
        Flights: boolean;
        Pets: boolean;
        Shopping: boolean;
        Electricity: boolean;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            All: boolean;
            Food: boolean;
            Vacation: boolean;
            Flights: boolean;
            Pets: boolean;
            Shopping: boolean;
            Electricity: boolean;
        }>
        >;
}

const FilterNav: React.FC<FilterNavProps> = ({ filters, setFilters }) => {
    const handleCheckboxChange = (filterName: keyof typeof filters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    return (
        <Box display={"flex"} flexWrap={"nowrap"}>
            <Typography variant={"h4"} m={2}>
                Filter
            </Typography>

            {Object.entries(filters).map(([filterName, filterValue]) => (
                <FormControlLabel
                    key={filterName}
                    control={
                        <Checkbox
                            checked={filterValue}
                            onChange={() =>
                                handleCheckboxChange(filterName as keyof typeof filters)
                            }
                        />
                    }
                    label={<Typography variant={"h4"}>{filterName}</Typography>}
                    sx={{ '& .MuiSvgIcon-root': {fontSize: 14} }}
                />
            ))}
        </Box>
    );
};

export default FilterNav;
