import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import axios from "axios";
import API from "../../globals";

const columns = [
    {
        field: 'id',
        headerName: 'Order ID',
        flex: 1,
        headerAlign: 'left',
    },
    {
        field: 'fname',
        headerName: 'First name',
        editable: false,
        flex: 2,
    },
    {
        field: 'lname',
        headerName: 'Last name',
        flex: 2,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Order Status',
        type: 'number',
        flex: 2,
        editable: false,

    },
    {
        field: 'totalPrice',
        headerName: 'Total Price',
        type: 'number',
        flex: 3,
        editable: false,
    },
    {
        field: 'createdAt',
        headerName: 'Order Date',
        flex: 3,
        editable: false,
    },
];

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await axios.get(`${API.BASE_URL}/orders`);
                console.log(response);

                const formatted = response.data.map(({ orderId,createdAt, ...rest }) => ({
                    id: orderId,
                    createdAt: new Date(createdAt).toISOString().split('T')[0],
                    ...rest,
                }));
                setOrders(formatted);
                console.log(formatted);


            } catch (e) {
                console.log(e.message);
            } finally {
                console.log(false);
            }
        };
        fetchPurchaseOrders();
    }, []);

    return (
        <Box sx={{ width: '100%', pt:5 , alignItems: 'left', justifyContent: 'flex-start' }}>
            <DataGrid

                rows={orders}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default Orders;
