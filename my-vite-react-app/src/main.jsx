import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './router/About.jsx';
import Login from './components/login page/Login.jsx';
import App from './App.jsx';
import GlobalStyle from './globalStyles.js';
import Logined from './router/logined.jsx';
import ProductDetail from './components/product detail page/ProductDetail.jsx';
import AllProduct from './components/all product page/AllProduct.jsx';
import SignUp from './components/login page/SignUp.jsx';
import ForgotPassword from './components/login page/ForgotPassword.jsx';
import ResetPassword from './components/login page/ResetPassword.jsx';
import UserProfile from './components/user management page/UserProfile.jsx';
import ExceptionPage from './components/exception handler page/exception.jsx';
import CartPage from './components/cart page/Cart.jsx';
import { UserProvider } from './context/UserContext.jsx';
import PaymentResult from './components/payment page/PaymentResult.jsx';
import OrderList from './components/order page/OrderList.jsx';
import GameLibrary from './components/game library page/GameLibrary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserProvider>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* 主页显示 App 组件 */}
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="logined" element={<Logined /> } />
        <Route path="product-detail/:name" element={<ProductDetail />} /> {/* 用游戏名字作为路径参数 */}
        <Route path="all-product" element={<AllProduct />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="/exception" element={<ExceptionPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/game-library" element={<GameLibrary />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  
);