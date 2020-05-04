import React, { Component } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { LineChart } from '@opd/g2plot-react';
import TimeSeriesRow from './TimeSeriesRow';
import '../../Style/TimeSeries.css';

//TODO: fix cumulative
// TODO: use bootstrap/tabs like others, 
// TODO: put navbar on side, explain what current city Philadelphia means, make table look better
// TODO: predictive stuff for timesires
// TODO: todo merge with Daniel page
// TODO: hosting
//TODO: use favcity: this.props.favcity || ‘Philadelphia ‘

//update readme to use nodemon

class TimeSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            cities: [],
            features: [],
            data: []
        }

        this.showFeatures = this.showFeatures.bind(this);
        this.loadTimeSeriesSeverity = this.loadTimeSeriesSeverity.bind(this);
        this.loadTimeSeriesAccidents = this.loadTimeSeriesAccidents.bind(this);
        this.loadTimeSeriesCumSeverity = this.loadTimeSeriesCumSeverity.bind(this);
        this.loadTimeSeriesCumAccidents = this.loadTimeSeriesCumAccidents.bind(this);
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
            let featureDivs = featureList.map((feature) => <TimeSeriesRow year={feature.YEAR} month={feature.MONTH} id={feature.ID} time={feature.TIME} severity={feature.SEVERITY} accidents={feature.ACCIDENTS} cum_severity={feature.CUM_SEVERITY} cum_accidents={feature.CUM_ACCIDENTS}/>);
            let datarows = featureList.map((row) => { 
                return { year: row.YEAR, month: row.MONTH, time: row.TIME, severity: row.SEVERITY, accidents: row.ACCIDENTS, cum_severity: row.CUM_SEVERITY, cum_accidents: row.CUM_ACCIDENTS } 
            });
            this.setState({
                features: featureDivs,
                data: datarows
            });
        }
    }

    loadTimeSeriesAccidents() {
        if (this.state.data.length === 0) {
            return <div> Loading </div>
        } else {
            var configAccidents = {
                height: 400,
                title: {
                    visible: true,
                    text: 'Time Series Graph',
                },
                description: {
                    visible: true,
                    text: 'Average Number of Accidents Over Time',
                },
                padding: 'auto',
                forceFit: true,
                xField: 'time',
                yField: 'accidents',
                label: {
                    visible: true,
                    type: 'point',
                },
                point: {
                    visible: true,
                    size: 5,
                },
                xAxis: {
                    tickCount: 10,
                },
                data: this.state.data,
            }
            return <LineChart {...configAccidents} />
        }
    }

    loadTimeSeriesSeverity() {
        if (this.state.data.length === 0) {
            return <div> Loading </div>
        } else {
            var configSeverity = {
                height: 400,
                title: {
                    visible: true,
                    text: 'Time Series Graph',
                },
                description: {
                    visible: true,
                    text: 'Average Severity Over Time',
                },
                padding: 'auto',
                forceFit: true,
                xField: 'time',
                yField: 'severity',
                label: {
                    visible: false,
                    type: 'point',
                },
                point: {
                    visible: true,
                    size: 5,
                },
                xAxis: {
                    tickCount: 10,
                },
                data: this.state.data,
            }
            return <LineChart {...configSeverity} />
        }
    }

    loadTimeSeriesCumAccidents() {
        if (this.state.data.length === 0) {
            return <div> Loading </div>
        } else {
            var configCumAccidents = {
                height: 400,
                title: {
                    visible: true,
                    text: 'Time Series Graph',
                },
                description: {
                    visible: true,
                    text: 'Cumulative Number of Accidents Over Time',
                },
                padding: 'auto',
                forceFit: true,
                xField: 'time',
                yField: 'cum_accidents',
                label: {
                    visible: true,
                    type: 'point',
                },
                point: {
                    visible: true,
                    size: 5,
                },
                xAxis: {
                    tickCount: 10,
                },
                data: this.state.data,
            }
            return <LineChart {...configCumAccidents} />
        }
    }

    loadTimeSeriesCumSeverity() {
        if (this.state.data.length === 0) {
            return <div> Loading </div>
        } else {
            var configCumSeverity = {
                height: 400,
                title: {
                    visible: true,
                    text: 'Time Series Graph',
                },
                description: {
                    visible: true,
                    text: 'Cumulative Average Severity Over Time',
                },
                padding: 'auto',
                forceFit: true,
                xField: 'time',
                yField: 'cum_severity',
                label: {
                    visible: false,
                    type: 'point',
                },
                point: {
                    visible: true,
                    size: 5,
                },
                xAxis: {
                    tickCount: 10,
                },
                data: this.state.data,
            }
            return <LineChart {...configCumSeverity} />
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
                {this.loadTimeSeriesSeverity()}
                {this.loadTimeSeriesAccidents()}
                {this.loadTimeSeriesCumSeverity()}
                {this.loadTimeSeriesCumAccidents()}
                <br></br>
                <div className="time-series">
                    <div className="time-series-container">
                        <div className="time-series-header">
                            <div className="header-lg"><strong>Year</strong></div>
                            <div className="header-lg"><strong>Month</strong></div>
                            {/* <div className="header"><strong>Id</strong></div>
                            <div className="header"><strong>Time</strong></div> */}
                            <div className="header"><strong>Average Accident Severity(1-4)</strong></div>
                            <div className="header"><strong>Number of Accidents</strong></div>
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









