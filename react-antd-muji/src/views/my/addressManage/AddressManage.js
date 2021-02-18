import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import AddOrUpdateAddressModal from './AddOrUpdateAddressModal';
import AddressList from './AddressList';

import './style.scss';


export default inject('store')(observer(props => {
	const [modal_visible, change_modal_visible] = useState(false);
	const [addressList, setAddressList] = useState([]);
	const [defaultAddress, setDefaultAddress] = useState({});
	const [addressType, changeAddressType] = useState('add');
	const [init,setInit] = useState(0)

	const { addr } = props.store;

	let time = null
	const getAddressList = () => {
		// TODO:获取address数据
		addr.getAddrList({})
	 time = setTimeout(() => {
			setAddressList(addr.AddrList)
			console.log("addressList", addressList);
		}, 500);
	};
	const changInit = ()=>{
		setInit(init+1)
	}

	useEffect(() => {
		getAddressList();
	}, [init]);

	return (
		<div className="m-addressmanage">
			<AddressList
				addressList={addressList}
				change_modal_visible={change_modal_visible}
				//区分是add还是update地址
				changeAddressType={changeAddressType}
				//修改modal的默认地址
				onChange={(item) => setDefaultAddress(item)}
				onInit={changInit}
			/>
			<AddOrUpdateAddressModal
				modal_visible={modal_visible}
				change_modal_visible={change_modal_visible}
				defaultAddress={defaultAddress}
				getAddressList={getAddressList}
				type={addressType}
	
			/>
		</div>
	);
}))
