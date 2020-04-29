import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'

class InfoCard extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.info}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default InfoCard;
    