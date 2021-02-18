import React, { useEffect, useState } from 'react';
import { Checkbox, message, Modal } from 'antd';
import './style.scss';
import { 
	FormOutlined, 
	DeleteOutlined, 
	ExclamationCircleOutlined 
} from '@ant-design/icons';

import PropTypes from 'prop-types';
import { fetchDelAddr, fetchUpdDefaultAddr } from '@/utils/api'

const { confirm } = Modal;

// 组件需要的参数
AddressList.propTypes = {
	addressList: PropTypes.array.isRequired,
	change_modal_visible: PropTypes.func.isRequired,
	changeAddressType: PropTypes.func.isRequired,
};

export default function AddressList(props) {


	// 这里用来修改checkbox勾选状态
	const handleCheck = (params) => {
		fetchUpdDefaultAddr({id:params._id}).then(()=>{
			props.onInit()
		})
	
	};

	const delHandle = (item) => {
		//删除完需要重新拉取list
		confirm({
			title: '是否确认删除该地址',
			icon: <ExclamationCircleOutlined />,
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				fetchDelAddr({ id: item._id }).then(() => {
					message.success("删除成功",1).then(()=>{
						props.onInit()
					})
				})
			},
		});
	};

	const renderList = ()=>{
		if (props.addressList.length!=0){
		  return props.addressList.map((item, index) => (
				<div className="m-frag-bd" key={item + index}>
					<div className="m-address-item">
						<div className="m-address-item-info">
							<div className="m-address-info-name">姓名:{item.name}</div>
							<div className="m-address-info-name">联系方式:{item.tel}</div>
							<div className="m-address-info-name">
								详细地址:
										{item.address && item.address.toString()} / {item.detail}
							</div>
						</div>
						<div className="m-address-footer">
							<div className="m-address-default">
								<Checkbox
									onChange={()=>handleCheck(item)}
									checked={item.isDefault=='1'?true:false}
								>
									{item.isDefault ? '' : '设为'}默认地址
										</Checkbox>
							</div>
							<div className="m-address-edit">
								<span
									onClick={() => {
										props.changeAddressType('update');
										props.onChange(item);
										props.change_modal_visible(true);
									}}
								>
									<FormOutlined />
											编辑
										</span>
								<span onClick={() => { delHandle(item) }}>
									<DeleteOutlined />
											删除
										</span>
							</div>
						</div>
					</div>
				</div>
			))
		}else{
			return (
				<div className='m-emtry'>
					<div>---暂无收货地址---</div>
				</div>
			)
		}
	}
	return (
		<div>
			<div className="m-frag-section">
				<div className="m-frag-section-hd">
					<div className="m-left">收货地址管理</div>
					<div
						className="m-right"
						onClick={() => {
							props.changeAddressType('add');
							props.change_modal_visible(true);
						}}
					>
						创建收货地址
					</div>
				</div>
				<div className="m-frag-section-action">
					{renderList()}
				</div>
			</div>
		</div>
	);
}
