import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  const [price, setPrice] = useState(null); // `price` for the state and `setPrice` to update it
  const [loading, setLoading] = useState(true);
  const userId = 'user123'; // Example userId

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://chloakcalc.us/get-price/${userId}`, {  // Change to 'get-price' endpoint
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setPrice(data.price); // Correctly update the `price`
        } else {
          console.error('Error fetching price');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [userId]);

  return (
    <Box sx={{ minHeight: "100vh", padding: "20px" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
      chloakcalc
      </Typography>
      
      {loading ? (
        <Typography sx={{ color: "grenn" }}>Loading price...</Typography>
      ) : price !== null ? ( // Check if price is not null before displaying
        <Typography sx={{ color: "black", fontSize: "1.5rem" }}>
          Price: ${price}
        </Typography>
      ) : (
        <Typography sx={{ color: "red" }}>
          Failed to load price.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
