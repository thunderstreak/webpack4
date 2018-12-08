import React, { Component, Fragment } from 'react'

export default class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:props.name,
            date:new Date()
        }
        this.timerID = null;
    }

    tick(){
        this.setState({date:new Date()})
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.tick(),1000)
    }

    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    render(){
        console.log(this);
        return(
            <Fragment>
                <div>{this.state.date.toLocaleTimeString()}</div>
                <div>{this.state.name}</div>
            </Fragment>
        )
    }
}
