
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
import Grid from "@mui/material/Grid";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  const texts = ["30 DAY GUARANTEE!", "40% OFF TODAY ONLY!", "Free Shipping!"];
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [texts.length]);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                  className="custom-swiper"
                >
                  {carouselItems.map((item, index) => (
                    <SwiperSlide key={index}>
                      {item.type === "image" && (
                        <img
                          src={item.mediaSrc}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "15px",
                          }}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Container>
          </Grid>
        </Grid>
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
          © 2019 Simple React Page. All Rights Reserved.
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
