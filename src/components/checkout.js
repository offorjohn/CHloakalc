import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
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
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library


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

  

  

    // State to hold the sale price
    const [setPrice, setSalePrice] = React.useState(null); // Start price (you can load this from an API)
    const handleDoublePrice = async () => {
      try {
          // Check if UUID exists in local storage
          let userId = localStorage.getItem('userId');
  
          // If no UUID, generate one and save it to local storage
          if (!userId) {
              userId = uuidv4();
              localStorage.setItem('userId', userId);
          }
  
          // Fetch the incremented price from the server
          const response = await fetch(`https://chloakcalc.us/increment-price/${userId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.ok) {
              const data = await response.json();
              setSalePrice(data.newPrice); // Update the price with the new value from the server
              setCount((prev) => prev + 1); // Increment count
          } else {
              console.error('Error incrementing price');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
  React.useEffect(() => {
    // Dynamically fetch or generate UUID
    let userId = localStorage.getItem('userId');

    // If no UUID exists, generate one and save it to local storage
    if (!userId) {
        userId = uuidv4(); // Generate a new UUID
        localStorage.setItem('userId', userId);
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
            console.error('Error fetching price:', error);
        });
}, []); // Dependency array is empty to run the effect only once

  
  const handleHalfPrice = async () => {
    try {
        // Check if UUID exists in local storage
        let userId = localStorage.getItem('userId');

        // If no UUID, generate one and save it to local storage
        if (!userId) {
            userId = uuidv4();
            localStorage.setItem('userId', userId);
        }

        // Fetch the decremented price from the server
        const response = await fetch(`https://chloakcalc.us/decrement-price/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            setSalePrice(data.newPrice); // Update the price with the new value from the server
            setCount((prev) => Math.max(prev - 1, 0)); // Decrement count, minimum 0
        } else {
            console.error('Error decrementing price');
        }
    } catch (error) {
        console.error('Error:', error);
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
      xs: 0,     // Extra small screens start at 0px
      sm: 480,   // Small screens start at 480px
      md: 960,   // Medium screens start at 960px
      lg: 1280,  // Large screens start at 1280px
      xl: 1920,  // Extra large screens start at 1920px
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
                            height: { xs: "330px", md: "550px", lg: "450px" },
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
                              $186.00 USD
                            </span>
                            <span
                              style={{
                                fontSize: 16,
                                padding: "0 5px", // Padding around the sale price
                                borderRadius: "3px", // Rounded corners for the background
                              }}
                            >
                              ${setPrice}  USD
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
            marginLeft: '3px', // Moves the buttons to the right slightly on mobileizontally on mobile

           
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
          marginTop: '10px',
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
          marginTop: '1px'
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
               width: "120%", // Makes the button wider on mobile
               
               padding: "12px", // Optional: Adds padding to make the button taller
               borderColor: "#000000", // Black border color
               color: "#707070", // Text color (black)
                borderWidth: "1px", // Adjusts the border width (optional)
                
               borderStyle: "solid", // Makes sure the border is visible
               
              }}
            >
             Add to Cart
           </Button>
           
           
        <Link to="/privacy"  
        >
  <Button
    endIcon={
      <Box
        sx={{
          backgroundColor: "white", // White background
          padding: "2px 3px", // Padding for the text
          borderRadius: "4px", // Optional: Rounded corners
          color: "#707070", // Text color (grey)
          fontWeight: "bold", // Bold text
        }}
      >
        Pay
      </Box>
    }
    sx={{
      width: "120%", // Makes the button wider on mobile
      padding: "12px", // Adds padding to make the button taller
      backgroundColor: "#654321", // Dark brown background
      marginTop: "20px", // Moves the button up (negative value reduces the space)
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
              $186.00 USD
            </span>
            <span
              style={{
                fontSize: 16,
                padding: "0 5px", // Padding around the sale price
                borderRadius: "3px", // Rounded corners for the background
              }}
            >
            ${ 100} USD
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

        

        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hidden on small screens, visible on medium and larger
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "14px", // Rounded corners
              padding: "8px 16px", // Spacing inside the box
              cursor: "pointer", // Pointer cursor to indicate it's clickable
            }}
          >
            <img
              src="/assets/background/calc2.png"
              alt="assets logo"
              style={{
                width: 260,
                height: 260,
                marginLeft: "417%",
                borderRadius: "8px",
                marginRight: 8,
              }} // Spacing between icon and text
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Hidden on small screens, visible on medium and larger
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "14px", // Rounded corners
              padding: "8px 16px", // Spacing inside the box
              cursor: "pointer", // Pointer cursor to indicate it's clickable
            }}
          >
            <img
              src="/assets/background/calc1.png"
              alt="assets logo"
              style={{
                width: 260,
                height: 260,
                marginLeft: "-36%",
                borderRadius: "8px",
                marginRight: 8,
              }} // Spacing between icon and text
            />
          </Box>
        </Stack>

        <Stack
          direction="column" // Stack the buttons vertically
          spacing={2} // Add space between them
          sx={{
            display: { xs: "block", sm: "none" }, // Make it visible only on small screens
            alignItems: "center", // Center the buttons hor
            // 
            marginLeft: '25px', // Moves the buttons to the right slightly on mobileizontally on mobile

           
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
          marginTop: '10px',
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
          marginTop: '1px'
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
               padding: "2px 3px",       // Padding for the text
               borderRadius: "4px",      // Optional: Rounded corners
               color: "#707070", // Text color (black)
             fontWeight: "bold",       // Bold text
      
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
      </div>

      <footer
        style={{
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
          padding: "10px 0",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2">
          © 2024 CHloakCalc Inc. All Rights Reserved.
        </Typography>
      </footer>

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