import React, { useEffect } from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import Dashboard from '.././components/management page/Dashboard'

function Logined() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect (( ) => {
    if (!token) {
      // 未登录，跳转到登录页面
       //history.push('/login');
       navigate('/login', { replace: true });
    }
  },[token, navigate])

  return (
    <div>
      <Dashboard/>
      {/* <LoginedNavigation /> */}
      <Outlet /> {/* 用于渲染嵌套路由的内容 */}
    </div>
  )
}

export default Logined;