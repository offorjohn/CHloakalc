import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
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
          <Link component={RouterLink} to="/shoping-policy" variant="body2" color="textSecondary">
            Shopping Policy
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/refund-policy" variant="body2" color="textSecondary">
            Refund Policy
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/privacy-policy" variant="body2" color="textSecondary">
            Privacy Policy
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/terms-of-service" variant="body2" color="textSecondary">
            Terms of Service
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/contact-information" variant="body2" color="textSecondary">
            Contact Information
          </Link>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default Footer;
