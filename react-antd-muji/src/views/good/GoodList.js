import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useParams } from 'react-router-dom' 

import { Tabs } from 'antd';
import GoodCard from '@/views/components/GoodCard';
import Pages from '@/views/good/Pagination';

const { TabPane } = Tabs;

export default inject('store')(observer((props) => {
	
	const id = useParams().id
	const [key, setKey] = useState(id);
	const { goods } = props.store;
	const goodList = goods.newGoodList.list;
	const total = goods.newGoodList.total;

	const [params, setParams] = useState({
		page: 1,
		rank: 2,
		size: 12,
	});

	// 回到顶部
	function ScrollToTopOnMount() {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, []);
		return null;
	}

	function callback(key) {
		setKey(key);
		switch (key) {
			case '1':
				setParams({ rank: 2, page: 1, size: 12 });
				break;
			case '2':
				setParams({ rank: 1, page: 1, size: 12 });
				break;
			case '3':
				setParams({ page: 1, hot: true, rank: 3, size: 12 });
				break;
		}
	}

	// 修改id
	const changeParams2 = ()=>{
		if(id==1){
			params.rank=2
			setParams(JSON.parse(JSON.stringify(params)));
			goods.getnewGoodList(params);
		}else{
			params.rank=1
			setParams(JSON.parse(JSON.stringify(params)));
			goods.getnewGoodList(params);
		}
		
	}

	useEffect(() => {
		changeParams2()
	}, []);
	
	useEffect(() => {
		goods.getnewGoodList(params);
		console.log('params: ', params);
	}, [params]);

	const changeParams = (k, v) => {
		params[k] = v;
		setParams(JSON.parse(JSON.stringify(params)));
	};

	return (
		<div>
			<ScrollToTopOnMount />
			<Tabs defaultActiveKey="1" onTabClick={callback} activeKey={key}>
				<TabPane tab="销量" key="1">
					<GoodCard goodList={goodList} />
					<Pages
						total={total}
						page={params.page}
						onChange={(page) => changeParams('page', page)}
						onPagesize={(size) => changeParams('size', size)}
					/>
				</TabPane>
				<TabPane tab="上新" key="2">
					<GoodCard goodList={goodList} />
					<Pages
						total={total}
						page={params.page}
						onChange={(page) => changeParams('page', page)}
						onPagesize={(size) => changeParams('size', size)}
					/>
				</TabPane>
				<TabPane tab="综合排序" key="3">
					<GoodCard goodList={goodList} />
					<Pages
						total={total}
						page={params.page}
						onChange={(page) => changeParams('page', page)}
						onPagesize={(size) => changeParams('size', size)}
					/>
				</TabPane>
			</Tabs>
		</div>
	);
}));
