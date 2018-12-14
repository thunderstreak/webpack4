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
                {/*<li><Link to="/">{this.state.name}</Link></li>*/}
                {/*<li><Link to="/Mouse">Mouse</Link></li>*/}
                {/*<li><Link to="/Bmap">Bmap</Link></li>*/}
                {/*<li><Link to="/Drag">Drag</Link></li>*/}
                {/*<li><Link to="/Login">Login</Link></li>*/}
                {/*<li><Link to="/Clock">Clock</Link></li>*/}
                {/*<li><Link to="/StateAscension">stateAscension</Link></li>*/}
                {/*<li><Link to="/ListFilter">listFilter</Link></li>*/}
            </ul>
        )
    }
}
