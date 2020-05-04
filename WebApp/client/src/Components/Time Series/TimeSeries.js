import React, { Component } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { LineChart } from '@opd/g2plot-react';
import TimeSeriesRow from './TimeSeriesRow';
import '../../Style/TimeSeries.css';

// TODO: predictive stuff for timeseries

class TimeSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            cities: [],
            features: [],
            data: [],
            content: 'default'
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
                city: this.props.favcity || 'Philadelphia',
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
                    visible: false,
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
                    visible: false,
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
                    visible: false,
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
                    visible: false,
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

    renderContent() {
        if (this.state.content === "cumulative") {
        return (
            <div>
                

                    <div class="description">
                    <h4 style = {{marginTop: "10px"}}> Description </h4> 
                    View cumulative accident data over time for for a specified city. Accident severity ranges from 1 to 4.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Select a city to observe.
                <div style = {{marginTop: '20px'}}></div>
                    </div>

    
                        <div className="h3">Accident Time Series for U.S. Cities</div>
                            <Select value={this.state.city} onChange={(e) => this.showFeatures(e.value)} options={this.state.cities} isMulti={false}/>
                        <div className="h5" style = {{marginTop: '10px'}}>Current city: {this.state.city}</div>
                    
    
                <br></br>
                {this.loadTimeSeriesCumSeverity()}
                {this.loadTimeSeriesCumAccidents()}
            </div>
        )
    }
    else if (this.state.content === "table") {
        return (
            <div>
    
                    

                    <div class="description">
                    <h4 style = {{marginTop: "10px"}}> Description </h4> 
                View the raw accident data over time for for a specified city. Accident severity ranges from 1 to 4.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Select a city to observe.
                <div style = {{marginTop: '20px'}}></div>
                    </div>

                        <div className="h3">Accident Time Series for U.S. Cities</div>
                            <Select value={this.state.city} onChange={(e) => this.showFeatures(e.value)} options={this.state.cities} isMulti={false}/>
                        <div className="h5" style = {{marginTop: '10px'}}>Current city: {this.state.city}</div>
                    
  
                <br></br>

     
                    <div className="time-series-table-container">
                        <div className="time-series-table-header">
                            <div className="header-lg"><strong>Year</strong></div>
                            <div className="header-lg"><strong>Month</strong></div>
                            {/* <div className="header"><strong>Id</strong></div>
                            <div className="header"><strong>Time</strong></div> */}
                            <div className="header"><strong>Avg Accident Severity</strong></div>
                            <div className="header"><strong>Num Accidents</strong></div>
                            <div className="header-sm"><strong>Cum Avg Accident Severity</strong></div>
                            <div className="header-sm"><strong>Cum Num of Accidents</strong></div>
                        </div>
                        <div className="time-series-results-container" id="time-series-results">
                            {this.state.features}
                        </div>
                    </div>
                </div>
     
        )
    }
   else {
        return (
            <div className="time-series-page">
  
                   

                    <div class="description">
                    <h4 style = {{marginTop: "10px"}}> Description </h4> 
                    View accident data over time for for a specified city. Accident severity ranges from 1 to 4.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Select a city to observe.
                <div style = {{marginTop: '20px'}}></div>
                    </div>


                        <div className="h3">Accident Time Series for U.S. Cities</div>
                        <Select value={this.state.city} onChange={(e) => this.showFeatures(e.value)} options={this.state.cities} isMulti={false}/>
                        <div className="h5" style = {{marginTop: '10px'}}>Current city: {this.state.city}</div>
                  
       
                <br></br>
                {this.loadTimeSeriesSeverity()}
                {this.loadTimeSeriesAccidents()}
            </div>
        )
    }


    }

    render() {
        return (

            <div>
                <div className="vertical-nav bg-light" id="sidebar" style={{ float: "left" }}>
                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Tabs</p>

                    <ul className="nav flex-column bg-light mb-0">
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'default' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Accidents
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'cumulative' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Cumulative
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'table' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Data Table
                            </a>
                        </li>
                    </ul>
                </div>
                <div style = {{marginLeft: '17rem', marginTop: '30px'}}>
                {this.renderContent()}
                </div>
            </div>
        )
    }
}

export default TimeSeries









