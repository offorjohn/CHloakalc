import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const navigateToCheckout = async () => {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = uuidv4();
        localStorage.setItem('userId', userId);
      }

      try {
        const priceResponse = await fetch(`https://chloakcalc.us/get-price/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        let price = 100; // Default price
        if (priceResponse.ok) {
          const priceData = await priceResponse.json();
          price = priceData.price;
        }

        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/*+json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OTExIiwiZXhwIjoyMDUwNDg4NjI4fQ.A1IW_DMBkqa9DW0XQYcJRviJO7SUgAE9EiPieT7OF_M', // Your API Key
          },
          body: JSON.stringify({
            currency: 'USD',
            amount: price,
          }),
        };

        const checkoutResponse = await fetch(
          'https://api.hoodpay.io/v1/businesses/23044/payments',
          options
        );

        if (checkoutResponse.ok) {
          const checkoutData = await checkoutResponse.json();
          if (checkoutData && checkoutData.data && checkoutData.data.url) {
            window.location.href = checkoutData.data.url;
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
        alert('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    navigateToCheckout();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {loading ? (
        <>
          <CircularProgress />
          <Typography sx={{ marginTop: '20px', fontSize: '1.2rem' }}>
            Preparing your checkout...
          </Typography>
        </>
      ) : null}
    </Box>
  );
};

export default Home;
