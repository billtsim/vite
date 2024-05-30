import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Carousel from './components/Carousel';
import FeaturedGames from './components/FeaturedGames'; /* 引入 FeaturedGames 组件 */
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import UpcomingDiscount from './components/UpcomingDiscount';
import HotSales from './components/HotSales';
import FeaturedFirstRun from './components/FeaturedFirstRun'; /* 引入 FeaturedFirstRun 组件 */
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
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto'}}>
      <Navigation />
      <div style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' , }}>
        <Carousel />
        <FeaturedGames />
        <UpcomingDiscount /> {/* 添加即将优惠组件 */}
         {/* 添加 FeaturedGames 组件 */}
        <HotSales onProductClick={handleProductClick} /> {/* 添加热卖产品组件 */}
        <Products onProductClick={handleProductClick} /> {/* 使用更新后的产品展示组件 */}
        <FeaturedFirstRun onProductClick={handleProductClick} /> {/* 添加 FeaturedFirstRun 组件 */}
      </div>
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={handleCloseProductDetail} />}
      <Subscription /> {/* 添加订阅组件 */}
      <Footer /> {/* 添加底部导航栏组件 */}
    </div>
  );
};

export default App;