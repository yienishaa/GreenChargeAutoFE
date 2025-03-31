//Write reviews on vehicles and rate vehicles using five stars
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {Box, Button, Divider, Rating, Stack, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import API from "../globals";


const Reviews = () => {
    const [value, setValue] = React.useState(2);
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewPayload = {
            vid:  parseInt(id),
            stars: value,
            content: description,
            author
        };


        try {
            const res = await fetch(`${API.BASE_URL}/reviews/save-review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewPayload),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server error:", res.status, errorText);
                alert("Failed to save review");
            } else {
                alert("Review successfully saved");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Network error");
        }

    };

    return (
        <>
            <Divider />
            <Box >
                <Stack spacing={2}>
                    <Typography variant="h5" color="primary">Add Your Review</Typography>
                    <Box pt={3} pb={24}>
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column" spacing={2}>
                                <Rating
                                    label="stars"
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                                <TextField
                                    id="standard-basic"
                                    label="author"
                                    variant="standard"
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                                <TextField
                                    id="filled-multiline-static"
                                    label="description"
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Button variant="contained" color={"primary"} type="submit">Add Comment <ArrowOutward /></Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Box>
        </>

    );
};

export default Reviews;