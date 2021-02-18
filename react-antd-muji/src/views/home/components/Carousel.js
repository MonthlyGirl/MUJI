import React from 'react'


import { Carousel } from 'antd';

import $img from '@/utils/img'


//轮播图
export default props=>{
  const contentStyle = {
    height: '750px',
    color: '#fff',
    lineHeight: '750px',
    textAlign: 'center',
    background: '#364d79',
    width:'1200px'
  }

  return(
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img src="/image/banner1.jpg"/>
            {/* <img src={imgBanner.banner1} /> */}
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="/image/banner2.jpg" />
            {/* <img src={imgBanner.banner2}  /> */}
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="/image/banner3.jpg" />
            {/* <img src={imgBanner.banner3}  /> */}
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img src="/image/banner4.jpg" />
            {/* <img src={imgBanner.banner4}  /> */}
          </h3>
        </div>
      </Carousel>
    </div>
  )
}