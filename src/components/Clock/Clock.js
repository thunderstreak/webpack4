import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export default class Clock extends Component{
    static defaultProps = {
        propOne : [1,2,3,4,5],
    };

    /*static PropTypes = {
        propOne:PropTypes.string.isRequired
    };*/

    constructor(props){
        super(props);
        this.state = {
            name:props.name,
            date:new Date()
        };
        this.timerID = null;
        this.renderDateHandler = this.renderDateHandler.bind(this);
        // this.clickListHandler = this.clickListHandler.bind(this);

        // this.state.list = this.props.propOne.map((n,i) => <div key={i} onClick={this.clickListHandler.bind(this)}>{n}</div>);

        console.log(this.props);
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

    renderDateHandler(){
        this.props.onClick(this.state.date)
    }

    clickListHandler(e){
        console.log(e.target);
    }

    render(){
        return(
            <Fragment>
                <div onClick={this.renderDateHandler}>{this.state.date.toLocaleTimeString()}</div>
                { typeof this.props.propOne === "string" && <div>-{this.state.name}-</div> }
                <ul>
                    {
                        this.props.propOne.map((n,i) => <li key={i} onClick={this.clickListHandler} itemID={i}>{n}</li>)
                    }
                </ul>
            </Fragment>
        )
    }
}
