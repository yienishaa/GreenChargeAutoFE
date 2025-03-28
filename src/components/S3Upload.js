import React, { useState } from 'react';
import axios from 'axios';

function S3Upload() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [url, setUrl] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) return;

        const fileName = `${Date.now()}_${image.name}`;
        const { data: uploadUrl } = await axios.get("http://localhost:8080/admin/s3/uploads", {
            params: { fileName }
        });

        await axios.put(uploadUrl, image, {
            headers: {
                'Content-Type': image.type
            }
        });

        const publicUrl = `https://greencharge-catalog.s3.us-east-1.amazonaws.com/${fileName}`;
        setUrl(publicUrl);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md max-w-md mx-auto">
            <label
                htmlFor="upload"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Choose Image
            </label>
            <input
                id="upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            {preview && (
                <img src={preview} alt="Preview" className="w-48 rounded shadow-sm" />
            )}

            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Upload
            </button>

            {url && (
                <div className="text-center">
                    <p className="text-sm text-gray-600">Uploaded Image:</p>
                    <img src={url} alt="Uploaded" className="w-48 mt-2 border rounded" />
                </div>
            )}
        </div>
    );
}

export default S3Upload;
