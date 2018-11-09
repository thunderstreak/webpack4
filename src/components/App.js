import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import routers from '@SRC/routers';
import '../styles/main.less'

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={routers.Home}/>
                    <Route exact path="/Mouse" component={routers.Mouse}/>
                    <Route exact path="/Bmap" component={routers.Bmap}/>
                </Switch>
            </Router>
        )
    }
}
