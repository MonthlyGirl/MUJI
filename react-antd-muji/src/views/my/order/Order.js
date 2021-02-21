import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderInfo from '@/views/order/OrderInfo';
import * as _ from '../My.config';
import '../My.scss';

import { fetchOrderList, fetchAllOrder, fetchRecieve } from '@/utils/api';
import { message } from 'antd';

export default function Orders() {
	const history = useHistory();
	const [orderList, setOrderList] = useState([]);
	const [isLogin, changeLoginState] = useState(true);
	const [order_active, change_order_active] = useState(null);
	const [bol,setBol] = useState(false)
	
	const handleClick = (key) => {
		change_order_active(key);
		console.log('key: ', key);

		getOrderList(key);
	};
	useEffect(() => {
		//这里根据参数传对应的状态
		getOrderList();
	}, []);

	useEffect(() => {
		//默认选中状态
		change_order_active(
			window.location.href.replace('http://localhost:8809/#', '')
		);
	}, []);

	const getOrderList = (path = window.location.href) => {
		let params = path.split('?tab=')[1];
		setBol(false)
		switch (params){
			case 'all':
				return fetchAllOrder({}).then((res) => {
					setOrderList(res);
				});
			case 'pending_payment':
				return fetchOrderList({ status:1}).then(res => {
					setOrderList(res);
				})
			default:
				return fetchOrderList({ status: 2 }).then(res => {
					setOrderList(res);
					setBol(true)
				})
		}
	};

	const handleRecieve=(data)=>{
		fetchRecieve({id:data._id}).then(res=>{
			message.success('收货成功!',1).then(()=>{
				fetchOrderList({ status: 2 }).then(res => {
					setOrderList(res);
				})
			})
		})
	}
	
	return (
		<div className="order">
			{/* 菜单 */}
			<div className="card">
				<p className="title">我的订单</p>
				<div className="order_info">
					{_.ICONS.map((item) => (
						<div
							key={item.key}
							className={`order_item ${
								order_active === item.key ? 'actived' : ''
							}`}
							onClick={() => handleClick(item.key)}
						>
							<span>{item.icon}</span>
							<p>{item.title}</p>
						</div>
					))}
				</div>
			</div>
			{/* 订单 */}
			<div style={{ width: '85%', margin: '0 auto' }}>
				<OrderInfo 
					data={orderList} 
					isTitleNone={true} 
					handleRecieve={handleRecieve} 
					showRecirveBtn={bol}
				/>
			</div>
		</div>
	);
}
