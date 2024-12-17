import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <div
        style={{
          backgroundColor: "white", // Set the background color to white
          minHeight: "100vh", // Ensure it covers the full viewport height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HideOnScroll {...props}>
          <AppBar
            style={{
              backgroundColor: "white", // Set the AppBar background to white
              color: "black", // Set the text color to black for contrast
              boxShadow: "none", // Remove the shadow for a cleaner look
              borderBottom: "1px solid #ddd", // Optional: Add a light border for separation
            }}
          >
            <Toolbar
      style={{
        display: "flex", // Enable flexbox
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Center items vertically
      }}
    ><img
    src="/assets/background/wwe.png" // Replace with the actual path to your image
    alt="Logo"
    style={{
      width: '250px',  // Increased width to stretch more
      height: "150px", // Increased height to stretch more
      objectFit: "cover", // Stretches the image to cover the area without maintaining aspect ratio
    }}
  />
  
    </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar
          style={{
            backgroundColor: "white", // Set Toolbar background to white
          }}
        />
        <Container style={{ flex: "1" }}>
          <Box sx={{ my: 2 }}>
            {[...new Array(12)]
              .map(
                () => `Work in progress Work in progress Work in progress Work in progress Work in progress Work in progress Work in progress Work in progress
                  Work in progress Work in progress Work in progress Work in progress  Work in progress Work in progress Work in progress Work in progress Work in progress Work in progress
                  Work in progress Work in progress Work in progress Work in progress Work in progress Work in progress
                `,
              )
              .join("\n")}
          </Box>
        </Container>
        {/* Footer */}
        <footer
          style={{
            backgroundColor: "white", // Set the footer background to white
            color: "black", // Set text color for contrast
            textAlign: "center",
            padding: "10px 0",
            borderTop: "1px solid #ddd", // Optional: Add a light border for separation
          }}
        >
          <Typography variant="body2">
            © 2024 Simple React Page. All Rights Reserved.
          </Typography>
        </footer>
      </div>
    </React.Fragment>
  );
}
