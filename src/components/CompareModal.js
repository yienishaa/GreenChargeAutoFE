import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    IconButton,
    Divider,
    Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {Image} from "@mui/icons-material";
import API from "../globals";

const CompareModal = ({ open, onClose, vehicles }) => {
    if (!vehicles || vehicles.length < 2) return null;

    console.log(vehicles);

    const fields = [
        { label: "Brand", key: "brand" },
        { label: "Model", key: "model" },
        { label: "Manufactured Year", key: "manufacturedYear" },
        { label: "Body", key: "body" },
        { label: "Mileage", key: "mileage", format: (val) => `${val.toLocaleString()} km` },
        { label: "Price", key: "price", format: (val) => `$${val.toLocaleString()}` },
        { label: "Accident History", key: "hasBeenInAccident", format: (val) => (val ? "Yes" : "No") },
        { label: "Description", key: "description" }
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md"  sx={{ bgcolor:'rgba(163,163,163,0.25)', flexGrow:3 }}>
            <DialogTitle className="flex justify-between items-center" sx={{bgcolor:'rgb(236,252,203, 0.9)'}}>
                <Typography variant={"h5"}
                sx={{color: 'black', fontWeight: 'bold'}}>
                    Compare Vehicles
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider sx={{bgcolor:'#65a30d'}} />
            <DialogContent >
                <Grid container spacing={2}>
                    {vehicles.map((v) => (
                        <Grid item xs={12} sm={Math.floor(10 / vehicles.length)} key={v.id}>
                            <Box className="flex justify-end">
                                <img
                                    src={`${API.S3_BUCKET}/${v.image}`}
                                    alt={`${v.brand} ${v.model}`}
                                    className="rounded-md object-cover max-h-32"
                                />
                            </Box>
                        </Grid>
                    ))}
                <Grid container spacing={2} m={0}>
                    {fields.map((field) => (
                        <React.Fragment key={field.key}>
                            <Grid item xs={12} sm={2}>
                                <Typography fontWeight="bold">{field.label}</Typography>
                            </Grid>
                            {vehicles.map((v) => (
                                <Grid item xs={12} sm={Math.floor(10 / vehicles.length)} key={v.id + field.key}>
                                    <Typography sx={{textAlign: 'left'}}>
                                        {field.format ? field.format(v[field.key]) : v[field.key]}
                                    </Typography>
                                </Grid>
                            ))}
                        </React.Fragment>
                    ))}
                </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default CompareModal;
