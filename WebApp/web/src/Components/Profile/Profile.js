import React, { Component } from 'react'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favcity: this.props.favcity
        }
    }

    render () {
        return (
            <div>
                Favorite city = {this.state.favcity}    
            </div>
        )
    }
}

export default Profile