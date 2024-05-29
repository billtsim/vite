import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios/Axios'; // 确保你有 axiosInstance 配置文件
import styles from '../CSS/FeaturedFirstRun.module.css';

const FeaturedFirstRun = ({ onProductClick }) => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

//   useEffect(() => {
//     axiosInstance.get('/api/featured-first-run')
//       .then(response => {
//         console.log(response.data);
//         setFeaturedProducts(response.data.data.rows); // 假设服务器返回的数据是一个数组
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err);
//         setLoading(false);
//       });
//   }, []);

const  featuredProducts = [
    {
      "id": 1,
      "name": "Nike Air Max 97",
      "description": "男子運動鞋",
      "price": 1199,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 2,
      "name": "Nike Air Force 1 '07",
      "description": "女子運動鞋",
      "price": 799,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 3,
      "name": "Nike Sportswear Club",
      "description": "男子長褲",
      "price": 319,
      "originalPrice": 399,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 4,
      "name": "Nike Air Max 270",
      "description": "男子運動鞋",
      "price": 999,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 5,
      "name": "Nike Air Zoom Pegasus",
      "description": "女子運動鞋",
      "price": 899,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 6,
      "name": "Nike Air Zoom Pegasus",
      "description": "女子運動鞋",
      "price": 899,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 7,
      "name": "Nike Air Zoom Pegasus",
      "description": "女子運動鞋",
      "price": 899,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 8,
      "name": "Nike Air Zoom Pegasus",
      "description": "女子運動鞋",
      "price": 899,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 9,
      "name": "Nike Air Zoom Pegasus",
      "description": "女子運動鞋",
      "price": 899,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
    {
      "id": 10,
      "name": "Nike Air Zoom Pegasus",
      "description": "女子運動鞋",
      "price": 899,
      "imageUrl": "https://via.placeholder.com/300x300"
    },
  ]

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(featuredProducts.length / itemsPerPage) - 1));
  };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

  const startIndex = currentPage * itemsPerPage;
  const selectedProducts = featuredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.featuredFirstRunContainer}>
      <div className={styles.header}>
        <h2>Featured from Epic First Run</h2>
        <div className={styles.navigationButtons}>
          <button onClick={handlePreviousPage} disabled={currentPage === 0}>&lt;</button>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(featuredProducts.length / itemsPerPage) - 1}>&gt;</button>
        </div>
      </div>
      <div className={styles.productsGrid}>
        {selectedProducts.map(product => (
          <div key={product.id} className={styles.productCard} onClick={() => onProductClick(product)}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <p className={styles.productCategory}>BASE GAME</p>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.priceSection}>
                {product.discount && <span className={styles.discountBadge}>{product.discount}</span>}
                <span className={styles.productPrice}>HK${product.price}</span>
                {product.originalPrice && <span className={styles.originalPrice}>HK${product.originalPrice}</span>}
              </div>
              {product.isFree && <p className={styles.freeBadge}>Free</p>}
              {product.firstRun && <p className={styles.firstRunBadge}>FIRST RUN</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFirstRun;