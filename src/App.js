import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
} from './pages';
// const Button = styled.button`
//   background: transparent;
//   border-radius: 3px;
//   border: 2px solid palevioletred;
//   color: palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
// `;
// const Container = styled.div`
//   background: red;
//   color: white;
//   border: 2px solid palevioletred;
//   .hero {
//     font-size: 4rem;
//   }
// `;

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<SingleProduct />} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
