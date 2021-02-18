import axios from 'axios'
import { message } from 'antd'

const baseURL = 'http://localhost:8809'

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['Authorization'] = localStorage.getItem('token')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    let res = null
    // console.log('响应拦截', response.data)
    if(response.data) {
      // console.log('response.data: ', response.data);
      // 过滤node服务的数据
      switch (Number(response.data.err)) {
        case 0:
          res = response.data.data
          console.log('res: ', response.data);
          break;
        case -1:
          message.error(response.data.msg)
          window.location.href = '/#/login'
          break;
        default:
          message.error(response.data.msg)
          break;
      }
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
