import React,{ Component, Fragment } from 'react'
import ClockEL from './Clock'
export default class Clock extends Component{
    static defaultProps = {
        defaultValue:'defaultProps'
    };

    constructor(props){
        super(props);
        this.state = {
            name:'Clock1',
            show:false
        };

        this.parentHandler = this.parentHandler.bind(this);
        this.componentShowHandler = this.componentShowHandler.bind(this);
    }

    parentHandler(e){
        console.log(e);
    }

    componentShowHandler(){
        this.setState(prevState => ({
            show:!prevState.show
        }))
    }

    render(){
        return (
            <Fragment>
                {
                    this.state.show ? <ClockEL show={this.state.show} name={this.state.name} onClick={this.parentHandler} date={new Date().toLocaleTimeString()}/> : false
                }
                <button onClick={this.componentShowHandler}>{this.state.show ? 'true' : 'false'}</button>
            </Fragment>
        )
    }
}
