import React, { Component } from 'react'
import axios from 'axios';
import {Card, Jumbotron} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import '../../Style/Profile.css'
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favcity: this.props.favcity
        }
    }
    async componentDidMount() {
        var obj = {
            city: this.props.favcity
        }
        const response = await axios.post('/api/testLiveWeather', obj);
        const jsonResponse = JSON.parse(response.data);
        const main = jsonResponse.main;
        const wind = jsonResponse.wind;
        const sys = jsonResponse.sys;
        let rain = jsonResponse.rain;
        if(!rain) {
            rain = "no rain"
        } else {
            rain = rain["1h"] + "mm"
        }
        var sunrise = new Date(sys.sunrise * 1000);
        var sunriseString = sunrise.toLocaleTimeString();
        var sunset = new Date(sys.sunset * 1000);
        var sunsetString = sunset.toLocaleTimeString();
        var temp = ((parseFloat(main.temp) * (9/5)) - 459.67).toString();
        var tempString = temp.substring(0, 4)
        var feelsLike = ((parseFloat(main.feels_like) * (9/5)) - 459.67).toString();
        var feelsLikeString = feelsLike.substring(0, 4);
        this.setState({
            temp: tempString,
            feelsLike: feelsLikeString,
            humidity: main.humidity,
            windspeed: wind.speed,
            winddirection: wind.deg,
            sunrise: sunriseString,
            sunset: sunsetString,
            pressure: main.pressure,
            rain: rain
        })
    }
    render() {
        return (
            <div>
                <Jumbotron className="data-jumbo">
                        <h1>Live Weather Data for {this.state.favcity}</h1>
                        <p>
                        Using the OpenWeather API, we are retrieving live weather data for your favorite city. View the API <a href="https://openweathermap.org/api"> here</a>! 
                        </p>
                        <hr></hr>


                </Jumbotron>
                <div className="data-card">
                    <Card style={{ width: '40%' }}>
                        <Card.Header>Favorite City Features for {this.props.favcity}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Temperature: {this.state.temp} &deg;F</ListGroup.Item>
                            <ListGroup.Item>Feels Like: {this.state.feelsLike} &deg;F</ListGroup.Item>
                            <ListGroup.Item>Humidity: {this.state.humidity}%</ListGroup.Item>
                            <ListGroup.Item>Pressure: {this.state.pressure} hPa</ListGroup.Item>
                            <ListGroup.Item>Wind Speed: {this.state.windspeed} m/s</ListGroup.Item>
                            <ListGroup.Item>Wind Direction: {this.state.winddirection}&deg;</ListGroup.Item>
                            <ListGroup.Item>Rain Volume, Past Hour: {this.state.rain}</ListGroup.Item>
                            {/* <ListGroup.Item>Sunrise: {this.state.sunrise} EDT</ListGroup.Item>
                            <ListGroup.Item>Sunset: {this.state.sunset} EDT</ListGroup.Item> */}
                        </ListGroup>
                    </Card>
                </div>  

                
            </div>
        )
    }
}

export default Profile