import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import './navbar.css'
import Profile from './Components/Profile/Profile'
import TimeSeries from './Components/Time Series/TimeSeries'
import Predictions from './Components/Predictions/Predictions'
import SearchShow from './Components/SearchShow/SearchShow'
import Features from './Components/Features/Features'
class App extends Component {
    // change ur respective stuff
    // whoever does login flow should fill this out
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'profile'
        }
    }
    logout() {
        console.log("logout")
    }

    renderBody() {
        var currentPage = this.state.currentPage;
        if(currentPage === 'profile') {
            return <Profile />
        } else if (currentPage === 'time series') {
            return <TimeSeries />
        } else if (currentPage === 'predictions') {
            return <Predictions/>
        } else if (currentPage === 'search and show') {
            return <SearchShow/>
        } else if (currentPage === 'features') {
            return <Features/>
        }
    }
    render() {
        return <div>
            <div className="wrapper">
                <Navbar className="navbar" variant="dark">
                    <Navbar.Brand className="navbar-title">Safe-Roads</Navbar.Brand>
                    <Nav className="container-fluid">
                        <Nav.Link onClick={() => { this.setState({ currentPage: 'profile' }) }}>Profile</Nav.Link>
                        <Nav.Link onClick={() => { this.setState({currentPage: 'search and show'})}}>Search and Show</Nav.Link>
                        <Nav.Link onClick={() => { this.setState({ currentPage: 'time series' }) }}>Time Series Visualization</Nav.Link>
                        <Nav.Link onClick={() => { this.setState({ currentPage: 'features'}) }}>Features</Nav.Link>
                        <Nav.Link onClick={() => { this.setState({ currentPage: 'predictions' }) }} href="#pricing">Predictions</Nav.Link>
                        <Nav.Item className="ml-auto">
                            <div className ="button-container">
                                <Button className="button" variant="outline-light" onClick={() => { this.logout() }}> Log Out</Button>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
            <div>
            {this.renderBody()}
            </div>
        </div>
    }
}

export default App