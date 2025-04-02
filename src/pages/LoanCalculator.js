import {
    TextField,
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import React, { useState } from "react";
import axios from "axios";
import API from "../globals";

const LoanCalculator = () => {
    const [loanData, setLoanData] = useState(null);
    const [priceOfVehicle, setPriceOfVehicle] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [downPayment, setDownPayment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams({
                priceOfVehicle: priceOfVehicle,
                downPayment: downPayment,
                loanDuration: loanDuration,
                interestRate: interestRate,
                state: "ON",
            });

            const response = await axios.get(`${API.BASE_URL}/loan-calculator?${params.toString()}`);

            setLoanData(await response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box className="pt-28 px-10">
            <Box

                sx={{
                    border: 1,
                    borderRadius: 4,
                    borderColor: "secondary.gray",
                }}
            >
                <Stack direction="row" spacing={0}>
                    {/* Left Side - Form */}
                    <Box sx={{ width: "70%", px: 4 }} pt={4} pb={6}>
                        <Box className="pt-10">
                            <Typography color="primary.main" variant="h4">
                                Auto Loan Calculator
                            </Typography>
                            <Typography color="text.secondary" mt={2}>
                                Use our loan calculator to calculate payments over the life of
                                your loan. Enter your information to see how much your monthly
                                payments could be.
                            </Typography>
                        </Box>

                        <Box className="pt-10">
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={4}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            id="priceOfVehicle"
                                            fullWidth
                                            type="number"
                                            label="Price ($)"
                                            variant="outlined"
                                            onChange={(e) => setPriceOfVehicle(e.target.value)}
                                        />
                                        <TextField
                                            id="interestRate"
                                            fullWidth
                                            type="number"
                                            label="Interest Rate"
                                            variant="outlined"
                                            onChange={(e) => setInterestRate(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            id="loanDuration"
                                            fullWidth
                                            type="number"
                                            label="Loan Term (year)"
                                            variant="outlined"
                                            onChange={(e) => setLoanDuration(e.target.value)}
                                        />
                                        <TextField
                                            id="downPayment"
                                            fullWidth
                                            type="number"
                                            label="Down Payment"
                                            variant="outlined"
                                            onChange={(e) => setDownPayment(e.target.value)}
                                        />
                                    </Stack>
                                    <Button variant="contained" type="submit">
                                        <Typography color="white" mr={1}>
                                            Calculate
                                        </Typography>
                                        <ArrowOutwardIcon sx={{ color: "white" }} />
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Box>

                    {/* Right Side - Green Box */}
                    <Box
                        sx={{
                            width: "30%",
                            backgroundColor: "background.lime",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <Stack direction="column" spacing={2}>
                            <Typography color="text.primary" variant="body1">Monthly Payment</Typography>
                            <TextField disabled={true} color={"text"} variant="filled"  value={loanData?.monthly_loan_payment ? `$${loanData.monthly_loan_payment}` : '$'}/>


                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default LoanCalculator;
