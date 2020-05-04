import React, { Component } from 'react';
import DropDown from './CitiesDropDown'
import options from './options';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import '../../Style/SearchShow.css'
import { BarChart } from '@opd/g2plot-react';
class Quintiles extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitQuintile = this.handleSubmitQuintile.bind(this);
        this.state =
            {
                quintileData: [],

            }
    }

    handleSubmitQuintile(response) {
        // changed to data for testing change back to response.data.rows
        //var data = [{CITY: 'Fresno', RANK: 54}, {CITY: 'Belsfield', RANK: 10}, {CITY: 'test', RANK: 5}, {CITY: 'test2', RANK: 3}];
        var data = response.data.rows;
        this.setState({ quintileData: data }, () => {
            console.log(this.state);
        });
    }

    loadInputFormQuintile() {
        return (
            <div>
                <label>Pick Cities For Quintile</label>
                <DropDown options={options} handleSubmit={this.handleSubmitQuintile} favcity={this.props.favcity}/>
            </div>
        )
    }

    loadBarChart() {
        if (this.state.quintileData.length === 0) {
            return <div> </div>
        } else {
            var config = {
                title: {
                    visible: true,
                    text: 'Quintile Data',
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
                 <h4 style = {{marginTop: "10px"}}> Description </h4> 
                See where a city falls in the quintiles of accidents. Rank 5 would be the most frequent in the US and rank 1 would be the least.
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Either select in the drop down or type a comma separated list of cities.
                <div style = {{marginTop: '20px'}}>{this.loadInputFormQuintile()} </div>
                {this.loadBarChart()}
            </div>
        )
    }
}
export default Quintiles;