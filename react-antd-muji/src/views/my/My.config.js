import {
	UserOutlined,
	ProfileOutlined,
	WalletOutlined,
	OneToOneOutlined,
} from '@ant-design/icons';

export const ICON_STYle = { fontSize: 30 };
export const ICONS = [
	{
		title: '全部订单',
		icon: <ProfileOutlined style={ICON_STYle} />,
		key: '/my/orders?tab=all',
	},
	{
		title: '待发货',
		icon: <WalletOutlined style={ICON_STYle} />,
		key: '/my/orders?tab=pending_payment',
	},
	{
		title: '待收货',
		icon: <OneToOneOutlined style={ICON_STYle} />,
		key: '/my/orders?tab=pending_confirm',
	},
];

export const LOGIN_TEXT = [
	{ title: '编辑账号/密码', key: '/my/profile' },
	{ title: '退出登录', key: 'logout' },
	{ title: '收货地址管理', key: '/my/address' },
];
