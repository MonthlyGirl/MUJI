import React from 'react'

import { Layout } from 'antd';
const { Footer } = Layout;

export default props=>{
  return(
    <div className='m-footer'>
      <Footer>
        <div className='m-goobelFooter'>
          <div style={{color:'#ffff'}}>
            中国
          </div>
          <div>
            <span>© Ryohin Keikaku Co., Ltd.</span>
            <span>© 无印良品（上海）商业有限公司</span>
            <span>地址：上海市静安区南京西路1601号35楼3501-3508室</span>
          </div>
          <div>
            <span>
              营业执照
            </span>
            <span>食品经营许可证</span>
            <span>出版物经营许可证</span>
          </div>
          <div>
            <span>沪ICP备08018225号</span>
            <span>沪公网安备 31010602002779号</span>
            <span>上海工商</span>
          </div>
        </div>
      </Footer>
    </div>
  )
}