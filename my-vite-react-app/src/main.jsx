

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './router/About.jsx';
import Login from './Login.jsx';
import App from './App.jsx';
import { Navigate } from 'react-router-dom';
import GlobalStyle from './globalStyles.js';
import Logined from './router/logined.jsx';

let token = localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={ <App /> } /> {/* 主页显示 App 组件 */}
        <Route path="about" element={ <About /> } />
        <Route path="login" element={!token ? <Login /> : <Navigate to="logined" />} />
        <Route path="logined" element={ <Logined/> } />
      </Routes>
    </Router>
  </React.StrictMode>
);