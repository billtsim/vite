import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import Navigation from '../home page/Navigation';
import styles from '../../CSS/productDetailPageCSS/ProductDetail.module.css';

const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const carouselRef = useRef(null);
  const prevArrowRef = useRef(null);
  const nextArrowRef = useRef(null);
  const thumbnailPrevArrowRef = useRef(null);
  const thumbnailNextArrowRef = useRef(null);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('id'); // 从 localStorage 获取用户 ID

  // Touch event state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product?name=${encodeURIComponent(name)}`);
        const productData = response.data.data.length ? response.data.data[0] : null;
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProduct();
  }, [name]);

  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const response = await axiosInstance.get(`/cart/CarItemsId/${userId}`);
          setCartItems(response.data.data);
        } catch (error) {
          console.error('Failed to fetch cart items:', error);
        }
      };

      fetchCartItems();
    }
  }, [userId]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
    }
  }, [activeIndex]);

  useEffect(() => {
    const imagesLength = product ? product.imageUrl.split(',').filter(img => img.trim() !== '').length : 0;
    if (thumbnailPrevArrowRef.current && thumbnailNextArrowRef.current) {
      if (thumbnailIndex === 0) {
        thumbnailPrevArrowRef.current.style.display = 'none';
      } else {
        thumbnailPrevArrowRef.current.style.display = 'flex';
      }

      if ((thumbnailIndex + 1) * 4 >= imagesLength) {
        thumbnailNextArrowRef.current.style.display = 'none';
      } else {
        thumbnailNextArrowRef.current.style.display = 'flex';
      }
    }
  }, [product, thumbnailIndex]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    setThumbnailIndex(Math.floor(index / 4));
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + product.imageUrl.split(',').length) % product.imageUrl.split(',').length;
      setThumbnailIndex(Math.floor(newIndex / 4));
      return newIndex;
    });
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % product.imageUrl.split(',').length;
      setThumbnailIndex(Math.floor(newIndex / 4));
      return newIndex;
    });
  };

  const handleThumbnailPrevClick = () => {
    setThumbnailIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleThumbnailNextClick = () => {
    setThumbnailIndex((prevIndex) => Math.min(prevIndex + 1, Math.floor(product.imageUrl.split(',').length / 4)));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNextClick();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevClick();
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      setMessage('请先登录');
      return;
    }

    try {
      const response = await axiosInstance.post('/cart/add', {
        userId: userId, // 使用 localStorage 中的 userId
        productId: product.id
      });
      setMessage('成功加入购物车');
      setCartItems([...cartItems, { productId: product.id }]);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setMessage('加入购物车失败');
    }
  };

  if (!product) return <div>Loading...</div>;

  const images = product.imageUrl.split(',').filter(img => img.trim() !== '');
  const displayedThumbnails = images.slice(thumbnailIndex * 4, (thumbnailIndex + 1) * 4);

  const isProductInCart = cartItems.includes(product.id);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <div className={styles.productDetailContainer}>
        <div className={styles.productLeft}>
          <div
            className={styles.carouselContainer}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.carouselMain} ref={carouselRef}>
              {images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Product ${index}`} 
                  className={styles.carouselImage} 
                />
              ))}
            </div>
            <div id="prevArrow" ref={prevArrowRef} className={styles.arrow} onClick={handlePrevClick}>&#10094;</div>
            <div id="nextArrow" ref={nextArrowRef} className={styles.arrow2} onClick={handleNextClick}>&#10095;</div>
            <div className={styles.carouselThumbnails}>
              <div ref={thumbnailPrevArrowRef} className={styles.thumbnailArrow} onClick={handleThumbnailPrevClick}>&#10094;</div>
              
                {displayedThumbnails.map((img, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbnailItem} ${thumbnailIndex * 4 + index === activeIndex ? styles.active : ''}`}
                    onClick={() => handleThumbnailClick(thumbnailIndex * 4 + index)}
                  >
                    <img src={img} alt={`Thumbnail ${thumbnailIndex * 4 + index}`} className={styles.thumbnailImage} />
                  </div>
                ))}
              
              <div ref={thumbnailNextArrowRef} className={styles.thumbnailArrow} onClick={handleThumbnailNextClick}>&#10095;</div>
            </div>
          </div>
          <div className={styles.productDescriptionContainer}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productCategories}>
              <strong>Categories: </strong>{product.categories}
            </div>
            <div className={styles.requirements}>
              <h3>系统需求</h3>
              <div className={styles.requirementsSection}>
                <div className={styles.requirementsColumn}>
                  <h4>最低</h4>
                  <p><strong>作業系統:</strong> {product.minRequirements.os}</p>
                  <p><strong>處理器:</strong> {product.minRequirements.processor}</p>
                  <p><strong>記憶體:</strong> {product.minRequirements.memory}</p>
                  <p><strong>儲存空間:</strong> {product.minRequirements.storage}</p>
                  <p><strong>DirectX:</strong> {product.minRequirements.directX}</p>
                  <p><strong>顯示卡:</strong> {product.minRequirements.graphics}</p>
                  <p><strong>網路:</strong> {product.minRequirements.network}</p>
                </div>
                <div className={styles.requirementsColumn}>
                  <h4>建議</h4>
                  <p><strong>作業系統:</strong> {product.recRequirements.os}</p>
                  <p><strong>處理器:</strong> {product.recRequirements.processor}</p>
                  <p><strong>記憶體:</strong> {product.recRequirements.memory}</p>
                  <p><strong>儲存空間:</strong> {product.recRequirements.storage}</p>
                  <p><strong>DirectX:</strong> {product.recRequirements.directX}</p>
                  <p><strong>顯示卡:</strong> {product.recRequirements.graphics}</p>
                  <p><strong>網路:</strong> {product.recRequirements.network}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productRight}>
          <div className={styles.productInfoContainer}>
            <p className={styles.productPrice}>HK${product.price}</p>
            <button className={styles.purchaseButton}>立即购买</button>
            {isProductInCart ? (<button className={styles.addToCartButton} >
                <Link to="/cart" className={styles.viewCartButton} style={{ color: 'white' }}>檢視購物車</Link></button>
              ) : (
                <button className={styles.addToCartButton} onClick={handleAddToCart}>加入购物车</button>
              )}
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <a href="#">创作者支持</a>
            <a href="#">玩家内容政策</a>
            <a href="#">在线服务</a>
            <a href="#">在 Epic Games 上分发</a>
            <a href="#">用户体验研究</a>
            <a href="#">社区守则</a>
            <a href="#">招聘站点</a>
            <a href="#">商业授权用户许可协议</a>
            <a href="#">Epic Newsroom</a>
          </div>
          <div className={styles.footerGames}>
            <strong>Epic Games 出品</strong>
            <div>
              <a href="#">《Battle Breakers》</a>
              <a href="#">《Fortnite》</a>
              <a href="#">《Infinity Blade》</a>
              <a href="#">《Robo Recall》</a>
              <a href="#">《Shadow Complex》</a>
              <a href="#">《Unreal Tournament》</a>
            </div>
          </div>
          <div className={styles.footerLegal}>
            <p>© 2024, Epic Games, Inc. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;