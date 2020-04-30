import React, { Component } from 'react';
import SharedCodes from './SharedCodes';
import Quintiles from './Quintiles';
class SearchShow extends Component {
    state = {
        content: 'quintiles'
    }
    renderContent() {
        if(this.state.content === "quintiles") {
           return <Quintiles/>
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
                            <a onClick = {() => {this.setState({content: 'quintiles'})}}className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                Quintiles
                            </a>
                        </li>
                        <li className="nav-item">
                            <a onClick = {() => {this.setState({content: 'SharedCodes'})}} className="nav-link text-dark font-italic bg-light">
                                <i className="fa fa-th-large mr-3 text-primary fa-fw"></i>
                                SharedCodes
                            </a>
                        </li>
                    </ul>
                </div>
                <div style = {{margin: '20rem', marginTop: '30px'}}>
                {this.renderContent()} </div>
                
                

            </div >
        )
    }
}

export default SearchShow