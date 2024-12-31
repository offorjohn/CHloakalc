import React from "react";
import { Box, Typography, Container,  } from "@mui/material";
import { Email } from "@mui/icons-material";
import Footer from "./footer";
import { Link } from "react-router-dom";
import WhatsAppIcon from "../telegram";

import Toolbar from "@mui/material/Toolbar";

const ContactInformation = () => {
  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main content section */}
      <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
    
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
        <Box sx={{ py: 5, textAlign: "center" }}>
      
          {/* Page Title */}
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            Have questions or need assistance? Reach out to us via email, and we'll get back to you promptly.
          </Typography>

          {/* Email Section */}
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Email sx={{ mr: 2, color: "primary.main" }} fontSize="large" />
            <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us at: 
              <strong>
                <a href="mailto:Chloakcalc@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Chloakcalc@gmail.com
                </a>
              </strong>.
            </Typography>
          </Box>
        </Box>
      </Container>
 
    <WhatsAppIcon/>
      {/* Footer section */}
      <Footer /> {/* Footer will always be at the bottom */}
    </Box>
  );
};

export default ContactInformation;
