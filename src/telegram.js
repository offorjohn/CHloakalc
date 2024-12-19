import React from 'react';
import { Icon } from '@iconify/react';

import { Box } from '@mui/material';

export default function TelegramIcon() {
  return (
    <>
      {/* Add global styles for keyframes animation */}
      <style>
        {`
          @keyframes growShrink {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>

      {/* Floating WhatsApp icon component */}
      <Box
        component="a"
        href="https://wa.link/9ugrwz" // Replace with your WhatsApp link
        target="_blank"
        sx={{
          position: 'fixed',
          bottom: 10, // Distance from the bottom of the page
          right: 16, // Distance from the right of the page
          zIndex: 1000,
          backgroundColor: '#25D366', // WhatsApp's official color
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff', // Icon color
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Add a slight shadow for better visibility
          transition: 'all 0.3s ease',
          animation: 'growShrink 1s ease-in-out infinite', // Apply the grow and shrink animation
          '&:hover': {
            backgroundColor: '#20B954', // Darken the color on hover
            transform: 'scale(1.1)', // Slightly enlarge the icon on hover
          },
        }}
      >
        <Icon icon="mdi:whatsapp" width={30} style={{ fontWeight: 'bold' }} /> {/* Larger WhatsApp icon */}
      </Box>
    </>
  );
}
