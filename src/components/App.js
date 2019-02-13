import React,{Component,Fragment} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Home'
import { hot } from 'react-hot-loader/root'

/*class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : 'App'
        }
    }

    render(){
        return(
            <Fragment>
                <Router>
                    <Route exact path="/" component={Home}/>
                </Router>
            </Fragment>
        )
    }
}*/

const App = () => (
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>
);
export default hot(App)
