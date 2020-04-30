import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import '../Style/navbar.css'
import Info from './Info/Info'
import TimeSeries from '../Components/Time Series/TimeSeries'
import Predictions from '../Components/Predictions/Predictions'
import SearchShow from '../Components/SearchShow/SearchShow'
import Features from '../Components/Features/Features'
import Auth from '.././Middleware/Auth'
import '../Style/Home.css'
class Home extends Component {
    // change ur respective stuff
    // whoever does login flow should fill this out
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'profile',
            favcity: ''
        }
    }

    componentDidMount() {
        var email = localStorage.getItem("email");

        var obj = {email: email};

        Auth.getFavCity(obj, (result) => {
            if (result === "error") {
                this.setState({
                    favcity: ''
                })
            } else {
                this.setState({
                    favcity: result
                })
            }
        })
    }

    logout() {
        console.log("logout")
        this.props.history.push({
            pathname: '/'
        })
    }

    renderBody() {
        var currentPage = this.state.currentPage;

        console.log(this.state.favcity);

        if(currentPage === 'profile') {
            return <Info favcity={this.state.favcity} />
        } else if (currentPage === 'time series') {
            return <TimeSeries favcity={this.state.favcity}/>
        } else if (currentPage === 'predictions') {
            return <Predictions favcity={this.state.favcity}/>
        } else if (currentPage === 'search and show') {
            return <SearchShow favcity={this.state.favcity}/>
        } else if (currentPage === 'features') {
            return <Features favcity={this.state.favcity}/>
        }

        
    }
    render() {
        return <div>
            <div className="wrapper">
                <Navbar className="navbar" variant="dark">
                    <Navbar.Brand href="/home" className="navbar-title" onClick={() => { this.setState({ currentPage: 'profile' }) }}>Safe Roads</Navbar.Brand>
                    <Nav className="container-fluid">
                        <Nav.Link className="tabs" onClick={() => { this.setState({currentPage: 'search and show'})}}>Search and Show</Nav.Link>
                        <Nav.Link className="tabs" onClick={() => { this.setState({ currentPage: 'time series' }) }}>Time Series Visualization</Nav.Link>
                        <Nav.Link className="tabs" onClick={() => { this.setState({ currentPage: 'features'}) }}>Features</Nav.Link>
                        <Nav.Link className="tabs" onClick={() => { this.setState({ currentPage: 'predictions' }) }}>Predictions</Nav.Link>
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

export default Home