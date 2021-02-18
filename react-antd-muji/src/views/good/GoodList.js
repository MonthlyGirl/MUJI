import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Tabs, Pagination } from 'antd';
import GoodCard from '@/views/components/GoodCard';
import Pages from '@/views/good/Pagination';

const { TabPane } = Tabs;

export default inject('store')(observer((props) => {
		const [params, setParams] = useState({
			page: 1,
			rank: 2,
			size: 12,
			hot: false,
		});
		const [key, setKey] = useState('1');
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
		const { goods } = props.store;
		const goodList = goods.newGoodList.list;
		const total = goods.newGoodList.total;

		useEffect(() => {
			goods.getnewGoodList(params);
		}, [params]);

		const changeParams = (k, v) => {
			params[k] = v;
			setParams(JSON.parse(JSON.stringify(params)));
		};

		return (
			<div>
				<Tabs defaultActiveKey="1" onChange={callback} activeKey={key}>
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
	})
);
