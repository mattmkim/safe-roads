import React, { Component } from 'react'
import {Card,Image} from 'react-bootstrap'
import '../../Style/ProfileCard.css'

class ProfileCard extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Card bg="light" text="dark" border="dark" className="lel" style={{ width: '18rem' }}>
                <div className="image-wrapper-prof">
                    <Image src={this.props.img} rounded />
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

export default ProfileCard;
    