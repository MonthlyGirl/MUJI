import React from 'react';
import './style.scss';
import { Table } from 'antd';

export default (props) => {
	const columns = [
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
	];
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
							columns={columns}
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
