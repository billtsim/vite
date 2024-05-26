import React from 'react';
import LoginedNavigation from '../Navigation/logined-navigation';
import { Outlet} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Dashboard from '../Navigation/Dashboard';

function Logined() {

  return (
    <div>
      <Dashboard/>
     
      {/* <LoginedNavigation /> */}
      
      <Outlet /> {/* 用于渲染嵌套路由的内容 */}
    </div>
  )
}

export default Logined;