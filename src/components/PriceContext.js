import React, { createContext, useContext, useState } from 'react';

// Create the PriceContext
const PriceContext = createContext();

// Create a custom hook to use the PriceContext
export const usePrice = () => {
  return useContext(PriceContext);
};

// Create a provider to wrap your application
export const PriceProvider = ({ children }) => {
  const [price, setPrice] = useState(null);

  return (
    <PriceContext.Provider value={{ price, setPrice }}>
      {children}
    </PriceContext.Provider>
  );
};
