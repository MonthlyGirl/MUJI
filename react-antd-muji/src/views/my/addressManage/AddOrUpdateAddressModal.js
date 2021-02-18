import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { options } from './area';
import { 
	Modal, 
	Form, 
	Input, 
	Checkbox, 
	Cascader, 
	message 
} from 'antd';
import { fetchUpdAddr } from '@/utils/api'

const { TextArea } = Input;
// 组件需要的参数
AddOrUpdateAddressModal.propTypes = {
	modal_visible: PropTypes.bool.isRequired,
	change_modal_visible: PropTypes.func.isRequired,
	getAddressList: PropTypes.func.isRequired,
	type: PropTypes.node.isRequired, // add or update
	defaultAddress: PropTypes.object,
};

const TITLES = [
	{
		title: '收货人姓名',
		value: 'name',
		note: '输入收货人姓名且长度不超过25个字符',
	},
	{
		title: '手机号码',
		value: 'tel',
		note: '请输入手机号',
		rules: [
			{
				pattern: new RegExp(
					/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
				),
				message: '请输入正确手机号码',
			},
		],
	},
	{
		title: '地址信息',
		value: 'address',
		type: 'Cascader',
		note: '请选择省/市/区/街道',
	},
	{
		title: '详细地址',
		value: 'detail',
		type: 'TextArea',
		note: '请输入详细地址信息',
	},
];

export default function AddOrUpdateAddressModal(props) {
	const [checked, handleCheck] = useState(false);
	const [form] = Form.useForm();
	const { resetFields, validateFields, setFieldsValue } = form;
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const setDefaultValue = () => {
	
		Object.keys(props.defaultAddress).forEach((item) => {
			setFieldsValue({ [item]: props.defaultAddress[item] });
		});
		handleCheck(props.defaultAddress.isDefault);
	};

	// 用来判断地址类型
	useEffect(() => {
		if (props.type == 'add') {
			// add的时候清空数据
			resetFields()
			handleCheck(false);
			return
		}
		return (()=>{
			addOrUpdateAddress({})
		})
	}, [props.type]);

	//默认地址变化的时候才执行
	useEffect(() => {
		props.defaultAddress && setDefaultValue();
	}, [props.defaultAddress]);

	//触发表单验证
	const getFormData = async () => {
		try {
			let values = await validateFields();
			addOrUpdateAddress({ ...values, isDefault: checked?1:0 });
		} catch (error) {}
	};

	const addOrUpdateAddress = (address) => {
		//TODO:提交表单数据,判断type,然后调用对应接口
		if(props.type === 'add'){
			fetchUpdAddr(address).then(() => {
				message.success("添加成功")
				// 清空一下表单数据
				resetFields()
				handleCheck(false);
			})
		}else{
			let params = { ...address, id: props.defaultAddress._id}
			fetchUpdAddr(params).then(() => {
				message.success("修改成功")
			})
		}
		//更新list
		props.getAddressList();
		//关闭modal
		props.change_modal_visible(false);
	};

	//隐藏modal
	const hideModal = () => {
		props.change_modal_visible(false);
	};

	return (
		<div>
			<Modal
				title="创建收货信息"
				width={400}
				visible={props.modal_visible}
				onOk={getFormData}
				onCancel={hideModal}
			>
				<Form {...layout} name="basic" form={form}>
					{TITLES.map((item, index) => (
						<Form.Item
							label={item.title}
							key={item.value + index}
							name={item.value}
							rules={[
								{ required: true, message: item.note },
								...(item.rules || []),
							]}
						>
							{!item.type ? (
								// 默认input
								<Input placeholder={item.note} max={25} />
							) : item.type === 'TextArea' ? (
								//根据类型给对应组件
								<TextArea placeholder={item.note} />
							) : (
								<Cascader options={options} placeholder={item.note} />
							)}
						</Form.Item>
					))}
				</Form>
				<Checkbox
					style={{ width: '100%', textAlign: 'center' }}
					checked={Boolean(checked)}
					onChange={() => handleCheck(true)}
				>
					设为默认地址
				</Checkbox>
			</Modal>
		</div>
	);
}
