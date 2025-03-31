import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
    Snackbar
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", null, {
                params: {
                    username: form.username,
                    password: form.password
                }
            });

            localStorage.setItem("token", response.data.token);
            setSnackbar({ open: true, message: "Login successful!", severity: "success" });

            setTimeout(() => {
                navigate("/"); // redirect after login
            }, 1000);
        } catch (err) {
            setSnackbar({ open: true, message: "Login failed. Check credentials.", severity: "error" });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={6}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        margin="normal"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Login;