import React,{Component,Fragment} from 'react'
import { connect } from 'react-redux'
import { addTodo } from '@REDUX/actions'

@connect()
export default class AddTodo extends Component{
   constructor(props){
       super(props);
       this.state = {
           inputval : '',
       };
       this.handlerSubmit = this.handlerSubmit.bind(this);
       this.handlerChange = this.handlerChange.bind(this);
       this.node = React.createRef();
   }

   componentWillMount(){
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

    handlerChange(e){
       let val = e.target.value;
       if(!val.trim()){
           return
       }
       this.setState({inputval:val})
    }

   render(){
       return(
           <Fragment>
               <div>
                   <form onSubmit={this.handlerSubmit}>
                       <input ref={this.node} value={this.state.inputval} onChange={this.handlerChange}/>
                       <button type="submit">添加待办事项</button>
                   </form>
               </div>
           </Fragment>
       )
   }
}
