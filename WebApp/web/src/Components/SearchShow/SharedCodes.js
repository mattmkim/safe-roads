import React, { Component } from 'react';
import CodesDropDown from './CodesDropDown'
import options from './options';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../Style/SearchShow.css'
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
    render() {
        return (
            <div>
                <Container className="codes-container">
                    <Row>
                        <Col className="codes-col1">
                            {this.loadInputFormCodes()}

                        </Col>
                        <Col className="codes-col2">
                            Loading
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}
 export default SharedCodes;