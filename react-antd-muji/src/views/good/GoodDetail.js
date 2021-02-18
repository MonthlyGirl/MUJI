import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

import { 
  Card, 
  Row, 
  Col, 
  Button, 
  InputNumber, 
  message,
} from 'antd';

import './Good.scss'
import { fetchGoodDetail, fetchCartAdd } from '@/utils/api'


export default props=>{
  const id = useParams().id
  const [list,setList] = useState([])
  const [num, setNum] = useState(1)
  
  useEffect(()=>{
    fetchGoodDetail({id}).then((res)=>{
      console.log('res: ', res);
      setList(res)
    })
    return undefined
  },[])
  
  const addCartHandle =()=>{
    fetchCartAdd({ good_id: id,num }).then(() => {
      message.success('成功加入购物车');
    })
  }
  

  const numChangeHandle = (value)=>{
    console.log('value: ', value);
    setNum(value)

  }
  const renderList = ()=>{
    return list && list.map(ele=>(
      <div className='m-goodDetail' key={ele._id}>
        <Row>
          <Col span={12}>
            <Card
              style={{ width: 518 }}
              cover={<img alt="example" src={ele.img} />}
            >
              <div className='deImg'>
                <span className='delt'> &lt; </span>
                <div>
                  <img src={ele.img} />
                </div>
                <span className='degt'> &gt; </span>
              </div>
            </Card>
          </Col>
          <div className='m-components-title'>
            <h1>{ele.name}</h1>
            <div className='m-item'>
              <span>价格</span>
              <b>￥</b><i>{ele.price}</i>
            </div>
            { 
              ele.quality && <div className='m-item'>
                <span> 尺码</span>
                <span className='detailBox'>{ele.quality}</span>
              </div>
            }
            <div className='m-item'>
              <span>颜色</span>
              <span className='detailBox' >详见商品包装</span>
            </div>
            <div className='m-item'>
              <span>数量</span>
              <span>
                <InputNumber 
                  min={1} 
                  max={10} 
                  defaultValue={1}  
                  size='large' 
                  value={num} 
                  onChange={ numChangeHandle}
                />
              </span>
            </div>
            <div>
              <Button style={{ marginRight: 20, border: "1px solid #000", color: '#000' }} size='large'>立即购买</Button>
              <Button 
                type="primary" 
                size='large' 
                style={{ background: "#000", border: 0 }}
                onClick={addCartHandle}
                
              >
                加入购物车
              </Button>
            </div>

          </div>
        </Row>
        <Row>
          <div className='part-detail-page'>
            <div className='part-detail-page-top'>详情</div>
            <div className='detail-content'>
              <h1>{ele.name}</h1>
              <div className='detail-info'>基本信息</div>
              <div className='page-details-material'>
                尺
                <span 
                 style={{ display: 'inline-block', width: ' 2em' }}></span> 
                 码：{ele.quality}
              </div>
              <div className='page-details-material'>
                颜  
                <span 
                style={{ display: 'inline-block', width: ' 2em' }}></span>
                色：详见商品包装
              </div>
              <div className='part-detail-page-images'>
                <img src={ele.detail_01}  />
                <img src={ele.detail_02} />
              </div>
              <div className='part-detail-page-images'>
                <img src="https://mujipywebblob.blob.core.chinacloudapi.cn/oms307/0b1692e7-ff80-468f-8c60-016f39916059.png" />
              </div>
            </div>
          </div>
        </Row>
      </div>
    ))
  }
  return(
    <div>
      {renderList()}
    </div>
  )
}