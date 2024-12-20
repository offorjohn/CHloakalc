import * as React from "react";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton"; // Import IconButton
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Icon } from "@iconify/react";

import CardActions from "@mui/material/CardActions";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import TelegramIcon from "./telegram";

import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";

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
  const texts = ["30 DAY GUARANTEE!", "40% OFF TODAY ONLY!", "Free Shipping!"];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isSliding, setIsSliding] = React.useState(false);

  const [isChatOpen, setIsChatOpen] = React.useState(true);
  const [time, setTime] = React.useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const handleClose = () => {
    setIsChatOpen(false);
  };
  // eslint-disable-next-line consistent-return

  // Update the time every minute (since we don't need seconds)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000); // Update every minute (60000 ms)

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const telepop = (
    <>
      {isChatOpen && (
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative" }}>
            {/* Close Icon */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 1, // Adjust the position of the icon
                right: 5, // Adjust the position of the icon
                color: "gray", // Optional: Change color of close icon
                width: 90,
                fontWeight: "bold",

                fontSize: 30, // Increase font size to make the icon bigger
              }}
            >
              <CloseIcon sx={{ fontSize: 50 }} />
            </IconButton>

            <CardContent>
              {/* Header with Avatar and Title */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    alt="Profile Image"
                    src="/assets/background/wwe.jpg" // Replace with the actual path to your image
                    sx={{
                      width: 40,
                      height: 40,
                      mt: -6,
                      marginRight: 2,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 14,
                      right: 11,
                      width: 14,

                      height: 14,
                      backgroundColor: "green",
                      borderRadius: "50%",
                      border: "2px solid white", // Optional: adds a white border around the dot
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ fontSize: "1.3rem", marginLeft: -2 }}
                  >
                    OTP NINJA CHAT
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary", mb: 1.5, marginLeft: -13 }}
                  >
                    Support
                  </Typography>
                  <Typography
                    sx={{ color: "text.secondary", mb: 1.5, marginLeft: 13 }}
                  >
                    {time} {/* Display the current time */}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Profile Image"
                  src="/assets/background/wwe.jpg" // Replace with the actual path to your image
                  sx={{ mt: -14, width: 40, height: 40, marginRight: 3 }} // Adjust the size of the avatar
                />
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    padding: 2, // Add space inside the border
                    border: "1px solid #ddd", // Light border color
                    borderRadius: "16px", // Rounded corners
                    boxShadow: 2, // Optional: Adds a subtle shadow for the "card" effect
                    maxWidth: "80%", // Optional: Limit the width, so it's not too wide
                    marginBottom: 2, // Optional: Add some space below for separation
                  }}
                >
                  Hello,👋 welcome, the best SMS verification site. If you
                  have any issue or you need assistance, we are always active!
                  What can we help you with??
                  <br />
                </Typography>
              </Box>

              {/* Chat Options */}
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Start Chat with:
              </Typography>

              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  href="https://wa.link/9ugrwz" // Replace with your WhatsApp link
                  sx={{
                    width: "100%",
                    backgroundColor: "#25D366",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    icon="mdi:whatsapp"
                    width={24}
                    style={{ marginRight: 8 }}
                  />
                  WhatsApp
                </Button>
              </CardActions>
            </CardContent>
          </Box>
        </Box>
      )}
    </>
  );

  const FloatingTelepop = () => (
    <Box
      sx={{
        position: "fixed", // Fixed position
        bottom: { xs: "140px", sm: "120px", md: "190px" }, // Adjust based on screen size
        right: "3px", // Adjust distance from the right side
        zIndex: 9999, // Ensure it's above other content
        borderRadius: "16px", // Optional: round the corners
        boxShadow: 3, // Optional: add shadow to make the box stand out
        width: "auto", // You can remove this or set a specific width, like '250px' or '300px'
      }}
    >
      <Card variant="outlined" sx={{ xs: "20px", width: "360px" }}>
        {" "}
        {/* Increase width here */}
        {telepop}
      </Card>
    </Box>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSlide = React.useCallback((direction) => {
    if (isSliding) return; // Prevent overlapping slides
    setIsSliding(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % texts.length;
        } else {
          return (prevIndex - 1 + texts.length) % texts.length;
        }
      });
      setIsSliding(false);
    }, 1000); // Slide duration
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlide("next"); // Automatically go to the next slide every 3 seconds
    }, 3000); // 3 seconds interval

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [handleSlide]);

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
            }}
          >
            {" "}
            <Typography
              variant="h6"
              style={{
                backgroundColor: "black",

                color: "#e0e0e0", // Slightly dimmer white color
                padding: "8px 16px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center", // Center items horizontally inside Typography
                alignItems: "center", // Center items vertically inside Typography
                gap: "56px", // Add space between elements
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  color: "#e0e0e0",
                  fontSize: "19px", // Larger font size for better visibility
                }}
                onClick={() => handleSlide("prev")}
                disabled={isSliding}
              >
                {"<"} {/* Previous arrow */}
              </span>
              <div
                style={{
                  width: "200px", // Set width for the text container
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                  transform: isSliding ? "translateX(-50px)" : "translateX(0)",
                  opacity: isSliding ? 0 : 1,
                }}
              >
                {texts[currentIndex]}
              </div>
              <span
                style={{
                  cursor: "pointer",
                  color: "#e0e0e0",
                  fontSize: "19px", // Larger font size for better visibility
                }}
                onClick={() => handleSlide("next")}
                disabled={isSliding}
              >
                {">"} {/* Next arrow */}
              </span>
            </Typography>
            <Toolbar
              style={{
                display: "flex", // Enable flexbox
                justifyContent: "center", // Center items horizontally
                alignItems: "center", // Center items vertically
              }}
            >
              <img
                src="/assets/background/wwe.png" // Replace with the actual path to your image
                alt="Logo"
                style={{
                  width: "250px", // Increased width to stretch more
                  height: "100px", // Increased height to stretch more
                  objectFit: "cover", // Stretches the image to cover the area without maintaining aspect ratio
                  borderRadius: "15px",
                  marginTop: "10px", // Move the image down by 20p
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

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          sx={{ mt: -5 }}
        >
          <Grid item xs={12} md={6}>
            {" "}
            {/* Full width on small screens, half on medium+ */}
            <Container style={{ flex: "1" }}>
              <Box
                sx={{
                  my: 1,
                  mt: 25,
                  ml: {
                    xs: 0, // No left margin on extra-small screens
                    sm: 0, // No left margin on small screens
                    md: 24, // Apply margin-left of 24 on medium screens and above
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: {
                      xs: "100%", // Width is 100% on smaller screens
                      md: "130%", // Width is 130% on medium screens and above
                    },
                    height: "100%",
                  }}
                >
                  <img
                    src="/assets/background/calc.png"
                    alt="Work in progress"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute", // Inside the image
                      bottom: { xs: -180, md: "auto" }, // Bottom position for mobile
                      left: { xs: "50%", md: -230 }, // Centered horizontally on mobile, left on large
                      top: { md: 135 }, // Positioned at the top on large screens
                      transform: { xs: "translateX(-50%)", md: "none" }, // Centered horizontally on mobile
                      width: { xs: "110%", md: "42%" }, // Adjust width based on screen size
                      border: "transparent", // Border width and style

                      borderColor: "transparent", // Set the border color to transparent, // Set the border color to white
                      padding: 5,
                    }}
                  ></Box>
                </Box>
              </Box>
              <Grid container alignItems="center">
                {/* Typography Section */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",

                    justifyContent: "center",
                    alignItems: { xs: "flex-start", md: "center" },
                    mt: { xs: "20px", md: "-100px" }, // Adjust positioning on larger screens
                  }}
                >
                  <Typography
                    sx={{
                      position: { xs: "static", md: "absolute" }, // Default to static on small screens, absolute on medium and larger screens
                      fontSize: "20px", // Font size for TM
                      borderRadius: "15px",
                      height: "200px",
                      left: "350px",
                      background:
                        "linear-gradient(to right, #7c3aed, #ec4899, #ef4444)", // Gradient
                      color: "white", // Ensure text is visible against gradient
                      top: { md: "420px" }, // Move typography up on larger screens
                      padding: "16px", // Add padding for better spacing
                      textAlign: "center", // Center-align text
                      width: { xs: "90%", md: "20%" }, // Adjust width based on screen size
                    }}
                  >
                    YOU FOUND US! Site under maintenance. Reach out to our VIP
                    customer service to ORDER NOW!
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </div>

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
          © 2024 CHloakCalc. All Rights Reserved.
        </Typography>

        {/* Conditionally render the FloatingTelepop component */}
        {isChatOpen && <FloatingTelepop />}
        {/* Include the Telegram Icon at the bottom */}
        <TelegramIcon />
      </footer>
    </React.Fragment>
  );
}
