import React, { useState } from "react";
import {Box, Button, Checkbox, Stack, TextField, Typography} from "@mui/material";
import QuantityInput from "../components/QuantityInput";

const UploadForm = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [description, setDescription] = useState("");
    const [mileage, setMileage] = useState("");
    const [year, setYear] = useState("");
    const [hasBeenInAccident, setHasBeenInAccident] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [color, setColor] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("description", description);
        formData.append("mileage", mileage);
        formData.append("manufactured_year", year);
        formData.append("hasBeenInAccident", hasBeenInAccident);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("color", color);
        formData.append("image", image);

        try {
            const res = await fetch("http://localhost:8080/admin/products", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server error:", res.status, errorText);
                alert("Upload failed");
            } else {
                alert("Product uploaded!");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Network error");
        }

    };

    return (
        <>
            <Box className="flex justify-center pt-24 px-4">
                <Typography ml={15} mr={15} variant={"h3"}>Upload Vehicle Data</Typography>
            </Box>

            <Box className="min-h-screen flex items-center justify-center ">

            <Box className="w-full sm:w-80 md:w-[500px] lg:w-[700px]">


            <form onSubmit={handleSubmit}>
                <Stack direction="column" spacing={3}>
                    <TextField id="filled-basic" label="brand" variant="filled" placeholder="brand" onChange={(e) => setBrand(e.target.value)} />
                    <TextField id="filled-basic" label="model" variant="filled" placeholder="model" onChange={(e) => setModel(e.target.value)} />
                    <TextField id="filled-basic" label="description" variant="filled" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                    <TextField inputMode={"decimal"} placeholder="mileage" onChange={(e) => setMileage(e.target.value)} />
                    <TextField type="number" value={year} placeholder="manufactured_year" onChange={(e) => setYear(e.target.value)} inputProps={{min: 2000, max: new Date().getFullYear()}}/>
                    <Checkbox placeholder="hasBeenInAccident" onChange={(e) => setHasBeenInAccident(e.target.value)} />
                    <TextField type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
                    <QuantityInput value={quantity} placeholder="quantity" onChange={setQuantity}/>
                    <input type="color" placeholder="color" onChange={(e) => setColor(e.target.value)} />
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    <Button variant="contained" type="submit">Upload</Button>
                </Stack>
            </form>
            </Box>
            </Box>
        </>
    );
};

export default UploadForm;


