import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import logo from "../../images/logo.webp";
import API from "../../globals";
import SalesAnalytics from "./SalesAnalytics";
import {useLocation} from "react-router-dom";
import Orders from "./Orders";
import {ShoppingBag, TrendingUp} from "@mui/icons-material";
import UploadForm from "./UploadForm";

const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
        light: {
            palette: {
                gradient:
                    'linear-gradient(to left, var(--mui-palette-primary-main), var(--mui-palette-primary-dark))',
                border: {
                    subtle: 'var(--mui-palette-neutral-200)',
                },
            },
        },
        dark: {
            palette: {
                gradient:
                    'linear-gradient(to left, var(--mui-palette-primary-light), var(--mui-palette-primary-main))',
                border: {
                    subtle: 'var(--mui-palette-neutral-600)',
                },
            },
        },
    },
});

function App() {
    return <ThemeProvider theme={theme}>...</ThemeProvider>;
}

const NAVIGATION = [

    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <ShoppingBag />,

                
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <TrendingUp />,
            },
        ],
    },
    {
        segment: 'uploads',
        title: 'Add Inventory',
        icon: <ShoppingCartIcon />,
    },

];



const demoTheme = createTheme({
    cssVariables:{
        colorSchemeSelector: 'disableColorSchemeSelector',
    },
    palette: {
        mode: 'light',
        primary: {
            main: 'rgba(0,0,0,0.84)', // change this to your desired primary color
        },
        secondary: {
            main: '#ccfa5c', // change this to your desired secondary color
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        text: {
            primary: 'rgba(0,0,0,0.84)',
            secondary: 'rgba(0,0,0,0.84)',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    height: '100px', // Make the header taller
                    background: '#65a30d',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: '80px !important', // Ensure the inner content matches
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                h6: {
                    fontSize: '1.5rem', // Make the header title text bigger
                    fontWeight: 600,
                    color: 'rgba(0,0,0,0.84)',
                },
            },
        },
        MuiListItem:{
            styleOverrides: {
                root: {
                    background: 'rgba(204,250,92,0.44)',
                    color: 'rgba(0,0,0,0.84)',

                }
            }
        },
        MuiDrawer:{
            styleOverrides: {
                root: {
                    background: 'rgba(204,250,92,0.44)',
                },
                paper: {
                    background: 'rgba(204,250,92,0.44)',
                }
            }
        },
        MuiSvgIcon:{
            styleOverrides: {
                root: {
                    fill: 'rgba(0,0,0,0.84)',
                }
            }
        },
        MuiPaper:{
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,0.71)',
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                columnHeaderTitleContainer: {
                    justifyContent: 'flex-start',
                },
                columnHeaderTitle: {
                    textAlign: 'left',
                },
                row:{
                    '&:hover': {
                        backgroundColor: 'rgba(204,250,92,0.3)',
                    }
                },
            },
        },
        MuiInputBase:{
            styleOverrides: {
                root: {
                    background: 'rgba(224,236,208,0.41)',
                },
            },
        },
        MuiFilledInput:{
            styleOverrides: {
                root: {
                    background: 'rgba(224,236,208,0.41)',
                },
            },
        },
        MuiButton:{
            styleOverrides: {
                root: {
                    background: 'rgb(11,120,108)',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'rgb(163,163,163)',
                }
            }
        }
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
    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname);

    const PAGE_COMPONENTS = {
        '/orders': <Orders />,
        '/reports/sales': <SalesAnalytics />,
        '/reports/traffic': <DemoPageContent pathname="Traffic" />,
        '/uploads': <UploadForm />,
    };


    return (

        <AppProvider
            navigation={NAVIGATION}
            theme={demoTheme}
            branding={{
                logo: <img src={logo} alt="Green Charge logo" />,
                title: 'Admin Dashboard',
                homeUrl: `${API.REACT_APP_SELF}`,
            }}
        >
            <DashboardLayout>
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