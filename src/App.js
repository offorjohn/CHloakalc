import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './hompage';
import Privacy from './components/privacy';
import Private from './components/checkout';
import Terms from './components/terms';
import PrivacyPolicy from './components/privacy-policy';
import RefundPolicy from './components/refund-policy';
import ContactInformation from './components/cantact-information';
import TermsOfService from './components/terms-of-service';
import ShippingPolicy from './components/shoping-policy';


const App = () => (

  <Routes>

   <Route path="/" element={<Home />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path='/refund-policy' element={<RefundPolicy/>} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/checkout" element={<Private/>} />
    <Route path='/contact-information' element={<ContactInformation/>}/>
    <Route path='/terms-of-service' element={<TermsOfService/>}/>
    <Route path='/shoping-policy' element={<ShippingPolicy/>}/>
    <Route path="/terms" element={<Terms/>} />
  </Routes> 

);

export default App;
