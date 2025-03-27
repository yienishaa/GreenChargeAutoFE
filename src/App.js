import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/Theme';
import { styled } from '@mui/material/styles';



function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </ThemeProvider>
    );
}

export default App;
