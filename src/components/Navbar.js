import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import logo from "../images/logo.webp";
import { useState } from "react";
import UploadForm from "../pages/UploadForm";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Vehicles", link: "/vehicles" },
  { label: "Deals", link: "/hotdeals" },
  { label: "Loan Calculator", link: "/loan" },
  { label: "UploadForm", link: "/UploadForm" },
];

function Navbar() {
  const path = useLocation().pathname;
  const [menu, showMenu] = useState(false);

  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: "100px" }}>
          <img
            className="mr-5"
            height={100}
            width={100}
            src={logo}
            alt="Logo"
          />
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            {navLinks.map((link, index) => (
              <Button
                key={index}
                component={Link}
                to={link.link}
                color="secondary"
              >
                <Typography variant="h6" fontFamily="Arial">{link.label}</Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button component={Link} to="/cart" sx={{ marginRight: "20px" }}>
              <img height={75} width={75} src={logo} alt="Cart" />
            </Button>
            <Button onClick={() => showMenu(!menu)}>
              <img height={100} width={100} src={logo} alt="Menu" />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
