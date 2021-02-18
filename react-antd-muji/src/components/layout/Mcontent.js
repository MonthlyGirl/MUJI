import React from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Routes from '@/views/'

import { Layout } from 'antd';

const {  Content } = Layout;

export default props => {
  let res=[]
  const renderRoutes = ()=>{
    Routes.map(ele => {
      res.push(<Route key={ele.id} path={ele.path} component={ele.component}></Route>) 
      // if(ele.children){
      //   ele.children.map((item,index)=>{
      //     res.push(<Route key={index} path={item.path} component={item.component}></Route>)
      //   })
      // }
    })
    return res
  }

  return (
    <div className='m-main'>
      <Content>
        <Switch>
          {/* <Home/> */}
          {renderRoutes()}
          <Redirect from='/*' to='/'></Redirect>
        </Switch>
      </Content>
    </div>
  )
}