import React, { useState, useEffect } from 'react';
import axiosInstance from './axios/Axios' // 或者 import axios from 'axios';
import { Outlet} from 'react-router-dom';
import Navigation from './Navigation/Navigation'; // 确保你有一个 Navigation 组件

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error2, setError2] = useState(null);


  useEffect(() => {
    // 使用 Axios 获取数据
    axiosInstance.get('/depts') // 替换成你的 API 路径
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError2(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error2) return <p>Error: {error2.message}</p>;


  return (
    <>
    <div>
      <Navigation />
      <Outlet /> {/* 用于渲染嵌套路由的内容 */}
    </div>
   <h1>Data from Server</h1>
    <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Create Time</th>
            <th>Update Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.department}</td>
              <td>{item.createTime}</td>
              <td>{item.updateTime}</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </>
  )
}

export default App
