import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Carousel from './components/Carousel';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <Navigation />
      <Carousel />
      <Routes>
        <Route path="/" element={<Products onProductClick={handleProductClick} />} />
        {/* 这里可以添加更多路由 */}
      </Routes>
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={handleCloseProductDetail} />}
    </div>
  );
};

export default App;
