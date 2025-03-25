import { Link } from 'react-router-dom';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            aria-current={props.selected && 'page'}
            {...props}
        />
    );
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};


const Navbar = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        // event.type can be equal to focus with selectionFollowsFocus.
        if (
            event.type !== 'click' ||
            (event.type === 'click' && samePageLinkNavigation(event))
        ) {
            setValue(newValue);
        }
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
            >
                <LinkTab label="Home" href="/"/>
                <LinkTab label="Vehicles" href="/vehicles"/>
                <LinkTab label="Deals" href="/trash"/>
                <LinkTab label="Loan Calculator" href="/loan"/>

            </Tabs>
        </Box>
    );


};

export default Navbar;


import { Link } from '@/components/link'
import { Navbar, NavbarItem, NavbarSection } from '@/components/navbar'
import { Logo } from './logo'

function Example() {
    return (
        <Navbar>
            <Link href="/" aria-label="Home">
                <Logo className="size-10 sm:size-8" />
            </Link>
            <NavbarSection>
                <NavbarItem href="/" current>
                    Home
                </NavbarItem>
                <NavbarItem href="/events">Events</NavbarItem>
                <NavbarItem href="/orders">Orders</NavbarItem>
            </NavbarSection>
        </Navbar>
    )
}