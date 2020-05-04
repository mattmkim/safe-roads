import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class FeatureButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        let display_title = this.props.feature;
        if (display_title === 'severity') {
            display_title = 'Accident Severity';
        } else if (display_title === 'temp_avg') {
            display_title = 'Temperature Avg';
        } else if (display_title === 'temp_rng') {
            display_title = 'Temperature Range';
        } else if (display_title === 'humidity') {
            display_title = 'Humidity';
        } else if (display_title === 'pressure') {
            display_title = 'Pressure';
        } else if (display_title === 'wspeed') {
            display_title = 'Wind Speed';
        }
		return (
			<div className="feature" id={this.props.id} onClick={this.props.onClick}>
			{display_title}
			</div>
		);
	}
}