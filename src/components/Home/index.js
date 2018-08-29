import React,{Component} from 'react'

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'home'
        }
    }

    render(){
        return(
            <ul>
                <li style={{color:'blue'}}>{this.state.name}</li>
            </ul>
        )
    }
}
