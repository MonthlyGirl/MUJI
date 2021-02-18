import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import './style.scss';
import AddressManage from '../my/addressManage/AddressManage'

// 组件需要的参数
ChooseAddressModal.propTypes = {
	modal_visible: PropTypes.bool.isRequired,
	change_modal_visible: PropTypes.func.isRequired,
	addressList: PropTypes.array.isRequired,
};

export default function ChooseAddressModal(props) {
	const history = useHistory();
	const { modal_visible, change_modal_visible, addressList = [] } = props;
	const handleOk = () => {
		// 修改数据并重新拉去默认address
		props.onInit()
		change_modal_visible(false)
	};
	
	return (
		<Modal
			title="选择收货地址"
			width="60%"
			visible={modal_visible}
			onOk={handleOk}
			onCancel={() => change_modal_visible(false)}
		>
			<AddressManage />
		</Modal>
	);
}
