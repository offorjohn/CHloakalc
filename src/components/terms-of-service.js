import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Footer from "./footer";
import WhatsAppIcon from "../telegram";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}> {/* White background for the entire page */}
      <Container sx={{ py: 5 }}>
 
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
        {/* Page Title */}
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          Terms of Service
        </Typography>

        {/* Introduction */}
        <Typography variant="body1" paragraph>
          Welcome to ChloakCalc. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.
        </Typography>

        {/* Section 1: General Conditions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            1. General Conditions
          </Typography>
          <Typography variant="body1" paragraph>
            - You must be at least 18 years old to use our services.
          </Typography>
          <Typography variant="body1" paragraph>
            - We reserve the right to refuse service to anyone for any reason at any time.
          </Typography>
          <Typography variant="body1" paragraph>
            - Unauthorized use of the website may result in a claim for damages and/or be a criminal offense.
          </Typography>
        </Box>

        {/* Section 2: Account Responsibility */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            2. Account Responsibility
          </Typography>
          <Typography variant="body1" paragraph>
            - You are responsible for maintaining the confidentiality of your account and password.
          </Typography>
          <Typography variant="body1" paragraph>
            - You agree to notify us immediately of any unauthorized use of your account.
          </Typography>
        </Box>

        {/* Section 3: Intellectual Property */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            3. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            - All content on this site, including text, graphics, logos, and images, is the property of ChloakCalc or its content suppliers.
          </Typography>
          <Typography variant="body1" paragraph>
            - You may not copy, distribute, or reproduce any content without prior written consent.
          </Typography>
        </Box>

        {/* Section 4: Limitation of Liability */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            4. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            - ChloakCalc shall not be held liable for any damages arising out of or in connection with the use of this site.
          </Typography>
          <Typography variant="body1" paragraph>
            - This includes but is not limited to direct, indirect, incidental, punitive, and consequential damages.
          </Typography>
        </Box>

        {/* Section 5: Changes to Terms */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            5. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            - We reserve the right to modify these Terms of Service at any time.
          </Typography>
          <Typography variant="body1" paragraph>
            - Any changes will be posted on this page, and your continued use of the website signifies your acceptance of these changes.
          </Typography>
        </Box>

        {/* Closing */}
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms of Service, please contact us at{" "}
          <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us at: 
              <strong>
                <a href="mailto:Chloakcalc@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Chloakcalc@gmail.com
                </a>
              </strong>.
            </Typography>
        </Typography>

      </Container>
   
      
         <WhatsAppIcon/>
      <Footer /> {/* Add Footer component here */}
    </Box>
  );
};

export default TermsOfService;
