import React from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

function QuantityInput({ value, onChange, min = 0, max = 100 }) {
    const handleDecrease = () => {
        const newValue = Math.max(min, value - 1);
        onChange(newValue);
    };

    const handleIncrease = () => {
        const newValue = Math.min(max, value + 1);
        onChange(newValue);
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue)) {
            onChange(Math.max(min, Math.min(max, newValue)));
        }
    };

    return (
        <Box className="flex items-center gap-2">
            <IconButton onClick={handleDecrease}>
                <Remove />
            </IconButton>

            <TextField

                value={value}
                onChange={handleInputChange}
                inputProps={{ min, max }}
                size="small"
                sx={{ width: 80 }}
            />

            <IconButton onClick={handleIncrease}>
                <Add />
            </IconButton>
        </Box>
    );
}

export default QuantityInput;
