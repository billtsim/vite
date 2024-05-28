import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Carousel from './components/Carousel';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import UpcomingDiscount from './components/UpcomingDiscount';
import HotSales from './components/HotSales';
import Subscription from './components/Subscription';
import Footer from './components/Footer';

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Carousel />
        <UpcomingDiscount /> {/* 添加即将优惠组件 */}
        <HotSales onProductClick={handleProductClick} /> {/* 添加热卖产品组件 */}
        <Products onProductClick={handleProductClick} /> {/* 产品展示组件 */}
      </div>
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={handleCloseProductDetail} />}
      <Subscription /> {/* 添加订阅组件 */}
      <Footer /> {/* 添加底部导航栏组件 */}
    </div>
  );
};

export default App;