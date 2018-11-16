import React from 'react'
import {BrowserRouter, Route, Switch, Redirect, HashRouter} from 'react-router-dom'

import routers from '@SRC/routers'
// import PrivateRoute from '@SRC/routers/PrivateRoute'
// import HocPrivateRoute from '@SRC/routers/HocPrivateRoute'

// const PrivateRouteHoc = HocPrivateRoute(Route);
import '../styles/main.less'

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    {/*<Redirect from='/Bmap' to='/Mouse'/>*/}
                    <Route exact path="/home" component={routers.Home}/>
                    {/*<Route exact path="/mouse" component={routers.Mouse}/>*/}

                    {/*权限路由*/}
                    {/*<PrivateRoute path="/mouse" component={routers.Mouse}/>*/}
                    {/*<PrivateRouteHoc path="/bmap" component={routers.Bmap}/>*/}

                    {/*<Route exact path="/bmap" component={routers.Bmap}/>*/}
                    <Route exact path="/unknownPage" component={routers.unknownPage}/>
                    <Route exact path="/login" component={routers.Login}/>
                    <Redirect path="*" to='/unknownPage'/>
                </Switch>
            </HashRouter>
        )
    }
}
