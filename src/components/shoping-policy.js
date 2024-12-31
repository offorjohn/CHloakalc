import React from "react";
import { Box, Typography, Container, } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Toolbar from "@mui/material/Toolbar";
import WhatsAppIcon from "../telegram";

const ShippingPolicy = () => {
  return (
    <>
<Toolbar
  style={{
    display: "flex", // Enable flexbox
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
    padding: "10px 0", // Adds some padding around the logo
    backgroundColor: "white", // Set the background color to white
  }}
>
  <Link to="/" style={{ textDecoration: "none" }}>
    <img
      src="/assets/background/wwe.png" // Replace with the actual path to your image
      alt="Logo"
      style={{
        width: "250px", // Adjust width
        height: "100px", // Adjust height
        objectFit: "cover", // Ensures the logo fits within the dimensions
        borderRadius: "15px", // Optional: Adds rounded corners
        cursor: "pointer", // Makes the logo clickable
      }}
    />
  </Link>
</Toolbar>


      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "white",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Vertically center content
            alignItems: "center", // Horizontally center content
            textAlign: "center", // Center text for larger screens
            padding: { xs: "20px", sm: "40px" }, // Adjust padding for responsiveness
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "2rem", sm: "3rem" }, // Responsive font size
            }}
          >
            Shipping Policy
          </Typography>

          {/* Delivery Time */}
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size based on screen size
              textAlign: "center",
            }}
          >
            Estimated delivery: 8–10 business days.
          </Typography>
        </Container>

        {/* Footer component */}
    
       <WhatsAppIcon/>
        <Footer /> {/* Add Footer component here */}
      </Box>
    </>
  );
};

export default ShippingPolicy;
