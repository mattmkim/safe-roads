import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

class TimeSeriesRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="time-series-row">
                <div className="year">{this.props.year}</div>
                <div className="month">{this.props.month}</div>
                <div className="avg_severity">{this.props.avg_severity}</div>
                <div className="num_accidents">{this.props.num_accidents}</div>
            </div>
        )
    }
}

export default TimeSeriesRow;