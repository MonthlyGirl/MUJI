import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import './style.scss';

export default (props) => {
	const history = useHistory();
	const list = props.goodList || [];

	const renderGood = () => {
		return list.map((ele) => (
			<div
				className="m-goodcontent"
				key={ele._id}
				onClick={() => history.push('/good/detail/' + ele._id)}
			>
				<Card
					hoverable
					style={{ width: 283 }}
					cover={<img alt="example" src={ele.img} />}
				>
					<div className="btomTitle">
						<span>{ele.name}</span>
						<p className="botm">
							<span>￥ {ele.price}</span>
						</p>
					</div>
				</Card>
			</div>
		));
	};

	return <div className="m-goods">{renderGood()}</div>;
};
