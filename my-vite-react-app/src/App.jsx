import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/home page/Navigation';
import Carousel from './components/home page/Carousel';
import FeaturedGames from './components/home page/FeaturedGames';
import Products from './components/home page/Products';
import UpcomingDiscount from './components/home page/UpcomingDiscount';
import HotSales from './components/home page/HotSales';
import FeaturedFirstRun from './components/home page/FeaturedFirstRun';
import Subscription from './components/home page/Subscription';
import Footer from './components/home page/Footer';

const App = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product-detail/${encodeURIComponent(product.name)}`);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto' }}>
      <Navigation />
      <div style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Carousel />
        <FeaturedGames />
        <UpcomingDiscount />
        <HotSales onProductClick={handleProductClick} />
        <Products onProductClick={handleProductClick} />
        <FeaturedFirstRun onProductClick={handleProductClick} />
      </div>
      <Subscription />
      <Footer />
    </div>
  );
};

export default App;