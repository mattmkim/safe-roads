import React, { Component } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { ScatterChart } from '@opd/g2plot-react';
import TimeSeriesRow from './TimeSeriesRow';
import './TimeSeries.css';

class TimeSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            cities: [],
            features: []
        }

        this.showFeatures = this.showFeatures.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get('/api/city');
        if (response.data) {
            var cityList = response.data.rows;
            let cityDivs = cityList.map((data) => {return {value: `${data.CITY}`, label: `${data.CITY}`}});
            this.setState({
                city: 'Philadelphia',
                cities: cityDivs
            });
            this.showFeatures(this.state.city);
        }
    }

    async showFeatures(input_city) {
        this.setState({
            city: input_city
        })
        const response = await axios.get('/api/timeSeries/' + input_city)
        if (response.data) {
            var featureList = response.data.rows;
            let featureDivs = featureList.map((feature) => <TimeSeriesRow year={feature.YEAR} month={feature.MONTH} id={feature.ID} time={feature.TIME} cum_severity={feature.CUM_SEVERITY} cum_accidents={feature.CUM_ACCIDENTS}/>);
            this.setState({
                features: featureDivs
            });
        }
    }

    render() {
        const {city} = this.state;
        return (
            <div className="time-series-page">
                <div className="time-series-cities">
                    <div className="container">
                        <div className="h3">Accident Time Series for U.S. Cities</div>
                        <div className="time-series-cities-container">
                            <Select value={this.state.city} onChange={(e) => this.showFeatures(e.value)} options={this.state.cities} isMulti={false}/>
                        </div>
                        <div className="h5">Current city: {this.state.city}</div>
                    </div>
                </div>
                <br></br>
                <div className="time-series">
                    <div className="time-series-container">
                        <div className="time-series-header">
                            <div className="header-lg"><strong>Year</strong></div>
                            <div className="header-lg"><strong>Month</strong></div>
                            <div className="header"><strong>Id</strong></div>
                            <div className="header"><strong>Time</strong></div>
                            <div className="header"><strong>Cumulative Average Accident Severity(1-4)</strong></div>
                            <div className="header"><strong>Cumulative Number of Accidents</strong></div>
                        </div>
                        <div className="time-series-results-container" id="time-series-results">
                            {this.state.features}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeSeries









