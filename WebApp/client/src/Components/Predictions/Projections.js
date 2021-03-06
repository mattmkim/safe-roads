import React, { Component } from 'react'
import { LineChart } from '@opd/g2plot-react';
import axios from 'axios';
import Select from 'react-select';
var options = [
    {
    value: 'TEMP_RANGE', label: 'TEMP_RANGE'},
    {value: 'TEMP_AVG', label: 'TEMP_AVG'}
];

class Projections extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Loading",
            data: [],
            cities: [],
            selectAttribute: {value: 'TEMP_RANGE', label: 'TEMP_RANGE'},
            selectCity: { value: 'San Diego', label: 'San Diego' }
        }
        this.loadLinePlot = this.loadLinePlot.bind(this);
    }
    async componentDidMount() {
        const cities = await axios.get('/api/city');
        var cityList = cities.data.rows;
        let cityDivs = cityList.map((data) => { return { value: `${data.CITY}`, label: `${data.CITY}` } });
        this.setState({ cities: cityDivs });
        // const response = await axios.post('/api/testTimeSeries', obj);
        // //const response = 
        // if (response.data) {
        //     console.log(response.data);
        //     var rows = response.data;
        //     // var rows = [{ "CITY": "Albuquerque", "RAINDEVIATION": -21.27314946838826, "SERVERITYDEVIATION": 0.0379394884894416 }, { "CITY": "Atlanta", "RAINDEVIATION": 4.38548531996526, "SERVERITYDEVIATION": 0.3114069896250075 }, { "CITY": "Charlotte", "RAINDEVIATION": 3.72863860824422, "SERVERITYDEVIATION": -0.2882764546994309 }, { "CITY": "Chicago", "RAINDEVIATION": 7.973645038725899, "SERVERITYDEVIATION": 0.19954186806559152 }, { "CITY": "Dallas", "RAINDEVIATION": -2.13830274889349, "SERVERITYDEVIATION": 0.0195571183821458 }, { "CITY": "Denver", "RAINDEVIATION": -13.438116256739258, "SERVERITYDEVIATION": 0.1381016719609423 }, { "CITY": "Detroit", "RAINDEVIATION": 6.016301779213399, "SERVERITYDEVIATION": 0.21671047732181273 }, { "CITY": "Houston", "RAINDEVIATION": 7.60584471306687, "SERVERITYDEVIATION": -0.1295518106330944 }, { "CITY": "Indianapolis", "RAINDEVIATION": 5.92258673578071, "SERVERITYDEVIATION": -0.0734655326275194 }, { "CITY": "Jacksonville", "RAINDEVIATION": 9.978208892106391, "SERVERITYDEVIATION": 0.35093327295837484 }, { "CITY": "Kansas City", "RAINDEVIATION": 0.16846308541852661, "SERVERITYDEVIATION": 0.25415320001005454 }, { "CITY": "Las Vegas", "RAINDEVIATION": -34.52165810681708, "SERVERITYDEVIATION": -0.12277986322837521 }, { "CITY": "Los Angeles", "RAINDEVIATION": -3.6874315690712, "SERVERITYDEVIATION": 0.0534408373307353 }, { "CITY": "Miami", "RAINDEVIATION": 9.05097729235211, "SERVERITYDEVIATION": 0.0560488324800131 }, { "CITY": "Minneapolis", "RAINDEVIATION": 4.78358120973403, "SERVERITYDEVIATION": 0.1193134508336933 }, { "CITY": "Nashville", "RAINDEVIATION": 1.7791938823165, "SERVERITYDEVIATION": -0.07891188814156261 }, { "CITY": "New York", "RAINDEVIATION": 0.18114423729640472, "SERVERITYDEVIATION": -0.018110518866626 }, { "CITY": "Philadelphia", "RAINDEVIATION": 1.55577957106854, "SERVERITYDEVIATION": 0.2357618571653962 }, { "CITY": "Phoenix", "RAINDEVIATION": -28.976223350393937, "SERVERITYDEVIATION": -0.046529112396997294 }, { "CITY": "Pittsburgh", "RAINDEVIATION": 3.9030162444333705, "SERVERITYDEVIATION": 0.1331917511392421 }, { "CITY": "Portland", "RAINDEVIATION": 8.23634378039833, "SERVERITYDEVIATION": -0.13164749754398591 }, { "CITY": "Saint Louis", "RAINDEVIATION": 4.13749012010306, "SERVERITYDEVIATION": 0.3811395445979648 }, { "CITY": "San Antonio", "RAINDEVIATION": 1.2395263504421898, "SERVERITYDEVIATION": -0.0852813428490663 }, { "CITY": "San Diego", "RAINDEVIATION": 1.32353677712845, "SERVERITYDEVIATION": 0.1207318989940634 }, { "CITY": "San Francisco", "RAINDEVIATION": 10.41392496849187, "SERVERITYDEVIATION": 0.0480371516706509 }, { "CITY": "Seattle", "RAINDEVIATION": 10.697765837922528, "SERVERITYDEVIATION": -0.0538517587126196 }]
        //     rows = rows.map((data) => { return { isProjection: data.isProjection, date: data.date, value: data.attr}});
        //     this.setState({ data: rows });
        // }
    }

    loadLinePlot() {
        if (this.state.data.length === 0) {
            return <div> Loading </div>
        } else {
            console.log(this.state);
            var config = {
                height: 400,
                title: {
                    visible: true,
                    text: 'Projections for ' + this.state.selectAttribute.value + ' in ' + this.state.selectCity.label,
                },
                description: {
                    visible: true,
                    text: 'Plot over time, everything past 2018 is projected',
                },
                padding: 'auto',
                forceFit: true,
                xField: 'date',
                yField: 'value',
                colorField: 'isProjection',
                point: {
                    visible: true,
                    size: 5,
                },
                yAxis: {
                    visible: true,
                    label: { visible: true }
                },
                xAxis: {
                    tickCount: 5,
                    visible: true,
                    label: { visible: true, autoHide: true }
                },
                data: this.state.data,
            }
            console.log(config);
            return <div><h4> The Graph </h4><LineChart {...config} /></div>
        }
    }
    loadInputForm() {
        return (
            <div style = {{marginTop: '20px'}}>
                <h4> Input </h4>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    var obj = {
                        city: this.state.selectCity.label,
                        attribute: this.state.selectAttribute
                    }
                    const response = await axios.post('/api/testTimeSeries', obj);
                    // //const response = 
                    if (response.data) {
                        console.log(response.data);
                        var rows = response.data;
                        // var rows = [{ "CITY": "Albuquerque", "RAINDEVIATION": -21.27314946838826, "SERVERITYDEVIATION": 0.0379394884894416 }, { "CITY": "Atlanta", "RAINDEVIATION": 4.38548531996526, "SERVERITYDEVIATION": 0.3114069896250075 }, { "CITY": "Charlotte", "RAINDEVIATION": 3.72863860824422, "SERVERITYDEVIATION": -0.2882764546994309 }, { "CITY": "Chicago", "RAINDEVIATION": 7.973645038725899, "SERVERITYDEVIATION": 0.19954186806559152 }, { "CITY": "Dallas", "RAINDEVIATION": -2.13830274889349, "SERVERITYDEVIATION": 0.0195571183821458 }, { "CITY": "Denver", "RAINDEVIATION": -13.438116256739258, "SERVERITYDEVIATION": 0.1381016719609423 }, { "CITY": "Detroit", "RAINDEVIATION": 6.016301779213399, "SERVERITYDEVIATION": 0.21671047732181273 }, { "CITY": "Houston", "RAINDEVIATION": 7.60584471306687, "SERVERITYDEVIATION": -0.1295518106330944 }, { "CITY": "Indianapolis", "RAINDEVIATION": 5.92258673578071, "SERVERITYDEVIATION": -0.0734655326275194 }, { "CITY": "Jacksonville", "RAINDEVIATION": 9.978208892106391, "SERVERITYDEVIATION": 0.35093327295837484 }, { "CITY": "Kansas City", "RAINDEVIATION": 0.16846308541852661, "SERVERITYDEVIATION": 0.25415320001005454 }, { "CITY": "Las Vegas", "RAINDEVIATION": -34.52165810681708, "SERVERITYDEVIATION": -0.12277986322837521 }, { "CITY": "Los Angeles", "RAINDEVIATION": -3.6874315690712, "SERVERITYDEVIATION": 0.0534408373307353 }, { "CITY": "Miami", "RAINDEVIATION": 9.05097729235211, "SERVERITYDEVIATION": 0.0560488324800131 }, { "CITY": "Minneapolis", "RAINDEVIATION": 4.78358120973403, "SERVERITYDEVIATION": 0.1193134508336933 }, { "CITY": "Nashville", "RAINDEVIATION": 1.7791938823165, "SERVERITYDEVIATION": -0.07891188814156261 }, { "CITY": "New York", "RAINDEVIATION": 0.18114423729640472, "SERVERITYDEVIATION": -0.018110518866626 }, { "CITY": "Philadelphia", "RAINDEVIATION": 1.55577957106854, "SERVERITYDEVIATION": 0.2357618571653962 }, { "CITY": "Phoenix", "RAINDEVIATION": -28.976223350393937, "SERVERITYDEVIATION": -0.046529112396997294 }, { "CITY": "Pittsburgh", "RAINDEVIATION": 3.9030162444333705, "SERVERITYDEVIATION": 0.1331917511392421 }, { "CITY": "Portland", "RAINDEVIATION": 8.23634378039833, "SERVERITYDEVIATION": -0.13164749754398591 }, { "CITY": "Saint Louis", "RAINDEVIATION": 4.13749012010306, "SERVERITYDEVIATION": 0.3811395445979648 }, { "CITY": "San Antonio", "RAINDEVIATION": 1.2395263504421898, "SERVERITYDEVIATION": -0.0852813428490663 }, { "CITY": "San Diego", "RAINDEVIATION": 1.32353677712845, "SERVERITYDEVIATION": 0.1207318989940634 }, { "CITY": "San Francisco", "RAINDEVIATION": 10.41392496849187, "SERVERITYDEVIATION": 0.0480371516706509 }, { "CITY": "Seattle", "RAINDEVIATION": 10.697765837922528, "SERVERITYDEVIATION": -0.0538517587126196 }]
                        rows = rows.map((data) => { return { isProjection: data.isProjection, date: data.date, value: data.attr } });
                        this.setState({ data: rows });
                    }
                }}>
                    <Select className="select" value={this.state.selectCity} onChange={(e) => {
                        this.setState({ selectCity: e })
                    }} options={this.state.cities} isMulti={false} />
                    <Select className="select" value={this.state.selectAttribute} onChange={(e) => {
                        this.setState({ selectAttribute: e })
                    }} options={options} isMulti={false} />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
        )
    }
    render() {
        return (
            <div>
                  <h4 style = {{marginTop: "10px"}}> Description </h4> 
                We had years and years of granular data mapping relationships between various accident data and weather. We wondered, could our data be used to project the future.
                Using AR coefficients and time series analysis, we've projected 5 months in advance with this feature 
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Put in your city and select what attribute you want to see, then see our projections
                {this.loadInputForm()}
                {this.loadLinePlot()}
            </div>
        )
    }
}

export default Projections;