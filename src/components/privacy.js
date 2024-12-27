import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function
import TextField from '@mui/material/TextField';

const Home = () => {
  const [price, setPrice] = useState(null);
  const [, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Loading state for the button

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }

    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://chloakcalc.us/get-price/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setPrice(data.price);
        } else {
          console.error('Error fetching price, defaulting to $100');
          setPrice(100);
        }
      } catch (error) {
        console.error('Error:', error);
        setPrice(100);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/*+json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OTExIiwiZXhwIjoyMDUwNDg4NjI4fQ.A1IW_DMBkqa9DW0XQYcJRviJO7SUgAE9EiPieT7OF_M',
      },
      body: JSON.stringify({
        currency: 'USD',
        amount: price,
      }),
    };

    try {
      const response = await fetch('https://api.hoodpay.io/v1/businesses/23044/payments', options);

      if (response.ok) {
        const data = await response.json();
        if (data && data.data && data.data.url) {
          window.location.href = data.data.url;
        } else {
          console.error('No URL found in the response');
          alert('Error: No URL provided for checkout.');
        }
      } else {
        console.error('Checkout failed');
        alert('Error during checkout. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred during checkout.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: 'white', // Set white background
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for better appearance
        borderRadius: '8px', // Optional rounded corners
      }}
    >
      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>chloakcalc</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: '8px',
              padding: '20px',
              marginTop: { md: '20px' },
              marginLeft: { md: '240px' },
              paddingLeft: '20px',
              paddingTop: { xs: '10px', md: '0' },
              border: { md: 'transparent' },
              paddingRight: '20px',
              paddingBottom: '10px',
            }}
          >
            <Typography sx={{ fontSize: '1rem', marginTop: '10px' }}>Express checkout</Typography>
    
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoComplete="given-name" name="firstName" fullWidth id="firstName" label="First name (optional)" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="lastName" label="Last name" name="lastName" autoComplete="family-name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="address" label="Address" name="address" autoComplete="address-line1" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="apartment" label="Apartment, suite, etc. (optional)" name="apartment" autoComplete="address-line2" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="city" label="City" name="city" autoComplete="address-level2" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="zip" label="ZIP code" name="zip" autoComplete="postal-code" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="country" label="Country" name="country" defaultValue="United States" InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="shippingMethod" label="Shipping method" name="shippingMethod" autoComplete="shipping-method" />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginTop: { md: '20px' }, backgroundColor: { md: '#f0f0f0' }, padding: '20px', borderRadius: '8px' }}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <Typography variant="h6">chloakcalc</Typography>
      <TextField id="discount-code" label="Discount code" variant="outlined" fullWidth />
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
    </Grid>

    <Grid item xs={12}>
      <Typography variant="h6">Cost summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">Shipping</Typography>
          <Typography variant="body1">Total</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1"  sx={{ fontWeight: 'bold' }}>Value</Typography>
          <Typography variant="body1"  sx={{ fontWeight: 'bold' }}>${price}</Typography>
          <Typography variant="body1">Enter shipping address</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}> USD ${price}</Typography>
  
          
          </Grid>
      </Grid>
    </Grid>
  </Grid>
</Grid>

      </Grid>

     
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={handleCheckout}
        disabled={checkoutLoading}
      >
        {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
      </Button>
    </Box>
  );
};

export default Home;
