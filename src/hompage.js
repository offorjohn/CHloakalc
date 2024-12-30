import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Grid from "@mui/material/Grid";
import Footer from "./components/footer";
import { Stack } from "@mui/material";

import { v4 as uuidv4 } from "uuid"; // Import the uuid library

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
  const [count, setCount] = React.useState(1);

  const [, setSalePrice] = React.useState(null); // Start price (you can load this from an API)
    React.useEffect(() => {
      // Dynamically fetch or generate UUID
      let userId = localStorage.getItem("userId");
  
      // If no UUID exists, generate one and save it to local storage
      if (!userId) {
        userId = uuidv4(); // Generate a new UUID
        localStorage.setItem("userId", userId);
      }
  
      // Fetch the product price using the userId
      fetch(`https://chloakcalc.us/reset-price/${userId}`) // Use HTTP instead of HTTPS if testing locally
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch price. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setSalePrice(data.price); // Update the sale price from the response
        })
        .catch((error) => {
          console.error("Error fetching price:", error);
        });
    }, []); // Dependency array is empty to run the effect only once
  
  const handleDoublePrice = async () => {
    try {
      // Check if UUID exists in local storage
      let userId = localStorage.getItem("userId");

      // If no UUID, generate one and save it to local storage
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem("userId", userId);
      }

      // Fetch the incremented price from the server
      const response = await fetch(
        `https://chloakcalc.us/increment-price/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSalePrice(data.newPrice); // Update the price with the new value from the server
        setCount((prev) => prev + 1); // Increment count
      } else {
        console.error("Error incrementing price");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleHalfPrice = async () => {
    try {
      // Check if UUID exists in local storage
      let userId = localStorage.getItem("userId");

      // If no UUID, generate one and save it to local storage
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem("userId", userId);
      }

      // Fetch the decremented price from the server
      const response = await fetch(
        `https://chloakcalc.us/decrement-price/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSalePrice(data.newPrice); // Update the price with the new value from the server
        setCount((prev) => Math.max(prev - 1, 0)); // Decrement count, minimum 0
      } else {
        console.error("Error decrementing price");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ color: "text.secondary", fontSize: 24, display: "inline" }}
        >
          CHloakCalc
          <Typography
            component="span"
            sx={{
              fontSize: "12px", // Smaller font size for TM
              verticalAlign: "super", // Position TM above
              lineHeight: "0", // Align closely above the text
              marginLeft: "2px", // Optional spacing between main text and TM
            }}
          >
            TM
          </Typography>
        </Typography>

        <Typography
          sx={{
            mt: "10px",
            fontSize: "20px", // Smaller font size for TM
          }}
        >
          Work smarter NOT harder!
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/checkout">
          <CardActions>
            <Button
              size="small"
              sx={{
                backgroundColor: "black", // Black background
                color: "#e0e0e0", // White text
                paddingX: 4, // Horizontal padding (left and right)
                paddingY: 1.5, // Vertical padding (top and bottom)
                "&:hover": {
                  backgroundColor: "gray", // Optional: Change background color on hover
                },
              }}
            >
              Buy Now!
            </Button>
          </CardActions>
        </Link>
      </CardActions>
    </React.Fragment>
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
    }, 500); // Slide duration
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlide("next"); // Automatically go to the next slide every 3 seconds
    }, 3000); // 3 seconds interval

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [handleSlide, isSliding]);

  return (
    <>
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
                    transform: isSliding
                      ? "translateX(-50px)"
                      : "translateX(0)",
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

          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              {" "}
              {/* Full width on small screens, half on medium+ */}
              <Container style={{ flex: "1" }}>
                <Box
                  sx={{
                    my: 1,
                    mt: 25,
                    ml: {
                      md: 17, // Negative margin for medium screens
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
                        left: { xs: "50%", md: -120 }, // Centered horizontally on mobile, left on large
                        top: { md: 135 }, // Positioned at the top on large screens
                        transform: { xs: "translateX(-50%)", md: "none" }, // Centered horizontally on mobile
                        width: {
                          xs: "100%", // Use most of the screen width on small screens
                          sm: "70%", // Slightly narrower on small-to-medium screens
                          md: "50%", // Standard width on medium screens
                          lg: "40%", // Narrower width on large screens
                        },
                        maxWidth: "500px", // Ensure the card doesn't get too large
                        minWidth: "250px", // Ensure the card doesn't get too small
                        border: "transparent", // Border width and style

                        borderColor: "transparent", // Set the border color to transparent, // Set the border color to white
                        padding: 5,
                      }}
                    >
                      <Card variant="outlined">{card}</Card>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
      <Grid
        container
        justifyContent="center"
        sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",

            gap: { md: 4 }, // Add space between text and image on larger screens
            flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on large
            alignItems: "center",

            mt: { xs: 9, md: -13 }, // Move down on small screens, up on large screens
          }}
        >
          {/* Text Block */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              textAlign: { xs: "center", md: "left" },
              padding: { xs: 2, md: 1 },
              mt: { xs: 9, md: -20 }, // Move down on small screens, up on large screens
              order: { xs: 2, md: 1 }, // Text below image on small screens, left on large
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                whiteSpace: { xs: "normal", lg: "nowrap" }, // Normal wrapping on small screens, no wrapping on large screens
              }}
            >
              Ace Every Test with ease!
            </Typography>

            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              A sneaky calculator with USB file transfer, privacy screen, music
              playback, and 4GB memory-ideal for work and play!
            </Typography>

            <Link to="/checkout">
              <Button
                variant="contained"
                sx={{
                  width: { xs: "50%", sm: "55%" }, // Smaller width on extra-small screens, wider on small+
                  padding: { xs: "10px", sm: "12px" }, // Smaller padding on extra-small screens
                  fontSize: { xs: "0.001em", sm: "1em" }, // Smaller font size on extra-small screens
                  backgroundColor: "#654321", // Dark brown background

                  marginLeft: { xs: "10px", sm: "0" }, // Apply -90px marginLeft on extra
                  marginTop: "20px", // Top margin
                }}
              >
                <Typography component="span">Shop Now !</Typography>
              </Button>
            </Link>
          </Box>

          {/* Image Block */}
          <Box
            sx={{
              width: { xs: "100%", md: "120%" },
              mt: { xs: 5, md: -9 }, // Move down on small screens, up on large screens
              position: "relative",
              backgroundColor: "#ffffff",
              order: { xs: 1, md: 2 }, // Image above text on small screens, right on large
            }}
          >
            <img
              src="/assets/background/calc1.png"
              alt="Work in progress"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </Box>
        </Grid>

        <Stack
          direction="column" // Stack the buttons vertically
          spacing={2} // Add space between them
          sx={{
            display: { xs: "block", sm: "none" }, // Make it visible only on small screens
            alignItems: "center", // Center the buttons hor
            //
            marginLeft: "25px", // Moves the buttons to the right slightly on mobileizontally on mobile
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "120%" },
              mt: { xs: 5, md: -9 }, // Move down on small screens, up on large screens
              position: "relative",
              backgroundColor: "#ffffff",
              order: { xs: 1, md: 2 }, // Image above text on small screens, right on large
            }}
          >
            <img
              src="/assets/background/calc.png"
              alt="Work in progress"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#303030", // Darker gray color
              fontSize: "24px", // Adjust the font size to make it larger
              marginBottom: "5px", // Add spacing between the title and reviews
            }}
          >
            CHloakCalc<sup>TM</sup>
          </Typography>

          <Typography
            gutterBottom
            sx={{
              color: "rgb(245 158 11 / var(--tw-text-opacity, 1))",
              fontSize: 18,
              marginBottom: "20px", // Add spacing between the review section and the price section
            }}
          >
            ★★★★★{" "}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontSize: 14,
              display: "flex", // To align prices in a row
              gap: "10px", // Space between the old and new prices
              marginBottom: "10px", // Add spacing between the price section and the color section
            }}
          >
            <span
              style={{
                textDecoration: "line-through",
                color: "#a0a0a0",
              }}
            >
              $166.5 USD
            </span>
            <span
              style={{
                fontSize: 16,
                padding: "0 5px", // Padding around the sale price
                borderRadius: "3px", // Rounded corners for the background
              }}
            >
              ${100} USD
            </span>

            <Typography
              sx={{
                backgroundColor: "#000000", // Black background for "sale"
                color: "#e0e0e0", // White text color for "sale"
                padding: "0 9px", // Padding around the "sale" text
                borderRadius: "13px", // Optional rounded corners for the background
              }}
            >
              sale
            </Typography>
          </Typography>
          <Typography
            sx={{
              marginBottom: "10px", // Add spacing between the price section and the color section
              fontSize: "16px",
              marginTop: "20px", // Add spacing between the color label and the next content
            }}
          >
            Color
          </Typography>
          <Typography
            sx={{
              marginBottom: "10px", // Add spacing between the price section and the color section
              backgroundColor: "#000000", // Black background for "sale"
              color: "#e0e0e0", // White text color for "sale"
              padding: "0 14px", // Padding around the "sale" text
              borderRadius: "6px", // Optional rounded corners for the background
              display: "inline-block", // Prevents the background from stretching the full width
              fontWeight: "bold",
            }}
          >
            Black
          </Typography>
          <Typography
            sx={{
              marginBottom: "10px", // Add spacing between the price section and the color section
              fontSize: "16px",
              marginTop: "20px", // Add spacing between the color label and the next content
            }}
          >
            Quantity
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffff",
              borderColor: "#000000", // Black border color

              borderWidth: "1px", // Adjusts the border width (optional)
              borderStyle: "solid", // Makes sure the border is visible
              color: "black",
              padding: "10px 40px",
              fontSize: "16px",

              display: "flex",
              marginTop: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <Box
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the whole button
                handleHalfPrice();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "30px", // Consistent width
                height: "30px", // Consistent height
                backgroundColor: "transparent",
                // Add responsive margin or padding for mobile adjustment
                ml: { xs: -1, sm: 0 }, // Add
              }}
            >
              -
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
                width: "40px", // Ensure consistent width

                marginTop: "1px",

                marginX: "10px", // Add consistent space between buttons
              }}
            >
              {count}
            </Box>
            <Box
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the whole button
                handleDoublePrice();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "transparent",
                marginLeft: "20px", // Add space to the left
              }}
            >
              +
            </Box>
          </Button>

          <Button
            sx={{
              width: "95%", // Makes the button wider on mobile

              padding: "12px", // Optional: Adds padding to make the button taller
              borderColor: "#000000", // Black border color
              color: "#707070", // Text color (black)
              borderWidth: "1px", // Adjusts the border width (optional)
              borderStyle: "solid", // Makes sure the border is visible
            }}
          >
            Add to Cart
          </Button>

          <Link to="/privacy">
            <Button
              variant="contained"
              endIcon={
                <Box
                  sx={{
                    backgroundColor: "white", // White background
                    padding: "2px 3px", // Padding for the text
                    borderRadius: "4px", // Optional: Rounded corners
                    color: "#707070", // Text color (black)
                    fontWeight: "bold", // Bold text
                  }}
                >
                  Pay
                </Box>
              }
              sx={{
                width: "95%", // Makes the button wider on mobile
                padding: "12px", // Adds padding to make the button taller
                backgroundColor: "#654321", // Dark brown background
                marginTop: "20px", // Moves the button up (negative value reduces the space)
              }}
            >
              <Typography component="span">
                Buy with{" "}
                <Typography
                  component="span"
                  sx={{
                    fontSize: "1em", // Larger font size for "Shop"
                    fontWeight: "bold", // Optional: Make it bold for emphasis
                  }}
                >
                  Hood
                </Typography>
              </Typography>
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Stack
        direction={{ xs: "column", md: "row" }} // Column on small screens, row on larger screens
        spacing={{ xs: 2, md: 4 }} // Smaller spacing on small screens, larger on medium+
        sx={{
           backgroundColor: "#ffffff",
          display: { xs: "none", md: "flex" }, // Hidden on small screens, flex on larger screens
          alignItems: { xs: "center", md: "flex-start" }, // Center on small screens, align left on large
          marginLeft: { xs: "25px", md: "0" }, // Move slightly on small screens
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" }, // Full width on small screens, half on medium+
            mt: { xs: 5, md: 0 }, // Add margin on small screens
            backgroundColor: "#ffffff",
            position: "relative",
            order: { xs: 1, md: 0 }, // Adjust order for responsiveness
          }}
        >
          <img
            src="/assets/background/calc.png"
            alt="Work in progress"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" }, // Full width on small screens, half on medium+
            padding: { xs: "0", md: "20px" }, // Add padding on larger screens
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#303030",
              fontSize: { xs: "24px", md: "28px" }, // Larger font size on larger screens
              marginBottom: "5px",
            }}
          >
            CHloakCalc<sup>TM</sup>
          </Typography>

          <Typography
            gutterBottom
            sx={{
              color: "rgb(245 158 11 / var(--tw-text-opacity, 1))",
              fontSize: { xs: "18px", md: "20px" }, // Adjust font size for responsiveness
              marginBottom: "20px",
            }}
          >
            ★★★★★
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                textDecoration: "line-through",
                color: "#a0a0a0",
              }}
            >
              $166.5 USD
            </span>
            <span
              style={{
                fontSize: "16px",
                padding: "0 5px",
                borderRadius: "3px",
              }}
            >
              ${100} USD
            </span>
            <Typography
              sx={{
                backgroundColor: "#000000",
                color: "#e0e0e0",
                padding: "0 9px",
                borderRadius: "13px",
              }}
            >
              sale
            </Typography>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "16px", md: "18px" }, // Larger font size on larger screens
              marginTop: "20px",
            }}
          >
            Color: <strong>Black</strong>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              marginTop: "20px",
            }}
          >
            Quantity
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ffff",
              borderColor: "#000000",
              borderWidth: "1px",
              borderStyle: "solid",
              color: "black",
              padding: { xs: "10px 20px", md: "12px 40px" }, // Adjust padding for screen sizes
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Box
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the whole button
                handleHalfPrice();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "30px", // Consistent width
                height: "30px", // Consistent height
                backgroundColor: "transparent",
                // Add responsive margin or padding for mobile adjustment
                ml: { xs: -1, sm: 0 }, // Add
              }}
            >
              -
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bold",
                width: "40px",
                marginX: "10px",
              }}
            >
              {count}
            </Box>
            <Box
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the whole button
                handleDoublePrice();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                backgroundColor: "transparent",
                marginLeft: "20px", // Add space to the left
              }}
            >
              +
            </Box>
          </Button>

          <Button
            sx={{
              width: { xs: "100%", md: "80%" }, // Adjust width for responsiveness
              padding: "12px",
              borderColor: "#000000",
              color: "#707070",
              borderWidth: "1px",
              borderStyle: "solid",
              marginTop: "10px",
            }}
          >
            Add to Cart
          </Button>

          <Link to="/privacy">
            <Button
              variant="contained"
              endIcon={
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: "2px 3px",
                    borderRadius: "4px",
                    color: "#707070",
                    fontWeight: "bold",
                  }}
                >
                  Pay
                </Box>
              }
              sx={{
                width: { xs: "100%", md: "80%" },
                padding: "12px",
                backgroundColor: "#654321",
                marginTop: "20px",
              }}
            >
              Buy with{" "}
              <Typography component="span" sx={{ fontWeight: "bold" }}>
                Hood
              </Typography>
            </Button>
          </Link>
        </Box>
      </Stack>
      <Footer /> {/* Add Footer component here */}
    </>
  );
}
