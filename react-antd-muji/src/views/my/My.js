import React, { useState,useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import * as _ from './My.config';
import './My.scss';
import { fetchUserInfo } from '@/utils/api'

export default function My() {
	const history = useHistory();
	const [isLogin, changeLoginState] = useState(true);
	const [order_active, change_order_active] = useState(null);
	const [username,setUsername] = useState('')
	const [init,setInit] = useState(0)

	const handleRouterChange = (key) => {
		console.log('key: ', key);
		if (key.match(/logout/g)) {
			//清除cookie，修改一下登录态
			window.localStorage.removeItem('token')
			setInit(init+1)
			return;
		}
		history.push(key);
	};
	const isLoginStatus = ()=>{
		if(!window.localStorage.getItem('token')){
			changeLoginState(false)
		}else{
			fetchUserInfo().then(res=>{
				setUsername(res)
			})
		}
	}
	useEffect(()=>{
		isLoginStatus()
		return undefined
	},[init])

	return (
		<div className="my">
			<div className="card">
				<p className="title">账号信息</p>
				{isLogin ? (
					// 已登录
					<div className="hasLogin">
						<Avatar size={64} icon={<UserOutlined />} className="avatar" />
						<div className="userInfo">
							{/* TODO:这里之后要替换为真实账号名 */}
							<p className="account_num">{username}</p>
							<div className="login_children">
								{_.LOGIN_TEXT.map((item) => (
									<div
										key={item.key}
										to={`/${item.key}`}
										className="login_item"
										onClick={() => handleRouterChange(item.key)}
									>
										{item.title}
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					// 未登录
					<div className="not_login">
						<Avatar size={64} icon={<UserOutlined />} className="avatar" />
						<Link to="/login">请登录</Link>
					</div>
				)}
			</div>

			<div className="card">
				<p className="title">我的订单</p>
				<div className="order_info">
					{_.ICONS.map((item) => (
						<div
							key={item.key}
							className={`order_item ${
								order_active === item.key ? 'actived' : ''
							}`}
							onClick={() => handleRouterChange(item.key)}
						>
							<span>{item.icon}</span>
							<p>{item.title}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
