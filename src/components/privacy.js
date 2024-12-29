import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid"; // Import the UUID function
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Footer from "./footer";

const Home = () => {
  const [price, setPrice] = useState(null);
  const [, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Loading state for the button
  const [country, setCountry] = useState("United States");
  const [convertedPrice, setConvertedPrice] = useState(price);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const countryCurrencyMap = {
    "United States": { currency: "USD", rate: 1 },
    Canada: { currency: "CAD", rate: 1.25 },
    "United Kingdom": { currency: "GBP", rate: 0.75 },
    Australia: { currency: "AUD", rate: 1.4 },
    India: { currency: "INR", rate: 74 },
    Malaysia: { currency: "MYR", rate: 4.5 },
    Italy: { currency: "EUR", rate: 0.9 },
    Austria: { currency: "EUR", rate: 0.9 },
    Belgium: { currency: "EUR", rate: 0.9 },
    Bulgaria: { currency: "BGN", rate: 1.8 },
    Croatia: { currency: "HRK", rate: 6.7 },
    Cyprus: { currency: "EUR", rate: 0.9 },
    Czechia: { currency: "CZK", rate: 22.0 },
    Denmark: { currency: "DKK", rate: 6.7 },
    Estonia: { currency: "EUR", rate: 0.9 },
    Finland: { currency: "EUR", rate: 0.9 },
    France: { currency: "EUR", rate: 0.9 },
    Germany: { currency: "EUR", rate: 0.9 },
    Greece: { currency: "EUR", rate: 0.9 },
    HongKong: { currency: "HKD", rate: 7.8 },
    Hungary: { currency: "HUF", rate: 310 },
    Ireland: { currency: "EUR", rate: 0.9 },
    Israel: { currency: "ILS", rate: 3.2 },
    Japan: { currency: "JPY", rate: 110 },
    Latvia: { currency: "EUR", rate: 0.9 },
    Lithuania: { currency: "EUR", rate: 0.9 },
    Luxembourg: { currency: "EUR", rate: 0.9 },
    Malta: { currency: "EUR", rate: 0.9 },
    Netherlands: { currency: "EUR", rate: 0.9 },
    "New Zealand": { currency: "NZD", rate: 1.5 },
    Norway: { currency: "NOK", rate: 10 },
    Poland: { currency: "PLN", rate: 4.0 },
    Portugal: { currency: "EUR", rate: 0.9 },
    Romania: { currency: "RON", rate: 4.5 },
    Singapore: { currency: "SGD", rate: 1.4 },
    Slovakia: { currency: "EUR", rate: 0.9 },
    Slovenia: { currency: "EUR", rate: 0.9 },
    SouthAfrica: { currency: "ZAR", rate: 15.0 },
    "South Korea": { currency: "KRW", rate: 1100 },
    Spain: { currency: "EUR", rate: 0.9 },
    Sweden: { currency: "SEK", rate: 9.5 },
    Switzerland: { currency: "CHF", rate: 0.92 },
    UAE: { currency: "AED", rate: 3.67 },
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();

    // Find the form element manually
    const form = document.querySelector("form");

    if (!form) {
      console.error("Form element not found");
      return;
    }

    // Collect form data
    const formData = {
      firstName: form.firstName?.value || null,
      lastName: form.lastName?.value || null,
      address: form.address?.value || null,
      apartment: form.apartment?.value || null,
      city: form.city?.value || null,
      zip: form.zip?.value || null,
      country,
      phoneNumber: form.phoneNumber?.value || null, // Replaced shippingMethod with phoneNumber
    };
    

    // Check if all required fields are filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.city ||
      !formData.zip 
    ) {
      alert("Please fill in all required fields.");
      return; // Stop the function if any required field is empty
    }

    // Always proceed with the checkout process, regardless of form submission
    setCheckoutLoading(true);

    try {
      // Simulate backend API call for form data submission (optional)
      const response = await fetch("https://chloakcalc.us/submit-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Failed to submit form data");
      } else {
        const responseData = await response.json();
        console.log("Form submitted successfully:", responseData);
      }

      // Proceed to checkout after form submission (or independently)
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/*+json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OTExIiwiZXhwIjoyMDUwNDg4NjI4fQ.A1IW_DMBkqa9DW0XQYcJRviJO7SUgAE9EiPieT7OF_M",
        },
        body: JSON.stringify({
          currency: "USD",
          amount: price,
        }),
      };

      const checkoutResponse = await fetch(
        "https://api.hoodpay.io/v1/businesses/23044/payments",
        options
      );

      if (checkoutResponse.ok) {
        const checkoutData = await checkoutResponse.json();
        if (checkoutData && checkoutData.data && checkoutData.data.url) {
          window.location.href = checkoutData.data.url; // Redirect to checkout
        } else {
          console.error("No URL found in the response");
          alert("Error: No URL provided for checkout.");
        }
      } else {
        console.error("Checkout failed");
        alert("Error during checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);

    const { rate } = countryCurrencyMap[selectedCountry];
    const newConvertedPrice = price * rate;
    setConvertedPrice(newConvertedPrice.toFixed(2)); // Update converted price
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `https://chloakcalc.us/get-price/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPrice(data.price);
        } else {
          console.error("Error fetching price, defaulting to $100");
          setPrice(100);
        }
      } catch (error) {
        console.error("Error:", error);
        setPrice(100);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  useEffect(() => {
    if (price !== null) {
      const { rate } = countryCurrencyMap[country];
      const newConvertedPrice = price * rate;
      setConvertedPrice(newConvertedPrice.toFixed(2));
    }
  }, [price, country, countryCurrencyMap]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "white", // Set white background
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for better appearance
        borderRadius: "8px", // Optional rounded corners
      }}
    >
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
        chloakcalc
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: "8px",
              padding: "20px",
              marginTop: { md: "20px" },
              marginLeft: { md: "240px" },
              paddingLeft: "20px",
              paddingTop: { xs: "10px", md: "0" },
              border: { md: "transparent" },
              paddingRight: "20px",
              paddingBottom: "10px",
            }}
          >
            <Typography sx={{ fontSize: "1.4rem", marginTop: "10px" }}>
              Delivery
            </Typography>

            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First name (optional)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    autoComplete="address-line2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="zip"
                    label="ZIP code"
                    name="zip"
                    autoComplete="postal-code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      id="country"
                      label="Country"
                      labelId="country-label"
                      value={country}
                      onChange={handleCountryChange}
                    >
                      {Object.keys(countryCurrencyMap).map((key) => (
                        <MenuItem key={key} value={key}>
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
  <TextField
    required
    fullWidth
    id="phone"
    label="Phone number"
    name="phone"
    autoComplete="tel"
  />
</Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            marginTop: { md: "20px" },
            backgroundColor: { md: "#f0f0f0" },
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">chloakcalc</Typography>
              <TextField
                id="discount-code"
                label="Discount code"
                variant="outlined"
                fullWidth
                sx={{
                  input: { backgroundColor: "white" }, // Sets the input background to white
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "gray", // Default border color
                    },
                    "&:hover fieldset": {
                      borderColor: "blue", // Border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "green", // Border color when focused
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {/* Labels Column */}
                <Grid item xs={6}>
                  <Typography variant="body1" mb={2}>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    Shipping
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                    mb={2}
                  >
                    Total
                  </Typography>
                </Grid>

                {/* Values Column */}
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                    mb={2}
                  >
                    Price: {convertedPrice}{" "}
                    {countryCurrencyMap[country].currency}
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={2}
                    noWrap
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Enter shipping address
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                    mb={2}
                  >
                    Price: {convertedPrice}{" "}
                    {countryCurrencyMap[country].currency}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "20px",
            padding: "15px 5%", // Uses percentage padding for better scaling
            fontSize: "1.2rem", // Keeps the font size responsive (can also use clamp or media queries)
            borderRadius: "8px", // Maintains rounded edges
            minWidth: "50vw", // Sets the button width to 50% of the viewport width
            maxWidth: "400px", // Caps the button width on larger screens
            marginLeft: "auto", // Centers the button
            marginRight: "auto", // Centers the button
          }}
          onClick={handleButtonClick}
          disabled={checkoutLoading}
        >
          {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
        </Button>

        
      </Grid>

      <Footer /> {/* Add Footer component here */} 
      
    </Box>
    
    
  );
};

export default Home;
