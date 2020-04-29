import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import '../../Style/InfoCard.css'

class InfoCard extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Card className="cards" style={{ width: '18rem' }}>
                <div class='image-wrapper'>
                    <Card.Img variant="top" src={this.props.img} />
                </div>
                
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
    