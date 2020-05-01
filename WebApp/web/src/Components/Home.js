import React, { Component, useState, setShow } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import '../Style/navbar.css'
import Info from './Info/Info'
import TimeSeries from '../Components/Time Series/TimeSeries'
import Predictions from '../Components/Predictions/Predictions'
import SearchShow from '../Components/SearchShow/SearchShow'
import Features from '../Components/Features/Features'
import Auth from '.././Middleware/Auth'
import options from '../Components/SearchShow/options'
import '../Style/Home.css'

class Home extends Component {
    // change ur respective stuff
    // whoever does login flow should fill this out
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'profile',
            favcity: '',
            showModal: false,
            validUpdate: ''
        }
    }

    componentDidMount() {
        var email = localStorage.getItem("email");

        var obj = {email: email};
        console.log(email);

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

    handleSubmit = (event) => {
        event.preventDefault();

        var obj = {email: localStorage.getItem("email"), favcity: this.state.favcity};
            
        Auth.updateCity(obj, (result) => {
            if (result === "success") {
                this.setState({
                    validUpdate: "valid",
                    favcity: '',
                    showModal: false
                })
            } else {
                this.setState({
                    validUpdate: "invalid",
                    showModal: false
                })
            }
        })
    }

    handleCities = (event) => {
        this.setState({
            favcity: event.target.value
        })
    }

    logout() {
        console.log("logout")
        this.props.history.push({
            pathname: '/'
        })
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    handleClose() {
        this.setState({
            showModal: false
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

        let alert;
        if (this.state.validUpdate === "valid") {
            alert = <Alert variant="success"> Successful update. </Alert>
        } else if (this.state.validUpdate === "invalid") {
            alert = <Alert variant="danger"> Unsuccessful update. Please try again. </Alert>
        }

        return <div>
            <div>
                    {alert}
                </div>
            <div className="wrapper">
                <Navbar className="navbar" variant="dark">
                    <Navbar.Brand href="/home" className="navbar-title" onClick={() => { this.setState({ currentPage: 'profile' }) }}>Safe Roads</Navbar.Brand>
                    <Nav className="container-fluid">
                        <Nav.Link className="tabs" onClick={() => { this.setState({currentPage: 'search and show'})}}>Search and Show</Nav.Link>
                        <Nav.Link className="tabs" onClick={() => { this.setState({ currentPage: 'time series' }) }}>Time Series Visualization</Nav.Link>
                        <Nav.Link className="tabs" onClick={() => { this.setState({ currentPage: 'features'}) }}>Features</Nav.Link>
                        <Nav.Link className="tabs" onClick={() => { this.setState({ currentPage: 'predictions' }) }}>Predictions</Nav.Link>
                        <Nav.Item className="ml-auto">
                            <div className="update-button-container">
                                <Button className="button" variant="outline-light" onClick={() => { this.showModal() }}> Update City </Button>
                                <Modal show={this.state.showModal} onHide={() => { this.handleClose() }}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Update Favorite City</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <Form onSubmit = {this.handleSubmit}>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>Favorite City</Form.Label>
                                            <Form.Control as="select" onChange={(e) => this.handleCities(e)}>
                                                {options && options.map((e, key) => {
                                                    return <option key = {key} value={e.value}> {e.value} </option>
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                        <div class="button">
                                            <Button variant="primary" type="submit">
                                                Update
                                            </Button>
                                        </div>
                                    </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    </Modal.Footer>
                                </Modal>
                            </div>
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