import React, { Component } from 'react'
import {Tab, Row, Col, Nav, Jumbotron, Button} from 'react-bootstrap'
import InfoCard from './InfoCard'
import '../../Style/Info.css'

class Info extends Component {

    render () {
        return (
            <div>
                <Tab.Container id="left-tabs" defaultActiveKey="first">
                    <Row>
                        <Col lg={1}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                <Jumbotron>
                                    <h1>Welcome to Safe Roads!</h1>
                                    <p>
                                        This is a simple hero unit, a simple jumbotron-style component for calling
                                        extra attention to featured content or information.
                                    </p>
                                    <p>
                                        <Button variant="primary">Learn more</Button>
                                    </p>
                                </Jumbotron>
                                <div class="card-wrapper">
                                    <InfoCard title={"Search and Show"} info={"hello"} />
                                    <InfoCard title={"Time Series"} info={"hello"} />
                                    <InfoCard title={"Features"} info={"hello"} />
                                    <InfoCard title={"Predictions"} info={"hello"} />
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