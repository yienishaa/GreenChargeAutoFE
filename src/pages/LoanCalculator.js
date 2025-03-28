import {
    FormControl,
    TextField,
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import React, { useState } from "react";

const LoanCalculator = () => {
    const [price, setPrice] = useState("");

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
                            <FormControl fullWidth required>
                                <Stack spacing={4}>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Price ($)"
                                            variant="outlined"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Interest Rate"
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Loan Term (year)"
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Down Payment"
                                            variant="outlined"
                                        />
                                    </Stack>
                                    <Button variant="contained" type="submit" fullWidth>
                                        <Typography color="white" mr={1}>
                                            Calculate
                                        </Typography>
                                        <ArrowOutwardIcon sx={{ color: "white" }} />
                                    </Button>
                                </Stack>
                            </FormControl>
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
                            <TextField disabled={true} color="text.primary" variant="filled" defaultValue={"$"}/>

                            <Typography color="text.primary" variant="body1">Total Interest</Typography>
                            <TextField disabled={true} color="text.primary" variant="filled" defaultValue={"$"}/>

                            <Typography color="text.primary" variant="body1">Total Payment</Typography>
                            <TextField disabled={true} color="text.primary" variant="filled" defaultValue={"$"}/>
                        </Stack>

                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default LoanCalculator;
