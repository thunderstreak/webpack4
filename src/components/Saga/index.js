import React,{Component,Fragment} from 'react'
import { connect } from 'react-redux'
import Counter from './Counter'
import {sagaTest} from '@REDUX/actions'
import {incrementAsync} from '@REDUX/saga'

const mapStateToProps = (state) => {
    return {
        value:state.saga.value
    }
};

@connect(mapStateToProps)
export default class Saga extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'Saga',
            value: 0
        }
    }


    onIncrement = () => {
        this.props.dispatch(incrementAsync())
    };
    onHanderl = (type) => {
        this.props.dispatch(incrementAsync())
    }

    render(){
        return(
            <Fragment>
                {this.props.value}
                <Counter value={this.props.value}
                         onIncrement={this.onIncrement}
                         onDecrement={() => this.props.dispatch('DECREMENT')}
                         onIncrementAsync={() => this.props.dispatch('INCREMENT_ASYNC')}/>
            </Fragment>
        )
    }
}
