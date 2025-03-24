import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Card,
    CardContent,
    ListItem,
    List, ListItemText
} from '@mui/material';
import logo from './images/logo.webp';
import NavTabs from "./components/navigation";

function App() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/vehicles')
            .then(response => setVehicles(response.data))
            .catch(error => console.error('Error fetching vehicles:', error));
    }, []);


    return (
        <div className="bg-[url('./images/background.jpg')] bg-cover bg-center min-h-screen">

            <Toolbar>
                <img src={logo} alt="Logo" className="w-32 h-1/2 mx-1.5 mt-4"/>
                <Typography variant="h6">Green Charge Auto</Typography>
                <NavTabs/>
            </Toolbar>

            <Container sx={{marginTop: 4}}>
                <Card sx={{maxWidth: 400, marginTop: 2}}>
                    <CardContent>
                        {/*<List>*/}
                        {/*    {vehicles.map(v => (*/}
                        {/*        <ListItem key={v.id}>*/}
                        {/*            <ListItemText primary={`${v.brand} ${v.name} ${v.model}`} />*/}
                        {/*        </ListItem>*/}
                        {/*    ))}*/}
                        {/*</List>*/}
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}

export default App;
