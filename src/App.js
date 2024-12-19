import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './hompage';
import About from './components/about';
import Private from './components/checkout';
import Terms from './components/terms';
const App = () => (
  <Routes>

   <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/checkout" element={<Private/>} />
    <Route path="/terms" element={<Terms/>} />
  </Routes> 
);

export default App;
