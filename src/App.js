import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './hompage';
import Privacy from './components/privacy';
import Private from './components/checkout';
import Terms from './components/terms';

import { PriceProvider } from './components/PriceContext'; // Import the PriceProvider
const App = () => (
  <PriceProvider>
  <Routes>

   <Route path="/" element={<Home />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/checkout" element={<Private/>} />
    <Route path="/terms" element={<Terms/>} />
  </Routes> 
  </PriceProvider>
);

export default App;
