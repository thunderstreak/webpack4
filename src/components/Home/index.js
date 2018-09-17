import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component{
    static displayName = "HOME";
    constructor(props){
        super(props);
        this.state = {
            name:'home'
        }
    }
    render(){
        return(
            <ul>
                <li style={{color:'blue'}}><Link to="/">{this.state.name}</Link></li>
                <li><Link to="/Mouse">Mouse</Link></li>
            </ul>
        )
    }
}
