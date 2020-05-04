import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'

class TimeSeriesRow extends React.Component {

    render() {
        return (
            <div className="time-series-row">
                <div className="year">{this.props.year}</div>
                <div className="month">{this.props.month}</div>
                {/* <div className="id">{this.props.id}</div>
                <div className="time">{this.props.time}</div> */}
                <div className="severity">{this.props.cum_severity}</div>
                <div className="accidents">{this.props.cum_accidents}</div>
                <div className="cum_severity">{this.props.cum_severity}</div>
                <div className="cum_accidents">{this.props.cum_accidents}</div>
            </div>
        )
    }
}

export default TimeSeriesRow;