import React from 'react'

import './style.scss'

//通知栏
export default props=>{
  return(
    <div className='m-notice'>
      <span className='left'>店铺公告</span>
      <span className='center'></span>
      <span className='right'>疫情影响及2021春节期间物流延迟发货、客服时间调整通知 </span>
    </div>
  )
}