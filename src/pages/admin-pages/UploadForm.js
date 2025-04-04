import React, { useState } from "react";
import {Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography} from "@mui/material";
import QuantityInput from "../../components/QuantityInput";
import API from "../../globals";

const UploadForm = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [body, setBody] = useState("");
    const [description, setDescription] = useState("");
    const [mileage, setMileage] = useState("0");
    const [year, setYear] = useState("2025");
    const [hasBeenInAccident, setHasBeenInAccident] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [color, setColor] = useState("");
    const [hotDeal, setHotDeal] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("body", body);
        formData.append("description", description);
        formData.append("mileage", mileage);
        formData.append("manufactured_year", year);
        formData.append("hasBeenInAccident", hasBeenInAccident);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("color", color);
        formData.append("hot_deal", hotDeal);
        formData.append("image", image);

        try {
            const res = await fetch(`${API.BASE_URL}/admin/products`, {
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
            <Box className="flex justify-center ">
                <Typography pb={10} pt={5} variant={"h6"}>Upload Vehicle Data</Typography>
            </Box>

            <Box className="min-h-screen flex items-center justify-center mb-24">

                <Box className="w-full sm:w-80 md:w-[500px] lg:w-[700px]">


                    <form onSubmit={handleSubmit}>
                        <Stack direction="column" spacing={3}>
                            <TextField id="filled-basic" label="brand" variant="filled" placeholder="brand" onChange={(e) => setBrand(e.target.value)} />
                            <TextField id="filled-basic" label="model" variant="filled" placeholder="model" onChange={(e) => setModel(e.target.value)} />
                            <TextField id="filled-basic" label="body" variant="filled" placeholder="body" onChange={(e) => setBody(e.target.value)} />
                            <FormControlLabel
                                placeholder="hotDeal"
                                control={<Checkbox />}
                                label="Hot Deal"
                                sx={{ justifyContent: 'flex-start' }}
                                onChange={(e) => setHotDeal(e.target.value)}
                            />
                            <TextField id="filled-basic" label="description" variant="filled" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                            <TextField inputMode={"decimal"} placeholder="mileage" onChange={(e) => setMileage(e.target.value)} />
                            <TextField type="number" value={year} placeholder="manufactured_year" onChange={(e) => setYear(e.target.value)} inputProps={{min: 2000, max: new Date().getFullYear()}}/>
                            <FormControlLabel
                                placeholder="hasBeenInAccident"
                                control={<Checkbox />}
                                label="Has been in an accident?"
                                sx={{ justifyContent: 'flex-start' }}
                                onChange={(e) => setHasBeenInAccident(e.target.value)}
                            />
                            <TextField type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)} />
                            <QuantityInput value={quantity}  placeholder="quantity" onChange={setQuantity}/>
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


