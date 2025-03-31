import React from 'react';

import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/Theme';



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
