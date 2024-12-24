import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

const Home = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

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
          console.error('Error fetching price');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", padding: "20px" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
        chloakcalc
      </Typography>

      {loading ? (
        <Typography sx={{ color: "green" }}>Loading price...</Typography>
      ) : price !== null ? (
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
