import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/CartPageCSS/cart.module.css';
import Navigation from '../home page/Navigation';
import Footer from '../home page/Footer';
import PaymentModal from '../payment page/PaymentModal'; // 引入 PaymentModal 组件

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const userId = localStorage.getItem('id'); // 从 localStorage 获取用户 ID

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(`/cart/user/${userId}`); // 使用 userId 获取购物车
        setCart(response.data.data);
      } catch (error) {
        console.error('获取购物车时出错:', error);
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
      console.error('移除购物车中的产品时出错:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.productInfo.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setSelectedProducts(cart.map(item => ({
      name: item.productInfo.name,
      image: item.productInfo.mainImage,
      amount: item.productInfo.price,
      quantity: item.quantity
    })));
    setTotalAmount(parseFloat(getTotalPrice()));
    setIsModalOpen(true);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
      <Navigation />
      <div className={styles.cartPageWrapper}>
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            <h3 style={{textAlign: 'center', fontSize: '2rem'}}>您的購物車是空的</h3>
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
    )
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
            <button onClick={handleCheckout} className={styles.checkoutButton}>結帳</button>
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
      {isModalOpen && (
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          products={selectedProducts}
          amount={totalAmount}
          cart={"cart"}
        />
      )}
    </div>
  );
};

export default CartPage;