import React, { Component } from 'react';
import CodesDropDown from './CodesDropDown'
import options from './options';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
            return <div> Loading </div>
        } else {
            const newData = [];
            const seenCodes = [];
            const data = []

            for (var i; i < this.state.codesData.length; i++) {
                
            }
            for (var i = 0; i < this.state.codesData.length; i++) {
                var city = this.state.codesData[i].CITY;
                var rank = this.state.codesData[i].RANK;
                var type = this.state.codesData[i].CODE;
                var value = this.state.codesData[i].COUNT2;
                data.push(<div key={i}>city: {city} rank: {rank} code: {type} frequency: {value}</div>)
                if (seenCodes.includes(type)) {
                    continue;
                } else {
                    var obj = {type: type, value: value};
                    newData.push(obj);
                    seenCodes.push(type);
                }
            }

            var config = {
                title: {
                    visible: true,
                    text: 'Shared Codes',
                }, 
                data: newData,
                radiusField: "value",
                categoryField: "type"

            }

            return ( 
                <div>
                    <RoseChart {...config} /> 
                    <div>
                        {data}
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
                <Container className="codes-container">
                    <Row>
                        <Col className="codes-col1">
                            {this.loadInputFormCodes()}

                        </Col>
                        <Col className="codes-col2">
                            {this.loadVisualization()}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}
 export default SharedCodes;