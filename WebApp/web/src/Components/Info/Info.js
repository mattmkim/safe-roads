import React, { Component } from 'react'
import {Tab, Row, Col, Nav, Jumbotron, Card, Button, Form, Alert} from 'react-bootstrap'
import InfoCard from './InfoCard'
import time from './time.png'
import options from '../SearchShow/options'
import prediction from './prediction.png'
import search from './search.png'
import feature from './feature.png'
import Auth from '../../Middleware/Auth'
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
                <Tab.Container className="tab-container" id="left-tabs" defaultActiveKey="first">
                    <Row>
                    <div class="col-1">
                        <Col lg={1}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item className="item">
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </div>


                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Col sm={10}>
                                    <Jumbotron>
                                        <h1>Welcome to Safe Roads!</h1>
                                        <p>
                                        Web application for CIS 550 (Databases & Info Systems) final project at the University of Pennsylvania with functionalities for querying and visualizing U.S. accident data with associated weather factors.
                                        </p>

                                    </Jumbotron>
                                    <div class="card-wrapper">
                                        <InfoCard className="cards" title={"Search and Show"} info={"hello"} img={search}/>
                                        <InfoCard className="cards" title={"Time Series"} info={"hello"} img={time}/>
                                        <InfoCard className="cards" title={"Features"} info={"hello"} img={feature}/>
                                        <InfoCard className="cards" title={"Predictions"} info={"hello"} img={prediction}/>
                                    </div>
                                   
                                   <div class="form-wrapper">
                                    <h2> Want to update your favorite city?</h2>
                                    <Card style={{ width: '28rem' }}>
                                            <Card.Body>
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
                                            </Card.Body>
                                        </Card>
                                   </div>
                                    
                                </Col>                                
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                bye
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default Info