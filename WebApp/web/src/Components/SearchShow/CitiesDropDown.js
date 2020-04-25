import React, { Component } from 'react';
import Select from 'react-select';
import '../../Style/Dropdown.css'
import axios from 'axios';
class CitiesDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            customCity: ''
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
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    // commented out for testing
                    var parsedList = this.state.customCity.split(', ');
                    parsedList = parsedList.map((val) => { return { label: val } })
                    console.log(parsedList);
                    const param = {
                        cities: [...this.state.multiValue, ...parsedList]
                    }
                    // const param = {cities: [{label: 'Fresno'}, {label: 'Belfield'}]}
                    const response = await axios.post('/api/getQuintilesForCity', param);
                    //const response = null;
                    this.props.handleSubmit(response);

                }}>
                    <Select className="select" value={this.state.multiValue} onChange={this.handleMultiChange} options={this.props.options} isMulti={true} />
                    <label style = {{display: "block"}}> Enter your own city</label>
                    <input style = {{display: "block"}} value={this.state.customCity} onChange={(e) => { this.setState({ customCity: e.target.value }) }} />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default CitiesDropDown;