import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  const handleLinkClick = (event) => {
    event.preventDefault(); // Prevent the default link navigation behavior
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        padding: "20px 0",
        marginTop: "auto", // Ensures footer stays at the bottom
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} ChloakCalc
          </Typography>
        </Grid>
        <Grid item>
          <Link onClick={handleLinkClick} variant="body2" color="textSecondary" style={{ cursor: "pointer" }}>
            Shopping Policy
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={handleLinkClick} variant="body2" color="textSecondary" style={{ cursor: "pointer" }}>
            Privacy Policy
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={handleLinkClick} variant="body2" color="textSecondary" style={{ cursor: "pointer" }}>
            Terms of service
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={handleLinkClick} variant="body2" color="textSecondary" style={{ cursor: "pointer" }}>
            Contact information
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
