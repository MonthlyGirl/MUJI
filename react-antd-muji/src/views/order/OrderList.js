import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { message, Select, Modal } from 'antd';
import {
	ExclamationCircleOutlined
} from '@ant-design/icons';
import OrderInfo from './OrderInfo';
import ConsigneeInfo from './ConsigneeInfo';
import './style.scss';
import { fetchOrderList, fetchSumbitOrder } from '@/utils/api';

const { Option } = Select;
const { confirm } = Modal;

export default (props) => {
	const [data, setData] = useState([]);
	const [addr,setAddr]  = useState(false)
	const [optionValue, setOptionValue] = useState('zfb')
	const history = useHistory()


	const handleChange = (value) => {
		setOptionValue(value)
	};

	useEffect(() => {
		let time = null
		time = setTimeout(() => {
			fetchOrderList({ status: 0 }).then((res) => {
				setData(res);
			});
		}, 200);

		return (()=>{
			clearTimeout(time)
		})
	}, []);

	//计算价钱
	const getTotal = () => {
		let total = null;
		data.map((ele) => {
			total += ele.price * ele.num;
		});
		return total;
	};

	const sumbitOrder = ()=>{
		let play = optionValue =='zfb'?'支付宝':'微信'
		let orders = ''
		if(!addr){
			message.error("暂无收收货地址,请添加收货地址")
		}else{
			confirm({
				title: `是否确认支付?`,
				icon: <ExclamationCircleOutlined />,
				content: (
					// 
					<div>
						<p>您将使用 <span style={{ color:'#24ABF2'}}>{play}</span> 支付 
						<span style={{ color:'#DC4C40'}}>{getTotal()}</span> 元
						</p>
					</div>
				),
				onOk() {
					data.map(ele => {
						orders += ';' + ele._id
					})
					fetchSumbitOrder({ orders }).then(() => {
						message.success('支付成功! 我们将尽快发货',1).then(() => {
							 history.push('/')
						})
					})
				},
			});
		}
	}
	const isAddr = (addrList)=>{
		if (addrList.length !=0){
			setAddr(true)
		}
	}

	return (
		<div className="m-orderList">
			{/* 地址 */}
			<div>
				<ConsigneeInfo onAddr={(value) => isAddr(value)} />
			</div>
			{/* 订单列表 */}
			<div>
				<OrderInfo data={data} />
			</div>
			{/* 支付 */}
			<div className="m-part-info-wrap">
				<div className="m-part-info-left"></div>
				<div className="m-part-info-right">
					<div className="m-part-info-row">
						<div className="m-part-info-label">配送方式：</div>
						<div className="m-part-info-value text">快递寄送 (京东￥0)</div>
					</div>
					<div className="m-part-info-row">
						<div className="m-part-info-label">支付方式：</div>
						<div className="m-part-info-dropdown">
							<Select
								value={optionValue}
								style={{ width: 220 }}
								size="middle"
								onChange={handleChange}
							>
								<Option value="zfb">支付宝支付</Option>
								<Option value="vx">微信支付</Option>
							</Select>
						</div>
					</div>
				</div>
			</div>
			<div className="m-part-total-amount">
				<span className="m-part-total-amount-single">1</span>
				<span className="m-part-total-amount-price">件商品，应付金额：</span>
				<span className="m-part-total-amount-total">￥{getTotal()}</span>
				<button onClick={() =>sumbitOrder()}>提交订单</button>
			</div>
		</div>
	);
};
