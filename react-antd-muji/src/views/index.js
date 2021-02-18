import loadable from '@loadable/component';

// const Login = loadable(() => import('./user/Login'));
// const Home = loadable(() => import('./home/Home'));
// const GoodList = loadable(() => import('./good/GoodList'));
// const GoodDetail = loadable(() => import('./good/GoodDetail'));
// const Cart = loadable(() => import('./cart/Cart'));
// const UserInfo = loadable(() => import('./user/UserInfo'));
// const OrderList = loadable(() => import('./order/OrderList'));
// const My = loadable(() => import('./my/My.js'));
// const AddressManage = loadable(() => import('./my/components/AddressManage'));

import Login from './user/Login';
import Home from './home/Home';
import GoodList from './good/GoodList';
import GoodDetail from './good/GoodDetail';
import Cart from './cart/Cart';
import OrderList from './order/OrderList';
import My from './my/My';
import AddressManage from './my/addressManage/AddressManage';
import EditAccount from './my/editAccount/EditAccount';
import Orders from './my/order/Order';

export default [
	{
		id: 10,
		component: GoodList,
		path: '/good/list',
	},
	{
		id: 11,
		component: GoodDetail,
		path: '/good/detail/:id',
	},
	{
		id: 12,
		component: Cart,
		path: '/cart',
	},
	{
		id: 13,
		component: Login,
		path: '/login',
	},
	{
		id: 14,
		component: OrderList,
		path: '/order/list',
	},
	{
		id: 15,
		component: AddressManage,
		path: '/my/address',
	},
	{
		id: 16,
		component: EditAccount,
		path: '/my/profile',
	},
	{
		id: 21,
		component: Orders,
		path: '/my/orders',
	},
	{
		id: 17,
		component: My,
		path: '/my',
	},
	{
		id: 1,
		component: Home,
		path: '/',
	},
];
