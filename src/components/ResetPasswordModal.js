import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Snackbar, Box,
} from "@mui/material";
import API from "../globals";

export default function ResetPasswordModal({ open, onClose }) {
    const [email, setEmail] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${API.BASE_URL}/auth/reset-password/${email}`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ to: email, subject: "Reset Password", body: "Your reset link..." }),
            });
            if (response.ok) {
                setSnackbarOpen(true);
                onClose();
            } else {
                alert("Failed to send reset email");
            }
        } catch (err) {
            console.error(err);
            alert("Error occurred while sending reset email");
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth={"xl"}  sx={{ bgcolor:'rgba(163,163,163,0.25)', flexGrow:3, alignSelf:'center', '& .MuiDialog-paper': {
                    minWidth: 500,
                }}}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Enter your email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!email}>Send Reset Link</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                message="Reset link sent!"
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}
