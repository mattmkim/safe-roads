import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
        this.setState({
            temp: main.temp,
            feelsLike: main.feels_like,
            humidity: main.humidity,
            windspeed: wind.speed,
            winddirection: wind.deg,
            sunrise: sys.sunrise,
            sunset: sys.sunset
        })
    }
    render() {
        return (
            <div>
                <Card style={{ width: '50%' }}>
                    <Card.Header>Favorite City Features for {this.props.favcity}</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Temp: {this.state.temp}</ListGroup.Item>
                        <ListGroup.Item>Feels Like: {this.state.feelsLike}</ListGroup.Item>
                        <ListGroup.Item>Humidity: {this.state.humidity}</ListGroup.Item>
                        <ListGroup.Item>Wind Speed: {this.state.windspeed}</ListGroup.Item>
                        <ListGroup.Item>Wind Direction: {this.state.winddirection}</ListGroup.Item>
                        <ListGroup.Item>Sunrise: {this.state.sunrise}</ListGroup.Item>
                        <ListGroup.Item>Sunset: {this.state.sunset}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        )
    }
}

export default Profile