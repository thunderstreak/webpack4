import React,{Component,Fragment} from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

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
        console.log(this.props);
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
