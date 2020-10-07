import React, { Component } from 'react';

class TablePage extends Component {
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        return(
            <h1>tablePage</h1>
        )
    }
}

export default TablePage;