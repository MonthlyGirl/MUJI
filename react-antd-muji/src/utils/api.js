import axios from './request'

//商品列表
export function fetchGoodList(params){
  return axios({
    url:'/api/v1/jd/good/list',
    method:'get',
    params
  })
}

//商品详情
export function fetchGoodDetail(params){
  return axios({
    url:'/api/v1/jd/good/detail',
    method:'get',
    params
  })
}

//购物车列表
export function fetchCartList(params){
  return axios({
    url:'/api/v1/jd/cart/list',
    method:'get',
    params
  })
}
//加入购物车
export function fetchCartAdd(data){
  return axios({
    url:'/api/v1/jd/cart/add',
    method:'post',
    data
  })
}
//改变购物车商品数量
export function fetchCartUpdate(data){
  return axios({
    url:'/api/v1/jd/cart/update',
    method:'post',
    data
  })
}
//登录
export function fetchLogin(data){
  return axios({
    url:'/api/v1/user/login',
    method:'post',
    data
  })
}

//注册
export function fetchRegister(data){
  return axios({
    url:'/api/v1/user/regist',
    method:"post",
    data
  })
}

//删除购物车中的商品
export function fetchGoodDel(params){
  return axios({
    url:'/api/v1/jd/cart/del',
    method:'get',
    params
  })
}

//提交购物车
export function fetchCartSumbit(data){
  return axios({
    url:'/api/v1/jd/cart/submit',
    method:'post',
    data
  })
}

//订单列表
export function fetchOrderList(params){
  return axios({
    url:'/api/v1/jd/orderList',
    method:'get',
    params
  })
}

//获取地址列表
export function fetchAddrList(params){
  return axios({
    url:'/api/v1/jd/addr/list',
    method:'get',
    params
  })
}

//新增或修改地址
export function fetchUpdAddr(data){
  return axios({
    url:'/api/v1/jd/upd/addr',
    method:'post',
    data
  })
}

//修改默认地址
export function fetchUpdDefaultAddr(params){
  return axios({
    url:'/api/v1/jd/updaddr/default',
    method:'get',
    params
  })
}

//删除地址
export function fetchDelAddr(params){
  return axios({
    url:'/api/v1/jd/del/addr',
    method:'get',
    params
  })
}

//获取默认地址
export function fetchDefaultAddr(params){
  return axios({
    url:'/api/v1/jd/addr/default',
    method:'get',
    params
  })
}

//提交订单
export function fetchSumbitOrder(data){
  return axios({
    url:'/api/v1/jd/order/submit',
    method:'post',
    data
  })
}

//获取全部订单
export function fetchAllOrder(params){
  return axios({
    url:'/api/v1/jd/orderAll',
    method:'get',
    params
  })
}

//修改密码
export function fetchUpdpsw(data){
  return axios({
    url:'/api/v1/jd/updpsw',
    method:'post',
    data
  })
}

//个人中心
export function fetchUserInfo(data){
  return axios({
    url:'/api/v1/jd/userInfo',
    method:'post',
    data
  })
}