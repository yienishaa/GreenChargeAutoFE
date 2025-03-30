import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'fuelType', headerName: 'Fuel Type', width: 120 },
    { field: 'transmission', headerName: 'Transmission', width: 140 },
    { field: 'price', headerName: 'Price', width: 100, type: 'number' },
];

const rows = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, fuelType: 'Petrol', transmission: 'Auto', price: 15000 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021, fuelType: 'Diesel', transmission: 'Manual', price: 18000 },
    { id: 3, make: 'BMW', model: 'X5', year: 2022, fuelType: 'Electric', transmission: 'Auto', price: 60000 },
    // Add more vehicles here...
];

export default function VehicleCatalogGrid() {
    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
}
