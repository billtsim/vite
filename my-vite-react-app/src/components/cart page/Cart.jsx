import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/CartPageCSS/cart.module.css';
import Navigation from '../home page/Navigation';
import Footer from '../home page/Footer';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('id'); // 从 localStorage 获取用户 ID

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(`/cart/user/${userId}`); // 使用 userId 获取购物车
        setCart(response.data.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleRemove = async (productId) => {
    try {
      await axiosInstance.post('/cart/remove', null, { params: { userId, productId } });
      setCart(cart.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.productInfo.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.cart}>
      <Navigation />
      <div className={styles.cartPageWrapper}>
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div className={styles.cartItem} key={item.id}>
                <img src={item.productInfo.mainImage} alt={item.productInfo.name} className={styles.cartItemImage} />
                <div className={styles.cartItemDetails}>
                  <div className={styles.cartItemHeader}>
                    <div>
                      <div className={styles.cartItemName}>{item.productInfo.name}</div>
                    </div>
                  </div>
                  <div className={styles.cartItemActions}>
                    <button onClick={() => handleRemove(item.productId)} className={styles.cartItemRemoveButton}>移除</button>
                    <div className={styles.cartItemPriceInfo}>
                      {item.productInfo.originalPrice > 0 && (
                        <div className={styles.cartItemOriginalPrice}>HK${item.productInfo.originalPrice}</div>
                      )}
                      {item.productInfo.discount > 0 && (
                        <div className={styles.cartItemDiscount}>
                          -{(item.productInfo.discount * 100).toFixed(0)}%
                        </div>
                      )}
                      <div className={styles.cartItemPrice}>
                        {item.productInfo.price > 0 ? `HK$${item.productInfo.price}` : '免费'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartEmpty}></div>
          <div className={styles.cartSummary}>
            <h2>遊戲及應用程式摘要</h2>
            <p>价格: HK${getTotalPrice()}</p>
            <p>稅金於結帳時計算</p>
            <button className={styles.checkoutButton}>結帳</button>
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default CartPage;