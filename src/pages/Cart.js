
import {Typography, Container, Grid,Button,Card, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, Stack, TextField, Divider } from "@mui/material";
import { Collapse } from '@mui/material';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Cart({ cartItems = [], onRemoveItem, onUpdateQuantity, onCheckout }) {
    console.log('Cart Items:', cartItems);
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const totalPrice = subtotal + tax;


    return (
        <Container sx={{ py: 16 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <Grid container spacing={4}>
                {/* Cart Items Section */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <List>
                                {cartItems.map((item) => (
                                    <Collapse key={item.id} in={true} timeout={500}>
                                        <ListItem key={item.id} alignItems="flex-start" sx={{ mb: 2 }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="rounded"
                                                    src={item.imageUrl}
                                                    sx={{ width: 80, height: 80, mr: 2 }}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={`$${item.price.toFixed(2)} each`}
                                            />
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                                                <TextField
                                                    size="small"
                                                    value={item.quantity}
                                                    sx={{ width: 50 }}
                                                    inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                />
                                                <Button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                                            </Stack>
                                            <Typography sx={{ ml: 2 }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                            <Button
                                                onClick={() => onRemoveItem(item.id)}
                                                color="error"
                                                sx={{ ml: 2 }}
                                            >
                                                Remove
                                            </Button>
                                        </ListItem>
                                    </Collapse>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Order Summary</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
                            <Typography>Tax (10%): ${tax.toFixed(2)}</Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Total: ${totalPrice.toFixed(2)}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3 }}
                                onClick={onCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
export default Cart;