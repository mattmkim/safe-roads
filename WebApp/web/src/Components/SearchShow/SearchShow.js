import React, { Component } from 'react';
import Select from 'react-select';

class SearchShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiValue: [],
            options: [
                {value: 'Portland', label: 'Portland'},
                {value: 'San Francisco', label: 'San Francisco'},
                {value: 'Seattle', label: 'Seattle'},
                {value: 'Los Angeles', label: 'Los Angeles'},
                {value: 'San Diego', label: 'San Diego'},
                {value: 'Las Vegas', label: 'Las Vegas'},
                {value: 'Phoenix', label: 'Phoenix'},
                {value: 'Albuquerque', label: 'Albuquerque'},
                {value: 'Denver', label: 'Denver'},
                {value: 'San Antonio', label: 'San Antonio'},
                {value: 'Dallas', label: 'Dallas'},
                {value: 'Houston', label: 'Houston'},
                {value: 'Kansas City', label: 'Kansas City'},
                {value: 'Minneapolis', label: 'Minneapolis'},
                {value: 'Saint Louis', label: 'Saint Louis'},
                {value: 'Chicago', label: 'Chicago'},
                {value: 'Nashville', label: 'Nashville'},
                {value: 'Indianapolis', label: 'Indianapolis'},
                {value: 'Atlanta', label: 'Atlanta'},
                {value: 'Detroit', label: 'Detroit'},
                {value: 'Jacksonville', label: 'Jacksonville'},
                {value: 'Charlotte', label: 'Charlotte'},
                {value: 'Miami', label: 'Miami'},
                {value: 'Pittsburgh', label: 'Pittsburgh'},
                {value: 'Philadelphia', label: 'Philadelphia'},
                {value: 'New York', label: 'New York'},
                {value: 'Boston', label: 'Boston'}
            ]
        }

        this.handleMultiChange = this.handleMultiChange.bind(this);
    }

    handleMultiChange(option) {
        this.setState({
            multiValue: option
        })
    }

    render () {
        return (
            <div>
                <Select value={this.state.multiValue} onChange={this.handleMultiChange} options={this.state.options} isMulti={true}/>
            </div>
        )
    }
}

export default SearchShow