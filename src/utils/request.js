/*
 * 封装 axios 请求
 */
import axios from "axios"
import { Toast } from 'antd-mobile'

const request = axios.create({
  baseURL:'https://api-haoke-web.itheima.net/'   //服务器地址
})

request.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    // 开启loading提示
    Toast.loading('Loading...', 0, () => {
      console.log('Load complete !!!');
    })
    // Do something before request is sent
    let token = sessionStorage.getItem("authToken")   //获取token
    config.headers.authToken = token                     //统一设置token
    // config.headers['Content-Type'] = 'application/json'                    
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function(response) {
    // 关闭loading提示
    Toast.hide()
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function(error) {
    // 关闭loading提示
    Toast.hide()
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
)

export default request