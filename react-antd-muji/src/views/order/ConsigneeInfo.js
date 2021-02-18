import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';
import ChooseAddressModal from './ChooseAddressModal';
import { fetchDefaultAddr } from '@/utils/api'



export default props => {
	console.log('props: ', props);

	const history = useHistory();
	const [modal_visible, change_modal_visible] = useState(false);
	const [addressList, setAddressList] = useState([])
	const [init,setInit] = useState(0)

	useEffect(() => {
		fetchDefaultAddr().then(res => {
			setAddressList(res)
			props.onAddr(res)
		})
	
	}, [init]);


	const handleSelectAddress = () => {
		change_modal_visible(true);
	};
	const changeInit =() => {
		setInit(init+1)
	}
	const renderDefaultAddr = () =>{
		if(addressList.length==0){
			return (
				<div style={{width:1200,textAlign:'center',height:70,marginTop:'30px'}}>
					<div>---暂无收货地址---</div>
				</div>
			)
		}else{
			return addressList.map(ele => (
				<div className="m-part-shop-list" key={ele._id}>
					<div className="m-part-shop-list-item">收货人 :{ele.name} </div>
					<div className="m-part-shop-list-item">联系方式 :{ele.tel} </div>
					<div className="m-part-shop-list-item">收货地址 :{ele.address}{ele.detail}</div>
				</div>
			))
		}
	}

	return (
		<div>
			<div className="m-frag-section">
				<div className="m-frag-section-hd">
					<div className="m-frag-section-title">收货人信息</div>
					<div className="m-frag-section-action">
						<a onClick={() => history.push('/my/address')}>收货地址管理</a>
					</div>
				</div>
				<div
					className="m-frag-section-bd"
					onClick={() => handleSelectAddress()}
				>
					{renderDefaultAddr()}
				</div>
			</div>
			<ChooseAddressModal
				modal_visible={modal_visible}
				change_modal_visible={change_modal_visible}
				addressList={addressList}
				onInit={()=>changeInit()}
			/>
		</div>
	);
};
