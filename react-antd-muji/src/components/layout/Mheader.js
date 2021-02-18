import React from 'react'
import { Link, useHistory} from 'react-router-dom'


import { Layout } from 'antd';
import { Input, Row, Col  } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Search } = Input; 


export default props => {
  const history = useHistory()
  const clickHandle = ()=>{
    const token = localStorage.getItem('token')
    console.log("token",token);
    if(!token){
      console.log("token", token);
      history.push('/login')
    }else{
      history.push('/my')
    }
  }
  return (
    <Header >
      <Row align='middle'>
        <Col span={10}>
          
          <div className='logo' onClick={()=>history.push('/')}></div>
        </Col>
        <Col span={6} offset={3}>
          <div className='search'>
            <Search placeholder="输入商品名" style={{ width: 400,lineHeight:80 }} size="large" />
          </div>
        </Col>
        <Col span={1} offset={2} >
          <span style={{ display: 'block', textAlign: "right",width:'82px' }}>
          
            <ShoppingCartOutlined style={{ fontSize: 32, cursor: 'pointer' }} onClick={() => history.push('/cart')}/>
        
          </span>
        </Col>
        <Col span={1} offset={1} >
          <span style={{display:'block',textAlign:"right"}}>
              <UserOutlined 
                style={{ fontSize: 28, cursor: 'pointer' }}
                onClick={() => clickHandle()}
              />
          </span>
        </Col>
      </Row>
    </Header>
  )
}