import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const FullPie = React.lazy(() => import(/* webpackChunkName: "FullPIe" */ './pages/FullPie'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

// Library Loadable Server-Side Rendering
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Loading...</div>,
});

function App() {
  return (
    <Suspense fallback={<div>Загрузка ....</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="pie/:id" element={<FullPie />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
