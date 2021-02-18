import  React from 'react'
import './style.scss'

import { Layout } from 'antd';
import Mheader from './Mheader'
import Mcontent from './Mcontent'
import Mfooter from './Mfooter'

export default (props)=>{
  return(
    <div className='muji-layout'>
      <Layout>
        <div className='m-header'>
          <Mheader/>
        </div>
        <div className='m-content'>
          <Mcontent/>
        </div>
        <div className='m-footer'>
          <Mfooter />
        </div>
      </Layout>
    
    </div>
  )
}