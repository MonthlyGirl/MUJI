import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Table, Button, InputNumber, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './Cart.scss';
import {
	fetchCartList,
	fetchCartUpdate,
	fetchGoodDel,
	fetchCartSumbit,
} from '@/utils/api';

const { confirm } = Modal;

export default (props) => {
	const history = useHistory();
	// list
	const [data, setData] = useState([]);

	const [params, setParams] = useState({ id: '', num: '' });
	//选中数据id
	const [keys, setKeys] = useState([]);
	//选中list
	const [totalArr, setTotalArr] = useState([]);
	const [sum, setSum] = useState(0);

	//初始化调接口
	const [init, setInit] = useState(0);

	useEffect(() => {
		fetchCartList().then((res) => {
			setData(res);
		});
	}, [params, init]);

	const handleNumChange = (num, rowValue) => {
		params.id = rowValue._id;
		params.num = num;
		setParams(JSON.parse(JSON.stringify(params)));
		fetchCartUpdate(params);
		//重新计算total,更新一下totalArr里面的num即可
		let newTotalArr = [];
		//复选框选中时计算总价钱
		if (keys.length != 0) {
			newTotalArr = [
				...totalArr.filter((item) => item._id !== rowValue._id),
				{ ...rowValue, num },
			];
			//分别更新一下state的totalArr数据和总价
			setTotalArr(newTotalArr);
			getTotal(newTotalArr);
		}
	};

	const changeKeys = (key, row) => {
		setKeys(key);
		setTotalArr(JSON.parse(JSON.stringify(row)));
		getTotal(row);
	};

	let total = null;
	const getTotal = (row) => {
		let checkedList = row ? row : totalArr;
		checkedList.map((ele) => {
			total += ele.price * ele.num;
		});
		setSum(total || 0);
	};
	//把id拼接成字符串 ";dddfsjfsdfhdjf" 的形式
	let id = '';
	keys.map((ele) => {
		id += ';' + ele;
	});

	const delChange = (type, row) => {
		let count = 0; //多选,提示删除商品的数量
		if (type == 'del') {
			id = '';
			id = ';' + row._id;
		} else {
			count = count + 1;
		}
		confirm({
			title: (
				<div>
					{type == 'del'
						? '你确认删除 ' + row.goodName + ' 这个商品吗?'
						: '你确认删除这' + count + '个商品吗?'}
				</div>
			),
			icon: <ExclamationCircleOutlined />,
			onOk() {
				fetchGoodDel({ id }).then(() => {
					setInit(init + 1); //删除后初始化页面
				});
			},
		});
	};

	const confirmOrder = () => {
		if(keys.length!=0){
			history.push('/order/list');
			fetchCartSumbit({ goods: id }).then((res) => {
				console.log('res: ', res);
			});
		}else{
			message.warning("请选择购买的商品")
		}
	
	};

	const columns = [
		{
			title: '商品信息',
			dataIndex: 'goodName',
			align: 'center',
			render: (text, rowValue) => (
				<div className="m-good">
					<img src={rowValue.goodImg} />
					<p>{text}</p>
				</div>
			),
		},
		{
			title: '商品属性',
			dataIndex: 'quality',
			render: (text) => (
				<div>
					<p>尺寸: {text}</p>
					<p>颜色: 详见商品包装</p>
				</div>
			),
		},
		{
			title: '单价',
			dataIndex: 'price',
			align: 'center',
			render: (text) => <div>￥{text}</div>,
		},
		{
			title: '数量',
			dataIndex: 'num',
			align: 'center',
			render: (text, rowValue) => (
				<div>
					<InputNumber
						min={1}
						max={100}
						value={text}
						onChange={(num) => handleNumChange(num, rowValue)}
					/>
				</div>
			),
		},
		{
			title: '金额',
			align: 'center',
			dataIndex: 'totalPrice',
			render: (text) => <div>￥{text}</div>,
		},
		{
			title: '操作',
			dataIndex: '',
			align: 'center',
			key: 'x',
			render: (text, row) => (
				<Button danger onClick={() => delChange('del', row)}>
					删除
				</Button>
			),
		},
	];

	const footer = () => (
		<div className="m-cart-footer">
			<Button type="text" danger onClick={() => delChange('mutli')}>
				批量删除
			</Button>
			<div>
				<span>
					已选择 <i>{keys.length}</i> 件商品{' '}
				</span>
				<span>
					合计: <b>￥</b> <i>{sum}</i>
				</span>
				<button className="m-total" onClick={() => confirmOrder()}>
					结算
				</button>
			</div>
		</div>
	);

	return (
		<div className="m-cart">
			<Table
				rowSelection={{
					type: 'checkbox',
					onChange: (key, row) => changeKeys(key, row),
				}}
				columns={columns}
				rowKey="_id"
				dataSource={data}
				footer={() => footer()}
				pagination={false}
			/>
		</div>
	);
};
