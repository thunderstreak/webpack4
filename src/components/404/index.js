import React, { Component, Fragment } from 'react'

export default class unknownPage extends Component{
    constructor(){
        super();
        this.state = {
            name:'unknowPage',

        }
    }

    render(){
        return(
            <Fragment>
                <div>{this.state.name}</div>
                <img src={require('../../images/3.jpg')} alt=""/>
            </Fragment>
        )
    }
}
