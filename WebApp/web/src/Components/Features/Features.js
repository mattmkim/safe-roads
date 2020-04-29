import React, {Component} from 'react'
import Select from 'react-select';
import './Features.css';
import { GroupedColumnChart } from '@opd/g2plot-react';
import axios from 'axios';
import FeaturesRow from './FeaturesRow';

class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            cities: [],
            features: [],
            storage: []
        }

        this.showFeatures = this.showFeatures.bind(this);
        this.loadVisualization = this.loadVisualization.bind(this);
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
        const response = await axios.get('/api/prediction/' + input_city)
        if (response.data) {
            var featureList = response.data.rows;
            let featureDivs = featureList.map((feature) => <FeaturesRow year={feature.YEAR} month={feature.MONTH} severity={Math.round(feature.SEVERITY * 100) / 100} temp_avg={Math.round((feature.TEMP_AVG - 273.15) * 100) / 100} 
            temp_rng={Math.round(feature.TEMP_RANGE * 100) / 100} humidity={Math.round(feature.HUMIDITY * 100) / 100} pressure={Math.round(feature.PRESSURE * 100) / 100} wspeed={Math.round(feature.WIND_SPEED * 100) / 100} />);
            let storageDivs = featureList.map((feature) => {return {date: `${feature.YEAR}-${feature.MONTH}`, severity: Math.round(feature.SEVERITY * 100) / 100, temp_avg: Math.round((feature.TEMP_AVG - 273.15) * 100) / 100, 
            temp_rng: Math.round(feature.TEMP_RANGE * 100) / 100, humidity: Math.round(feature.HUMIDITY * 100) / 100, pressure: Math.round(feature.PRESSURE * 100) / 100, wspeed: Math.round(feature.WIND_SPEED * 100) / 100} });
            this.setState({
                features: featureDivs,
                storage: storageDivs
            });
        }
    }

    loadVisualization(input_city, input_feat) {
        if (this.state.storage.length === 0) {
            return <div>Loading Visualization...</div>
        } else {
            let input_color = '';
            if (input_feat === 'temp_avg'){
                input_color = 'red';
            } else if (input_feat === 'temp_rng') {
                input_color = 'orange';
            } else if (input_feat === 'humidity') {
                input_color = 'green';
            } else if (input_feat === 'pressure') {
                input_color = 'blue';
            } else if (input_feat === 'wspeed') {
                input_color = 'purple';
            }
            var config = {
                height: 500,
                title: {
                    visible: true,
                    text: 'Feature visualization for ' + input_city
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
                groupField: 'type',
                data: this.state.storage,
                color: input_color
            }
            return <GroupedColumnChart {...config} />
        }
    }

    render () {
        const {city} = this.state;
        return (
            <div className="features-page">
                <div className="cities">
                    <div className="container">
                        <div className="h3">Accident/Weather Features for U.S. Cities</div>
                        <div className="cities-container">
                            <Select value={this.state.city} onChange={(e) => this.showFeatures(e.value)} options={this.state.cities} isMulti={false}/>
                        </div>
                        <div className="h5">Current city: {this.state.city}</div>
                    </div>
                </div>
                <br></br>
                {this.loadVisualization(this.state.city, 'temp_avg')}
                <br></br>
                <div className="features">
                    <div className="features-container">
                        <div className="features-header">
                            <div className="header-lg"><strong>Year</strong></div>
                            <div className="header-lg"><strong>Month</strong></div>
                            <div className="header"><strong>Accident Severity(1-4)</strong></div>
                            <div className="header"><strong>Temperature (Celsius)</strong></div>
                            <div className="header"><strong>Temperature Range</strong></div>
                            <div className="header-sm"><strong>Humidity</strong></div>
                            <div className="header-sm"><strong>Pressure (hPa)</strong></div>
                            <div className="header-sm"><strong>Wind Speed (m/s)</strong></div>
                        </div>
                        <div className="results-container" id="results">
                            {this.state.features}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Features;