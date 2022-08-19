import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FullPie from './pages/FullPie';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pie/:id" element={<FullPie />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
