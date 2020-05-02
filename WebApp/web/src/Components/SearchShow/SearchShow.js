import React, { Component } from 'react';
import SharedCodes from './SharedCodes';
import Quintiles from './Quintiles';
class SearchShow extends Component {
    state = {
        content: 'quintiles'
    }
    renderContent() {
        if(this.state.content === "quintiles") {
           return <Quintiles favcity={this.props.favcity}/>
        } else {
            return <SharedCodes/>
        }
    }
    render() {
        return (
            <div>
                <div className="vertical-nav bg-light" id="sidebar" style = {{float: "left"}}>
                    <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Tabs</p>
                    <ul className="nav flex-column bg-light mb-0">
                        <li className="nav-item">
                            <div onClick = {() => {this.setState({content: 'quintiles'})}}className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Quintiles
                            </div>
                        </li>
                        <li className="nav-item">
                            <div onClick = {() => {this.setState({content: 'SharedCodes'})}} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Shared Codes
                            </div>
                        </li>
                    </ul>
                </div>
                <div style = {{ marginLeft: '17rem', marginTop: '30px'}}>
                {this.renderContent()} </div>
                
                

            </div >
        )
    }
}

export default SearchShow