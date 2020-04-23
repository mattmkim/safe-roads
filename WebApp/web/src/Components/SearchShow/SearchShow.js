import React, { Component } from 'react';
import '../../Style/SearchShow.css'
import SharedCodes from './SharedCodes';
import Quintiles from './Quintiles';
class SearchShow extends Component {
    render() {
        return (
            <div>
                <Quintiles/>
                <SharedCodes/>
            </div>
        )
    }
}

export default SearchShow