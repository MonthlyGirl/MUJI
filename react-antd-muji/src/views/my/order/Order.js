import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderInfo from '../../order/OrderInfo';
import * as _ from '../My.config';
import '../My.scss';

import { fetchOrderList, fetchAllOrder } from '@/utils/api';

export default function Orders() {
	const history = useHistory();
	const [orderList, setOrderList] = useState([]);
	const [isLogin, changeLoginState] = useState(true);
	const [order_active, change_order_active] = useState(null);
	const handleClick = (key) => {
		change_order_active(key);
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
		let status = params === 'all' ? 0 : params === 'pending_payment' ? 1 : 2;
		fetchAllOrder().then((res) => {
			setOrderList(res);
		});
	};

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
				<OrderInfo data={orderList}  isTitleNone={true}/>
			</div>
		</div>
	);
}
