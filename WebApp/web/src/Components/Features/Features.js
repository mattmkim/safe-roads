import React, {Component} from 'react'
import Select from 'react-select';
import { ScatterChart } from '@opd/g2plot-react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: [],
            cities: [],
            features: []
        }

        this.showFeatures = this.showFeatures.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get('/api/city');
        if (response.data) {
            var cityList = response.data.rows;
            let cityDivs = cityList.map((data) => {return {value: `${data.CITY}`, label: `${data.CITY}`}});
            console.log(cityDivs);
            this.setState({
                cities: cityDivs
            });
        }
    }

    showFeatures(input_city) {
        this.setState({
            city: `${input_city}`
        })
    }

    render () {
        return (
            <div className="predictions">
                <div className="container">
                    <div className="h5">U.S. Cities</div>
                    <div className="cities-container">
                        <Select value={this.state.city} onChange={this.showFeatures} options={this.state.cities} isMulti={false}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Features;