import React, { Component } from 'react';
import DropDown from './CitiesDropDown'
import options from './options';
import { BarChart } from '@opd/g2plot-react';
class SearchShow extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = 
        {
            quintileData: []
        }
    }

    handleSubmit(response) {
        console.log(response);
        // changed to data for testing change back to response.data.rows
        var data = [{CITY: 'Fresno', RANK: 54}, {CITY: 'Belsfield', RANK: 10}, {CITY: 'test', RANK: 5}, {CITY: 'test2', RANK: 3}];
        this.setState({quintileData: data}, () => {
            console.log(this.state);
        });
    }

    loadInputForm() {
        return (
            <div>
                <label>Pick Cities For Quintile</label>
                <DropDown options={options} handleSubmit={this.handleSubmit} />
            </div>
        )
    }

    loadBarChart() {
        if (this.state.quintileData.length === 0) {
            return <div> Loading </div>
        } else {
            console.log(this.state);
            var config = {
                title: {
                    visible: true,
                    text: 'Test for Quintile Data',
                },
                data: this.state.quintileData,
                xField: 'RANK',
                yField: 'CITY'
            }
            console.log(config);
            return <BarChart {...config} />
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-" style={{ marginTop: '30px', width: '30%' }}>
                            {this.loadInputForm()}
                        </div>
                        <div className="col">
                            {this.loadBarChart()}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SearchShow