import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';

const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='signin' element={<Signin />} />
    <Route path="/" element={<Signup />} />
  </Routes>
  </BrowserRouter>
  );
};

export default App;