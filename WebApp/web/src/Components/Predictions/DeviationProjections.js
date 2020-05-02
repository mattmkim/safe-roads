import React, { Component } from 'react'
import { ScatterChart } from '@opd/g2plot-react';
import axios from 'axios';

var rainDeviation = 0;

class DeviationProjections extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Loading",
            raindeviation: 0,
            severitydeviation: 0,
            data: []
        }
        this.loadScatterPlot = this.loadScatterPlot.bind(this);
    }
    async componentDidMount() {
        const response = await axios.get('/api/getWeatherAccidentDeviations');
        //const response = 
        if (response.data) {
            var rows = response.data.rows;
            // var rows = [{ "CITY": "Albuquerque", "RAINDEVIATION": -21.27314946838826, "SERVERITYDEVIATION": 0.0379394884894416 }, { "CITY": "Atlanta", "RAINDEVIATION": 4.38548531996526, "SERVERITYDEVIATION": 0.3114069896250075 }, { "CITY": "Charlotte", "RAINDEVIATION": 3.72863860824422, "SERVERITYDEVIATION": -0.2882764546994309 }, { "CITY": "Chicago", "RAINDEVIATION": 7.973645038725899, "SERVERITYDEVIATION": 0.19954186806559152 }, { "CITY": "Dallas", "RAINDEVIATION": -2.13830274889349, "SERVERITYDEVIATION": 0.0195571183821458 }, { "CITY": "Denver", "RAINDEVIATION": -13.438116256739258, "SERVERITYDEVIATION": 0.1381016719609423 }, { "CITY": "Detroit", "RAINDEVIATION": 6.016301779213399, "SERVERITYDEVIATION": 0.21671047732181273 }, { "CITY": "Houston", "RAINDEVIATION": 7.60584471306687, "SERVERITYDEVIATION": -0.1295518106330944 }, { "CITY": "Indianapolis", "RAINDEVIATION": 5.92258673578071, "SERVERITYDEVIATION": -0.0734655326275194 }, { "CITY": "Jacksonville", "RAINDEVIATION": 9.978208892106391, "SERVERITYDEVIATION": 0.35093327295837484 }, { "CITY": "Kansas City", "RAINDEVIATION": 0.16846308541852661, "SERVERITYDEVIATION": 0.25415320001005454 }, { "CITY": "Las Vegas", "RAINDEVIATION": -34.52165810681708, "SERVERITYDEVIATION": -0.12277986322837521 }, { "CITY": "Los Angeles", "RAINDEVIATION": -3.6874315690712, "SERVERITYDEVIATION": 0.0534408373307353 }, { "CITY": "Miami", "RAINDEVIATION": 9.05097729235211, "SERVERITYDEVIATION": 0.0560488324800131 }, { "CITY": "Minneapolis", "RAINDEVIATION": 4.78358120973403, "SERVERITYDEVIATION": 0.1193134508336933 }, { "CITY": "Nashville", "RAINDEVIATION": 1.7791938823165, "SERVERITYDEVIATION": -0.07891188814156261 }, { "CITY": "New York", "RAINDEVIATION": 0.18114423729640472, "SERVERITYDEVIATION": -0.018110518866626 }, { "CITY": "Philadelphia", "RAINDEVIATION": 1.55577957106854, "SERVERITYDEVIATION": 0.2357618571653962 }, { "CITY": "Phoenix", "RAINDEVIATION": -28.976223350393937, "SERVERITYDEVIATION": -0.046529112396997294 }, { "CITY": "Pittsburgh", "RAINDEVIATION": 3.9030162444333705, "SERVERITYDEVIATION": 0.1331917511392421 }, { "CITY": "Portland", "RAINDEVIATION": 8.23634378039833, "SERVERITYDEVIATION": -0.13164749754398591 }, { "CITY": "Saint Louis", "RAINDEVIATION": 4.13749012010306, "SERVERITYDEVIATION": 0.3811395445979648 }, { "CITY": "San Antonio", "RAINDEVIATION": 1.2395263504421898, "SERVERITYDEVIATION": -0.0852813428490663 }, { "CITY": "San Diego", "RAINDEVIATION": 1.32353677712845, "SERVERITYDEVIATION": 0.1207318989940634 }, { "CITY": "San Francisco", "RAINDEVIATION": 10.41392496849187, "SERVERITYDEVIATION": 0.0480371516706509 }, { "CITY": "Seattle", "RAINDEVIATION": 10.697765837922528, "SERVERITYDEVIATION": -0.0538517587126196 }]
            rows = rows.map((data) => { return { city: data.CITY, raindeviation: data.RAINDEVIATION, severitydeviation: data.SERVERITYDEVIATION } });
            this.setState({ data: rows });
        }
    }

    loadScatterPlot() {
        if (this.state.data.length === 0) {
            return <div> Loading </div>
        } else {
            var config = {
                height: 400,
                title: {
                    visible: true,
                    text: 'Test graph for Predictions',
                },
                description: {
                    visible: true,
                    text: 'Test graph for predictions',
                },
                padding: 'auto',
                forceFit: true,
                xField: 'raindeviation',
                yField: 'severitydeviation',
                colorField: 'city',
                label: {
                    visible: true,
                    type: 'point',
                    precision: 2,
                    formatter: (e) => { if (e === this.state.raindeviation) { return -1.00 } return e }
                },
                point: {
                    visible: true,
                    size: 5,
                },
                legend: {
                    visible: true,
                    positon: 'bottom'
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
            return <div style = {{width: "100%"}}><ScatterChart {...config} /> </div> 
        }
    }
    // this doesn't actually work lmao
    loadInputForm() {
        return <div style = {{marginTop: "20px"}}>
            <form onSubmit={async (e) => {
                // need to rework this logic to include the predictions api. Major reworking needed
                e.preventDefault();
                const val1 = parseFloat(rainDeviation)
                // this is for compiling
                const obj = {
                    input: val1
                }
                const response = await axios.post('/api/testRegressionDeviations', obj);
                // test this
                const val2 = response.data[1] || .20 
                this.setState({ raindeviation: val1, data: [...this.state.data, { city: "Your entry", raindeviation: parseFloat(rainDeviation), severitydeviation: val2 }] })
            }}>
                <div className="form-group">
                    <label>Deviation of Rain</label>
                    <input type = "number" step = "any" required = "true" max = "1" min = "0" className="form-control" value={this.state.rainDeviation} onChange={(e) => { rainDeviation = e.target.value }} placeholder='Enter Deviation for amount rain' />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label">Verify values</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    }
    render() {
        return (
            <div style = {{height: '100%', width: '85%'}}>
                <h4 style = {{marginTop: "10px"}}> Description </h4> 
                We use least-squares regression analysis to predict what accident frequency for a city would be give nweather conditions.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                The input must take a form of a decimal between 0 and 100 for each attribute: this will represent the percent deviation from the norm.
                {this.loadInputForm()}
                {this.loadScatterPlot()}
            </div>
        )
    }
}

export default DeviationProjections;