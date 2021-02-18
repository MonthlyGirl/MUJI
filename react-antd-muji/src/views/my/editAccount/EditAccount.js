import React from 'react';
import { useHistory } from 'react-router-dom'

import { Form, Input, Button,  message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './style.scss';
import './editAccount.scss';
import { fetchUpdpsw } from '@/utils/api'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

export default function EditAccount() {

	const history = useHistory()
	const updatePwd = (data) => {
		fetchUpdpsw(data).then(res=>{
			console.log('res: ', res);
			res && message.success('修改成功,请重新登录').then(()=>{
				window.localStorage.removeItem('token')
				history.push('/login')
			})
			
		})
	};
	return (
		<div className="editAccount">
			<p className="title">修改/忘记密码</p>
			<Form
				{...layout}
				name="normal_login"
				className="login-form"
				initialValues={{ remember: true }}
				onFinish={updatePwd}
			>
				<Form.Item
					label="账户"
					name="userphone"
					rules={[{ required: true, message: 'Please input your phone!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="请输入手机号码"
					/>
				</Form.Item>
				<Form.Item
					label="原密码"
					name="old_password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="请输原入密码"
					/>
				</Form.Item>
				<Form.Item
					label="新密码"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="请输入密码"
					/>
				</Form.Item>
				<Form.Item
					label="确认密码"
					name="password2"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="确认密码"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						修改密码
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
