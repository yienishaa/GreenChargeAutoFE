import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Snackbar, Stack
} from "@mui/material";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

import { useCart } from "../context/CartContext";

import API from "../globals";
import Divider from "@mui/material/Divider";
import ResetPasswordModal from "../components/ResetPasswordModal";


function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [resetOpen, setResetOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({ username: ""});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { loadCartItems } = useCart();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    setRegisterForm({...registerForm, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API.BASE_URL}/auth/login`, {
        username: form.username,
        password: form.password
      });
      console.log(response.data);

      const { token, userId, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      await loadCartItems();

      setSnackbar({ open: true, message: "Login successful!", severity: "success" });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setSnackbar({ open: true, message: "Login failed. Check credentials or Register", severity: "error"});

      setTimeout(() => {
        navigate("/auth/register");
        }, 1000);
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API.BASE_URL}/auth/register/${email}`);

      const { token, message, userId, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      await loadCartItems();

      setSnackbar({
        open: true,
        message: message || "Email sent with temporary password",
        severity: "success"
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {

      const errorMsg = err.response?.data?.error || "Registration failed. Try again";

      setSnackbar({
        open: true,
        message: errorMsg,
        severity: "error"
      });
    }
  };

  return (
      <Stack direction={"row"}>
          <Container maxWidth="sm">
            <Box pt={15}>
              <Typography variant="h4" align="center" gutterBottom>
                Register
              </Typography>
              <form onSubmit={handleRegisterSubmit}>
                <Stack spacing={2}>
                  <TextField type="text" label="First Name" name="fname" value={form.fname} onChange={handleRegister} />
                  <TextField type="text" label="Last Name" name="lname" value={form.lname} onChange={handleRegister} />
                  <TextField
                      type="email"
                      fullWidth
                      label="Email"
                      name="email"
                      margin="normal"
                      value={form.email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      required
                  />
                  <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Get Temporary Password
                  </Button>
                </Stack>
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
        <Divider sx={{orientation:"vertical"}} />
        <Container maxWidth="sm">
          <Box pt={15}>
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
              <Box sx={{ mt: 2 , textDecorationLine:'underline', textDecorationColor:'blue', color:'blue'}}>
                <Link component="button" onClick={() => setResetOpen(true)}>
                  Forgot password?
                </Link>
                <ResetPasswordModal open={resetOpen} onClose={() => setResetOpen(false)} />
              </Box>
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
      </Stack>
  );
}

export default Login;
