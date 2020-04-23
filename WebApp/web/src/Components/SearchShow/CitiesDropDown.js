import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
class CitiesDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiValue: []
        }

        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    handleMultiChange(option) {
        this.setState({
            multiValue: option
        })
    }

    getResults() {
        return this.state.multiValue;
    }

    render() {
        return (
            <div>
                <form onSubmit = {async (e) => {
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
                    <Select value={this.state.multiValue} onChange={this.handleMultiChange} options={this.props.options} isMulti={true} />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default CitiesDropDown;