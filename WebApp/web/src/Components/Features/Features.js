import React, { Component } from 'react'
import Select from 'react-select';
import '../../Style/Features.css'
import { ColumnChart, GroupedColumnChart } from '@opd/g2plot-react';
import axios from 'axios';
import FeatureButton from './FeatureButton';
import FeaturesRow from './FeaturesRow';
class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            cities: [],
            features: [],
            storage: [],
            stat: [],
            stats: [],
            allFeats: [],
            content: 'summary'
        }

        this.showFeatures = this.showFeatures.bind(this);
        this.loadVisualization = this.loadVisualization.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get('/api/city');
        if (response.data) {
            var cityList = response.data.rows;
            let statList = ['severity', 'temp_avg', 'temp_rng', 'humidity', 'pressure', 'wspeed'];
            let cityDivs = cityList.map((data) => { return { value: `${data.CITY}`, label: `${data.CITY}` } });
            let statDivs = statList.map((stat_) => <FeatureButton id={"button-" + stat_} onClick={() => this.setState({ stat: stat_ })} feature={stat_} />)
            this.setState({
                city: 'Philadelphia',
                cities: cityDivs,
                stat: 'severity',
                stats: statDivs
            });
            this.showFeatures(this.state.city);
        }
    }

    async showFeatures(input_city) {
        this.setState({
            city: input_city
        })
        const response = await axios.get('/api/prediction/' + input_city)
        if (response.data) {
            var featureList = response.data.rows;
            let featureDivs = featureList.map((feature) => <FeaturesRow year={feature.YEAR} month={feature.MONTH} severity={Math.round(feature.SEVERITY * 100) / 100} temp_avg={Math.round((feature.TEMP_AVG - 273.15) * 100) / 100}
                temp_rng={Math.round(feature.TEMP_RANGE * 100) / 100} humidity={Math.round(feature.HUMIDITY * 100) / 100} pressure={Math.round(feature.PRESSURE * 10) / 100} wspeed={Math.round(feature.WIND_SPEED * 100) / 100} />);
            let storageDivs = featureList.map((feature) => {
                return {
                    date: `${feature.YEAR}-${feature.MONTH}`, severity: Math.round(feature.SEVERITY * 100) / 100, temp_avg: Math.round((feature.TEMP_AVG - 273.15) * 100) / 100,
                    temp_rng: Math.round(feature.TEMP_RANGE * 100) / 100, humidity: Math.round(feature.HUMIDITY * 100) / 100, pressure: Math.round(feature.PRESSURE * 10) / 100, wspeed: Math.round(feature.WIND_SPEED * 100) / 100
                }
            });
            let allFeatDivs = featureList.flatMap((feature) => {
                return [{ date: `${feature.YEAR}-${feature.MONTH}`, type: 'accident severity (1-4)', value: Math.round(feature.SEVERITY * 100) / 100 }, { date: `${feature.YEAR}-${feature.MONTH}`, type: 'temperature average (°C)', value: Math.round((feature.TEMP_AVG - 273.15) * 100) / 100 },
                { date: `${feature.YEAR}-${feature.MONTH}`, type: 'temperature range (°C)', value: Math.round(feature.TEMP_RANGE * 100) / 100 }, { date: `${feature.YEAR}-${feature.MONTH}`, type: 'humidity (g/m\u00B3)', value: Math.round(feature.HUMIDITY * 40) / 100 },
                { date: `${feature.YEAR}-${feature.MONTH}`, type: 'pressure (atm)', value: Math.round(feature.PRESSURE * 0.0987) / 100 }, { date: `${feature.YEAR}-${feature.MONTH}`, type: 'wind speed (m/s)', value: Math.round(feature.WIND_SPEED * 100) / 100 }]
            });
            this.setState({
                features: featureDivs,
                storage: storageDivs,
                allFeats: allFeatDivs
            });
        }
    }

    loadVisualization(input_city, input_feat) {
        if (this.state.storage.length === 0) {
            return <div>Loading Visualization...</div>
        } else {
            let input_color = '';
            let input_title = '';
            if (input_feat === 'severity') {
                input_color = 'lightcoral';
                input_title = 'Accident Severity';
            } else if (input_feat === 'temp_avg') {
                input_color = 'khaki';
                input_title = 'Temperature Average';
            } else if (input_feat === 'temp_rng') {
                input_color = 'greenyellow';
                input_title = 'Temperature Range';
            } else if (input_feat === 'humidity') {
                input_color = 'lightskyblue';
                input_title = 'Humdity';
            } else if (input_feat === 'pressure') {
                input_color = 'mediumslateblue';
                input_title = 'Pressure';
            } else if (input_feat === 'wspeed') {
                input_color = 'mediumorchid';
                input_title = 'Wind Speed';
            }
            var config = {
                height: 500,
                title: {
                    visible: true,
                    text: input_title + ' for ' + input_city
                },
                description: {
                    visible: true,
                    text: 'Bar chart for understanding city-specific accident/weather features at one glance'
                },
                forceFit: true,
                xField: 'date',
                yField: input_feat,
                label: {
                    visible: true,
                },
                data: this.state.storage,
                color: input_color
            }
            return <ColumnChart {...config} />
        }
    }

    loadAllVisualization(input_city) {
        if (this.state.storage.length === 0) {
            return <div>Loading Visualization...</div>
        } else {
            var config = {
                height: 500,
                title: {
                    visible: true,
                    text: 'Feature summary for ' + input_city
                },
                description: {
                    visible: true,
                    text: 'Grouped bar chart for understanding city-specific accident/weather features at one glance'
                },
                forceFit: true,
                xField: 'date',
                yField: 'value',
                stackField: 'type',
                legend: {
                    visible: true,
                    position: 'top-center',
                },
                responsive: true,
                data: this.state.allFeats,
                color: ['lightcoral', 'khaki', 'greenyellow', 'lightskyblue', 'mediumslateblue', 'mediumorchid'],
            }
            return <GroupedColumnChart {...config} />
        }
    }
    renderContent() {
        if (this.state.content === "table") {
            return (
            <div>
                <div class="description">

                <h4 style = {{marginTop: "10px"}}> Description </h4> 
                View the raw data over time for various accident and weather features for a specified city.
                </div>
                <div className="h5">Detailed Statistics for {this.state.city}</div>
                <div className="features">
                    <div className="features-container">
                        <div className="features-header">
                            <div className="header-lg"><strong>Year</strong></div>
                            <div className="header-lg"><strong>Month</strong></div>
                            <div className="header"><strong>Accident Severity(1-4)</strong></div>
                            <div className="header"><strong>Temperature (Celsius)</strong></div>
                            <div className="header"><strong>Temperature Range</strong></div>
                            <div className="header-sm"><strong>Humidity</strong></div>
                            <div className="header-sm"><strong>Pressure (kPa)</strong></div>
                            <div className="header-sm"><strong>Wind Speed (m/s)</strong></div>
                        </div>
                        <div className="results-container" id="results">
                            {this.state.features}
                        </div>
                    </div>
                </div>
            </div>)
        } else if (this.state.content === "specific") {
            return (
            <div>


                <h4 style = {{marginTop: "10px"}}> Description </h4> 
                View trends in various weather and accident features for a specified city.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Select an accident or weather feature to observe.
                <div style = {{marginTop: '20px'}}>
                <div className="stats-container">
                    {this.state.stats}
                </div>
                </div>
                
                {this.loadVisualization(this.state.city, this.state.stat)}
            </div>)
        } else {
            return (
            <div>
                <h4 style = {{marginTop: "10px"}}> Description </h4> 
                View city-specific accident and weather features.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Select a city from the dropdown form below to view city specific data.
                <div style = {{marginTop: '20px'}}><Select value={this.state.city} onChange={(e) => this.showFeatures(e.value)} options={this.state.cities} isMulti={false} /></div>
                {this.loadAllVisualization(this.state.city)}

            </div>)
        }
    }

    render() {
        return (

            <div className="features-page">
                <div className="vertical-nav bg-light" id="sidebar" style={{ float: "left" }}>
                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Tabs</p>

                    <ul className="nav flex-column bg-light mb-0">
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'summary' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Feature Summary
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'specific' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Specific Feature
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

export default Features;