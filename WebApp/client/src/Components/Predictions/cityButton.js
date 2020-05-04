import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class cityButton extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="city" id={this.props.id} onClick={this.props.onClick}>
			{this.props.city}
			</div>
		);
	}
}