import React, { useEffect,useState}from 'react';
import './style.scss';
import { Table, Button, Popconfirm, message  } from 'antd';

export default (props) => {
	
	let columns = [
		{
			title: '商品名称',
			dataIndex: 'name',
			render: (text, row) => (
				<div>
					<img src={row.img} style={{ width: 60, height: 60 }} />
					<p>{text}</p>
				</div>
			),
		},
		{
			title: '商品属性',
			dataIndex: 'quality',
			render: (text) => (
				<div>
					<p>尺码 : {text}</p>
					<p>颜色 : 详见商品包装</p>
				</div>
			),
		},
		{
			title: '数量',
			dataIndex: 'num',
			render: (text) => (
				<div>
					<span>{text}</span>
				</div>
			),
		},
		{
			title: '单价',
			dataIndex: 'price',
			render: (text) => (
				<div>
					<span>￥{text}</span>
				</div>
			),
		},
		{
			title: '状态',
			dataIndex: 'status',
			align:'center',
			render: (text) => (
				<div>
					{	Number(text) === 1 ? '待发货' : Number(text) === 2 ? '待收货':'订单已完成'}
				</div>
			),
		},
	];

	
	const addActionButton = () => {
		props.showRecirveBtn && columns.push({
			title: '操作',
			dataIndex: 'action',
			align:'center',
			render: (text, row) => (
				<Popconfirm
					title="是否确认收货?"
					onConfirm={() => props.handleRecieve(row)}
					okText="Yes"
					cancelText="No"
				>
					<Button type="primary">
						确认收货
					</Button>
				</Popconfirm>
			),
		})
		return columns
	}

	return (
		<div>
			<div className="m-frag-section">
				<div className="m-frag-section-hd">
					{
						props.isTitleNone ? '' : <div className="m-frag-section-title">订单信息</div>
					}
				</div>
				<div className="m-frag-section-bd">
					<div className="m-part-order-inner">
						<Table
							columns={addActionButton()}
							dataSource={props.data}
							pagination={false}
							rowKey="_id"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
