import  { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  useEffect(() => {
    const navigateToCheckout = async () => {
      // Check if a unique user ID exists in localStorage
      let userId = localStorage.getItem('userId');
      if (!userId) {
        // Generate a new UUID if not present
        userId = uuidv4();
        localStorage.setItem('userId', userId); // Save it in localStorage
      }

      try {
        // Fetch the price
        const priceResponse = await fetch(`https://chloakcalc.us/get-price/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        let price = 100; // Default price
        if (priceResponse.ok) {
          const priceData = await priceResponse.json();
          price = priceData.price;
        }

        // Make the checkout API call
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

          // Navigate to the checkout URL
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
      }
    };

    navigateToCheckout(); // Trigger navigation on load
  }, []);

  return null; // Do not render anything as the page redirects immediately
};

export default Home;
