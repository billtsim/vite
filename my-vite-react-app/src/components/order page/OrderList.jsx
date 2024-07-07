import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios/Axios';
import styles from '../../CSS/orderPageCSS/OrderList.module.css';
import Navigation from '../home page/Navigation';
import Footer from '../home page/Footer';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/order/user/${userId}`);
        setOrders(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  const toggleOrderDetails = (orderNo) => {
    setExpandedOrders(prevState => ({
      ...prevState,
      [orderNo]: !prevState[orderNo]
    }));
  };

  const groupOrdersByOrderNo = (orders) => {
    return orders.reduce((groups, order) => {
      const { orderNo } = order;
      if (!groups[orderNo]) {
        groups[orderNo] = [];
      }
      groups[orderNo].push(order);
      return groups;
    }, {});
  };

  const groupedOrders = groupOrdersByOrderNo(orders);

  return (
    <div style={{ backgroundColor: 'black' }}>
      <Navigation />
      <div className={styles.orderListContainer}>
        <h1>Transactions</h1>
        {Object.keys(groupedOrders).length === 0 ? (
          <p>No orders found</p>
        ) : (
          Object.keys(groupedOrders).map(orderNo => (
            <div key={orderNo} className={styles.orderGroup}>
              <div className={styles.orderHeader}>
                <span>{new Date(groupedOrders[orderNo][0].payTime).toLocaleDateString()}</span>
                <span>{groupedOrders[orderNo][0].receiverName}</span>
                <span>{`HK$${groupedOrders[orderNo][0].totalPrice.toFixed(2)}`}</span>
                <span>{groupedOrders[orderNo][0].marketplace}</span>
                <span>{groupedOrders[orderNo][0].orderStatus}</span>
              </div>
              <div className={styles.orderSubHeader}>
                <div><strong>Order ID: </strong>{orderNo}</div>
                <button 
                  className={styles.toggleButton} 
                  onClick={() => toggleOrderDetails(orderNo)}
                >
                  ▼
                </button>
              </div>
              {expandedOrders[orderNo] && (
                <div className={styles.orderDetailsContainer}>
                  {groupedOrders[orderNo].map(order => (
                    <div key={order.id} className={styles.orderDetails}>
                      <div className={styles.orderItem}>
                        <img src={order.productInfo.mainImage} alt={order.productInfo.name} className={styles.productImage} />
                        <span className={styles.productName}>{order.productInfo.name}</span>
                        <span className={styles.productPrice}>{`HK$${order.productInfo.price.toFixed(2)}`}</span>
                      </div>
                    </div>
                  ))}
                  <div className={styles.orderTotal}>
                    <strong>Total: </strong>
                    {`HK$${groupedOrders[orderNo][0].totalPrice.toFixed(2)}`}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderList;