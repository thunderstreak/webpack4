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
            value: 1
        }
    }


    onIncrement = () => {
        this.props.dispatch({
            type:'INCREMENT',
        })
    };
    onDecrement = () => {
        this.props.dispatch({
            type:'DECREMENT',
        })
    };

    onIncrementAsync = () => {
        this.props.dispatch({
            type: 'INCREMENT_ASYNC'
        })
    }

    render(){
        const { value, dispatch } = this.props
        const { onIncrement, onDecrement, onIncrementAsync } = this
        return(
            <Fragment>
                {value}
                <Counter value={value} onIncrement={onIncrement} onDecrement={onDecrement} onIncrementAsync={onIncrementAsync}/>
                <Users/>
            </Fragment>
        )
    }
}
