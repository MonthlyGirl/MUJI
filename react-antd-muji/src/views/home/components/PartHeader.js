import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'


export default props=>{
  const history = useHistory()
  return(
    <div className='m-partHead'>
      <span className='left'>{props.value}</span>
      <span className='right' onClick={() => history.push(props.path)}>查看更多</span>
    </div>
  )
}