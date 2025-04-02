import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import logo from "../../images/logo.webp";
import API from "../../globals";
import SalesAnalytics from "./SalesAnalytics";
import {useLocation} from "react-router-dom";
import Orders from "./Orders";

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,

                
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },

];



const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});


function DemoPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Typography>Dashboard content for {pathname}</Typography>
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
    const { window } = props;
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname);

    const PAGE_COMPONENTS = {
        '/dashboard': <DemoPageContent pathname="DashboardLayoutBasic" />,
        '/orders': <Orders />,
        '/reports/sales': <SalesAnalytics />,
        '/bashboard/reports/traffic': <DemoPageContent pathname="Traffic" />,
    };


    return (

        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}
            branding={{
                logo: <img src={logo} alt="Green Charge logo" />,
                title: 'Admin Dashboard',
                homeUrl: `${API.BASE_URL}`,
            }}
        >
            <DashboardLayout >
                {PAGE_COMPONENTS[pathname] || (
                    <Typography sx={{ p: 2 }}>Page not found: {pathname}</Typography>
                )}
            </DashboardLayout>
        </AppProvider>

    );
}

DashboardLayoutBasic.propTypes = {

    window: PropTypes.func,
};

export default DashboardLayoutBasic;