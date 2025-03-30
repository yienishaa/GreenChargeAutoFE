// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#65a30d', // Replace with your desired primary color
            light: '#b0ca8b',
            white: '#fff',

        },
        secondary: {
            main: '#0b786c', // Replace with your desired secondary color
            white: '#ffffff',
            gray: '#e3e3e3',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
            lime: '#E3F6AD',
        },
        text: {
            primary: '#000000',
            secondary: '#a3a3a3',
            white: '#ffffff',
            dark: '#0b786c',
            green: '#69950f',
        },
        review:{
            default: 'rgba(30,159,66,0.76)',
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme;
