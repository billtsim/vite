import React from 'react';
import { Outlet} from 'react-router-dom';
import Dashboard from '.././components/management page/Dashboard'

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