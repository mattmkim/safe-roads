import React, { Component } from 'react';
import CodesDropDown from './CodesDropDown'
import options from './options';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
            return <div> Loading </div>
        } else {
            const newData = [];
            const seenCodes = [];
            for (var i = 0; i < this.state.codesData.length; i++) {
                var type = this.state.codesData[i].CODE;
                console.log(type);
                var value = this.state.codesData[i].COUNT2;
                console.log(value);
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

            console.log(config);

            return <RoseChart {...config} />
        }
    }

    render() {
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