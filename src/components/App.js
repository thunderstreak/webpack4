import React,{Component,Fragment} from 'react'
import { BrowserRouter as Router, HashRouter, Route, Switch, Redirect} from 'react-router-dom'
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

/*<Router>
        <Route exact path="/" component={Home}/>
    </Router>*/

import routers from '@SRC/routers'
import MultiRouter from './MultiRouter'
import Mulits from './MultiRouter/Multis'
import MulitsA from './MultiRouter/MultisPageA'
import MulitsAA from './MultiRouter/MultisPageA-A'

/*const App = () => (
    <HashRouter>
        <MultiRouter name="MultiRouter" type="props">
            <Switch>
                <Route path="/login" component={routers.Login}/>
                <Route path="/unknownPage" component={routers.unknownPage}/>
                <Mulits>
                    <Switch>
                        <Route exact path="/mulits/pageA" component={MulitsA} />
                        <Route path="/mulits/pageAA" component={MulitsAA} />
                        <Redirect from="*" to='/unknownPage'/>
                    </Switch>
                </Mulits>
                {/!*<Redirect from="*" to='/unknownPage'/>*!/}
            </Switch>
        </MultiRouter>
    </HashRouter>
);*/

const App = () => (
    <Router>
        <Route exact path="/" component={Home}/>
    </Router>
)

export default hot(App)
