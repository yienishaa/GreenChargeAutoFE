import React, { useState } from "react";
import {Typography} from "@mui/material";

const UploadForm = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand", brand);
        formData.append("model", model);
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
            <Typography>Upload</Typography>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="brand" onChange={(e) => setBrand(e.target.value)} />
            <input type="text" placeholder="model" onChange={(e) => setModel(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
        </>
    );
};

export default UploadForm;


