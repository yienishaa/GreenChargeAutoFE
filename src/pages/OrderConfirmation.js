import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  Paper
} from "@mui/material";
import axios from "axios";
import API from "../globals";
import {useCart} from "../context/CartContext";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cartItems, onCheckout , loadCartItems} = useCart();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API.BASE_URL}/orders/${orderId}`);
        setOrder(res.data);
        loadCartItems();
      } catch (err) {
        setError("Failed to load order. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Box className="h-screen flex justify-center items-center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Alert severity="error">{error || "Order not found."}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">🎉 Order Confirmed!</Typography>
        <Typography variant="subtitle1" gutterBottom>Order ID: <strong>{order.orderId}</strong></Typography>
        <Typography variant="subtitle2" color="success.main" gutterBottom>Status: {order.status}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mt: 2 }}>📦 Shipping Info</Typography>
        <Typography>Name: {order.fname} {order.lname}</Typography>
        <Typography>Address: {order.address?.street}, {order.address?.city}, {order.address?.zip}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">🛒 Items Purchased</Typography>
        <List dense>
          {order.purchaseOrderVehicles.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.vehicle.brand} ${item.vehicle.model}`}
                secondary={`$${item.vehicle.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          💳 Total Paid: ${order.totalPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </Typography>

        <Box mt={4}>
          <Link to="/" style={{ textDecoration: "none", color: "#2e7d32", fontWeight: 500 }}>
            ← Return to Home
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
