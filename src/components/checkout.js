import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library

import Footer from "./footer";

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
  window: PropTypes.func,
};

export default function App(props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [, setIsMobile] = React.useState(false);
  const [isSliding, setIsSliding] = React.useState(false);
  const [count, setCount] = React.useState(1);

  const reviews = [
    {
      name: "Milek M.",
      date: "12/12/2024",
      review:
        "Sometimes a bit slow. I have used it in class, it's pretty easy to use. The privacy screen is pretty useful. Easy to use, easy to cheat with. Great product.",
    },
    { name: "Sara B.", date: "11/19/2024", review: "Good" },
    { name: "Marico B.", date: "11/15/2024", review: "Soo effective" },
    {
      name: "Christ S.",
      date: "11/13/2024",
      review:
        "I haven't checked it yet to see what capabilities it has, but it seems ok!",
    },
    { name: "Bing A.", date: "11/02/2024", review: "It's very nice" },
    {
      name: "Mag R.",
      date: "10/13/2024",
      review: "I love it, I got the full version and it is perfect",
    },
  ];

  // State to hold the sale price
  const [, setSalePrice] = React.useState(null); // Start price (you can load this from an API)
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

  const texts = ["30 DAY GUARANTEE!", "40% OFF TODAY ONLY!", "Free Shipping!"];

  const swiperRef = React.useRef(null);

  const carouselItems = [
    {
      mediaSrc: "/assets/background/calc.png",
      type: "image",
      title: "Learn Web Development",
      description: "Learn Web Development",
    },
    {
      mediaSrc: "/assets/background/calc1.png",
      type: "image",
      title: "Create Stunning Graphics",
      description: "Create Stunning Graphics",
    },
    {
      mediaSrc: "/assets/background/calc2.png",
      type: "image",
      title: "Photography Essentials",
      description: "Capture beautiful moments with your camera.",
    },
  ];

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0, // Extra small screens start at 0px
        sm: 480, // Small screens start at 480px
        md: 960, // Medium screens start at 960px
        lg: 1280, // Large screens start at 1280px
        xl: 1920, // Extra large screens start at 1920px
      },
    },
  });

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      swiperRef.current?.slidePrev(); // Assuming swiperRef controls your carousel
    }
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      swiperRef.current?.slideNext(); // Assuming swiperRef controls your carousel
    }
  };

  const totalImages = carouselItems.filter(
    (item) => item.type === "image"
  ).length;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSlide = React.useCallback((direction) => {
    if (isSliding) return; // Prevent overlapping slides
    setIsSliding(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "next") {
          return (prevIndex + 1) % texts.length;
        } else {
          return (prevIndex - 1 + texts.length) % texts.length;
        }
      });
      setIsSliding(true);
    }, 500); // Slide duration
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Disable swipe functionality on large screens
  const isLargeScreen = window.innerWidth > 600;

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
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}
                {/* Navigate to homepage */}
                <img
                  src="/assets/background/wwe.png" // Replace with the actual path to your image
                  alt="Logo"
                  style={{
                    width: "250px", // Increased width to stretch more
                    height: "100px", // Increased height to stretch more
                    objectFit: "cover", // Stretches the image to cover the area without maintaining aspect ratio
                    borderRadius: "15px",
                    marginTop: "10px", // Move the image down by 10px
                    cursor: "pointer", // Indicate the element is clickable
                  }}
                />
              </Link>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar
          style={{
            backgroundColor: "white", // Set Toolbar background to white
          }}
        />

        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Container style={{ flex: "1" }}>
              <Box sx={{ my: 1, mt: 24 }}>
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
                  pagination={{ clickable: true }}
                  allowTouchMove={!isLargeScreen} // Disable swipe on large screens
                  slidesPerView={1} // Default to 1 image for small screens
                  breakpoints={{
                    600: {
                      slidesPerView: 1, // Keep one main slide
                      spaceBetween: 15, // Reduce space between slides on larger screenss
                    },
                  }}
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  {carouselItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Grid container spacing={2}>
                        {/* First Image - Always on top */}
                        <Grid
                          item
                          xs={12}
                          md={7}
                          sx={{
                            height: { xs: "330px", md: "580px", lg: "500px" },
                            width: { xs: "100%", md: "40%", lg: "40%" },
                          }}
                        >
                          <img
                            src={item.mediaSrc}
                            alt={item.title}
                            style={{
                              width: "94%",
                              height: "100%", // height will now be controlled by the Grid container
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        </Grid>
                        <Typography
                          sx={{
                            paddingLeft: "26px", // Ensure consistent left padding
                            marginTop: "12px", // Move MY STORE down a bit
                            color: "#a0a0a0", // Lighter gray color
                            textAlign: "left", // Align text to the left
                            display: { xs: "none", sm: "block" }, // Hide on small screens, show on larger screens
                          }}
                        >
                          <Typography
                            sx={{
                              marginBottom: "5px", // Add spacing between MY STORE and the next element
                            }}
                          >
                            MY STORE
                          </Typography>

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
                              color:
                                "rgb(245 158 11 / var(--tw-text-opacity, 1))",
                              fontSize: 18,
                              marginBottom: "20px", // Add spacing between the review section and the price section
                            }}
                          >
                            ★★★★★{" "}
                            <span
                              style={{
                                fontSize: 19,
                                fontWeight: "semi-bold",
                                color: "#a0a0a0",
                              }}
                            >
                              15 Reviews
                            </span>
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

                          <Stack
                            direction="column" // Stack the buttons vertically
                            spacing={2} // Add space between them
                            sx={{
                              display: { xs: "none", sm: "block" }, // Make it visible only on small screens
                              alignItems: "center", // Center the buttons hor
                              //
                              marginLeft: "3px", // Moves the buttons to the right slightly on mobileizontally on mobile
                            }}
                          >
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
                                  backgroundColor: "transparent",
                                  marginRight: "20px", // Add space to the right
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
                                  textAlign: "center",
                                  marginTop: "1px",
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
                                width: {
                                  xs: "120%", // Wider on mobile screens
                                  md: "100%", // Reduced width on medium screens
                                },
                                padding: "12px", // Adds padding to make the button taller
                                marginLeft: "10px",
                                borderColor: "#000000", // Black border color
                                color: "#707070", // Text color (black)
                                borderWidth: "1px", // Adjusts the border width (optional)
                                borderStyle: "solid", // Ensures the border is visible
                              }}
                            >
                              Add to Cart
                            </Button>

                            <Link to="/privacy">
                              <Button
                                endIcon={
                                  <Box
                                    sx={{
                                      backgroundColor: "white", // White background
                                      padding: "2px 3px", // Padding for the text
                                      borderRadius: "4px", // Rounded corners
                                      color: "#707070", // Text color (grey)
                                      fontWeight: "bold", // Bold text
                                    }}
                                  >
                                    Pay
                                  </Box>
                                }
                                sx={{
                                  width: {
                                    xs: "120%", // Wider on mobile screens
                                    md: "100%", // Reduced width on medium and larger screens
                                  },
                                  padding: "12px", // Adds padding to make the button taller
                                  backgroundColor: "#654321", // Dark brown background
                                  marginTop: "20px", // Moves the button up (adjust spacing as needed)
                                  color: "white", // Text color
                                  "&:hover": {
                                    backgroundColor: "#543210", // Slightly darker brown on hover
                                  },
                                }}
                              >
                                <Typography component="span">
                                  Buy with{" "}
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: "1em", // Larger font size for "Hood"
                                      fontWeight: "bold", // Bold text for emphasis
                                    }}
                                  >
                                    Hood
                                  </Typography>
                                </Typography>
                              </Button>
                            </Link>
                          </Stack>
                        </Typography>
                      </Grid>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <ThemeProvider theme={theme}>
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{
                      marginTop: "10px",
                      display: { xs: "flex", sm: "none" }, // Visible on screens <480px, hidden on 480px and above
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        color: "gray",
                        fontSize: "16px", // Adjust font size as needed
                      }}
                      onClick={handlePrev}
                    >
                      {"<"} {/* Previous arrow */}
                    </span>

                    {`${currentIndex + 1} / ${totalImages}`}

                    <span
                      style={{
                        cursor: "pointer",
                        color: "gray",
                        fontSize: "16px", // Adjust font size as needed
                      }}
                      onClick={handleNext}
                    >
                      {">"} {/* Next arrow */}
                    </span>
                  </Typography>
                </ThemeProvider>
              </Box>
            </Container>
          </Grid>
        </Grid>
        <Typography
          sx={{
            paddingLeft: "26px", // Ensure consistent left padding
            marginTop: "12px", // Move MY STORE down a bit
            color: "#a0a0a0", // Lighter gray color
            textAlign: "left", // Align text to the left
            display: { sm: "none" }, // Hide on small screens, show on larger screens
          }}
        >
          MY STORE
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#303030", // Darker gray color
              fontSize: "24px", // Adjust the font size to make ist larger
            }}
          >
            CHloakCalc<sup>TM</sup>
          </Typography>
          <Typography
            gutterBottom
            sx={{
              color: "rgb(245 158 11 / var(--tw-text-opacity, 1))", // Gold color for stars
              fontSize: 18,
            }}
          >
            ★★★★★{" "}
            <span
              style={{
                fontSize: 15,
                fontWeight: "semi-bold",
                color: "#a0a0a0",
              }}
            >
              15 Reviews
            </span>
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontSize: 14,
              display: "flex", // To align prices in a row
              gap: "10px", // Space between the old and new prices
              marginTop: "13px",
            }}
          >
            <span style={{ textDecoration: "line-through", color: "#a0a0a0" }}>
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
              fontSize: "16px",
            }}
          >
            Color
          </Typography>
          <Typography
            sx={{
              marginTop: "7px",
              backgroundColor: "#000000", // Black background for "sale"
              color: "#e0e0e0", // White text color for "sale"
              padding: "0 14px", // Padding around the "sale" text
              borderRadius: "10px", // Optional rounded corners for the background
              display: "inline-block", // Prevents the background from stretching the full width
              fontWeight: "bold",
            }}
          >
            Black
          </Typography>
          <Typography
            sx={{
              marginTop: "7px",
              fontSize: "16px",
            }}
          >
            Quantity
          </Typography>
          {/* Button to double the price */}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* First Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "14px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  height: "100%", // Ensures the box takes full height
                }}
              >
                <img
                  src="/assets/background/calc1.png"
                  alt="assets logo"
                  style={{
                    width: "70%", // Scale the image to take up full width
                    height: "auto", // Maintain aspect ratio
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Grid>

            {/* Second Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "14px",
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                <img
                  src="/assets/background/calc2.png"
                  alt="assets logo"
                  style={{
                    width: "70%", // Scale the image to take up full width
                    height: "auto", // Maintain aspect ratio
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hidden on small screens, visible on medium and larger
              width: { xs: "120%", md: "70%" },
              padding: "12px",
              backgroundColor: "transparent", // Transparent background
              marginTop: "20px",
              justifyContent: "center",
              alignItems: "flex-start",
              borderRadius: "8px", // Optional: Adds rounded corners
            }}
          >
            <Stack direction="column" spacing={2}>
              {/* Easy USB File Transfer */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: {
                      xs: "0", // No margin on small screens
                      sm: "5vw", // 5% of viewport width for small screens
                      md: "-5vw", // 10% of viewport width for medium screens
                      lg: "-22vw", // 15% of viewport width for large screens
                    },
                    color: "#333333", // Dark grey color
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {" "}
                  <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                    •
                  </span>{" "}
                  Easy USB File Transfer 🔄
                </Typography>
              </Box>

              {/* Long Battery Life */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: {
                      xs: "0", // No margin on small screens
                      sm: "5vw", // 5% of viewport width for small screens
                      md: "-5vw", // 10% of viewport width for medium screens
                      lg: "-22vw", // 15% of viewport width for large screens
                    },
                    color: "#333333", // Dark grey color
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {" "}
                  <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                    •
                  </span>{" "}
                  Long Battery Life 🔋
                </Typography>
              </Box>

              {/* Watch Videos & Photos */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: {
                      xs: "0", // No margin on small screens
                      sm: "5vw", // 5% of viewport width for small screens
                      md: "-5vw", // 10% of viewport width for medium screens
                      lg: "-22vw", // 15% of viewport width for large screens
                    },
                    color: "#333333", // Dark grey color
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {" "}
                  <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                    •
                  </span>{" "}
                  Watch Videos & Photos 📽️
                </Typography>
              </Box>

              {/* Built-in Privacy Screen */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: {
                      xs: "0", // No margin on small screens
                      sm: "5vw", // 5% of viewport width for small screens
                      md: "-5vw", // 10% of viewport width for medium screens
                      lg: "-22vw", // 15% of viewport width for large screens
                    },
                    color: "#333333", // Dark grey color
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {" "}
                  <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                    •
                  </span>{" "}
                  Built-in Privacy Screen 🤐
                </Typography>
              </Box>

              {/* 30-Day Money-Back Guarantee (Hidden) */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  component="span"
                  sx={{
                    marginLeft: {
                      xs: "0", // No margin on small screens
                      sm: "5vw", // 5% of viewport width for small screens
                      md: "10vw", // 10% of viewport width for medium screens
                      lg: "-22vw", // 15% of viewport width for large screens
                    },
                    color: "#333333", // Dark grey color
                    fontWeight: "bold", // Bold text
                  }}
                >
                  {" "}
                  <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                    •
                  </span>
                  30-Day Money-Back Guarantee 💸
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>

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

        <Box
          sx={{
            display: { xs: "flex", lg: "none", md: "none", sm: "none" }, // Visible on small screens, hidden on large screens
            width: { xs: "100%", md: "70%" },
            padding: "12px",
            backgroundColor: "transparent", // Transparent background
            marginTop: "20px",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: "8px", // Optional: Adds rounded corners
          }}
        >
          <Stack direction="column" spacing={2}>
            {/* Easy USB File Transfer */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  marginLeft: {
                    xs: "0", // No margin on small screens
                    sm: "5vw", // 5% of viewport width for small screens
                    md: "-5vw", // 10% of viewport width for medium screens
                    lg: "-22vw", // 15% of viewport width for large screens
                  },
                  color: "#333333", // Dark grey color
                  fontWeight: "bold", // Bold text
                }}
              >
                <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                  •
                </span>{" "}
                Easy USB File Transfer 🔄
              </Typography>
            </Box>

            {/* Long Battery Life */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  marginLeft: {
                    xs: "0", // No margin on small screens
                    sm: "5vw", // 5% of viewport width for small screens
                    md: "-5vw", // 10% of viewport width for medium screens
                    lg: "-22vw", // 15% of viewport width for large screens
                  },
                  color: "#333333", // Dark grey color
                  fontWeight: "bold", // Bold text
                }}
              >
                <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                  •
                </span>{" "}
                Long Battery Life 🔋
              </Typography>
            </Box>

            {/* Watch Videos & Photos */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  marginLeft: {
                    xs: "0", // No margin on small screens
                    sm: "5vw", // 5% of viewport width for small screens
                    md: "-5vw", // 10% of viewport width for medium screens
                    lg: "-22vw", // 15% of viewport width for large screens
                  },
                  color: "#333333", // Dark grey color
                  fontWeight: "bold", // Bold text
                }}
              >
                <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                  •
                </span>{" "}
                Watch Videos & Photos 📽️
              </Typography>
            </Box>

            {/* Built-in Privacy Screen */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  marginLeft: {
                    xs: "0", // No margin on small screens
                    sm: "5vw", // 5% of viewport width for small screens
                    md: "-5vw", // 10% of viewport width for medium screens
                    lg: "-22vw", // 15% of viewport width for large screens
                  },
                  color: "#333333", // Dark grey color
                  fontWeight: "bold", // Bold text
                }}
              >
                <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                  •
                </span>{" "}
                Built-in Privacy Screen 🤐
              </Typography>
            </Box>

            {/* 30-Day Money-Back Guarantee */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component="span"
                sx={{
                  marginLeft: {
                    xs: "0", // No margin on small screens
                    sm: "5vw", // 5% of viewport width for small screens
                    md: "10vw", // 10% of viewport width for medium screens
                    lg: "-22vw", // 15% of viewport width for large screens
                  },
                  color: "#333333", // Dark grey color
                  fontWeight: "bold", // Bold text
                }}
              >
                <span style={{ fontSize: "1.5rem", marginRight: "8px" }}>
                  •
                </span>
                30-Day Money-Back Guarantee 💸
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            padding: 3,
            maxWidth: 800,
            margin: "auto",
            fontFamily: "Arial, sans-serif",
            backgroundColor: "white", // Outer box background set to white
          }}
        >
          {/* Product Highlights */}

          {/* Customer Reviews Section */}
          <Typography
            variant="h5"
            sx={{
              marginTop: 4,
              fontWeight: "bold",
              backgroundColor: "white",
              textAlign: { xs: "center", sm: "left" }, // Center on smaller screens and left-align on larger screens
            }}
          >
            Customer Reviews
          </Typography>

          <Typography
            variant="h6"
            sx={{
              marginTop: 2,
              backgroundColor: "white",
              textAlign: { xs: "center", sm: "left" }, // Center on smaller screens and left-align on larger screens
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Increase font size on different screen sizes
            }}
          >
            4.8
          </Typography>

          <Typography
            gutterBottom
            sx={{
              color: "rgb(245 158 11 / var(--tw-text-opacity, 1))",
              fontSize: 18,
              marginBottom: "20px", // Add spacing between the review section and the price section
              textAlign: { xs: "center", sm: "left" }, // Centered on small screens, left-aligned on larger screens
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems={{ xs: "center", sm: "flex-start" }} // Center on small screens, left-align on larger screens
            >
              <span>★★★★★</span>
              <span
                style={{
                  fontSize: 19,
                  fontWeight: "semi-bold",
                  color: "#a0a0a0",
                }}
              >
                15 Reviews
              </span>
            </Stack>
          </Typography>

          <Box sx={{ marginTop: 4, backgroundColor: "white", padding: 2 }}>
            {reviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 3,
                  backgroundColor: "white", // White background for each review
                  padding: 2,
                  borderRadius: "8px", // Rounded corners
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  {/* Left Section: Name and Date */}
                  <Grid
                    item
                    xs={12} // Full width on smaller screens
                    sm={4} // 4/12 of the width on larger screens
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: "#333333",
                        marginBottom: 1,
                        textAlign: { xs: "center", sm: "left" }, // Centered on smaller screens, left-aligned on larger screens
                      }}
                    >
                      {review.name} - {review.date}
                    </Typography>
                  </Grid>

                  {/* Right Section: Star Rating and Review Text */}
                  <Grid
                    item
                    xs={12} // Full width on smaller screens
                    sm={8} // 8/12 of the width on larger screens
                  >
                    {/* Star Rating */}
                    <Typography
                      sx={{
                        color: "rgb(245 158 11 / var(--tw-text-opacity, 1))",
                        fontSize: 18,
                        marginBottom: 1,
                        textAlign: "center",
                      }}
                    >
                      ★★★★★
                    </Typography>

                    {/* Review Text */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666666", // Light gray color for the review text
                        textAlign: { xs: "center", sm: "left" }, // Centered on smaller screens, left-aligned on larger screens
                      }}
                    >
                      {review.review}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Divider between reviews */}
                {index < reviews.length - 1 && (
                  <Divider sx={{ marginY: 2, backgroundColor: "#cccccc" }} />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </div>      <Toolbar
  style={{
    display: "flex", // Enable flexbox
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: "white", // Set white background color
  }}
>
  <img
    src="/assets/background/wwe.png" // Replace with the actual path to your image
    alt="Logo"
    style={{
      width: "400px", // Increased width for a larger image
      height: "150px", // Adjusted height proportionally
      objectFit: "cover", // Stretches the image to cover the area without maintaining aspect ratio
      borderRadius: "15px",
      marginTop: "60px", // Moved the image down by 60px
    }}
  />
</Toolbar>

{/* Add marginTop to move the footer further down */}<Box sx={{ marginTop: "20px" }}>
  <Footer />
</Box>
      <style>
        {`
          /* Set the cursor for navigation buttons to pointer (gray) */
          .custom-swiper .swiper-button-next,
          .custom-swiper .swiper-button-prev {
            cursor: pointer;
            color: gray;
          }

          /* For pagination controls */
          .swiper-pagination-bullet {
            background-color: gray !important;
          }
        `}
      </style>
    </React.Fragment>
  );
}
