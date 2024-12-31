import React from "react";
import { Box, Typography, Container, List, ListItem, ListItemText } from "@mui/material";
import Footer from "./footer";
import { Link } from "react-router-dom";
import WhatsAppIcon from "../telegram";
import Toolbar from "@mui/material/Toolbar";

const RefundPolicy = () => {
  return (
    
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}> {/* White background for entire page */}
      <Container maxWidth="lg">
        <Box sx={{ py: 5 }}>
            
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
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Refund Policy
          </Typography>
          <Typography variant="body1" paragraph>
            At ChloakCalc, we strive to ensure customer satisfaction. This Refund Policy outlines the terms and conditions 
            for refunds, replacements, or cancellations. Please read it carefully to understand your rights and obligations.
          </Typography>

          {/* Section 1: Refund Eligibility */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              1. Eligibility for Refunds
            </Typography>
            <Typography variant="body1" paragraph>
              Refunds may be granted under the following conditions:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Defective Products"
                  secondary="If the product you received is defective, damaged, or not as described."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Service Not Delivered"
                  secondary="In cases where the promised service was not delivered as outlined in our agreement."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Accidental Charges"
                  secondary="If you were charged mistakenly for a service or product."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 2: Non-Refundable Items */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              2. Non-Refundable Items
            </Typography>
            <Typography variant="body1" paragraph>
              Please note that the following items and services are not eligible for a refund:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Digital Products"
                  secondary="Downloaded or accessed digital products, unless proven defective."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Customized Services"
                  secondary="Bespoke or customized services tailored specifically to your requirements."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Subscription Fees"
                  secondary="Fees paid for subscription-based services after usage."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 3: Refund Process */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              3. Refund Process
            </Typography>
            <Typography variant="body1" paragraph>
              To request a refund, please follow these steps:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Step 1: Submit a Request"
                  secondary="Contact us at support@chloakcalc.com with your order details and reason for refund."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Step 2: Review Process"
                  secondary="Our team will review your request and may contact you for additional information."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Step 3: Refund Approval"
                  secondary="If approved, refunds will be processed within 7–10 business days."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 4: Replacement Policy */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              4. Replacement Policy
            </Typography>
            <Typography variant="body1" paragraph>
              In cases where a product or service cannot be refunded, we may offer a replacement under the following conditions:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Defective Products"
                  secondary="You can request a replacement for items that are damaged or defective."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Incorrect Deliveries"
                  secondary="If the wrong item or service was delivered to you."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 5: Cancellations */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              5. Cancellations
            </Typography>
            <Typography variant="body1" paragraph>
              Orders or services can be canceled under the following conditions:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Before Shipment"
                  secondary="You can cancel your order before it is shipped or delivered."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Subscription Services"
                  secondary="Subscriptions can be canceled anytime, but no refunds will be issued for past payments."
                />
              </ListItem>
            </List>
          </Box>

          {/* Section 6: Important Notes */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              6. Important Notes
            </Typography>
            <Typography variant="body1" paragraph>
              Please consider the following:
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Processing Fees"
                  secondary="Refunds may be subject to processing fees, depending on the payment method used."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Refund Timing"
                  secondary="Refunds may take up to 10 business days to appear in your account."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Legal Rights"
                  secondary="This Refund Policy does not limit your rights under applicable consumer protection laws."
                />
              </ListItem>
            </List>
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
  
      
         <WhatsAppIcon/>
      <Footer /> {/* Add Footer component here */}
    </Box>
  );
};

export default RefundPolicy;
