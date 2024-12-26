import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

const Home = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Loading state for the button

  useEffect(() => {
    // Check if a unique user ID exists in localStorage
    let userId = localStorage.getItem('userId');
    if (!userId) {
      // Generate a new UUID if not present
      userId = uuidv4();
      localStorage.setItem('userId', userId); // Save it in localStorage
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
          setPrice(100); // Default price
        }
      } catch (error) {
        console.error('Error:', error);
        setPrice(100); // Default price in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  const handleCheckout = async () => {
    // eslint-disable-next-line
    setCheckoutLoading(true); // Set button loading state

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/*+json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OTExIiwiZXhwIjoyMDUwNDg4NjI4fQ.A1IW_DMBkqa9DW0XQYcJRviJO7SUgAE9EiPieT7OF_M', // Your API Key
    
      },
      body: JSON.stringify({
        currency: 'USD',
        amount: price,  // Use the dynamic price from state
      }),
    };

    try {
      const response = await fetch('https://api.hoodpay.io/v1/businesses/23044/payments', options);

     
if (response.ok) {
  const data = await response.json();
  console.log('API Response:', data);  // Log the entire response to inspect it

  // Access the URL inside the 'data' object
  if (data && data.data && data.data.url) {
    window.location.href = data.data.url;  // Redirect to the checkout URL
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
      setCheckoutLoading(false); // Reset button loading state
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: '20px' }}>

      <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
        chloakcalc
      </Typography>

      {loading ? (
        <Typography sx={{ color: 'green' }}>Loading price...</Typography>
      ) : (
        <Typography sx={{ color: 'black', fontSize: '1.5rem' }}>
          Price: ${price}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
        onClick={handleCheckout}
        disabled={checkoutLoading} // Disable button while loading
      >
        {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
      </Button>
    </Box>
  );
};

export default Home;
