import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Checkbox, Tabs, message } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './style.scss';
import { fetchRegister, fetchLogin } from '@/utils/api';
const { TabPane } = Tabs;

export default (props) => {
	const [key, setKey] = useState('1');
	const history = useHistory();

	function callback(key) {
		setKey(key);
	}
	const login = (data) => {
		fetchLogin(data).then((res) => {
			res &&
				message.success('登录成功',1).then(() => {
					localStorage.setItem('token', res.token);
					history.replace('/');
				});
		});
	};
	const reigter = (data) => {
		fetchRegister(data).then(() => {
			message.success('注册成功').then(() => {
				setKey('1');
			});
		});
	};
	return (
		<div className="m-login">
			<Tabs onChange={callback} centered size="large" activeKey={key}>
				<TabPane tab="登录" key="1">
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{ remember: true }}
						onFinish={login}
					>
						<Form.Item
							name="userphone"
							rules={[{ required: true, message: 'Please input your phone!' }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="请输入手机号码"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="请输入密码"
							/>
						</Form.Item>
						<Form.Item>
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>记住密码</Checkbox>
							</Form.Item>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								登录
							</Button>
						</Form.Item>
					</Form>
				</TabPane>
				{/* 注册 */}
				<TabPane tab="注册" key="2">
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{ remember: true }}
						onFinish={reigter}
					>
						<Form.Item
							name="userphone"
							rules={[{ required: true, message: 'Please input your phone!' }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="请输入手机号码"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="请输入密码"
							/>
						</Form.Item>
						<Form.Item
							name="password2"
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="确认密码"
							/>
						</Form.Item>
						<Form.Item
							name="agreement"
							valuePropName="checked"
							rules={[
								{
									validator: (_, value) =>
										value
											? Promise.resolve()
											: Promise.reject('Should accept agreement'),
								},
							]}
						>
							<Checkbox>
								同意 <a href="">用户注册协议</a>
							</Checkbox>
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="login-form-button"
							>
								注册
							</Button>
						</Form.Item>
					</Form>
				</TabPane>
			</Tabs>
		</div>
	);
};
