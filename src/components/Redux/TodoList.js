import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { toggleTodo } from '@REDUX/actions'
import { VisibilityFilters } from '@REDUX/actions'

import Todo from './Todo'

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
};

const mapStateToProps = state => {
    let sta = {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
    return sta
};

/*const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id))
    }
};*/
const mapDispatchToProps = (dispatch) => {
    return {
        toggleTodo:bindActionCreators(toggleTodo,dispatch)
    }
};

/*
* 装饰器模式添加 mapStateToProps mapDispatchToProps
* 类似connect( mapStateToProps, mapDispatchToProps )(components) 添加props属性和派发事件到组件上
* */
@connect(mapStateToProps,mapDispatchToProps)
export default class TodoList extends Component{
    static propTypes = {
        todos:PropTypes.arrayOf(
            PropTypes.shape({
                id          :PropTypes.number.isRequired,
                completed   :PropTypes.bool.isRequired,
                text        :PropTypes.string.isRequired
            }).isRequired
        ),
        toggleTodo:PropTypes.func.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            name : ''
        }
    }

    componentWillMount(){
        // console.log(this.props);
    }

    render(){
        return(
            <Fragment>
                <ul>
                    {this.props.todos.map((todo,index) => (
                        <Todo key={todo.id} {...todo} onClick={() => this.props.toggleTodo(todo.id,index)}/>
                    ))}
                </ul>
            </Fragment>
        )
    }
}
