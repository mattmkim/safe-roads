import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Select from 'react-select';

class Predictions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: [],
            cities: [],
            features: []
        }

        this.showFeatures = this.showFeatures.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/city",
        {
            method: "GET"
        }
        ).then(res => {
            return res.send();
        }, err => {
            console.log(err);
        }).then(cityList => {
            if (!cityList) return;
            let cityDivs = cityList.map((cityObj, i) => <Button id={"button-" + cityObj.city} onClick={() => this.showFeatures(cityObj.city)}>{cityObj.city}</Button>);
            this.setState({
                cities: cityDivs
            });
        }, err => {
            console.log(err);
        });
    }

    showFeatures(city) {
        this.setState({
            placeholder: city
        })
    }

    render () {
        return (
            <div className="predictions">
                <div className="container">
                    <div className="h5">U.S. Cities</div>
                    <div className="cities-container">
                        {this.state.cities}
                    </div>
                </div>
            </div>
        )
    }
}

export default Predictions;