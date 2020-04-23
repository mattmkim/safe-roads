import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class FeaturesRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="feature">
                <div className="year">{this.props.year}</div>
                <div className="month">{this.props.month}</div>
                <div className="severity">{this.props.severity}</div>
                <div className="temp_avg">{this.props.temp_avg}</div>
                <div className="temp_rng">{this.props.temp_rng}</div>
                <div className="humidity">{this.props.humidity}</div>
                <div className="pressure">{this.props.pressure}</div>
                <div className="wspeed">{this.props.wspeed}</div>
            </div>
        )
    }
}

export default FeaturesRow;