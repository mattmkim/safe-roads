import React, {Component} from 'react'
import { ScatterChart } from '@opd/g2plot-react';
import Button from 'react-bootstrap/Button'

class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            features: []
        }

        this.showFeatures = this.showFeatures.bind(this);
    }

    componentDidMount() {

    }

    showFeatures(city) {
        this.setState({
            
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

export default Features;