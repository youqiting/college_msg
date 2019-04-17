import axios from 'axios';

const baseUrl = 'http://localhost:8081';

// 创建axios实例
const service = axios.create({            
    baseURL: baseUrl,
    timeout: 30000 // 请求超时时间                                   
})

// 添加request拦截器 
service.interceptors.request.use(config => {         
  return config
}, error => {
  Promise.reject(error)
})

// 添加respone拦截器
service.interceptors.response.use(response => {
    let res={}; 
    res.status=response.status
    res.data=response.data;
    return res;
  }, error => {
    console.log(error)
  }

)
export default service;
