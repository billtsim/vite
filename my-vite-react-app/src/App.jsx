import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/home page/Navigation';
import Carousel from './components/home page/Carousel';
import FeaturedGames from './components/home page/FeaturedGames';
import NewProducts from './components/home page/NewProducts';
import UpcomingDiscount from './components/home page/UpcomingDiscount';
import HotSales from './components/home page/HotSales';
import FreeGame from './components/home page/FreeGame';
import Subscription from './components/home page/Subscription';
import Footer from './components/home page/Footer';

const App = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product-detail/${encodeURIComponent(product.name)}`);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto'}}>
      <Navigation />
      <div style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Carousel />
        <FeaturedGames onProductClick={handleProductClick}/>
        <UpcomingDiscount />
        <HotSales onProductClick={handleProductClick} />
        <NewProducts onProductClick={handleProductClick} />
        <FreeGame onProductClick={handleProductClick} />
      </div>
      <Subscription />
      <Footer />
    </div>
  );
};

export default App;