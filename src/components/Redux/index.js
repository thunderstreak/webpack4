import React,{Component,Fragment} from 'react'
import Footer from './Footer'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

export default class Redux extends Component{

    constructor(props){
        super(props);
        this.state = {
            name : 'Redux'
        }
    }

    componentDidMount(){
    }

    render(){
        return(
            <Fragment>
                <AddTodo />
                <TodoList />
                <Footer />
            </Fragment>
        )
    }
}
