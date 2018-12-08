import React,{ Component, Fragment } from 'react'
import ClockEL from './Clock'
export default class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'Clock1'
        }
    }

    render(){
        return (
            <Fragment>
                <ClockEL name={this.state.name} date={new Date().toLocaleTimeString()}/>
            </Fragment>
        )
    }
}
