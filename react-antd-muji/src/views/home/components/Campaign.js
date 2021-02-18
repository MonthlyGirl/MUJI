import React from 'react'

import { Card } from 'antd';
const { Meta } = Card;

export default props =>{
  
  const camArr =[
    {
      id:1,
      name:'旅行包',
      imgURL:'/image/t2.jpg'
    },
    {
      id: 2,
      name: '轻量羽绒',
      imgURL: '/image/t1.jpg'
    },
    {
      id: 3,
      name: '商品部件',
      imgURL: '/image/t3.jpg'
    },
    {
      id: 4,
      name: '肌肤护理',
      imgURL: '/image/t4.jpg'
    }
  ]
  const renderCamArr =()=>{
   return camArr.map(ele=>(
     <div className='m-camCard' key={ele.id}>
      <Card
        hoverable
        cover={<img alt="example" src={ele.imgURL} 
          style={{width: '280px',height: '175px' }}
      />}
      >
        <Meta title={ele.name} style={{height:25}}/>
      </Card>
     </div>
   ))
  }

  return(
    <div className='m-campaign'>
      {renderCamArr()}
    </div>
  )
}