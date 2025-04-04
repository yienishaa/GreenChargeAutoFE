import React, { useState } from "react";
import {
    Container, TextField, Button, Typography, Snackbar, Alert
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({ username: "", password: "", role: "USER" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:8080/auth/register", form);
            localStorage.setItem("token", res.data.token);
            setSnackbar({ open: true, message: "Signup successful!", severity: "success" });
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: "Signup failed", severity: "error" });
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" gutterBottom>Sign Up</Typography>
            <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Password" name="password" type="password" onChange={handleChange} />
            <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Register</Button>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
}

export default Signup;
