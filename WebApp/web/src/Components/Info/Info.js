import React, { Component } from 'react'
import {Tab, Row, Col, Nav, Jumbotron, Button} from 'react-bootstrap'
import InfoCard from './InfoCard'
import time from './time.png'
import prediction from './prediction.png'
import search from './search.png'
import feature from './feature.png'
import '../../Style/Info.css'

class Info extends Component {

    render () {
        return (
            <div>
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


                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
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
                                    

                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    bye
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}

export default Info