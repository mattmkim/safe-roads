import React, { Component } from 'react'
import {Jumbotron, Alert} from 'react-bootstrap'
import InfoCard from './InfoCard'
import ProfileCard from './ProfileCard'
import time from './time.png'
import prediction from './prediction.png'
import search from './search.png'
import feature from './feature.png'
import Auth from '../../Middleware/Auth'
import vinke from './vinke.png'
import kevin from './kevin.png'
import daniel from './daniel.png'
import matt from './matt.png'
import '../../Style/Info.css'

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favcity: '',
            validUpdate: ''
        }
    }

    handleCities = (event) => {
        this.setState({
            favcity: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var obj = {email: localStorage.getItem("email"), favcity: this.state.favcity};
            
        Auth.updateCity(obj, (result) => {
            if (result === "success") {
                this.setState({
                    validUpdate: "valid",
                    favcity: ''
                })
            } else {
                this.setState({
                    validUpdate: "invalid"
                })
            }
        })
    }

    render () {

        let alert;
        if (this.state.validUpdate === "valid") {
            alert = <Alert variant="success"> Successful update. </Alert>
        } else if (this.state.validUpdate === "invalid") {
            alert = <Alert variant="danger"> Unsuccessful update. Please try again. </Alert>
        }

        return (
            <div>
                <div>
                    {alert}
                </div>
                <div className="content-wrapper">
                    <Jumbotron className="jumbo">
                        <h1>Welcome to Safe Roads!</h1>
                        <p>
                        Web application for CIS 550 (Databases & Info Systems) final project at the University of Pennsylvania with functionalities for querying and visualizing U.S. accident data with associated weather factors.
                        </p>
                        <hr></hr>
                        <div className="lel-wrapper">
                            <ProfileCard className="lel" title={"Kevin Xu"} info={""} img={vinke}/>
                            <ProfileCard className="lel" title={"Daniel Kim"} info={""} img={daniel}/>
                            <ProfileCard className="lel" title={"Kevin Sun"} info={""} img={kevin}/>
                            <ProfileCard className="lel" title={"Matthew Kim"} info={""} img={matt}/>
                        </div>


                    </Jumbotron>
                    <h2> Features </h2>
                    <div className="card-wrapper">
                        <InfoCard className="cards" title={"City Comparison"} info={"Compare accident data amongst user specified cities."} img={search}/>
                        <InfoCard className="cards" title={"City Statistics"} info={"Get summary statistics for weather and accident data for cities."} img={feature}/>
                        <InfoCard className="cards" title={"Time Series"} info={"Understand and visualize trends of accident and weather data over time."} img={time}/>
                        <InfoCard className="cards" title={"Predictions"} info={"Compare hypothetical data and visualize predicted trends in the future."} img={prediction}/>
                    </div>
                    
                    
                </div>
                                   
            </div>
        )
    }
}

export default Info