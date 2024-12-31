import React from "react";
import { Box, Typography, Container, List, ListItem, ListItemText,  } from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Toolbar from "@mui/material/Toolbar";

const PrivacyPolicy = () => {
  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Toolbar
        style={{
          display: "flex", // Enable flexbox
          justifyContent: "center", // Center items horizontally
          alignItems: "center", // Center items vertically
          padding: "10px 0", // Optional: Adds some padding around the logo
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

      <Container maxWidth="lg">
        <Box sx={{ py: 5 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            At ChloakCalc, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use,
            and protect your personal information when you use our services. Please read this document carefully.
          </Typography>

          {/* Section 1: Information Collection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect the following types of information:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Personal Identification Information"
                  secondary="This includes your name, email address, phone number, and other similar data."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Usage Data"
                  secondary="Details about your interactions with our services, including pages visited and time spent."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Device Information"
                  secondary="Information such as your IP address, browser type, and operating system."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 2: How We Use Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect for the following purposes:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="To Provide Services"
                  secondary="To deliver the features and services you request."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="To Improve Our Services"
                  secondary="To better understand how our users interact with our platform and to enhance your experience."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="To Communicate With You"
                  secondary="To send updates, respond to inquiries, and provide customer support."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 3: Data Protection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              3. How We Protect Your Data
            </Typography>
            <Typography variant="body1" paragraph>
              We implement a variety of security measures to maintain the safety of your personal information:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Data Encryption" secondary="All sensitive information is encrypted during transmission." />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Access Controls"
                  secondary="We restrict access to personal information to authorized personnel only."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Regular Security Audits"
                  secondary="We regularly review and update our security practices to stay ahead of potential threats."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 4: Sharing Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              4. Sharing Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We do not sell, trade, or rent your personal information to others. However, we may share information in the
              following cases:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="With Service Providers"
                  secondary="We may share your information with trusted third-party vendors to perform certain services on our behalf."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="For Legal Compliance"
                  secondary="If required by law or if we believe disclosure is necessary to comply with legal obligations."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 5: Your Rights */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              5. Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              You have the following rights regarding your personal information:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Access and Correction" secondary="You can access and update your information at any time." />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Data Deletion"
                  secondary="You can request the deletion of your personal data, subject to applicable laws."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Data Portability"
                  secondary="You can request a copy of your data in a portable format."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 6: Updates to This Policy */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              6. Updates to This Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
              revision date. Please review it periodically to stay informed about how we are protecting your information.
            </Typography>
          </Box>

          {/* Contact Information */}
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
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
   

      <Footer /> {/* Add Footer component here */}
    </Box>
  );
};

export default PrivacyPolicy;
