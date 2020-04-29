import React, { Component } from 'react'
import Deviations from './Deviations';
import TimeSeriesProjections from './Projections'
import './Predictions.css'
class Predictions extends Component {
    state = {
        content: 'deviations'
    }
    renderContent() {
        if (this.state.content === "deviations") {
            return <Deviations />
        } else {
            return <TimeSeriesProjections />
        }
    }
    render() {
        return (
            <div>
                <div className="vertical-nav bg-light" id="sidebar" style={{ float: "left" }}>
                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

                    <ul className="nav flex-column bg-light mb-0">
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'deviations' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Deviations
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => { this.setState({ content: 'projection' }) }} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Projections
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="page-content">
                    {this.renderContent()} </div>

            </div >
        )
    }
}

export default Predictions;