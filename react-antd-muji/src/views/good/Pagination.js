import React from 'react'
import { Pagination } from 'antd';

export default props=>{
  return(
    <div>
      <Pagination
        defaultCurrent={1}
        total={props.total}
        onChange={(page) => props.onChange(page)}
        onShowSizeChange={(cur, size) => props.onPagesize(size)}
        pageSizeOptions={["5", "12", "16"]}
        showSizeChanger={true}
        current={props.page}
      />
    </div>
  )
}