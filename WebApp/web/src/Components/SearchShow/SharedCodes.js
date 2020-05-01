import React, { Component } from 'react';
import CodesDropDown from './CodesDropDown'
import options from './options';
import Container from 'react-bootstrap/Container'
import {Card, Table} from 'react-bootstrap'
import '../../Style/SearchShow.css'
import { RoseChart, PieChart } from '@opd/g2plot-react';

class SharedCodes extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitCodes = this.handleSubmitCodes.bind(this);
        this.state = 
        {
            codesData: []
        }
    }

    handleSubmitCodes(response) {
        console.log(response.data.rows);

        var data = response.data.rows;
        this.setState({
            codesData: data
        })
    }

    loadInputFormCodes() {
        return (
            <div>
                <label>Pick Cities For Shared Codes</label>
                <CodesDropDown options={options} handleSubmit={this.handleSubmitCodes}/>
            </div>
        )
    }

    loadVisualization() {
        if (this.state.codesData.length == 0) {
            return <div>  </div>
        } else {
            const newData = [];
            const seenCodes = [];
            const data = [];
            
            var tabledata = [];
            var prevCity = '';
            var codes = '';
            var numCodes = 0;

            for (var i = 0; i < this.state.codesData.length; i++) {
                console.log(prevCity);
                var city = this.state.codesData[i].CITY;
                var rank = this.state.codesData[i].RANK;
                var type = this.state.codesData[i].CODE;
                var value = this.state.codesData[i].COUNT2;
                data.push(<div key={i}>city: {city} rank: {rank} code: {type} frequency: {value}</div>)
                
                console.log(numCodes);

                if (prevCity === '') {
                    prevCity = city;
                    codes = codes + type + ', ';
                } else if (i == this.state.codesData.length - 1) {
                    codes = codes + type;
                    var obj = {city: city, codes: codes};
                    console.log(obj);
                    tabledata.push(obj);
                } else {
                    if (prevCity === city) {
                        codes = codes + type + ', ';
                    } else {
                        codes = codes.substring(0, codes.length - 2);
                        var obj = {city: prevCity, codes: codes};
                        tabledata.push(obj);
                        console.log(obj);
                        codes = '';
                        codes = codes + type + ', ';
                        prevCity = city;
                    }
                }

                if (seenCodes.includes(type)) {
                    continue;
                } else {
                    var obj = {type: type, value: value};
                    newData.push(obj);
                    seenCodes.push(type);
                }
            }

            console.log(tabledata);

            var config = {
                height: 475,
                title: {
                    visible: true,
                    text: 'Shared Codes',
                }, 
                description: {
                    visible: true,
                    alignTo: 'left',
                    text: 'Frequency of TMC codes among selected cities'

                },
                data: newData,
                radiusField: "value",
                categoryField: "type",
                colorField: "type",
                label: {
                    visible: true,
                    type: 'outer',
                    formatter: (text) => text,
                },
                legend: {
                    visible: true,
                    position: 'bottom-center'
                }, 
                tooltip: {
                    visible: true,
                    offset: 20,
                }

            }

            return ( 
                <div class="visualize-container">
                    <div class="rose">
                        <RoseChart className="chart" {...config} /> 
                    </div>
                    <div>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>City</th>
                                    <th>Top Codes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabledata.map(entry => 
                                    <tr key={entry.city}>
                                        <th class="table-body"> {entry.city} </th>
                                        <th class="table-body"> {entry.codes} </th>
                                    </tr>    
                                )}
                            </tbody>
                        </Table>    
                    </div>
                </div>

            )
        }
    }

    render() {
        const data = []

        for (var i; i < this.state.codesData.length; i++) {
            data.push(<div key={i}>city: {this.state.codesData[i].CITY} rank: {this.state.codesData[i].RANK} code: {this.states.codesData[i].CODE}</div>)
        }

        return (
            <div>
                <h4 style = {{marginTop: "10px"}}> Description </h4> 
                View shared TMC codes among the user selected amounnt of codes from the specified cities. 
                <h4 style = {{marginTop: "20px"}}> Instructions </h4> 
                Select any number of cities from the dropdown, and specify a positive integer value for the number of codes to display. 
                <div style = {{marginTop: '20px'}}>{this.loadInputFormCodes()} </div>
                {this.loadVisualization()}
            </div>
        )
    }

}
 export default SharedCodes;