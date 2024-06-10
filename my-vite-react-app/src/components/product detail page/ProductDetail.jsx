import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/Axios';
import Navigation from '../home page/Navigation';
import styles from '../../CSS/productDetailPageCSS/ProductDetail.module.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 导入样式

const ProductDetail = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product?name=${encodeURIComponent(name)}`);
        const productData = response.data.data.length ? response.data.data[0] : null; // 获取数组中的第一个产品
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProduct();
  }, [name]);

  if (!product) return <div>Loading...</div>;

  // 用 filter 过滤掉空字符串
  const images = product.imageUrl.split(',').filter(img => img.trim() !== '');

  // 检查并解析系统需求数据
  const minRequirements = typeof product.minRequirements === 'string' ? JSON.parse(product.minRequirements) : product.minRequirements;
  const recRequirements = typeof product.recRequirements === 'string' ? JSON.parse(product.recRequirements) : product.recRequirements;

  return (
    <div style={{ backgroundColor: 'black', color: 'white', width: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <div className={styles.productDetailContainer}>
        <div className={styles.productLeft}>
          <div className={styles.productImageContainer}>
            <Carousel showThumbs={false} autoPlay infiniteLoop>
              {images.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`Product ${index}`} className={styles.productImage} />
                </div>
              ))}
            </Carousel>
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
                  <p><strong>作業系統:</strong> {minRequirements.os}</p>
                  <p><strong>作業系統:</strong> {minRequirements.processor}</p>
                  <p><strong>處理器:</strong> {minRequirements.memory}</p>
                  <p><strong>儲存空間:</strong> {minRequirements.storage}</p>
                  <p><strong>DirectX:</strong> {minRequirements.directX}</p>
                  <p><strong>顯示卡:</strong> {minRequirements.graphics}</p>
                  <p><strong>網路:</strong> {minRequirements.network}</p>
                </div>
                <div className={styles.requirementsColumn}>
                  <h4>建議</h4>
                  <p><strong>作業系統:</strong> {recRequirements.os}</p>
                  <p><strong>處理器:</strong> {recRequirements.processor}</p>
                  <p><strong>記憶體:</strong> {recRequirements.memory}</p>
                  <p><strong>儲存空間:</strong> {recRequirements.storage}</p>
                  <p><strong>DirectX:</strong> {recRequirements.directX}</p>
                  <p><strong>顯示卡:</strong> {recRequirements.graphics}</p>
                  <p><strong>網路:</strong> {recRequirements.network}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.productRight}>
          <div className={styles.productInfoContainer}>
            <p className={styles.productPrice}>HK${product.price}</p>
            <button className={styles.purchaseButton}>立即购买</button>
            <button className={styles.addToCartButton}>加入购物车</button>
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