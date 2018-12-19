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
            <ul style={{border:'1px red solid'}}>
                <li><Link to="/" replace>home</Link></li>
                <li><Link to="/mouse" replace>Mouse</Link></li>
                {/*<li><Link to="/Bmap" replace>Bmap</Link></li>*/}
                <li><Link to="/drag" replace>Drag</Link></li>
                <li><Link to="/login" replace>Login</Link></li>
                <li><Link to="/clock" replace>Clock</Link></li>
                <li><Link to="/stateAscension" replace>stateAscension</Link></li>
                <li><Link to="/listFilter" replace>listFilter</Link></li>
                <li><Link to="/themes" replace>Themes</Link></li>
                <li><Link to="/portals" replace>Portals</Link></li>
                <li><Link to="/redux" replace>Redux</Link></li>
                <li><Link to="/authority/1" replace>Authority</Link></li>
                <li><Link to="/poetry" replace>Poetry</Link></li>

                <li>{this.props.todos && this.props.todos.length > 0 ? this.props.todos.map((todo) => todo.text) : null}</li>
                <li>{this.props.loginData ? this.props.loginData.content : null}</li>
            </ul>
        )
    }
}
