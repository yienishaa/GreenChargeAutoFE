import React from 'react';
import background from "../images/background.jpg";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <h1 className='text-5xl'>Welcome to Green Charge Auto</h1>
            <Button background component={Link} to="/vehicles">Browse All Cars</Button>
        </div>
    );
};

export default Home;