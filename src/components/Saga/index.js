import React,{Component,Fragment} from 'react'
import { connect } from 'react-redux'
import Counter from './Counter'
import Users from './Users'

const mapStateToProps = (state) => {
    return {
        value:state.counter.value
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
        this.props.dispatch({
            type:'INCREMENT_ASYNC',
        })
    };
    onDecrement = () => {
        this.props.dispatch({
            type:'DECREMENT_ASYNC',
        })
    };

    render(){
        return(
            <Fragment>
                {this.props.value}
                <Counter value={this.props.value}
                         onIncrement={this.onIncrement}
                         onDecrement={this.onDecrement}
                         onIncrementAsync={() => this.props.dispatch('INCREMENT_ASYNC')}/>
                <Users/>
            </Fragment>
        )
    }
}
