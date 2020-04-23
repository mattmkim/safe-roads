import React, { Component } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import '../../Style/Dropdown.css'
import axios from 'axios';
class CitiesDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            numCodes: ''
        }

        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    handleMultiChange(option) {
        this.setState({
            multiValue: option
        })
    }

    handleCodesChange = (event) => {
        this.setState({
            numCodes: event.target.value
        })
    }

    getResults() {
        return this.state.multiValue;
    }

    render() {
        return (
            <div>
                <Form onSubmit = {async (e) => {
                    e.preventDefault();
                    // commented out for testing
                    //const param = {
                    //    cities: this.state.multiValue
                    //}
                    // const param = {cities: [{label: 'Fresno'}, {label: 'Belfield'}]}
                    // const response = await axios.post('/api/getQuintilesForCity', param);
                    // console.log("done" + response);
                    const response = null;
                    this.props.handleSubmit(response);  

                }}> 
                    <Select className="select" value={this.state.multiValue} onChange={this.handleMultiChange} options={this.props.options} isMulti={true} />
                    <Form.Group controlId="numCodes">
                        <Form.Label>Pick Number of Shared Codes To Display</Form.Label>
                        <Form.Control value={this.state.numCodes} type="numCodes" placeholder="Number of Codes" onChange = {this.handleCodesChange}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </Form>
            </div>
        )
    }
}
export default CitiesDropDown;