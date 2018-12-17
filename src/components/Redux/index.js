import React,{Component,Fragment} from 'react'
import Footer from './Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

export default class Redux extends Component{

    constructor(props){
        super(props);
        this.state = {
            name : 'Redux'
        }
    }

    componentDidMount(){
        console.log(1);
    }

    render(){
        return(
            <Fragment>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </Fragment>
        )
    }
}
