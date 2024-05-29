// import React, { useState, useEffect } from 'react';
// import styles from '../CSS/Products.module.css';

// const Products = ({ onProductClick }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // 模拟从服务器获取产品数据
//     const fetchProducts = () => {
//       const productsData = [
//         {
//           id: 1,
//           name: "Nike Air Force 1 '07",
//           description: "男子運動鞋",
//           price: 503,
//           originalPrice: 799,
//           imageUrl: "https://via.placeholder.com/150"
//         },
//         {
//           id: 2,
//           name: "Nike Pegasus Trail 5",
//           description: "男子越野跑步鞋",
//           price: 839,
//           originalPrice: 1049,
//           imageUrl: "https://via.placeholder.com/150"
//         },
//         // 添加更多产品数据
//       ];
//       setProducts(productsData);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className={styles.productsContainer}>
//       <h1>年中優惠 必買精選</h1>
//       <div className={styles.productsGrid}>
//         {products.map(product => (
//           <div key={product.id} className={styles.productCard}>
//             <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p className={styles.productPrice}>HK${product.price} <span className={styles.originalPrice}>HK${product.originalPrice}</span></p>
//             <button className={styles.button} onClick={() => onProductClick(product)}>View Details</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

import React from 'react';
import styles from '../CSS/Products.module.css';

const Products = ({ onProductClick }) => {
  const products = [
    {
      id: 1,
      name: "EA SPORTS FC™ 24 Standard Edition",
      category: "BASE GAME",
      oldPrice: 469,
      price: 93.8,
      discount: "-80%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 2,
      name: "Alan Wake 2",
      category: "BASE GAME",
      oldPrice: 350,
      price: 280,
      discount: "-20%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 3,
      name: "Red Dead Redemption 2",
      category: "BASE GAME",
      oldPrice: 468,
      price: 187.2,
      discount: "-60%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 4,
      name: "Grand Theft Auto V: Premium Edition",
      category: "BASE GAME",
      oldPrice: 246,
      price: 123,
      discount: "-50%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 5,
      name: "Dead Island 2",
      category: "BASE GAME",
      oldPrice: 448.99,
      price: 224.49,
      discount: "-50%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    {
      id: 6,
      name: "Cyberpunk 2077: Ultimate Edition",
      category: "EDITION",
      oldPrice: 529,
      price: 354.43,
      discount: "-33%",
      imageUrl: "https://via.placeholder.com/200x300"
    },
    // 添加更多产品数据
  ];

  return (
    <div className={styles.productsContainer}>
      <h2>MEGA Sale Spotlight</h2>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard} onClick={() => onProductClick(product)}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <div className={styles.pricing}>
                {product.discount && <span className={styles.discount}>{product.discount}</span>}
                <span className={product.discount ? styles.oldPrice : styles.price}>HK${product.oldPrice}</span>
                {product.discount && <span className={styles.price}>HK${product.price}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;