import {Label} from "@mui/icons-material";
import {FormControl, TextField, Box, Typography} from "@mui/material";
import * as React from "react";

const LoanCalculator = () => {
    return(
        <>
            <Box className="flex justify-center pt-24 px-4">
                <Typography ml={15} mr={15} variant={"h6"}>Loan Calculator</Typography>
            </Box>
            <Box>
                <FormControl defaultValue="" required>
                    <Label>Name</Label>
                    <TextField placeholder="Write your name here" />
                </FormControl>
            </Box>
        </>
    );
};

export default LoanCalculator;
