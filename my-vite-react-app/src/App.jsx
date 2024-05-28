import React, { useState, useEffect } from 'react';
import axiosInstance from './axios/Axios' // 或者 import axios from 'axios';
import { Outlet} from 'react-router-dom';
import Navigation from './Navigation/Navigation'; // 确保你有一个 Navigation 组件

function App() {
  


  


  return (
    <>
    <div>
      <Navigation />
      <Outlet /> {/* 用于渲染嵌套路由的内容 */}
    </div>
   
    </>
  )
}

export default App
