import React,{Component,Fragment} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '@REDUX/actions'

class AddTodo extends Component{
   constructor(props){
       super(props);
       this.state = {
           inputval : '',
       };
       this.handlerSubmit = this.handlerSubmit.bind(this);
       this.node = React.createRef();
   }

   componentWillMount(){
       console.log(this.props);
   }

   handlerSubmit(e){
       e.preventDefault();
       let value = this.node.current.value;
       if (!value.trim()) {
           return
       }
       this.props.dispatch(addTodo(value));
       this.setState({inputval:''})
   }

   render(){
       return(
           <Fragment>
               <div>
                   <form onSubmit={this.handlerSubmit}>
                       <input ref={this.node} />
                       <button type="submit">Add Todo</button>
                   </form>
               </div>
           </Fragment>
       )
   }
}

export default connect()(AddTodo)
