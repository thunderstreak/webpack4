import { connect } from 'react-redux'
import { toggleTodo } from '@REDUX/actions'
import { VisibilityFilters } from '@REDUX/actions'
import TodoList from '../TodoList'

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
    console.log(state);
    return sta
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id))
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(TodoList)
